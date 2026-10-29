import { z } from 'zod'
import { analyzePass, analyzeReception, type PassAnalysis } from '../../analysis/passing'
import { teamPlayers } from '../../board/state'
import { smallestTriangleAngle } from '../../geometry/polygon'
import { distance, roundTo } from '../../geometry/vec'
import { defineCriterion, missingEntity } from '../define'
import { atLeast, atMost, bandPosition, bandScore } from '../scoring'
import { entityGroupSchema, entityRefSchema, resolveEntity, resolveGroup } from '../selectors'
import type { Evidence } from '../types'
import { bandSchema } from './shared'

function laneEvidence(pass: PassAnalysis): Evidence {
  return {
    type: 'lane',
    fromId: pass.fromId,
    toId: pass.toId,
    from: pass.from,
    to: pass.to,
    status: pass.status,
    ...(pass.interceptPoint ? { interceptPoint: pass.interceptPoint } : {}),
  }
}

/** Ist ein bestimmter Passweg offen (Angriff) bzw. zugestellt (Verteidigung)? */
export const passLane = defineCriterion({
  kind: 'passLane',
  description: 'Passweg von A nach B offen bzw. geschlossen (zeitbasiertes Abfangmodell)',
  params: z.object({
    from: entityRefSchema.default({ ref: 'ballCarrier' }),
    to: entityRefSchema,
    expect: z.enum(['open', 'closed']).default('open'),
    acceptRisky: z.boolean().default(false),
  }),
  evaluate(ctx, p) {
    const from = resolveEntity(ctx, p.from)
    const to = resolveEntity(ctx, p.to)
    if (!from || !to) return missingEntity('passLane')
    const pass = analyzePass(ctx.state, from.id, to.id, ctx.model)
    const evidence = [laneEvidence(pass)]
    if (p.expect === 'open') {
      const passed = pass.status === 'open' || (p.acceptRisky && pass.status === 'risky')
      return {
        score: atLeast(pass.margin, 0.25, -0.2),
        passed,
        feedbackKey: `passLane.${pass.status}`,
        feedbackParams: { to: to.label ?? to.id },
        evidence,
      }
    }
    const passed = pass.status === 'blocked' || (p.acceptRisky && pass.status === 'risky')
    return {
      score: atMost(pass.margin, -0.05, 0.3),
      passed,
      feedbackKey: passed ? 'passLane.closed' : 'passLane.stillOpen',
      feedbackParams: { to: to.label ?? to.id },
      evidence,
    }
  },
})

/** Hat der Ballführende genügend offene Anspielstationen? */
export const passOptionsCriterion = defineCriterion({
  kind: 'passOptions',
  description: 'Anzahl offener Passwege vom Ballführenden zu einer Spielergruppe',
  params: z.object({
    from: entityRefSchema.default({ ref: 'ballCarrier' }),
    receivers: entityGroupSchema.default({ ref: 'controlled' }),
    minOpen: z.number().int().min(1).default(2),
    countRiskyAsHalf: z.boolean().default(true),
  }),
  evaluate(ctx, p) {
    const from = resolveEntity(ctx, p.from)
    if (!from) return missingEntity('passOptions.from')
    const receivers = resolveGroup(ctx, p.receivers).filter((r) => r.id !== from.id)
    const passes = receivers.map((r) => analyzePass(ctx.state, from.id, r.id, ctx.model))
    const open = passes.filter((x) => x.status === 'open').length
    const risky = passes.filter((x) => x.status === 'risky').length
    const value = open + (p.countRiskyAsHalf ? risky * 0.5 : 0)
    return {
      score: Math.min(1, value / p.minOpen),
      passed: open >= p.minOpen,
      feedbackKey: open >= p.minOpen ? 'passOptions.enough' : 'passOptions.tooFew',
      feedbackParams: { open, min: p.minOpen },
      evidence: passes.map(laneEvidence),
    }
  },
})

