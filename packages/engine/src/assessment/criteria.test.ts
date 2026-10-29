import { describe, expect, it } from 'vitest'
import { board, context, opp, own } from '../test-utils'
import { cover, crowding, pressure, reachInTime } from './criteria/defending'
import { passOptionsCriterion, spacing, triangle, widthDepth } from './criteria/passing'
import { chainGaps, protectCentre, shiftTowardsBall } from './criteria/team'
import { evaluateAssessment } from './evaluate'
import { assessmentConfigSchema } from './registry'

/**
 * Ausgangslage aller Defensivtests: Wir verteidigen das linke Tor (0|34).
 * Gegner 9 führt den Ball auf unserer Außenbahn bei (24|58).
 * Achse Ball → Tor: Richtung (-0,707|-0,707); "innen" = Richtung Spielfeldmitte (kleineres y).
 */
const CARRIER = opp('o9', 24, 58)
const FIRST_GOOD = own('d1', 22.6, 56.6)

function run<T extends { params: { parse: (v: unknown) => unknown }; evaluate: (...args: never[]) => unknown }>(
  def: T,
  ctx: ReturnType<typeof context>,
  params: Record<string, unknown>,
) {
  const parsed = def.params.parse(params)
  return (def.evaluate as (c: typeof ctx, p: unknown) => ReturnType<typeof pressure.evaluate>)(ctx, parsed)
}

describe('Kriterium "pressure" (erster Verteidiger stellt)', () => {
  it('akzeptiert torseitiges Stellen auf etwa 2 m', () => {
    const r = run(pressure, context(board([CARRIER, FIRST_GOOD], 'o9')), { defender: 'd1' })
    expect(r.passed).toBe(true)
    expect(r.feedbackKey).toBe('pressure.ok')
  })

  it('meldet "zu weit weg" bei 6 m Abstand', () => {
    const r = run(pressure, context(board([CARRIER, own('d1', 19.8, 53.8)], 'o9')), { defender: 'd1' })
    expect(r.passed).toBe(false)
    expect(r.feedbackKey).toBe('pressure.tooFar')
  })

  it('erkennt, wenn der Verteidiger nicht zwischen Ball und Tor steht', () => {
    const r = run(pressure, context(board([CARRIER, own('d1', 26, 60)], 'o9')), { defender: 'd1' })
    expect(r.passed).toBe(false)
    expect(r.feedbackKey).toBe('pressure.notGoalSide')
  })

  it('wählt per Selektor automatisch den ballnächsten Verteidiger', () => {
    const state = board([CARRIER, FIRST_GOOD, own('d2', 10, 30)], 'o9')
    const r = run(pressure, context(state), {})
    expect(r.feedbackParams?.player).toBe('d1')
  })
})

describe('Kriterium "cover" (zweiter Verteidiger sichert ab)', () => {
  const evaluateCover = (x: number, y: number) =>
    run(cover, context(board([CARRIER, FIRST_GOOD, own('d2', x, y)], 'o9')), { cover: 'd2', first: 'd1' })

  it('akzeptiert eine tiefere, leicht versetzte Absicherung', () => {
    const r = evaluateCover(19.5, 50.5)
    expect(r.passed).toBe(true)
    expect(r.feedbackKey).toBe('cover.ok')
  })

  it('erkennt eine "flache" Position auf gleicher Höhe', () => {
    const r = evaluateCover(26.8, 52.4)
    expect(r.passed).toBe(false)
    expect(r.feedbackKey).toBe('cover.notDeeper')
  })

  it('erkennt zu großen Abstand zum ersten Verteidiger', () => {
    const r = evaluateCover(8, 34)
    expect(r.passed).toBe(false)
    expect(r.feedbackKey).toBe('cover.tooFar')
  })

  it('wertet eine Absicherung nach außen als vertretbar, aber nicht ideal', () => {
    const r = evaluateCover(17.65, 57.3)
    expect(r.passed).toBe(true)
    expect(r.feedbackKey).toBe('cover.outside')
    expect(r.score).toBeLessThan(0.85)
  })

  it('ist robust gegen kleine Verschiebungen (keine harten Kanten)', () => {
    const a = evaluateCover(19.5, 50.5).score
    const b = evaluateCover(19.8, 50.2).score
    expect(Math.abs(a - b)).toBeLessThan(0.1)
  })
})

describe('Kriterium "reachInTime"', () => {
  it('ist erfüllt, wenn der Verteidiger beim Pass rechtzeitig am Gegenspieler ist', () => {
    const state = board([CARRIER, FIRST_GOOD, own('d2', 16, 44), opp('o10', 14, 40)], 'o9')
    const r = run(reachInTime, context(state), { defender: 'd2', target: 'o10' })
    expect(r.passed).toBe(true)
  })

  it('meldet "zu spät", wenn der Gegenspieler weit weg frei steht', () => {
    const state = board([CARRIER, FIRST_GOOD, own('d2', 19.5, 50.5), opp('o10', 40, 25)], 'o9')
    const r = run(reachInTime, context(state), { defender: 'd2', target: 'o10' })
    expect(r.passed).toBe(false)
    expect(r.feedbackKey).toBe('reachInTime.late')
  })
})

describe('Kriterium "crowding" (nicht alle zum Ball)', () => {
  it('meldet zu viele eigene Spieler am Ball', () => {
    const state = board([CARRIER, FIRST_GOOD, own('d2', 25, 55), own('d3', 21, 60)], 'o9')
    const r = run(crowding, context(state), { radius: 5, max: 1 })
    expect(r.passed).toBe(false)
    expect(r.feedbackParams?.count).toBe(3)
  })

  it('akzeptiert einen Spieler am Ball und die anderen mit Abstand', () => {
    const state = board([CARRIER, FIRST_GOOD, own('d2', 19.5, 50.5), own('d3', 12, 34)], 'o9')
    expect(run(crowding, context(state), { radius: 5, max: 1 }).passed).toBe(true)
  })
})

