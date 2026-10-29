import { beforeAll, describe, expect, it } from 'vitest'
import { getMission } from '@spieliq/content'
import { isInteractive } from '@spieliq/engine'
import { authenticate, deleteAccount, exportPersonalData, joinTeamWithCode, registerCoach, updateDisplayName } from '@/server/modules/accounts'
import { assignmentReport, assignmentsForPlayer, createAssignment } from '@/server/modules/assignments'
import { playerDetail, teamProgressMatrix, teamStruggles } from '@/server/modules/insights'
import { recordObservation } from '@/server/modules/observations'
import { completeMission, playerProgress, recordStepAttempt } from '@/server/modules/progress'
import { createInvitation, createTeam, deleteTeam, removePlayer, resetPlayerPassword } from '@/server/modules/teams'
import { createSession, validateSession } from '@/server/auth/sessions'
import { DomainError } from '@/server/errors'
import { db, resetTestDatabase } from './helpers'

/**
 * Durchgängiger Ablauf (vertikaler Schnitt) gegen eine echte Datenbank:
 * Trainer registriert sich → Teamcode → Spieler tritt bei → löst Missionen
 * (serverseitig bewertet) → Trainer sieht Fortschritt, Problemfelder,
 * Hausaufgabenstand → Beobachtung "auf dem Platz" → Auskunft & Löschung.
 */

const m1 = getMission('nazb-m1-problem-erkennen')
const m3 = getMission('nazb-m3-aufgaben-verteilen')
const m1Step = m1.mission.steps.findIndex(isInteractive)
const m3Step = m3.mission.steps.findIndex(isInteractive)

let coachId: string
let teamId: string
let code: string
let playerId: string
let loginName: string

beforeAll(async () => {
  await resetTestDatabase()
})

describe('Trainer legt Mannschaft an und lädt ein', () => {
  it('registriert einen Trainer mit Verein und Mannschaft', async () => {
    const result = await registerCoach(db, {
      displayName: 'Testtrainerin',
      email: 'trainerin@example.invalid',
      password: 'sehr-sicheres-passwort',
      clubName: 'SV Test',
      teamName: 'C1',
      ageGroup: 'C',
      confirmedAdult: true,
      acceptedPrivacy: true,
    })
    coachId = result.userId
    teamId = result.teamId
    const membership = await db.teamMembership.findUniqueOrThrow({ where: { teamId_userId: { teamId, userId: coachId } } })
    expect(membership.role).toBe('HEAD_COACH')
  })

  it('verlangt für eine C-Jugend die Bestätigung der Einwilligung der Sorgeberechtigten', async () => {
    await expect(createInvitation(db, coachId, { teamId })).rejects.toBeInstanceOf(DomainError)
    const invite = await createInvitation(db, coachId, { teamId, guardianConsentConfirmed: true })
    code = invite.code
    expect(code).toMatch(/^[A-Z2-9]{4}-[A-Z2-9]{4}$/)
    const stored = await db.invitation.findFirstOrThrow({ where: { teamId } })
    expect(stored.codeHash).not.toContain(code.replace('-', ''))
  })

  it('legt in der G- und F-Jugend keine Spielerkonten an (kein Teamcode)', async () => {
    const { orgId } = await db.team.findUniqueOrThrow({ where: { id: teamId }, select: { orgId: true } })
    const small = await createTeam(db, coachId, { orgId, name: 'F1', ageGroup: 'F' })
    await expect(createInvitation(db, coachId, { teamId: small.id, guardianConsentConfirmed: true })).rejects.toThrow(/keine Spielerkonten/)
    expect(await db.invitation.count({ where: { teamId: small.id } })).toBe(0)
    await deleteTeam(db, coachId, small.id)
  })

  it('lehnt unbekannte Teamcodes ab', async () => {
    await expect(
      joinTeamWithCode(db, { code: 'ZZZZ-ZZZZ', displayName: 'Max', password: 'passwort123', acceptedPrivacy: true }),
    ).rejects.toThrow(/Teamcode/)
  })
})

