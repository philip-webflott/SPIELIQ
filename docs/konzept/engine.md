# Simulations- und Bewertungsengine

Stand: 29.10.2026 · Code: `packages/engine` · Status: v1 (in Erprobung, Schwellenwerte zu kalibrieren)

## 1. Anforderungen

Aus dem Produktauftrag abgeleitet:

1. **Fachlich begründete Bewertung** statt „richtig, wenn innerhalb eines Radius“. Kriterien beschreiben Eigenschaften einer Situation (Passweg offen? torseitig? tiefer gestaffelt? Lücke zu groß?), nicht Zielkoordinaten.
2. **Mehrere gute Lösungen** werden erkannt; dokumentierte Alternativen werden erklärt.
3. **Keine Dogmen**: z. B. keine gleichen Abstände in der Kette, keine starre Linie, Lenkrichtung kontextabhängig.
4. **Reproduzierbar, testbar, dokumentiert**: reine Funktionen, deterministisch, identisch auf Client und Server.
5. **Getrennt von der Darstellung**: Die Engine kennt kein React, kein DOM, keine Datenbank und keine Texte.
6. **Datengetrieben**: Szenarien sind Daten (Szenarioformat v1), keine fest programmierten Sonderfälle. Der spätere Trainer-Editor erzeugt dasselbe Format.
7. **Kein Bestehen durch Zufall**: messbar über automatische Zufallstests je Aufgabe.

## 2. Schichten

```
geometry  →  board / model  →  analysis  →  assessment  →  simulation  →  scenario
(Vektoren)   (Feld, Spieler,    (Passwege,    (Kriterien,     (Zeitleiste,    (Format v1,
             Bewegungsmodell)   Druck, Kette)  Gesamtwertung)  Konsequenz)     Laufzeit, QA)
```

Abhängigkeiten zeigen nur nach rechts. Jede Schicht ist einzeln getestet (`*.test.ts`).

## 3. Koordinaten und Spielfeld

- Einheit Meter. `x` von der linken Torlinie (0) zur rechten (Länge), `y` von der oberen Seitenlinie (0) zur unteren (Breite).
- Mannschaften heißen aus Sicht des Lernenden `own` („wir“, blau) und `opp` (Gegner, orange). `attackDirection` legt fest, wer in welche Richtung spielt.
- Spielfeldtypen: Großfeld (Standard 105 × 68 m), Kleinfeld mit zwei Toren, Feld mit vier Minitoren. Alle Maße sind Parameter, weil die Spielformen im Kinder- und D-Junioren-Fußball regional variieren und sich weiterentwickeln (Recherche A, Abschnitt 2).
- Die Darstellung (Hoch- oder Querformat) ist Sache des Renderers (`packages/pitch`).

## 4. Bewegungsmodell und Modellparameter

Die Engine nutzt ein bewusst einfaches, erklärbares Zeitmodell: *Wer ist zuerst an einem Punkt – Ball oder Gegenspieler?*

| Parameter | Bedeutung | U11 | U13 | **U15 (Standard)** | U17 |
|---|---|---|---|---|---|
| `playerSpeed` | effektive Laufgeschwindigkeit über kurze Distanz inkl. Antritt (m/s) | 4,5 | 5,0 | **5,5** | 5,8 |
| `reactionTime` | Reaktionszeit bis zur Bewegung (s) | 0,35 | 0,33 | **0,30** | 0,28 |
| `reachRadius` | Reichweite Bein/Körper (m) | 1,0 | 1,1 | **1,2** | 1,25 |
| `blockTime` | Ball in Reichweite blocken (s) | 0,12 | 0,12 | **0,10** | 0,10 |
| `passSpeed` | Ø Ballgeschwindigkeit kurzer Pass ≈ 10 m (m/s) | 8,5 | 10,5 | **12** | 13 |
| `passSpeedGain` | Zuschlag je Meter Passlänge über 10 m | 0,20 | 0,22 | **0,25** | 0,27 |
| `maxPassSpeed` | Obergrenze (scharfer Pass, Verlagerung) | 13 | 15,5 | **18** | 20 |
| `pressureDistance` | ab hier „unter Druck“ (m) | 2,0 | 2,5 | **2,5** | 3,0 |

