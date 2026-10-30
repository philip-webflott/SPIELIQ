# Aufstellung und Spielernamen in den Aufgaben

Stand: 30.10.2026 · Status: **Konzept, Umsetzung nach Rückmeldung zu Abschnitt 8** · Anregung des Produktverantwortlichen

## 1. Idee

Die Trainer:in stellt für die eigene Mannschaft eine **Formation** ein (z. B. 4-4-2) und ordnet den Positionen ihre Spieler:innen zu („Innenverteidiger links: Ali“, „Innenverteidiger rechts: Adam“). In den Lektionen tragen die blauen Figuren dann **Namen statt Nummern**: Statt „Nummer 4 steht zu nah am Ball“ steht dort „Ali steht zu nah am Ball“.

**Warum das sinnvoll ist (Einschätzung):**
- Kinder sehen sich und ihre Mitspieler:innen in der Situation – „das bin ich, das ist Adam“. Das passt zum Vereinsmodus, in dem Trainer:innen ohnehin Aufgaben für ihre Mannschaft auswählen. Ein Wirkungsbeleg speziell für Namen in Taktikaufgaben ist mir nicht bekannt; es ist eine **Annahme**, die wir im Test mit Kindern prüfen.
- Die Formation bleibt **Sache der Trainer:in**: Jede Mannschaft spielt anders, und SPIELIQ schreibt kein System vor. Das passt zum Ebenenmodell der Bewertung – Formation ist eine Kontextvorgabe, kein Grundprinzip ([Ausbildungsprinzipien](../recherche/ausbildungsprinzipien.md)).
- Es verbindet sich mit den geplanten **Positionswelten**: Ein Kind, das in der Aufstellung Innenverteidiger ist, kann später bevorzugt Aufgaben aus Sicht seiner Position bekommen – ohne die Grundlagen für alle zu ersetzen.

## 2. Wie es für die Trainer:in aussieht

1. Mannschaft → **Aufstellung**: Formation wählen (Spielfeld mit Positionen als Vorschau).
2. Auf eine Position tippen → Spieler:in aus der Mannschaftsliste wählen (Spitznamen, wie beim Beitritt angegeben). Positionen dürfen leer bleiben; dann zeigt die Figur weiter ihre Nummer.
3. Schalter **„Namen in den Aufgaben zeigen“** (Standard: aus). Hinweistext: „Deine Spieler:innen sehen dann die Spitznamen ihrer Mitspieler:innen auf den Figuren.“

Formationen (Vorschlag, erweiterbar): für 11 gegen 11 4-4-2, 4-3-3, 4-2-3-1, 4-1-4-1, 3-5-2; für 9 gegen 9 3-3-2, 3-2-3; für 7 gegen 7 2-3-1, 3-2-1 – passend zum Spielformat der Altersklasse ([Altersgerechte Lernziele](../recherche/altersgerechte-lernziele.md)).

## 3. Wie Namen auf die Figuren kommen

Missionen sind bewusst unabhängig von einer Formation geschrieben. Deshalb ordnet SPIELIQ die Namen **automatisch** zu, ohne jede Mission neu zu bearbeiten:

1. Jede blaue Figur hat schon eine Rolle (Torwart, Abwehr, Mittelfeld, Angriff) und eine Lage auf dem Feld (links, Mitte, rechts aus unserer Spielrichtung).
2. Jede Position der Formation hat dieselben Angaben (z. B. „Abwehr, links innen“).
3. Die Engine ordnet jeder Figur die passendste besetzte Position zu (gleiche Rolle, nächste seitliche Lage; jede Position nur einmal). Findet sich keine passende, bleibt die Nummer.

Neue reine Funktion in `packages/engine` (z. B. `assignLineupNames`), testbar ohne Datenbank: gleiche Rolle vor Seite, eindeutige Zuordnung, Spiegelinvarianz, Rückfall auf Nummern. Gegner behalten immer Nummern.

**Darstellung:** Das blaue Schild wird zur Namenspille (abgerundet, höchstens 8 Zeichen, sonst gekürzt); Gegner behalten das quadratische Nummernschild – die Formen unterscheiden die Teams weiter auch ohne Farbe. Ist die angemeldete Spielerin selbst in der Aufstellung, kann ihre Figur später zusätzlich „DU“ tragen (Phase 3).

**Bewertung:** unverändert. Namen sind nur Anzeige; der Server bewertet weiter mit den Missionsdaten neu ([Architekturregel](../../CLAUDE.md)).

## 4. Rückmeldungen und Sprachausgabe

- **Text:** Rückmeldungen nennen den Namen statt der Nummer („Ali steht zu nah am Ball.“). Technisch: Die Vorlagen bekommen den angezeigten Namen statt der Nummer.
- **Stimme:** Namen gehen **nicht** an ElevenLabs – das wären Daten von Kindern bei einem Dienstleister in den USA, mit Auftragsverarbeitung, Drittlandfragen und Folgenabschätzung. Sätze mit Namen liest deshalb die **Gerätestimme** (läuft lokal, nichts verlässt das Gerät); alle anderen Sätze weiter die KI-Stimme. Gibt es keine deutsche Gerätestimme, bleibt der Satz mit Namen stumm, der Text steht auf dem Bildschirm. Das sagt der Hinweistext beim Einschalten.

