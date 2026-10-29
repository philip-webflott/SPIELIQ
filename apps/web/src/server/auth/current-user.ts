import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { connection } from 'next/server'
import { cache } from 'react'
import { db } from '../db'
import { createSession, invalidateSession, SESSION_COOKIE, SESSION_DAYS, validateSession, type SessionUser } from './sessions'

/**
 * Data Access Layer für die aktuelle Sitzung (Next.js-spezifisch).
 * Seiten lesen die Sitzung innerhalb von <Suspense>; Server Actions prüfen
 * sie bei JEDEM Aufruf erneut (keine Berechtigung allein über die Oberfläche).
 */

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_DAYS * 24 * 60 * 60,
}

export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  // Sitzungsprüfung vergleicht mit der aktuellen Zeit → immer zur Anfragezeit ausführen.
  await connection()
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (!token) return null
  const result = await validateSession(db, token)
  return result?.user ?? null
})

export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  return user
}

export async function requirePlayer(): Promise<SessionUser> {
  const user = await requireUser()
  if (user.kind !== 'PLAYER') redirect('/coach')
  return user
}

export async function requireAdult(): Promise<SessionUser> {
  const user = await requireUser()
  if (user.kind !== 'ADULT') redirect('/play')
  return user
}

/** Für Server Actions: prüft die Sitzung und verlängert das Cookie bei Bedarf. */
export async function currentUserForAction(): Promise<SessionUser | null> {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (!token) return null
  const result = await validateSession(db, token)
  if (!result) return null
  if (result.renewed) store.set(SESSION_COOKIE, token, cookieOptions)
  return result.user
}

export async function startSession(userId: string): Promise<void> {
  const { token } = await createSession(db, userId)
  ;(await cookies()).set(SESSION_COOKIE, token, cookieOptions)
}

export async function endSession(): Promise<void> {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (token) await invalidateSession(db, token)
  store.delete(SESSION_COOKIE)
}
