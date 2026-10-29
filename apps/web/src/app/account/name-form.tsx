'use client'

import { useActionState } from 'react'
import { updateDisplayNameAction } from '@/app/actions/account'
import { Button } from '@/components/ui/button'
import { Field, FormError, Input } from '@/components/ui/form'

/** Anzeigenamen selbst berichtigen. Spieler:innen nutzen einen Spitznamen, nicht den vollen Namen. */
export function DisplayNameForm({ current, isPlayer }: { current: string; isPlayer: boolean }) {
  const [state, action, pending] = useActionState(updateDisplayNameAction, undefined)
  return (
    <form action={action} className="mt-4 space-y-3">
      <FormError message={state?.error} />
      <Field
        label="Anzeigename ändern"
        htmlFor="display-name"
        hint={isPlayer ? 'Nutze einen Spitznamen – nicht deinen vollen Namen.' : undefined}
      >
        <Input id="display-name" name="displayName" defaultValue={current} maxLength={isPlayer ? 24 : 60} required />
      </Field>
      <div className="flex items-center gap-3">
        <Button type="submit" variant="secondary" size="sm" disabled={pending}>
          {pending ? 'Speichere …' : 'Speichern'}
        </Button>
        {state?.saved && (
          <p role="status" className="text-sm text-good">
            Gespeichert.
          </p>
        )}
      </div>
    </form>
  )
}
