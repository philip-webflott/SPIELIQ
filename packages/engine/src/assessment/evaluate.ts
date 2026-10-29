import { getCriterionDefinition, type ParsedAssessmentConfig, type ParsedCriterionConfig } from './registry'
import { weightedMean } from './scoring'
import type { AssessmentContext, AssessmentResult, CriterionResult, Rating } from './types'

export function evaluateCriteria(
  ctx: AssessmentContext,
  criteria: readonly ParsedCriterionConfig[],
): CriterionResult[] {
  return criteria.map((config) => {
    const def = getCriterionDefinition(config.kind)
    const outcome = def.evaluate(ctx, config.params)
    return {
      ...outcome,
      id: config.id,
      kind: config.kind,
      weight: config.weight,
      required: config.required,
      principle: config.principle ?? null,
    }
  })
}

function summarize(results: readonly CriterionResult[]): { score: number; requiredOk: boolean } {
  const applicable = results.filter((r) => !r.notApplicable)
  return {
    score: weightedMean(applicable),
    requiredOk: applicable.filter((r) => r.required).every((r) => r.passed),
  }
}

function improvementPotential(r: CriterionResult): number {
  return r.weight * (1 - r.score) + (r.required && !r.passed ? 100 : 0)
}

function pickPrimary(results: readonly CriterionResult[], rating: Rating): CriterionResult | null {
  const applicable = results.filter((r) => !r.notApplicable)
  if (applicable.length === 0) return null
  if (rating === 'excellent') {
    return applicable.find((r) => r.required) ?? [...applicable].sort((a, b) => b.weight - a.weight)[0] ?? null
  }
  if (rating === 'not-yet') {
    const failedRequired = applicable.find((r) => r.required && !r.passed)
    if (failedRequired) return failedRequired
  }
  const failed = applicable.filter((r) => !r.passed)
  const pool = failed.length > 0 ? failed : applicable
  return [...pool].sort((a, b) => improvementPotential(b) - improvementPotential(a))[0] ?? null
}

/**
 * Bewertet eine Spielsituation reproduzierbar und deterministisch.
 *
 * Regeln:
 * 1. Alle Pflichtkriterien müssen erfüllt sein.
 * 2. Der gewichtete Mittelwert entscheidet über "excellent" bzw. "good".
 * 3. Erfüllt die Lösung die Hauptkriterien nicht, werden dokumentierte
 *    Alternativen geprüft (mehrere fachlich gute Lösungen).
 */
export function evaluateAssessment(ctx: AssessmentContext, config: ParsedAssessmentConfig): AssessmentResult {
  const criteria = evaluateCriteria(ctx, config.criteria)
  const { score, requiredOk } = summarize(criteria)
  let rating: Rating =
    requiredOk && score >= config.thresholds.excellent ? 'excellent' : requiredOk && score >= config.thresholds.good ? 'good' : 'not-yet'
  let alternativeId: string | null = null

  if (rating === 'not-yet') {
    for (const alternative of config.alternatives) {
      const altResults = evaluateCriteria(ctx, alternative.criteria)
      const alt = summarize(altResults)
      if (alt.requiredOk && alt.score >= config.thresholds.good) {
        rating = 'good'
        alternativeId = alternative.id
        break
      }
    }
  }

  const principles: Record<string, boolean> = {}
  for (const r of criteria) {
    if (!r.principle || r.notApplicable) continue
    principles[r.principle] = (principles[r.principle] ?? true) && r.passed
  }
  if (alternativeId) {
    for (const key of Object.keys(principles)) principles[key] = true
  }

  return {
    rating,
    score,
    criteria,
    primary: pickPrimary(criteria, rating),
    alternativeId,
    principles,
  }
}
