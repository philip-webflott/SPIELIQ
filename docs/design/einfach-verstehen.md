# Einfach verstehen – Gestaltungsregeln für alle Spieler:innen

Stand: 30.10.2026 · gilt für alle Spielertexte, das Spielfeld und die Bedienung

## Anlass

Rückmeldung des Produktverantwortlichen nach der ersten Online-Vorschau: Für 14-Jährige, die eine Förderschule oder Hauptschule besuchen, war die erste Version zu kompliziert. Zu viel Text, Fachwörter, Zahlen wie „3,7 m“, zu viele Knöpfe, ein Spielfeld, das je nach Aufgabe anders herum lag, und bis zu vier Spieler auf einmal zu ziehen.

**Entscheidung:** Die einfache Fassung ist der Standard für alle – es gibt keinen getrennten „Leicht-Modus“. Was für schwache Leser:innen verständlich ist, hilft auch allen anderen; Details stehen in den Trainertexten (`coachNote`).

## Grundlage

- Viele Anweisungen verengen die Aufmerksamkeit, freie Mitspieler werden übersehen (C-17, nur Suchergebnis).
- Ausgearbeitete Beispiele und das schrittweise Ausblenden von Hilfen helfen Noviz:innen; zu viel auf einmal überlastet (H-25, H-26 – Hintergrundwissen, nicht per Suche bestätigt).
- Begrenzte Zahl gleichzeitig verfolgbarer Objekte, wachsende Kapazität des Arbeitsgedächtnisses (H-72, H-73 – Hintergrundwissen) → wenige entscheidungsrelevante Spieler, Schritt für Schritt.
- WCAG 2.2, 3.1.5 „Leseniveau“ (Hintergrundwissen, D-47).
- Die konkreten Sprachregeln unten sind **eigene Ableitung** in Anlehnung an „Einfache Sprache“; sie stammen nicht aus einer geprüften Quelle. Ob sie wirken, zeigt nur ein Test mit Kindern der Zielgruppe (Abschnitt 6).

## 1. Sprache

| Regel | Beispiel vorher → nachher |
|---|---|
| Ein Gedanke pro Satz, höchstens zwei Sätze pro Bildschirmtext | „Einer geht zum Ball und stellt den Gegner. Die anderen bleiben bei ihren Gegenspielern und schützen den Raum vor dem Tor.“ → „Nur einer geht zum Ball. Die anderen bleiben hinten und passen auf.“ |
| Keine Zahlen mit Einheiten (Meter, Sekunden) – stattdessen Spielernummern | „Nummer 10 steht mit 3,7 m zu nah am Ball“ → „Nummer 10 steht zu nah am Ball.“ |
| Keine Fachwörter in Spielertexten | „Verschiebe die Viererkette“ → „Schiebt alle vier zur Seite von Nummer 7.“ |
| Du-Form, aktiv, konkrete Handlung | „Tippe auf den Gegner, der am gefährlichsten frei steht.“ → „Welcher Gegner ist ganz allein? Tippe ihn an.“ |
| Zuerst, was gut ist; Fehler als Weg zur Lösung | „Noch nicht ganz.“ + ein Satz, was zu tun ist |

**Wortliste** (Spielertexte; Trainertexte dürfen Fachbegriffe nutzen):

| Fachwort | einfache Formulierung |
|---|---|
| stellen, erster Verteidiger | zum Gegner mit dem Ball gehen |
| absichern, zweiter Verteidiger | schräg hinter ihm stehen, helfen |
| Balance, dritter Verteidiger | in der Mitte vor unserem Tor aufpassen |
| Viererkette | die vier hinten, alle vier |
| verschieben | zur Seite vom Ball rücken |
| Passweg offen / zugestellt | der Pass kommt an / ein Gegner steht im Weg |
| anspielbar sein | frei für einen Pass sein |
| Breite und Tiefe | zur Seite, nach vorne, nach hinten |
| ballnah / ballfern | nah am Ball / weit weg vom Ball |
| Seitenwechsel | der Ball ist jetzt auf der anderen Seite |

## 2. Spielfeld

