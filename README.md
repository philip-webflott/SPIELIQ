# SPIELIQ

Interaktive Lernplattform für **Spielverständnis im Jugendfußball**: Spieler:innen sehen eine Spielsituation, entscheiden selbst, bekommen sofort fachlich begründetes Feedback, erleben die Konsequenz ihrer Entscheidung – und wenden das Prinzip im nächsten Training auf dem Platz an. Trainer:innen verwalten Mannschaften, vergeben Lernmissionen als Hausaufgabe und sehen, wo es noch hakt.

> Entwicklungsstand: **Prototyp / vertikaler Schnitt**. Erste Lerneinheit „Warum laufen wir nicht alle zum Ball?“ (6 Missionen) vollständig spielbar. Fachliche Freigabe durch lizenzierte Jugendtrainer:innen und rechtliche Prüfung stehen aus (siehe [docs/entwicklungsplan.md](docs/entwicklungsplan.md)).
> SPIELIQ ist ein unabhängiges Projekt und steht in keiner Verbindung zu DFB, FIFA oder UEFA.

## Schnellstart (lokal)

Voraussetzungen: Node.js 22 (siehe `.nvmrc`), pnpm 10 (z. B. über `corepack enable`) und PostgreSQL ab Version 15. Am einfachsten startet die Datenbank per Docker – die Zugangsdaten passen dann ohne Änderung zu `.env.example`:

```bash
docker run --name spieliq-db -e POSTGRES_USER=spieliq -e POSTGRES_PASSWORD=spieliq -e POSTGRES_DB=spieliq -p 5432:5432 -d postgres:16
```

Danach im Projektordner:

```bash
pnpm install
```

```bash
cp apps/web/.env.example apps/web/.env   # bei eigener PostgreSQL-Installation Zugangsdaten anpassen
```

```bash
pnpm db:generate   # erzeugt den Datenbank-Client (liegt nicht im Repository, braucht die .env)
```

```bash
pnpm db:deploy     # legt die Datenbank bei Bedarf an und spielt die Migrationen ein
```

```bash
pnpm db:seed       # optional: klar gekennzeichnete Demo-Daten
```

```bash
pnpm dev           # http://localhost:3000
```

Demo-Zugänge nach `db:seed` (nur lokal): Trainer `demo.trainer@spieliq.invalid` / `demo-trainer-2026`, Spieler `demo-falke-11` / `demo-spieler-2026`, Teamcode `DEMO-2026`. Ohne Konto: `/try`.

Nach Änderungen am Prisma-Schema `pnpm db:generate` erneut ausführen. Der Datenbanknutzer braucht das Recht, Datenbanken anzulegen (beim Docker-Container gegeben) – sonst die Datenbanken `spieliq` und `spieliq_test` vorher selbst anlegen.

## Online-Vorschau (Vercel + Supabase)

Ohne lokale Installation: Repository in Vercel importieren (Root Directory `apps/web`), Supabase als Datenbank verbinden, `SEED_DEMO_DATA=true` setzen – Schritt für Schritt in [docs/betrieb/vorschau-vercel-supabase.md](docs/betrieb/vorschau-vercel-supabase.md). Nur mit Demo-Daten nutzen.

## Prüfen

```bash
pnpm check        # Typprüfung, Lint, Unit-/Content-/Integrationstests (Testdatenbank aus TEST_DATABASE_URL wird geleert)
```

```bash
pnpm --filter @spieliq/web exec playwright install chromium   # einmalig: Browser für die End-to-End-Tests
```

```bash
pnpm build && pnpm test:e2e   # End-to-End (Playwright) gegen den Produktionsbuild
```

## Betrieb

```bash
pnpm --filter @spieliq/web db:retention   # Speicherfristen anwenden – im Betrieb täglich einplanen
```

## Aufbau

| Paket | Inhalt |
|---|---|
| `packages/engine` | Fachlogik ohne UI: Geometrie, Passweg-/Abfangmodell, Bewertungskriterien, Simulation, Szenarioformat, Qualitätswerkzeuge |
| `packages/content` | Lerninhalte: Prinzipien, Kompetenzbaum, Missionen, Spielformen für den Platz, Texte, Fortschrittsregeln |
| `packages/pitch` | SVG-Spielfeld (React): Rendering, Animation, Touch/Maus/Tastatur |
| `apps/web` | Next.js-App: Spieler- und Trainerbereich, Auth, Datenbank (Prisma/PostgreSQL) |
| `docs/` | Recherche, Konzepte, Design, Architektur, Recht, Qualität, Entwicklungsplan |

Einstieg in die Dokumentation: [docs/README.md](docs/README.md).
