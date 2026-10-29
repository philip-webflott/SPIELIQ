import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allMissionIds, findMission, unitOfMission } from '@spieliq/content'
import { MissionPlayer } from '@/features/mission/mission-player'

export const metadata: Metadata = { title: 'Mission' }

export function generateStaticParams() {
  return allMissionIds().map((missionId) => ({ missionId }))
}

export default async function TryMissionPage(props: PageProps<'/try/[missionId]'>) {
  const { missionId } = await props.params
  const loaded = findMission(missionId)
  if (!loaded) notFound()
  const unit = unitOfMission(missionId)
  const idx = unit?.missionIds.indexOf(missionId) ?? -1
  const next = unit && idx >= 0 ? unit.missionIds[idx + 1] : undefined
  return (
    <MissionPlayer
      mission={loaded.mission}
      persistence={null}
      exitHref="/try"
      nextHref={next ? `/try/${next}` : null}
      guest
    />
  )
}
