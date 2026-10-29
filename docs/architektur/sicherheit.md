# Sicherheit, Authentifizierung und Berechtigungen

Stand: 29.10.2026 · Code: `apps/web/src/server/auth/*`, `server/policies.ts`, `next.config.ts`

## Authentifizierung

| Aspekt | Umsetzung |
|---|---|
| Kennungen | Erwachsene: E-Mail; Spieler: generierter Anmeldename (keine personenbezogenen Bestandteile) |
| Passwörter | scrypt (N = 2¹⁶, r = 8, p = 1), Salt je Passwort, zeitkonstanter Vergleich; Mindestlänge 8 (Spieler) / 10 (Erwachsene) |
| Sitzungen | 32-Byte-Zufallstoken im Cookie `spieliq_session` (HttpOnly, SameSite=Lax, Secure in Produktion); in der DB nur SHA-256-Hash; 30 Tage, gleitende Verlängerung |
| Anmeldedrosselung | 8 Fehlversuche in 15 min je Kennung → 15 min Sperre; einheitliche Fehlermeldung; Dummy-Hash bei unbekannten Konten (gegen Konto-Ausspähung) |
| Passwort vergessen | Spieler: Trainer setzt zurück (vorläufiges Passwort einmalig angezeigt, alle Sitzungen beendet). Erwachsene: E-Mail-Rücksetzung **noch nicht umgesetzt** |
| Teamcodes | 8 Zeichen aus 31 eindeutigen Zeichen (≈ 8,5 · 10¹¹), nur Hash gespeichert, 14 Tage gültig, begrenzte Nutzungen, neuer Code widerruft alte |

## Autorisierung

Jede Server Action und jedes Fachmodul prüft selbst (nie nur die Oberfläche):
- `requireTeamCoach` – Trainerrolle in der Mannschaft **oder** Owner/Admin der Organisation.
- `requireCoachOfPlayer` – zusätzlich: Spieler gehört zu dieser Mannschaft.
- Spieler sehen nur eigene Daten; es gibt keine Spieler-zu-Spieler-Ansichten und keine Nachrichtenfunktion.
- Server bewertet Eingaben neu, übernimmt nur steuerbare Spieler und begrenzt Koordinaten.
- Integrationstests prüfen fremde Trainer, Spieler mit Trainerfunktionen und Hausaufgaben für fremde Spieler.

## Plattform-Härtung

- Sicherheits-Header: CSP (`default-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`, …), `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy` (keine Kamera, kein Mikrofon, **kein Standort**), COOP.
- Server Actions: Next.js prüft Origin gegen Host (CSRF-Schutz).
- Keine Drittanbieter-Skripte, kein Tracking, Schriften selbst gehostet.

## Offene Härtungsmaßnahmen

1. **CSP für Skripte mit Nonces/Hashes** statt `'unsafe-inline'` (Nonces erzwingen dynamisches Rendern; Abwägung mit Cache Components).
2. **IP-basierte Ratenbegrenzung** am Reverse Proxy (Anmeldung, Teamcode-Einlösung) – Betriebsanforderung.
3. E-Mail-Verifikation und Passwort-Rücksetzung für Erwachsene; optional 2-Faktor für Vereins-Admins.
4. Sitzungsübersicht („überall abmelden“) im Profil.
5. Sicherheitsüberprüfung vor Echtbetrieb (Penetrationstest), Abhängigkeits-Scans in CI.
6. Backups/Verschlüsselung im Ruhezustand beim Hoster (EU-Region), Auftragsverarbeitungsvertrag.
