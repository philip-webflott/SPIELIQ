import { analyzePassToPoint, analyzeReception } from '../analysis/passing'
import type { PitchSpec } from '../board/pitch'
import {
  attackedGoals,
  ballOwner,
  otherTeam,
  progression,
  teamPlayers,
  type BoardState,
  type PlayerState,
  type TeamSide,
  type TeamsSetup,
} from '../board/state'
import { add, clamp, distance, lerp, normalize, scale, sub, type Vec2 } from '../geometry/vec'
import { timeToReach, type MotionModel } from '../model/motion'
import type { ParsedScriptEvent } from './timeline'

/**
 * Konsequenz-Simulation ("Was passiert jetzt?")
 * ============================================
 * Nach einer Entscheidung des Lernenden spielt die ballbesitzende Mannschaft
 * die nach einem einfachen, deterministischen Modell beste Option aus. So
 * wird sichtbar, ob eine Position einen Passweg schließt, einen freien Spieler
 * erzeugt oder eine Torchance verhindert. Das Modell ist bewusst einfach und
 * nachvollziehbar – es soll Ursache und Wirkung zeigen, kein echtes Spiel simulieren.
 */

export type PlayoutOutcome =
  | 'goalChance'
  | 'progress'
  | 'safePass'
  | 'interception'
  | 'pressured'
  | 'forcedBack'
  | 'noOption'

export interface PlayoutOption {
  readonly kind: 'pass' | 'dribble' | 'shot'
  readonly targetId: string | null
  readonly target: Vec2
  readonly utility: number
  readonly success: number
}

export interface PlayoutResult {
  readonly outcome: PlayoutOutcome
  readonly option: PlayoutOption | null
  readonly script: ParsedScriptEvent[]
  /** ID des Spielers, der am Ende im Fokus steht (Empfänger, Abfangender …) */
  readonly focusPlayerId: string | null
}

/** Gefährlichkeit einer Position für die angreifende Mannschaft (0 … 1). */
export function zoneValue(pitch: PitchSpec, teams: TeamsSetup, team: TeamSide, p: Vec2): number {
  const prog = progression(pitch, teams, team, p)
  const goals = attackedGoals(pitch, teams, team)
  const goal = goals.reduce((best, g) => (distance(g.center, p) < distance(best.center, p) ? g : best), goals[0]!)
  const dist = distance(p, goal.center)
  const centrality = 1 - Math.min(1, Math.abs(p.y - goal.center.y) / (pitch.width / 2))
  const nearGoal = Math.max(0, 1 - dist / Math.max(25, pitch.length * 0.4))
  return clamp(0.5 * prog * prog + 0.5 * centrality * nearGoal, 0, 1)
}

function shotOption(state: BoardState, carrier: PlayerState, pitch: PitchSpec, teams: TeamsSetup, model: MotionModel): PlayoutOption | null {
  const goals = attackedGoals(pitch, teams, carrier.team)
  const goal = goals.reduce((best, g) => (distance(g.center, carrier.pos) < distance(best.center, carrier.pos) ? g : best), goals[0]!)
  const dist = distance(goal.center, carrier.pos)
  const maxShot = Math.min(20, pitch.length * 0.3)
  if (dist > maxShot) return null
  const lane = analyzePassToPoint(state, carrier.id, goal.center, null, { ...model, passSpeed: model.maxPassSpeed * 1.25, maxPassSpeed: model.maxPassSpeed * 1.25 })
  const success = lane.status === 'open' ? 0.85 : lane.status === 'risky' ? 0.45 : 0.1
  return { kind: 'shot', targetId: null, target: goal.center, utility: success * (1.2 - dist / (maxShot * 2)), success }
}

