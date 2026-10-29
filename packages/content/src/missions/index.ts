import { loadMission, type LoadedMission, type MissionInput } from '@spieliq/engine'
import { m1ProblemErkennen } from './nicht-alle-zum-ball/m1-problem-erkennen'
import { m2AbstandHalten } from './nicht-alle-zum-ball/m2-abstand-halten'
import { m3AufgabenVerteilen } from './nicht-alle-zum-ball/m3-aufgaben-verteilen'
import { m4Seitenwechsel } from './nicht-alle-zum-ball/m4-seitenwechsel'
import { m5NeueSituation } from './nicht-alle-zum-ball/m5-neue-situation'
import { m6Abschlusstest } from './nicht-alle-zum-ball/m6-abschlusstest'

/** Alle offiziellen Missionen (Rohdaten im Szenarioformat v1). */
export const MISSION_INPUTS: readonly MissionInput[] = [
  m1ProblemErkennen,
  m2AbstandHalten,
  m3AufgabenVerteilen,
  m4Seitenwechsel,
  m5NeueSituation,
  m6Abschlusstest,
]

const cache = new Map<string, LoadedMission>()

/** Lädt und validiert eine Mission (Ergebnis wird zwischengespeichert). */
export function getMission(id: string): LoadedMission {
  const cached = cache.get(id)
  if (cached) return cached
  const input = MISSION_INPUTS.find((m) => m.id === id)
  if (!input) throw new Error(`Unbekannte Mission: ${id}`)
  const loaded = loadMission(input)
  cache.set(id, loaded)
  return loaded
}

export function findMission(id: string): LoadedMission | null {
  return MISSION_INPUTS.some((m) => m.id === id) ? getMission(id) : null
}

export function allMissionIds(): string[] {
  return MISSION_INPUTS.map((m) => m.id)
}
