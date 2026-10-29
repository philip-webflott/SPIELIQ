import type { AgeGroup } from '@spieliq/engine'

/**
 * Lernwelten und Kompetenzbaum (Entwurf v1)
 * ========================================
 * Zwei getrennte Dimensionen (siehe docs/konzept/lernsystem.md):
 * - Altersrahmen: ab welcher Altersklasse ein Thema typischerweise sinnvoll ist
 *   (`fromAgeGroup`) – eine Empfehlung, keine Sperre.
 * - Kompetenzniveau: was ein Spieler tatsächlich beherrscht (Lernstand),
 *   unabhängig vom Alter.
 *
 * Status "verfügbar": Inhalte spielbar. "geplant": Teil des Lehrplans, Inhalte
 * folgen. Altersangaben sind überwiegend eigene fachliche Ableitungen. Belegt
 * ist: Grundlagen des Verteidigens auf einer Linie (Verschieben, Herausrücken,
 * Absichern) spätestens ab D-Junioren, Positionsspezifik ab C-Junioren (DFB,
 * TPD-Flipbook, Quelle A-87). Für Viererkette oder Pressing nennt der DFB
 * keine verbindlichen Altersgrenzen.
 */

export interface World {
  readonly id: string
  readonly order: number
  readonly title: string
  readonly subtitle: string
  readonly color: 'green' | 'blue' | 'orange' | 'violet' | 'teal' | 'rose' | 'amber'
}

export const WORLDS: readonly World[] = [
  { id: 'W1', order: 1, title: 'Spielfeld & Raum', subtitle: 'Wo ist Platz – und warum nicht alle zum Ball?', color: 'green' },
  { id: 'W2', order: 2, title: 'Anspielbar sein', subtitle: 'Freilaufen, Dreiecke, Breite und Tiefe', color: 'blue' },
  { id: 'W3', order: 3, title: 'Verteidigen zu zweit', subtitle: 'Stellen, absichern, Passwege zustellen', color: 'orange' },
  { id: 'W4', order: 4, title: 'Gemeinsam verteidigen', subtitle: 'Verschieben, Kompaktheit, Mitte schützen', color: 'violet' },
  { id: 'W5', order: 5, title: 'Räume im Angriff', subtitle: 'Raum im Rücken, Verlagerung, Gegner binden', color: 'teal' },
  { id: 'W6', order: 6, title: 'Umschalten', subtitle: 'Nach Ballverlust und nach Ballgewinn', color: 'rose' },
  { id: 'W7', order: 7, title: 'Spielintelligenz', subtitle: 'Wahrnehmen, vorausdenken, entscheiden', color: 'amber' },
]

export interface Competency {
  readonly id: string
  readonly worldId: string
  readonly title: string
  /** Was der Spieler danach kann – in Spielersprache */
  readonly canDo: string
  readonly prerequisites: readonly string[]
  readonly principles: readonly string[]
  readonly fromAgeGroup: AgeGroup
  /** 1 = Einsteiger … 5 = fortgeschritten */
  readonly level: 1 | 2 | 3 | 4 | 5
  readonly status: 'verfügbar' | 'geplant'
}

