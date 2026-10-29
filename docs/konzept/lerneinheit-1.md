# Lerneinheit 1: „Warum laufen wir nicht alle zum Ball?“

Stand: 29.10.2026 · Status aller Missionen: `review` (fachliche Freigabe durch lizenzierte Jugendtrainer:in ausstehend) · Code: `packages/content/src/missions/nicht-alle-zum-ball/`

**Zielgruppe:** Einsteiger und C-Jugendliche mit Defiziten bei Raumverständnis, Stellungsspiel und gemeinsamem Verteidigen; einsetzbar D–B.
**Dauer:** ca. 20 Minuten gesamt, je Mission 2–5 Minuten – gedacht für mehrere kurze Sitzungen.
**Leitfrage:** Was passiert, wenn alle zum Ball laufen – und was hat jeder stattdessen zu tun?

## Didaktischer Bogen

| # | Mission | Rolle | Prinzipien | Interaktion |
|---|---|---|---|---|
| 1 | Das Problem erkennen | Einstieg | Nicht alle zum Ball, freie Räume erkennen | zuschauen → freien Gegner antippen → Konsequenz → bessere Lösung |
| 2 | Abstand halten | Übung (mit Ball) | Abstand, anspielbar sein, Breite & Tiefe, Dreieck | 3 Mitspieler verteilen (Live-Passwege) |
| 3 | Wer übernimmt welche Aufgabe? | Übung (gegen Ball) | Stellen, Absichern, nicht alle | 2. Verteidiger positionieren |
| 4 | Der Ball wechselt die Seite | Übung (gegen Ball) | Verschieben, Stellen, Absichern, Mitte | Viererkette nach Verlagerung verschieben |
| 5 | Neue Spielsituation | Transfer | alle Rollen | 3 Verteidiger in zwei neuen Lagen verteilen |
| 6 | Abschlusstest | Test | alle | 4 neue Situationen ohne Hilfen |

Mission 2 behandelt das Prinzip mit Ball (Abstand schafft Anspielstationen), Missionen 3–5 gegen den Ball (Aufgabenverteilung statt Rudel). So lernt der Spieler, dass „nicht alle zum Ball“ in beiden Spielphasen gilt – je Bildschirm bleibt es bei **einem** Lernziel.

## Mission 1 – Das Problem erkennen

- **Situation:** Gegner 9 dribbelt auf unserer Außenbahn. Die blauen Spieler 3, 4 und 6 laufen alle zum Ball. Nummer 7 des Gegners steht danach frei vor dem Strafraum.
- **Schritte:** (1) Animation mit Pause/Zeitlupe; am Ende rote Ringe um die drei Zuläufer und „FREI“-Zone. (2) „Tippe auf den Gegner, der jetzt frei ist“ (Auswahl 7, 10, 8). (3) Konsequenz: Pass auf 7, Torchance. (4) Bessere Lösung als Animation: einer stellt, einer sichert, einer bleibt bei 7.
- **Bewertung:** `selectFree` (most-free) – „frei“ heißt: Passweg nicht zugestellt **und** ≥ 0,8 s Zeit nach der Annahme. Nummer 10 ist durch den Deckungsschatten von 3 zugestellt, Nummer 8 ist gedeckt. Raterate 33 %.
- **Transfer:** Spielform „4 gegen 4 auf vier Minitore – Einer geht, einer sichert“; Beobachtungsauftrag fürs Training.

## Mission 2 – Abstand halten (mit Ball)

- **Situation:** Nummer 6 hat den Ball im Mittelfeld, seine drei Mitspieler kommen alle zu ihm. Zwei Gegner können so alle stören; das Feld bleibt leer.
- **Aufgabe:** Nummern 7, 8, 10 so ziehen, dass Nummer 6 **jeden** sicher anspielen kann. Im Lernmodus zeigen Live-Passwege beim Ziehen sofort offen/riskant/zu.
- **Kriterien (alle Pflicht außer Dreieck):** Passdistanz 7–20 m (bis 26 m Toleranz), Mindestabstand untereinander inkl. Ballführendem ≥ 9 m (ab 4 m Teilpunkte), 3 offene Passwege, Breite ≥ 20 m und Tiefe ≥ 12 m; Dreieck als Bonus.
- **Mehrere Lösungen:** z. B. Raute mit Rückpassoption (Musterlösung) oder breiter und weiter vorne. Rückpassoptionen zählen ausdrücklich als Tiefe.
- **Typische Fehler und Rückmeldung:** alle bleiben beim Ball („Nummer 8 steht mit 2 m zu nah am Ball …“), alle auf einer Linie („Nutzt die Tiefe …“), viel zu weit weg („… zu weit für einen sicheren Pass“).
- **Zufallsschutz:** zufällige Platzierung besteht in ≈ 1–2 % der Fälle.
- **Transfer:** „4 gegen 2 im Quadrat“, „3 gegen 1 im Dreieck“.

## Mission 3 – Wer übernimmt welche Aufgabe? (1. und 2. Verteidiger)

