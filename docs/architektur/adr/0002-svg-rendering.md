# ADR 0002 – SVG statt Canvas/WebGL für das Spielfeld

- Status: angenommen · Datum: 29.10.2026

## Kontext
Zur Wahl standen React Konva (Canvas), PixiJS (WebGL) und SVG. Anforderungen: scharfe Darstellung auf allen Displays, Touch und Tastatur, Barrierefreiheit, Testbarkeit, ≤ 22 Spieler plus Overlays, flüssige Animation.

## Entscheidung
Eigenes SVG-Rendering mit React (`@spieliq/pitch`). Koordinaten in Metern; die Projektion (Hoch-/Querformat) wird in JavaScript berechnet, damit Texte aufrecht bleiben.

## Begründung
- Elementzahl < 100: SVG-Leistung ausreichend, Animation via `requestAnimationFrame`.
- DOM-Elemente sind fokussierbar, beschriftbar (ARIA) und in E2E-Tests direkt ansprechbar (`data-player-id`).
- Auflösungsunabhängig, Farben über CSS-Variablen aus dem Designsystem.
- Keine zusätzliche Grafikbibliothek (kleineres Bundle, weniger Abhängigkeiten).

## Konsequenzen
+ Barrierefreiheit und Testbarkeit deutlich einfacher als bei Canvas.
− Für sehr viele Objekte (z. B. Heatmaps mit tausenden Zellen) wäre Canvas nötig; dann als zusätzliche Ebene (Canvas-Bild im SVG) ergänzen.
