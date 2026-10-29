import { describe, expect, it } from 'vitest'
import { competencyProgress, getCompetency, type AttemptFact } from '../src'

const cover = getCompetency('K-ZWEITER-VERTEIDIGER')!
const day = (d: number) => new Date(Date.UTC(2026, 9, d))

function attempt(missionId: string, stepId: string, ok: boolean, hintsUsed = 0, createdAt = day(1)): AttemptFact {
  return { missionId, stepId, rating: ok ? 'excellent' : 'not-yet', principles: { 'P-ABSICHERN': ok }, hintsUsed, createdAt }
}

describe('Fortschrittsregeln: bearbeitet – digital verstanden – angewendet', () => {
  it('ist "bearbeitet", sobald eine passende Aufgabe versucht wurde', () => {
    const p = competencyProgress(cover, [attempt('nazb-m3-aufgaben-verteilen', 'absichern', false)], [])
    expect(p.practised).toBe(true)
    expect(p.understood).toBe(false)
  })

  it('ist erst "digital verstanden" nach zwei Situationen ohne Hinweise, davon eine Transfer-/Testsituation', () => {
    const onlyPractice = competencyProgress(cover, [attempt('nazb-m3-aufgaben-verteilen', 'absichern', true)], [])
    expect(onlyPractice.understood).toBe(false)
    const withTransfer = competencyProgress(
      cover,
      [attempt('nazb-m3-aufgaben-verteilen', 'absichern', true), attempt('nazb-m6-abschlusstest', 'test-absichern', true)],
      [],
    )
    expect(withTransfer.understood).toBe(true)
  })

  it('zählt Lösungen mit Hinweisen nicht als selbstständig gelöst', () => {
    const p = competencyProgress(
      cover,
      [attempt('nazb-m3-aufgaben-verteilen', 'absichern', true, 1), attempt('nazb-m6-abschlusstest', 'test-absichern', true)],
      [],
    )
    expect(p.understood).toBe(false)
  })

  it('setzt "angewendet" nie automatisch, nur durch eine Trainerbeobachtung', () => {
    const digital = competencyProgress(
      cover,
      [attempt('nazb-m3-aufgaben-verteilen', 'absichern', true), attempt('nazb-m6-abschlusstest', 'test-absichern', true)],
      [],
    )
    expect(digital.applied).toBe(false)
    const observed = competencyProgress(cover, [], [{ principleId: 'P-ABSICHERN', rating: 'CONSISTENT', observedOn: day(3) }])
    expect(observed.applied).toBe(true)
  })

  it('empfiehlt eine Wiederholung, wenn das Verstandene länger nicht geübt wurde', () => {
    const attempts = [attempt('nazb-m3-aufgaben-verteilen', 'absichern', true, 0, day(1)), attempt('nazb-m6-abschlusstest', 'test-absichern', true, 0, day(2))]
    expect(competencyProgress(cover, attempts, [], day(5)).reviewDue).toBe(false)
    expect(competencyProgress(cover, attempts, [], day(20)).reviewDue).toBe(true)
  })
})
