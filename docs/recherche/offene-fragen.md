# Offene Fragen

Stand: 29.10.2026 · Sammelstelle für ungeklärte Punkte aus Recherche, Konzept und Umsetzung. Details stehen jeweils im Abschnitt „Offene Punkte“ der Register [A](quellen/A-dfb-jugendfussball.md), [B](quellen/B-fifa-uefa-verbaende.md), [C](quellen/C-sport-und-lernwissenschaft.md) und [D](quellen/D-recht-datenschutz-barrierefreiheit.md).

## 1. Entscheidungen für den Produktverantwortlichen

Diese Punkte verändern Produktvision, Budget oder grundlegende technische Festlegungen. Bis zur Entscheidung gilt die genannte Voreinstellung.

| Nr. | Frage | Voreinstellung (begründet) | Auswirkung |
|---|---|---|---|
| E-1 | Betriebsmodell: nur über Vereine (Verein ist Verantwortlicher, SPIELIQ Auftragsverarbeiter) oder zusätzlich direkt an Familien/Spieler:innen (B2C)? | nur Vereinsmodus; Gastmodus ohne Konto für alle | B2C bringt eigene Verantwortlichkeit, Elternkonten, Zahlungsstrecke, BFSG-Pflichten (D, Tabelle 1) |
| E-2 | Eltern als eigene Nutzergruppe (Elternkonto, Einsicht, Einwilligung digital)? | nein; Einwilligung liegt beim Verein, Trainer:in bestätigt beim Teamcode | Elternkonten verbessern Nachweis und Transparenz, kosten aber Entwicklung und Support |
| E-3 | G- und F-Jugend ohne Spielerkonten? | ja, technisch durchgesetzt (kein Teamcode für G/F) | Datensparsamkeit, DFB-Linie gegen frühe Taktik (A-21, A-88) |
| E-4 | Fachliche Prüfung: Wer gibt Inhalte frei (lizenzierte:r Jugendtrainer:in, mindestens B-Lizenz mit Jugendschwerpunkt, plus pädagogische Sicht)? | noch niemand; alle Inhalte stehen auf `review` | Voraussetzung für den Einsatz mit Kindern ([Qualitätsstandards](../qualitaet/qualitaetsstandards.md)) |
| E-5 | Pilot mit der eigenen C-Jugend (Vorher/Nachher, Retention, Trainerbeobachtung)? | geplant, Design in Register C (Offene Punkte 4) | Wirksamkeitsnachweis; braucht Einwilligungen der Eltern |
| E-6 | Hosting und Dienstleister (EU-Region, Auftragsverarbeitung) | Online-Vorschau auf Vercel + Supabase (Region Frankfurt), nur Demo-Daten; für den Echtbetrieb offen | Kosten, Verträge, Datenschutz-Folgenabschätzung; beide Anbieter mit US-Bezug (D-51 [HW]) |
| E-7 | Verhältnis zu DFB / MEIN FUSSBALL (Abgrenzung, ggf. Gespräch) | keine Kooperation, keine Anlehnung an DFB-Marken | Positionierung; MEIN FUSSBALL hat einen Spieler-Bereich „Eigentraining“ (A-101) |
| E-8 | Geschäftsmodell (Vereinslizenz, kostenlos, Förderung) | offen | B2C-Abos lösen Pflichten aus (§§ 312j, 312k BGB, UWG, BFSG; D-10, D-14, D-15) |

## 2. Fachliche Fragen (für lizenzierte Jugendtrainer:innen)

1. **Begriffe:** „zweiter/dritter Verteidiger“ sind FIFA-belegt, aber nicht in geprüften DFB-Originalen; „Verbund“ statt „Kompaktheit“; „Mitte schützen“ für Balance (A, Offene Punkte 14; [Taktische Grundlagen](taktische-grundlagen.md), Abschnitt 7).
2. **Einführungsalter:** Linie verteidigen ab D, Positionsspezifik ab C, Pressing-Grundlagen ab C – Indizien, keine DFB-Vorgabe (A, Offene Punkte 15).
3. **Schwellenwerte der Engine:** Absicherungsabstand, Kettenlücken, Verschiebefaktor, Passdistanzen, Zeitpuffer – alle Modellannahmen. Vorschlag: Expertenurteile zu 30–50 standardisierten Situationen je Kriterium, danach Bänder anpassen ([Engine](../konzept/engine.md), Abschnitt 4).
4. **Lenkrichtung** (außen, innen, zu einer Seite) als Trainereinstellung statt fester Regel (B, S4.1).
5. **Freigabe der Missionen 1–6** nach den Checklisten in den Qualitätsstandards; insbesondere Realismus der Ausgangslagen und der Konsequenz-Animation.
6. **Spielformen für den Platz** (`drills.ts`): Organisation, Feldgrößen, Coachingpunkte prüfen.

