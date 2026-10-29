import type { Db } from '../db'

/** Protokolliert datenschutz- und sicherheitsrelevante Aktionen (ohne Inhalte, nur wer/was/wann). */
export async function audit(db: Db, actorId: string | null, action: string, targetType: string, targetId: string): Promise<void> {
  await db.auditEvent.create({ data: { actorId, action, targetType, targetId } })
}
