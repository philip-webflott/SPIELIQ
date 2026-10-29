# ADR 0007 – Zeitbasiertes Abfangmodell und weiche Bewertungsbänder

- Status: angenommen · Datum: 29.10.2026

## Kontext
Bewertungen sollen fachlich begründet, robust gegen kleine Verschiebungen, offen für mehrere Lösungen und nicht durch Zufall bestehbar sein. Feste Zielradien erfüllen das nicht. Quellen nennen keine belastbaren Zahlen für Abstände nach Alter (Recherche B, S5).

## Entscheidung
- Passwege, „frei“ und „rechtzeitig“ über einen Zeitvergleich (Ball vs. schnellster Gegenspieler) mit dokumentierten, altersabhängigen Modellparametern.
- Geometrische Kriterien relativ zu Ball, Tor, Mitspielern und Gegnern; Werte über Idealbereiche mit Toleranz (Score 0…1).
- Rollen über Selektoren (z. B. „ballnächster Spieler“), nicht über feste Spieler.
- Alternativlösungen als eigene Kriterienlisten mit Erklärung.

## Konsequenzen
+ Erklärbar („Wird Nummer 10 angespielt, kommst du 0,6 s zu spät“), robust, viele gültige Lösungen.
− Parameter müssen kalibriert werden; Grenzfälle können überraschen → Content-Tests mit Beispielen und Trainerreview.
