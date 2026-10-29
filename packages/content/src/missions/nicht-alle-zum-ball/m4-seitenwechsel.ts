import type { MissionInput } from '@spieliq/engine'
import { FULL_PITCH, opp, own, TEAMS_STANDARD } from '../helpers'

/**
 * Mission 4 – Der Ball wechselt die Seite (ballorientiertes Verschieben)
 * Nach einer Spielverlagerung steht die Viererkette noch auf der alten Seite.
 * Der Spieler verschiebt alle vier: Einer stellt, einer sichert, die anderen
 * rücken ein und schützen die Mitte. Gleiche Abstände werden NICHT verlangt –
 * ballnah enger, ballfern weiter ist ausdrücklich richtig.
 */
const before = {
  players: [
    own('gk', 2, 34, '1', 'GK'),
    own('d3', 25, 14, '3', 'DEF'),
    own('d4', 23, 26, '4', 'DEF'),
    own('d5', 23, 37, '5', 'DEF'),
    own('d2', 24, 47, '2', 'DEF'),
    opp('o6', 40, 12, '6', 'MID'),
    opp('o9', 26, 33, '9', 'FWD'),
    opp('o7', 39, 61, '7', 'FWD'),
  ],
  ball: { ownerId: 'o6' },
}

const four = ['d2', 'd3', 'd4', 'd5']
const nearestToBall = (rank: number) => ({ ref: 'nearestTo', target: 'ballCarrier', team: 'own', among: four, rank }) as const

