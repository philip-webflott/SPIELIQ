import { z } from 'zod'
import { findPlayer, type BoardState } from '../board/state'
import { distance, lerp, type Vec2 } from '../geometry/vec'
import { passSpeedFor, type MotionModel } from '../model/motion'

/**
 * Szenario-Skripte beschreiben Bewegungen in Autorensprache ("Spieler 7 läuft
 * nach (30|20), Spieler 9 passt zu 7"). Der Compiler erzeugt daraus eine
 * deterministische Zeitleiste, die beliebig abgetastet werden kann
 * (Zeitlupe, Pause, Zurückspulen).
 */

export const vec2Schema = z.object({ x: z.number(), y: z.number() })

export const easeSchema = z.enum(['linear', 'inOut', 'out'])
export type Ease = z.infer<typeof easeSchema>

export const scriptEventSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('move'),
    player: z.string().min(1),
    to: vec2Schema,
    at: z.number().min(0),
    duration: z.number().positive().optional(),
    ease: easeSchema.default('inOut'),
  }),
  z.object({
    type: z.literal('dribble'),
    player: z.string().min(1),
    to: vec2Schema,
    at: z.number().min(0),
    duration: z.number().positive().optional(),
  }),
  z.object({
    type: z.literal('pass'),
    from: z.string().min(1),
    to: z.string().min(1),
    at: z.number().min(0),
    speed: z.number().positive().optional(),
  }),
  z.object({
    type: z.literal('shot'),
    player: z.string().min(1),
    target: vec2Schema,
    at: z.number().min(0),
    speed: z.number().positive().optional(),
  }),
])

export type ScriptEvent = z.input<typeof scriptEventSchema>
export type ParsedScriptEvent = z.output<typeof scriptEventSchema>

export interface PlayerSegment {
  readonly t0: number
  readonly t1: number
  readonly from: Vec2
  readonly to: Vec2
  readonly ease: Ease
}

export type BallSegment =
  | { readonly kind: 'held'; readonly t0: number; readonly t1: number; readonly ownerId: string }
  | { readonly kind: 'loose'; readonly t0: number; readonly t1: number; readonly pos: Vec2 }
  | {
      readonly kind: 'flight'
      readonly t0: number
      readonly t1: number
      readonly from: Vec2
      readonly to: Vec2
      readonly fromId: string
      readonly toId: string | null
    }

export interface Timeline {
  readonly duration: number
  readonly initial: BoardState
  readonly tracks: Readonly<Record<string, readonly PlayerSegment[]>>
  readonly ball: readonly BallSegment[]
}

export function ease(kind: Ease, t: number): number {
  const x = Math.min(1, Math.max(0, t))
  switch (kind) {
    case 'linear':
      return x
    case 'out':
      return 1 - (1 - x) * (1 - x)
    case 'inOut':
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
  }
}

function positionOnTrack(track: readonly PlayerSegment[] | undefined, initial: Vec2, t: number): Vec2 {
  if (!track || track.length === 0) return initial
  let pos = initial
  for (const seg of track) {
    if (t < seg.t0) return pos
    if (t <= seg.t1) {
      const span = seg.t1 - seg.t0
      return span <= 0 ? seg.to : lerp(seg.from, seg.to, ease(seg.ease, (t - seg.t0) / span))
    }
    pos = seg.to
  }
  return pos
}

