# Entwicklungsplan

Stand: 29.10.2026 · Lies zuerst diesen Plan und den [Doku-Index](README.md).

## 1. Aktueller Stand

**Phase A (Recherche) – abgeschlossen für den ersten Durchgang**
- Vier Quellenregister (DFB, FIFA/UEFA, Wissenschaft, Recht) mit 314 Einträgen, davon 138 im Originaltext geprüft; Kennzeichnung „verifiziert / nur Suchergebnis / Hintergrundwissen“ ([Recherche](recherche/README.md)).
- Synthesen: [Ausbildungsprinzipien](recherche/ausbildungsprinzipien.md), [Taktische Grundlagen](recherche/taktische-grundlagen.md), [Altersgerechte Lernziele](recherche/altersgerechte-lernziele.md), [Lernvoraussetzungen](recherche/lernvoraussetzungen.md), [Offene Fragen](recherche/offene-fragen.md).

**Phase B (Konzept) – Entwurf zur Abstimmung**
- [Produktkonzept](konzept/produktkonzept.md) (Vision, Zielgruppen, Rollen, Journeys, Informationsarchitektur, Gamification-Leitplanken, Priorisierung), [Lernsystem](konzept/lernsystem.md), [Kompetenzbaum](konzept/kompetenzbaum.md) (7 Welten, 27 Kompetenzen), [Engine](konzept/engine.md), [Szenarioformat v1](konzept/szenarioformat.md), [Designsystem](design/designsystem.md), [Datenschutzkonzept](recht/datenschutzkonzept.md), [Barrierefreiheit](recht/barrierefreiheit.md).

**Technik – vertikaler Schnitt funktionsfähig**
- Monorepo: `packages/engine` (Geometrie, zeitbasiertes Passweg-Modell, 20 Bewertungskriterien, Zeitleisten, Konsequenz-Simulation, Szenarioformat, Qualitätswerkzeuge), `packages/content` (10 Prinzipien, Kompetenzbaum, 6 Missionen, 6 Spielformen, 6 Spielformate, Texte, Fortschrittsregeln), `packages/pitch` (SVG-Spielfeld, Animation, Ziehen/Antippen/Tastatur, Hoch- und Querformat), `apps/web` (Next.js 16).
- Funktionen: Gastmodus ohne Konto; Trainer-Registrierung mit Verein und Mannschaft; Teamcodes (Hash, Ablauf, Einwilligungsbestätigung für U16, keine Spielerkonten in G/F); pseudonyme Spielerkonten; Lerneinheit 1 mit Missionen 1–6 (Zuschauen, Erkennen, Positionieren, Feedback, Konsequenz, Zusammenfassung); serverseitige Neubewertung; Lernstand mit drei Zuständen; Hausaufgaben mit Bericht; Trainerbeobachtung „auf dem Platz“; Problemfelder und Spielform-Vorschläge; Auskunft (JSON), Berichtigung, Löschung; Speicherfristen-Job; Seite „Hilfe & Melden“; Demo-Daten klar gekennzeichnet.
- Qualität: 41 Engine-, 3 Spielfeld-, 102 Content-, 26 Integrations- und 7 End-to-End-Tests (Smartphone und Desktop), alle grün; Content-Tests prüfen Beispiele, Zufallsschutz, Raterate, Spiegelinvarianz und die Existenz jeder Quellenangabe ([Content-Report](qualitaet/content-report.md)).

**Noch nicht erfolgt:** fachliche Freigabe durch lizenzierte Jugendtrainer:innen, Kalibrierung der Schwellenwerte, rechtliche Prüfung, Nutzertests, Pilot, Betrieb (Hosting, CI, Monitoring).

## 2. Entscheidungen, die ohne Rückfrage getroffen wurden

Begründet und umkehrbar; grundlegende Fragen stehen in [Offene Fragen](recherche/offene-fragen.md), Abschnitt 1.

