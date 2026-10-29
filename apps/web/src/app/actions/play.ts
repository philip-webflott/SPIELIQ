'use server'

import { db } from '@/server/db'
import { currentUserForAction } from '@/server/auth/current-user'
import { toActionError } from '@/server/action-result'
import { completeMission, recordStepAttempt } from '@/server/modules/progress'
import type { ActionResponse, AttemptPayload } from '@/features/mission/types'

/**
 * Speichert einen Bewertungsversuch. Die Bewertung wird serverseitig aus der
 * Spielereingabe neu berechnet – der Client liefert keine Ergebnisse.
 */
export async function submitAttemptAction(payload: AttemptPayload): Promise<ActionResponse> {
  const user = await currentUserForAction()
  if (!user || user.kind !== 'PLAYER') return { ok: false, error: 'Bitte melde dich an, um deinen Fortschritt zu speichern.' }
  try {
    await recordStepAttempt(db, user.id, payload)
    return { ok: true }
  } catch (error) {
    return toActionError(error)
  }
}

export async function completeMissionAction(missionId: string): Promise<ActionResponse> {
  const user = await currentUserForAction()
  if (!user || user.kind !== 'PLAYER') return { ok: false, error: 'Bitte melde dich an, um deinen Fortschritt zu speichern.' }
  try {
    await completeMission(db, user.id, String(missionId))
    return { ok: true }
  } catch (error) {
    return toActionError(error)
  }
}
