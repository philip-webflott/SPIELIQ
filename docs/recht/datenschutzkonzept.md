# Datenschutz- und Kinderschutzkonzept

Stand: 29.10.2026 · Grundlage: [Register D](../recherche/quellen/D-recht-datenschutz-barrierefreiheit.md) · Status: **Entwurf, anwaltlich nicht geprüft**

> **Keine Rechtsberatung, keine Konformitätsaussage.** Dieses Dokument beschreibt, wie SPIELIQ Daten von Kindern und Jugendlichen verarbeitet und schützt, und benennt offene Rechtsfragen. Es behauptet nicht, dass SPIELIQ rechtskonform ist. Vor einem Echtbetrieb müssen die Punkte in Abschnitt 10 von einer Anwältin oder einem Anwalt (Datenschutz-, Jugendmedienschutz-, IT-Recht) geprüft werden. Viele EU-Quellen (u. a. der DSGVO-Volltext auf EUR-Lex, EDPB-Leitlinien, WCAG) waren gesperrt und sind in Register D nur als Hintergrundwissen [HW] geführt.

## 1. Grundsätze

1. **Datensparsamkeit:** nur Daten, die für Lernen und Trainerbegleitung nötig sind; keine Daten „auf Vorrat“.
2. **Kindeswohl vor Engagement:** keine Mechanismen, die Kinder zum Weiterspielen drängen (D-05, D-15; [HW] D-40, D-42, D-43).
3. **Keine Öffentlichkeit:** keine öffentlichen Profile, keine Ranglisten, keine Indexierung (D-04, D-18; [HW] D-34).
4. **Keine Eins-zu-eins-Kommunikation zwischen Erwachsenen und Kindern** (D-17, D-18, D-19).
5. **Transparenz in kindgerechter Sprache** (D-27; [HW] D-29 Art. 12).
6. **Lernstand ist kein Auswahlkriterium** (D-49 [HW], Architekturprinzip 15 in Register D).

## 2. Betriebsmodus und Rollen

| Modus | Verantwortlich (voraussichtlich) | Stand |
|---|---|---|
| **Vereinsmodus** (Verein/Fußballschule → Mannschaft → Spieler:innen über Teamcode) | Verein als Verantwortlicher, SPIELIQ als Auftragsverarbeiter (Art. 28 DSGVO) – oder gemeinsame Verantwortung, weil SPIELIQ Inhalte und Bewertungslogik bestimmt (offene Rechtsfrage) | umgesetzt (Mandantentrennung über Organisation → Mannschaft) |
| **Gastmodus** (`/try`) | keine personenbezogene Verarbeitung: nichts wird gespeichert, kein Cookie | umgesetzt |
| **Direktnutzung (B2C)** | SPIELIQ als Verantwortlicher | nicht umgesetzt (Entscheidung E-1 in [Offene Fragen](../recherche/offene-fragen.md)) |

## 3. Welche Daten verarbeitet werden

Schema: `apps/web/prisma/schema.prisma`. Kein Feld für Geburtsdatum, Adresse, Telefon, Fotos, Standort oder Gesundheit.

| Daten | Wer | Zweck | Sichtbar für | Speicherdauer |
|---|---|---|---|---|
| Anzeigename (Spitzname), generierter Anmeldename, Passwort-Hash (scrypt) | Spieler:in | Anmeldung, Anzeige in der eigenen Mannschaft | Spieler:in, Trainer:innen der Mannschaft | bis zur Löschung des Kontos |
| Name, E-Mail, Passwort-Hash | Erwachsene (Trainer:innen) | Anmeldung, Verwaltung | eigene Organisation | bis zur Löschung des Kontos |
| Organisation, Mannschaft (Name, Altersklasse, Saison), Rolle, Lernniveau | alle | Mandant, Altersrahmen, Berechtigungen | Mitglieder der Organisation/Mannschaft | bis zur Löschung |
| Teamcode | Trainer:in | Beitritt | niemand (nur Hash gespeichert, Code einmal angezeigt) | 14 Tage gültig |
| Einwilligungsnachweise (Datenschutzhinweis zur Kenntnis genommen; Bestätigung der Trainer:in, dass Einwilligungen der Sorgeberechtigten dem Verein vorliegen) | Spieler:in | Nachweis | Spieler:in (Auskunft) | mit dem Konto |
| Versuche: Mission, Schritt, Bewertung, Kriterienergebnis, Prinzipien, Zahl der Tipps | Spieler:in | Lernstand, Feedback, Problemfelder der Mannschaft | Spieler:in, Trainer:innen der Mannschaft (nur Datum, keine Uhrzeit) | mit dem Konto |
| Versuchsdetails: Eingabe (Positionen bzw. Auswahl) und Bearbeitungsdauer | Spieler:in | serverseitige Bewertung, Fehleranalyse | niemand in der Oberfläche; Auskunft an Spieler:in | **30 Tage**, dann entfernt (`server/modules/retention.ts`) |
| Missionsfortschritt, Hausaufgaben (Missionen, Termin, Zielgruppe) | Spieler:in / Trainer:in | Lernpfad, Hausaufgaben | Spieler:in, Trainer:innen | mit Konto bzw. Mannschaft |
| Trainerbeobachtung „auf dem Platz“ (Prinzip, Stufe, Datum, kurze sachliche Notiz ≤ 280 Zeichen) | Trainer:in über Spieler:in | Status „auf dem Platz angewendet“ | Trainer:innen der Mannschaft; Spieler:in (Auskunft) | mit dem Konto |
| Sitzung (nur SHA-256-Hash des Tokens, Ablauf) | alle | angemeldet bleiben | niemand | 30 Tage gleitend; abgelaufene werden gelöscht |
| Anmeldedrosselung (Hash der Kennung, Fehlversuche, Sperre; **keine IP-Adresse**) | alle | Schutz vor Durchprobieren | niemand | 24 Stunden nach Beginn des Zählfensters, sofern keine Sperre mehr aktiv ist |
| Audit-Ereignisse (Aktion, Ziel-ID, Zeitpunkt; keine Inhalte) | Erwachsene | Nachvollziehbarkeit sicherheitsrelevanter Aktionen | Betrieb | 12 Monate |