## 3. Wissenschaftliche Fragen

1. **Wirkt ein 2D-Simulator auf das Spielverhalten?** Keine Studie zu diesem Format für U14/U15 gefunden; Laboreffekte überschätzen Feldeffekte (C-49, C-50, C-51). → Pilotstudie.
2. **Vogel- oder Spielerperspektive** für Entscheidungen? (C, Offene Punkte 6)
3. **Beherrschungskriterium:** „digital verstanden“ = zwei Situationen ohne Tipp, davon eine Transfer- oder Testsituation – Startwert, zu validieren; ebenso das Auffrischintervall von 7 Tagen.
4. **Dosis:** Wie viele Minuten pro Woche, wie verteilt? Keine Dosisempfehlung gefunden (C-47, C-49).
5. **Altersnormen** für Teammetriken in U14/U15 fehlen (C-38, C-39, C-40).
6. **Volltextprüfung** der Register-C-Quellen und der H-Prüfliste (Verlage und Repositorien waren gesperrt).

## 4. Rechtliche Fragen

Vollständige Liste: Register D, Tabelle 3. Wichtigste Punkte, die vor einem Echtbetrieb anwaltlich zu klären sind:

1. Rollenverteilung Verein ↔ SPIELIQ (Auftragsverarbeitung oder gemeinsame Verantwortung).
2. Rechtsgrundlage für Lernstände Minderjähriger (Vertrag, berechtigtes Interesse oder Einwilligung) und Art. 8 DSGVO im Vereinsmodus.
3. Nachweis der Einwilligung der Sorgeberechtigten (heute: Bestätigung durch Trainer:in beim Teamcode).
4. Datenschutz-Folgenabschätzung (voraussichtlich erforderlich) und Benennung eines Datenschutzbeauftragten (§ 38 BDSG bei DSFA-Pflicht).
5. Speicherfristen und Altersübergänge (16, 18), Elternrechte ab 16.
6. Einordnung nach DSA und KI-Verordnung (falls später KI-Feedback).
7. Reichweite des BFSG (nur bei B2C-Abo relevant).

Stand der Umsetzung: [Datenschutzkonzept](../recht/datenschutzkonzept.md).

## 5. Recherche-Lücken

| Lücke | Grund | Nächster Schritt |
|---|---|---|
| MEIN FUSSBALL (Inhalte, Terminologie, Nutzungsbedingungen) | Domain gesperrt | Domain freigeben, Spieler-Bereich und Trainingsplaner prüfen |
| Landesverbände (regionale D-/C-Formate) | Domains gesperrt | Freigabe fvn.de, nfv.de, wuerttfv.de, bfv.de, badfv.de, sbfv.de |
| EU-Rechtstexte, Aufsichtsbehörden, WCAG | Domains gesperrt | Freigabe EUR-Lex, EDPB, DSK, W3C |
| Wissenschaftliche Volltexte | Verlage/PMC gesperrt | Freigabe oder Bibliothekszugang |
| Angebliche EU-Initiative „KIDS Act“ (COM(2026) 681) | nur ein wenig verlässlicher Treffer | Status klären (D, Offene Punkte 2) |
| Jüngste Gesetzesänderungen (JuSchG, BFSGV, TDDDG, DDG, BDSG, UWG, SGB VIII) | Änderungsgesetze nicht ausgewertet | anwaltliche Prüfung (D, Offene Punkte 4) |

## 6. Technische offene Punkte

Siehe [Entwicklungsplan](../entwicklungsplan.md), Abschnitt 4, und [Sicherheit](../architektur/sicherheit.md), „Offene Härtungsmaßnahmen“.
