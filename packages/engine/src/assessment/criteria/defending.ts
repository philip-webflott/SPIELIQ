import { z } from 'zod'
import { analyzePass } from '../../analysis/passing'
import { coverGeometry, isGoalSideOf, pressureGeometry } from '../../analysis/defense'
import { defendedGoalNear, progression, teamPlayers } from '../../board/state'
import { distance, roundTo } from '../../geometry/vec'
import { timeToReach } from '../../model/motion'
import { defineCriterion, missingEntity } from '../define'
import { atMost, bandPosition, bandScore } from '../scoring'
import { entityGroupSchema, entityRefSchema, resolveEntity, resolveGroup } from '../selectors'
import type { Evidence } from '../types'
import { bandSchema } from './shared'

/**
 * Erster Verteidiger ("stellen"): nah genug am Ballführenden, um Druck zu
 * machen, nicht so nah, dass er sofort ausgespielt wird, und torseitig.
 */
export const pressure = defineCriterion({
  kind: 'pressure',
  description: 'Erster Verteidiger: Abstand zum Ballführenden und torseitige Stellung',
  params: z.object({
    defender: entityRefSchema.default({ ref: 'nearestTo', target: 'ballCarrier', team: 'own' }),
    carrier: entityRefSchema.default({ ref: 'ballCarrier' }),
    band: bandSchema.default({ min: 0.3, idealMin: 1, idealMax: 3, max: 6.5 }),
    maxGoalSideAngle: z.number().default(45),
  }),
  evaluate(ctx, p) {
    const defender = resolveEntity(ctx, p.defender)
    const carrier = resolveEntity(ctx, p.carrier)
    if (!defender || !carrier) return missingEntity('pressure')
    const goal = defendedGoalNear(ctx.pitch, ctx.teams, defender.team, carrier.pos).center
    const geo = pressureGeometry(defender.pos, carrier.pos, goal, p.maxGoalSideAngle)
    const distScore = bandScore(geo.distance, p.band)
    const angleScore = atMost(geo.goalSideAngle, p.maxGoalSideAngle, p.maxGoalSideAngle + 45)
    const score = 0.6 * distScore + 0.4 * angleScore
    const passed = distScore >= 0.5 && geo.isGoalSide
    const position = bandPosition(geo.distance, p.band)
    const feedbackKey = !geo.isGoalSide
      ? 'pressure.notGoalSide'
      : position === 'above'
        ? 'pressure.tooFar'
        : position === 'below'
          ? 'pressure.tooClose'
          : 'pressure.ok'
    return {
      score,
      passed,
      feedbackKey,
      feedbackParams: { meters: roundTo(geo.distance), player: defender.label ?? defender.id },
      evidence: [
        { type: 'distance', from: defender.pos, to: carrier.pos, meters: geo.distance, tone: passed ? 'good' : 'bad' },
        { type: 'highlight', playerId: defender.id, tone: passed ? 'good' : 'warn' },
      ],
    }
  },
})

/**
 * Zweiter Verteidiger ("absichern"): steht tiefer als der erste Verteidiger,
 * schräg versetzt (bevorzugt nach innen), nah genug, um bei einem verlorenen
 * Zweikampf sofort einzugreifen, aber nicht so nah, dass beide mit einer
 * Aktion überspielt werden.
 */
