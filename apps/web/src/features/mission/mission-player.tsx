'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { loadMission, type MissionInput } from '@spieliq/engine'
import { getPrinciple, t } from '@spieliq/content'
import { usePrefersReducedMotion } from '@spieliq/pitch'
import { ArrowLeft, CircleCheck, Flag, RotateCcw, Trophy, Volume2, VolumeX, Waves, X } from 'lucide-react'
import { Button, LinkButton } from '@/components/ui/button'
import { ExplainStep, InteractiveStepView, WatchStep } from './step-views'
import type { MissionPersistence, StepOutcome } from './types'
import { useVoice } from '@/features/voice/use-voice'

export interface MissionPlayerProps {
  readonly mission: MissionInput
  readonly persistence: MissionPersistence | null
  readonly exitHref: string
  readonly nextHref: string | null
  readonly assignmentId?: string
  readonly guest?: boolean
}

/**
 * Spielt eine Mission Schritt für Schritt ab:
 * Zuschauen → Erkennen/Positionieren → Feedback → Konsequenz → Zusammenfassung.
 */
export function MissionPlayer({ mission, persistence, exitHref, nextHref, assignmentId, guest = false }: MissionPlayerProps) {
  const loaded = useMemo(() => loadMission(mission), [mission])
  const [index, setIndex] = useState(0)
  const [outcomes, setOutcomes] = useState<StepOutcome[]>([])
  const [finished, setFinished] = useState(false)
  const [completionError, setCompletionError] = useState<string | null>(null)
  const systemReducedMotion = usePrefersReducedMotion()
  const [motionOverride, setMotionOverride] = useState<boolean | null>(null)
  const reducedMotion = motionOverride ?? systemReducedMotion
  const voice = useVoice()
  const steps = loaded.mission.steps

  const advance = (outcome: StepOutcome | null) => {
    const nextOutcomes = outcome ? [...outcomes, outcome] : outcomes
    if (outcome) setOutcomes(nextOutcomes)
    if (index + 1 < steps.length) {
      setIndex(index + 1)
      return
    }
    setFinished(true)
    if (persistence) {
      void persistence
        .completeMission(loaded.mission.id)
        .then((res) => setCompletionError(res.ok ? null : res.error))
        .catch(() => setCompletionError('Der Abschluss konnte nicht gespeichert werden.'))
    }
  }

  if (finished) {
    return (
      <MissionSummary
        mission={loaded.mission}
        outcomes={outcomes}
        exitHref={exitHref}
        nextHref={nextHref}
        guest={guest}
        completionError={completionError}
        onRestart={() => {
          setOutcomes([])
          setIndex(0)
          setFinished(false)
        }}
      />
    )
  }

  const step = steps[index]!
  const common = { loaded, index, reducedMotion, voice, onComplete: advance }

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex items-center gap-3 border-b border-line bg-ink-900/90 px-3 py-2 backdrop-blur sm:px-5">
        <Link href={exitHref} className="rounded-full p-2 text-text-muted hover:bg-ink-700 hover:text-text" aria-label="Mission verlassen">
          <X size={22} />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg font-bold uppercase tracking-wide">{t(loaded.mission.title)}</p>
          <ol className="mt-1 flex gap-1.5" aria-label={`Schritt ${index + 1} von ${steps.length}`}>
            {steps.map((s, i) => (
              <li
                key={s.id}
                className={`h-1.5 flex-1 rounded-full ${i < index ? 'bg-accent' : i === index ? 'bg-accent/60' : 'bg-ink-600'}`}
                aria-current={i === index ? 'step' : undefined}
              />
            ))}
          </ol>
        </div>
        {guest && <span className="hidden rounded-full border border-line-strong px-3 py-1 text-xs text-text-muted sm:inline">Gastmodus – nichts wird gespeichert</span>}
        {voice.available && (
          <button
            type="button"
            onClick={() => {
              if (voice.auto) voice.stop()
              voice.setAuto(!voice.auto)
            }}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold hover:bg-ink-700 ${voice.auto ? 'text-accent' : 'text-text-muted hover:text-text'}`}
            aria-pressed={voice.auto}
            aria-label={voice.hasRecordings ? 'Vorlesen (KI-Stimme)' : 'Vorlesen'}
            title={voice.hasRecordings ? 'Vorlesen – die Stimme ist mit KI erzeugt' : 'Vorlesen mit der Stimme deines Geräts'}
            data-testid="voice-toggle"
          >
            {voice.auto ? <Volume2 size={18} aria-hidden="true" /> : <VolumeX size={18} aria-hidden="true" />}
            <span className="hidden sm:inline">Vorlesen</span>
            {voice.hasRecordings && <span className="rounded-full border border-line-strong px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-faint">KI-Stimme</span>}
          </button>
        )}
        <button
          type="button"
          onClick={() => setMotionOverride(!reducedMotion)}
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold hover:bg-ink-700 ${reducedMotion ? 'text-accent' : 'text-text-muted hover:text-text'}`}
          aria-pressed={reducedMotion}
          aria-label="Weniger Bewegung"
          title="Weniger Bewegung"
        >
          <Waves size={18} aria-hidden="true" />
          <span className="hidden sm:inline">Weniger Bewegung</span>
        </button>
      </header>
      {step.kind === 'watch' ? (
        <WatchStep key={index} {...common} />
      ) : step.kind === 'explain' ? (
        <ExplainStep key={index} {...common} />
      ) : (
        <InteractiveStepView key={index} {...common} persistence={persistence} assignmentId={assignmentId} />
      )}
    </div>
  )
}