describe('Mannschaftstaktische Kriterien', () => {
  const ball = opp('o9', 24, 58)

  it('verlangt KEINE gleichen Abstände in der Kette (ballnah eng, ballfern weiter)', () => {
    const state = board([ball, own('a', 12, 22), own('b', 12, 36), own('c', 12, 47), own('d', 13, 54)], 'o9')
    expect(run(chainGaps, context(state), { group: ['a', 'b', 'c', 'd'] }).passed).toBe(true)
  })

  it('erkennt eine große Lücke', () => {
    const state = board([ball, own('a', 12, 10), own('b', 12, 30), own('c', 12, 50), own('d', 13, 57)], 'o9')
    const r = run(chainGaps, context(state), { group: ['a', 'b', 'c', 'd'] })
    expect(r.passed).toBe(false)
    expect(r.feedbackKey).toBe('chainGaps.tooBig')
  })

  it('bewertet das Verschieben relativ zur Ballposition', () => {
    const group = (ys: number[]) => board([ball, ...ys.map((y, i) => own(`p${i}`, 12, y))], 'o9')
    const params = { group: ['p0', 'p1', 'p2', 'p3'] }
    expect(run(shiftTowardsBall, context(group([36, 44, 51, 57])), params).feedbackKey).toBe('shift.ok')
    expect(run(shiftTowardsBall, context(group([20, 30, 40, 50])), params).feedbackKey).toBe('shift.notEnough')
    expect(run(shiftTowardsBall, context(group([60, 62, 64, 66])), params).feedbackKey).toBe('shift.tooMuch')
  })

  it('prüft, ob die Mitte vor dem Tor geschützt bleibt', () => {
    const open = board([ball, own('a', 14, 50), own('b', 14, 56), own('c', 14, 62)], 'o9')
    const safe = board([ball, own('a', 12, 30), own('b', 12, 40), own('c', 14, 52)], 'o9')
    expect(run(protectCentre, context(open), { group: ['a', 'b', 'c'] }).passed).toBe(false)
    expect(run(protectCentre, context(safe), { group: ['a', 'b', 'c'] }).passed).toBe(true)
  })
})

describe('Angriffskriterien (Abstand halten, anbieten)', () => {
  // Wir greifen nach rechts an; Ballführender 6 im Mittelfeld.
  const attacking = { teams: { own: { attackDirection: 1 as const }, opp: { attackDirection: -1 as const } } }
  const defenders = [opp('x1', 58, 30), opp('x2', 58, 40)]

  it('erkennt zu wenige Anspielstationen, wenn alle beim Ball stehen', () => {
    const state = board([own('c', 50, 34), own('m1', 52, 33), own('m2', 51, 36), own('m3', 49, 31), ...defenders], 'c')
    const ctx = context(state, { ...attacking, controlled: ['m1', 'm2', 'm3'] })
    expect(run(spacing, ctx, { include: [{ ref: 'ballCarrier' }] }).passed).toBe(false)
  })

  it('akzeptiert eine Rautenstaffelung mit offenen Passwegen und Breite/Tiefe', () => {
    const state = board([own('c', 50, 34), own('m1', 55, 19), own('m2', 55, 49), own('m3', 68, 35), ...defenders], 'c')
    const ctx = context(state, { ...attacking, controlled: ['m1', 'm2', 'm3'] })
    expect(run(passOptionsCriterion, ctx, { minOpen: 2 }).passed).toBe(true)
    expect(run(widthDepth, ctx, {}).passed).toBe(true)
    expect(run(triangle, ctx, {}).passed).toBe(true)
  })
})

describe('Gesamtbewertung', () => {
  const config = assessmentConfigSchema.parse({
    criteria: [
      { id: 'press', kind: 'pressure', params: { defender: 'd1' }, required: true, weight: 2, principle: 'P-STELLEN' },
      { id: 'cover', kind: 'cover', params: { cover: 'd2', first: 'd1' }, required: true, weight: 2, principle: 'P-ABSICHERN' },
      { id: 'crowd', kind: 'crowding', params: { radius: 4, max: 1 }, weight: 1, principle: 'P-NICHT-ALLE' },
    ],
    alternatives: [
      {
        id: 'mark-runner',
        explanation: { de: 'Du deckst den freien Gegenspieler – auch das schützt das Tor.' },
        criteria: [{ id: 'reach', kind: 'reachInTime', params: { defender: 'd2', target: 'o10' }, required: true }],
      },
    ],
  })

  it('bewertet eine fachlich gute Lösung als "excellent"', () => {
    const state = board([CARRIER, FIRST_GOOD, own('d2', 19.5, 50.5), opp('o10', 30, 30)], 'o9')
    const result = evaluateAssessment(context(state), config)
    expect(result.rating).toBe('excellent')
    expect(result.principles['P-ABSICHERN']).toBe(true)
  })

  it('gibt bei Fehlern das wichtigste Pflichtkriterium als Feedback zurück', () => {
    const state = board([CARRIER, FIRST_GOOD, own('d2', 23, 58.5), opp('o10', 30, 30)], 'o9')
    const result = evaluateAssessment(context(state), config)
    expect(result.rating).toBe('not-yet')
    expect(result.primary?.id).toBe('cover')
  })

  it('erkennt eine dokumentierte Alternativlösung', () => {
    const state = board([CARRIER, FIRST_GOOD, own('d2', 13, 41), opp('o10', 12, 38)], 'o9')
    const result = evaluateAssessment(context(state), config)
    expect(result.rating).toBe('good')
    expect(result.alternativeId).toBe('mark-runner')
  })
})
