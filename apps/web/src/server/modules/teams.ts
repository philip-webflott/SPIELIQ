import { z } from 'zod'
import type { Db } from '../db'
import { DomainError, invalid } from '../errors'
import { hashPassword } from '../auth/password'
import { invalidateAllSessions } from '../auth/sessions'
import { generateInviteCode, generateTemporaryPassword, hashInviteCode } from '../auth/tokens'
import { requireCoachOfPlayer, requireOrgAdmin, requireTeamCoach } from '../policies'
import { audit } from './audit'

const INVITE_DAYS = 14

/** Altersklassen, in denen (fast) alle Spieler:innen unter 16 sind. */
export const UNDER_16_AGE_GROUPS = ['G', 'F', 'E', 'D', 'C'] as const
/** In der B-Jugend sind Spieler:innen teils unter, teils über 16. */
export function needsGuardianConsent(ageGroup: string): boolean {
  return (UNDER_16_AGE_GROUPS as readonly string[]).includes(ageGroup) || ageGroup === 'B'
}

/**
 * G- und F-Jugend: keine eigenen Spielerkonten (Datensparsamkeit, Kinderfußball
 * ohne Taktikfokus; docs/konzept/lernsystem.md, Abschnitt 6). Trainer:innen
 * nutzen die Missionen dort gemeinsam mit der Gruppe im Gastmodus.
 */
export const NO_PLAYER_ACCOUNT_AGE_GROUPS = ['G', 'F'] as const
export function allowsPlayerAccounts(ageGroup: string): boolean {
  return !(NO_PLAYER_ACCOUNT_AGE_GROUPS as readonly string[]).includes(ageGroup)
}
export const NO_PLAYER_ACCOUNTS_MESSAGE =
  'In der G- und F-Jugend legt SPIELIQ keine Spielerkonten an. Nutzt die Missionen gemeinsam über „Ausprobieren“ – ohne Konto.'

export const createInvitationSchema = z.object({
  teamId: z.string().min(1),
  guardianConsentConfirmed: z.boolean().default(false),
})

/**
 * Erstellt einen neuen Teamcode und widerruft alte. Der Code wird nur einmal
 * im Klartext zurückgegeben; gespeichert wird ein Hash.
 */
export async function createInvitation(db: Db, coachId: string, input: z.input<typeof createInvitationSchema>, now = new Date()) {
  const data = createInvitationSchema.parse(input)
  await requireTeamCoach(db, coachId, data.teamId)
  const team = await db.team.findUniqueOrThrow({ where: { id: data.teamId }, select: { ageGroup: true } })
  if (!allowsPlayerAccounts(team.ageGroup)) throw invalid(NO_PLAYER_ACCOUNTS_MESSAGE)
  if (needsGuardianConsent(team.ageGroup) && !data.guardianConsentConfirmed) {
    throw invalid('Für Mannschaften mit Spieler:innen unter 16 Jahren musst du bestätigen, dass dem Verein die Einwilligungen der Sorgeberechtigten vorliegen.')
  }
  const code = generateInviteCode()
  const expiresAt = new Date(now.getTime() + INVITE_DAYS * 24 * 3600 * 1000)
  await db.$transaction([
    db.invitation.updateMany({ where: { teamId: data.teamId, revokedAt: null }, data: { revokedAt: now } }),
    db.invitation.create({
      data: {
        teamId: data.teamId,
        codeHash: hashInviteCode(code),
        codeHint: code.slice(-2),
        createdById: coachId,
        expiresAt,
        guardianConsentConfirmedAt: data.guardianConsentConfirmed ? now : null,
      },
    }),
  ])
  await audit(db, coachId, 'invitation.create', 'Team', data.teamId)
  return { code, expiresAt }
}

export async function revokeInvitations(db: Db, coachId: string, teamId: string, now = new Date()) {
  await requireTeamCoach(db, coachId, teamId)
  await db.invitation.updateMany({ where: { teamId, revokedAt: null }, data: { revokedAt: now } })
  await audit(db, coachId, 'invitation.revoke', 'Team', teamId)
}

export const createTeamSchema = z.object({
  orgId: z.string().min(1),
  name: z.string().trim().min(2, 'Bitte gib einen Mannschaftsnamen an.').max(60),
  ageGroup: z.enum(['G', 'F', 'E', 'D', 'C', 'B', 'A']),
  season: z.string().trim().max(20).optional(),
})

export async function createTeam(db: Db, coachId: string, input: z.input<typeof createTeamSchema>) {
  const data = createTeamSchema.parse(input)
  await requireOrgAdmin(db, coachId, data.orgId)
  const team = await db.team.create({
    data: { orgId: data.orgId, name: data.name, ageGroup: data.ageGroup, season: data.season ?? null },
  })
  await db.teamMembership.create({ data: { teamId: team.id, userId: coachId, role: 'HEAD_COACH' } })
  await audit(db, coachId, 'team.create', 'Team', team.id)
  return team
}

