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

/**
 * Erklärfilm vor den Aufgaben: dieselbe Idee auf der anderen Spielfeldseite
 * (gespiegelt), damit die Aufgaben danach Übung sind und nicht nur Wiederholung.
 */
const filmStart = {
  players: start.players.map((p) => ({ ...p, pos: { x: p.pos.x, y: 68 - p.pos.y } })),
  ball: start.ball,
}

export const m1ProblemErkennen: MissionInput = {
  schemaVersion: 1,
  id: 'nazb-m1-problem-erkennen',
  version: 1,
  status: 'review',
  role: 'intro',
  title: { de: 'Das Problem erkennen' },
  goal: { de: 'Laufen alle zum Ball, ist ein Gegner frei.' },
  coachNote: {
    de: 'Ballorientierung ohne Aufgabenverteilung ("Rudelbildung") öffnet Räume und lässt Gegenspieler frei. Die Mission macht die Ursache-Wirkung-Kette sichtbar: Zulaufen → freier Gegner → offener Passweg → Torchance. Danach wird die Grundidee "einer stellt, einer sichert, einer bleibt beim Gegner" als bessere Lösung gezeigt.',
  },
  principles: ['P-NICHT-ALLE', 'P-FREIER-RAUM'],
  competencies: ['K-RAUM-ERKENNEN', 'K-NICHT-ALLE'],
  ageGroups: ['E', 'D', 'C', 'B'],
  level: 1,
  estimatedMinutes: 3,
  prerequisites: [],
  sources: ['B-01', 'B-06', 'B-14', 'B-102', 'C-17'],
  pitch: FULL_PITCH,
  view: { x: -3, y: 24, width: 52, height: 46 },
  teams: TEAMS_STANDARD,
  motion: { profile: 'U15' },
  board: start,
  steps: [
    {
      id: 'erklaerfilm',
      kind: 'film',
      instruction: { de: 'Erklärfilm: Nicht alle zum Ball' },
      view: { x: -3, y: -2, width: 52, height: 46 },
      board: filmStart,
      segments: [
        {
          text: { de: 'Der Gegner hat den Ball. Alle drei Blauen rennen zu ihm.' },
          script: [
            { type: 'dribble', player: 'o9', to: { x: 32, y: 11 }, at: 0, duration: 1.6 },
            { type: 'move', player: 'd3', to: { x: 33.6, y: 13.8 }, at: 0.3, duration: 1.5 },
            { type: 'move', player: 'd4', to: { x: 29.4, y: 9.4 }, at: 0.45, duration: 1.9 },
            { type: 'move', player: 'd6', to: { x: 34.2, y: 8.6 }, at: 0.35, duration: 1.9 },
          ],
          overlays: [
            { type: 'ring', player: 'd3', tone: 'bad' },
            { type: 'ring', player: 'd4', tone: 'bad' },
            { type: 'ring', player: 'd6', tone: 'bad' },
            { type: 'emptyArea', center: { x: 21, y: 28 }, radius: 9 },
          ],
        },
        {
          text: { de: 'Hinten ist jetzt alles leer. Nummer 7 bekommt den Ball und läuft allein auf unser Tor.' },
          script: [
            { type: 'pass', from: 'o9', to: 'o7', at: 0.4 },
            { type: 'dribble', player: 'o7', to: { x: 11, y: 30 }, at: 1.7, duration: 1.8 },
          ],
          overlays: [{ type: 'ring', player: 'o7', tone: 'bad' }],
        },
        {
          text: { de: 'Besser so: Nur einer geht zum Gegner mit dem Ball. Die anderen bleiben hinten.' },
          board: filmStart,
          script: [
            { type: 'dribble', player: 'o9', to: { x: 32, y: 11 }, at: 0, duration: 1.6 },
            { type: 'move', player: 'd3', to: { x: 30.2, y: 12.4 }, at: 0.3, duration: 1.4 },
          ],
          overlays: [{ type: 'ring', player: 'd3', tone: 'good' }],
        },
        {
          text: { de: 'Einer steht schräg hinter ihm und hilft. Einer passt in der Mitte auf Nummer 7 auf.' },
          script: [
            { type: 'move', player: 'd6', to: { x: 26.5, y: 19.5 }, at: 0, duration: 1.6 },
            { type: 'move', player: 'd4', to: { x: 20.5, y: 27.4 }, at: 0.1, duration: 1.0 },
          ],
          overlays: [
            { type: 'ring', player: 'd6', tone: 'good' },
            { type: 'ring', player: 'd4', tone: 'good' },
            { type: 'lane', from: 'o9', to: 'o7' },
          ],
        },
        {
          text: { de: 'Das merken wir uns: Einer geht zum Ball. Einer hilft, einer schützt die Mitte.' },
          overlays: [
            { type: 'ring', player: 'd3', tone: 'good' },
            { type: 'ring', player: 'd6', tone: 'good' },
            { type: 'ring', player: 'd4', tone: 'good' },
          ],
        },
      ],
    },
    {
      id: 'zuschauen',
      kind: 'watch',
      instruction: { de: 'Was machen die Blauen?' },
      board: start,
      script: [
        { type: 'dribble', player: 'o9', to: { x: 32, y: 57 }, at: 0, duration: 1.6 },
        { type: 'move', player: 'd3', to: { x: 33.6, y: 54.2 }, at: 0.3, duration: 1.5 },
        { type: 'move', player: 'd4', to: { x: 29.4, y: 58.6 }, at: 0.45, duration: 1.9 },
        { type: 'move', player: 'd6', to: { x: 34.2, y: 59.4 }, at: 0.35, duration: 1.9 },
      ],
      after: {
        caption: { de: 'Alle drei Blauen laufen zum Ball. Hinten ist es jetzt leer.' },
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
      instruction: { de: 'Welcher Gegner ist frei? Tippe ihn an.' },
      target: 'player',
      selectable: ['o7', 'o10', 'o8'],
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
        notYet: { de: 'Schau noch mal hin.' },
      },
      hints: [{ de: 'Schau weg vom Ball.' }, { de: 'Bei welchem Gegner ist kein Blauer?' }],
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
        de: 'Nur einer geht zum Ball. Die anderen bleiben hinten und passen auf.',
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
        { de: 'Einer steht schräg hinter ihm.' },
        { de: 'Einer passt auf Nummer 7 auf.' },
      ],
    },
  ],
  fieldTransfer: {
    drills: ['D-4V4-AUFGABEN'],
    challenge: { de: 'Im Training: Wer geht zum Ball? Was machen die anderen?' },
  },
}