export const COMPETENCIES: readonly Competency[] = [
  // Welt 1 – Spielfeld & Raum
  { id: 'K-ORIENTIERUNG', worldId: 'W1', title: 'Orientierung auf dem Feld', canDo: 'Ich erkenne Spielrichtung, eigenes und gegnerisches Tor, Ball, Mitspieler und Gegner.', prerequisites: [], principles: [], fromAgeGroup: 'E', level: 1, status: 'geplant' },
  { id: 'K-RAUM-ERKENNEN', worldId: 'W1', title: 'Freie Räume erkennen', canDo: 'Ich erkenne, wo Platz ist und wer frei steht.', prerequisites: [], principles: ['P-FREIER-RAUM'], fromAgeGroup: 'E', level: 1, status: 'verfügbar' },
  { id: 'K-NICHT-ALLE', worldId: 'W1', title: 'Nicht alle zum Ball', canDo: 'Ich weiß, warum nur einer zum Ball geht und was die anderen tun.', prerequisites: ['K-RAUM-ERKENNEN'], principles: ['P-NICHT-ALLE'], fromAgeGroup: 'E', level: 1, status: 'verfügbar' },
  { id: 'K-SCHULTERBLICK', worldId: 'W1', title: 'Schulterblick', canDo: 'Ich schaue mich um, bevor der Ball kommt.', prerequisites: ['K-ORIENTIERUNG'], principles: ['P-FREIER-RAUM'], fromAgeGroup: 'E', level: 2, status: 'geplant' },

  // Welt 2 – Anspielbar sein
  { id: 'K-ANSPIELBAR', worldId: 'W2', title: 'Anspielbar sein', canDo: 'Ich stelle mich so, dass ein freier Passweg zu mir führt.', prerequisites: ['K-NICHT-ALLE'], principles: ['P-ANSPIELBAR', 'P-ABSTAND'], fromAgeGroup: 'E', level: 1, status: 'verfügbar' },
  { id: 'K-BREITE-TIEFE', worldId: 'W2', title: 'Breite und Tiefe', canDo: 'Wir verteilen uns breit und tief, damit der Ballführende Optionen hat.', prerequisites: ['K-ANSPIELBAR'], principles: ['P-BREITE-TIEFE', 'P-ABSTAND'], fromAgeGroup: 'E', level: 2, status: 'verfügbar' },
  { id: 'K-DREIECKE', worldId: 'W2', title: 'Dreiecke bilden', canDo: 'Ich bilde mit zwei Mitspielern ein Dreieck.', prerequisites: ['K-ANSPIELBAR'], principles: ['P-DREIECK'], fromAgeGroup: 'D', level: 2, status: 'verfügbar' },
  { id: 'K-UEBERZAHL', worldId: 'W2', title: 'Überzahl nutzen', canDo: 'Ich erkenne Überzahl und spiele den freien Mann an.', prerequisites: ['K-DREIECKE'], principles: ['P-ANSPIELBAR'], fromAgeGroup: 'D', level: 3, status: 'geplant' },
  { id: 'K-DRITTER-MANN', worldId: 'W2', title: 'Doppelpass und dritter Mann', canDo: 'Ich nutze Doppelpass, Klatschen lassen und den dritten Mann.', prerequisites: ['K-DREIECKE'], principles: ['P-DREIECK'], fromAgeGroup: 'C', level: 3, status: 'geplant' },

  // Welt 3 – Verteidigen zu zweit
  { id: 'K-ERSTER-VERTEIDIGER', worldId: 'W3', title: 'Stellen', canDo: 'Als Nächster zum Ball stelle ich den Gegner zwischen Ball und Tor.', prerequisites: ['K-NICHT-ALLE'], principles: ['P-STELLEN'], fromAgeGroup: 'E', level: 1, status: 'verfügbar' },
  { id: 'K-ZWEITER-VERTEIDIGER', worldId: 'W3', title: 'Absichern', canDo: 'Ich sichere meinen Mitspieler schräg dahinter ab.', prerequisites: ['K-ERSTER-VERTEIDIGER'], principles: ['P-ABSICHERN'], fromAgeGroup: 'D', level: 2, status: 'verfügbar' },
  { id: 'K-LENKEN', worldId: 'W3', title: 'Gegner lenken', canDo: 'Ich lenke den Ballführenden dorthin, wo wir ihn erwarten.', prerequisites: ['K-ERSTER-VERTEIDIGER'], principles: ['P-STELLEN'], fromAgeGroup: 'D', level: 3, status: 'geplant' },
  { id: 'K-PASSWEGE-ZU', worldId: 'W3', title: 'Passwege zustellen', canDo: 'Ich nutze meinen Deckungsschatten, um Pässe zu verhindern.', prerequisites: ['K-ERSTER-VERTEIDIGER'], principles: ['P-STELLEN'], fromAgeGroup: 'D', level: 3, status: 'geplant' },

  // Welt 4 – Gemeinsam verteidigen
  { id: 'K-BALANCE', worldId: 'W4', title: 'Mitte schützen (Balance)', canDo: 'Als ballferner Spieler rücke ich ein und schütze die Mitte.', prerequisites: ['K-ZWEITER-VERTEIDIGER'], principles: ['P-MITTE'], fromAgeGroup: 'D', level: 2, status: 'verfügbar' },
  { id: 'K-VERSCHIEBEN', worldId: 'W4', title: 'Ballorientiert verschieben', canDo: 'Wir verschieben gemeinsam zur Ballseite.', prerequisites: ['K-ZWEITER-VERTEIDIGER', 'K-BALANCE'], principles: ['P-VERSCHIEBEN', 'P-MITTE'], fromAgeGroup: 'D', level: 3, status: 'verfügbar' },
  { id: 'K-KOMPAKTHEIT', worldId: 'W4', title: 'Kompakt stehen', canDo: 'Wir halten ballnah enge Abstände zwischen den Mannschaftsteilen.', prerequisites: ['K-VERSCHIEBEN'], principles: ['P-VERSCHIEBEN'], fromAgeGroup: 'C', level: 3, status: 'geplant' },
  { id: 'K-PRESSING', worldId: 'W4', title: 'Pressing-Grundlagen', canDo: 'Ich erkenne Signale, wann wir gemeinsam anlaufen.', prerequisites: ['K-KOMPAKTHEIT'], principles: ['P-STELLEN', 'P-VERSCHIEBEN'], fromAgeGroup: 'B', level: 4, status: 'geplant' },

  // Welt 5 – Räume im Angriff
  { id: 'K-RAUM-IM-RUECKEN', worldId: 'W5', title: 'Raum im Rücken nutzen', canDo: 'Ich erkenne Räume hinter der gegnerischen Abwehr.', prerequisites: ['K-BREITE-TIEFE'], principles: ['P-FREIER-RAUM'], fromAgeGroup: 'D', level: 3, status: 'geplant' },
  { id: 'K-VERLAGERN', worldId: 'W5', title: 'Spiel verlagern', canDo: 'Ich erkenne, wann die andere Seite frei ist.', prerequisites: ['K-BREITE-TIEFE'], principles: ['P-BREITE-TIEFE'], fromAgeGroup: 'D', level: 3, status: 'geplant' },
  { id: 'K-GEGNER-BINDEN', worldId: 'W5', title: 'Gegner binden, Räume öffnen', canDo: 'Mit meinem Laufweg ziehe ich einen Gegner weg und öffne Platz.', prerequisites: ['K-RAUM-IM-RUECKEN'], principles: ['P-FREIER-RAUM'], fromAgeGroup: 'C', level: 4, status: 'geplant' },
  { id: 'K-NACH-DEM-PASS', worldId: 'W5', title: 'Verhalten nach dem Pass', canDo: 'Nach meinem Pass biete ich mich sofort neu an.', prerequisites: ['K-DREIECKE'], principles: ['P-ANSPIELBAR'], fromAgeGroup: 'D', level: 3, status: 'geplant' },

  // Welt 6 – Umschalten
  { id: 'K-NACH-BALLVERLUST', worldId: 'W6', title: 'Nach Ballverlust', canDo: 'Ballnah sofort Druck – oder schnell zurück in die Ordnung.', prerequisites: ['K-VERSCHIEBEN'], principles: ['P-STELLEN', 'P-MITTE'], fromAgeGroup: 'C', level: 4, status: 'geplant' },
  { id: 'K-NACH-BALLGEWINN', worldId: 'W6', title: 'Nach Ballgewinn', canDo: 'Ich erkenne, ob wir schnell nach vorn spielen oder den Ball sichern.', prerequisites: ['K-BREITE-TIEFE'], principles: ['P-ANSPIELBAR'], fromAgeGroup: 'C', level: 4, status: 'geplant' },

  // Welt 7 – Spielintelligenz
  { id: 'K-ENTSCHEIDEN-ZEITDRUCK', worldId: 'W7', title: 'Entscheiden unter Zeitdruck', canDo: 'Ich treffe gute Entscheidungen, auch wenn es schnell gehen muss.', prerequisites: ['K-ANSPIELBAR', 'K-ERSTER-VERTEIDIGER'], principles: ['P-FREIER-RAUM'], fromAgeGroup: 'D', level: 3, status: 'geplant' },
  { id: 'K-RISIKO', worldId: 'W7', title: 'Risiko und Nutzen abwägen', canDo: 'Ich wäge ab: sicherer Pass oder mutige Aktion?', prerequisites: ['K-ENTSCHEIDEN-ZEITDRUCK'], principles: ['P-ANSPIELBAR'], fromAgeGroup: 'C', level: 4, status: 'geplant' },
  { id: 'K-ANTIZIPATION', worldId: 'W7', title: 'Vorausdenken', canDo: 'Ich ahne, was als Nächstes passiert, und stehe schon richtig.', prerequisites: ['K-ENTSCHEIDEN-ZEITDRUCK'], principles: ['P-FREIER-RAUM'], fromAgeGroup: 'B', level: 5, status: 'geplant' },
]

