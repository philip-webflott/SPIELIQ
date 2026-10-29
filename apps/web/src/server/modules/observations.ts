import { z } from 'zod'
import { PRINCIPLES } from '@spieliq/content'
import type { Db } from '../db'
import { invalid } from '../errors'
import { requireCoachOfPlayer } from '../policies'
import { audit } from './audit'

/**
 * Trainerbeobachtungen im Training: einzige Quelle für "auf dem Platz
 * angewendet". Bewusst grob (nicht beobachtet / in Ansätzen / sicher), kurze
 * sachliche Notiz, keine Bewertung der Person.
 */
export const observationSchema = z.object({
  teamId: z.string().min(1),
  playerId: z.string().min(1),
  principleId: z.string().min(1),
  rating: z.enum(['NOT_OBSERVED', 'EMERGING', 'CONSISTENT']),
  observedOn: z.coerce.date(),
  note: z.string().trim().max(280).optional(),
})

export async function recordObservation(db: Db, coachId: string, input: z.input<typeof observationSchema>, now = new Date()) {
  const data = observationSchema.parse(input)
  if (!PRINCIPLES.some((p) => p.id === data.principleId)) throw invalid('Unbekanntes Prinzip.')
  if (data.observedOn.getTime() > now.getTime() + 24 * 3600 * 1000) throw invalid('Das Datum liegt in der Zukunft.')
  await requireCoachOfPlayer(db, coachId, data.teamId, data.playerId)
  const created = await db.fieldObservation.create({
    data: {
      teamId: data.teamId,
      playerId: data.playerId,
      observerId: coachId,
      principleId: data.principleId,
      rating: data.rating,
      observedOn: data.observedOn,
      note: data.note || null,
    },
  })
  await audit(db, coachId, 'observation.create', 'User', data.playerId)
  return created
}

export async function observationsForPlayer(db: Db, coachId: string, teamId: string, playerId: string) {
  await requireCoachOfPlayer(db, coachId, teamId, playerId)
  return db.fieldObservation.findMany({
    where: { playerId, teamId },
    orderBy: { observedOn: 'desc' },
    select: { id: true, principleId: true, rating: true, observedOn: true, note: true, observer: { select: { displayName: true } } },
  })
}
