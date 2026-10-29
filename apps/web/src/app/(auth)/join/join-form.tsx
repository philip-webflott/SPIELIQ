'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { KeyRound } from 'lucide-react'
import { joinAction } from '@/app/actions/auth'
import { Button, LinkButton } from '@/components/ui/button'
import { Checkbox, Field, FormError, Input } from '@/components/ui/form'

export function JoinForm() {
  const [state, action, pending] = useActionState(joinAction, undefined)

  if (state?.loginName) {
    return (
      <div className="space-y-5 animate-pop" data-testid="join-success">
        <h2 className="font-display text-3xl font-bold uppercase tracking-wide">Willkommen im Team!</h2>
        <p className="text-text-muted">Du bist jetzt bei „{state.teamName}“. Merk dir deinen Anmeldenamen – du brauchst ihn zum Anmelden:</p>
        <div className="flex items-center gap-3 rounded-2xl border border-accent/40 bg-accent-soft px-4 py-4">
          <KeyRound className="text-accent" aria-hidden="true" />
          <code className="font-display text-2xl font-bold tracking-wide text-text" data-testid="login-name">
            {state.loginName}
          </code>
        </div>
        <p className="text-sm text-text-faint">Tipp: Schreib ihn auf oder mach ein Foto davon. Dein Trainer kann dir auch helfen.</p>
        <LinkButton href="/play" size="lg" className="w-full">
          Los geht&apos;s
        </LinkButton>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-5" noValidate>
      <FormError message={state?.error} />
      <Field label="Teamcode" htmlFor="code" hint="Den Code bekommst du von deinem Trainer, z. B. ABCD-2345.">
        <Input id="code" name="code" required autoCapitalize="characters" autoComplete="off" spellCheck={false} defaultValue={state?.values?.code} className="font-display text-xl tracking-[0.2em] uppercase" />
      </Field>
      <Field label="Dein Spitzname" htmlFor="displayName" hint="Kein voller Name nötig – so sieht dich dein Trainer.">
        <Input id="displayName" name="displayName" required maxLength={24} defaultValue={state?.values?.displayName} autoComplete="nickname" />
      </Field>
      <Field label="Passwort" htmlFor="password" hint="Mindestens 8 Zeichen. Nicht dasselbe wie bei anderen Apps.">
        <Input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" />
      </Field>
      <div className="rounded-2xl border border-line bg-ink-850 p-4 text-sm text-text-muted">
        <p className="font-semibold text-text">Kurz erklärt: Was speichert SPIELIQ?</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>deinen Spitznamen und deinen Anmeldenamen</li>
          <li>welche Aufgaben du gelöst hast – das sehen nur du und deine Trainer</li>
          <li>keine E-Mail, kein Geburtsdatum, keinen Standort, keine Chats</li>
        </ul>
        <p className="mt-2">
          Deine Eltern müssen einverstanden sein – darum kümmert sich dein Verein.{' '}
          <Link href="/privacy/kids" className="font-semibold text-accent hover:underline">
            Mehr lesen
          </Link>
        </p>
      </div>
      <Checkbox name="acceptedPrivacy" label="Ich habe das gelesen und bin einverstanden." required />
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? 'Einen Moment …' : 'Team beitreten'}
      </Button>
    </form>
  )
}
