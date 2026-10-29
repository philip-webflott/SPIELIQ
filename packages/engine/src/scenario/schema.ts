import { z } from 'zod'
import { assessmentConfigSchema, localizedTextSchema } from '../assessment/registry'
import { scriptEventSchema, vec2Schema } from '../simulation/timeline'

/**
 * SZENARIO-/MISSIONSFORMAT (Version 1)
 * ===================================
 * Ein einziges, datengetriebenes Format für offizielle Lernmissionen und
 * (später) vom Trainer im Editor erstellte Szenarien. Es enthält keine
 * Programmlogik, nur Daten: Spielfeld, Spieler, Bewegungsskripte,
 * Interaktionen, Bewertungskriterien, Texte, Quellen und Freigabestatus.
 * Dokumentation: docs/konzept/szenarioformat.md
 */

export const ageGroupSchema = z.enum(['G', 'F', 'E', 'D', 'C', 'B', 'A'])
export type AgeGroup = z.infer<typeof ageGroupSchema>

export const ageProfileSchema = z.enum(['U9', 'U11', 'U13', 'U15', 'U17', 'U19'])

export const toneSchema = z.enum(['good', 'warn', 'bad', 'info'])

const pointRefSchema = z.union([z.string().min(1), vec2Schema])
export type PointRef = z.infer<typeof pointRefSchema>

export const overlaySchema = z.discriminatedUnion('type', [
  /** Einzelner Passweg; Status (offen/riskant/zu) wird live berechnet */
  z.object({ type: z.literal('lane'), from: z.string(), to: z.string() }),
  /** Alle Passwege eines Spielers zu seinen Mitspielern */
  z.object({ type: z.literal('passOptions'), from: z.string() }),
  /** Freier Raum um einen Spieler (Radius = Abstand zum nächsten Gegenspieler) */
  z.object({ type: z.literal('freeSpace'), around: z.string() }),
  /** Deckungsschatten eines Verteidigers aus Sicht des Balls */
  z.object({ type: z.literal('shadow'), defender: z.string() }),
  z.object({ type: z.literal('zone'), polygon: z.array(vec2Schema).min(3), tone: toneSchema.default('info') }),
  z.object({
    type: z.literal('arrow'),
    from: pointRefSchema,
    to: pointRefSchema,
    tone: toneSchema.default('info'),
    dashed: z.boolean().default(true),
  }),
  z.object({ type: z.literal('ring'), player: z.string(), tone: toneSchema.default('info') }),
  z.object({ type: z.literal('distance'), a: z.string(), b: z.string() }),
  z.object({ type: z.literal('label'), at: pointRefSchema, text: localizedTextSchema }),
  /** Verlassener Raum, z. B. nachdem alle zum Ball gelaufen sind */
  z.object({ type: z.literal('emptyArea'), center: vec2Schema, radius: z.number().positive() }),
])
export type Overlay = z.output<typeof overlaySchema>

export const playerInputSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+$/, 'Spieler-IDs bestehen aus Kleinbuchstaben und Ziffern'),
  team: z.enum(['own', 'opp']),
  pos: vec2Schema,
  label: z.string().max(3).optional(),
  role: z.enum(['GK', 'DEF', 'MID', 'FWD']).optional(),
})

export const boardInputSchema = z.object({
  players: z.array(playerInputSchema).min(1),
  ball: z.object({ ownerId: z.string().nullable(), pos: vec2Schema.optional() }),
})
export type BoardInput = z.input<typeof boardInputSchema>

export const rectSchema = z.object({ min: vec2Schema, max: vec2Schema })
export type Rect = z.infer<typeof rectSchema>

export const pitchConfigSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('full'), length: z.number().positive().default(105), width: z.number().positive().default(68) }),
  z.object({
    kind: z.literal('small'),
    id: z.string(),
    length: z.number().positive(),
    width: z.number().positive(),
    goalWidth: z.number().positive(),
    penaltyArea: z.object({ depth: z.number().positive(), width: z.number().positive() }).optional(),
  }),
  z.object({
    kind: z.literal('minigoals'),
    id: z.string(),
    length: z.number().positive(),
    width: z.number().positive(),
    goalWidth: z.number().positive().default(1.2),
    goalInset: z.number().positive().optional(),
  }),
])

const consequenceSchema = z
  .union([z.literal('auto'), z.literal('none'), z.object({ script: z.array(scriptEventSchema).min(1) })])
  .default('auto')

const stepFeedbackSchema = z
  .object({
    excellent: localizedTextSchema.optional(),
    good: localizedTextSchema.optional(),
    notYet: localizedTextSchema.optional(),
  })
  .default({})

const exampleSchema = z.object({
  name: z.string(),
  positions: z.record(z.string(), vec2Schema).default({}),
  selection: z
    .object({ playerId: z.string().optional(), point: vec2Schema.optional(), optionId: z.string().optional() })
    .optional(),
  /** Erwartete Wertung – wird in den Content-Tests geprüft */
  expect: z.enum(['excellent', 'good', 'not-yet', 'pass']),
  /** Optional: erwarteter Feedback-Schlüssel des wichtigsten Kriteriums */
  expectFeedback: z.string().optional(),
})

const viewSchema = z.object({ x: z.number(), y: z.number(), width: z.number().positive(), height: z.number().positive() })

