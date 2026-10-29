import type { MissionInput } from '@spieliq/engine'
import { FULL_PITCH, opp, own, TEAMS_STANDARD } from '../helpers'

/**
 * Mission 1 – Das Problem erkennen
 * Drei eigene Spieler laufen gleichzeitig zum Ball. Nummer 7 des Gegners wird
 * frei, der Raum vor dem Tor ist leer. Der Spieler erkennt den freien Gegner,
 * sieht die Konsequenz (Torchance) und dann die bessere Aufgabenverteilung.
 */
const start = {
  players: [
    own('gk', 2, 34, '1', 'GK'),
    own('d3', 24, 52, '3', 'DEF'),
    own('d4', 19, 40, '4', 'DEF'),
    own('d6', 27, 31, '6', 'MID'),
    opp('o9', 37, 61, '9', 'FWD'),
    opp('o7', 23, 41, '7', 'FWD'),
    opp('o10', 45, 47, '10', 'MID'),
    opp('o8', 37.5, 51.5, '8', 'MID'),
  ],
  ball: { ownerId: 'o9' },
}

export const m1ProblemErkennen: MissionInput = {
  schemaVersion: 1,
  id: 'nazb-m1-problem-erkennen',
  version: 1,
  status: 'review',
  role: 'intro',
  title: { de: 'Das Problem erkennen' },
  goal: { de: 'Ich erkenne: Wenn alle zum Ball laufen, wird ein Gegner frei.' },
  coachNote: {
    de: 'Ballorientierung ohne Aufgabenverteilung ("Rudelbildung") öffnet Räume und lässt Gegenspieler frei. Die Mission macht die Ursache-Wirkung-Kette sichtbar: Zulaufen → freier Gegner → offener Passweg → Torchance. Danach wird die Grundidee "einer stellt, einer sichert, einer bleibt beim Gegner" als bessere Lösung gezeigt.',
  },
  principles: ['P-NICHT-ALLE', 'P-FREIER-RAUM'],
  competencies: ['K-RAUM-ERKENNEN', 'K-NICHT-ALLE'],
  ageGroups: ['E', 'D', 'C', 'B'],
  level: 1,
  estimatedMinutes: 2,
  prerequisites: [],
  sources: ['B-01', 'B-06', 'B-14', 'B-102', 'C-17'],
  pitch: FULL_PITCH,
  view: { x: -3, y: 24, width: 52, height: 46 },
  teams: TEAMS_STANDARD,
  motion: { profile: 'U15' },
  board: start,
  steps: [
    {
      id: 'zuschauen',
      kind: 'watch',
      instruction: { de: 'Schau genau hin: Was machen die blauen Spieler?' },
      script: [
        { type: 'dribble', player: 'o9', to: { x: 32, y: 57 }, at: 0, duration: 1.6 },
        { type: 'move', player: 'd3', to: { x: 33.6, y: 54.2 }, at: 0.3, duration: 1.5 },
        { type: 'move', player: 'd4', to: { x: 29.4, y: 58.6 }, at: 0.45, duration: 1.9 },
        { type: 'move', player: 'd6', to: { x: 34.2, y: 59.4 }, at: 0.35, duration: 1.9 },
      ],
      after: {
        caption: { de: 'Alle drei laufen zum Ball. Wer passt jetzt noch auf Nummer 7 auf?' },
        overlays: [
          { type: 'ring', player: 'd3', tone: 'bad' },
          { type: 'ring', player: 'd4', tone: 'bad' },
          { type: 'ring', player: 'd6', tone: 'bad' },
          { type: 'emptyArea', center: { x: 21, y: 40 }, radius: 9 },
        ],
      },
    },
    {
      id: 'freien-gegner-finden',
      kind: 'identify',
      instruction: { de: 'Tippe auf den Gegner, der jetzt frei ist.' },
      target: 'player',
      selectable: ['o7', 'o10', 'o8'],
      overlays: [{ type: 'emptyArea', center: { x: 21, y: 40 }, radius: 9 }],
      assessment: {
        criteria: [
          {
            id: 'frei',
            kind: 'selectFree',
            params: { mode: 'most-free' },
            required: true,
            principle: 'P-FREIER-RAUM',
          },
        ],
      },
      feedback: {
        excellent: { de: 'Genau! Nummer 7 steht frei.' },
        notYet: { de: 'Schau noch mal genau hin.' },
      },
      hints: [{ de: 'Schau weg vom Ball.' }, { de: 'Bei wem ist weit und breit kein blauer Spieler?' }],
      consequence: 'auto',
      examples: [
        { name: 'Nummer 7 ist frei', selection: { playerId: 'o7' }, expect: 'excellent' },
        { name: 'Nummer 10 ist zugestellt', selection: { playerId: 'o10' }, expect: 'not-yet' },
        { name: 'Nummer 8 ist gedeckt', selection: { playerId: 'o8' }, expect: 'not-yet' },
      ],
    },
    {
      id: 'besser-so',
      kind: 'explain',
      instruction: { de: 'So ist es besser:' },
      board: start,
      text: {
        de: 'Einer geht zum Ball und stellt den Gegner. Die anderen bleiben bei ihren Gegenspielern und schützen den Raum vor dem Tor.',
      },
      script: [
        { type: 'dribble', player: 'o9', to: { x: 32, y: 57 }, at: 0, duration: 1.6 },
        { type: 'move', player: 'd3', to: { x: 30.2, y: 55.6 }, at: 0.3, duration: 1.4 },
        { type: 'move', player: 'd4', to: { x: 20.5, y: 40.6 }, at: 0.4, duration: 1.0 },
        { type: 'move', player: 'd6', to: { x: 26.5, y: 48.5 }, at: 0.35, duration: 1.8 },
      ],
      overlays: [
        { type: 'ring', player: 'd3', tone: 'good' },
        { type: 'lane', from: 'o9', to: 'o7' },
      ],
      keyPoints: [
        { de: 'Einer geht zum Ball.' },
        { de: 'Einer sichert ab.' },
        { de: 'Einer bleibt beim gefährlichen Gegner.' },
      ],
    },
  ],
  fieldTransfer: {
    drills: ['D-4V4-AUFGABEN'],
    challenge: { de: 'Achte im nächsten Training darauf: Wer geht zum Ball – und was machen die anderen?' },
  },
}