function MissionSummary({
  mission,
  outcomes,
  exitHref,
  nextHref,
  guest,
  completionError,
  onRestart,
}: {
  mission: ReturnType<typeof loadMission>['mission']
  outcomes: StepOutcome[]
  exitHref: string
  nextHref: string | null
  guest: boolean
  completionError: string | null
  onRestart: () => void
}) {
  const principleState = new Map<string, 'sicher' | 'wiederholen'>()
  for (const o of outcomes) {
    for (const [p, ok] of Object.entries(o.principles)) {
      const secure = ok && !o.usedSolution && o.hintsUsed === 0
      const prev = principleState.get(p)
      principleState.set(p, prev === 'wiederholen' || !secure ? 'wiederholen' : 'sicher')
    }
  }
  const isTest = mission.mode === 'test'

  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-6 px-4 py-8 sm:py-12">
      <Link href={exitHref} className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text">
        <ArrowLeft size={16} aria-hidden="true" /> Zur Übersicht
      </Link>
      <section className="card animate-pop p-6 text-center sm:p-8">
        <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-accent-soft text-accent">
          <Trophy size={30} aria-hidden="true" />
        </div>
        <p className="eyebrow">{t(mission.title)}</p>
        <h1 className="font-display text-4xl font-bold uppercase tracking-wide">{isTest ? 'Test geschafft!' : 'Geschafft!'}</h1>
      </section>

      {principleState.size > 0 && (
        <section className="card p-5" aria-labelledby="prinzipien">
          <h2 id="prinzipien" className="eyebrow mb-3">
            Das hast du gelernt
          </h2>
          <ul className="space-y-2">
            {[...principleState.entries()].map(([id, state]) => (
              <li key={id} className="flex items-center justify-between gap-3 rounded-xl bg-ink-700 px-4 py-3">
                <span className="font-semibold">{getPrinciple(id)?.playerText ?? id}</span>
                {state === 'sicher' ? (
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-good">
                    <CircleCheck size={18} aria-hidden="true" /> kannst du
                  </span>
                ) : (
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-warn">
                    <RotateCcw size={18} aria-hidden="true" /> noch üben
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {mission.fieldTransfer && (
        <section className="card border-accent/30 p-5" aria-labelledby="platz">
          <h2 id="platz" className="eyebrow mb-2 flex items-center gap-2 text-accent">
            <Flag size={16} aria-hidden="true" /> Auf dem Platz
          </h2>
          <p className="text-lg font-semibold">{t(mission.fieldTransfer.challenge)}</p>
        </section>
      )}

      {guest && (
        <p className="rounded-2xl border border-line-strong bg-ink-800 px-4 py-3 text-sm text-text-muted">
          Gastmodus: Dein Fortschritt wird nicht gespeichert. Mit dem Teamcode von deinem Trainer geht das.
        </p>
      )}
      {completionError && <p className="text-sm text-bad">{completionError}</p>}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button variant="secondary" size="lg" onClick={onRestart}>
          Nochmal spielen
        </Button>
        {nextHref ? (
          <LinkButton href={nextHref} size="lg">
            Nächste Mission
          </LinkButton>
        ) : (
          <LinkButton href={exitHref} size="lg">
            Fertig
          </LinkButton>
        )}
      </div>
    </main>
  )
}
