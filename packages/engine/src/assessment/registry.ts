import { z } from 'zod'
import { behindBall, cover, crowding, goalSide, pressure, reachInTime } from './criteria/defending'
import {
  distanceCriterion,
  passLane,
  passOptionsCriterion,
  selectFree,
  spacing,
  triangle,
  widthDepth,
} from './criteria/passing'
import {
  chainGaps,
  choice,
  compactness,
  freeSpacePoint,
  protectCentre,
  shiftTowardsBall,
} from './criteria/team'
import { groupDistance } from './criteria/group'
import type { CriterionDefinition } from './define'

/** Mehrsprachiger Text. Deutsch ist Pflicht, weitere Sprachen optional. */
export const localizedTextSchema = z
  .object({ de: z.string().min(1) })
  .catchall(z.string())
export type LocalizedText = z.infer<typeof localizedTextSchema>

const baseShape = {
  id: z.string().min(1),
  weight: z.number().positive().default(1),
  required: z.boolean().default(false),
  /** Prinzip-ID aus dem Kompetenzmodell, z. B. "P-STELLEN" */
  principle: z.string().optional(),
  /** Optionale szenariospezifische Texte, die die Standardtexte ersetzen */
  feedback: z
    .object({ pass: localizedTextSchema.optional(), fail: localizedTextSchema.optional() })
    .optional(),
}

function configSchema<K extends string, S extends z.ZodType>(def: CriterionDefinition<K, S>) {
  return z.object({ ...baseShape, kind: z.literal(def.kind), params: def.params })
}

export const criterionConfigSchema = z.discriminatedUnion('kind', [
  configSchema(passLane),
  configSchema(passOptionsCriterion),
  configSchema(selectFree),
  configSchema(spacing),
  configSchema(widthDepth),
  configSchema(triangle),
  configSchema(distanceCriterion),
  configSchema(groupDistance),
  configSchema(pressure),
  configSchema(cover),
  configSchema(reachInTime),
  configSchema(goalSide),
  configSchema(crowding),
  configSchema(behindBall),
  configSchema(chainGaps),
  configSchema(protectCentre),
  configSchema(shiftTowardsBall),
  configSchema(compactness),
  configSchema(freeSpacePoint),
  configSchema(choice),
])

/** Kriterium, wie es im Szenario notiert wird (Standardwerte optional). */
export type CriterionConfig = z.input<typeof criterionConfigSchema>
/** Kriterium nach Validierung (alle Standardwerte gesetzt). */
export type ParsedCriterionConfig = z.output<typeof criterionConfigSchema>
export type CriterionKind = ParsedCriterionConfig['kind']

const DEFINITIONS = [
  passLane,
  passOptionsCriterion,
  selectFree,
  spacing,
  widthDepth,
  triangle,
  distanceCriterion,
  groupDistance,
  pressure,
  cover,
  reachInTime,
  goalSide,
  crowding,
  behindBall,
  chainGaps,
  protectCentre,
  shiftTowardsBall,
  compactness,
  freeSpacePoint,
  choice,
] as const

const REGISTRY = new Map<string, CriterionDefinition<string, z.ZodType>>(
  DEFINITIONS.map((d) => [d.kind, d as unknown as CriterionDefinition<string, z.ZodType>]),
)

export function getCriterionDefinition(kind: string): CriterionDefinition<string, z.ZodType> {
  const def = REGISTRY.get(kind)
  if (!def) throw new Error(`Unbekanntes Bewertungskriterium: ${kind}`)
  return def
}

export function listCriterionKinds(): { kind: string; description: string }[] {
  return DEFINITIONS.map((d) => ({ kind: d.kind, description: d.description }))
}

export const assessmentConfigSchema = z.object({
  criteria: z.array(criterionConfigSchema).min(1),
  thresholds: z
    .object({ excellent: z.number().min(0).max(1).default(0.85), good: z.number().min(0).max(1).default(0.6) })
    .default({ excellent: 0.85, good: 0.6 }),
  /**
   * Fachlich vertretbare Alternativlösungen. Erfüllt ein Lernender die
   * Hauptkriterien nicht, aber eine Alternative, wird das als "gut" mit
   * eigener Erklärung gewertet.
   */
  alternatives: z
    .array(
      z.object({
        id: z.string().min(1),
        explanation: localizedTextSchema,
        criteria: z.array(criterionConfigSchema).min(1),
      }),
    )
    .default([]),
})

export type AssessmentConfig = z.input<typeof assessmentConfigSchema>
export type ParsedAssessmentConfig = z.output<typeof assessmentConfigSchema>
