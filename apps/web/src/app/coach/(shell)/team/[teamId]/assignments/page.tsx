import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getMission, t, UNITS } from '@spieliq/content'
import { db } from '@/server/db'
import { requireAdult } from '@/server/auth/current-user'
import { archiveAssignmentAction } from '@/app/actions/coach'
import { assignmentsForTeam } from '@/server/modules/assignments'
import { teamSummary } from '@/server/modules/teams'
import { Button } from '@/components/ui/button'
import { Card, PageHeader, Skeleton } from '@/components/ui/primitives'
import { AssignmentForm } from '@/features/coach/assignment-form'

export const metadata: Metadata = { title: 'Hausaufgaben' }

export default function AssignmentsPage(props: PageProps<'/coach/team/[teamId]/assignments'>) {
  return (
    <Suspense fallback={<Skeleton className="h-96" />}>
      <Content params={props.params} />
    </Suspense>
  )
}

async function Content({ params }: { params: PageProps<'/coach/team/[teamId]/assignments'>['params'] }) {
  const { teamId } = await params
  const coach = await requireAdult()
  const [team, assignments] = await Promise.all([teamSummary(db, coach.id, teamId), assignmentsForTeam(db, coach.id, teamId)])
  const missions = UNITS.flatMap((u) => u.missionIds).map((id) => {
    const m = getMission(id).mission
    return { id, title: t(m.title), minutes: m.estimatedMinutes }
  })
  const fmt = new Intl.DateTimeFormat('de-DE', { weekday: 'short', day: 'numeric', month: 'short' })
  return (
    <>
      <Link href={`/coach/team/${teamId}`} className="mb-4 inline-flex items-center gap-2 text-sm text-text-muted hover:text-text">
        <ArrowLeft size={16} aria-hidden="true" /> {team.name}
      </Link>
      <PageHeader eyebrow={team.name} title="Hausaufgaben" />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <Card className="p-5">
          <h2 className="eyebrow mb-3">Aktiv</h2>
          {assignments.length === 0 ? (
            <p className="text-sm text-text-muted">Noch keine Hausaufgabe.</p>
          ) : (
            <ul className="space-y-3">
              {assignments.map((a) => (
                <li key={a.id} className="rounded-xl bg-ink-700 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/coach/team/${teamId}/assignments/${a.id}`} className="font-semibold hover:text-accent" data-testid="assignment-link">
                        {a.title}
                      </Link>
                      <p className="text-sm text-text-muted">
                        {a.missionIds.length} Missionen · ca. {a.estimatedMinutes} Min. · {a.dueAt ? `bis ${fmt.format(a.dueAt)}` : 'ohne Termin'}
                        {a.targetUserIds.length > 0 ? ` · ${a.targetUserIds.length} Spieler:innen` : ' · ganzes Team'}
                      </p>
                    </div>
                    <form action={archiveAssignmentAction}>
                      <input type="hidden" name="assignmentId" value={a.id} />
                      <Button variant="ghost" size="sm" type="submit">
                        Archivieren
                      </Button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card className="p-5">
          <h2 className="eyebrow mb-4">Neue Hausaufgabe</h2>
          <AssignmentForm teamId={teamId} missions={missions} players={team.players.map((p) => ({ id: p.user.id, name: p.user.displayName }))} />
        </Card>
      </div>
    </>
  )
}
