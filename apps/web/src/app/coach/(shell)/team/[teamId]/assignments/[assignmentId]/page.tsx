import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getMission, getPrinciple, t } from '@spieliq/content'
import { db } from '@/server/db'
import { requireAdult } from '@/server/auth/current-user'
import { assignmentReport } from '@/server/modules/assignments'
import { Badge, Card, PageHeader, Skeleton } from '@/components/ui/primitives'

export const metadata: Metadata = { title: 'Hausaufgabe' }

export default function AssignmentReportPage(props: PageProps<'/coach/team/[teamId]/assignments/[assignmentId]'>) {
  return (
    <Suspense fallback={<Skeleton className="h-96" />}>
      <Report params={props.params} />
    </Suspense>
  )
}

async function Report({ params }: { params: PageProps<'/coach/team/[teamId]/assignments/[assignmentId]'>['params'] }) {
  const { teamId, assignmentId } = await params
  const coach = await requireAdult()
  const { assignment, rows } = await assignmentReport(db, coach.id, assignmentId)
  const counts = { offen: 0, begonnen: 0, abgeschlossen: 0 }
  for (const r of rows) counts[r.state]++
  return (
    <>
      <Link href={`/coach/team/${teamId}/assignments`} className="mb-4 inline-flex items-center gap-2 text-sm text-text-muted hover:text-text">
        <ArrowLeft size={16} aria-hidden="true" /> Hausaufgaben
      </Link>
      <PageHeader eyebrow="Hausaufgabe" title={assignment.title} />
      <p className="-mt-3 mb-5 text-sm text-text-muted">{assignment.missionIds.map((id) => t(getMission(id).mission.title)).join(' · ')}</p>
      <div className="mb-5 grid grid-cols-3 gap-3">
        {(['abgeschlossen', 'begonnen', 'offen'] as const).map((k) => (
          <Card key={k} className="p-4 text-center">
            <p className="font-display text-3xl font-bold tabular">{counts[k]}</p>
            <p className="text-xs text-text-faint">{k}</p>
          </Card>
        ))}
      </div>
      <Card className="p-5">
        <table className="w-full text-sm">
          <caption className="sr-only">Stand der Hausaufgabe je Spieler:in</caption>
          <thead>
            <tr className="text-left text-xs text-text-faint">
              <th scope="col" className="py-2">Spieler:in</th>
              <th scope="col" className="py-2">Stand</th>
              <th scope="col" className="py-2 text-right">Versuche</th>
              <th scope="col" className="py-2 text-right">Tipps</th>
              <th scope="col" className="py-2 pl-4">Wiederholen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.userId}>
                <th scope="row" className="py-2.5 text-left font-semibold">
                  <Link href={`/coach/team/${teamId}/player/${r.userId}`} className="hover:text-accent">
                    {r.displayName}
                  </Link>
                </th>
                <td className="py-2.5">
                  <Badge tone={r.state === 'abgeschlossen' ? 'good' : r.state === 'begonnen' ? 'warn' : 'neutral'}>
                    {r.state} {r.state !== 'offen' && `(${r.completed}/${assignment.missionIds.length})`}
                  </Badge>
                </td>
                <td className="py-2.5 text-right tabular">{r.attempts}</td>
                <td className="py-2.5 text-right tabular">{r.hintsUsed}</td>
                <td className="py-2.5 pl-4 text-text-muted">{r.struggles.map((p) => getPrinciple(p)?.name ?? p).join(', ') || '–'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  )
}
