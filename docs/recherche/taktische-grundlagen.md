# Taktische Grundlagen

Stand: 29.10.2026 · Synthese aus [Register A](quellen/A-dfb-jugendfussball.md) (DFB) und [Register B](quellen/B-fifa-uefa-verbaende.md) (FIFA/UEFA) · Kennzeichnungen siehe [README](README.md)

Dieses Dokument beschreibt die taktischen Prinzipien, die SPIELIQ vermittelt und bewertet, mit ihrem Beleg und ihrer Umsetzung in der Engine. Ohne Kennzeichnung gilt: im Original geprüft [verifiziert].

## 1. Spielphasen

- **DFB:** Offensive, Defensive und Umschalten; hohe Entscheidungsqualität „in allen Spielphasen“; sofortiges Umschalten in beide Richtungen als Kernelement (A-87, A-100). Die Talentförderung gliedert nach den Spielmomenten „Tore erzielen“, „Tore vorbereiten“ und „Ballsicherung“ (A-46). Ein formales DFB-Phasenmodell wurde nicht gefunden.
- **FIFA:** acht Absichten, je vier mit und ohne Ball, im Spiralcurriculum U12–U15 (B-97); neun Phasen ohne Ball in der EFI-Analyse (B-44).
- **SPIELIQ:** Prinzipien tragen die Phase `mit-ball`, `gegen-ball`, `umschalten` oder `allgemein` (`packages/content/src/principles.ts`). Standardsituationen sind keine eigene Phase.

## 2. Verteidigen

### 2.1 Der erste Verteidiger: Druck auf den Ball

- Abstand kontrollieren, wirksame Körperstellung, aus gefährlichen Zonen weglenken, den Zeitpunkt für das Tackling wählen; „lenken, verzögern, verwehren“ (B-01, B-02).
- Schnell anlaufen, abgebremst und im Gleichgewicht ankommen, nicht über den Ball hinaus übercommitten (B-02, B-03, B-07).
- **Einzige gefundene Zahl:** In einer U15-Einheit soll der Verteidiger beim Ballempfang des Angreifers innerhalb von 2–3 m sein (B-13).
- Auslöser zum Attackieren: schlechte oder nach hinten gerichtete erste Berührung, schwacher Pass, Rückpass, Annahme mit Blick zum eigenen Tor, zu weit vorgelegter Ball (B-04, B-11, B-13). In Unterzahl: verzögern, Passlinie schneiden, Tor schützen (B-04, B-13).
- Lenkrichtung: *dass* gelenkt wird, ist Prinzip; *wohin*, ist Kontext (nach außen, auf den schwachen Fuß, „zu einer Seite“, Pressingfallen nach innen) (B-02, B-03, B-10, B-11, B-13, B-14, B-46, B-96).
- DFB-Begriff „erste*r Verteidiger*in“ (A-87).
- **SPIELIQ:** Prinzip `P-STELLEN`, Kriterium `pressure` (Abstand im Band, torseitig ≤ 45° zur Torachse). Lenkrichtung wird in v1 nicht bewertet.

### 2.2 Druck – Absicherung – Balance (erster, zweiter, dritter Verteidiger)

- FIFA definiert das Abwehrdreieck ausdrücklich: Der erste Verteidiger gibt Druck, der zweite sichert ab, der dritte sorgt für Balance, indem er Raum schützt und die nächste Aktion antizipiert (B-01). Im 3v3 bleibt bei Ball außen der fernste Verteidiger verbunden und deckt die schwache Seite ab (B-94).
- **Absichern:** hinter und innen versetzt zum ersten Verteidiger, um Pässe durch die Lücke und Doppelpässe zu verhindern; nah genug gegen den Pass durch die Lücke, so, dass er eingreifen kann, wenn der erste überspielt wird (B-94); „angemessener Abstand und Winkel“ (B-01). Drei Verteidiger auf einer Linie sind mit einem Pass überspielt; Passwege in mehreren Tiefen blockieren (B-17).
- **Keine FIFA- oder UEFA-Quelle beziffert Absicherungsabstand oder -winkel** (B, S5).
- DFB: „Herausstechen und Absichern“ im 2v2 (A-87); „Abwehrdreieck“ (A-14). Den Begriff „zweite*r Verteidiger*in“ verwendet keine der geprüften DFB-Quellen (A, Terminologie).
- **SPIELIQ:** `P-ABSICHERN` mit Kriterium `cover` (Tiefenvorsprung, Abstand, Staffelungswinkel, Seite) und `reachInTime` (rechtzeitig am nächsten Gegenspieler); `P-MITTE` mit `protectCentre`. Die Rollen werden aus der Lage bestimmt (ballnächster = stellt, zweitnächster = sichert, drittnächster = Balance).