## 4. Sichtbarkeit (umgesetzt)

| Wer | sieht |
|---|---|
| Spieler:in | eigene Missionen, eigenen Lernstand, eigene Hausaufgaben; **keine** Daten anderer Spieler:innen, keine Ranglisten |
| Trainer:innen der Mannschaft | Lernstand je Spieler:in (bearbeitet / digital verstanden / auf dem Platz), Versuche mit Datum (ohne Uhrzeit, ohne Nutzungsdauer), Problemfelder der Mannschaft, Hausaufgabenstand; Reihenfolge des Beitritts, keine Rangfolge; Hinweis „kein Kriterium für Kader- oder Einsatzentscheidungen“ |
| Owner/Admin der Organisation | alle Mannschaften der Organisation |
| andere Organisationen | nichts (Mandantentrennung, Integrationstests) |
| Öffentlichkeit, Suchmaschinen | nichts (`noindex` für die ganze Anwendung; geschützte Bereiche leiten zur Anmeldung) |

## 5. Beitritt, Einwilligung und Information

- **Teamcode:** 8 Zeichen aus 31 eindeutigen Zeichen, nur Hash gespeichert, 14 Tage gültig, begrenzte Nutzungen, neuer Code widerruft alte ([Sicherheit](../architektur/sicherheit.md)).
- **Unter 16 (G–C sowie B-Jugend):** Ein Teamcode lässt sich nur erstellen, wenn die Trainer:in bestätigt, dass dem Verein die Einwilligungen der Sorgeberechtigten vorliegen; beim Beitritt wird das als Nachweis gespeichert (`GUARDIAN_CONSENT`, Methode „verein-bestaetigt-bei-einladung“). Ob dieser Nachweis genügt, ist offen (D, Tabelle 3, „Art. 8 im Vereinsmodus“).
- **G- und F-Jugend:** keine Spielerkonten; für diese Mannschaften lassen sich keine Teamcodes erstellen. Trainer:innen nutzen dort den Gastmodus gemeinsam mit der Gruppe.
- **Kindgerechte Hinweise:** `/privacy/kids` (kurze Sätze) und `/privacy` (Erwachsene); beim Beitritt werden die Hinweise zur Kenntnis genommen (`PRIVACY_NOTICE`, Version `2026-10-entwurf-1`). Die Texte sind als **Entwurf** gekennzeichnet.
- **Spielerkonten** enthalten keine E-Mail-Adresse; vergessene Passwörter setzt die Trainer:in zurück (vorläufiges Passwort, alle Sitzungen werden beendet).

## 6. Speicherfristen und Löschung

| Regel | Stand |
|---|---|
| Konto löschen (Spieler:in selbst, mit Passwort): sofort, mit allen Lernergebnissen, Beobachtungen, Einwilligungsnachweisen und Sitzungen (Kaskade) | umgesetzt, getestet |
| Spieler:in aus der Mannschaft entfernen: gehört das Konto keiner anderen Mannschaft an, wird es mit allen Lernergebnissen gelöscht (Bestätigung erforderlich) | umgesetzt, getestet |
| Trainer:innen mit Mannschaften können ihr Konto erst nach Löschen oder Übergeben der Mannschaften löschen | umgesetzt (Übergabe noch nicht) |
| Versuchsdetails (Eingabe, Dauer) nach 30 Tagen entfernen; abgelaufene Sitzungen, Drosselungseinträge und Audit-Ereignisse nach 12 Monaten löschen | umgesetzt als Job `pnpm --filter @spieliq/web db:retention`; **Ausführung im Betrieb (täglich) noch einzurichten** |
| Löschung nach Inaktivität (Vorschlag: 24 Monate), Saisonarchive nur aggregiert, Altersübergänge (16, 18) | geplant; Fristen rechtlich zu klären |
| Backups mit Ablauf | Betriebsanforderung beim Hoster |

