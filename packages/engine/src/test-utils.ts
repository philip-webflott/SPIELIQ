import { fullPitch } from './board/pitch'
import type { BoardState, PlayerState, TeamsSetup } from './board/state'
import type { AssessmentContext } from './assessment/types'
import { motionModel } from './model/motion'

/** Hilfsfunktionen für Tests (nicht Teil der öffentlichen API). */

export const PITCH = fullPitch()
/** Wir verteidigen das linke Tor (x = 0), der Gegner greift nach links an. */
export const DEFENDING: TeamsSetup = { own: { attackDirection: 1 }, opp: { attackDirection: -1 } }
export const MODEL = motionModel('U15')

export function own(id: string, x: number, y: number, extra: Partial<PlayerState> = {}): PlayerState {
  return { id, team: 'own', pos: { x, y }, ...extra }
}

export function opp(id: string, x: number, y: number, extra: Partial<PlayerState> = {}): PlayerState {
  return { id, team: 'opp', pos: { x, y }, ...extra }
}

export function board(players: PlayerState[], ownerId: string | null): BoardState {
  const owner = players.find((p) => p.id === ownerId)
  return { players, ball: { pos: owner?.pos ?? { x: 52.5, y: 34 }, ownerId: owner ? owner.id : null } }
}

export function context(state: BoardState, extra: Partial<AssessmentContext> = {}): AssessmentContext {
  return {
    state,
    initial: state,
    pitch: PITCH,
    teams: DEFENDING,
    model: MODEL,
    controlled: [],
    ...extra,
  }
}