### 2.3 Zonale Orientierung

- Hauptreferenzen sind Ball, Mitspieler und die zu schützenden Räume, nicht einzelne Gegner; die Zonen sind dynamisch (B-01). In Einheiten kommen Ort und Richtung des Balls und die Gegner hinzu (B-07); Spieler sollen sich nicht vom Ball anziehen lassen, sondern an den Mitspielern orientieren (B-102).
- Mannorientierte Momente gibt es innerhalb der zonalen Struktur: im Strafraum, im Hochpressing, im Gegenpressing (B-01, B-05, B-12, B-96). DFB: „je näher zum Tor, desto näher am Mann“, den gefährlicheren Gegner decken, Verteidigen im Raum bzw. im Verbund (A-87). Die Begriffe „Raumdeckung“ und „Manndeckung“ fanden sich in DFB-Originalen nicht.
- **SPIELIQ:** Orientierung wird über Kriterien geprüft, die sich auf Ball, Tor, Mitspieler und gefährliche Gegner beziehen; enge Manndeckung ist in M3 eine erklärte Alternative („gut, aber …“).

### 2.4 Gemeinsam verteidigen: Verschieben, Verbund, Mitte

- Grundprinzipien ohne Ball: Spielfeld verkleinern, Raum schließen (horizontal und vertikal), Form halten, Druck ausüben (B-95).
- Kompaktheit heißt kleine Abstände in einer Linie und zwischen den Linien; die Abwehrlinie bleibt verbunden (B-01, B-10, B-16, B-95). DFB spricht vom Verteidigen „im Verbund“ und vom Schließen von Lücken; der Begriff „Kompaktheit“ fand sich in DFB-Originalen nicht (A-87, A-14).
- Verschieben als Einheit, im Tempo des Balls, mit Verdichtung auf der Ballseite; „bewegt sich der Ball, bewegt sich das Team“ (B-06, B-07, B-12, B-57). DFB: ballorientiert verschieben, Kettenabstände, Doppeln (A-50); Linie verteidigen mit Verschieben, Herausrücken, Absichern – eine Person rückt heraus, die anderen schließen die Mitte (A-87, A-14).
- Ballferne Seite: Der ballferne Außenverteidiger rückt ein; er darf seinen Gegenspieler lösen, solange er ihn im Blick behält; der ungefährlichste Gegner darf frei sein; der gegenüberliegende Flügel darf offen bleiben (B-06, B-07, B-14, B-57).
- Der Druck auf den Ball steuert die Linie: Ballführender unter Druck → herausrücken oder halten; nicht unter Druck → zurückweichen können (B-06, B-01); Herausrücken bei Rückpass (B-05).
- Das Zentrum hat Vorrang; der Gegner wird nach außen oder rückwärts gezwungen (B-06, B-08, B-09, B-10, B-16, B-39).
- **SPIELIQ:** `P-VERSCHIEBEN` (Kriterien `shiftTowardsBall`, `chainGaps`, `behindBall`, `compactness`) und `P-MITTE` (`protectCentre`, `reachInTime` für den Balance-Spieler). Keine gleichen Abstände, keine Linienpflicht, Überverschieben wird bestraft.

## 3. Angreifen und Ballbesitz

### 3.1 Anspielbar sein und Freilaufen

- DFB-Leitlinie: „Gegner binden oder anspielbar sein“, idealerweise mit der Option, die Tiefe zu attackieren (A-15, A-14). Geschicktes Freilaufen; Räume „freiziehen“; Abspielmöglichkeiten in Tiefe und Breite schaffen (A-14); sich zum Zuspiel anbieten und aktiv entgegenstarten (A-98).
- FIFA Football Language: Anbieten und Bewegungsarten (vor, zwischen, hinter den Einheiten; von innen nach außen und umgekehrt); Empfangsort relativ zu den gegnerischen Einheiten (B-48); Raster Position – Moment – Richtung – Tempo (B-27).
- **SPIELIQ:** `P-ANSPIELBAR` mit `passLane` und `passOptions` (zeitbasiertes Abfangmodell, siehe [Engine](../konzept/engine.md)); `P-FREIER-RAUM` mit `selectFree` (Zeit am Ball nach der Annahme) und `freeSpacePoint`.

### 3.2 Abstand, Breite und Tiefe