const stepBase = {
  id: z.string().regex(/^[a-z0-9-]+$/),
  /** Ein kurzer Satz – was soll der Spieler tun? */
  instruction: localizedTextSchema,
  /** Optionaler Bildausschnitt für diesen Schritt (sonst der der Mission) */
  view: viewSchema.optional(),
  /** Neue Ausgangssituation für diesen Schritt (sonst Fortsetzung des vorherigen) */
  board: boardInputSchema.optional(),
  overlays: z.array(overlaySchema).default([]),
}

const interactiveBase = {
  assessment: assessmentConfigSchema,
  feedback: stepFeedbackSchema,
  /** Gestufte Hinweise (im Testmodus ausgeblendet) */
  hints: z.array(localizedTextSchema).max(3).default([]),
  consequence: consequenceSchema,
  examples: z.array(exampleSchema).default([]),
  /** Optionales Zeitlimit für Entscheidungen unter Zeitdruck (s); immer abschaltbar (Barrierefreiheit) */
  timeLimit: z.number().positive().optional(),
}

export const watchStepSchema = z.object({
  ...stepBase,
  kind: z.literal('watch'),
  script: z.array(scriptEventSchema).min(1),
  /** Nach der Animation eingeblendete Erklärung und Visualisierung */
  after: z.object({ caption: localizedTextSchema, overlays: z.array(overlaySchema).default([]) }).optional(),
})

export const explainStepSchema = z.object({
  ...stepBase,
  kind: z.literal('explain'),
  text: localizedTextSchema,
  /** Optionale Animation (z. B. die bessere Lösung) */
  script: z.array(scriptEventSchema).default([]),
  keyPoints: z.array(localizedTextSchema).max(3).default([]),
})

export const identifyStepSchema = z.object({
  ...stepBase,
  ...interactiveBase,
  kind: z.literal('identify'),
  target: z.enum(['player', 'point']),
  /** Antippbare Spieler (leer = alle der Zielmannschaft) */
  selectable: z.array(z.string()).default([]),
})

export const placeStepSchema = z.object({
  ...stepBase,
  ...interactiveBase,
  kind: z.literal('place'),
  /** Spieler, die der Lernende bewegen darf */
  controlled: z.array(z.string()).min(1),
  /** Erlaubter Bewegungsbereich (Standard: ganzes Feld) */
  area: rectSchema.optional(),
  /** Mindestens eine Musterlösung (wird nach mehreren Versuchen gezeigt) */
  solution: z.record(z.string(), vec2Schema),
  /** Passwege während des Ziehens live anzeigen (Lernmodus) */
  liveLanes: z.boolean().default(false),
})

export const chooseStepSchema = z.object({
  ...stepBase,
  ...interactiveBase,
  kind: z.literal('choose'),
  options: z.array(z.object({ id: z.string(), label: localizedTextSchema })).min(2).max(4),
})

export const stepSchema = z.discriminatedUnion('kind', [
  watchStepSchema,
  explainStepSchema,
  identifyStepSchema,
  placeStepSchema,
  chooseStepSchema,
])

export type StepInput = z.input<typeof stepSchema>
export type Step = z.output<typeof stepSchema>
export type InteractiveStep = Extract<Step, { kind: 'identify' | 'place' | 'choose' }>

export const missionSchema = z.object({
  schemaVersion: z.literal(1),
  id: z.string().regex(/^[a-z0-9-]+$/),
  version: z.number().int().positive(),
  status: z.enum(['draft', 'review', 'approved', 'retired']),
  title: localizedTextSchema,
  /** Lernziel in Spielersprache, ein Satz */
  goal: localizedTextSchema,
  /** Fachliche Einordnung für Trainer */
  coachNote: localizedTextSchema.optional(),
  principles: z.array(z.string()).min(1),
  competencies: z.array(z.string()).min(1),
  ageGroups: z.array(ageGroupSchema).min(1),
  level: z.number().int().min(1).max(5),
  estimatedMinutes: z.number().positive(),
  prerequisites: z.array(z.string()).default([]),
  /** Quellen-IDs aus dem Quellenregister (docs/recherche/quellenregister.md) */
  sources: z.array(z.string()).default([]),
  review: z
    .object({ reviewedBy: z.string().optional(), reviewedAt: z.string().optional(), notes: z.string().optional() })
    .default({}),
  /** "test": keine Hinweise, keine Musterlösung, keine Live-Passwege */
  mode: z.enum(['learn', 'test']).default('learn'),
  /**
   * Didaktische Rolle: Einstieg, Übung, Transfer (neue Situation) oder Test.
   * Transfer- und Testmissionen zählen als Evidenz für "digital verstanden".
   */
  role: z.enum(['intro', 'practice', 'transfer', 'test']).default('practice'),
  pitch: pitchConfigSchema,
  /** Sichtbarer Ausschnitt des Spielfelds in Metern */
  view: viewSchema.optional(),
  teams: z.object({
    own: z.object({ attackDirection: z.union([z.literal(1), z.literal(-1)]) }),
    opp: z.object({ attackDirection: z.union([z.literal(1), z.literal(-1)]) }),
  }),
  motion: z.object({ profile: ageProfileSchema.default('U15') }).default({ profile: 'U15' }),
  board: boardInputSchema,
  steps: z.array(stepSchema).min(1),
  /** Transfer auf den Platz: passende Spielformen und eine kleine Aufgabe fürs nächste Training */
  fieldTransfer: z.object({ drills: z.array(z.string()).default([]), challenge: localizedTextSchema }).optional(),
})

export type MissionInput = z.input<typeof missionSchema>
export type Mission = z.output<typeof missionSchema>
