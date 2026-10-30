# Lernsystem

Stand: 29.10.2026 · Grundlage: Recherche A (DFB), B (FIFA/UEFA), C (Wissenschaft) · Code: `packages/content`

## 1. Leitidee

**Sehen → Verstehen → Selbst entscheiden → Ausprobieren → Feedback → Wiederholen → Auf dem Platz anwenden.**

SPIELIQ ist eine **Ergänzung** zum Training, kein Ersatz. Die Trainingsphilosophie Deutschland (TPD) des DFB stellt Nettospielzeit in kleinen Spielformen ins Zentrum (U8–U16 mindestens 48 min, ab U17 32 min pro Woche; Qualitätsmerkmale Freude, Intensität, Wiederholung; A-01, A-87, Volltext geprüft). Das TPD-Flipbook sieht reines „Prinzipien- und Spielausschnittstraining“ kritisch, weil dabei die Entwicklung der Einzelnen in den Hintergrund trete (A-87). Daraus folgt für SPIELIQ:

- Taktik wird als **individuelle Entscheidung im Spiel** vermittelt (wann, wohin, mit wem) – nicht als Positionsschablone.
- Kurze Sitzungen (2–5 min je Mission), keine Konkurrenz zur Trainingszeit, keine Wartezeiten, viele Entscheidungen pro Minute (Intensität), Varianten derselben Situation (Wiederholung), Erfolgserlebnisse (Freude).
- Jede Mission endet mit einer Aufgabe und einer passenden kleinen Spielform für den Platz.

## 2. Evidenzbasierte Gestaltungsprinzipien

| Prinzip | Umsetzung in SPIELIQ | Evidenz (Recherche C) |
|---|---|---|
| Spielnah statt isoliert | echte Spielsituationen mit Toren und Spielrichtung, Folgeaktion wird gezeigt | Spielbasierte Ansätze verbessern Entscheidungen (Meta-Analysen, Evidenzqualität niedrig); Kritik an fehlendem Spielrealismus (A) |
| Aktiv entscheiden statt zusehen | jede Mission enthält Antipp-, Positionier- oder Auswahlaufgaben | Transfer wahrscheinlicher bei aktiven, handlungsnahen Antworten (Hadlow et al. 2018, C-44; Pinder et al. 2011, C-14) |
| Ein Prinzip pro Bildschirm, wenige Hinweise | eine Anweisung (≤ 140 Zeichen), höchstens 3 gestufte Tipps | Viele Instruktionen ließen Spieler freie Mitspieler übersehen (Memmert & Furley 2007, C-17) |
| Variation statt Auswendiglernen | Transfermission mit neuen Lagen, gespiegelte Varianten, Rollen aus der Position statt fest vergeben | Variabilität/Interleaving fördern Prinzip- statt Positionslernen (Hintergrundwissen, zu verifizieren) |
| Unmittelbares, erklärendes Feedback | Ursache + Visualisierung (Passwege, Abstände) + Konsequenz-Animation | Feedback-Forschung (Hintergrundwissen, zu verifizieren) |
| Fehler als Lernchance | „Noch nicht ganz“, Nochmal, Hilfe, Lösung zum Nachmachen schon nach dem ersten Fehlversuch | Positive Fehlerkultur; Lösung zum Nachmachen statt Bestrafung |
| Wissen ≠ Können | „digital verstanden“ ≠ „auf dem Platz angewendet“; Trainerbeobachtung als eigener Status | Wissen und Spielhandeln korrelieren nur schwach bis mittel (C) |
| Transfer bewusst planen | Pflicht-Verknüpfung jeder Mission mit einer Spielform; Pilotstudie mit Retentionstest geplant | Laboreffekte deutlich größer als Feldeffekte (Zhu et al. 2024, C-49); keine Studie zu 2D-Simulatoren für U14/U15 (C) |

**Einfach verstehen:** Alle Spielertexte, das Spielfeld und die Bedienung folgen den Regeln in [Einfach verstehen](../design/einfach-verstehen.md) (Einfache Sprache, feste Ausrichtung, Schritt-für-Schritt-Anleitung, Hilfe nach dem ersten Fehlversuch).

## 3. Zwei getrennte Dimensionen

1. **Altersrahmen** (G–A): Empfehlung, ab wann ein Thema sinnvoll ist (`fromAgeGroup` im Kompetenzbaum). Keine Sperre.
2. **Kompetenzniveau** (1 Einsteiger … 5 fortgeschritten): was ein Spieler tatsächlich beherrscht. Wird aus Leistungen abgeleitet und kann vom Trainer zusätzlich festgelegt werden (Lernniveau).

Ein C-Jugendlicher kann in „Verteidigen zu zweit“ Einsteiger sein, ein talentierter E-Jugendlicher schon Transferaufgaben lösen.

## 4. Fortschritt: drei getrennte Zustände

| Zustand | Regel (Code: `progress-rules.ts`) | Sichtbar für |
|---|---|---|
| **bearbeitet** | mindestens ein Versuch zu einer Mission der Kompetenz | Spieler, Trainer |
| **digital verstanden** | in **≥ 2 verschiedenen Situationen ohne Tipp** gelöst, davon **≥ 1 Transfer- oder Testsituation** | Spieler, Trainer |
| **auf dem Platz angewendet** | nur durch **Trainerbeobachtung** („sicher angewendet“) | Spieler, Trainer |

