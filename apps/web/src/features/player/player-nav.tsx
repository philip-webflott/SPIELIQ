'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChartColumn, House, Map, User } from 'lucide-react'

const ITEMS = [
  { href: '/play', label: 'Start', icon: House, exact: true },
  { href: '/play/unit/nicht-alle-zum-ball', label: 'Training', icon: Map, exact: false },
  { href: '/play/progress', label: 'Fortschritt', icon: ChartColumn, exact: false },
  { href: '/account', label: 'Profil', icon: User, exact: false },
] as const

/** Untere Navigation (Smartphone) bzw. seitliche Leiste (Desktop) – vier klare Ziele. */
export function PlayerNav() {
  return (
    <Suspense fallback={<PlayerNavLinks pathname="" />}>
      <PlayerNavWithPath />
    </Suspense>
  )
}

function PlayerNavWithPath() {
  return <PlayerNavLinks pathname={usePathname()} />
}

function PlayerNavLinks({ pathname }: { pathname: string }) {
  return (
    <nav
      aria-label="Spielerbereich"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ink-900/92 pb-[env(safe-area-inset-bottom)] backdrop-blur md:static md:border-0 md:bg-transparent md:pb-0"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-4 md:flex md:max-w-none md:gap-1">
        {ITEMS.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`flex flex-col items-center gap-1 px-2 py-2.5 text-xs font-semibold md:flex-row md:rounded-full md:px-4 md:py-2 md:text-sm ${
                  active ? 'text-accent md:bg-accent-soft' : 'text-text-muted hover:text-text'
                }`}
              >
                <Icon size={22} aria-hidden="true" />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
