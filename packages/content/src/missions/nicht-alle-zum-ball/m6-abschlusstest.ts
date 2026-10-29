import type { MissionInput } from '@spieliq/engine'
import { FULL_PITCH, opp, own, TEAMS_STANDARD } from '../helpers'

/**
 * Mission 6 – Abschlusstest
 * Vier neue Situationen ohne Hinweise und ohne Musterlösung. Jede Aufgabe
 * prüft ein Prinzip der Einheit in einer Lage, die so vorher nicht vorkam
 * (andere Spielfeldseite, andere Abstände, andere Gegnerverteilung).
 */
const four = ['d2', 'd3', 'd4', 'd5']
const nearestToBall = (rank: number) => ({ ref: 'nearestTo', target: 'ballCarrier', team: 'own', among: four, rank }) as const

const freePlayerBoard = {
  players: [
    own('gk', 2, 34, '1', 'GK'),
    own('d3', 30.5, 11.5, '3', 'DEF'),
    own('d4', 35, 14.5, '4', 'DEF'),
    own('d6', 33.5, 9, '6', 'MID'),
    own('d5', 18, 30, '5', 'DEF'),
    opp('o9', 33, 12, '9', 'FWD'),
    opp('o10', 21, 28, '10', 'MID'),
    opp('o11', 24, 50, '11', 'FWD'),
    opp('o7', 44, 20, '7', 'MID'),
  ],
  ball: { ownerId: 'o9' },
}

const triangleBoard = {
  players: [
    own('c8', 52, 22, '8', 'MID'),
    own('m6', 53.5, 23.5, '6', 'MID'),
    own('m10', 54, 20, '10', 'MID'),
    opp('x14', 57, 20.5, '14', 'MID'),
    opp('x16', 57, 27.5, '16', 'MID'),
    opp('x18', 64, 23, '18', 'DEF'),
  ],
  ball: { ownerId: 'c8' },
}

const coverBoard = {
  players: [
    own('gk', 2, 34, '1', 'GK'),
    own('d3', 27.27, 12.37, '3', 'DEF'),
    own('d4', 30.5, 13.5, '4', 'DEF'),
    opp('o11', 29, 11, '11', 'FWD'),
    opp('o10', 23, 24, '10', 'MID'),
  ],
  ball: { ownerId: 'o11' },
}

const shiftBoard = {
  players: [
    own('gk', 2, 34, '1', 'GK'),
    own('d3', 23, 22, '3', 'DEF'),
    own('d4', 23, 33, '4', 'DEF'),
    own('d5', 24, 43, '5', 'DEF'),
    own('d2', 26, 54, '2', 'DEF'),
    opp('o11', 35, 9, '11', 'FWD'),
    opp('o9', 25, 31, '9', 'FWD'),
    opp('o7', 38, 56, '7', 'FWD'),
  ],
  ball: { ownerId: 'o11' },
}

const noFeedbackOverrides = {
  excellent: { de: 'Stark!' },
  good: { de: 'Gut!' },
  notYet: { de: 'Noch nicht.' },
}

