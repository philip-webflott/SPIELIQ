# Teil A – DFB und deutsche Jugendfußball-Strukturen (SPIELIQ, Phase A)

Stand: 29.10.2026 · Erster Durchgang ausschließlich per Websuche; zweiter Durchgang mit Volltextprüfung der DFB-Originale am selben Tag (siehe Verifikationsprotokoll)

## Methodik und Grenzen (bitte zuerst lesen)

- **Evidenzbasis (erster Durchgang):** 59 Websuchen am 29.10.2026. Ausgewertet wurden nur die Trefferlisten (Titel + URL) und die automatischen Zusammenfassungen des Suchwerkzeugs. **Im ersten Durchgang wurde keine Originalseite geöffnet.** Ein einzelner Abrufversuch (kreis1.fvn.de, PDF) scheiterte an der Netzwerkrichtlinie (DNS-Fehler). Gemäß Vorgabe gab es keine weiteren Abrufversuche.
- **Evidenzbasis (zweiter Durchgang, Volltextprüfung):** Am 29.10.2026 wurden DFB-Seiten, DFB-PDFs und das ePaper des DFB-Journals im Volltext abgerufen (Vorgehen, URLs und Ergebnisse im Verifikationsprotokoll). Geprüfte Einträge tragen im Feld „Zugriff / Verifikationsstatus" den Vermerk „Volltext abgerufen 29.10.2026"; Abweichungen sind als „Korrektur nach Volltextprüfung" gekennzeichnet. Einträge, deren Domain gesperrt war, sind als „inhaltlich unverändert" markiert. Neue Originalquellen: A-87 bis A-102.
- **Fehlerrisiko der Zusammenfassungen:** Das Suchwerkzeug hat nachweislich Fehler gemacht, z. B. nfv.de als „Nordostdeutscher FV" bezeichnet (gemeint ist der Niedersächsische FV) und sbfv.de als „Sächsischer FV" (gemeint ist der Südbadische FV) [beide Zuordnungen: Hintergrundwissen, nicht per Suche bestätigt]. Wo unklar ist, aus welcher URL eine Aussage stammt, steht „Zuordnung unsicher".
- **Suchkontingent erschöpft:** Das Limit liegt bei 200 Suchen pro Durchlauf und wird mit parallel laufenden Agenten geteilt. Es war erschöpft, bevor die Forschungsfragen 3, 6 und 7 vollständig bearbeitet waren. Ausstehende Suchen stehen unter „Offene Punkte".
- **Urheberrecht:** Alle Kernaussagen sind paraphrasiert. Fachbegriffe, Titel, Mottos und Bezeichnungen werden im Original-Wortlaut genannt; darüber hinaus gibt es je Quelle höchstens ein bis zwei sehr kurze wörtliche Zitate (≤ 15 Wörter).
- **Daten:** „unbekannt", wenn kein Datum im Treffer sichtbar war. Aus Dateinamen, URL-Zeitstempeln oder Änderungsdaten der DFB-Sitemap abgeleitete Daten sind als „eigene Ableitung" markiert und nicht mit dem Veröffentlichungsdatum gleichzusetzen.
- **Hintergrundwissen** ist ausdrücklich als „[Hintergrundwissen, nicht per Suche bestätigt]" gekennzeichnet.

---

## Verifikationsprotokoll (Volltextprüfung 29.10.2026)