export const cover = defineCriterion({
  kind: 'cover',
  description: 'Zweiter Verteidiger: Tiefenstaffelung, Abstand und Winkel zum ersten Verteidiger',
  params: z.object({
    cover: entityRefSchema,
    first: entityRefSchema,
    carrier: entityRefSchema.default({ ref: 'ballCarrier' }),
    distance: bandSchema.default({ min: 2.5, idealMin: 3.5, idealMax: 8, max: 11.5 }),
    depthGap: bandSchema.default({ min: 0.5, idealMin: 1.5, idealMax: 6.5, max: 9.5 }),
    stagger: bandSchema.default({ idealMax: 65, max: 88 }),
    preferInside: z.boolean().default(true),
  }),
  evaluate(ctx, p) {
    const coverPlayer = resolveEntity(ctx, p.cover)
    const first = resolveEntity(ctx, p.first)
    const carrier = resolveEntity(ctx, p.carrier)
    if (!coverPlayer || !first || !carrier) return missingEntity('cover')
    if (coverPlayer.id === first.id) {
      return {
        score: 0,
        passed: false,
        feedbackKey: 'cover.samePlayer',
        evidence: [{ type: 'highlight', playerId: coverPlayer.id, tone: 'bad' }],
      }
    }
    const goal = defendedGoalNear(ctx.pitch, ctx.teams, coverPlayer.team, carrier.pos).center
    const inside = { x: carrier.pos.x, y: ctx.pitch.width / 2 }
    const geo = coverGeometry(coverPlayer.pos, first.pos, carrier.pos, goal, inside)
    const depthScore = bandScore(geo.depthGap, p.depthGap)
    const distScore = bandScore(geo.distanceToFirst, p.distance)
    const staggerScore = bandScore(geo.staggerAngle, p.stagger)
    let score = 0.4 * depthScore + 0.35 * distScore + 0.25 * staggerScore
    const outside = p.preferInside && geo.side === -1
    if (outside) score *= 0.8
    const passed = depthScore > 0 && distScore > 0 && score >= 0.6
    const distPos = bandPosition(geo.distanceToFirst, p.distance)
    const feedbackKey =
      geo.depthGap < (p.depthGap.idealMin ?? 1.5) * 0.6
        ? 'cover.notDeeper'
        : distPos === 'above'
          ? 'cover.tooFar'
          : distPos === 'below'
            ? 'cover.tooClose'
            : staggerScore < 0.6
              ? 'cover.flat'
              : outside
                ? 'cover.outside'
                : 'cover.ok'
    return {
      score,
      passed,
      feedbackKey: passed && feedbackKey !== 'cover.outside' ? 'cover.ok' : feedbackKey,
      feedbackParams: {
        meters: roundTo(geo.distanceToFirst),
        depth: roundTo(geo.depthGap),
        player: coverPlayer.label ?? coverPlayer.id,
        first: first.label ?? first.id,
      },
      evidence: [
        { type: 'distance', from: first.pos, to: coverPlayer.pos, meters: geo.distanceToFirst, tone: passed ? 'good' : 'bad' },
        { type: 'highlight', playerId: coverPlayer.id, tone: passed ? 'good' : 'warn' },
      ],
    }
  },
})

/**
 * "Rechtzeitig da sein": Wird der Ball zum Gegenspieler gespielt, kommt der
 * Verteidiger an, bevor dieser in Ruhe weiterspielen kann (oder fängt ab).
 */
export const reachInTime = defineCriterion({
  kind: 'reachInTime',
  description: 'Verteidiger erreicht einen möglichen Passempfänger rechtzeitig',
  params: z.object({
    defender: entityRefSchema,
    target: entityRefSchema,
    passer: entityRefSchema.default({ ref: 'ballCarrier' }),
    tolerance: z.number().default(0.4),
    /**
     * true: Auch wenn der Passweg gerade zugestellt ist, muss der Verteidiger
     * rechtzeitig da sein (z. B. für die Balance-Rolle – ein Deckungsschatten
     * des ersten Verteidigers ist nicht stabil).
     */
    ignoreBlockedLane: z.boolean().default(false),
  }),
  evaluate(ctx, p) {
    const defender = resolveEntity(ctx, p.defender)
    const target = resolveEntity(ctx, p.target)
    const passer = resolveEntity(ctx, p.passer)
    if (!defender || !target || !passer) return missingEntity('reachInTime')
    const pass = analyzePass(ctx.state, passer.id, target.id, ctx.model)
    const evidence: Evidence[] = [
      { type: 'lane', fromId: passer.id, toId: target.id, from: passer.pos, to: target.pos, status: pass.status },
    ]
    if (pass.status === 'blocked' && !p.ignoreBlockedLane) {
      return { score: 1, passed: true, feedbackKey: 'reachInTime.laneClosed', feedbackParams: { target: target.label ?? target.id }, evidence }
    }
    const arrival = timeToReach(ctx.model, defender.pos, target.pos, ctx.model.pressureDistance)
    const delta = arrival - pass.ballTime
    const passed = delta <= p.tolerance
    evidence.push({
      type: 'distance',
      from: defender.pos,
      to: target.pos,
      meters: distance(defender.pos, target.pos),
      tone: passed ? 'good' : 'bad',
    })
    return {
      score: atMost(delta, 0, p.tolerance * 2.5),
      passed,
      feedbackKey: passed ? 'reachInTime.ok' : 'reachInTime.late',
      feedbackParams: { seconds: roundTo(Math.max(0, delta), 1), target: target.label ?? target.id },
      evidence,
    }
  },
})

