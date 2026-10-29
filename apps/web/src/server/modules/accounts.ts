import { z } from 'zod'
import type { Db } from '../db'
import { DomainError, invalid } from '../errors'
import {
  ADULT_PASSWORD_RULES,
  burnPasswordCheck,
  checkPassword,
  hashPassword,
  PLAYER_PASSWORD_RULES,
  verifyPassword,
} from '../auth/password'
import { assertNotLocked, clearFailures, registerFailure, throttleKey } from '../auth/throttle'
import { generateLoginName, hashInviteCode } from '../auth/tokens'
import { audit } from './audit'

export const PRIVACY_NOTICE_VERSION = '2026-10-entwurf-1'

const ageGroups = ['G', 'F', 'E', 'D', 'C', 'B', 'A'] as const

export const registerCoachSchema = z.object({
  displayName: z.string().trim().min(2, 'Bitte gib deinen Namen an.').max(60),
  email: z.string().trim().toLowerCase().email('Bitte gib eine gültige E-Mail-Adresse an.').max(200),
  password: z.string(),
  clubName: z.string().trim().min(2, 'Bitte gib den Vereinsnamen an.').max(80),
  teamName: z.string().trim().min(2, 'Bitte gib einen Mannschaftsnamen an.').max(60),
  ageGroup: z.enum(ageGroups),
  confirmedAdult: z.boolean().refine((v) => v, { message: 'Trainerkonten sind nur für Erwachsene.' }),
  acceptedPrivacy: z.boolean().refine((v) => v, { message: 'Bitte bestätige die Datenschutzhinweise.' }),
})

export async function registerCoach(db: Db, input: z.input<typeof registerCoachSchema>) {
  const data = registerCoachSchema.parse(input)
  const pwError = checkPassword(data.password, ADULT_PASSWORD_RULES)
  if (pwError) throw invalid(pwError)
  const existing = await db.user.findUnique({ where: { email: data.email }, select: { id: true } })
  if (existing) throw new DomainError('conflict', 'Mit dieser E-Mail-Adresse gibt es schon ein Konto.')
  const passwordHash = await hashPassword(data.password)
  const result = await db.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: { kind: 'ADULT', displayName: data.displayName, email: data.email, passwordHash },
    })
    const org = await tx.organization.create({ data: { name: data.clubName, kind: 'CLUB' } })
    await tx.orgMembership.create({ data: { orgId: org.id, userId: user.id, role: 'OWNER' } })
    const team = await tx.team.create({ data: { orgId: org.id, name: data.teamName, ageGroup: data.ageGroup } })
    await tx.teamMembership.create({ data: { teamId: team.id, userId: user.id, role: 'HEAD_COACH' } })
    await tx.consentRecord.create({
      data: { userId: user.id, kind: 'PRIVACY_NOTICE', version: PRIVACY_NOTICE_VERSION, method: 'selbst-bestaetigt' },
    })
    return { userId: user.id, orgId: org.id, teamId: team.id }
  })
  await audit(db, result.userId, 'account.register', 'User', result.userId)
  return result
}

export const joinTeamSchema = z.object({
  code: z.string().trim().min(4, 'Bitte gib den Teamcode ein.').max(20),
  displayName: z
    .string()
    .trim()
    .min(2, 'Dein Spitzname braucht mindestens 2 Zeichen.')
    .max(24, 'Höchstens 24 Zeichen.')
    .regex(/^[\p{L}\p{N} ._-]+$/u, 'Bitte nur Buchstaben, Zahlen, Leerzeichen, Punkt oder Bindestrich.'),
  password: z.string(),
  acceptedPrivacy: z.boolean().refine((v) => v, { message: 'Bitte lies die Hinweise und bestätige sie.' }),
})

/**
 * Spieler tritt per Teamcode bei. Es wird ein pseudonymes Konto ohne E-Mail
 * angelegt; der Anmeldename wird generiert. Für Mannschaften unter 16 Jahren
 * ist der Code nur gültig, wenn der Trainer beim Erstellen bestätigt hat, dass
 * dem Verein die Einwilligungen der Sorgeberechtigten vorliegen (rechtlich zu
 * prüfen, siehe docs/recht/datenschutzkonzept.md).
 */
