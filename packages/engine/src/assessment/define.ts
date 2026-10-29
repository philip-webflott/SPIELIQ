import type { z } from 'zod'
import type { AssessmentContext, CriterionOutcome } from './types'

/**
 * Ein Kriterium ist eine reine Funktion (Kontext, Parameter) → Ergebnis.
 * Die Parameter werden über ein zod-Schema validiert, damit auch von Trainern
 * erstellte Szenarien (Editor) zur Laufzeit sicher geprüft werden können.
 */
export interface CriterionDefinition<K extends string, S extends z.ZodType> {
  readonly kind: K
  readonly params: S
  /** Kurzbeschreibung für Entwickler und Content-Autoren (nicht für Spieler) */
  readonly description: string
  evaluate(ctx: AssessmentContext, params: z.output<S>): CriterionOutcome
}

export function defineCriterion<K extends string, S extends z.ZodType>(
  definition: CriterionDefinition<K, S>,
): CriterionDefinition<K, S> {
  return definition
}

export function notApplicable(feedbackKey = 'common.notApplicable'): CriterionOutcome {
  return { score: 1, passed: true, feedbackKey, evidence: [], notApplicable: true }
}

export function missingEntity(what: string): CriterionOutcome {
  return {
    score: 0,
    passed: false,
    feedbackKey: 'common.missingEntity',
    feedbackParams: { what },
    evidence: [],
    notApplicable: true,
  }
}
