import { LinkButton } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main id="inhalt" className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="eyebrow">Abseits</p>
      <h1 className="font-display text-5xl font-extrabold uppercase tracking-wide">Seite nicht gefunden</h1>
      <p className="text-text-muted">Diese Seite gibt es nicht (mehr).</p>
      <LinkButton href="/">Zur Startseite</LinkButton>
    </main>
  )
}
