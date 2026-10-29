import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { COMPETENCIES, getMission, getPrinciple, PRINCIPLES, t } from '@spieliq/content'
import { db } from '@/server/db'
import { requireAdult } from '@/server/auth/current-user'
import { removePlayerAction, setLevelAction } from '@/app/actions/coach'
import { playerDetail } from '@/server/modules/insights'
import { observationsForPlayer } from '@/server/modules/observations'
import { Button } from '@/components/ui/button'
import { Badge, Card, DemoBadge, PageHeader, Skeleton } from '@/components/ui/primitives'
import { CompetencyStatus } from '@/features/player/competency-status'
import { ObservationForm, ResetPasswordForm } from '@/features/coach/player-actions'

export const metadata: Metadata = { title: 'Spieler:in' }

const RATING_LABEL = { excellent: 'stark', good: 'gut', 'not-yet': 'noch nicht' } as const
const OBS_LABEL = { CONSISTENT: 'sicher angewendet', EMERGING: 'in Ansätzen', NOT_OBSERVED: 'noch nicht beobachtet' } as const

export default function PlayerDetailPage(props: PageProps<'/coach/team/[teamId]/player/[playerId]'>) {
  return (
    <Suspense fallback={<Skeleton className="h-96" />}>
      <Detail params={props.params} />
    </Suspense>
  )
}

async function Detail({ params }: { params: PageProps<'/coach/team/[teamId]/player/[playerId]'>['params'] }) {
  const { teamId, playerId } = await params
  const coach = await requireAdult()
  const detail = await playerDetail(db, coach.id, teamId, playerId)
  const observations = await observationsForPlayer(db, coach.id, teamId, playerId)
  // Nur das Datum – Trainer:innen sehen Lernergebnisse, keine Nutzungszeiten (Datenschutzkonzept).
  const fmt = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'short' })
  const competencyMap = new Map(COMPETENCIES.map((c) => [c.id, c]))
  return (
    <>
      <Link href={`/coach/team/${teamId}`} className="mb-4 inline-flex items-center gap-2 text-sm text-text-muted hover:text-text">
        <ArrowLeft size={16} aria-hidden="true" /> Mannschaft
      </Link>
      <PageHeader eyebrow={`Anmeldename: ${detail.user.loginName ?? '–'}`} title={detail.user.displayName}>
        {detail.user.isDemo && <DemoBadge />}
      </PageHeader>
      <p className="-mt-3 mb-5 text-sm text-text-faint">
        Der digitale Lernstand zeigt Verständnis in Aufgaben – er ist kein Kriterium für Kader- oder Einsatzentscheidungen.
      </p>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="eyebrow mb-3">Kompetenzen</h2>
            <ul className="space-y-3">
              {detail.competencies.map((c) => (
                <li key={c.competencyId} className="rounded-xl bg-ink-700 p-3">
                  <p className="font-semibold">{competencyMap.get(c.competencyId)?.title}</p>
                  <CompetencyStatus practised={c.practised} understood={c.understood} applied={c.applied} />
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-5">
            <h2 className="eyebrow mb-3">Letzte Versuche</h2>
            {detail.recent.length === 0 ? (
              <p className="text-sm text-text-muted">Noch keine Versuche.</p>
            ) : (
              <ul className="divide-y divide-line text-sm">
                {detail.recent.map((a, i) => (
                  <li key={i} className="flex items-center justify-between gap-3 py-2">
                    <span className="min-w-0 truncate">
                      {t(getMission(a.missionId).mission.title)} <span className="text-text-faint">· {a.stepId}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      {a.hintsUsed > 0 && <Badge tone="warn">{a.hintsUsed} Tipp{a.hintsUsed > 1 ? 's' : ''}</Badge>}
                      <Badge tone={a.rating === 'not-yet' ? 'neutral' : 'good'}>{RATING_LABEL[a.rating as keyof typeof RATING_LABEL] ?? a.rating}</Badge>
                      <span className="text-text-faint">{fmt.format(a.createdAt)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="eyebrow mb-1">Im Training beobachtet</h2>
            <p className="mb-4 text-sm text-text-muted">Nur so wird ein Prinzip als „auf dem Platz angewendet“ markiert.</p>
            <ObservationForm teamId={teamId} playerId={playerId} principles={PRINCIPLES.map((p) => ({ id: p.id, name: p.name }))} />
            {observations.length > 0 && (
              <ul className="mt-5 space-y-2 text-sm">
                {observations.map((o) => (
                  <li key={o.id} className="rounded-xl bg-ink-700 px-3 py-2">
                    <span className="font-semibold">{getPrinciple(o.principleId)?.name}</span> · {OBS_LABEL[o.rating]}{' '}
                    <span className="text-text-faint">({new Intl.DateTimeFormat('de-DE').format(o.observedOn)})</span>
                    {o.note && <p className="text-text-muted">{o.note}</p>}
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <Card className="p-5">
            <h2 className="eyebrow mb-3">Lernniveau</h2>
            <form action={setLevelAction} className="flex items-end gap-3">
              <input type="hidden" name="teamId" value={teamId} />
              <input type="hidden" name="playerId" value={playerId} />
              <label className="flex-1 text-sm">
                <span className="mb-1 block text-text-faint">unabhängig vom Alter</span>
                <select name="level" defaultValue={detail.level ?? ''} className="w-full rounded-xl border border-line-strong bg-ink-850 px-3 py-2">
                  <option value="">nicht festgelegt</option>
                  <option value="1">1 – Einsteiger</option>
                  <option value="2">2 – Grundlagen</option>
                  <option value="3">3 – Fortgeschritten</option>
                  <option value="4">4 – Sicher</option>
                  <option value="5">5 – Experte</option>
                </select>
              </label>
              <Button type="submit" variant="secondary" size="sm">
                Speichern
              </Button>
            </form>
          </Card>
          <Card className="p-5">
            <h2 className="eyebrow mb-3">Konto</h2>
            <ResetPasswordForm teamId={teamId} playerId={playerId} />
            <form action={removePlayerAction} className="mt-4">
              <input type="hidden" name="teamId" value={teamId} />
              <input type="hidden" name="playerId" value={playerId} />
              <Button type="submit" variant="danger" size="sm">
                Aus der Mannschaft entfernen
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </>
  )
}