export const m4Seitenwechsel: MissionInput = {
  schemaVersion: 1,
  id: 'nazb-m4-seitenwechsel',
  version: 1,
  status: 'review',
  title: { de: 'Der Ball wechselt die Seite' },
  goal: { de: 'Wir verschieben gemeinsam zum Ball und schützen die Mitte.' },
  coachNote: {
    de: 'Ballorientiertes Verschieben einer Viererkette nach einer Spielverlagerung. Bewertet werden Rollen (wer stellt, wer sichert), Lücken mit kontextabhängigen Grenzen (ballnah enger als ballfern), die Verschiebung des Blockschwerpunkts zur Ballseite, der Schutz des Zentrums und die Kontrolle des Mittelstürmers. Bewusst nicht verlangt: gleiche Abstände oder eine starre Linie. Mehrere Lösungen sind gültig.',
  },
  principles: ['P-VERSCHIEBEN', 'P-STELLEN', 'P-ABSICHERN', 'P-MITTE', 'P-NICHT-ALLE'],
  competencies: ['K-VERSCHIEBEN', 'K-ZWEITER-VERTEIDIGER', 'K-BALANCE'],
  ageGroups: ['C', 'B', 'A'],
  level: 3,
  estimatedMinutes: 3,
  prerequisites: ['nazb-m3-aufgaben-verteilen'],
  sources: ['B-01', 'B-05', 'B-10', 'B-12', 'A-50', 'A-51'],
  pitch: FULL_PITCH,
  view: { x: -3, y: -3, width: 53, height: 74 },
  teams: TEAMS_STANDARD,
  motion: { profile: 'U15' },
  board: before,
  steps: [
    {
      id: 'zuschauen',
      kind: 'watch',
      instruction: { de: 'Der Gegner hat den Ball auf der einen Seite. Schau, was jetzt passiert.' },
      script: [
        { type: 'move', player: 'o7', to: { x: 36, y: 58 }, at: 0.2, duration: 1.6 },
        { type: 'pass', from: 'o6', to: 'o7', at: 0.6, speed: 17 },
      ],
      after: {
        caption: { de: 'Seitenwechsel! Die Kette steht noch auf der alten Seite – Nummer 7 hat viel Platz.' },
        overlays: [
          { type: 'freeSpace', around: 'o7' },
          { type: 'arrow', from: 'd2', to: { x: 33, y: 56 }, tone: 'info' },
        ],
      },
    },
    {
      id: 'verschieben',
      kind: 'place',
      instruction: { de: 'Verschiebe die Viererkette: Wer stellt Nummer 7? Wo stehen die anderen?' },
      controlled: four,
      area: { min: { x: 2, y: 1 }, max: { x: 50, y: 67 } },
      assessment: {
        criteria: [
          {
            id: 'stellen',
            kind: 'pressure',
            params: { defender: nearestToBall(1), band: { min: 0.5, idealMin: 1.5, idealMax: 4.5, max: 8 } },
            required: true,
            weight: 2,
            principle: 'P-STELLEN',
          },
          { id: 'nicht-alle', kind: 'crowding', params: { radius: 6, max: 2 }, required: true, weight: 1, principle: 'P-NICHT-ALLE' },
          {
            id: 'absichern',
            kind: 'cover',
            params: {
              cover: nearestToBall(2),
              first: nearestToBall(1),
              distance: { min: 3, idealMin: 5, idealMax: 12, max: 16 },
              depthGap: { min: 0.25, idealMin: 1, idealMax: 8, max: 12.5 },
            },
            required: true,
            weight: 2,
            principle: 'P-ABSICHERN',
          },
          { id: 'luecken', kind: 'chainGaps', params: { group: four }, required: true, weight: 2, principle: 'P-VERSCHIEBEN' },
          { id: 'verschieben', kind: 'shiftTowardsBall', params: { group: four }, required: true, weight: 2, principle: 'P-VERSCHIEBEN' },
          {
            id: 'mitte',
            kind: 'protectCentre',
            params: { group: four, minCount: 2, maxDistanceFromGoal: 30 },
            required: true,
            weight: 2,
            principle: 'P-MITTE',
          },
          {
            id: 'stuermer',
            kind: 'reachInTime',
            params: { defender: { ref: 'nearestTo', target: 'o9', team: 'own', among: four }, target: 'o9' },
            weight: 1,
            principle: 'P-MITTE',
          },
          { id: 'nicht-ueberspielt', kind: 'behindBall', params: { group: four }, weight: 1, principle: 'P-VERSCHIEBEN' },
        ],
      },
      feedback: {
        excellent: { de: 'Stark verschoben!' },
        good: { de: 'Gut verschoben!' },
        notYet: { de: 'Noch nicht ganz.' },
      },
      hints: [
        { de: 'Der Spieler, der Nummer 7 am nächsten ist, stellt ihn.' },
        { de: 'Alle rücken zur Ballseite – aber die Mitte vor dem Tor bleibt besetzt.' },
      ],
      consequence: 'auto',
      solution: { d2: { x: 33.1, y: 56 }, d5: { x: 27, y: 48.5 }, d4: { x: 22.5, y: 38.5 }, d3: { x: 23, y: 29 } },
      examples: [
        {
          name: 'Musterlösung',
          positions: { d2: { x: 33.1, y: 56 }, d5: { x: 27, y: 48.5 }, d4: { x: 22.5, y: 38.5 }, d3: { x: 23, y: 29 } },
          expect: 'excellent',
        },
        {
          name: 'Ungleiche Abstände, trotzdem gut',
          positions: { d2: { x: 33.5, y: 55.5 }, d5: { x: 28.5, y: 47 }, d4: { x: 24, y: 39.5 }, d3: { x: 24.5, y: 31 } },
          expect: 'pass',
        },
        { name: 'Niemand verschiebt', positions: {}, expect: 'not-yet' },
        {
          name: 'Alle laufen zum Ball',
          positions: { d2: { x: 33, y: 56 }, d5: { x: 32, y: 60 }, d4: { x: 30.5, y: 55 }, d3: { x: 34, y: 61.5 } },
          expect: 'not-yet',
          expectFeedback: 'crowding.tooMany',
        },
        {
          name: 'Perfekte Linie, aber keiner stellt',
          positions: { d3: { x: 22, y: 30 }, d4: { x: 22, y: 40 }, d5: { x: 22, y: 50 }, d2: { x: 22, y: 60 } },
          expect: 'not-yet',
          expectFeedback: 'pressure.tooFar',
        },
      ],
    },
    {
      id: 'merke',
      kind: 'explain',
      instruction: { de: 'Merke:' },
      text: {
        de: 'Wechselt der Ball die Seite, schieben alle mit. Ballnah stehen wir eng, ballfern rücken wir ein – so bleibt die Mitte zu. Gleiche Abstände sind dabei nicht nötig.',
      },
      overlays: [{ type: 'lane', from: 'o7', to: 'o9' }],
      keyPoints: [{ de: 'Ballnah: eng.' }, { de: 'Ballfern: einrücken, Mitte schützen.' }],
    },
  ],
  fieldTransfer: {
    drills: ['D-VERSCHIEBEN-4V4-ZONEN'],
    challenge: { de: 'Im nächsten Training: Wenn der Ball die Seite wechselt, rufst du "Schieben!" und rückst mit.' },
  },
}