- **Situation:** Gegner 9 dribbelt auf das Tor zu, Gegner 10 lauert im Halbfeld. Nummer 3 stellt, Nummer 4 läuft zunächst auch zum Ball.
- **Aufgabe:** Nummer 4 dorthin ziehen, wo sie/er Nummer 3 absichert.
- **Kriterien:** `cover` (tiefer gestaffelt 1,5–6,5 m, Abstand 3,5–8 m, Staffelung bis 65°, bevorzugt innen), `reachInTime` (wird 10 angespielt, rechtzeitig da), `crowding` (nicht beide am Ball).
- **Alternative (gut, mit Erklärung):** Nummer 10 eng und torseitig decken – „verhindert den Pass, aber wird Nummer 3 ausgespielt, ist niemand mehr dahinter“.
- **Typische Fehler:** flach daneben („Wird er ausgespielt, seid ihr beide weg“), zu tief („… zu weit, um zu helfen“), am Ball.
- **Transfer:** „2 gegen 2 auf zwei Tore – Stellen und Absichern“ (vgl. DFB-Trainingsblatt 2 gegen 2 plus Rückraum für D/C, A-51).

## Mission 4 – Der Ball wechselt die Seite (ballorientiertes Verschieben)

- **Situation:** Spielverlagerung von der einen auf die andere Seite; die Viererkette steht noch auf der alten Seite.
- **Aufgabe:** alle vier verschieben. Rollen werden **nicht** vorgegeben: Wer am nächsten am neuen Ballführenden ist, stellt; der Zweitnächste sichert.
- **Kriterien:** Stellen (1,5–4,5 m), nicht mehr als zwei direkt am Ball, Absicherung (Kette: 5–12 m), Lücken ballnah ≤ 9 m ideal / ≤ 15 m, ballfern ≤ 14 / ≤ 21 m, Verschiebefaktor 35–90 % der seitlichen Ballposition, zwei Spieler im Zentrum vor dem Tor, Stürmer kontrolliert, niemand überspielt.
- **Ausdrücklich nicht verlangt:** gleiche Abstände, eine starre Linie. Beispiel „ungleiche Abstände, trotzdem gut“ ist Teil der Tests.
- **Fachliche Basis:** DFB-Trainingsblatt „Verschieben zum Ball“ (Kettenabstände bei Verlagerung nicht zu groß werden lassen, A-50), TPD: Verschieben, Herausrücken, Absichern spätestens ab D-Junioren (A-87), FIFA-Stufen des Zonenverteidigens (B-01).
- **Transfer:** „Verschiebe-Spiel 4 gegen 4 mit Seitenzonen“.

## Mission 5 – Neue Spielsituation (Transfer)

- **Lage A (Halbraum):** Drei Blaue stehen zusammen am Ballführenden. Aufgaben selbst verteilen: stellen, absichern, Balance (der ballfernste Spieler kontrolliert Nummer 9 vor dem Tor – unabhängig davon, ob der Passweg gerade im Schatten liegt).
- **Lage B (andere Seite):** Flügel, andere Gegnerverteilung.
- **Didaktik:** Rollen ergeben sich aus der Position, nicht aus Trikotnummern → geprüft wird das Prinzip, nicht eine auswendig gelernte Kreisposition. Ein weit entfernter Flügelspieler darf offen bleiben (ballferner Raum ist weniger gefährlich als das Zentrum).
- **Typische Fehler:** alle bleiben am Ball; der dritte Spieler deckt den Flügelspieler statt Nummer 9; Absicherung zu weit weg.

## Mission 6 – Abschlusstest

Vier neue Situationen (andere Spielfeldseite, andere Abstände, ohne Tipps, ohne Live-Passwege, ohne Musterlösung): freien Gegner erkennen · Dreieck bilden · absichern · Kette verschieben. Jede Aufgabe wird einmal bewertet; die Zusammenfassung zeigt je Prinzip „sicher“ oder „üben“. Zusammen mit Mission 5 entsteht daraus der Status „digital verstanden“ (siehe [Lernsystem](lernsystem.md), Abschnitt 4).

## Qualitätssicherung

Alle Missionen erfüllen die automatischen Prüfungen ([Engine](engine.md), Abschnitt 8): dokumentierte richtige und falsche Beispiele, Musterlösung „stark“, Zufallsschutz, Raterate ≤ 50 %, Spiegelinvarianz. Kennzahlen je Aufgabe: [../qualitaet/content-report.md](../qualitaet/content-report.md).

## Offene fachliche Punkte (für die Trainerprüfung)

1. Sind die Abstandsbänder (Stellen 1,5–4,5 m auf dem Flügel, Absichern 3,5–8 m, Kettenlücken) für C-Jugend auf dem Großfeld plausibel?
2. Soll in Mission 4 eine Variante mit Dreierkette folgen (viele C-Jugenden spielen keine Viererkette)?
3. Soll Lenken (nach außen/innen) in einer Folgemission bewertet werden – und mit welcher Kontextregel?
4. Ist die Balance-Rolle („ballfernster Spieler kontrolliert den Zentrumsstürmer“) für Einsteiger verständlich genug formuliert?
