'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  applyPlacement,
  assessStep,
  clampToPitch,
  planConsequence,
  possessionTeam,
  stepTimeline,
  withPositions,
  type AssessmentResult,
  type BoardState,
  type InteractiveStep,
  type LoadedMission,
  type Step,
  type Vec2,
} from '@spieliq/engine'
import { playoutMessage, summarizeFeedback, t } from '@spieliq/content'
import { useTimelinePlayer, type TokenTone } from '@spieliq/pitch'
import { CircleCheck, Eye, Lightbulb, Pause, Play, RotateCcw, SkipForward, Sparkles, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BoardView } from './board-view'
import type { MissionPersistence, StepOutcome } from './types'

interface StepProps {
  readonly loaded: LoadedMission
  readonly index: number
  readonly reducedMotion: boolean
  readonly speech: { available: boolean; speak: (text: string) => void }
  readonly onComplete: (outcome: StepOutcome | null) => void
}

/* ------------------------------------------------------------------ Layout */

function StepLayout({ board, panel }: { board: ReactNode; panel: ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
      <div className="relative min-h-0 flex-1 p-2 sm:p-4">{board}</div>
      <aside className="border-t border-line bg-ink-850/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur lg:w-[400px] lg:border-l lg:border-t-0 lg:p-6">
        {panel}
      </aside>
    </div>
  )
}

function Instruction({ text, speech }: { text: string; speech: StepProps['speech'] }) {
  return (
    <div className="flex items-start gap-3" aria-live="polite">
      <p className="font-display text-2xl font-bold leading-tight text-text sm:text-[1.7rem]">{text}</p>
      {speech.available && (
        <button
          type="button"
          onClick={() => speech.speak(text)}
          className="mt-1 shrink-0 rounded-full p-2 text-text-muted hover:bg-ink-700 hover:text-text"
          aria-label="Anweisung vorlesen"
        >
          <Volume2 size={20} />
        </button>
      )}
    </div>
  )
}

