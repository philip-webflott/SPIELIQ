import type { BoardState, LoadedMission, PlayoutOutcome } from '@spieliq/engine'
import { allFeedbackKeys, feedbackTemplate, playoutMessage, ratingHeadline, type FeedbackSummary } from './feedback'
import { format, t } from './i18n'
import { UI_TEXT } from './ui-texts'

/**
 * Vorlesen mit vorab erzeugten Aufnahmen (docs/konzept/sprachausgabe.md)
 * ====================================================================
 * Vorgelesen wird in Abschnitten: ein Abschnitt ist genau ein Textblock, den
 * die App anzeigt (Anweisung, Hilfe, Überschrift der Rückmeldung …). Dieses
 * Modul legt fest, welche Abschnitte es geben kann. Das Skript
 * `apps/web/scripts/voice.ts` vertont daraus jeden Abschnitt einmal; die App
 * spielt die Aufnahme ab, wenn es sie gibt, sonst die Gerätestimme.
 *
 * Rückmeldungen enthalten Spielernummern („Nummer 7 steht zu nah am Ball.“).
 * Weil jede Mission feste Spieler hat, ist die Menge möglicher Sätze endlich:
 * Platzhalter werden mit den Nummern der Spieler im jeweiligen Schritt
 * aufgefüllt. Ein Content-Test prüft, dass jede Rückmeldung der Engine im
 * Katalog steht.
 */

const PLAYOUT_OUTCOMES = [
  'goalChance',
  'progress',
  'safePass',
  'interception',
  'pressured',
  'forcedBack',
  'noOption',
] as const satisfies readonly PlayoutOutcome[]

const PLACEHOLDER = /\{(\w+)\}/g

/** Kriterien, deren Feedbackschlüssel nicht mit ihrem Namen beginnen. */
const KEY_PREFIX: Readonly<Record<string, string>> = { shiftTowardsBall: 'shift', freeSpacePoint: 'freeSpace' }

/** Einheitliche Schreibweise – Schlüssel für die Zuordnung Text → Aufnahme. */
export function normalizeSpeech(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

/**
 * Was zu einer Rückmeldung vorgelesen wird, in dieser Reihenfolge: zuerst die
 * Folge („Der Gegner fängt den Ball ab.“), dann Überschrift, Begründung und
 * höchstens ein Lob – genau das, was der Bildschirm zeigt.
 */
export function feedbackSpeech(
  summary: FeedbackSummary,
  options: { readonly usedSolution?: boolean; readonly consequence?: string | null } = {},
): string[] {
  return [
    options.consequence ?? '',
    options.usedSolution ? UI_TEXT.solutionHeadline : summary.headline,
    summary.main,
    summary.positives[0] ?? '',
  ]
    .map(normalizeSpeech)
    .filter((s) => s.length > 0)
}

/**
 * Alle Sätze, die aus einer Vorlage mit Spielernummern entstehen können.
 * Ein Platzhalter: jede Nummer im Schritt. Zwei Platzhalter (zwei Spieler
 * derselben Mannschaft): jedes geordnete Paar innerhalb einer Mannschaft.
 */
export function expandTemplate(template: string, board: BoardState): string[] {
  const names = [...new Set([...template.matchAll(PLACEHOLDER)].map((m) => m[1]!))]
  if (names.length === 0) return [template]
  const label = (p: BoardState['players'][number]) => p.label ?? p.id
  const teams = (['own', 'opp'] as const).map((team) => board.players.filter((p) => p.team === team).map(label))
  if (names.length === 1) {
    const [name] = names as [string]
    return [...new Set(teams.flat())].map((l) => format(template, { [name]: l }))
  }
  if (names.length === 2) {
    const [a, b] = names as [string, string]
    const out: string[] = []
    for (const labels of teams) {
      for (const x of labels) for (const y of labels) if (x !== y) out.push(format(template, { [a]: x, [b]: y }))
    }
    return out
  }
  throw new Error(`Vorlage mit mehr als zwei Platzhaltern wird nicht vertont: ${template}`)
}

/** Alle vorlesbaren Abschnitte einer Mission. */
export function missionSpeechTexts(loaded: LoadedMission): string[] {
  const out = new Set<string>()
  const add = (text: string | undefined) => {
    const n = normalizeSpeech(text ?? '')
    if (n) out.add(n)
  }
  const keys = allFeedbackKeys()

  loaded.mission.steps.forEach((step, index) => {
    add(t(step.instruction))
    switch (step.kind) {
      case 'watch':
        add(t(step.after?.caption))
        return
      case 'explain':
        add(t(step.text))
        for (const k of step.keyPoints) add(t(k))
        return
      default:
        break
    }
    for (const h of step.hints) add(t(h))
    if (step.kind === 'place') for (const g of step.guide) add(t(g))
    if (step.kind === 'choose') for (const o of step.options) add(t(o.label))
    add(t(step.feedback.excellent))
    add(t(step.feedback.good))
    add(t(step.feedback.notYet))

    const criteria = [...step.assessment.criteria, ...step.assessment.alternatives.flatMap((a) => a.criteria)]
    for (const alt of step.assessment.alternatives) add(t(alt.explanation))
    const board = loaded.boards[index]!
    const prefixes = new Set(criteria.map((c) => KEY_PREFIX[c.kind] ?? c.kind))
    for (const c of criteria) {
      add(t(c.feedback?.pass))
      add(t(c.feedback?.fail))
    }
    for (const key of keys) {
      const prefix = key.slice(0, key.indexOf('.'))
      if (!prefixes.has(prefix) && prefix !== 'common') continue
      for (const sentence of expandTemplate(feedbackTemplate(key) ?? '', board)) add(sentence)
    }
  })
  return [...out]
}

/** Abschnitte, die in jeder Mission vorkommen können (Überschriften, Folgen, Bedientexte). */
export function commonSpeechTexts(): string[] {
  const texts = [
    ...(['excellent', 'good', 'not-yet'] as const).map(ratingHeadline),
    ...PLAYOUT_OUTCOMES.flatMap((o) => [playoutMessage(o, true), playoutMessage(o, false)]),
    ...Object.values(UI_TEXT),
  ]
  return [...new Set(texts.map(normalizeSpeech).filter((s) => s.length > 0))]
}

/** Gesamtkatalog, sortiert (stabile Reihenfolge für das Vertonungsskript). */
export function speechCatalog(missions: readonly LoadedMission[]): string[] {
  const all = new Set(commonSpeechTexts())
  for (const m of missions) for (const s of missionSpeechTexts(m)) all.add(s)
  return [...all].sort((a, b) => a.localeCompare(b, 'de'))
}
