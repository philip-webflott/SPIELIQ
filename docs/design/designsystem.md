# Designsystem „Matchday“

Stand: 29.10.2026 · Code: `apps/web/src/app/globals.css` (Tokens), `apps/web/src/components/ui/*`, `packages/pitch`

**Richtung:** Premium Sports Gaming + Interactive Education. Dunkles Navy als Bühne, das Spielfeld als Held, ein frisches Sportgrün als einzige Akzentfarbe. Klar, ruhig, hochwertig – weder Schulwebsite noch Neon-Gaming. Für 12-jährige Einsteiger ebenso wie für 17-jährige Leistungsspieler: einfache Oberfläche, Tiefe auf Abruf.

## 1. Farben

| Token | Wert | Verwendung |
|---|---|---|
| `ink-900` | #0A0F1C | Hintergrund |
| `ink-800` / `ink-700` / `ink-600` | #121A2E / #18223A / #202C49 | Karten, Flächen, Eingaben |
| `line` / `line-strong` | #263252 / #34436A | Trennlinien, Rahmen |
| `text` / `text-muted` / `text-faint` | #E9EEF7 / #A5B1C8 / #8592AD | Text (Kontrast auf ink-900: 16,4 : 1 / 8,9 : 1 / 6,1 : 1; auf Karten ink-800 mind. 5,5 : 1) |
| `accent` | #3BD671 | primäre Aktion, Fortschritt, „gut“ |
| `own` (Team) | #4AA3FF, Rand #EAF4FF (Rand zu Rasen 5,9 : 1) | eigene Spieler |
| `opp` (Team) | #FF8A3D, dunkler Innenrand #4A1D00, heller Außenrand #FFE3CC (zu Rasen 5,3 : 1) | Gegner |
| `warn` / `bad` / `info` | #FFC53D / #FF5D73 / #9ECBFF | riskant / Problem / Hinweis (UI-Flächen) |
| `lane-open` / `lane-blocked` | #F4FBFF / #FFA3B0 | Passwege auf dem Rasen (6,2 : 1 / 3,5 : 1; zusätzlich dunkle Unterlegung und Symbol) |
| `pitch` | #1D6B3F mit Mähstreifen 3,5 % Weiß | Rasen |
| `free-space` | #FFD84D | freier Raum, „FREI“ |

**Kontraste** wurden rechnerisch geprüft (WCAG-Formel): Texte ≥ 4,5 : 1, grafische Elemente auf dem Rasen ≥ 3 : 1 (WCAG 1.4.3 / 1.4.11). Die Füllfarben der Figuren allein erreichen auf Grün nur ca. 2,5–2,8 : 1 – deshalb tragen helle Ränder die Formerkennung.

**Farbsehschwächen:** Blau ↔ Orange ist das robusteste Paar für Protan/Deutan; Rot auf Grün wird vermieden. Jede Bedeutung hat zusätzlich eine **Form**: Gegner mit Doppelrand, eigene Spieler mit hellem Rand; Passwege durchgezogen+Pfeil (offen), gestrichelt+„!“ (riskant), gepunktet+„✕“ (zu); steuerbare Figuren mit gestricheltem Ring; „DU“-Markierung (WCAG 1.4.1).

## 2. Typografie

- **Display:** Barlow Condensed 600/700/800, Versalien, leichte Sperrung – Überschriften, Zahlen, Rückennummern (sportlich, platzsparend auf dem Handy).
- **Text:** Inter (variabel) – Fließtext, Formulare.
- Größen: Anweisung in Missionen 24–27 px (Display), Fließtext 16–18 px, Hilfstexte 12–14 px. Zeilen ≤ 70 Zeichen.
- Schriften werden selbst gehostet (Fontsource), keine Anfragen an Google zur Laufzeit.

## 3. Raster, Abstände, Formen

4-px-Basis (Tailwind-Skala). Karten-Radius 18 px, Buttons als Pillen. Schatten nur dezent; Akzent-Glow nur auf der Hauptaktion. Maximal eine primäre Aktion pro Bildschirm.

## 4. Komponenten

`Button` (primary/secondary/ghost/danger; Größen bis `xl` für „Training starten“), `Card`, `Badge`, `DemoBadge`, `ProgressBar`, `ProgressRing`, `Notice`, `Field`/`Input`/`Select`/`Checkbox`, `PageHeader`, `Logo` (Passdreieck), Navigation (Spieler: untere Leiste mit 4 Zielen; Trainer: obere Leiste), `UnitPath` (Levelpfad), `CompetencyStatus` (drei Zustände), `ProgressMatrix`, `InvitePanel`.