export async function deleteTeam(db: Db, coachId: string, teamId: string) {
  const team = await db.team.findUniqueOrThrow({ where: { id: teamId }, select: { orgId: true } })
  await requireOrgAdmin(db, coachId, team.orgId)
  await db.team.delete({ where: { id: teamId } })
  await audit(db, coachId, 'team.delete', 'Team', teamId)
}

export async function teamsForCoach(db: Db, coachId: string) {
  const memberships = await db.teamMembership.findMany({
    where: { userId: coachId, role: { in: ['HEAD_COACH', 'ASSISTANT_COACH'] } },
    select: {
      role: true,
      team: {
        select: {
          id: true,
          name: true,
          ageGroup: true,
          season: true,
          org: { select: { id: true, name: true, isDemo: true } },
          _count: { select: { memberships: { where: { role: 'PLAYER' } } } },
        },
      },
    },
    orderBy: { joinedAt: 'asc' },
  })
  return memberships.map((m) => ({ ...m.team, myRole: m.role, playerCount: m.team._count.memberships }))
}

export async function orgsForCoach(db: Db, coachId: string) {
  return db.orgMembership.findMany({
    where: { userId: coachId, role: { in: ['OWNER', 'ADMIN'] } },
    select: { role: true, org: { select: { id: true, name: true } } },
  })
}

export async function teamSummary(db: Db, coachId: string, teamId: string, now = new Date()) {
  await requireTeamCoach(db, coachId, teamId)
  const team = await db.team.findUniqueOrThrow({
    where: { id: teamId },
    select: {
      id: true,
      name: true,
      ageGroup: true,
      season: true,
      org: { select: { name: true, isDemo: true } },
      memberships: {
        select: { role: true, level: true, joinedAt: true, user: { select: { id: true, displayName: true, loginName: true, isDemo: true } } },
        orderBy: { joinedAt: 'asc' },
      },
      invitations: {
        where: { revokedAt: null, expiresAt: { gt: now } },
        select: { id: true, codeHint: true, expiresAt: true, uses: true, maxUses: true, guardianConsentConfirmedAt: true },
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  })
  return {
    ...team,
    players: team.memberships.filter((m) => m.role === 'PLAYER'),
    coaches: team.memberships.filter((m) => m.role !== 'PLAYER'),
    activeInvitation: team.invitations[0] ?? null,
  }
}

/**
 * Entfernt einen Spieler aus der Mannschaft. Spielerkonten entstehen nur über
 * Mannschaften: Gehört das Konto danach keiner Mannschaft mehr an, wird es mit
 * allen Lernergebnissen gelöscht (Datensparsamkeit, Speicherbegrenzung).
 */
export async function removePlayer(db: Db, coachId: string, teamId: string, playerId: string) {
  await requireCoachOfPlayer(db, coachId, teamId, playerId)
  const accountDeleted = await db.$transaction(async (tx) => {
    await tx.teamMembership.delete({ where: { teamId_userId: { teamId, userId: playerId } } })
    const player = await tx.user.findUniqueOrThrow({ where: { id: playerId }, select: { kind: true } })
    const remaining = await tx.teamMembership.count({ where: { userId: playerId } })
    if (player.kind !== 'PLAYER' || remaining > 0) return false
    await tx.user.delete({ where: { id: playerId } })
    return true
  })
  await audit(db, coachId, accountDeleted ? 'team.removePlayer.accountDeleted' : 'team.removePlayer', 'User', playerId)
  return { accountDeleted }
}

export const setLevelSchema = z.object({ level: z.number().int().min(1).max(5).nullable() })

export async function setPlayerLevel(db: Db, coachId: string, teamId: string, playerId: string, level: number | null) {
  setLevelSchema.parse({ level })
  await requireCoachOfPlayer(db, coachId, teamId, playerId)
  await db.teamMembership.update({ where: { teamId_userId: { teamId, userId: playerId } }, data: { level } })
}

/** Passwort eines Spielers zurücksetzen (Kinder vergessen Passwörter). Gibt das vorläufige Passwort einmalig zurück. */
export async function resetPlayerPassword(db: Db, coachId: string, teamId: string, playerId: string) {
  await requireCoachOfPlayer(db, coachId, teamId, playerId)
  const player = await db.user.findUniqueOrThrow({ where: { id: playerId }, select: { kind: true, loginName: true } })
  if (player.kind !== 'PLAYER') throw new DomainError('forbidden', 'Nur Spielerkonten können hier zurückgesetzt werden.')
  const temporaryPassword = generateTemporaryPassword()
  await db.user.update({ where: { id: playerId }, data: { passwordHash: await hashPassword(temporaryPassword) } })
  await invalidateAllSessions(db, playerId)
  await audit(db, coachId, 'player.resetPassword', 'User', playerId)
  return { loginName: player.loginName, temporaryPassword }
}
