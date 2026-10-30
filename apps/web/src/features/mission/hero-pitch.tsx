'use client'

import { useEffect, useMemo, useState } from 'react'
import { loadMission, stepTimeline, type MissionInput } from '@spieliq/engine'
import { usePrefersReducedMotion, useTimelinePlayer } from '@spieliq/pitch'
import { BoardView } from './board-view'

/** Läuft auf der Startseite in Schleife: die Situation "alle laufen zum Ball". */
export function HeroPitch({ mission }: { mission: MissionInput }) {
  const loaded = useMemo(() => loadMission(mission), [mission])
  const reducedMotion = usePrefersReducedMotion()
  const [round, setRound] = useState(0)
  return <HeroLoop key={round} loaded={loaded} reducedMotion={reducedMotion} onLoop={() => setRound((r) => r + 1)} />
}

function HeroLoop({ loaded, reducedMotion, onLoop }: { loaded: ReturnType<typeof loadMission>; reducedMotion: boolean; onLoop: () => void }) {
  const timeline = useMemo(() => stepTimeline(loaded, 0), [loaded])
  const [done, setDone] = useState(false)
  const player = useTimelinePlayer(timeline, { autoplay: true, reducedMotion, onFinish: () => setDone(true) })
  useEffect(() => {
    if (!done || reducedMotion) return
    const timer = window.setTimeout(onLoop, 2600)
    return () => window.clearTimeout(timer)
  }, [done, reducedMotion, onLoop])
  const step = loaded.mission.steps[0]
  const overlays = done && step?.kind === 'watch' ? (step.after?.overlays ?? []) : []
  return (
    <div className="aspect-[58/74] w-full max-w-md sm:aspect-[74/58]">
      <BoardView loaded={loaded} state={player.frame?.state ?? loaded.boards[0]!} overlays={overlays} legend={false} fitOrientation label="Beispielsituation: Drei Spieler laufen zum Ball, ein Gegner wird frei" />
    </div>
  )
}
