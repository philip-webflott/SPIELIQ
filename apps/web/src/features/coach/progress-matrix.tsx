import Link from 'next/link'
import { getMission, t } from '@spieliq/content'
import { Check, Circle, CircleDot } from 'lucide-react'
import { DemoBadge } from '@/components/ui/primitives'

export interface MatrixRow {
  readonly userId: string
  readonly displayName: string
  readonly isDemo: boolean
  readonly level: number | null
  readonly cells: readonly { missionId: string; status: 'offen' | 'begonnen' | 'abgeschlossen'; attempts: number; hintsUsed: number }[]
  readonly understood: number
  readonly applied: number
  readonly competencyTotal: number
}

/** Fortschrittsübersicht: Spieler:innen × Missionen. Keine Rangfolge, alphabetisch bzw. nach Beitritt. */
export function ProgressMatrix({ teamId, missionIds, rows }: { teamId: string; missionIds: readonly string[]; rows: readonly MatrixRow[] }) {
  if (rows.length === 0) {
    return <p className="text-sm text-text-muted">Noch keine Spieler:innen im Team. Teile den Teamcode, damit sie beitreten können.</p>
  }
  return (
    <div className="-mx-4 overflow-x-auto px-4">
      <table className="w-full min-w-[640px] border-separate border-spacing-y-1.5 text-sm">
        <caption className="sr-only">Fortschritt der Spieler:innen in Lerneinheit 1</caption>
        <thead>
          <tr className="text-left text-xs text-text-faint">
            <th scope="col" className="px-3 py-1 font-semibold">
              Spieler:in
            </th>
            {missionIds.map((id, i) => (
              <th key={id} scope="col" className="px-2 py-1 text-center font-semibold" title={t(getMission(id).mission.title)}>
                M{i + 1}
              </th>
            ))}
            <th scope="col" className="px-3 py-1 text-right font-semibold">
              verstanden · Platz
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.userId} className="bg-ink-700/60">
              <th scope="row" className="rounded-l-xl px-3 py-2.5 text-left font-semibold">
                <Link href={`/coach/team/${teamId}/player/${row.userId}`} className="hover:text-accent">
                  {row.displayName}
                </Link>{' '}
                {row.isDemo && <DemoBadge />}
              </th>
              {row.cells.map((cell) => (
                <td key={cell.missionId} className="px-2 py-2.5 text-center">
                  <span className="inline-flex flex-col items-center" title={`${cell.status} · ${cell.attempts} Versuche · ${cell.hintsUsed} Tipps`}>
                    {cell.status === 'abgeschlossen' ? (
                      <Check size={18} className="text-good" aria-label="abgeschlossen" />
                    ) : cell.status === 'begonnen' ? (
                      <CircleDot size={18} className="text-warn" aria-label="begonnen" />
                    ) : (
                      <Circle size={18} className="text-text-faint/60" aria-label="offen" />
                    )}
                    {cell.attempts > 0 && <span className="text-[10px] text-text-faint">{cell.attempts}×</span>}
                  </span>
                </td>
              ))}
              <td className="rounded-r-xl px-3 py-2.5 text-right tabular text-text-muted">
                {row.understood}/{row.competencyTotal} · {row.applied}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
