import type { MissionInput } from '@spieliq/engine'
import { FULL_PITCH, opp, own, TEAMS_STANDARD } from '../helpers'

/**
 * Mission 5 – Neue Spielsituation (Transfer)
 * Gleiche Idee, andere Lage: Drei eigene Spieler stehen zusammen am Ball.
 * Der Spieler verteilt die Aufgaben selbst – stellen, absichern, gefährlichen
 * Gegner/Mitte kontrollieren. Die Rollen werden nicht vorgegeben, sondern aus
 * der Position abgeleitet (wer am nächsten am Ball ist, stellt).
 */
const trio = ['d4', 'd5', 'd6']
const nearest = (rank: number, among: string[]) => ({ ref: 'nearestTo', target: 'ballCarrier', team: 'own', among, rank }) as const

const halfSpace = {
  players: [
    own('gk', 2, 34, '1', 'GK'),
    own('d4', 29, 28.5, '4', 'DEF'),
    own('d5', 31.5, 24, '5', 'DEF'),
    own('d6', 27.8, 24.6, '6', 'MID'),
    opp('o10', 30, 26, '10', 'MID'),
    opp('o9', 22, 36, '9', 'FWD'),
    opp('o11', 30, 8, '11', 'FWD'),
  ],
  ball: { ownerId: 'o10' },
}

const wingTrio = ['d2', 'd5', 'd6']
const wing = {
  players: [
    own('gk', 2, 34, '1', 'GK'),
    own('d2', 38, 60, '2', 'DEF'),
    own('d5', 41.5, 59, '5', 'DEF'),
    own('d6', 38.5, 63.5, '6', 'MID'),
    opp('o7', 40, 62, '7', 'FWD'),
    opp('o10', 34, 47, '10', 'MID'),
    opp('o9', 26, 36, '9', 'FWD'),
  ],
  ball: { ownerId: 'o7' },
}

function roleCriteria(group: string[], dangerous: string) {
  return [
    { id: 'nicht-alle', kind: 'crowding', params: { radius: 4.5, max: 1 }, required: true, weight: 1, principle: 'P-NICHT-ALLE' },
    {
      id: 'stellen',
      kind: 'pressure',
      params: { defender: nearest(1, group) },
      required: true,
      weight: 2,
      principle: 'P-STELLEN',
    },
    {
      id: 'absichern',
      kind: 'cover',
      params: { cover: nearest(2, group), first: nearest(1, group) },
      required: true,
      weight: 2,
      principle: 'P-ABSICHERN',
    },
    {
      // Balance: Der dritte (ballfernste) Spieler kontrolliert den gefährlichen Gegner im Zentrum.
      id: 'gefahr',
      kind: 'reachInTime',
      params: { defender: nearest(3, group), target: dangerous, ignoreBlockedLane: true },
      required: true,
      weight: 2,
      principle: 'P-MITTE',
    },
    {
      id: 'mitte',
      kind: 'protectCentre',
      params: { group, minCount: 1, corridorHalfWidth: 9, maxDistanceFromGoal: 24 },
      weight: 1,
      principle: 'P-MITTE',
    },
  ] as const
}