/** Steht ein Gegenspieler (oder Mitspieler) frei – Passweg offen und nach der Annahme Zeit? */
export const selectFree = defineCriterion({
  kind: 'selectFree',
  description: 'Der ausgewählte Spieler ist frei anspielbar (für Erkennungsaufgaben)',
  params: z.object({
    passer: entityRefSchema.default({ ref: 'ballCarrier' }),
    mode: z.enum(['any-free', 'most-free']).default('any-free'),
    minTimeOnBall: z.number().default(0.8),
  }),
  evaluate(ctx, p) {
    const passer = resolveEntity(ctx, p.passer)
    if (!passer) return missingEntity('selectFree.passer')
    const candidates = teamPlayers(ctx.state, passer.team).filter((x) => x.id !== passer.id && x.role !== 'GK')
    const receptions = candidates.map((c) => analyzeReception(ctx.state, passer.id, c.id, ctx.model))
    const isFree = (r: (typeof receptions)[number]) => r.pass.status !== 'blocked' && r.timeOnBall >= p.minTimeOnBall
    const free = receptions.filter(isFree)
    const best = [...receptions].sort((a, b) => b.timeOnBall - a.timeOnBall)[0]
    const evidence: Evidence[] = free.map((r) => ({ type: 'highlight', playerId: r.receiverId, tone: 'warn' }) as const)

    const selectedId = ctx.selection?.playerId
    if (!selectedId) {
      return { score: 0, passed: false, feedbackKey: 'selectFree.none', evidence }
    }
    const selected = receptions.find((r) => r.receiverId === selectedId)
    if (!selected) {
      return { score: 0, passed: false, feedbackKey: 'selectFree.wrongTeam', evidence }
    }
    const selectedFree = isFree(selected)
    const isBest = best ? best.timeOnBall - selected.timeOnBall <= 0.3 : false
    const passed = p.mode === 'any-free' ? selectedFree : selectedFree && isBest
    return {
      score: passed ? 1 : selected.pass.status === 'blocked' ? 0 : 0.3,
      passed,
      feedbackKey: passed ? 'selectFree.ok' : selectedFree ? 'selectFree.notMostFree' : 'selectFree.notFree',
      feedbackParams: { seconds: roundTo(Math.max(0, selected.timeOnBall), 1) },
      evidence: [laneEvidence(selected.pass), ...evidence],
    }
  },
})

/** Kein Spieler der Gruppe steht zu nah an einem anderen ("nicht auf einem Fleck"). */
export const spacing = defineCriterion({
  kind: 'spacing',
  description: 'Mindestabstand zwischen Spielern einer Gruppe (optional inkl. Ballführendem)',
  params: z.object({
    group: entityGroupSchema.default({ ref: 'controlled' }),
    include: z.array(entityRefSchema).default([]),
    band: bandSchema.default({ min: 3, idealMin: 7 }),
  }),
  evaluate(ctx, p) {
    const players = [
      ...resolveGroup(ctx, p.group),
      ...p.include.map((r) => resolveEntity(ctx, r)).filter((x) => x !== null),
    ]
    const unique = players.filter((x, i) => players.findIndex((y) => y.id === x.id) === i)
    let worst: { a: (typeof unique)[number]; b: (typeof unique)[number]; d: number } | null = null
    for (let i = 0; i < unique.length; i++) {
      for (let j = i + 1; j < unique.length; j++) {
        const d = distance(unique[i]!.pos, unique[j]!.pos)
        if (!worst || d < worst.d) worst = { a: unique[i]!, b: unique[j]!, d }
      }
    }
    if (!worst) return missingEntity('spacing.group')
    const score = bandScore(worst.d, p.band)
    const passed = score >= 0.5
    return {
      score,
      passed,
      feedbackKey: passed ? 'spacing.ok' : 'spacing.tooClose',
      feedbackParams: { a: worst.a.label ?? worst.a.id, b: worst.b.label ?? worst.b.id, meters: roundTo(worst.d) },
      evidence: [{ type: 'distance', from: worst.a.pos, to: worst.b.pos, meters: worst.d, tone: passed ? 'good' : 'bad' }],
    }
  },
})

