import type { PitchSpec } from '../board/pitch'
import { attackedGoals, ballOwner, type BoardState, type PlayerState, type TeamSide, type TeamsSetup } from '../board/state'
import { distance, type Vec2 } from '../geometry/vec'
import type { MotionModel } from '../model/motion'
import { positionOnTrack, sampleTimeline, type PlayerSegment, type Timeline } from './timeline'

/**
 * Körperhaltung der Spielfiguren (docs/design/spielerfiguren.md, Abschnitt 4)
 * ==========================================================================
 * Reine Darstellung: Blickrichtung und Zustand fließen nicht in die Bewertung
 * ein. Alles ist deterministisch aus Spielsituation bzw. Zeitleiste
 * abgeleitet, damit Zeitlupe, Pause und Wiederholen dieselben Bilder zeigen.
 *
 * Regeln: läuft → Laufrichtung; steht → zum Ball; Ballführender → zum
 * gegnerischen Tor; Verteidiger nah am Ballführenden → zu ihm, breite Haltung;
 * Passen/Schießen/Annehmen rund um die Ballereignisse der Zeitleiste.
 * Die Schwellen sind Modellannahmen.
 */

export type PlayerAction = 'ready' | 'run' | 'defend' | 'receive' | 'pass' | 'shoot'

export interface PlayerPose {
  /** Blickrichtung in Spielfeldkoordinaten, Bogenmaß (0 = Richtung +x, π/2 = Richtung +y) */
  readonly facing: number
  readonly action: PlayerAction
  /** Zurückgelegte Strecke in Metern – bestimmt das Bild der Laufanimation */
  readonly stride: number
}

export type PoseMap = Readonly<Record<string, PlayerPose>>

export interface PoseContext {
  readonly pitch: PitchSpec
  readonly teams: TeamsSetup
  readonly model: MotionModel
}

/** Ab dieser Geschwindigkeit gilt ein Spieler als laufend (m/s, Annahme). */
export const RUN_SPEED = 1.0
/** Verteidigungshaltung bis zu dieser Entfernung über der Druckdistanz hinaus (m, Annahme). */
export const DEFEND_EXTRA = 2.5
/** Passen/Schießen: Haltung kurz vor bis kurz nach dem Abspielen (s). */
const KICK_BEFORE = 0.15
const KICK_AFTER = 0.3
/** Annehmen: Haltung in den letzten Zehnteln vor der Ankunft des Balls (s). */
const RECEIVE_BEFORE = 0.45
const RECEIVE_AFTER = 0.15
/** Abstand für die Geschwindigkeitsschätzung (s). */
const DT = 0.08
/** Glättung der Drehung: frühere Zeitpunkte und ihr Gewicht (Figuren drehen sich nicht ruckartig). */
const SMOOTHING: readonly (readonly [number, number])[] = [
  [0, 0.5],
  [0.12, 0.3],
  [0.24, 0.2],
]

function angleTo(from: Vec2, to: Vec2, fallback: number): number {
  const dx = to.x - from.x
  const dy = to.y - from.y
  return Math.hypot(dx, dy) < 1e-6 ? fallback : Math.atan2(dy, dx)
}

function attackAngle(ctx: PoseContext, team: TeamSide): number {
  return ctx.teams[team].attackDirection === 1 ? 0 : Math.PI
}

interface Stance {
  readonly facing: number
  readonly action: PlayerAction
}

function standingStance(p: PlayerState, state: BoardState, owner: PlayerState | undefined, ctx: PoseContext): Stance {
  if (owner && p.id === owner.id) {
    let goal: Vec2 | null = null
    for (const g of attackedGoals(ctx.pitch, ctx.teams, p.team)) {
      if (!goal || distance(p.pos, g.center) < distance(p.pos, goal)) goal = g.center
    }
    return { facing: goal ? angleTo(p.pos, goal, attackAngle(ctx, p.team)) : attackAngle(ctx, p.team), action: 'ready' }
  }
  if (owner && p.team !== owner.team && distance(p.pos, owner.pos) <= ctx.model.pressureDistance + DEFEND_EXTRA) {
    return { facing: angleTo(p.pos, owner.pos, attackAngle(ctx, p.team)), action: 'defend' }
  }
  return { facing: angleTo(p.pos, state.ball.pos, attackAngle(ctx, p.team)), action: 'ready' }
}

