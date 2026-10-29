import { z } from 'zod'
import { assessStep, isInteractive, type Rating } from '@spieliq/engine'
import { allCompetencyProgress, findMission, principleSummary, type AttemptFact, type ObservationFact } from '@spieliq/content'
import type { Db } from '../db'
import { invalid, notFound } from '../errors'

/**
 * Lernfortschritt
 * ==============
 * Der Client zeigt sofortiges Feedback mit derselben Engine. Gespeichert wird
 * aber nur, was der Server selbst aus der Spielereingabe berechnet – so sind
 * gespeicherte Bewertungen nicht manipulierbar und jederzeit reproduzierbar.
 */

const vec2 = z.object({ x: z.number().finite().min(-10).max(150), y: z.number().finite().min(-10).max(120) })

export const stepAttemptSchema = z.object({
  missionId: z.string().min(1).max(80),
  stepIndex: z.number().int().min(0).max(50),
  answer: z.object({
    positions: z.record(z.string().max(20), vec2).optional(),
    selection: z
      .object({ playerId: z.string().max(20).optional(), point: vec2.optional(), optionId: z.string().max(40).optional() })
      .optional(),
  }),
  hintsUsed: z.number().int().min(0).max(3).default(0),
  durationMs: z.number().int().min(0).max(3_600_000).optional(),
  assignmentId: z.string().max(40).optional(),
})

const RATING_ORDER: Record<Rating, number> = { 'not-yet': 0, good: 1, excellent: 2 }

function worse(a: Rating, b: Rating): Rating {
  return RATING_ORDER[a] <= RATING_ORDER[b] ? a : b
}

async function validAssignmentId(db: Db, userId: string, assignmentId: string | undefined, missionId: string) {
  if (!assignmentId) return null
  const assignment = await db.assignment.findUnique({
    where: { id: assignmentId },
    select: { id: true, teamId: true, missionIds: true, targetUserIds: true, archivedAt: true },
  })
  if (!assignment || assignment.archivedAt || !assignment.missionIds.includes(missionId)) return null
  if (assignment.targetUserIds.length > 0 && !assignment.targetUserIds.includes(userId)) return null
  const member = await db.teamMembership.findUnique({
    where: { teamId_userId: { teamId: assignment.teamId, userId } },
    select: { role: true },
  })
  return member?.role === 'PLAYER' ? assignment.id : null
}

export async function recordStepAttempt(db: Db, userId: string, input: z.input<typeof stepAttemptSchema>) {
  const data = stepAttemptSchema.parse(input)
  const loaded = findMission(data.missionId)
  if (!loaded) throw notFound('Diese Mission gibt es nicht.')
  const step = loaded.mission.steps[data.stepIndex]
  if (!step || !isInteractive(step)) throw invalid('Dieser Schritt kann nicht bewertet werden.')
  const result = assessStep(loaded, data.stepIndex, data.answer)
  const hintsUsed = loaded.mission.mode === 'test' ? 0 : Math.min(data.hintsUsed, step.hints.length)
  const assignmentId = await validAssignmentId(db, userId, data.assignmentId, data.missionId)
  const positions =
    step.kind === 'place'
      ? Object.fromEntries(Object.entries(data.answer.positions ?? {}).filter(([id]) => step.controlled.includes(id)))
      : undefined
  await db.$transaction([
    db.attempt.create({
      data: {
        userId,
        missionId: data.missionId,
        missionVersion: loaded.mission.version,
        stepId: step.id,
        answer: { ...(positions ? { positions } : {}), ...(data.answer.selection ? { selection: data.answer.selection } : {}) },
        rating: result.rating,
        score: result.score,
        principles: result.principles,
        criteria: result.criteria.map((c) => ({ id: c.id, passed: c.passed, score: Math.round(c.score * 1000) / 1000, feedbackKey: c.feedbackKey })),
        hintsUsed,
        durationMs: data.durationMs ?? null,
        assignmentId,
      },
    }),
    db.missionProgress.upsert({
      where: { userId_missionId: { userId, missionId: data.missionId } },
      create: {
        userId,
        missionId: data.missionId,
        missionVersion: loaded.mission.version,
        status: 'IN_PROGRESS',
        attempts: 1,
        hintsUsed,
      },
      update: { attempts: { increment: 1 }, hintsUsed: { increment: hintsUsed } },
    }),
  ])
  return {
    rating: result.rating,
    score: result.score,
    principles: result.principles,
    primaryFeedbackKey: result.primary?.feedbackKey ?? null,
  }
}

