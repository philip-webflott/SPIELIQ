import type { Vec2 } from '../geometry/vec'

/**
 * Spielfeldbeschreibung. Alle Maße in Metern.
 *
 * Die Engine kennt nur Geometrie; Bezeichnungen (z. B. "Funino-Feld") liegen im
 * Content-Paket, damit die Engine sprachneutral bleibt.
 */
export type PitchMarkings = 'full' | 'small' | 'minigoals' | 'none'

export interface GoalSpec {
  readonly id: string
  /** Mittelpunkt der Torlinie des Tores */
  readonly center: Vec2
  /** Innenbreite des Tores (Pfosten zu Pfosten) */
  readonly width: number
  /** +1: Tor steht auf der linken Torlinie und öffnet sich nach +x; -1: rechte Torlinie */
  readonly opensTowards: 1 | -1
}

export interface PitchSpec {
  readonly id: string
  readonly length: number
  readonly width: number
  readonly markings: PitchMarkings
  readonly goals: readonly GoalSpec[]
  readonly penaltyArea?: { readonly depth: number; readonly width: number }
  readonly goalArea?: { readonly depth: number; readonly width: number }
  readonly centerCircleRadius?: number
  readonly penaltySpotDistance?: number
}

/** Großfeld nach den internationalen Regeln (übliche Maße 105 × 68 m). */
export function fullPitch(length = 105, width = 68): PitchSpec {
  return {
    id: 'full-11',
    length,
    width,
    markings: 'full',
    goals: [
      { id: 'left', center: { x: 0, y: width / 2 }, width: 7.32, opensTowards: 1 },
      { id: 'right', center: { x: length, y: width / 2 }, width: 7.32, opensTowards: -1 },
    ],
    penaltyArea: { depth: 16.5, width: 40.32 },
    goalArea: { depth: 5.5, width: 18.32 },
    centerCircleRadius: 9.15,
    penaltySpotDistance: 11,
  }
}

/** Kleinfeld mit zwei Toren (z. B. 5 × 2 m Jugendtore). Strafraummaße optional. */
export function smallPitch(
  id: string,
  length: number,
  width: number,
  goalWidth: number,
  penaltyArea?: { depth: number; width: number },
): PitchSpec {
  return {
    id,
    length,
    width,
    markings: 'small',
    goals: [
      { id: 'left', center: { x: 0, y: width / 2 }, width: goalWidth, opensTowards: 1 },
      { id: 'right', center: { x: length, y: width / 2 }, width: goalWidth, opensTowards: -1 },
    ],
    ...(penaltyArea ? { penaltyArea } : {}),
    centerCircleRadius: Math.min(length, width) * 0.12,
  }
}

/**
 * Feld mit vier Minitoren (zwei pro Torlinie), wie es in den Spielformen des
 * Kinderfußballs verwendet wird. Die Tore stehen jeweils in einem Abstand
 * `goalInset` von der Seitenlinie.
 */
export function miniGoalPitch(
  id: string,
  length: number,
  width: number,
  goalWidth = 1.2,
  goalInset = width * 0.2,
): PitchSpec {
  return {
    id,
    length,
    width,
    markings: 'minigoals',
    goals: [
      { id: 'left-top', center: { x: 0, y: goalInset }, width: goalWidth, opensTowards: 1 },
      { id: 'left-bottom', center: { x: 0, y: width - goalInset }, width: goalWidth, opensTowards: 1 },
      { id: 'right-top', center: { x: length, y: goalInset }, width: goalWidth, opensTowards: -1 },
      { id: 'right-bottom', center: { x: length, y: width - goalInset }, width: goalWidth, opensTowards: -1 },
    ],
  }
}

export function isInsidePitch(pitch: PitchSpec, p: Vec2, margin = 0): boolean {
  return p.x >= -margin && p.x <= pitch.length + margin && p.y >= -margin && p.y <= pitch.width + margin
}

export function clampToPitch(pitch: PitchSpec, p: Vec2, margin = 0): Vec2 {
  return {
    x: Math.min(pitch.length + margin, Math.max(-margin, p.x)),
    y: Math.min(pitch.width + margin, Math.max(-margin, p.y)),
  }
}

/** Rechteckiger Ausschnitt eines Spielfelds, z. B. für Zoom-Ansichten. */
export interface PitchWindow {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
}

export function fullWindow(pitch: PitchSpec, margin = 3): PitchWindow {
  return { x: -margin, y: -margin, width: pitch.length + 2 * margin, height: pitch.width + 2 * margin }
}