describe('Spieler tritt bei und meldet sich an', () => {
  it('legt ein pseudonymes Konto ohne E-Mail an und dokumentiert die Einwilligung', async () => {
    const result = await joinTeamWithCode(db, { code: code.toLowerCase(), displayName: 'Falke', password: 'mein-passwort', acceptedPrivacy: true })
    playerId = result.userId
    loginName = result.loginName
    const user = await db.user.findUniqueOrThrow({ where: { id: playerId } })
    expect(user.email).toBeNull()
    expect(user.kind).toBe('PLAYER')
    const consents = await db.consentRecord.findMany({ where: { userId: playerId } })
    expect(consents.map((c) => c.kind).sort()).toEqual(['GUARDIAN_CONSENT', 'PRIVACY_NOTICE'])
  })

  it('meldet mit Anmeldename und Passwort an – mit einheitlicher Fehlermeldung bei falschen Daten', async () => {
    await expect(authenticate(db, { identifier: loginName, password: 'falsch-falsch' })).rejects.toThrow('Name oder Passwort stimmen nicht.')
    await expect(authenticate(db, { identifier: 'gibt-es-nicht-1', password: 'egal-egal' })).rejects.toThrow('Name oder Passwort stimmen nicht.')
    const { userId } = await authenticate(db, { identifier: loginName.toUpperCase(), password: 'mein-passwort' })
    expect(userId).toBe(playerId)
  })

  it('speichert nur den Hash des Sitzungstokens', async () => {
    const { token } = await createSession(db, playerId)
    const sessions = await db.session.findMany({ where: { userId: playerId } })
    expect(sessions.some((s) => s.id === token)).toBe(false)
    const valid = await validateSession(db, token)
    expect(valid?.user.id).toBe(playerId)
  })
})

describe('Lernen mit serverseitiger Bewertung', () => {
  it('bewertet Versuche auf dem Server neu (keine Ergebnisse vom Client)', async () => {
    const wrong = await recordStepAttempt(db, playerId, { missionId: m1.mission.id, stepIndex: m1Step, answer: { selection: { playerId: 'o10' } } })
    expect(wrong.rating).toBe('not-yet')
    const right = await recordStepAttempt(db, playerId, { missionId: m1.mission.id, stepIndex: m1Step, answer: { selection: { playerId: 'o7' } } })
    expect(right.rating).toBe('excellent')
  })

  it('übernimmt nur steuerbare Spieler aus der Eingabe', async () => {
    const result = await recordStepAttempt(db, playerId, {
      missionId: m3.mission.id,
      stepIndex: m3Step,
      // o10 ist ein Gegenspieler – darf nicht verschoben werden
      answer: { positions: { d4: { x: 21, y: 48 }, o10: { x: 2, y: 2 } } },
    })
    expect(result.rating).toBe('excellent')
    const stored = await db.attempt.findFirstOrThrow({ where: { userId: playerId, missionId: m3.mission.id }, orderBy: { createdAt: 'desc' } })
    expect(Object.keys((stored.answer as { positions: object }).positions)).toEqual(['d4'])
  })

  it('schließt eine Mission nur ab, wenn alle Schritte gelöst sind', async () => {
    await completeMission(db, playerId, m1.mission.id)
    const progress = await db.missionProgress.findUniqueOrThrow({ where: { userId_missionId: { userId: playerId, missionId: m1.mission.id } } })
    expect(progress.status).toBe('COMPLETED')
    await expect(completeMission(db, playerId, 'nazb-m2-abstand-halten')).rejects.toThrow(/noch nicht vollständig/)
  })

  it('weist unbekannte Missionen und nicht interaktive Schritte ab', async () => {
    await expect(recordStepAttempt(db, playerId, { missionId: 'gibt-es-nicht', stepIndex: 0, answer: {} })).rejects.toBeInstanceOf(DomainError)
    await expect(recordStepAttempt(db, playerId, { missionId: m1.mission.id, stepIndex: 0, answer: {} })).rejects.toBeInstanceOf(DomainError)
  })
})

describe('Trainer sieht Fortschritt, Problemfelder und Hausaufgaben', () => {
  it('zeigt die Fortschrittsmatrix der eigenen Mannschaft', async () => {
    const matrix = await teamProgressMatrix(db, coachId, teamId)
    const row = matrix.rows.find((r) => r.userId === playerId)!
    expect(row.cells[0]?.status).toBe('abgeschlossen')
    expect(row.cells[2]?.status).toBe('begonnen')
  })

  it('wertet Problemfelder nur aus echten Versuchen aus', async () => {
    const struggles = await teamStruggles(db, coachId, teamId)
    expect(struggles.principles.every((p) => p.attempts >= 3)).toBe(true)
  })

  it('vergibt eine Hausaufgabe und zeigt den Stand je Spieler', async () => {
    const assignment = await createAssignment(db, coachId, {
      teamId,
      title: 'Nicht alle zum Ball',
      missionIds: [m1.mission.id, m3.mission.id],
      estimatedMinutes: 8,
    })
    const forPlayer = await assignmentsForPlayer(db, playerId)
    expect(forPlayer[0]?.completed).toBe(1)
    const report = await assignmentReport(db, coachId, assignment.id)
    expect(report.rows[0]?.state).toBe('begonnen')
  })

  it('setzt "auf dem Platz angewendet" nur über eine Trainerbeobachtung', async () => {
    const before = await playerProgress(db, playerId)
    expect(before.competencies.find((c) => c.competencyId === 'K-ZWEITER-VERTEIDIGER')?.applied).toBe(false)
    await recordObservation(db, coachId, { teamId, playerId, principleId: 'P-ABSICHERN', rating: 'CONSISTENT', observedOn: new Date() })
    const after = await playerProgress(db, playerId)
    expect(after.competencies.find((c) => c.competencyId === 'K-ZWEITER-VERTEIDIGER')?.applied).toBe(true)
  })
})

