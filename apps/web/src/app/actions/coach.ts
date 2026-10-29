'use server'

import { refresh } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/server/db'
import { currentUserForAction } from '@/server/auth/current-user'
import { toActionError } from '@/server/action-result'
import { DomainError } from '@/server/errors'
import { archiveAssignment, createAssignment } from '@/server/modules/assignments'
import { recordObservation } from '@/server/modules/observations'
import { createInvitation, createTeam, removePlayer, resetPlayerPassword, setPlayerLevel } from '@/server/modules/teams'

async function requireCoach() {
  const user = await currentUserForAction()
  if (!user || user.kind !== 'ADULT') throw new DomainError('unauthenticated', 'Bitte melde dich als Trainer:in an.')
  return user
}

function field(form: FormData, name: string): string {
  const v = form.get(name)
  return typeof v === 'string' ? v : ''
}

export type InviteState = { error?: string; code?: string; expiresAt?: string } | undefined

export async function createInviteAction(_prev: InviteState, form: FormData): Promise<InviteState> {
  try {
    const coach = await requireCoach()
    const result = await createInvitation(db, coach.id, {
      teamId: field(form, 'teamId'),
      guardianConsentConfirmed: form.get('guardianConsentConfirmed') === 'on',
    })
    refresh()
    return { code: result.code, expiresAt: result.expiresAt.toISOString() }
  } catch (error) {
    return { error: toActionError(error).error }
  }
}

export type SimpleState = { error?: string; ok?: boolean; message?: string } | undefined

export async function createTeamAction(_prev: SimpleState, form: FormData): Promise<SimpleState> {
  let teamId: string
  try {
    const coach = await requireCoach()
    const team = await createTeam(db, coach.id, {
      orgId: field(form, 'orgId'),
      name: field(form, 'name'),
      ageGroup: field(form, 'ageGroup') as 'C',
    })
    teamId = team.id
  } catch (error) {
    return { error: toActionError(error).error }
  }
  redirect(`/coach/team/${teamId}?neu=1`)
}

export async function createAssignmentAction(_prev: SimpleState, form: FormData): Promise<SimpleState> {
  const teamId = field(form, 'teamId')
  try {
    const coach = await requireCoach()
    const due = field(form, 'dueAt')
    await createAssignment(db, coach.id, {
      teamId,
      title: field(form, 'title'),
      missionIds: form.getAll('missionIds').filter((v): v is string => typeof v === 'string'),
      dueAt: due ? new Date(`${due}T20:00:00`) : undefined,
      estimatedMinutes: Number(field(form, 'estimatedMinutes') || '10'),
      note: field(form, 'note') || undefined,
      targetUserIds: form.getAll('targetUserIds').filter((v): v is string => typeof v === 'string'),
    })
  } catch (error) {
    return { error: toActionError(error).error }
  }
  redirect(`/coach/team/${teamId}/assignments`)
}

export async function archiveAssignmentAction(form: FormData): Promise<void> {
  const coach = await requireCoach()
  await archiveAssignment(db, coach.id, field(form, 'assignmentId'))
  refresh()
}

export async function recordObservationAction(_prev: SimpleState, form: FormData): Promise<SimpleState> {
  try {
    const coach = await requireCoach()
    await recordObservation(db, coach.id, {
      teamId: field(form, 'teamId'),
      playerId: field(form, 'playerId'),
      principleId: field(form, 'principleId'),
      rating: field(form, 'rating') as 'EMERGING',
      observedOn: new Date(field(form, 'observedOn') || Date.now()),
      note: field(form, 'note') || undefined,
    })
    refresh()
    return { ok: true, message: 'Beobachtung gespeichert.' }
  } catch (error) {
    return { error: toActionError(error).error }
  }
}

export type ResetState = { error?: string; loginName?: string | null; temporaryPassword?: string } | undefined

export async function resetPasswordAction(_prev: ResetState, form: FormData): Promise<ResetState> {
  try {
    const coach = await requireCoach()
    return await resetPlayerPassword(db, coach.id, field(form, 'teamId'), field(form, 'playerId'))
  } catch (error) {
    return { error: toActionError(error).error }
  }
}

export async function removePlayerAction(form: FormData): Promise<void> {
  const coach = await requireCoach()
  const teamId = field(form, 'teamId')
  await removePlayer(db, coach.id, teamId, field(form, 'playerId'))
  redirect(`/coach/team/${teamId}`)
}

export async function setLevelAction(form: FormData): Promise<void> {
  const coach = await requireCoach()
  const raw = field(form, 'level')
  await setPlayerLevel(db, coach.id, field(form, 'teamId'), field(form, 'playerId'), raw ? Number(raw) : null)
  refresh()
}
