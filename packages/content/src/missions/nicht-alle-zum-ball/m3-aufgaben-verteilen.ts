import type { MissionInput } from '@spieliq/engine'
import { FULL_PITCH, opp, own, TEAMS_STANDARD } from '../helpers'

/**
 * Mission 3 – Wer übernimmt welche Aufgabe? (erster und zweiter Verteidiger)
 * Nummer 3 stellt den Ballführenden. Der Spieler steuert Nummer 4 und
 * sucht die Absicherungsposition: tiefer, schräg versetzt, nah genug zum
 * Helfen und rechtzeitig beim zweiten Angreifer.
 */
const before = {
  players: [
    own('gk', 2, 34, '1', 'GK'),
    own('d3', 23.5, 50, '3', 'DEF'),
    own('d4', 19.5, 41, '4', 'DEF'),
    opp('o9', 33, 60, '9', 'FWD'),
    opp('o10', 25, 42, '10', 'MID'),
  ],
  ball: { ownerId: 'o9' },
}

export const m3AufgabenVerteilen: MissionInput = {
  schemaVersion: 1,
  id: 'nazb-m3-aufgaben-verteilen',
  version: 1,
  status: 'review',
  title: { de: 'Wer übernimmt welche Aufgabe?' },
  goal: { de: 'Einer stellt den Ballführenden – ich sichere ihn ab.' },
  coachNote: {
    de: 'Erster Verteidiger: Druck auf den Ball, torseitig. Zweiter Verteidiger: Absicherung – tiefer gestaffelt, schräg versetzt, nah genug zum Eingreifen und gleichzeitig in der Lage, einen Pass auf den zweiten Angreifer rechtzeitig zu verteidigen. Eine enge Deckung des zweiten Angreifers wird als vertretbare Alternative erkannt und erklärt. Abstände sind Modellannahmen für die C-Jugend auf dem Großfeld und müssen in der Erprobung kalibriert werden.',
  },
  principles: ['P-STELLEN', 'P-ABSICHERN', 'P-NICHT-ALLE'],
  competencies: ['K-ERSTER-VERTEIDIGER', 'K-ZWEITER-VERTEIDIGER'],
  ageGroups: ['D', 'C', 'B'],
  level: 2,
  estimatedMinutes: 3,
  prerequisites: ['nazb-m1-problem-erkennen'],
  sources: ['A-51', 'A-87', 'B-01', 'B-02', 'B-03', 'B-69', 'B-81'],
  pitch: FULL_PITCH,
  view: { x: -3, y: 26, width: 46, height: 44 },
  teams: TEAMS_STANDARD,
  motion: { profile: 'U15' },
  board: before,
  steps: [
    {
      id: 'zuschauen',
      kind: 'watch',
      instruction: { de: 'Nummer 9 dribbelt auf euch zu. Schau, was Nummer 3 und Nummer 4 machen.' },
      script: [
        { type: 'dribble', player: 'o9', to: { x: 27, y: 55 }, at: 0, duration: 1.8 },
        { type: 'move', player: 'd3', to: { x: 25.2, y: 53.3 }, at: 0.3, duration: 1.4 },
        { type: 'move', player: 'd4', to: { x: 28.6, y: 51.4 }, at: 0.4, duration: 1.6 },
      ],
      after: {
        caption: { de: 'Beide gehen zum Ball. Wird Nummer 3 ausgespielt, ist hinter ihm niemand mehr.' },
        overlays: [
          { type: 'ring', player: 'd4', tone: 'bad' },
          { type: 'lane', from: 'o9', to: 'o10' },
          { type: 'emptyArea', center: { x: 18, y: 46 }, radius: 7 },
        ],
      },
    },
    {
      id: 'absichern',
      kind: 'place',
      instruction: { de: 'Nummer 3 stellt den Gegner. Zieh Nummer 4 dorthin, wo er Nummer 3 absichert.' },
      controlled: ['d4'],
      area: { min: { x: 0, y: 14 }, max: { x: 50, y: 68 } },
      overlays: [{ type: 'ring', player: 'd3', tone: 'good' }],
      assessment: {
        criteria: [
          { id: 'absichern', kind: 'cover', params: { cover: 'd4', first: 'd3' }, required: true, weight: 3, principle: 'P-ABSICHERN' },
          {
            id: 'rechtzeitig',
            kind: 'reachInTime',
            params: { defender: 'd4', target: 'o10' },
            required: true,
            weight: 2,
            principle: 'P-ABSICHERN',
          },
          { id: 'nicht-beide', kind: 'crowding', params: { radius: 3.5, max: 1 }, weight: 1, principle: 'P-NICHT-ALLE' },
        ],
        alternatives: [
          {
            id: 'nummer-10-eng-decken',
            explanation: {
              de: 'Auch möglich: Du deckst Nummer 10 eng, so kommt kein Pass an. Aber wird Nummer 3 ausgespielt, ist niemand mehr hinter ihm. Meist ist "schräg dahinter" die bessere Wahl.',
            },
            criteria: [
              { id: 'eng', kind: 'reachInTime', params: { defender: 'd4', target: 'o10', tolerance: 0.1 }, required: true },
              { id: 'torseitig', kind: 'goalSide', params: { defender: 'd4', attacker: 'o10' }, required: true },
            ],
          },
        ],
      },
      feedback: {
        excellent: { de: 'Stark abgesichert!' },
        good: { de: 'Gut gemacht!' },
        notYet: { de: 'Noch nicht ganz.' },
      },
      hints: [
        { de: 'Nicht auch zum Ball – bleib hinter Nummer 3.' },
        { de: 'Schräg hinter Nummer 3, Richtung Tor – und Nummer 10 im Blick.' },
      ],
      consequence: 'auto',
      solution: { d4: { x: 21, y: 48 } },
      examples: [
        { name: 'Musterlösung', positions: { d4: { x: 21, y: 48 } }, expect: 'excellent' },
        { name: 'Etwas enger, auch gut', positions: { d4: { x: 22.3, y: 48.8 } }, expect: 'pass' },
        { name: 'Bleibt am Ball', positions: { d4: { x: 28.6, y: 51.4 } }, expect: 'not-yet' },
        { name: 'Neben Nummer 3 (flach)', positions: { d4: { x: 27.4, y: 50.4 } }, expect: 'not-yet' },
        { name: 'Viel zu tief', positions: { d4: { x: 8, y: 38 } }, expect: 'not-yet', expectFeedback: 'cover.tooFar' },
        { name: 'Deckt Nummer 10 eng (Alternative)', positions: { d4: { x: 24.2, y: 40.2 } }, expect: 'good' },
      ],
    },
    {
      id: 'merke',
      kind: 'explain',
      instruction: { de: 'Merke:' },
      text: {
        de: 'Der erste Verteidiger stellt: nah dran, zwischen Ball und Tor. Der zweite sichert ab: schräg dahinter – nah genug zum Helfen, weit genug, dass nicht beide überspielt werden.',
      },
      overlays: [
        { type: 'ring', player: 'd3', tone: 'good' },
        { type: 'ring', player: 'd4', tone: 'good' },
        { type: 'distance', a: 'd3', b: 'd4' },
      ],
      keyPoints: [{ de: 'Erster Verteidiger: stellen.' }, { de: 'Zweiter Verteidiger: absichern.' }],
    },
  ],
  fieldTransfer: {
    drills: ['D-2V2-ABSICHERN'],
    challenge: { de: 'Im nächsten Spiel: Wenn dein Mitspieler zum Ball geht, ruf "Ich sichere!" und stell dich schräg hinter ihn.' },
  },
}
