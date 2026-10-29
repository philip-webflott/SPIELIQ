# Barrierefreiheit

Stand: 29.10.2026 · Grundlage: [Register D](../recherche/quellen/D-recht-datenschutz-barrierefreiheit.md) (Abschnitt „Barrierefreiheitsanforderungen an das Spielfeld“) · Gestaltung: [Designsystem](../design/designsystem.md)

> **Keine Konformitätsaussage.** Ziel ist WCAG 2.2 Stufe AA für die gesamte Anwendung. Eine formale Prüfung (Audit, Tests mit Hilfsmitteln und mit Kindern mit Behinderungen) hat noch nicht stattgefunden. Die WCAG-Inhalte in Register D sind Hintergrundwissen [HW], weil w3.org gesperrt war.

## 1. Rechtlicher Rahmen (Einordnung, nicht abschließend)

- **BFSG/BFSGV:** gilt für Dienstleistungen im elektronischen Geschäftsverkehr gegenüber Verbraucher:innen ab 28.06.2025 (außer Kleinstunternehmen) – relevant, sobald SPIELIQ ein B2C-Abo anbietet (D-10, D-11). Ob es nur die Bestellstrecke oder die ganze Lernplattform erfasst und ob es im Vereinsmodus (B2B) greift, ist offen (D, Tabelle 3).
- **BITV 2.0:** gilt für öffentliche Stellen, nicht für SPIELIQ als privaten Anbieter (D-12).
- **Inklusion:** Unabhängig von Pflichten soll SPIELIQ jungen Menschen mit Behinderungen zugänglich sein (D-07, § 11 SGB VIII; Empfehlung in D, Tabelle 2).

## 2. Umsetzungsstand

| Bereich | WCAG 2.2 [HW] | Umsetzung in SPIELIQ | Stand |
|---|---|---|---|
| Ziehen ohne Ziehen | 2.5.7 (AA) | Figur antippen, dann Zielpunkt antippen; alternativ Tastatur | umgesetzt, E2E-Test „Antippen statt Ziehen“ |
| Tastatur | 2.1.1, 2.1.2, 2.4.3, 2.4.7, 2.4.11 | Figuren per Tab erreichbar; Pfeiltasten verschieben um 1 m (Umschalt: 0,25 m, Alt: 5 m); Enter/Leertaste wählt aus, Esc bricht ab; sichtbarer Fokusring (3 px, Akzentfarbe; auf dem Feld gestrichelter Ring); Link „Zum Inhalt springen“ | umgesetzt |
| Zeigergesten | 2.5.1, 2.5.2 | keine Mehrfinger- oder Pfadgesten; Aktion beim Loslassen, beim Ziehen hebt sich die Figur über den Finger (Touch) | umgesetzt; Rückgängig-Funktion geplant |
| Zielgröße | 2.5.8 (AA) | Trefferfläche der Figuren größer als die Grafik (etwa 2,1-facher Radius); Buttons standardmäßig 44 px hoch, kleine Buttons 36 px (AA-Mindestmaß 24 px) | umgesetzt |
| Farbe nicht allein | 1.4.1 (A) | Gegner mit Doppelrand, eigene Spieler mit hellem Rand, „DU“-Markierung; Passwege: durchgezogen + Pfeil (offen), gestrichelt + „!“ (riskant), gepunktet + „✕“ (zu); Bewertung immer mit Text und Symbol | umgesetzt |
| Kontrast | 1.4.3, 1.4.11 (AA) | Texte ≥ 4,5 : 1, grafische Elemente auf dem Rasen ≥ 3 : 1 (rechnerisch geprüft, Werte im Designsystem) | umgesetzt; Hochkontrast-Thema geplant |
| Bewegung | 2.2.2, 2.3.1, 2.3.3 | `prefers-reduced-motion` wird beachtet, zusätzlich eigener Schalter „Bewegung reduzieren“ in jeder Mission (zeigt Endbilder statt Animation); Animationen pausierbar, wiederholbar, Zeitlupe 0,5×; keine Blitze | umgesetzt |
| Zeitlimits | 2.2.1 (A) | derzeit keine Zeitlimits; geplante Zeitentscheidungen nur optional, abschaltbar, für jüngere Altersbänder standardmäßig aus | Vorgabe für künftige Einheiten |
| Struktur, Namen, Statusmeldungen | 1.1.1, 1.3.1, 4.1.2, 4.1.3 | Figuren mit zugänglichen Namen (Nummer, Mannschaft, Torwart, „Du kannst diesen Spieler bewegen“); Feedback und Konsequenzen in `aria-live`-Bereichen; Überschriftenstruktur, `lang="de"` | umgesetzt; Text- bzw. Listenansicht der Spielsituation für Screenreader geplant |
| Anweisungen | 1.3.3, 3.3.1, 3.3.3 | Aufgaben nennen Nummern und Rollen statt nur Farben oder Positionen; Feedback nennt die Ursache und einen Tipp | umgesetzt (Content-Regel) |
| Ausrichtung und Zoom | 1.3.4, 1.4.4, 1.4.10 | Hoch- und Querformat mit gleicher Spiellogik (eigene Projektion); responsives Layout; Spielfeld skaliert mit | umgesetzt; Test mit 200–400 % Zoom ausstehend |
| Bewegungssteuerung | 2.5.4 | keine Gerätebewegung als Eingabe | umgesetzt |
| Anmeldung und Teamcode | 3.3.7, 3.3.8; § 19 BFSGV | kein CAPTCHA, kein kognitiver Test; Einfügen erlaubt; Passwortmanager funktionieren; Teamcode unempfindlich gegen Groß-/Kleinschreibung und Bindestrich | umgesetzt; QR-Code/Link geplant |
| Sprache | 3.1.1, 3.1.5 | kurze Sätze (≤ 140 Zeichen je Anweisung), Spielersprache; optionale Vorlesefunktion mit lokalen Gerätestimmen | umgesetzt |
| Medien | 1.2.2, 1.2.5 | keine Videos; Animationen sind selbst erzeugte Grafiken mit Texterklärung | entfällt derzeit |

## 3. Prüfplan

1. Automatisierte Prüfung (axe) in den E2E-Tests für alle Seiten (geplant).
2. Manuelle Prüfung mit VoiceOver (iOS/macOS), TalkBack, NVDA, nur Tastatur, Switch-Steuerung, Zoom 200–400 %, Simulation von Farbsehschwächen.
3. Nutzertests mit Kindern und Jugendlichen, auch mit Behinderungen (mit Einwilligung der Eltern).
4. Barrierefreiheitsinformation nach Anlage 3 BFSG erstellen, sobald ein B2C-Angebot entsteht.

## 4. Bekannte Lücken

- Keine Textansicht der Spielsituation (für blinde Nutzer:innen ist das Spielfeld derzeit nur über die Namen der Figuren erschließbar).
- Kein Hochkontrast-Thema, keine Rückgängig-Funktion beim Platzieren.
- Keine Prüfung mit echten Hilfsmitteln und Nutzer:innen.
