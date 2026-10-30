# SPIELIQ – Dokumentation

Stand: 29.10.2026 · Einstieg für jede Entwicklungssitzung: zuerst den [Entwicklungsplan](entwicklungsplan.md) lesen.

## Plan und offene Fragen

| Dokument | Inhalt |
|---|---|
| [Entwicklungsplan](entwicklungsplan.md) | aktueller Stand, getroffene Entscheidungen, Roadmap, Grenzen, nächste Schritte |
| [Offene Fragen](recherche/offene-fragen.md) | Entscheidungen für den Produktverantwortlichen, fachliche, wissenschaftliche, rechtliche Fragen |

## Recherche (Phase A)

| Dokument | Inhalt |
|---|---|
| [Methodik und Stand](recherche/README.md) | wie recherchiert wurde, Kennzeichnungen, Verifikationsstand, Folgerecherche |
| [Ausbildungsprinzipien](recherche/ausbildungsprinzipien.md) | Leitideen von DFB, FIFA, UEFA und Wissenschaft; Prinzip – Lösungsweg – Kontextvorgabe; Dogmen |
| [Taktische Grundlagen](recherche/taktische-grundlagen.md) | Verteidigen, Angreifen, Wahrnehmung, Umschalten; Zahlen aus Quellen; Begriffe; Prinzipien der Engine |
| [Altersgerechte Lernziele G–A](recherche/altersgerechte-lernziele.md) | Spielformate, belegte Schwerpunkte, abgeleitete Lernziele je Altersklasse |
| [Lernvoraussetzungen](recherche/lernvoraussetzungen.md) | kognitive, soziale, körperliche Voraussetzungen und Designfolgen |
| Quellenregister | [A – DFB](recherche/quellen/A-dfb-jugendfussball.md) · [B – FIFA/UEFA](recherche/quellen/B-fifa-uefa-verbaende.md) · [C – Wissenschaft](recherche/quellen/C-sport-und-lernwissenschaft.md) · [D – Recht](recherche/quellen/D-recht-datenschutz-barrierefreiheit.md) |

## Konzept (Phase B)

| Dokument | Inhalt |
|---|---|
| [Produktkonzept](konzept/produktkonzept.md) | Vision, Zielgruppen, Rollen, Journeys, Informationsarchitektur, Gamification, Trainerfunktionen, Priorisierung |
| [Lernsystem](konzept/lernsystem.md) | Lernloop, Gestaltungsprinzipien, Alter vs. Kompetenz, Fortschrittszustände, Missionsablauf |
| [Kompetenzbaum](konzept/kompetenzbaum.md) | Lernwelten, 27 Kompetenzen, Progression, Bezug zu den Defiziten der C-Jugend |
| [Lerneinheit 1](konzept/lerneinheit-1.md) | „Warum laufen wir nicht alle zum Ball?“ – Drehbuch der Missionen 1–6 |
| [Engine](konzept/engine.md) | Bewegungs- und Abfangmodell, Modellparameter und ihre Anker, Kriterien, Gesamtbewertung, Simulation, Qualitätsprüfungen |
| [Szenarioformat v1](konzept/szenarioformat.md) | Datenformat für Missionen und den späteren Editor |
| [Sprachausgabe](konzept/sprachausgabe.md) | Vorlesen mit vorab erzeugter KI-Stimme (ElevenLabs): Katalog, Vertonung, Abspielen, Einrichtung, Datenschutz |

## Design, Architektur, Recht, Qualität

| Dokument | Inhalt |
|---|---|
| [Designsystem](design/designsystem.md) | Farben, Kontraste, Typografie, Spielfeld, Komponenten, Bewegung |
| [Einfach verstehen](design/einfach-verstehen.md) | Regeln für Sprache, Spielfeld und Bedienung, damit niemand überfordert wird (Einfache Sprache, Schritt für Schritt) |
| [Architektur – Überblick](architektur/ueberblick.md) | Stack und Versionen, Module, Datenfluss, Struktur, Erweiterbarkeit |
| [Datenmodell](architektur/datenmodell.md) | Entitäten, abgeleitete Werte, Aufbewahrung |
| [Sicherheit](architektur/sicherheit.md) | Authentifizierung, Autorisierung, Härtung, offene Maßnahmen |
| [Teststrategie](architektur/teststrategie.md) | Testebenen, Umfang, Grundsätze |
| ADRs | [0001 Monorepo](architektur/adr/0001-monorepo-mit-fachpaketen.md) · [0002 SVG](architektur/adr/0002-svg-rendering.md) · [0003 Sitzungen](architektur/adr/0003-eigene-sitzungsverwaltung.md) · [0004 Cache Components](architektur/adr/0004-cache-components.md) · [0005 Prisma/PostgreSQL](architektur/adr/0005-prisma-7-postgresql.md) · [0006 TypeScript 6](architektur/adr/0006-typescript-6.md) · [0007 Zeitbasierte Bewertung](architektur/adr/0007-zeitbasierte-bewertung.md) · [0008 Inhalte im Code](architektur/adr/0008-inhalte-im-code.md) |
| [Datenschutz- und Kinderschutzkonzept](recht/datenschutzkonzept.md) | Daten, Sichtbarkeit, Einwilligung, Fristen, Betroffenenrechte, Speicher-Inventar, offene Rechtsfragen |
| [Barrierefreiheit](recht/barrierefreiheit.md) | rechtlicher Rahmen, Umsetzungsstand je WCAG-Kriterium, Prüfplan |
| [Online-Vorschau mit Vercel und Supabase](betrieb/vorschau-vercel-supabase.md) | Einrichtung, Umgebungsvariablen, Fehlerbehebung, Datenschutz-Hinweise |
| [Qualitätsstandards](qualitaet/qualitaetsstandards.md) | Freigabeprozess, Checklisten je Mission, Evaluation |
| [Content-Report](qualitaet/content-report.md) | automatisch erzeugt (`pnpm content:report`): Kennzahlen je Mission |

## Grundregeln

- Fachliche Aussagen nur mit Quelle aus den Registern oder klar als Annahme gekennzeichnet; Quellen-IDs in Code und Inhalten werden automatisch gegen die Register geprüft.
- Keine DFB-, FIFA- oder UEFA-Texte, -Grafiken, -Logos; keine Kooperation oder Zertifizierung suggerieren.
- Keine Aussage über garantierte Rechtskonformität.
