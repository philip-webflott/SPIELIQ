import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  assessStep,
  guessRate,
  isInteractive,
  loadMission,
  missionSchema,
  mirrorMission,
  randomPlacementPassRate,
  type LoadedMission,
} from '@spieliq/engine'
import { allFeedbackKeys, COMPETENCIES, DRILLS, feedbackTemplate, GAME_FORMATS, getMission, MISSION_INPUTS, PRINCIPLES, UNITS } from '../src'

/**
 * Content-Qualitätstests (laufen in CI)
 * ====================================
 * Jede offizielle Mission muss:
 * - dem Szenarioformat entsprechen und fachlich-technisch konsistent sein
 * - ihre dokumentierten Beispiele exakt so bewerten wie erwartet
 * - die Musterlösung als "excellent" bewerten
 * - bei zufälligem Platzieren fast nie bestehen
 * - gespiegelt (andere Spielfeldseite) gleich bewertet werden
 * - nur existierende Prinzipien, Kompetenzen, Spielformen und Texte verwenden
 */

const missions = MISSION_INPUTS.map((m) => [m.id, getMission(m.id)] as const)
/** Zahlen mit Einheit (z. B. „3,7 m“, „1,6 Sekunden“) sind für schwache Leser:innen zu abstrakt. */
const UNIT_PATTERN = /\d+([,.]\d+)?\s?(m|s|Meter|Sekunden?)\b/
const knownKeys = new Set(allFeedbackKeys())

describe.each(missions)('Mission %s', (_id, loaded: LoadedMission) => {
  const { mission } = loaded

  it('verweist nur auf bekannte Prinzipien, Kompetenzen und Spielformen', () => {
    for (const p of mission.principles) expect(PRINCIPLES.map((x) => x.id)).toContain(p)
    for (const c of mission.competencies) expect(COMPETENCIES.map((x) => x.id)).toContain(c)
    for (const d of mission.fieldTransfer?.drills ?? []) expect(DRILLS.map((x) => x.id)).toContain(d)
    for (const req of mission.prerequisites) expect(MISSION_INPUTS.map((m) => m.id)).toContain(req)
  })

  it('nutzt in Kriterien nur Prinzipien, die die Mission auch ausweist', () => {
    for (const step of mission.steps) {
      if (!isInteractive(step)) continue
      for (const c of step.assessment.criteria) {
        if (c.principle) expect(mission.principles, `${step.id}/${c.id}`).toContain(c.principle)
      }
    }
  })

  it('hält kurze Anweisungen ein (max. 140 Zeichen)', () => {
    for (const step of mission.steps) expect(step.instruction.de.length, step.id).toBeLessThanOrEqual(140)
  })

  it('nutzt Einfache Sprache: keine Meter- oder Sekundenangaben in Spielertexten', () => {
    const texts: string[] = [mission.goal.de, mission.fieldTransfer?.challenge.de ?? '']
    for (const step of mission.steps) {
      texts.push(step.instruction.de)
      if (step.kind === 'watch' && step.after) texts.push(step.after.caption.de)
      if (step.kind === 'explain') texts.push(step.text.de, ...step.keyPoints.map((k) => k.de))
      if (isInteractive(step)) {
        texts.push(...step.hints.map((h) => h.de), ...Object.values(step.feedback).map((f) => f?.de ?? ''))
        if (step.kind === 'place') texts.push(...step.guide.map((g) => g.de))
      }
    }
    for (const text of texts) expect(text, text).not.toMatch(UNIT_PATTERN)
  })

  it('hat bei mehreren Spielern höchstens einen Anleitungsschritt pro Spieler, jeder kurz', () => {
    for (const step of mission.steps) {
      if (step.kind !== 'place') continue
      expect(step.guide.length, step.id).toBeLessThanOrEqual(step.controlled.length)
      for (const g of step.guide) expect(g.de.length, g.de).toBeLessThanOrEqual(70)
    }
  })

  if (mission.mode === 'test') {
    it('enthält als Test keine Hinweise und keine Live-Passwege', () => {
      for (const step of mission.steps) {
        if (!isInteractive(step)) continue
        expect(step.hints).toHaveLength(0)
        if (step.kind === 'place') expect(step.liveLanes).toBe(false)
      }
    })
  }

  mission.steps.forEach((step, index) => {
    if (!isInteractive(step)) return

    it(`Schritt ${step.id}: hat dokumentierte Beispiele für richtig und falsch`, () => {
      expect(step.examples.some((e) => e.expect !== 'not-yet')).toBe(true)
      expect(step.examples.some((e) => e.expect === 'not-yet')).toBe(true)
    })

    it.each(step.examples.map((e) => [e.name, e] as const))(`Schritt ${step.id}: Beispiel "%s"`, (_name, example) => {
      const result = assessStep(loaded, index, { positions: example.positions, selection: example.selection })
      if (example.expect === 'pass') expect(result.rating).not.toBe('not-yet')
      else expect(result.rating).toBe(example.expect)
      if (example.expectFeedback) expect(result.primary?.feedbackKey).toBe(example.expectFeedback)
      for (const c of result.criteria) {
        expect(Boolean(c.notApplicable) && c.feedbackKey === 'common.missingEntity', `${c.id}: fehlende Spielerreferenz`).toBe(false)
        expect(knownKeys.has(c.feedbackKey), `Text fehlt für ${c.feedbackKey}`).toBe(true)
      }
    })

    if (step.kind === 'place') {
      it(`Schritt ${step.id}: Musterlösung ist "excellent"`, () => {
        expect(assessStep(loaded, index, { positions: step.solution }).rating).toBe('excellent')
      })

      it(`Schritt ${step.id}: zufälliges Platzieren besteht fast nie`, () => {
        const report = randomPlacementPassRate(loaded, index, { samples: 400, seed: 2026 })
        const limit = step.controlled.length >= 3 ? 0.02 : 0.05
        expect(report.rate).toBeLessThanOrEqual(limit)
      })
    } else {
      it(`Schritt ${step.id}: Raten führt höchstens in der Hälfte der Fälle zum Erfolg`, () => {
        expect(guessRate(loaded, index)).toBeLessThanOrEqual(0.5)
      })
    }
  })

  it('wird gespiegelt (andere Spielfeldseite) identisch bewertet', () => {
    const mirrored = loadMission(mirrorMission(mission, loaded.pitch.width))
    const mirrorPos = (positions: Record<string, { x: number; y: number }>) =>
      Object.fromEntries(Object.entries(positions).map(([id, p]) => [id, { x: p.x, y: loaded.pitch.width - p.y }]))
    mission.steps.forEach((step, index) => {
      if (!isInteractive(step)) return
      for (const ex of step.examples) {
        const original = assessStep(loaded, index, { positions: ex.positions, selection: ex.selection })
        const selection = ex.selection?.point
          ? { ...ex.selection, point: { x: ex.selection.point.x, y: loaded.pitch.width - ex.selection.point.y } }
          : ex.selection
        const flipped = assessStep(mirrored, index, { positions: mirrorPos(ex.positions), selection })
        expect(flipped.rating, `${step.id} / ${ex.name}`).toBe(original.rating)
        expect(flipped.score).toBeCloseTo(original.score, 6)
      }
    })
  })
})