export function compileScript(
  initial: BoardState,
  events: readonly ParsedScriptEvent[],
  model: MotionModel,
): Timeline {
  const tracks: Record<string, PlayerSegment[]> = {}
  const initialPos = (id: string) => {
    const p = findPlayer(initial, id)
    if (!p) throw new Error(`Skript verweist auf unbekannten Spieler: ${id}`)
    return p.pos
  }
  const posAt = (id: string, t: number) => positionOnTrack(tracks[id], initialPos(id), t)

  const addSegment = (id: string, t0: number, to: Vec2, duration: number, easeKind: Ease) => {
    const from = posAt(id, t0)
    const track = (tracks[id] ??= [])
    // Ein neuer Laufweg unterbricht einen noch laufenden.
    const last = track[track.length - 1]
    if (last && last.t1 > t0) {
      track[track.length - 1] = { ...last, t1: t0, to: from }
    }
    track.push({ t0, t1: t0 + duration, from, to, ease: easeKind })
  }

  const ball: BallSegment[] = []
  let ballT = 0
  let owner: string | null = initial.ball.ownerId
  let loosePos: Vec2 = initial.ball.pos
  let end = 0

  const closeHeld = (t: number) => {
    if (owner) ball.push({ kind: 'held', t0: ballT, t1: t, ownerId: owner })
    else ball.push({ kind: 'loose', t0: ballT, t1: t, pos: loosePos })
    ballT = t
  }

  const sorted = [...events].sort((a, b) => a.at - b.at)
  for (const ev of sorted) {
    switch (ev.type) {
      case 'move': {
        const dist = distance(posAt(ev.player, ev.at), ev.to)
        const duration = ev.duration ?? Math.max(0.4, dist / (model.playerSpeed * 0.9))
        addSegment(ev.player, ev.at, ev.to, duration, ev.ease)
        end = Math.max(end, ev.at + duration)
        break
      }
      case 'dribble': {
        const dist = distance(posAt(ev.player, ev.at), ev.to)
        const duration = ev.duration ?? Math.max(0.5, dist / (model.playerSpeed * 0.7))
        addSegment(ev.player, ev.at, ev.to, duration, 'linear')
        end = Math.max(end, ev.at + duration)
        break
      }
      case 'pass': {
        const from = posAt(ev.from, ev.at)
        const speedFor = (d: number) => ev.speed ?? passSpeedFor(model, d)
        let target = posAt(ev.to, ev.at)
        let arrival = ev.at + distance(from, target) / speedFor(distance(from, target))
        for (let i = 0; i < 3; i++) {
          target = posAt(ev.to, arrival)
          arrival = ev.at + distance(from, target) / speedFor(distance(from, target))
        }
        closeHeld(ev.at)
        ball.push({ kind: 'flight', t0: ev.at, t1: arrival, from, to: posAt(ev.to, arrival), fromId: ev.from, toId: ev.to })
        ballT = arrival
        owner = ev.to
        end = Math.max(end, arrival)
        break
      }
      case 'shot': {
        const speed = ev.speed ?? model.maxPassSpeed * 1.25
        const from = posAt(ev.player, ev.at)
        const arrival = ev.at + distance(from, ev.target) / speed
        closeHeld(ev.at)
        ball.push({ kind: 'flight', t0: ev.at, t1: arrival, from, to: ev.target, fromId: ev.player, toId: null })
        ballT = arrival
        owner = null
        loosePos = ev.target
        end = Math.max(end, arrival)
        break
      }
    }
  }

  for (const track of Object.values(tracks)) {
    for (const seg of track) end = Math.max(end, seg.t1)
  }
  const duration = end
  closeHeld(Math.max(duration, ballT))
  return { duration, initial, tracks, ball }
}

export interface TimelineFrame {
  readonly state: BoardState
  readonly ballInFlight: boolean
}

export function sampleTimeline(timeline: Timeline, t: number): TimelineFrame {
  const time = Math.min(Math.max(0, t), timeline.duration)
  const players = timeline.initial.players.map((p) => ({
    ...p,
    pos: positionOnTrack(timeline.tracks[p.id], p.pos, time),
  }))
  // An Segmentgrenzen gilt das spätere Segment (z. B. Ball ist nach der Ankunft beim Empfänger).
  const segment = [...timeline.ball].reverse().find((s) => time >= s.t0) ?? timeline.ball[0]
  if (!segment) {
    return { state: { players, ball: timeline.initial.ball }, ballInFlight: false }
  }
  switch (segment.kind) {
    case 'held': {
      const owner = players.find((p) => p.id === segment.ownerId)
      return {
        state: { players, ball: { pos: owner?.pos ?? timeline.initial.ball.pos, ownerId: segment.ownerId } },
        ballInFlight: false,
      }
    }
    case 'loose':
      return { state: { players, ball: { pos: segment.pos, ownerId: null } }, ballInFlight: false }
    case 'flight': {
      const span = segment.t1 - segment.t0
      const k = span <= 0 ? 1 : ease('out', (time - segment.t0) / span)
      return {
        state: { players, ball: { pos: lerp(segment.from, segment.to, k), ownerId: null } },
        ballInFlight: true,
      }
    }
  }
}

export function finalState(timeline: Timeline): BoardState {
  return sampleTimeline(timeline, timeline.duration).state
}
