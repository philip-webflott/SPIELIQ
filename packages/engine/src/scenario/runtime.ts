import { evaluateAssessment } from '../assessment/evaluate'
import type { AssessmentContext, AssessmentResult } from '../assessment/types'
import { clampToPitch, fullPitch, miniGoalPitch, smallPitch, type PitchSpec } from '../board/pitch'
import { withPositions, type BoardState, type TeamsSetup } from '../board/state'
import type { Vec2 } from '../geometry/vec'
import { motionModel, type MotionModel } from '../model/motion'
import { planPlayout, type PlayoutResult } from '../simulation/playout'
import { compileScript, finalState, type Timeline } from '../simulation/timeline'
import { missionSchema, type BoardInput, type FilmStep, type InteractiveStep, type Mission, type Rect, type Step } from './schema'

export interface LoadedMission {
  readonly mission: Mission
  readonly pitch: PitchSpec
  readonly teams: TeamsSetup
  readonly model: MotionModel
  /** Ausgangssituation jedes Schritts (deterministisch, unabhängig von Spielereingaben) */
  readonly boards: readonly BoardState[]
}

export function buildPitch(config: Mission['pitch']): PitchSpec {
  switch (config.kind) {
    case 'full':
      return fullPitch(config.length, config.width)
    case 'small':
      return smallPitch(config.id, config.length, config.width, config.goalWidth, config.penaltyArea)
    case 'minigoals':
      return miniGoalPitch(config.id, config.length, config.width, config.goalWidth, config.goalInset)
  }
}

export function toBoardState(input: BoardInput): BoardState {
  const players = input.players.map((p) => ({ ...p }))
  const owner = input.ball.ownerId ? players.find((p) => p.id === input.ball.ownerId) : undefined
  const pos = owner?.pos ?? input.ball.pos ?? { x: 0, y: 0 }
  return { players, ball: { pos, ownerId: owner ? owner.id : null } }
}

export class MissionValidationError extends Error {
  constructor(
    readonly missionId: string,
    readonly problems: readonly string[],
  ) {
    super(`Mission ${missionId} ist ungültig:\n- ${problems.join('\n- ')}`)
  }
}

type Overlays = Step['overlays']
type Script = Extract<Step, { kind: 'watch' }>['script']

function collectOverlayAndScriptRefs(overlays: Overlays, script: Script): string[] {
  const refs: string[] = []
  for (const o of overlays) {
    if (o.type === 'lane') refs.push(o.from, o.to)
    if (o.type === 'passOptions') refs.push(o.from)
    if (o.type === 'freeSpace') refs.push(o.around)
    if (o.type === 'shadow') refs.push(o.defender)
    if (o.type === 'ring') refs.push(o.player)
    if (o.type === 'distance') refs.push(o.a, o.b)
  }
  for (const ev of script) {
    if (ev.type === 'pass') refs.push(ev.from, ev.to)
    else refs.push(ev.player)
  }
  return refs
}

function collectReferences(step: Step): string[] {
  const script = step.kind === 'watch' || step.kind === 'explain' ? step.script : []
  const refs = collectOverlayAndScriptRefs(step.overlays, script)
  if (step.kind === 'place') refs.push(...step.controlled, ...Object.keys(step.solution))
  if (step.kind === 'identify') refs.push(...step.selectable)
  return refs
}

