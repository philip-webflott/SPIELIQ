import type { Metadata } from 'next'
import Link from 'next/link'
import { LoginForm } from './login-form'

export const metadata: Metadata = { title: 'Anmelden' }

export default function LoginPage() {
  return (
    <div className="card animate-rise p-6 sm:p-8">
      <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide">Anmelden</h1>
      <p className="mb-6 mt-1 text-text-muted">Willkommen zurück!</p>
      <LoginForm />
      <div className="mt-6 space-y-2 text-sm text-text-muted">
        <p>
          Neu im Team?{' '}
          <Link href="/join" className="font-semibold text-accent hover:underline">
            Mit Teamcode beitreten
          </Link>
        </p>
        <p>
          Trainer:in?{' '}
          <Link href="/register" className="font-semibold text-accent hover:underline">
            Mannschaft anlegen
          </Link>
        </p>
        <p className="text-text-faint">Passwort vergessen? Spieler:innen fragen ihren Trainer – er kann es zurücksetzen.</p>
      </div>
    </div>
  )
}