function PlaybackControls({ player }: { player: ReturnType<typeof useTimelinePlayer> }) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Wiedergabe">
      <button
        type="button"
        className="rounded-full p-2.5 text-text-muted hover:bg-ink-700 hover:text-text"
        onClick={player.playing ? player.pause : player.play}
        aria-label={player.playing ? 'Pause' : 'Abspielen'}
      >
        {player.playing ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <button type="button" className="rounded-full p-2.5 text-text-muted hover:bg-ink-700 hover:text-text" onClick={player.restart} aria-label="Wiederholen">
        <RotateCcw size={20} />
      </button>
      <button
        type="button"
        className={`rounded-full p-2.5 hover:bg-ink-700 ${player.speed < 1 ? 'text-accent' : 'text-text-muted hover:text-text'}`}
        onClick={() => player.setSpeed(player.speed < 1 ? 1 : 0.5)}
        aria-pressed={player.speed < 1}
        aria-label="Zeitlupe (halbe Geschwindigkeit)"
      >
        <span className="font-display text-base font-bold">0,5×</span>
      </button>
      {!player.finished && (
        <button type="button" className="rounded-full p-2.5 text-text-muted hover:bg-ink-700 hover:text-text" onClick={player.skipToEnd} aria-label="Zum Ende springen">
          <SkipForward size={20} />
        </button>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ Zuschauen / Erklären */

export function WatchStep({ loaded, index, reducedMotion, speech, onComplete }: StepProps) {
  const step = loaded.mission.steps[index] as Extract<Step, { kind: 'watch' }>
  const timeline = useMemo(() => stepTimeline(loaded, index), [loaded, index])
  const player = useTimelinePlayer(timeline, { autoplay: true, reducedMotion })
  const board = player.frame?.state ?? loaded.boards[index]!
  const done = player.finished
  const caption = done && step.after ? t(step.after.caption) : t(step.instruction)
  return (
    <StepLayout
      board={<BoardView loaded={loaded} state={board} view={step.view} overlays={done ? (step.after?.overlays ?? []) : step.overlays} label="Spielsituation" />}
      panel={
        <div className="flex h-full flex-col gap-4">
          <p className="eyebrow">Schau zu</p>
          <Instruction text={caption} speech={speech} />
          <div className="mt-auto flex items-center justify-between gap-3">
            <PlaybackControls player={player} />
            <Button size="lg" onClick={() => onComplete(null)} disabled={!done} data-testid="next-step">
              Weiter
            </Button>
          </div>
        </div>
      }
    />
  )
}

export function ExplainStep({ loaded, index, reducedMotion, speech, onComplete }: StepProps) {
  const step = loaded.mission.steps[index] as Extract<Step, { kind: 'explain' }>
  const timeline = useMemo(() => stepTimeline(loaded, index), [loaded, index])
  const player = useTimelinePlayer(timeline, { autoplay: true, reducedMotion })
  const board = player.frame?.state ?? loaded.boards[index]!
  const showOverlays = !timeline || player.finished
  return (
    <StepLayout
      board={<BoardView loaded={loaded} state={board} view={step.view} overlays={showOverlays ? step.overlays : []} label="Erklärung am Spielfeld" />}
      panel={
        <div className="flex h-full flex-col gap-4">
          <p className="eyebrow">{t(step.instruction)}</p>
          <Instruction text={t(step.text)} speech={speech} />
          {step.keyPoints.length > 0 && (
            <ul className="space-y-2">
              {step.keyPoints.map((k) => (
                <li key={k.de} className="flex items-center gap-2 text-base text-text-muted">
                  <CircleCheck size={18} className="shrink-0 text-accent" aria-hidden="true" />
                  {t(k)}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto flex items-center justify-between gap-3">
            {timeline ? <PlaybackControls player={player} /> : <span />}
            <Button size="lg" onClick={() => onComplete(null)} data-testid="next-step">
              Weiter
            </Button>
          </div>
        </div>
      }
    />
  )
}

/* ------------------------------------------------------------------ Interaktive Schritte */

interface InteractiveProps extends StepProps {
  readonly persistence: MissionPersistence | null
  readonly assignmentId?: string
}

type Phase = 'answer' | 'feedback'

function ConsequenceBoard({
  loaded,
  plan,
  reducedMotion,
  onFinish,
  highlight,
  view,
}: {
  loaded: LoadedMission
  plan: NonNullable<ReturnType<typeof planConsequence>>
  reducedMotion: boolean
  onFinish: () => void
  highlight: Record<string, TokenTone>
  view: Step['view']
}) {
  const player = useTimelinePlayer(plan.timeline, { autoplay: true, reducedMotion, onFinish })
  const state = player.frame?.state ?? plan.timeline.initial
  return (
    <>
      <BoardView loaded={loaded} state={state} view={view} highlight={highlight} label="Was passiert jetzt?" />
      <div className="absolute right-3 top-3 rounded-full bg-ink-900/80 backdrop-blur">
        <PlaybackControls player={player} />
      </div>
    </>
  )
}

export function InteractiveStepView({ loaded, index, reducedMotion, speech, onComplete, persistence, assignmentId }: InteractiveProps) {
  const step = loaded.mission.steps[index] as InteractiveStep
  const start = loaded.boards[index]!
  const isTest = loaded.mission.mode === 'test'
  const controlled = useMemo(() => (step.kind === 'place' ? step.controlled : []), [step])

  const initialPositions = useMemo(() => {
    const out: Record<string, Vec2> = {}
    for (const p of start.players) if (controlled.includes(p.id)) out[p.id] = p.pos
    return out
  }, [start, controlled])

  const [positions, setPositions] = useState<Record<string, Vec2>>(initialPositions)
  const [selection, setSelection] = useState<{ playerId?: string; point?: Vec2; optionId?: string }>({})
  const [phase, setPhase] = useState<Phase>('answer')
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [hintsShown, setHintsShown] = useState(0)
  const [usedSolution, setUsedSolution] = useState(false)
  const [plan, setPlan] = useState<ReturnType<typeof planConsequence>>(null)
  const [consequenceDone, setConsequenceDone] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  /** Im Feedback zuerst die Begründung (Passwege, Abstände), dann die Konsequenz-Animation. */
  const [boardMode, setBoardMode] = useState<'evidence' | 'consequence'>('evidence')
  const startedAt = useRef<number | null>(null)

  useEffect(() => {
    if (phase !== 'feedback' || !plan || reducedMotion || boardMode !== 'evidence' || consequenceDone) return
    const timer = window.setTimeout(() => setBoardMode('consequence'), 1600)
    return () => window.clearTimeout(timer)
  }, [phase, plan, reducedMotion, boardMode, consequenceDone, attempts])

  const clamp = useCallback(
    (p: Vec2) => {
      const area = step.kind === 'place' ? step.area : undefined
      const inArea = area ? { x: Math.min(area.max.x, Math.max(area.min.x, p.x)), y: Math.min(area.max.y, Math.max(area.min.y, p.y)) } : p
      return clampToPitch(loaded.pitch, inArea)
    },
    [loaded.pitch, step],
  )

  const markStarted = () => {
    startedAt.current ??= performance.now()
  }

  const onMove = useCallback((id: string, pos: Vec2) => {
    startedAt.current ??= performance.now()
    setPositions((prev) => ({ ...prev, [id]: pos }))
  }, [])

  const answerState: BoardState = step.kind === 'place' ? withPositions(start, positions) : start

  const persist = (answer: { positions?: Record<string, Vec2>; selection?: typeof selection }, hintsUsed: number) => {
    if (!persistence) return
    const durationMs = startedAt.current === null ? 0 : Math.round(performance.now() - startedAt.current)
    void persistence
      .submitAttempt({ missionId: loaded.mission.id, stepIndex: index, answer, hintsUsed, durationMs, assignmentId })
      .then((res) => setSaveError(res.ok ? null : res.error))
      .catch(() => setSaveError('Speichern fehlgeschlagen – dein Ergebnis wird beim nächsten Versuch erneut gesendet.'))
  }

  const check = (override?: { positions?: Record<string, Vec2>; solution?: boolean }) => {
    const answer = step.kind === 'place' ? { positions: override?.positions ?? positions } : { selection }
    const assessed = assessStep(loaded, index, answer)
    const solution = Boolean(override?.solution)
    setResult(assessed)
    setPhase('feedback')
    setAttempts((a) => a + 1)
    if (solution) setUsedSolution(true)
    const finalState = step.kind === 'place' ? applyPlacement(loaded, index, answer.positions ?? {}) : start
    const nextPlan = planConsequence(loaded, index, finalState)
    setPlan(nextPlan)
    setConsequenceDone(!nextPlan)
    setBoardMode('evidence')
    persist(answer, solution ? step.hints.length + 1 : hintsShown)
  }

  const retry = () => {
    setPhase('answer')
    setResult(null)
    setPlan(null)
    setConsequenceDone(false)
    setBoardMode('evidence')
  }

  const showSolution = () => {
    if (step.kind === 'place') {
      const solved = { ...positions, ...step.solution }
      setPositions(solved)
      check({ positions: solved, solution: true })
    } else {
      // Erkennungs-/Auswahlaufgabe: richtige Antwort markieren
      const candidates =
        step.kind === 'identify' ? step.selectable : step.kind === 'choose' ? step.options.map((o) => o.id) : []
      const correct = candidates.find((id) =>
        assessStep(loaded, index, step.kind === 'choose' ? { selection: { optionId: id } } : { selection: { playerId: id } }).rating !== 'not-yet',
      )
      if (correct) {
        const sel = step.kind === 'choose' ? { optionId: correct } : { playerId: correct }
        setSelection(sel)
        setUsedSolution(true)
        const assessed = assessStep(loaded, index, { selection: sel })
        setResult(assessed)
        setPhase('feedback')
        persist({ selection: sel }, step.hints.length + 1)
      }
    }
  }

  const passed = result !== null && result.rating !== 'not-yet'
  const finish = () =>
    onComplete({
      stepId: step.id,
      rating: result?.rating ?? 'not-yet',
      principles: result?.principles ?? {},
      attempts,
      hintsUsed: hintsShown,
      usedSolution,
    })

  const feedback = result
    ? summarizeFeedback(result, {
        stepFeedback: step.feedback,
        criterionTexts: Object.fromEntries(step.assessment.criteria.map((c) => [c.id, c.feedback])),
        alternativeExplanation: step.assessment.alternatives.find((a) => a.id === result.alternativeId)?.explanation,
      })
    : null

  const attackingOwn = possessionTeam(start) === 'own'
  const evidence = result ? result.criteria.flatMap((c) => c.evidence) : []
  const highlight: Record<string, TokenTone> = {}
  if (step.kind === 'identify' && selection.playerId) highlight[selection.playerId] = phase === 'feedback' ? (passed ? 'good' : 'bad') : 'info'

  const canAnswer =
    step.kind === 'place' ? true : step.kind === 'identify' ? Boolean(step.target === 'player' ? selection.playerId : selection.point) : Boolean(selection.optionId)

  const showConsequence = phase === 'feedback' && plan !== null && boardMode === 'consequence'
  const boardNode = (
    <>
      {showConsequence && plan ? (
        <ConsequenceBoard
          key={`c${attempts}`}
          loaded={loaded}
          plan={plan}
          reducedMotion={reducedMotion}
          highlight={highlight}
          view={step.view}
          onFinish={() => setConsequenceDone(true)}
        />
      ) : (
        <BoardView
          loaded={loaded}
          state={answerState}
          view={step.view}
          overlays={step.overlays}
          evidence={phase === 'feedback' ? evidence : []}
          liveLanes={step.kind === 'place' && step.liveLanes && !isTest && phase === 'answer'}
          controlled={controlled}
          selectable={step.kind === 'identify' && step.target === 'player' && phase === 'answer' ? step.selectable : []}
          selectedPlayerId={selection.playerId ?? null}
          tapPoint={selection.point ?? null}
          highlight={highlight}
          onPlayerTap={(id) => {
            markStarted()
            setSelection({ playerId: id })
          }}
          onPointTap={
            step.kind === 'identify' && step.target === 'point' && phase === 'answer'
              ? (p) => {
                  markStarted()
                  setSelection({ point: p })
                }
              : undefined
          }
          placement={step.kind === 'place' ? { enabled: phase === 'answer', positions, onMove, clamp } : undefined}
          label={step.kind === 'place' ? 'Spielfeld – ziehe deine Spieler oder tippe sie an und dann auf den Zielpunkt' : 'Spielfeld – tippe deine Antwort an'}
        />
      )}
      {phase === 'feedback' && plan && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <button
            type="button"
            onClick={() => setBoardMode((m) => (m === 'evidence' ? 'consequence' : 'evidence'))}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink-900/85 px-4 py-2 text-sm font-semibold text-text backdrop-blur hover:bg-ink-800"
            data-testid="toggle-consequence"
          >
            {boardMode === 'evidence' ? <Play size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
            {boardMode === 'evidence' ? 'Was passiert jetzt?' : 'Erklärung zeigen'}
          </button>
        </div>
      )}
    </>
  )

  const panel = (
    <div className="flex h-full flex-col gap-4">
      <p className="eyebrow">{isTest ? 'Test' : step.kind === 'place' ? 'Du bist dran' : step.kind === 'identify' ? 'Erkennen' : 'Entscheiden'}</p>
      {phase === 'answer' && (
        <>
          <Instruction text={t(step.instruction)} speech={speech} />
          {step.kind === 'place' && attempts === 0 && (
            <p className="text-sm text-text-faint">Ziehen – oder antippen und dann den Zielpunkt antippen. Tastatur: Tab und Pfeiltasten.</p>
          )}
          {step.kind === 'choose' && (
            <div className="grid gap-2" role="radiogroup" aria-label="Antwortmöglichkeiten">
              {step.options.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  role="radio"
                  aria-checked={selection.optionId === o.id}
                  onClick={() => {
                    markStarted()
                    setSelection({ optionId: o.id })
                  }}
                  className={`rounded-2xl border px-4 py-3 text-left font-semibold transition-colors ${selection.optionId === o.id ? 'border-accent bg-accent-soft text-text' : 'border-line-strong bg-ink-700 text-text-muted hover:text-text'}`}
                >
                  {t(o.label)}
                </button>
              ))}
            </div>
          )}
          {hintsShown > 0 && (
            <ul className="space-y-2" aria-live="polite">
              {step.hints.slice(0, hintsShown).map((h) => (
                <li key={h.de} className="flex gap-2 rounded-xl border border-warn/30 bg-warn/10 px-3 py-2 text-sm text-warn">
                  <Lightbulb size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {t(h)}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
            {!isTest && hintsShown < step.hints.length ? (
              <Button variant="ghost" onClick={() => setHintsShown((h) => h + 1)} data-testid="hint">
                <Lightbulb size={18} aria-hidden="true" /> Tipp
              </Button>
            ) : (
              <span />
            )}
            <Button size="lg" onClick={() => check()} disabled={!canAnswer} data-testid="check">
              Prüfen
            </Button>
          </div>
        </>
      )}

      {phase === 'feedback' && feedback && result && (
        <div className="flex h-full flex-col gap-4 animate-rise" role="status" aria-live="polite">
          <div className="flex items-center gap-3">
            <span
              className={`grid h-11 w-11 place-items-center rounded-full ${passed ? 'bg-good/15 text-good' : 'bg-warn/15 text-warn'}`}
              aria-hidden="true"
            >
              {passed ? <Sparkles size={22} /> : <RotateCcw size={22} />}
            </span>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide" data-testid="feedback-headline">
              {usedSolution ? 'So geht es' : feedback.headline}
            </h2>
          </div>
          {feedback.main && <p className="text-lg leading-snug text-text">{feedback.main}</p>}
          {feedback.positives.length > 0 && (
            <ul className="space-y-1.5">
              {feedback.positives.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-text-muted">
                  <CircleCheck size={16} className="mt-0.5 shrink-0 text-good" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          )}
          {plan?.playout && consequenceDone && (
            <p className="rounded-xl bg-ink-700 px-3 py-2 text-sm font-semibold text-text" data-testid="consequence">
              {playoutMessage(plan.playout.outcome, attackingOwn)}
            </p>
          )}
          {saveError && <p className="text-xs text-bad">{saveError}</p>}
          <div className="mt-auto flex flex-wrap items-center justify-end gap-3">
            {!passed && !isTest && attempts >= 2 && !usedSolution && (
              <Button variant="ghost" onClick={showSolution} data-testid="show-solution">
                Lösung zeigen
              </Button>
            )}
            {(!passed || (!isTest && passed && !usedSolution)) && !isTest && (
              <Button variant={passed ? 'secondary' : 'primary'} size="lg" onClick={retry} data-testid="retry">
                {passed ? 'Nochmal' : 'Nochmal versuchen'}
              </Button>
            )}
            {(passed || isTest || usedSolution) && (
              <Button size="lg" onClick={finish} data-testid="next-step">
                Weiter
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )

  return <StepLayout board={boardNode} panel={panel} />
}
