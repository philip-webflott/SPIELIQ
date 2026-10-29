import type { PitchSpec } from '../board/pitch'
import type { BoardState, TeamsSetup } from '../board/state'
import type { LaneStatus } from '../analysis/passing'
import type { Vec2 } from '../geometry/vec'
import type { MotionModel } from '../model/motion'

/** Eingaben einer Bewertung: Endzustand nach der Interaktion plus Kontext. */
export interface AssessmentContext {
  readonly state: BoardState
  /** Ausgangssituation vor der Interaktion (z. B. für Verschiebe-Aufgaben) */
  readonly initial: BoardState
  readonly pitch: PitchSpec
  readonly teams: TeamsSetup
  readonly model: MotionModel
  /** IDs der Spieler, die der Lernende bewegen durfte */
  readonly controlled: readonly string[]
  readonly selection?: {
    readonly playerId?: string
    readonly point?: Vec2
    readonly optionId?: string
  }
}

export type EvidenceTone = 'good' | 'warn' | 'bad' | 'info'

/**
 * Visualisierbare Begründung eines Kriteriums. Die Engine liefert nur Geometrie;
 * Farben, Symbole und Texte wählt der Renderer bzw. das Content-Paket.
 */
export type Evidence =
  | {
      readonly type: 'lane'
      readonly fromId: string
      readonly toId: string | null
      readonly from: Vec2
      readonly to: Vec2
      readonly status: LaneStatus
      readonly interceptPoint?: Vec2
    }
  | { readonly type: 'distance'; readonly from: Vec2; readonly to: Vec2; readonly meters: number; readonly tone: EvidenceTone }
  | { readonly type: 'zone'; readonly polygon: readonly Vec2[]; readonly tone: EvidenceTone }
  | { readonly type: 'circle'; readonly center: Vec2; readonly radius: number; readonly tone: EvidenceTone }
  | { readonly type: 'highlight'; readonly playerId: string; readonly tone: EvidenceTone }

export interface CriterionOutcome {
  /** 0 … 1 */
  readonly score: number
  readonly passed: boolean
  /** Schlüssel für einen Feedbacktext, z. B. "pressure.tooFar" */
  readonly feedbackKey: string
  /** Werte für Platzhalter im Feedbacktext */
  readonly feedbackParams?: Readonly<Record<string, string | number>>
  readonly evidence: readonly Evidence[]
  /** Kriterium in dieser Situation nicht anwendbar (zählt nicht in die Wertung) */
  readonly notApplicable?: boolean
}

export interface CriterionResult extends CriterionOutcome {
  readonly id: string
  readonly kind: string
  readonly weight: number
  readonly required: boolean
  readonly principle: string | null
}

export type Rating = 'excellent' | 'good' | 'not-yet'

export interface AssessmentResult {
  readonly rating: Rating
  /** Gewichteter Gesamtwert 0 … 1 */
  readonly score: number
  readonly criteria: readonly CriterionResult[]
  /** Kriterium, dessen Feedback als wichtigste Rückmeldung angezeigt wird */
  readonly primary: CriterionResult | null
  /** Ist eine dokumentierte Alternativlösung erkannt worden? */
  readonly alternativeId: string | null
  /** Prinzip-ID → bestanden? (für Kompetenz-Evidenz) */
  readonly principles: Readonly<Record<string, boolean>>
}
