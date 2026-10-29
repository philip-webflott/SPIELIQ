import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { PlayerNav } from '@/features/player/player-nav'

export default function PlayerShellLayout({ children }: LayoutProps<'/play'>) {
  return (
    <div className="min-h-dvh pb-24 md:pb-8">
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/play" aria-label="SPIELIQ Start">
          <Logo />
        </Link>
        <div className="hidden md:block">
          <PlayerNav />
        </div>
      </header>
      <main id="inhalt" className="mx-auto max-w-5xl px-4">
        {children}
      </main>
      <div className="md:hidden">
        <PlayerNav />
      </div>
    </div>
  )
}