/**
 * Schließt eine Mission ab – nur wenn der Server es anhand gespeicherter
 * Versuche bestätigen kann: Lernmissionen verlangen jeden interaktiven Schritt
 * mindestens einmal gelöst, Tests verlangen jeden Schritt einmal bearbeitet.
 */
export async function completeMission(db: Db, userId: string, missionId: string, now = new Date()) {
  const loaded = findMission(missionId)
  if (!loaded) throw notFound('Diese Mission gibt es nicht.')
  const interactive = loaded.mission.steps.filter(isInteractive)
  const attempts = await db.attempt.findMany({
    where: { userId, missionId, missionVersion: loaded.mission.version },
    select: { stepId: true, rating: true },
  })
  const bestByStep = new Map<string, Rating>()
  for (const a of attempts) {
    const rating = a.rating as Rating
    const prev = bestByStep.get(a.stepId)
    if (!prev || RATING_ORDER[rating] > RATING_ORDER[prev]) bestByStep.set(a.stepId, rating)
  }
  const isTest = loaded.mission.mode === 'test'
  const complete = interactive.every((s) => {
    const best = bestByStep.get(s.id)
    return isTest ? best !== undefined : best !== undefined && best !== 'not-yet'
  })
  if (!complete) throw invalid('Die Mission ist noch nicht vollständig gelöst.')
  const missionRating = interactive.reduce<Rating>((acc, s) => worse(acc, bestByStep.get(s.id) ?? 'not-yet'), 'excellent')
  return db.missionProgress.upsert({
    where: { userId_missionId: { userId, missionId } },
    create: { userId, missionId, missionVersion: loaded.mission.version, status: 'COMPLETED', bestRating: missionRating, completedAt: now },
    update: { status: 'COMPLETED', bestRating: missionRating, completedAt: now, missionVersion: loaded.mission.version },
  })
}

export async function attemptFacts(db: Db, userIds: string[]): Promise<Map<string, AttemptFact[]>> {
  const rows = await db.attempt.findMany({
    where: { userId: { in: userIds } },
    select: { userId: true, missionId: true, stepId: true, rating: true, principles: true, hintsUsed: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  })
  const out = new Map<string, AttemptFact[]>(userIds.map((id) => [id, []]))
  for (const r of rows) {
    out.get(r.userId)?.push({
      missionId: r.missionId,
      stepId: r.stepId,
      rating: r.rating as Rating,
      principles: (r.principles ?? {}) as Record<string, boolean>,
      hintsUsed: r.hintsUsed,
      createdAt: r.createdAt,
    })
  }
  return out
}

export async function observationFacts(db: Db, userIds: string[]): Promise<Map<string, ObservationFact[]>> {
  const rows = await db.fieldObservation.findMany({
    where: { playerId: { in: userIds } },
    select: { playerId: true, principleId: true, rating: true, observedOn: true },
  })
  const out = new Map<string, ObservationFact[]>(userIds.map((id) => [id, []]))
  for (const r of rows) out.get(r.playerId)?.push({ principleId: r.principleId, rating: r.rating, observedOn: r.observedOn })
  return out
}

/** Eigener Lernstand eines Spielers (nur für ihn selbst bzw. seine Trainer). */
export async function playerProgress(db: Db, userId: string, now = new Date()) {
  const [missions, attemptsMap, observationsMap] = await Promise.all([
    db.missionProgress.findMany({ where: { userId } }),
    attemptFacts(db, [userId]),
    observationFacts(db, [userId]),
  ])
  const attempts = attemptsMap.get(userId) ?? []
  const observations = observationsMap.get(userId) ?? []
  return {
    missions: new Map(missions.map((m) => [m.missionId, m])),
    competencies: allCompetencyProgress(attempts, observations, now),
    principles: principleSummary(attempts),
    attemptCount: attempts.length,
  }
}
