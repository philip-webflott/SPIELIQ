# ADR 0009 – Spielerfiguren als vorgerenderte Sprites im SVG-Spielfeld

- Status: angenommen (Stil abgenommen und umgesetzt) · Datum: 30.10.2026

## Kontext
Der Produktverantwortliche möchte statt Kreisen echte Figuren mit klarer Blickrichtung und Posen (Bereit, Laufen, Verteidigen, Pass annehmen, Passen, Schießen). Zur Wahl standen live animierte Vektorfiguren (2,5D), vorgerenderte Sprites und Echtzeit-3D. Anforderungen: flüssig auf älteren Handys, Barrierefreiheit und Testbarkeit wie heute (ADR 0002), dieselbe Figur in mehreren Ansichten, kleine Ladegröße.

## Entscheidung
Figuren werden aus **einer** Vorlage (Figur-Rig) zu Einzelbildern gerastert und im bestehenden SVG-Spielfeld als `<image>` angezeigt. Umgesetzt wird das Rastern im Browser beim ersten Gebrauch (statt eines Build-Skripts): keine Binärdateien, beliebige Trikots, Kreise als Rückfall. In der Draufsicht wird das Bild gedreht; Schrägansichten werden in 8 Richtungen vorgerendert. Nummern und Markierungen bleiben SVG-Text bzw. -Formen. Details: [Spielerfiguren](../../design/spielerfiguren.md).

## Begründung
- Eigene Messung (22 Spieler + Ball, Pixel-7-Emulation, CPU ÷6): Sprites 60 Bilder/s bei 59 Knoten; live animierte Vektorfiguren 41 Bilder/s mit 43 % Bildern über 20 ms ([Messskript](../../design/prototypen/leistung/run.cjs)).
- DOM-Elemente bleiben fokussierbar, beschriftbar und in E2E-Tests ansprechbar.
- Echtzeit-3D brächte zusätzliche Bibliothek, Modelle und GPU-Last ohne belegten Lernvorteil (Register C, C-87–C-89).

## Konsequenzen
+ Im isolierten Test fast so leicht wie Kreise; Teams, Nummern und Varianten skalieren über Daten.
+ Später Echtzeit-3D aus derselben Vorlage möglich.
− Beim ersten Gebrauch rastert der Browser die Bilder (Bruchteile einer Sekunde, bis dahin Kreise).
− In der echten App (React baut das Feld in jedem Bild neu auf) kosten die Figuren bei CPU ÷6 rund ein Viertel der Bildrate (≈ 41 statt ≈ 54 Bilder/s), bei ÷4 kaum etwas (≈ 58 statt 60). Optimierung und Messung auf einem echten günstigen Android-Gerät stehen aus ([Spielerfiguren](../../design/spielerfiguren.md), Abschnitt 7).