export const m6Abschlusstest: MissionInput = {
  schemaVersion: 1,
  id: 'nazb-m6-abschlusstest',
  version: 1,
  status: 'review',
  mode: 'test',
  role: 'test',
  title: { de: 'Abschlusstest' },
  goal: { de: 'Ich zeige in neuen Situationen, was ich gelernt habe.' },
  coachNote: {
    de: 'Vier neue Situationen ohne Hinweise: freien Gegner erkennen, Dreieck/Anspielbarkeit, Absicherung, Verschieben. Die Auswertung je Prinzip ergibt den Status "digital verstanden". Er ersetzt nicht die Beobachtung im Training.',
  },
  principles: ['P-FREIER-RAUM', 'P-DREIECK', 'P-ANSPIELBAR', 'P-ABSTAND', 'P-ABSICHERN', 'P-VERSCHIEBEN', 'P-MITTE', 'P-STELLEN'],
  competencies: ['K-RAUM-ERKENNEN', 'K-ANSPIELBAR', 'K-DREIECKE', 'K-ZWEITER-VERTEIDIGER', 'K-VERSCHIEBEN'],
  ageGroups: ['D', 'C', 'B'],
  level: 2,
  estimatedMinutes: 5,
  prerequisites: ['nazb-m5-neue-situation'],
  sources: ['C-28', 'C-34'],
  pitch: FULL_PITCH,
  view: { x: -3, y: 2, width: 52, height: 56 },
  teams: TEAMS_STANDARD,
  motion: { profile: 'U15' },
  board: freePlayerBoard,
  steps: [
    {
      id: 'test-freier-gegner',
      kind: 'identify',
      instruction: { de: 'Tippe auf den Gegner, der am gefährlichsten frei steht.' },
      target: 'player',
      selectable: ['o10', 'o11', 'o7'],
      assessment: {
        criteria: [{ id: 'frei', kind: 'selectFree', params: { mode: 'most-free' }, required: true, principle: 'P-FREIER-RAUM' }],
      },
      feedback: noFeedbackOverrides,
      consequence: 'auto',
      examples: [
        { name: 'Nummer 11', selection: { playerId: 'o11' }, expect: 'excellent' },
        { name: 'Nummer 10 (gedeckt)', selection: { playerId: 'o10' }, expect: 'not-yet' },
        { name: 'Nummer 7 (Passweg unsicher)', selection: { playerId: 'o7' }, expect: 'not-yet' },
      ],
    },
    {
      id: 'test-dreieck',
      kind: 'place',
      instruction: { de: 'Wir haben den Ball. Bilde mit Nummer 6 und Nummer 10 ein Dreieck, damit Nummer 8 zwei sichere Passwege hat.' },
      board: triangleBoard,
      view: { x: 30, y: 2, width: 44, height: 50 },
      controlled: ['m6', 'm10'],
      area: { min: { x: 30, y: 1 }, max: { x: 80, y: 67 } },
      assessment: {
        criteria: [
          { id: 'dreieck', kind: 'triangle', params: {}, required: true, weight: 3, principle: 'P-DREIECK' },
          { id: 'anspielbar', kind: 'passOptions', params: { minOpen: 2 }, required: true, weight: 2, principle: 'P-ANSPIELBAR' },
          {
            id: 'abstand',
            kind: 'spacing',
            params: { include: [{ ref: 'ballCarrier' }], band: { min: 4, idealMin: 8 } },
            required: true,
            weight: 1,
            principle: 'P-ABSTAND',
          },
          {
            id: 'passdistanz',
            kind: 'groupDistance',
            params: { band: { min: 3, idealMin: 6, idealMax: 18, max: 24 } },
            required: true,
            weight: 1,
            principle: 'P-ABSTAND',
          },
        ],
      },
      feedback: noFeedbackOverrides,
      consequence: 'auto',
      solution: { m6: { x: 50, y: 38 }, m10: { x: 40, y: 22 } },
      examples: [
        { name: 'Lösung', positions: { m6: { x: 50, y: 38 }, m10: { x: 40, y: 22 } }, expect: 'excellent' },
        { name: 'Bleiben am Ball', positions: {}, expect: 'not-yet' },
        { name: 'Auf einer Linie', positions: { m6: { x: 52, y: 34 }, m10: { x: 52, y: 10 } }, expect: 'not-yet' },
      ],
    },
    {
      id: 'test-absichern',
      kind: 'place',
      instruction: { de: 'Nummer 3 stellt. Wo sichert Nummer 4 ab?' },
      board: coverBoard,
      view: { x: -3, y: 0, width: 46, height: 42 },
      controlled: ['d4'],
      area: { min: { x: 0, y: 0 }, max: { x: 50, y: 54 } },
      assessment: {
        criteria: [
          { id: 'absichern', kind: 'cover', params: { cover: 'd4', first: 'd3' }, required: true, weight: 3, principle: 'P-ABSICHERN' },
          { id: 'rechtzeitig', kind: 'reachInTime', params: { defender: 'd4', target: 'o10' }, required: true, weight: 2, principle: 'P-ABSICHERN' },
        ],
      },
      feedback: noFeedbackOverrides,
      consequence: 'auto',
      solution: { d4: { x: 24.3, y: 16.7 } },
      examples: [
        { name: 'Lösung', positions: { d4: { x: 24.3, y: 16.7 } }, expect: 'excellent' },
        { name: 'Am Ball', positions: {}, expect: 'not-yet' },
        { name: 'Zu tief', positions: { d4: { x: 6, y: 30 } }, expect: 'not-yet' },
      ],
    },
    {
      id: 'test-verschieben',
      kind: 'place',
      instruction: { de: 'Der Ball ist auf die andere Seite gewechselt. Verschiebe die Viererkette.' },
      board: shiftBoard,
      view: { x: -3, y: -3, width: 53, height: 74 },
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
        ],
      },
      feedback: noFeedbackOverrides,
      consequence: 'auto',
      solution: { d3: { x: 32.4, y: 10.86 }, d4: { x: 26, y: 18.5 }, d5: { x: 21.5, y: 28.5 }, d2: { x: 22, y: 38 } },
      examples: [
        {
          name: 'Lösung',
          positions: { d3: { x: 32.4, y: 10.86 }, d4: { x: 26, y: 18.5 }, d5: { x: 21.5, y: 28.5 }, d2: { x: 22, y: 38 } },
          expect: 'excellent',
        },
        { name: 'Nicht verschoben', positions: {}, expect: 'not-yet' },
      ],
    },
  ],
}
