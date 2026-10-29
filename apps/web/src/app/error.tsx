'use client'

import { Button } from '@/components/ui/button'

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="inhalt" className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="eyebrow">Unterbrechung</p>
      <h1 className="font-display text-5xl font-extrabold uppercase tracking-wide">Da lief etwas schief</h1>
      <p className="text-text-muted">Bitte versuche es noch einmal. Wenn es weiter passiert, sag deinem Trainer Bescheid.</p>
      <Button onClick={reset}>Nochmal versuchen</Button>
    </main>
  )
}
