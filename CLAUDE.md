# Hinweise für Entwicklungssitzungen (SPIELIQ)

Lies zuerst `docs/README.md` (Index) und `docs/entwicklungsplan.md` (Stand, nächste Schritte).

## Arbeitsweise
- Sprache der Oberfläche und Dokumentation: Deutsch. Code-Bezeichner Englisch, Kommentare Deutsch.
- Fachliche Aussagen nur mit Quelle aus `docs/recherche/` oder klar als Annahme gekennzeichnet. Keine Quellen erfinden.
- Keine DFB/FIFA/UEFA-Texte, -Grafiken oder -Logos übernehmen; keine Kooperation suggerieren.
- Schwellenwerte der Bewertung (Meter, Sekunden) sind Modellannahmen → `docs/konzept/engine.md`, Abschnitt Modellparameter.

## Architekturregeln
- `packages/engine` und `packages/content`: kein React, kein Next.js, keine Datenbank (ESLint erzwingt das).
- Bewertung immer über die Engine; der Server bewertet Spielereingaben selbst neu (`apps/web/src/server/modules/progress.ts`).
- Datenbankzugriff nur über `apps/web/src/server/modules/*` mit Berechtigungsprüfung (`src/server/policies.ts`).
- Next.js 16 mit Cache Components: Sitzungszugriffe innerhalb von `<Suspense>`; Doku liegt in `node_modules/next/dist/docs/`.
- Neue Missionen: Szenarioformat v1 (`packages/engine/src/scenario/schema.ts`), Beispiele für richtig/falsch sind Pflicht; `pnpm --filter @spieliq/content test` prüft Zufallsschutz und Spiegelinvarianz.

## Befehle
- `pnpm check` – Typprüfung, Lint, Tests (Integrationstests brauchen `TEST_DATABASE_URL`)
- `pnpm build && pnpm test:e2e` – End-to-End
- Prisma: `pnpm --filter @spieliq/web exec prisma migrate dev --name <name>` (nur Entwicklungsdatenbank)
