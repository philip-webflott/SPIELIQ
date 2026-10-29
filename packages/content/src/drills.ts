/**
 * Spielformen für den Platz
 * ========================
 * Jede digitale Mission verweist auf passende Spielformen, damit das
 * Gelernte auf dem Platz angewendet wird (Transfer). Ausgerichtet an der
 * Trainingsphilosophie mit kleinen Spielformen, viel Nettospielzeit und
 * wenigen, klaren Coachingpunkten (Recherche A: A-01, A-03, A-04; C: C-14).
 *
 * Die Formen sind SPIELIQ-Eigenentwicklungen auf Basis gängiger Spielformen
 * (Status "review": Prüfung durch lizenzierte Jugendtrainer ausstehend).
 */
export interface Drill {
  readonly id: string
  readonly title: string
  readonly goal: string
  readonly players: string
  readonly area: string
  readonly material: string
  readonly duration: string
  readonly setup: string
  readonly flow: readonly string[]
  readonly coachingPoints: readonly string[]
  /** Fragen statt Zurufe – für kurze Unterbrechungen ("Freeze") */
  readonly questions: readonly string[]
  readonly variations: readonly string[]
  readonly principles: readonly string[]
  readonly ageGroups: readonly string[]
  readonly status: 'review' | 'approved'
}