> **Wichtig – Modellannahmen:** Keine der gesichteten Quellen nennt belastbare Zahlen für Absicherungsabstände, Unterstützungsdistanzen oder Linienabstände nach Altersklassen (Recherche B, Synthese S5). Die Werte bilden plausible Größenordnungen ab, damit Ursache und Wirkung nachvollziehbar werden. Sie werden in der Erprobung mit lizenzierten Jugendtrainer:innen kalibriert (siehe [Entwicklungsplan](../entwicklungsplan.md)). Jede Mission kann ein anderes Altersprofil wählen.

### 4.1 Startwerte und ihre Anker in den Quellen

Die wenigen Zahlen aus den Quellen stammen aus Übungen oder aus dem Spitzenfußball ([Taktische Grundlagen](../recherche/taktische-grundlagen.md), Abschnitt 6). Sie dienen als Anker, nicht als Norm. Die Kriterien arbeiten mit weichen Bändern; „bestanden“ liegt meist bei Score ≥ 0,5 (Absichern und Dreieck ≥ 0,6, Breite/Tiefe ≥ 0,75).

| Parameter (Standard) | Startwert | Anker in den Quellen | Einordnung |
|---|---|---|---|
| `pressureDistance` (U15) | 2,5 m | 2–3 m Abstand des Verteidigers beim Ballempfang im 1v1, FIFA-Einheit U15 (B-13) | innerhalb des einzigen belegten Bereichs |
| `pressure.band` (Stellen) | ideal 1–3 m, 0 ab 6,5 m; torseitig ≤ 45° | B-13; „abgebremst ankommen, nicht übercommitten“ (B-02, B-03) | M4 weitet auf ideal 1,5–4,5 m, weil der Ball während der Verlagerung unterwegs ist (Herausrücken) |
| `chainGaps` ballnah | ideal ≤ 9 m, bestanden ≤ 12 m, 0 ab 15 m | 6–8 m zwischen Verteidigern einer Viererkette, Übung auf großem Feld (B-05); etwa 3 m auf 20 × 15 m (B-06) | etwas großzügiger als B-05, weil der direkte Abstand auch bei Höhenversatz gemessen wird und die Werte für die C-Jugend erst kalibriert werden müssen |
| `chainGaps` ballfern | ideal ≤ 14 m, 0 ab 21 m | ballferne Spieler rücken ein, der ungefährlichste Gegner darf frei sein, der ferne Flügel darf offen bleiben (B-06, B-07, B-14) | bewusst weiter als ballnah – keine gleichen Abstände |
| `compactness.width` | ideal ≤ 36 m, 0 ab 50 m | organisiertes 4-4-2 etwa strafraumbreit (B-95); Elite-Mittelfeldblock im Mittel 40,1 m breit (B-39) | nur Plausibilität; Elitewerte sind keine Jugendnorm (C-40) |
| `cover.distance` | ideal 3,5–8 m | qualitativ: nah genug gegen den Pass durch die Lücke, nicht so weit, dass der erste Verteidiger isoliert ist (B-94; B-81 nur Suchergebnis) | reine Modellannahme |
| `cover.depthGap`, `cover.stagger` | Tiefe ideal 1,5–6,5 m; Staffelung ideal ≤ 65°, 0 ab 88° | „hinter und innen“ (B-94); „versetzt statt auf einer Linie“ (B-17, B-07) | reine Modellannahme |
| `groupDistance` (Passdistanz) | Standard ideal 6–22 m (M2: 7–20 m) | „weder zu nah noch zu weit“, 10-m-Dreieck als Übungsmaß (B-20); kurze, mittlere und lange Optionen (B-19) | reine Modellannahme |
| `shiftTowardsBall.factor` | ideal 35–90 % der seitlichen Ballverschiebung, 0 unter 10 % und über 125 % | Verdichtung auf der Ballseite, Zentrum hat Vorrang (B-06, B-07, B-57) | reine Modellannahme; bestraft Über- und Unterverschieben |
| Passweg „offen“ / „riskant“ | Zeitvorsprung ≥ 0,25 s bzw. 0–0,25 s | – | reine Modellannahme |
| „frei“ (`timeOnBall`) | ≥ 0,8 s bis zum Druck | – | reine Modellannahme |
| Lauf-, Reaktions- und Passgeschwindigkeiten | Tabelle oben | – | reine Modellannahme; Kalibrierung mit Videodaten aus Jugendspielen geplant |

