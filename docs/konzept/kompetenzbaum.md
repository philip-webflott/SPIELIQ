# Lernwelten, Kompetenzbaum und Lernprogression

Stand: 29.10.2026 · Code: `packages/content/src/curriculum.ts` · Status: Entwurf v1, fachliche Prüfung ausstehend

## 1. Aufbaulogik

Die Progression folgt drei belegten Linien:

1. **Individuell → Gruppe → Mannschaft.** FIFA baut zonales Verteidigen in drei Teilen auf: 1v1/1v2 → Kleingruppen 2v2/2v3/3v3 (Druck, Absicherung, Balance) → eine, zwei, drei Linien bis zum 11v11 (B-01, B-94, Volltext geprüft). Der DFB nennt das Verteidigen auf einer Linie (Verschieben, Herausrücken, Absichern) als Schwerpunkt spätestens ab D-Junioren (A-87); eine DFB-Videoreihe vom 1v1 über die Gruppe zur Mannschaft ist nur als Suchergebnis belegt (A-64).
2. **Wahrnehmen → Entscheiden → Abstimmen.** Erst erkennen (Ball, Mitspieler, Gegner, freier Raum), dann die eigene Entscheidung, dann die Abstimmung mit anderen (Rollen).
3. **Klein → groß.** Spielerzahl und Feldausschnitt wachsen: 1 Figur + Ball → 2v1 / 2v2 → 3v3 → Mannschaftsteil (Kette) → Mannschaft. Die TPD trainiert vom 1v1 bis 4v4 (A-01, A-87) und widerspricht ausdrücklich dem Missverständnis, es gehe ausschließlich um Kleinfeld (A-10) – darum folgt auf Kleingruppen der Transfer in 9v9/11v11-Ausschnitte.

## 2. Lernwelten (überarbeiteter Vorschlag)

Gegenüber dem Ausgangsvorschlag wurden Welten nach Spielphasen und Komplexität neu geschnitten: „Umschalten“ ist eigene Welt (DFB- und FIFA-Spielphasen), „Ich verteidige richtig“ wurde in „zu zweit“ (Gruppentaktik) und „gemeinsam“ (Mannschaftstaktik) geteilt, weil dazwischen der größte Komplexitätssprung liegt.

| Welt | Titel | Kern | typischer Altersrahmen |
|---|---|---|---|
| W1 | Spielfeld & Raum | Orientierung, freier Raum, nicht alle zum Ball, Schulterblick | ab E |
| W2 | Anspielbar sein | Freilaufen/Anbieten, Abstand, Breite & Tiefe, Dreiecke, Überzahl, dritter Mann | ab E |
| W3 | Verteidigen zu zweit | Stellen, Absichern, Lenken, Passwege zustellen | ab E/D |
| W4 | Gemeinsam verteidigen | Balance/Mitte schützen, Verschieben, Kompaktheit (im Verbund), Pressing-Grundlagen | ab D/C |
| W5 | Räume im Angriff | Raum im Rücken, Verlagerung, Gegner binden, Verhalten nach dem Pass | ab D |
| W6 | Umschalten | nach Ballverlust (Gegenpressing oder Ordnung), nach Ballgewinn | ab C |
| W7 | Spielintelligenz | Entscheiden unter Zeitdruck, Risiko/Nutzen, Antizipation, Sequenzen | ab D |

Die Altersrahmen der Welten und Kompetenzen sind überwiegend eigene Ableitungen; belegt sind nur „Linie verteidigen spätestens ab D“ und „Positionsspezifik ab C“ (A-87). Pressing-Grundlagen sind ab C eingeordnet, weil DFB- und FIFA-Einheiten für U14/U15 sie enthalten (A-15, B-10, B-12). Details: [Altersgerechte Lernziele](../recherche/altersgerechte-lernziele.md).

Regelwissen (Abseits, Spielfortsetzungen) kann als Querschnittsthema ergänzt werden. **Technik** (Dribbling, Ballannahme, Passtechnik, Zweikampf) lässt sich digital nicht trainieren; SPIELIQ verweist hierfür ausschließlich auf Platz-Spielformen.

## 3. Kompetenzbaum (27 Knoten)

Voraussetzungen (→) sind fachlich begründete Empfehlungen, keine Sperren. ✓ = Inhalte in v1 spielbar.