## 5. Datenschutz

Neu verarbeitet werden (Eintrag im [Datenschutzkonzept](../recht/datenschutzkonzept.md), Abschnitt 3, vor der Umsetzung):

| Daten | Zweck | Sichtbar für | Speicherdauer |
|---|---|---|---|
| Formation der Mannschaft | Darstellung der Aufstellung | Trainer:innen der Mannschaft | mit der Mannschaft |
| Zuordnung Position → Spieler:in | Namen auf den Figuren | Trainer:innen; Spieler:innen der Mannschaft nur, wenn „Namen zeigen“ an ist (nur die Spitznamen auf den Figuren, keine Lernstände) | bis die Trainer:in sie ändert, die Spielerin die Mannschaft verlässt oder das Konto gelöscht wird (automatisch mitgelöscht) |
| Einstellung „Namen zeigen“ | Steuerung | Trainer:innen | mit der Mannschaft |

**Was sich ändert:** Heute sehen Spieler:innen **keine** Daten anderer (Abschnitt 4 des Datenschutzkonzepts). Mit eingeschalteten Namen sehen sie die Spitznamen ihrer Mitspieler:innen auf den Figuren – nicht deren Lernstand, Versuche oder Ergebnisse. Das ist eine Änderung der Sichtbarkeit innerhalb der Mannschaft und braucht:
- Standard **aus**, bewusstes Einschalten durch die Trainer:in;
- eine Zeile in den Datenschutzhinweisen für Kinder und Eltern („Wenn eure Trainerin das einschaltet, stehen eure Spitznamen auf den Figuren in den Aufgaben.“);
- die Möglichkeit, einzelne Spieler:innen auszunehmen (Position bleibt leer oder zeigt die Nummer), z. B. auf Wunsch der Eltern;
- keine Namen im Gastmodus und keine Klarnamen-Pflicht (Spitznamen wie beim Beitritt).

Rechtliche Prüfung vor dem Echtbetrieb wie beim übrigen Vereinsmodus (Einwilligung über den Verein, D, Tabelle 3).

## 6. Technik (Überblick)

- **Inhalte:** Formationen als Daten in `packages/content` (Positionen mit Rolle, Seite und Lage für die Vorschau).
- **Engine:** Zuordnungsfunktion (Abschnitt 3) mit Tests.
- **Datenbank:** `Team.formation`, `Team.showNamesInMissions` (Standard false), Tabelle `LineupSlot` (Mannschaft, Position, Spieler:in; eindeutig je Position und je Spieler:in; wird mit Mitgliedschaft bzw. Konto gelöscht); Zugriff nur über `src/server/modules/*` mit Berechtigungsprüfung: Bearbeiten nur Trainer:innen der Mannschaft, Lesen der Namen nur Mitglieder der Mannschaft bei eingeschaltetem Schalter.
- **Speicherfristen:** in `apps/web/src/server/modules/retention.ts` dokumentiert (Löschung mit Mitgliedschaft, keine eigene Frist nötig).
- **Oberfläche:** Seite „Aufstellung“ im Trainerbereich; Missionen bekommen die Namen über die bestehende Persistenz-Schnittstelle.
- **Sprachausgabe:** Abschnitte mit Namen werden nicht vertont; die App nimmt dafür die Gerätestimme.

## 7. Umsetzungsplan

| Phase | Inhalt | Abnahme |
|---|---|---|
| 1 | Formationen, Zuordnungsfunktion, Namenspille im Spielfeld (mit Testdaten) | Unit-Tests, Screenshot Handy |
| 2 | Datenbank, Servermodul mit Berechtigungen, Trainerseite „Aufstellung“, Datenschutzkonzept und Kinderhinweise | Integrationstests (nur eigene Mannschaft, nur bei eingeschaltetem Schalter), E2E Trainer stellt auf → Spieler sieht Namen |
| 3 | Rückmeldungen mit Namen, Gerätestimme für Namenssätze, „DU“ an der eigenen Position | Content-Test: kein Platzhalter offen; E2E mit Namen |
| 4 | Positionswelten nutzen die Aufstellung (Aufgaben aus Sicht der eigenen Position, Grundlagen bleiben für alle) | Konzept Positionswelten |

## 8. Fragen an den Produktverantwortlichen

1. **Standard „Namen zeigen“ aus** und Einschalten durch die Trainer:in – einverstanden?
2. **Nur Spitznamen aus der Mannschaftsliste** (keine frei eingetippten Namen für Kinder ohne Konto) – einverstanden? Das hält die Daten an einer Stelle und löscht sie automatisch mit.
3. **Stimme bei Namen:** Gerätestimme für Sätze mit Namen (Vorschlag) – oder lieber Nummern in der Sprache behalten und Namen nur auf dem Bildschirm?