/** Breite und Tiefe einer Gruppe – macht die Mannschaft "das Feld groß"? */
export const widthDepth = defineCriterion({
  kind: 'widthDepth',
  description: 'Ausdehnung einer Gruppe quer (Breite) und längs (Tiefe) zum Spielfeld',
  params: z.object({
    group: entityGroupSchema.default({ ref: 'controlled' }),
    include: z.array(entityRefSchema).default([{ ref: 'ballCarrier' }]),
    minWidth: z.number().positive().default(14),
    minDepth: z.number().positive().default(10),
  }),
  evaluate(ctx, p) {
    const players = [
      ...resolveGroup(ctx, p.group),
      ...p.include.map((r) => resolveEntity(ctx, r)).filter((x) => x !== null),
    ]
    if (players.length < 2) return missingEntity('widthDepth.group')
    const ys = players.map((x) => x.pos.y)
    const xs = players.map((x) => x.pos.x)
    const width = Math.max(...ys) - Math.min(...ys)
    const depth = Math.max(...xs) - Math.min(...xs)
    const ws = atLeast(width, p.minWidth, p.minWidth * 0.4)
    const ds = atLeast(depth, p.minDepth, p.minDepth * 0.4)
    const score = (ws + ds) / 2
    const passed = ws >= 0.75 && ds >= 0.75
    const feedbackKey = passed ? 'widthDepth.ok' : ws <= ds ? 'widthDepth.noWidth' : 'widthDepth.noDepth'
    return {
      score,
      passed,
      feedbackKey,
      feedbackParams: { width: roundTo(width), depth: roundTo(depth) },
      evidence: [],
    }
  },
})

/** Bilden Ballführender und zwei Mitspieler ein echtes Dreieck mit offenen Passwegen? */
export const triangle = defineCriterion({
  kind: 'triangle',
  description: 'Passdreieck: Ballführender + zwei Mitspieler, nicht auf einer Linie, beide Passwege offen',
  params: z.object({
    apex: entityRefSchema.default({ ref: 'ballCarrier' }),
    group: entityGroupSchema.default({ ref: 'controlled' }),
    minAngle: z.number().default(25),
    minSide: z.number().default(5),
  }),
  evaluate(ctx, p) {
    const apex = resolveEntity(ctx, p.apex)
    if (!apex) return missingEntity('triangle.apex')
    const group = resolveGroup(ctx, p.group).filter((x) => x.id !== apex.id)
    let best: { score: number; evidence: Evidence[]; flat: boolean; blocked: boolean } | null = null
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const b = group[i]!
        const c = group[j]!
        const angle = smallestTriangleAngle(apex.pos, b.pos, c.pos)
        const side = Math.min(distance(apex.pos, b.pos), distance(apex.pos, c.pos), distance(b.pos, c.pos))
        const lb = analyzePass(ctx.state, apex.id, b.id, ctx.model)
        const lc = analyzePass(ctx.state, apex.id, c.id, ctx.model)
        const laneFactor = (s: PassAnalysis['status']) => (s === 'open' ? 1 : s === 'risky' ? 0.6 : 0.2)
        const shape = atLeast(angle, p.minAngle, p.minAngle * 0.4) * atLeast(side, p.minSide, p.minSide * 0.5)
        const score = shape * laneFactor(lb.status) * laneFactor(lc.status)
        if (!best || score > best.score) {
          best = {
            score,
            flat: shape < 0.6,
            blocked: lb.status === 'blocked' || lc.status === 'blocked',
            evidence: [
              { type: 'zone', polygon: [apex.pos, b.pos, c.pos], tone: score >= 0.6 ? 'good' : 'warn' },
              laneEvidence(lb),
              laneEvidence(lc),
            ],
          }
        }
      }
    }
    if (!best) return missingEntity('triangle.group')
    const passed = best.score >= 0.6 && !best.blocked
    return {
      score: best.score,
      passed,
      feedbackKey: passed ? 'triangle.ok' : best.flat ? 'triangle.flat' : 'triangle.laneBlocked',
      evidence: best.evidence,
    }
  },
})

/** Allgemeiner Abstand zwischen zwei Spielern mit Idealbereich. */
export const distanceCriterion = defineCriterion({
  kind: 'distance',
  description: 'Abstand zwischen zwei Spielern innerhalb eines Idealbereichs',
  params: z.object({
    a: entityRefSchema,
    b: entityRefSchema,
    band: bandSchema,
  }),
  evaluate(ctx, p) {
    const a = resolveEntity(ctx, p.a)
    const b = resolveEntity(ctx, p.b)
    if (!a || !b) return missingEntity('distance')
    const d = distance(a.pos, b.pos)
    const score = bandScore(d, p.band)
    const position = bandPosition(d, p.band)
    return {
      score,
      passed: score >= 0.5,
      feedbackKey: position === 'ideal' ? 'distance.ok' : position === 'below' ? 'distance.tooClose' : 'distance.tooFar',
      feedbackParams: { meters: roundTo(d), a: a.label ?? a.id, b: b.label ?? b.id },
      evidence: [{ type: 'distance', from: a.pos, to: b.pos, meters: d, tone: score >= 0.5 ? 'good' : 'bad' }],
    }
  },
})