| Nr. | Entscheidung | Begründung | Dokument |
|---|---|---|---|
| ENT-01 | Monorepo mit fachlichen Paketen; Engine und Inhalte ohne React/Next/Datenbank | Testbarkeit, gleiche Bewertung auf Client und Server, späterer Editor | ADR 0001 |
| ENT-02 | SVG-Spielfeld statt Canvas/WebGL | Barrierefreiheit (Fokus, Namen), Schärfe, kleine Elementzahl | ADR 0002 |
| ENT-03 | eigene Sitzungsverwaltung (scrypt, gehashte Tokens) | Spielerkonten ohne E-Mail, volle Kontrolle über Datensparsamkeit | ADR 0003 |
| ENT-04 | Next.js 16 mit Cache Components, Prisma 7, PostgreSQL, TypeScript 6 | stabile Versionen Oktober 2026; TS 7 noch nicht mit typescript-eslint kompatibel | ADR 0004–0006 |
| ENT-05 | zeitbasiertes Abfangmodell statt Radius-Regeln | fachlich begründete, stetige Bewertung; Deckungsschatten ergibt sich automatisch | ADR 0007, [Engine](konzept/engine.md) |
| ENT-06 | Inhalte versioniert im Code, Ergebnisse in der Datenbank | Review per Pull Request, Content-Tests in CI; Editor-Inhalte später in `CustomScenario` | ADR 0008 |
| ENT-07 | Lenkrichtung in v1 nicht bewertet | kontextabhängig (B-02, B-11, B-96) | Engine 6.3 |
| ENT-08 | Rollen aus der Lage (ballnächster stellt, zweitnächster sichert, drittnächster Balance) | Prinzip statt Positionsschablone (B-97) | Engine 6.1 |
| ENT-09 | drei getrennte Fortschrittszustände; „angewendet“ nur durch Trainerbeobachtung | Wissen ≠ Können (C-29, C-30) | [Lernsystem](konzept/lernsystem.md) |
| ENT-10 | keine Ranglisten, Streaks, Push-Nachrichten, Kaufappelle | Motivation, Kinderschutz (C, D) | [Ausbildungsprinzipien](recherche/ausbildungsprinzipien.md) SP-9 |
| ENT-11 | G- und F-Jugend ohne Spielerkonten | Datensparsamkeit, DFB gegen frühe Taktik (A-21, A-88) | Offene Fragen E-3 |
| ENT-12 | Einwilligung der Sorgeberechtigten wird bei U16-Mannschaften durch die Trainer:in beim Teamcode bestätigt | praktikabler Startpunkt im Vereinsmodus; rechtlich zu prüfen | [Datenschutzkonzept](recht/datenschutzkonzept.md) |
| ENT-13 | Trainer:innen sehen Versuche nur mit Datum, keine Uhrzeiten oder Nutzungsdauer | Begleiten ohne Überwachen (D-18; D-42 [HW]) | Datenschutzkonzept |
| ENT-14 | Versuchsdetails nach 30 Tagen entfernen; verwaiste Spielerkonten beim Entfernen löschen | Speicherbegrenzung (D, Architekturprinzipien 6 und 9) | Datenschutzkonzept |
| ENT-15 | Begriffe „erster/zweiter/dritter Verteidiger“ mit Rollenwort („Stellen“, „Absichern“, „Mitte schützen“) | FIFA-belegt, im Auftrag verwendet; DFB-Begriff nur für den ersten belegt | [Taktische Grundlagen](recherche/taktische-grundlagen.md) |
| ENT-16 | Pressing-Grundlagen ab C (statt B) im Altersrahmen | U14/U15-Einheiten von DFB und FIFA (A-15, B-10, B-12) | [Kompetenzbaum](konzept/kompetenzbaum.md) |
| ENT-17 | CSP mit `'unsafe-inline'` für Skripte (vorerst) | Nonces erzwingen dynamisches Rendern; Härtung geplant | [Sicherheit](architektur/sicherheit.md) |

## 3. Roadmap (priorisiert)

