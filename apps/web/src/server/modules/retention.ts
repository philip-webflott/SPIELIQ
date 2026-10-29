import type { Db } from '../db'

/**
 * Speicherfristen (Vorschlag, rechtlich zu prüfen – docs/recht/datenschutzkonzept.md, Abschnitt 6).
 *
 * - Eingabedetails von Versuchen (Positionen, Auswahl, Bearbeitungsdauer) werden nach
 *   30 Tagen entfernt. Bewertung, Kriterien, Prinzipien und Tipps bleiben, damit der
 *   Lernstand erhalten bleibt (Recherche D: Rohdaten nur kurz vorhalten).
 * - Abgelaufene Sitzungen werden gelöscht.
 * - Einträge der Anmeldedrosselung ohne aktive Sperre werden nach 24 Stunden gelöscht.
 * - Audit-Ereignisse werden nach 12 Monaten gelöscht.
 *
 * Läuft als täglicher Betriebsjob: `pnpm --filter @spieliq/web db:retention`.
 */
export const RETENTION = {
  attemptDetailsDays: 30,
  throttleHours: 24,
  auditMonths: 12,
} as const

export interface RetentionResult {
  readonly attemptDetailsPruned: number
  readonly sessionsDeleted: number
  readonly throttlesDeleted: number
  readonly auditEventsDeleted: number
}

export async function applyRetention(db: Db, now = new Date()): Promise<RetentionResult> {
  const detailsBefore = new Date(now.getTime() - RETENTION.attemptDetailsDays * 24 * 3600 * 1000)
  const throttleBefore = new Date(now.getTime() - RETENTION.throttleHours * 3600 * 1000)
  const auditBefore = new Date(now)
  auditBefore.setMonth(auditBefore.getMonth() - RETENTION.auditMonths)

  const [attempts, sessions, throttles, audits] = await db.$transaction([
    db.attempt.updateMany({
      where: { createdAt: { lt: detailsBefore }, detailsPrunedAt: null },
      data: { answer: {}, durationMs: null, detailsPrunedAt: now },
    }),
    db.session.deleteMany({ where: { expiresAt: { lt: now } } }),
    db.loginThrottle.deleteMany({
      where: { windowStart: { lt: throttleBefore }, OR: [{ lockedUntil: null }, { lockedUntil: { lt: now } }] },
    }),
    db.auditEvent.deleteMany({ where: { createdAt: { lt: auditBefore } } }),
  ])
  return {
    attemptDetailsPruned: attempts.count,
    sessionsDeleted: sessions.count,
    throttlesDeleted: throttles.count,
    auditEventsDeleted: audits.count,
  }
}
