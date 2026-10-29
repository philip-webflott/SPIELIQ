import type { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getUnit, UNITS } from '@spieliq/content'
import { db } from '@/server/db'
import { requirePlayer } from '@/server/auth/current-user'
import { playerProgress } from '@/server/modules/progress'
import { Eyebrow, Skeleton } from '@/components/ui/primitives'
import { UnitPath } from '@/features/player/unit-path'

export const metadata: Metadata = { title: 'Lerneinheit' }

export function generateStaticParams() {
  return UNITS.map((u) => ({ unitId: u.id }))
}

export default async function UnitPage(props: PageProps<'/play/unit/[unitId]'>) {
  const { unitId } = await props.params
  const unit = getUnit(unitId)
  if (!unit) notFound()
  return (
    <div className="mx-auto max-w-2xl">
      <Eyebrow className="text-accent">Lerneinheit 1</Eyebrow>
      <h1 className="font-display text-4xl font-extrabold uppercase leading-none tracking-wide">{unit.title}</h1>
      <p className="mb-6 mt-2 text-text-muted">{unit.subtitle} · ca. {unit.estimatedMinutes} Minuten</p>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <UnitProgress unitId={unit.id} />
      </Suspense>
    </div>
  )
}

async function UnitProgress({ unitId }: { unitId: string }) {
  const user = await requirePlayer()
  const unit = getUnit(unitId)!
  const progress = await playerProgress(db, user.id)
  return (
    <UnitPath
      unit={unit}
      hrefFor={(id) => `/play/mission/${id}`}
      stateFor={(id) => {
        const p = progress.missions.get(id)
        return !p ? 'offen' : p.status === 'COMPLETED' ? 'abgeschlossen' : 'begonnen'
      }}
    />
  )
}