| Meilenstein | Inhalt | Priorität | Voraussetzung |
|---|---|---|---|
| **M0 – Fundament** ✓ | Recherche, Konzepte, Technik, Einheit 1 spielbar, Tests | erledigt | – |
| **M1 – Fachliche Freigabe und Kalibrierung** | Review der Missionen 1–6 nach Checklisten; Werkzeug für Expertenurteile („passt / vertretbar / nicht passend“ zu standardisierten Situationen); Schwellen anpassen; Begriffe bestätigen; Freigabestatus `approved` | Must | lizenzierte:r Jugendtrainer:in (Entscheidung E-4) |
| **M2 – Pilotfähigkeit** | anwaltliche Prüfung, DSFA, Verzeichnis, AVV-Vorlage, endgültige Datenschutzhinweise und Elterninformation; EU-Hosting; CI-Pipeline (Typprüfung, Lint, Tests, Build, E2E mit PostgreSQL); täglicher Retention-Job; Beitritt mit Freigabe durch Trainer:in; E-Mail-Verifikation und Passwort-Rücksetzung für Erwachsene; MFA für Trainer:innen/Admins; axe-Prüfungen | Must | E-1, E-2, E-6 |
| **M3 – Pilot C-Jugend** | 6–8 Wochen, Vorher/Nachher/Retention: digitaler Test, Nahtransfer (neue Szenen), strukturierte Trainerbeobachtung in einer festen Spielform; qualitative Interviews | Must | M1, M2, Einwilligungen (E-5) |
| **M4 – Einheiten 2 und 3** | Einheit 2 „Anbieten in Bewegung – Verhalten nach dem Pass“ (K-NACH-DEM-PASS, K-DREIECKE vertiefen, Interaktion: Laufweg mit Zeitpunkt); Einheit 3 „Erst schauen, dann entscheiden“ (K-SCHULTERBLICK, begrenztes Sichtfeld mit Umschauen, optionale Zeitfenster) | Must/Should | Feedback aus M1 |
| **M5 – Gemeinsam verteidigen vertiefen** | Lenken (Trainereinstellung innen/außen), Passwege zustellen, Kompaktheit im Verbund, Herausrücken und Absichern in der Kette, Pressing-Auslöser | Should | M1 |
| **M6 – Szenario-Editor v1** | Trainer:innen erstellen Situationen (Positionen, Bewegungen, Kriterien aus Bausteinen) im Format v1; automatische Prüfungen (Beispiele, Zufallsschutz) wie bei offiziellen Inhalten; Freigabe im Verein | Should | Datenmodell `CustomScenario` vorhanden |
| **M7 – Lernpfade und Wiederholung** | Einstiegsdiagnose, individuelle Pfade, verteilte Wiederholung, adaptive Auswahl (Elo/BKT als Hypothese) | Should | Daten aus Pilot |
| **M8 – Reichweite** | PWA offline (Speicher-Inventar ergänzen), englische Oberfläche, Präsentationsmodus fürs Kabinengespräch, Textansicht des Spielfelds für Screenreader, Hochkontrast-Thema | Could | – |
| später | Spielerperspektive, Elternzugang, Fußballschulen/Leistungszentren mit eigenen Spielprinzipien; KI-Feedback nur nach rechtlicher Prüfung (KI-VO, D-41 [HW]) | Could/Won't vorerst | Entscheidungen E-1, E-2 |

## 4. Bekannte Grenzen und technische Schulden

- **Engine:** keine Blick-/Laufrichtungen, keine Geschwindigkeiten der Spieler in der Bewertung, kein gechippter Pass, kein Abseits; Torwart nur passiv; Gegnerverhalten in der Konsequenz-Simulation einfach; alle Schwellen unkalibriert.
- **Inhalte:** alle Missionen auf `review`; nur Einheit 1; Feedbacktexte nur Deutsch.
- **Sicherheit:** CSP ohne Nonces; IP-Ratenbegrenzung erst am Reverse Proxy; keine E-Mail-Rücksetzung und keine MFA für Erwachsene; keine Sitzungsübersicht.
- **Datenschutz:** Retention-Job läuft noch nicht automatisch; Altersübergänge (16, 18) und Löschung nach Inaktivität nicht umgesetzt; keine Ansicht „Wer sieht was?“.
- **Barrierefreiheit:** keine Textansicht der Spielsituation, keine Rückgängig-Funktion, keine Prüfung mit Hilfsmitteln.
- **Betrieb:** keine CI, kein Hosting, kein Monitoring (Fehlerprotokolle ohne Drittanbieter-Tracking planen), keine Backups.
- **Trainerfunktionen:** keine Co-Trainer-Einladung, keine Übergabe von Mannschaften, keine Exporte für Trainergespräche.

## 5. Nächste Schritte (konkret für die nächste Sitzung)

1. CI-Workflow (GitHub Actions) mit PostgreSQL-Service anlegen: `pnpm check`, `pnpm build`, `pnpm test:e2e`.
2. Kalibrierungswerkzeug für Trainer:innen (Situationen aus den Missionsbeispielen anzeigen, Urteil erfassen, Übereinstimmung mit der Engine auswerten).
3. Beitritt mit Freigabe durch die Trainer:in (offene Beitrittsanfragen im Trainerbereich).
4. Einheit 2 konzipieren (Missionsdrehbuch analog [Lerneinheit 1](konzept/lerneinheit-1.md)) und die Interaktion „Laufweg mit Zeitpunkt“ in Engine und Spielfeld ergänzen.
5. Folgerecherche nach Freigabe der Domains (siehe [Recherche](recherche/README.md), Abschnitt 5), zuerst MEIN FUSSBALL und EU-Rechtstexte.
