import 'server-only'
import { ZodError } from 'zod'
import { DomainError } from './errors'

export type ActionResult<T = undefined> = ({ ok: true } & (T extends undefined ? object : { data: T })) | { ok: false; error: string }

/** Wandelt Fehler in eine anzeigbare Meldung um – technische Details bleiben im Server-Log. */
export function toActionError(error: unknown): { ok: false; error: string } {
  if (error instanceof DomainError) return { ok: false, error: error.userMessage }
  if (error instanceof ZodError) return { ok: false, error: error.issues[0]?.message ?? 'Bitte prüfe deine Eingaben.' }
  console.error('[action]', error)
  return { ok: false, error: 'Da ist etwas schiefgelaufen. Bitte versuche es noch einmal.' }
}
