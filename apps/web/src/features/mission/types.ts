import type { Rating, StepAnswer } from '@spieliq/engine'

export interface AttemptPayload {
  readonly missionId: string
  readonly stepIndex: number
  readonly answer: StepAnswer
  readonly hintsUsed: number
  readonly durationMs: number
  readonly assignmentId?: string
}

export type ActionResponse = { ok: true } | { ok: false; error: string }

/** Speicherung des Lernfortschritts (nur für angemeldete Spieler; Gastmodus speichert nichts). */
export interface MissionPersistence {
  readonly submitAttempt: (payload: AttemptPayload) => Promise<ActionResponse>
  readonly completeMission: (missionId: string) => Promise<ActionResponse>
}

export interface StepOutcome {
  readonly stepId: string
  readonly rating: Rating
  readonly principles: Readonly<Record<string, boolean>>
  readonly attempts: number
  readonly hintsUsed: number
  readonly usedSolution: boolean
}
