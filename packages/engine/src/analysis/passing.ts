import { getPlayer, otherTeam, teamPlayers, type BoardState, type PlayerState } from '../board/state'
import { distance, lerp, normalize, sub, add, scale, perp, type Vec2 } from '../geometry/vec'
import { ballTravelTime, passSpeedFor, timeToReach, type MotionModel } from '../model/motion'

/**
 * Passweg-Analyse
 * ===============
 * Ein Passweg gilt als offen, wenn der Ball jeden Punkt der Passlinie erreicht,
 * bevor ein Gegenspieler diesen Punkt (bis auf seine Reichweite) erreichen
 * kann. Damit entstehen Deckungsschatten, "Lücken" und riskante Pässe aus
 * einem einzigen, nachvollziehbaren Zeitvergleich statt aus festen Radien.
 *
 * Vereinfachungen (dokumentiert in docs/konzept/engine.md):
 * - nur flache Pässe mit konstanter Geschwindigkeit, kein Chippen
 * - Gegenspieler starten aus dem Stand, keine Blickrichtung
 * - der Passempfänger wartet am Zielpunkt
 */

export type LaneStatus = 'open' | 'risky' | 'blocked'

export interface PassAnalysis {
  readonly fromId: string
  readonly toId: string | null
  readonly from: Vec2
  readonly to: Vec2
  readonly distance: number
  /** Flugzeit des Balls bis zum Ziel, s */
  readonly ballTime: number
  /**
   * Kleinster Zeitvorsprung des Balls vor dem schnellsten Abfangversuch, s.
   * Positiv: Ball ist überall zuerst da. Negativ: Ein Gegenspieler kann abfangen.
   */
  readonly margin: number
  readonly status: LaneStatus
  readonly interceptorId: string | null
  readonly interceptPoint: Vec2 | null
}

export interface PassAnalysisOptions {
  /** Ab diesem Zeitvorsprung gilt ein Pass als sicher (s). */
  readonly openMargin?: number
  /** Die ersten Meter nach dem Passgeber werden nicht geprüft (Ballannahme/Schussbein). */
  readonly startOffset?: number
  readonly sampleStep?: number
  /** Spieler-IDs, die nicht als Abfangende zählen (z. B. ausgeblendete Spieler). */
  readonly ignore?: readonly string[]
}

const DEFAULTS = { openMargin: 0.25, startOffset: 0.6, sampleStep: 0.25 } as const

/**
 * Zeit, die ein Verteidiger benötigt, um einen Punkt der Passlinie abzufangen.
 * Liegt der Punkt bereits in seiner Reichweite, genügt die kurze Blockzeit;
 * der Übergang zur vollen Reaktionszeit ist geglättet, damit kleine
 * Positionsänderungen keine Sprünge in der Bewertung erzeugen.
 */
export function interceptTime(model: MotionModel, defender: Vec2, point: Vec2): number {
  const need = distance(defender, point) - model.reachRadius
  if (need <= 0) return model.blockTime
  const ramp = Math.min(1, need / 0.6)
  const smooth = ramp * ramp * (3 - 2 * ramp)
  return model.blockTime + (model.reactionTime - model.blockTime) * smooth + need / model.playerSpeed
}

export function analyzePassToPoint(
  state: BoardState,
  fromId: string,
  target: Vec2,
  toId: string | null,
  model: MotionModel,
  options: PassAnalysisOptions = {},
): PassAnalysis {
  const opts = { ...DEFAULTS, ...options }
  const passer = getPlayer(state, fromId)
  const from = passer.pos
  const total = distance(from, target)
  const defenders = teamPlayers(state, otherTeam(passer.team)).filter(
    (d) => !opts.ignore?.includes(d.id),
  )

  let margin = Infinity
  let interceptorId: string | null = null
  let interceptPoint: Vec2 | null = null

  const samples: number[] = []
  for (let s = Math.min(opts.startOffset, total); s < total; s += opts.sampleStep) samples.push(s)
  samples.push(total)

  const speed = passSpeedFor(model, total)
  for (const s of samples) {
    const point = total > 0 ? lerp(from, target, s / total) : from
    const tBall = s / speed
    for (const d of defenders) {
      const delta = interceptTime(model, d.pos, point) - tBall
      if (delta < margin) {
        margin = delta
        interceptorId = d.id
        interceptPoint = point
      }
    }
  }

  if (!Number.isFinite(margin)) {
    margin = 10
    interceptorId = null
    interceptPoint = null
  }

  const status: LaneStatus = margin < 0 ? 'blocked' : margin < opts.openMargin ? 'risky' : 'open'
  return {
    fromId,
    toId,
    from,
    to: target,
    distance: total,
    ballTime: ballTravelTime(model, total),
    margin,
    status,
    interceptorId: margin < opts.openMargin ? interceptorId : null,
    interceptPoint: margin < opts.openMargin ? interceptPoint : null,
  }
}

