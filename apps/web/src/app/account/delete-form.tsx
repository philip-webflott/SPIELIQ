'use client'

import { useActionState } from 'react'
import { deleteAccountAction } from '@/app/actions/account'
import { Button } from '@/components/ui/button'
import { Field, FormError, Input } from '@/components/ui/form'

export function DeleteAccountForm() {
  const [state, action, pending] = useActionState(deleteAccountAction, undefined)
  return (
    <form action={action} className="space-y-4">
      <FormError message={state?.error} />
      <Field label="Passwort" htmlFor="del-password">
        <Input id="del-password" name="password" type="password" autoComplete="current-password" required />
      </Field>
      <Field label='Zur Bestätigung "LÖSCHEN" eintippen' htmlFor="del-confirm">
        <Input id="del-confirm" name="confirm" required autoComplete="off" />
      </Field>
      <Button type="submit" variant="danger" disabled={pending}>
        {pending ? 'Wird gelöscht …' : 'Konto endgültig löschen'}
      </Button>
    </form>
  )
}
