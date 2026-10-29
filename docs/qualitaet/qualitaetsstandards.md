# Qualitätsstandards und Freigabeprozess

Stand: 29.10.2026

## 1. Freigabeprozess für Lerninhalte

| Status | Bedeutung | Wer | Gate |
|---|---|---|---|
| `draft` | in Arbeit | Autor:in | Schema gültig |
| `review` | fachlich ausformuliert, Tests grün | Autor:in | alle Content-Tests (Beispiele, Zufallsschutz, Spiegelinvarianz, Texte) |
| `approved` | freigegeben | lizenzierte:r Jugendtrainer:in (mind. B-Lizenz, Jugendschwerpunkt) + Pädagogik-Review | Checklisten unten vollständig, Review in `mission.review` dokumentiert |
| `retired` | ersetzt | – | neue Version vorhanden |

Alle Missionen der Einheit 1 stehen derzeit auf `review`. **Kein Inhalt wurde bisher von einer lizenzierten Trainerin oder einem lizenzierten Trainer geprüft.**

## 2. Checklisten je Mission

### Fußballfachlich
- [ ] Stimmt die taktische Aussage? Quelle in `sources` dokumentiert?
- [ ] Altersgerecht (Altersrahmen, Spielform, Feldausschnitt)?
- [ ] Situation realistisch genug (Abstände, Laufwege, Spielrichtung, Folgeaktion)?
- [ ] Vereinfachungen fachlich vertretbar und im `coachNote` benannt?
- [ ] Mehrere sinnvolle Lösungen erkannt (mindestens ein alternatives „gut“-Beispiel)?
- [ ] Keine Dogmen (gleiche Abstände, „immer außen“, „nie zurück“)?
- [ ] Bewertung nachvollziehbar (Feedback nennt Ursache)?

### Pädagogisch
- [ ] Genau ein neues Prinzip je Bildschirm?
- [ ] Anweisung ≤ 140 Zeichen, ohne Vorwissen verständlich (Test mit 12-Jährigen)?
- [ ] Kann der Spieler aus dem Fehler lernen (Feedback, Tipp, Lösung zum Nachmachen)?
- [ ] Transfer auf neue Situationen (Transfer-/Testmission, Spiegelung)?
- [ ] Wird Kompetenz geprüft statt Auswendiglernen (Rollen aus Position, Varianten)?
- [ ] Verknüpfung mit einer Spielform für den Platz?

### Design
- [ ] Sofort verständlich, ein klarer nächster Schritt?
- [ ] Auf dem Smartphone lesbar (Ausschnitt so gewählt, dass Figuren nicht überlappen)?
- [ ] Spieler, Gegner, Ball eindeutig unterscheidbar (auch ohne Farbe)?
- [ ] Interaktion präzise (Ziehen, Antippen, Tastatur)?
- [ ] Animationen helfen; „Weniger Bewegung“ funktioniert?
- [ ] Keine überflüssigen Elemente?

### Technisch
- [ ] Typisiert, Schema-valide, Tests grün (Beispiele richtig/falsch, Musterlösung, Zufallsschutz, Raterate, Spiegelinvarianz).
- [ ] Neue Feedback-Schlüssel haben Texte.
- [ ] Server bewertet identisch zum Client (deterministisch, keine Zufallswerte).

## 3. Qualitätsstandards Technik (gesamt)

- TypeScript strikt, keine `any`; Lint ohne Warnungen.
- Fachlogik nur in Engine/Content; Datenzugriff nur in `src/server/modules` mit Berechtigungsprüfung.
- Jede Server Action prüft Sitzung und Rolle; Eingaben mit zod validiert.
- Tests: siehe [Teststrategie](../architektur/teststrategie.md); neue Bewertungskriterien brauchen Unit-Tests mit Positiv-, Negativ- und Grenzfällen.
- Barrierefreiheit: WCAG 2.2 AA als Ziel (siehe [Recht/Barrierefreiheit](../recht/barrierefreiheit.md)).
- Dokumentation: Architekturentscheidungen als ADR; unvollständige Funktionen im Entwicklungsplan gekennzeichnet.

## 4. Wirksamkeit (Evaluation)

Ein digital bestandener Test belegt kein besseres Spielverhalten. Geplante Pilotstudie mit der C-Jugend: Vorher/Nachher (digitaler Test + strukturierte Trainerbeobachtung in einer festgelegten Spielform, z. B. 4 gegen 4 auf vier Minitore), Retentionstest nach 2–3 Wochen, Vergleich mit einer Gruppe ohne SPIELIQ, sofern ethisch und organisatorisch möglich. Kennzahlen: Anteil „digital verstanden“, Übereinstimmung mit Trainerbeobachtung, Abstand „Rudelbildung“ in der Spielform (Anzahl Spieler im 5-m-Umkreis des Balls).
