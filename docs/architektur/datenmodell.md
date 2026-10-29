# Datenmodell

Stand: 29.10.2026 · Schema: `apps/web/prisma/schema.prisma` · Migration: `prisma/migrations/*_init`

## Grundsätze

- **Datensparsam:** Spielerkonten ohne E-Mail, ohne Geburtsdatum, ohne Klarnamenpflicht (Spitzname + generierter Anmeldename). Alter nur über die Altersklasse der Mannschaft.
- **Mandantentrennung:** Organisation (Verein, Fußballschule, Akademie) → Mannschaften → Mitgliedschaften mit Rollen.
- **Inhalte im Code, Ergebnisse in der Datenbank:** Missionen sind versioniert im Content-Paket; Versuche speichern Missions-ID + Version + Eingabe.
- **Reproduzierbarkeit:** Jeder Versuch enthält die Eingabe, aus der der Server die Bewertung berechnet hat.
- **Löschbarkeit:** Löschen eines Spielers kaskadiert auf Versuche, Fortschritt, Einwilligungen, Beobachtungen und Sitzungen.

## Entitäten

| Entität | Zweck | Wichtige Felder |
|---|---|---|
| `User` | Konto (Erwachsene oder Spieler) | `kind`, `displayName`, `email?` (nur Erwachsene), `loginName?` (nur Spieler), `passwordHash`, `isDemo` |
| `Session` | Anmeldung | `id` = SHA-256 des Tokens, `expiresAt` |
| `LoginThrottle` | Schutz vor Durchprobieren | Hash der Kennung, Fehlversuche, Sperre (keine IP) |
| `Organization` / `OrgMembership` | Verein und Vereinsrollen | `kind`, `role` (OWNER/ADMIN/COACH) |
| `Team` / `TeamMembership` | Mannschaft, Rollen, Lernniveau | `ageGroup`, `role` (HEAD_COACH/ASSISTANT_COACH/PLAYER), `level` |
| `Invitation` | Teamcode | `codeHash`, `codeHint`, `expiresAt` (14 Tage), `maxUses`, `guardianConsentConfirmedAt` |
| `ConsentRecord` | Nachweis Datenschutzhinweis / Einwilligung Sorgeberechtigte | `kind`, `version`, `method`, `recordedById` |
| `Attempt` | Bewertungsversuch | `missionId`, `missionVersion`, `stepId`, `answer` (JSON), `rating`, `score`, `principles` (JSON), `criteria` (JSON), `hintsUsed`, `assignmentId?` |
| `MissionProgress` | Missionsstatus je Spieler | `status`, `bestRating`, `attempts`, `hintsUsed` |
| `Assignment` | Hausaufgabe | `missionIds[]`, `dueAt?`, `estimatedMinutes`, `note?`, `targetUserIds[]` |
| `FieldObservation` | Trainerbeobachtung „auf dem Platz“ | `principleId`, `rating`, `observedOn`, `note?` (≤ 280 Zeichen) |
| `CustomScenario` | Szenarien aus dem Editor (geplant) | `data` (Szenarioformat v1), `status` |
| `AuditEvent` | Protokoll sicherheits-/datenschutzrelevanter Aktionen | `action`, `targetType`, `targetId` (keine Inhalte) |

## Abgeleitete Werte

Kompetenzzustände (bearbeitet / digital verstanden / angewendet) werden nicht gespeichert, sondern aus `Attempt` und `FieldObservation` mit den Regeln in `packages/content/src/progress-rules.ts` berechnet. So bleiben Regeln änderbar, ohne Daten zu migrieren.

## Aufbewahrung (Vorschlag, rechtlich zu prüfen)

- Versuche: solange das Konto besteht; Vorschlag: automatische Löschung von Versuchsdetails nach 24 Monaten Inaktivität.
- Sitzungen: 30 Tage gleitend; abgelaufene werden beim Zugriff entfernt.
- Audit-Ereignisse: 12 Monate.
- Demo-Daten: nur lokal/Staging, nie in Produktion (`isDemo`).