/** Fachlich-technische Konsistenzprüfung über das Schema hinaus. */
export function validateMission(mission: Mission, boards: readonly BoardState[]): string[] {
  const problems: string[] = []
  const checkBoard = (board: BoardInput, where: string) => {
    const ids = board.players.map((p) => p.id)
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
    if (dupes.length) problems.push(`${where}: doppelte Spieler-IDs ${dupes.join(', ')}`)
    if (board.ball.ownerId && !ids.includes(board.ball.ownerId)) problems.push(`${where}: Ballbesitzer ${board.ball.ownerId} fehlt`)
    if (!board.ball.ownerId && !board.ball.pos) problems.push(`${where}: Ball ohne Besitzer braucht eine Position`)
  }
  checkBoard(mission.board, 'Ausgangssituation')
  const checkFilm = (step: FilmStep, board: BoardState) => {
    let known = new Set(board.players.map((p) => p.id))
    step.segments.forEach((seg, k) => {
      const where = `Schritt ${step.id}, Abschnitt ${k + 1}`
      if (seg.board) {
        checkBoard(seg.board, where)
        known = new Set(seg.board.players.map((p) => p.id))
      }
      for (const ref of collectOverlayAndScriptRefs(seg.overlays, seg.script)) {
        if (!known.has(ref)) problems.push(`${where}: unbekannter Spieler "${ref}"`)
      }
    })
  }
  const stepIds = new Set<string>()
  mission.steps.forEach((step, i) => {
    if (stepIds.has(step.id)) problems.push(`Schritt ${step.id}: ID doppelt`)
    stepIds.add(step.id)
    if (step.board) checkBoard(step.board, `Schritt ${step.id}`)
    const board = boards[i]
    if (!board) return
    const known = new Set(board.players.map((p) => p.id))
    for (const ref of collectReferences(step)) {
      if (!known.has(ref)) problems.push(`Schritt ${step.id}: unbekannter Spieler "${ref}"`)
    }
    if (step.kind === 'film') checkFilm(step, board)
    if (step.kind === 'place') {
      for (const id of Object.keys(step.solution)) {
        if (!step.controlled.includes(id)) problems.push(`Schritt ${step.id}: Lösung bewegt nicht steuerbaren Spieler ${id}`)
      }
      for (const ex of step.examples) {
        for (const id of Object.keys(ex.positions)) {
          if (!step.controlled.includes(id)) problems.push(`Schritt ${step.id}, Beispiel "${ex.name}": ${id} ist nicht steuerbar`)
        }
      }
    }
    if (mission.mode === 'test' && 'hints' in step && step.hints.length > 0) {
      problems.push(`Schritt ${step.id}: Testmissionen enthalten keine Hinweise`)
    }
  })
  return problems
}

export function loadMission(raw: unknown): LoadedMission {
  const mission = missionSchema.parse(raw)
  const pitch = buildPitch(mission.pitch)
  const teams: TeamsSetup = mission.teams
  const model = motionModel(mission.motion.profile)
  const boards: BoardState[] = []
  let current = toBoardState(mission.board)
  for (const step of mission.steps) {
    const start = step.board ? toBoardState(step.board) : current
    boards.push(start)
    switch (step.kind) {
      case 'film':
        current = compileFilm(start, step, model).at(-1)?.end ?? start
        break
      case 'watch':
        current = finalState(compileScript(start, step.script, model))
        break
      case 'explain':
        current = step.script.length > 0 ? finalState(compileScript(start, step.script, model)) : start
        break
      case 'place':
        current = withPositions(start, step.solution)
        break
      default:
        current = start
    }
  }
  const problems = validateMission(mission, boards)
  if (problems.length > 0) throw new MissionValidationError(mission.id, problems)
  return { mission, pitch, teams, model, boards }
}

export interface FilmSegmentPlan {
  readonly start: BoardState
  /** Bewegung des Abschnitts; null, wenn das Bild steht */
  readonly timeline: Timeline | null
  readonly end: BoardState
}

/** Abschnitte eines Erklärfilms mit Ausgangssituation und Bewegung (deterministisch). */
export function compileFilm(start: BoardState, step: FilmStep, model: MotionModel): FilmSegmentPlan[] {
  let current = start
  return step.segments.map((seg) => {
    const segStart = seg.board ? toBoardState(seg.board) : current
    const timeline = seg.script.length > 0 ? compileScript(segStart, seg.script, model) : null
    const end = timeline ? finalState(timeline) : segStart
    current = end
    return { start: segStart, timeline, end }
  })
}

export function filmSegments(loaded: LoadedMission, stepIndex: number): FilmSegmentPlan[] {
  const step = getStep(loaded, stepIndex)
  if (step.kind !== 'film') throw new Error(`Schritt ${step.id} ist kein Erklärfilm`)
  return compileFilm(loaded.boards[stepIndex]!, step, loaded.model)
}