function dribbleOption(state: BoardState, carrier: PlayerState, pitch: PitchSpec, teams: TeamsSetup, model: MotionModel): PlayoutOption {
  const goals = attackedGoals(pitch, teams, carrier.team)
  const goal = goals.reduce((best, g) => (distance(g.center, carrier.pos) < distance(best.center, carrier.pos) ? g : best), goals[0]!)
  const dir = normalize(sub(goal.center, carrier.pos))
  const step = Math.min(8, distance(goal.center, carrier.pos) * 0.5)
  const target = add(carrier.pos, scale(dir, step))
  const defenders = teamPlayers(state, otherTeam(carrier.team))
  const blocked = defenders.some((d) => {
    const ahead = distance(d.pos, lerp(carrier.pos, target, 0.5))
    return ahead < step * 0.75 || timeToReach(model, d.pos, target, model.reachRadius) < (step / (model.playerSpeed * 0.7)) * 0.9
  })
  const success = blocked ? 0.25 : 0.8
  const value = zoneValue(pitch, teams, carrier.team, target) - zoneValue(pitch, teams, carrier.team, carrier.pos)
  return { kind: 'dribble', targetId: null, target, utility: success * (0.15 + value), success }
}

export function choosePlayoutOption(
  state: BoardState,
  pitch: PitchSpec,
  teams: TeamsSetup,
  model: MotionModel,
): PlayoutOption | null {
  const carrier = ballOwner(state)
  if (!carrier) return null
  const options: PlayoutOption[] = []
  const baseValue = zoneValue(pitch, teams, carrier.team, carrier.pos)
  for (const mate of teamPlayers(state, carrier.team)) {
    if (mate.id === carrier.id || mate.role === 'GK') continue
    const reception = analyzeReception(state, carrier.id, mate.id, model)
    const status = reception.pass.status
    const free = reception.timeOnBall > 0.5
    const success = status === 'open' ? (free ? 0.95 : 0.75) : status === 'risky' ? 0.45 : 0.08
    const value = zoneValue(pitch, teams, carrier.team, mate.pos)
    const gain = value - baseValue
    const timeBonus = clamp(reception.timeOnBall / 2, 0, 0.3)
    options.push({
      kind: 'pass',
      targetId: mate.id,
      target: mate.pos,
      utility: success * (0.25 + gain + timeBonus) - (1 - success) * 0.35,
      success,
    })
  }
  const shot = shotOption(state, carrier, pitch, teams, model)
  if (shot) options.push(shot)
  options.push(dribbleOption(state, carrier, pitch, teams, model))
  options.sort((a, b) => b.utility - a.utility || (a.targetId ?? '').localeCompare(b.targetId ?? ''))
  return options[0] ?? null
}