/** Haltung in einer stehenden Situation (Aufgaben, Standbilder). */
export function staticPoses(state: BoardState, ctx: PoseContext): PoseMap {
  const owner = ballOwner(state)
  const out: Record<string, PlayerPose> = {}
  for (const p of state.players) out[p.id] = { ...standingStance(p, state, owner, ctx), stride: 0 }
  return out
}

function travelled(track: readonly PlayerSegment[] | undefined, initial: Vec2, t: number): number {
  let sum = 0
  for (const seg of track ?? []) {
    if (t >= seg.t1) sum += distance(seg.from, seg.to)
    else {
      if (t > seg.t0) sum += distance(seg.from, positionOnTrack([seg], seg.from, t))
      break
    }
  }
  return sum
}

function ballStance(timeline: Timeline, id: string, t: number): Stance | null {
  for (const seg of timeline.ball) {
    if (seg.kind !== 'flight') continue
    if (seg.fromId === id && t >= seg.t0 - KICK_BEFORE && t <= seg.t0 + KICK_AFTER) {
      return { facing: angleTo(seg.from, seg.to, 0), action: seg.toId === null ? 'shoot' : 'pass' }
    }
    if (seg.toId === id && t >= seg.t1 - RECEIVE_BEFORE && t <= seg.t1 + RECEIVE_AFTER) {
      return { facing: angleTo(seg.to, seg.from, 0), action: 'receive' }
    }
  }
  return null
}

function rawTimelineStances(timeline: Timeline, t: number, ctx: PoseContext): Record<string, Stance> {
  const time = Math.min(Math.max(0, t), timeline.duration)
  const state = sampleTimeline(timeline, time).state
  const owner = ballOwner(state)
  const t0 = Math.max(0, time - DT)
  const t1 = Math.min(timeline.duration, time + DT)
  const out: Record<string, Stance> = {}
  for (const p of timeline.initial.players) {
    const now = state.players.find((q) => q.id === p.id) ?? p
    const track = timeline.tracks[p.id]
    const before = positionOnTrack(track, p.pos, t0)
    const after = positionOnTrack(track, p.pos, t1)
    const speed = t1 > t0 ? distance(before, after) / (t1 - t0) : 0
    let stance = ballStance(timeline, p.id, time) ?? standingStance(now, state, owner, ctx)
    if (stance.action !== 'pass' && stance.action !== 'shoot' && stance.action !== 'receive' && speed > RUN_SPEED) {
      // Langsam seitlich oder rückwärts beim Gegner: Verteidigungshaltung bleibt, sonst Laufen.
      stance =
        stance.action === 'defend' && speed < ctx.model.playerSpeed * 0.6
          ? stance
          : { facing: angleTo(before, after, stance.facing), action: 'run' }
    }
    out[p.id] = stance
  }
  return out
}

/** Haltung zur Zeit t einer Zeitleiste (Zuschauen, Erklärung, Folge-Animation). */
export function timelinePoses(timeline: Timeline, t: number, ctx: PoseContext): PoseMap {
  const time = Math.min(Math.max(0, t), timeline.duration)
  const samples = SMOOTHING.map(([back, weight]) => [rawTimelineStances(timeline, Math.max(0, time - back), ctx), weight] as const)
  const current = samples[0]![0]
  const out: Record<string, PlayerPose> = {}
  for (const p of timeline.initial.players) {
    let sx = 0
    let sy = 0
    for (const [stances, weight] of samples) {
      const f = stances[p.id]!.facing
      sx += Math.cos(f) * weight
      sy += Math.sin(f) * weight
    }
    const stance = current[p.id]!
    // Bei Ballaktionen zählt die genaue Richtung (Pass geht dorthin, wohin die Figur schaut).
    const facing = stance.action === 'pass' || stance.action === 'shoot' ? stance.facing : Math.atan2(sy, sx)
    out[p.id] = { facing, action: stance.action, stride: travelled(timeline.tracks[p.id], p.pos, time) }
  }
  return out
}