**Vorgehen.** Abruf mit curl (Browser-User-Agent) über den Netzwerk-Proxy; Auswertung von HTML-Seiten mit BeautifulSoup und von PDFs mit pdftotext; das bildbasierte ePaper DFB-Journal 3/2026 wurde seitenweise als Bild gelesen. Es gab keine Websuche. Downloads wurden ausschließlich als Daten behandelt. Seiten wurden über robots.txt, die DFB-Sitemaps (https://www.dfb.de/sitemap.xml mit sitemap-pages.xml: 789 Seiten; sitemap-news-de.xml: 10.792 Meldungen seit 27.06.2020, inklusive Veröffentlichungsdaten) und über Links in abgerufenen Seiten gefunden.

**Ergebnis in Zahlen.** 26 bestehende Einträge wurden im Volltext geprüft (A-01 bis A-04, A-06 bis A-10, A-14 bis A-17, A-19, A-21 bis A-23, A-45, A-46, A-49 bis A-51, A-72, A-73, A-81, A-83; A-03 und A-04 über das Weiterleitungsziel). Bei A-05 ließ sich nur die Weiterleitung feststellen, A-79 liefert HTTP 404. Neu aufgenommen wurden 16 DFB-Originalquellen (A-87 bis A-102). Die übrigen 58 Einträge blieben ungeprüft, weil ihre Domains gesperrt waren; sie sind im Statusfeld als „inhaltlich unverändert" markiert.

**Erreichbarkeit**
- Erreichbar: www.dfb.de, assets.dfb.de, emagazine.dfb.de (ePaper; Seitenbilder über s3-eu-west-1.amazonaws.com) und www.fussball.de.
- Weiterleitungen: training-service.fussball.de auf www.meinfussball.de (HTTP 301, alle 16 geprüften Pfade); meinfussball.dfb.de auf www.dfb.de/mehr-fussball; www.fussball.de/training-service/ auf die FUSSBALL.DE-Startseite; alle alten Leitbild-URLs auf dfb.de auf die TPD-Seite; www.dfb.de/kinder/ auf /mehr-fussball/kinderfussball.
- Nicht erreichbar (Proxy-Sperre, je ein Versuch): www.meinfussball.de, elearning.meinfussball.de, dfb-akademie.de, dfb-talente.de, web.archive.org und archive.org sowie zdfheute.de, hersfelder-zeitung.de, bfv.de, echo24.de, fvn.de, nfv.de, fv-rheinland.de, wuerttfv.de, berliner-fussball.de, hfv-online.de, juniorkicker.tsg-hoffenheim.de, badfv.de, sbfv.de, epub.sub.uni-hamburg.de, bpb.de, bdfl.de, fussballtraining.com (einschließlich misc.fussballtraining.com), infranken.de, flb.de, schwaebische.de, web.de, coachingarea.net, ucrisportal.univie.ac.at, openpr.de, goal.com und get-in-it.de.

**Abgerufene Quellen und Ergebnis**

| Quelle (URL gekürzt) | Ergebnis | Befund |
|---|---|---|
| dfb.de/mehr-fussball/dfb-akademie/trainingsphilosophie-deutschland | 200 | A-01 bestätigt; Definition „Wiederholung" ergänzt; Profi-Satz gehört zu A-07 (korrigiert) |
| dfb.de/sportliches-leitbild/unser-weg/ ; …/spielvision/spielauffassung/ ; …/leitlinien-fuer-die-defensivphase/ ; …/unsere-ziele/ ; …/dfb-tugenden-20/ | 301 auf TPD-Seite | A-03 und A-04: Aussagen nur noch auf der TPD-Seite belegt (kein eigenständiger Beleg); A-05: Inhalt nicht mehr verfügbar |
| dfb.de/news/spielformen-fuer-kinder-und-jugendtraining | 200 (08.09.2023) | A-06 bestätigt |
| dfb.de/news/tpd-im-profifussball-viel-hilft-viel | 200 (05.10.2026) | A-07 bestätigt; Rolle des 1. FC Nürnberg geklärt |
| dfb.de/news/detail/wolf-den-paradigmenwechsel-hinbekommen-259377 | 200 (06.03.2024) | A-08 bestätigt; ein Zitat war falsch zugeordnet (korrigiert) |
| dfb.de/news/wolf-die-leute-verstehen-dass-wir-dinge-verbinden-wollen | 200 (11.09.2025) | A-09: die Mythos-Aussage („16-mal drei Minuten") gehört zu A-10 (korrigiert) |
| dfb.de/news/trainingsphilosophie-entwicklung-hat-kein-ablaufdatum | 200 (03.09.2026) | A-10 bestätigt; „neue Spielformen ab 2027/2028" bestätigt |
| dfb.de/news/detail/dritter-bundesweiter-dfb-trainingsdialog-250865 | 200 (08.05.2023) | A-17 bestätigt |
| dfb.de/news/das-neue-dfb-journal-hier-ist-was-in-bewegung | 200 (09.09.2026) | A-19 bestätigt |
| dfb.de/mehr-fussball/kinderfussball | 200 | A-21 bestätigt; Widersprüche zu Beschluss und „16 × 20 m" aufgelöst; neue Abweichung zu A-22 (Torhüter ab F oder E) |
| dfb.de/mehr-fussball/kinderfussball-irrtuemer | 200 | A-22 bestätigt |
| dfb.de/mehr-fussball/talentfoerderung | 200 | A-45 bestätigt; Zahlendifferenz zu „mehr als 350" erklärt |
| dfb.de/news/mein-fussball-verlaessliches-wissen-an-einem-ort-fuer-alle-im-fussball | 200 (21.10.2026) | A-73 bestätigt; Zielgruppenliste präzisiert; TPD-Anbindung (A-75) bestätigt |
| dfb.de/news/detail/fussballde-mit-training-und-service-zum-trainerexperten-115333 | 404 | A-79 nicht mehr verifizierbar |
| dfb.de/mehr-fussball/amateurfussball/basisangebote | 200 | A-81 bestätigt und ergänzt |
| dfb.de/news/detail/69-pro-lizenz-lehrgang-am-dfb-campus-247732 | 200 (17.01.2023) | A-83 bestätigt |
| DFB-News vom 23.01.2023, 21.08.2023 (zwei), 27.08.2023 und 27.09.2023 (zwei) | 200 | neu A-93, A-90, A-92, A-91 (TPD-Vorgeschichte und -Vorstellung) |
| DFB-News vom 27.02.2025, 29.03.2025, 20.09.2025 und 01.06.2026 | 200 | neu A-95, A-94, A-96 |
| dfb.de/content/kopfballspiel ; dfb.de/schule-des-kleinfeldfussballs ; dfb.de/training-service/trainerin/c-juniorin | 200 | neu A-97, A-100, A-102 |
| weitere DFB-News (08.09.2023 Neuendorf-Statement, 21.11.2023, 22.11.2023, 02.03.2024, 19.04.2024, 06.05.2024, 13.05.2025, 10.02.2026, 01.10.2026, 05.10.2026, 14.10.2026, 15.10.2026) | 200 | Kontext, konsistent mit den Einträgen; bestätigt u. a. den Inklusionsfußball-Kongress (Weitere Treffer) und Jürgen Klopp als Bundestrainer 2026; die „Spielvision"-Meldung vom 15.10.2026 betrifft nur die Frauen-Nationalmannschaft |
| dfb.de/training-service ; /mehr-fussball ; /mehr-fussball/trainerinnen ; /trainerausbildung ; /dfb-akademie ; /training-service/teampunkt-app ; /content/kinderfussball-in-europa ; /mehr-fussball/schulfussball | 200 | Übersichts- bzw. Platzhalterseiten; TeamPunkt-FAQ bestätigt die Organisations-App für Kinderfußball-Festivals |
| assets.dfb.de …/311/784/original_TPD.pdf (Flipbook) | 200, 70 S. | neu A-87 |
| assets.dfb.de …/292/228/…230919_Trainingsphilosophie_Deutschland.pdf | 200, 9 S. | A-02 bestätigt, einschließlich der Altersangabe „10 bis 18 Jahre" |
| assets.dfb.de …/309/857/…Trainingsdialog_6.pdf | 200, 42 S. | A-14 bestätigt; U14-Feldmaße und Coachingpunkte neu |
| assets.dfb.de …/327/969/…TRAININGSDIALOG-8.pdf | 200, 22 S. | A-15 bestätigt |
| assets.dfb.de …/290/661/…DFB_TRAININGSDIALOG.pdf | 200, 14 S. | A-16 als Trainingsdialog 4 identifiziert |
| assets.dfb.de …/261/493/…FAQ_Kinderfußball_31-05-2022.pdf | 200, 6 S. | A-23 bestätigt |
| assets.dfb.de …/290/709/…ECTFB.pdf | 200, 11 S. | A-46 bestätigt |
| assets.dfb.de …/339/794/…Booklet_-_Wettbewerbsformen_im_Kinderfußball_-_Stand_03-2026.pdf | 200, 34 S. | neu A-88 |
| dfb.de/fileadmin/_dfbdam/ (16 Dateien) | 200 | A-49 und A-50 bestätigt; A-51 nicht gedeckt (korrigiert); A-72 bestätigt; neu A-98, A-99 |
| emagazine.dfb.de … DFB-Journal 3/2026 | 200 (bildbasiert) | neu A-89; Seiten 3–5, 9–15, 32–33, 40–41 und 66–67 gelesen |
| fussball.de/newsdetail/fortbildungen-zur-trainingsphilosophie-deutschland/… | 200 (08.09.2026) | neu A-101 (MEIN-FUSSBALL-Navigation, Fortbildungstermine) |
| training-service.fussball.de (16 Pfade) | 301 auf meinfussball.de | A-101; Migration in MEIN FUSSBALL belegt |

**Bestätigt:** TPD-Kernaussagen (drei Qualitätsmerkmale, 48/32 Minuten, „beste Trainingseinheit", 1v1 bis 4v4, mindestens zweimal pro Woche), MEIN-FUSSBALL-Start am 21.10.2026, Verbindlichkeit der Kinderfußball-Spielformen seit 2024/25 samt Beschluss 2022, Zahlen zur Talentförderung, Trainingsdialoge, Basisangebote und Blended Learning in der Trainerbildung.

**Präzisiert:** Datum der TPD-Vorstellung (Amtsantritt Wolf 21.08.2023, Pressekonferenz 27.09.2023, Vorläufer-Video Januar 2023); Definition von „Wiederholung"; amtliche DFB-Feldmaße, Torgrößen, Spielzeiten und Bälle für G, F und E (Booklet 03/2026); D-Jugend-Pilotformate (7x7-Zwillingsspiel, 3x3 + TW); U14-Feldmaße für TPD-Trainingsformen; neue Wettbewerbsformen U14 bis U16 ab 2027/28; Struktur von MEIN FUSSBALL einschließlich Spieler*innen-Bereich; Aufgehen von training-service.fussball.de in MEIN FUSSBALL; Rolle der Trainer*innen in der TPD.

**Korrigiert:** A-01 (Profi-Satz stammt aus A-07); A-03, A-04 und A-05 (Weiterleitungen statt eigener Seiten); A-08 (Zitatzuordnung); A-09 und A-10 (Mythos-Aussage); A-16 (ist der Trainingsdialog 4); A-19 (Angabe 2027/28 bestätigt und eingeordnet); A-21 (Beschluss- und Maß-Widerspruch aufgelöst); A-49 (ein Blatt von Mario Vossen); A-73 (Zielgruppen); A-79 (404). In der Terminologie sind Freilaufen, Anbieten, Absichern, erste*r Verteidiger*in, Herausrücken, Schulterblick, offene Stellung und Einfrieren jetzt DFB-belegt.

**Widerlegt bzw. nicht gedeckt:** A-51 (Viererkette „schrittweise für 11- bis 12-Jährige" steht nicht im Original); die Synthese-Aussage, Eindribbeln sei als Wettspielregel nicht bestätigt (es ist DFB-Regel, A-21, A-88); die Synthese-Aussage, Spieler*innen seien keine Zielgruppe von MEIN FUSSBALL (es gibt einen Spieler*innen-Bereich, A-101).

---

## Quellen

**Block 1 – Trainingsphilosophie Deutschland (TPD)**

### [A-01] Trainingsphilosophie Deutschland (Seite der DFB-Akademie)
- Organisation/Autor: Deutscher Fußball-Bund (DFB), DFB-Akademie
- URL: https://www.dfb.de/mehr-fussball/dfb-akademie/trainingsphilosophie-deutschland
- Datum (Veröffentlichung/Aktualisierung): auf der Seite kein Datum; Änderungsdatum laut DFB-Sitemap 18.08.2026 (eigene Ableitung)
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seitentext, Zitate, Materialangaben und Linkziele geprüft; der Flipbook-Link führt zu A-87, der E-Learning-Link zu elearning.meinfussball.de, dort gesperrt). Die alten Leitbild-URLs A-03, A-04 und A-05 leiten per HTTP 301 auf diese Seite um.
- Kernaussagen (paraphrasiert):
  - Im Mittelpunkt stehen die Spieler*innen. [bestätigt]
  - Drei verbindliche Qualitätsmerkmale sind bei jeder Trainingsgestaltung mitzudenken: Freude, Intensität und Wiederholung. [bestätigt]
  - Ziel ist altersgerechtes Training auf mehreren Kleinspielfeldern; je mehr Spielzeit und Ballaktionen pro Spieler*in, desto besser. [bestätigt]
  - Freude: Alle Kinder nehmen mit Begeisterung teil und haben durch viele Ballkontakte in jeder Spiel- und Trainingsform Spaß; wer Spaß hat, lernt besser. [bestätigt]
  - Intensität: konstant hohe Nettospielzeit, die Intensität wird schrittweise gesteigert; „Standzeiten sind grundsätzlich zu vermeiden!" [bestätigt; im ersten Durchgang A-03 zugeordnet]
  - Wiederholung (im ersten Durchgang nicht sichtbar): Kinder verbessern sich nur über eine hohe Zahl an Aktionen und werden in dem besser, was sie regelmäßig tun; deshalb steht wiederholendes Training in kleinen Spielformen im Mittelpunkt.
  - Wolf (Zitat auf der Seite): mindestens zweimal pro Woche nach dem Vorbild der „besten Trainingseinheit" trainieren; bis einschließlich U16 mindestens 48 Minuten netto pro Woche in kleinen Spielformen, ab U17 mindestens 32 Minuten. [bestätigt; inhaltsgleich mit A-06]
  - Hannes Wolf (DFB-Direktor Nachwuchs, Training und Entwicklung) hat mit einem Kompetenzteam das Kinder- und Jugendtraining neu aufgestellt. Das Team reist mehrmals pro Woche zu Fortbildungen durch Deutschland; angekündigt ist ein „Heimspiel" am DFB-Campus am 21. August (Jahr nicht genannt). [bestätigt]
  - Materialien: Flipbook (PDF, 13,5 MB; = A-87), Best-of-Video, kostenloser Online-Kurs (eine Stunde, 16 kurze Kapitel, Einführungsvideo plus Wissensabfrage, Zertifikat als erste Stufe der Lizenz-„Treppe"). [bestätigt]
  - Zitiert wird Jürgen Klopp (Internationaler Trainerkongress 2024): Der Bolzplatz müsse organisiert ins Training geholt werden, sonst werde zu wenig gekickt. [neu]
  - Korrektur nach Volltextprüfung: Der Satz, die TPD ziele „ausdrücklich auch" auf Talente auf dem Weg in den Profifußball, steht nicht auf dieser Seite, sondern sinngemäß in A-07.
- Konsequenzen für SPIELIQ: Die drei Qualitätsmerkmale taugen als UX-Kriterien: kurze Szenarien, viele Wiederholungen, keine Wartezeiten. Die DFB-Definition von „Wiederholung" (viele Aktionen, regelmäßig) stützt kurze, häufige Lerneinheiten. SPIELIQ sollte sich als Ergänzung zur Nettospielzeit auf dem Platz positionieren, nicht als Ersatz. Flipbook-Grafiken und -Texte dürfen nicht übernommen werden (Urheberrecht).

### [A-02] „Kinder- und Jugendtraining – Eine Anleitung für Spielformen im Kinder- und Jugendtraining" (TPD-Präsentation, PDF)
- Organisation/Autor: DFB (Kopfzeile „Trainingsphilosophie Deutschland"; kein Autor genannt)
- URL: https://assets.dfb.de/uploads/000/292/228/original_original_230919_Trainingsphilosophie_Deutschland.pdf
- Datum (Veröffentlichung/Aktualisierung): Dateiname „230919" (19.09.2023, eigene Ableitung); PDF-Metadaten: erstellt 10.10.2023. Ein gleichnamiges Video erwähnt der DFB bereits am 23.01.2023 (A-93).
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (alle neun Folien ausgewertet: Qualitätsmerkmale, Nettospielzeit-Richtwerte, Struktur und Varianten der „besten Trainingseinheit", Aktionstabelle, Coaching-Folie).
- Kernaussagen (paraphrasiert):
  - Übergeordnete Trainingsziele für jedes Kind und jede Position: Freude, Intensität, Wiederholung.
  - Nettospielzeit: U8 bis U16 mindestens 48 Minuten pro Woche, ab U17 mindestens 32 Minuten pro Woche.
  - Struktur der „besten Trainingseinheit": 15 Minuten Warm-up, 30 Minuten Spielblock, 15 Minuten Technikblock, 30 Minuten Spielblock.
  - Basis-Trainingsformen 1v1 bis 4v4 in vier Gruppen: Gleichzahl, Gleichzahl mit Anspielern, Über-/Unterzahl, Linie verteidigen/bespielen.
  - Zwei Varianten der „besten Trainingseinheit": für 6 bis 18 Jahre mit 4–5 × 3 Minuten (ca. 1 Minute Pause) in 3v3-Varianten; für 10 bis 18 Jahre mit 3–4 × 4 Minuten netto pro Spieler*in (ca. 2 Minuten Pause) in 1v1- bis 4v4-Varianten, dazwischen ein Block für Zweikämpfe und Technik.
  - Tabelle „Anzahl der Aktionen": Bei 32 Minuten netto pro Einheit kommen in 3v3-Varianten je Spieler*in rund 200 Ballaktionen, 200 fußballspezifische Entscheidungen, 100 Zweikämpfe und 25 Torschüsse zustande, in 7v7-Varianten 50/50/30/5. Es handelt sich um DFB-Werte ohne Methodenangabe.
  - Reflexionsfragen für Jugendtrainer*innen, u. a. zu „Abrufen vs. Entwickeln" und zur „Rondoisierung und Taktisierung des Nachwuchsfußballs"; Leitfrage: Was trainieren wir heute nicht?
  - Coaching-Folie: direktes Umschalten organisieren (neuer Ball, „Shotclock"), das Spiel mit der Stimme begleiten; Leitsatz: Alle greifen gemeinsam an, alle verteidigen gemeinsam.
  - Korrektur nach Volltextprüfung: Die im ersten Durchgang unsichere Blockstruktur (3–4 × 4 Minuten netto, 1v1 bis 4v4) und die Altersangabe „10 bis 18 Jahre" stehen im Original. Zusätzlich gibt es die 3v3-Variante für 6 bis 18 Jahre. Dieses PDF ist nicht das 13,5-MB-Flipbook (das ist A-87).
  - Ergänzung 30.10.2026: Eine inhaltsgleiche Vorfassung (https://assets.dfb.de/uploads/000/289/596/original_230824_FB.de_ohne_Videos_TBA.pdf, PDF-Metadaten 25.08.2023, neun Folien, Volltext abgerufen) nennt für den Block zwischen den Spielblöcken ausdrücklich „Positionstechnik" neben Dribbling, Flugbällen, Torschuss und Flanken.
- Konsequenzen für SPIELIQ: Die Szenario-Bibliothek von 1v1 bis 4v4 aufbauen und nach den vier DFB-Formgruppen gliedern (Gleichzahl, mit Anspielern, Über-/Unterzahl, Linie verteidigen/bespielen). Die Aktionstabelle ist ein DFB-Argument für viele Entscheidungen pro Zeiteinheit, muss aber als DFB-Schätzung gekennzeichnet werden.

### [A-03] Sportliches Leitbild – „Unser Weg" (alte DFB-URL)
- Organisation/Autor: DFB
- URL: https://www.dfb.de/sportliches-leitbild/unser-weg/
- Datum (Veröffentlichung/Aktualisierung): entfällt; die Seite existiert nicht mehr eigenständig
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026: Die URL leitet per HTTP 301 auf die TPD-Seite (A-01) um. Ein eigener Leitbild-Text ist nicht mehr online, die URL fehlt in der DFB-Sitemap.
- Kernaussagen (paraphrasiert):
  - Die im ersten Durchgang dieser URL zugeordneten Aussagen (drei Qualitätsmerkmale; Intensität mit „Standzeiten sind grundsätzlich zu vermeiden"; Freude; Wiederholung) stehen auf der TPD-Seite und sind dort bestätigt (A-01).
  - Korrektur nach Volltextprüfung: Die Beobachtung des Suchwerkzeugs („Kopien derselben Seitenvorlage") erklärt sich durch die Weiterleitung. Diese URL ist kein eigenständiger Beleg; zitiert werden sollte A-01.
- Konsequenzen für SPIELIQ: „Keine Standzeiten" lässt sich digital übersetzen: minimale Lade- und Erklärzeiten, die nächste Wiederholung startet sofort. Als Quelle künftig A-01 angeben.

### [A-04] Sportliches Leitbild – Spielvision/Spielauffassung (alte DFB-URL)
- Organisation/Autor: DFB
- URL: https://www.dfb.de/sportliches-leitbild/spielvision/spielauffassung/
- Datum (Veröffentlichung/Aktualisierung): entfällt
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026: HTTP 301 auf die TPD-Seite (A-01). Die „Leitlinien der Spielauffassung" sind unter dieser Adresse nicht mehr abrufbar; die URL fehlt in der DFB-Sitemap.
- Kernaussagen (paraphrasiert):
  - Bestätigt auf der Zielseite (A-01) und in A-06: mindestens zweimal pro Woche nach dem Vorbild der „besten Trainingseinheit"; Spielen auf Tore in kleinen Gruppen ist zentral; bis einschließlich U16 mindestens 48 Minuten netto pro Spieler*in und Woche in kleinen Spielformen, ab U17 mindestens 32 Minuten; je mehr Spielzeit und Ballaktionen pro Person, desto besser.
  - Präzisierung: Flipbook (A-87) und Präsentation (A-02) nennen für die 48 Minuten die Spanne U8 bis U16. Im Trainingsdialog 4 (A-16, 2023) bezeichnet Wolf die 48 Minuten als Kern in allen Alters- und Leistungsklassen des Kinder- und Jugendfußballs, also ohne die spätere 32-Minuten-Staffelung.
  - Korrektur nach Volltextprüfung: Die URL ist kein eigenständiger Beleg mehr. Die Inhalte der früheren Spielauffassung lassen sich hier nicht verifizieren.
- Konsequenzen für SPIELIQ: Für die Zielgruppe C-Jugend (U14/U15) gilt der 48-Minuten-Richtwert [verifiziert über A-01]. Die Nutzung von SPIELIQ darf nicht auf Kosten der Trainingszeit gehen. Sinnvoll ist eine Vor- und Nachbereitung der Platz-Spielformen.

### [A-05] Leitlinien für die Defensivphase (alte DFB-URL)
- Organisation/Autor: DFB
- URL: https://www.dfb.de/sportliches-leitbild/spielvision/spielauffassung/leitlinien-fuer-die-defensivphase/
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Abruf 29.10.2026: HTTP 301 auf die TPD-Seite (A-01). Der Inhalt der früheren Seite ist nicht mehr abrufbar; ein Archivzugriff (web.archive.org) war gesperrt. Inhaltlich nicht verifizierbar.
- Kernaussagen (paraphrasiert): Belegt bleibt nur, dass die frühere DFB-Spielauffassung eine Seite „Leitlinien für die Defensivphase" führte. Der Inhalt ist weiterhin unbekannt. Aktuelle DFB-Originale zum kollektiven Verteidigen sind das Flipbook-Kapitel „Eine Linie verteidigen und bespielen" (A-87) und die Defensiv-Coachingpunkte im Trainingsdialog 6 (A-14).
- Konsequenzen für SPIELIQ: Statt dieser verschwundenen Seite die aktuellen TPD-Materialien als DFB-Referenz für kollektives Verteidigen nutzen (A-87, A-14).

### [A-06] Spielformen für Kinder- und Jugendtraining (DFB-News mit Video)
- Organisation/Autor: DFB; Autor Jan Fedra
- URL: https://www.dfb.de/news/spielformen-fuer-kinder-und-jugendtraining
- Datum (Veröffentlichung/Aktualisierung): 08.09.2023
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Datum, Autor und Wolf-Zitate geprüft).
- Kernaussagen (paraphrasiert): Video „Vom Trainerzimmer auf den Trainingsplatz" mit Hannes Wolf und Peter Hermann, Fortsetzung des Gesprächs mit Hermann Gerland; Dutzende Spielformen vom 1v1 bis zum 4v4. Wolf: Spielformen sind die Basis guten Trainings; mindestens zwei Einheiten pro Woche nach dem Vorbild der „besten Trainingseinheit"; bis einschließlich U16 mindestens 48, ab U17 mindestens 32 Minuten netto pro Woche in kleinen Spielformen. [alles bestätigt]
- Konsequenzen für SPIELIQ: 1v1 bis 4v4 sind die Kern-Spielformen. Diese Szenariogrößen sollten Vorrang vor 11v11-Strukturen haben.

### [A-07] „TPD im Profifußball: Viel hilft viel" (DFB-News, Auszug aus dem DFB-Journal)
- Organisation/Autor: DFB (Kürzel „jf")
- URL: https://www.dfb.de/news/tpd-im-profifussball-viel-hilft-viel
- Datum (Veröffentlichung/Aktualisierung): 05.10.2026
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Vereinsbeispiele, Personen und Zahlen geprüft).
- Kernaussagen (paraphrasiert):
  - Wolf: Kleine Spielformen auf mehreren Feldern machen alle Spieler besser. Die TPD sei keine Methode nur für den Einstieg; auch Talente auf dem Weg in den Profibereich sollen von vielen Ballaktionen, Entscheidungen, Zweikämpfen und Torabschlüssen profitieren.
  - SC Freiburg (Martin Schweizer, Fußballschule): In der U15 wird minutengenau dokumentiert, wie viel Nettospielzeit in kleinen Spielformen jede*r pro Woche erhält. Liegt der Wert unter 48 Minuten, wird individuell nachgesteuert. [bestätigt]
  - 1. FC Nürnberg (Dieter Frey): eigene, mit der TPD übereinstimmende Spiel- und Trainingsidee („Fußball durch Fußball"); was in kleinen Spielformen zu kurz kommt (z. B. Flanken, Defensivkopfbälle), wird im Zwischenblock bzw. im Individualtraining geübt.
  - VfB Stuttgart (Nico Willig, U21): kleine Spielformen im Übergangsbereich, besonders für Strafraumsituationen; Willig sieht das 9v9 in der D-Jugend kritisch. FC Bayern (Michael Wiesinger): Provokationsregeln verändern den Charakter derselben Spielform.
  - Korrektur nach Volltextprüfung: Die Rolle des 1. FC Nürnberg ist geklärt (eigenes, TPD-nahes Ausbildungskonzept; der 48-Minuten-Wert wird im Text nur für Freiburg genannt).
- Konsequenzen für SPIELIQ: Individuelles Monitoring ist anschlussfähig (Freiburg dokumentiert Minuten pro Spieler*in), etwa als Lernstandsanzeige pro Spieler*in. Dabei ist der Datenschutz für Minderjährige zu beachten. Provokationsregeln sind ein DFB-naher Szenario-Hebel.

### [A-08] „Wolf: Den Paradigmenwechsel hinbekommen" (DFB-News, Kompetenzteam-Gespräch)
- Organisation/Autor: DFB
- URL: https://www.dfb.de/news/detail/wolf-den-paradigmenwechsel-hinbekommen-259377
- Datum (Veröffentlichung/Aktualisierung): 06.03.2024
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Aussagen von Wolf, Balitsch, Lotzen, Wagner und Kronenberg geprüft).
- Kernaussagen (paraphrasiert):
  - Die Vorstellung der TPD lag „etwas mehr als fünf Monate" zurück; das passt zur Pressekonferenz vom 27.09.2023 (A-91).
  - Wolf: Man habe das Gefühl, einen Paradigmenwechsel zurück zu kleinen Spielformen hinzubekommen. Der DFB entscheide nicht, wie Vereine trainieren, könne aber Empfehlungen geben. [bestätigt]
  - Zielbild für den Spieltag: Alle Kinder spielen, pro Kind mindestens 75 % der Spielzeit; sobald ein weiteres 2v2 möglich ist, wird ein neues Feld aufgebaut. Bronze-, Silber- und Goldfelder decken unterschiedliche Niveaus ab.
  - Offene Probleme laut Wolf: reduzierte Förderung in der D-Jugend, wo 9v9 gespielt wird, und erzwungene Vereinswechsel durch „geerbtes" Ligenrecht.
  - Wagner: Kinder müssten auf die Plätze kommen, bevor sie am Computer hängen. Kronenberg: kleine Spielformen seien die effektivste Form für Torhüter*innen.
  - Korrektur nach Volltextprüfung: Das im ersten Durchgang hier verortete Zitat (Spielformen seien entscheidend und die Basis guten Trainings) stammt aus der Meldung vom 08.09.2023 (A-06) bzw. von der TPD-Seite (A-01), nicht aus diesem Gespräch.
- Konsequenzen für SPIELIQ: In der UI „Spielform" statt „Übung" verwenden. Die 75-%-Spielzeit-Norm und Wagners Bemerkung zur Bildschirmzeit zeigen: SPIELIQ muss Platzzeit ergänzen, nicht verdrängen.

### [A-09] „Wolf: Die Leute verstehen, dass wir Dinge verbinden wollen" (DFB-News, Interview)
- Organisation/Autor: DFB (Kürzel „jf")
- URL: https://www.dfb.de/news/wolf-die-leute-verstehen-dass-wir-dinge-verbinden-wollen
- Datum (Veröffentlichung/Aktualisierung): 11.09.2025
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (gesamtes Interview geprüft).
- Kernaussagen (paraphrasiert):
  - Zwischenfazit nach rund zwei Jahren: Man wolle verbinden statt trennen, also große und kleine Vereine, Kinder- und Jugendfußball, Breiten- und Leistungssport, Mädchen und Jungen.
  - Als Ursachen früherer Ausbildungsdefizite nennt Wolf u. a. Entwicklungen wie Videoanalyse, Belastungssteuerung und verändertes Freizeitverhalten.
  - Verbesserungsbedarf: einfache IT (z. B. Kaderlisten mit mehr als zwölf Kindern) und ein einfaches Online-Onboarding, mit dem Neue in einer Stunde das Wichtigste zu gutem Training lernen.
  - Die TPD ist im Kindertrainer-Zertifikat, im Basis-Coach und bis in die B-Lizenz integriert.
  - Schulkonzept: 3v3 auf mehreren Feldern mit Werte-Coaching, z. B. achtmal drei Minuten, mehrmals pro Woche.
  - Kern der TPD in Breite und Spitze: spielen, Tore schießen, viele Aktionen, blocken, dribbeln, umschalten, Zweikämpfe führen, im Flow sein, als Team funktionieren.
  - Korrektur nach Volltextprüfung: Die im ersten Durchgang hier verortete Klarstellung (niemand wolle ausschließlich in kleinen Spielformen trainieren; Beispiel „16-mal drei Minuten") steht nicht in diesem Interview, sondern in A-10 (03.09.2026).
- Konsequenzen für SPIELIQ: Der DFB setzt selbst auf kurze Online-Formate für Trainer*innen (Onboarding in einer Stunde). Das spricht für kurze, klar strukturierte digitale Einheiten. Zugleich sieht der DFB Videoanalyse als einen Treiber der „Taktisierung" im Nachwuchs (vgl. A-92).

### [A-10] „Trainingsphilosophie: Entwicklung hat kein Ablaufdatum" (DFB-News, Auszug aus dem Journal-Interview)
- Organisation/Autor: DFB (Kürzel „jf"); vollständiges Interview im DFB-Journal 3/2026 (A-89), Interview Jan Fedra
- URL: https://www.dfb.de/news/trainingsphilosophie-entwicklung-hat-kein-ablaufdatum
- Datum (Veröffentlichung/Aktualisierung): 03.09.2026
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Online-Auszug vollständig; die Fortsetzung im Journal, S. 9–15, als Seitenbild gelesen).
- Kernaussagen (paraphrasiert):
  - Lotzen, Balitsch und Wolf gehören von Beginn an zum Kompetenzteam. Ausgangsbefund: zu wenig Spielen, zu wenige Fußballaktionen, zu wenig Kreativität und Intuition. Leitidee ist die intuitive Spielkompetenz im „Flow". Lotzen verweist auf ihre Bolzplatz-Kindheit. [bestätigt]
  - Wolf räumt mit einem Mythos auf: Niemand wolle ausschließlich so trainieren. Kleine Spielformen sollen im Jugendbereich zwei Einheiten zu großen Teilen füllen, daneben brauche es andere Rhythmen und Sportarten; es gehe nicht um „16-mal drei Minuten" und auch nicht um ausschließlich 3v3. [neu hier verortet; im ersten Durchgang A-09 zugeordnet]
  - Der Teaser kündigt „neue Spielformen ab der Saison 2027/2028" an; Details im Journal (A-89): neue Wettbewerbsformen für U14 bis U16.
- Konsequenzen für SPIELIQ: Kreativität und Intuition sind erklärte Werte. Das Feedback sollte mehrere gute Lösungen zulassen statt nur einer „richtigen". Die Mythos-Klarstellung stützt den Transfer von Kleinfeld-Prinzipien auf 9v9 und 11v11.

### [A-11] „Nachwuchs-Fußball: DFB-Sportdirektor Wolf mit neuen Ideen" (ZDFheute)
- Organisation/Autor: ZDF (ZDFheute)
- URL: https://www.zdfheute.de/sport/fussball-kinderfussball-dfb-trainingsphilosophie-deutschland-wolf-100.html
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet. Die Zusammenfassungen unterschieden nicht immer sauber zwischen den beiden ZDF-Beiträgen (A-11 und A-12). · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Der Kernsatz (Freude, Wiederholung und Intensität in jeder Trainingsminute; mindestens zweimal pro Woche auf mehreren Feldern) steht sinngemäß im DFB-Flipbook (A-87).
- Kernaussagen (paraphrasiert): Wolfs Kernsatz: Alle sollen in jeder Trainingsminute Freude, Wiederholung und Intensität erleben. Trainiert wird mindestens zweimal pro Woche in kleinen Spielen auf mehreren Feldern, mit vielen Ballaktionen (Dribblings, Schüsse, Pässe) für alle.
- Konsequenzen für SPIELIQ: „Entscheidungen pro Minute" ist als Qualitätskennzahl digitaler Einheiten denkbar.

### [A-12] „DFB-Direktor Hannes Wolf über den 1. Jugendfußball-Kongress" (ZDFheute)
- Organisation/Autor: ZDF (ZDFheute)
- URL: https://www.zdfheute.de/sport/fussball-dfb-direktor-hannes-wolf-interview-kinder-jugendfussball-100.html
- Datum (Veröffentlichung/Aktualisierung): laut Suchzusammenfassung März 2025; genaues Datum unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Termin (28./29.03.2025), rund 220 Teilnehmende und DFB-Campus sind durch DFB-Quellen bestätigt (A-95); die Rückrechnung „gut eineinhalb Jahre" passt zur TPD-Pressekonferenz vom 27.09.2023 (A-91).
- Kernaussagen (paraphrasiert): Der erste Jugendfußball-Kongress fand am 28./29. März auf dem DFB-Campus in Frankfurt statt, mit rund 220 Teilnehmenden und Wolf als Referent. Die TPD-Vorstellung lag laut Interview „gut eineinhalb Jahre" zurück, also etwa Herbst 2023.
- Konsequenzen für SPIELIQ: Kongresse sind ein möglicher Kontaktpunkt, um Inhalte mit DFB-nahen Trainer*innen zu validieren.

### [A-13] „Hannes Wolf stellt Trainingsphilosophie Deutschland vor" (Hersfelder Zeitung)
- Organisation/Autor: Hersfelder Zeitung (Lokalsport)
- URL: https://www.hersfelder-zeitung.de/sport/lokalsport/hannes-wolf-stellt-trainingsphilosophie-deutschland-vor-93785099.html
- Datum (Veröffentlichung/Aktualisierung): unbekannt (das Jahr steht laut Zusammenfassung nicht im Treffer)
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert.
- Kernaussagen (paraphrasiert): Wolf stellte die TPD in Bad Hersfeld vor rund 200 Trainer*innen vor.
- Konsequenzen für SPIELIQ: Die Breitenschulung läuft. TPD-Begriffe dürften an der Vereinsbasis bekannt sein, SPIELIQ sollte sie aufgreifen.

### [A-14] DFB-Trainingsdialog 6: „Spiele auf 1 Tor – Kleine Räume, große Wirkung"
- Organisation/Autor: DFB (Projektverantwortung Hannes Wolf, Damir Dugandzic, Thomas Impekoven; inhaltliche Mitarbeit von DFB-Stützpunktkoordinatoren)
- URL: https://assets.dfb.de/uploads/000/309/857/original_dfb_ak_Trainingsdialog_6.pdf?1726129155
- Datum (Veröffentlichung/Aktualisierung): PDF-Metadaten 12.09.2024 (deckt sich mit dem Upload-Zeitstempel)
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (42 Seiten ausgewertet: Ziele, Prinzipien, Feldmaße, Demonstrationseinheit, drei Mustereinheiten, Coachingpunkte).
- Kernaussagen (paraphrasiert):
  - Spielformen auf ein Tor als Werkzeug für realistische Angriffs- und Verteidigungssituationen, auch bei wenig Platz, wenig Material und nur einer Torhüterin oder einem Torhüter; mehrere Felder mit je einem Tor. [bestätigt]
  - Feldgrößen, die laut Heft exemplarisch auf eine U14 abgestimmt sind: Feld 1 ca. 30 × 25 m, Feld 2 ca. 22 × 20 m, Feld 3 ca. 25 × 15 m (Mustereinheit im Sechseck: 30 × 20, 30 × 25 und 25 × 15 m).
  - Struktur wie TPD: 15 Minuten Warm-up, 30 Minuten Spielblock (5 × 4 Minuten mit je 2 Minuten Pause), 15 Minuten Zwischenblock, 30 Minuten Spielblock.
  - Prinzipien der Einheit: spielen lassen, individualisiert begleiten (beim Coaching und bei Steuerungsmitteln gilt „weniger ist mehr"), variabel steuern, flexibel organisieren.
  - Offensive Schwerpunkte u. a.: Abspielmöglichkeiten in Tiefe und Breite schaffen, über Positionswechsel und Hinterlaufen Überzahl herstellen, mit Dribblings Gegner binden; beim Steuerungsmittel Abseits geschicktes Freilaufen; Gegner binden, anspielbar sein, Räume „freiziehen".
  - Defensive Coachingpunkte beim Linie-Verteidigen: Ballführende attackieren, Verschieben, Übergeben/Übernehmen, Kommunikation, Timing beim Anlaufen, „Abwehrdreieck". Nur eine Person rückt aus der Formation heraus, die anderen sichern das Zentrum und schließen Schnittstellen.
  - Methodik: Intervalle schaffen Coachingzeit in den Pausen; Trainer*innen machen bewusst, dass in jeder Aktion Entscheidungen fallen; Aktionskarten nach dem Vorbild alternativer Ligaformate sollen strategisches Denken fördern; Handzettel für Technikspiele können vorab per Messenger verschickt werden.
  - Ergänzung 30.10.2026: Das Heft enthält ein Programm „Torhüter*innenorientierte Ballschule". Weil in jungen Jahren eine breite Ausbildungsbasis gewollt sei, sollen auch Feldspieler*innen die Position im Tor erleben können; so ließen sich spätberufene Torwarttalente entdecken.
- Konsequenzen für SPIELIQ: „Spiel auf 1 Tor" ist ein idealer Szenariotyp für Freilaufen und Verteidigen in Unter- oder Überzahl. Die U14-Feldmaße eignen sich direkt als Presets für die Zielgruppe. Die Defensiv-Coachingpunkte liefern DFB-Vokabular für das Modul kollektives Verteidigen.

### [A-15] DFB-Trainingsdialog 8: „Gemeinsam zum Torerfolg"
- Organisation/Autor: DFB (Projektverantwortung Wolf, Dugandzic, Impekoven; inhaltliche Mitarbeit Daniel Kufner, Philipp Dahm, Tom Samson)
- URL: https://assets.dfb.de/uploads/000/327/969/original_DFB_TRAININGSDIALOG-8.pdf
- Datum (Veröffentlichung/Aktualisierung): PDF-Metadaten 18.09.2025
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (22 Seiten ausgewertet).
- Kernaussagen (paraphrasiert):
  - Untertitel: ganzheitliche Entwicklung aller Spieler*innen mit Pointierung der Technik Passspiel. Das Inhaltsverzeichnis enthält den Abschnitt „Die Trainingsphilosophie Deutschland – Entwicklung individueller Qualität". [bestätigt]
  - Feldgrößen exemplarisch für eine U14: Feld 1 ca. 30 × 40 m (2 Tore), Felder 2 und 3 ca. 20 × 18 m (4 Minitore); geplant für 18 Spieler*innen und 2 Torhüter*innen.
  - Praxis-Tipp zur Raumaufteilung: Spieler*innen sollen „Gegner binden oder anspielbar sein", idealerweise mit der Option, die Tiefe zu attackieren. Weitere Schwerpunkte: Räume im Rücken des Gegners schaffen, erkennen und nutzen; diagonale Lauf- und Passwege.
  - Die Regel „hinten zwei Kontakte, vorne frei" entspreche den offensiven Leitlinien der DFB-Spielvision (schnelles Abspielen, Attackieren der Tiefe).
  - Wer über die Mittellinie nachrückt, schafft Anspielstationen und kann nach Ballverlust sofort ins Pressing gehen (Konterabsicherung). Leitsatz: Alle greifen gemeinsam an, alle verteidigen gemeinsam.
  - Coaching: Korrekturen begleitend oder in den Pausen; Fehler nicht kommentieren, sondern die nächste Aktion coachen; Regelanpassungen steuern das Verhalten, Kreativität und Entscheidungsfindung sollen erhalten bleiben (auch hier „weniger ist mehr").
  - Ergänzung 30.10.2026: Ein Neutraler mit doppelt so vielen Offensivaktionen soll „Positionsungerechtigkeiten" ausgleichen, etwa für Stürmer, die im großen Spiel weniger Offensivaktionen haben als Innenverteidiger oder Mittelfeldspieler (Tipp „Positionstraining"); Rollen und Aufgaben in den Feldern werden nach einigen Minuten getauscht.
- Konsequenzen für SPIELIQ: Der DFB rahmt die TPD über individuelle Qualität; SPIELIQ sollte deshalb Fortschritt pro Spieler*in zeigen. Die Formulierung „Gegner binden oder anspielbar sein" ist eine aktuelle DFB-Quelle für die Kernregel ohne Ball (vgl. A-57; der Teil „Zugriff haben" ist hier nicht belegt).

### [A-16] DFB-Trainingsdialog 4: „Geschwitzt – gelacht – gelernt. Vom Stadion aufs Kleinfeld mit 3-gegen-3-Variationen"
- Organisation/Autor: DFB (Projektverantwortung Hannes Wolf, Damir Dugandzic; inhaltliche Mitarbeit Thomas Impekoven)
- URL: https://assets.dfb.de/uploads/000/290/661/original_DFB_TRAININGSDIALOG.pdf
- Datum (Veröffentlichung/Aktualisierung): PDF-Metadaten 08.09.2023
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (14 Seiten ausgewertet). Korrektur nach Volltextprüfung: Die Datei ohne Nummer im Namen ist der Trainingsdialog 4.
- Kernaussagen (paraphrasiert):
  - Leitgedanke „Kleine Spielformen als Basis jedes Trainings" (Untertitel). Die im ersten Durchgang unsicher zugeordnete Aussage gehört damit zu diesem PDF; enthalten sind u. a. Formen im 3v3 plus Torhüter*innen. [bestätigt]
  - Übergeordnete Trainingsziele für jedes Kind und jede Position: Freude durch wettbewerbsbetonte Formen mit vielen Erfolgserlebnissen, Intensität durch permanente Aktivität aller, Wiederholung durch kleine Teams und hohe Nettospielzeit auf kleinen Feldern.
  - Wolf bezeichnet 48 Minuten Mindest-Nettospielzeit pro Woche in kleinen Spielformen als Kern des Trainings in allen Alters- und Leistungsklassen (abweichend von der späteren 48/32-Staffelung, vgl. A-04).
  - Formen: Spiele auf 2 Tore, auf 1 Tor (mit Wechselzone) und im Funino-Feld; Spielzeit 2 Durchgänge à 4–5 × 3 Minuten netto (je 1 Minute Pause). Der Trainingsdialog aus dem Frühjahr 2023 hatte 4v4-Formen zum Schwerpunkt (vgl. A-17).
  - Editorial von Damir Dugandzic (Sportlicher Leiter des DFB-Talentförderprogramms).
- Konsequenzen für SPIELIQ: 3v3 mit Torhüter*innen und Funino-Varianten sind DFB-belegte Szenariovorlagen. Als Designregel taugt die DFB-Formel „Wiederholung = kleine Teams plus hohe Nettospielzeit".

### [A-17] „Dritter bundesweiter DFB-Trainingsdialog" (DFB-News)
- Organisation/Autor: DFB
- URL: https://www.dfb.de/news/detail/dritter-bundesweiter-dfb-trainingsdialog-250865
- Datum (Veröffentlichung/Aktualisierung): 08.05.2023
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Motto, Zeitpunkt und Stützpunktzahl geprüft).
- Kernaussagen (paraphrasiert): Motto „Geschwitzt – gelacht – gelernt: Vom Stadion aufs Kleinfeld mit Vier-gegen-Vier-Variationen"; moderierte Demonstrations-Trainingseinheit für Vereinstrainer*innen zeitgleich um 18 Uhr an mehr als 350 DFB-Stützpunkten. Dugandzic: In kleinen Spielformen sind alle aktiv eingebunden; die Übungen werden als Videos online zugänglich. [bestätigt] Ergänzung: Der fünfte Trainingsdialog (06.05.2024) stand unter dem Motto „Für alles gewappnet – spielen auf mehreren Feldern" (DFB-News, abgerufen).
- Konsequenzen für SPIELIQ: Das 4v4 ist als Standard-Lernformat bestätigt. Die Trainingsdialoge sind Multiplikatoren für eine mögliche Verbreitung.

### [A-18] „7. Trainingsdialog an den DFB-Stützpunkten" (BFV)
- Organisation/Autor: Bayerischer Fußball-Verband (BFV)
- URL: https://bfv.de/news/trainer/2025/04/7.-trainingsdialog-an-den-dfb-stutzpunkten
- Datum (Veröffentlichung/Aktualisierung): April 2025 (aus dem URL-Pfad abgeleitet)
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: „Linie verteidigen/bespielen" ist eine TPD-Formgruppe (A-87); der Begriff „Zwischenlinienraum" kommt in den abgerufenen DFB-Originalen nicht vor.
- Kernaussagen (paraphrasiert): Demonstrationseinheit an bayerischen DFB-Stützpunkten zum Überspielen gegnerischer Linien und zum Verteidigen dagegen. Den genauen deutschen Titel erfasste das Suchwerkzeug nicht.
- Konsequenzen für SPIELIQ: „Linien" scheint DFB-Vokabular für Mannschaftsstrukturen zu sein. Das passt zum Konzept „Zwischenlinienraum", der Begriff selbst ist aber nicht bestätigt.

### [A-19] „Das neue DFB-Journal: Hier ist was in Bewegung" (DFB-News)
- Organisation/Autor: DFB
- URL: https://www.dfb.de/news/das-neue-dfb-journal-hier-ist-was-in-bewegung
- Datum (Veröffentlichung/Aktualisierung): 09.09.2026 (bezieht sich auf Ausgabe 3/2026)
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Meldung vollständig; zum Journal-ePaper selbst siehe A-89).
- Kernaussagen (paraphrasiert):
  - Das DFB-Journal 3/2026 ist als ePaper verfügbar und monothematisch der TPD gewidmet: Interview mit Wolf, Balitsch und Lotzen, Eindrücke der „nun dreijährigen Reise" durch Fußball-Deutschland, Beiträge von Andreas Beck und „Hermanns Welt". [bestätigt]
  - Korrektur nach Volltextprüfung: Die im ersten Durchgang widersprüchlich hergeleitete Angabe „neue Spielformen ab 2027/2028" ist bestätigt. Sie stammt aus dem Journal-Interview (Teaser in A-10, Volltext in A-89, S. 15) und betrifft neue Wettbewerbsformen in U14, U15 und U16.
- Konsequenzen für SPIELIQ: Das Journal ist die aktuellste TPD-Gesamtdarstellung. Die ab 2027/28 geplanten U14- bis U16-Formate betreffen direkt die Zielgruppe und die Match-Presets.

### [A-20] „Darum findet Deutschland keinen Mittelstürmer" (Kommentar von Marcel Lucassen)
- Organisation/Autor: Echo24 / Heidelberg24, derselbe Beitrag unter zwei URLs; Autor Marcel Lucassen
- URL: https://www.echo24.de/sport/fussball/marcel-lucassen-mertesacker-ist-der-richtige-fuer-den-dfb-zr-94396023.html ; https://www.heidelberg24.de/sport/fussball/marcel-lucassen-mertesacker-ist-der-richtige-fuer-den-dfb-zr-94396023.html
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Die Aussage, man stelle alles auf den Prüfstand, ist im DFB-Original der Pressekonferenz vom 27.09.2023 Hanno Balitsch zugeordnet (A-91); ob Wolf Ähnliches sagte, ist offen.
- Kernaussagen (paraphrasiert):
  - Lucassen hält die Grundidee der TPD für richtig, kritisiert aber die Umsetzung.
  - Entscheidungen würden nicht im echten Fußballkontext geübt, und Übungsformen beruhten auf Meinungen Einzelner.
  - Es fehle an Realitätsnähe. Sein Beispiel: Ein Verteidiger schießt nach der Balleroberung sofort aufs Tor, statt wie im Spiel zuerst einen Mitspieler anzuspielen.
  - In derselben Trefferliste betont Wolf, man stelle alles auf den Prüfstand.
- Konsequenzen für SPIELIQ: Das ist ein wichtiger Qualitätsmaßstab. Die Szenarien müssen spielrealistische Entscheidungen abbilden (Positionen, Spielrichtung, Folgeaktion), sonst trifft SPIELIQ dieselbe Kritik.

**Block 2 – Neue Spielformen im Kinderfußball und Spielformate je Altersklasse**

### [A-21] Kinderfußball: Spielformen in G-, F- und E-Jugend (DFB-Seite)
- Organisation/Autor: DFB
- URL: https://www.dfb.de/mehr-fussball/kinderfussball (https://www.dfb.de/kinder/ leitet per HTTP 301 hierher um)
- Datum (Veröffentlichung/Aktualisierung): auf der Seite keins; Änderungsdatum laut DFB-Sitemap 12.10.2026 (eigene Ableitung)
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Regeln je Altersklasse, Feldmaße, Spielzeiten, Beschlusshistorie und Downloads geprüft). Die Seite verlinkt das DFB-Booklet zu den Wettbewerbsformen, Stand 03/2026 (A-88).
- Kernaussagen (paraphrasiert):
  - Nach zweijähriger Pilotphase seit Beginn der Saison 2024/25 bundesweit verbindlich; die neuen Formen lösen die bisherigen Wettbewerbsangebote in G, F und E ab. Motto: Alle Kinder spielen immer – kein Kind bleibt zu Hause. [bestätigt]
  - In G und F keine Meisterschaftsrunde, sondern Spielenachmittage, Festivals und Turniere; Rotationsprinzip mit festen Wechseln. [bestätigt]
  - G (U6/U7): 2v2 oder 3v3 auf vier Minitore ohne Torwart, Spielfeld 16 × 20 m bis 28 × 22 m; höchstens zwei Einwechselspieler*innen; Tore beim 2v2 erst ab der Mittellinie, beim 3v3 nur in einer 6-m-Schusszone; Wechsel nach jedem Tor; bis zu sieben Durchgänge à höchstens sieben Minuten; Auf- und Abstieg der Felder.
  - F (U8/U9): 3v3 (26–28 × 20–22 m) oder 5v5 (40 × 22–25 m; vier Minitore ohne Torwart oder zwei Kleinfeldtore mit vier Feldspieler*innen plus Torwart); neu ist die Option 3 + 1 gegen 3 + 1 auf möglichst höhenreduzierte Kleinfeldtore; 10–12 Minuten pro Durchgang; Teamgröße nach Entwicklungsstand.
  - E (U10/U11): 5v5 (wie F) oder 7v7 auf 55 × 35 m mit zwei Kleinfeldtoren (sechs Feldspieler*innen plus Torwart); bei zwei Mannschaften 4 × 15 Minuten; Nebenfelder für 2v2 oder 3v3 der Einwechselspieler*innen; Einwurf nur im 7v7, sonst Einschießen oder Eindribbeln.
  - Minitore flexibel bis höchstens 2 × 1,2 m. Ergebnisse werden nicht über den Spieltag hinaus festgehalten, jedes Spiel zählt aber für Auf- und Abstieg. Turniere sind unter Bedingungen möglich (alle Kinder eingesetzt, ähnliches Niveau, ein Tag).
  - Keine klassischen Schiedsrichter*innen; die Kinder entscheiden weitgehend selbst; Eltern halten Mindestabstand. Torhüter*innen kommen laut dieser Seite ab der F-Jugend regelmäßig zum Einsatz.
  - Begründung u. a.: Im Kinderfußball werde häufig zu früh Wert auf Taktik gelegt, worunter die fußballerischen Grundlagen litten.
  - Korrektur nach Volltextprüfung (Beschluss): Es gibt keinen Widerspruch. Der DFB-Bundesjugendtag bestätigte im Januar 2022 die Empfehlung der Ausschüsse, offiziell beschlossen hat der DFB-Bundestag am 11.03.2022.
  - Korrektur nach Volltextprüfung (Maße): „16 × 20 m" ist eine DFB-Angabe (Untergrenze für G; im Booklet A-88 das Maß für das 2v2). Das 2v2 auf 16 × 20 m mit vier Minitoren nennt auch die DFB-Kopfballseite (A-97).
  - Abweichungen zwischen DFB-Quellen: Torhüter*innen „ab F regelmäßig" (diese Seite) gegenüber „ab E regelmäßig" (A-22, A-23); G-Durchgänge höchstens 7 Minuten (diese Seite), höchstens 10 Minuten (FAQ 2022, A-23) bzw. höchstens 5 (2v2) oder 7 Minuten (3v3) im Booklet (A-88).
- Konsequenzen für SPIELIQ: Presets für Kinder-Altersklassen mit vier Minitoren, ohne Torwart und mit Rotation; die DFB-Maße als Standard, regionale Abweichungen als Option. Jüngere Nutzer*innen sollten keine Tabellen oder Ranglisten sehen, im Sinne der Reform.

### [A-22] Kinderfußball: Irrtümer (DFB-Seite)
- Organisation/Autor: DFB
- URL: https://www.dfb.de/mehr-fussball/kinderfussball-irrtuemer
- Datum (Veröffentlichung/Aktualisierung): Änderungsdatum laut DFB-Sitemap 04.02.2026 (eigene Ableitung)
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (alle fünf „Irrtümer" geprüft).
- Kernaussagen (paraphrasiert):
  - Funino ist nur ein kleiner Teil des neuen Kinderfußballs; jede Altersklasse hat eigene Formen. Überblick: G 2v2 oder 3v3; F 3v3, 4v4 oder 5v5 (optional mit Torwart); E 5v5 (optional mit Torwart) oder 7v7 (mit Torwart und Nebenspielfeldern). [bestätigt; die im ersten Durchgang A-21 zugeschriebene „DFB-Übersicht" steht auf dieser Seite]
  - Klare Empfehlung der Verbände: auch in der F-Jugend noch 3v3 oder 4v4 auf vier Minitore. [bestätigt]
  - Torhüter*innen können ab F eingesetzt werden und spielen ab E regelmäßig; erst dann sei spezifischeres Training sinnvoll. [bestätigt; weicht von A-21 ab]
  - Es geht weiter um Sieg und Niederlage (Auf- und Abstieg); nicht für jedes Kleinfeld ist ein*e Trainer*in nötig; der Verzicht auf Schiedsrichter*innen in G und F ist ältere Fair-Play-Liga-Praxis; im E-Jugend-7v7 sind Schiedsrichter*innen möglich.
- Konsequenzen für SPIELIQ: In der UI „Funino" nicht als Synonym für Kinderfußball verwenden. Torhüter*innen standardmäßig ab den E-Presets vorsehen, optional ab F (die DFB-Quellen sind uneinheitlich).

### [A-23] FAQ Kinderfußball (Stand 31.05.2022)
- Organisation/Autor: DFB (Kopie beim FVN Kreis 8: https://kreis8.fvn.de/media/faq_kinderfussball_stand_mai_2022.pdf – nicht abgerufen)
- URL: https://assets.dfb.de/uploads/000/261/493/original_FAQ_Kinderfußball_31-05-2022.pdf?1653654777
- Datum (Veröffentlichung/Aktualisierung): 31.05.2022 laut Dateiname; PDF-Metadaten 27.05.2022
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (sechs Seiten ausgewertet).
- Kernaussagen (paraphrasiert):
  - Ergebnisse werden nicht festgehalten, jedes Spiel wird aber für den Auf- und Abstieg zwischen den Feldern gewertet; Tabellen gibt es nicht. [bestätigt]
  - Keine klassischen Schiedsrichter*innen; Trainer*innen und Betreuer*innen leiten gemeinsam; Eltern ohne Betreuerfunktion halten einen Mindestabstand. [bestätigt]
  - Die Formen schulen die Selbstständigkeit und reduzieren Coaching und Elterneinfluss auf das Nötigste. [bestätigt]
  - Acht Prinzipien des neuen Kinderfußballs, u. a. „Erlebnis vor Ergebnis", Coaching und Reize von außen minimieren, Teams, Tore und Spielfeld wachsen mit den Kindern.
  - Stand 2022: G 2v2 oder 3v3 auf 16 × 20 bis 28 × 22 m, bis zu sieben Durchgänge à höchstens zehn Minuten; F 3v3 (26–28 × 20–22 m) oder 5v5 (40 × 22–25 m), zwölf Minuten pro Durchgang; E 5v5 oder 7v7 (55 × 35 m), im Turnier 2 × 12 Minuten, bei zwei Teams 4 × 15 Minuten; Minitore bis 2 × 1,2 m; Torhüter*innen ab E regelmäßig; Eindribbeln ersetzt Einwurf und Abstoß, sodass kaum noch geköpft wird; DFB-App „TeamPunkt" mit Modul Kinderfußball.
  - Beschluss: Bundesjugendtag im Januar 2022, Bestätigung durch den DFB-Bundestag am 11.03.2022.
  - Das Dokument gibt den Stand vor der verbindlichen Einführung wieder; aktuelle Fassungen sind A-21 und A-88.
- Konsequenzen für SPIELIQ: Die Coaching-Haltung „weniger reinrufen" spricht für sparsames Feedback ohne Dauerkommentar.

### [A-24] Neue Spielformen im Kinderfußball (FVN, Kreis 1)
- Organisation/Autor: Fußballverband Niederrhein (FVN), Kreis 1
- URL: https://kreis1.fvn.de/media/neue_spielformen_im_kinderfussball.pdf
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet. Der Abrufversuch am 29.10.2026 scheiterte (DNS/Netzwerkrichtlinie). Die Zuordnung ist teils unsicher. · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Das Minitor-Höchstmaß 2,00 × 1,20 m deckt sich mit dem DFB (A-21, A-88); das Bambini-Feld liegt im DFB-Rahmen von 16 × 20 bis 28 × 22 m (A-21).
- Kernaussagen (paraphrasiert):
  - Bambini-Feld: 20–25 m lang, 16–20 m breit. Minitore höchstens 1,20 m hoch und 2,00 m breit.
  - Vermutlich aus derselben DFB-basierten Präsentation stammen zwei weitere Punkte: Die Rotation schützt Trainer*innen vor Konflikten um Spielzeit. Und wer auf Zurufe wie „Pass!" oder „Lauf!" verzichtet, lässt Kinder per Versuch und Irrtum lernen.
- Konsequenzen für SPIELIQ: Lernen durch eigenes Entdecken sollte das Feedback prägen: Hinweise statt Befehle.

### [A-25] NFV-Rahmenrichtlinien Kinderfußball 2 gegen 2 (2025/26 und 2026/27)
- Organisation/Autor: Niedersächsischer Fußballverband (NFV) [Verbandszuordnung zu nfv.de: Hintergrundwissen, nicht per Suche bestätigt]
- URL: https://www.nfv.de/fileadmin/user_upload/NFV/Inhalt/Spielbetrieb/Junioren/Kinderfu%C3%9Fball/2_gegen_2_NFV-Rahmenrichtlinien_Kinderfu%C3%9Fball_25_26.pdf ; https://www.nfv.de/fileadmin/user_upload/NFV/Inhalt/Spielbetrieb/Junioren/Kinderfu%C3%9Fball/2_gegen_2_NFV-Rahmenrichtlinien_Kinderfu%C3%9Fball_26-27.pdf
- Datum (Veröffentlichung/Aktualisierung): Saisons 2025/26 und 2026/27 (Dateinamen); genaues Datum unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich mit dem DFB-Booklet (A-88): Das Feldmaß von ca. 16 × 20 m stimmt überein; der DFB sieht beim 2v2 jedoch Tore ab der Mittellinie (keine 6-m-Zone) und höchstens eine Rotationsperson vor.
- Kernaussagen (paraphrasiert):
  - Feld ca. 20 × 16 m mit 6-m-Torschusszone.
  - Vier gleich große Minitore, je zwei pro Team und Seite: Breite 1,20–1,80 m, Höhe 0,80–1,20 m (Empfehlung 1,20 × 0,80 m).
  - Zwei Spieler*innen plus bis zu zwei Rotationsspieler*innen (Empfehlung: eine*r).
  - Leichtball Größe 3, 290 g.
- Konsequenzen für SPIELIQ: Konkretes Preset „2v2 Kinder: 20 × 16 m, vier Minitore, Torschusszone 6 m".

### [A-26] NFV-Rahmenrichtlinien Kinderfußball 3 gegen 3 (2025/26 und 2026/27)
- Organisation/Autor: Niedersächsischer Fußballverband (NFV)
- URL: https://www.nfv.de/fileadmin/user_upload/NFV/Inhalt/Spielbetrieb/Junioren/Kinderfu%C3%9Fball/3_gegen_3_NFV-Rahmenrichtlinien_Kinderfu%C3%9Fball_25_26.pdf ; https://www.nfv.de/fileadmin/user_upload/NFV/Inhalt/Spielbetrieb/Junioren/Kinderfu%C3%9Fball/3_gegen_3_NFV-Rahmenrichtlinien_Kinderfu%C3%9Fball_26-27.pdf
- Datum (Veröffentlichung/Aktualisierung): Saisons laut Dateinamen; genaues Datum unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich mit dem DFB-Booklet (A-88): Das DFB-Maß für das 3v3 beträgt ca. 25 × 20 m (NFV laut Suche 26 × 20 m); der DFB erlaubt höchstens zwei Rotationspersonen (NFV laut Suche drei).
- Kernaussagen (paraphrasiert):
  - Feld ca. 26 × 20 m mit 6-m-Torschusszone; vier Minitore wie beim 2v2.
  - Drei Spieler*innen plus höchstens drei Rotationsspieler*innen (Empfehlung: eine*r); gespielt wird ohne Torwart.
  - „Champions-League-Modus": Das Siegerteam steigt ein Feld auf, das Verliererteam ein Feld ab.
  - Ball Größe 3, 290 g.
  - Für F-Junioren im 3v3 auf dem Nebenfeld werden 5 × 10 Minuten empfohlen. Die Zuordnung dieser Zeitangabe zum NFV-Dokument ist unsicher.
- Konsequenzen für SPIELIQ: Preset „3v3: 26 × 20 m". Der Auf- und Abstiegsmodus eignet sich als Vorlage für eine Lernprogression ohne Tabelle.

### [A-27] FVN: Durchführungsbestimmungen und Rahmenbedingungen für neue Spiel- und Wettbewerbsformen im Kinderfußball
- Organisation/Autor: Fußballverband Niederrhein (FVN)
- URL: https://fvn.de/media/25_10_01_dufuebe_neue_spiel-wettbewerbsformen_kinderfussball.pdf (Fassung vom 01.10.2025). Weitere Fassungen: https://fvn.de/media/durchf__hrungsbestimmungen_kinderfu__ball.pdf ; https://fvn.de/media/rahmenbedingungen_erl__uterungen_neue_wettbewerbsformen_im_kinderfu__ball.pdf ; https://fvn.de/media/rahmenbedingungen_erlaeuterungen_neue_wettbewerbsformen_im_kinderfussball_2.pdf
- Datum (Veröffentlichung/Aktualisierung): 01.10.2025 laut Dateiname der neuesten Fassung; übrige unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet. Die Zusammenfassungen unterschieden nicht sicher zwischen den Fassungen. · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich mit DFB-Quellen (A-88, A-21): 3v3 auf ca. 25 × 20 m stimmt überein; die Regel „+1 bei drei Toren Rückstand" ist auch DFB-Variante (F/E); das 6v6 sieht das DFB-Booklet neben dem 7v7 vor (ca. 55 × 35 m). Die DFB-Schusszone von 6 m bei Minitoren weicht von „keine Schusszone" (FVN laut Suche) ab.
- Kernaussagen (paraphrasiert):
  - 3v3: Feld ca. 25 × 20 m, keine Schusszone, Minitore höchstens 2,00 × 1,20 m.
  - E-Junioren: Regelform ist 6 gegen 6; alternativ 5v5, 4v4 oder 3v3.
  - Mindestens ein Feld wird auf Jugendtore mit Torwart gespielt; alle weiteren Spieler*innen spielen auf Minifeldern (empfohlen: 3v3).
  - Empfohlene Spielzeit: 6 × 10 Minuten.
  - Nach jedem Tor wechseln beide Teams je eine Person ein; fällt kein Tor, wird spätestens nach zwei Minuten rotiert.
  - Liegt ein Team drei Tore zurück, darf es bis zum Ausgleich eine zusätzliche Person einsetzen.
  - Alternativ sind Spielfeste oder Festivals möglich.
- Konsequenzen für SPIELIQ: Die E-Jugend zeigt die regionale Abweichung deutlich (6v6 statt 5v5/7v7), Presets müssen also parametrisierbar sein. Die Regel „+1 bei −3" ist ein Beispiel für dynamische Überzahl und ein nützliches Szenario-Element.

### [A-28] Richtlinien für den Kinderfußball der E-Junioren (NFV, Kreis Wolfsburg)
- Organisation/Autor: Niedersächsischer Fußballverband, Kreis Wolfsburg
- URL: https://www.kreis-wolfsburg.nfv.de/fileadmin/Bezirke_Kreise/Kreis_Wolfsburg/Inhalt/Spielbetrieb/Junioren/Spielplanung_Kinderfussball/Richtlinien_f%C3%BCr_den_Kinderfu%C3%9Fball_der_E_-Junioren__.pdf ; https://www.kreis-wolfsburg.nfv.de/fileadmin/Bezirke_Kreise/Kreis_Wolfsburg/Inhalt/Spielbetrieb/Junioren/Spielplanung_Kinderfussball/Kinderfu%C3%9Fball_der_E-Junioren_4_1.pdf
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet. Die Zusammenfassung behandelte diese Quelle gemeinsam mit A-29; die Einzelzuordnung ist unsicher. · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Das Feld von ca. 40 × 25 m und die Rotation alle drei Minuten entsprechen dem DFB-Booklet (A-88).
- Kernaussagen (paraphrasiert):
  - 5v5 inklusive Torwart (4+1) mit vier Rotationsspieler*innen und Wechseln alle drei Minuten.
  - Feld ca. 40 × 25 m; Strafraum 21 m breit, 8 m tief.
  - Hauptfeld mit Jugendtoren, Nebenfeld mit vier Minitoren.
- Konsequenzen für SPIELIQ: Preset „E 5v5 (4+1): 40 × 25 m, Strafraum 21 × 8 m, Tore 5 × 2 m".

### [A-29] Flyer Junioren Saison 2024/2025 (FV Rheinland)
- Organisation/Autor: Fußballverband Rheinland
- URL: https://fv-rheinland.de/wp-content/uploads/2024/09/13_Flyer-Junioren-Saison-2024-2025.pdf
- Datum (Veröffentlichung/Aktualisierung): Upload-Pfad 09/2024, Saison 2024/25
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet. Laut Suchzusammenfassung sind die Ausschnitte teils fehlerhaft extrahiert. · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Kleinfeldtore 5 × 2 m entsprechen dem DFB-Höchstmaß (A-88); der E-Ball Gr. 4, 350 g ist vom DFB bestätigt (A-88, A-97); das 11v11 in der C-Jugend ist DFB-belegt (A-102); 100 × 60 m bleibt nur Suchergebnis.
- Kernaussagen (paraphrasiert):
  - E (5v5): Im Ligabetrieb wird auf zwei Jugendtore (5 × 2 m) gespielt. Bei Turnieren kommen Felder mit vier Minitoren hinzu (Empfehlung 1,2 × 0,75 m).
  - E-Ball: Leichtball Größe 4, 350 g (Zuordnung unsicher).
  - „C-11": Feld ca. 100 × 60 m, Tore 7,32 × 2,44 m, bis zu fünf Auswechselspieler*innen mit Wiedereinwechslung.
  - Die Strafraumangabe „16 × 32 m" ist zweifelhaft.
- Konsequenzen für SPIELIQ: Preset C-Jugend „11v11, ca. 100 × 60 m" als Alternative zum Normalfeld. Die Bezeichnung „C-11" deutet an, dass es im Rheinland weitere C-Formate gibt; das ist nicht geprüft.

### [A-30] wfv-Kinderfußball-Flyer E-Jugend 5 gegen 5 (2025/26; CL-Modus 2024/25)
- Organisation/Autor: Württembergischer Fußballverband (wfv)
- URL: https://www.wuerttfv.de/app/uploads/2025/01/wfv_Kinderfussball_Flyer_E-Jugend_5gegen5_2025_26_WEB.pdf ; https://www.wuerttfv.de/app/uploads/2020/05/Kinderfussball-Flyer-E-Jugend-5gegen5-CL-Modus-2024-25.pdf
- Datum (Veröffentlichung/Aktualisierung): Saisons laut Dateinamen; genaues Datum unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Die 6-m-Schusszone bei Minitoren und der Champions-League-Modus sind DFB-Regeln (A-88).
- Kernaussagen (paraphrasiert): E-Jugend im 5v5 mit Champions-League-Modus und Torschusszone.
- Konsequenzen für SPIELIQ: Die Torschusszone als Regelparameter vorsehen. Sie ist ein bewährter Constraint, um Tiefe und Abschlussräume zu lehren.

### [A-31] wfv-Kinderfußball-Leitfaden 2024/25 und 2026/27
- Organisation/Autor: Württembergischer Fußballverband (wfv)
- URL: https://www.wuerttfv.de/app/uploads/2023/07/wfv-Kinderfussball-Leitfaden-2024-25.pdf ; https://www.wuerttfv.de/app/uploads/2025/01/wfv_Kinderfussball_Leitfaden_2026-27_NEU_FREIGABE.pdf
- Datum (Veröffentlichung/Aktualisierung): Fassung 2026/27 mit „Stand: Juli 2026" laut Suchzusammenfassung
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert.
- Kernaussagen (paraphrasiert): Der Leitfaden deckt Spielformen bis 5v5 ab, einschließlich der E-Jugend (U10/U11). Für die E-Jugend ab 7v7 und für ältere Jahrgänge verweist er auf die Durchführungsbestimmungen Jugendfußball.
- Konsequenzen für SPIELIQ: Bestätigt die Zuordnung E = U10/U11.

### [A-32] wfv „Spielfelder Jugendfußball" 2024/25, 2025/26 und 2026/27
- Organisation/Autor: Württembergischer Fußballverband (wfv)
- URL: https://www.wuerttfv.de/app/uploads/2023/07/Spielfelder-Jugendfussball-2024-25.pdf ; https://www.wuerttfv.de/app/uploads/2025/01/Spielfelder-Jugendfussball-2025_26-1.pdf ; https://www.wuerttfv.de/app/uploads/2026/07/Spielfelder_Jugend_2026_2027.pdf
- Datum (Veröffentlichung/Aktualisierung): Saisons laut Dateinamen; genaues Datum unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Ball Gr. 5 ab der C-Jugend ist vom DFB bestätigt (A-97); die C-Spielzeit von 2 × 35 Minuten wurde in DFB-Originalen nicht gefunden; ab 2027/28 plant der DFB für U14 bis U16 Drittel-Formate (A-89).
- Kernaussagen (paraphrasiert):
  - D-Junioren spielen 9v9 auf dem „Kompaktspielfeld": 70 × 55 m mit ±5 m Toleranz. Der Strafraum entspricht dem Torraum, ein separater Torraum entfällt. Strafstoßpunkt 9 m.
  - C-Junioren: 2 × 35 Minuten, Verlängerung 2 × 5 Minuten.
  - 11v11: Ball Größe 5 (410–450 g), Abseitsregel, Rückpassregel für Torhüter*innen, Schienbeinschoner Pflicht, unbegrenztes Auswechseln laut Tabelle.
  - Tore auf dem Normalfeld: 7,32 × 2,44 m.
- Konsequenzen für SPIELIQ: Datengrundlage für die D- und C-Presets. Die Abseitsregel als zuschaltbaren Parameter vorsehen, für 11v11 standardmäßig aktiv.

### [A-33] Regelwerk E-Jugend V1.2 (Berliner Fußball-Verband)
- Organisation/Autor: Berliner Fußball-Verband
- URL: https://www.berliner-fussball.de/fileadmin/user_upload/spielbetrieb-kinderfussball/Regelwerk_E_Jugend_V1.2.pdf
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: weicht vom DFB-Booklet ab (E-4v4/5v5 auf ca. 40 × 25 m, A-88).
- Kernaussagen (paraphrasiert): E-Jugend-Feld 35 × 25 m mit Minitoren; vier solche Felder passen auf ein Großfeld.
- Konsequenzen für SPIELIQ: Eine weitere regionale Variante. Die Aufteilung „vier Felder auf einem Großfeld" ist eine gute Visualisierung für die Trainingsplanung.

### [A-34] HFV: Allgemeine Bestimmungen G/F/E – Neue Wettbewerbsformen 2026/2027 (10.07.2026)
- Organisation/Autor: Hessischer Fußball-Verband (HFV) [Zuordnung hfv-online.de = Hessen: Hintergrundwissen, nicht per Suche bestätigt]
- URL: https://hfv-online.de/wp-content/uploads/2026/07/04_-G-F-E_AllgBestimmungen-Neue-Wettbewerbsformen-2026-2027-10.07.2026.pdf
- Datum (Veröffentlichung/Aktualisierung): 10.07.2026 (Dateiname)
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Das DFB-Booklet nennt für das E-7v7 auch den Ligaspielbetrieb (A-88).
- Kernaussagen (paraphrasiert): Die neuen Wettbewerbsformen gelten im Kinderfußball. Der Ligaspielbetrieb der E-Junioren im 7v7 ist in gesonderten Jugendbestimmungen geregelt. Auch 6:6 wird genannt.
- Konsequenzen für SPIELIQ: In einigen Verbänden laufen 2026/27 parallel weiterhin 7v7-Ligen in der E-Jugend.

### [A-35] HFV Kreis Fulda: Durchführungsbestimmung D-Junioren 2023/24
- Organisation/Autor: Hessischer Fußball-Verband, Kreis Fulda (Kreisjugendausschuss)
- URL: https://www.hfv-online.de/fileadmin/hfv-online.de/kreise/fulda/Aktuelles/kja/DOCS23_24/Durchf%C3%BChrungsbestimmung__D_-_Junioren_23-24_.pdf
- Datum (Veröffentlichung/Aktualisierung): Saison 2023/24
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Ein DFB-Original für die Empfehlung zum 9er-Feld (68 × 50 m) wurde nicht gefunden; der DFB beschreibt stattdessen das 7x7-Zwillingsspiel (A-89).
- Kernaussagen (paraphrasiert): Das Dokument gibt eine DFB-Empfehlung für das 9er-Feld wieder: mindestens 68 × 50 m, Strafraum 29 × 12 m, Strafstoßpunkt 8 m. Der Verbandsjugendausschuss empfiehlt den Kreisen, diese Maße zu übernehmen.
- Konsequenzen für SPIELIQ: Das ist die einzige, nur indirekt belegte DFB-Maßangabe für 9v9. Sie eignet sich als Default-Preset für die D-Jugend (68 × 50 m).

### [A-36] NFV: Anhang 1 und 2 zur Jugendordnung (Stand 07/2026)
- Organisation/Autor: Niedersächsischer Fußballverband (NFV). Die Suchzusammenfassung nannte fälschlich den „Nordostdeutschen Fußballverband".
- URL: https://www.nfv.de/fileadmin/user_upload/NFV/Inhalt/Spielbetrieb/Junioren/Kinderfu%C3%9Fball/Anhang_1___2_Jugendordnung_Stand_07-2026.pdf
- Datum (Veröffentlichung/Aktualisierung): Juli 2026 (Dateiname)
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Der D-Ball Gr. 4, 350 g ist auf der DFB-Kopfballseite bestätigt (A-97).
- Kernaussagen (paraphrasiert):
  - D-Junioren 9v9: Feld ca. 70 × 50 m, zwischen den Strafräumen eines Großfelds angelegt.
  - Zwei zentral aufgestellte Jugendtore (ca. 5 × 2 m), Strafraum ca. 29 × 12 m, Strafstoßpunkt 8 m.
  - Ball Größe 4 oder 5 mit 350 g.
- Konsequenzen für SPIELIQ: Datengrundlage für das D-Preset.

### [A-37] NFV-Rahmenrichtlinien D-Jugend: 6+1 gegen 6+1
- Organisation/Autor: Niedersächsischer Fußballverband (NFV)
- URL: https://www.nfv.de/fileadmin/user_upload/NFV/Inhalt/Spielbetrieb/Junioren/Kinderfu%C3%9Fball/6_1_gegen_6_1_NFV-Rahmenrichtlinien_D-Jugend.pdf
- Datum (Veröffentlichung/Aktualisierung): bezieht sich laut Suchzusammenfassung auf die Saison 2026/27; genaues Datum unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Das Zielbild „mindestens 75 % Spielzeit" ist DFB-Position (A-08, A-87, A-88); als D-Pilotformate beschreibt das DFB-Journal das 7x7-Zwillingsspiel und 3x3 + TW (A-89); eine Pilotphase bestätigen A-94 und A-95.
- Kernaussagen (paraphrasiert):
  - DFB und Landesverbände befinden sich bei der D-Jugend in einer Konsolidierungsphase. Bundesweite Pilotprojekte erproben unterschiedliche Spielmodelle.
  - Zielbilder sind u. a. homogene Spielpaarungen und dass alle Kinder spielen („kein Kind bleibt zu Hause"). Empfohlen sind mindestens 75 % Einsatzzeit; die genaue Lesart ist unsicher.
  - Aus den Erkenntnissen soll anschließend eine Spielform entwickelt werden. Das 6+1 gegen 6+1 soll den Übergang aus der E-Jugend erleichtern.
- Konsequenzen für SPIELIQ: Das D-Format ist im Fluss. Es darf nicht hart kodiert werden; die Presets brauchen einen Update-Mechanismus.

### [A-38] Kleinfeldspiele-Richtlinien 2023 (Badischer FV, gehostet bei TSG Hoffenheim „juniorkicker")
- Organisation/Autor: Badischer Fußballverband (laut Suchzusammenfassung), Datei auf einer Seite der TSG Hoffenheim
- URL: https://juniorkicker.tsg-hoffenheim.de/assets/PDFs-allgemein/Formulare-Richtlinien-und-Anleitungen/Kleinfeldspiele-Richtlinien-2023.pdf
- Datum (Veröffentlichung/Aktualisierung): 2023 (Dateiname)
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: 5 × 2 m entspricht dem DFB (A-88, A-89).
- Kernaussagen (paraphrasiert): 7er- und 9er-Spiele werden auf Kleinfeldtore von 5 × 2 m gespielt.
- Konsequenzen für SPIELIQ: 5 × 2 m als Torgröße für alle Kleinfeld-Presets mit Torwart.

### [A-39] Informationsblätter D-Jugend (Badischer FV)
- Organisation/Autor: Badischer Fußballverband
- URL: https://www.badfv.de/fileadmin/Dateien/Downloads/Durchfuehrungsbestimmungen/Jugend/Informationsblatt_D-Jugend__3.pdf ; https://badfv.de/files/Dokumente/2.08_Breitensport/2024_D-Jugend_Info_Stand_240308.pdf ; https://juniorkicker.tsg-hoffenheim.de/assets/PDFs-allgemein/Formulare-Richtlinien-und-Anleitungen/Infoblatt_D-Jugend.pdf
- Datum (Veröffentlichung/Aktualisierung): eine Fassung mit „Stand 08.03.2024" (Dateiname); übrige unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet. Aus welchem der drei Dokumente die Angabe stammt, ist unklar. · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert.
- Kernaussagen (paraphrasiert): D-Jugend-Spielform „7 plus 1" auf 60 × 40 m mit einem Strafraum von 25 × 10 m.
- Konsequenzen für SPIELIQ: Alternatives Preset „D 7+1: 60 × 40 m".

### [A-40] FVN: Anhang zur Jugendspielordnung (Stand 06.08.2024)
- Organisation/Autor: Fußballverband Niederrhein (FVN). Die Suchzusammenfassung nannte den „Westdeutschen FV"; der FVN gehört dem WDFV an [Hintergrundwissen, nicht per Suche bestätigt].
- URL: https://fvn.de/media/h-jspo_-_anhang_06.08.2024.pdf
- Datum (Veröffentlichung/Aktualisierung): 06.08.2024 (Dateiname)
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert.
- Kernaussagen (paraphrasiert): D-Junioren spielen 9 gegen 9 mit mindestens sechs Spieler*innen auf einem Feld von ca. 70 × 50 m.
- Konsequenzen für SPIELIQ: Bestätigt 70 × 50 m als verbreiteten Wert.

### [A-41] SBFV-Trainingsformen Kinderfußball (G-, F- und E-Jugend)
- Organisation/Autor: Südbadischer Fußball-Verband (SBFV) [Domainzuordnung: Hintergrundwissen, nicht per Suche bestätigt; die Suchzusammenfassung nannte fälschlich den „Sächsischen FV"]
- URL: https://www.sbfv.de/fileadmin/user_upload/Nav_Fussball/Kinder/Trainingsformen/F-Jugend/F-Jugend_Phase_2_Spielform_1_Dribbelfussball_0.pdf ; https://www.sbfv.de/fileadmin/user_upload/Nav_Fussball/Kinder/Trainingsformen/G-Jugend/Beispiel-Trainingseinheit_von_Julian_Schuster_-_G-Jugend.pdf ; https://www.sbfv.de/fileadmin/user_upload/Nav_Fussball/Kinder/Trainingsformen/E-Jugend/E-Jugend_Phase_4_Freie_Spielform_0.pdf ; https://www.sbfv.de/fileadmin/user_upload/Nav_Fussball/Kinder/Trainingsformen/F-Jugend/F-Jugend_Phase_1_Spielerisches_UEben_Ballschule_0.pdf (weitere Beispiel-Einheiten für E und F in den Treffern)
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Eindribbeln/Einpassen ist DFB-Wettspielregel für 2v2 bis 5v5 (A-21, A-88); Zurückhaltung beim Coaching ist ebenfalls DFB-Linie (A-88).
- Kernaussagen (paraphrasiert):
  - Nach einem Ausball wird „eingedribbelt" statt Eckball oder Neustart beim Torwart, damit das Spiel sofort weiterläuft.
  - Funino-Varianten arbeiten mit Schusszonen. In einer Variante muss je ein Kind pro Team in der Angriffs-Schusszone bleiben, damit die Kinder lernen, die Tiefe des Feldes zu nutzen.
  - E-Jugend, freie Spielform: Trainer*innen sollen Kindern Entscheidungen nicht durch Zurufe wie „Schieß!" oder „Spiel ab!" abnehmen, sondern sie Lösungen selbst finden lassen.
  - F-Jugend: ganzheitliche motorische Entwicklung über vielseitige Ball- und Bewegungsspiele.
  - Es handelt sich um Trainingsformen, nicht um Wettspielregeln.
- Konsequenzen für SPIELIQ: „Tiefe nutzen" über eine Zonenregel ist direkt als Simulator-Mechanik übertragbar (Lernen über Regeln und Rahmenbedingungen). Leitbild fürs Feedback: Entscheidungen nicht abnehmen.

### [A-42] AB13 Juniorenspiele (SBFV)
- Organisation/Autor: Südbadischer Fußball-Verband
- URL: https://sbfv.de/fileadmin/user_upload/Nav_SBFV/ab/AB13_Juniorenspiele_3.pdf
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Die C-Spielzeit wurde in DFB-Originalen nicht gefunden.
- Kernaussagen (paraphrasiert): C-Junioren spielen 2 × 35 Minuten, Verlängerung 2 × 5 Minuten, im Großfeldformat „11 + 5".
- Konsequenzen für SPIELIQ: Zeitparameter, falls Matchsimulationen geplant sind.

### [A-43] Sammelfund: regionale FAQ und Flyer zu neuen Wettspielformen (Einzelzuordnung unklar)
- Organisation/Autor: mehrere. HFV (Kinderfußball-FAQ), SWFV (Kinderfußball-FAQ 2019), FVM-Kreis Euskirchen (DFB-FAQ vom 30.07.2019), FVN-Kreise 2, 3 und 11
- URL: https://www.hfv-online.de/fileadmin/HFV-Daten/presse/Kinderfu%C3%9Fball_FAQ.pdf ; https://www.swfv.de/sites/default/files/2019-07/Kinderfu%C3%9FballFAQ.pdf ; https://euskirchen.fvm.de/fileadmin/Euskirchen/Allgemeines/Jugendabteilung/Sonstiges/kinderfussball_faqs_dfb_2019-07-30.pdf ; https://kreis11.fvn.de/media/fvn_-_neue_wettspielformen_im_kinderfussball.pdf ; https://kreis2.fvn.de/media/flyer_digital.pdf ; https://kreis3.fvn.de/media/neue_spielformen_a.pdf
- Datum (Veröffentlichung/Aktualisierung): teils 2019 (Pilotphase, u. a. DFB-FAQ vom 30.07.2019 laut Dateiname); sonst unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet. Die Suchzusammenfassung fasste diese Dokumente gemeinsam zusammen; welche Zahl aus welchem Dokument stammt, ist unklar. · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: 7v7 auf 55 × 35 m, Einwurf und der Beschluss vom 11.03.2022 sind vom DFB bestätigt (A-21, A-23, A-88); „5v5 auf 25 × 35 m" weicht vom DFB-Booklet (ca. 40 × 25 m) ab.
- Kernaussagen (paraphrasiert):
  - E-Junioren können 3v3, 4v4, 5v5 und 7v7 spielen. Mindestens ein Feld soll im 7v7 mit Torwart auf Jugendtore gespielt werden.
  - 7v7: sechs Feldspieler*innen plus Torwart, zwei Kleinfeldtore, Feld 55 × 35 m, Einwurf bei Seitenaus.
  - 5v5 gibt es in zwei Varianten: auf vier Minitore ohne Torwart (fünf Feldspieler*innen) oder auf zwei Kleinfeldtore (4 + Torwart).
  - Ein Kreis-Flyer (vermutlich Kreis 2) nennt 25 × 35 m für 5v5 und 35 × 55 m für 7v7, jeweils mit Torwart.
  - Eine Zusammenfassung nennt außerdem den Beschluss des DFB-Bundestags vom 11.03.2022.
- Konsequenzen für SPIELIQ: Presets „E 5v5 (4+1): 35 × 25 m" und „E 7v7: 55 × 35 m".

### [A-44] HFV-Info Nr. 4/2022 (Hamburger Fußball-Verband)
- Organisation/Autor: Hamburger Fußball-Verband (Verbandsmagazin, archiviert bei der SUB Hamburg) [Zuordnung des Magazins: Hintergrundwissen, nicht per Suche bestätigt]
- URL: https://epub.sub.uni-hamburg.de/epub/volltexte/2022/131147/pdf/HFV_Info_Nr._4_2022.pdf
- Datum (Veröffentlichung/Aktualisierung): 2022 (Ausgabe 4/2022)
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet. Die Zuordnung ist unsicher; die Zusammenfassung sprach von „Hamburger Fußball-Verband (Stand des FVN-Materials)". · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Der DFB sieht in der G-Jugend 2v2 oder 3v3 vor (A-21, A-88).
- Kernaussagen (paraphrasiert): Die G-Jugend (Bambini) spielt ausschließlich 3v3 auf Minitore; empfohlen sind 5 × 8 Minuten.
- Konsequenzen für SPIELIQ: Eine regionale Festlegung mit Stand 2022. Sie weicht von der DFB-Übersicht (G: 2v2 oder 3v3) nur in der Engführung ab.

**Block 3 – Altersgerechte Ausbildung und Talentförderung**

### [A-45] Talentförderung (DFB-Seite)
- Organisation/Autor: DFB
- URL: https://www.dfb.de/mehr-fussball/talentfoerderung
- Datum (Veröffentlichung/Aktualisierung): Änderungsdatum laut DFB-Sitemap 28.10.2026 (eigene Ableitung)
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Zahlen und Programmbeschreibung geprüft).
- Kernaussagen (paraphrasiert):
  - Das DFB-Talentförderprogramm ist die erste systematische Förderstufe. [bestätigt]
  - 339 Stützpunkte, etwa 14.000 Talente „im besten Lernalter", 29 Stützpunktkoordinatoren und etwa 1.200 Stützpunkttrainer*innen. [bestätigt; Talentzahl und Koordinatoren neu]
  - Spieler*innen von U12 bis U15 trainieren zusätzlich zum Verein einmal pro Woche; Junioren in der Regel bis U15, Juniorinnen bis U16. [bestätigt und ergänzt]
  - Das inhaltliche Konzept gibt der DFB vor; der Fokus liegt auf der individuellen Förderung. [bestätigt]
  - Daneben: Leistungszentren, Leistungs- und Talentförderzentren weiblich (seit 2024/25) und 40 Eliteschulen des Fußballs.
  - Auflösung der Zahlendifferenz: Die Elternbroschüre für 2023/24 (A-46) nennt „knapp 350" Stützpunkte (Summe ihrer Landesverbandstabelle: 347), die aktuelle Seite 339. Es handelt sich um unterschiedliche Stände.
- Konsequenzen für SPIELIQ: Die Zielgruppe C-Jugend (U14/U15) ist im Stützpunkt-Alter. Stützpunkttrainer*innen kommen als Multiplikator*innen und Pilot-Tester*innen infrage. Hinweis: Der DFB verwendet hier selbst die Formulierung „im besten Lernalter" (vgl. den Warnhinweis zum „goldenen Lernalter" in der Synthese).

### [A-46] „Wer? Wie? Was?" – DFB-Talentförderprogramm: Informationen für Eltern und Vereinstrainer*innen (PDF „ECTFB")
- Organisation/Autor: DFB (Editorial Damir Dugandzic)
- URL: https://assets.dfb.de/uploads/000/290/709/original_ECTFB.pdf?1694761436
- Datum (Veröffentlichung/Aktualisierung): PDF-Metadaten 30.08.2023; Stützpunkt-Tabelle für die Saison 2023/2024
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (elf Seiten ausgewertet).
- Kernaussagen (paraphrasiert):
  - Die Förderung beginnt in der Regel mit elf Jahren; das wöchentliche Stützpunkttraining findet meist in Kleingruppen statt; Zielgruppe U12 bis U15, Mädchen U12 bis U16. [bestätigt]
  - Förderpyramide mit Altersbändern 3–6, 7–10, 11–14 und 15–18 Jahre; laut Text umfasst die Basisförderung etwa 3 bis 10 Jahre (G bis E), das Talentförderprogramm setzt ab elf Jahren (D-Jugend) an.
  - Knapp 350 Stützpunkte, ca. 14.000 Talente, knapp 1.280 Honorartrainer*innen, 29 Koordinator*innen; Training meist montags, 90 Minuten, kostenfrei; jährlicher sportmotorischer Test (u. a. Dribbling, Ballkontrolle, Jonglieren).
  - Die Ausbildungspläne orientieren sich an den Spielmomenten „Tore erzielen", „Tore vorbereiten" und „Ballsicherung"; bewusst keine zu frühe Fixierung auf Positionen.
  - Ausbildungsprinzipien: spielorientiert („Das Spiel ist der Lehrmeister"; Übungsformen ergänzen Spielformen), individualisiert, im Detail (präzise Coachingtipps), Schwerpunkte („komplex, aber nicht kompliziert"), ganzheitlich (Spieler*innen in Entscheidungen einbinden, Selbstreflexion ermöglichen) und perspektivisch.
  - Wertekodex u. a.: aufmerksam sein, nicht ständig online sein und den Trainer*innen zuhören.
  - Ergänzung 30.10.2026: In den Ausbildungsblöcken werden Offensiv- und Defensivthemen gemeinsam geschult; begründet wird der Verzicht auf frühe Positionsfixierung mit einer breiten, fundamentalen Ausbildung in allen Facetten des Spiels.
- Konsequenzen für SPIELIQ: Kleingruppenarbeit spricht für Szenarien mit zwei bis vier aktiven Spieler*innen. Die Spielmomente und das Prinzip der Selbstreflexion sind direkt anschlussfähig, etwa als Reflexionsfragen nach einem Szenario. Der Wertekodex zeigt: Der DFB sieht ständiges Online-Sein im Trainingskontext kritisch.

### [A-47] Abbildung „Organisation" – Ausbildungsstufen im Fußball (bpb)
- Organisation/Autor: Bundeszentrale für politische Bildung (bpb)
- URL: https://www.bpb.de/medien/178532/Abb.Organisation.pdf
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Die DFB-Elternbroschüre enthält eine eigene Förderpyramide (Basisförderung etwa 3 bis 10 Jahre, Talentförderprogramm ab 11 Jahren; A-46).
- Kernaussagen (paraphrasiert):
  - Ein Stufenmodell nach Altersklassen: allgemeines Bewegungstraining für die Jüngsten, dann Grundlagentraining Fußball, Spezialisierung, Übergang und Hochleistung.
  - Bambini (U7), F (U8/U9) und E werden zugeordnet; die C-Junioren (U14/U15) stehen in der Phase nach dem Grundlagenbereich.
  - Ob die Grafik auf DFB-Material beruht, ist nicht erkennbar.
- Konsequenzen für SPIELIQ: Eine Altersstufenlogik für das Freischalten von Inhalten (C = Aufbau/Spezialisierung), aber nur als Orientierung.

### [A-48] Examensarbeit (2012) zur DFB-Ausbildungskonzeption für D-Junioren
- Organisation/Autor: Autor*in unbekannt (Plattform diplomarbeiten24/GRIN)
- URL: https://www.diplomarbeiten24.de/document/191333
- Datum (Veröffentlichung/Aktualisierung): 2012
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet; Sekundärquelle · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert.
- Kernaussagen (paraphrasiert): Die Arbeit beschreibt die Ausbildungsstufe der D-Junioren im DFB-Ausbildungskonzept mit vier „Bausteinen" samt Gütekriterien zur Lösung taktischer Probleme. Taktikverständnis wird über Spielformen vermittelt.
- Konsequenzen für SPIELIQ: Ein Indiz, dass schon ältere DFB-Konzeptionen über taktische Probleme in Spielformen strukturierten; das passt zur Szenario-Logik von SPIELIQ. Die Originalkonzeption muss beschafft werden.

### [A-49] DFB „Training & Wissen online": Trainingsblätter für D- und C-Junioren (2013)
- Organisation/Autor: DFB; Autoren laut Blatt Stefan Böger (vier Blätter) und Mario Vossen (ein Blatt)
- URL: https://dfb.de/fileadmin/_dfbdam/3429-308-dc-ha1-01.pdf ; https://dfb.de/fileadmin/_dfbdam/3671-320-dc-ha2-01.pdf (weitere Teile derselben Reihe: https://dfb.de/fileadmin/_dfbdam/3408-307-dc-ha1-01.pdf ; https://dfb.de/fileadmin/_dfbdam/3427-308-dc-au1-01.pdf ; https://dfb.de/fileadmin/_dfbdam/3669-320-dc-au2-01.pdf); alle leiten auf www.dfb.de um
- Datum (Veröffentlichung/Aktualisierung): 09.04.2013 bis 08.10.2013 (Datum je Blatt)
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (alle fünf Blätter).
- Kernaussagen (paraphrasiert):
  - „Kombination am Flügel I" (Böger, 23.04.2013): Nach zwei vorgegebenen Pässen folgt ein freies 4 gegen 3 bis zum Abschluss; Variation 5 gegen 4. [bestätigt; Titel präzisiert]
  - „1 gegen 1 am Strafraumeck II" (Böger, 08.10.2013): frontales 1v1 mit Finte und Kappbewegung. [bestätigt]
  - Weitere Blätter: „Dribbel-Torschuss I" (Mario Vossen, 09.04.2013), „Hindernis-Kreuzung" und „Dribbel-Wettkampf" (Böger).
  - Der Leitgedanke „Kindertraining ist kein Erwachsenentraining light, sondern eine eigene Disziplin" steht im Themenkasten zum Oktober-Schwerpunkt 2013 (Bambini). [bestätigt]
  - Korrektur nach Volltextprüfung: Nicht alle Blätter stammen von Böger; „Dribbel-Torschuss I" ist von Mario Vossen.
- Konsequenzen für SPIELIQ: Das Überzahlspiel (4v3) über den Flügel ist ein gutes Szenario für Freilaufen und Breite.

### [A-50] DFB-Trainingsblatt A-Junior*innen: „Verschieben zum Ball" (4 gegen 4 auf 4 gegen 4)
- Organisation/Autor: DFB (Fußzeile „DFB.DE/MEIN-FUSSBALL", Trainingseinheit für A-Junior*innen 4)
- URL: https://dfb.de/fileadmin/_dfbdam/219816-486-a-ha2-01.pdf
- Datum (Veröffentlichung/Aktualisierung): PDF-Metadaten 02.03.2020
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Organisation, Ablauf, Variationen und Tipps geprüft).
- Kernaussagen (paraphrasiert):
  - Thema „Verschieben zum Ball": Aus dem Spielaufbau soll ein Pass durch die Schnittstellen der Verteidiger in eine neutrale Zone gelingen. [neu]
  - Schnelle Spielverlagerungen sollen die Viererkette auseinanderziehen. Die Verteidiger verschieben ihrerseits schnell ballorientiert, ohne dass die Abstände in der Kette zu groß werden; Situationen zum Doppeln erkennen und konsequent nutzen. [bestätigt]
  - Methodik: Trainer*innen können die Situation „einfrieren" und die Spieler*innen auf die Möglichkeit zum Doppeln aufmerksam machen. [neu]
- Konsequenzen für SPIELIQ: Direkt als Simulator-Regel abbildbar (Kettenabstände, Verschieben bei Spielverlagerung, Doppeln). Das Blatt belegt außerdem das Einfrieren als DFB-Coachingmethode, ein Vorbild für eine Freeze-Funktion. Zielgruppe sind A-Junior*innen; für eine C-Jugend vereinfachen.

### [A-51] DFB-Trainingsblatt D- und C-Junioren: „2 gegen 2 plus Rückraumspieler" (Themenschwerpunkt „Modernes Verteidigen", 2012)
- Organisation/Autor: DFB; Autor Stefan Böger
- URL: https://dfb.de/fileadmin/_dfbdam/11429-287-dc-ha2-01.pdf
- Datum (Veröffentlichung/Aktualisierung): 03.07.2012 (Blatt)
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (vollständig).
- Kernaussagen (paraphrasiert):
  - Hauptteil 2 einer D-/C-Junioren-Einheit: 2 gegen 2 mit Rückraumspielern, die einbezogen werden, aber nicht ins Feld nachrücken; Variationen mit Fernschuss bzw. Direktspiel.
  - Themenkasten zum Juni-Schwerpunkt 2012 „Modernes Verteidigen" mit einem Interview zur Viererkette; wer noch nicht mit Kette spiele, solle sie in der Saisonvorbereitung einführen.
  - Korrektur nach Volltextprüfung: Das Blatt nennt weder „11- bis 12-Jährige" noch eine schrittweise Einführung der Viererkette für fortgeschrittenere Spieler*innen. Diese Aussage des ersten Durchgangs ist durch das Original nicht gedeckt. Der Aufruf zur Ketteneinführung steht gleichlautend auf einem B-/A-Junioren-Blatt (A-72) und ist damit nicht altersspezifisch.
- Konsequenzen für SPIELIQ: Aus dieser Quelle keine DFB-Altersvorgabe für die Viererkette ableiten. Die Progression „erst ballorientierte Grundprinzipien, dann Kettenverhalten" bleibt eine eigene Einordnung; die aktuelle TPD-Linie steht in A-87.

### [A-52] „Buch-Neuerscheinung: Viererketten-Training im Jugendfußball" (openPR)
- Organisation/Autor: Verlags-Pressemitteilung auf openPR (Verlag in den Treffern nicht genannt)
- URL: https://www.openpr.de/news/400151/Buch-Neuerscheinung-Viererketten-Training-im-Jugendfussball.html
- Datum (Veröffentlichung/Aktualisierung): laut Suchzusammenfassung ca. 2010
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: DFB-Trainingsblätter von 2012 rufen dazu auf, die Viererkette in der Saisonvorbereitung einzuführen, ohne Altersangabe (A-51, A-72).
- Kernaussagen (paraphrasiert): Die Mitteilung behauptet, der DFB erwarte von Jugendmannschaften die Viererkette oder zumindest ballorientiertes Verteidigen ohne Libero; Lehrmaterial dazu sei knapp. Die Altersangabe ist in zwei Zusammenfassungen widersprüchlich.
- Konsequenzen für SPIELIQ: Nur ein historisches Indiz für die Abkehr vom Libero, kein Beleg für eine aktuelle DFB-Altersvorgabe.

### [A-53] BDFL-Kongress ITK 2007 (Beiträge 11–20)
- Organisation/Autor: Bund Deutscher Fußball-Lehrer (BDFL), Internationaler Trainer-Kongress 2007
- URL: https://www.bdfl.de/images/ITK/2007/ITK2007_11bis20low.pdf
- Datum (Veröffentlichung/Aktualisierung): 2007
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Die DFB-Kinderfußball-Seite kritisiert eine zu frühe Taktikorientierung im Kinderfußball (A-21).
- Kernaussagen (paraphrasiert): Spielsysteme, „Taktiken" und eine Ergebnisfixierung wie im Profifußball haben im Kinderfußball nichts zu suchen.
- Konsequenzen für SPIELIQ: System- und Positionsinhalte erst für ältere Jahrgänge anbieten. Für die C-Jugend ist das vertretbar, für Kinder nicht.

### [A-54] „Ergänzung: Bio-Banding beim 1. FC Köln" (fussballtraining 4/24)
- Organisation/Autor: Fachzeitschrift fussballtraining
- URL: https://fussballtraining.com/artikel/ft-4-24-ergaenzung-bio-banding-beim-1-fc-koeln
- Datum (Veröffentlichung/Aktualisierung): Ausgabe 4/2024 (aus der URL)
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet; keine DFB-Quelle · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Die Abweichung von biologischem und kalendarischem Alter um bis zu fünf Jahre nennt auch das DFB-Flipbook (A-87).
- Kernaussagen (paraphrasiert): Kalendarisches und biologisches Alter können bis zu fünf Jahre auseinanderliegen. Der 1. FC Köln führt in U13 bis U15 einen wöchentlichen Bio-Banding-Tag ein.
- Konsequenzen für SPIELIQ: In der C-Jugend sind die Reifeunterschiede am größten. Kognitives Lernen unabhängig von der Körperreife ist eine Chance für Spätentwickler*innen; SPIELIQ sollte keine Vergleiche nach Körperwerten anstellen.

**Block 4 – Spielauffassung, Spielphasen, Terminologie**

### [A-55] Hansi Flick: Sportliches Leitbild und Leitlinien der Spielauffassung (BDFL-ITK 2015)
- Organisation/Autor: BDFL-Kongressdokumentation; Vortrag von Hansi Flick (damals DFB-Sportdirektor)
- URL: https://www.bdfl.de/images/ITK/2015/Flick_online1_sicher.pdf
- Datum (Veröffentlichung/Aktualisierung): 2015 (ITK 2015)
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Die DFB-Leitbild-URLs leiten heute auf die TPD-Seite um (A-03 bis A-05); Teile der Leitlinien-Formulierungen (Gegner binden oder anspielbar sein; Räume im Rücken des Gegners) stehen im Trainingsdialog 8 (A-15); „so tief wie möglich, so breit wie nötig" wurde in DFB-Originalen nicht gefunden.
- Kernaussagen (paraphrasiert):
  - Flick stellte das neue sportliche Leitbild mit den Leitlinien der DFB-Spielauffassung vor. Die Leitlinien sind Teil der Spielvision: Sie sollen Orientierung geben und Raum für Kreativität lassen.
  - Sie gelten übergreifend für Offensive und Defensive, unabhängig von Phase, Alter und Entwicklungsstand.
  - „Unser Weg" wird als fortlaufender Prozess beschrieben, der Entwicklungen des Spiels und der Wissenschaft aufnimmt. Erfolg gilt als Ergebnis stetiger Entwicklung, mit Bezug auf den WM-Titel 2014 und das Talentförderprogramm.
  - Eine der Leitlinien zielt darauf, in der gegnerischen Ordnung möglichst große Abstände in der Tiefe zu erzeugen und dabei nur so breit wie nötig zu spielen.
- Konsequenzen für SPIELIQ: Die Leitlinien sind systemunabhängige Prinzipien und eignen sich deshalb ideal als Feedback-Regeln. Stand 2015; die Aktualität ist zu prüfen.

### [A-56] Meikel Schönweitz (BDFL-ITK 2015)
- Organisation/Autor: BDFL-Kongressdokumentation; Meikel Schönweitz
- URL: https://bdfl.de/images/ITK/2015/schoenweitz_online.pdf
- Datum (Veröffentlichung/Aktualisierung): 2015
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Die Formulierung zu Räumen im Rücken des Gegners steht in ähnlicher Form im Trainingsdialog 8 (A-15).
- Kernaussagen (paraphrasiert): Auf Basis der neuen DFB-Spielauffassung sollen jungen Spieler*innen Leitlinien vermittelt werden, die unabhängig von Spielsystem und Position gelten. Beispiel: „Räume im Rücken des Gegners erkennen und nutzen". Dazu kommt die Formulierung „nur so breit wie nötig".
- Konsequenzen für SPIELIQ: Die Formulierung „Raum im Rücken der Abwehr" ist DFB-anschlussfähig.

### [A-57] Coaching-Dokumentation ITK 2016 (Datei „winter_end")
- Organisation/Autor: BDFL-Kongressdokumentation; Autor laut Dateiname vermutlich „Winter" (Vorname unbekannt)
- URL: https://www.bdfl.de/images/ITK/2016/Dokumentation/winter_end.pdf
- Datum (Veröffentlichung/Aktualisierung): 2016
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: „Gegner binden oder anspielbar sein" ist in DFB-Originalen von 2024/2025 belegt (A-14, A-15); Gegenpressing kommt im DFB-Flipbook vor (A-87); der Teil „Zugriff auf den Gegner" wurde in DFB-Originalen nicht gefunden.
- Kernaussagen (paraphrasiert):
  - Im Mittelpunkt des Coachings steht die DFB-Leitlinie, jedes persönliche Duell zu suchen und zu gewinnen.
  - Im Abschlussspiel wird die zweite Leitlinie gecoacht: „Mit Ball Gegner binden, ohne Ball anspielbar sein oder Zugriff auf den Gegner haben".
  - Erläuterung: Im Angriff hat jede*r zu jedem Zeitpunkt eine Aufgabe. Mit Ball bindet man Gegner, etwa im Dribbling. Ohne Ball ist man anspielbar oder kann bei Ballverlust den zugeordneten Gegenspieler attackieren.
  - Nach Ballverlust gehen die Spieler*innen in unmittelbarer Ballnähe idealerweise direkt ins Gegenpressing. Voraussetzung ist ein kompakter Mannschaftsverbund.
- Konsequenzen für SPIELIQ: Daraus folgt eine Kernregel: Jede Figur ohne Ball ist entweder anspielbar oder hat Zugriff. Das lässt sich über Passlinien und Gegnerabstand prüfen. Diese Regel verbindet „Freilaufen" und „Restverteidigung", ohne dass man diese unbestätigten Begriffe braucht.

### [A-58] Halemeier: DFB-Trainingseinheit U15/U16 (BDFL-ITK 2018)
- Organisation/Autor: BDFL-Kongressdokumentation; Halemeier (Vorname in den Treffern nicht genannt)
- URL: https://www.bdfl.de/images/ITK/2018/Halemeier_2018.pdf
- Datum (Veröffentlichung/Aktualisierung): 2018
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: „so tief wie möglich, so breit wie nötig" wurde in den abgerufenen DFB-Originalen nicht gefunden.
- Kernaussagen (paraphrasiert):
  - Die Trainingsformen der Einheit orientieren sich an DFB-Leitlinien: Räume hinter der gegnerischen Abwehr erkennen und nutzen, „Raum so tief wie möglich und so breit wie nötig aufteilen", konsequent zum Torerfolg kommen.
  - Umgesetzt wird das z. B. im 3-gegen-3 plus zwei Neutrale. Die Zuordnung dieser Spielform zu genau diesem Dokument ist wahrscheinlich.
- Konsequenzen für SPIELIQ: Die Einheit liegt altersnah an der Zielgruppe (U15/U16). Das Feedback sollte die Raumaufteilung bewerten („so tief wie möglich, so breit wie nötig") statt pauschal „mach das Feld breit" zu verlangen.

### [A-59] Bernd Stöber (BDFL-ITK 2011)
- Organisation/Autor: BDFL-Kongressdokumentation; Bernd Stöber (laut Zusammenfassung DFB-Sportlehrer und Leiter der DFB-Trainerausbildung)
- URL: https://www.bdfl.de/images/ITK/2011/02_Stoeber.pdf
- Datum (Veröffentlichung/Aktualisierung): 2011
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: „Grundordnung" wurde in den abgerufenen DFB-Originalen nicht gefunden.
- Kernaussagen (paraphrasiert): Das Verhalten nach Ballverlust steht im Vordergrund; oberstes Ziel ist, schnell die eigene Grundordnung wiederherzustellen. Schnelles Umschalten nach Ballgewinn gilt als Standardoption von Spitzenteams.
- Konsequenzen für SPIELIQ: Den Begriff „Grundordnung" für die Ausgangsformation verwenden.

### [A-60] Frank Wormuth (BDFL-ITK 2011)
- Organisation/Autor: BDFL-Kongressdokumentation; Frank Wormuth
- URL: https://www.bdfl.de/images/ITK/2011/10_Wormuth.pdf
- Datum (Veröffentlichung/Aktualisierung): 2011
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert.
- Kernaussagen (paraphrasiert): Spielsituationen bei eigenem und bei gegnerischem Ballbesitz sind die zentralen Handlungsfelder und auf allen Leistungsstufen dieselben.
- Konsequenzen für SPIELIQ: Das Phasenmodell der UI kann sich daran orientieren: eigener Ballbesitz, gegnerischer Ballbesitz, Umschalten.

### [A-61] Daum/Gerisch (BDFL-ITK 2016)
- Organisation/Autor: BDFL-Kongressdokumentation; Daum und Gerisch (Vornamen in den Treffern nicht genannt)
- URL: https://www.bdfl.de/images/ITK/2016/Dokumentation/daum_gerisch_end.pdf
- Datum (Veröffentlichung/Aktualisierung): 2016
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Umschalten in beide Richtungen ist ein Kernelement der TPD (A-87).
- Kernaussagen (paraphrasiert): Das Umschaltspiel hat im internationalen Spitzenfußball an Bedeutung gewonnen. Das Lernen beginnt beim Verhalten nach dem eigenen Ballverlust.
- Konsequenzen für SPIELIQ: Umschalt-Szenarien früh einplanen, mit Fokus auf die ersten Sekunden nach dem Ballverlust.

### [A-62] „Spielprinzipien" des 1. FC Nürnberg (BDFL-Verbandsgruppe Bayern, 2015)
- Organisation/Autor: BDFL-Verbandsgruppe Bayern; Nachwuchs des 1. FC Nürnberg
- URL: https://www.bdfl.de/images/Verbandsgruppen/VG-Bayern/2015/Veranstaltungen/Dateien/SpielprinzipienClubPrinzen.pdf
- Datum (Veröffentlichung/Aktualisierung): 2015
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet; Vereinsprinzipien, keine DFB-Vorgabe · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert.
- Kernaussagen (paraphrasiert): Ist Gegenpressing nicht möglich, wird schnellstmöglich die Ordnung hergestellt. Nach Ballgewinn soll die Unordnung des Gegners sofort genutzt werden (Tempogegenstoß, Konter).
- Konsequenzen für SPIELIQ: Ein Beispiel für Umschaltprinzipien, das als Vereinsauffassung gekennzeichnet werden muss.

### [A-63] „The DFB's Sporting Mission Statement" (coachingarea.net)
- Organisation/Autor: coachingarea.net (englischsprachiges Trainerportal; Verbindung zum DFB in den Treffern nicht erkennbar)
- URL: https://www.coachingarea.net/magazine/dfb-vision
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet. Der Treffer war abgeschnitten. · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert.
- Kernaussagen (paraphrasiert):
  - Eine englische Darstellung des sportlichen Leitbilds: klare Prinzipien, eine Ausbildungs- und Trainingsvision, Spielkonzepte und ein ethisches Fundament. Genannte Werte sind u. a. Zielstrebigkeit, Teamgeist, Respekt und Optimismus.
  - Zu „Our Path" werden sechs zentrale Prinzipien genannt, von denen fünf sichtbar waren: Spielen vor Üben, Kreativität fördern, Stärken stärken und Schwächen schwächen, Schwerpunkte vielseitig trainieren. Das fünfte bricht bei „Organise …" ab.
  - Die deutschen Originalformulierungen sind unbekannt.
- Konsequenzen für SPIELIQ: „Spielen vor Üben" und „Stärken stärken" taugen als Produktprinzipien: Spielszenarien statt isolierter Drills und ein Stärkenprofil pro Spieler*in.

### [A-64] „DFB DVD Series: Modern Defending 1–3" (soccer-coaches.com)
- Organisation/Autor: soccer-coaches.com (Vertrieb englischsprachiger DFB-Lehrvideos); Inhalt mit DFB-Trainer und -Ausbilder Ralf Peter
- URL: https://soccer-coaches.com/?p=5074 ; Übersicht: https://soccer-coaches.com/official-soccer-coaching-dvds-of-the-german-soccer-association/
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet. Die deutschen Originaltitel sind unbekannt. · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert.
- Kernaussagen (paraphrasiert): Die dreiteilige DFB-Reihe behandelt (1) das Zweikampfverhalten im 1-gegen-1, (2) die Gruppenverteidigung und (3) die Mannschaftsverteidigung. Sie vermittelt ein ballorientiertes Verteidigungskonzept über individuelles und gruppentaktisches Training und wird als Material der U16- und U17-Nationalteams beschrieben.
- Konsequenzen für SPIELIQ: Diese Reihenfolge eignet sich für das Defensivmodul: Individual, dann Gruppe, dann Mannschaft.

### [A-65] „Christian Wück fordert mehr Spaß im Fußball" (inFranken)
- Organisation/Autor: inFranken.de (Regionalzeitung)
- URL: https://www.infranken.de/lk/bad-kissingen/sport/christian-wueck-fordert-mehr-spass-im-fussball-art-3310344
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Die DFB-URL „DFB-Tugenden 2.0" leitet heute auf die TPD-Seite um (siehe Weitere Treffer).
- Kernaussagen (paraphrasiert): DFB-Juniorentrainer Wück stellte die DFB-Leitlinien für den Nachwuchs vor. Die DFB-Juniorentrainer haben „Deutsche Tugenden 2.0" entwickelt, um die „Internetgeneration" zu erreichen. Die Individualität soll stärker in den Blick rücken.
- Konsequenzen für SPIELIQ: Die Ansprache der „Internetgeneration" ist ein DFB-Thema und damit ein Anknüpfungspunkt für digitale Formate. Eine Aussage zu Apps enthält der Treffer nicht.

### [A-66] „Nationaltrainer Wück gibt Tipps in Ebern" (inFranken)
- Organisation/Autor: inFranken.de
- URL: https://www.infranken.de/lk/hassberge/sport/nationaltrainer-wueck-gibt-tipps-in-ebern-art-2009100
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert.
- Kernaussagen (paraphrasiert): Wück hielt seinen Vortrag unter dem Motto „Unser Weg – Erfolge entwickeln". Er stellte Leitlinien für Offensive und Defensive vor, u. a. Räume im Rücken des Gegners erkennen und nutzen. Spieler*innen sollen im Spiel miteinander kommunizieren, sich gegenseitig coachen und antizipieren.
- Konsequenzen für SPIELIQ: Kommunikation unter Mitspieler*innen kann ein Lernziel sein. Konkrete Kommandos wurden nicht recherchiert.

### [A-67] „Is a compact organization important for defensive success in elite soccer?" (Universität Wien)
- Organisation/Autor: Universität Wien (u:cris-Forschungsportal); Autor*innen in den Treffern nicht genannt
- URL: https://ucrisportal.univie.ac.at/en/publications/is-a-compact-organization-important-for-defensive-success-in-elit/
- Datum (Veröffentlichung/Aktualisierung): 2024 (laut Suchzusammenfassung)
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet; nur Abstract-Ebene, keine DFB-Quelle · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Der Begriff „Kompaktheit" kommt in den abgerufenen DFB-Originalen nicht vor; der DFB spricht vom Verteidigen im Verbund (A-87, A-14).
- Kernaussagen (paraphrasiert): Die Analyse von 153 Bundesligaspielen der Saison 2020/21 ergab: Für defensiven Erfolg scheint vor allem die Kompaktheit der Spieler*innen in Ballnähe entscheidend. Die Kompaktheit der gesamten Mannschaft spielte für Ballgewinne kaum eine Rolle.
- Konsequenzen für SPIELIQ: Kompaktheits-Feedback sollte ballnah gewichtet sein und nicht nur die Gesamtausdehnung der Mannschaft messen. Das ist eine Warnung vor Über-Vereinfachung.

### [A-68] Analyse zu Nagelsmann: „7:0-Gala gegen Bosnien …" (Goal.com)
- Organisation/Autor: Goal.com (deutsch)
- URL: https://www.goal.com/de/listen/7-0-gala-gegen-bosnien-warum-der-fussball-von-julian-nagelsmann-beim-dfb-team-besser-klappt-als-beim-fc-bayern/blt9b5ee17972d80f37
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet; Medienanalyse · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert.
- Kernaussagen (paraphrasiert): Für Nagelsmanns Nationalteam wird das Prinzip „nur so breit wie nötig" beschrieben. Es steht im Gegensatz zur verbreiteten Vorgabe, gegen tief stehende Gegner möglichst breit zu spielen.
- Konsequenzen für SPIELIQ: „Maximale Breite" darf im Feedback kein Dogma sein.

**Block 5 – Coaching und Gruppentaktik**

### [A-69] „Individuelles Coaching" (Vortrag, BDFL-Verbandsgruppe Nordost, 14.05.2018)
- Organisation/Autor: BDFL-Verbandsgruppe Nordost; Referent laut Suchzusammenfassung Nils Gatzmaga (nicht verifiziert)
- URL: https://www.bdfl.de/images/Verbandsgruppen/VG-Nordost/2018/Vortrag_Individuelles_Coaching_14.05.2018.pdf
- Datum (Veröffentlichung/Aktualisierung): 14.05.2018 (Dateiname)
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet; keine offizielle DFB-Position · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Coaching in Pausen und „weniger ist mehr" sind auch in DFB-Trainingsdialogen belegt (A-14, A-15).
- Kernaussagen (paraphrasiert):
  - Nicht in laufende Aktionen hineincoachen: Ohne Ball und ohne Gegnerdruck sind Spieler*innen aufnahmefähiger.
  - Nicht „durchcoachen", sondern Pausen für Beobachtung und Analyse nutzen.
  - Wenige, einfache und konkrete Handlungsaufträge geben und konstruktiv formulieren.
  - Die Komplexität des Spiels auf zentrale Prinzipien und Lösungsmuster herunterbrechen.
- Konsequenzen für SPIELIQ: Für das Feedback-Timing heißt das: Rückmeldung erst nach der Aktion oder in einer Pause (z. B. „Einfrieren"), höchstens ein bis zwei Hinweise, positiv formuliert.

### [A-70] Florian Kohfeldt: individuelles Defensivverhalten (BDFL-ITK 2015)
- Organisation/Autor: BDFL-Kongressdokumentation; Florian Kohfeldt
- URL: https://www.bdfl.de/images/ITK/2015/kohfeldt_online_sicher.pdf
- Datum (Veröffentlichung/Aktualisierung): 2015
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert.
- Kernaussagen (paraphrasiert): Eine videobasierte Einheit führt von Positionierung und Distanzverkürzung über das 1-gegen-1 bis zum 5-gegen-5 und 9-gegen-9.
- Konsequenzen für SPIELIQ: Die Progression Individual, Kleingruppe, größeres Spiel taugt als Content-Struktur.

### [A-71] „Abwehrverhalten – hinführend" (BDFL-ITK 2008)
- Organisation/Autor: BDFL-Kongressdokumentation; laut Suchzusammenfassung Markus von Ahlen (nicht verifiziert)
- URL: https://www.bdfl.de/images/ITK/2008/ITK08_Abwehrverhalten_hinfuehrend.pdf
- Datum (Veröffentlichung/Aktualisierung): 2008
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Über-/Unterzahlspiele sind eine TPD-Formgruppe (A-87).
- Kernaussagen (paraphrasiert): Das gruppentaktische Defensivverhalten wird variabel und positionsspezifisch trainiert, u. a. das Verteidigen in Überzahl gegen Angriffseinheiten.
- Konsequenzen für SPIELIQ: „Verteidigen in Über-, Gleich- oder Unterzahl" eignet sich als Schwierigkeitsstufe.

### [A-72] DFB-Trainingsblatt B- und A-Junioren: „Zweikampf-Quadrate" (2012)
- Organisation/Autor: DFB; Autor Horst Hrubesch
- URL: https://training-service.fussball.de/fileadmin/_dfbdam/13095-287-ba-ha2-01.pdf (leitet heute auf www.meinfussball.de um); identische Datei unter https://www.dfb.de/fileadmin/_dfbdam/13095-287-ba-ha2-01.pdf
- Datum (Veröffentlichung/Aktualisierung): 03.07.2012 (Blatt)
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 über die dfb.de-Adresse (vollständig).
- Kernaussagen (paraphrasiert): 1v1-Dribblings gegen Verteidiger*innen in Quadraten mit anschließendem Torabschluss; Tipps: mit hohem Tempo andribbeln, schnelle Richtungsänderung, Finten, zielstrebig abschließen. Zum Absichern enthält das Blatt nichts. [bestätigt] Ergänzung: Zielgruppe sind B- und A-Junioren; Themenkasten „Modernes Verteidigen" wie in A-51.
- Konsequenzen für SPIELIQ: Das 1v1 ist ein Basisbaustein. Für das Thema Absichern gibt es jetzt eine TPD-Quelle (A-87: Verschieben, Herausrücken, Absichern).

**Block 6 – MEIN FUSSBALL und DFB-Wissensplattformen**

### [A-73] „MEIN FUSSBALL: Verlässliches Wissen an einem Ort für alle im Fußball" (DFB-News)
- Organisation/Autor: DFB
- URL: https://www.dfb.de/news/mein-fussball-verlaessliches-wissen-an-einem-ort-fuer-alle-im-fussball
- Datum (Veröffentlichung/Aktualisierung): 21.10.2026 (Plattformstart ab 11 Uhr)
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Startdatum, Zugangswege und Zitate geprüft). Die Plattform selbst (www.meinfussball.de) war wegen einer Netzwerksperre nicht erreichbar.
- Kernaussagen (paraphrasiert):
  - MEIN FUSSBALL ist die neue Wissensplattform des DFB mit Inhalten, Tools und Lernformaten, erreichbar seit 21.10.2026 ab 11 Uhr unter meinfussball.de sowie über DFB.de und FUSSBALL.DE. [bestätigt]
  - Beispiele: Trainingseinheit planen, Vereinsarbeit organisieren, Regeln nachschlagen, passende Lizenzstufe finden; das Wissen ist auf die jeweilige Rolle zugeschnitten. [bestätigt]
  - Ziel ist, allen in der Fußballfamilie Zugang zu verlässlichem Wissen, Orientierung und Entwicklung zu geben, unabhängig von Rolle, Erfahrung oder Umfeld. Mirko Dismer (Leiter Fußballentwicklung) nennt Heimatverein, Klassenzimmer und Profiklub. Inhalte sollen künftig über den DFB-Verbandskanal in den sozialen Medien ausgespielt werden. [bestätigt]
  - Wolf: MEIN FUSSBALL sei die konsequente Fortsetzung der TPD. [neu; klärt A-75]
  - Präzisierung nach Volltextprüfung: Eine ausdrückliche Zielgruppenliste („Trainer*innen, Vereinsverantwortliche, Lehrkräfte") enthält die Meldung nicht; sie war eine Zusammenfassung des Suchwerkzeugs. Zur Struktur der Plattform siehe A-101.
- Konsequenzen für SPIELIQ: MEIN FUSSBALL ist der neue Referenzort für DFB-Terminologie und -Inhalte und sollte im Original geprüft werden, sobald meinfussball.de erreichbar ist. Mögliche Überschneidungen (Trainingsplaner, Eigentraining für Spieler*innen, vgl. A-101) sind zu klären; zugleich eröffnet sich eine Kooperationschance.

### [A-74] „MEINFUSSBALL.de: Neue DFB-Wissensplattform ist gestartet" (FLB)
- Organisation/Autor: Fußball-Landesverband Brandenburg (FLB)
- URL: https://www.flb.de/news/1/1301669/nachrichten/meinfussball.de-neue-dfb-wissensplattform-ist-gestartet.html
- Datum (Veröffentlichung/Aktualisierung): unbekannt (bezieht sich auf den Start am 21.10.2026)
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Das Startdatum 21.10.2026 ist durch die DFB-Meldung bestätigt (A-73).
- Kernaussagen (paraphrasiert): Der DFB bündelt seine Wissensangebote auf einer zentralen Plattform, die seit dem 21.10.2026 online ist.
- Konsequenzen für SPIELIQ: Bestätigt das Startdatum unabhängig von der DFB-Meldung.

### [A-75] „DFB startet Wissensplattform MEIN FUSSBALL: Inhalte, Tools und Lernformate an einem Ort …" (FVN)
- Organisation/Autor: Fußballverband Niederrhein (übernimmt die DFB-Meldung)
- URL: https://fvn.de/news/nachricht/dfb/dfb-startet-wissensplattform-mein-fussball-inhalte-tools-und-lernformate-an-einem-ort-fuer-alle-im-fussball-3243/
- Datum (Veröffentlichung/Aktualisierung): unbekannt (Oktober 2026)
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Die TPD-Anbindung bestätigt die DFB-Meldung (Wolf: konsequente Fortsetzung der TPD, A-73).
- Kernaussagen (paraphrasiert): Inhalte, Tools und Lernformate an einem Ort. Laut einer Suchzusammenfassung baut die Plattform auf der TPD auf. Eine zitierte Wolf-Aussage dazu war unklar wiedergegeben und ist nicht verwertbar.
- Konsequenzen für SPIELIQ: Die TPD-Nähe ist plausibel und deshalb im Original zu prüfen.

### [A-76] One-Pager „JETZT ENTDECKEN – meinfussball.de" (FVN)
- Organisation/Autor: Fußballverband Niederrhein (Datei); inhaltlich DFB
- URL: https://fvn.de/media/261016_mein_fussball_one_pager.pdf
- Datum (Veröffentlichung/Aktualisierung): Der Dateiname „261016" deutet auf den 16.10.2026 hin (eigene Ableitung)
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Die MEIN-FUSSBALL-Inhalte (Trainingsplaner, Videos, E-Learning) waren nicht prüfbar, da meinfussball.de gesperrt war; zur Struktur siehe A-101.
- Kernaussagen (paraphrasiert): Die Plattform bietet Checklisten, Vorlagen und praxisnahe Hilfen sowie E-Learning, einen Trainingsplaner und Videos für Trainer*innen.
- Konsequenzen für SPIELIQ: Der DFB-Trainingsplaner ist potenziell ein Konkurrenzprodukt oder eine Schnittstelle, etwa über einen Export von SPIELIQ-Szenarien.

### [A-77] DFB-E-Learning-Kurse (elearning.meinfussball.de)
- Organisation/Autor: DFB
- URL: https://elearning.meinfussball.de/
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet. Eine Standardsuche fand die Seite nicht, nur die erweiterte Suche. · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Der TPD-Online-Kurs (eine Stunde, Zertifikat) ist durch A-01 und A-89 bestätigt.
- Kernaussagen (paraphrasiert): Kostenlose DFB-E-Learning-Kurse für Trainer*innen, u. a. zu modernem Fußballtraining, zur TPD und zur individuellen Spielerentwicklung.
- Konsequenzen für SPIELIQ: Den TPD-Kurs selbst absolvieren, um Didaktik und Begriffe abzugleichen.

### [A-78] Gleichlautende Verbandsmeldungen zu MEIN FUSSBALL
- Organisation/Autor: Niedersächsischer FV, FV Rheinland, Hamburger FV, Südwestdeutscher FV, Landesfußballverband Mecklenburg-Vorpommern
- URL: https://www.nfv.de/verband/nfv-aktuell/news/news-detail/neues-dfb-wissensportal-mein-fussball-online ; https://www.fv-rheinland.de/mein-fussball-verlaessliches-wissen-an-einem-ort-fuer-alle-im-fussball/ ; https://www.hfv.de/mein-fussball-verlaessliches-wissen-an-einem-ort-fuer-alle-im-fussball/ ; https://www.swfv.de/Meldungen/Qualifizierung/MEIN-FUSSBALL-Verl%C3%A4ssliches-Wissen-einem-Ort-f%C3%BCr-alle-im-Fu%C3%9Fball ; https://www.lfvm-v.de/mein-fussball-verlaessliches-wissen-an-einem-ort-fuer-alle-im-fussball/
- Datum (Veröffentlichung/Aktualisierung): unbekannt (Oktober 2026)
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseiten nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Die Zielformulierung entspricht der DFB-Meldung (A-73).
- Kernaussagen (paraphrasiert): Die Verbände übernehmen die DFB-Meldung. Ziel ist, allen in der Fußballfamilie unabhängig von Rolle, Erfahrung und Umfeld Zugang zu verlässlichem Wissen zu geben.
- Konsequenzen für SPIELIQ: Die Landesverbände sind eingebunden und kommen als Kanäle für eine spätere Verbreitung infrage.

### [A-79] „FUSSBALL.DE: Mit ‚Training und Service' zum Trainerexperten" (ältere DFB-News)
- Organisation/Autor: DFB
- URL: https://www.dfb.de/news/detail/fussballde-mit-training-und-service-zum-trainerexperten-115333/
- Datum (Veröffentlichung/Aktualisierung): unbekannt (ältere Meldung)
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet. Abruf 29.10.2026: HTTP 404 (Meldung nicht mehr vorhanden) – Eintrag inhaltlich unverändert, nicht verifizierbar. Abgleich: DFB-Trainingsblätter von 2015 bis 2020 tragen bereits den Namen „MEIN FUSSBALL" bzw. „DFB.DE/MEIN-FUSSBALL" (A-50, A-98); der ältere Portalname ist damit indirekt bestätigt.
- Kernaussagen (paraphrasiert): Der Bereich „Training und Service" auf FUSSBALL.DE war inhaltsgleich mit dem damaligen Serviceportal „Mein Fußball" auf DFB.de. Den Namen „Mein Fußball" nutzte der DFB also schon früher für ein Serviceangebot.
- Konsequenzen für SPIELIQ: Bei Quellenangaben zwischen dem alten „Mein Fußball"-Portal und der neuen Plattform von 2026 unterscheiden.

### [A-80] HFV-Info Nr. 2/2019 (Hamburger Fußball-Verband)
- Organisation/Autor: Hamburger Fußball-Verband (Verbandsmagazin, SUB Hamburg)
- URL: https://epub.sub.uni-hamburg.de/epub/volltexte/2019/87379/pdf/HFV_Info_Nr._2_2019.pdf
- Datum (Veröffentlichung/Aktualisierung): 2019
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert.
- Kernaussagen (paraphrasiert): Die Ausgabe meldet ein neues Serviceportal von DFB und DFB-Akademie zu Wissen und Innovation im Fußball. Es hat vier Themenbereiche; die „Wissenswelt" umfasst u. a. Coaching, Athletik, Medizin, Psychologie, Biomechanik und Technologie.
- Konsequenzen für SPIELIQ: Das gehört zur Vorgeschichte der DFB-Wissensportale und darf nicht mit MEIN FUSSBALL verwechselt werden.

**Block 7 – Digitales Lernen und Trainerbildung**

### [A-81] DFB-Basisangebote (Kindertrainer-Zertifikat, DFB-Junior-Coach u. a.)
- Organisation/Autor: DFB
- URL: https://www.dfb.de/mehr-fussball/amateurfussball/basisangebote
- Datum (Veröffentlichung/Aktualisierung): Änderungsdatum laut DFB-Sitemap 08.09.2026 (eigene Ableitung)
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Angebote und Umfänge geprüft; die Zuordnung zu dieser URL ist damit gesichert).
- Kernaussagen (paraphrasiert):
  - Kindertrainer*in-Zertifikat: 20 Lerneinheiten, zwei Präsenztage und drei Onlinephasen, für Bambini- bis E-Junior*innen-Teams; die Kinder sollen in kleinen Teams möglichst frei agieren. [bestätigt]
  - DFB-Junior-Coach: kostenlose 40-stündige Schulung an ausgewählten Schulen für Schüler*innen ab 15 Jahren. [bestätigt]
  - DFB-Basis-Coach: 40 Lerneinheiten im Blended-Learning-Format, Teil der C-Lizenz und Einstieg ins Lizenzsystem; C- und B-Lizenz je 120 Lerneinheiten im Blended Learning. DFB-Mobil: 30 Fahrzeuge, seit Mai 2009 an der Basis unterwegs. [neu]
  - Ergänzung aus dem Journal (A-89, S. 40–41): Jugendtrainer*in-Zertifikat (D- bis A-Jugend, 20 Lerneinheiten, TPD-Bezug) und E-Learning TPD (eine Stunde, empfohlener Einstieg für alle Trainer*innen).
- Konsequenzen für SPIELIQ: Der DFB nutzt Blended Learning in der Trainerbildung, digitale Lernformate sind also anschlussfähig. Belegt ist das für Trainer*innen, nicht für Spieler*innen.

### [A-82] DFB-Junior-Coach (Berliner FV; Schreiben des Badischen FV, Kreis Mosbach)
- Organisation/Autor: Berliner Fußball-Verband; Badischer Fußballverband (Kreis Mosbach)
- URL: https://www.berliner-fussball.de/en/mehr-als-fussball/news/view/jetzt-fuer-den-dfb-junior-coach-anmelden ; https://badfv.de/files/Kreis_Mosbach/Bilder/1.1_Aktuelles/AnschreibenVereineDFBJuniorCoach.pdf
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseiten nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Der DFB-Junior-Coach (ab 15 Jahren, 40 Stunden, an Schulen) ist durch A-81 und A-89 bestätigt.
- Kernaussagen (paraphrasiert): Das Angebot richtet sich an Fußballbegeisterte ab 15 Jahren und ist die erste Stufe der Trainerausbildung. Weitere Treffer (Regionalpresse) nennen als Inhalte Grundlagen der Trainingslehre, Sicherheit und Verantwortung, die eigene Trainerpersönlichkeit und ein altersgerechtes Verständnis von Kinderfußball.
- Konsequenzen für SPIELIQ: Junior-Coaches ab 15 sind mögliche Peer-Multiplikator*innen im Verein und altersnah an der Zielgruppe.

### [A-83] „69. Pro-Lizenz-Lehrgang am DFB-Campus" (DFB-News)
- Organisation/Autor: DFB (Kürzel „jf")
- URL: https://www.dfb.de/news/detail/69-pro-lizenz-lehrgang-am-dfb-campus-247732
- Datum (Veröffentlichung/Aktualisierung): 17.01.2023
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026.
- Kernaussagen (paraphrasiert): Auch der Lehrgang zur höchsten Trainerlizenz läuft im Blended-Learning-Format (Onlineinhalte, Präsenzevents, Anwendung im eigenen Verein); den Rahmen bildet die 2022 eingeführte Ausbildungstreppe. [bestätigt] Die Inhalte orientieren sich am Trainer*innen-Entwicklungsmodell mit den Kernpunkten „Ich", „Spiel und Spieler*in", „Organisation" und „System Fußball". [neu]
- Konsequenzen für SPIELIQ: Digitale Selbstlernphasen sind im DFB-System auf allen Ebenen etabliert, bisher aber für Trainer*innen.

### [A-84] DFB-Stellenanzeigen (get-in-it.de): „DFB-Produktwelt"
- Organisation/Autor: DFB (Stellenanzeigen auf get-in-it.de)
- URL: https://www.get-in-it.de/jobsuche/p287609 ; https://www.get-in-it.de/jobsuche/p308393 ; https://www.get-in-it.de/jobsuche/p304350-68bd5453/68bd5453
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseiten nicht geöffnet. Welche der drei Anzeigen die Aussage enthält, ist unklar. · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Eigene digitale Aktivitäten des DFB belegt u. a. die Coachbetter-Beteiligung (A-96).
- Kernaussagen (paraphrasiert): Laut Anzeige entwickelt die „DFB-Produktwelt" digitale Produkte für Spieler*innen, Trainer*innen und Amateursportler*innen; als Beispiel wird ein Online-Coaching-Campus genannt.
- Konsequenzen für SPIELIQ: Der DFB ist selbst Anbieter digitaler Produkte, also möglicher Wettbewerber oder Partner. Markenrecht beachten: kein DFB-Logo und keine Anmutung eines DFB-Produkts.

**Block 8 – Öffentliche Debatte zur Kinderfußball-Reform**

### [A-85] „Pro und Contra: Watzke hat recht – die Kinderfußball-Reform muss weg" (Schwäbische Zeitung)
- Organisation/Autor: Schwäbische Zeitung (Meinungsbeitrag)
- URL: https://www.schwaebische.de/sport/pro-und-contra-watzke-hat-recht-die-kinderfussball-reform-muss-weg-1886722
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: DFB-Präsident Neuendorf reagierte am 08.09.2023 mit einem Statement (DFB-Meldung abgerufen; laut Teaser gehe es um Leistung, Gewinnen und Verlieren).
- Kernaussagen (paraphrasiert): Der Beitrag unterstützt DFB-Vizepräsident Watzke, der die Reform zurückdrehen wolle, weil es keine Tabellen und keine Torschützenkönige gebe. Das Argument: Kinder wollten sich messen. Das ist eine Meinung, keine Tatsache.
- Konsequenzen für SPIELIQ: Die Reform ist umstritten. Kinder-Formate in SPIELIQ sollten flexibel bleiben und Wettbewerbselemente bewusst dosieren.

### [A-86] „Merz irrt: Aussagen zum Kinderfußball" (web.de)
- Organisation/Autor: web.de Magazin
- URL: https://web.de/magazine/sport/fussball/merz-irrt-aussagen-kinderfussball-40609004
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Websuche 29.10.2026, Originalseite nicht geöffnet · Nachprüfung 29.10.2026: Volltext nicht abrufbar (Domain im Netzwerk gesperrt, ein Versuch) – Eintrag inhaltlich unverändert. Abgleich: Der DFB bestätigt, dass gewonnen und verloren wird und die Ergebnisse über Auf- und Abstieg entscheiden (A-21, A-22).
- Kernaussagen (paraphrasiert): Der Artikel stellt klar, dass im neuen Kinderfußball Tore gezählt werden und es kein Verbot des Toreschießens gibt.
- Konsequenzen für SPIELIQ: Den Mythos „im Kinderfußball zählen keine Tore" nicht reproduzieren.

**Block 9 – Neu aufgenommene DFB-Originaldokumente (Volltextprüfung 29.10.2026)**

### [A-87] Flipbook „Trainingsphilosophie Deutschland – Entwicklung individueller Qualität" (DFB, 70 Seiten)
- Organisation/Autor: DFB; Gesamtverantwortung Hannes Wolf; inhaltliche Mitarbeit Hanno Balitsch, Lars Bender, Sven Bender, Hermann Gerland, Peter Hermann, Sabine Loderer, Lena Lotzen, Nikola Ludwig, Antonio Di Salvo, Daniel Stredak, Sandro Wagner, Hannes Wolf; Redaktion und Gestaltung philippka
- URL: https://assets.dfb.de/uploads/000/311/784/original_TPD.pdf?1730278757 (Download „Flipbook" auf A-01)
- Datum (Veröffentlichung/Aktualisierung): PDF-Metadaten 14.10.2024; der Text nennt den Sommer 2024 als Bezugszeitpunkt; der Upload-Zeitstempel entspricht dem 30.10.2024 (eigene Ableitung)
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (alle 70 Seiten ausgewertet).
- Kernaussagen (paraphrasiert):
  - Elementare Botschaften: in jeder Trainingsminute die einzelnen Spieler*innen weiterentwickeln; mindestens zweimal pro Woche kleine Spielformen auf mehreren Feldern mit hoher Nettospielzeit; alle erleben in jeder Minute Freude, Wiederholung und Intensität. Die TPD gilt alters- und niveauunabhängig.
  - Hintergrund: längere Schulzeiten, mehr Bildschirmnutzung und weniger Bolzplatz; die „Taktisierung" (vor allem gegnerorientierte Mannschaftstaktik) und große Spielformen hätten die individuelle Entwicklung gebremst. Auslöser waren geringe Einsatzzeiten junger deutscher Spieler in den Profiligen und ein hoher Dropout ab dem D-Junioren-Alter.
  - In zu großen Spielformaten, in taktisch-gegnerorientierten Formen sowie im Prinzipien- und Spielausschnittstraining trete die Entwicklung des Einzelnen häufig in den Hintergrund.
  - Mindest-Nettospielzeiten: U8 bis U16 mindestens 48 Minuten, ab U17 mindestens 32 Minuten pro Woche und Spieler*in; Trainer*innen sollen sie im Blick behalten und kontrollieren.
  - „Beste Trainingseinheit": 15 Minuten Aktivierung, 30 Minuten Spielblock (mehrmals 3–4 Minuten netto, ca. 1–2 Minuten Pause, 1v1 bis 4v4), 15 Minuten Zwischenblock (Technik, Schnelligkeit), 30 Minuten Spielblock; mindestens zweimal pro Woche. Alle 135 befragten C-, B- und A-Jugend-Trainer der Leistungszentren wünschen diese Struktur für die drei Jahre vor der Aufnahme ihrer Spieler*innen.
  - Maximale Formgröße im Training: Bambini höchstens 2v2-Varianten (Eltern als Spielfeldbegleiter*innen, eine Person pro vier Kinder), F höchstens 3 + TW gegen 3 + TW, E höchstens 4 + TW gegen 4 + TW; D bis A 1v1 bis 4v4, die 4 + TW-Varianten mit bis zu zwei Anspieler*innen pro Team.
  - Felder nach Entwicklungsstand (z. B. Gold- und Bronzeniveau) und biologischem Alter einteilen (Abweichung vom kalendarischen Alter bis zu fünf Jahre). Ab der C-Jugend darf Positionsspezifik einfließen, in einer gesunden Mischung mit ganzheitlicher Ausbildung.
  - Vier Formgruppen: Gleichzahlspiele (frontale 1v1-Duelle im Kontext gemeinsamen Angreifens und Verteidigens), Gleichzahlspiele mit Anspieler*innen (Weiträumigkeit, Blickverhalten, Drehungen, Flanken, Spiel über den Dritten), „Eine Linie verteidigen/bespielen" (Spiel gegen eine organisierte Abwehr, gemeinsames Verteidigen im Raum) und Über-/Unterzahlspiele (Passspiel; der gefährlichere Gegner muss gedeckt werden; besser als Rondos ohne Spielrichtung, weil auf Tore gespielt wird).
  - Kapitel „Eine Linie verteidigen und bespielen": Spätestens ab dem D-Junioren-Alter soll geplantes, akzentuiertes Spielen konkrete Ausbildungsschwerpunkte ansteuern. Offensiv lernen die Spieler*innen, die Tiefe unter Beachtung des Abseits zu „bedrohen", defensiv die Grundlagen des Verteidigens auf einer Linie: Verschieben, Herausrücken und Absichern. Kommentare nennen u. a. Viererkette, Übergeben-Übernehmen, Kommunikation, Verteidigen des Raums im Rücken, Verteidigen im Verbund und eine 4-1-Ordnung mit Sechser.
  - Coaching: In kleinen Spielformen vor allem Motivation und Umschaltaktionen coachen; Detailcoaching sei an der Basis nicht erforderlich und komme erst in der Spezialisierung (Balitsch); das Spiel stimmlich und positiv begleiten; der Coach kann sich zwischen zwei Felder stellen.
  - Spielfeldmaße einzelner Formen (Auswahl): 4v4 mit Torhütern 25 × 25 m; 2v2 in acht Sekunden 25 × 20 m; Funino 3v3 20 × 18 m mit 5 m tiefen Abschlusszonen; 3v3 und 4v4 mit drehendem Angriffsrecht 20 × 20 m; 4v4 Linie verteidigen (breit, Sechseck) 30 × 45 m; 5 + TW gegen 5 + TW auf Linie 25 × 50 m. Trainingseinheiten: Bambini ca. 20 × 16 m, F/E ca. 25 × 20 m, D bis A Hybridfelder ca. 33 × 25 m (doppelter Strafraum); Schule ca. 15 × 20 m.
  - Tabelle „Wiederholungszahlen": bei 32 Minuten netto in 3v3-Varianten je Einheit rund 200 Ballaktionen, 200 Entscheidungen, 100 Zweikämpfe und 25 Torschüsse (7v7: 50/50/30/5).
  - „Spieltag der Zukunft": höchstens eine Rotationsperson pro Feld; z. B. E-Jugend einmal 5v5 inklusive Torwart und zweimal 3v3; Spielzeit 6 × 7 Minuten; Einteilung in Gold, Silber und Bronze. Zur Debatte gestellt wird ein 7v7-Zwillingsspiel auf zwei Feldern für die D-Jugend; als „Buffet" für C-Junioren-Freundschaftsspiele z. B. 45 Minuten 7v7 auf zwei Feldern oder 60 Minuten 9v9 bzw. 11v11. Wolf: Alle Kinder sollen mindestens 75 % Spielzeit erhalten.
  - Übergreifende Konzepte bis mindestens zum Ende der D-Jugend, u. a. Hausaufgabenprogramme für das Individualtraining (Jonglieren, Fintieren, Sprünge, Sprints). Angekündigt wird der neue Bereich „Mein.Fußball" auf FUSSBALL.DE als Informationsplattform der TPD.
  - Ergänzung 30.10.2026 (Positionsbezüge, erneut gelesen): Ziele gelten „auf jeder Position" (S. 17); weil Stürmer und Flügelspieler im 11v11 seltener den Ball haben als Innenverteidiger, solle „klein" trainiert werden (Wolf, S. 17); in kleinen Formen hätten alle positionsunabhängig den Ball, „Angreifer müssen verteidigen" (Gerland, S. 17); im 2v2 werde man vom Stürmer zum ersten Verteidiger, mit Herausstechen und Absichern (Lars Bender, S. 21); Zwischenblock „Grund- und Positionstechnik" (S. 10, 53); Linienspiele seien organisierter und positionsspezifischer, das 5 + TW auf Linie schule Achter, Flügelspieler und Stürmer bzw. Viererkette plus Sechser (Wolf, S. 43); Positionsspezifik lasse sich einbauen, indem Innenverteidiger eher hinten und Stürmer vorn spielen (Wolf, S. 48); „Problempositionen" Außenverteidiger, Außenspieler und Stürmer (S. 34) und Flügelspieler (Balitsch, S. 41); für Torhüter*innen bringen kleine Formen Raumverteidigung, Mitspielen und Kommunikation (Kronenberg, S. 12); Startspieler und Anspieler werden rotiert (u. a. S. 20, 21, 34).
- Konsequenzen für SPIELIQ: Das Flipbook ist die wichtigste DFB-Originalquelle für Spielformen, Feldmaße und Terminologie. Spannungsfeld: Der DFB sieht reines Prinzipien- und Spielausschnittstraining kritisch. SPIELIQ sollte Taktik deshalb als individuelle Entscheidung im Spiel vermitteln (wann, wohin, mit wem) und den Transfer in Platz-Spielformen herstellen. Die Hausaufgabenprogramme zeigen, dass der DFB häusliches Individualtraining befürwortet, bisher motorisch und nicht digital-kognitiv.

### [A-88] „Kinderfußball – Leitfaden für die Implementierung neuer Wettbewerbsformen in den Altersklassen U6–U11 (G- bis E-Jugend)" (DFB-Booklet, Stand 03/2026)
- Organisation/Autor: DFB (Fußzeile „Entwicklung Vereine, Ehrenamt und Spielbetrieb")
- URL: https://assets.dfb.de/uploads/000/339/794/original_Booklet_-_Wettbewerbsformen_im_Kinderfu%C3%9Fball_-_Stand_03-2026.pdf?1791811393 (verlinkt auf A-21)
- Datum (Veröffentlichung/Aktualisierung): 05.03.2026 (Fußzeile und PDF-Metadaten)
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (34 Folien ausgewertet: Maße, Tore, Rotation, Spielzeiten, Bälle, Regeln).
- Kernaussagen (paraphrasiert):
  - Die Regeln (Spielerzahl, Torgröße, Ball, Spielfeld, Organisation, Spielprinzipien) sind seit 2024/25 verbindlich; die genauen Regeln können je Verband, Kreis oder Veranstaltung leicht variieren.
  - G (U6/U7): 2v2 (zwei Feldspieler*innen, höchstens eine Rotationsperson; Tore erst ab der Mittellinie; bis zu sieben Durchgänge à höchstens 5 Minuten) und 3v3 (höchstens zwei Rotationspersonen; Tore nur aus der 6-m-Schusszone; bis zu sieben Durchgänge à höchstens 7 Minuten). Vier Minitore, ohne Torwart; Rotation nach jedem Tor; Eindribbeln oder Einpassen; 3 Minuten Pause; Sieger*innen ein Feld auf, Verlierer*innen ein Feld ab. Maße: 2v2 ca. 16 × 20 m, 3v3 ca. 25 × 20 m; Minitore höchstens 2,0 × 1,2 m, auf der Grundlinie je 2 m von der Seitenlinie eingerückt. Ball Gr. 3, 290 g.
  - F (U8/U9): 3v3 wie G (höchstens 7 × 10 Minuten; ca. 25 × 20 m; 6-m-Zone); 4v4 (höchstens drei Rotationspersonen) und 5v5 (höchstens vier, optional) jeweils auf Kleinfeldtore mit Torwart oder auf vier Minitore ohne Torwart. Tore ab der Mittellinie (ohne Torwart aus der 6-m-Zone); Rotation alle 3 Minuten per zentralem Pfiff; der Torwart wechselt nach jeder Runde; 6 × 10–12 Minuten. Maße 4v4/5v5 ca. 40 × 25 m; Minitore höchstens 2,0 × 1,2 m oder Kleinfeldtore 5,0 × 2,0 m, alternativ höhenreduziert auf 1,65 m. Ball Gr. 3, 290 g. Variante: Bei drei Toren Rückstand darf das zurückliegende Team bis zum Ausgleich eine Person mehr einsetzen.
  - E (U10/U11): 4v4 und 5v5 wie F (ca. 40 × 25 m); 6v6/7v7 (sechs Feldspieler*innen plus Torwart) auf ca. 55 × 35 m mit Kleinfeldtoren; Rotationspersonen spielen auf Nebenfeldern (2v2/3v3); Tore von überall; Einwurf. Mit zwei Mannschaften 4 × 15 oder 2 × 25 Minuten (ein Sieg auf dem Nebenfeld zählt als zusätzliches Tor), mit drei Mannschaften 2 × 15 Minuten; das 7v7 ist auch als Turnierform bzw. Ligaspielbetrieb vorgesehen. Ball Gr. 4, 350 g.
  - Allgemeine Regeln: möglichst mindestens 75 % Spielzeit pro Kind; ab zwei Rotationspersonen pro Team möglichst ein weiteres Feld aufbauen; Rückpassregel bei Spielen mit Torwart; kein Anstoß, kein Einwurf (außer 7v7), kein Abseits, kein Elfmeter; bei Spielfortsetzungen sind Tore nur indirekt möglich; 3 m Abstand bei Spielfortsetzungen; Vergehen in der Schusszone führen zum „Strafangriff"; Champions-League-Modus (bei Unentschieden steigt auf, wer das letzte Tor erzielt hat).
  - Spielprinzipien je Stufe: G „Fußball erleben", F „Fußball erlernen – spielerisch eigene Lösungen finden", E „Fußball verstehen – unterschiedliche Situationen meistern"; allgemein u. a. Coaching und Reize von außen minimieren. Das Spiel auf vier Tore fördere das Verständnis für Raumaufteilung und Spielverlagerung.
  - Fair Play: Spiele ohne Schiedsrichter*in (F und jünger, in der E-Jugend optional per Verbandsbeschluss); Trainer*innen unterstützen aus einer gemeinsamen Coaching-Zone und geben nur die nötigsten Anweisungen.
  - Interne Unstimmigkeiten des Booklets: Zuschauerabstand „mindestens 3 Meter" (Fair-Play-Folie) gegenüber „15 m Abstand" für Eltern (Übersichtsfolien); Torgröße für E-6v6/7v7 auf der Aufbau-Folie „5,0 m x 7,0 m" (vermutlich ein Tippfehler; die Gesamtübersicht nennt Kleinfeldtore mit höchstens 5,0 × 2,0 m); die Übersichtsfolie nennt für E-4v4/5v5 höchstens zwei Rotationspersonen, die Detailfolien drei bzw. vier.
- Konsequenzen für SPIELIQ: Verbindliche DFB-Datenbasis für alle Kinder-Presets (G bis E). Die Begründung, vier Tore förderten Raumaufteilung und Spielverlagerung, passt direkt zum SPIELIQ-Lernziel Raumverständnis. Presets sollten mit Toleranz („ca.") und Hinweis auf regionale Abweichungen versehen werden.

### [A-89] DFB-Journal 3/2026 „Trainingsphilosophie Deutschland" (ePaper)
- Organisation/Autor: DFB; Interview „Konzept und Kompetenz" von Jan Fedra (Fotos Thomas Böcker/DFB); Editorial von DFB-Präsident Bernd Neuendorf
- URL: https://emagazine.dfb.de/de/profiles/af7b30b4f127/editions/5521d9ab3cc1d82e4e44/pages/page/1 (Pressmatrix-ePaper; Seiten liegen als Bilder vor)
- Datum (Veröffentlichung/Aktualisierung): Ausgabe 3/2026, angekündigt am 09.09.2026 (A-19)
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (teilweise): Seiten 3–5 (Editorial, Inhalt), 9–15 (Interview, Fortsetzung des Online-Auszugs A-10), 32–33 (Spielformate D-Jugend), 40–41 (Trainertreppe) und 66–67 (Zahlen) als Seitenbilder gelesen; die übrigen rund 70 Seiten wurden nicht ausgewertet.
- Kernaussagen (paraphrasiert):
  - Neue Wettbewerbsformen ab 2027/28 in U14, U15 und U16 (S. 15): auf Leistungszentrums-Niveau und an verschiedenen Orten. Ziel ist mehr Nettospielzeit. Gespielt wird in Dritteln (3 × 30, teils 3 × 35 Minuten); jedes Drittel ist ein eigenes Spiel (insgesamt bis zu neun Punkte) und beginnt bei 0:0, sodass auch spät Eingewechselte 30–35 Minuten bei offenem Spielstand bekommen. Dazu kommt eine große Tabelle nach Champions-League-Vorbild in der Hinrunde; im Winter können die Gruppen homogener neu zusammengestellt werden. Das Konzept komme aus Vereinen und Verbänden. Wolf: In der C-Jugend soll weiter 11v11 gespielt werden.
  - Paradigmenwechsel (S. 10–11): Früher sei Training von der Taktik aus geplant worden (Beispiel „Einheit zum Verteidigen am Flügel"). Freude, Fitness, Spielwahrnehmung, Kognition, Emotionen und Technik seien aber keine taktischen Prinzipien. Der Wechsel führe zu einem spielerzentrierten Ansatz: Taktische Prinzipien verschwinden nicht, Spieler*innen müssen wissen, was sie wann tun sollen, doch die Taktik ist nicht mehr Ausgangspunkt. Lotzen: Bei den U17-Europameisterinnen war der mannschaftstaktische Input im Verhältnis zu individualtaktischen Hinweisen gering.
  - Mythen (S. 13–14): Weder Rondos noch Taktik sollen abgeschafft werden; ab der F-Jugend können vorhandene Jugendtore mit Torhüter*innen genutzt werden; Ergebnisse spielen eine Rolle; die TPD ist nicht gleichzusetzen mit Funino oder dem Spieltag im Kinderfußball; die Struktur 15-30-15-30 lässt in den 15-Minuten-Phasen Raum für Technikübungen; Anfänger*innen können mit dem 1v1 beginnen.
  - Online-Onboarding für Nachwuchstrainer*innen (S. 10): über den Sommer 2026 entwickelt, vermittelt das Wichtigste in einer Stunde und mündet in ein erstes Zertifikat. Inhalte und Videos seien frei zugänglich und kostenlos (S. 12).
  - Der neue Bundestrainer Jürgen Klopp unterstützt die TPD; Sven Bender aus dem Kompetenzteam arbeitet nun bei der Männer-Nationalmannschaft; Lotzen wechselt nach Bremen (S. 15).
  - D-Jugend-Formate (S. 32–33): „3x3 + Torwart" als Turnierform nach dem Streetball-Prinzip (Sechseck ca. 18 m tief, Dribbellinie 12 m breit, neutrale Zone 5 m tief; ein Kleinfeldtor 5 × 2 m; Spiele à 7–10 Minuten; in gemischten Teams mindestens eine Spielerin und ein Spieler auf dem Feld). „7x7-Zwillingsspiel": zwei D-Teams spielen auf zwei Feldern, sodass 14 Kinder pro Team immer spielen; 6 × 12 Minuten; Großfeldregeln ohne Abseits; auf jeder Hälfte eines Regelspielfelds ein Kleinfeld (Breite von der Mittellinie bis zum 5-m-Raum, Länge über die ganze Spielfeldbreite, Strafraum 11 m, Strafstoßpunkt 8 m); Tore 5 × 2 m, optional 6,20 × 2,10 m.
  - Zahlen (S. 66–67): Grafik „Vorteile der kleinen Spielformen" (Hintergrundschrift „3x3 vs. 7x7") u. a. mit +150 % Ballkontakten, +335 % gegnerüberwindenden Dribblings und +285 % Torschüssen; die Quelle der Vergleichswerte ist auf der Seite nicht angegeben. 7x7-Zwillingsspiel gegenüber 9v9 pro Saison (18er-Kader, 22 Spiele): 1.232 gegenüber 770 Spielminuten pro Spieler. Umfragewerte, u. a. halten 85,3 % der Trainer*innen die TPD für grundsätzlich sinnvoll, 81,8 % hilft die Struktur 15-30-15-30. TPD-Veranstaltungen 2024/2025/2026: 38/58/67 mit 1.710/7.658/9.952 Teilnehmenden.
  - Trainertreppe (S. 40–41): E-Learning TPD (eine Stunde, für alle Trainer*innen, empfohlener Einstieg vor der ersten Arbeit mit Kindern), Kindertrainer*in- und Jugendtrainer*in-Zertifikat (je 20 Lerneinheiten, TPD-basiert), DFB-Junior-Coach und DFB-Basis-Coach (je 40), UEFA-C- und -B-Lizenz (je 120; die B-Lizenz u. a. mit individual-, gruppen- und mannschaftstaktischen Schwerpunkten sowie Spielanalyse und Spielcoaching).
- Konsequenzen für SPIELIQ: Die ab 2027/28 geplanten Drittel-Formate in U14 bis U16 betreffen die Zielgruppe direkt; Match-Presets sollten den Modus „3 × 30/35 Minuten, Neustart bei 0:0" anbieten. Der spielerzentrierte DFB-Ansatz verlangt, Taktik aus der Perspektive der einzelnen Spieler*in zu vermitteln („was wann tun"). Für die D-Jugend ist das Feld des 7x7-Zwillingsspiels eine DFB-Variante neben dem 9v9.

### [A-90] Amtsantritt von Hannes Wolf (zwei DFB-News vom 21.08.2023)
- Organisation/Autor: DFB (Kürzel „jf" bzw. „dfb")
- URL: https://www.dfb.de/news/detail/hannes-wolf-neuer-direktor-nachwuchs-training-und-entwicklung-254167 ; https://www.dfb.de/news/detail/wolf-freude-intensitaet-und-wiederholung-254250
- Datum (Veröffentlichung/Aktualisierung): 21.08.2023
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026.
- Kernaussagen (paraphrasiert): Der Aufsichtsrat der DFB GmbH & Co. KG berief Hannes Wolf auf den neu geschaffenen Posten des Direktors Nachwuchs, Training und Entwicklung (inklusive weiblichem Nachwuchs); die U20 behält er. Zum Kompetenzteam gehören zehn weitere Expert*innen (Balitsch, Lars und Sven Bender, Di Salvo, Gerland, Loderer, Lotzen, Ludwig, Stredak, Wagner), die eine in den Vormonaten begonnene Arbeit fortführen. Wolf nannte bei der Vorstellung bereits Freude, Intensität und Wiederholung als entscheidend für gutes Training; jede Trainingsminute diene der individuellen Qualität.
- Konsequenzen für SPIELIQ: Datiert den Start der TPD-Kommunikation auf August 2023.

### [A-91] Vorstellung der TPD: „PK mit Kompetenzteam um Hannes Wolf" und „Wolf: Wir wollen auf die Überholspur" (DFB-News)
- Organisation/Autor: DFB
- URL: https://www.dfb.de/news/detail/pk-mit-kompetenzteam-um-hannes-wolf-255274 ; https://www.dfb.de/news/detail/wolf-wir-wollen-auf-die-ueberholspur-255303
- Datum (Veröffentlichung/Aktualisierung): 27.09.2023
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026.
- Kernaussagen (paraphrasiert):
  - Pressekonferenz am DFB-Campus am 27.09.2023 (11 Uhr, live auf YouTube) zur „Trainingsphilosophie Deutschland". Kern ist die „beste Trainingseinheit"; Ziel ist eine möglichst hohe Nettospielzeit pro Woche für alle Kinder und Jugendlichen.
  - Wolf: Man starte eine Bildungsoffensive und habe zuvor „an der Realität vorbeitrainiert"; auf große Tore werde weiter gespielt; die Wissenschaft stütze die Erkenntnisse, man argumentiere aber lieber aus der Praxis; die Videos seien eine vierteilige Fortbildungsreihe.
  - Di Salvo: Je nach Regeln gehe es in den Spielformen hoch taktisch zu, ohne dass man die Taktik groß erklären müsse.
  - Balitsch: Jedes Kind könne in seinem Tempo wachsen; man stelle alles auf den Prüfstand; Trainer*innen sollen schnell neue Bälle ins Spiel bringen und zum gemeinsamen Angreifen und Verteidigen animieren.
- Konsequenzen für SPIELIQ: Datiert die öffentliche Vorstellung der TPD auf den 27.09.2023. Di Salvos Aussage stützt das SPIELIQ-Prinzip „Lernen über Regeln und Rahmenbedingungen" statt Taktikvortrag.

### [A-92] „Hannes Wolf: Wir haben die Basics aus den Augen verloren" (DFB-News)
- Organisation/Autor: DFB
- URL: https://www.dfb.de/news/detail/hannes-wolf-wir-haben-die-basics-aus-den-augen-verloren-254384
- Datum (Veröffentlichung/Aktualisierung): 27.08.2023
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Abschnitt zu den Grundproblemen ausgewertet).
- Kernaussagen (paraphrasiert): Wolf nennt zwei Grundprobleme: Viele hören zwischen E- und A-Jugend auf, und in der Spitze fehlen Spieler (wenige Einsatzminuten im U21-Pool). Mit den verfügbaren Gegner-Videos habe man den Jugendfußball „taktisiert"; für Taktik und Gegnerorientierung seien einzelne Spielerpositionen vernachlässigt worden. Zudem seien Belastungssteuerungsregeln der Profis unpassend auf Jugendliche übertragen worden. Man sei schlechter geworden, weil der Blick von der individuellen Klasse zu Teamprozessen gewandert sei.
- Konsequenzen für SPIELIQ: Wichtiges Spannungsfeld: Ein Tool für Taktikverständnis kann als Beitrag zur „Taktisierung" gelesen werden. SPIELIQ sollte individuelle Entscheidungen und Spielfreude in den Vordergrund stellen und keine Gegneranalyse für Jugendteams anbieten.

### [A-93] „Coachin' U mit Wolf: Wollen eine konkrete Anleitung geben" (DFB-Blog)
- Organisation/Autor: DFB (Blog „Coachin' U"; Text von Hannes Wolf als U20-Trainer)
- URL: https://www.dfb.de/news/detail/coachin-u-mit-wolf-wollen-eine-konkrete-anleitung-geben-247859
- Datum (Veröffentlichung/Aktualisierung): 23.01.2023
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026.
- Kernaussagen (paraphrasiert):
  - Vorläufer der TPD: das Video „Eine Anleitung für Spielformen im Kinder- und Jugendtraining" (vgl. A-02). Basis der Einheiten sind 4v4-Varianten, als Zwischenform dient das 2v2 in acht Sekunden; Empfehlung ab der E-Jugend zweimal pro Woche, für Jüngere 3v3-Varianten.
  - Höchste Relevanz haben die individuellen Spielzeiten: sechs- bis achtmal je vier Minuten (je zwei Minuten Pause) pro Training, möglich nur auf mehreren Feldern.
  - Aufgaben der Trainer*innen: Spielregeln einführen und kontrollieren; das Ergebnis zählen; Energie geben; den Spielfluss fördern (keine ständigen Unterbrechungen); schnelles Umschalten einfordern; sinnvolle Raumaufteilungen erarbeiten; Verhalten positiv verstärken und bei Dysfunktionalität korrigieren; auf noch nicht erkannte Lösungen hinweisen.
  - In Übungsphasen nicht zu sehr auf kurze Pässe setzen, weil diese in Spielformen ausreichend vorkämen und im Vergleich zu Dribbeln, Schießen und Flanken leicht zu lernen seien.
- Konsequenzen für SPIELIQ: Die Liste der Traineraufgaben ist die konkreteste gefundene DFB-Beschreibung der Trainerrolle. Sie lässt sich auf die Feedback-Logik übertragen: positiv verstärken, Dysfunktionales korrigieren, auf unentdeckte Lösungen hinweisen.

### [A-94] „Bundesjugendtag verabschiedet Maßnahmenkatalog für Jugendfußball der Zukunft" (DFB-News)
- Organisation/Autor: DFB (Kürzel „tb")
- URL: https://www.dfb.de/news/dfb-bundesjugendtag-verabschiedet-massnahmenkatalog-fuer-den-jugendfussball-der-zukunft
- Datum (Veröffentlichung/Aktualisierung): 20.09.2025
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026; der verlinkte Maßnahmenkatalog (Blätterfunktion auf misc.fussballtraining.com) war nicht erreichbar.
- Kernaussagen (paraphrasiert): Unter dem Motto „Kicken mit Spielfreude – Wachsen im Team" verbindet die „Toolbox" strategische Leitlinien mit Umsetzungsideen; sie dient als Grundlage für Pilotprojekte der Landesverbände. Erste Modellregionen testen neue Ligeneinteilungen, Spielformate und Trainingskonzepte; bei Erfolg können Formate in die DFB-Jugendordnung übernommen werden. Vizepräsident Hermann Winkler nennt flexible Angebote, mehr Mädchenfußball und digitale Lösungen als Themen. Der Jugendausschuss-Vorsitzende Holger Bellinghoff betont, es sei kein Konzept für eine Wettbewerbsreform, sondern ein ganzheitlicher Ansatz.
- Konsequenzen für SPIELIQ: Formate für die D- bis A-Jugend befinden sich in Pilotphasen und sind regional unterschiedlich; Presets müssen aktualisierbar sein. „Digitale Lösungen" sind ein erklärtes DFB-Thema, allerdings ohne Konkretisierung für das Lernen von Spieler*innen.

### [A-95] Erster DFB-Jugendfußball-Kongress (DFB-News und FAQ)
- Organisation/Autor: DFB (Kürzel „tb")
- URL: https://www.dfb.de/news/dfb-richtet-erstmals-jugendfussball-kongress-aus ; https://www.dfb.de/news/faq-alle-infos-zum-jugendfussball-kongress-2025
- Datum (Veröffentlichung/Aktualisierung): 27.02.2025 und 29.03.2025
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026.
- Kernaussagen (paraphrasiert): Kongress am 28. und 29.03.2025 auf dem DFB-Campus mit rund 220 Teilnehmenden, davon knapp 180 aus den 21 Landesverbänden und überwiegend 18 bis 23 Jahre alt; Schwerpunkte Identität, Spielbetrieb und Freizeitfußball. Die Ergebnisse sollten als Handlungsempfehlungen in den Bundesjugendtag 2025 und anschließend in Pilotprojekte münden; der Auftrag stammt vom Bundesjugendtag 2022. Von der D- bis zur A-Jugend verzeichne der Fußball die höchste Dropout-Quote. Kurzfristige Änderungen der Spielformate schließt der DFB ausdrücklich aus; zunächst folgt eine mehrjährige Pilotphase.
- Konsequenzen für SPIELIQ: Bestätigt die Angaben aus A-12 über eine DFB-Quelle. Der hohe Dropout ab der D-Jugend ist ein Argument für motivierende, spielnahe Formate in der Zielgruppe.

### [A-96] „DFB investiert in Coachbetter: Gemeinsam für digitale Zukunft des Amateurfußballs" (DFB-News)
- Organisation/Autor: DFB
- URL: https://www.dfb.de/news/dfb-investiert-in-coachbetter-gemeinsam-fuer-digitale-zukunft-des-amateurfussballs
- Datum (Veröffentlichung/Aktualisierung): 01.06.2026
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026.
- Kernaussagen (paraphrasiert): Der DFB wird strategischer Gesellschafter von Coachbetter, einer Plattform für Vereins- und Teammanagement. Coachbetter gehört zum „DFB-Innovationsportfolio"; gemeinsames Vorhaben ist das „Digitale Vereinsheim" zur Vereinsverwaltung. Ziel sind neue digitale Angebote für den Amateurfußball.
- Konsequenzen für SPIELIQ: Der DFB baut ein eigenes digitales Ökosystem mit Beteiligungen auf. Für SPIELIQ ist das Wettbewerbs- und Partnerumfeld (z. B. Schnittstellen zu Team-Apps); Markenrecht beachten.

### [A-97] „Kopfballspiel: Alle Infos auf einen Blick" (DFB-Seite)
- Organisation/Autor: DFB
- URL: https://www.dfb.de/content/kopfballspiel (die ältere Adresse https://www.dfb.de/neue-spielformen-im-kinderfussball/kopfballspiel/ wurde nicht geprüft)
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026.
- Kernaussagen (paraphrasiert): Der DFB setzt auf Empfehlungen statt Verbote: Kopfballtraining langsam aufbauen, bei Jüngeren den Ball mit der Hand anwerfen, kein Schwerpunkttraining mit vielen Wiederholungen. Ballgrößen: im Kinderfußball (Bambini, F, E) Ultralight-Ball Gr. 3, 290 g; E und D im Wettkampf Gr. 4, 350 g; ab der C-Jugend normale Bälle Gr. 5, im Kopfballtraining Lightbälle; bei A und B geringerer Balldruck im Kopfballtraining. Beispiel: Ein 2v2 auf 16 × 20 m mit vier Minitoren biete praktisch keine Kopfballgelegenheit. Hinweise zum Erkennen von Gehirnerschütterungen.
- Konsequenzen für SPIELIQ: Ballgrößen je Altersklasse als Preset-Metadaten führen (C: Gr. 5). Kopfball-Szenarien für Kinder nicht in den Vordergrund stellen. Die Seite ist bei der E-Jugend uneinheitlich (Gr. 3 im Kinderfußball, Gr. 4 im E/D-Wettkampf); das Booklet A-88 nennt für E Gr. 4.

### [A-98] DFB-Trainingsblätter 2005–2016 aus „Training & Wissen online" bzw. „Mein Fußball" (im ersten Durchgang ohne erfassten Inhalt)
- Organisation/Autor: DFB; Autoren je Blatt
- URL: https://www.dfb.de/fileadmin/_dfbdam/11343-276-dc-ha2-01.pdf ; https://dfb.de/fileadmin/_dfbdam/61761-362-c-ha2-01.pdf ; https://www.dfb.de/fileadmin/_dfbdam/122116-400-a-st1-01.pdf (auch unter training-service.fussball.de, dort heute Weiterleitung) ; https://www.dfb.de/fileadmin/_dfbdam/11589-240-dc-ha2-01.pdf ; https://www.dfb.de/fileadmin/_dfbdam/11307-269-dc-ha2-01.pdf ; https://www.dfb.de/fileadmin/_dfbdam/11504-223-dc-ha2-01.pdf ; https://www.dfb.de/fileadmin/_dfbdam/23887-095_ba_au2_01.pdf
- Datum (Veröffentlichung/Aktualisierung): 15.02.2005 bis 01.11.2016 (Datum je Blatt)
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (alle sieben Blätter).
- Kernaussagen (paraphrasiert):
  - „Banktreffer II" (D/C-Junioren, Steffen Freund, 31.01.2012): Der Passempfänger soll vor der Ballkontrolle über die eigene Schulter blicken und den Ball in möglichst offener Stellung annehmen.
  - „Spielaufbau im 6 gegen 5" (C-Junioren, Mario Vossen, 19.05.2015; Kopfzeile „MEIN FUSSBALL"): Außenspieler möglichst breit aufstellen; werden sie zugestellt, durch das Zentrum eröffnen; bei jedem tiefen Ball eine Unterstützung für einen möglichen Rückpass bereitstellen; den Torhüter in den Spielaufbau einbinden.
  - „Kurzpasskombination mit Torabschluss im 7 gegen 5" (A-Junioren, Christian Wück, 01.11.2016; Feld 50 × 50 m, 6 m tiefe Schusszone, mit Abseits): Die zentralen Stürmer sollen sich immer wieder zum Zuspiel anbieten und aktiv entgegenstarten; die Außenspieler halten die Breite.
  - Weitere Blätter: „Dribbelparcours II" (D/C, Ralf Minge, 2010; Körper zwischen Ball und Gegner), „Nachsetzender Gegenspieler II" (D/C, Frank Engel, 2011), „Einwurf-Zuspiele II" (D/C, Horst Hrubesch, 2010), „Zweikämpfe mit Anspieler" (B/A, Ralf Peter, 2005).
- Konsequenzen für SPIELIQ: DFB-Belege für Schulterblick, offene Stellung, Anbieten, Zustellen, Breite halten und Unterstützung beim Rückpass. Sie stammen allerdings aus älteren Trainingsblättern, nicht aus der TPD.

### [A-99] Beschlussvorschlag „Projekt Zukunft – männlich" (DFB-Bundestag 2019)
- Organisation/Autor: DFB-Präsidium (Antragsteller); Projekt der Direktion Nationalmannschaften und Akademie gemeinsam mit der DFL
- URL: https://www.dfb.de/fileadmin/_dfbdam/210191-Final_-_Beschlussvorlage_I_-_Projekt_Zukunft_-_m%C3%A4nnlich.pdf
- Datum (Veröffentlichung/Aktualisierung): PDF-Metadaten 24.09.2019
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (drei Seiten).
- Kernaussagen (paraphrasiert): Ziel ist, den deutschen Männerfußball dauerhaft an der Weltspitze zu etablieren; Befund u. a.: weniger junge deutsche Spieler schaffen den Sprung in die Bundesliga-Mannschaften. Neben guter mannschaftstaktischer Ausbildung sollen wieder mehr Individualität, Kreativität, Dynamik und „Bolzplatz"-Fähigkeiten gefördert werden; im Vordergrund stehe die Entwicklung der Spieler, nicht der Mannschaftserfolg. Der Spielbetrieb solle umgestaltet werden (Beispiel: andere Spielformen wie Funino); die Trainerausbildung solle individueller werden (u. a. Kindertrainerlizenz).
- Konsequenzen für SPIELIQ: Vorgeschichte der Reformen: Der DFB-Kurs „Individualität vor Mannschaftstaktik" ist seit 2019 beschlossen, nicht erst mit der TPD.

### [A-100] „Schule des Kleinfeldfußballs" (DFB-Seite)
- Organisation/Autor: DFB
- URL: https://www.dfb.de/schule-des-kleinfeldfussballs
- Datum (Veröffentlichung/Aktualisierung): Änderungsdatum laut DFB-Sitemap 02.03.2026 (eigene Ableitung)
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026.
- Kernaussagen (paraphrasiert): Das Konzept wurde aus der TPD für Schulen entwickelt: 3v3 auf mehreren Kleinfeldern, auch für Handball, Basketball oder Hockey, begleitet von Spielfeldbegleiter*innen (Lehrkräfte, Freiwillige oder Schüler*innen). Wolf: Im 3v3 sind Fähigkeiten in allen Spielphasen gefordert (Offensive, Defensive, Umschaltspiel); der Fokus der Begleitung liege auf Wertevermittlung; Kinder sollen mehr spielen, Erwachsene weniger reden.
- Konsequenzen für SPIELIQ: Schulen sind ein DFB-Schwerpunkt; ein Schulmodul von SPIELIQ müsste Bewegungszeit ergänzen, nicht ersetzen. Die Phasen-Trias Offensive, Defensive, Umschalten ist DFB-Sprachgebrauch.

### [A-101] MEIN FUSSBALL: Struktur laut FUSSBALL.DE-Navigation und Weiterleitungen von training-service.fussball.de (technische Prüfung)
- Organisation/Autor: DFB bzw. FUSSBALL.DE (Navigationslinks); eigene Prüfung der HTTP-Weiterleitungen
- URL: https://www.fussball.de/newsdetail/fortbildungen-zur-trainingsphilosophie-deutschland/-/article-id/10062020 (Artikel vom 08.09.2026 mit Hauptnavigation) ; https://training-service.fussball.de/ (HTTP 301 auf https://www.meinfussball.de/)
- Datum (Veröffentlichung/Aktualisierung): Artikel 08.09.2026; Prüfung der Navigation und Weiterleitungen 29.10.2026
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (FUSSBALL.DE-Artikel und Navigationslinks); Weiterleitungen per HTTP-HEAD geprüft; www.meinfussball.de selbst war gesperrt.
- Kernaussagen (paraphrasiert):
  - training-service.fussball.de ist in MEIN FUSSBALL aufgegangen: Alle geprüften Pfade leiten per HTTP 301 auf www.meinfussball.de um. Die Trainer-Bereiche (auch C- und D-Junioren) führen auf die TPD-Startseite, der Spieler-Bereich auf „Eigentraining im Fußball", der Lehrer-Bereich auf „schule/lehrerinnen". Auch eine erfundene Artikel-URL landet auf der TPD-Startseite; einzelne alte Artikel sind also nicht mehr adressierbar. meinfussball.dfb.de leitet auf www.dfb.de/mehr-fussball um.
  - Die FUSSBALL.DE-Hauptnavigation führt den Punkt „MEIN FUSSBALL" mit Bereichen für Trainer/in (training-spiel: TPD, Kinderfußball Bambini sowie F/E, Jugendfußball D/C und B/A, Erwachsene), Spieler/in (talente: „Eigentraining im Fußball", für U12 bis U15 „DFB-Talentförderprogramm"), Lehrer/in (schule), Schiedsrichter/in (schiris) und Vereinsmitarbeiter/in (verein: Club-Beratung, Praxishilfen, Engagementförderung).
  - Der FUSSBALL.DE-Artikel nennt TPD-Fortbildungstermine (u. a. 14.11., 05.12. und 19.12.2026 für Stützpunkttrainer*innen am DFB-Campus; 27.11.2026 für Lehrkräfte in Andernach) und die Vermittlung der TPD an Lehrkräfte als DFB-Ziel für 2026.
- Konsequenzen für SPIELIQ: Korrektur zum ersten Durchgang: MEIN FUSSBALL hat einen eigenen Spieler*innen-Bereich („Eigentraining"), dessen Inhalte ungeprüft sind. Er ist der wahrscheinlichste direkte Berührungspunkt mit SPIELIQ (Wettbewerb oder Kooperation) und sollte als Erstes im Original geprüft werden.

### [A-102] „Trainer*in – C-Junior*in" (Rest der früheren Training-und-Service-Struktur auf dfb.de)
- Organisation/Autor: DFB
- URL: https://www.dfb.de/training-service/trainerin/c-juniorin
- Datum (Veröffentlichung/Aktualisierung): Änderungsdatum laut DFB-Sitemap 23.07.2024 (eigene Ableitung)
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Platzhalterseite mit Kurztext und dem Vermerk, ein Link fehle noch).
- Kernaussagen (paraphrasiert): Im C-Junioren-Alter wird erstmals 11 gegen 11 auf dem Großfeld gespielt; die Pubertät verlangt von Trainer*innen viel Fingerspitzengefühl.
- Konsequenzen für SPIELIQ: DFB-Beleg für das 11v11-Format der Zielgruppe. Pubertätsbedingte Unterschiede (vgl. biologisches Alter in A-87) bei Feedback und Vergleichen berücksichtigen.

**Block 10 – Positionen und Rollen (Ergänzungsrecherche 30.10.2026)**

Gefunden über die DFB-News-Sitemap (Titel und Datum je Meldung), über Links in abgerufenen Seiten und über einzelne Websuchen; alle Einträge im Original gelesen. Synthese dazu: Register B, Abschnitt S8.

### [A-103] „Coachin' U": Di Salvo übers Stürmertraining und „Erkenntnisse aus der WM in Katar" (DFB-Blog)
- Organisation/Autor: DFB (Blog „Coachin' U"; Texte von U21-Cheftrainer Antonio Di Salvo; Kürzel „dfb")
- URL: https://www.dfb.de/news/detail/coachin-u-di-salvo-uebers-stuermertraining-248349 ; https://www.dfb.de/news/detail/coachin-u-mit-di-salvo-erkenntnisse-aus-der-wm-in-katar-248352
- Datum (Veröffentlichung/Aktualisierung): 15.02.2023 bzw. 20.02.2023 (Seitenkopf)
- Zugriff / Verifikationsstatus: Volltext abgerufen 30.10.2026 (beide Beiträge vollständig).
- Kernaussagen (paraphrasiert):
  - Die U-Nationaltrainer entwickeln seit mehr als drei Jahren „positionsspezifische Programme", weil der Ruf nach Positionsspezialisten lauter werde. Das Stürmerkonzept begannen Stefan Kuntz und Di Salvo Ende 2019.
  - Laut einer eigenen Auswertung der vergangenen zehn Jahre fallen etwa 75–85 % aller Tore zwischen Fünfmeterraum und Strafraumgrenze („Golden Zone"), rund die Hälfte per Direktabnahme; bei der WM 2022 fielen laut Di Salvo 94 % der Tore im Strafraum und etwa 78 % in dieser Zone. Die Methode wird nicht beschrieben.
  - Drei Stürmerprofile: klassischer Mittelstürmer, „falsche 9", Außenstürmer. Die Anforderungen, vor allem die Abschlusstechniken, seien bis auf wenige Unterschiede gleich. Der Stürmer stehe stärker als andere Positionen unter Gegnerdruck und habe in engen Räumen sehr wenig Zeit.
  - Methodik: erst isolierte Übungen mit vielen Wiederholungen, dann kleine und große Spielformen mit Gegnerdruck. Schwerpunkte: Abschluss in der Golden Zone, Start aus dem Rücken des Innenverteidigers, Querläufe in Abschlusssituationen, Kreuzen mit und ohne Ball; als Nächstes Zweikämpfe mit dem Rücken zum Tor und Kopfball.
  - WM-Beobachtung: Einzelne Spieler stellten sich in den Dienst der Mannschaft; Dembélé habe viele Defensivaufgaben übernommen, damit Mbappé Kraft für die Offensive hatte.
- Konsequenzen für SPIELIQ: Positionsspezifik ist beim DFB vor allem ein Thema der Leistungsspitze und überwiegend technisch (Abschluss). Übertragbar sind die Timing- und Laufentscheidungen ohne Ball (Start in den Rücken des Verteidigers, Querlauf, Kreuzen). Wie viel ein einzelner Angreifer verteidigt, erscheint hier als Rollenverteilung im Team (c) [Eigene Ableitung].

### [A-104] Arne Janssen: „Routenplaner roter Faden in der Ausbildung" (DFB-Interview)
- Organisation/Autor: DFB (Interview mit Arne Janssen, Trainer*innen-Entwickler der weiblichen U-Nationalmannschaften)
- URL: https://www.dfb.de/news/detail/arne-janssen-routenplaner-roter-faden-in-der-ausbildung-247742
- Datum (Veröffentlichung/Aktualisierung): 16.01.2023 (Seitenkopf)
- Zugriff / Verifikationsstatus: Volltext abgerufen 30.10.2026.
- Kernaussagen (paraphrasiert):
  - Mit der U16 der Juniorinnen werde meist in kleinen Gruppen und sehr positionsspezifisch gearbeitet; im Vordergrund stünden technische Basics sowie individual- und gruppentaktische Inhalte. Bei der U17 gehe es stärker um Mannschaftsabstimmung, Spieleröffnung und Pressing im Teamverbund; die individuelle Positionierung bleibe eine Basiskompetenz.
  - Ein „Routenplaner" soll als roter Faden von der U15 bis zur U20 aufeinander aufbauende Schwerpunkte setzen. Inhalte des Routenplaners nennt das Interview nicht.
  - Nachwuchs-Nationaltrainer*innen sollen nicht nur mannschaftstaktisch, sondern auch altersspezifisch trainieren; die langfristige Entwicklung stehe vor dem Ergebnis.
- Konsequenzen für SPIELIQ: Hinweis auf eine Reihenfolge im DFB-Elitebereich: positionsspezifische Kleingruppenarbeit (U16) vor Mannschaftsabstimmung und Pressing im Verbund (U17). Für Amateur-C-Junior*innen nur ein Anhaltspunkt [Eigene Ableitung]. Den Routenplaner im Original suchen (offen).

### [A-105] Christian Wück zur U17-EM 2023: „Coachin' U" und Interview „Paradebeispiel für die Ausbildung in Deutschland" (DFB)
- Organisation/Autor: DFB (Blogtext von U17-Cheftrainer Christian Wück; Interview mit Kürzel „of")
- URL: https://www.dfb.de/news/detail/coachin-u-christian-wueck-ueber-die-u-17-em-252339 ; https://www.dfb.de/news/detail/wueck-paradebeispiel-fuer-die-ausbildung-in-deutschland-252118
- Datum (Veröffentlichung/Aktualisierung): 11.06.2023 bzw. 04.06.2023 (Seitenkopf)
- Zugriff / Verifikationsstatus: Volltext abgerufen 30.10.2026.
- Kernaussagen (paraphrasiert):
  - Haupt-Leitlinien der Turniervorbereitung seien die Zuordnung mit und ohne Ball, die Positionierung im Rücken des Gegenspielers und die Kommunikation gewesen; sie hätten mehr im Mittelpunkt gestanden als taktische Übungen.
  - Ein Spieler (Finn Jeltsch) sei über alle sechs EM-Spiele eine Stütze in der Innenverteidigung gewesen, obwohl er im Verein nicht auf dieser Position spielte.
  - Zwischen U15 und U17 dürfe es nicht ums Gewinnen gehen, sondern um Ausbildung und Entwicklung; der Jahrgang habe vor der EM kaum zwei Spiele in Folge gewonnen.
- Konsequenzen für SPIELIQ: Die positionsübergreifenden Leitlinien (Zuordnung, Positionierung im Rücken des Gegners, Kommunikation) passen zu den SPIELIQ-Grundprinzipien (a). Das Beispiel eines Positionswechsels ist ein Einzelfall aus dem Elitebereich [Eigene Ableitung].

### [A-106] DFB-Trainingseinheiten 2020 für A-, B- und C-Junior*innen (Vorlagen „DFB.DE/MEIN-FUSSBALL", Dateiserie 485)
- Organisation/Autor: DFB (ohne Autorenangabe; Kopfzeile „DFB.DE/MEIN-FUSSBALL")
- URL: https://www.dfb.de/fileadmin/_dfbdam/219115-485-b-te.pdf ; https://www.dfb.de/fileadmin/_dfbdam/219121-485-c-te.pdf ; https://www.dfb.de/fileadmin/_dfbdam/219109-485-a-te.pdf (die B-Datei ist auch unter training-service.fussball.de verlinkt; diese Domain leitet heute auf meinfussball.de um)
- Datum (Veröffentlichung/Aktualisierung): PDF-Metadaten 17.02.2020
- Zugriff / Verifikationsstatus: Volltext abgerufen 30.10.2026 (je fünf Seiten). B-Datei per Websuche gefunden, A-Datei über benachbarte Dateinummern derselben Serie; eine D-Datei wurde dabei nicht gefunden.
- Kernaussagen (paraphrasiert):
  - B-Junior*innen, „Den Gegner schon beim Spielaufbau lenken": Im Hauptteil 1 stellt das verteidigende Team einen Mittel- und zwei Außenstürmer; der Mittelstürmer läuft so an, dass der Ballbesitzer nach außen spielen muss, dann setzen alle den Empfänger sofort unter Druck. Im Hauptteil 2 laufen zwei zentrale Stürmer so an, dass nach innen gespielt werden muss; sie stehen so, dass der Torhüter nur einen Innenverteidiger anspielen kann, und verhindern nach dem Pass ins Zentrum den Rückpass. Schon im Aufwärmen sollen Verteidiger auch in Unterzahl mit höchstem Tempo anlaufen.
  - C-Junior*innen, „Torchancen gezielt herausspielen" (8 gegen 6 mit Konter): Feste Flügelstürmer betonen Aktionen auf den Außenpositionen; erst eigene Lösungen suchen lassen, später Hilfen wie Hinterlaufen vorschlagen; nach einer Weile neue Angreifer bestimmen, damit möglichst viele Spieler die taktischen Aufgaben lösen. Mit zwei Zentrumsstürmern sollen diese gestaffelt agieren, und Spieler aus dem zentralen Mittelfeld rücken in die Spitze nach.
  - A-Junior*innen, „Ballorientiertes Verteidigen": gemeinsam Druck auf den Ballbesitzer, den Pass ins Zentrum antizipieren und den Passweg zustellen; im 1v2 und 2v2 den Ballbesitzer je nach Spielsituation nach außen oder zum Mitspieler lenken, indem die entsprechende Seite angeboten wird; Absicherung von Mitspieler und Raum, Übergeben und Übernehmen; Nahtstellen durch geringen Abstand schließen, im Kollektiv zur Ballseite verschieben; Verteidiger regelmäßig wechseln.
- Konsequenzen für SPIELIQ: DFB-Beleg, dass Stürmer die erste Pressinglinie bilden und je nach Plan nach außen oder nach innen lenken (Richtung = Kontextvorgabe c), und dass „zum Mitspieler lenken" als situative Option gelehrt wird. Rollentausch (neue Angreifer, Verteidiger wechseln) gehört zur Übungsorganisation. Die Blätter stammen aus der Zeit vor der TPD [Eigene Ableitung].

### [A-107] „So geht positionsspezifisches Training" (FUSSBALL.DE, Rubrik Trainingstipps)
- Organisation/Autor: FUSSBALL.DE (Autor laut Seite „FUSSBALL.DE"; Hinweis auf das Serviceportal „Training und Service" von DFB.de und FUSSBALL.DE)
- URL: https://www.fussball.de/newsdetail/so-geht-positionsspezifisches-training/-/article-id/201244
- Datum (Veröffentlichung/Aktualisierung): 16.04.2019 (Seitenkopf)
- Zugriff / Verifikationsstatus: Volltext abgerufen 30.10.2026 (Übersichtsartikel). Die verlinkten Einheiten von „Training online" liegen auf training-service.fussball.de und leiten auf das gesperrte meinfussball.de um; sie wurden nicht geprüft.
- Kernaussagen (paraphrasiert):
  - An verschiedene Positionen gebe es verschiedene Anforderungen, die Trainer*innen im Saisonverlauf trainieren sollen; je nach Alter reichen die Aufgaben von einfachen Hinweisen bis zu komplexen Spielsituationen.
  - Wochenauswahl nach Altersklassen: Ü20 Stürmerverhalten mit Gegner im Rücken; A-Junioren zentraler offensiver Mittelfeldspieler; B-Junioren Verteidigen von Flanken; C-Junioren Abwehrarbeit in wechselnden Überzahlsituationen; F-Junioren zwischen Ball und eigenem Tor bleiben und aus dem Zentrum abdrängen.
- Konsequenzen für SPIELIQ: Im früheren DFB-Trainingsportal wurde Positionsspezifik nach Alter dosiert; für die C-Jugend war das Thema in dieser Auswahl positionsübergreifendes Abwehrverhalten. Älterer Beleg aus der Zeit vor der TPD.

### [A-108] Stimmen aus der A-Nationalmannschaft zu Rollen und gemeinsamem Verteidigen (Klopp 2026; Raum und Baku 2025)
- Organisation/Autor: DFB (Stimmensammlung nach dem Länderspiel bzw. Interview im Teamquartier; Kürzel „dfb")
- URL: https://www.dfb.de/news/klopp-das-gegenpressing-ging-durch-die-decke ; https://www.dfb.de/news/als-aussenverteidiger-muss-man-einiges-im-repertoire-haben
- Datum (Veröffentlichung/Aktualisierung): 01.10.2026 bzw. 11.11.2025 (Seitenkopf)
- Zugriff / Verifikationsstatus: Volltext abgerufen 30.10.2026.
- Kernaussagen (paraphrasiert):
  - Bundestrainer Jürgen Klopp nach dem 2:0 gegen Serbien: In den Pressingmomenten seien alle da gewesen, die letzte Linie habe gut nach vorn verteidigt, der Mittelstürmer habe sich dafür verausgabt. Wenn alle gemeinsam den Ball zurückerobern, könne sich das Team im Ballbesitz Risiko leisten.
  - David Raum: Über die Außenverteidiger laufe viel Spielaufbau, sie hätten wichtige 1v1-Duelle; man habe gemeinsam verteidigt, oberste Priorität sei das eigene Tor. Im Nationalteam stehe er im Ballbesitz zentraler als im Verein. Ridle Baku: Außenverteidiger müssen angreifen, verteidigen und flanken können.
- Konsequenzen für SPIELIQ: Zeigt die Haltung „alle verteidigen" im Spitzenfußball, ist aber Spieler- und Trainersprache aus dem Profibereich, keine Ausbildungsvorgabe. Namen und Aussagen realer Spieler nicht in SPIELIQ-Inhalte übernehmen [Eigene Ableitung].

### Weitere Treffer ohne verwertbaren Inhalt (erster Durchgang nur Titel/URL; Stand nach Volltextprüfung 29.10.2026)
- https://www.dfb.de/sportliches-leitbild/unsere-ziele/ – „Unsere Ziele": Abruf 29.10.2026 ergab HTTP 301 auf die TPD-Seite (A-01); kein eigener Inhalt mehr.
- https://www.dfb.de/sportliches-leitbild/dfb-tugenden-20/ – „DFB-Tugenden 2.0": Abruf 29.10.2026 ergab HTTP 301 auf die TPD-Seite; kein eigener Inhalt mehr (vgl. A-65).
- https://www.dfb.de/neue-spielformen-im-kinderfussball/kopfballspiel/ und https://www.dfb.de/content/kopfballspiel – jetzt ausgewertet als A-97 (geprüft wurde die Adresse content/kopfballspiel).
- https://fussballtraining.com/artikel/ft-10-23-trainingsphilosophie-deutschland – Fachartikel zur TPD (Ausgabe 10/2023 laut URL); Domain am 29.10.2026 gesperrt, nicht geprüft
- https://fussballtraining.com/artikel/das-kabinengespraech-mit-hannes-wolf-dfb – Interview mit Wolf; Domain gesperrt, nicht geprüft
- https://fussballtraining.com/artikel/ft-junior-1-2021-alle-infos-zur-wettspielreform – Wettspielreform (Ausgabe 1/2021 laut URL); Domain gesperrt, nicht geprüft
- https://www.dfb.de/news/nagelsmann-wolf-und-co-darum-bringt-uns-die-trainingsphilosophie-deutschland-voran – abgerufen 29.10.2026: Video-Meldung vom 13.05.2025 (TPD-Highlightvideo mit Nagelsmann, Gerland, Wagner u. a.; Leitsatz laut Teaser: Fußball spielen heiße nicht Fußball rennen); kein weiterer Text.
- https://www.dfb.de/news/detail/wolf-wir-wollen-auf-die-ueberholspur-255303 – jetzt ausgewertet als A-91.
- https://www.dfb.de/news/erster-trainerkongress-inklusionsfussball-gemeinsame-freude-am-fussballspiel – abgerufen 29.10.2026 (Meldung vom 10.02.2026): bestätigt, dass Wolf die TPD beim ersten Trainerkongress Inklusionsfußball vorstellte; die TPD biete einen Rahmen für hohe Teilhabe bei großer Heterogenität.
- https://www.bdfl.de/images/sketchdates/dates/979/programm-online-trainer-kongress-27-28-februar-pdf.pdf – Online-Trainerkongress am 27./28. Februar (Jahr unbekannt) zur Weiterentwicklung der TPD (laut Zusammenfassung); Domain gesperrt, nicht geprüft
- https://www.berliner-fussball.de/en/mehr-als-fussball/news/view/dfb-trainingsdialog-zum-thema-spielbeschleuniger – Trainingsdialog zum Thema „Spielbeschleuniger" (nur Titel); Domain gesperrt, nicht geprüft
- https://training-service.fussball.de/trainer/aktiver-ue-20/artikel/jetzt-gehts-app-2209/ – „Jetzt geht's APP!": leitet am 29.10.2026 per HTTP 301 auf https://www.meinfussball.de/training-spiel/erwachsene um (gesperrt); Inhalt nicht prüfbar.
- https://flvw.de/de/dfb-training-und-service.htm – FLVW-Seite zu „DFB Training und Service" (Inhalt nicht erfasst; Fremddomain, nicht geprüft)
- https://training-service.fussball.de/fileadmin/_dfbdam/122116-400-a-st1-01.pdf – leitet auf meinfussball.de um; die identische Datei auf dfb.de ist jetzt in A-98 ausgewertet (A-Junioren, Christian Wück, 2016).
- DFB-PDFs ohne erfassten Inhalt (https://www.dfb.de/fileadmin/_dfbdam/11589-240-dc-ha2-01.pdf ; https://www.dfb.de/fileadmin/_dfbdam/11307-269-dc-ha2-01.pdf ; https://www.dfb.de/fileadmin/_dfbdam/23887-095_ba_au2_01.pdf ; https://www.dfb.de/fileadmin/_dfbdam/11504-223-dc-ha2-01.pdf ; https://dfb.de/fileadmin/_dfbdam/11343-276-dc-ha2-01.pdf ; https://dfb.de/fileadmin/_dfbdam/61761-362-c-ha2-01.pdf) – alle am 29.10.2026 abgerufen und in A-98 ausgewertet.
- https://www.dfb.de/fileadmin/_dfbdam/210191-Final_-_Beschlussvorlage_I_-_Projekt_Zukunft_-_m%C3%A4nnlich.pdf – jetzt ausgewertet als A-99 (Beschlussvorschlag zum DFB-Bundestag 2019; Thema Leistungs- und Talentförderung bestätigt).
- https://online-lernen.dfbnet.org/studip/static/c-trainer/seiten/pdf/03_Jugend/09_Sportorganisation/03_Unterrichtsverlauf/03_09_03_KS.pdf – DFB-Lernmaterial zur Trainer-C-Lizenz (Bereich Jugend) zum Talentförderprogramm; im Treffer keine Taktikinhalte (nicht geprüft)
- https://www.trainertalk.de/attachment/99-spielidee-d-jugend2012-pdf/ – keine DFB-Quelle: „Spielidee D-Jugend 2012/13" mit Viererkette, Verschieben in Ballrichtung und Raumdeckungsprinzipien (nicht geprüft)
- https://www.djk-coesfeld.de/_cache/downloads/1386-3e64a4f935/cms/Abteilungen/Fussball/Trainingsinhalte.pdf – Vereinskonzept (C-Jugend u. a. „ballorientiertes Verteidigen", Mannschaftstaktik; nicht geprüft)
- https://utheses-gateway.univie.ac.at/api/document/get/file/25518 – Abschlussarbeit der Universität Wien (laut Inhaltsverzeichnis Verschieben seitlich und in der Tiefe, Dreier- und Viererkette; nicht geprüft)
- https://tool.jugendundsport.ch/asset/67a9beff8a04bc9a2b0eb983/download?lang=de – Jugend+Sport (Schweiz): „Ballorientiert, kompakt und situationsangepasst verteidigen" (keine DFB-Quelle; Terminologie-Abgleich; nicht geprüft)
- https://www.sfv-online.de/fileadmin/content/PDFs/Spielbetrieb/Regelwerk/richtlinien_futsal_junioren.pdf – Futsal-Junioren 2v2 ca. 15 × 10 m, vier Minitore höchstens 2,0 × 1,2 m, ohne Bande (Verband vermutlich Sächsischer FV [Hintergrundwissen, nicht per Suche bestätigt]; nicht geprüft)
- https://www.sfv-online.de/fileadmin/content/PDFs/Spielbetrieb/Regelwerk/kleinfeldbestimmungen.pdf ; https://sfv-online.de/fileadmin/content/PDFs/Spielbetrieb/Regelwerk/08082024_kleinfeldrichtlinien.pdf – Kleinfeldrichtlinien (Inhalt nicht erfasst; nicht geprüft)
- Weitere regionale Richtlinien ohne Einzelauswertung (nicht geprüft, Fremddomains): https://www.kreis-wolfsburg.nfv.de/fileadmin/Bezirke_Kreise/Kreis_Wolfsburg/Inhalt/Spielbetrieb/Junioren/Spielplanung_Kinderfussball/Richtlinien_f%C3%BCr_den_Kinderfu%C3%9Fball_der_F-_und_G-Junioren_.pdf ; https://kreis11.fvn.de/media/f_und_g_juniorenspiele_im_kreis_neu2.pdf ; https://www.kreis-ostfriesland.nfv.de/fileadmin/Bezirke_Kreise/Kreis_Ostfriesland/News/2025/Junioren/Junioren_Rahmenrichtlinien_Kinderfu%C3%9Fball_3_3_und_4_1_4_1.pdf ; https://www.hfv-online.de/fileadmin/hfv-online.de/kreise/bergstrasse/jugend/Bestimmungen_Spielsystem_01/Saison_22-23/03-Allgemeine_Durchfu%CC%88hrungsbestimmungen_E-G-F-Junioren_nWF-FPL.pdf
- **Bewusst nicht verwendet** (Herkunft oder Qualität fraglich bzw. nicht DFB): kuechenfibel.de (FAQ-Seite ohne Quellen), grandavehousing.calpoly.edu („DFB Training for D-Jugend", wirkt wie Spam), footballgpt.co (KI-Blog mit DFB-Zuschreibungen ohne Beleg), mcsprogram.org / sbrc2017.ufpa.br / reuniones.cjlibertad.org („Praxisplaner"-PDFs unklarer Herkunft), dbulolland-falster.dk (Auszug unklarer Herkunft), fifatrainingcentre.com und learn.englandfootball.com (keine DFB-Quellen, ggf. für andere Teilrecherchen relevant).

---

## Synthese

**Belastbarkeit und Kennzeichnung.** Die Evidenzstufen bleiben: Stufe 1 sind DFB-eigene Seiten und PDFs, Stufe 2 Dokumente der Landesverbände, Stufe 3 BDFL-Kongressdokumente mit DFB-Bezug, Stufe 4 Medien und Sekundärquellen. Neu ist die Kennzeichnung jeder Aussage:
- **[verifiziert]**: am 29.10.2026 im Volltext des Originals geprüft (Beleg in Klammern).
- **[nur Suchergebnis]**: nur aus dem ersten Durchgang (Suchzusammenfassung), Original nicht geprüft.
- **[Hintergrundwissen]** und **[eigene Ableitung]** wie bisher.

### 1. Trainingsphilosophie Deutschland (TPD)

**Herkunft und Zeitpunkt.**
- Vorläufer: Im Januar 2023 stellte Hannes Wolf als U20-Trainer das Video „Eine Anleitung für Spielformen im Kinder- und Jugendtraining" vor, mit 4v4-Varianten als Basis [verifiziert A-93]. Die gleichnamige Folienpräsentation (Dateiname 230919) ist A-02 [verifiziert].
- 21.08.2023: Wolf wird DFB-Direktor Nachwuchs, Training und Entwicklung (neu geschaffener Posten); das Kompetenzteam mit zehn weiteren Expert*innen wird benannt; Wolf nennt bereits Freude, Intensität und Wiederholung als Kern [verifiziert A-90].
- 08.09.2023: Video mit Peter Hermann und die Richtwerte 48/32 Minuten [verifiziert A-06].
- 27.09.2023: Pressekonferenz am DFB-Campus zur „Trainingsphilosophie Deutschland" mit der „besten Trainingseinheit" als Kern [verifiziert A-91]. Das ist die früheste gefundene ausdrückliche öffentliche Vorstellung. Die DFB-Meldung vom 06.03.2024 datiert die Vorstellung „etwas mehr als fünf Monate" zurück [verifiziert A-08]. Die im ersten Durchgang nur indirekt erschlossene Datierung „September 2023" ist damit belegt.
- Kompetenzteam laut Flipbook-Impressum: Balitsch, Lars und Sven Bender, Gerland, Peter Hermann, Loderer, Lotzen, Ludwig, Di Salvo, Stredak, Wagner und Wolf [verifiziert A-87]. Laut Journal 2026 stehen inzwischen alle Nationaltrainer*innen für die TPD ein [verifiziert A-89].
- Verbreitung:
  - Fortbildungen mehrmals pro Woche [verifiziert A-01]; TPD-Veranstaltungen 2024/2025/2026: 38/58/67 mit 1.710/7.658/9.952 Teilnehmenden [verifiziert A-89]
  - bundesweite Trainingsdialoge an mehr als 350 Stützpunkten: Nr. 3 (08.05.2023, 4v4), Nr. 4 (2023, 3v3), Nr. 5 (06.05.2024, mehrere Felder), Nr. 6 (2024, Spiele auf 1 Tor), Nr. 8 (2025, Passspiel) [verifiziert A-17, A-16, A-14, A-15]
  - erster Jugendfußball-Kongress am 28./29.03.2025 mit rund 220 Teilnehmenden [verifiziert A-95]
  - Trainerkongress Inklusionsfußball (10.02.2026) [verifiziert, siehe Weitere Treffer]; Bad Hersfeld [nur Suchergebnis A-13]
  - DFB-Journal 3/2026 [verifiziert A-19, A-89]; seit 21.10.2026 MEIN FUSSBALL [verifiziert A-73]
- Verankerung in der Ausbildung: TPD integriert in Kindertrainer-Zertifikat, Basis-Coach und bis zur B-Lizenz [verifiziert A-09]; E-Learning TPD (eine Stunde) als empfohlener Einstieg [verifiziert A-01, A-89].

**(a) Grundprinzipien.**
- Spieler*innen im Mittelpunkt; Leitmotiv „Entwicklung individueller Qualität" [verifiziert A-01, A-87, A-15].
- Drei verbindliche Qualitätsmerkmale [verifiziert A-01]:
  - **Freude:** begeisterte Teilnahme, viele Ballkontakte in jeder Form; im Flipbook zusätzlich Spielen auf Tore, Spiele beginnen bei 0:0, viele Freiheitsgrade beim Lösen von Situationen [verifiziert A-01, A-87].
  - **Intensität:** konstant hohe Nettospielzeit, schrittweise Steigerung, Standzeiten grundsätzlich vermeiden [verifiziert A-01].
  - **Wiederholung:** hohe Zahl an Aktionen; Kinder werden in dem besser, was sie regelmäßig tun; deshalb wiederholendes Training in kleinen Spielformen [verifiziert A-01]. Der offene Punkt aus dem ersten Durchgang ist damit erledigt.
- Alle sollen in jeder Trainingsminute Freude, Wiederholung und Intensität erleben [verifiziert A-87; ZDF-Formulierung A-11 nur Suchergebnis].
- Paradigmenwechsel vom taktikzentrierten zum spielerzentrierten Ansatz: Taktische Prinzipien bleiben, sind aber nicht mehr Ausgangspunkt der Trainingsplanung [verifiziert A-89]. Kritisiert werden die „Taktisierung" durch Gegner-Videoanalyse, große Spielformen sowie Prinzipien- und Spielausschnittstraining, in denen die Entwicklung des Einzelnen zurücktrete [verifiziert A-92, A-87].

**(b) Trainingsstruktur.**
- „Beste Trainingseinheit" 15-30-15-30 (Aktivierung, Spielblock, Zwischenblock, Spielblock), mindestens zweimal pro Woche [verifiziert A-87, A-02, A-91].
- Spielblöcke: mehrmals 3–4 Minuten netto pro Spieler*in mit ca. 1–2 Minuten Pause, 1v1 bis 4v4 auf mehreren Feldern [verifiziert A-87]. Präsentation 2023: Variante für 10 bis 18 Jahre mit 3–4 × 4 Minuten (1v1 bis 4v4), Variante für 6 bis 18 Jahre mit 4–5 × 3 Minuten (3v3) [verifiziert A-02]. In den Trainingsdialogen 5 × 4 Minuten mit 2 Minuten Pause [verifiziert A-14, A-15]. Im Vorläufer 2023 sechs- bis achtmal vier Minuten pro Training [verifiziert A-93].
- Vier Formgruppen: Gleichzahl, Gleichzahl mit Anspieler*innen, Linie verteidigen/bespielen, Über-/Unterzahl [verifiziert A-87, A-02].
- Maximale Formgröße im Training: Bambini höchstens 2v2, F höchstens 3 + TW gegen 3 + TW, E höchstens 4 + TW gegen 4 + TW, D bis A 1v1 bis 4v4 (plus bis zu zwei Anspieler*innen pro Team) [verifiziert A-87].
- Richtwerte für die Nettospielzeit pro Spieler*in und Woche in kleinen Spielformen [verifiziert A-01, A-06, A-87, A-02]:
  - U8 bis U16 (Webseite: „bis einschließlich U16"): mindestens 48 Minuten
  - ab U17: mindestens 32 Minuten
  - Ältere Formulierung von 2023: 48 Minuten als Kern in allen Alters- und Leistungsklassen [verifiziert A-16].
- Steuerung über Provokationsregeln (Shotclock, Rückpassregeln, Feldgröße und -form, Abseitslinie, Kontaktbegrenzung, „Tore nur direkt") und Hybridfelder bei wenigen Toren oder Torhüter*innen [verifiziert A-87, A-15, A-07].
- Felder nach Entwicklungsstand und biologischem Alter einteilen; ab der C-Jugend darf Positionsspezifik in gesunder Mischung einfließen [verifiziert A-87].
- Der SC Freiburg dokumentiert die Minuten in der U15 individuell [verifiziert A-07].
- Gegen Fehlinterpretationen: Niemand will ausschließlich kleine Spielformen, es geht nicht um „16-mal drei Minuten"; weder Rondos noch Taktik sollen abgeschafft werden; TPD ist nicht dasselbe wie Funino oder der Kinderfußball-Spieltag [verifiziert A-10, A-89].
- Die Aktionstabelle (3v3 gegenüber 7v7: rund 200 statt 50 Ballaktionen pro Einheit) ist eine DFB-Schätzung ohne Methodenangabe [verifiziert A-02, A-87].

**Rolle der Trainer*innen.** Im ersten Durchgang fand sich dazu nichts; jetzt ist sie belegt.
- Organisieren: mehrere Felder, Balldepots, schnell einen neuen Ball ins Spiel bringen, Nettospielzeiten im Blick behalten [verifiziert A-87, A-91, A-93].
- Coaching-Fokus in kleinen Spielformen: Motivation und Umschaltaktionen; das Spiel stimmlich und positiv begleiten; Detailcoaching sei an der Basis nicht nötig [verifiziert A-87].
- „Weniger ist mehr": Korrekturen begleitend oder in den Pausen; Intervalle schaffen Coachingzeit; Fehler nicht kommentieren, sondern die nächste Aktion coachen; den Spieler*innen bewusst machen, dass sie in jeder Aktion entscheiden [verifiziert A-14, A-15].
- Traineraufgaben laut Vorläufer 2023: Regeln einführen, Ergebnis zählen, Energie geben, Spielfluss fördern, Umschalten einfordern, sinnvolle Raumaufteilungen erarbeiten, positiv verstärken, Dysfunktionales korrigieren, auf noch nicht erkannte Lösungen hinweisen [verifiziert A-93].
- Eine Situation „einfrieren", um auf eine Lösung hinzuweisen (Beispiel Doppeln) [verifiziert A-50, Trainingsblatt 2020].
- Talentförderung: Spieler*innen aktiv in Entscheidungen einbinden, Selbstreflexion ermöglichen, präzise Coachingtipps geben, „komplex, aber nicht kompliziert" [verifiziert A-46].
- Kinderfußball: Coaching auf das Nötigste reduzieren, gemeinsame Coaching-Zone [verifiziert A-21, A-23, A-88]. BDFL-Empfehlungen zum Coaching in Pausen [nur Suchergebnis A-69].
- Lernen über Regeln: Je nach Regeln gehe es in Spielformen hoch taktisch zu, ohne dass man Taktik groß erklären müsse [verifiziert A-91].

**Individuelles Lernen und 1-gegen-1.**
- Leitmotiv individuelle Qualität [verifiziert A-87, A-15]. Zielbild „globaler Spieler": Ballsicherheit unter Druck, technische Perfektion, Zweikampfverhalten offensiv und defensiv, sofortiges Umschalten in beide Richtungen, intuitives Spielverständnis mit hoher Entscheidungsqualität in allen Spielphasen [verifiziert A-87].
- Gleichzahlspiele betonen frontale 1v1-Duelle im Kontext gemeinsamen Angreifens und Verteidigens [verifiziert A-87]; für Anfänger*innen kann mit dem 1v1 begonnen werden [verifiziert A-89].
- Ältere Leitlinie „jedes Duell suchen und gewinnen" [nur Suchergebnis A-57].

**Materialien.** Flipbook 2024 (A-87), Präsentation 2023 (A-02), Trainingsdialoge 4, 6 und 8 (A-16, A-14, A-15), Journal 3/2026 (A-89), Best-of-Video und E-Learning (A-01); Videoreihen „Vom Wohnzimmer …", „Vom Trainerzimmer …" und „Von der Umkleidekabine auf den Trainingsplatz" sowie zwei Folgen „Sky Matchplan Spezial" (A-87, A-06) [alle Angaben verifiziert; die Videos selbst wurden nicht angesehen].

**Debatte.**
- Kommentar zur fehlenden Spielrealität mancher Formen [nur Suchergebnis A-20].
- „Wir stellen alles auf den Prüfstand" stammt im DFB-Original von Hanno Balitsch (PK 27.09.2023) [verifiziert A-91].
- DFB-Präsident Neuendorf (Journal-Editorial): Spielfreude und individuelle Entwicklung stünden nicht im Widerspruch zum Leistungsprinzip; Gewinnen und Verlieren blieben Teil des Kinder- und Jugendfußballs [verifiziert A-89].

**Konsequenzen für SPIELIQ.**
1. **Ergänzung, nicht Ersatz.** Nettospielzeit, die 75-%-Spielzeit-Norm und die im Flipbook genannte Sorge über mehr Bildschirmnutzung sprechen für eine klare Positionierung als Vor- und Nachbereitung der Platz-Spielformen [verifizierte Basis A-01, A-87, A-08].
2. **Qualitätsmerkmale als UX-Kriterien:** Freude (Erfolgserlebnisse, Spielcharakter), Intensität (keine Wartezeiten, viele Entscheidungen pro Minute), Wiederholung (viele Varianten derselben Situation, regelmäßig) [verifiziert A-01].
3. **Szenarioaufbau** nach den vier DFB-Formgruppen, 1v1 bis 4v4 mit klarer Spielrichtung, Felder in DFB-Maßen; danach Transfer auf 9v9 und 11v11 [verifiziert A-87, A-14].
4. **Taktik spielerzentriert vermitteln:** individuelle Entscheidungen („was wann tun") statt Systemtafel; keine Gegneranalyse für Jugendteams [verifiziert A-89, A-92; eigene Ableitung].
5. **Spielrealismus:** Folgeaktionen und Spielrichtung müssen stimmen [nur Suchergebnis A-20; eigene Ableitung].

### 2. Neue Spielformen und Spielformate je Altersklasse

**Status und Ziel.**
- Seit 2024/25 bundesweit verbindlich für G, F und E (U6 bis U11) [verifiziert A-21, A-88].
- Beschluss in zwei Schritten: Der Bundesjugendtag bestätigte im Januar 2022 die Ausschussempfehlung, der DFB-Bundestag beschloss am 11.03.2022 offiziell [verifiziert A-21, A-23, A-97]. Der Widerspruch aus dem ersten Durchgang ist aufgelöst.
- Ziel: viele Ballaktionen, Tore und Erfolgserlebnisse für jedes Kind; Motto „Alle Kinder spielen immer – kein Kind bleibt zu Hause" [verifiziert A-21]; möglichst mindestens 75 % Spielzeit pro Kind [verifiziert A-88].
- Begründung u. a.: Im Kinderfußball werde häufig zu früh Wert auf Taktik gelegt [verifiziert A-21, A-23].

**Regeln und Organisation** (DFB-Booklet 03/2026, A-88, sofern nicht anders angegeben).
- **Keine Meisterschaft** in G und F, sondern Festivals mit auf- und absteigenden Feldern [verifiziert A-21, A-88].
- **Keine Schiedsrichter*innen** in F und jünger (in E optional nach Verbandsbeschluss); die Kinder entscheiden selbst; Trainer*innen coachen aus einer gemeinsamen Coaching-Zone [verifiziert A-88].
- **Ergebnisse** werden nicht über den Spieltag hinaus festgehalten, jedes Spiel zählt für Auf- und Abstieg; Tore zählen [verifiziert A-21, A-22].
- **Rotation:** nach jedem Tor (2v2, 3v3) bzw. alle 3 Minuten (4v4, 5v5); höchstens Teamstärke minus eins als Rotationspersonen [verifiziert A-88].
- **Torhüter*innen:** im 2v2 und 3v3 nie, im F-4v4/5v5 optional; ab wann regelmäßig, ist in DFB-Quellen uneinheitlich: ab F (A-21) bzw. ab E (A-22, A-23) [verifiziert, widersprüchlich].
- **Schusszone:** beim 2v2 die Mittellinie, beim 3v3 und in Minitor-Varianten 6 m [verifiziert A-88].
- **Eindribbeln/Einpassen** ist DFB-Wettspielregel, außer im 7v7 (Einwurf) [verifiziert A-21, A-88]. Im ersten Durchgang war das nicht bestätigt.
- **Ausgleichsregel:** Bei drei Toren Rückstand darf eine Person mehr spielen; DFB-Variante für F und E [verifiziert A-88], zuvor nur beim FVN belegt [nur Suchergebnis A-27].
- **Eltern:** Mindestabstand; das Booklet nennt 3 m (Fair-Play-Folie) und 15 m (Übersichtsfolien) [verifiziert A-88, widersprüchlich].
- **Abgrenzung und Debatte:** „Funino" ist nicht gleichbedeutend mit der Reform [verifiziert A-22]; die Reform ist politisch umstritten [nur Suchergebnis A-85].

**Kompakttabelle Spielformate**

Die Maße sind „ca."-Angaben; das Booklet legt nicht ausdrücklich fest, welche Zahl Länge und welche Breite ist.

| Altersklasse | Spieler*innen | Feldgröße (m) | Tore (B × H, m) | Besonderheiten | Quelle | Status |
|---|---|---|---|---|---|---|
| G (U6/U7) | 2v2 (plus höchstens 1 Rotation) oder 3v3 (plus höchstens 2) | 2v2 ca. 16 × 20; 3v3 ca. 25 × 20 (Booklet); Rahmen 16 × 20 bis 28 × 22 (DFB-Seite) | 4 Minitore höchstens 2,0 × 1,2; je 2 m von der Seitenlinie eingerückt | ohne Torwart; 2v2 Tore ab Mittellinie, 3v3 aus 6-m-Zone; Rotation nach jedem Tor; bis 7 × höchstens 5 min (2v2) bzw. 7 × höchstens 7 min (3v3); Ball Gr. 3, 290 g; Festival mit CL-Modus | A-88, A-21 | [verifiziert] |
| F (U8/U9) | 3v3; 4v4 (3 + TW oder 4); 5v5 (4 + TW oder 5, optional); laut DFB-Seite auch 3 + 1 gegen 3 + 1 | 3v3 ca. 25 × 20 (Seite: 26–28 × 20–22); 4v4/5v5 ca. 40 × 25 (Seite: 40 × 22–25) | Minitore höchstens 2,0 × 1,2; Kleinfeldtore 5,0 × 2,0, alternativ höhenreduziert auf 1,65 | 3v3: 6-m-Zone, höchstens 7 × 10 min; 4v4/5v5: Rotation alle 3 min, 6 × 10–12 min, Torwart wechselt je Runde; +1 bei drei Toren Rückstand; Ball Gr. 3 | A-88, A-21, A-22 | [verifiziert] |
| E (U10/U11) | 4v4/5v5 (wie F) oder 6v6/7v7 (6 + TW) plus Nebenfelder 2v2/3v3 | 4v4/5v5 ca. 40 × 25; 6v6/7v7 ca. 55 × 35 | Kleinfeldtore höchstens 5,0 × 2,0 (Aufbau-Folie „5,0 × 7,0", vermutlich Tippfehler); im 4v4/5v5 auch Minitore | 7v7: Tore von überall, Einwurf, 4 × 15 oder 2 × 25 min (zwei Teams) bzw. 2 × 15 min (drei Teams), auch Ligaspielbetrieb; Ball Gr. 4, 350 g | A-88, A-21 | [verifiziert] |
| E (regional) | FVN 6v6 als Regelform; HFV 7v7-Liga | Berlin 35 × 25; Kreis-Flyer 25 × 35 (5v5) | – | – | A-27, A-34, A-33, A-43 | [nur Suchergebnis] |
| D (U12/U13) | kein bundesweit neues Pflichtformat; verbreitet 9v9; DFB-Pilotideen 7x7-Zwillingsspiel (zwei Felder) und 3x3 + TW-Turnier; regional 7 + 1 und 6 + 1 | 7x7-Zwilling: je Hälfte eines Regelfelds, Breite Mittellinie bis 5-m-Raum, Länge = Spielfeldbreite; 3x3 + TW: Sechseck ca. 18 tief, Dribbellinie 12 breit, neutrale Zone 5 tief; 9v9: 68–70 × 50–55 | Kleinfeldtore 5 × 2 (Zwilling optional 6,20 × 2,10) | Zwilling: 6 × 12 min, kein Abseits, Strafraum 11 m, Strafstoßpunkt 8 m; Ball Gr. 4, 350 g (A-97); 9v9: Strafraum 29 × 12, Punkt 8 m | Formate A-89, A-87; Ball A-97; 9v9-Maße A-35, A-36, A-32, A-40 | Formate und Ball [verifiziert]; 9v9-Maße [nur Suchergebnis] |
| C (U14/U15) | 11v11 auf dem Großfeld; ab 2027/28 neue Wettbewerbsformen in U14 bis U16 (Leistungszentrums-Niveau und weitere Orte) | Normalfeld [Hintergrundwissen]; ca. 100 × 60 im Rheinland | 7,32 × 2,44 | ab 2027/28 Drittel à 30 (teils 35) min, jedes Drittel ein eigenes Spiel ab 0:0; Ball Gr. 5 (A-97); heutige Spielzeit 2 × 35 min und Auswechselregeln regional | 11v11 A-102, A-89; 2027/28 A-89; Ball A-97; Feld A-29; Spielzeit A-32, A-42 | 11v11, 2027/28 und Ball [verifiziert]; Feld, Tore, Spielzeit [nur Suchergebnis] |
| B/A (U16–U19) | 11v11; U16 ab 2027/28 ebenfalls Drittel-Formate | Normalfeld [Hintergrundwissen] | 7,32 × 2,44 [Hintergrundwissen] | Spielzeiten B 2 × 40, A 2 × 45 min [Hintergrundwissen, nicht per Suche bestätigt] | A-89 (U16) | U16-Format [verifiziert]; Rest [Hintergrundwissen] |

**D-Jugend.**
- Ein bundesweit einheitliches neues Format gibt es nicht; Formate werden in mehrjährigen Pilotprojekten erprobt [verifiziert A-94, A-95].
- Der DFB nennt das 9v9 eine reduzierte Förderung und stellt das 7x7-Zwillingsspiel zur Debatte bzw. beschreibt es als Format [verifiziert A-08, A-87, A-89].
- NFV-Pilot 6 + 1 gegen 6 + 1 [nur Suchergebnis A-37]; eine DFB-Empfehlung von mindestens 68 × 50 m für das 9v9 ist nur über ein Kreisdokument belegt, ein DFB-Original wurde nicht gefunden [nur Suchergebnis A-35].

**C, B und A.**
- Es wird 11v11 auf dem Großfeld gespielt [verifiziert A-102, A-89].
- Ab 2027/28 sollen in U14, U15 und U16 Drittel-Formate gespielt werden, und zwar auf Leistungszentrums-Niveau und an verschiedenen Orten; eine flächendeckende Pflicht beschreibt die Quelle nicht [verifiziert A-89].
- Als Vision für C-Junioren-Freundschaftsspiele nennt das Flipbook ein „Buffet" aus Formaten (z. B. 7v7 auf zwei Feldern oder 9v9 bzw. 11v11) [verifiziert A-87, Vision von 2024].
- Ob es regional C-Junioren im 9er-Format gibt, ist offen [nur Suchergebnis A-29].

**TPD-Trainingsfelder in DFB-Maßen** [verifiziert]

| Form bzw. Einheit | Maße (m) | Quelle |
|---|---|---|
| Bambini-Spielstunde (Minifelder) | ca. 20 × 16 | A-87 |
| F/E-Trainingseinheit (Hybrid-, Mini- und Kleinfeld) | ca. 25 × 20 | A-87 |
| D–A-Trainingseinheit (Hybridfelder) | ca. 33 × 25 (doppelter Strafraum) | A-87 |
| U14, Spiele auf 1 Tor | 30 × 25 / 22 × 20 / 25 × 15 (Sechseck-Einheit: 30 × 20 / 30 × 25) | A-14 |
| U14, Passspiel-Einheit | 30 × 40 (2 Tore); 20 × 18 (4 Minitore) | A-15 |
| 4v4 mit Torhütern | 25 × 25 | A-87 |
| 2v2 in acht Sekunden | 25 × 20 | A-87 |
| Funino 3v3 mit 5-m-Abschlusszonen | 20 × 18 | A-87 |
| 3v3 bzw. 4v4 mit drehendem Angriffsrecht | 20 × 20 | A-87 |
| 4v4 Linie verteidigen (breit, Sechseck) | 30 × 45 | A-87 |
| 5 + TW gegen 5 + TW auf Linie | 25 × 50 | A-87 |
| Schule des Kleinfeldfußballs (3v3) | ca. 15 × 20 | A-87 |

**Vorschlag für SPIELIQ-Pitch-Presets.** Das ist eine eigene Ableitung, keine DFB-Vorgabe. Alle Werte sollen editierbar sein und die Quelle anzeigen.

| Preset | Maße (m) | Tore | Torwart | Optionen | Basis |
|---|---|---|---|---|---|
| G 2v2 | 20 × 16 | 4 Minitore 2,0 × 1,2 (2 m eingerückt) | nein | Tore ab Mittellinie | A-88 [verifiziert] |
| G/F 3v3 | 25 × 20 | 4 Minitore | nein | 6-m-Schusszone; regional 26 × 20 (NFV) | A-88 [verifiziert]; A-26 [nur Suchergebnis] |
| F/E 4v4 bzw. 5v5 | 40 × 25 | 2 Kleinfeldtore 5 × 2 (in F höhenreduziert 1,65) oder 4 Minitore | optional | Rotation alle 3 min; regional 35 × 25 | A-88 [verifiziert]; A-33 [nur Suchergebnis] |
| E 7v7 | 55 × 35 | 2 Kleinfeldtore 5 × 2 | ja | Einwurf; Nebenfeld 2v2/3v3 | A-88 [verifiziert] |
| D 7x7-Zwillingsspiel | halbes Regelfeld: ca. 44–47 (Mittellinie bis 5-m-Raum) × 64–68 (Spielfeldbreite) | 5 × 2 | ja | Strafraum 11 m, Punkt 8 m, kein Abseits | A-89 [verifiziert]; Meterwerte [eigene Ableitung für ein Regelfeld von 100–105 × 64–68 m] |
| D 9v9 | 68 × 50 (alternativ 70 × 50 bzw. 70 × 55) | 5 × 2 | ja | Strafraum 29 × 12, Punkt 8 m | A-35, A-36, A-32 [nur Suchergebnis] |
| C 11v11 | 105 × 68 [Hintergrundwissen, nicht per Suche bestätigt]; alternativ ca. 100 × 60 | 7,32 × 2,44 | ja | Abseits an; Ball Gr. 5; Matchmodus „2 Halbzeiten" oder „3 Drittel à 30/35 min, Neustart bei 0:0" (ab 2027/28 in Leistungszentren geplant) | A-102, A-89, A-97 [verifiziert]; A-29 [nur Suchergebnis] |
| C-Trainingsfelder (TPD, U14) | 30 × 25 · 22 × 20 · 25 × 15 · 30 × 40 · 20 × 18 | 1 Tor plus Minitore bzw. 2 Tore | optional | „Spiel auf 1 Tor", Linie verteidigen, Anspieler*innen | A-14, A-15 [verifiziert] |

### 3. Altersgerechte Lern- und Ausbildungsziele (G bis A)

**Befund.**
- Eine DFB-Gesamtkonzeption mit Lernzielen je Altersklasse fand sich auch in den Originalen nicht [verifiziert: in den abgerufenen Dokumenten nicht vorhanden].
- Belegte Stufungen:
  - Spielprinzipien im Kinderfußball: G „Fußball erleben", F „Fußball erlernen – spielerisch eigene Lösungen finden", E „Fußball verstehen – unterschiedliche Situationen meistern" [verifiziert A-88].
  - Talentförderung: Basisförderung etwa 3 bis 10 Jahre, Talentförderprogramm ab 11 Jahren; Ausbildung nach den Spielmomenten Tore erzielen, Tore vorbereiten und Ballsicherung; keine frühe Positionsfixierung [verifiziert A-46].
  - TPD: Die Komplexität der Spielformen soll mit dem Alter wachsen; spätestens ab D gezielte Ausbildungsschwerpunkte (z. B. Linie verteidigen/bespielen); ab C Positionsspezifik in gesunder Mischung [verifiziert A-87].
  - Stufenmodell der bpb [nur Suchergebnis A-47]; frühere DFB-Ausbildungskonzeption [nur Suchergebnis A-48].

Die folgende Tabelle zeigt, was die Quellen je Altersklasse belegen. Sie ist lückenhaft und kein Curriculum.

| Altersklasse | Belegte Schwerpunkte | Quelle | Status |
|---|---|---|---|
| G/F/E | Freude und viele Ballaktionen; eigene Lösungen finden; Coaching minimiert; Torhüter*innen ab F bzw. E; zu frühe Taktik vermeiden; vier Tore fördern Raumaufteilung und Spielverlagerung; im Training Bambini höchstens 2v2, F höchstens 3 + TW, E höchstens 4 + TW | A-21, A-22, A-88, A-87 | [verifiziert]; Zonenregeln aus SBFV-Trainingsformen [nur Suchergebnis A-41] |
| D (U12/U13) | spätestens jetzt geplante Schwerpunkte, u. a. Linie verteidigen/bespielen (Verschieben, Herausrücken, Absichern; Tiefe bedrohen); TPD-Mustereinheit D bis A mit Viererketten an der Mittellinie; Talentförderung ab 11; 9v9 als Förderdefizit kritisiert | A-87, A-46, A-08 | [verifiziert] |
| C (U14/U15) | erstmals 11v11 auf dem Großfeld; Positionsspezifik darf einfließen; U14-Einheiten der Trainingsdialoge mit Linie verteidigen (Verschieben, Übergeben/Übernehmen, Abwehrdreieck), Passspiel, „Gegner binden oder anspielbar sein", Räume im Rücken; Stützpunkt-Training U12 bis U15; Pubertät, biologisches Alter bis fünf Jahre abweichend | A-102, A-87, A-14, A-15, A-45, A-46 | [verifiziert]; Bio-Banding beim 1. FC Köln [nur Suchergebnis A-54]; Leitlinien-Einheit U15/U16 [nur Suchergebnis A-58] |
| B/A (U16–U19) | ab U17 Richtwert 32 Minuten; A-Junioren: Verschieben zum Ball (Viererkette, Spielverlagerung, Doppeln); U16 ab 2027/28 mit Drittel-Formaten | A-87, A-50, A-89 | [verifiziert]; DFB-Videoreihe zum Verteidigen [nur Suchergebnis A-64] |

**Wann führt der DFB Raumdeckung, Viererkette, Verschieben, Pressing und Positionsrollen ein?** Eine ausdrückliche DFB-Altersvorgabe gibt es auch nach der Volltextprüfung nicht [verifiziert: in den abgerufenen Originalen nicht vorhanden]. Die stärksten Indizien:
- **Kinderfußball:** zu frühe Taktik vermeiden [verifiziert A-21].
- **Ab D:** „Spätestens ab dem Alter der D-Junioren" sollen gezielte Schwerpunkte angesteuert werden; im Kapitel „Linie verteidigen" sind das Verschieben, Herausrücken und Absichern. In der TPD-Mustereinheit für D bis A organisieren sich die Teams in Viererketten an der Mittellinie, und nur ein Verteidiger darf die Linie verlassen [verifiziert A-87].
- **Ab C:** Positionsspezifik darf einfließen [verifiziert A-87]; U14-Einheiten enthalten Linie verteidigen mit Kettenvokabular [verifiziert A-14].
- **Viererkette historisch:** 2012 rief der DFB auf D/C- und B/A-Trainingsblättern dazu auf, die Kette in der Saisonvorbereitung einzuführen, ohne Altersgrenze [verifiziert A-51, A-72]. Die Aussage des ersten Durchgangs, die Kette werde „erst schrittweise für 11- bis 12-Jährige" eingeführt, ist durch das Original nicht gedeckt [verifiziert A-51].
- **Pressing und Gegenpressing:** Sie kommen in kleinen Spielformen automatisch vor (Kommentar zum Funino 3v3) [verifiziert A-87]; im Trainingsdialog 8 (U14-Felder) folgt nach Ballverlust sofortiges Pressing als Konterabsicherung [verifiziert A-15]. Eine Altersregel gibt es nicht.
- **Raumdeckung:** kein DFB-Beleg für den Begriff; das Flipbook spricht vom gemeinsamen Verteidigen im Raum und vom Verteidigen im Verbund [verifiziert A-87].
- **Positionsrollen:** ab C erlaubt, die Talentförderung vermeidet frühe Fixierung [verifiziert A-87, A-46].

**Tendenz (eigene Einordnung auf verifizierter Basis):**
- Grundlagen des Linien- und Gruppenverteidigens ab D, in kleinen Formen.
- Positionsspezifik und Übertragung auf das 11v11 ab C.
- Für die C-Jugend der Zielgruppe ist kollektives Verschieben damit DFB-konform, sofern es aus individuellen Entscheidungen heraus und in kleinen Spielformen vermittelt wird. Eine verbindliche DFB-Aussage fehlt weiterhin; eine lizenzierte Trainerin oder ein lizenzierter Trainer sollte das bestätigen.

**Kognitive und psychosoziale Ziele.**
- Entscheidungsqualität und Spielintelligenz entstehen über viele Entscheidungen in Spielformen; Spieler*innen lernen, Situationen „ganz ohne Coaching" zu lesen [verifiziert A-87, A-93].
- Wahrnehmung: Blickverhalten, Orientierung zu Ball und Gegner, Kopf- und Körperbewegungen in Formen mit Anspieler*innen [verifiziert A-87]; Schulterblick vor der Ballannahme [verifiziert A-98, Blatt von 2012]; Positionierung und Wahrnehmung beim Verteidigen [verifiziert A-14].
- Emotionen: Umgang mit Niederlagen, Fehlern und Frust in kleinen Spielformen [verifiziert A-87]; Werte-Coaching, Teamfähigkeit, Konfliktlösung, Frustrationstoleranz im Schulkonzept [verifiziert A-100, A-09].
- Kommunikation: kurze Kommandos, Torhüter*innen steuern die Vorderleute [verifiziert A-14]; gegenseitiges Coaching im richtigen Moment [verifiziert A-15; Wück-Bericht A-66 nur Suchergebnis].
- Abweichung von biologischem und kalendarischem Alter um bis zu fünf Jahre [verifiziert A-87].

**Warnhinweis „goldenes Lernalter":** Der Begriff steht in keinem abgerufenen DFB-Original. Die DFB-Talentseite spricht jedoch von Talenten „im besten Lernalter" (U12 bis U15) [verifiziert A-45]. Starre sensible Phasen gelten in der neueren Sportwissenschaft als vereinfachend [Hintergrundwissen, nicht per Suche bestätigt]. SPIELIQ sollte keine Lernfenster-Argumente verwenden.

### 4. DFB-Spielauffassung, Spielphasen und Terminologie

**Struktur.**
- Die früheren Leitbild-URLs („Unser Weg", „Spielvision/Spielauffassung", „Leitlinien für die Defensivphase", „Unsere Ziele", „DFB-Tugenden 2.0") leiten per HTTP 301 auf die TPD-Seite um und fehlen in der Sitemap [verifiziert A-03, A-04, A-05]. Die Leitlinien in ihrer alten Form sind nicht mehr als DFB-Seite verfügbar.
- Die Spielvision wird aber weiter erwähnt: Der Trainingsdialog 8 (2025) bezeichnet schnelles Abspielen und das Attackieren der Tiefe als offensive Leitlinien der DFB-Spielvision [verifiziert A-15].
- Mit den BDFL-Wiedergaben deckungsgleich bzw. nahezu deckungsgleich sind „Gegner binden oder anspielbar sein" [verifiziert A-15, A-14] und „Räume im Rücken des Gegners schaffen, erkennen und nutzen" [verifiziert A-15]. Nicht in DFB-Originalen gefunden wurden „so tief wie möglich, so breit wie nötig", „jedes Duell suchen und gewinnen" und „Zugriff auf den Gegner haben" [nur Suchergebnis A-55 bis A-58].

**Herkunft.**
- Leitbild und Leitlinien stellte Hansi Flick 2015 vor [nur Suchergebnis A-55]; Vermittlung unabhängig von System und Position [nur Suchergebnis A-56]; englische Darstellung mit „Spielen vor Üben" u. a. [nur Suchergebnis A-63].
- „Projekt Zukunft" (2019): neben guter mannschaftstaktischer Ausbildung wieder mehr Individualität, Kreativität und Bolzplatz-Fähigkeiten [verifiziert A-99].

**Leitlinien (Stand nach Volltextprüfung).**
- Gegner binden oder anspielbar sein [verifiziert A-15, A-14]; mit Ball Gegner binden, ohne Ball Zugriff haben [nur Suchergebnis A-57]
- Räume im Rücken des Gegners schaffen, erkennen und nutzen [verifiziert A-15; ältere Fassung „erkennen und nutzen" nur Suchergebnis A-56, A-58, A-66]
- schnelles Abspielen und Tiefe attackieren als offensive Leitlinien der Spielvision [verifiziert A-15]
- alle greifen gemeinsam an, alle verteidigen gemeinsam [verifiziert A-02, A-15]
- jedes persönliche Duell suchen und gewinnen [nur Suchergebnis A-57]
- Raum so tief wie möglich und so breit wie nötig aufteilen [nur Suchergebnis A-58, A-55, A-56]; „nur so breit wie nötig" im A-Nationalteam [nur Suchergebnis A-68]
- konsequent zum Torerfolg kommen [nur Suchergebnis A-58]

**Spielphasen.**
- In der TPD ist von hoher Entscheidungsqualität „in allen Spielphasen" die Rede; im 3v3 seien Offensive, Defensive und Umschaltspiel gefordert [verifiziert A-87, A-100]. Sofortiges Umschalten in beide Richtungen ist ein Kernelement; Umschaltaktionen sind der Coaching-Fokus [verifiziert A-87, A-02].
- Die Talentförderung gliedert nach den Spielmomenten „Tore erzielen", „Tore vorbereiten" und „Ballsicherung" [verifiziert A-46].
- Ein formales DFB-Phasenmodell fand sich in den Originalen nicht. Eigener und gegnerischer Ballbesitz als Grundraster [nur Suchergebnis A-60].
- Nach Ballverlust: Wer nachgerückt ist, geht sofort ins Pressing (Konterabsicherung) [verifiziert A-15]; Gegenpressing ist Teil kleiner Spielformen [verifiziert A-87]; schnell die Grundordnung herstellen [nur Suchergebnis A-59, A-62].
- Standardsituationen erscheinen in TPD-Formen als Fortsetzungsvariante (Ecke, Einwurf, Freistoß) [verifiziert A-87], nicht als eigene Phase.

**Terminologie-Abgleich für die SPIELIQ-UI**

| Begriff | Befund in DFB-Originalen | Beleg | Status | Empfehlung |
|---|---|---|---|---|
| anspielbar sein / Gegner binden | ja, aktuell (2024/2025) | A-14, A-15 | [verifiziert] | Kernvokabular |
| Zugriff (auf den Gegner) haben | nur in BDFL-Wiedergabe | A-57 | [nur Suchergebnis] | im Glossar erklären |
| Freilaufen | ja („geschicktes Freilaufen"); dazu „Freispielen" und Räume „freiziehen" | A-14 | [verifiziert] | verwenden |
| Anbieten | ja („zum Zuspiel anbieten", A-Junioren-Blatt 2016) | A-98 | [verifiziert, älteres Blatt] | verwenden |
| Stellen / Zustellen | „zugestellt" (C-Junioren-Blatt 2015) | A-98 | [verifiziert, älteres Blatt] | verwenden, im Glossar erklären |
| Sichern / Absichern | ja (Verschieben, Herausrücken, Absichern; „Herausstechen und Absichern"; Zentrum sichern; Konterabsicherung) | A-87, A-14, A-15 | [verifiziert] | verwenden |
| erste*r Verteidiger*in | ja (Kommentar im Flipbook) | A-87 | [verifiziert] | verwenden |
| zweite*r Verteidiger*in | nicht gefunden | – | – | prüfen; bis dahin „absichernde Person" |
| Herausrücken, Übergeben/Übernehmen | ja | A-87, A-14 | [verifiziert] | verwenden |
| Verschieben / ballorientiert | Verschieben ja (TPD, Trainingsdialog 6); „ballorientiert" nur im Trainingsblatt 2020 | A-87, A-14, A-50 | [verifiziert] | verwenden |
| Viererkette, Abstände in der Kette | ja | A-87, A-50 | [verifiziert] | verwenden (für C/B/A) |
| Doppeln | ja (Blatt 2020) | A-50 | [verifiziert] | verwenden |
| Abwehrdreieck | ja | A-14 | [verifiziert] | verwenden |
| Schnittstellen schließen / in die Schnittstelle spielen | ja | A-14, A-50 | [verifiziert] | verwenden |
| Zentrum schließen / Gegner außen halten | ja | A-87, A-14 | [verifiziert] | verwenden |
| Kompaktheit | nicht gefunden; der DFB spricht vom Verteidigen „im Verbund" und vom Schließen von Lücken im Verbund | A-87, A-14 | [verifiziert: Begriff fehlt] | „Verbund" bevorzugen; Kompaktheit nur im Glossar, ballnah gewichten (Studie A-67, nur Suchergebnis) |
| Breite und Tiefe | ja (Abspielmöglichkeiten in Tiefe und Breite; Breite halten; Tiefe bedrohen bzw. attackieren) | A-14, A-15, A-87, A-98 | [verifiziert] | verwenden |
| „so tief wie möglich, so breit wie nötig" | nicht in DFB-Originalen | A-58, A-55 | [nur Suchergebnis] | nur mit BDFL-Beleg als Leitlinie zitieren |
| Raum im Rücken (des Gegners) | ja (Trainingsdialog 8; im Flipbook als zu verteidigender Raum) | A-15, A-87 | [verifiziert] | verwenden |
| Halbraum | nicht gefunden | – | – | vermeiden oder im Glossar erklären |
| Zwischenlinienraum | nicht gefunden; „Linie verteidigen/bespielen" ja | A-87 | [verifiziert: Begriff fehlt] | vermeiden; „zwischen den Linien" erklären |
| Restverteidigung | nicht gefunden; DFB-Begriff „Konterabsicherung" | A-15 | [verifiziert] | „Konterabsicherung" verwenden |
| Gegenpressing / Pressing | ja | A-87, A-15 | [verifiziert] | verwenden |
| Umschalten / Umschaltaktionen | ja | A-87, A-02, A-100 | [verifiziert] | verwenden |
| Grundordnung | nicht in DFB-Originalen gefunden | A-59 | [nur Suchergebnis] | prüfen |
| Spielverlagerung | ja | A-50, A-88, A-87 | [verifiziert] | verwenden |
| Überzahl / Unterzahl | ja (eigene TPD-Formgruppe) | A-87 | [verifiziert] | verwenden |
| Zweikampf / 1-gegen-1 / Duell | ja | A-87 | [verifiziert] | verwenden |
| Raumdeckung / Manndeckung | nicht gefunden; Flipbook: gemeinsames Verteidigen im Raum, „Raumverteidigung" im Torhüter-Kontext | A-87 | [verifiziert: Begriffe fehlen] | „im Raum verteidigen" verwenden |
| Deckungsschatten | nicht gefunden | – | – | vermeiden oder erklären |
| Passdreieck | nicht gefunden; „Spiel über den Dritten" ja | A-87 | [verifiziert: Begriff fehlt] | „Spiel über den Dritten" verwenden; Dreiecke erklären |
| Schulterblick / Blickverhalten / Wahrnehmung | ja („über die eigene Schulter blicken" 2012; Blickverhalten in der TPD) | A-98, A-87, A-14 | [verifiziert] | verwenden |
| offene Stellung | ja | A-87, A-98 | [verifiziert] | verwenden |
| Spielintelligenz / Entscheidungen | ja | A-87, A-15, A-93 | [verifiziert] | verwenden |
| Einfrieren (Freeze) | ja (Trainingsblatt 2020) | A-50 | [verifiziert] | als Coachingmethode verwenden |
| Torschusszone / Schusszone, Eindribbeln/Einpassen | ja (DFB-Wettspielregeln) | A-88, A-21 | [verifiziert] | für Kinderformate |
| Nettospielzeit, Standzeiten, Ballaktionen | ja | A-01, A-87 | [verifiziert] | als Produktkennzahlen |
| Shotclock, drehendes Angriffsrecht, Hybridfeld, Anspieler*in, Provokationsregel | ja | A-87 | [verifiziert] | als Szenario-Parameter |
| Spielbeschleuniger | nur Titel eines Trainingsdialogs | Weitere Treffer | [nur Suchergebnis] | prüfen |

**Konsequenzen für SPIELIQ.**
- **Phasennavigation der UI:** Offensive, Defensive, Umschalten (DFB-Sprachgebrauch) [verifiziert A-100, A-87]; Standards als eigene SPIELIQ-Ergänzung kennzeichnen.
- **Feedback-Regeln aus DFB-Formulierungen ableiten:** ohne Ball „Gegner binden oder anspielbar sein" [verifiziert A-15]; defensiv Verschieben, Herausrücken, Absichern, Zentrum schließen [verifiziert A-87, A-14].
- **DFB-fremde Begriffe** (Halbraum, Zwischenlinienraum, Restverteidigung, Deckungsschatten, Kompaktheit) nur mit Glossar oder DFB-nahen Ersatzbegriffen verwenden; die fachliche Prüfung durch lizenzierte Trainer*innen bleibt nötig.

### 5. MEIN FUSSBALL (DFB-Wissensplattform)

**Was und wann.**
- Seit **21.10.2026**, 11 Uhr, unter meinfussball.de; zusätzlich über DFB.de und FUSSBALL.DE erreichbar; Ausspielung in sozialen Medien über den DFB-Verbandskanal [verifiziert A-73]. Gleichlautende Landesverbandsmeldungen [nur Suchergebnis A-74, A-78].
- Vorgeschichte:
  - Das Flipbook 2024 kündigte „Mein.Fußball" auf FUSSBALL.DE als künftige Informationsplattform der TPD an [verifiziert A-87]; der Trainingsdialog 8 (2025) verwies für TPD-Inhalte auf FUSSBALL.DE [verifiziert A-15].
  - DFB-Trainingsblätter von 2015 bis 2020 trugen bereits den Namen „Mein Fußball" bzw. „dfb.de/mein-fussball" [verifiziert A-50, A-98]; die ältere Meldung A-79 ist nicht mehr abrufbar (HTTP 404); „Wissenswelt" 2019 [nur Suchergebnis A-80].

**Inhalte und Struktur.**
- Laut DFB: Inhalte, Tools und Lernformate; Trainingseinheiten planen, Vereinsarbeit organisieren, Regeln nachschlagen, Lizenzstufe finden; zugeschnitten auf die jeweilige Rolle [verifiziert A-73].
- Struktur laut FUSSBALL.DE-Navigation: Trainer/in (TPD, Kinder-, Jugend- und Erwachsenenfußball), Spieler/in („Eigentraining im Fußball"; für U12 bis U15 das Talentförderprogramm), Lehrer/in, Schiedsrichter/in und Verein [verifiziert A-101; Inhalte nicht geprüft].
- Checklisten, Vorlagen, E-Learning, Trainingsplaner und Videos [nur Suchergebnis A-76]; E-Learning-Kurse unter elearning.meinfussball.de [nur Suchergebnis A-77; der TPD-Kurs selbst ist verifiziert, A-01]; im Sommer 2026 entwickeltes Online-Onboarding (eine Stunde, erstes Zertifikat) [verifiziert A-89].

**Zielgruppen.**
- Alle Rollen, vom Heimatverein über das Klassenzimmer bis zum Profiklub [verifiziert A-73].
- **Korrektur zum ersten Durchgang:** Spieler*innen sind als Zielgruppe angelegt (Bereich „Spieler/in" mit „Eigentraining im Fußball") [verifiziert A-101; Inhalte ungeprüft].

**Verhältnis zu FUSSBALL.DE und training-service.fussball.de.**
- training-service.fussball.de leitet vollständig per HTTP 301 auf meinfussball.de um; alte Artikel-URLs landen auf Rubrikseiten [verifiziert A-101]. Die im ersten Durchgang offene Migrationsfrage ist damit beantwortet.
- MEIN FUSSBALL ist ein Punkt der FUSSBALL.DE-Hauptnavigation [verifiziert A-101].
- TPD-Anbindung: Wolf nennt MEIN FUSSBALL die konsequente Fortsetzung der TPD [verifiziert A-73].

**Konsequenzen für SPIELIQ.**
- MEIN FUSSBALL ist die wichtigste DFB-Referenz und sollte als Erstes im Original geprüft werden; dafür muss meinfussball.de im Netz freigegeben werden.
- Der Spieler*innen-Bereich „Eigentraining" ist der wahrscheinlichste direkte Berührungspunkt, als Konkurrenz oder als Kooperation. Die frühere Hypothese einer Spieler*innen-Lücke ist damit zu relativieren [eigene Einordnung].
- Der DFB-Trainingsplaner kann Konkurrenz oder Schnittstelle sein [nur Suchergebnis A-76].

### 6. Spezifische Trainingsthemen (training-service.fussball.de und andere)

**Lage:** Die alten training-service-Artikel sind nicht mehr einzeln adressierbar; alle Pfade leiten auf meinfussball.de um, das gesperrt war [verifiziert A-101]. Ausgewertet wurden stattdessen die TPD-Materialien und ältere DFB-Trainingsblätter, die auf dfb.de noch abrufbar sind.

**Freilaufen, Anbieten, Passdreiecke**
- „Gegner binden oder anspielbar sein", idealerweise mit der Option, die Tiefe zu attackieren [verifiziert A-15].
- Geschicktes Freilaufen im Spiel mit Abseits; Räume „freiziehen"; Abspielmöglichkeiten in Tiefe und Breite schaffen [verifiziert A-14]; sich zum Zuspiel anbieten und aktiv entgegenstarten [verifiziert A-98].
- Spiel über den Dritten, Klatschenlassen, Steil-Klatsch-Kombinationen und gestaffeltes Nachrücken [verifiziert A-87]. Den Begriff „Passdreieck" verwendet keine der Quellen.

**Absichern, erste*r und zweite*r Verteidiger*in**
- Erste*r Verteidiger*in sowie „Herausstechen und Absichern" im 2v2 [verifiziert A-87].
- Linie verteidigen: Verschieben, Herausrücken, Absichern; eine Person rückt heraus, die anderen schließen die Mitte [verifiziert A-87, A-14]; „Abwehrdreieck" [verifiziert A-14].
- Den Begriff „zweite*r Verteidiger*in" verwendet keine der Quellen.

**Ballorientiertes Verschieben, Viererkette, Spielverlagerung**
- TPD: 4v4 auf Linie (Viererkette, Verschieben, Übergeben-Übernehmen), 5 + TW gegen 5 + TW (Viererkette plus Sechser), ein breites Feld provoziert 1v1-Duelle bei schnellen Verlagerungen [verifiziert A-87].
- A-Junioren-Blatt 2020: schnell ballorientiert verschieben, Kettenabstände, Doppeln [verifiziert A-50].
- Kinderfußball: vier Tore fördern Raumaufteilung und Spielverlagerung [verifiziert A-88].

**Raumdeckung vs. Manndeckung, defensive Grundordnung**
- Keine DFB-Gegenüberstellung gefunden. Belegt sind: „je näher zum Tor, desto näher am Mann" (Sven Bender), den gefährlicheren Gegner decken (Über-/Unterzahl), Verteidigen im Raum bzw. im Verbund [verifiziert A-87].
- „Grundordnung" nach Ballverlust [nur Suchergebnis A-59]; Abkehr vom Libero als historischer Kontext [nur Suchergebnis A-52].

**Coachingmethoden**
- Siehe Abschnitt 1 (Rolle der Trainer*innen) [verifiziert].
- Fragetechnik als ausdrückliche Methode fand sich nicht. Nahe daran sind Selbstreflexion, Entscheidungen bewusst machen und auf Lösungen hinweisen [verifiziert A-46, A-14, A-93].
- Einfrieren [verifiziert A-50]; gegenseitiges Coaching der Spieler*innen [verifiziert A-15].

**Wahrnehmung, Schulterblick, Spielintelligenz und kognitives Training**
- Blickverhalten, Orientierung zu Ball und Gegner, Kopf- und Körperbewegungen; Schulterblick vor der Ballannahme; Spielintelligenz entsteht durch Spielen [verifiziert A-87, A-98, A-15].

**Konsequenzen für SPIELIQ:**
- Für alle Kerndefizite der Zielmannschaft (Raumverständnis, Positionsspiel, Freilaufen, kollektives Verteidigen) gibt es jetzt DFB-Originalbelege mit konkretem Vokabular und U14-Feldmaßen [verifiziert A-14, A-15, A-87].
- Lücken bleiben die Begriffe zweite*r Verteidiger*in, Passdreieck und Raumdeckung. Schwellenwerte (Meter, Winkel) nennt keine Quelle.

### 7. Digitales Lernen, Videos, Apps und Bildschirmzeit

**Belegt [verifiziert]:**
- Digitale bzw. Blended-Formate in der **Trainerbildung**: TPD-E-Learning (eine Stunde) [A-01, A-89]; Online-Onboarding [A-89, A-09]; Kindertrainer-Zertifikat mit Onlinephasen sowie Basis-Coach, C- und B-Lizenz im Blended Learning [A-81]; Pro-Lizenz im Blended Learning [A-83]; MEIN FUSSBALL [A-73]; DFB-Journal als ePaper [A-19]; TeamPunkt-App mit Modul Kinderfußball zur Organisation von Festivals [A-21, A-23].
- Eigene digitale Aktivitäten des DFB: Beteiligung an Coachbetter und Projekt „Digitales Vereinsheim" [A-96]; „digitale Lösungen" als Thema der Jugendstrategie [A-94].
- Skeptische Aussagen: Mehr Bildschirmnutzung ist Teil des gesellschaftlichen Wandels, auf den die TPD reagiert [A-87]; Kinder sollen auf den Platz, bevor sie am Computer hängen (Wagner) [A-08]; Gegner-Videoanalyse gilt als Treiber der „Taktisierung" [A-92, A-09]; der Wertekodex der Talentförderung verlangt, nicht ständig online zu sein [A-46].
- Kleine digitale Hilfen im Training: Handzettel für Technikspiele per Messenger; Aktionskarten nach dem Vorbild alternativer Ligaformate [A-14]. Hausaufgabenprogramme für das Individualtraining werden empfohlen, ohne digitale Form [A-87].
- Spieler*innen-Bereich „Eigentraining" auf MEIN FUSSBALL [A-101; Inhalt ungeprüft]. Stellenanzeige „DFB-Produktwelt" [nur Suchergebnis A-84].

**Nicht gefunden** (in den abgerufenen Originalen nicht vorhanden):
- DFB-Empfehlungen zu Lern-Apps für Nachwuchsspieler*innen
- Videoanalyse für Jugendliche als Lernmittel
- Grenzen für Bildschirmzeit

Es darf also weiterhin **keine** DFB-Empfehlung oder -Billigung für Apps wie SPIELIQ behauptet werden.

**Spannung (eigene Einordnung):** Der DFB reagiert ausdrücklich auf mehr Bildschirmnutzung und weniger Bolzplatz und sieht Gegner-Videotaktik im Jugendbereich kritisch. SPIELIQ sollte daher:
- kurze Sitzungen anbieten
- jede Einheit mit einer Platzaufgabe in kleinen Spielformen verknüpfen (z. B. „heute im 4v4 ausprobieren")
- keine Gegneranalyse für Jugendteams anbieten
- Taktik spielerzentriert vermitteln
- Bildschirmzeit- und Pausenfunktionen für Minderjährige vorsehen, als eigenes Designprinzip und nicht als DFB-Vorgabe

### Einordnung: (a) Prinzipien – (b) Lösungswege – (c) kontextabhängige Vorgaben

**(a) Grundlegende Prinzipien.** Sie sind stabil und systemunabhängig und eignen sich als Feedback-Kern:
- Spieler*innen im Mittelpunkt, individuelle Qualität [verifiziert A-01, A-87]
- Freude, Intensität, Wiederholung [verifiziert A-01]
- ohne Ball Gegner binden oder anspielbar sein [verifiziert A-15]; Zugriff haben [nur Suchergebnis A-57]
- Räume im Rücken des Gegners schaffen, erkennen und nutzen [verifiziert A-15]
- alle greifen gemeinsam an, alle verteidigen gemeinsam [verifiziert A-02, A-15]
- sofortiges Umschalten in beide Richtungen [verifiziert A-87]
- Duelle offensiv und defensiv annehmen [verifiziert A-87]
- Raum so tief wie möglich und so breit wie nötig [nur Suchergebnis A-58]
- Verbund bzw. Kompaktheit vor allem ballnah [DFB-Begriff „Verbund" verifiziert A-87; Kompaktheitsstudie nur Suchergebnis A-67]

**(b) Mögliche Lösungswege.** Sie sind methodisch und variabel und eignen sich als Szenario- und Didaktikbausteine:
- kleine Spielformen 1v1 bis 4v4 in vier Formgruppen auf mehreren Feldern [verifiziert A-87]
- Spiele auf 1 Tor, drehendes Angriffsrecht, Hybridfelder [verifiziert A-14, A-87]
- Provokations- und Zonenregeln: Shotclock, Schusszone, Abseitslinie, Kontaktbegrenzung, „Tore nur direkt" [verifiziert A-87, A-15]
- Linie verteidigen/bespielen als Vorstufe des Kettenverhaltens [verifiziert A-87]
- Über- und Unterzahl als Schwierigkeitsregler [verifiziert A-87]
- Coaching in Pausen, „weniger ist mehr", Einfrieren [verifiziert A-14, A-15, A-50]

**(c) Spezifische, kontextabhängige Vorgaben.** Sie sind veränderlich und gehören parametrisiert und datiert:
- Feldmaße, Spielerzahlen, Rotation und Spielzeiten je Altersklasse (DFB-Booklet als Rahmen, regional variierend) [verifiziert A-88; regionale Werte nur Suchergebnis A-24 bis A-44]
- D-Formate in der Pilotphase; Drittel-Formate für U14 bis U16 ab 2027/28 [verifiziert A-94, A-89]
- die Richtwerte von 48 bzw. 32 Minuten (Richtwerte, keine Naturgesetze) [verifiziert A-01]
- Viererkette und 4-3-3-Positionen in einzelnen Formen [verifiziert A-87]
- Gegenpressing als Mannschaftsstrategie [verifiziert A-87, A-15]
- Spielprinzipien einzelner Vereine [verifiziert A-07 für Nürnberg; nur Suchergebnis A-62]

### Über-Vereinfachungen und mögliche Dogmen

- **„TPD heißt nur noch Kleinfeld"** ist falsch [verifiziert A-10, A-89].
- **„TPD = Funino bzw. = Kinderfußball-Spieltag"** ist falsch. Die TPD betrifft das Training, die neuen Spielformen den Wettbewerb [verifiziert A-89, A-22].
- **„Im Kinderfußball zählen keine Tore oder Ergebnisse"** ist falsch [verifiziert A-21, A-22; A-86 nur Suchergebnis].
- **„Der DFB schafft Taktik und Rondos ab"** ist falsch. Taktik bleibt, ist aber nicht mehr Ausgangspunkt der Planung [verifiziert A-89].
- **„Immer maximal breit spielen"** greift zu kurz. DFB-Formulierungen verbinden Breite halten und Tiefe bedrohen je nach Situation [verifiziert A-14, A-98]; „so breit wie nötig" [nur Suchergebnis A-58, A-68].
- **„Kompaktheit = Gesamtabstände minimieren"** ist zu einfach [nur Suchergebnis A-67]. DFB-Formulierungen betonen den Verbund und das Schließen von Lücken [verifiziert A-14].
- **„Viererkette ab Altersklasse X ist Pflicht"**: Eine DFB-Altersvorgabe gibt es nicht [verifiziert]; die entsprechende Aussage zu A-51 ist nicht gedeckt.
- **„Isolierte Technikübung oder reines Spiel"**: Beide Extreme sind Vereinfachungen. Die TPD kombiniert Spielblöcke mit einem Zwischenblock für Technik und Schnelligkeit [verifiziert A-87].
- **„Kleine Spielformen heißen weniger Leistung und Wettbewerb"** ist falsch. Wettkampfcharakter ist ein Kern der Formen [verifiziert A-14, A-89].
- **„Goldenes Lernalter"**: nicht in DFB-Originalen; die DFB-Talentseite spricht von Talenten „im besten Lernalter" [verifiziert A-45]. Die Annahme starrer Lernfenster ist wissenschaftlich umstritten [Hintergrundwissen, nicht per Suche bestätigt].

---

## Offene Punkte / Unsicherheiten (Stand nach Volltextprüfung 29.10.2026)

**A. Grundsätzlich**
1. **Nur teilweise verifiziert.** 26 Einträge des ersten Durchgangs wurden im Volltext geprüft, 16 neue DFB-Originalquellen aufgenommen (A-87 bis A-102); Details im Verifikationsprotokoll. Alle Quellen der Landesverbände, des BDFL, der Medien und der Wissenschaft (u. a. A-24 bis A-44 und A-55 bis A-71) blieben ungeprüft, weil ihre Domains gesperrt waren. Zahlen mit dem Vermerk „[nur Suchergebnis]" dürfen nicht ungeprüft in Produkt-Presets übernommen werden.
2. **MEIN FUSSBALL im Original prüfen.** www.meinfussball.de und elearning.meinfussball.de waren gesperrt. Vorrang haben der Spieler*innen-Bereich „Eigentraining", der Trainingsplaner, E-Learning und Online-Onboarding, die verwendete Terminologie sowie Nutzungs- und Lizenzbedingungen [A-73, A-101].
3. **training-service-Artikel** (Freilaufen, Passdreieck, erste*r und zweite*r Verteidiger*in, Raumdeckung, Schulterblick, Fragetechnik) sind nur noch über MEIN FUSSBALL erreichbar, sofern sie migriert wurden [A-101].
4. **Fehlerquote des ersten Durchgangs bestätigt:** mindestens drei falsche Zuordnungen von Aussagen zu Quellen (A-01, A-08, A-09/A-10), eine durch das Original nicht gedeckte Aussage (A-51) und zwei falsche Negativbefunde in der Synthese (Eindribbeln, Spieler*innen-Zielgruppe). Ungeprüfte Einträge sind entsprechend vorsichtig zu behandeln.
5. **Freigaben für eine Folgerunde:** fvn.de, nfv.de, wuerttfv.de, hfv-online.de, bfv.de, badfv.de, sbfv.de (Regionalformate D und C), bdfl.de (Leitlinien-Wortlaute), fussballtraining.com (Maßnahmenkatalog des Bundesjugendtags 2025), meinfussball.de.

**B. Inhaltliche Unsicherheiten**
6. **TPD-Datum:** geklärt (Amtsantritt Wolf 21.08.2023, Pressekonferenz 27.09.2023, Vorläufer-Video Januar 2023) [A-90, A-91, A-93].
7. **„Beste Trainingseinheit"** und **Definition von „Wiederholung":** geklärt [A-02, A-87, A-01].
8. **Trainerrolle:** weitgehend geklärt [A-87, A-93, A-14, A-15, A-46]. Offen sind ausdrückliche DFB-Aussagen zur Fragetechnik.
9. **Beschluss der Kinderfußball-Reform:** geklärt, zwei Schritte im Jahr 2022 [A-21, A-23].
10. **DFB-Feldmaße im Kinderfußball:** geklärt [A-88]. Offen bzw. widersprüchlich bleiben:
    - welche Zahl im Booklet Länge und welche Breite ist
    - Elternabstand 3 m oder 15 m und Torgröße „5,0 × 7,0" (vermutlich Tippfehler) im Booklet; Zahl der Rotationspersonen im E-4v4/5v5 (Übersicht zwei, Detailfolien drei bzw. vier)
    - Torhüter*innen regelmäßig ab F (A-21) oder ab E (A-22, A-23)
    - G-Spielzeit pro Durchgang: 5 bzw. 7 Minuten (Booklet), 7 Minuten (DFB-Seite) oder 10 Minuten (FAQ 2022)
11. **Neue Wettbewerbsformen ab 2027/28:** für U14 bis U16 bestätigt [A-89]. Offen sind die genauen Regeln, die betroffenen Ligen (über das Leistungszentrums-Niveau hinaus?), Feldgrößen, Auswechselregeln und die Beschlusslage. Der Maßnahmenkatalog des Bundesjugendtags (A-94) war nicht lesbar.
12. **D-Jugend:** weiterhin offen. Belegt sind die DFB-Pilotideen 7x7-Zwillingsspiel und 3x3 + TW [A-89]; für die DFB-Empfehlung 68 × 50 m im 9v9 fehlt ein DFB-Original [A-35].
13. **Leitlinien der Spielauffassung:** Die alten DFB-Seiten sind nicht mehr online [A-03 bis A-05]; einzelne Wortlaute sind im Trainingsdialog 8 bestätigt [A-15]. „So tief wie möglich, so breit wie nötig", „Zugriff" und „jedes Duell suchen und gewinnen" stützen sich weiterhin nur auf BDFL-Wiedergaben [A-55 bis A-58].
14. **Terminologie:** Nicht in DFB-Originalen gefunden wurden Halbraum, Zwischenlinienraum, Restverteidigung (DFB: Konterabsicherung), Kompaktheit (DFB: Verbund), Raumdeckung und Manndeckung, Deckungsschatten, Passdreieck, zweite*r Verteidiger*in und Grundordnung. Eine lizenzierte Trainerin oder ein lizenzierter Trainer (mindestens B-Lizenz mit Jugendschwerpunkt) sollte die SPIELIQ-Begriffe bestätigen.
15. **Einführungsalter:** Eine verbindliche DFB-Altersangabe für Raumdeckung, Viererkette, Verschieben, Pressing und Positionsrollen gibt es nicht. Indizien sprechen für D (Linie verteidigen) und C (Positionsspezifik) [A-87]; die Einordnung in Abschnitt 3 muss fachlich validiert werden.
16. **Zahlen im Journal (S. 66):** Die Herkunft der Vergleichswerte 3v3 gegenüber 7v7 ist nicht angegeben und vor einer Verwendung zu klären [A-89].
17. **Stützpunktzahlen:** geklärt (2023/24 knapp 350, aktuell 339) [A-46, A-45].
18. **Personen und Rollen in BDFL-Dokumenten** (Gatzmaga, von Ahlen, „Winter") sind weiterhin ungeprüft [A-57, A-69, A-71].
19. **Nicht ausgewertet:** die Videos (Best-of, Fortbildungsreihe, „Sky Matchplan Spezial") und rund 70 Seiten des Journals 3/2026, darunter das Wissenschaftler-Interview (S. 50) [A-89].

**C. Rechtliches und Produkt**
20. **Urheberrecht:** DFB-Texte, -Grafiken (Flipbook, Booklet, Journal) und -Videos nicht übernehmen. Nur Begriffe und eigene Paraphrasen verwenden, Quellen nennen. Dass DFB-Inhalte „frei zugänglich und kostenlos" sind (A-89), ist keine Nutzungslizenz.
21. **Markenrecht:** Kein DFB-Logo und keine Anmutung eines DFB-Produkts. Aussagen wie „DFB-konform" erst nach Abstimmung mit dem DFB verwenden. Der DFB baut ein eigenes digitales Ökosystem auf (MEIN FUSSBALL, Coachbetter-Beteiligung) [A-73, A-96].
22. **Fachliche Validierung:** Alle taktischen Feedback-Regeln (Kettenabstände, Verbund, „anspielbar sein") brauchen vor dem Einsatz eine Prüfung durch lizenzierte Jugendtrainer*innen. Schwellenwerte (Meter, Winkel) sind in keiner gefundenen Quelle beziffert.
