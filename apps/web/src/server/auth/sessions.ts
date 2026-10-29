import type { Db } from '../db'
import { randomToken, sha256 } from './tokens'

/**
 * Sitzungen: Zufallstoken im HttpOnly-Cookie, in der Datenbank nur dessen
 * SHA-256-Hash. Gleitende Verlängerung, wenn weniger als die Hälfte der
 * Laufzeit übrig ist. Keine IP-Adressen, keine Geräte-Fingerprints.
 */
export const SESSION_COOKIE = 'spieliq_session'
export const SESSION_DAYS = 30
const DAY_MS = 24 * 60 * 60 * 1000

export interface SessionUser {
  readonly id: string
  readonly kind: 'ADULT' | 'PLAYER'
  readonly displayName: string
  readonly loginName: string | null
  readonly email: string | null
  readonly platformRole: 'USER' | 'ADMIN'
  readonly isDemo: boolean
}

export async function createSession(db: Db, userId: string, now = new Date()): Promise<{ token: string; expiresAt: Date }> {
  const token = randomToken()
  const expiresAt = new Date(now.getTime() + SESSION_DAYS * DAY_MS)
  await db.session.create({ data: { id: sha256(token), userId, expiresAt } })
  await db.user.update({ where: { id: userId }, data: { lastLoginAt: now } })
  return { token, expiresAt }
}

export async function validateSession(
  db: Db,
  token: string,
  now = new Date(),
): Promise<{ user: SessionUser; expiresAt: Date; renewed: boolean } | null> {
  if (!token || token.length > 200) return null
  const id = sha256(token)
  const session = await db.session.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, kind: true, displayName: true, loginName: true, email: true, platformRole: true, isDemo: true },
      },
    },
  })
  if (!session) return null
  if (session.expiresAt.getTime() <= now.getTime()) {
    await db.session.delete({ where: { id } }).catch(() => undefined)
    return null
  }
  let expiresAt = session.expiresAt
  let renewed = false
  if (session.expiresAt.getTime() - now.getTime() < (SESSION_DAYS / 2) * DAY_MS) {
    expiresAt = new Date(now.getTime() + SESSION_DAYS * DAY_MS)
    await db.session.update({ where: { id }, data: { expiresAt } })
    renewed = true
  }
  return { user: session.user, expiresAt, renewed }
}

export async function invalidateSession(db: Db, token: string): Promise<void> {
  await db.session.deleteMany({ where: { id: sha256(token) } })
}

export async function invalidateAllSessions(db: Db, userId: string): Promise<void> {
  await db.session.deleteMany({ where: { userId } })
}
