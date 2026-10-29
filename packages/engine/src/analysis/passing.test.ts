import { describe, expect, it } from 'vitest'
import { board, MODEL, opp, own } from '../test-utils'
import { analyzePass, analyzeReception, coverShadow, isFreeForPass, passOptions } from './passing'

describe('Passweg-Analyse (zeitbasiertes Abfangmodell)', () => {
  it('erkennt einen freien Passweg ohne Gegenspieler in der Nähe', () => {
    const state = board([own('a', 50, 34), own('b', 65, 34), opp('x', 58, 50)], 'a')
    const pass = analyzePass(state, 'a', 'b', MODEL)
    expect(pass.status).toBe('open')
    expect(pass.margin).toBeGreaterThan(0.25)
  })

  it('erkennt einen zugestellten Passweg, wenn ein Gegenspieler in der Passlinie steht', () => {
    const state = board([own('a', 50, 34), own('b', 65, 34), opp('x', 57, 34.5)], 'a')
    const pass = analyzePass(state, 'a', 'b', MODEL)
    expect(pass.status).toBe('blocked')
    expect(pass.interceptorId).toBe('x')
  })

  it('erzeugt einen Deckungsschatten hinter einem anlaufenden Verteidiger', () => {
    // Verteidiger 2 m vor dem Ballführenden, Mitspieler genau dahinter
    const state = board([own('a', 50, 34), own('b', 62, 34.8), opp('x', 52, 34)], 'a')
    expect(analyzePass(state, 'a', 'b', MODEL).status).toBe('blocked')
    expect(coverShadow({ x: 50, y: 34 }, state.players[2]!, MODEL)).not.toBeNull()
  })

  it('gibt Verteidigern bei langen Pässen mehr Zeit (gleicher seitlicher Abstand)', () => {
    const short = board([own('a', 50, 34), own('b', 60, 34), opp('x', 55, 39)], 'a')
    const long = board([own('a', 50, 34), own('b', 85, 34), opp('x', 67.5, 39)], 'a')
    const shortPass = analyzePass(short, 'a', 'b', MODEL)
    const longPass = analyzePass(long, 'a', 'b', MODEL)
    expect(shortPass.margin).toBeGreaterThan(longPass.margin)
    expect(longPass.status).not.toBe('open')
  })

  it('verringert den Zeitvorsprung, je näher der Verteidiger an die Passlinie rückt', () => {
    const margins = [9, 6, 3, 1].map((offset) => {
      const state = board([own('a', 50, 34), own('b', 70, 34), opp('x', 60, 34 + offset)], 'a')
      return analyzePass(state, 'a', 'b', MODEL).margin
    })
    for (let i = 1; i < margins.length; i++) expect(margins[i]!).toBeLessThan(margins[i - 1]!)
  })

  it('listet alle Passoptionen eines Ballführenden', () => {
    const state = board([own('a', 50, 34), own('b', 60, 25), own('c', 60, 43), opp('x', 55, 30)], 'a')
    expect(passOptions(state, 'a', MODEL)).toHaveLength(2)
  })
})

describe('Freie Anspielstationen', () => {
  it('ein Empfänger mit Gegenspieler direkt daneben ist nicht frei', () => {
    const state = board([opp('c', 40, 50), opp('r', 30, 40), own('d', 31, 41.5)], 'c')
    expect(analyzeReception(state, 'c', 'r', MODEL).timeOnBall).toBeLessThan(0)
    expect(isFreeForPass(state, 'c', 'r', MODEL)).toBe(false)
  })

  it('ein Empfänger ohne Gegenspieler im Umkreis ist frei', () => {
    const state = board([opp('c', 40, 50), opp('r', 30, 20), own('d', 38, 52)], 'c')
    expect(isFreeForPass(state, 'c', 'r', MODEL)).toBe(true)
  })
})