FIFA veröffentlicht für Druck und Blockklassifikation nur teilweise Heuristiken (B-39, B-44). Die Block-Kriterien (≥ 8 Feldspieler, ≤ 10 km/h, 1,6 s von 2,0 s stationär, ≥ 4 Verteidiger hinter dem Ball) eignen sich später für animierte Szenen, werden in v1 aber nicht genutzt.

**Kalibrierung (geplant):** 30–50 standardisierte Situationen je Kriterium, von mindestens drei lizenzierten Jugendtrainer:innen unabhängig als „passt / vertretbar / nicht passend“ beurteilt; Bänder so anpassen, dass die Engine mit dem Expertenurteil übereinstimmt; Übereinstimmung und Abweichungen im Content-Report dokumentieren.

## 5. Taktische Analyse

### 5.1 Passweg-Analyse (zeitbasiertes Abfangmodell)

Für einen Pass von A nach B wird die Passlinie in Abständen von 0,25 m abgetastet (die ersten 0,6 m werden ausgelassen). Für jeden Punkt P und jeden Gegenspieler D gilt:

- Ballzeit `t_Ball(P) = |AP| / v(|AB|)` mit längenabhängiger Ballgeschwindigkeit `v`
- Abfangzeit `t_D(P) = blockTime`, falls P in Reichweite liegt, sonst `blockTime + (reactionTime − blockTime)·glatt(Δ) + Δ / playerSpeed` mit `Δ = |DP| − reachRadius`
- **Zeitvorsprung** `margin = min über P und D (t_D(P) − t_Ball(P))`

| Status | Bedingung | Darstellung |
|---|---|---|
| offen | margin ≥ 0,25 s | helle, durchgezogene Linie mit Pfeil (✓) |
| riskant | 0 ≤ margin < 0,25 s | gelb, gestrichelt, „!“ |
| zugestellt | margin < 0 | rot, gepunktet, „✕“ |

Eigenschaften, die sich daraus **automatisch** ergeben (statt fest programmiert zu sein):
- Deckungsschatten: Ein Verteidiger zwischen Ball und Empfänger stellt den Pass zu.
- Lange Pässe geben Verteidigern mehr Zeit – bis die Ballgeschwindigkeit steigt (scharfer Pass).
- Kontinuität: Kleine Positionsänderungen verändern den Wert stetig (geglätteter Übergang), es gibt keine harten Kanten.

Vereinfachungen: nur flache Pässe, keine Blickrichtung/Laufrichtung, Empfänger wartet am Zielpunkt. Die Visualisierung des Deckungsschattens (`coverShadow`) ist eine Näherung nur für die Anzeige.

### 5.2 Freier Spieler

`timeOnBall` = Zeit, bis der schnellste Gegenspieler nach der Ballannahme auf `pressureDistance` heran ist. Frei = Passweg nicht zugestellt **und** `timeOnBall ≥ 0,8 s`. So wird „frei“ nicht über einen Radius definiert, sondern über die Zeit, die ein Spieler hätte.

### 5.3 Verteidigungsgeometrie

Referenz ist die Achse **Ballführender → Mitte des eigenen Tores**. Darauf werden Tiefe (Richtung Tor) und seitliche Lage gemessen:
- **Stellen (erster Verteidiger):** Abstand zum Ballführenden, Winkel zur Torachse (torseitig ≤ 45°).
- **Absichern (zweiter Verteidiger):** Tiefenvorsprung gegenüber dem ersten Verteidiger, Abstand zu ihm, Staffelungswinkel (0° = direkt dahinter, 90° = flach daneben), Seite (innen/außen relativ zur Spielfeldmitte).
- **Torseitig zum Gegenspieler:** Winkel und Torabstand.

### 5.4 Mannschaftsmetriken

