import type { MissionInput } from '@spieliq/engine'

type PlayerInput = MissionInput['board']['players'][number]

/** Eigener Spieler ("wir", blau). */
export function own(id: string, x: number, y: number, label: string, role?: PlayerInput['role']): PlayerInput {
  return { id, team: 'own', pos: { x, y }, label, ...(role ? { role } : {}) }
}

/** Gegenspieler (orange). */
export function opp(id: string, x: number, y: number, label: string, role?: PlayerInput['role']): PlayerInput {
  return { id, team: 'opp', pos: { x, y }, label, ...(role ? { role } : {}) }
}

export const FULL_PITCH = { kind: 'full', length: 105, width: 68 } as const

/** Wir verteidigen das linke Tor (x = 0) und greifen nach rechts an. */
export const TEAMS_STANDARD = { own: { attackDirection: 1 }, opp: { attackDirection: -1 } } as const

/** Sichtfenster: eigene Hälfte mit Strafraum (für Verteidigungssituationen). */
export const VIEW_DEFENSIVE_HALF = { x: -3, y: -3, width: 58, height: 74 } as const

/** Sichtfenster: Mittelfeld (für Ballbesitzsituationen). */
export const VIEW_MIDFIELD = { x: 28, y: -3, width: 56, height: 74 } as const