## 5. Bewegung

- UI: 150–380 ms, ease-out („rise“, „pop“); Buttons skalieren beim Drücken leicht.
- Spielfeld: Laufwege 1–2 s mit ease-in-out, Pässe ease-out; Zeitlupe 0,5×.
- `prefers-reduced-motion` und Schalter „Weniger Bewegung“ in jeder Mission: Endbilder statt Animation, keine pulsierenden Ringe (WCAG 2.3.3).

## 6. Visuelle Sprache des Spielfelds

| Element | Gestaltung |
|---|---|
| Rasen | Grün mit Mähstreifen, Umfeld dunkler; Linien 78 % Weiß |
| Eigene Spieler | blauer Kreis, heller Rand, dunkle Rückennummer; Schatten |
| Gegner | oranger Kreis, dunkler Doppelrand |
| Ball | weiß mit schwarzem Fünfeck, am Fuß leicht versetzt (Nummer bleibt lesbar); Ballführender immer obenauf |
| Steuerbare Figur | gestrichelter Ring; „DU“-Plakette bei Einzelsteuerung; Auswahl/Ziehen: weißer pulsierender Ring |
| Passwege | s. o.; enden vor der Figur |
| Freier Raum | gelber Lichthof bzw. gestrichelter Kreis mit „FREI“ |
| Abstände | gestrichelte Linie mit Meter-Plakette |
| Deckungsschatten | dunkler Kegel hinter dem Verteidiger |

**Ausrichtung:** immer gleich – die eigene Angriffsrichtung zeigt nach oben, das eigene Tor liegt unten, auf jedem Gerät und in jeder Aufgabe (Orientierung ohne Vorwissen; siehe [Einfach verstehen](einfach-verstehen.md)). Über dem Feld steht eine Legende „Wir / Gegner / Wir spielen nach oben“, Tore sind beschriftet. Jede Mission und jeder Schritt definiert einen **Ausschnitt** in Metern, damit Situationen auf dem Smartphone groß genug sind und Figuren nicht überlappen.

## 7. Interaktion und Barrierefreiheit

- Drei gleichwertige Eingabewege: Ziehen (Pointer Events, Touch mit „Anheben“ über den Finger), Antippen + Zielpunkt (WCAG 2.5.7), Tastatur (Tab, Pfeile; Umschalt fein, Alt grob).
- Trefferflächen der Figuren ≥ 44 px auf dem Smartphone (unsichtbarer vergrößerter Kreis; WCAG 2.5.8).
- Jede Figur hat eine Beschreibung („Nummer 4, Blau, eigene Mannschaft. Du kannst diesen Spieler bewegen“); Feedback in `aria-live`-Bereichen.
- Vorlesen der Anweisungen nur mit **lokalen** Systemstimmen (kein Text verlässt das Gerät).
- Zeitdruck-Aufgaben (geplant) müssen abschaltbar sein (WCAG 2.2.1).

## 8. Responsives Verhalten

- Smartphone (Hochformat): Spielfeld oben, Aufgabenbereich unten (Daumenzone), große Buttons.
- Tablet/Desktop: Spielfeld links, Aufgabenbereich rechts (400 px).
- Trainerbereich: Desktop-zentriert, Tabellen horizontal scrollbar auf dem Handy.

## 9. Bildschirme

Umgesetzt: Startseite (mit live animierter Beispielsituation), Ausprobieren, Anmelden/Beitreten/Registrieren, Spieler-Start („Training starten“), Levelpfad, Mission (Zuschauen, Erkennen, Positionieren, Feedback, Konsequenz), Zusammenfassung, Fortschritt (Kompetenzbaum), Trainer: Mannschaften, Mannschaft (Lernstand, Teamcode, Problemfelder, Vorschläge), Hausaufgaben + Bericht, Spieler-Detail, Spielformen, Profil/Daten.
Konzipiert, noch nicht umgesetzt: Spieler-Onboarding-Tour (3 Karten: „So ziehst du Spieler“, „Was die Linien bedeuten“, „Fehler sind erlaubt“), Lernwelten-Übersicht, Szenario-Editor.