Angelehnt an Positionsdaten-Forschung (Recherche C: C-35 bis C-40): Schwerpunkt, Breite, Tiefe, seitliche Lücken einer Kette, Verschiebefaktor (Schwerpunkt-Verschiebung relativ zur seitlichen Ballposition). Die Forschung zeigt starke Kontextabhängigkeit und eine Datenlücke bei U14/U15 – daher werden Metriken nur mit kontextabhängigen Grenzen genutzt.

## 6. Bewertungsengine

### 6.1 Kriterien

Ein Kriterium ist eine reine Funktion `(Kontext, Parameter) → Ergebnis` mit
- `score` 0…1 aus **weichen Bändern** (Idealbereich, linear auslaufende Toleranz bis 0),
- `passed`,
- `feedbackKey` + Parameter (Texte liegen im Content-Paket, mehrsprachig erweiterbar),
- `evidence` (Passwege, Abstände, Zonen, Markierungen) für die Visualisierung.

Parameter werden mit zod validiert – auch für künftig von Trainer:innen erstellte Szenarien. **Selektoren** erlauben Rollen statt fester Spieler: „der eigene Spieler, der dem Ball am nächsten ist“ (Rang 1 = stellt, Rang 2 = sichert, Rang 3 = Balance). So entscheidet der Lernende selbst, wer welche Aufgabe übernimmt.

| Kriterium | Prüft | Prinzip (Beispiel) |
|---|---|---|
| `passLane` | ein Passweg offen bzw. zugestellt | Anspielbar sein / Passweg zustellen |
| `passOptions` | Anzahl offener Anspielstationen | Anspielbar sein |
| `selectFree` | angetippter Spieler ist (am meisten) frei | Freie Räume erkennen |
| `spacing` | Mindestabstand innerhalb einer Gruppe | Abstand halten |
| `groupDistance` | jede Anspielstation in sinnvoller Passdistanz | Abstand halten |
| `widthDepth` | Breite und Tiefe einer Gruppe | Breite und Tiefe |
| `triangle` | Dreieck mit zwei offenen Passwegen | Dreiecke bilden |
| `distance` | Abstand zweier Spieler im Idealbereich | allgemein |
| `pressure` | erster Verteidiger: Abstand + torseitig | Stellen |
| `cover` | zweiter Verteidiger: Tiefe, Abstand, Staffelung, Seite | Absichern |
| `reachInTime` | Verteidiger ist beim Pass rechtzeitig am Gegenspieler | Absichern / Mitte schützen |
| `goalSide` | torseitig zum Gegenspieler | Absichern |
| `crowding` | höchstens n eigene Spieler am Ball | Nicht alle zum Ball |
| `behindBall` | niemand ist schon überspielt | Verschieben |
| `chainGaps` | Lücken in der Kette, ballnah enger als ballfern | Verschieben |
| `protectCentre` | Spieler im zentralen Korridor vor dem Tor | Mitte schützen |
| `shiftTowardsBall` | Verschiebefaktor des Blocks zur Ballseite | Verschieben |
| `compactness` | Breite/Tiefe eines Blocks begrenzt | Kompaktheit |
| `freeSpacePoint` | angetippter Punkt liegt in freiem Raum | Freie Räume erkennen |
| `choice` | Auswahlaufgabe mit richtigen/vertretbaren Optionen | – |

### 6.2 Gesamtbewertung

1. Alle **Pflichtkriterien** müssen erfüllt sein.
2. Gewichteter Mittelwert ≥ 0,85 → „stark“ (`excellent`), ≥ 0,60 → „gut“ (`good`), sonst „noch nicht“ (`not-yet`).
3. Scheitert die Hauptlösung, werden **dokumentierte Alternativen** geprüft (eigene Kriterienliste + Erklärung). Beispiel Mission 3: enge Deckung des zweiten Angreifers ist „gut, aber …“.
4. **Wichtigste Rückmeldung**: bei „noch nicht“ das erste verfehlte Pflichtkriterium in Autorenreihenfolge (Autor:innen ordnen nach didaktischer Priorität); sonst das Kriterium mit dem größten Verbesserungspotenzial. Dazu bis zu zwei positive Punkte („Das war schon gut“).
5. Je Prinzip wird festgehalten, ob es erfüllt war → Grundlage für den Kompetenzstand.