/** Erzeugt das Skript der Konsequenz-Animation für die aktuelle Situation. */
export function planPlayout(
  state: BoardState,
  pitch: PitchSpec,
  teams: TeamsSetup,
  model: MotionModel,
  startAt = 0.4,
): PlayoutResult {
  const carrier = ballOwner(state)
  const option = choosePlayoutOption(state, pitch, teams, model)
  if (!carrier || !option) return { outcome: 'noOption', option: null, script: [], focusPlayerId: null }
  const defenders = teamPlayers(state, otherTeam(carrier.team)).filter((d) => d.role !== 'GK')
  const script: ParsedScriptEvent[] = []

  if (option.kind === 'pass' && option.targetId) {
    const receiver = state.players.find((p) => p.id === option.targetId)!
    const lane = analyzePassToPoint(state, carrier.id, receiver.pos, receiver.id, model)
    if (lane.status === 'blocked' && lane.interceptorId && lane.interceptPoint) {
      const ballTime = (distance(carrier.pos, lane.interceptPoint) / Math.max(1e-6, lane.distance)) * lane.ballTime
      script.push({ type: 'move', player: lane.interceptorId, to: lane.interceptPoint, at: startAt, duration: Math.max(0.3, ballTime), ease: 'out' })
      script.push({ type: 'pass', from: carrier.id, to: lane.interceptorId, at: startAt })
      return { outcome: 'interception', option, script, focusPlayerId: lane.interceptorId }
    }
    script.push({ type: 'pass', from: carrier.id, to: receiver.id, at: startAt })
    const arrival = startAt + lane.ballTime
    // Für "Torchance" zählt, ob ein Feldspieler noch eingreifen kann – der Torwart allein verhindert sie nicht.
    const keepers = teamPlayers(state, otherTeam(carrier.team))
      .filter((d) => d.role === 'GK')
      .map((d) => d.id)
    const reception = analyzeReception(state, carrier.id, receiver.id, model, { ignore: keepers })
    // Der nächste Verteidiger läuft den Empfänger an, der zweite sichert torseitig ab.
    const chasers = [...defenders].sort((a, b) => distance(a.pos, receiver.pos) - distance(b.pos, receiver.pos)).slice(0, 2)
    const ownGoal = attackedGoals(pitch, teams, carrier.team).reduce(
      (best, g) => (distance(g.center, receiver.pos) < distance(best.center, receiver.pos) ? g : best),
      attackedGoals(pitch, teams, carrier.team)[0]!,
    )
    chasers.forEach((d, i) => {
      const stop =
        i === 0
          ? add(receiver.pos, scale(normalize(sub(d.pos, receiver.pos)), model.pressureDistance * 0.8))
          : add(receiver.pos, scale(normalize(sub(ownGoal.center, receiver.pos)), model.pressureDistance * 2.2))
      script.push({ type: 'move', player: d.id, to: stop, at: startAt + model.reactionTime, ease: 'out' })
    })
    const value = zoneValue(pitch, teams, carrier.team, receiver.pos)
    const backwards = progression(pitch, teams, carrier.team, receiver.pos) < progression(pitch, teams, carrier.team, carrier.pos) - 0.03
    if (reception.timeOnBall >= 1.0 && value >= 0.45) {
      const shot = shotOption({ ...state, ball: { pos: receiver.pos, ownerId: receiver.id } }, receiver, pitch, teams, model)
      const goals = attackedGoals(pitch, teams, carrier.team)
      const goal = goals.reduce((best, g) => (distance(g.center, receiver.pos) < distance(best.center, receiver.pos) ? g : best), goals[0]!)
      const toward = add(receiver.pos, scale(normalize(sub(goal.center, receiver.pos)), Math.min(6, distance(goal.center, receiver.pos) * 0.35)))
      script.push({ type: 'dribble', player: receiver.id, to: toward, at: arrival + 0.15, duration: 1.0 })
      if (shot) script.push({ type: 'shot', player: receiver.id, target: goal.center, at: arrival + 1.25 })
      return { outcome: 'goalChance', option, script, focusPlayerId: receiver.id }
    }
    if (reception.timeOnBall < 0.2) return { outcome: 'pressured', option, script, focusPlayerId: receiver.id }
    if (backwards) return { outcome: 'forcedBack', option, script, focusPlayerId: receiver.id }
    return { outcome: value > zoneValue(pitch, teams, carrier.team, carrier.pos) + 0.05 ? 'progress' : 'safePass', option, script, focusPlayerId: receiver.id }
  }

  if (option.kind === 'shot') {
    script.push({ type: 'shot', player: carrier.id, target: option.target, at: startAt })
    return { outcome: 'goalChance', option, script, focusPlayerId: carrier.id }
  }

  script.push({ type: 'dribble', player: carrier.id, to: option.target, at: startAt, duration: 1.2 })
  const nearest = [...defenders].sort((a, b) => distance(a.pos, option.target) - distance(b.pos, option.target))[0]
  if (nearest) {
    script.push({ type: 'move', player: nearest.id, to: lerp(nearest.pos, option.target, 0.8), at: startAt + model.reactionTime, ease: 'out' })
  }
  return { outcome: option.success < 0.5 ? 'pressured' : 'progress', option, script, focusPlayerId: carrier.id }
}
