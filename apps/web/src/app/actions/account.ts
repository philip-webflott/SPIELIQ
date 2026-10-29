'use server'

import { redirect } from 'next/navigation'
import { refresh } from 'next/cache'
import { db } from '@/server/db'
import { currentUserForAction, endSession } from '@/server/auth/current-user'
import { toActionError } from '@/server/action-result'
import { deleteAccount, updateDisplayName } from '@/server/modules/accounts'

export type NameState = { error?: string; saved?: boolean } | undefined

export async function updateDisplayNameAction(_prev: NameState, form: FormData): Promise<NameState> {
  const user = await currentUserForAction()
  if (!user) redirect('/login')
  try {
    await updateDisplayName(db, user.id, String(form.get('displayName') ?? ''))
  } catch (error) {
    return { error: toActionError(error).error }
  }
  refresh()
  return { saved: true }
}

export type DeleteState = { error?: string } | undefined

export async function deleteAccountAction(_prev: DeleteState, form: FormData): Promise<DeleteState> {
  const user = await currentUserForAction()
  if (!user) redirect('/login')
  if (form.get('confirm') !== 'LÖSCHEN') return { error: 'Bitte tippe LÖSCHEN zur Bestätigung.' }
  try {
    await deleteAccount(db, user.id, String(form.get('password') ?? ''))
  } catch (error) {
    return { error: toActionError(error).error }
  }
  await endSession()
  redirect('/?geloescht=1')
}
