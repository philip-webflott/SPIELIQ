import { beforeAll, describe, expect, it } from 'vitest'
import { RETENTION, applyRetention } from '@/server/modules/retention'
import { db, resetTestDatabase } from './helpers'

/**
 * Speicherfristen: Eingabedetails alter Versuche werden entfernt, der Lernstand bleibt.
 */

const now = new Date('2026-10-29T12:00:00Z')
const daysAgo = (d: number) => new Date(now.getTime() - d * 24 * 3600 * 1000)

let userId: string

beforeAll(async () => {
  await resetTestDatabase()
  const user = await db.user.create({ data: { kind: 'PLAYER', displayName: 'Test', loginName: 'test-otter-1', passwordHash: 'x' } })
  userId = user.id
  const base = { userId, missionId: 'nazb-m1-problem-erkennen', missionVersion: 1, stepId: 's2', rating: 'good', score: 0.7, principles: { 'P-FREIER-RAUM': true }, criteria: [] }
  await db.attempt.create({ data: { ...base, answer: { selection: { playerId: 'o7' } }, durationMs: 4200, createdAt: daysAgo(RETENTION.attemptDetailsDays + 1) } })
  await db.attempt.create({ data: { ...base, answer: { selection: { playerId: 'o7' } }, durationMs: 3100, createdAt: daysAgo(2) } })
  await db.session.create({ data: { id: 'abgelaufen', userId, expiresAt: daysAgo(1) } })
  await db.session.create({ data: { id: 'aktiv', userId, expiresAt: daysAgo(-10) } })
  await db.auditEvent.create({ data: { action: 'test.alt', targetType: 'User', targetId: userId, createdAt: daysAgo(400) } })
  await db.auditEvent.create({ data: { action: 'test.neu', targetType: 'User', targetId: userId, createdAt: daysAgo(10) } })
})

describe('Speicherfristen', () => {
  it('entfernt Eingabe und Dauer alter Versuche, behält aber Bewertung und Prinzipien', async () => {
    const result = await applyRetention(db, now)
    expect(result.attemptDetailsPruned).toBe(1)
    const attempts = await db.attempt.findMany({ where: { userId }, orderBy: { createdAt: 'asc' } })
    expect(attempts[0]).toMatchObject({ answer: {}, durationMs: null, rating: 'good', principles: { 'P-FREIER-RAUM': true } })
    expect(attempts[0]!.detailsPrunedAt).toEqual(now)
    expect(attempts[1]).toMatchObject({ answer: { selection: { playerId: 'o7' } }, durationMs: 3100, detailsPrunedAt: null })
  })

  it('löscht abgelaufene Sitzungen und alte Protokolleinträge', async () => {
    expect((await db.session.findMany({ where: { userId } })).map((s) => s.id)).toEqual(['aktiv'])
    expect((await db.auditEvent.findMany()).map((a) => a.action)).toEqual(['test.neu'])
  })

  it('ist wiederholbar, ohne Daten erneut zu verändern', async () => {
    const again = await applyRetention(db, now)
    expect(again).toEqual({ attemptDetailsPruned: 0, sessionsDeleted: 0, throttlesDeleted: 0, auditEventsDeleted: 0 })
  })
})
