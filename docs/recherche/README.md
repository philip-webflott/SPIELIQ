# Recherche – Methodik, Stand und Lesehilfe

Stand: 29.10.2026 · Phase A (Grundlagenrecherche)

Dieses Verzeichnis enthält die fachlichen, wissenschaftlichen und rechtlichen Grundlagen von SPIELIQ. Jede fachliche Aussage in Code, Inhalten und Konzepten soll auf eine Quelle aus diesen Registern verweisen oder ausdrücklich als Annahme gekennzeichnet sein (siehe `CLAUDE.md`).

## 1. Wie recherchiert wurde (ehrliche Einordnung)

- **Internetzugang:** Die Sitzung hatte Internetzugang über einen Netzwerk-Proxy mit Freigabeliste. Viele Domains waren gesperrt (Proxy-Antwort 403), darunter meinfussball.de, dfb-akademie.de, die Seiten der Landesverbände, fifa.com/inside.fifa.com, thefa.com, EUR-Lex, EDPB, DSK, W3C sowie wissenschaftliche Verlage, PubMed/PMC und Repositorien. Erreichbar waren u. a. dfb.de, assets.dfb.de, fussball.de, fifatrainingcentre.com, uefa.com, editorial.uefa.com und gesetze-im-internet.de.
- **Zwei Werkzeuge:**
  1. *Websuche* (Trefferlisten mit Titel, URL und automatischer Zusammenfassung). Das Kontingent von 200 Suchen pro Durchlauf wurde mit parallel arbeitenden Recherche-Agenten geteilt und war vor Abschluss aller Fragen erschöpft.
  2. *Direkter Abruf* von Originalseiten und PDFs (curl über den Proxy, Text aus HTML bzw. PDF extrahiert, ein bildbasiertes ePaper seitenweise gelesen). Nur dort, wo die Domain freigegeben war.
- **Folge:** Aussagen haben unterschiedliche Belastbarkeit. Jede Aussage trägt deshalb einen Status (Abschnitt 2). Videos, Grafiken und eingebettete Flipbooks wurden nicht ausgewertet.
- **Keine erfundenen Quellen:** Wo eine Quelle nur aus dem Gedächtnis bekannt ist, steht sie in einer eigenen Prüfliste (H-Einträge in Register C, [HW]-Einträge in Register D) und ist nicht als gesichert ausgewiesen.
- **Urheberrecht:** Alle Inhalte sind paraphrasiert; wörtliche Zitate höchstens etwa 15 Wörter und nur aus tatsächlich gelesenen Texten. DFB-, FIFA- und UEFA-Texte, -Grafiken und -Videos werden nicht übernommen.

## 2. Kennzeichnungen

| Kennzeichnung | Bedeutung | Darf verwendet werden für … |
|---|---|---|
| **[verifiziert]** / „Volltext abgerufen 29.10.2026“ | Aussage im Originaltext geprüft | fachliche Begründungen, Feedbacktexte, Inhalte |
| **[nur Suchergebnis]** / „Originalseite nicht geöffnet“ | nur aus Trefferliste/Zusammenfassung des Suchwerkzeugs | Hinweise und Hypothesen; vor Übernahme in Inhalte im Original prüfen |
| **[Hintergrundwissen, nicht per Suche bestätigt]** (Register C: H-xx, Register D: [HW]) | aus dem Gedächtnis, in dieser Sitzung nicht geprüft | nur als Prüfauftrag; nie als Beleg nach außen |
| **[Eigene Ableitung]** / „Designfolgerung“ | Schlussfolgerung für SPIELIQ, keine Quellenaussage | Produktentscheidungen, klar als solche benannt |
| **(a) / (b) / (c)** (Register B, Synthese) | (a) Grundprinzip · (b) möglicher Lösungsweg · (c) kontextabhängige Vorgabe | Ebenenmodell der Bewertung (siehe [Ausbildungsprinzipien](ausbildungsprinzipien.md)) |

## 3. Register und Verifikationsstand