Ein digital bestandener Test ist kein Beweis für richtiges Verhalten im Spiel – deshalb werden die Zustände nie zu einer Prozentzahl verrechnet. Verstandenes, das länger als 7 Tage nicht geübt wurde, wird zum Auffrischen empfohlen (verteiltes Üben; Startwert, zu evaluieren).

## 5. Ablauf einer Mission

0. **Erklärfilm** (Lektionsformat, Wunsch des Produktverantwortlichen) – vor den Aufgaben erklärt ein kurzer Film mit Stimme die Idee: 3–5 Abschnitte, je höchstens zwei Sätze, die Figuren bewegen sich zum gesprochenen Text, Hervorhebungen erscheinen danach. Mit Stimme läuft er von selbst weiter (vom System getaktet), ohne Stimme im eigenen Tempo; „Nochmal“ wiederholt einen Abschnitt. Grundlage: kurze Abschnitte und gesprochene Erklärung zur Animation (Register C, C-66, C-71; nachgeprüft am 30.10.2026). Umgesetzt für Mission 1; weitere folgen.
1. **Zuschauen** – kurze Animation (Pause, Zeitlupe 0,5×, Wiederholen); am Ende Erklärung und Hervorhebung (z. B. „FREI“).
2. **Erkennen / Entscheiden** – antippen oder auswählen.
3. **Ausprobieren** – Spieler ziehen (oder antippen + Zielpunkt antippen, oder Tastatur); im Lernmodus optional Live-Passwege.
4. **Feedback** – Überschrift, wichtigster Satz mit Ursache, bis zu zwei positive Punkte; am Feld: Passwege, Abstände, Zonen.
5. **Konsequenz** – „Was passiert jetzt?“: Der Gegner spielt die beste Option; das Ergebnis wird benannt.
6. **Wiederholen / Lösung** – Nochmal; ab dem 1. Fehlversuch „Zeig mir die Lösung“ (zählt nicht als selbstständig gelöst).
7. **Zusammenfassung** – Prinzipien „sicher“ / „üben“, Aufgabe für den Platz, nächste Mission.

## 6. Altersgerechter Einsatz (Empfehlung)

| Altersklasse | Digitaler Einsatz | Begründung |
|---|---|---|
| G, F (U6–U9) | **keine eigenen Spielerkonten** (technisch durchgesetzt: kein Teamcode für G/F); Missionen höchstens gemeinsam im Gastmodus | Kinderfußball ohne frühe Taktik (A-21, A-88), Bildschirmzeit, Lesekompetenz (eigene Ableitung) |
| E (U10/U11) | kurze Einstiegsmissionen (Raum, anspielbar sein), gern gemeinsam mit Trainer | einfache Prinzipien, Spielformen 5v5/7v7 |
| D (U12/U13) | Verteidigen zu zweit, Dreiecke, Überzahl, erstes Verteidigen auf einer Linie | DFB: Grundlagen des Verteidigens auf einer Linie (Verschieben, Herausrücken, Absichern) spätestens ab D-Junioren (A-87, Volltext geprüft) |
| C (U14/U15) | Kette, Verschieben, Kompaktheit, Raum im Rücken, erste Positionsaufgaben | 11v11; Positionsspezifik ab C-Junioren (A-87); keine DFB-Altersvorgabe für Viererkette oder Pressing |
| B, A (U16–U19) | Pressing, Umschalten, Spielintelligenz unter Zeitdruck | mannschaftstaktische Vertiefung |

> Entscheidung (begründet, zur Bestätigung durch den Produktverantwortlichen): Die App richtet sich ab der E-Jugend direkt an Spieler:innen; G/F nur über Trainer:innen. Siehe [Offene Fragen](../recherche/offene-fragen.md), E-3.

## 7. Motivation ohne Manipulation

- Belohnt werden **Verständnis und Fortschritt** (Prinzipien, Kompetenzzustände), nicht Klickmengen. Keine XP-Inflation.
- **Keine öffentlichen Ranglisten**, keine Vergleiche zwischen Kindern; Trainer sehen die Spieler:innen in der Reihenfolge des Beitritts, keine Rangfolge, mit dem Hinweis, dass der digitale Lernstand kein Kriterium für Kader- oder Einsatzentscheidungen ist.
- Keine Streak-Zwänge, keine nächtlichen Benachrichtigungen, keine glücksspielähnlichen Belohnungen, keine Kaufaufforderungen an Kinder (Recherche D: § 10b JuSchG, UWG Anhang Nr. 28, Leitlinien zu Art. 28 DSA – teils nur Hintergrundwissen, siehe Rechtsteil).
- Geplant: gemeinsame Mannschaftsziele („80 % der Mannschaft haben Mission 3 geschafft“), sichtbare persönliche Entwicklung, freischaltbare Lernwelten nach Kompetenz.

## 8. Lehrplan

Lernwelten und Kompetenzbaum: [kompetenzbaum.md](kompetenzbaum.md). Erste Einheit im Detail: [lerneinheit-1.md](lerneinheit-1.md).
