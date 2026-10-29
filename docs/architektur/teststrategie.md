# Teststrategie

Stand: 29.10.2026

| Ebene | Werkzeug | Ort | Umfang (aktuell) | Prüft |
|---|---|---|---|---|
| Unit – Engine | Vitest | `packages/engine/src/**/*.test.ts` | 41 | Geometrie, Passweg-Modell (inkl. Monotonie, Deckungsschatten, lange Pässe), Kriterien inkl. „keine gleichen Abstände nötig“, Robustheit gegen kleine Verschiebungen, Gesamtwertung, Alternativen, Zeitleisten, Konsequenz |
| Unit – Spielfeld | Vitest | `packages/pitch/src/*.test.ts` | 3 | Projektion Hoch-/Querformat, Rückrechnung, Formatwahl |
| Content-QA | Vitest | `packages/content/test/*.test.ts` | 101 | Schema, Referenzen, Beispiele richtig/falsch, Musterlösung, Zufallsschutz, Raterate, Spiegelinvarianz, Texte, Kompetenzbaum zyklenfrei, Fortschrittsregeln |
| Integration | Vitest + PostgreSQL | `apps/web/test` | 20 | vertikaler Ablauf, serverseitige Neubewertung, Mandantentrennung, Einwilligungsbestätigung, Auskunft, Löschung |
| End-to-End | Playwright (Smartphone + Desktop) | `apps/web/e2e` | 7 (+1 bewusst nur Desktop) | Gastmission komplett, Antippen statt Ziehen, Registrierung → Teamcode → Beitritt → Mission → Trainer sieht Fortschritt, Schutz geschützter Bereiche |

## Grundsätze

- **Bewertungsregeln werden mit fachlich ähnlichen, aber nicht identischen Situationen getestet** (Spiegelungen, alternative Lösungen, typische Fehler).
- Jede neue Mission braucht dokumentierte Beispiele; ohne sie schlägt CI fehl.
- Integrationstests laufen ausschließlich gegen `TEST_DATABASE_URL` (Schutz: Abbruch, wenn sie der Entwicklungsdatenbank entspricht); Schema per `prisma migrate deploy` (nicht-destruktiv), Tabellen werden vor dem Lauf geleert.
- E2E gegen den Produktionsbuild (`pnpm build`), eindeutige Testdaten je Lauf.

## Geplant

- CI-Pipeline (GitHub Actions): Typprüfung, Lint, Tests, Build, E2E mit PostgreSQL-Service.
- Visuelle Regressionstests der Spielfeld-Darstellung (Screenshots je Mission).
- Barrierefreiheits-Checks (axe) in E2E.
- Nutzertests mit Spieler:innen (Verständlichkeit: „Weiß ein 12-Jähriger in 10 s, was zu tun ist?“) und Trainerreview je Mission.
