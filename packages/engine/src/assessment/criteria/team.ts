import { z } from 'zod'
import { blockShape, lateralGaps } from '../../analysis/team'
import { defendedGoalNear } from '../../board/state'
import { distance, roundTo } from '../../geometry/vec'
import { defineCriterion, missingEntity, notApplicable } from '../define'
import { atLeast, atMost, bandPosition, bandScore } from '../scoring'
import { entityGroupSchema, resolveGroup } from '../selectors'
import type { Evidence } from '../types'
import { bandSchema } from './shared'

/**
 * Keine zu großen Lücken in einer Kette. Die erlaubte Lücke ist kontextabhängig:
 * In Ballnähe muss enger gestanden werden als auf der ballfernen Seite.
 * Gleiche Abstände werden ausdrücklich NICHT verlangt.
 */
export const chainGaps = defineCriterion({
  kind: 'chainGaps',
  description: 'Lücken zwischen seitlich benachbarten Spielern (ballnah enger als ballfern)',
  params: z.object({
    group: entityGroupSchema,
    ballSideIdeal: z.number().default(9),
    ballSideMax: z.number().default(15),
    farSideIdeal: z.number().default(14),
    farSideMax: z.number().default(21),
  }),
  evaluate(ctx, p) {
    const group = resolveGroup(ctx, p.group)
    if (group.length < 2) return missingEntity('chainGaps.group')
    const gaps = lateralGaps(group)
    const ball = ctx.state.ball.pos
    const ballGap = [...gaps].sort((a, b) => distance(a.midpoint, ball) - distance(b.midpoint, ball))[0]
    let worst: { gap: (typeof gaps)[number]; score: number } | null = null
    for (const gap of gaps) {
      const isBallSide = gap === ballGap
      const score = isBallSide
        ? atMost(gap.distance, p.ballSideIdeal, p.ballSideMax)
        : atMost(gap.distance, p.farSideIdeal, p.farSideMax)
      if (!worst || score < worst.score) worst = { gap, score }
    }
    if (!worst) return missingEntity('chainGaps.gaps')
    const passed = worst.score >= 0.5
    const players = new Map(group.map((x) => [x.id, x]))
    const left = players.get(worst.gap.leftId)!
    const right = players.get(worst.gap.rightId)!
    return {
      score: worst.score,
      passed,
      feedbackKey: passed ? 'chainGaps.ok' : 'chainGaps.tooBig',
      feedbackParams: { meters: roundTo(worst.gap.distance), a: left.label ?? left.id, b: right.label ?? right.id },
      evidence: [
        { type: 'distance', from: left.pos, to: right.pos, meters: worst.gap.distance, tone: passed ? 'good' : 'bad' },
      ],
    }
  },
})

/** Bleibt der Raum vor dem eigenen Tor geschützt? */
export const protectCentre = defineCriterion({
  kind: 'protectCentre',
  description: 'Mindestens n Spieler im zentralen Korridor vor dem eigenen Tor',
  params: z.object({
    group: entityGroupSchema,
    corridorHalfWidth: z.number().default(10),
    maxDistanceFromGoal: z.number().default(28),
    minCount: z.number().int().min(1).default(2),
  }),
  evaluate(ctx, p) {
    const group = resolveGroup(ctx, p.group)
    if (group.length === 0) return missingEntity('protectCentre.group')
    const goal = defendedGoalNear(ctx.pitch, ctx.teams, group[0]!.team, ctx.state.ball.pos).center
    const inCorridor = group.filter(
      (x) => Math.abs(x.pos.y - goal.y) <= p.corridorHalfWidth && Math.abs(x.pos.x - goal.x) <= p.maxDistanceFromGoal,
    )
    const passed = inCorridor.length >= p.minCount
    const dir = goal.x < ctx.pitch.length / 2 ? 1 : -1
    const depth = p.maxDistanceFromGoal * dir
    const corridor: Evidence = {
      type: 'zone',
      polygon: [
        { x: goal.x, y: goal.y - p.corridorHalfWidth },
        { x: goal.x + depth, y: goal.y - p.corridorHalfWidth },
        { x: goal.x + depth, y: goal.y + p.corridorHalfWidth },
        { x: goal.x, y: goal.y + p.corridorHalfWidth },
      ],
      tone: passed ? 'good' : 'bad',
    }
    return {
      score: Math.min(1, inCorridor.length / p.minCount),
      passed,
      feedbackKey: passed ? 'protectCentre.ok' : 'protectCentre.open',
      feedbackParams: { count: inCorridor.length, min: p.minCount },
      evidence: [corridor],
    }
  },
})

/**
 * Ballorientiertes Verschieben: Der Schwerpunkt des Blocks bewegt sich zur
 * Ballseite – deutlich, aber nicht vollständig (die Mitte bleibt geschützt).
 * Gemessen als Anteil der seitlichen Ballposition (0 = Mitte, 1 = auf Ballhöhe).
 */