```
W1  K-ORIENTIERUNG ─┬─► K-SCHULTERBLICK
    K-RAUM-ERKENNEN ✓ ─► K-NICHT-ALLE ✓ ─┬─► K-ANSPIELBAR ✓ ─┬─► K-BREITE-TIEFE ✓ ─┬─► K-RAUM-IM-RUECKEN ─► K-GEGNER-BINDEN
                                        │                   │                    ├─► K-VERLAGERN
                                        │                   │                    └─► K-NACH-BALLGEWINN
                                        │                   └─► K-DREIECKE ✓ ─┬─► K-UEBERZAHL
                                        │                                      ├─► K-DRITTER-MANN
                                        │                                      └─► K-NACH-DEM-PASS
                                        └─► K-ERSTER-VERTEIDIGER ✓ ─┬─► K-ZWEITER-VERTEIDIGER ✓ ─► K-BALANCE ✓ ─┐
                                                                    ├─► K-LENKEN                                │
                                                                    └─► K-PASSWEGE-ZU                           ▼
                                                     K-VERSCHIEBEN ✓ (braucht ZWEITER-VERTEIDIGER + BALANCE) ─► K-KOMPAKTHEIT ─► K-PRESSING
                                                     K-VERSCHIEBEN ─► K-NACH-BALLVERLUST
W7  K-ENTSCHEIDEN-ZEITDRUCK (braucht ANSPIELBAR + ERSTER-VERTEIDIGER) ─► K-RISIKO, K-ANTIZIPATION
```

Jede Kompetenz verweist auf Prinzipien (`P-…`), die in den Bewertungskriterien geprüft werden. Der Kompetenzbaum ist im Code zyklenfrei getestet.

## 4. Lernprogression vom Einsteiger zum Fortgeschrittenen

| Stufe | Spieler kann … | Feldgröße / Spielerzahl in Aufgaben | Interaktionen | Hilfen |
|---|---|---|---|---|
| 1 Einsteiger | Ball, Tore, Mitspieler, Gegner erkennen; freien Spieler finden; weiß, warum nicht alle zum Ball gehen | 1–4 Figuren + Ball, Ausschnitt | antippen, eine Figur ziehen | Live-Passwege, Tipps, Lösung |
| 2 Grundlagen | sich anbieten, Abstand halten, stellen, absichern | 2v1 bis 3v3 | 1–3 Figuren ziehen | Tipps, keine Live-Hilfen im Test |
| 3 Fortgeschritten | Kette verschieben, Mitte schützen, Dreiecke und Verlagerung nutzen | Mannschaftsteil (4–6 Figuren), halbes Großfeld | mehrere Figuren, Folgen | Tipps nur auf Anfrage |
| 4 Sicher | Pressing-Auslöser erkennen, Umschalten, Raum im Rücken | 7v7–11v11-Ausschnitte | Entscheidungsketten, Zeitfenster (abschaltbar) | keine Live-Hilfen |
| 5 Experte | antizipieren, Risiko abwägen, mannschafts- und gegnerspezifische Lösungen | ganze Mannschaft | mehrstufige Entscheidungen, Vergleich von Situationen | – |

Die Stufe ergibt sich aus den Kompetenzzuständen („digital verstanden“) und kann vom Trainer je Spieler gesetzt werden. Das Alter bestimmt nur, welche Themen **empfohlen** werden.

## 5. Erste Zielgruppe: C-Jugend mit Defiziten

Die Defizite aus dem Auftrag werden so adressiert:

| Defizit | Kompetenz | Status |
|---|---|---|
| mehrere laufen gleichzeitig zum Ball | K-NICHT-ALLE | ✓ Einheit 1 (M1, M5) |
| keine sinnvollen Abstände | K-ANSPIELBAR, K-BREITE-TIEFE | ✓ M2 |
| wissen nicht, wo sie stehen sollen / wie sie sich anbieten | K-ANSPIELBAR, K-DREIECKE | ✓ M2, M6 (Dreieck) |
| erkennen keine freien Passwege | K-RAUM-ERKENNEN, K-ANSPIELBAR | ✓ M1, M2 (Live-Passwege) |
| kennen erster/zweiter/dritter Verteidiger nicht | K-ERSTER-, K-ZWEITER-VERTEIDIGER, K-BALANCE | ✓ M3, M5 |
| verschieben nicht gemeinsam | K-VERSCHIEBEN | ✓ M4, M6 |
| bleiben stehen, wenn sich die Situation ändert | K-NACH-DEM-PASS, K-SCHULTERBLICK | geplant (Einheit 2/3) |
| Breite und Tiefe | K-BREITE-TIEFE | ✓ M2 |
| Entscheidungen ohne Wahrnehmung | K-SCHULTERBLICK, K-ENTSCHEIDEN-ZEITDRUCK | geplant |
| Positionsaufgaben unklar | (Welt 5/7, Positionsprofile) | geplant |