export const DRILLS: readonly Drill[] = [
  {
    id: 'D-4V4-AUFGABEN',
    title: '4 gegen 4 auf vier Minitore – "Einer geht, einer sichert"',
    goal: 'Gegen den Ball die Aufgaben verteilen: einer stellt, einer sichert ab, die anderen schützen Räume und Gegenspieler.',
    players: '8 Feldspieler (4 gegen 4); weitere Gruppen auf Nebenfeldern',
    area: 'ca. 30 × 25 m (C-Jugend), zwei Minitore je Grundlinie',
    material: '4 Minitore, Hütchen, Leibchen in zwei Farben, Bälle am Rand',
    duration: '4 × 3 Minuten, 1 Minute Pause',
    setup: 'Jedes Team verteidigt zwei Minitore und greift auf zwei Minitore an. Bälle liegen an den Grundlinien für schnellen Wiederbeginn.',
    flow: [
      'Freies Spiel 4 gegen 4, Wiederbeginn immer vom eigenen Tor.',
      'Zusatzregel ab Runde 2: Ein Tor zählt doppelt, wenn das verteidigende Team beim Torschuss zwei oder mehr Spieler direkt am Ball hatte ("Rudel-Regel").',
      'In den Pausen kurze Rückmeldung mit Fragen statt Anweisungen.',
    ],
    coachingPoints: ['Der Nächste geht zum Ball und stellt.', 'Der Zweite steht schräg dahinter.', 'Die anderen schauen: Wer ist frei? Welches Tor ist offen?'],
    questions: ['Wer ist gerade zum Ball gegangen – und wer hätte gehen sollen?', 'Wo war der freie Gegner, als wir das Tor bekommen haben?'],
    variations: ['Leichter: 4 gegen 3 (Überzahl Verteidigung).', 'Schwerer: Feld breiter machen (35 × 30 m).'],
    principles: ['P-NICHT-ALLE', 'P-STELLEN', 'P-ABSICHERN'],
    ageGroups: ['E', 'D', 'C'],
    status: 'review',
  },
  {
    id: 'D-RONDO-4V2',
    title: '4 gegen 2 im Quadrat – "Mach dich anspielbar"',
    goal: 'Ohne Ball so bewegen, dass immer zwei Passwege offen sind.',
    players: '6 Spieler (4 Ballbesitzer, 2 Verteidiger)',
    area: 'Quadrat 12 × 12 m (C-Jugend); jüngere 10 × 10 m',
    material: '4 Hütchen, Leibchen, 1 Ball',
    duration: '6 × 90 Sekunden, Wechsel der Verteidiger',
    setup: 'Die vier Ballbesitzer stehen an den Seiten des Quadrats, die zwei Verteidiger in der Mitte.',
    flow: ['Ballbesitz halten, Verteidiger versuchen den Ball zu gewinnen.', 'Nach Ballgewinn wechselt der Spieler, der den Fehler gemacht hat, in die Mitte.'],
    coachingPoints: ['Steh nicht hinter einem Verteidiger (Deckungsschatten).', 'Links und rechts vom Ball jeweils eine Anspielstation.', 'Abstand halten – nicht zum Ball laufen.'],
    questions: ['Wie viele Passwege hatte der Ballführende gerade?', 'Was musst du tun, wenn der Verteidiger zwischen dir und dem Ball steht?'],
    variations: ['Kontaktbegrenzung (2 Kontakte).', 'Punkt für einen Pass durch die beiden Verteidiger.'],
    principles: ['P-ANSPIELBAR', 'P-ABSTAND'],
    ageGroups: ['E', 'D', 'C', 'B'],
    status: 'review',
  },
  {
    id: 'D-3V1-DREIECK',
    title: '3 gegen 1 im Dreieck – "Zwei Wege zum Ball"',
    goal: 'Dreiecke bilden, damit der Ballführende immer zwei Passoptionen hat.',
    players: '4 Spieler (3 gegen 1), mehrere Gruppen parallel',
    area: 'ca. 10 × 10 m',
    material: 'Hütchen, Leibchen, 1 Ball pro Gruppe',
    duration: '5 × 1 Minute',
    setup: 'Drei Ballbesitzer, ein Verteidiger. Die Ballbesitzer dürfen sich frei bewegen, aber nicht auf einer Linie stehen.',
    flow: ['Zehn Pässe in Folge = Punkt.', 'Nach jeder Minute wechselt der Verteidiger.'],
    coachingPoints: ['Nach dem Pass sofort neu anbieten.', 'Schräg zueinander stehen, nicht auf einer Linie.'],
    questions: ['Warum konnte der Verteidiger den Pass abfangen?'],
    variations: ['Leichter: größeres Feld.', 'Schwerer: 3 gegen 2 auf 15 × 15 m.'],
    principles: ['P-DREIECK', 'P-ANSPIELBAR'],
    ageGroups: ['E', 'D', 'C'],
    status: 'review',
  },
  {
    id: 'D-2V2-ABSICHERN',
    title: '2 gegen 2 auf zwei Tore – "Stellen und Absichern"',
    goal: 'Der erste Verteidiger stellt, der zweite sichert schräg dahinter ab.',
    players: '4 Feldspieler + 2 Torhüter (oder Minitore)',
    area: 'ca. 25 × 18 m',
    material: '2 Tore (5 × 2 m) oder 2 Minitore, Leibchen, Bälle',
    duration: '6 × 2 Minuten',
    setup: 'Zwei Angreifer starten mit Ball an der Mittellinie, zwei Verteidiger vor dem eigenen Tor.',
    flow: ['Angriff auf das Tor, Verteidiger kontern bei Ballgewinn auf das andere Tor.', 'Nach jedem Angriff wechseln die Rollen.'],
    coachingPoints: ['Wer stellt? Kurz ansagen ("Ich!").', 'Absichern: tiefer und schräg versetzt.', 'Wird der Ball gepasst, wechseln die Rollen sofort.'],
    questions: ['Wo hätte der zweite Verteidiger stehen müssen, als der erste ausgespielt wurde?'],
    variations: ['3 gegen 2 (Unterzahl verteidigen).', 'Startpositionen auf dem Flügel.'],
    principles: ['P-STELLEN', 'P-ABSICHERN'],
    ageGroups: ['D', 'C', 'B'],
    status: 'review',
  },
  {
    id: 'D-3V3-AUFGABEN',
    title: '3 gegen 3 + Torhüter – "Stellen, absichern, Mitte schützen"',
    goal: 'Gegen drei Angreifer die drei Aufgaben verteilen: Druck, Absicherung, Balance.',
    players: '6 Feldspieler + 2 Torhüter',
    area: 'ca. 35 × 25 m',
    material: '2 Tore, Leibchen, Bälle',
    duration: '4 × 4 Minuten',
    setup: 'Spiel 3 gegen 3 auf zwei Tore mit Torhütern.',
    flow: ['Freies Spiel.', 'Unterbrechung ("Freeze") durch Pfiff: Alle bleiben stehen, die Verteidiger benennen ihre Aufgabe.'],
    coachingPoints: ['Nur einer am Ball.', 'Der ballferne Spieler rückt ein.'],
    questions: ['Wer war gerade der dritte Verteidiger – und wo hätte er stehen sollen?'],
    variations: ['Breiteres Feld, damit der ballferne Raum größer wird.'],
    principles: ['P-NICHT-ALLE', 'P-STELLEN', 'P-ABSICHERN', 'P-MITTE'],
    ageGroups: ['D', 'C', 'B'],
    status: 'review',
  },
  {
    id: 'D-VERSCHIEBEN-4V4-ZONEN',
    title: 'Verschiebe-Spiel 4 gegen 4 mit Seitenzonen',
    goal: 'Als Kette gemeinsam zur Ballseite verschieben und die Mitte schließen.',
    players: '4 Verteidiger, 4 Angreifer, 2 neutrale Außenspieler',
    area: 'ca. 40 × 30 m, zwei 6 m breite Seitenzonen; 3 kleine Tore auf der Verteidigungslinie',
    material: '3 Minitore, Hütchen, Leibchen, Bälle',
    duration: '5 × 3 Minuten',
    setup: 'Die vier Verteidiger schützen drei Minitore. Die Angreifer dürfen den Ball jederzeit auf die neutralen Außenspieler verlagern.',
    flow: ['Die Angreifer verlagern das Spiel, die Kette verschiebt.', 'Ballgewinn der Verteidiger: Pass auf einen Trainer an der Mittellinie = Punkt.'],
    coachingPoints: ['Bei Verlagerung rufen alle "Schieben!".', 'Ballnah eng, ballfern einrücken.', 'Der Nächste zum Ball stellt.'],
    questions: ['Warum war gerade das mittlere Tor offen?', 'Wie weit muss der ballferne Spieler einrücken?'],
    variations: ['Angreifer +1 (Überzahl).', 'Minitore durch ein großes Tor mit Torhüter ersetzen.'],
    principles: ['P-VERSCHIEBEN', 'P-MITTE', 'P-STELLEN'],
    ageGroups: ['C', 'B', 'A'],
    status: 'review',
  },
]

export function getDrill(id: string): Drill | undefined {
  return DRILLS.find((d) => d.id === id)
}

export function drillsForPrinciples(principleIds: readonly string[]): Drill[] {
  return DRILLS.filter((d) => d.principles.some((p) => principleIds.includes(p)))
}
