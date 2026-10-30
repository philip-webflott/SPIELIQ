import { describe, expect, it } from 'vitest'
import {
  applyPlacement,
  assessStep,
  createRandom,
  isInteractive,
  planConsequence,
  possessionTeam,
  samplingArea,
  type InteractiveStep,
  type LoadedMission,
  type StepAnswer,
  type Vec2,
} from '@spieliq/engine'
import {
  expandTemplate,
  feedbackSpeech,
  getMission,
  MISSION_INPUTS,
  normalizeSpeech,
  playoutMessage,
  speechCatalog,
  summarizeStepFeedback,
  UI_TEXT,
} from '../src'

/**
 * Vorlesen mit vorab erzeugten Aufnahmen: Jeder Text, den die App vorlesen
 * kann, muss im Katalog stehen – sonst fehlt die Aufnahme und die App fällt auf
 * die Gerätestimme zurück. Geprüft wird mit den dokumentierten Beispielen, der
 * Musterlösung und vielen Zufallsantworten.
 */

const missions = MISSION_INPUTS.map((m) => getMission(m.id))
const catalog = new Set(speechCatalog(missions))
const UNIT_PATTERN = /\d+([,.]\d+)?\s?(m|s|Meter|Sekunden?)\b/

function answersFor(loaded: LoadedMission, index: number, step: InteractiveStep): StepAnswer[] {
  const answers: StepAnswer[] = step.examples.map((e) => ({ positions: e.positions, selection: e.selection }))
  const rand = createRandom(11 + index)
  const area = samplingArea(loaded, index)
  const point = (): Vec2 => ({
    x: area.min.x + rand() * (area.max.x - area.min.x),
    y: area.min.y + rand() * (area.max.y - area.min.y),
  })
  if (step.kind === 'place') {
    answers.push({ positions: step.solution })
    for (let i = 0; i < 150; i++) {
      answers.push({ positions: Object.fromEntries(step.controlled.map((id) => [id, point()])) })
    }
  } else if (step.kind === 'choose') {
    for (const o of step.options) answers.push({ selection: { optionId: o.id } })
  } else if (step.target === 'player') {
    const ids = step.selectable.length > 0 ? step.selectable : loaded.boards[index]!.players.map((p) => p.id)
    for (const id of ids) answers.push({ selection: { playerId: id } })
  } else {
    for (let i = 0; i < 60; i++) answers.push({ selection: { point: point() } })
  }
  return answers
}

describe('Vorlese-Katalog', () => {
  it('enthält jeden Bedientext und keine offenen Platzhalter', () => {
    for (const text of Object.values(UI_TEXT)) expect(catalog.has(normalizeSpeech(text))).toBe(true)
    for (const text of catalog) {
      expect(text).not.toMatch(/\{\w+\}/)
      expect(text).not.toMatch(UNIT_PATTERN)
      expect(text.length).toBeLessThanOrEqual(400)
    }
  })

  it('füllt Vorlagen mit den Nummern derselben Mannschaft', () => {
    const board = getMission(MISSION_INPUTS[0]!.id).boards[0]!
    const pairs = expandTemplate('Nummer {a} und Nummer {b}.', board)
    const own = board.players.filter((p) => p.team === 'own').length
    const opp = board.players.filter((p) => p.team === 'opp').length
    expect(pairs).toHaveLength(own * (own - 1) + opp * (opp - 1))
    expect(expandTemplate('Ohne Nummer.', board)).toEqual(['Ohne Nummer.'])
  })

  it('liest Rückmeldungen in der Reihenfolge des Bildschirms vor: Folge, Überschrift, Begründung, ein Lob', () => {
    const segments = feedbackSpeech(
      { headline: 'Gut gemacht!', main: 'Der Abstand passt.', positives: ['Erstes Lob.', 'Zweites Lob.'] },
      { consequence: 'Wir haben den Ball! Gut verteidigt.' },
    )
    expect(segments).toEqual(['Wir haben den Ball! Gut verteidigt.', 'Gut gemacht!', 'Der Abstand passt.', 'Erstes Lob.'])
    expect(feedbackSpeech({ headline: 'Super!', main: '', positives: [] }, { usedSolution: true })).toEqual([UI_TEXT.solutionHeadline])
  })
})

describe.each(missions.map((m) => [m.mission.id, m] as const))('Mission %s: alles vorlesbar', (_id, loaded) => {
  loaded.mission.steps.forEach((step, index) => {
    if (!isInteractive(step)) return
    it(`Schritt ${step.id}: jede mögliche Rückmeldung steht im Katalog`, () => {
      const attackingOwn = possessionTeam(loaded.boards[index]!) === 'own'
      const missing = new Set<string>()
      for (const answer of answersFor(loaded, index, step)) {
        const result = assessStep(loaded, index, answer)
        const finalState = step.kind === 'place' ? applyPlacement(loaded, index, answer.positions ?? {}) : loaded.boards[index]!
        const plan = planConsequence(loaded, index, finalState)
        const consequence = plan?.playout ? playoutMessage(plan.playout.outcome, attackingOwn) : null
        const summary = summarizeStepFeedback(step, result)
        for (const usedSolution of [false, true]) {
          for (const s of feedbackSpeech(summary, { usedSolution, consequence })) if (!catalog.has(s)) missing.add(s)
        }
      }
      expect([...missing]).toEqual([])
    })
  })
})
