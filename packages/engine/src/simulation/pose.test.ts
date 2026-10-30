import { describe, expect, it } from 'vitest'
import { board, DEFENDING, MODEL, opp, own, PITCH } from '../test-utils'
import { staticPoses, timelinePoses } from './pose'
import { compileScript, scriptEventSchema } from './timeline'

const ctx = { pitch: PITCH, teams: DEFENDING, model: MODEL }
const parse = (events: unknown[]) => events.map((e) => scriptEventSchema.parse(e))
const deg = (rad: number) => ((((rad * 180) / Math.PI) % 360) + 360) % 360

describe('Haltung in einer stehenden Situation', () => {
  it('Spieler ohne Ball schauen zum Ball, der Ballführende zum gegnerischen Tor', () => {
    // Gegner greift nach -x an (DEFENDING), unser Tor liegt bei x = 0.
    const poses = staticPoses(board([opp('o9', 30, 34), own('d6', 30, 44)], 'o9'), ctx)
    expect(deg(poses.d6!.facing)).toBeCloseTo(270) // von y = 44 nach y = 34
    expect(deg(poses.o9!.facing)).toBeCloseTo(180) // Richtung x = 0
    expect(poses.d6!.action).toBe('ready')
  })

  it('wer nah am Ballführenden steht, verteidigt und schaut ihn an', () => {
    const poses = staticPoses(board([opp('o9', 30, 34), own('d4', 27, 34), own('d3', 15, 20)], 'o9'), ctx)
    expect(poses.d4).toMatchObject({ action: 'defend' })
    expect(deg(poses.d4!.facing)).toBeCloseTo(0)
    expect(poses.d3!.action).toBe('ready')
  })

  it('wird gespiegelt (andere Spielfeldseite) spiegelbildlich ausgerichtet', () => {
    const a = staticPoses(board([opp('o9', 30, 30), own('d6', 20, 40)], 'o9'), ctx)
    const b = staticPoses(board([opp('o9', 30, 68 - 30), own('d6', 20, 68 - 40)], 'o9'), ctx)
    expect(deg(b.d6!.facing)).toBeCloseTo(deg(-a.d6!.facing))
  })
})

describe('Haltung entlang einer Zeitleiste', () => {
  const start = board([opp('o9', 40, 34), opp('o7', 30, 20), own('d4', 20, 50)], 'o9')
  const tl = compileScript(
    start,
    parse([
      { type: 'move', player: 'd4', to: { x: 20, y: 40 }, at: 0, duration: 2, ease: 'linear' },
      { type: 'pass', from: 'o9', to: 'o7', at: 2.5 },
      { type: 'shot', player: 'o7', target: { x: 0, y: 34 }, at: 4.5 },
    ]),
    MODEL,
  )

  it('wer läuft, schaut in Laufrichtung; die Strecke wächst mit', () => {
    const mid = timelinePoses(tl, 1, ctx)
    expect(mid.d4!.action).toBe('run')
    expect(deg(mid.d4!.facing)).toBeCloseTo(270, 0)
    expect(mid.d4!.stride).toBeCloseTo(5, 0)
    expect(timelinePoses(tl, tl.duration, ctx).d4!.stride).toBeCloseTo(10)
  })

  it('nach dem Stehenbleiben dreht er sich zum Ball, ohne zu springen', () => {
    const justStopped = timelinePoses(tl, 2.05, ctx).d4!.facing
    const later = timelinePoses(tl, 2.4, ctx).d4!
    expect(later.action).toBe('ready')
    const toBall = Math.atan2(34 - 40, 40 - 20)
    expect(Math.abs(later.facing - toBall)).toBeLessThan(0.05)
    expect(Math.abs(justStopped - toBall)).toBeGreaterThan(0.2)
  })

  it('zeigt Passen, Annehmen und Schießen zur richtigen Zeit', () => {
    expect(timelinePoses(tl, 2.5, ctx).o9!.action).toBe('pass')
    const flight = tl.ball.find((s) => s.kind === 'flight' && s.toId === 'o7')!
    expect(timelinePoses(tl, flight.t1 - 0.2, ctx).o7!.action).toBe('receive')
    expect(timelinePoses(tl, 4.55, ctx).o7!).toMatchObject({ action: 'shoot' })
    expect(deg(timelinePoses(tl, 4.55, ctx).o7!.facing)).toBeGreaterThan(90)
    expect(timelinePoses(tl, 1, ctx).o9!.action).toBe('ready')
  })
})
