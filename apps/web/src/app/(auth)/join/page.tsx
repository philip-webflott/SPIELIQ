import type { Metadata } from 'next'
import Link from 'next/link'
import { JoinForm } from './join-form'

export const metadata: Metadata = { title: 'Team beitreten' }

export default function JoinPage() {
  return (
    <div className="card animate-rise p-6 sm:p-8">
      <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide">Team beitreten</h1>
      <p className="mb-6 mt-1 text-text-muted">Mit dem Teamcode von deinem Trainer bist du in einer Minute dabei.</p>
      <JoinForm />
      <p className="mt-6 text-sm text-text-muted">
        Schon dabei?{' '}
        <Link href="/login" className="font-semibold text-accent hover:underline">
          Anmelden
        </Link>
      </p>
    </div>
  )
}
