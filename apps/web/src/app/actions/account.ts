'use server'

import { redirect } from 'next/navigation'
import { db } from '@/server/db'
import { currentUserForAction, endSession } from '@/server/auth/current-user'
import { toActionError } from '@/server/action-result'
import { deleteAccount } from '@/server/modules/accounts'

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
