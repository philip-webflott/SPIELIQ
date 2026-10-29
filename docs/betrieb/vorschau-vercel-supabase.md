# Online-Vorschau mit Vercel und Supabase

Stand: 29.10.2026 · Zweck: SPIELIQ ansehen, ohne lokal etwas zu installieren. **Nur mit Demo-Daten nutzen** – keine echten Spieler:innen einladen, solange die rechtliche Prüfung aussteht ([Datenschutzkonzept](../recht/datenschutzkonzept.md)).

## Was das Projekt dafür mitbringt

| Baustein | Datei | Wirkung |
|---|---|---|
| Vercel-Konfiguration | `apps/web/vercel.json` | Next.js, Build-Befehl `pnpm run vercel-build`, Funktionen in Frankfurt (`fra1`) |
| Build-Skript | `apps/web/package.json` → `vercel-build` | Prisma-Client erzeugen → Migrationen einspielen → Demo-Daten (nur mit `SEED_DEMO_DATA=true`) → `next build` |
| Verbindung zur Laufzeit | `apps/web/src/server/db-config.ts` | nutzt `DATABASE_URL`, sonst `POSTGRES_URL` (setzt die Supabase-Integration); Supabase immer verschlüsselt |
| Verbindung für Migrationen | `apps/web/prisma.config.ts` | nutzt `DIRECT_URL`, sonst `POSTGRES_URL_NON_POOLING` (Integration), sonst `DATABASE_URL` |

Der Ablauf wurde lokal mit genau diesen Variablennamen nachgespielt (Build, Migrationen, Demo-Daten, Anmeldung). Auf Vercel und Supabase selbst ist er noch nicht gelaufen.

## Weg A: Supabase über die Vercel-Integration (wenig Tipparbeit)

1. **Projekt in Vercel anlegen:** vercel.com → *Add New… → Project* → GitHub-Repository `philip-webflott/SPIELIQ` importieren (Vercel braucht dafür Zugriff auf das Repository).
2. **Root Directory** auf `apps/web` stellen. Framework wird als Next.js erkannt; Build- und Install-Befehl nicht ändern.
3. **Deploy** klicken. Der erste Build bricht ab, weil noch keine Datenbank verbunden ist („Keine Datenbankverbindung“ bzw. `Cannot resolve environment variable`). Das ist erwartet.
4. **Datenbank verbinden:** im Vercel-Projekt *Storage → Create Database → Supabase* wählen, Region **Frankfurt (eu-central-1)**, mit dem Projekt verbinden. Die Integration setzt u. a. `POSTGRES_URL` und `POSTGRES_URL_NON_POOLING`.
5. **Demo-Daten einschalten:** *Settings → Environment Variables* → `SEED_DEMO_DATA` = `true`.
6. **Neu bauen:** *Deployments* → letztes Deployment → *Redeploy*.

## Weg B: Supabase-Projekt selbst anlegen

1. supabase.com → *New project* → Region **Central EU (Frankfurt)**, Datenbank-Passwort festlegen und notieren.
2. Im Supabase-Projekt oben auf **Connect** klicken und zwei Verbindungen kopieren (Platzhalter `[YOUR-PASSWORD]` jeweils ersetzen):
   - **Transaction pooler** (Port 6543) → wird `DATABASE_URL`
   - **Session pooler** (Port 5432) → wird `DIRECT_URL`
   Die „Direct connection“ nicht verwenden: Sie läuft nur über IPv6, das Vercel nicht unterstützt.
3. In Vercel das Repository importieren (wie Weg A, Schritt 1–2) und vor dem Deploy unter *Environment Variables* eintragen:

| Name | Wert |
|---|---|
| `DATABASE_URL` | Transaction-Pooler-Verbindung |
| `DIRECT_URL` | Session-Pooler-Verbindung |
| `SEED_DEMO_DATA` | `true` |

4. **Deploy** klicken.

## Danach

- Die Vorschau-Adresse steht im Vercel-Projekt (z. B. `spieliq-….vercel.app`).
- Ohne Konto: `/try`. Demo-Zugänge (öffentlich bekannt, nur Demo-Daten): Trainer `demo.trainer@spieliq.invalid` / `demo-trainer-2026`, Spieler `demo-falke-11` / `demo-spieler-2026`, Teamcode `DEMO-2026`.
- Jeder neue Push auf den Branch baut automatisch neu. Mit `SEED_DEMO_DATA=true` werden dabei die Demo-Daten zurückgesetzt; andere Daten bleiben unberührt (der Seed löscht nur Datensätze mit `isDemo`).
- Für echte Nutzung `SEED_DEMO_DATA` entfernen.

## Wenn der Build oder die Seite scheitert

| Meldung / Symptom | Ursache | Lösung |
|---|---|---|
| `Cannot resolve environment variable` oder „Keine Datenbankverbindung“ | Datenbank-Variablen fehlen | Weg A Schritt 4 oder Weg B Schritt 3, dann *Redeploy* |
| `P1001: Can't reach database server` beim Schritt `prisma migrate deploy` | Migrationsverbindung zeigt auf die IPv6-Direktverbindung | `DIRECT_URL` auf die **Session-Pooler**-Verbindung setzen |
| Fehler zu „prepared statement“ zur Laufzeit | Transaktions-Pooler verträgt eine Abfrage nicht | `DATABASE_URL` ebenfalls auf die Session-Pooler-Verbindung setzen |
| `self-signed certificate` / Zertifikatsfehler | Zertifikatsprüfung ohne Supabase-CA | `sslmode=require` in der Verbindung lassen (verschlüsselt, ohne Prüfung) oder das CA-Zertifikat aus Supabase (*Settings → Database → SSL Configuration*) als `DATABASE_CA_CERT` hinterlegen (dann wird geprüft) |
| Pakete `@spieliq/engine` o. Ä. nicht gefunden | Dateien außerhalb von `apps/web` nicht im Build | *Settings → Build and Deployment → Root Directory*: „Include files outside the root directory“ aktivieren |
| Probleme mit der pnpm-Version | Vercel wählt pnpm anhand der Lockfile | Umgebungsvariable `ENABLE_EXPERIMENTAL_COREPACK` = `1` setzen (nutzt pnpm 10.28 aus `package.json`) |

## Datenschutz-Hinweise zur Vorschau

- Supabase-Projekt und Vercel-Funktionen liegen in Frankfurt. Vercel und Supabase sind dennoch Anbieter mit US-Bezug; Auftragsverarbeitung und Drittlandübermittlung sind vor einem Echtbetrieb zu prüfen (Register D, D-51 [Hintergrundwissen]; [Offene Fragen](../recherche/offene-fragen.md), E-6).
- Produktions-Deployments sind bei Vercel öffentlich erreichbar; Suchmaschinen sind per `noindex` ausgeschlossen. Wer die Vorschau nicht öffentlich will, aktiviert in Vercel *Settings → Deployment Protection*.
- `sslmode=require` verschlüsselt, prüft das Serverzertifikat aber nicht. Für den Echtbetrieb `DATABASE_CA_CERT` setzen ([Sicherheit](../architektur/sicherheit.md)).
- Der Speicherfristen-Job (`db:retention`) läuft in der Vorschau nicht automatisch.
