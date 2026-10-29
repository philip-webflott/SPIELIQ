import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { CoachNav } from '@/features/coach/coach-nav'

export default function CoachShellLayout({ children }: LayoutProps<'/coach'>) {
  return (
    <div className="min-h-dvh pb-12">
      <header className="sticky top-0 z-20 border-b border-line bg-ink-900/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/coach" className="flex items-center gap-3" aria-label="Trainerbereich Start">
            <Logo />
            <span className="hidden rounded-full border border-line-strong px-2.5 py-0.5 text-xs font-semibold text-text-muted sm:inline">Trainer</span>
          </Link>
          <CoachNav />
        </div>
      </header>
      <main id="inhalt" className="mx-auto max-w-6xl px-4 pt-6">
        {children}
      </main>
    </div>
  )
}
