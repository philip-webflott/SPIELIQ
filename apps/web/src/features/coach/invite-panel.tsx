'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { Check, Copy, KeyRound } from 'lucide-react'
import { createInviteAction } from '@/app/actions/coach'
import { Button } from '@/components/ui/button'
import { Checkbox, FormError } from '@/components/ui/form'

export interface ActiveInvite {
  readonly codeHint: string
  readonly expiresAt: string
  readonly uses: number
  readonly maxUses: number
}

/**
 * Teamcode erstellen und teilen. Der Code wird nur direkt nach dem Erstellen
 * angezeigt (gespeichert ist nur ein Hash) – ein neuer Code ersetzt den alten.
 */
export function InvitePanel({
  teamId,
  needsConsent,
  allowsPlayers,
  active,
}: {
  teamId: string
  needsConsent: boolean
  allowsPlayers: boolean
  active: ActiveInvite | null
}) {
  const [state, action, pending] = useActionState(createInviteAction, undefined)
  const [copied, setCopied] = useState(false)
  const fmt = (iso: string) => new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))

  if (!allowsPlayers) {
    return (
      <p className="text-sm text-text-muted">
        In der G- und F-Jugend legt SPIELIQ keine Spielerkonten an. Nutzt die Missionen gemeinsam mit der Gruppe über{' '}
        <Link href="/try" className="font-semibold text-accent hover:underline">
          Ausprobieren
        </Link>{' '}
        – ohne Konto, es wird nichts gespeichert.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {state?.code ? (
        <div className="rounded-2xl border border-accent/40 bg-accent-soft p-4 animate-pop">
          <p className="text-sm text-text-muted">Neuer Teamcode – gib ihn deinen Spieler:innen (gültig bis {fmt(state.expiresAt!)}):</p>
          <div className="mt-2 flex items-center gap-3">
            <code className="font-display text-4xl font-extrabold tracking-[0.15em] text-text" data-testid="invite-code">
              {state.code}
            </code>
            <button
              type="button"
              onClick={() => {
                void navigator.clipboard?.writeText(state.code!).then(() => setCopied(true))
              }}
              className="rounded-full p-2 text-text-muted hover:bg-ink-700 hover:text-text"
              aria-label="Code kopieren"
            >
              {copied ? <Check size={20} className="text-good" /> : <Copy size={20} />}
            </button>
          </div>
          <p className="mt-2 text-xs text-text-faint">Aus Sicherheitsgründen wird der Code später nicht mehr angezeigt. Du kannst jederzeit einen neuen erstellen.</p>
        </div>
      ) : active ? (
        <p className="flex items-center gap-2 text-sm text-text-muted">
          <KeyRound size={16} aria-hidden="true" /> Aktiver Code endet auf <strong className="text-text">…{active.codeHint}</strong>, gültig bis {fmt(active.expiresAt)} ·{' '}
          {active.uses}/{active.maxUses} genutzt
        </p>
      ) : (
        <p className="text-sm text-text-muted">Noch kein aktiver Teamcode.</p>
      )}
      <form action={action} className="space-y-3">
        <input type="hidden" name="teamId" value={teamId} />
        <FormError message={state?.error} />
        {needsConsent && (
          <Checkbox
            name="guardianConsentConfirmed"
            label="Ich bestätige: Für alle Spieler:innen, die diesen Code erhalten, liegt dem Verein die Einwilligung der Sorgeberechtigten vor."
          />
        )}
        <Button type="submit" variant={active || state?.code ? 'secondary' : 'primary'} disabled={pending} data-testid="create-invite">
          {pending ? 'Erstelle …' : active || state?.code ? 'Neuen Code erstellen' : 'Teamcode erstellen'}
        </Button>
      </form>
    </div>
  )
}