export interface Unit {
  readonly id: string
  readonly worldId: string
  readonly title: string
  readonly subtitle: string
  readonly missionIds: readonly string[]
  readonly competencies: readonly string[]
  readonly ageGroups: readonly AgeGroup[]
  readonly estimatedMinutes: number
}

export const UNITS: readonly Unit[] = [
  {
    id: 'nicht-alle-zum-ball',
    worldId: 'W1',
    title: 'Warum laufen wir nicht alle zum Ball?',
    subtitle: 'Abstand, Aufgaben verteilen, gemeinsam verschieben',
    missionIds: [
      'nazb-m1-problem-erkennen',
      'nazb-m2-abstand-halten',
      'nazb-m3-aufgaben-verteilen',
      'nazb-m4-seitenwechsel',
      'nazb-m5-neue-situation',
      'nazb-m6-abschlusstest',
    ],
    competencies: ['K-RAUM-ERKENNEN', 'K-NICHT-ALLE', 'K-ANSPIELBAR', 'K-BREITE-TIEFE', 'K-DREIECKE', 'K-ERSTER-VERTEIDIGER', 'K-ZWEITER-VERTEIDIGER', 'K-BALANCE', 'K-VERSCHIEBEN'],
    ageGroups: ['D', 'C', 'B'],
    estimatedMinutes: 20,
  },
]

export function getUnit(id: string): Unit | undefined {
  return UNITS.find((u) => u.id === id)
}

export function unitOfMission(missionId: string): Unit | undefined {
  return UNITS.find((u) => u.missionIds.includes(missionId))
}

export function getCompetency(id: string): Competency | undefined {
  return COMPETENCIES.find((c) => c.id === id)
}

export const AGE_GROUP_LABELS: Readonly<Record<AgeGroup, string>> = {
  G: 'G-Jugend (U6/U7)',
  F: 'F-Jugend (U8/U9)',
  E: 'E-Jugend (U10/U11)',
  D: 'D-Jugend (U12/U13)',
  C: 'C-Jugend (U14/U15)',
  B: 'B-Jugend (U16/U17)',
  A: 'A-Jugend (U18/U19)',
}
