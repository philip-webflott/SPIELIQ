import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { UNITS } from '@spieliq/content'
import { Logo } from '@/components/ui/logo'
import { Notice } from '@/components/ui/primitives'
import { UnitPath } from '@/features/player/unit-path'

export const metadata: Metadata = { title: 'Ausprobieren' }

export default function TryPage() {
  const unit = UNITS[0]!
  return (
    <main id="inhalt" className="mx-auto max-w-2xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text">
          <ArrowLeft size={16} aria-hidden="true" /> Start
        </Link>
        <Logo compact />
      </div>
      <p className="eyebrow text-accent">Lerneinheit 1</p>
      <h1 className="font-display text-4xl font-extrabold uppercase leading-none tracking-wide">{unit.title}</h1>
      <p className="mt-2 text-text-muted">{unit.subtitle}</p>
      <div className="my-5">
        <Notice tone="info">Gastmodus: Du kannst alles ausprobieren. Gespeichert wird nichts – auch nicht in deinem Browser.</Notice>
      </div>
      <UnitPath unit={unit} hrefFor={(id) => `/try/${id}`} stateFor={() => 'offen'} />
    </main>
  )
}