| Register | Inhalt | Einträge | Im Volltext geprüft | Nur Suchergebnis | Nur Hintergrundwissen |
|---|---|---|---|---|---|
| [A – DFB und deutsche Strukturen](quellen/A-dfb-jugendfussball.md) | TPD, Kinderfußball-Spielformen, Altersklassen, Spielauffassung, MEIN FUSSBALL, Trainingsthemen | 102 (A-01–A-102) | 42 (26 nachgeprüft, 16 neue Originale A-87–A-102) | 58 (Domains gesperrt) + A-05 (nur Weiterleitung), A-79 (HTTP 404) | einzelne Angaben, markiert |
| [B – FIFA, UEFA, andere Verbände](quellen/B-fifa-uefa-verbaende.md) | Verteidigen individuell/kollektiv, Druck–Absicherung–Balance, Zonenverteidigung, Passen/Freilaufen, Wahrnehmung, Football Language, UEFA-Ausbildung | 105 (B-01–B-105) | 72 (60 nachgeprüft, 12 neue Originale B-94–B-105) | 33 (B-40, B-41, B-52, B-64–B-93) | einzelne Angaben, markiert |
| [C – Sport- und Lernwissenschaft](quellen/C-sport-und-lernwissenschaft.md) | spielbasierte Vermittlung, taktisches Wissen, perzeptuell-kognitives Training, Transfer, Lernwissenschaft, Motivation, Entwicklung | 56 (C-01–C-56) + Prüfliste H-01–H-83 | 0 (Verlage/Repositorien gesperrt) | 56 | H-01–H-83 (Lernwissenschaft, Gamification, Entwicklung) |
| [D – Recht, Datenschutz, Kinderschutz, Barrierefreiheit](quellen/D-recht-datenschutz-barrierefreiheit.md) | DSGVO/BDSG, TDDDG, DDG, JuSchG, SGB VIII, BFSG, BGB, UWG, KUG, DFB-Kinderschutz, DSA, KI-VO, WCAG | 51 (D-01–D-51) | 24 (D-01–D-24: Bundesgesetze, DFB-Dokumente) | 4 (D-25–D-28) | 23 (D-29–D-51, u. a. DSGVO-Volltext, EDPB, WCAG) |

Gesamt: 314 Registereinträge, davon 138 im Volltext geprüft. Suchläufe im ersten Durchgang: A 59, B 93, C 44, D 3.

**Bekannte Fehlerquote des Suchwerkzeugs:** Bei der Volltextprüfung in A und B wurden falsche Zuordnungen (Aussage stammt aus einer anderen Quelle), eine nicht gedeckte Aussage (A-51: Viererkette „ab 11–12 Jahren“ steht nicht im Original) und mehrere falsche Negativbefunde gefunden. Ungeprüfte Einträge sind deshalb mit Vorsicht zu behandeln.

## 4. Zusammenfassende Dokumente

| Dokument | Frage |
|---|---|
| [Ausbildungsprinzipien](ausbildungsprinzipien.md) | Welche Leitideen gelten (DFB-TPD, FIFA, UEFA, Wissenschaft)? Was ist Prinzip, was Lösungsweg, was Kontextvorgabe? Welche Dogmen vermeiden wir? |
| [Taktische Grundlagen](taktische-grundlagen.md) | Welche taktischen Prinzipien bewertet SPIELIQ, wie sind sie belegt, welche Begriffe verwenden wir? |
| [Altersgerechte Lernziele G–A](altersgerechte-lernziele.md) | Was ist je Altersklasse belegt, was leiten wir ab? Spielformate, Schwerpunkte, Rolle von SPIELIQ |
| [Lernvoraussetzungen](lernvoraussetzungen.md) | Was bringen Kinder und Jugendliche kognitiv, wahrnehmungsbezogen, sozial und körperlich mit – und was folgt daraus für das Design? |
| [Offene Fragen](offene-fragen.md) | Was ist ungeklärt (fachlich, wissenschaftlich, rechtlich, produktseitig) und wie klären wir es? |

Rechtliche Ableitungen: [Datenschutzkonzept](../recht/datenschutzkonzept.md), [Barrierefreiheit](../recht/barrierefreiheit.md).

## 5. Folgerecherche (Priorität)

1. **MEIN FUSSBALL im Original** (meinfussball.de freigeben): Spieler-Bereich „Eigentraining“, Trainingsplaner, Terminologie, Nutzungsbedingungen – wichtigste DFB-Referenz und möglicher Wettbewerber (A-73, A-101).
2. **Rechtstexte im Original** (EUR-Lex, EDPB, DSK, W3C freigeben): DSGVO Art. 6, 8, 12, 22, 25; DSA Art. 28 und Leitlinien der Kommission; WCAG 2.2 „Understanding“ zu 2.2.1; DSK-Muss-Liste DSFA (D, Offene Punkte 1).
3. **Wissenschaft im Volltext** (Verlage/PMC freigeben): C-02, C-03 (Meta-Analysen spielbasierter Ansätze), C-49, C-50 (perzeptuell-kognitives Training), C-34 (TacticUP), dazu die H-Prüfliste in der Reihenfolge aus Register C, Offene Punkte 1.
4. **Landesverbände** (fvn.de, nfv.de, wuerttfv.de, bfv.de, badfv.de, sbfv.de): regionale D- und C-Formate.
5. **Fachliche Validierung** durch lizenzierte Jugendtrainer:innen (mindestens B-Lizenz mit Jugendschwerpunkt): Begriffe, Einführungsalter, Schwellenwerte der Engine (siehe [Engine, Abschnitt 4](../konzept/engine.md)).

Die Domain-Freigaben stellt die Person ein, die die Sitzungsumgebung verwaltet (Netzwerkeinstellungen der Umgebung).
