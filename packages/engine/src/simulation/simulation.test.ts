import { describe, expect, it } from 'vitest'
import { board, DEFENDING, MODEL, opp, own, PITCH } from '../test-utils'
import { planPlayout } from './playout'
import { compileScript, sampleTimeline, scriptEventSchema } from './timeline'

const parse = (events: unknown[]) => events.map((e) => scriptEventSchema.parse(e))

describe('Zeitleiste', () => {
  it('interpoliert Laufwege und hält Endpositionen', () => {
    const start = board([own('a', 10, 10), opp('b', 30, 30)], 'b')
    const tl = compileScript(start, parse([{ type: 'move', player: 'a', to: { x: 20, y: 10 }, at: 0, duration: 2 }]), MODEL)
    expect(sampleTimeline(tl, 0).state.players[0]!.pos.x).toBeCloseTo(10)
    expect(sampleTimeline(tl, 1).state.players[0]!.pos.x).toBeCloseTo(15)
    expect(sampleTimeline(tl, 5).state.players[0]!.pos.x).toBeCloseTo(20)
  })

  it('übergibt den Ball nach einem Pass an den Empfänger', () => {
    const start = board([opp('a', 10, 10), opp('b', 22, 10)], 'a')
    const tl = compileScript(start, parse([{ type: 'pass', from: 'a', to: 'b', at: 0.5 }]), MODEL)
    const mid = sampleTimeline(tl, 0.5 + 0.5)
    expect(mid.ballInFlight).toBe(true)
    const end = sampleTimeline(tl, tl.duration)
    expect(end.state.ball.ownerId).toBe('b')
    expect(end.state.ball.pos.x).toBeCloseTo(22)
  })

  it('spielt einen Pass zu einem Spieler, der sich noch bewegt, dorthin, wo er ankommt', () => {
    const start = board([opp('a', 10, 10), opp('b', 20, 10)], 'a')
    const tl = compileScript(
      start,
      parse([
        { type: 'move', player: 'b', to: { x: 20, y: 20 }, at: 0, duration: 2 },
        { type: 'pass', from: 'a', to: 'b', at: 1.5 },
      ]),
      MODEL,
    )
    const end = sampleTimeline(tl, tl.duration).state
    expect(end.ball.ownerId).toBe('b')
    expect(Math.abs(end.ball.pos.y - end.players[1]!.pos.y)).toBeLessThan(0.01)
  })
})

describe('Konsequenz-Simulation', () => {
  it('spielt zum freien Gegenspieler vor dem Tor, wenn alle zum Ball laufen', () => {
    // Drei unserer Spieler stehen am Ball, Gegner 7 steht frei im Zentrum.
    const state = board(
      [opp('o9', 28, 56), own('d1', 26.5, 57.5), own('d2', 29.5, 54.5), own('d3', 30, 58.5), opp('o7', 16, 36), own('gk', 1, 34, { role: 'GK' })],
      'o9',
    )
    const result = planPlayout(state, PITCH, DEFENDING, MODEL)
    expect(result.option?.targetId).toBe('o7')
    expect(result.outcome).toBe('goalChance')
  })

  it('fängt einen Pass ab, wenn der Passweg zugestellt ist und keine bessere Option existiert', () => {
    const state = board([opp('o9', 28, 56), own('d1', 26, 54.5), own('d2', 21, 45), opp('o7', 16, 36), own('gk', 1, 34, { role: 'GK' })], 'o9')
    const result = planPlayout(state, PITCH, DEFENDING, MODEL)
    expect(result.outcome).not.toBe('goalChance')
  })
})
