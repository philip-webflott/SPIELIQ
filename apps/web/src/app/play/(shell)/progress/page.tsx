import type { Metadata } from 'next'
import { Suspense } from 'react'
import { COMPETENCIES, WORLDS } from '@spieliq/content'
import { db } from '@/server/db'
import { requirePlayer } from '@/server/auth/current-user'
import { playerProgress } from '@/server/modules/progress'
import { Badge, Card, PageHeader, Skeleton } from '@/components/ui/primitives'
import { CompetencyStatus } from '@/features/player/competency-status'

export const metadata: Metadata = { title: 'Fortschritt' }

export default function ProgressPage() {
  return (
    <>
      <PageHeader eyebrow="Dein Kompetenzbaum" title="Fortschritt" />
      <Suspense fallback={<Skeleton className="h-96" />}>
        <ProgressContent />
      </Suspense>
    </>
  )
}

async function ProgressContent() {
  const user = await requirePlayer()
  const progress = await playerProgress(db, user.id)
  const byId = new Map(progress.competencies.map((c) => [c.competencyId, c]))
  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-sm text-text-muted">
        „Digital verstanden“ heißt: Du hast es in mindestens zwei verschiedenen Situationen ohne Tipp gelöst – eine davon neu. „Auf dem Platz“ trägt
        dein Trainer ein, wenn er es im Training sieht.
      </p>
      {WORLDS.map((world) => {
        const items = COMPETENCIES.filter((c) => c.worldId === world.id)
        return (
          <section key={world.id} aria-labelledby={`welt-${world.id}`}>
            <h2 id={`welt-${world.id}`} className="mb-2 font-display text-2xl font-bold uppercase tracking-wide">
              {world.title} <span className="text-base font-semibold text-text-faint normal-case tracking-normal">– {world.subtitle}</span>
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {items.map((c) => {
                const p = byId.get(c.id)
                return (
                  <Card key={c.id} as="li" className={`p-4 ${c.status === 'geplant' ? 'opacity-55' : ''}`}>
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold">{c.title}</p>
                      {c.status === 'geplant' && <Badge>kommt bald</Badge>}
                    </div>
                    <p className="mt-0.5 text-sm text-text-muted">{c.canDo}</p>
                    {c.status === 'verfügbar' && (
                      <CompetencyStatus practised={Boolean(p?.practised)} understood={Boolean(p?.understood)} applied={Boolean(p?.applied)} />
                    )}
                  </Card>
                )
              })}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
