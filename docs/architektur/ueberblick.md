# Architektur – Überblick

Stand: 29.10.2026

## 1. Technologie (geprüfte stabile Versionen, Oktober 2026)

| Bereich | Wahl | Version | Begründung |
|---|---|---|---|
| Laufzeit | Node.js | 22 LTS | Vorgabe von Next.js (≥ 20.9), lokal vorhanden |
| Paketverwaltung | pnpm Workspaces | 10.28 | Monorepo mit klaren Paketgrenzen, schnelle Installs |
| Web-Framework | Next.js App Router, Turbopack | 16.4.3 | gewünschter Stack; Server Components, Server Actions, Cache Components, PWA-Manifest eingebaut |
| UI | React | 19.3.1 | aktuelle stabile Version |
| Sprache | TypeScript | 6.0.3 | TS 7 (nativer Compiler) ist noch nicht mit typescript-eslint kompatibel (`<6.1`) – siehe ADR 0006 |
| Styling | Tailwind CSS (CSS-first `@theme`) | 4.3.3 | Design-Tokens als CSS-Variablen, gemeinsam für App und SVG-Spielfeld |
| Datenbank | PostgreSQL | 16 (lokal) | JSON-Spalten für Eingaben/Kriterien, Arrays, solide EU-Hosting-Optionen |
| ORM | Prisma ORM (`prisma-client`, Treiberadapter `pg`) | 7.10.1 | stabile Linie; Prisma 8 ist noch Release Candidate (ADR 0005) |
| Validierung | zod | 4.6 | gemeinsame Schemas für Szenarien, Kriterien und Eingaben |
| Rendering Spielfeld | SVG + React, eigenes Paket | – | ADR 0002 |
| Tests | Vitest 5, Playwright 1.63 | – | Unit-, Content-, Integrations- und E2E-Tests |
| Icons, Schriften | lucide-react, Fontsource (Inter, Barlow Condensed) | – | selbst gehostet |

## 2. Module und Abhängigkeiten

```
apps/web ──► @spieliq/pitch ──► @spieliq/engine
   │                               ▲
   └──────► @spieliq/content ──────┘
```

| Modul (Auftrag) | Ort |
|---|---|
| 1 Benutzer & Rollen | `apps/web/src/server/auth/*`, `server/modules/accounts.ts`, `server/policies.ts` |
| 2 Vereine & Mannschaften | `server/modules/teams.ts` |
| 3 Lerninhalte & Kompetenzbaum | `packages/content` (`curriculum.ts`, `principles.ts`, `missions/`) |
| 4 Szenario-Datenmodell | `packages/engine/src/scenario/schema.ts` |
| 5 Taktische Simulationsengine | `packages/engine/src/{analysis,simulation}` |
| 6 Bewertungsengine | `packages/engine/src/assessment` |
| 7 Rendering & Animation | `packages/pitch` |
| 8 Lernfortschritt | `packages/content/src/progress-rules.ts`, `server/modules/progress.ts` |
| 9 Hausaufgaben | `server/modules/assignments.ts` |
| 10 Trainer-Dashboard | `apps/web/src/app/coach/*`, `features/coach/*` |
| 11 Content-Management | Inhalte versioniert im Code + Content-Tests; `CustomScenario` für Editor (ADR 0008) |
| 12 Analysen & Berichte | `server/modules/insights.ts` |
| (Querschnitt) Datenschutz: Auskunft, Löschung, Speicherfristen | `server/modules/accounts.ts`, `server/modules/retention.ts`, `scripts/retention.ts` |

ESLint erzwingt: Engine/Content importieren kein React/Next/Prisma; UI-Komponenten importieren keinen Datenbankzugriff.

## 3. Datenfluss einer Aufgabe

1. Seite (Server Component) prüft die Sitzung innerhalb von `<Suspense>` und übergibt die Mission (reine Daten) an den Client.
2. Client (`MissionPlayer`) lädt die Mission mit derselben Engine, bewertet sofort (Feedback ohne Wartezeit) und spielt die Konsequenz ab.
3. Parallel ruft der Client die Server Action `submitAttemptAction` mit der **Eingabe** (Positionen/Auswahl) auf – nicht mit dem Ergebnis.
4. Der Server validiert die Eingabe (zod), übernimmt nur steuerbare Spieler, begrenzt Positionen auf den erlaubten Bereich, **bewertet selbst neu** und speichert Versuch und Missionsfortschritt.
5. Abschluss einer Mission bestätigt der Server anhand gespeicherter Versuche.
6. Trainer-Auswertungen lesen ausschließlich gespeicherte Daten (keine vorgetäuschten Werte).

## 4. Projektstruktur (Auszug)

```
apps/web/
  prisma/              schema.prisma, migrations/, seed.ts (Demo-Daten, gekennzeichnet)
  scripts/             Betriebsjobs (retention.ts: Speicherfristen)
  src/app/             Routen (öffentlich, (auth), play, coach, account, api)
  src/app/actions/     Server Actions (prüfen Sitzung bei jedem Aufruf)
  src/components/ui/   Designsystem-Komponenten
  src/features/        mission/, player/, coach/
  src/server/          db, auth/, policies, modules/ (Fachlogik mit Datenbank)
  test/                Integrationstests (echte Testdatenbank)
  e2e/                 Playwright
packages/engine/src/   geometry, board, model, analysis, assessment, simulation, scenario
packages/content/src/  principles, curriculum, drills, formats, missions, feedback, progress-rules
packages/pitch/src/    PitchSvg, Markings, Tokens, Overlays, usePlacement, useTimelinePlayer
```

## 5. Erweiterbarkeit

- **Sprachen:** Texte in Inhalten als `{ de, en? }`, Feedback über Schlüssel; UI-Texte derzeit deutsch im Code (Auslagerung in Wörterbücher vorbereitet, siehe Entwicklungsplan). Routen sind sprachneutral (`/play`, `/coach`).
- **Mehrere Vereine/Fußballschulen:** Organisation → Mannschaften → Mitgliedschaften; alle Abfragen über Berechtigungsprüfungen.
- **Neue Inhalte:** reine Daten im Szenarioformat; Engine erweitert man um Kriterien (Registry), nicht um Sonderfälle.
- **Editor:** erzeugt dasselbe Format; `CustomScenario` speichert es je Organisation.

## 6. Performance

- Engine-Berechnungen sind klein (≤ 22 Spieler, Abtastung 0,25 m): eine Bewertung dauert wenige Millisekunden, die Zufallsprüfung von 400 Platzierungen ≈ 0,1 s.
- SVG mit < 100 Elementen; Animation per `requestAnimationFrame`.
- Öffentliche Seiten statisch vorgerendert, angemeldete Seiten mit Partial Prerendering und Streaming.
- Lerninhalte sind Teil des Bundles (keine Datenbankabfrage zum Laden einer Mission).
