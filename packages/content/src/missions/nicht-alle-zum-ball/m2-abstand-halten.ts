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
  goal: { de: 'Mit Abstand kann jeder den Ball bekommen.' },
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
      instruction: { de: 'Wir haben den Ball. Wohin laufen die Blauen?' },
      script: [
        { type: 'move', player: 'm8', to: { x: 50.5, y: 36.8 }, at: 0.2, duration: 1.6 },
        { type: 'move', player: 'm10', to: { x: 50.8, y: 31.6 }, at: 0.3, duration: 1.6 },
        { type: 'move', player: 'm7', to: { x: 45.5, y: 37 }, at: 0.25, duration: 1.6 },
        { type: 'move', player: 'x14', to: { x: 54.2, y: 29.6 }, at: 0.9, duration: 1.2 },
        { type: 'move', player: 'x16', to: { x: 54.2, y: 39 }, at: 0.9, duration: 1.2 },
      ],
      after: {
        caption: { de: 'Alle laufen zum Ball. Jetzt können zwei Gegner alle stören.' },
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
      instruction: { de: 'Zieh 7, 8 und 10 weg vom Ball. Jeder soll frei für einen Pass sein.' },
      guide: [{ de: 'Einer geht nach links.' }, { de: 'Einer geht nach rechts.' }, { de: 'Einer geht nach hinten.' }],
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
        excellent: { de: 'Super! Nummer 6 kann jeden anspielen.' },
        good: { de: 'Gut gemacht!' },
      },
      hints: [
        { de: 'Geh weg vom Ball. Such freien Platz.' },
        { de: 'Kein Gegner soll zwischen Nummer 6 und dir stehen.' },
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
        de: 'Mit Abstand kann jeder den Ball bekommen. Geht zur Seite, nach vorne und nach hinten.',
      },
      overlays: [{ type: 'passOptions', from: 'c6' }],
      keyPoints: [{ de: 'Nicht zum Ball laufen.' }, { de: 'Such freien Platz.' }, { de: 'Kein Gegner zwischen dir und dem Ball.' }],
    },
  ],
  fieldTransfer: {
    drills: ['D-RONDO-4V2', 'D-3V1-DREIECK'],
    challenge: { de: 'Im Training: Steht ein Gegner zwischen dir und dem Ball? Dann geh zur Seite.' },
  },
}