export const shiftTowardsBall = defineCriterion({
  kind: 'shiftTowardsBall',
  description: 'Seitliche Verschiebung des Mannschaftsschwerpunkts zur Ballseite',
  params: z.object({
    group: entityGroupSchema,
    factor: bandSchema.default({ min: 0.1, idealMin: 0.35, idealMax: 0.9, max: 1.25 }),
    minBallOffset: z.number().default(6),
  }),
  evaluate(ctx, p) {
    const group = resolveGroup(ctx, p.group)
    if (group.length === 0) return missingEntity('shiftTowardsBall.group')
    const mid = ctx.pitch.width / 2
    const ballOffset = ctx.state.ball.pos.y - mid
    if (Math.abs(ballOffset) < p.minBallOffset) return notApplicable('shift.ballCentral')
    const shape = blockShape(group)
    const factor = (shape.centroid.y - mid) / ballOffset
    const score = bandScore(factor, p.factor)
    const position = bandPosition(factor, p.factor)
    return {
      score,
      passed: score >= 0.5,
      feedbackKey: position === 'ideal' ? 'shift.ok' : position === 'below' ? 'shift.notEnough' : 'shift.tooMuch',
      feedbackParams: { percent: Math.round(factor * 100) },
      evidence: [{ type: 'circle', center: shape.centroid, radius: 1.2, tone: score >= 0.5 ? 'good' : 'warn' }],
    }
  },
})

/** Kompaktheit: Breite (und optional Tiefe) eines Blocks begrenzen. */
export const compactness = defineCriterion({
  kind: 'compactness',
  description: 'Maximale Breite und Tiefe eines Blocks',
  params: z.object({
    group: entityGroupSchema,
    width: bandSchema.default({ idealMax: 36, max: 50 }),
    depth: bandSchema.optional(),
  }),
  evaluate(ctx, p) {
    const group = resolveGroup(ctx, p.group)
    if (group.length < 2) return missingEntity('compactness.group')
    const shape = blockShape(group)
    const ws = bandScore(shape.width, p.width)
    const ds = p.depth ? bandScore(shape.depth, p.depth) : 1
    const score = Math.min(ws, ds)
    return {
      score,
      passed: score >= 0.5,
      feedbackKey: score >= 0.5 ? 'compactness.ok' : ws < ds ? 'compactness.tooWide' : 'compactness.tooDeep',
      feedbackParams: { width: roundTo(shape.width), depth: roundTo(shape.depth) },
      evidence: [],
    }
  },
})

/** Freien Raum antippen: Der Punkt ist weit genug von allen Spielern einer Mannschaft entfernt. */
export const freeSpacePoint = defineCriterion({
  kind: 'freeSpacePoint',
  description: 'Ausgewählter Punkt liegt in freiem Raum (Abstand zu allen Spielern einer Mannschaft)',
  params: z.object({
    awayFrom: z.enum(['own', 'opp']).default('own'),
    minFree: z.number().default(9),
  }),
  evaluate(ctx, p) {
    const point = ctx.selection?.point
    if (!point) return { score: 0, passed: false, feedbackKey: 'freeSpace.none', evidence: [] }
    const players = ctx.state.players.filter((x) => x.team === p.awayFrom && x.role !== 'GK')
    const nearest = Math.min(...players.map((x) => distance(x.pos, point)))
    const score = atLeast(nearest, p.minFree, p.minFree * 0.5)
    return {
      score,
      passed: score >= 0.99,
      feedbackKey: score >= 0.99 ? 'freeSpace.ok' : 'freeSpace.notFree',
      feedbackParams: { meters: roundTo(nearest) },
      evidence: [{ type: 'circle', center: point, radius: Math.max(1, nearest), tone: score >= 0.99 ? 'warn' : 'info' }],
    }
  },
})

/** Auswahlentscheidung (z. B. "Wohin passt du?") mit richtigen und vertretbaren Optionen. */
export const choice = defineCriterion({
  kind: 'choice',
  description: 'Auswahl einer Option mit richtigen und vertretbaren Antworten',
  params: z.object({
    correct: z.array(z.string()).min(1),
    acceptable: z.array(z.string()).default([]),
  }),
  evaluate(ctx, p) {
    const id = ctx.selection?.optionId
    if (!id) return { score: 0, passed: false, feedbackKey: 'choice.none', evidence: [] }
    if (p.correct.includes(id)) return { score: 1, passed: true, feedbackKey: 'choice.correct', evidence: [] }
    if (p.acceptable.includes(id)) return { score: 0.7, passed: true, feedbackKey: 'choice.acceptable', evidence: [] }
    return { score: 0, passed: false, feedbackKey: 'choice.wrong', evidence: [] }
  },
})