- **Immer gleich ausgerichtet:** Unser Tor liegt in jeder Aufgabe unten, wir spielen nach oben (auf Handy und Computer). Das Gerät kann trotzdem hoch oder quer gehalten werden.
- **Legende über dem Feld:** „● Wir ● Gegner ↑ Wir spielen nach oben“.
- **Tore beschriftet:** „UNSER TOR“ / „TOR GEGNER“, sobald ein Tor im Ausschnitt ist.
- **Keine Zahlen am Feld:** Abstandslinien ohne Meterangabe; Passwege mit Form und Zeichen (✓, !, ✕) statt Zahlen.
- **Lösung nicht vorwegnehmen:** Markierungen wie „LEER“ (verlassener Raum) nur beim Zuschauen, nicht in der Aufgabe selbst.
- **Figuren nicht übereinander:** Startaufstellungen so wählen, dass sich Figuren nicht überdecken und gut antippbar sind.

## 3. Bedienung

- Ein Hauptknopf pro Bildschirm („Weiter“, „Prüfen“, „Nochmal versuchen“).
- Beschriftete statt reiner Symbolknöpfe: „Nochmal“ und „Langsam“ statt Pause/Wiederholen/0,5×/Springen.
- „Weiter“ während einer Animation springt erst ans Ende (die Erklärung wird gesehen), der zweite Klick geht weiter.
- Kurzer Bedienhinweis: „Tippe einen Blauen mit gestricheltem Ring an. Dann tippe, wo er hin soll.“ (Ziehen geht weiterhin; Tastaturhinweis nur für Screenreader).
- **Schritt für Schritt** bei mehreren Spielern: Feld `guide` im Szenarioformat. Ein kurzer Satz pro Teilschritt, beschreibt Aufgaben (Rollen), nicht feste Spieler oder Zielpunkte; gezählt wird, wie viele Spieler schon bewegt wurden. Die Bewertung bleibt unverändert.
- Nach einer Antwort läuft zuerst die Folge („Was passiert?“), dann erscheint automatisch die Begründung am Feld; „Nochmal ansehen“ wiederholt beides.
- „Hilfe“ (gestufte Tipps) jederzeit, „Zeig mir die Lösung“ schon nach dem ersten Fehlversuch. Wer die Lösung ansieht, gilt für diese Aufgabe nicht als „selbstständig gelöst“.
- Höchstens eine positive Zusatzzeile im Feedback.

## 4. Abschluss einer Mission

- „Geschafft!“ statt Quote („0 von 1 Aufgaben im ersten Versuch“).
- „Das hast du gelernt“ mit kurzen Ich-Sätzen (`playerText` der Prinzipien) und „kannst du“ / „noch üben“.
- Eine Aufgabe für den Platz in einem Satz; Spielformen sehen die Trainer:innen in ihrem Bereich.

## 5. Automatische Prüfungen

`packages/content/test/missions.test.ts` prüft für jede Mission:
- Anweisungen höchstens 140 Zeichen,
- keine Zahlen mit Einheit in Spielertexten (Ziel, Anweisungen, Erklärungen, Tipps, Feedback, Anleitung),
- höchstens ein Anleitungsschritt pro steuerbarem Spieler, jeder höchstens 70 Zeichen,
- keine Meter- oder Sekundenplatzhalter in den Feedbacktexten der Engine.

## 6. Offen und als Nächstes

1. **Test mit Kindern der Zielgruppe** (3–5 Spieler:innen, mit Einwilligung der Eltern): Verstehen sie jede Anweisung ohne Erklärung? Wo tippen sie? Verstehen sie „schräg dahinter“, „Lücke“, „Mitte“? Wird die Vorlesefunktion genutzt?
2. **Vorlesen:** umgesetzt mit vorab erzeugter KI-Stimme (ElevenLabs), automatisch an, abschaltbar ([Sprachausgabe](../konzept/sprachausgabe.md)). Im Test prüfen: Tempo, Verständlichkeit, hilfreich oder störend?
3. **Noch leichterer Einstieg:** eine Einheit mit nur einem Spieler pro Aufgabe (z. B. „Wo ist Platz?“) vor Lerneinheit 1.
4. **Bildsymbole für Rollen** (zum Ball gehen, helfen, Mitte schützen), die in Texten, Anleitung und Feld gleich aussehen.
5. **Trainer-Einstellung je Spieler:** Hilfen dauerhaft eingeblendet, „Langsam“ als Standard.
