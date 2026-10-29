import type { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { allMissionIds, findMission, unitOfMission } from '@spieliq/content'
import { requirePlayer } from '@/server/auth/current-user'
import { completeMissionAction, submitAttemptAction } from '@/app/actions/play'
import { MissionPlayer } from '@/features/mission/mission-player'

export const metadata: Metadata = { title: 'Mission' }

export function generateStaticParams() {
  return allMissionIds().map((missionId) => ({ missionId }))
}

export default async function MissionPage(props: PageProps<'/play/mission/[missionId]'>) {
  const { missionId } = await props.params
  if (!findMission(missionId)) notFound()
  return (
    <Suspense fallback={<div className="grid h-dvh place-items-center text-text-muted">Mission wird geladen …</div>}>
      <AuthorizedMission missionId={missionId} searchParams={props.searchParams} />
    </Suspense>
  )
}

async function AuthorizedMission({ missionId, searchParams }: { missionId: string; searchParams: PageProps<'/play/mission/[missionId]'>['searchParams'] }) {
  await requirePlayer()
  const query = await searchParams
  const assignmentId = typeof query.aufgabe === 'string' ? query.aufgabe : undefined
  const loaded = findMission(missionId)!
  const unit = unitOfMission(missionId)
  const idx = unit?.missionIds.indexOf(missionId) ?? -1
  const next = unit && idx >= 0 ? unit.missionIds[idx + 1] : undefined
  return (
    <MissionPlayer
      mission={loaded.mission}
      persistence={{ submitAttempt: submitAttemptAction, completeMission: completeMissionAction }}
      exitHref={unit ? `/play/unit/${unit.id}` : '/play'}
      nextHref={next ? `/play/mission/${next}${assignmentId ? `?aufgabe=${assignmentId}` : ''}` : null}
      assignmentId={assignmentId}
    />
  )
}
