'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  applyPlacement,
  assessStep,
  clampToPitch,
  planConsequence,
  possessionTeam,
  stepTimeline,
  timelinePoses,
  withPositions,
  type AssessmentResult,
  type BoardState,
  type InteractiveStep,
  type LoadedMission,
  type LocalizedText,
  type Step,
  type Vec2,
} from '@spieliq/engine'
import { feedbackSpeech, playoutMessage, summarizeStepFeedback, t, UI_TEXT } from '@spieliq/content'
import { useTimelinePlayer, type TokenTone } from '@spieliq/pitch'
import { CircleCheck, Lightbulb, RotateCcw, Sparkles, Turtle, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAutoSpeak, type Voice } from '@/features/voice/use-voice'
import { BoardView } from './board-view'
import type { MissionPersistence, StepOutcome } from './types'

interface StepProps {
  readonly loaded: LoadedMission
  readonly index: number
  readonly reducedMotion: boolean
  readonly voice: Voice
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

/** Vorlesen bzw. Vorlesen stoppen – erscheint nur, wenn der Text vorgelesen werden kann. */
function SpeakButton({ voice, segments, label }: { voice: Voice; segments: readonly string[]; label: string }) {
  if (!voice.canSpeak(segments)) return null
  return (
    <button
      type="button"
      onClick={() => (voice.speaking ? voice.stop() : voice.speak(segments))}
      className="mt-1 shrink-0 rounded-full p-2 text-text-muted hover:bg-ink-700 hover:text-text"
      aria-label={voice.speaking ? 'Vorlesen stoppen' : label}
      data-testid="speak"
    >
      {voice.speaking ? <VolumeX size={20} aria-hidden="true" /> : <Volume2 size={20} aria-hidden="true" />}
    </button>
  )
}

function Instruction({ text, voice }: { text: string; voice: Voice }) {
  return (
    <div className="flex items-start gap-3" aria-live="polite">
      <p className="font-display text-2xl font-bold leading-tight text-text sm:text-[1.7rem]">{text}</p>
      <SpeakButton voice={voice} segments={[text]} label="Anweisung vorlesen" />
    </div>
  )
}

/** Wenige, beschriftete Knöpfe statt einer Symbolleiste: nochmal ansehen und langsam ansehen. */
function ReplayControls({ player }: { player: ReturnType<typeof useTimelinePlayer> }) {
  const slow = player.speed < 1
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Wiedergabe">
      <button
        type="button"
        onClick={player.restart}
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-text-muted hover:bg-ink-700 hover:text-text"
      >
        <RotateCcw size={18} aria-hidden="true" /> Nochmal
      </button>
      <button
        type="button"
        onClick={() => {
          player.setSpeed(slow ? 1 : 0.5)
          if (!slow && player.finished) player.restart()
        }}
        aria-pressed={slow}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold hover:bg-ink-700 ${slow ? 'text-accent' : 'text-text-muted hover:text-text'}`}
      >
        <Turtle size={18} aria-hidden="true" /> Langsam
      </button>
    </div>
  )
}

/** Schritt für Schritt: zeigt nur den aktuellen Teilschritt; gezählt wird, wie viele Spieler schon bewegt wurden. */
function GuideBox({ guide, movedCount }: { guide: readonly LocalizedText[]; movedCount: number }) {
  const allDone = movedCount >= guide.length
  const current = Math.min(movedCount, guide.length - 1)
  return (
    <div className="rounded-2xl border border-accent/30 bg-accent-soft px-4 py-3" aria-live="polite" data-testid="guide">
      <div className="mb-1.5 flex gap-1.5" aria-hidden="true">
        {guide.map((g, i) => (
          <span key={g.de} className={`h-2 w-7 rounded-full ${i < movedCount ? 'bg-accent' : i === current ? 'bg-accent/50' : 'bg-ink-600'}`} />
        ))}
      </div>
      <p className="text-sm font-semibold text-text-muted">{allDone ? 'Alle gesetzt' : `Schritt ${current + 1} von ${guide.length}`}</p>
      <p className="text-lg font-semibold leading-snug text-text">{allDone ? UI_TEXT.allPlaced : t(guide[current]!)}</p>
    </div>
  )
}

/* ------------------------------------------------------------------ Zuschauen / Erklären */

export function WatchStep({ loaded, index, reducedMotion, voice, onComplete }: StepProps) {
  const step = loaded.mission.steps[index] as Extract<Step, { kind: 'watch' }>
  const timeline = useMemo(() => stepTimeline(loaded, index), [loaded, index])
  const player = useTimelinePlayer(timeline, { autoplay: true, reducedMotion })
  const board = player.frame?.state ?? loaded.boards[index]!
  const done = player.finished
  const showAfter = done && step.after !== undefined
  const caption = showAfter && step.after ? t(step.after.caption) : t(step.instruction)
  useAutoSpeak(voice, [caption], `${index}:${showAfter ? 'after' : 'before'}`)
  return (
    <StepLayout
      board={
        <BoardView
          loaded={loaded}
          state={board}
          poses={timeline ? timelinePoses(timeline, player.time, loaded) : undefined}
          reducedMotion={reducedMotion}
          view={step.view}
          overlays={done ? (step.after?.overlays ?? []) : step.overlays}
          label="Spielsituation"
        />
      }
      panel={
        <div className="flex h-full flex-col gap-4">
          <p className="eyebrow">Schau zu</p>
          <Instruction text={caption} voice={voice} />
          <div className="mt-auto flex items-center justify-between gap-3">
            <ReplayControls player={player} />
            {/* Erster Klick während der Animation springt ans Ende (Erklärung), der zweite geht weiter. */}
            <Button size="lg" onClick={() => (done ? onComplete(null) : player.skipToEnd())} data-testid="next-step">
              Weiter
            </Button>
          </div>
        </div>
      }
    />
  )
}

export function ExplainStep({ loaded, index, reducedMotion, voice, onComplete }: StepProps) {
  const step = loaded.mission.steps[index] as Extract<Step, { kind: 'explain' }>
  const timeline = useMemo(() => stepTimeline(loaded, index), [loaded, index])
  const player = useTimelinePlayer(timeline, { autoplay: true, reducedMotion })
  const board = player.frame?.state ?? loaded.boards[index]!
  const showOverlays = !timeline || player.finished
  useAutoSpeak(voice, [t(step.text), ...step.keyPoints.map((k) => t(k))], `${index}`)
  return (
    <StepLayout
      board={
        <BoardView
          loaded={loaded}
          state={board}
          poses={timeline ? timelinePoses(timeline, player.time, loaded) : undefined}
          reducedMotion={reducedMotion}
          view={step.view}
          overlays={showOverlays ? step.overlays : []}
          label="Erklärung am Spielfeld"
        />
      }
      panel={
        <div className="flex h-full flex-col gap-4">
          <p className="eyebrow">{t(step.instruction)}</p>
          <Instruction text={t(step.text)} voice={voice} />
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
            {timeline ? <ReplayControls player={player} /> : <span />}
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
    <BoardView
      loaded={loaded}
      state={state}
      poses={timelinePoses(plan.timeline, player.time, loaded)}
      reducedMotion={reducedMotion}
      view={view}
      highlight={highlight}
      label="Was passiert jetzt?"
    />
  )
}

export function InteractiveStepView({ loaded, index, reducedMotion, voice, onComplete, persistence, assignmentId }: InteractiveProps) {
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
  /** Im Feedback zuerst die Folge („Was passiert?“), danach automatisch die Begründung am Feld. */
  const [boardMode, setBoardMode] = useState<'evidence' | 'consequence'>('evidence')
  const [replay, setReplay] = useState(0)
  /** Bewegte Spieler – steuert die Schritt-für-Schritt-Anleitung */
  const [moved, setMoved] = useState<string[]>([])
  const startedAt = useRef<number | null>(null)

  useEffect(() => {
    if (phase !== 'feedback' || boardMode !== 'consequence' || !consequenceDone) return
    const timer = window.setTimeout(() => setBoardMode('evidence'), 1200)
    return () => window.clearTimeout(timer)
  }, [phase, boardMode, consequenceDone])

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
    setMoved((prev) => (prev.includes(id) ? prev : [...prev, id]))
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
    // Ohne Animation (weniger Bewegung) gibt es kein Ende abzuwarten – die Folge steht sofort da.
    setConsequenceDone(!nextPlan || reducedMotion)
    setBoardMode(nextPlan && !reducedMotion ? 'consequence' : 'evidence')
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

  const feedback = result ? summarizeStepFeedback(step, result) : null

  const attackingOwn = possessionTeam(start) === 'own'
  const consequenceText = plan?.playout && consequenceDone ? playoutMessage(plan.playout.outcome, attackingOwn) : null
  const feedbackSegments = feedback ? feedbackSpeech(feedback, { usedSolution, consequence: consequenceText }) : []

  // Vorlesen: Anweisung beim Start, danach jeden neuen Teilschritt, jede Hilfe und die Rückmeldung (nach der Folge).
  const guide = step.kind === 'place' ? step.guide : []
  const guideText = guide.length === 0 ? '' : moved.length >= guide.length ? UI_TEXT.allPlaced : t(guide[moved.length])
  const startSegments = [
    t(step.instruction),
    step.kind === 'place' && step.guide[0] ? t(step.guide[0]) : '',
    step.kind === 'place' ? UI_TEXT.placeHint : '',
  ]
  useAutoSpeak(voice, startSegments, phase === 'answer' && attempts === 0 && moved.length === 0 ? `${index}:start` : null)
  useAutoSpeak(voice, [guideText], phase === 'answer' && guide.length > 0 && moved.length > 0 ? `${index}:guide:${Math.min(moved.length, guide.length)}` : null)
  useAutoSpeak(voice, [hintsShown > 0 ? t(step.hints[hintsShown - 1]) : ''], hintsShown > 0 ? `${index}:hint:${hintsShown}` : null)
  const chosen = step.kind === 'choose' ? step.options.find((o) => o.id === selection.optionId) : undefined
  useAutoSpeak(voice, [chosen ? t(chosen.label) : ''], phase === 'answer' && chosen ? `${index}:option:${chosen.id}` : null)
  useAutoSpeak(
    voice,
    feedbackSegments,
    phase === 'feedback' && (consequenceDone || !plan) ? `${index}:feedback:${attempts}:${usedSolution ? 'solution' : 'own'}:${replay}` : null,
  )
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
          key={`c${attempts}-${replay}`}
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
          reducedMotion={reducedMotion}
          label={step.kind === 'place' ? 'Spielfeld – ziehe deine Spieler oder tippe sie an und dann auf den Zielpunkt' : 'Spielfeld – tippe deine Antwort an'}
        />
      )}
      {phase === 'feedback' && plan && !reducedMotion && boardMode === 'evidence' && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <button
            type="button"
            onClick={() => {
              setConsequenceDone(false)
              setBoardMode('consequence')
              setReplay((r) => r + 1)
            }}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink-900/85 px-4 py-2 text-sm font-semibold text-text backdrop-blur hover:bg-ink-800"
            data-testid="replay-consequence"
          >
            <RotateCcw size={16} aria-hidden="true" /> Nochmal ansehen
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
          <Instruction text={t(step.instruction)} voice={voice} />
          {step.kind === 'place' && step.guide.length > 0 && <GuideBox guide={step.guide} movedCount={moved.length} />}
          {step.kind === 'place' && attempts === 0 && (
            <p className="text-sm text-text-faint">
              {UI_TEXT.placeHint}
              <span className="sr-only"> Mit der Tastatur: Tab und Pfeiltasten.</span>
            </p>
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
                <Lightbulb size={18} aria-hidden="true" /> Hilfe
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
              {usedSolution ? UI_TEXT.solutionHeadline : feedback.headline}
            </h2>
            <span className="ml-auto">
              <SpeakButton voice={voice} segments={feedbackSegments} label="Rückmeldung vorlesen" />
            </span>
          </div>
          {feedback.main && <p className="text-lg leading-snug text-text">{feedback.main}</p>}
          {feedback.positives.length > 0 && (
            <ul className="space-y-1.5">
              {feedback.positives.slice(0, 1).map((p) => (
                <li key={p} className="flex gap-2 text-sm text-text-muted">
                  <CircleCheck size={16} className="mt-0.5 shrink-0 text-good" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          )}
          {consequenceText && (
            <p className="rounded-xl bg-ink-700 px-3 py-2 text-sm font-semibold text-text" data-testid="consequence">
              {consequenceText}
            </p>
          )}
          {saveError && <p className="text-xs text-bad">{saveError}</p>}
          <div className="mt-auto flex flex-wrap items-center justify-end gap-3">
            {!passed && !isTest && attempts >= 1 && !usedSolution && (
              <Button variant="ghost" onClick={showSolution} data-testid="show-solution">
                Zeig mir die Lösung
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