export function getStep(loaded: LoadedMission, stepIndex: number): Step {
  const step = loaded.mission.steps[stepIndex]
  if (!step) throw new Error(`Mission ${loaded.mission.id} hat keinen Schritt ${stepIndex}`)
  return step
}

export function isInteractive(step: Step): step is InteractiveStep {
  return step.kind === 'identify' || step.kind === 'place' || step.kind === 'choose'
}

function clampToRect(p: Vec2, rect: Rect | undefined): Vec2 {
  if (!rect) return p
  return {
    x: Math.min(rect.max.x, Math.max(rect.min.x, p.x)),
    y: Math.min(rect.max.y, Math.max(rect.min.y, p.y)),
  }
}

/**
 * Wendet Spielereingaben an. Nur steuerbare Spieler werden bewegt, Positionen
 * werden auf den erlaubten Bereich begrenzt – damit kann der Server Eingaben
 * des Clients sicher übernehmen und selbst bewerten.
 */
export function applyPlacement(loaded: LoadedMission, stepIndex: number, positions: Readonly<Record<string, Vec2>>): BoardState {
  const step = getStep(loaded, stepIndex)
  const start = loaded.boards[stepIndex]!
  if (step.kind !== 'place') return start
  const safe: Record<string, Vec2> = {}
  for (const id of step.controlled) {
    const p = positions[id]
    if (!p || !Number.isFinite(p.x) || !Number.isFinite(p.y)) continue
    safe[id] = clampToPitch(loaded.pitch, clampToRect(p, step.area))
  }
  return withPositions(start, safe)
}

export interface StepAnswer {
  readonly positions?: Readonly<Record<string, Vec2>>
  readonly selection?: AssessmentContext['selection']
}

export function assessmentContext(loaded: LoadedMission, stepIndex: number, answer: StepAnswer): AssessmentContext {
  const step = getStep(loaded, stepIndex)
  if (!isInteractive(step)) throw new Error(`Schritt ${step.id} ist nicht interaktiv`)
  const start = loaded.boards[stepIndex]!
  const state = step.kind === 'place' ? applyPlacement(loaded, stepIndex, answer.positions ?? {}) : start
  let selection = answer.selection
  if (step.kind === 'identify' && step.target === 'player' && selection?.playerId && step.selectable.length > 0) {
    if (!step.selectable.includes(selection.playerId)) selection = { ...selection, playerId: undefined }
  }
  return {
    state,
    initial: start,
    pitch: loaded.pitch,
    teams: loaded.teams,
    model: loaded.model,
    controlled: step.kind === 'place' ? step.controlled : [],
    ...(selection ? { selection } : {}),
  }
}

export function assessStep(loaded: LoadedMission, stepIndex: number, answer: StepAnswer): AssessmentResult {
  const step = getStep(loaded, stepIndex) as InteractiveStep
  return evaluateAssessment(assessmentContext(loaded, stepIndex, answer), step.assessment)
}

export interface ConsequencePlan {
  readonly timeline: Timeline
  readonly playout: PlayoutResult | null
}

/** Zeitleiste der Konsequenz nach einer Entscheidung (automatisch oder vom Autor vorgegeben). */
export function planConsequence(loaded: LoadedMission, stepIndex: number, state: BoardState): ConsequencePlan | null {
  const step = getStep(loaded, stepIndex)
  if (!isInteractive(step) || step.consequence === 'none') return null
  if (step.consequence === 'auto') {
    const playout = planPlayout(state, loaded.pitch, loaded.teams, loaded.model)
    if (playout.script.length === 0) return null
    return { timeline: compileScript(state, playout.script, loaded.model), playout }
  }
  return { timeline: compileScript(state, step.consequence.script, loaded.model), playout: null }
}

export function stepTimeline(loaded: LoadedMission, stepIndex: number): Timeline | null {
  const step = getStep(loaded, stepIndex)
  const start = loaded.boards[stepIndex]!
  if (step.kind === 'watch' || (step.kind === 'explain' && step.script.length > 0)) {
    return compileScript(start, step.script, loaded.model)
  }
  return null
}
