import type { PlayerState } from '../board/state'
import { centroid, distance, type Vec2 } from '../geometry/vec'

/**
 * Mannschaftstaktische Kennzahlen, angelehnt an gängige Positionsdaten-Metriken
 * (Mannschaftsschwerpunkt, Breite, Tiefe, Abstände benachbarter Spieler).
 */

export interface BlockShape {
  readonly centroid: Vec2
  /** Ausdehnung quer zum Spielfeld (y), m */
  readonly width: number
  /** Ausdehnung längs zum Spielfeld (x), m */
  readonly depth: number
}

export function blockShape(players: readonly PlayerState[]): BlockShape {
  if (players.length === 0) return { centroid: { x: 0, y: 0 }, width: 0, depth: 0 }
  const ys = players.map((p) => p.pos.y)
  const xs = players.map((p) => p.pos.x)
  return {
    centroid: centroid(players.map((p) => p.pos)),
    width: Math.max(...ys) - Math.min(...ys),
    depth: Math.max(...xs) - Math.min(...xs),
  }
}

export interface Gap {
  readonly leftId: string
  readonly rightId: string
  readonly distance: number
  readonly midpoint: Vec2
}

/** Abstände zwischen seitlich benachbarten Spielern einer Kette (sortiert nach y). */
export function lateralGaps(players: readonly PlayerState[]): Gap[] {
  const sorted = [...players].sort((a, b) => a.pos.y - b.pos.y)
  const gaps: Gap[] = []
  for (let i = 0; i < sorted.length - 1; i++) {
    const a = sorted[i]!
    const b = sorted[i + 1]!
    gaps.push({
      leftId: a.id,
      rightId: b.id,
      distance: distance(a.pos, b.pos),
      midpoint: { x: (a.pos.x + b.pos.x) / 2, y: (a.pos.y + b.pos.y) / 2 },
    })
  }
  return gaps
}

/** Kleinster Abstand zwischen zwei beliebigen Spielern einer Gruppe. */
export function minPairDistance(players: readonly PlayerState[]): { distance: number; a: string; b: string } | null {
  let best: { distance: number; a: string; b: string } | null = null
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      const d = distance(players[i]!.pos, players[j]!.pos)
      if (!best || d < best.distance) best = { distance: d, a: players[i]!.id, b: players[j]!.id }
    }
  }
  return best
}

export function nearestPlayer(players: readonly PlayerState[], point: Vec2): { player: PlayerState; distance: number } | null {
  let best: { player: PlayerState; distance: number } | null = null
  for (const p of players) {
    const d = distance(p.pos, point)
    if (!best || d < best.distance) best = { player: p, distance: d }
  }
  return best
}

/** Spieler, sortiert nach Abstand zu einem Punkt. */
export function byDistance(players: readonly PlayerState[], point: Vec2): PlayerState[] {
  return [...players].sort((a, b) => distance(a.pos, point) - distance(b.pos, point))
}
