import type { Db } from './db'
import { forbidden, notFound } from './errors'

/**
 * Berechtigungsprüfungen – immer serverseitig, immer nah an den Daten.
 * Regeln (docs/architektur/sicherheit.md):
 * - Trainer:innen sehen nur Spieler:innen ihrer eigenen Mannschaften.
 * - Vereins-Admins sehen alle Mannschaften ihrer Organisation.
 * - Spieler:innen sehen nur ihre eigenen Daten – nie die anderer Spieler.
 * - Organisationen sind strikt voneinander getrennt.
 */

export async function isTeamCoach(db: Db, userId: string, teamId: string): Promise<boolean> {
  const team = await db.team.findUnique({
    where: { id: teamId },
    select: {
      orgId: true,
      memberships: { where: { userId, role: { in: ['HEAD_COACH', 'ASSISTANT_COACH'] } }, select: { id: true } },
    },
  })
  if (!team) return false
  if (team.memberships.length > 0) return true
  const orgRole = await db.orgMembership.findUnique({
    where: { orgId_userId: { orgId: team.orgId, userId } },
    select: { role: true },
  })
  return orgRole?.role === 'OWNER' || orgRole?.role === 'ADMIN'
}

export async function requireTeamCoach(db: Db, userId: string, teamId: string): Promise<void> {
  if (!(await isTeamCoach(db, userId, teamId))) throw forbidden('Diese Mannschaft gehört nicht zu deinen Teams.')
}

export async function requireOrgAdmin(db: Db, userId: string, orgId: string): Promise<void> {
  const m = await db.orgMembership.findUnique({ where: { orgId_userId: { orgId, userId } }, select: { role: true } })
  if (m?.role !== 'OWNER' && m?.role !== 'ADMIN') throw forbidden()
}

/** Gehört der Spieler zur Mannschaft? (Voraussetzung für jeden Trainerzugriff auf Spielerdaten) */
export async function requirePlayerInTeam(db: Db, teamId: string, playerId: string): Promise<void> {
  const m = await db.teamMembership.findUnique({
    where: { teamId_userId: { teamId, userId: playerId } },
    select: { role: true },
  })
  if (!m || m.role !== 'PLAYER') throw notFound('Spieler:in nicht in dieser Mannschaft.')
}

export async function requireCoachOfPlayer(db: Db, coachId: string, teamId: string, playerId: string): Promise<void> {
  await requireTeamCoach(db, coachId, teamId)
  await requirePlayerInTeam(db, teamId, playerId)
}
