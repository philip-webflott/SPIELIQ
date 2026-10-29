import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { CalendarClock, ChevronRight, Play, Sparkles } from 'lucide-react'
import { getCompetency, getMission, t, UNITS } from '@spieliq/content'
import { db } from '@/server/db'
import { requirePlayer } from '@/server/auth/current-user'
import { assignmentsForPlayer } from '@/server/modules/assignments'
import { playerProgress } from '@/server/modules/progress'
import { LinkButton } from '@/components/ui/button'
import { Card, Eyebrow, ProgressBar, Skeleton } from '@/components/ui/primitives'

export const metadata: Metadata = { title: 'Start' }

export default function PlayerHomePage() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <PlayerHome />
    </Suspense>
  )
}

function HomeSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-64" />
      <Skeleton className="h-28" />
    </div>
  )
}

function formatDue(date: Date | null): string | null {
  if (!date) return null
  return new Intl.DateTimeFormat('de-DE', { weekday: 'long', day: 'numeric', month: 'long' }).format(date)
}

async function PlayerHome() {
  const user = await requirePlayer()
  const [progress, assignments] = await Promise.all([playerProgress(db, user.id), assignmentsForPlayer(db, user.id)])
  const unit = UNITS[0]!
  const status = (id: string) => progress.missions.get(id)?.status
  const completed = unit.missionIds.filter((id) => status(id) === 'COMPLETED').length
  const openAssignment = assignments.find((a) => a.completed < a.total)
  const assignmentNext = openAssignment?.missionIds.find((id) => status(id) !== 'COMPLETED')
  const unitNext = unit.missionIds.find((id) => status(id) !== 'COMPLETED')
  const nextId = assignmentNext ?? unitNext
  const next = nextId ? getMission(nextId).mission : null
  const nextHref = nextId ? `/play/mission/${nextId}${assignmentNext && openAssignment ? `?aufgabe=${openAssignment.id}` : ''}` : null
  const understood = progress.competencies.filter((c) => c.understood)
  const review = progress.competencies.filter((c) => c.reviewDue)

  return (
    <div className="space-y-5">
      <div className="animate-rise">
        <Eyebrow>Hallo</Eyebrow>
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide">{user.displayName}</h1>
      </div>

      <Card className="relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-2xl" aria-hidden="true" />
        {next && nextHref ? (
          <>
            <Eyebrow className="text-accent">{assignmentNext ? 'Aufgabe von deinem Trainer' : 'Deine nächste Mission'}</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase leading-tight tracking-wide sm:text-4xl">{t(next.title)}</h2>
            <p className="mt-1 max-w-xl text-text-muted">{t(next.goal)}</p>
            <LinkButton href={nextHref} size="xl" className="mt-6 w-full sm:w-auto" prefetch>
              <Play size={22} aria-hidden="true" /> Training starten
            </LinkButton>
            <p className="mt-3 text-sm text-text-faint">ca. {next.estimatedMinutes} Minuten</p>
          </>
        ) : (
          <>
            <Eyebrow className="text-accent">Alles geschafft</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide">Stark! Lerneinheit abgeschlossen.</h2>
            <p className="mt-1 text-text-muted">Wiederhole einzelne Missionen – oder zeig es im nächsten Training auf dem Platz.</p>
            <LinkButton href={`/play/unit/${unit.id}`} size="lg" variant="secondary" className="mt-6">
              Zur Übersicht
            </LinkButton>
          </>
        )}
      </Card>

      {openAssignment && (
        <Card className="flex items-center gap-4 p-5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-warn/15 text-warn" aria-hidden="true">
            <CalendarClock size={22} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{openAssignment.title}</p>
            <p className="text-sm text-text-muted">
              {openAssignment.completed} von {openAssignment.total} Missionen
              {openAssignment.dueAt ? ` · bis ${formatDue(openAssignment.dueAt)}` : ''}
            </p>
            {openAssignment.note && <p className="mt-1 text-sm text-text-faint">„{openAssignment.note}“</p>}
          </div>
        </Card>
      )}

      <Link href={`/play/unit/${unit.id}`} className="card group block p-5 transition-colors hover:border-line-strong">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <Eyebrow>Lerneinheit 1</Eyebrow>
            <p className="font-display text-2xl font-bold uppercase leading-tight tracking-wide">{unit.title}</p>
          </div>
          <ChevronRight className="shrink-0 text-text-faint group-hover:text-text" aria-hidden="true" />
        </div>
        <ProgressBar className="mt-4" value={completed} max={unit.missionIds.length} label="Fortschritt der Lerneinheit" />
        <p className="mt-2 text-sm text-text-muted">
          {completed} von {unit.missionIds.length} Missionen geschafft
        </p>
      </Link>

      {(understood.length > 0 || review.length > 0) && (
        <Card className="p-5">
          <Eyebrow className="mb-3">Das kannst du schon</Eyebrow>
          <ul className="flex flex-wrap gap-2">
            {understood.map((c) => (
              <li key={c.competencyId} className="inline-flex items-center gap-1.5 rounded-full bg-good/12 px-3 py-1.5 text-sm font-semibold text-good">
                <Sparkles size={14} aria-hidden="true" /> {competencyTitle(c.competencyId)}
              </li>
            ))}
          </ul>
          {review.length > 0 && (
            <p className="mt-3 text-sm text-warn">Zum Auffrischen: {review.map((c) => competencyTitle(c.competencyId)).join(', ')}</p>
          )}
        </Card>
      )}
    </div>
  )
}

function competencyTitle(id: string): string {
  return getCompetency(id)?.title ?? id
}
