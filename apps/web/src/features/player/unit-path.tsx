import Link from 'next/link'
import { getMission, t, type Unit } from '@spieliq/content'
import { Check, ChevronRight, Clock, Flag, Play } from 'lucide-react'

export type MissionState = 'offen' | 'begonnen' | 'abgeschlossen'

/**
 * Levelübersicht einer Lerneinheit als Pfad. Empfohlene Reihenfolge, aber
 * keine harte Sperre – Spieler dürfen wiederholen und vorgreifen.
 */
export function UnitPath({
  unit,
  hrefFor,
  stateFor,
}: {
  unit: Unit
  hrefFor: (missionId: string) => string
  stateFor: (missionId: string) => MissionState
}) {
  const nextId = unit.missionIds.find((id) => stateFor(id) !== 'abgeschlossen')
  return (
    <ol className="relative space-y-3">
      {unit.missionIds.map((id, i) => {
        const { mission } = getMission(id)
        const state = stateFor(id)
        const isNext = id === nextId
        return (
          <li key={id}>
            <Link
              href={hrefFor(id)}
              className={`card group flex items-center gap-4 p-4 transition-colors hover:border-line-strong ${isNext ? 'border-accent/50 shadow-glow' : ''}`}
              data-testid={`mission-${id}`}
            >
              <span
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-display text-xl font-bold ${
                  state === 'abgeschlossen' ? 'bg-good/15 text-good' : isNext ? 'bg-accent text-accent-ink' : 'bg-ink-600 text-text-muted'
                }`}
                aria-hidden="true"
              >
                {state === 'abgeschlossen' ? <Check size={22} /> : mission.mode === 'test' ? <Flag size={20} /> : i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-xl font-bold uppercase tracking-wide">{t(mission.title)}</span>
                <span className="block truncate text-sm text-text-muted">{t(mission.goal)}</span>
                <span className="mt-1 flex items-center gap-3 text-xs text-text-faint">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={13} aria-hidden="true" /> ca. {mission.estimatedMinutes} Min.
                  </span>
                  {state === 'begonnen' && <span className="text-warn">begonnen</span>}
                  {state === 'abgeschlossen' && <span className="text-good">geschafft</span>}
                </span>
              </span>
              {isNext ? (
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-ink" aria-hidden="true">
                  <Play size={18} />
                </span>
              ) : (
                <ChevronRight size={20} className="text-text-faint group-hover:text-text" aria-hidden="true" />
              )}
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
