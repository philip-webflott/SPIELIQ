/**
 * Prüft Rückmeldungen auf Widersprüche (pnpm content:audit).
 *
 * Für jede Aufgabe: Beispiele, Musterlösung und viele Zufallsantworten. Gezählt
 * wird, wie oft die Folge-Animation („Was passiert?“) zur Bewertung passt und
 * deshalb gezeigt wird, und ob ein „richtig“ einen Verbesserungstipp trägt.
 * Hintergrund: Audit vom 30.10.2026 (docs/qualitaet/audit-2026-10-30.md).
 */
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
import { consequenceFits, getMission, MISSION_INPUTS, summarizeStepFeedback } from '../src'

function answers(loaded: LoadedMission, index: number, step: InteractiveStep): StepAnswer[] {
  const out: StepAnswer[] = step.examples.map((e) => ({ positions: e.positions, selection: e.selection }))
  const rand = createRandom(5 + index)
  const area = samplingArea(loaded, index)
  const pt = (): Vec2 => ({ x: area.min.x + rand() * (area.max.x - area.min.x), y: area.min.y + rand() * (area.max.y - area.min.y) })
  if (step.kind === 'place') {
    out.push({ positions: step.solution })
    for (let i = 0; i < 300; i++) out.push({ positions: Object.fromEntries(step.controlled.map((id) => [id, pt()])) })
  } else if (step.kind === 'choose') for (const o of step.options) out.push({ selection: { optionId: o.id } })
  else if (step.target === 'player') for (const id of step.selectable) out.push({ selection: { playerId: id } })
  return out
}

const rows: string[] = ['| Mission / Schritt | Antworten | richtig | davon mit Tipp | Folge gezeigt (richtig) | Folge gezeigt (falsch) | Folge passte nicht (ausgeblendet) |', '|---|---|---|---|---|---|---|']
for (const input of MISSION_INPUTS) {
  const loaded = getMission(input.id)
  loaded.mission.steps.forEach((step, index) => {
    if (!isInteractive(step)) return
    const attackingOwn = possessionTeam(loaded.boards[index]!) === 'own'
    let n = 0, correct = 0, tips = 0, shownCorrect = 0, shownWrong = 0, hidden = 0
    for (const answer of answers(loaded, index, step)) {
      const result = assessStep(loaded, index, answer)
      const summary = summarizeStepFeedback(step, result)
      const final = step.kind === 'place' ? applyPlacement(loaded, index, answer.positions ?? {}) : loaded.boards[index]!
      const outcome = planConsequence(loaded, index, final)?.playout?.outcome
      n++
      if (summary.correct) correct++
      if (summary.isTip) tips++
      if (!outcome) continue
      const show = step.kind === 'identify' ? summary.correct : consequenceFits(summary.correct, outcome, attackingOwn)
      if (!show) hidden++
      else if (summary.correct) shownCorrect++
      else shownWrong++
    }
    rows.push(`| ${input.id} / ${step.id} | ${n} | ${correct} | ${tips} | ${shownCorrect} | ${shownWrong} | ${hidden} |`)
  })
}
console.log(rows.join('\n'))