describe('Inhaltsstruktur', () => {
  it('alle Missions-IDs sind eindeutig und versioniert', () => {
    const ids = MISSION_INPUTS.map((m) => m.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const m of MISSION_INPUTS) expect(missionSchema.parse(m).version).toBeGreaterThan(0)
  })

  it('jede Lerneinheit verweist auf existierende Missionen in sinnvoller Reihenfolge', () => {
    for (const unit of UNITS) {
      unit.missionIds.forEach((id, i) => {
        const mission = MISSION_INPUTS.find((m) => m.id === id)
        expect(mission, id).toBeDefined()
        for (const req of mission?.prerequisites ?? []) {
          expect(unit.missionIds.indexOf(req), `${id} braucht ${req} vorher`).toBeLessThan(i)
        }
      })
    }
  })

  it('der Kompetenzbaum ist zyklenfrei und referenziert nur bekannte Knoten', () => {
    const ids = new Set(COMPETENCIES.map((c) => c.id))
    const visiting = new Set<string>()
    const done = new Set<string>()
    const visit = (id: string) => {
      if (done.has(id)) return
      expect(visiting.has(id), `Zyklus bei ${id}`).toBe(false)
      visiting.add(id)
      const node = COMPETENCIES.find((c) => c.id === id)!
      for (const pre of node.prerequisites) {
        expect(ids.has(pre), `${id} → ${pre}`).toBe(true)
        visit(pre)
      }
      visiting.delete(id)
      done.add(id)
    }
    for (const c of COMPETENCIES) visit(c.id)
  })

  it('Spielfeld-Vorlagen der Altersklassen sind gültige Spielfelder', () => {
    for (const f of GAME_FORMATS) {
      expect(() => missionSchema.shape.pitch.parse(f.pitch), f.id).not.toThrow()
    }
  })

  it('Spielformen verweisen auf bekannte Prinzipien und haben Coachingpunkte', () => {
    for (const d of DRILLS) {
      expect(d.coachingPoints.length).toBeGreaterThan(0)
      for (const p of d.principles) expect(PRINCIPLES.map((x) => x.id)).toContain(p)
    }
  })

  it('Feedbacktexte enthalten keine Meter- oder Sekundenangaben (Einfache Sprache)', () => {
    for (const key of allFeedbackKeys()) {
      expect(feedbackTemplate(key) ?? '', key).not.toMatch(/\{(meters|seconds|width|depth)\}/)
    }
  })

  it('alle Quellenangaben existieren im Quellenregister (docs/recherche/quellen)', () => {
    const dir = fileURLToPath(new URL('../../../docs/recherche/quellen/', import.meta.url))
    const known = new Set(
      readdirSync(dir)
        .filter((f) => f.endsWith('.md'))
        .flatMap((f) => [...readFileSync(join(dir, f), 'utf8').matchAll(/^### \[([A-D]-\d{2,3})\]/gm)].map((m) => m[1]!)),
    )
    const used = [
      ...PRINCIPLES.flatMap((p) => p.sources.map((s) => [p.id, s] as const)),
      ...missions.flatMap(([id, loaded]) => loaded.mission.sources.map((s) => [id, s] as const)),
      ...GAME_FORMATS.flatMap((f) => f.sources.map((s) => [f.id, s] as const)),
    ]
    expect(known.size).toBeGreaterThan(300)
    for (const [owner, source] of used) expect(known.has(source), `${owner} → ${source}`).toBe(true)
  })
})
