# Content-Qualitätsbericht

Automatisch erzeugt am 2026-10-30 mit `pnpm --filter @spieliq/content report`.

Zufallsschutz: Anteil von 400 zufälligen Platzierungen im erlaubten Bereich, die mindestens als „gut“ gewertet würden (Grenze 5 % bei 1–2 Figuren, 2 % ab 3 Figuren). Raterate: Anteil der antippbaren Optionen, die als richtig gelten (Grenze 50 %).

| Mission | Status | Aufgabe | Art | Figuren | Zufall / Raten | Beispiele (ok/gesamt) |
|---|---|---|---|---|---|---|
| Das Problem erkennen | review | freien-gegner-finden | identify | – | 33 % (Raten) | 3/3 |
| Abstand halten | review | verteilen | place | 3 | 0.5 % | 5/5 |
| Wer macht was? | review | absichern | place | 1 | 4.0 % | 6/6 |
| Der Ball wechselt die Seite | review | verschieben | place | 4 | 0.0 % | 5/5 |
| Neue Spielsituation | review | halbraum | place | 3 | 0.0 % | 5/5 |
| Neue Spielsituation | review | fluegel | place | 3 | 0.0 % | 3/3 |
| Abschlusstest | review | test-freier-gegner | identify | – | 33 % (Raten) | 3/3 |
| Abschlusstest | review | test-dreieck | place | 2 | 3.5 % | 3/3 |
| Abschlusstest | review | test-absichern | place | 1 | 3.5 % | 3/3 |
| Abschlusstest | review | test-verschieben | place | 4 | 0.0 % | 2/2 |

Alle Werte werden zusätzlich in `packages/content/test/missions.test.ts` als harte Grenzen geprüft.