export function analyzePass(
  state: BoardState,
  fromId: string,
  toId: string,
  model: MotionModel,
  options?: PassAnalysisOptions,
): PassAnalysis {
  return analyzePassToPoint(state, fromId, getPlayer(state, toId).pos, toId, model, options)
}

/** Alle Passmöglichkeiten eines Spielers zu seinen Mitspielern. */
export function passOptions(
  state: BoardState,
  passerId: string,
  model: MotionModel,
  options?: PassAnalysisOptions & { includeGoalkeeper?: boolean },
): PassAnalysis[] {
  const passer = getPlayer(state, passerId)
  return teamPlayers(state, passer.team, options?.includeGoalkeeper ?? true)
    .filter((p) => p.id !== passerId)
    .map((p) => analyzePass(state, passerId, p.id, model, options))
}

export interface ReceptionAnalysis {
  readonly receiverId: string
  readonly pass: PassAnalysis
  /**
   * Zeit, die der Empfänger nach der Ballannahme hat, bis der erste
   * Gegenspieler ihn unter Druck setzt (s). Negativ: schon bei Ankunft unter Druck.
   */
  readonly timeOnBall: number
  readonly nearestDefenderId: string | null
  readonly nearestDefenderDistance: number
}

export function analyzeReception(
  state: BoardState,
  passerId: string,
  receiverId: string,
  model: MotionModel,
  options?: PassAnalysisOptions,
): ReceptionAnalysis {
  const pass = analyzePass(state, passerId, receiverId, model, options)
  const receiver = getPlayer(state, receiverId)
  const defenders = teamPlayers(state, otherTeam(receiver.team)).filter(
    (d) => !options?.ignore?.includes(d.id),
  )
  let best = Infinity
  let nearestId: string | null = null
  let nearestDist = Infinity
  for (const d of defenders) {
    const t = timeToReach(model, d.pos, receiver.pos, model.pressureDistance)
    if (t < best) best = t
    const dist = distance(d.pos, receiver.pos)
    if (dist < nearestDist) {
      nearestDist = dist
      nearestId = d.id
    }
  }
  return {
    receiverId,
    pass,
    timeOnBall: (Number.isFinite(best) ? best : 10) - pass.ballTime,
    nearestDefenderId: nearestId,
    nearestDefenderDistance: nearestDist,
  }
}

export interface FreePlayerOptions extends PassAnalysisOptions {
  /** Mindestzeit am Ball nach der Annahme, damit ein Spieler als frei gilt (s). */
  readonly minTimeOnBall?: number
}

/** Ist ein potenzieller Passempfänger frei anspielbar und hat nach der Annahme Zeit? */
export function isFreeForPass(
  state: BoardState,
  passerId: string,
  receiverId: string,
  model: MotionModel,
  options: FreePlayerOptions = {},
): boolean {
  const reception = analyzeReception(state, passerId, receiverId, model, options)
  return reception.pass.status !== 'blocked' && reception.timeOnBall >= (options.minTimeOnBall ?? 0.8)
}

/**
 * Deckungsschatten eines Verteidigers aus Sicht des Ballführenden als Polygon
 * (nur für die Visualisierung; Bewertungen nutzen `analyzePass`).
 */
export function coverShadow(
  ballPos: Vec2,
  defender: PlayerState,
  model: MotionModel,
  depth = 18,
): Vec2[] | null {
  const toDef = sub(defender.pos, ballPos)
  const dist = Math.hypot(toDef.x, toDef.y)
  if (dist < 0.5) return null
  const ballTime = ballTravelTime(model, dist)
  const effective = model.reachRadius + Math.max(0, ballTime - model.reactionTime) * model.playerSpeed
  const ratio = Math.min(0.95, effective / dist)
  const halfAngle = Math.asin(ratio)
  const dir = normalize(toDef)
  const side = perp(dir)
  const spread = Math.tan(halfAngle)
  const near = defender.pos
  const farCenter = add(near, scale(dir, depth))
  const nearHalf = effective * 0.9
  const farHalf = nearHalf + spread * depth
  return [
    add(near, scale(side, nearHalf)),
    add(farCenter, scale(side, farHalf)),
    add(farCenter, scale(side, -farHalf)),
    add(near, scale(side, -nearHalf)),
  ]
}
