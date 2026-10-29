import type { MissionInput } from '@spieliq/engine'
import { FULL_PITCH, opp, own, TEAMS_STANDARD } from '../helpers'

/**
 * Mission 2 – Abstand halten (mit Ball)
 * Alle Mitspieler kommen zum Ballführenden – ein Gegner kann alle zugleich
 * stören. Der Spieler verteilt drei Mitspieler so, dass jeder anspielbar ist
 * und die Mannschaft Breite und Tiefe hat.
 */
const before = {
  players: [
    own('c6', 48, 34, '6', 'MID'),
    own('m8', 53, 47, '8', 'MID'),
    own('m10', 57, 23, '10', 'MID'),
    own('m7', 42, 44, '7', 'FWD'),
    opp('x14', 57, 28.5, '14', 'MID'),
    opp('x16', 57, 40, '16', 'MID'),
    opp('x18', 65, 34, '18', 'DEF'),
  ],
  ball: { ownerId: 'c6' },
}

export const m2AbstandHalten: MissionInput = {
  schemaVersion: 1,
  id: 'nazb-m2-abstand-halten',
  version: 1,
  status: 'review',
  title: { de: 'Abstand halten' },
  goal: { de: 'Wir machen das Feld groß: Jeder ist anspielbar – breit und tief.' },
  coachNote: {
    de: 'Ballnähe ohne Abstand nimmt dem Ballführenden die Optionen und erleichtert dem Gegner das Pressing. Bewertet wird nicht eine Zielposition, sondern ob alle drei Mitspieler über offene Passwege in sinnvoller Distanz erreichbar sind, sich nicht gegenseitig im Weg stehen und gemeinsam Breite und Tiefe erzeugen. Rückpassoptionen zählen ausdrücklich als Tiefe.',
  },
  principles: ['P-ABSTAND', 'P-ANSPIELBAR', 'P-BREITE-TIEFE', 'P-DREIECK'],
  competencies: ['K-ANSPIELBAR', 'K-BREITE-TIEFE'],
  ageGroups: ['E', 'D', 'C', 'B'],
  level: 1,
  estimatedMinutes: 3,
  prerequisites: ['nazb-m1-problem-erkennen'],
  sources: ['A-14', 'A-15', 'B-19', 'B-20', 'B-48'],
  pitch: FULL_PITCH,
  view: { x: 30, y: 4, width: 44, height: 60 },
  teams: TEAMS_STANDARD,
  motion: { profile: 'U15' },
  board: before,
  steps: [
    {
      id: 'zuschauen',
      kind: 'watch',
      instruction: { de: 'Wir haben den Ball. Schau, wohin die Mitspieler von Nummer 6 laufen.' },
      script: [
        { type: 'move', player: 'm8', to: { x: 50.5, y: 36.8 }, at: 0.2, duration: 1.6 },
        { type: 'move', player: 'm10', to: { x: 50.8, y: 31.6 }, at: 0.3, duration: 1.6 },
        { type: 'move', player: 'm7', to: { x: 45.5, y: 37 }, at: 0.25, duration: 1.6 },
        { type: 'move', player: 'x14', to: { x: 53.2, y: 31 }, at: 0.9, duration: 1.2 },
        { type: 'move', player: 'x16', to: { x: 53.2, y: 37.8 }, at: 0.9, duration: 1.2 },
      ],
      after: {
        caption: { de: 'Alle kommen zum Ball. Zwei Gegner reichen, um alle zu stören – und das Feld bleibt leer.' },
        overlays: [
          { type: 'ring', player: 'm8', tone: 'bad' },
          { type: 'ring', player: 'm10', tone: 'bad' },
          { type: 'ring', player: 'm7', tone: 'bad' },
          { type: 'emptyArea', center: { x: 50, y: 13 }, radius: 9 },
          { type: 'emptyArea', center: { x: 50, y: 55 }, radius: 9 },
        ],
      },
    },
    {
      id: 'verteilen',
      kind: 'place',
      instruction: { de: 'Zieh die Nummern 7, 8 und 10 so, dass Nummer 6 jeden sicher anspielen kann.' },
      controlled: ['m7', 'm8', 'm10'],
      area: { min: { x: 30, y: 1 }, max: { x: 82, y: 67 } },
      liveLanes: true,
      assessment: {
        criteria: [
          {
            id: 'passdistanz',
            kind: 'groupDistance',
            params: { band: { min: 3, idealMin: 7, idealMax: 20, max: 26 } },
            required: true,
            weight: 1,
            principle: 'P-ABSTAND',
          },
          { id: 'anspielbar', kind: 'passOptions', params: { minOpen: 3 }, required: true, weight: 3, principle: 'P-ANSPIELBAR' },
          {
            id: 'abstand',
            kind: 'spacing',
            params: { include: [{ ref: 'ballCarrier' }], band: { min: 4, idealMin: 9 } },
            required: true,
            weight: 2,
            principle: 'P-ABSTAND',
          },
          {
            id: 'breite-tiefe',
            kind: 'widthDepth',
            params: { minWidth: 20, minDepth: 12 },
            required: true,
            weight: 2,
            principle: 'P-BREITE-TIEFE',
          },
          { id: 'dreieck', kind: 'triangle', params: {}, weight: 1, principle: 'P-DREIECK' },
        ],
      },
      feedback: {
        excellent: { de: 'Stark! Nummer 6 hat drei sichere Anspielstationen.' },
        good: { de: 'Gut gemacht!' },
        notYet: { de: 'Noch nicht ganz.' },
      },
      hints: [
        { de: 'Geh weg vom Ball – in die freien Räume.' },
        { de: 'Einer nach links, einer nach rechts, einer hinter den Ball.' },
      ],
      consequence: 'auto',
      solution: { m8: { x: 51, y: 13 }, m7: { x: 51, y: 55 }, m10: { x: 37, y: 37 } },
      examples: [
        { name: 'Musterlösung', positions: { m8: { x: 51, y: 13 }, m7: { x: 51, y: 55 }, m10: { x: 37, y: 37 } }, expect: 'excellent' },
        {
          name: 'Andere gute Lösung (weiter vorne)',
          positions: { m8: { x: 56, y: 16 }, m7: { x: 55, y: 52 }, m10: { x: 39, y: 30 } },
          expect: 'pass',
        },
        { name: 'Alle bleiben beim Ball', positions: {}, expect: 'not-yet', expectFeedback: 'groupDistance.tooClose' },
        {
          name: 'Alle auf einer Linie (keine Tiefe)',
          positions: { m8: { x: 48, y: 14 }, m7: { x: 48, y: 54 }, m10: { x: 48, y: 24 } },
          expect: 'not-yet',
        },
        {
          name: 'Viel zu weit weg',
          positions: { m8: { x: 52, y: 3 }, m7: { x: 52, y: 65 }, m10: { x: 79, y: 34 } },
          expect: 'not-yet',
          expectFeedback: 'groupDistance.tooFar',
        },
      ],
    },
    {
      id: 'merke',
      kind: 'explain',
      instruction: { de: 'Merke:' },
      text: {
        de: 'Mit Abstand ist jeder anspielbar. Breite heißt: nach außen gehen. Tiefe heißt: vor oder hinter den Ball.',
      },
      overlays: [{ type: 'passOptions', from: 'c6' }],
      keyPoints: [{ de: 'Nicht zum Ball laufen – Raum suchen.' }, { de: 'Jeder braucht einen freien Passweg.' }],
    },
  ],
  fieldTransfer: {
    drills: ['D-RONDO-4V2', 'D-3V1-DREIECK'],
    challenge: { de: 'Im nächsten Training: Bevor du dich anbietest, schau, ob zwischen dir und dem Ball ein Gegner steht.' },
  },
}
