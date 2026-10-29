import { z } from 'zod'
import { allMissionIds } from '@spieliq/content'
import type { Db } from '../db'
import { invalid } from '../errors'
import { requireTeamCoach } from '../policies'
import { audit } from './audit'

/**
 * Hausaufgaben ("Lernmissionen"): Trainer:innen weisen einer Mannschaft oder
 * einzelnen Spieler:innen Missionen mit Abgabetermin zu und sehen, wer
 * begonnen und abgeschlossen hat und wo es hakt.
 */
export const createAssignmentSchema = z.object({
  teamId: z.string().min(1),
  title: z.string().trim().min(3, 'Bitte gib einen Titel an.').max(80),
  missionIds: z.array(z.string()).min(1, 'Bitte wähle mindestens eine Mission.').max(12),
  dueAt: z.coerce.date().optional(),
  estimatedMinutes: z.number().int().min(1).max(120),
  note: z.string().trim().max(280).optional(),
  targetUserIds: z.array(z.string()).max(60).default([]),
})

export async function createAssignment(db: Db, coachId: string, input: z.input<typeof createAssignmentSchema>, now = new Date()) {
  const data = createAssignmentSchema.parse(input)
  await requireTeamCoach(db, coachId, data.teamId)
  const known = new Set(allMissionIds())
  if (data.missionIds.some((id) => !known.has(id))) throw invalid('Unbekannte Mission ausgewählt.')
  if (data.dueAt && data.dueAt.getTime() < now.getTime() - 60_000) throw invalid('Der Abgabetermin liegt in der Vergangenheit.')
  if (data.targetUserIds.length > 0) {
    const members = await db.teamMembership.findMany({
      where: { teamId: data.teamId, role: 'PLAYER', userId: { in: data.targetUserIds } },
      select: { userId: true },
    })
    if (members.length !== new Set(data.targetUserIds).size) throw invalid('Mindestens ein:e Spieler:in gehört nicht zur Mannschaft.')
  }
  const assignment = await db.assignment.create({
    data: {
      teamId: data.teamId,
      createdById: coachId,
      title: data.title,
      missionIds: data.missionIds,
      dueAt: data.dueAt ?? null,
      estimatedMinutes: data.estimatedMinutes,
      note: data.note ?? null,
      targetUserIds: data.targetUserIds,
    },
  })
  await audit(db, coachId, 'assignment.create', 'Team', data.teamId)
  return assignment
}

export async function archiveAssignment(db: Db, coachId: string, assignmentId: string, now = new Date()) {
  const a = await db.assignment.findUniqueOrThrow({ where: { id: assignmentId }, select: { teamId: true } })
  await requireTeamCoach(db, coachId, a.teamId)
  await db.assignment.update({ where: { id: assignmentId }, data: { archivedAt: now } })
}

/** Offene Aufgaben eines Spielers (aus allen seinen Mannschaften). */
export async function assignmentsForPlayer(db: Db, userId: string) {
  const memberships = await db.teamMembership.findMany({ where: { userId, role: 'PLAYER' }, select: { teamId: true } })
  const assignments = await db.assignment.findMany({
    where: {
      teamId: { in: memberships.map((m) => m.teamId) },
      archivedAt: null,
      OR: [{ targetUserIds: { isEmpty: true } }, { targetUserIds: { has: userId } }],
    },
    orderBy: [{ dueAt: 'asc' }, { createdAt: 'desc' }],
    select: { id: true, title: true, missionIds: true, dueAt: true, estimatedMinutes: true, note: true, team: { select: { name: true } } },
  })
  const progress = await db.missionProgress.findMany({
    where: { userId, missionId: { in: assignments.flatMap((a) => a.missionIds) } },
    select: { missionId: true, status: true },
  })
  const status = new Map(progress.map((p) => [p.missionId, p.status]))
  return assignments.map((a) => ({
    ...a,
    completed: a.missionIds.filter((id) => status.get(id) === 'COMPLETED').length,
    total: a.missionIds.length,
  }))
}

export type PlayerAssignmentState = 'offen' | 'begonnen' | 'abgeschlossen'

/** Bericht für Trainer:innen: Stand je Spieler:in und je Mission. */
export async function assignmentReport(db: Db, coachId: string, assignmentId: string) {
  const assignment = await db.assignment.findUniqueOrThrow({ where: { id: assignmentId } })
  await requireTeamCoach(db, coachId, assignment.teamId)
  const members = await db.teamMembership.findMany({
    where: {
      teamId: assignment.teamId,
      role: 'PLAYER',
      ...(assignment.targetUserIds.length > 0 ? { userId: { in: assignment.targetUserIds } } : {}),
    },
    select: { user: { select: { id: true, displayName: true } } },
    orderBy: { joinedAt: 'asc' },
  })
  const userIds = members.map((m) => m.user.id)
  const [progress, attempts] = await Promise.all([
    db.missionProgress.findMany({ where: { userId: { in: userIds }, missionId: { in: assignment.missionIds } } }),
    db.attempt.findMany({
      where: { userId: { in: userIds }, missionId: { in: assignment.missionIds } },
      select: { userId: true, missionId: true, stepId: true, rating: true, hintsUsed: true, principles: true },
    }),
  ])
  const rows = members.map(({ user }) => {
    const mine = progress.filter((p) => p.userId === user.id)
    const myAttempts = attempts.filter((a) => a.userId === user.id)
    const completed = mine.filter((p) => p.status === 'COMPLETED').length
    const state: PlayerAssignmentState =
      completed === assignment.missionIds.length ? 'abgeschlossen' : mine.length > 0 ? 'begonnen' : 'offen'
    const failedPrinciples = new Map<string, number>()
    for (const a of myAttempts) {
      for (const [p, ok] of Object.entries((a.principles ?? {}) as Record<string, boolean>)) {
        if (!ok) failedPrinciples.set(p, (failedPrinciples.get(p) ?? 0) + 1)
      }
    }
    return {
      userId: user.id,
      displayName: user.displayName,
      state,
      completed,
      attempts: myAttempts.length,
      hintsUsed: myAttempts.reduce((s, a) => s + a.hintsUsed, 0),
      notYet: myAttempts.filter((a) => a.rating === 'not-yet').length,
      struggles: [...failedPrinciples.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2).map(([p]) => p),
    }
  })
  return { assignment, rows }
}

export async function assignmentsForTeam(db: Db, coachId: string, teamId: string) {
  await requireTeamCoach(db, coachId, teamId)
  return db.assignment.findMany({
    where: { teamId, archivedAt: null },
    orderBy: { createdAt: 'desc' },
  })
}