- Unterstützungsabstände „weder zu nah noch zu weit“; das 10-m-Dreieck ist ein Übungsmaß (B-20); kurze, mittlere und lange Passoptionen (B-19). **Keine Quelle nennt Unterstützungsabstände nach Alter oder Feldgröße** (B, S5).
- Breite halten und Tiefe bedrohen je nach Situation (A-14, A-15, A-98); Breite und Tiefe in FIFA-Einheiten (B-19, B-23, B-29, B-99, B-101). „So tief wie möglich, so breit wie nötig“ ist nur über BDFL-Wiedergaben belegt [nur Suchergebnis A-55, A-58].
- **SPIELIQ:** `P-ABSTAND` (`spacing`, `groupDistance`) und `P-BREITE-TIEFE` (`widthDepth`); Tiefe schließt Anspielstationen hinter dem Ball ein.

### 3.3 Dreiecke, Spiel über den Dritten

- Dreiecke und Rauten sind Strukturen (Lösungswege), keine Pflicht (B-19, B-20, B-22); zwei zentrale Mittelfeldspieler nicht auf derselben Linie (B-99).
- Dritter-Mann-Kombination als flexibles Werkzeug (B-24, B-25); DFB: Spiel über den Dritten, Klatschenlassen, gestaffeltes Nachrücken (A-87). Den Begriff „Passdreieck“ verwendet keine der geprüften DFB-Quellen.
- **SPIELIQ:** `P-DREIECK` mit `triangle` (zwei offene Passwege, Mindestwinkel); Pflicht nur, wo die Aufgabe ausdrücklich ein Dreieck verlangt.

### 3.4 Linien überspielen, Raum im Rücken

- DFB: Räume im Rücken des Gegners schaffen, erkennen und nutzen; schnelles Abspielen und Tiefe attackieren als offensive Leitlinien der Spielvision (A-15).
- FIFA: Linienbruch durch, um oder über eine Einheit; der Ball kommt über den tiefsten Spieler einer Linie hinaus (B-44, B-47); wer viele Linienbrüche zulässt, verliert häufiger (B-45).
- **SPIELIQ:** in Einheit 1 nur indirekt (Konsequenz-Simulation „Raumgewinn“, „Torchance“); eigene Kompetenzen K-RAUM-IM-RUECKEN und K-GEGNER-BINDEN sind geplant.

## 4. Wahrnehmung

- DFB: Blickverhalten, Orientierung zu Ball und Gegner, Kopf- und Körperbewegungen (A-87); Schulterblick vor der Ballannahme (A-98); offene Stellung (A-87, A-98).
- FIFA: Scanning ist eine bewusste Kopfbewegung weg vom Ball; je enger das Pressing, desto seltener; ein Scan dauert im Mittel etwa 0,4 s (B-30, B-31); Abfolge „umschauen – bewegen – annehmen“ (B-32); Checkliste „ich, Gegner, Mitspieler, Raum, Chance“ (B-103). Feste Scan-Quoten sind nicht belegt.
- **SPIELIQ:** In der Vogelperspektive ist alle Information sichtbar; aktives Umschauen wird erst mit einer geplanten „Schulterblick“-Mechanik trainierbar (Register C, Synthese 3.3; K-SCHULTERBLICK geplant).

## 5. Umschalten

- Nach Ballverlust geht, wer nachgerückt ist, sofort ins Pressing (Konterabsicherung) (A-15); Gegenpressing ist Teil kleiner Spielformen (A-87); FIFA-Serie zur Reaktion auf Ballverlust (B-96).
- DFB-Begriff „Konterabsicherung“ statt „Restverteidigung“ (A-15).
- **SPIELIQ:** Welt W6 geplant (K-NACH-BALLVERLUST, K-NACH-BALLGEWINN).

## 6. Zahlen aus den Quellen und ihre Einordnung

Alle Werte stammen aus Übungen oder aus dem Spitzenfußball. **Keine Quelle liefert Normwerte für den Jugendfußball.** Die Engine verwendet sie nur als Anker für Modellannahmen (Gegenüberstellung in [Engine, Abschnitt 4](../konzept/engine.md)).

| Angabe | Kontext | Quelle |
|---|---|---|
| 2–3 m Abstand beim Ballempfang des Angreifers | 1v1, FIFA-Einheit U15 | B-13 |
| 6–8 m zwischen den Verteidigern einer Viererkette | Übung auf großem Feld | B-05 |
| etwa 3 m zu benachbarten Mitspielern | Übung auf 20 × 15 m | B-06 |
| etwa 6 m zwischen Mittelfeld- und Abwehrlinie | Startaufstellung einer Übung im tiefen Block | B-07 |
| Blockbreite etwa Strafraumbreite | organisiertes 4-4-2 | B-95 |
| Mittelfeldblock im Mittel 27,2 m lang, 40,1 m breit | WM 2022, Erwachsene | B-39 |
| Block-Klassifikation: ≥ 8 Feldspieler, ≤ 10 km/h, 1,6 s von 2,0 s stationär, ≥ 4 Verteidiger hinter dem Ball | FIFA-Analyse/EFI | B-39, B-44 |

