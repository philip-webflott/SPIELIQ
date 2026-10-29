'use client'

import { useActionState } from 'react'
import { recordObservationAction, resetPasswordAction } from '@/app/actions/coach'
import { Button } from '@/components/ui/button'
import { Field, FormError, Input, Select, Textarea } from '@/components/ui/form'

export function ObservationForm({ teamId, playerId, principles }: { teamId: string; playerId: string; principles: { id: string; name: string }[] }) {
  const [state, action, pending] = useActionState(recordObservationAction, undefined)
  const today = new Date().toISOString().slice(0, 10)
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="teamId" value={teamId} />
      <input type="hidden" name="playerId" value={playerId} />
      <FormError message={state?.error} />
      {state?.ok && <p className="text-sm font-semibold text-good">{state.message}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Prinzip" htmlFor="obs-principle">
          <Select id="obs-principle" name="principleId">
            {principles.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Im Training gesehen?" htmlFor="obs-rating">
          <Select id="obs-rating" name="rating" defaultValue="EMERGING">
            <option value="CONSISTENT">sicher angewendet</option>
            <option value="EMERGING">in Ansätzen</option>
            <option value="NOT_OBSERVED">noch nicht beobachtet</option>
          </Select>
        </Field>
      </div>
      <Field label="Datum" htmlFor="obs-date">
        <Input id="obs-date" name="observedOn" type="date" defaultValue={today} max={today} />
      </Field>
      <Field label="Notiz (optional)" htmlFor="obs-note" hint="Sachlich und kurz – keine Bewertung der Person, keine Gesundheitsdaten.">
        <Textarea id="obs-note" name="note" rows={2} maxLength={280} />
      </Field>
      <Button type="submit" disabled={pending}>
        {pending ? 'Speichern …' : 'Beobachtung speichern'}
      </Button>
    </form>
  )
}

export function ResetPasswordForm({ teamId, playerId }: { teamId: string; playerId: string }) {
  const [state, action, pending] = useActionState(resetPasswordAction, undefined)
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="teamId" value={teamId} />
      <input type="hidden" name="playerId" value={playerId} />
      <FormError message={state?.error} />
      {state?.temporaryPassword ? (
        <div className="rounded-xl border border-accent/40 bg-accent-soft p-3 text-sm">
          <p>
            Anmeldename: <code className="font-semibold">{state.loginName}</code>
          </p>
          <p>
            Vorläufiges Passwort: <code className="font-semibold">{state.temporaryPassword}</code>
          </p>
          <p className="mt-1 text-xs text-text-faint">Wird nur jetzt angezeigt. Alle bisherigen Anmeldungen wurden beendet.</p>
        </div>
      ) : (
        <Button type="submit" variant="secondary" size="sm" disabled={pending}>
          Passwort zurücksetzen
        </Button>
      )}
    </form>
  )
}
