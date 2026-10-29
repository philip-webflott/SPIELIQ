import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { ClipboardList, Flag, TriangleAlert } from 'lucide-react'
import { AGE_GROUP_LABELS, getPrinciple } from '@spieliq/content'
import { db } from '@/server/db'
import { requireAdult } from '@/server/auth/current-user'
import { teamProgressMatrix, teamStruggles } from '@/server/modules/insights'
import { assignmentsForTeam } from '@/server/modules/assignments'
import { needsGuardianConsent, teamSummary } from '@/server/modules/teams'
import { LinkButton } from '@/components/ui/button'
import { Card, DemoBadge, Eyebrow, Notice, Skeleton } from '@/components/ui/primitives'
import { InvitePanel } from '@/features/coach/invite-panel'
import { ProgressMatrix } from '@/features/coach/progress-matrix'

export const metadata: Metadata = { title: 'Mannschaft' }

export default function TeamPage(props: PageProps<'/coach/team/[teamId]'>) {
  return (
    <Suspense fallback={<Skeleton className="h-[600px]" />}>
      <TeamContent params={props.params} searchParams={props.searchParams} />
    </Suspense>
  )
}

async function TeamContent({ params, searchParams }: Pick<PageProps<'/coach/team/[teamId]'>, 'params' | 'searchParams'>) {
  const { teamId } = await params
  const query = await searchParams
  const coach = await requireAdult()
  const [team, matrix, struggles, assignments] = await Promise.all([
    teamSummary(db, coach.id, teamId),
    teamProgressMatrix(db, coach.id, teamId),
    teamStruggles(db, coach.id, teamId),
    assignmentsForTeam(db, coach.id, teamId),
  ])
  const activePlayers = matrix.rows.filter((r) => r.cells.some((c) => c.attempts > 0)).length
  const completions = matrix.rows.reduce((s, r) => s + r.cells.filter((c) => c.status === 'abgeschlossen').length, 0)

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>
            {team.org.name} · {AGE_GROUP_LABELS[team.ageGroup]}
          </Eyebrow>
          <h1 className="flex items-center gap-3 font-display text-4xl font-extrabold uppercase tracking-wide">
            {team.name} {team.org.isDemo && <DemoBadge />}
          </h1>
        </div>
        <LinkButton href={`/coach/team/${team.id}/assignments`} variant="secondary">
          <ClipboardList size={18} aria-hidden="true" /> Hausaufgaben
        </LinkButton>
      </header>

      {query.neu === '1' && (
        <Notice tone="accent">Mannschaft angelegt. Erstelle jetzt einen Teamcode und gib ihn deinen Spieler:innen – sie treten unter „Mit Teamcode starten“ bei.</Notice>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <Eyebrow>Spieler:innen</Eyebrow>
          <p className="font-display text-4xl font-bold tabular">{team.players.length}</p>
        </Card>
        <Card className="p-5">
          <Eyebrow>Aktiv dabei</Eyebrow>
          <p className="font-display text-4xl font-bold tabular">{activePlayers}</p>
          <p className="text-xs text-text-faint">haben mindestens eine Aufgabe bearbeitet</p>
        </Card>
        <Card className="p-5">
          <Eyebrow>Missionen geschafft</Eyebrow>
          <p className="font-display text-4xl font-bold tabular">{completions}</p>
          <p className="text-xs text-text-faint">über alle Spieler:innen</p>
        </Card>
      </div>

      <Card className="p-5">
        <h2 className="eyebrow mb-3">Teamcode</h2>
        <InvitePanel
          teamId={team.id}
          needsConsent={needsGuardianConsent(team.ageGroup)}
          active={
            team.activeInvitation
              ? { ...team.activeInvitation, expiresAt: team.activeInvitation.expiresAt.toISOString() }
              : null
          }
        />
      </Card>

      <Card className="p-5">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="eyebrow">Lernstand · {matrix.unit?.title}</h2>
          <p className="text-xs text-text-faint">✓ geschafft · ◉ begonnen · ○ offen · „verstanden“ = digital, „Platz“ = von dir beobachtet</p>
        </div>
        <ProgressMatrix teamId={team.id} missionIds={matrix.missionIds} rows={matrix.rows} />
        <p className="mt-3 text-xs text-text-faint">
          Keine Rangliste: Spieler:innen erscheinen in der Reihenfolge des Beitritts. Der digitale Lernstand ist kein Kriterium für Kader- oder
          Einsatzentscheidungen.
        </p>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="eyebrow mb-3 flex items-center gap-2">
            <TriangleAlert size={16} aria-hidden="true" /> Wo es noch hakt
          </h2>
          {struggles.principles.length === 0 ? (
            <p className="text-sm text-text-muted">Noch zu wenige Versuche für eine Auswertung.</p>
          ) : (
            <ul className="space-y-3">
              {struggles.principles.slice(0, 5).map((p) => (
                <li key={p.principleId}>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">{getPrinciple(p.principleId)?.name ?? p.principleId}</span>
                    <span className="tabular text-text-muted">
                      {Math.round(p.failRate * 100)} % noch nicht · {p.playersWithProblems} Spieler:innen
                    </span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-ink-600" aria-hidden="true">
                    <div className={`h-full rounded-full ${p.failRate >= 0.5 ? 'bg-bad' : p.failRate >= 0.3 ? 'bg-warn' : 'bg-good'}`} style={{ width: `${Math.round(p.failRate * 100)}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card className="p-5">
          <h2 className="eyebrow mb-3 flex items-center gap-2">
            <Flag size={16} aria-hidden="true" /> Vorschläge fürs Training
          </h2>
          {struggles.suggestions.length === 0 ? (
            <p className="text-sm text-text-muted">Sobald sich Problemfelder zeigen, schlägt SPIELIQ passende Spielformen vor.</p>
          ) : (
            <ul className="space-y-3">
              {struggles.suggestions.map((d) => (
                <li key={d.id} className="rounded-xl bg-ink-700 p-3">
                  <Link href={`/coach/drills#${d.id}`} className="font-semibold hover:text-accent">
                    {d.title}
                  </Link>
                  <p className="text-sm text-text-muted">{d.goal}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="eyebrow">Aktive Hausaufgaben</h2>
          <Link href={`/coach/team/${team.id}/assignments`} className="text-sm font-semibold text-accent hover:underline">
            Alle ansehen
          </Link>
        </div>
        {assignments.length === 0 ? (
          <p className="text-sm text-text-muted">Noch keine Hausaufgabe vergeben.</p>
        ) : (
          <ul className="divide-y divide-line">
            {assignments.slice(0, 3).map((a) => (
              <li key={a.id} className="flex items-center justify-between py-2.5">
                <Link href={`/coach/team/${team.id}/assignments/${a.id}`} className="font-semibold hover:text-accent">
                  {a.title}
                </Link>
                <span className="text-sm text-text-muted">{a.dueAt ? `bis ${new Intl.DateTimeFormat('de-DE').format(a.dueAt)}` : 'ohne Termin'}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
