import type { Metadata } from 'next'
import Link from 'next/link'
import { RegisterForm } from './register-form'

export const metadata: Metadata = { title: 'Mannschaft anlegen' }

export default function RegisterPage() {
  return (
    <div className="card animate-rise p-6 sm:p-8">
      <p className="eyebrow text-accent">Für Trainer:innen</p>
      <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide">Mannschaft anlegen</h1>
      <p className="mb-6 mt-1 text-text-muted">Danach lädst du deine Spieler:innen mit einem Teamcode ein.</p>
      <RegisterForm />
      <p className="mt-6 text-sm text-text-muted">
        Schon registriert?{' '}
        <Link href="/login" className="font-semibold text-accent hover:underline">
          Anmelden
        </Link>
      </p>
    </div>
  )
}