export const m5NeueSituation: MissionInput = {
  schemaVersion: 1,
  id: 'nazb-m5-neue-situation',
  version: 1,
  status: 'review',
  role: 'transfer',
  title: { de: 'Neue Spielsituation' },
  goal: { de: 'Ich verteile die Aufgaben auch in neuen Situationen.' },
  coachNote: {
    de: 'Transferaufgabe: neue Ballpositionen und Gegnerverteilungen. Die Rollen werden aus der Position abgeleitet, nicht vorgegeben – so wird geprüft, ob das Prinzip verstanden wurde und nicht eine Kreisposition auswendig gelernt ist. Der weit entfernte Flügelspieler darf bewusst offen bleiben (ballferner Raum ist weniger gefährlich als das Zentrum).',
  },
  principles: ['P-NICHT-ALLE', 'P-STELLEN', 'P-ABSICHERN', 'P-MITTE'],
  competencies: ['K-NICHT-ALLE', 'K-ERSTER-VERTEIDIGER', 'K-ZWEITER-VERTEIDIGER', 'K-BALANCE'],
  ageGroups: ['D', 'C', 'B'],
  level: 2,
  estimatedMinutes: 4,
  prerequisites: ['nazb-m3-aufgaben-verteilen'],
  sources: ['B-01', 'B-14', 'C-14', 'C-44'],
  pitch: FULL_PITCH,
  view: { x: -3, y: 0, width: 46, height: 46 },
  teams: TEAMS_STANDARD,
  motion: { profile: 'U15' },
  board: halfSpace,
  steps: [
    {
      id: 'halbraum',
      kind: 'place',
      instruction: { de: 'Drei Blaue sind am Ball. Verteile die Aufgaben.' },
      guide: [
        { de: 'Einer geht zu Nummer 10 mit dem Ball.' },
        { de: 'Einer steht schräg hinter ihm.' },
        { de: 'Einer passt vor unserem Tor auf Nummer 9 auf.' },
      ],
      controlled: trio,
      area: { min: { x: 2, y: 1 }, max: { x: 50, y: 67 } },
      assessment: { criteria: [...roleCriteria(trio, 'o9')] },
      feedback: {
        excellent: { de: 'Super verteilt!' },
        good: { de: 'Gut verteilt!' },
        notYet: { de: 'Noch nicht ganz.' },
      },
      hints: [{ de: 'Nur einer bleibt am Ball.' }, { de: 'Der Dritte passt vor dem Tor auf Nummer 9 auf.' }],
      consequence: 'auto',
      solution: { d5: { x: 27.9, y: 26.6 }, d6: { x: 23, y: 31 }, d4: { x: 19.5, y: 36.5 } },
      examples: [
        { name: 'Musterlösung', positions: { d5: { x: 27.9, y: 26.6 }, d6: { x: 23, y: 31 }, d4: { x: 19.5, y: 36.5 } }, expect: 'excellent' },
        {
          name: 'Andere Rollenverteilung, auch richtig',
          positions: { d4: { x: 28, y: 26.8 }, d5: { x: 23.5, y: 30.5 }, d6: { x: 19.8, y: 36.8 } },
          expect: 'pass',
        },
        { name: 'Alle bleiben am Ball', positions: {}, expect: 'not-yet' },
        {
          name: 'Nummer 9 vergessen',
          positions: { d5: { x: 27.9, y: 26.6 }, d6: { x: 24.5, y: 23.5 }, d4: { x: 31, y: 12 } },
          expect: 'not-yet',
          expectFeedback: 'reachInTime.late',
        },
        {
          name: 'Dritter Spieler deckt den weit entfernten Flügelspieler statt Nummer 9',
          positions: { d5: { x: 27.9, y: 26.6 }, d6: { x: 23, y: 31 }, d4: { x: 31, y: 12 } },
          expect: 'not-yet',
          expectFeedback: 'reachInTime.late',
        },
      ],
    },
    {
      id: 'fluegel',
      kind: 'place',
      instruction: { de: 'Der Ball ist jetzt auf der anderen Seite. Verteile die Aufgaben.' },
      guide: [
        { de: 'Einer geht zu Nummer 7 mit dem Ball.' },
        { de: 'Einer steht schräg hinter ihm.' },
        { de: 'Einer läuft zu Nummer 9 vor unser Tor.' },
      ],
      board: wing,
      view: { x: -3, y: 26, width: 52, height: 44 },
      controlled: wingTrio,
      area: { min: { x: 2, y: 1 }, max: { x: 54, y: 67 } },
      assessment: { criteria: [...roleCriteria(wingTrio, 'o9')] },
      feedback: {
        excellent: { de: 'Super gemacht!' },
        good: { de: 'Gut gemacht!' },
        notYet: { de: 'Noch nicht ganz.' },
      },
      hints: [{ de: 'Nur einer geht zu Nummer 7.' }, { de: 'Einer hilft schräg dahinter. Einer bleibt in der Mitte.' }],
      consequence: 'auto',
      solution: { d2: { x: 37.95, y: 60.6 }, d6: { x: 33.5, y: 55.5 }, d5: { x: 23, y: 37.5 } },
      examples: [
        { name: 'Musterlösung', positions: { d2: { x: 37.95, y: 60.6 }, d6: { x: 33.5, y: 55.5 }, d5: { x: 23, y: 37.5 } }, expect: 'excellent' },
        { name: 'Alle bleiben am Ball', positions: {}, expect: 'not-yet' },
        {
          name: 'Absicherung zu weit weg',
          positions: { d2: { x: 37.95, y: 60.6 }, d6: { x: 20, y: 44 }, d5: { x: 23, y: 37.5 } },
          expect: 'not-yet',
        },
      ],
    },
  ],
  fieldTransfer: {
    drills: ['D-3V3-AUFGABEN'],
    challenge: { de: 'Im Spiel: Ist schon ein Mitspieler am Ball? Dann lauf nicht auch hin.' },
  },
}
