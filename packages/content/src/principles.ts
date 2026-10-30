/**
 * Prinzipien sind die kleinste fachliche Einheit des Lernsystems. Jedes
 * Bewertungskriterium einer Mission zahlt auf genau ein Prinzip ein.
 * Formulierungen für Spieler sind bewusst kurz; die Trainerbeschreibung
 * ordnet fachlich ein. Quellen-IDs verweisen auf docs/recherche/.
 *
 * Status "review": fachlich formuliert, Prüfung durch lizenzierte
 * Jugendtrainer steht aus (siehe docs/qualitaet/qualitaetsstandards.md).
 * Quellen: bevorzugt im Volltext geprüfte Einträge (docs/recherche/README.md).
 */
export type GamePhase = 'mit-ball' | 'gegen-ball' | 'umschalten' | 'allgemein'

export interface Principle {
  readonly id: string
  readonly name: string
  readonly playerText: string
  readonly coachText: string
  readonly phase: GamePhase
  readonly sources: readonly string[]
  readonly status: 'review' | 'approved'
}

export const PRINCIPLES: readonly Principle[] = [
  {
    id: 'P-NICHT-ALLE',
    name: 'Nicht alle zum Ball',
    playerText: 'Nur einer geht zum Ball.',
    coachText:
      'Aufgabenverteilung statt Rudelbildung: Ein Spieler übt Druck auf den Ball aus, die übrigen sichern ab, halten Gegenspieler und Räume. Gilt mit und gegen den Ball (mit Ball: Abstand zum Ballführenden).',
    phase: 'allgemein',
    sources: ['B-01', 'B-06', 'B-14', 'B-102'],
    status: 'review',
  },
  {
    id: 'P-FREIER-RAUM',
    name: 'Freie Räume erkennen',
    playerText: 'Ich sehe, wer frei ist.',
    coachText:
      'Wahrnehmung von freien Gegenspielern und Räumen abseits des Balls. Operationalisiert über offene Passwege und die Zeit, die ein Empfänger nach der Annahme hätte.',
    phase: 'allgemein',
    sources: ['C-17', 'B-30', 'B-48'],
    status: 'review',
  },
  {
    id: 'P-ABSTAND',
    name: 'Abstand halten',
    playerText: 'Ich halte Abstand zu meinen Mitspielern.',
    coachText:
      'Sinnvolle Abstände zum Ballführenden und zwischen Mitspielern: nicht so nah, dass ein Gegenspieler mehrere stören kann, nicht so weit, dass der Pass unsicher wird. Abstandswerte sind Modellannahmen (C-Jugend, Großfeld).',
    phase: 'mit-ball',
    sources: ['B-19', 'B-20'],
    status: 'review',
  },
  {
    id: 'P-ANSPIELBAR',
    name: 'Anspielbar sein',
    playerText: 'Ich stelle mich frei für einen Pass.',
    coachText:
      'Leitgedanke "ohne Ball anspielbar sein": offener Passweg zum Ballführenden. Bewertet über ein zeitbasiertes Abfangmodell (Ball vs. schnellster Gegenspieler).',
    phase: 'mit-ball',
    sources: ['A-14', 'A-15', 'B-48'],
    status: 'review',
  },
  {
    id: 'P-BREITE-TIEFE',
    name: 'Breite und Tiefe',
    playerText: 'Wir verteilen uns im ganzen Feld.',
    coachText:
      'Raumaufteilung in Breite und Tiefe: Abspielmöglichkeiten in Tiefe und Breite schaffen, Breite halten, Tiefe bedrohen – je nach Situation. Tiefe umfasst ausdrücklich auch Anspielstationen hinter dem Ball. Nicht: "immer maximal breit".',
    phase: 'mit-ball',
    sources: ['A-14', 'A-15', 'B-19', 'B-99'],
    status: 'review',
  },
  {
    id: 'P-DREIECK',
    name: 'Dreiecke bilden',
    playerText: 'Wir stellen uns wie ein Dreieck auf.',
    coachText:
      'Versetzte Positionen (kein Linienstand) schaffen zwei gleichzeitige Passoptionen und Anschlussaktionen. Ein Lösungsweg, keine Pflicht: Das Prinzip dahinter ist Anspielbarkeit in mehreren Winkeln.',
    phase: 'mit-ball',
    sources: ['B-19', 'B-20', 'B-22'],
    status: 'review',
  },
  {
    id: 'P-STELLEN',
    name: 'Stellen (erster Verteidiger)',
    playerText: 'Der Nächste geht zum Gegner mit dem Ball.',
    coachText:
      'Erster Verteidiger: Druck auf den Ballführenden, torseitig, auf Distanz, die Zugriff erlaubt, ohne sofort überspielt zu werden. Lenkrichtung ist kontextabhängig und wird hier noch nicht bewertet.',
    phase: 'gegen-ball',
    sources: ['A-87', 'B-02', 'B-03', 'B-13'],
    status: 'review',
  },
  {
    id: 'P-ABSICHERN',
    name: 'Absichern (zweiter Verteidiger)',
    playerText: 'Ich stehe schräg hinter meinem Mitspieler.',
    coachText:
      'Zweiter Verteidiger: tiefer gestaffelt, schräg versetzt (bevorzugt Richtung Tor/innen), nah genug für sofortige Hilfe, weit genug, um nicht mit derselben Aktion überspielt zu werden; zugleich den nächsten Gegenspieler im Blick.',
    phase: 'gegen-ball',
    sources: ['A-87', 'B-01', 'B-17', 'B-94'],
    status: 'review',
  },
  {
    id: 'P-VERSCHIEBEN',
    name: 'Gemeinsam verschieben',
    playerText: 'Wechselt der Ball die Seite, rücken wir mit.',
    coachText:
      'Ballorientiertes Verschieben als Block: Schwerpunkt Richtung Ballseite, ballnah enge Abstände, ballfern größere – ausdrücklich keine gleichen Abstände.',
    phase: 'gegen-ball',
    sources: ['A-50', 'A-87', 'B-05', 'B-07', 'B-12'],
    status: 'review',
  },
  {
    id: 'P-MITTE',
    name: 'Mitte schützen',
    playerText: 'Vor unserem Tor bleibt immer jemand.',
    coachText:
      'Balance: Der ballferne Spieler rückt ein und schützt den zentralen Raum bzw. kontrolliert den gefährlichsten Gegenspieler – ballferne Außenräume dürfen eher offen bleiben.',
    phase: 'gegen-ball',
    sources: ['A-14', 'B-07', 'B-08', 'B-14', 'B-94'],
    status: 'review',
  },
]

export function getPrinciple(id: string): Principle | undefined {
  return PRINCIPLES.find((p) => p.id === id)
}
