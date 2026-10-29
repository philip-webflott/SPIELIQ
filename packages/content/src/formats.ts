import type { MissionInput } from '@spieliq/engine'

/**
 * Wettbewerbs-Spielformen nach Altersklasse als Spielfeld-Vorlagen
 * für Missionen und den späteren Szenario-Editor.
 *
 * Quelle G–E: DFB-Booklet „Wettbewerbsformen im Kinderfußball", Stand 03/2026
 * (Recherche A-88, Volltext geprüft). Maße sind „ca."-Angaben; Verbände,
 * Kreise und Veranstaltungen können leicht abweichen – deshalb bleiben alle
 * Werte Parameter. D-Jugend: bundesweit kein einheitliches Format, DFB-Piloten
 * laufen (A-87, A-88); die 9-gegen-9-Maße stammen nur aus Suchergebnissen.
 */
export interface GameFormat {
  readonly id: string
  readonly label: string
  readonly ageGroups: readonly ('G' | 'F' | 'E' | 'D' | 'C' | 'B' | 'A')[]
  readonly players: string
  readonly pitch: MissionInput['pitch']
  readonly goals: string
  readonly notes: string
  readonly sources: readonly string[]
  readonly verified: boolean
}

export const GAME_FORMATS: readonly GameFormat[] = [
  {
    id: 'g-2v2',
    label: '2 gegen 2 auf vier Minitore',
    ageGroups: ['G'],
    players: '2 Feldspieler je Team, ohne Torwart, höchstens 1 Rotationsperson',
    pitch: { kind: 'minigoals', id: 'g-2v2', length: 20, width: 16, goalWidth: 2.0, goalInset: 2 },
    goals: 'vier Minitore (höchstens 2,0 × 1,2 m), je 2 m von der Seitenlinie eingerückt',
    notes: 'Tore erst ab der Mittellinie; Eindribbeln oder Einpassen; Rotation nach jedem Tor',
    sources: ['A-88'],
    verified: true,
  },
  {
    id: 'gf-3v3',
    label: '3 gegen 3 auf vier Minitore',
    ageGroups: ['G', 'F'],
    players: '3 Feldspieler je Team, ohne Torwart',
    pitch: { kind: 'minigoals', id: 'gf-3v3', length: 25, width: 20, goalWidth: 2.0, goalInset: 2 },
    goals: 'vier Minitore (höchstens 2,0 × 1,2 m)',
    notes: 'Tore nur aus der 6-m-Schusszone; Eindribbeln oder Einpassen',
    sources: ['A-88'],
    verified: true,
  },
  {
    id: 'fe-5v5',
    label: '4 gegen 4 / 5 gegen 5',
    ageGroups: ['F', 'E'],
    players: '4–5 je Team, mit Torwart auf Kleinfeldtore oder ohne Torwart auf vier Minitore',
    pitch: { kind: 'small', id: 'fe-5v5', length: 40, width: 25, goalWidth: 5 },
    goals: 'Kleinfeldtore höchstens 5,0 × 2,0 m oder vier Minitore',
    notes: 'Rotation alle 3 Minuten; Rückpassregel bei Spielen mit Torwart',
    sources: ['A-88'],
    verified: true,
  },
  {
    id: 'e-7v7',
    label: '6 gegen 6 / 7 gegen 7',
    ageGroups: ['E'],
    players: '6 Feldspieler + Torwart; Rotationspersonen auf Nebenfeldern (2v2/3v3)',
    pitch: { kind: 'small', id: 'e-7v7', length: 55, width: 35, goalWidth: 5 },
    goals: 'Kleinfeldtore höchstens 5,0 × 2,0 m',
    notes: 'Tore von überall; Einwurf',
    sources: ['A-88'],
    verified: true,
  },
  {
    id: 'd-9v9',
    label: '9 gegen 9 (verbreitet, regional verschieden)',
    ageGroups: ['D'],
    players: '8 Feldspieler + Torwart',
    pitch: { kind: 'small', id: 'd-9v9', length: 68, width: 50, goalWidth: 5, penaltyArea: { depth: 12, width: 29 } },
    goals: 'Jugendtore 5 × 2 m',
    notes: 'Bundesweit kein einheitliches Format; DFB-Piloten (z. B. 7-gegen-7-Zwillingsspiel). Maße nur aus Suchergebnissen.',
    sources: ['A-35', 'A-36', 'A-87'],
    verified: false,
  },
  {
    id: 'c-11v11',
    label: '11 gegen 11 (Großfeld)',
    ageGroups: ['C', 'B', 'A'],
    players: '10 Feldspieler + Torwart',
    pitch: { kind: 'full', length: 105, width: 68 },
    goals: '7,32 × 2,44 m',
    notes: 'Ab 2027/28 neue Formate für U14–U16 auf Leistungsebene angekündigt (Spielzeit in Dritteln).',
    sources: ['A-10', 'A-89'],
    verified: true,
  },
]

export function formatsFor(ageGroup: GameFormat['ageGroups'][number]): GameFormat[] {
  return GAME_FORMATS.filter((f) => f.ageGroups.includes(ageGroup))
}
