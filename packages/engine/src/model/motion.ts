/**
 * Vereinfachtes Bewegungsmodell für Passweg- und Zeitberechnungen.
 *
 * WICHTIG: Die Werte sind dokumentierte Modellannahmen (siehe
 * docs/konzept/engine.md, Abschnitt "Modellparameter"), keine Messwerte.
 * Sie sollen Größenordnungen abbilden, damit Ursache und Wirkung plausibel
 * werden ("bin ich rechtzeitig da?"). Sie müssen mit Trainern und – wo möglich –
 * mit Daten kalibriert werden.
 */
export interface MotionModel {
  /** Effektive Laufgeschwindigkeit über kurze Distanzen inkl. Beschleunigung, m/s */
  readonly playerSpeed: number
  /** Reaktionszeit, bevor ein Spieler auf einen Pass reagiert, s */
  readonly reactionTime: number
  /** Reichweite (Bein/Körper), innerhalb derer ein Ball erreicht werden kann, m */
  readonly reachRadius: number
  /** Zeit, um einen Ball innerhalb der eigenen Reichweite abzublocken, s */
  readonly blockTime: number
  /**
   * Durchschnittliche Geschwindigkeit eines kurzen flachen Passes (≈ 10 m), m/s.
   * Längere Pässe werden schärfer gespielt, siehe `passSpeedFor`.
   */
  readonly passSpeed: number
  /** Zusätzliche Ballgeschwindigkeit pro Meter Passlänge über 10 m, m/s je m */
  readonly passSpeedGain: number
  /** Obergrenze der durchschnittlichen Ballgeschwindigkeit (scharfer Pass/Spielverlagerung), m/s */
  readonly maxPassSpeed: number
  /** Abstand, ab dem ein Gegenspieler den Ballführenden unter Druck setzt, m */
  readonly pressureDistance: number
}

export type AgeProfile = 'U9' | 'U11' | 'U13' | 'U15' | 'U17' | 'U19'

export const MOTION_PROFILES: Readonly<Record<AgeProfile, MotionModel>> = {
  U9: { playerSpeed: 4.0, reactionTime: 0.4, reachRadius: 0.9, blockTime: 0.15, passSpeed: 7, passSpeedGain: 0.15, maxPassSpeed: 10, pressureDistance: 2.0 },
  U11: { playerSpeed: 4.5, reactionTime: 0.35, reachRadius: 1.0, blockTime: 0.12, passSpeed: 8.5, passSpeedGain: 0.2, maxPassSpeed: 13, pressureDistance: 2.0 },
  U13: { playerSpeed: 5.0, reactionTime: 0.33, reachRadius: 1.1, blockTime: 0.12, passSpeed: 10.5, passSpeedGain: 0.22, maxPassSpeed: 15.5, pressureDistance: 2.5 },
  U15: { playerSpeed: 5.5, reactionTime: 0.3, reachRadius: 1.2, blockTime: 0.1, passSpeed: 12, passSpeedGain: 0.25, maxPassSpeed: 18, pressureDistance: 2.5 },
  U17: { playerSpeed: 5.8, reactionTime: 0.28, reachRadius: 1.25, blockTime: 0.1, passSpeed: 13, passSpeedGain: 0.27, maxPassSpeed: 20, pressureDistance: 3.0 },
  U19: { playerSpeed: 6.0, reactionTime: 0.26, reachRadius: 1.3, blockTime: 0.1, passSpeed: 14, passSpeedGain: 0.28, maxPassSpeed: 22, pressureDistance: 3.0 },
}

export const DEFAULT_PROFILE: AgeProfile = 'U15'

export function motionModel(profile: AgeProfile = DEFAULT_PROFILE, overrides?: Partial<MotionModel>): MotionModel {
  return { ...MOTION_PROFILES[profile], ...overrides }
}

/**
 * Zeit, die ein Spieler benötigt, um einen Punkt bis auf `arriveWithin` Meter
 * zu erreichen (Reaktionszeit + Laufzeit). Steht er schon nah genug, ist die Zeit 0.
 */
export function timeToReach(
  model: MotionModel,
  from: { x: number; y: number },
  to: { x: number; y: number },
  arriveWithin = 0,
): number {
  const dist = Math.hypot(to.x - from.x, to.y - from.y) - arriveWithin
  if (dist <= 0) return 0
  return model.reactionTime + dist / model.playerSpeed
}

/**
 * Durchschnittliche Ballgeschwindigkeit für einen Pass dieser Länge: Spieler
 * dosieren den Pass – kurze Pässe ruhiger, lange Pässe und Spielverlagerungen schärfer.
 */
export function passSpeedFor(model: MotionModel, distanceMeters: number): number {
  return Math.min(model.maxPassSpeed, model.passSpeed + Math.max(0, distanceMeters - 10) * model.passSpeedGain)
}

export function ballTravelTime(model: MotionModel, distanceMeters: number): number {
  return distanceMeters / passSpeedFor(model, distanceMeters)
}
