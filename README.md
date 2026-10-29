# SPIELIQ

Interaktive Lernplattform für **Spielverständnis im Jugendfußball**: Spieler:innen sehen eine Spielsituation, entscheiden selbst, bekommen sofort fachlich begründetes Feedback, erleben die Konsequenz ihrer Entscheidung – und wenden das Prinzip im nächsten Training auf dem Platz an. Trainer:innen verwalten Mannschaften, vergeben Lernmissionen als Hausaufgabe und sehen, wo es noch hakt.

> Entwicklungsstand: **Prototyp / vertikaler Schnitt**. Erste Lerneinheit „Warum laufen wir nicht alle zum Ball?“ (6 Missionen) vollständig spielbar. Fachliche Freigabe durch lizenzierte Jugendtrainer:innen und rechtliche Prüfung stehen aus (siehe [docs/entwicklungsplan.md](docs/entwicklungsplan.md)).
> SPIELIQ ist ein unabhängiges Projekt und steht in keiner Verbindung zu DFB, FIFA oder UEFA.

## Schnellstart (lokal)

Voraussetzungen: Node.js ≥ 22, pnpm 10, PostgreSQL ≥ 15.

```bash
pnpm install
```

```bash
cp apps/web/.env.example apps/web/.env   # Datenbank-URLs anpassen
```

```bash
pnpm --filter @spieliq/web exec prisma migrate deploy
```

```bash
pnpm db:seed   # optional: klar gekennzeichnete Demo-Daten
```

```bash
pnpm dev       # http://localhost:3000
```

Demo-Zugänge nach `db:seed` (nur lokal): Trainer `demo.trainer@spieliq.invalid` / `demo-trainer-2026`, Spieler `demo-falke-11` / `demo-spieler-2026`, Teamcode `DEMO-2026`. Ohne Konto: `/try`.

## Prüfen

```bash
pnpm check        # Typprüfung, Lint, Unit-/Content-/Integrationstests
```

```bash
pnpm build && pnpm test:e2e   # End-to-End (Playwright) gegen den Produktionsbuild
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
