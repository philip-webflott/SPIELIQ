import type { Vec2 } from '../geometry/vec'
import { createRandom } from '../random'
import { assessStep, getStep, type LoadedMission } from './runtime'
import type { Rect } from './schema'

/**
 * Qualitätswerkzeuge für Content-Autoren und CI:
 * - Wie oft besteht man eine Aufgabe durch zufälliges Platzieren?
 * - Ist eine (gespiegelte/variierte) Situation überhaupt lösbar?
 */

function samplingArea(loaded: LoadedMission, stepIndex: number): Rect {
  const step = getStep(loaded, stepIndex)
  if (step.kind === 'place' && step.area) return step.area
  const view = step.view ?? loaded.mission.view
  if (view) {
    return {
      min: { x: Math.max(0, view.x), y: Math.max(0, view.y) },
      max: { x: Math.min(loaded.pitch.length, view.x + view.width), y: Math.min(loaded.pitch.width, view.y + view.height) },
    }
  }
  return { min: { x: 0, y: 0 }, max: { x: loaded.pitch.length, y: loaded.pitch.width } }
}

function randomPoint(rand: () => number, area: Rect): Vec2 {
  return {
    x: area.min.x + rand() * (area.max.x - area.min.x),
    y: area.min.y + rand() * (area.max.y - area.min.y),
  }
}

export interface PassRateReport {
  readonly samples: number
  readonly passed: number
  readonly rate: number
}

/** Anteil zufälliger Platzierungen, die mindestens als "gut" gewertet würden. */
export function randomPlacementPassRate(
  loaded: LoadedMission,
  stepIndex: number,
  options: { samples?: number; seed?: number } = {},
): PassRateReport {
  const step = getStep(loaded, stepIndex)
  if (step.kind !== 'place') throw new Error('Nur für Platzierungsaufgaben')
  const samples = options.samples ?? 400
  const rand = createRandom(options.seed ?? 7)
  const area = samplingArea(loaded, stepIndex)
  let passed = 0
  for (let i = 0; i < samples; i++) {
    const positions: Record<string, Vec2> = {}
    for (const id of step.controlled) positions[id] = randomPoint(rand, area)
    if (assessStep(loaded, stepIndex, { positions }).rating !== 'not-yet') passed++
  }
  return { samples, passed, rate: passed / samples }
}

/** Ratewahrscheinlichkeit einer Antipp- oder Auswahlaufgabe. */
export function guessRate(loaded: LoadedMission, stepIndex: number): number {
  const step = getStep(loaded, stepIndex)
  if (step.kind === 'choose') {
    const ok = step.options.filter((o) => assessStep(loaded, stepIndex, { selection: { optionId: o.id } }).rating !== 'not-yet')
    return ok.length / step.options.length
  }
  if (step.kind === 'identify' && step.target === 'player') {
    const board = loaded.boards[stepIndex]!
    const candidates = step.selectable.length > 0 ? step.selectable : board.players.map((p) => p.id)
    const ok = candidates.filter((id) => assessStep(loaded, stepIndex, { selection: { playerId: id } }).rating !== 'not-yet')
    return ok.length / candidates.length
  }
  throw new Error('Nur für Auswahl- und Antippaufgaben')
}

/**
 * Sucht eine Lösung durch Zufallsstarts und lokale Verbesserung
 * (Hill-Climbing). Dient als Lösbarkeitsnachweis für Varianten.
 */
export function searchSolution(
  loaded: LoadedMission,
  stepIndex: number,
  options: { restarts?: number; iterations?: number; seed?: number } = {},
): { positions: Record<string, Vec2>; score: number; rating: string } | null {
  const step = getStep(loaded, stepIndex)
  if (step.kind !== 'place') throw new Error('Nur für Platzierungsaufgaben')
  const rand = createRandom(options.seed ?? 11)
  const area = samplingArea(loaded, stepIndex)
  let best: { positions: Record<string, Vec2>; score: number; rating: string } | null = null
  const evaluate = (positions: Record<string, Vec2>) => {
    const r = assessStep(loaded, stepIndex, { positions })
    const bonus = r.rating === 'excellent' ? 2 : r.rating === 'good' ? 1 : 0
    return { score: r.score + bonus, rating: r.rating }
  }
  for (let restart = 0; restart < (options.restarts ?? 12); restart++) {
    let positions: Record<string, Vec2> = {}
    for (const id of step.controlled) positions[id] = randomPoint(rand, area)
    let current = evaluate(positions)
    let stepSize = 6
    for (let it = 0; it < (options.iterations ?? 300); it++) {
      const id = step.controlled[Math.floor(rand() * step.controlled.length)]!
      const p = positions[id]!
      const candidate = {
        ...positions,
        [id]: {
          x: Math.min(area.max.x, Math.max(area.min.x, p.x + (rand() - 0.5) * 2 * stepSize)),
          y: Math.min(area.max.y, Math.max(area.min.y, p.y + (rand() - 0.5) * 2 * stepSize)),
        },
      }
      const value = evaluate(candidate)
      if (value.score >= current.score) {
        positions = candidate
        current = value
      }
      if (it % 60 === 59) stepSize = Math.max(0.5, stepSize * 0.6)
    }
    if (!best || current.score > best.score) best = { positions, score: current.score, rating: current.rating }
    if (best.rating === 'excellent') break
  }
  return best && best.rating !== 'not-yet' ? best : null
}