export async function joinTeamWithCode(db: Db, input: z.input<typeof joinTeamSchema>, now = new Date()) {
  const data = joinTeamSchema.parse(input)
  const pwError = checkPassword(data.password, PLAYER_PASSWORD_RULES)
  if (pwError) throw invalid(pwError)
  // Schutz vor Durchprobieren: 31^8 mögliche Codes, Ablauf nach 14 Tagen, begrenzte Nutzungen.
  // IP-basierte Ratenbegrenzung erfolgt am Reverse Proxy (Betriebsanforderung, docs/architektur/sicherheit.md).
  const invitation = await db.invitation.findUnique({
    where: { codeHash: hashInviteCode(data.code) },
    include: { team: { select: { id: true, name: true, ageGroup: true } } },
  })
  const usable = invitation && !invitation.revokedAt && invitation.expiresAt > now && invitation.uses < invitation.maxUses
  if (!invitation || !usable) {
    throw invalid('Dieser Teamcode passt nicht oder ist abgelaufen. Frag deinen Trainer nach dem aktuellen Code.')
  }
  const passwordHash = await hashPassword(data.password)
  let loginName = generateLoginName()
  for (let i = 0; i < 10 && (await db.user.findUnique({ where: { loginName }, select: { id: true } })); i++) {
    loginName = generateLoginName()
  }
  const user = await db.$transaction(async (tx) => {
    const created = await tx.user.create({
      data: { kind: 'PLAYER', displayName: data.displayName, loginName, passwordHash },
    })
    await tx.teamMembership.create({ data: { teamId: invitation.teamId, userId: created.id, role: invitation.role } })
    await tx.invitation.update({ where: { id: invitation.id }, data: { uses: { increment: 1 } } })
    await tx.consentRecord.create({
      data: { userId: created.id, kind: 'PRIVACY_NOTICE', version: PRIVACY_NOTICE_VERSION, method: 'kindgerechte-hinweise-bestaetigt' },
    })
    if (invitation.guardianConsentConfirmedAt) {
      await tx.consentRecord.create({
        data: {
          userId: created.id,
          kind: 'GUARDIAN_CONSENT',
          version: PRIVACY_NOTICE_VERSION,
          method: 'verein-bestaetigt-bei-einladung',
          recordedById: invitation.createdById,
        },
      })
    }
    return created
  })
  await audit(db, user.id, 'team.join', 'Team', invitation.teamId)
  return { userId: user.id, loginName, teamName: invitation.team.name }
}

export const loginSchema = z.object({
  identifier: z.string().trim().min(3, 'Bitte gib deinen Spielernamen oder deine E-Mail ein.').max(200),
  password: z.string().min(1, 'Bitte gib dein Passwort ein.').max(200),
})

/** Anmeldung mit Spielername (Spieler) oder E-Mail (Erwachsene). Einheitliche Fehlermeldung. */
export async function authenticate(db: Db, input: z.input<typeof loginSchema>, now = new Date()) {
  const data = loginSchema.parse(input)
  const identifier = data.identifier.toLowerCase()
  const key = throttleKey('login', identifier)
  await assertNotLocked(db, key, now)
  const user = await db.user.findFirst({
    where: identifier.includes('@') ? { email: identifier } : { loginName: identifier },
    select: { id: true, passwordHash: true },
  })
  if (!user) {
    await burnPasswordCheck(data.password)
    await registerFailure(db, key, now)
    throw invalid('Name oder Passwort stimmen nicht.')
  }
  const ok = await verifyPassword(data.password, user.passwordHash)
  if (!ok) {
    await registerFailure(db, key, now)
    throw invalid('Name oder Passwort stimmen nicht.')
  }
  await clearFailures(db, key)
  return { userId: user.id }
}

/** Auskunft (Art. 15 DSGVO): alle zu einer Person gespeicherten Daten als JSON. */
export async function exportPersonalData(db: Db, userId: string) {
  const user = await db.user.findUniqueOrThrow({
    where: { id: userId },
    select: {
      id: true,
      kind: true,
      displayName: true,
      email: true,
      loginName: true,
      locale: true,
      createdAt: true,
      lastLoginAt: true,
      teamMemberships: { select: { role: true, level: true, joinedAt: true, team: { select: { name: true, ageGroup: true } } } },
      orgMemberships: { select: { role: true, org: { select: { name: true } } } },
      consents: { select: { kind: true, version: true, method: true, grantedAt: true, revokedAt: true } },
      missionProgress: { select: { missionId: true, missionVersion: true, status: true, bestRating: true, attempts: true, completedAt: true } },
      attempts: { select: { missionId: true, stepId: true, rating: true, score: true, hintsUsed: true, createdAt: true, answer: true } },
      observationsAbout: { select: { principleId: true, rating: true, observedOn: true, note: true } },
    },
  })
  await audit(db, userId, 'data.export', 'User', userId)
  return { exportedAt: new Date().toISOString(), format: 'spieliq-export-v1', data: user }
}

/**
 * Löschung (Art. 17 DSGVO). Spielerkonten werden vollständig gelöscht
 * (inkl. Versuche, Fortschritt, Beobachtungen). Erwachsene, die noch
 * Organisationen mit Mannschaften besitzen, müssen diese zuerst übergeben
 * oder löschen.
 */
export async function deleteAccount(db: Db, userId: string, password: string) {
  const user = await db.user.findUniqueOrThrow({ where: { id: userId }, select: { passwordHash: true, kind: true } })
  if (!(await verifyPassword(password, user.passwordHash))) throw invalid('Das Passwort stimmt nicht.')
  if (user.kind === 'ADULT') {
    const owned = await db.orgMembership.findMany({
      where: { userId, role: 'OWNER' },
      select: { org: { select: { id: true, _count: { select: { teams: true } } } } },
    })
    if (owned.some((o) => o.org._count.teams > 0)) {
      throw new DomainError('conflict', 'Du bist noch Inhaber:in eines Vereins mit Mannschaften. Lösche die Mannschaften zuerst oder übergib sie.')
    }
    await db.organization.deleteMany({ where: { id: { in: owned.map((o) => o.org.id) } } })
  }
  await db.user.delete({ where: { id: userId } })
  await audit(db, null, 'account.delete', 'User', userId)
}

export async function playerTeams(db: Db, userId: string) {
  return db.teamMembership.findMany({
    where: { userId },
    select: { role: true, team: { select: { id: true, name: true, ageGroup: true, org: { select: { name: true } } } } },
  })
}