describe('Berechtigungen und Mandantentrennung', () => {
  let otherCoachId: string

  beforeAll(async () => {
    const other = await registerCoach(db, {
      displayName: 'Fremder Trainer',
      email: 'fremd@example.invalid',
      password: 'noch-ein-passwort',
      clubName: 'FC Anders',
      teamName: 'D1',
      ageGroup: 'D',
      confirmedAdult: true,
      acceptedPrivacy: true,
    })
    otherCoachId = other.userId
  })

  it('verweigert fremden Trainern den Zugriff auf Mannschaft und Spieler', async () => {
    await expect(teamProgressMatrix(db, otherCoachId, teamId)).rejects.toThrow(/nicht zu deinen Teams/)
    await expect(playerDetail(db, otherCoachId, teamId, playerId)).rejects.toBeInstanceOf(DomainError)
    await expect(resetPlayerPassword(db, otherCoachId, teamId, playerId)).rejects.toBeInstanceOf(DomainError)
    await expect(
      recordObservation(db, otherCoachId, { teamId, playerId, principleId: 'P-STELLEN', rating: 'EMERGING', observedOn: new Date() }),
    ).rejects.toBeInstanceOf(DomainError)
  })

  it('verweigert Spielern Trainerfunktionen', async () => {
    await expect(createInvitation(db, playerId, { teamId, guardianConsentConfirmed: true })).rejects.toBeInstanceOf(DomainError)
    await expect(teamProgressMatrix(db, playerId, teamId)).rejects.toBeInstanceOf(DomainError)
  })

  it('erlaubt keine Hausaufgaben für fremde Spieler', async () => {
    const other = await db.team.findFirstOrThrow({ where: { name: 'D1' } })
    await expect(
      createAssignment(db, otherCoachId, { teamId: other.id, title: 'Test', missionIds: [m1.mission.id], estimatedMinutes: 5, targetUserIds: [playerId] }),
    ).rejects.toThrow(/gehört nicht zur Mannschaft/)
  })
})

describe('Betroffenenrechte', () => {
  it('liefert eine vollständige Auskunft der eigenen Daten', async () => {
    const exported = await exportPersonalData(db, playerId)
    expect(exported.data.attempts.length).toBeGreaterThan(0)
    expect(exported.data.observationsAbout.length).toBe(1)
    expect(JSON.stringify(exported)).not.toContain('passwordHash')
  })

  it('lässt den Anzeigenamen selbst berichtigen (Spieler:innen: Spitzname-Regeln)', async () => {
    await expect(updateDisplayName(db, playerId, '<b>Max</b>')).rejects.toBeInstanceOf(DomainError)
    await updateDisplayName(db, playerId, 'Falke 7')
    expect((await db.user.findUniqueOrThrow({ where: { id: playerId } })).displayName).toBe('Falke 7')
  })

  it('löscht ein Spielerkonto mit allen Lernergebnissen', async () => {
    await expect(deleteAccount(db, playerId, 'falsch')).rejects.toBeInstanceOf(DomainError)
    await deleteAccount(db, playerId, 'mein-passwort')
    expect(await db.user.findUnique({ where: { id: playerId } })).toBeNull()
    expect(await db.attempt.count({ where: { userId: playerId } })).toBe(0)
    expect(await db.fieldObservation.count({ where: { playerId } })).toBe(0)
  })

  it('lässt Trainer:innen mit Mannschaften ihr Konto nicht versehentlich löschen', async () => {
    await expect(deleteAccount(db, coachId, 'sehr-sicheres-passwort')).rejects.toThrow(/Mannschaften/)
  })
})

describe('Spieler aus der Mannschaft entfernen', () => {
  it('löscht ein Spielerkonto ohne weitere Mannschaft samt Lernergebnissen', async () => {
    const invite = await createInvitation(db, coachId, { teamId, guardianConsentConfirmed: true })
    const joined = await joinTeamWithCode(db, { code: invite.code, displayName: 'Luchs', password: 'luchs-passwort', acceptedPrivacy: true })
    await recordStepAttempt(db, joined.userId, { missionId: m1.mission.id, stepIndex: m1Step, answer: { selection: { playerId: 'o7' } } })
    const result = await removePlayer(db, coachId, teamId, joined.userId)
    expect(result.accountDeleted).toBe(true)
    expect(await db.user.findUnique({ where: { id: joined.userId } })).toBeNull()
    expect(await db.attempt.count({ where: { userId: joined.userId } })).toBe(0)
  })
})
