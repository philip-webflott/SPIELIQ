import type { Db } from '../db'
import { DomainError } from '../errors'
import { sha256 } from './tokens'

/**
 * Begrenzung fehlgeschlagener Anmeldeversuche pro Konto-Kennung
 * (8 Fehlversuche in 15 Minuten → 15 Minuten Sperre). Gespeichert wird nur
 * ein Hash der Kennung – keine IP-Adressen.
 */
const MAX_FAILURES = 8
const WINDOW_MS = 15 * 60 * 1000
const LOCK_MS = 15 * 60 * 1000

export function throttleKey(scope: string, identifier: string): string {
  return sha256(`${scope}:${identifier.trim().toLowerCase()}`)
}

export async function assertNotLocked(db: Db, key: string, now = new Date()): Promise<void> {
  const entry = await db.loginThrottle.findUnique({ where: { key } })
  if (entry?.lockedUntil && entry.lockedUntil > now) {
    throw new DomainError('rate-limited', 'Zu viele Versuche. Bitte warte 15 Minuten und versuche es dann noch einmal.')
  }
}

export async function registerFailure(db: Db, key: string, now = new Date()): Promise<void> {
  const entry = await db.loginThrottle.findUnique({ where: { key } })
  if (!entry || now.getTime() - entry.windowStart.getTime() > WINDOW_MS) {
    await db.loginThrottle.upsert({
      where: { key },
      create: { key, failures: 1, windowStart: now },
      update: { failures: 1, windowStart: now, lockedUntil: null },
    })
    return
  }
  const failures = entry.failures + 1
  await db.loginThrottle.update({
    where: { key },
    data: { failures, lockedUntil: failures >= MAX_FAILURES ? new Date(now.getTime() + LOCK_MS) : null },
  })
}

export async function clearFailures(db: Db, key: string): Promise<void> {
  await db.loginThrottle.deleteMany({ where: { key } })
}
