import type { Rating } from '@spieliq/engine'
import { COMPETENCIES, type Competency } from './curriculum'
import { MISSION_INPUTS } from './missions'

/**
 * Fortschrittsregeln (reine Funktionen, von Server und Tests genutzt)
 * ==================================================================
 * SPIELIQ unterscheidet ausdrücklich drei Dinge:
 * 1. bearbeitet         – mindestens eine Aufgabe zu dieser Kompetenz gelöst oder versucht
 * 2. digital verstanden – in mindestens ZWEI verschiedenen Situationen ohne
 *                         Hinweise gelöst, davon mindestens eine Transfer- oder
 *                         Testsituation (neue Lage, keine Hilfen)
 * 3. auf dem Platz angewendet – nur durch eine Trainerbeobachtung im Training
 *
 * Ein digital bestandener Test ist kein Beweis für richtiges Verhalten im Spiel;
 * deshalb ist (3) unabhängig von (2) und wird nie automatisch gesetzt.
 */

export interface AttemptFact {
  readonly missionId: string
  readonly stepId: string
  readonly rating: Rating
  readonly principles: Readonly<Record<string, boolean>>
  readonly hintsUsed: number
  readonly createdAt: Date
}

export interface ObservationFact {
  readonly principleId: string
  readonly rating: 'NOT_OBSERVED' | 'EMERGING' | 'CONSISTENT'
  readonly observedOn: Date
}

export interface CompetencyProgress {
  readonly competencyId: string
  readonly practised: boolean
  readonly understood: boolean
  readonly applied: boolean
  /** Anzahl verschiedener Situationen, die ohne Hinweise gelöst wurden */
  readonly independentSituations: number
  readonly transferSituations: number
  readonly lastPractisedAt: Date | null
  /** Empfehlung zur Wiederholung (verteiltes Üben) */
  readonly reviewDue: boolean
}

const REVIEW_AFTER_DAYS = 7

const missionRole = new Map(MISSION_INPUTS.map((m) => [m.id, m.role ?? 'practice']))
const missionCompetencies = new Map(MISSION_INPUTS.map((m) => [m.id, m.competencies]))

function coversCompetency(attempt: AttemptFact, competency: Competency): boolean {
  if (!missionCompetencies.get(attempt.missionId)?.includes(competency.id)) return false
  const relevant = competency.principles.filter((p) => p in attempt.principles)
  // Ohne Prinzipbezug (z. B. Orientierung) zählt die Zuordnung der Mission.
  return relevant.length === 0 ? attempt.rating !== 'not-yet' : relevant.every((p) => attempt.principles[p] === true)
}

export function competencyProgress(
  competency: Competency,
  attempts: readonly AttemptFact[],
  observations: readonly ObservationFact[],
  now: Date = new Date(),
): CompetencyProgress {
  const related = attempts.filter((a) => missionCompetencies.get(a.missionId)?.includes(competency.id))
  const independent = related.filter((a) => a.rating !== 'not-yet' && a.hintsUsed === 0 && coversCompetency(a, competency))
  const situations = new Set(independent.map((a) => `${a.missionId}/${a.stepId}`))
  const transfer = new Set(
    independent
      .filter((a) => {
        const role = missionRole.get(a.missionId)
        return role === 'transfer' || role === 'test'
      })
      .map((a) => `${a.missionId}/${a.stepId}`),
  )
  const understood = situations.size >= 2 && transfer.size >= 1
  const last = related.reduce<Date | null>((acc, a) => (!acc || a.createdAt > acc ? a.createdAt : acc), null)
  const applied = observations.some((o) => competency.principles.includes(o.principleId) && o.rating === 'CONSISTENT')
  const reviewDue = understood && last !== null && now.getTime() - last.getTime() > REVIEW_AFTER_DAYS * 24 * 3600 * 1000
  return {
    competencyId: competency.id,
    practised: related.length > 0,
    understood,
    applied,
    independentSituations: situations.size,
    transferSituations: transfer.size,
    lastPractisedAt: last,
    reviewDue,
  }
}

export function allCompetencyProgress(
  attempts: readonly AttemptFact[],
  observations: readonly ObservationFact[],
  now: Date = new Date(),
): CompetencyProgress[] {
  return COMPETENCIES.filter((c) => c.status === 'verfügbar').map((c) => competencyProgress(c, attempts, observations, now))
}

/** Zusammenfassung je Prinzip über alle Versuche (für Abschlussansicht und Trainer). */
export function principleSummary(attempts: readonly AttemptFact[]): Record<string, { passed: number; failed: number }> {
  const out: Record<string, { passed: number; failed: number }> = {}
  for (const a of attempts) {
    for (const [p, ok] of Object.entries(a.principles)) {
      const entry = (out[p] ??= { passed: 0, failed: 0 })
      if (ok) entry.passed++
      else entry.failed++
    }
  }
  return out
}
