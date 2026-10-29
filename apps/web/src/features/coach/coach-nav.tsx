'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, User, Users } from 'lucide-react'

const ITEMS = [
  { href: '/coach', label: 'Mannschaften', icon: Users, exact: false, not: '/coach/drills' },
  { href: '/coach/drills', label: 'Spielformen', icon: BookOpen, exact: false, not: null },
  { href: '/account', label: 'Profil', icon: User, exact: false, not: null },
] as const

/** Der aktive Pfad ist erst zur Laufzeit bekannt – bis dahin wird die Navigation ohne Markierung gezeigt. */
export function CoachNav() {
  return (
    <Suspense fallback={<CoachNavLinks pathname="" />}>
      <CoachNavWithPath />
    </Suspense>
  )
}

function CoachNavWithPath() {
  return <CoachNavLinks pathname={usePathname()} />
}

function CoachNavLinks({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Trainerbereich">
      <ul className="flex gap-1">
        {ITEMS.map(({ href, label, icon: Icon, not }) => {
          const active = pathname.startsWith(href) && !(not && pathname.startsWith(not))
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold sm:px-4 ${active ? 'bg-accent-soft text-accent' : 'text-text-muted hover:text-text'}`}
              >
                <Icon size={18} aria-hidden="true" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