/** Steht der Verteidiger zwischen seinem Gegenspieler und dem eigenen Tor? */
export const goalSide = defineCriterion({
  kind: 'goalSide',
  description: 'Torseitige Position zum Gegenspieler',
  params: z.object({
    defender: entityRefSchema,
    attacker: entityRefSchema,
    maxAngle: z.number().default(60),
  }),
  evaluate(ctx, p) {
    const defender = resolveEntity(ctx, p.defender)
    const attacker = resolveEntity(ctx, p.attacker)
    if (!defender || !attacker) return missingEntity('goalSide')
    const goal = defendedGoalNear(ctx.pitch, ctx.teams, defender.team, attacker.pos).center
    const ok = isGoalSideOf(defender.pos, attacker.pos, goal, p.maxAngle)
    return {
      score: ok ? 1 : 0,
      passed: ok,
      feedbackKey: ok ? 'goalSide.ok' : 'goalSide.no',
      feedbackParams: { attacker: attacker.label ?? attacker.id },
      evidence: [{ type: 'highlight', playerId: defender.id, tone: ok ? 'good' : 'bad' }],
    }
  },
})

/** "Nicht alle zum Ball": Wie viele eigene Spieler stehen im Umkreis des Balls? */
export const crowding = defineCriterion({
  kind: 'crowding',
  description: 'Höchstens n Spieler einer Mannschaft im Umkreis des Ballführenden',
  params: z.object({
    team: z.enum(['own', 'opp']).default('own'),
    around: entityRefSchema.default({ ref: 'ballCarrier' }),
    radius: z.number().positive().default(5),
    max: z.number().int().min(0).default(1),
  }),
  evaluate(ctx, p) {
    const center = resolveEntity(ctx, p.around)
    if (!center) return missingEntity('crowding')
    const near = teamPlayers(ctx.state, p.team, false).filter(
      (x) => x.id !== center.id && distance(x.pos, center.pos) <= p.radius,
    )
    const count = near.length
    const passed = count <= p.max
    return {
      score: passed ? 1 : count === p.max + 1 ? 0.35 : 0,
      passed,
      feedbackKey: passed ? 'crowding.ok' : 'crowding.tooMany',
      feedbackParams: { count, max: p.max },
      evidence: [
        { type: 'circle', center: center.pos, radius: p.radius, tone: passed ? 'info' : 'bad' },
        ...near.map((x) => ({ type: 'highlight', playerId: x.id, tone: passed ? 'good' : 'bad' }) as const),
      ],
    }
  },
})

/** Wie viele Spieler einer Gruppe stehen schon "hinter dem Ball" (überspielt)? */
export const behindBall = defineCriterion({
  kind: 'behindBall',
  description: 'Verteidiger stehen zwischen Ball und eigenem Tor, nicht überspielt',
  params: z.object({
    group: entityGroupSchema.default({ ref: 'team', team: 'own', excludeGoalkeeper: true }),
    tolerance: z.number().default(1.5),
    maxBeaten: z.number().int().min(0).default(0),
  }),
  evaluate(ctx, p) {
    const group = resolveGroup(ctx, p.group)
    if (group.length === 0) return missingEntity('behindBall.group')
    const team = group[0]!.team
    const ballProg = progression(ctx.pitch, ctx.teams, team, ctx.state.ball.pos)
    const tol = p.tolerance / ctx.pitch.length
    const beaten = group.filter((x) => progression(ctx.pitch, ctx.teams, team, x.pos) > ballProg + tol)
    const passed = beaten.length <= p.maxBeaten
    return {
      score: passed ? 1 : beaten.length === p.maxBeaten + 1 ? 0.4 : 0,
      passed,
      feedbackKey: passed ? 'behindBall.ok' : 'behindBall.beaten',
      feedbackParams: { count: beaten.length },
      evidence: beaten.map((x) => ({ type: 'highlight', playerId: x.id, tone: 'bad' }) as const),
    }
  },
})
