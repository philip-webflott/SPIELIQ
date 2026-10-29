import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { ChevronRight, Users } from 'lucide-react'
import { AGE_GROUP_LABELS } from '@spieliq/content'
import { db } from '@/server/db'
import { requireAdult } from '@/server/auth/current-user'
import { orgsForCoach, teamsForCoach } from '@/server/modules/teams'
import { Card, DemoBadge, PageHeader, Skeleton } from '@/components/ui/primitives'
import { CreateTeamForm } from '@/features/coach/create-team-form'

export const metadata: Metadata = { title: 'Mannschaften' }

export default function CoachHomePage() {
  return (
    <>
      <PageHeader eyebrow="Trainerbereich" title="Deine Mannschaften" />
      <Suspense fallback={<Skeleton className="h-64" />}>
        <Teams />
      </Suspense>
    </>
  )
}

async function Teams() {
  const coach = await requireAdult()
  const [teams, orgs] = await Promise.all([teamsForCoach(db, coach.id), orgsForCoach(db, coach.id)])
  return (
    <div className="space-y-6">
      {teams.length === 0 && <p className="text-text-muted">Noch keine Mannschaft – leg unten deine erste an.</p>}
      <ul className="grid gap-4 sm:grid-cols-2">
        {teams.map((team) => (
          <li key={team.id}>
            <Link href={`/coach/team/${team.id}`} className="card group flex items-center gap-4 p-5 transition-colors hover:border-line-strong" data-testid="team-card">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-own/15 text-own" aria-hidden="true">
                <Users size={22} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="truncate font-display text-2xl font-bold uppercase tracking-wide">{team.name}</span>
                  {team.org.isDemo && <DemoBadge />}
                </span>
                <span className="block text-sm text-text-muted">
                  {AGE_GROUP_LABELS[team.ageGroup]} · {team.org.name} · {team.playerCount} Spieler:innen
                </span>
              </span>
              <ChevronRight className="text-text-faint group-hover:text-text" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      <Card className="p-5">
        <h2 className="eyebrow mb-4">Neue Mannschaft</h2>
        <CreateTeamForm orgs={orgs.map((o) => o.org)} />
      </Card>
    </div>
  )
}
