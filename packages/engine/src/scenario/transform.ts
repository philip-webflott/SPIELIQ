import type { Vec2 } from '../geometry/vec'
import { missionSchema, type Mission } from './schema'

/**
 * Situationsvarianten für den Transfer: Dieselbe Spielidee erscheint
 * gespiegelt (linke/rechte Seite). So lernt der Spieler ein Prinzip statt
 * einer auswendig gelernten Kreisposition. Spiegelungen erhalten alle
 * geometrischen Beziehungen exakt – die Bewertung bleibt gültig.
 */

function isVec(value: unknown): value is Vec2 {
  if (typeof value !== 'object' || value === null) return false
  const keys = Object.keys(value)
  return keys.length === 2 && typeof (value as Vec2).x === 'number' && typeof (value as Vec2).y === 'number'
}

function isRect(value: unknown): value is { min: Vec2; max: Vec2 } {
  if (typeof value !== 'object' || value === null) return false
  const v = value as { min?: unknown; max?: unknown }
  return isVec(v.min) && isVec(v.max) && Object.keys(value).length === 2
}

function mapDeep(value: unknown, fn: (v: Vec2) => Vec2, key: string | null, pitchWidth: number): unknown {
  if (Array.isArray(value)) return value.map((v) => mapDeep(v, fn, null, pitchWidth))
  if (isVec(value)) return fn(value)
  if (isRect(value)) {
    const a = fn(value.min)
    const b = fn(value.max)
    return {
      min: { x: Math.min(a.x, b.x), y: Math.min(a.y, b.y) },
      max: { x: Math.max(a.x, b.x), y: Math.max(a.y, b.y) },
    }
  }
  if (typeof value === 'object' && value !== null) {
    if (key === 'view') {
      const v = value as { x: number; y: number; width: number; height: number }
      return { ...v, y: pitchWidth - v.y - v.height }
    }
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) out[k] = mapDeep(v, fn, k, pitchWidth)
    return out
  }
  return value
}

/** Spiegelt eine Mission an der Längsachse des Spielfelds (oben ↔ unten). */
export function mirrorMission(mission: Mission, pitchWidth: number): Mission {
  const mirrored = mapDeep(mission, (v) => ({ x: v.x, y: pitchWidth - v.y }), null, pitchWidth)
  return missionSchema.parse(mirrored)
}