### 6.3 Gegen Übervereinfachung

- `chainGaps` verlangt **keine gleichen Abstände**, nur Höchstwerte – ballnah strenger (9/15 m) als ballfern (14/21 m). Test: „ungleiche Abstände, trotzdem gut“.
- `cover` akzeptiert direkt-dahinter und schräg-versetzt; nach außen versetzt ist „vertretbar, nicht ideal“ (Score × 0,8, eigener Hinweis).
- `shiftTowardsBall` verlangt Verschiebung, bestraft aber auch **Überverschieben** (Mitte frei).
- `reachInTime` belohnt Deckungsschatten (Passweg zu = rechtzeitig), außer wenn eine Rolle ausdrücklich unabhängig davon verlangt wird (`ignoreBlockedLane`, z. B. Balance-Spieler, weil der Schatten des ersten Verteidigers nicht stabil ist).
- Lenkrichtung (innen/außen) wird in v1 **nicht** bewertet, weil sie kontextabhängig ist (Recherche B: Lenken nach außen nur in konkreten Situationen belegt).

## 7. Simulation

### 7.1 Skripte und Zeitleisten

Autor:innen beschreiben Abläufe in Ereignissen (`move`, `dribble`, `pass`, `shot`). Der Compiler erzeugt eine deterministische Zeitleiste; Pässe auf laufende Spieler werden iterativ auf den Ankunftsort gerechnet. Die Zeitleiste kann beliebig abgetastet werden (Pause, Zeitlupe 0,5×, Wiederholen, Springen ans Ende). Bei „Bewegung reduzieren“ wird nur das Endbild gezeigt.

### 7.2 Konsequenz-Simulation („Was passiert jetzt?“)

Nach einer Entscheidung spielt die ballbesitzende Mannschaft die nach einem einfachen Nutzenmodell beste Option: Pass (Erfolgswahrscheinlichkeit aus Passweg-Status und Zeit am Ball × Gefährlichkeit des Zielraums), Dribbling oder Torschuss. Ergebnisse: Torchance, Raumgewinn, sicherer Pass, abgefangen, sofort unter Druck, Rückpass. Der nächste Verteidiger läuft an, der zweite sichert torseitig ab. Das Modell soll **Ursache und Wirkung zeigen**, kein echtes Spiel simulieren.

## 8. Qualitätssicherung der Inhalte

Für jede Mission prüfen automatisierte Tests (`packages/content/test/missions.test.ts`):

| Prüfung | Regel |
|---|---|
| Schema + Konsistenz | Format v1, Spielerreferenzen, steuerbare Spieler, Prinzipien/Kompetenzen/Spielformen existieren |
| Dokumentierte Beispiele | Jede interaktive Aufgabe hat Beispiele für richtig **und** falsch; erwartete Wertung und ggf. Feedback-Schlüssel stimmen |
| Musterlösung | wird als „stark“ bewertet |
| Zufallsschutz | Zufällige Platzierung besteht in ≤ 5 % (1–2 Figuren) bzw. ≤ 2 % (≥ 3 Figuren) von 400 Versuchen |
| Raterate | Antipp-/Auswahlaufgaben: ≤ 50 % |
| Spiegelinvarianz | Dieselbe Situation auf der anderen Spielfeldseite wird identisch bewertet |
| Texte | Für jeden erzeugten Feedback-Schlüssel existiert ein Text |

Zusätzlich gibt es eine Lösbarkeitssuche (`searchSolution`, Hill-Climbing) für automatisch erzeugte Varianten.

## 9. Grenzen und nächste Schritte

- Keine Blick- und Laufrichtungen, keine Geschwindigkeiten; kein gechippter Pass; Abseits noch nicht modelliert.
- Torwartverhalten nur passiv (zählt beim Abfangen, nicht für „Torchance“).
- Gegnerverhalten in der Konsequenz-Simulation ist einfach; geplant: kontextabhängige Angriffsmuster.
- Kalibrierung der Modellparameter mit Trainer:innen (Expertenurteile zu Beispielsituationen → Schwellen anpassen), später mit Positionsdaten.
- Optional: Raumkontrolle (Pitch-Control-Modell) als zusätzliche Visualisierung freier Räume.