**Ausdrücklich nicht gefunden:** Absicherungsabstand und -winkel, Unterstützungsabstände nach Alter, Linienabstände nach Alter, Kompaktheitsnormen im Jugendbereich, Meterschwelle für „Druck“ (B, S5). Alle entsprechenden Schwellen der Engine sind Designentscheidungen und werden kalibriert.

## 7. Begriffe für Oberfläche und Training

Abgleich mit DFB-Originalen (A, Abschnitt 4) und FIFA (B). Ziel: dieselben Wörter in App und Training (SP-11).

| Begriff | Beleg | Verwendung in SPIELIQ |
|---|---|---|
| anspielbar sein, Gegner binden, freilaufen, anbieten | DFB (A-14, A-15, A-98) | Kernvokabular |
| stellen, absichern, herausrücken, verschieben, Mitte/Zentrum schließen | DFB (A-87, A-14, A-98) | Kernvokabular |
| erster Verteidiger | DFB (A-87), FIFA (B-01) | verwenden, immer mit Rollenwort („Stellen“) |
| zweiter und dritter Verteidiger | FIFA (B-01, B-94); nicht in geprüften DFB-Originalen | verwenden, weil Zielgruppe und Auftrag sie nutzen, immer mit Rollenwort („Absichern“, „Mitte schützen“); Bestätigung durch Trainer:innen offen |
| Breite und Tiefe, Raum im Rücken, Spielverlagerung, Überzahl | DFB (A-14, A-15, A-87, A-50) | verwenden |
| Abwehrdreieck, Doppeln, Übergeben/Übernehmen | DFB (A-14, A-50, A-87) | verwenden (ab Einheit 2) |
| Schulterblick, offene Stellung | DFB (A-98, A-87) | verwenden |
| Konterabsicherung | DFB (A-15) | statt „Restverteidigung“ |
| Verbund | DFB (A-87, A-14) | bevorzugt; „kompakt“ nur erklärt |
| Kompaktheit, Deckungsschatten, Halbraum, Zwischenlinienraum, Raum-/Manndeckung, Passdreieck | nicht in geprüften DFB-Originalen | nur in Trainertexten mit Erklärung; in Spielertexten vermeiden |
| „so tief wie möglich, so breit wie nötig“ | nur BDFL-Wiedergabe [nur Suchergebnis] | nicht als DFB-Leitsatz zitieren |

## 8. Zuordnung: Prinzipien und Kriterien der Engine

| Prinzip | Kurzdefinition (Spielersprache) | Kriterien | Belege |
|---|---|---|---|
| P-NICHT-ALLE | Einer geht zum Ball – die anderen haben andere Aufgaben. | `crowding`, Rollen-Selektoren | B-01, B-06, B-14, B-102 |
| P-FREIER-RAUM | Schau weg vom Ball: Wo ist Platz, wer ist frei? | `selectFree`, `freeSpacePoint` | C-17, B-30, B-48 |
| P-ABSTAND | Mit Abstand bist du anspielbar – und ein Gegner kann nicht zwei stören. | `spacing`, `groupDistance` | B-19, B-20 |
| P-ANSPIELBAR | Zwischen dir und dem Ball steht kein Gegner. | `passLane`, `passOptions` | A-14, A-15, B-48 |
| P-BREITE-TIEFE | Macht das Feld groß. | `widthDepth` | A-14, A-15, B-19, B-99 |
| P-DREIECK | Zu dritt im Dreieck hat der Ballführende zwei Passwege. | `triangle` | B-19, B-20, B-22 |
| P-STELLEN | Der Nächste zum Ball stellt: nah dran und zwischen Ball und Tor. | `pressure` | A-87, B-02, B-03, B-13 |
| P-ABSICHERN | Steh schräg hinter deinem Mitspieler – nah genug zum Helfen. | `cover`, `reachInTime`, `goalSide` | A-87, B-01, B-17, B-94 |
| P-VERSCHIEBEN | Wechselt der Ball die Seite, schieben alle mit. | `shiftTowardsBall`, `chainGaps`, `behindBall`, `compactness` | A-50, A-87, B-05, B-07, B-12 |
| P-MITTE | Vor dem eigenen Tor bleibt immer jemand. | `protectCentre`, `reachInTime` | A-14, B-07, B-08, B-14, B-94 |

Quelle der Zuordnung: `packages/content/src/principles.ts`. Alle Prinzipien haben den Status `review` (fachliche Freigabe durch lizenzierte Jugendtrainer:innen steht aus).
