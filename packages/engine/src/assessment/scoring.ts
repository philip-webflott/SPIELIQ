/**
 * Weiche Bewertungsfunktionen (0 … 1).
 *
 * Statt "richtig, wenn innerhalb von X Metern" liefern alle Kriterien einen
 * kontinuierlichen Wert mit einem Idealbereich und Toleranzzonen. Dadurch
 * gibt es keine willkürlichen Kanten, mehrere gute Lösungen werden
 * gleichwertig erkannt, und das Feedback kann "fast" von "weit weg" unterscheiden.
 */

export interface Band {
  /** Unterhalb dieses Werts: Score 0 (optional, sonst keine Untergrenze) */
  readonly min?: number
  /** Beginn des Idealbereichs */
  readonly idealMin?: number
  /** Ende des Idealbereichs */
  readonly idealMax?: number
  /** Oberhalb dieses Werts: Score 0 (optional, sonst keine Obergrenze) */
  readonly max?: number
}

export function bandScore(value: number, band: Band): number {
  const idealMin = band.idealMin ?? -Infinity
  const idealMax = band.idealMax ?? Infinity
  if (value >= idealMin && value <= idealMax) return 1
  if (value < idealMin) {
    const min = band.min ?? -Infinity
    if (!Number.isFinite(min)) return 1
    if (value <= min) return 0
    return (value - min) / (idealMin - min)
  }
  const max = band.max ?? Infinity
  if (!Number.isFinite(max)) return 1
  if (value >= max) return 0
  return (max - value) / (max - idealMax)
}

/** 1, wenn value ≥ ideal; 0, wenn value ≤ zero; dazwischen linear. */
export function atLeast(value: number, ideal: number, zero: number): number {
  if (value >= ideal) return 1
  if (value <= zero) return 0
  return (value - zero) / (ideal - zero)
}

/** 1, wenn value ≤ ideal; 0, wenn value ≥ zero; dazwischen linear. */
export function atMost(value: number, ideal: number, zero: number): number {
  if (value <= ideal) return 1
  if (value >= zero) return 0
  return (zero - value) / (zero - ideal)
}

export function weightedMean(items: readonly { score: number; weight: number }[]): number {
  let sum = 0
  let weights = 0
  for (const item of items) {
    sum += item.score * item.weight
    weights += item.weight
  }
  return weights > 0 ? sum / weights : 0
}

/** Klassifiziert einen Wert relativ zu einem Band – für verständliches Feedback ("zu nah", "zu weit"). */
export function bandPosition(value: number, band: Band): 'below' | 'ideal' | 'above' {
  if (band.idealMin !== undefined && value < band.idealMin) return 'below'
  if (band.idealMax !== undefined && value > band.idealMax) return 'above'
  return 'ideal'
}
