import type { Vec2 } from '../geometry/vec'
import type { GoalSpec, PitchSpec } from './pitch'

/**
 * "own" ist immer die Mannschaft des lernenden Spielers ("wir"),
 * "opp" die gegnerische Mannschaft. So bleibt jede Aufgabe aus Sicht des
 * Lernenden formuliert, unabhängig davon, wer angreift.
 */
export type TeamSide = 'own' | 'opp'

export type PlayerRole = 'GK' | 'DEF' | 'MID' | 'FWD'

export interface PlayerState {
  readonly id: string
  readonly team: TeamSide
  readonly pos: Vec2
  /** Rückennummer oder Kürzel, das auf dem Spielfeld angezeigt wird */
  readonly label?: string
  readonly role?: PlayerRole
}

export interface BallState {
  readonly pos: Vec2
  /** Spieler-ID des Ballbesitzers oder null, wenn der Ball frei ist bzw. unterwegs */
  readonly ownerId: string | null
}

export interface BoardState {
  readonly players: readonly PlayerState[]
  readonly ball: BallState
}

export interface TeamSetup {
  /** +1: Die Mannschaft greift in Richtung x = Spielfeldlänge an, -1: Richtung x = 0 */
  readonly attackDirection: 1 | -1
}

export interface TeamsSetup {
  readonly own: TeamSetup
  readonly opp: TeamSetup
}

export function otherTeam(team: TeamSide): TeamSide {
  return team === 'own' ? 'opp' : 'own'
}

export function getPlayer(state: BoardState, id: string): PlayerState {
  const player = state.players.find((p) => p.id === id)
  if (!player) throw new Error(`Unbekannter Spieler: ${id}`)
  return player
}

export function findPlayer(state: BoardState, id: string): PlayerState | undefined {
  return state.players.find((p) => p.id === id)
}

export function teamPlayers(state: BoardState, team: TeamSide, includeGoalkeeper = true): PlayerState[] {
  return state.players.filter((p) => p.team === team && (includeGoalkeeper || p.role !== 'GK'))
}

export function ballOwner(state: BoardState): PlayerState | undefined {
  return state.ball.ownerId ? findPlayer(state, state.ball.ownerId) : undefined
}

/** Mannschaft in Ballbesitz oder null, wenn der Ball frei ist. */
export function possessionTeam(state: BoardState): TeamSide | null {
  return ballOwner(state)?.team ?? null
}

/** Neue Spielsituation mit geänderten Positionen. Unbekannte IDs werden ignoriert. */
export function withPositions(state: BoardState, positions: Readonly<Record<string, Vec2>>): BoardState {
  const players = state.players.map((p) => {
    const next = positions[p.id]
    return next ? { ...p, pos: next } : p
  })
  const owner = state.ball.ownerId ? players.find((p) => p.id === state.ball.ownerId) : undefined
  return {
    players,
    ball: owner ? { ...state.ball, pos: owner.pos } : state.ball,
  }
}

/** Tore, die eine Mannschaft verteidigt (bei Minitor-Feldern zwei). */
export function defendedGoals(pitch: PitchSpec, teams: TeamsSetup, team: TeamSide): GoalSpec[] {
  const dir = teams[team].attackDirection
  // Wer nach +x angreift, verteidigt die Tore auf der linken Torlinie (öffnen sich nach +x).
  return pitch.goals.filter((g) => g.opensTowards === dir)
}

export function attackedGoals(pitch: PitchSpec, teams: TeamsSetup, team: TeamSide): GoalSpec[] {
  return defendedGoals(pitch, teams, otherTeam(team))
}

/** Das (nächstgelegene) verteidigte Tor bezogen auf einen Referenzpunkt, z. B. den Ball. */
export function defendedGoalNear(
  pitch: PitchSpec,
  teams: TeamsSetup,
  team: TeamSide,
  reference: Vec2,
): GoalSpec {
  const goals = defendedGoals(pitch, teams, team)
  let best = goals[0]
  if (!best) throw new Error(`Spielfeld ${pitch.id} hat kein Tor für Mannschaft ${team}`)
  let bestDist = Infinity
  for (const g of goals) {
    const d = Math.hypot(g.center.x - reference.x, g.center.y - reference.y)
    if (d < bestDist) {
      best = g
      bestDist = d
    }
  }
  return best
}

/**
 * Wie weit ist ein Punkt in Angriffsrichtung einer Mannschaft vorgerückt?
 * 0 = eigene Torlinie, 1 = gegnerische Torlinie.
 */
export function progression(pitch: PitchSpec, teams: TeamsSetup, team: TeamSide, p: Vec2): number {
  const rel = p.x / pitch.length
  return teams[team].attackDirection === 1 ? rel : 1 - rel
}
