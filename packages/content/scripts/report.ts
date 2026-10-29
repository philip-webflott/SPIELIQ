/**
 * Erzeugt docs/qualitaet/content-report.md: Kennzahlen je Mission und Aufgabe
 * (Zufallsschutz, Raterate, Beispiele). Aufruf: pnpm --filter @spieliq/content report
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { assessStep, guessRate, isInteractive, randomPlacementPassRate } from '@spieliq/engine'
import { getMission, MISSION_INPUTS, t } from '../src'

const lines: string[] = [
  '# Content-Qualitätsbericht',
  '',
  `Automatisch erzeugt am ${new Date().toISOString().slice(0, 10)} mit \`pnpm --filter @spieliq/content report\`.`,
  '',
  'Zufallsschutz: Anteil von 400 zufälligen Platzierungen im erlaubten Bereich, die mindestens als „gut“ gewertet würden (Grenze 5 % bei 1–2 Figuren, 2 % ab 3 Figuren). Raterate: Anteil der antippbaren Optionen, die als richtig gelten (Grenze 50 %).',
  '',
  '| Mission | Status | Aufgabe | Art | Figuren | Zufall / Raten | Beispiele (ok/gesamt) |',
  '|---|---|---|---|---|---|---|',
]

for (const input of MISSION_INPUTS) {
  const loaded = getMission(input.id)
  loaded.mission.steps.forEach((step, index) => {
    if (!isInteractive(step)) return
    const examples = step.examples.filter((ex) => {
      const r = assessStep(loaded, index, { positions: ex.positions, selection: ex.selection })
      return ex.expect === 'pass' ? r.rating !== 'not-yet' : r.rating === ex.expect
    }).length
    let metric: string
    let figures = '–'
    if (step.kind === 'place') {
      const rate = randomPlacementPassRate(loaded, index, { samples: 400, seed: 2026 })
      metric = `${(rate.rate * 100).toFixed(1)} %`
      figures = String(step.controlled.length)
    } else {
      metric = `${Math.round(guessRate(loaded, index) * 100)} % (Raten)`
    }
    lines.push(
      `| ${t(loaded.mission.title)} | ${loaded.mission.status} | ${step.id} | ${step.kind} | ${figures} | ${metric} | ${examples}/${step.examples.length} |`,
    )
  })
}

lines.push('', 'Alle Werte werden zusätzlich in `packages/content/test/missions.test.ts` als harte Grenzen geprüft.', '')
const target = fileURLToPath(new URL('../../../docs/qualitaet/content-report.md', import.meta.url))
writeFileSync(target, lines.join('\n'))
console.log('geschrieben:', target)