## 7. Betroffenenrechte

- **Auskunft/Datenübertragbarkeit:** „Meine Daten herunterladen (JSON)“ im Profil (`/api/account/export`), ohne Passwort-Hashes.
- **Löschung:** im Profil (siehe Abschnitt 6).
- **Berichtigung:** Anzeigename im Profil selbst ändern (für Spieler:innen gelten die Spitzname-Regeln, Hinweis „nicht deinen vollen Namen“).
- **Widerruf/Widerspruch:** derzeit über Verein bzw. Trainer:in; Selbstbedienung und Weiterleitung an den Verein geplant.

## 8. Speicher-Inventar im Browser (§ 25 TDDDG)

| Speicherung | Zweck | Erforderlich? |
|---|---|---|
| Cookie `spieliq_session` (HttpOnly, SameSite=Lax, Secure in Produktion), 30 Tage | angemeldet bleiben | ja, für den ausdrücklich gewünschten Dienst (Anmeldung) |
| – | Gastmodus | keine Speicherung |

Keine weiteren Cookies, kein `localStorage`, kein Service Worker, keine Analyse- oder Tracking-Werkzeuge, keine Werbe-IDs, keine Drittanbieter-Skripte; Schriften sind selbst gehostet; die Vorlesefunktion nutzt nur lokal installierte Stimmen des Geräts. Content-Security-Policy und Permissions-Policy (keine Kamera, kein Mikrofon, kein Standort) siehe [Sicherheit](../architektur/sicherheit.md). Eine künftige Offline-Funktion (PWA) wird in dieses Inventar aufgenommen.

## 9. Kinderschutz im Produkt

- Keine Chats, keine Direktnachrichten, keine Kommentare zu einzelnen Spieler:innen. Hausaufgaben sind strukturierte Aufgaben (Missionen, Termin, kurze Notiz), sichtbar für die Mannschaft bzw. die Zielgruppe.
- Trainerbeobachtungen sind kurz und sachlich (≤ 280 Zeichen) und in der Auskunft für die Spieler:in sichtbar; keine Gesundheits- oder Verhaltensnotizen (Hinweis in der Oberfläche).
- Seite **„Hilfe & Melden“** (`/help`): Vertrauensperson, Nummer gegen Kummer (116 111), Kinderschutz-Anlaufstellen von DFB und Landesverbänden, Notruf. Die Meldewege werden vor dem Echtbetrieb mit Vereinen und Landesverbänden abgestimmt.
- Keine Ranglisten, keine Streaks, keine Kaufaufforderungen, keine Push-Benachrichtigungen, keine nächtlichen Nachrichten (es gibt derzeit keine Benachrichtigungen).
- Die Trainerrolle entsteht über die Registrierung eines Vereins bzw. die Organisation; die Prüfung der Eignung (z. B. erweitertes Führungszeugnis nach § 72a SGB VIII) bleibt Aufgabe des Vereins (D-07, D-08, D-20). Geplant: Trainerrolle nur durch den Vereins-Admin vergeben.

## 10. Vor dem Echtbetrieb zu erledigen

**Rechtlich zu klären** (Register D, Tabelle 3): Rollenverteilung Verein ↔ SPIELIQ; Rechtsgrundlage je Altersgruppe; Art. 8 DSGVO im Vereinsmodus und Nachweis der Elterneinwilligung; Einwilligungsfähigkeit 14- bis 15-Jähriger; Speicherfristen und Altersübergänge; Elternrechte ab 16; DSA-Einordnung; Reichweite des BFSG; Hinweise auf Kindeswohlgefährdung über die Meldefunktion.

**Dokumente:** Datenschutz-Folgenabschätzung (voraussichtlich erforderlich: Bewertung von Lernständen, Kinder als Betroffene); Verzeichnis der Verarbeitungstätigkeiten; Vorlage für den Auftragsverarbeitungsvertrag mit Vereinen inklusive TOM-Anlage und Liste der Unterauftragsverarbeiter; endgültige Datenschutzhinweise (Kinder je Altersband, Eltern, Vereine); Benennung einer oder eines Datenschutzbeauftragten, falls die DSFA-Pflicht bejaht wird (§ 38 BDSG, D-09); Leitfaden „SPIELIQ im Schutzkonzept des Vereins“.

**Technik und Betrieb:** EU-Hosting und Verschlüsselung im Ruhezustand; täglicher Retention-Job; Beitritt mit Freigabe durch die Trainer:in (Empfehlung D, Architekturprinzip 3); E-Mail-Verifikation und Passwort-Rücksetzung für Erwachsene; Mehr-Faktor-Anmeldung für Trainer:innen und Admins; Ansicht „Wer sieht was?“ für Kinder; Notfallprozess für Datenpannen (72 Stunden) mit Information der Vereine; Penetrationstest.
