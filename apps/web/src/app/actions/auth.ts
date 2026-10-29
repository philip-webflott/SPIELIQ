'use server'

import { redirect } from 'next/navigation'
import { db } from '@/server/db'
import { endSession, startSession } from '@/server/auth/current-user'
import { toActionError } from '@/server/action-result'
import { authenticate, joinTeamWithCode, registerCoach } from '@/server/modules/accounts'

export type FormState = { error?: string; values?: Record<string, string> } | undefined

function field(form: FormData, name: string): string {
  const v = form.get(name)
  return typeof v === 'string' ? v : ''
}

export async function loginAction(_prev: FormState, form: FormData): Promise<FormState> {
  let userId: string
  let kind: 'ADULT' | 'PLAYER'
  try {
    const result = await authenticate(db, { identifier: field(form, 'identifier'), password: field(form, 'password') })
    userId = result.userId
    const user = await db.user.findUniqueOrThrow({ where: { id: userId }, select: { kind: true } })
    kind = user.kind
    await startSession(userId)
  } catch (error) {
    return { error: toActionError(error).error, values: { identifier: field(form, 'identifier') } }
  }
  redirect(kind === 'ADULT' ? '/coach' : '/play')
}

export async function logoutAction(): Promise<void> {
  await endSession()
  redirect('/')
}

export type JoinState = { error?: string; values?: Record<string, string>; loginName?: string; teamName?: string } | undefined

export async function joinAction(_prev: JoinState, form: FormData): Promise<JoinState> {
  const values = { code: field(form, 'code'), displayName: field(form, 'displayName') }
  try {
    const result = await joinTeamWithCode(db, {
      code: values.code,
      displayName: values.displayName,
      password: field(form, 'password'),
      acceptedPrivacy: form.get('acceptedPrivacy') === 'on',
    })
    await startSession(result.userId)
    return { loginName: result.loginName, teamName: result.teamName }
  } catch (error) {
    return { error: toActionError(error).error, values }
  }
}

export type RegisterState = { error?: string; values?: Record<string, string> } | undefined

export async function registerAction(_prev: RegisterState, form: FormData): Promise<RegisterState> {
  const values = {
    displayName: field(form, 'displayName'),
    email: field(form, 'email'),
    clubName: field(form, 'clubName'),
    teamName: field(form, 'teamName'),
    ageGroup: field(form, 'ageGroup'),
  }
  let teamId: string
  try {
    const result = await registerCoach(db, {
      ...values,
      ageGroup: values.ageGroup as 'C',
      password: field(form, 'password'),
      confirmedAdult: form.get('confirmedAdult') === 'on',
      acceptedPrivacy: form.get('acceptedPrivacy') === 'on',
    })
    await startSession(result.userId)
    teamId = result.teamId
  } catch (error) {
    return { error: toActionError(error).error, values }
  }
  redirect(`/coach/team/${teamId}?neu=1`)
}

