'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { AGE_GROUP_LABELS } from '@spieliq/content'
import { registerAction } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Checkbox, Field, FormError, Input, Select } from '@/components/ui/form'

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, undefined)
  const v = state?.values ?? {}
  return (
    <form action={action} className="space-y-5" noValidate>
      <FormError message={state?.error} />
      <Field label="Dein Name" htmlFor="displayName">
        <Input id="displayName" name="displayName" required autoComplete="name" defaultValue={v.displayName} />
      </Field>
      <Field label="E-Mail" htmlFor="email">
        <Input id="email" name="email" type="email" required autoComplete="email" defaultValue={v.email} />
      </Field>
      <Field label="Passwort" htmlFor="password" hint="Mindestens 10 Zeichen.">
        <Input id="password" name="password" type="password" required minLength={10} autoComplete="new-password" />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Verein" htmlFor="clubName">
          <Input id="clubName" name="clubName" required defaultValue={v.clubName} />
        </Field>
        <Field label="Mannschaft" htmlFor="teamName" hint="z. B. C1-Jugend">
          <Input id="teamName" name="teamName" required defaultValue={v.teamName} />
        </Field>
      </div>
      <Field label="Altersklasse" htmlFor="ageGroup">
        <Select id="ageGroup" name="ageGroup" defaultValue={v.ageGroup || 'C'}>
          {Object.entries(AGE_GROUP_LABELS).map(([id, label]) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </Select>
      </Field>
      <Checkbox name="confirmedAdult" label="Ich bin volljährig und als Trainer:in bzw. für den Verein tätig." />
      <Checkbox
        name="acceptedPrivacy"
        label={
          <>
            Ich habe die{' '}
            <Link href="/privacy" className="font-semibold text-accent hover:underline">
              Datenschutzhinweise
            </Link>{' '}
            gelesen (Entwurf, rechtliche Prüfung ausstehend).
          </>
        }
      />
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? 'Wird angelegt …' : 'Mannschaft anlegen'}
      </Button>
    </form>
  )
}
