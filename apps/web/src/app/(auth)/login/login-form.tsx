'use client'

import { useActionState } from 'react'
import { loginAction } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Field, FormError, Input } from '@/components/ui/form'

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined)
  return (
    <form action={action} className="space-y-5" noValidate>
      <FormError message={state?.error} />
      <Field label="Spielername oder E-Mail" htmlFor="identifier" hint="Spieler:innen: dein Anmeldename, z. B. flinker-falke-37">
        <Input id="identifier" name="identifier" autoComplete="username" required defaultValue={state?.values?.identifier} autoCapitalize="none" spellCheck={false} />
      </Field>
      <Field label="Passwort" htmlFor="password">
        <Input id="password" name="password" type="password" autoComplete="current-password" required />
      </Field>
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? 'Anmelden …' : 'Anmelden'}
      </Button>
    </form>
  )
}
