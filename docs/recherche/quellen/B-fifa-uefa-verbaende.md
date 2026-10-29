# Teilbericht B – FIFA, UEFA und weitere Verbandscurricula: taktische Prinzipien für die SPIELIQ-Bewertungsengine

Stand: 29.10.2026 (Websuche und Volltextprüfung der FIFA- und UEFA-Quellen) · Zielgruppe des Produkts: C-Jugend (U14/U15) mit Defiziten in Raumverständnis, Positionsspiel, Freilaufen und kollektivem Verteidigen

## Methodik und Status (bitte zuerst lesen)

- **Zwei Durchgänge:**
  1. **Durchgang 1 (Websuche):** Trefferlisten (Titel + URL) und automatische Zusammenfassungen des Websuche-Werkzeugs: 93 erfolgreiche Suchläufe (92 × „standard", 1 × „extended"). In diesem Durchgang konnte keine Originalseite geöffnet werden.
  2. **Durchgang 2 (Volltextprüfung am 29.10.2026):** direkter Abruf von www.fifatrainingcentre.com, www.uefa.com und editorial.uefa.com (UEFA-PDFs) per curl. Text aus HTML mit BeautifulSoup, aus PDFs mit pdftotext. Geprüft wurden der Artikeltext, Autor und Datum im Seitenkopf bzw. in den Meta-Angaben, die auf der Seite verlinkten Sessionplan-PDFs und die Frage, auf welcher Seite eine Aussage tatsächlich steht. Nicht ausgewertet wurden Videos, Grafiken und eingebettete Flipbooks. Es gab keine neue Websuche; neue Quellen stammen aus Links und Übersichtsseiten der beiden Websites.
- **Weiterhin nicht erreichbar** (je ein Versuch, Proxy-Antwort 403): fifa.com, inside.fifa.com, thefa.com, learn.englandfootball.com, ussoccer.com, footballaustralia.com.au, irishfa.com, knvb.nl, canadasoccer.com, arxiv.org, capuana.ifi.uzh.ch, wikipedia.org, uefatechnicalreports.com (UEFA-Volltextberichte), indd.adobe.com (UCL-Bericht 2023/24), player.flipsnack.com (WM-2026-Abschlussbericht der FIFA). uefadirect.uefa.com ließ sich nicht auflösen. Die Einträge zu Quellen außerhalb von FIFA Training Centre und uefa.com (B-40, B-41, B-52, B-64 bis B-93) wurden nicht geprüft, teils wegen dieser Sperren, teils weil sie nicht zum Prüfauftrag gehörten. Sie beruhen weiterhin nur auf Suchergebnissen und sind unverändert.
- **Datumsangaben:** In Durchgang 1 nur, wenn im Treffer sichtbar oder aus URL bzw. Dateiname ablesbar (so gekennzeichnet), sonst „unbekannt". In Durchgang 2 stammen die Daten aus dem Seitenkopf (FIFA Training Centre), aus „article:published_time" (UEFA) oder aus PDF-Metadaten (so gekennzeichnet). Nennen Übersichtsseiten ein anderes Datum, ist das vermerkt.
- **Kennzeichnungen im Text:**
  - (a) = grundlegendes Prinzip
  - (b) = möglicher Lösungsweg
  - (c) = spezifische, kontextabhängige taktische Vorgabe
  - [verifiziert] = in Durchgang 2 im Volltext einer FIFA- oder UEFA-Originalquelle gefunden
  - [nur Suchergebnis] = beruht nur auf Suchtreffern aus Durchgang 1
  - „Korrektur nach Volltextprüfung: …" = die Angabe aus Durchgang 1 war falsch, ungenau oder falsch zugeordnet
  - [Hintergrundwissen, nicht per Suche bestätigt] = weder durch Treffer noch durch Volltext belegt
  - [Eigene Ableitung] = Schlussfolgerung des Rechercheurs für SPIELIQ, keine Aussage einer Quelle
- **Zitate:** grundsätzlich paraphrasiert. Nur vereinzelt sehr kurze Zitate (höchstens etwa 15 Wörter) in Anführungszeichen, wo der Wortlaut für die Engine entscheidend ist. Keine längeren Übernahmen aus FIFA- oder UEFA-Texten.
- **Lesehinweis:** Einträge mit „Volltext abgerufen 29.10.2026" sind geprüft. Einträge mit „Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet" sind ungeprüft.

## Verifikationsprotokoll

**Bilanz**
- Abgerufen und ausgewertet: 108 Seiten (Artikel und Übersichtsseiten) und 30 PDFs des FIFA Training Centre, 17 Seiten auf uefa.com und 5 UEFA-PDFs (editorial.uefa.com bzw. uefa.com/newsfiles).
- 60 bestehende Einträge im Volltext geprüft: B-01 bis B-39, B-42 bis B-51, B-53 bis B-63.
- 12 neue Einträge aus Originalen: B-94 bis B-105.
- Nicht geprüft (Domain blockiert oder nicht FIFA/UEFA): B-40, B-41, B-52, B-64 bis B-93.
- Technische Hinweise:
  - robots.txt und sitemap.xml des FIFA Training Centre liefern 404. Neue Seiten wurden über Navigation, Serienübersichten und Links in Artikeln gefunden.
  - uefa.com antwortet nur ohne Browser-Kennung (mit Browser-User-Agent Abbruch mit HTTP/2-Fehler).
  - Die URL ohne „www" für die Elite-Youth-A-Seite liefert 403, die www-Fassung funktioniert.
  - Die HTML-Seite zu B-04 war nicht auffindbar (zwei plausible URLs ergaben 404); geprüft wurde das zitierte PDF.

**Abgerufene Quellen und Ergebnis je Eintrag**

| Eintrag | Abgerufen (Kurzpfad) | Ergebnis |
|---|---|---|
| B-01 | FTC …/zonal-defending/from-principles-to-practice… (11.08.2026) | bestätigt (Referenzpunkte, Dynamik, keine Zahlen); korrigiert: drei Teile statt vier Stufen, Progression endet bei drei Linien (11v11); FIFA definiert den 3. Verteidiger (Balance) |
| B-02 | FTC …/zonal-defending/zonal-defending-1.php (20.08.2026) | bestätigt; ergänzt: Organisation und Coachingpunkte aller vier Übungen, „direct, delay, deny" |
| B-03 | FTC …/deny-and-protect/defending-in-1v1…; PDFs Talent_coach_13-5, 14-3 | bestätigt; korrigiert: Sessionplan ist 13-5, nicht 14-3 (14-3 = andere Übung) |
| B-04 | PDF Talent_coach_13-2 | bestätigt; der Zusatz zur 2v2-Übung bleibt unzugeordnet |
| B-05 | FTC …/defending-with-a-back-four.php (22.03.2022); PDF Lehmann | bestätigt inkl. 6–8 m |
| B-06 | FTC …/chiba_said-defending-in-a-mid-block.php (14.06.2022); PDF | bestätigt; geklärt: ca. 3 m nur in Teil 1 auf 20 × 15 m; Auslöser-Regel „Ball unter Druck / nicht unter Druck" belegt |
| B-07 | FTC …/collective-ball-recovery-in-a-low-block.php (15.06.2022); PDF | bestätigt; geklärt: „Staffelung" = zentrale Mittelfeldspieler nicht flach; ca. 6 m Linienabstand in einer Übung; ballferner Außenverteidiger rückt ein |
| B-08 | FTC …/sessions/preventing-progression-through-central-areas.php (16.07.2024); PDF U14-Costa-Rica-session-6-new | bestätigt (FCRF = Costa Rica); korrigiert: PDF-Zuordnung; Bogenlauf gehört hierher; Seitenlinie als „zusätzlicher Verteidiger" belegt |
| B-09 | FTC …/block-and-prevent/4v4-plus-2… (30.07.2024); PDF 12-2 | bestätigt; korrigiert: Bogenlauf nicht auf dieser Seite |
| B-10 | FTC …/nec-nijmegen-u15… (21.07.2026); PDF | bestätigt |
| B-11 | FTC …/nec-nijmegen-u19… (25.06.2026); PDF | bestätigt; ergänzt: dritter Auslöser; Richtung „zu einer Seite"; Übungsfeld zwingt in Teil 2 nach innen |
| B-12 | FTC drei Mexiko-U15-Mädchen-URLs (27.12.2022, 08.11.2022); PDFs Maya-1, Maya-3 | bestätigt; die beiden Hauptseiten-URLs sind identisch |
| B-13 | FTC …/south-africa-u-15-boys… (05.12.2023); PDF | bestätigt, PDF-Zuordnung bestätigt; neu: 2–3 m Abstand im 1v1 |
| B-14 | FTC …/johnson-defending-principles.php (14.12.2021); PDF | bestätigt; ergänzt: Regeln für ballfernen Außenverteidiger |
| B-15 | FTC Session (07.01.2025) und Interview (31.12.2024); PDF Hoffenheim-1 | bestätigt; korrigiert: Übungen vermischt; Philosophie-Aussage stammt aus dem Interview |
| B-16 | FTC …/6v6-small-sided-game… (11.02.2025); PDF 06-7 | bestätigt |
| B-17 | FTC …/3v3-plus-3… (15.07.2025); PDF 15-3 | bestätigt; neu: gestaffelte Absicherung in mehreren Tiefen, „dritter Verteidiger" |
| B-18 | FTC Beach Soccer …/shepherding-your-opponent.php (21.02.2023); PDF | bestätigt (45°) |
| B-19 | FTC …/possession_moments_switch_of_play.php (11.10.2022); PDF Flores | bestätigt |
| B-20 | FTC …/3v1-rondo-fast-readjustments.php (13.05.2025); PDF 16-1 | bestätigt; korrigiert: 10-m-Dreieck steht auch auf der Seite |
| B-21 | FTC …/3v3-plus-2… (12.03.2024); PDF 2.3b | bestätigt; korrigiert: Coachingpunkte sind vorhanden |
| B-22 | PDF U14-Boys-Costa-Rica-session-10; FTC …/sessions/support-and-off-the-ball-movements.php (15.10.2024) | bestätigt; Seite gefunden |
| B-23 | FTC …/4v4-finishing-waves… (26.06.2024); PDF | bestätigt; korrigiert: Coachingpunkte vorhanden |
| B-24 | FTC …/third-player-combinations.php (08.11.2021) | bestätigt |
| B-25 | FTC …/croatia-evolving-third-player-combinations.php (19.05.2026) | bestätigt |
| B-26 | FTC …/directing-the-ball-with-the-first-touch.php (18.09.2023); PDF | bestätigt; Trainerin namentlich ergänzt |
| B-27 | FTC …/individual-actions-developing-central-midfielders.php (12.05.2026) | bestätigt; neu: PMDS-Modell |
| B-28 | PDF Clearwater_1 (+ „-new"); FTC …/u-12-clearwater… (27.05.2025) | bestätigt; Kontext ergänzt (U-12-Verein, USA) |
| B-29 | FTC Futsal #9B (26.09.2023) und #20 (10.10.2023); PDFs | bestätigt; Zuordnung geklärt (#20) |
| B-30 | FTC Research brief Aksum (30.03.2023) | bestätigt; Institution korrigiert |
| B-31 | FTC Science explained Aksum (18.05.2023) | bestätigt; ergänzt: 0,4 s pro Scan |
| B-32 | FTC Speed of the game 3 (08.11.2021) | bestätigt |
| B-33 | FTC Science explained Williams (20.04.2023) | bestätigt |
| B-34–B-36 | FTC Grassroots Essentials (20.05.2025; 04.11.2025; 22.07.2025) | bestätigt; Daten ergänzt |
| B-37 | FTC …/talent_development.php | bestätigt |
| B-38 | FTC News (23.11.2021) | bestätigt |
| B-39 | FTC …/controlling-the-game-without-the-ball… (19.05.2023) | bestätigt; korrigiert: Kriterien „stationär" und „mindestens vier hinter dem Ball" stehen im Artikel; neu: Kompaktheitswerte |
| B-42 | FTC FIFA Insight Ep. 2 (02.12.2022) | bestätigt |
| B-43 | FTC EFI-Metrikseiten (11.11.2022) | bestätigt; Teamlänge über B-44 definiert |
| B-44 | PDFs EFI v1.0 (11.10.2022) und v1.1 (11.07.2023) | bestätigt; ergänzt |
| B-45 | FTC FIFA Insight Data science (21.12.2022) | bestätigt |
| B-46–B-48 | FTC Football-Language-Glossar (04./15.11.2021) und Analyseartikel (24./25.11.2022) | bestätigt; ergänzt |
| B-49 | FTC drei Torwart-Analysen (31.05.2022; 19.05.2023; 09.08.2024) | bestätigt; Inkonsistenz 3,6/3,8 m vermerkt |
| B-50 | FTC U-17-WM 2023, Theme 3 (13.12.2023) | bestätigt; geklärt: Männerturnier |
| B-51 | FTC WM 2026 Group-stage review (30.06.2026) | bestätigt |
| B-53 | uefa.com Programmseite; Charter-PDF 2023; Artikel 01.02.2011 | bestätigt (inkl. vier Säulen, Charta 2005, Beschluss 28.06.2023) |
| B-54 | uefa.com Artikel 15.09.2020; Original-PDF Coaching Convention 2020 | teils korrigiert: zwölf Ziele statt „vier Hauptziele" |
| B-55 | uefa.com Kursseite (02.04.2021); Original-Syllabus Elite Youth A (2020) | bestätigt; neu: ausdrückliche Vorgaben zu Entscheidungstraining |
| B-56 | uefa.com Artikel 06.04.2021 und 08.04.2021; Partnerseite | bestätigt; Formulierungen teils nicht wörtlich gefunden |
| B-57 | de.uefa.com und uefa.com (27.08.2024); Real-Madrid-Artikel (06.05.2024, URL korrigiert) | bestätigt; neu: Zahlen zu Madrids Block |
| B-58 | fr.uefa.com Going 1v1 (05.02.2024) | bestätigt; Clip „diagonal" beschrieben |
| B-59 | fr.uefa.com UWCL 1v1 (19.12.2025) | bestätigt; korrigiert: Angriffs-1v1; neu: Aussagen zu Entscheidungstraining |
| B-60 | uefa.com Youth reports 2025 (17.09.2025) | korrigiert: Dreierkette und Zonen-Lenken betreffen die Frauen-Turniere |
| B-61 | de.uefa.com Schottland (15.03.2011) | bestätigt |
| B-62 | uefa.com/newsfiles/377902.pdf | bestätigt: Grassroots Newsletter Nr. 3, Dezember 2005 |
| B-63 | uefa.com Training Ground (16.05.2007), TactX (16.12.2008) | teils widerlegt: RFEF-Handbuch und Schiedsrichter stehen nicht in den Artikeln |

**Wichtigste Bestätigungen**
- Druck, Absicherung, Balance: FIFA beschreibt die drei Rollen ausdrücklich. Der 1. Verteidiger presst, der 2. sichert „hinter und innen" ab, der 3. hält auf der ballfernen, schwachen Seite die Verbindung und schützt Raum [B-01, B-94, B-17].
- Referenzpunkte der Zonenverteidigung: vorrangig Ball, Mitspieler und zu schützender Raum. Gegner und Ballrichtung kommen in mehreren Einheiten ausdrücklich hinzu; spielerorientierte Momente gibt es innerhalb einer zonalen Grundstruktur [B-01, B-07, B-12, B-102].
- Verschieben und Kompaktheit: horizontal und vertikal, Herausrücken bei Rückpass, Auslöser-Regel „Druck auf dem Ball → herausrücken/halten, kein Druck → zurückweichen" [B-05, B-06, B-95].
- Die Klassifikationsregeln für Blöcke (≥ 8 Feldspieler, Geschwindigkeit ≤ 10 km/h, 1,6 s von 2,0 s, ≥ 4 hinter dem Ball, Ende nach 0,4 s in 2,0 s) [B-39].

**Wichtigste Korrekturen**
- Progression der Zonenverteidigung: drei Teile mit Kleingruppen-Stufe (2v2, 2v3, 3v3) und drei Linien, nicht vier Stufen [B-01].
- Die „ca. 3 m" bei Chiba gelten für ein 20 × 15 m großes Übungsfeld. Der Widerspruch zu 6–8 m [B-05] erklärt sich damit über die Feldgröße [B-06].
- Lenkrichtung: Neben „nach außen" belegen FIFA-Quellen auch Pressingfallen, die den Pass bewusst nach innen einladen. Das war vorher nur Hintergrundwissen [B-96, B-11].
- Falsche Zuordnungen bereinigt: PDFs bei B-03 und B-08, Bogenlauf (B-08 statt B-09), Übungen bei B-15, Männer- statt Frauenturnier bei B-50, Frauen- statt Männerturniere bei B-60.

**Widerlegt bzw. nicht bestätigt**
- „Mindestens vier Verteidiger hinter dem Ball" sei nicht bestätigt: widerlegt, die Angabe steht im Artikel [B-39].
- „Vier Hauptziele" der Coaching Convention: nicht bestätigt, Art. 2 nennt zwölf Ziele [B-54].
- Training Ground mit RFEF-Übungen und für Schiedsrichter: in den UEFA-Artikeln nicht enthalten [B-63].

**Zahlen nach Prüfung:** 6–8 m in der Viererkette (Übung, Großfeld) [B-05]; ca. 3 m (kleines Übungsfeld) [B-06]; ca. 6 m Abstand Mittelfeld–Abwehr als Startaufstellung einer Übung [B-07]; 2–3 m zum Angreifer beim Ballempfang im 1v1 (U15) [B-13]; 45° Körperwinkel (Beachsoccer) [B-18]; deskriptive Elitewerte zur Blockgröße [B-39, B-57]. Für Absicherungsabstand und -winkel, Unterstützungsabstände nach Alter und Druckschwellen nennt keine geprüfte Originalquelle Zahlen.

---

## Quellen

### A. FIFA Training Centre – Verteidigen (individuell und kollektiv)

### [B-01] Zonal defending – From principles to practice: using a progressive methodology
- Organisation/Autor: FIFA Training Centre (FIFA), FIFA Talent Coach Programme (im Seitenkopf als Autor genannt)
- URL: https://www.fifatrainingcentre.com/en/practice/talent-coach-programme/zonal-defending/from-principles-to-practice-using-a-progressive-methodology.php
- Datum (Veröffentlichung/Aktualisierung): 11.08.2026 (Seitenkopf) [verifiziert]; Videobeispiele aus der WM 2026
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (vollständiger Artikeltext mit Lernzielen aller Teile und Fazit; Videos nicht angesehen).
  - Korrektur nach Volltextprüfung: Die Methodik hat drei Teile, nicht vier Stufen. Teil 1: individuelles Verteidigen im 1v1 und 1v2. Teil 2: Kleingruppen (2v2, unausgeglichenes 2v2 mit Rückwärtslauf, 2v3, 3v3 mit Abwehrdreieck). Teil 3: Einheiten und verbundene Linien (Viererkette; Viererkette plus zwei zentrale Mittelfeldspieler; zwei Linien im 8v10; drei Linien im 11v11). „Druck und Absicherung" ist also Teil 2, und es gibt zusätzlich die dritte Linie.
- Kernaussagen (paraphrasiert):
  - Zonenverteidigung ist ein kollektiver Ansatz. Die Position richtet sich vorrangig nach Ball, Mitspielern und den zu schützenden Räumen, nicht nach einzelnen Gegnern als Hauptreferenz [verifiziert].
  - Keine festen Zonen: Mit jeder Ballbewegung wird nachjustiert, um Druck zu geben, abzusichern, Balance herzustellen, Raum zu schützen und kompakte Abstände in und zwischen den Linien zu halten [verifiziert].
  - Teams nutzen in bestimmten Momenten stärker spielerorientierte Aktionen, behalten aber eine zonale Gesamtstruktur [verifiziert].
  - Teil 1 (1v1, 1v2): erkennen, wann Druck gegeben wird; Abstand zum Angreifer kontrollieren; wirksame Körperstellung; Spiel aus gefährlichen Zonen weglenken; den Moment fürs Tackling wählen. Im 1v2: verzögern, zentrale Räume schützen, klare Pass- und Dribbelwege begrenzen [verifiziert].
  - Teil 2: Im 2v2 lernen die Spieler die Beziehung zwischen 1. und 2. Verteidiger; der 2. unterstützt mit „angemessenem" Abstand und Winkel. Im 2v3 verzögern, das Zentrum schützen und aus gefährlichen Zonen drängen, bis Hilfe kommt. Im 3v3 das Abwehrdreieck: Der 1. Verteidiger gibt Druck, der 2. sichert ab, der 3. sorgt für Balance, indem er Raum schützt und die nächste Aktion antizipiert [verifiziert].
  - Teil 3: In einer Linie horizontale Kompaktheit und wirksame Abstände; gemeinsam verschieben; erkennen, wann die Linie hält, herausrückt oder fällt. Über zwei Linien vertikale Kompaktheit; die Qualität des Drucks auf den Ball beeinflusst die Position der unterstützenden Linie. Über drei Linien Kompaktheit in und zwischen den Linien und Pressing-Auslöser erkennen [verifiziert].
  - Defensives Umschalten: sofort Druck, wenn das die Progression verhindert oder den Ball zurückbringt; sonst zurück in eine kompakte Form und die Linien wieder verbinden [verifiziert].
  - Die Stufen sind nicht starr. Trainer können je nach Alter, Erfahrung und Entwicklungsbedarf zwischen ihnen wechseln [verifiziert].
  - Im Text stehen keine Zahlen (Meter, Winkel) [verifiziert].
- Konsequenzen für SPIELIQ:
  - Level-Struktur nach FIFA: 1v1/1v2 → 2v2/2v3/3v3 (Druck, Absicherung, Balance) → eine Linie → zwei Linien → drei Linien (11v11). Übergänge flexibel halten [Eigene Ableitung].
  - „Druckqualität am Ball bestimmt die Position der Linie" ist als Engine-Bedingung modellierbar; eine konkrete Regel liefert [B-06] [Eigene Ableitung].
  - „Halten, herausrücken, fallen" als drei Linienentscheidungen bewerten [Eigene Ableitung].

### [B-02] Zonal defending – Teil 1: individuelles Verteidigen („Building the foundations of collective defending", Conor Marlin)
- Organisation/Autor: FIFA Training Centre, Talent Coach Programme; FIFA Talent Coach Conor Marlin
- URL: https://www.fifatrainingcentre.com/en/practice/talent-coach-programme/zonal-defending/zonal-defending-1.php
- Datum (Veröffentlichung/Aktualisierung): 20.08.2026 (Seitenkopf) [verifiziert]; Übersichtsseiten nennen 19.08.2026 bzw. 01.09.2026
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Einleitung, Coachingpunkte, Organisation und Ablauf aller vier Übungen).
- Kernaussagen (paraphrasiert):
  - Vier Übungen: 1v1 von vorn (30 × 10 m mit je 5-m-Endzone), von hinten (30 × 15 m), von der Seite (20 × 20 m, Minitor im Winkel und 5-m-Tor im Außenkanal), 1v1 in einer Spielform (30 × 30 m mit Zonen; Variante ohne Zonen mit Manndeckung) [verifiziert].
  - Drei 1v1-Prinzipien: lenken, verzögern, verwehren („direct, delay, deny") [verifiziert].
  - Coachingpunkte [verifiziert]:
    - sofort Druck auf den Ballführenden, damit er keinen Schwung aufnimmt; den Empfänger vor der ersten Berührung stellen
    - aus der Nähe verzögern und Vorwärtsspiel verhindern
    - seitliche Körperstellung, um auf die schwächere Seite zu lenken; aus zentralen Zonen weg und auf den schwächeren Fuß
    - beim Verteidigen von der Seite die Innenbahn blockieren und an der Seitenlinie entlang nach außen lenken; Anlauf im Winkel auf das innere Bein des Empfängers
    - nicht über den Ball hinaus übercommitten
    - von hinten: schnell Kontakt aufnehmen, das Aufdrehen verhindern, den richtigen Moment zum Vorbeigehen erkennen
    - geduldig bleiben, wenn man von der Seite verteidigt
  - In der Spielform schließen absichernde Spieler in anderen Zonen die zentralen Passwege [verifiziert].
- Konsequenzen für SPIELIQ:
  - Szenario-Bausteine „1v1 frontal / von hinten / seitlich"; die Feldmaße eignen sich als Vorlage.
  - Die Lenkrichtung hat zwei Ziele (weg vom Zentrum, auf den schwachen Fuß), die kollidieren können, etwa bei einem Linksfuß auf der rechten Seite. Die Seite löst den Konflikt nicht; die Engine braucht eine Priorität oder Toleranz [Eigene Ableitung].
  - „Nicht über den Ball hinaus" als prüfbares Fehlerbild: Der Verteidiger steht neben oder vor dem Ball statt torseitig [Eigene Ableitung].

### [B-03] Defending in 1v1: orientating attackers away from goal (Deny and protect)
- Organisation/Autor: FIFA Training Centre, Talent Coach Programme (Seitenkennung „13_5"); Sessionplan-PDF „Talent_coach_13-5"
- URL: https://www.fifatrainingcentre.com/en/practice/talent-coach-programme/deny-and-protect/defending-in-1v1-orientating-attackers-away-from-goal.php ; PDF (auf der Seite verlinkt): https://www.fifatrainingcentre.com/media/native/practice/Talent_coach_13-5.pdf ; zum Vergleich geprüft: https://fifatrainingcentre.com/media/native/practice/talent-coach-programme/Talent_coach_14-3.pdf
- Datum (Veröffentlichung/Aktualisierung): 30.09.2025 (Seitenkopf; PDF-Metadaten ebenfalls 30.09.2025) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seite vollständig, PDF 13-5, PDF 14-3).
  - Korrektur nach Volltextprüfung: Zu dieser Seite gehört das PDF 13-5, nicht 14-3. Das PDF 14-3 ist eine andere Übung („Attack v. defence: Outplaying defenders in wide channels", PDF vom 10.12.2024). Dort sollen Verteidiger den Flügelangreifer zur Seitenlinie lenken und ihm den direkten Weg zum Tor nehmen; den Angreifern wird geraten, nach innen zu ziehen, wenn der Druck dort Raum lässt.
- Kernaussagen (paraphrasiert):
  - 1v1 an der Strafraumgrenze im Winkel zum Tor. Ziel ist, den Angreifer nach außen zu leiten und nicht innen vorbeizulassen [verifiziert].
  - Tiefe, seitliche Körperstellung; Annäherung im Winkel [verifiziert].
  - Beim Ballempfang des Angreifers weder in Bewegung noch aus dem Gleichgewicht sein; mit kurzen, kontrollierten Schritten abbremsen [verifiziert].
  - Kernentscheidung: angreifen oder in kurzem Abstand bleiben [verifiziert].
  - Der Pass zum Angreifer ist der Auslöser fürs Herausrücken [verifiziert].
  - Zielgruppe laut Seite: vor allem Innenverteidiger an der Strafraumgrenze mit Raum im Rücken gegen einen Angreifer mit Tempo; übertragbar auf jeden Spieler, der im Rückwärtsgehen einen Abschluss verhindern muss [verifiziert].
- Konsequenzen für SPIELIQ:
  - Die Vorgabe ist kontextgebunden (tornah, Innenverteidiger, Angreifer im Winkel) und darf nicht als globale Regel „immer außen" übernommen werden.
  - Prüfbare Merkmale: torseitige Position; Anlaufwinkel, der die Innenbahn schließt; abgebremstes Tempo beim Ballempfang des Angreifers [Eigene Ableitung].

### [B-04] 1v2 Attack v. Defence: Defending outnumbered (Talent-Coach-PDF 13-2)
- Organisation/Autor: FIFA Training Centre, Talent Coach Programme
- URL: https://www.fifatrainingcentre.com/media/native/practice/talent-coach-programme/Talent_coach_13-2.pdf
- Datum (Veröffentlichung/Aktualisierung): unbekannt; PDF-Metadaten: erstellt am 20.03.2025
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (PDF vollständig). Die zugehörige HTML-Seite wurde nicht gefunden.
- Kernaussagen (paraphrasiert):
  - Feld 20 × 10 m mit gedachter Mittellinie; Minitor 3 m hinter einem Ende [verifiziert].
  - Nach dem Zuspiel auf einen der beiden Außenspieler entscheidet der Verteidiger, ob er herausrückt oder seine Position hält [verifiziert].
  - Den Druck so anwinkeln, dass aus dem 1v2 ein 1v1 wird; den Körper zu der Zone ausrichten, die geschlossen werden soll [verifiziert].
  - Diagonal zurückweichen, um die Passlinie zwischen den beiden Angreifern zu schneiden und das Tor zu schützen [verifiziert].
  - Im richtigen Moment pressen, z. B. nach einer schlechten oder nach hinten gerichteten ersten Berührung. Schwache Pässe erlauben, schon während des Balllaufs eng heranzukommen [verifiziert].
  - Die frühere Zusatzaussage aus einer Talent-Coach-2v2-Übung (geringe Abstände zwingen den Gegner zum Pass nach außen) steht nicht in diesem PDF. Ihre Herkunft bleibt unklar [nur Suchergebnis].
- Konsequenzen für SPIELIQ:
  - In Unterzahl „Passlinie schneiden und Tor schützen" höher gewichten als „Ball attackieren".
  - Auslöser wie schlechte Ballannahme oder schwacher Pass als Ereignis modellieren, das Attackieren rechtfertigt.

### [B-05] Defending with a back four (Jens Lehmann)
- Organisation/Autor: FIFA Training Centre, Elite sessions; Jens Lehmann (laut Seite ehemaliger Torwart und Co-Trainer von Arsenal); Sessionplan-PDF
- URL: https://fifatrainingcentre.com/en/practice/elite-sessions/out-of-possession/defending-with-a-back-four.php ; PDF: https://www.fifatrainingcentre.com/media/native/test/FIFA_session plan_Lehmann.pdf
- Datum (Veröffentlichung/Aktualisierung): 22.03.2022 (Seitenkopf, Seitentitel „Jens Lehmann: Foundations for a back four"; PDF ebenfalls 22.03.2022) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seite und PDF vollständig).
- Kernaussagen (paraphrasiert):
  - Lehmann baut mit einer Mädchengruppe (Alter nicht genannt) eine funktionierende Viererkette auf [verifiziert].
  - Ablauf: 6v5 auf 25 × 50 m mit vier Minitoren (Verteidiger 4-1 gegen 3-3; Breite verteidigen) → 6v4 + TW auf einer Hälfte → 7v6 + TW (Angreifer 5-2 gegen 4-2) [verifiziert].
  - Coachingpunkte [verifiziert]:
    - kompakte, gerade Linie, die sich gemeinsam bewegt und schnell seitlich verschiebt
    - 6–8 m Abstand zwischen den Verteidigern, nie mehr als 6–8 m, damit keine Lücken entstehen
    - den Gegner um das Zentrum herum statt hindurch zwingen
    - Auslöser zum Herausschieben nutzen, besonders bei Rückpässen
    - spielt der Gegner zentral, bleibt die Kette eng; Breite wird erst verteidigt, wenn der Ball nach außen geht
    - Angreifer im Strafraum werden immer gedeckt; im tiefen Block und im Strafraum organisieren die Innenverteidiger die Zuordnung
    - guter Abstand zwischen Abwehr und Mittelfeld (ohne Zahl); „Defensive triangle" als Prinzip in Teil 3
    - Torwart und Abwehr kommunizieren
- Konsequenzen für SPIELIQ:
  - Einzige FIFA-Zahl für Abstände innerhalb einer Viererkette auf großem Feld, aber an diese Einheit gebunden. Nur als Startwert eines kalibrierbaren Parameters nutzen, nicht als Norm.
  - „Linie rückt bei Rückpass nach" ist eine gut prüfbare Ereignisregel (c).
  - Breite abhängig von der Ballposition: zentral eng, Breite erst bei Ball außen [Eigene Ableitung].

### [B-06] Defending in a mid-block (Saïd Chiba)
- Organisation/Autor: FIFA Training Centre, Elite sessions; Saïd Chiba (laut Seite ehemaliger Co-Trainer Marokkos, aktuell U17-Trainer); Sessionplan-PDF
- URL: https://www.fifatrainingcentre.com/en/practice/elite-sessions/out-of-possession/chiba_said-defending-in-a-mid-block.php ; PDF: https://www.fifatrainingcentre.com/media/native/test/FIFA_Session_Plan_Chiba-updated.pdf
- Datum (Veröffentlichung/Aktualisierung): 14.06.2022 (Seitenkopf; PDF 15.06.2022) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seite und PDF vollständig).
  - Korrektur nach Volltextprüfung: Die „ca. 3 m" stammen aus Teil 1, dem Spiel „rivière" (3 + 3 gegen 4) auf einem 20 × 15 m großen Feld mit drei gleich breiten Zonen. Die vier Verteidiger stehen in der Mittelzone und halten dort etwa 3 m zum Nebenmann. Die Zahl gilt also für ein sehr kleines Übungsfeld.
- Kernaussagen (paraphrasiert):
  - Der Mittelfeldblock kontrolliert Zentrum und Raum hinter der Abwehr, verlangsamt den Gegner und lenkt ihn in risikoärmere Zonen [verifiziert].
  - Drei Teile mit 22 Spielern: Anlaufen, Absichern und Verschieben (rivière) → 10-gegen-10-Stopp-Ball auf einem Dreiviertelfeld in Strafraumbreite → 11v11 [verifiziert].
  - Oberste Priorität ist der zentrale Kanal. Geduld: Der Gegner darf in seiner Aufbauzone zirkulieren; Zuspiele zwischen die Linien und in Lücken werden verhindert. Der Mittelstürmer soll nicht übercommitten, damit möglichst lange zehn Spieler hinter dem Ball verteidigen [verifiziert].
  - Rollen: Der Ballnächste presst, nahe Mitspieler sichern ab (im rivière die diagonalen Passlinien), der Rest verschiebt als Einheit. Innenverteidiger und defensive Mittelfeldspieler steuern die Formation [verifiziert].
  - Auslöser-Regel für die Kette: Steht der Ballführende unter Druck, kann die Abwehr herausrücken oder halten. Steht er nicht unter Druck, droht ein langer Ball, und die Abwehr muss zurückweichen können. Dafür ist eine halboffene Körperstellung nötig („three-quarter position") [verifiziert].
  - Löst sich ein Gegner frei zwischen den Linien, rückt ein Verteidiger heraus und die Nebenleute verschieben. Er kehrt zurück, sobald die Gefahr vorbei ist oder ein Mitspieler übernimmt [verifiziert].
  - Ballnahe Spieler blockieren Passlinien, indem sie zwischen Ball und mögliche Empfänger gehen. Die ballfernsten Spieler verschieben, um die Abstände zu halten, und lassen den gegenüberliegenden Flügel offen [verifiziert].
  - Der Block lenkt in risikoärmere Zonen, meist auf die Flügel, und gewinnt dort an der Seitenlinie mit Überzahl den Ball. Das Tempo des Verschiebens richtet sich nach dem Tempo des Balls [verifiziert].
- Konsequenzen für SPIELIQ:
  - Die Rollenverteilung (einer presst, die Nächsten sichern, der Rest verschiebt) ist die zentrale Regel gegen das „alle zum Ball"-Problem der Zielgruppe (a).
  - Die Auslöser-Regel „Druck auf dem Ball → herausrücken oder halten; kein Druck → zurückweichen" ist direkt als Engine-Bedingung umsetzbar (a/c).
  - Die 3 m und die 6–8 m aus [B-05] widersprechen sich nicht, sie spiegeln unterschiedliche Feldgrößen. Abstände relativ zur Feldbreite parametrisieren [Eigene Ableitung].

### [B-07] Collective ball recovery in a low block (Oumarou Diabaté)
- Organisation/Autor: FIFA Training Centre, Elite sessions; Oumarou Diabaté (laut Seite ehemaliger Trainer Nigers) mit 18 jungen Spielern; Sessionplan-PDF
- URL: https://fifatrainingcentre.com/en/practice/elite-sessions/out-of-possession/collective-ball-recovery-in-a-low-block.php ; PDF: https://www.fifatrainingcentre.com/media/native/test/FIFA_Session_Plan_colletive ball revovery.pdf
- Datum (Veröffentlichung/Aktualisierung): 15.06.2022 (Seitenkopf; PDF ebenfalls 15.06.2022) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seite und PDF vollständig).
  - Korrektur nach Volltextprüfung: Der Coach ist Oumarou Diabaté. „Staffelung der Linien" wird im Text konkretisiert: Die beiden zentralen Mittelfeldspieler sichern sich gegenseitig ab und sollen deshalb nicht flach nebeneinander stehen; rückt einer heraus, schiebt der andere hinter ihn.
- Kernaussagen (paraphrasiert):
  - Der tiefe Block verkleinert den Raum hinter der letzten Linie und zwischen den Linien; das hilft gegen schnelle Angreifer [verifiziert].
  - Er verlangt Geduld, Disziplin, Kommunikation und Aggressivität beim Ballgewinn [verifiziert].
  - Die Positionierung richtet sich laufend nach Ort und Richtung des Balls, nach den Gegnern, dem Raum und den Mitspielern [verifiziert].
  - Prinzipien: Pressen, Absichern, seitlich Verschieben; gegenseitige Absicherung zwischen den Linien; Staffelung; Kompaktheit auf der Ballseite; synchronisierte Bewegungen; torseitig kompakt bleiben und den Schusswinkel verengen [verifiziert].
  - Der Pressende verlangsamt beim Anlaufen und versucht, den Vorwärtspass zu blockieren. Nach einem Querpass kehrt er sofort in die Linie zurück [verifiziert].
  - Die Abwehrspieler folgen jeweils dem Mittelfeldspieler vor ihnen; rückt ein Mittelfeldspieler heraus, rückt der Verteidiger hinter ihm mit. Einen Pass nach außen nicht vorschnell antizipieren, sonst öffnet sich das Zentrum [verifiziert].
  - Ballferne Balance: Der ballferne Außenverteidiger rückt ein, um mit den Innenverteidigern kompakt zu sein und Flanke oder Seitenwechsel verteidigen zu können. Der ballferne Außenmittelfeldspieler lässt sich in die Kette fallen, wenn der ballnahe Außenverteidiger herausrückt [verifiziert].
  - Zahl: Im analytischen Teil (8 + TW gegen 4 auf halbem Feld) stehen die vier Mittelfeldspieler zu Beginn etwa 6 m vor der Abwehr [verifiziert]. Das ist eine Startaufstellung, keine Norm.
  - Der Torwart dirigiert und rückt mit dem Block auf, um Bälle hinter die Kette abzulaufen [verifiziert].
  - Ablauf: Aufwärmen mit 8v4-Zonenspiel (20 × 20 m, vier 5-m-Zonen) → 8 + TW gegen 4 → 6v6 + TW → 6 + 2 gegen 8 + TW → Abschlussspiel (die Seite nennt es uneinheitlich 9v9 bzw. 9 gegen 8 + TW) [verifiziert].
- Konsequenzen für SPIELIQ:
  - „Kompaktheit auf der Ballseite" und „Absicherung zwischen den Linien" lassen sich direkt prüfen: Dichte der Verteidiger in der ballnahen Zone, vertikaler Versatz der Linien.
  - Prüfregel für Mittelfeldpaare: nicht auf gleicher Höhe, wenn einer presst [Eigene Ableitung auf Basis von B-07 und B-17].
  - Das Einrücken des ballfernen Außenverteidigers ist ein eigenes Balance-Kriterium (a).

### [B-08] Preventing progression through central areas (FCRF Talent Development, „Girls session 2")
- Organisation/Autor: FIFA Training Centre, Talent Coach Programme (FCRF Talent Development); FIFA-Talent-Coach Claudio García und Lina Arana, Talent-Coach des Costa-ricanischen Verbands; Gruppe von Mädchen
- URL: https://www.fifatrainingcentre.com/en/practice/talent-coach-programme/sessions/preventing-progression-through-central-areas.php ; PDF (auf der Seite verlinkt): https://www.fifatrainingcentre.com/media/native/test/U14-Costa-Rica-session-6-new.pdf
- Datum (Veröffentlichung/Aktualisierung): 16.07.2024 (Seitenkopf; PDF 15.07.2024) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seite und PDF vollständig).
  - Korrektur nach Volltextprüfung: FCRF ist der Costa-ricanische Verband (die Seite nennt die Costa Rican Football Association). Das Alter steht nicht auf der Seite; der PDF-Dateiname nennt U14. Das PDF „Talent coach 12-2" gehört nicht hierher, sondern zu [B-09]. Die Einheit hat fünf Teile, nicht drei.
- Kernaussagen (paraphrasiert):
  - Ablauf: Passkreis → 4v2-Ballbesitz (25 × 15 m) → 4v4 (25 × 25 m, drei Kanäle) → 4 + 1 gegen 2 (30 × 30 m) → 7v7 + 3 Neutrale auf 60 × 50 m [verifiziert].
  - Eine kompakte Formation, die sich an Position und Passoptionen des Ballführenden ausrichtet, schließt das Zentrum. Hohes Pressing oder Mittelfeldblock sind ohne Organisation oft wirkungslos [verifiziert].
  - Pressende Spieler nähern sich dem Empfänger seitlich und im Bogen, um Passwege zu schließen, und kommen auf Armlänge heran [verifiziert].
  - Paar-Pressing: Der Nächste presst zuerst, der Partner sichert ab und antizipiert den nächsten Pass [verifiziert].
  - Nach außen zwingen und dabei die Seitenlinie als „zusätzlichen Verteidiger" nutzen [verifiziert].
  - Erkennen, wann aggressiv gepresst und wann abgesichert bzw. eine Passlinie geschnitten wird; dabei den wahrscheinlichsten Pass antizipieren [verifiziert].
  - Beim hohen Pressing auf Bewegungen im Rücken achten. Ist der Ball außen, die Seite zuschieben, um den Ballverlust zu erzwingen [verifiziert].
- Konsequenzen für SPIELIQ:
  - Bewerten, ob die Formation auf die Passoptionen des Ballführenden reagiert, nicht nur auf die Ballposition. Technisch heißt das: gesperrte und offene Passlinien zählen.
  - Organisation zählt mehr als die Höhe des Blocks (a).
  - Seitenlinie als Verbündeter: beim Lenken nach außen die verbleibenden Passwinkel des Ballführenden zählen [Eigene Ableitung].

### [B-09] 4v4 plus 2 possession game: protecting central areas (Block and prevent)
- Organisation/Autor: FIFA Training Centre, Talent Coach Programme (Seitenkennung 12-2); Sessionplan-PDF „Talent_coach_12-2"
- URL: https://fifatrainingcentre.com/en/practice/talent-coach-programme/block-and-prevent/4v4-plus-2-possession-game-protecting-central-areas.php ; PDF: https://fifatrainingcentre.com/media/native/practice/talent-coach-programme/Talent_coach_12-2.pdf
- Datum (Veröffentlichung/Aktualisierung): 30.07.2024 (Seitenkopf; PDF ebenfalls 30.07.2024) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seite und PDF).
  - Korrektur nach Volltextprüfung: Das Anlaufen im Bogen steht nicht auf dieser Seite, sondern in [B-08].
- Kernaussagen (paraphrasiert):
  - Die Verteidiger bilden eine 2-2-Struktur, stehen eng beieinander und verdichten um die zentralen Gegenspieler; Passwege zu ihnen werden geschlossen [verifiziert].
  - Sie ordnen sich mit jeder Ballbewegung neu. Kommt der Ball ins Zentrum, rücken sie schnell auf den Gegner heraus [verifiziert].
  - Die vorderen zwei entscheiden zwischen Pressen und dem Abschirmen von Pässen auf die Nummer 6 oder 8. Die hinteren zwei bleiben eng zusammen und rücken auf Empfänger innerhalb der Form heraus [verifiziert].
  - Ziel ist, den Gegner nach außen zu zwingen. Fehlerbild: zu große Abstände, die Pässe auf den zentralen Angreifer zulassen [verifiziert].
  - Feld 18 × 25 m; 4v4 plus Neutraler und Torwart [verifiziert].
- Konsequenzen für SPIELIQ:
  - Deckungsschatten der vorderen Reihe als Kriterium für das Anlaufen (b).
  - Der Abstand innerhalb einer Zweierreihe ist ein Fehlerkriterium („Lücke für den zentralen Pass") [Eigene Ableitung].

### [B-10] NEC Nijmegen U-15: Foundations for defensive compactness and pressing (Niels Voet)
- Organisation/Autor: FIFA Training Centre, Elite sessions (niederländische Akademien); Cheftrainer Niels Voet; PDF
- URL: https://www.fifatrainingcentre.com/en/practice/elite-sessions/clubs-and-academies/dutch-academies/nec-nijmegen-u15-foundations-for-defensive-compactness-and-pressing.php ; PDF: https://www.fifatrainingcentre.com/media/native/practice/Nijmegen_U15_V2.pdf
- Datum (Veröffentlichung/Aktualisierung): 21.07.2026 (Seitenkopf; PDF ebenfalls 21.07.2026) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seite vollständig; PDF heruntergeladen).
- Kernaussagen (paraphrasiert):
  - Eine kompakte Defensivformation soll zur Angriffswaffe werden: Zentrum schützen, Gegner nach hinten zwingen, Ball in gefährlichen Zonen erobern, dann kontern [verifiziert].
  - Progression: 5v4 (3-1-Struktur, 40 m langes Feld in voller Breite) → 8v8 (2-1-4-1 gegen 1-4-2-1, 60 m) → 11v11 [verifiziert].
  - Coachingpunkte [verifiziert]:
    - Pressing mit klarem Timing und Intensität
    - kompakt bleiben, gemeinsam verschieben, die Abwehrlinie verbunden halten
    - zentrale Passwege schließen und Vorwärtspässe blockieren
    - die Nummer 9 lenkt den ballführenden Innenverteidiger zu einer Seite und nimmt ihm den Seitenwechsel
    - die tiefere Nummer 10 sichert ab und schützt den Raum hinter dem Pressing
    - die Nummer 8 oder 10 blockiert den Vorwärtspass und attackiert den Gegner, der mit dem Rücken zum Tor annimmt
    - den Gegner nach außen, nach hinten oder in ein Entscheidungsdilemma zwingen
    - nach Ballgewinn schnell und direkt umschalten
- Konsequenzen für SPIELIQ:
  - Genau die Zielaltersgruppe (U15). Die Progression 5v4 → 8v8 → 11v11 taugt als Level-Vorlage.
  - Prüfbare Kriterien: Vorwärtspass im Deckungsschatten; „Annahme mit dem Rücken zum Tor" als Pressing-Auslöser; ein Anlaufwinkel, der den Seitenwechsel abschneidet.

### [B-11] NEC Nijmegen U-19: Denying central progression in a 4-4-2 versus a 4-3-3 (Robert de Pauw)
- Organisation/Autor: FIFA Training Centre, Elite sessions; Cheftrainer U19 Robert de Pauw; PDF
- URL: https://www.fifatrainingcentre.com/en/practice/elite-sessions/clubs-and-academies/dutch-academies/nec-nijmegen-u19-denying-central-progression-in-a-4-4-2-versus-a-4-3-3.php ; PDF: https://www.fifatrainingcentre.com/media/native/practice/Nijmegen_U19.pdf
- Datum (Veröffentlichung/Aktualisierung): 25.06.2026 (Seitenkopf; PDF 01.07.2026) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seite vollständig; PDF heruntergeladen).
  - Korrektur nach Volltextprüfung: Es gibt drei Auslöser, nicht zwei: schlechte Ballmitnahme, Rückpass, Empfänger mit Blick zum eigenen Tor. Zur Richtung heißt es in den Key coaching points „nach außen", in Teil 1 und im 11v11 dagegen „zu einer Seite". In Teil 2 ist das Feld in der eigenen Hälfte diagonal abgeschnitten, was das Spiel nach innen zwingt und Pressingsituationen schafft. Das ist Übungsgestaltung, kein Coachingpunkt.
- Kernaussagen (paraphrasiert):
  - Progression: 6v6 (2-2-2, 35 × 32 m) → 8v8 + TW (2-4-2 gegen 1-4-3-1, 60 m) → 4-4-2 im 11v11 gegen 4-3-3 [verifiziert].
  - Kompakt bleiben, enge Abstände halten, gemeinsam verschieben und über die erste Linie den Zugang zum Zentrum schließen [verifiziert].
  - Bei zwei Stürmern presst einer, der andere schirmt den zentralen Passweg ab; die Rollen wechseln mit dem Ball [verifiziert].
  - Mit gekrümmten Laufwegen anwinkeln, um zu einer Seite bzw. nach außen zu lenken und den Vorwärtspass zu verhindern; nicht geradlinig hinterherlaufen [verifiziert].
  - Spielt der Gegner zwischen die beiden Stürmer, rückt der nächste zentrale Mittelfeldspieler aggressiv heraus, die anderen sichern dahinter [verifiziert].
  - Bei Ballverlust sofort Gegenpressing oder zentral zurück und kompakt werden. Nach Ballgewinn ein schneller erster Pass nach vorn aus dem Druck heraus [verifiziert].
- Konsequenzen für SPIELIQ:
  - „Einer presst, einer schirmt ab" ist eine einfache, prüfbare Regel für die erste Linie (b/c).
  - Ein Katalog von Auslösern (schlechte Annahme, Rückpass, Annahme mit Blick zum eigenen Tor) ermöglicht situatives Feedback.
  - Die Richtung ist ausdrücklich teamabhängig („zu einer Seite"); die Engine muss sie als Einstellung führen (c).

### [B-12] Mexico U-15 girls: Defensive shifting and organised pressing (Karla Maya)
- Organisation/Autor: FIFA Training Centre, Elite sessions; damalige Cheftrainerin Karla Maya, Assistent Miguel Gamero
- URL: https://www.fifatrainingcentre.com/en/practice/elite-sessions/out-of-possession/defensive-shifting-and-organised-pressing.php (gleicher Titel: https://www.fifatrainingcentre.com/en/practice/elite-sessions/youth-national-teams/mexico-u15-girls-/defensive-shifting-and-organised-pressing.php) ; verwandt: https://www.fifatrainingcentre.com/en/practice/elite-sessions/youth-national-teams/mexico-u15-girls-/defensive-phase-and-pressing.php
- Datum (Veröffentlichung/Aktualisierung): 27.12.2022; verwandte Einheit 08.11.2022 (jeweils Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (alle drei URLs; die beiden URLs der Hauptseite liefern identischen Inhalt; PDFs „FIFA_Session_Plan_Maya-3-new" und „…Maya-1" heruntergeladen).
- Kernaussagen (paraphrasiert):
  - Nach Ballverlust die Linien schnell neu ordnen und einen kompakten Block bilden. Das Team soll lernen, gemeinsam zu verschieben und organisiert zu pressen [verifiziert].
  - Ablauf: Pass- und Laufkreis (Körperstellung) → 11v11 Angriff gegen Abwehr auf einem in drei Kanäle geteilten Feld → 11v11 auf Dreiviertelfeld mit 25 m breiten Außenkanälen und 40 m breitem Zentrum; 20 Feldspielerinnen, 3 TW [verifiziert].
  - Mitspielerinnen als Referenzpunkt nutzen, um kompakt und gut positioniert zu pressen; aushelfen, wenn der Ball an einem vorbei ist [verifiziert].
  - Im 3-4-1-2-Hochpressing des Schlussspiels wird Mann gegen Mann verteidigt [verifiziert].
  - „Blind-side press": Die Stürmerin presst die ballführende Mittelfeldspielerin aus deren totem Winkel [verifiziert].
  - Verwandte Einheit: 4v4-Pressing in einem 9v9 auf 40 × 40 m (Hütchen 4 m vor der Mittellinie als Referenz für die Kette) und 2v1-Überzahlpressing auf 55 × 45 m; Kommunikation und Absicherung als Schlüssel [verifiziert].
- Konsequenzen für SPIELIQ:
  - Längskanäle als Hilfe beim Verschieben. Prüfbar: Steht der Block im richtigen Kanal? [Eigene Ableitung]
  - Mitspieler als Referenz: Abstand zum nächsten Mitspieler als Kriterium neben der Ballposition [Eigene Ableitung].

### [B-13] South Africa U-15 boys: Fundamentals of attacking and defending (Vela Khumalo)
- Organisation/Autor: FIFA Training Centre, Elite sessions; Cheftrainer Vela Khumalo, Assistent Lazarus Kgosana; Sessionplan-PDF „FIFA_Session_Plan_sundowns-u15-new" (auf der Seite verlinkt)
- URL: https://www.fifatrainingcentre.com/en/practice/elite-sessions/youth-national-teams/south-africa-u15/south-africa-u-15-boys-team-fundamentals-of-attacking-and-defending.php ; PDF: https://fifatrainingcentre.com/media/native/test/FIFA_Session_Plan_sundowns-u15-new.pdf
- Datum (Veröffentlichung/Aktualisierung): 05.12.2023 (Seitenkopf; PDF 15.01.2024) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seite und PDF). Die Zuordnung des PDF ist durch den Link auf der Seite bestätigt.
- Kernaussagen (paraphrasiert):
  - Grundprinzipien von Angriff und Abwehr zur Vorbereitung auf ein U15-Turnier im Dezember 2023 [verifiziert].
  - Defensiv: 1v1, dann Unterzahl 1v2, 2v3, 3v4, 4v5 auf halbem Feld; danach 6v6 (4-2) und ein Abschlussspiel mit zwei Neutralen (in der Übersicht 4v4 + 2, im Text 5v5 + 2 auf 75 × 30 m) [verifiziert].
  - 1v1: eng am Gegner bleiben, innen pressen und ihn auf die schwächere Seite oder nach außen zwingen [verifiziert].
  - 1v1: den Abstand verkürzen, wenn der Angreifer den Ball zu weit vorlegt oder gerade berührt hat; nicht zu weit weg stehen. Beim Ballempfang des Angreifers soll der Verteidiger innerhalb von 2–3 m sein [verifiziert].
  - 1v2: schnell anlaufen, aber mit dem Eingreifen warten, sonst bekommt der zweite Angreifer Raum. 2v3: einer attackiert, der andere ist bereit für den möglichen Empfänger. 3v4: einer presst, die anderen schließen Passoptionen. 4v5: kompakt bleiben und bei Seitenwechsel verschieben [verifiziert].
  - Offensiv: schießen, sobald sich eine Chance bietet; vorwärts spielen und vorwärts unterstützen [verifiziert].
- Konsequenzen für SPIELIQ:
  - Die Unterzahl-Progression 1v2 → 4v5 erzwingt Rollendisziplin und passt zum Defizit „mehrere laufen gleichzeitig zum Ball" [Eigene Ableitung].
  - Die 2–3 m sind die einzige gefundene FIFA-Zahl für den Druckabstand im 1v1, und sie stammen aus einer U15-Einheit. Als dokumentierter Startwert für „direkten Druck" verwendbar, kalibrierbar [Eigene Ableitung].

### [B-14] Defending principles for individuals and small groups (Michael Johnson)
- Organisation/Autor: FIFA Training Centre, Elite sessions; Michael Johnson (laut Seite ehemals Derby County und Birmingham City, Co-Trainer England U18); PDF
- URL: https://fifatrainingcentre.com/en/practice/elite-sessions/out-of-possession/johnson-defending-principles.php ; PDF: https://www.fifatrainingcentre.com/media/native/test/FIFA_Session_Plan_Johnson_Defense.pdf
- Datum (Veröffentlichung/Aktualisierung): 14.12.2021 (Seitenkopf; PDF 25.02.2022) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seite und PDF).
- Kernaussagen (paraphrasiert):
  - Fokus: hohes Pressing und Mittelfeldblock; erst kleine Einheiten, dann größere [verifiziert].
  - Ablauf: 8v6 für Sturm und Mittelfeld (im Text 7 + TW gegen 6) → 2v2 und 3v2 für die Innenverteidiger (hohe Bälle, Flanken, Klärungen) → 6v5 für die Außenverteidiger → 11v11 [verifiziert].
  - Der Mittelstürmer läuft so an, dass der Innenverteidiger in Fallen oder schwierige Pässe gedrängt wird. Die Flügelstürmer blockieren Pässe auf die Außenverteidiger [verifiziert].
  - Kommt der Ball zum Außenverteidiger, ordnet sich das Mittelfeld neu: Der nächste Mittelfeldspieler rückt heraus, der fernste rückt ins Zentrum ein [verifiziert].
  - Hat der Flügelspieler außen den Ball, lässt der Außenverteidiger ihm keinen Raum, nach innen zu ziehen; die übrige Abwehr verschiebt. Wird der Außenverteidiger überspielt, schließt der nächste Verteidiger die Lücke [verifiziert].
  - Der ballferne Außenverteidiger darf seinen Flügelspieler lösen und einrücken, solange er ihn im Blick behält. Den ungefährlichsten Gegner freilassen und sich auf die unmittelbare Gefahr konzentrieren [verifiziert].
  - Zwischen torseitiger und ballseitiger Orientierung beim Decken wechseln; Passwege blockieren, um riskante Läufe oder hohe Bälle zu erzwingen [verifiziert].
- Konsequenzen für SPIELIQ:
  - Positionsspezifische Teilszenarien (Innenverteidiger-Paar, Außenverteidiger, Mittelfeld).
  - Prüfregel für die ballferne Seite: eingerückt, aber mit Sichtkontakt zum eigenen Gegner; der ungefährlichste Gegner darf frei sein (a) [Eigene Ableitung auf Basis von B-14].

### [B-15] Hoffenheim U19 – Training defence and attack with the German U19 champions (Tobias Nubbemeyer)
- Organisation/Autor: FIFA Training Centre, Elite sessions (deutsche Akademien); Tobias Nubbemeyer; PDF; Interview zur Defensivphilosophie
- URL: https://www.fifatrainingcentre.com/en/practice/elite-sessions/clubs-and-academies/german-academies/nubbemeyer-training-defence-and-attack-with-the-german-u19-champions.php ; PDF: https://fifatrainingcentre.com/media/native/practice/Hoffenheim-1.pdf ; Interview: https://www.fifatrainingcentre.com/en/practice/elite-sessions/clubs-and-academies/german-academies/fostering-defensive-aggressiveneess-and-guiding-hoffenheims-u19s-to-historic-success.php
- Datum (Veröffentlichung/Aktualisierung): Einheit 07.01.2025, Interview 31.12.2024 (jeweils Seitenkopf; PDF 08.01.2025) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (beide Seiten, PDF).
  - Korrektur nach Volltextprüfung: Die Übungen waren vermischt. Das 5v5 + TW + 2 (gespielt als 6 + 2 gegen 6) auf 32 × 50 m mit 5 m breiten Seitenkanälen trainiert Verschieben und Herausrücken der Viererkette. Das Verteidigen von Doppelpässen ist eine eigene Übung (Teil 3, zwei Felder 15 × 15 m). Die Aussage zur Philosophie stammt aus dem Interview.
- Kernaussagen (paraphrasiert):
  - Einheit: 4v1 in vier Quadraten (16 × 16 m) → 5v5 + TW + 2 → Doppelpässe verteidigen → 5v4 + TW + 1 und 2v1 (35 m langes Feld) → 7 + TW gegen 7 (8) [verifiziert].
  - Coachingpunkte: Viererkette schnell verschieben und herausrücken; gegen den Doppelpass Körperkontakt suchen und den Körper zwischen Ball und Gegner bringen; beim Seitenwechsel des Gegners kompakt bleiben [verifiziert].
  - Interview: Pressing aus einer kompakten Grundordnung mit kleinen Abständen. Die ballfernsten Spieler schieben mit und wählen laufend zwischen möglichen Passoptionen. Scheitert ein Pressender, ist der Nächste schon unterwegs; zurückgefallen wird nur in Ausnahmefällen [verifiziert].
- Konsequenzen für SPIELIQ:
  - Die ballfernen Spieler haben eine eigene Balance-Aufgabe (Passwege schneiden). Das ist prüfbar.
  - Das Dauer-Hochpressing ist eine Vereinsphilosophie nach Rangnick (c), kein allgemeines Prinzip.

### [B-16] 6v6 small-sided game: pressing in a high block (Press and regain)
- Organisation/Autor: FIFA Training Centre, Talent Coach Programme (Seitenkennung 06-07); PDF „Talent_coach_06-7"
- URL: https://www.fifatrainingcentre.com/en/practice/talent-coach-programme/press-and-regain/6v6-small-sided-game-pressing-in-a-high-block.php ; PDF: https://www.fifatrainingcentre.com/media/native/practice/talent-coach-programme/Talent_coach_06-7.pdf
- Datum (Veröffentlichung/Aktualisierung): 11.02.2025 (Seitenkopf; PDF 23.01.2025) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seite und PDF).
- Kernaussagen (paraphrasiert):
  - Fokus auf Aktionen der Einheit: Zwischen den Linien sollen keine Lücken entstehen; die zentrale Einheit schiebt beim Pressing gleichzeitig mit hoch [verifiziert].
  - Die zentralen Angreifer lösen das Pressing aus; das ist das Signal für die Spieler dahinter nachzurücken. Die Innenverteidiger halten einen guten Abstand zum Mittelfeld (ohne Zahl) [verifiziert].
  - Horizontale und vertikale Kompaktheit zwingen den Gegner nach außen; dort Überzahl um den Ballführenden schaffen und aggressiv pressen [verifiziert].
  - Halbes Feld, auf 30 m Breite verschmälert; Abseitslinie in der Feldmitte; die Innenverteidiger stehen beim Pressing an der Mittellinie [verifiziert].
- Konsequenzen für SPIELIQ: Prüfen, ob der Linienabstand beim Herausrücken erhalten bleibt, also ob die Restverteidigung folgt.

### [B-17] 3v3 plus 3 possession game: pressing and switching play
- Organisation/Autor: FIFA Training Centre, Talent Coach Programme (Seitenkennung 15_3); PDF „Talent_coach_15-3-new"
- URL: https://www.fifatrainingcentre.com/en/practice/talent-coach-programme/press-and-regain/3v3-plus-3-possession-game-pressing-and-switching-play.php ; PDF: https://www.fifatrainingcentre.com/media/native/practice/talent-coach-programme/Talent_coach_15-3-new.pdf
- Datum (Veröffentlichung/Aktualisierung): 15.07.2025 (Seitenkopf; PDF ebenfalls 15.07.2025) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seite und PDF).
- Kernaussagen (paraphrasiert):
  - Aggressives Pressing im Zentrum. Zwei Spieler (Stürmer oder Flügel) springen heraus und zwingen den Gegner nach außen; der dritte sichert ab und soll Pässe auf zentrale Angreifer verhindern. Die Seite nennt ihn ausdrücklich den dritten Verteidiger [verifiziert].
  - Grundregel: Der Ballnächste presst, der zweite und der dritte Spieler sichern ab und blockieren Passwege in die andere Zone [verifiziert].
  - Fehlerbild: Alle drei Verteidiger stehen auf einer Linie und sind mit einem Pass überspielt. Gutes Bild: versetzt stehen und Passwege in unterschiedlichen Tiefen blockieren [verifiziert].
  - Feld 45 × 15 m in fünf Zonen (5 – 15 – 5 – 15 – 5 m); die mittlere Zone ist eine Abfangzone [verifiziert].
- Konsequenzen für SPIELIQ:
  - Kleinformat für „zwei Pressende lenken gemeinsam" (b).
  - Prüfregel „Absicherung in mehreren Tiefen statt auf einer Linie" (a), direkt aus FIFA-Material.

### [B-18] Beach soccer: Shepherding your opponent (Ramiro Amarelle)
- Organisation/Autor: FIFA Training Centre, Beach Soccer (Block 3, Out of possession); Ramiro Amarelle; PDF
- URL: https://fifatrainingcentre.com/en/practice/beach-soccer/block-3/shepherding-your-opponent.php ; PDF: https://fifatrainingcentre.com/media/native/test/Beach_soccer-shepherding.pdf
- Datum (Veröffentlichung/Aktualisierung): 21.02.2023 (Seitenkopf; PDF 16.02.2023) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seite und PDF).
- Kernaussagen (paraphrasiert):
  - 1v1-Übung: den Angreifer vom Tor weg zu einer der beiden Seiten lenken; eng am Gegner bleiben und ihn in die gewünschte Richtung zwingen [verifiziert].
  - Körper etwa im 45°-Winkel zum Gegner; Rücken zum eigenen Tor, Gegner vor sich [verifiziert].
  - Das Timing des Tacklings wird mittrainiert [verifiziert].
- Konsequenzen für SPIELIQ:
  - Einzige gefundene Winkelzahl, aber aus dem Beachsoccer. Ob sie auf 11v11 übertragbar ist, ist offen.
  - Höchstens als Standardwert für die Körperorientierung verwenden und die Herkunft kennzeichnen.

### B. FIFA Training Centre – Ballbesitz, Passen, Freilaufen

### [B-19] Mexico U-15 boys: Possession moments and switch of play (Cristian Flores)
- Organisation/Autor: FIFA Training Centre, Elite sessions; Cheftrainer Cristian Flores, Assistent Adrián Sánchez; PDF
- URL: https://www.fifatrainingcentre.com/en/practice/elite-sessions/in-possession/possession_moments_switch_of_play.php (leitet weiter auf …/elite-sessions/youth-national-teams/mexico-u15-boys-/possession_moments_switch_of_play.php) ; PDF: https://www.fifatrainingcentre.com/media/native/test/FIFA_Session_Plan_Flores.pdf
- Datum (Veröffentlichung/Aktualisierung): 11.10.2022 (Seitenkopf; PDF ebenfalls 11.10.2022) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seite und PDF).
- Kernaussagen (paraphrasiert):
  - Schon jungen Spielern die Bedeutung der Ballzirkulation vermitteln und rund um den Ballführenden Passwege schaffen, damit der Ballbesitz nicht ziellos oder statisch wird [verifiziert].
  - Rauten- und Dreiecksstrukturen öffnen mehr Passwinkel und erhöhen die Chance, ins letzte Drittel zu kommen. Ein Spieler soll immer das Zentrum besetzen [verifiziert].
  - Weitere Schlüssel: volle Breite, Tiefe, Seitenwechsel, ständige Kommunikation, ständige Bewegung, fortlaufend Informationen sammeln [verifiziert].
  - Breite und Tiefe nutzen, um kurze, mittlere und lange Passoptionen anzubieten. Statt vorhersehbarer Querpässe lässt sich ein Spieler ins Zentrum fallen [verifiziert].
  - Ablauf: Passkreis (Mannequins 12 m auseinander) → 5v5 + 2 auf 25 × 30 m → 11v11 mit zentraler Zone 40 × 52 m und 14 m breiten Seitenzonen [verifiziert].
  - Defensiv im 11v11: Ein Verteidiger attackiert den Ballführenden und zwingt ihn zum Quer- oder Rückpass, die anderen fallen und sichern ab [verifiziert].
- Konsequenzen für SPIELIQ:
  - Dreieck und Raute sind Lösungswege (b), keine Pflicht.
  - Prüfbar: Anzahl der Passoptionen in unterschiedlichen Winkeln und Distanzen; keine Mitspieler hintereinander auf einer Linie zum Ball [Eigene Ableitung; für zwei zentrale Mittelfeldspieler durch B-99 gestützt].

### [B-20] 3v1 rondo: fast readjustments (Secure possession)
- Organisation/Autor: FIFA Training Centre, Talent Coach Programme (Seitenkennung 16.2); PDF „Talent coach 16-1"
- URL: https://www.fifatrainingcentre.com/en/practice/talent-coach-programme/secure-possession/3v1-rondo-fast-readjustments.php ; PDF: https://www.fifatrainingcentre.com/media/native/practice/talent-coach-programme/Talent_coach_16-1.pdf
- Datum (Veröffentlichung/Aktualisierung): 13.05.2025 (Seitenkopf; PDF ebenfalls 13.05.2025) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seite und PDF).
  - Korrektur nach Volltextprüfung: Das Dreieck mit 10 m Seitenlänge steht auch auf der Seite, nicht nur im PDF.
- Kernaussagen (paraphrasiert):
  - Körperstellung, Füße und Position schnell anpassen, damit ständig dreieckige Passwege angeboten werden. Entscheidend sind die ständigen Positionskorrekturen der Ballbesitzenden [verifiziert].
  - Aufbau: Dreieck mit 10 m Seitenlänge, 3 Angreifer gegen 1 Verteidiger [verifiziert].
  - Abseits des Balls bewegen, um klare und wechselnde Unterstützungswinkel zu bieten [verifiziert].
  - Abwägen, wann direkt gespielt und wann der Ball gehalten wird, um den Verteidiger anzulocken [verifiziert].
  - Optimale Abstände halten, weder zu nah noch zu weit voneinander entfernt; eine Zahl nennt die Seite dafür nicht [verifiziert].
  - Nicht positionsspezifisch; übertragbar auf jede Dreieckssituation auf dem Feld [verifiziert].
- Konsequenzen für SPIELIQ:
  - Kernkriterium: Ist die Passlinie frei vom Verteidiger (Deckungsschatten)?
  - Die 10 m sind ein Übungsmaß, keine Norm für Unterstützungsabstände. „Weder zu nah noch zu weit" spricht für ein Band mit Unter- und Obergrenze [Eigene Ableitung].

### [B-21] 3v3 plus 2 possession game: playing forward as a priority (Build and progress)
- Organisation/Autor: FIFA Training Centre, Talent Coach Programme; PDF „Talent coach 2.3b"
- URL: https://fifatrainingcentre.com/en/practice/talent-coach-programme/build-and-progress/3v3-plus-2-possession-game-playing-forward-as-a-priority.php ; PDF: https://fifatrainingcentre.com/media/native/test/Talent_coach_2.3b.pdf
- Datum (Veröffentlichung/Aktualisierung): 12.03.2024 (Seitenkopf; PDF ebenfalls 12.03.2024) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seite und PDF).
  - Korrektur nach Volltextprüfung: Die Seite enthält Coachingpunkte (siehe unten).
- Kernaussagen (paraphrasiert):
  - Aufbau und Progression durchs Zentrum gegen ein hohes Pressing simulieren; den Gegner anlocken, um in einen zentralen Spieler und darüber hinaus zu spielen [verifiziert].
  - Feld 25 × 10 m in drei Zonen (10 – 5 – 10 m) [verifiziert].
  - Der Pivot in der Mittelzone darf zurück- oder vorspielen; die Abfolge „up, back and through" ist ein nützliches Werkzeug [verifiziert].
  - Coachingpunkte: Eine geschlossene Körperstellung bei der Annahme begrenzt das Sichtfeld (schlechtes Beispiel); eine offene Stellung zeigt Passwege und Raum zum Aufdrehen (gutes Beispiel). Ballannahme „auf der Schulter" der Verteidiger beschleunigt die Progression. Zwischen den Linien seitlich und auf dem hinteren Fuß annehmen [verifiziert].
  - Defensiv: zwei hoch pressende Spieler und ein absichernder Spieler, der den progressiven Pass antizipiert; der Spieler in der Mittelzone wählt die wirksamste Option, Vorwärtspässe abzuschneiden [verifiziert].
- Konsequenzen für SPIELIQ:
  - „Vorwärts als Priorität" ist nicht dasselbe wie „nie zurück". Zum Konzept gehören das Anlocken und der Rückpass des Pivots. Rückpässe nicht pauschal bestrafen.
  - Offene Körperstellung bei der Annahme als prüfbares Kriterium (Orientierungspfeil im Simulator) [Eigene Ableitung].

### [B-22] U14 Boys Costa Rica – Session 10: Support and off-the-ball movements (Talent-Coach-PDF und Seite)
- Organisation/Autor: FIFA Training Centre, Talent Coach Programme (FCRF Talent Development); Talent-Coach Manfred Schumann (Costa-ricanischer Verband); Gruppe von Jungen
- URL: https://www.fifatrainingcentre.com/media/native/practice/talent-coach-programme/U14-Boys-Costa-Rica-session-10.pdf ; Seite: https://www.fifatrainingcentre.com/en/practice/talent-coach-programme/sessions/support-and-off-the-ball-movements.php
- Datum (Veröffentlichung/Aktualisierung): 15.10.2024 (Seitenkopf; PDF ebenfalls 15.10.2024) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (PDF vollständig; zugehörige Seite gefunden und gelesen). Die Altersangabe U14 steht nur im Dateinamen.
- Kernaussagen (paraphrasiert):
  - Wer durchs Zentrum spielt, braucht Unterstützung sowohl hinter als auch vor dem Empfänger [verifiziert].
  - Eine Raute um den Ballführenden schafft mehrere Passwinkel. Ablauf: Rauten-Passkreis (Stangen 15 m auseinander) → 4v4 + 4 (10 × 20 m) → 6v6 + 6 (25 × 15 m) → 11v9 auf 60 × 50 m [verifiziert].
  - Offene Körperstellung vor der Annahme; nach dem Pass sofort in einen Raum oder Passwinkel bewegen [verifiziert].
  - Räume zwischen Gegnern besetzen und sich anbieten. Ballfernere Spieler besetzen einen Raum, der dem nächsten Ballführenden eine Option gibt [verifiziert].
  - Ist eine Zone überladen, die Seite wechseln; unter starkem Druck auch lang spielen [verifiziert].
- Konsequenzen für SPIELIQ:
  - U14 entspricht der Zielgruppe.
  - Prüfkriterium: Der Empfänger hat mindestens eine Option hinter und eine vor sich (a/b).
  - Vorausdenkendes Anbieten der ballfernen Spieler (Option für den nächsten Ballführenden) als zweite Ebene der Unterstützung [Eigene Ableitung].

### [B-23] 4v4 finishing waves: attacking with depth or width (Create and finish)
- Organisation/Autor: FIFA Training Centre, Talent Coach Programme; PDF „Talent coach 3-04-4"
- URL: https://fifatrainingcentre.com/en/practice/talent-coach-programme/create-and-finish/4v4-finishing-waves-attacking-with-width-or-depth.php ; PDF: https://fifatrainingcentre.com/media/native/practice/talent-coach-programme/Talent_coach_3-04-4-new.pdf
- Datum (Veröffentlichung/Aktualisierung): 26.06.2024 (Seitenkopf, Seitentitel „Attacking with depth or width"; PDF ebenfalls 26.06.2024) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seite und PDF).
  - Korrektur nach Volltextprüfung: Die Seite enthält Coachingpunkte (siehe unten).
- Kernaussagen (paraphrasiert):
  - Torchancen herausspielen und hinter die Kette kommen, mit Tiefenläufen und Zweierkombinationen [verifiziert].
  - Feld 40 × 35 m mit zwei 10 m breiten Seitenkanälen; die Breite entspricht dem Strafraum, damit eher zum Tor als nach außen gespielt wird [verifiziert].
  - Zunächst 2v2. Fällt nach 3 Sekunden kein Abschluss, werden die Außenspieler einbezogen und es wird 4v4 [verifiziert].
  - Nicht positionsspezifisch: Alle erleben Angriff und Abwehr [verifiziert].
  - Coachingpunkte: Außenspieler lösen sich mit Finten und greifen den Raum hinter der Kette an; nach dem Pass in die Tiefe laufen; der Lauf des Passgebers öffnet innen Raum für den Außenspieler; Doppelpässe nutzen, wenn Verteidiger herausrücken [verifiziert].
- Konsequenzen für SPIELIQ: „Breite oder Tiefe" als Entscheidungsaufgabe, bei der je nach Verteidigerstellung beides richtig sein kann (b).

### [B-24] Third player combinations (Game analysis – in possession)
- Organisation/Autor: FIFA Training Centre, Game analysis (Teil der Serie „Core principles of play", siehe [B-95])
- URL: https://fifatrainingcentre.com/en/game/game-analysis/in-possession/third-player-combinations.php
- Datum (Veröffentlichung/Aktualisierung): 08.11.2021 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Artikeltext; Videobeispiele nicht angesehen).
- Kernaussagen (paraphrasiert):
  - Die Dritter-Mann-Kombination hat vier Phasen: Eröffnungspass, Ablage (oft direkt), Lauf ohne Ball in den freien Raum, finaler Pass [verifiziert].
  - Schnell und mit wenigen Kontakten ausgeführt. Schwer zu antizipieren, weil Verteidiger nicht nur auf den Ball schauen dürfen [verifiziert].
  - Der dritte Spieler nimmt den Ball mit Blick zum gegnerischen Tor an und sieht so das ganze Feld [verifiziert].
  - Beispiel: Paul Scholes; Videobeispiele aus der U-20-Frauen-WM [verifiziert].
- Konsequenzen für SPIELIQ: Szenariotyp „Dritter Mann" mit Bewertung der Abfolge.

### [B-25] Croatia: evolving third-player combinations (World-Class Tactics)
- Organisation/Autor: FIFA Training Centre, Game analysis / World-Class Tactics
- URL: https://www.fifatrainingcentre.com/en/game/game-analysis/world-class-tactics/croatia-evolving-third-player-combinations.php
- Datum (Veröffentlichung/Aktualisierung): 19.05.2026 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Artikeltext mit vier Beispielen; Videos nicht angesehen).
- Kernaussagen (paraphrasiert):
  - „Up, back and through" ist bei Kroatien ein flexibles Werkzeug, kein festes Schema [verifiziert].
  - Modrić kommt als zweiter Spieler dem Ball entgegen, zieht Druck an und schafft Raum hinter sich. Je nach Abstand seines Gegenspielers legt er ab, leitet direkt weiter oder nimmt den Ball kontrolliert an, um den Gegner weiter anzulocken [verifiziert].
  - Ist der dritte Spieler zugestellt, passt das Mittelfeld die Lösung durch Bewegung und Positionswechsel an [verifiziert].
- Konsequenzen für SPIELIQ: Mehrere Lösungen zulassen (b), kein starres Muster abfragen.

### [B-26] Directing the ball with the first touch (Jacqueline Dünker)
- Organisation/Autor: FIFA Training Centre, Elite sessions (in possession); Jacqueline Dünker (laut Seite FIFA Women's Football Technical Expert und Cheftrainerin des FC Zürich Frauen) mit einer Gruppe junger Mädchen; PDF
- URL: https://fifatrainingcentre.com/en/practice/elite-sessions/in-possession/directing-the-ball-with-the-first-touch.php ; PDF: https://www.fifatrainingcentre.com/media/native/test/FIFA_Session_Plan_Dünker_first_touch-new-1.pdf
- Datum (Veröffentlichung/Aktualisierung): 18.09.2023 (Seitenkopf; PDF ebenfalls 18.09.2023) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seite und PDF).
- Kernaussagen (paraphrasiert):
  - Die offene Stellung des Empfängers zeigt dem Passgeber, auf welchen Fuß und ob in den Fuß oder in den Raum gespielt werden soll [verifiziert].
  - Spieler müssen sich ihrer Körperausrichtung bewusst sein, um sich wie beabsichtigt weiterzubewegen; die Körperausrichtung bei der Annahme soll die gewünschte Laufrichtung widerspiegeln [verifiziert].
  - Vor der Annahme über die Schulter schauen und den Raum prüfen, in den man sich bewegen will [verifiziert].
- Konsequenzen für SPIELIQ: Figuren mit Orientierungspfeil darstellen und bewerten, ob sie offen zur nächsten Spielrichtung stehen.

### [B-27] Individual actions: developing central midfielders (Position-specific training)
- Organisation/Autor: FIFA Training Centre, Talent Coach Programme, Serie „Position-specific training"; Willi Ruttensteiner (laut Seite Technical Lead des FIFA Talent Coach and Academies Programme)
- URL: https://www.fifatrainingcentre.com/en/practice/talent-coach-programme/position-specific-training/individual-actions-developing-central-midfielders.php
- Datum (Veröffentlichung/Aktualisierung): 12.05.2026 (Seitenkopf) [verifiziert]; Übersichtsseiten nennen 21.05.2026 bzw. 19.08.2026
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Einleitung, Coachingpunkte, drei Übungen).
- Kernaussagen (paraphrasiert):
  - Seitliches Annehmen, Umschauen vor der Ballankunft und eine erste Berührung nach vorn sind Details, die gezielt verfeinert werden [verifiziert].
  - Das PMDS-Modell (Position, Moment, Richtung, Tempo) dient als Beobachtungsraster: Bietet sich der Spieler im richtigen Raum an? Läuft er im richtigen Moment? Nimmt er den Ball in die richtige Richtung mit? Stimmen Tempo und Timing? [verifiziert]
  - Gegnerdruck schrittweise steigern: passiv → halbaktiv → realistisch [verifiziert].
  - Grenze dieser Phase: keine echte Entscheidung und kein echter Druck; deshalb folgen Spielsituationen und Spielphasen (siehe [B-99]) [verifiziert].
- Konsequenzen für SPIELIQ:
  - Wie [B-26]; zusätzlich eine Wahrnehmungsfrage vor dem Zug („Was siehst du?") [Eigene Ableitung].
  - PMDS eignet sich als Raster für das Feedback zum Freilaufen: Position, Moment, Richtung und Tempo getrennt bewerten [Eigene Ableitung].

### [B-28] Chargers Soccer Club U-12 (Clearwater): Instilling a combinative style (Sessionplan und Seite)
- Organisation/Autor: FIFA Training Centre, Grassroots („Global grassroots insights"); Chargers Soccer Club (Florida, USA), U12-Trainer Adel Alchamat, Executive Director Mike Keeney
- URL: https://www.fifatrainingcentre.com/media/native/practice/FIFA_Session_Plan_Clearwater_1.pdf (auch „…Clearwater_1-new.pdf") ; Seite: https://www.fifatrainingcentre.com/en/practice/grassroots/global-grassroots-insights/u-12-clearwater-instilling-a-combinative-style-of-play.php
- Datum (Veröffentlichung/Aktualisierung): Seite 27.05.2025 (Seitenkopf); PDF erstellt 26.05.2025, Fassung „-new" 21.07.2025 [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seite und beide PDF-Fassungen).
  - Korrektur nach Volltextprüfung: Der Kontext ist eine U12-Vereinsmannschaft aus den USA (Grassroots), keine Elite-Einheit.
- Kernaussagen (paraphrasiert):
  - Bewegt sich die Nummer 9 in eine Richtung, geht die Nummer 10 in die Gegenrichtung und schafft so Passwinkel [verifiziert].
  - Pässe in den Fuß fest spielen, Ablagen leichter und in den Lauf [verifiziert].
  - Vereinsprinzipien: Fertigkeitserwerb, Kleinfeldspiele, progressives Training; das Ergebnis am Wochenende ist nachrangig [verifiziert].
- Konsequenzen für SPIELIQ: Gegenbewegung als einfache Heuristik für Mobilität (b).

### [B-29] Futsal: Using width to create space in attack / Passing and directional play
- Organisation/Autor: FIFA Training Centre, Futsal (Block 2, Offensive principles); Graeme Dell (#9B) und Clàudia Pons (#20)
- URL: https://www.fifatrainingcentre.com/en/practice/futsal/block-2/using-width-to-create-space-in-attack.php ; https://www.fifatrainingcentre.com/en/practice/futsal/block-2/passing-and-directional-play.php
- Datum (Veröffentlichung/Aktualisierung): #9B 26.09.2023, #20 10.10.2023 (jeweils Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (beide Seiten, beide PDFs).
  - Korrektur nach Volltextprüfung: Die Aussage „Breite und Tiefe anbieten" stammt aus #20 („Passing and directional play").
- Kernaussagen (paraphrasiert):
  - #20: Breite und Tiefe anbieten, um Raum für Angriffsaktionen zu schaffen; sich vom Ballführenden wegbewegen, um keine Gegner in seinen Wirkungsbereich zu ziehen; nach vorn schauen, spielen und sich bewegen [verifiziert].
  - #9B: drei Längszonen (5 / 10 / 5 × 40 m); Hinterlaufen außen, Flügelspieler ziehen nach innen; Spieler ohne Ball beeinflussen den Ballführenden mit Bewegung und Körperstellung [verifiziert].
- Konsequenzen für SPIELIQ: Bestätigt nur das Prinzip; es handelt sich um Futsal.

### C. FIFA Training Centre – Wahrnehmung, Kognition, Nachwuchsphilosophie

### [B-30] Research brief: Aksum – Scanning
- Organisation/Autor: FIFA Training Centre (Research brief); Dr. Karl Marius Aksum (Norwegische Sporthochschule); Studie gemeinsam mit der Deutschen Sporthochschule Köln
- URL: https://www.fifatrainingcentre.com/en/community/research-brief/aksum-scanning.php (leitet weiter auf …/environment/research-brief/high-performance/play/aksum-scanning.php)
- Datum (Veröffentlichung/Aktualisierung): 30.03.2023 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seitentext mit Zusammenfassung; Video nicht angesehen).
  - Korrektur nach Volltextprüfung: Aksum gehört zur Norwegischen Sporthochschule; die Deutsche Sporthochschule ist Kooperationspartner der Studie.
- Kernaussagen (paraphrasiert):
  - Scanning ist eine bewusste Kopfbewegung weg vom Ball, um Informationen über Mit- und Gegenspieler zu sammeln [verifiziert].
  - Daten: Halbfinals und Finals der UEFA-U17- und -U19-EM 2018 der Männer; 53 Feldspieler der vier Finalteams mit 1686 Ballbesitzen [verifiziert].
  - Je enger das Pressing, desto seltener scannt der Ballführende [verifiziert].
  - Die Scanfrequenz hängt mit Passquote und nach vorn gerichteter Körperstellung zusammen; sie unterscheidet sich nach Position und war im U19-Finale höher als im U17-Finale [verifiziert].
  - Der Zeitpunkt des letzten Scans hängt mit der anschließenden Körperausrichtung zusammen: Wahrnehmung und Handlung sind verknüpft [verifiziert].
  - Studie: Aksum, Pokolm, Bjørndal, Rein, Memmert und Jordet (2021), Journal of Sports Sciences 39 (21), 2401–2410 [verifiziert].
- Konsequenzen für SPIELIQ: Druck verringert die Informationsaufnahme. Deshalb im Simulator zuerst das „Bild vor dem Ball" üben und den Zeitdruck schrittweise erhöhen [Eigene Ableitung].

### [B-31] Science explained: Karl Aksum – Scanning
- Organisation/Autor: FIFA Training Centre (Science explained); Dr. Karl Marius Aksum; Moderation Dr. Paul Bradley
- URL: https://www.fifatrainingcentre.com/en/community/science-explained/karl-aksum-scanning.php
- Datum (Veröffentlichung/Aktualisierung): 18.05.2023 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (schriftliche Zusammenfassung; Präsentationsvideo nicht angesehen).
- Kernaussagen (paraphrasiert):
  - Präsentation zur Theorie und Trainierbarkeit des Scannens [verifiziert].
  - Zentrale Mittelfeldspieler scannen am häufigsten, Stürmer am seltensten. Scanfrequenz und Passquote hängen zusammen [verifiziert].
  - Ein Scan dauert im Mittel etwa 0,4 s; nur 2,3 % der Scans enthalten eine Fixation. Spieler erfassen vor allem Farben, Bewegung und Raum [verifiziert].
  - Empfehlungen: spielnahe, positionsspezifische Übungen; sensorische Einschränkungen oder bewusste Reizüberflutung; mehr Forschung im Feld statt im Labor [verifiziert].
- Konsequenzen für SPIELIQ: Wahrnehmungsaufgaben positionsabhängig gestalten; im 2D-Simulator eher kurze Sichtfenster als lange Standbilder [Eigene Ableitung].

### [B-32] Speed of the game 3: A clear game picture (Tony Colbert)
- Organisation/Autor: FIFA Training Centre, Individual qualities; Tony Colbert
- URL: https://www.fifatrainingcentre.com/en/game/individual-qualities/speed-of-the-game/speed-of-the-game-3--a-clear-game-picture.php
- Datum (Veröffentlichung/Aktualisierung): 08.11.2021 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Artikeltext).
- Kernaussagen (paraphrasiert): Das SPPA-Modell unterscheidet drei Wahrnehmungsebenen [verifiziert]:
  - räumlich: Nahbereich, z. B. Abstand zum nächsten Gegner oder Mitspieler, freier Raum in der Nähe
  - positionell: Koordinaten und Abstände auf dem Feld, z. B. Angreifer relativ zur Abwehrlinie, Verteidiger relativ zu seiner Einheit
  - peripher: Fernsicht, das weniger Offensichtliche
  - Für Jugendspieler geht es laut Text nicht um SPPA-Taktik, sondern um eine feste Abfolge „look – move – receive" (umschauen, bewegen, annehmen), geübt in einfachen Passübungen und kurzen Ballbesitzspielen auf engem Raum [verifiziert].
- Konsequenzen für SPIELIQ: Feedback auf zwei Ebenen gliedern: Nahbereich (Gegner und Mitspieler) und Position zu Linien und Tor; für U14/U15 die Abfolge „umschauen – bewegen – annehmen" als Grundschema [Eigene Ableitung].

### [B-33] Science explained: Mark Williams on game intelligence
- Organisation/Autor: FIFA Training Centre (Science explained); Prof. Mark Williams (laut Seite Institute of Human and Machine Cognition); Moderation Dr. Paul Bradley
- URL: https://www.fifatrainingcentre.com/en/community/science-explained/mark-williams-on-game-intelligence.php
- Datum (Veröffentlichung/Aktualisierung): 20.04.2023 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (schriftliche Zusammenfassung; Video nicht angesehen).
- Kernaussagen (paraphrasiert):
  - Spielintelligenz hängt u. a. mit besserer Antizipation und Mustererkennung zusammen, weniger mit „Vision" an sich; es geht um Informationsverarbeitung und Vorhersage [verifiziert].
  - Sie ist bis zu einem gewissen Grad trainierbar; wie man sie am besten trainiert, ist umstritten [verifiziert].
  - Direkte Instruktion bringt kurzfristig bessere Ergebnisse, kann aber Kreativität kosten; offene Formen lassen Spieler eigene Lösungen finden [verifiziert].
  - Empfehlung: offen für verschiedene Methoden und Technologien bleiben, vorsichtig mit übermäßig strukturiertem Training sein. Simulation und VR werden als mögliche, noch zu prüfende Hilfen genannt [verifiziert].
- Konsequenzen für SPIELIQ: Das Produkt nicht als alleinigen oder bewiesenen Weg zur Spielintelligenz darstellen; Szenarien variabel halten und die Wirkung prüfen.

### [B-34] Grassroots Essentials – Ages 4–8: Building spatial awareness in young players (Dr. Jené Baclawski)
- Organisation/Autor: FIFA Training Centre, Grassroots Coaching Essentials; Dr. Jené Baclawski
- URL: https://www.fifatrainingcentre.com/en/practice/grassroots/grassroots-and-youth-football-essentials/grassroots-coaching-essentials/building-spatial-awareness-in-young-players.php
- Datum (Veröffentlichung/Aktualisierung): 20.05.2025 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (schriftliche Zusammenfassung aller drei Tipps; Video nicht angesehen).
- Kernaussagen (paraphrasiert):
  - Drei Tipps und Aktivitäten zum Raumverständnis mit dem Ziel besserer Positionierung, besserer Entscheidungen und besseren Teamverständnisses [verifiziert].
  - Tipp 1: Aktivitäten so gestalten, dass Kinder ihre Umgebung wahrnehmen und den Mut entwickeln, in freie Räume zu gehen; den Spaß erhalten [verifiziert].
  - Tipp 2: Entscheidungen verbessern: dynamische Umgebungen, ein verdichteter Raum, in dem Kinder freie Räume suchen müssen, sowie Leitfragen und Hinweise des Trainers [verifiziert].
  - Tipp 3: Teamwork: sich anbieten, damit der Mitspieler den Ball nicht verliert; Arbeit ohne Ball; Kommunikation [verifiziert].
  - Format: 9-minütiges Video, schriftliche Zusammenfassung mit Diagrammen [verifiziert].
- Konsequenzen für SPIELIQ: Die Altersstufe liegt unter der Zielgruppe. „Freien Raum erkennen und besetzen" bleibt aber der Basisbaustein für das Freilaufen; Leitfragen als Feedbackform.

### [B-35] Grassroots Essentials – An introduction to Play-Practice-Play
- Organisation/Autor: FIFA Training Centre, Grassroots Coaching Essentials; Dr. Jené Baclawski
- URL: https://www.fifatrainingcentre.com/en/practice/grassroots/grassroots-and-youth-football-essentials/grassroots-coaching-essentials/an-introduction-to-play-practice-play.php
- Datum (Veröffentlichung/Aktualisierung): 04.11.2025 (Seitenkopf; die Übersichtsseite nennt 03.11.2025); letzte Folge der Serie [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (schriftliche Zusammenfassung).
- Kernaussagen (paraphrasiert):
  - Kindzentriertes Modell, bei dem das Spiel im Kern jeder Einheit steht [verifiziert].
  - Drei Phasen: Kleinfeldspiel zum Einstieg → Kerntechnik mit vielen Wiederholungen → freies Spiel zum Abschluss [verifiziert].
  - In der letzten Phase wenig eingreifen und beobachten, wie Spieler unter Druck entscheiden; Spieler lösen Situationen selbst [verifiziert].
- Konsequenzen für SPIELIQ: Simulator-Einheiten analog aufbauen: Spielsituation → gezielte Prinzip-Aufgabe → komplexe Spielsituation [Eigene Ableitung].

### [B-36] Grassroots Essentials – Dribbling as a positive start
- Organisation/Autor: FIFA Training Centre, Grassroots Coaching Essentials; Dr. Jené Baclawski
- URL: https://www.fifatrainingcentre.com/en/practice/grassroots/grassroots-and-youth-football-essentials/grassroots-coaching-essentials/jene-3-dribbling-as-a-positive-start.php
- Datum (Veröffentlichung/Aktualisierung): 22.07.2025 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (schriftliche Zusammenfassung).
- Kernaussagen (paraphrasiert): Für 4- bis 8-Jährige werden Kleinfeldaktivitäten wie 1v1, 2v2 und 2v1 empfohlen, um Dribbling, Kommunikation, Wahrnehmung und Entscheidungen zu fördern [verifiziert].
- Konsequenzen für SPIELIQ: Für U14/U15 nur indirekt relevant; belegt die Kleinformat-Logik.

### [B-37] Develop the next generation (Talent development)
- Organisation/Autor: FIFA Training Centre, Talent Development
- URL: https://fifatrainingcentre.com/en/practice/talent_development.php
- Datum (Veröffentlichung/Aktualisierung): Übersichtsseite ohne eigenes Datum
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seitentext und Linkliste).
- Kernaussagen (paraphrasiert):
  - Die FIFA-Talent-Coaches folgen einer dynamischen Methodik, deren Grundlage das Spiel ist; das Programm läuft in 25 Mitgliedsverbänden [verifiziert].
  - Die Praxisbibliothek ist nach acht Absichten (Ballbesitz sichern; aufbauen und vorankommen; Chancen kreieren und abschließen; Tor schützen; Räume blockieren; pressen und Ball gewinnen; Umschalten nach Ballverlust; Umschalten nach Ballgewinn) und drei Skalen (Spieler, Einheit, Team) geordnet [verifiziert].
  - Die Seite verlinkt die Rahmenartikel zum Curriculum [B-97, B-98], die Serien zur Zonenverteidigung [B-01, B-02, B-94] und zum positionsspezifischen Training [B-27, B-99] [verifiziert].
- Konsequenzen für SPIELIQ: Spielnähe als Leitprinzip für alle Szenarien; die acht Absichten eignen sich als Ordnungsrahmen für Szenarien [Eigene Ableitung].

### [B-38] Practice page updated: three new grassroots sessions every other Tuesday
- Organisation/Autor: FIFA Training Centre (Ankündigung)
- URL: https://www.fifatrainingcentre.com/en/practice-page-updated-three-new-grassroots-sessions-every-other-tuesday.php
- Datum (Veröffentlichung/Aktualisierung): 23.11.2021 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Seitentext).
- Kernaussagen (paraphrasiert):
  - Grassroots-Einheiten für 4–8, 8–12 und 12–16 Jahre (Jungen, Mädchen, gemischt), ausgerichtet auf Spaß und Inklusion [verifiziert].
  - Die ersten Themen waren Abschluss, Teamwork und technische Grundlagen. Der verlinkte Pfad der ältesten Gruppe lautet „12-to-15", der Text nennt 12–16 [verifiziert].
- Konsequenzen für SPIELIQ: Das FIFA-Altersband 12–16 deckt die Zielgruppe. Die neuere Reihe „Ages 12-15" ist in [B-100] ausgewertet.

### D. FIFA – Turnieranalysen, Daten, Football Language

### [B-39] Controlling the game without the ball: the mid-block and compactness (WM 2022, TSG)
- Organisation/Autor: FIFA Training Centre / FIFA Technical Study Group (WM 2022); im Seitenkopf „FIFA"
- URL: https://www.fifatrainingcentre.com/en/fwc2022/technical-and-tactical-analysis/controlling-the-game-without-the-ball--the-mid-block-and-compactness.php
- Datum (Veröffentlichung/Aktualisierung): 19.05.2023 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Artikeltext; Grafiken und Clips nicht ausgewertet).
  - Korrektur nach Volltextprüfung: Die in Durchgang 1 verworfenen Kriterien stehen im Artikel. Für die Datenerfassung gelten drei Merkmale. (1) „Stationär": Ein Spieler bewegt sich nicht schneller als 10 km/h vor oder zurück (im Gegensatz zum Pressing). (2) „Organisiert": Alle Spieler außer dem höchsten bilden horizontale Linien, das Team war in den vorangegangenen 2,0 s mindestens 1,6 s stationär, und mindestens vier Verteidiger stehen organisiert hinter dem Ball. (3) Feldbereich: mindestens acht Feldspieler im Mitteldrittel bzw. im Mittel- und Abwehrdrittel (tiefer Block: acht im Abwehrdrittel).
- Kernaussagen (paraphrasiert):
  - K.-o.-Teams waren eher bereit und fähig, längere Phasen ohne Ball zu kontrollieren. Alle Halbfinalisten gewannen ihr Viertelfinale mit gleich viel oder weniger Ballbesitz [verifiziert].
  - Teams mit höchstens 33 % Ballbesitz kamen auf 5 Niederlagen gegen 14 Siege oder Remis, Teams mit mindestens 57 % auf 7 Siege gegen 7 Niederlagen oder Remis [verifiziert].
  - Mittelfeldblock: Das Team ohne Ball verbindet seine Linien und hält eine gemeinsame Position im Mitteldrittel (bzw. Mittel- und Abwehrdrittel). Ziel: kompakt und eng, keine Räume durch die zentralen Kanäle; den Gegner oft nach außen oder nach hinten zwingen [verifiziert].
  - Neun Phasen ohne Ball: High Press, Mid Press, Low Press, High-Block, Mid-Block, Low-Block, Recovery, Defensive Transition, Counter Press [verifiziert].
  - Die Phase endet, wenn die Kriterien 0,4 s innerhalb von 2,0 s nicht erfüllt sind, der Ballbesitz wechselt oder der Ball aus dem Spiel geht [verifiziert].
  - Kompaktheit wird über Breite und Länge des Teams im Block gemessen. Je kompakter, desto weniger Raum zwischen den Linien, aber desto mehr Raum anderswo; die Balance ist entscheidend [verifiziert].
  - Werte im Mittelfeldblock (WM 2022): Turnierdurchschnitt etwa 27,2 m Länge und 40,1 m Breite; am kompaktesten Saudi-Arabien (39,6 m breit, 22,5 m lang) und Marokko (40,75 × 23,5 m). Teams mit Viererkette waren kompakter als Teams mit Fünferkette. Je länger ein Team im Mittelfeldblock war, desto kompakter wurde es; im Rückstand wurde die Fläche größer [verifiziert].
  - Marokko verbrachte 38 % der Zeit ohne Ball im Mittelfeldblock, Frankreich 37 %, Argentinien 32 % [verifiziert].
  - Wenger: Der Mittelfeldblock passt zu Trainern, die zwischen Pressing und Positionsspiel wechseln. Das Team kann den Moment fürs Pressing wählen oder auf einen erzwungenen Fehler warten [verifiziert].
- Konsequenzen für SPIELIQ:
  - Operationalisierbare Klassifikation des Blockzustands (Zählregel nach Dritteln plus Geschwindigkeits- und Zeitkriterium), die sich für die Engine übernehmen lässt.
  - Die Kompaktheitswerte stammen aus dem Erwachsenen-Spitzenfußball und sind deskriptiv, keine Normen für U14/U15. Höchstens zur Plausibilitätsprüfung oder relativ zur Feldgröße skaliert verwenden [Eigene Ableitung].

### [B-40] TSG experts assess finalists and tournament as a whole (WM 2022)
- Organisation/Autor: FIFA (fifa.com), Technical Study Group; Arsène Wenger
- URL: https://www.fifa.com/en/news/tsg-experts-assess-finalists-and-tournament-as-a-whole
- Datum (Veröffentlichung/Aktualisierung): unbekannt (WM 2022)
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet. Die Zuordnung der Wenger-Aussage zu dieser URL ist laut Suchzusammenfassung plausibel, aber nicht eindeutig.
- Kernaussagen (paraphrasiert): Wenger zufolge waren Mittelfeldblöcke und zentrale Kompaktheit die dominierende Art zu verteidigen, verbunden mit höher stehenden Abwehrlinien.
- Konsequenzen für SPIELIQ: Zentrale Kompaktheit ist für das Spitzenniveau als Grundprinzip (a) belegt.

### [B-41] TSG shares latest analysis at second media briefing (WM 2022)
- Organisation/Autor: FIFA (inside.fifa.com / fifa.com); Chris Loxston (FIFA Football Performance Analysis)
- URL: https://inside.fifa.com/news/tsg-shares-latest-analysis-at-second-media-briefing (auch https://www.fifa.com/news/tsg-shares-latest-analysis-at-second-media-briefing)
- Datum (Veröffentlichung/Aktualisierung): unbekannt (nach dem 2. Gruppenspieltag der WM 2022)
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet.
- Kernaussagen (paraphrasiert): Die Blöcke waren etwas breiter und etwas kürzer als 2018. Bei tief stehenden Teams war die Teamlänge laut Loxston um etwa 2 m geringer.
- Konsequenzen für SPIELIQ: Es gibt nur relative Veränderungen, keine Absolutwerte; als Norm ungeeignet.

### [B-42] FIFA Insight – Episode 2 (WM 2022)
- Organisation/Autor: FIFA Training Centre, FIFA Insight; Chris Loxston mit Sunday Oliseh und Jürgen Klinsmann
- URL: https://www.fifatrainingcentre.com/en/fwc2022/fifa-insight/fifa-insight-ep02.php
- Datum (Veröffentlichung/Aktualisierung): 02.12.2022 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (schriftliche Zusammenfassung; Video nicht angesehen).
- Kernaussagen (paraphrasiert):
  - Teams im hohen Block standen etwa 2 m breiter als 2018; der Abstand zwischen tiefstem und höchstem Spieler war etwa 1 m kürzer [verifiziert].
  - Im tiefen Block waren die Teams etwa 2 m kürzer [verifiziert].
  - Gegen den kompakten Block hilft der Weg über außen mit einer nach vorn gerichteten ersten Berührung und Unterstützung oder ein schneller, präziser Seitenwechsel; dafür braucht es Risikobereitschaft [verifiziert].
  - Etwa fünf Vorstöße ins letzte Drittel weniger pro Team und Spiel als 2018, vor allem durch das Zentrum; rund 33 % weniger Take-ons [verifiziert].
- Konsequenzen für SPIELIQ: wie [B-41]; keine Normwerte.

### [B-43] EFI-Metriken: Defensive line height and team length; Pressure on the ball
- Organisation/Autor: FIFA Training Centre, Enhanced Football Intelligence (EFI)
- URL: https://fifatrainingcentre.com/en/fwc2022/efi-metrics/efi-metric--defensive-line-height-and-team-length.php ; https://www.fifatrainingcentre.com/en/fwc2022/efi-metrics/efi-metric--pressure-on-the-ball.php ; Übersicht: https://www.fifatrainingcentre.com/en/fifa-to-introduce-enhanced-football-intelligence-at-fifa-world-cup-2022.php ; Phasen: https://www.fifatrainingcentre.com/en/fwc2022/efi-metrics/efi-metric--phases-of-play.php
- Datum (Veröffentlichung/Aktualisierung): 11.11.2022 (alle Seiten, Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (kurze Seitentexte; Erklärvideos nicht angesehen).
  - Korrektur nach Volltextprüfung: Die Teamlänge ist nicht auf der Metrikseite definiert, aber im EFI-Erklärdokument [B-44]: Abstand zwischen tiefstem und höchstem Feldspieler, ohne Torwart.
- Kernaussagen (paraphrasiert):
  - Elf EFI-Metriken, u. a. Linienbrüche, Abwehrlinienhöhe und Teamlänge, Teamform, Spielphasen, Druck auf den Ball [verifiziert].
  - Abwehrlinienhöhe: Abstand zwischen der eigenen Torlinie und dem tiefsten Feldspieler [verifiziert].
  - Druck auf den Ball: Ein Spieler verkürzt den Abstand zum Ballführenden und nimmt ihm damit Zeit und Optionen [verifiziert].
  - Für „Druck" ist keine Meterschwelle angegeben [verifiziert].
- Konsequenzen für SPIELIQ: Die Begriffe übernehmen, die Schwellen selbst festlegen und dokumentieren.

### [B-44] Enhanced Football Intelligence – Explanation Documents v1.0 (11.10.2022) und v1.1 (11.07.2023)
- Organisation/Autor: FIFA (über FIFA Training Centre); v1.0 „High Performance (TSG), Football Performance Analysis & Insights"
- URL: https://www.fifatrainingcentre.com/media/native/world-cup-2022/Enhanced%20Football%20Intelligence%20EN.pdf ; https://www.fifatrainingcentre.com/media/native/tournaments/womens-world-cup/2023/FIFA%20Enhanced%20Football%20Intelligence%20(EFI)%20Explainations_EN%20v1.1.pdf
- Datum (Veröffentlichung/Aktualisierung): v1.0 11.10.2022 (Titelseite; PDF-Metadaten 04.11.2022); v1.1 11.07.2023 (Titelseite; PDF-Metadaten 12.07.2023) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (beide PDFs vollständig).
  - Korrektur nach Volltextprüfung: Die Versionen unterscheiden sich im Wortlaut kaum. v1.1 zählt die Phasen nummeriert auf und ergänzt die Metriken „Attempt Creation" und „Player Involvement".
- Kernaussagen (paraphrasiert):
  - Neun Phasen ohne Ball (hohes Pressing, hoher Block, mittleres Pressing, Mittelfeldblock, tiefes Pressing, tiefer Block, Gegenpressing, Rückzug, defensives Umschalten), sieben mit Ball (Aufbau bedrängt oder unbedrängt, Progression, langer Ball, letztes Drittel, Konter, offensives Umschalten) und vier Standardphasen [verifiziert].
  - Die Phasen werden aus Trackingdaten berechnet: Positionen, Abstände zwischen Spielern und Ball, Geschwindigkeiten und Bewegungsrichtungen [verifiziert].
  - Mittelfeldblock: organisierte Defensivform im Mitteldrittel, meist kompakt und eng, die meisten Verteidiger eng miteinander verbunden [verifiziert].
  - Linienhöhe: Der Algorithmus teilt die Feldspieler in Verteidiger, Mittelfeldspieler und Stürmer ein; die Höhe jeder Gruppe ergibt sich aus ihrem tiefsten Spieler. Teamlänge: mittlerer vertikaler Abstand zwischen tiefstem und höchstem Feldspieler, ohne Torwart [verifiziert].
  - Linienbruch: Der Ball wird über den tiefsten Spieler einer gegnerischen Linie hinaus gespielt. Einheiten sind Spielergruppen mit ähnlicher Rolle im Moment des Passes [verifiziert].
  - Druck auf den Ball: berechnet aus Abstand des Verteidigers zum Ball, Winkel (vor dem Ballführenden zählt mehr als dahinter) und Nähe weiterer Verteidiger. Eingestuft als „moderat" oder „hoch"; der Druck mehrerer Verteidiger wird addiert. Schwellenwerte sind nicht veröffentlicht [verifiziert].
  - Vorstöße ins letzte Drittel werden fünf Längskanälen zugeordnet (links, halblinks, zentral, halbrechts, rechts) [verifiziert].
- Konsequenzen für SPIELIQ:
  - Gruppierung in Linien plus „tiefster Spieler" ergibt eine einfache, robuste Operationalisierung von Linienhöhe und Linienabstand [Eigene Ableitung].
  - Für „Druck" Abstand, Winkel und Zahl der beteiligten Verteidiger kombinieren; die Schwellen selbst festlegen [Eigene Ableitung].

### [B-45] Data science and the role of data interpretation at FIFA (FIFA Insight)
- Organisation/Autor: FIFA Training Centre, FIFA Insight; Chris Loxston, Juan Busso, Arron Ackermann
- URL: https://www.fifatrainingcentre.com/en/fwc2022/fifa-insight/data-science-and-the-role-of-data-interpretation-at-fifa.php
- Datum (Veröffentlichung/Aktualisierung): 21.12.2022 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (schriftliche Zusammenfassung; Video nicht angesehen).
- Kernaussagen (paraphrasiert):
  - EFI verbindet Ereignisdaten mit Trackingdaten aller Spieler; Algorithmen werten beides parallel aus [verifiziert].
  - Linienbruch: Anzahl der Pässe, die eine ganze Einheit des verteidigenden Teams durchschneiden [verifiziert].
  - Je mehr Linienbrüche ein Team im Mittelfeld zulässt, desto mehr Spiele verliert es. Das ist ein Zusammenhang, keine belegte Ursache [verifiziert].
  - Ein Erkennungsalgorithmus unterscheidet Brüche durch, um und über die Linie [verifiziert].
- Konsequenzen für SPIELIQ: „Zugelassene Linienbrüche" als Qualitätsmaß für die Defensive.

### [B-46] FIFA Football Language – Defensive pressure, Type of pressure, Pressing, Distributing the ball, Take-on
- Organisation/Autor: FIFA Training Centre, FIFA Football Language (Glossar)
- URL: https://www.fifatrainingcentre.com/en/resources-tools/football-language/out-of-possession/defensive-pressure/index.php ; https://www.fifatrainingcentre.com/en/resources-tools/football-language/out-of-possession/defensive-pressure/pressing/type-of-pressure/index.php ; https://www.fifatrainingcentre.com/en/resources-tools/football-language/out-of-possession/defensive-pressure/pressing/index.php ; https://www.fifatrainingcentre.com/en/resources-tools/football-language/out-of-possession/index.php ; https://fifatrainingcentre.com/en/resources-tools/football-language/in-possession/distributing-the-ball/index.php ; https://www.fifatrainingcentre.com/en/resources-tools/football-language/in-possession/distributing-the-ball/ball-progression/take-on/index.php ; Startseite: https://www.fifatrainingcentre.com/en/resources-tools/football-language/index.php
- Datum (Veröffentlichung/Aktualisierung): Glossarseiten 15.11.2021, „Out of possession" 04.11.2021, Startseite 24.08.2021 (jeweils Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (alle genannten Glossarseiten; Videos nicht angesehen).
- Kernaussagen (paraphrasiert):
  - Defensiver Druck: Ein Spieler ohne Ball stellt den Ballführenden oder eine mögliche Anspielstation zu. Auch der Versuch, die Richtung von Zuspiel oder Bewegung zu diktieren, gilt als Druck, selbst ohne Ballgewinn [verifiziert].
  - Beispiel: Der Mittelstürmer drängt den Innenverteidiger zum Pass auf den Außenverteidiger; der Flügelspieler antizipiert das und rückt schon vor der Annahme heraus („pushing on") [verifiziert].
  - Pressing: den Raum zum Ballführenden schließen, um ihm Zeit und Raum zu nehmen [verifiziert].
  - Indirekter Druck: Raum verkleinern und Richtung vorgeben, ohne selbst den Ball erobern zu wollen. Direkter Druck: aggressiv den Abstand schließen und um den Ball kämpfen können. Im Glossar zum Take-on heißt es, beim indirekten Druck sei der Gegner nicht in angemessener Distanz, um um den Ball zu kämpfen; eine Meterangabe fehlt [verifiziert].
  - Pässe werden unter direktem, indirektem oder keinem Druck gespielt [verifiziert].
  - Take-on „inside" heißt am Gegner vorbei Richtung Feldmitte, „outside" weg von der Feldmitte [verifiziert].
  - Die Phase ohne Ball beginnt, sobald der Gegner kontrolliert in Besitz kommt: durch Annahme, losen Ball, Abfangen oder Standard [verifiziert].
- Konsequenzen für SPIELIQ:
  - Zentrale Ontologie: Die Engine unterscheidet keinen, indirekten und direkten Druck.
  - Beispiel für Feedback: „Du gibst die Richtung vor, bist aber nicht nah genug für direkten Druck."
  - Die Schwellen fehlen und müssen kalibriert werden; einziger FIFA-Anhaltspunkt für den 1v1-Abstand sind die 2–3 m aus [B-13] [Eigene Ableitung].

### [B-47] FIFA Football Language – Team shape, Units, Line break (through/around/over), Penetrative action
- Organisation/Autor: FIFA Training Centre, FIFA Football Language (Glossar)
- URL: https://www.fifatrainingcentre.com/en/resources-tools/football-language/in-possession/offering-to-receive/offer/team-shape/index.php ; https://www.fifatrainingcentre.com/en/resources-tools/football-language/in-possession/offering-to-receive/offer/team-unit/index.php ; https://www.fifatrainingcentre.com/en/resources-tools/football-language/in-possession/penetrative-action/index.php ; https://fifatrainingcentre.com/en/resources-tools/football-language/in-possession/penetrative-action/line-break/direction/index.php ; https://www.fifatrainingcentre.com/en/resources-tools/football-language/in-possession/penetrative-action/line-break/unit-broken/index.php ; https://www.fifatrainingcentre.com/en/resources-tools/football-language/in-possession/penetrative-action/line-break/total-opposition-units/index.php
- Datum (Veröffentlichung/Aktualisierung): 15.11.2021 (alle Seiten, Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (alle genannten Glossarseiten).
- Kernaussagen (paraphrasiert):
  - Team-Shape: der Umriss, der entsteht, wenn man die jeweils äußersten Spieler jeder Einheit verbindet. Angebote werden als innerhalb oder außerhalb dieses Umrisses erfasst [verifiziert].
  - Einheiten: Angebote werden vor, zwischen Einheit 1 und 2, 2 und 3, 3 und 4 oder hinter der letzten Einheit verortet. Eine Einheit (Linie) besteht aus mindestens zwei Spielern; das steht auf der Seite „Penetrative action" [verifiziert].
  - Linienbruch „durch": Der Ball läuft zwischen den beiden äußersten Spielern einer Einheit unterhalb Kopfhöhe. „Um herum": außen an den beiden äußersten Spielern vorbei. „Über": oberhalb Kopfhöhe [verifiziert].
  - Beispiele für penetrative Aktionen: Andribbeln vorbei an zwei Stürmern eines 4-4-2 bricht eine Linie; ein Pass zwischen zwei Mittelfeldspielern; das Umspielen eines schmalen Blocks über außen; ein diagonaler Ball über die Abwehr [verifiziert].
  - Erfasst wird, welche Einheiten überspielt wurden und wie viele Einheiten die gegnerische Formation hat (zwei bis vier) [verifiziert].
  - Die Sprache gliedert sich in vier Bereiche: mit Ball, ohne Ball, im Zweikampf („in contest"), Torwart. Jede Aktion wird nach ihrer Wirkung auf die gegnerische Team-Shape betrachtet (Quelle: Analyseartikel in [B-48]) [verifiziert].
  - Der Empfang innerhalb oder außerhalb der Team-Shape ist auf der Glossarseite zum Empfangsort noch als „coming soon" markiert [verifiziert].
- Konsequenzen für SPIELIQ:
  - Unmittelbar implementierbare Geometrie: Umriss je Einheit, Test auf Linienbruch.
  - Die Begriffe 1:1 übernehmen, damit SPIELIQ an die FIFA-Ausbildung anschließt [Eigene Ableitung].

### [B-48] FIFA Football Language – Offering to receive, Movement to receive, Receiving location (mit Analyseartikeln)
- Organisation/Autor: FIFA Training Centre, FIFA Football Language und Football Language Analysis
- URL: https://www.fifatrainingcentre.com/en/resources-tools/football-language/in-possession/movement-to-receive/index.php ; https://www.fifatrainingcentre.com/en/resources-tools/football-language/in-possession/receiving-the-ball/receiving-location/index.php ; https://fifatrainingcentre.com/en/resources-tools/football-language/in-possession/offering-to-receive/index.php ; https://www.fifatrainingcentre.com/en/game/performance-analysis/football-language-analysis/the-fifa-football-language.php ; https://www.fifatrainingcentre.com/en/game/performance-analysis/football-language-analysis/offering-to-receive.php ; https://www.fifatrainingcentre.com/en/game/performance-analysis/football-language-analysis/movement-to-receive.php
- Datum (Veröffentlichung/Aktualisierung): Glossar 04.11.2021 (Offering to receive) bzw. 15.11.2021; Analyseartikel 24.11.2022 („The FIFA Football Language", „Offering to receive") und 25.11.2022 („Movement to receive") (jeweils Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Glossarseiten und drei Analyseartikel).
- Kernaussagen (paraphrasiert):
  - Anbieten: ein aktives Signal, eine veränderte Körperstellung oder eine klare Bewegung, um den Ball zu bekommen. Es zählt auch, wenn der Ball nicht kommt; auch Ablenkungsläufe zählen [verifiziert].
  - Fünf Bewegungsarten: vor die erste Einheit, zwischen zwei Einheiten, von innen nach außen, von außen nach innen, hinter die letzte Linie [verifiziert].
  - Untertypen der Bewegung hinter die letzte Linie: aus der letzten Linie heraus, von vor der letzten Linie, die Linie zurückdrücken („pushing the line"), Kommen und Gehen. Dazu kommt „offside to onside": Start im Abseits, Annahme vor der letzten Linie [verifiziert].
  - Empfangsorte: vor der ersten Einheit, zwischen Einheit 1 und 2, 2 und 3, 3 und 4, hinter der letzten Einheit [verifiziert].
  - Erfassungsfolge mit Ball: Angebot → Bewegungsart → Herkunft des Balls → Empfangsort relativ zur Team-Shape → Druck bei Annahme → Aktion → Druck bei Weitergabe → Linienbruch → Ergebnis. Einheiten werden per Algorithmus aus Trackingdaten erkannt [verifiziert].
  - Ein Spieler hat im Schnitt nur etwa 1 Minute 49 Sekunden pro Spiel den Ball; das Verhalten ohne Ball ist deshalb ein wichtiger Leistungsindikator [verifiziert].
  - Klinsmann: Bewegungen zwischen und hinter den Verteidigern zwingen die Abwehrlinie zur Entscheidung zwischen Verfolgen und Übergeben [verifiziert].
  - WM 2018: Weltmeister Frankreich lag bei Läufen hinter die Kette nur im Mittelfeld der Rangliste; die Qualität der Bewegungen zählt mehr als ihre Anzahl [verifiziert].
- Konsequenzen für SPIELIQ: Das Freilaufen (ein Kerndefizit) wird objektiv bewertbar: Wechsel des Empfangsorts, Verlassen des Deckungsschattens, Position innerhalb oder außerhalb der Team-Shape [Eigene Ableitung].

### [B-49] Goalkeeper and defensive line distances when defending in the final third (mit verwandten Analysen)
- Organisation/Autor: FIFA Training Centre (Goalkeeping / Turnieranalysen); Pascal Zuberbühler und FIFA Football Data Insights
- URL: https://www.fifatrainingcentre.com/en/game/individual-qualities/goalkeeping/goalkeeper-and-defensive-line-distances-when-defending-in-the-final-third.php ; https://fifatrainingcentre.com/en/game/tournaments/olympic-football-tournament/2024/women/goalkeeping-line-height-and-defending-the-space.php ; https://fifatrainingcentre.com/en/fwc2022/technical-and-tactical-analysis/goalkeeper-height-and-connection-with-the-defensive-line.php
- Datum (Veröffentlichung/Aktualisierung): Andrada-Artikel 31.05.2022; WM-2022-Analyse 19.05.2023; Olympia-Analyse 09.08.2024 (jeweils Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (alle drei Artikel; Clips nicht angesehen).
- Kernaussagen (paraphrasiert):
  - Andrada (Monterrey, Klub-WM 2021), Ball im Abwehrdrittel: Torwart im Mittel 4,8 m vor der Torlinie, Abwehrlinie im Mittel 17,4 m vom Tor. Die Linie hielt an der Strafraumgrenze, bis ein Ball hinter sie gespielt wurde. Wurde die 16-m-Linie außen überschritten, fiel sie in Linie mit dem Ball zurück und rückte bei einem Rückpass sofort wieder heraus [verifiziert].
  - WM 2022: Torhüter standen im Mittel 1,3 m höher und 1,0 m näher an der Abwehrlinie als 2018 (Torwarthöhe 13,1 gegenüber 11,8 m; Abstand zur Linie 20,4 gegenüber 21,4 m). Bei eigenem Ballbesitz im letzten Drittel standen sie laut Text 3,6 m höher als 2018; die Zusammenfassung derselben Seite nennt 3,8 m [verifiziert; Inkonsistenz auf der Seite].
  - Olympia 2024 (Frauen), eigener Ballbesitz im letzten Drittel: Torwarthöhe 28 m gegenüber 24,2 m bei der WM 2023; Abwehrlinie 57,4 m (3,6 m höher); Abstand Torwart–Abwehrlinie 29,4 m gegenüber 29,6 m [verifiziert].
  - Zuberbühler: Eine absolut richtige Torwartposition gibt es nicht. Entscheidend ist, dass Abwehr und Trainer wissen, wo der Torwart in welcher Situation steht [verifiziert].
- Konsequenzen für SPIELIQ: Deskriptive Werte aus dem Spitzenfußball, keine Normen für U14/U15. Höchstens zur Plausibilitätsprüfung.

### [B-50] Using defensive structures to counter-attack and score (U-17-WM 2023 der Männer, Analyse nach dem Turnier)
- Organisation/Autor: FIFA Training Centre / TSG (Julio González, Pascal Zuberbühler)
- URL: https://fifatrainingcentre.com/en/game/tournaments/fu17wc/2023/post-tournament-analysis/using-defensive-structures-to-counter-attack-and-score.php
- Datum (Veröffentlichung/Aktualisierung): 13.12.2023 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Artikeltext; Clips nicht angesehen).
  - Korrektur nach Volltextprüfung: Es handelt sich um das Männerturnier, die U-17-WM 2023 in Indonesien (Beispiele: Usbekistan gegen England, Frankreich gegen USA, Deutschland gegen Spanien). Die Angabe „Frauen-WM" aus der Suchzusammenfassung war falsch.
- Kernaussagen (paraphrasiert):
  - Die Teams verbrachten 18 % ihrer Zeit ohne Ball im tiefen Block, 3,5 mehr als 2019 (die Seite schreibt „%") [verifiziert].
  - Dadurch stieg die Zeit im unbedrängten Aufbau (+2,6 %), die im bedrängten sank (−3,1 %); hohes Pressing und Gegenpressing kamen etwas seltener vor [verifiziert].
  - Alle vier Halbfinalisten konterten wirkungsvoll aus Blöcken: nach Ballgewinn früh vorwärts spielen, lange Läufe, dabei eine ausgewogene Restverteidigung halten [verifiziert].
- Konsequenzen für SPIELIQ: Auch im Elite-Nachwuchs spielt der tiefe Block eine Rolle; Szenarien dazu einplanen.

### [B-51] FIFA World Cup 2026 – Group stage review
- Organisation/Autor: FIFA Training Centre; TSG-Experten Michael O'Neill und Pascal Zuberbühler
- URL: https://www.fifatrainingcentre.com/en/fifa-world-cup-2026/group-stage-review.php
- Datum (Veröffentlichung/Aktualisierung): 30.06.2026 (Seitenkopf; die Turnierübersicht nennt 16.07.2026) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (schriftliche Zusammenfassung; Video nicht angesehen).
- Kernaussagen (paraphrasiert):
  - Zwei prägende Trends der Gruppenphase: Gegenpressing zur Spielkontrolle und die Bedeutung der Torhüter im Aufbau [verifiziert].
  - Wirksames Gegenpressing ist eine kollektive Reaktion direkt nach Ballverlust über kurze Distanzen, kein individuelles Hinterherlaufen. Teams gegenpressen, um Angriffe fortzusetzen oder Konter zu verhindern; eine 3 + 2-Restverteidigung sichert den Raum dahinter [verifiziert].
  - Nur 52 % der Abstöße führten Torhüter aus (WM 2022: 91 %) [verifiziert].
- Konsequenzen für SPIELIQ: Umschaltmomente wie das Gegenpressing als spätere Ausbaustufe vorsehen.

### [B-52] Presseberichte zum Abschlussbericht der TSG zur WM 2026 (africasoccer.com; Daily Monitor, Uganda)
- Organisation/Autor: africasoccer.com; Daily Monitor (Uganda). Es handelt sich um Sekundärquellen.
- URL: https://africasoccer.com/?p=628217 ; https://www.monitor.co.ug/uganda/sports/soccer/cranes-can-learn-from-world-cup-trends--5622082
- Datum (Veröffentlichung/Aktualisierung): unbekannt (laut Presse erschien der Bericht Anfang Oktober 2026)
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet. Der Primärbericht wurde nicht eingesehen.
- Kernaussagen (paraphrasiert):
  - Laut Presse: rund 500 Seiten, alle 104 Spiele, elf Trends.
  - Es gab keinen einzelnen Weg zum Erfolg: Hohes Pressing, disziplinierte Blöcke und schnelles Umschalten waren jeweils erfolgreich.
  - Kap Verde wird als Beispiel genannt, wie kompaktes Verteidigen, kollektive Organisation und ein mitspielender Torwart gegen stärkere Gegner helfen.
- Konsequenzen für SPIELIQ: Stützt die Kontextabhängigkeit. Die Engine soll die Pressinghöhe nicht als richtig oder falsch bewerten, sondern prüfen, ob sie zum gewählten Plan passt.

### E. UEFA

### [B-53] UEFA Grassroots Charter (Programmseite, Edition 2023)
- Organisation/Autor: UEFA
- URL: https://www.uefa.com/development/grassroots/grassroots-programmes ; https://editorial.uefa.com/resources/028b-1a8000ab4813-8294900416bd-1000/uefa_grassroots_charter_2023_edition_en.pdf ; https://www.uefa.com/news-media/news/01ee-0f861b409205-58c13641167c-1000--uefa-s-grassroots-programme/
- Datum (Veröffentlichung/Aktualisierung): Programmseite veröffentlicht 25.03.2024, geändert 21.10.2026; Charta-PDF erstellt 15.06.2023 und laut Art. 12 am 28.06.2023 vom UEFA-Exekutivkomitee verabschiedet; Hintergrundartikel 01.02.2011 (Meta-Angaben bzw. PDF) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Programmseite, Charta-PDF vollständig, Artikel von 2011).
  - Korrektur nach Volltextprüfung: Alle vier Säulen des Grassroots Framework stehen auf der Programmseite: Spieler, Fußballumfeld, Spiel, Personal („workforce"). Dass die Charta 2005 eingeführt wurde, bestätigt der UEFA-Artikel von 2011.
- Kernaussagen (paraphrasiert):
  - Ziele: allen ermöglichen, in sicherem, spaßigem und inklusivem Umfeld zu spielen, zu lernen und Freude zu haben; strategische und nachhaltige Grassroots-Entwicklung; mehr Teilnahme; mehr Qualität, auch in der Trainerausbildung [verifiziert].
  - Definition: Grassroots ist jeder nicht professionelle und nicht elitäre Fußball, bei dem Teilnahme statt Leistung das Ziel ist; Kinderfußball gehört dazu [verifiziert].
  - Rechtsverbindliche Vereinbarung mit Mindestanforderungen für Fördermittel (HatTrick): u. a. eine Vollzeitstelle, eigenes Budget, Grassroots-Komitee, Strategie, regelmäßige Evaluation sowie Programme in sechs Bereichen (Schulfußball, Grassroots-Trainerausbildung, Vereinsentwicklung, Kinder- und Jugendschutz, Behindertenfußball, flexible Formate und Spielerwege) [verifiziert].
  - Taktische Prinzipien enthält die Charta nicht [verifiziert].
- Konsequenzen für SPIELIQ: Werterahmen für die Produktgestaltung (Spaß, Sicherheit, Inklusion), etwa kein bloßstellendes Feedback. Inhaltlich-taktisch nicht nutzbar.

### [B-54] The UEFA Coaching Convention – staying ahead of the game (mit Konventionstext 2020)
- Organisation/Autor: UEFA; Original-PDF der Konvention auf editorial.uefa.com; Kopie auf der Seite des Moldauischen Fußballverbands (FMF, nicht geöffnet)
- URL: https://www.uefa.com/news-media/news/0261-1060f6bf9a9e-3cbf44ac60ab-1000--the-uefa-coaching-convention-staying-ahead-of-the-game ; Original: https://editorial.uefa.com/resources/025d-0f8430a3fa11-5122cbe26f9c-1000/uefa_coaching_convention_2020.pdf ; Kopie: https://fmf.md/cdn/docs/materiale-didactice/Convenția pentru antrenori UEFA 2020 ENG.pdf
- Datum (Veröffentlichung/Aktualisierung): Artikel 15.09.2020 (Meta-Angabe); Konvention 2020 (PDF erstellt 01.05.2020); Konvention 1998 eingeführt [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Artikel und Original-PDF der Konvention; die Kopie auf fmf.md wurde nicht geöffnet).
  - Korrektur nach Volltextprüfung: „Vier Hauptziele" lässt sich nicht bestätigen. Der Artikel nennt neun Prioritäten, die Konvention selbst zwölf Ziele (Art. 2, a–l). Bestätigt ist: 1998 eingeführt, die Ausgabe 2020 ist die vierte. Die Jahre der Zwischenfassungen nennt der Artikel nicht.
- Kernaussagen (paraphrasiert):
  - Mission: hohe Standards der Trainerausbildung, um bessere Trainer und letztlich bessere Spieler zu entwickeln; laut Artikel rund 190.000 nach UEFA-Standard ausgebildete Trainer [verifiziert].
  - Ziele u. a.: gut ausgebildete Trainer auf allen Ebenen für das Wohl und die körperliche, psychische und technische Entwicklung der Spieler; Trainerausbildung durch realitätsnahes Lernen („reality-based learning") [verifiziert].
  - Das UEFA-C-Diplom ist Teil der Konvention 2020 (mindestens 60 h, je 30 h neben und auf dem Platz). Weitere Mindestumfänge: B 120 h, A 180 h, Pro 360 h, Youth B 60 h, Elite Youth A 120 h [verifiziert].
- Konsequenzen für SPIELIQ: Zielnutzer sind Jugendtrainer, etwa auf C-Lizenz-Niveau; Begriffe anschlussfähig halten. Realitätsnahes Lernen spricht für spielnahe Szenarien statt abstrakter Aufgaben [Eigene Ableitung].

### [B-55] UEFA Elite Youth A – Syllabus der Mindestinhalte (Original) und Kursdetails
- Organisation/Autor: UEFA; Original-Syllabus auf editorial.uefa.com; eine Kopie auf der Seite des Kasachischen Fußballverbands (KFF) wurde nicht geöffnet
- URL: https://editorial.uefa.com/resources/0267-11ec0827b73f-ad3556841fa3-1000/uefa_elite_youth_a_diploma_2020_en.pdf ; https://www.uefa.com/news-media/news/0268-11f1ac36684b-121f231223be-1000--course-details-the-uefa-elite-youth-a-diploma/ ; Kopie: https://kff.kz/kk/download/68a468175cb27
- Datum (Veröffentlichung/Aktualisierung): Kursseite 02.04.2021 (Meta-Angabe); Syllabus „2020 edition" (PDF erstellt 22.07.2020) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Kursseite; Original-Syllabus vollständig). Die URL ohne „www" lieferte 403, die www-Fassung funktionierte.
- Kernaussagen (paraphrasiert):
  - Vier Kompetenzbereiche: Entwicklungstrainer, Spieler und Team, Trainingsumfeld, Spiel [verifiziert].
  - Spielnahe Trainingseinheiten mit Gegner, Druck und Intensität gestalten [verifiziert].
  - Spiele als Evaluations- und Lerninstrument für Einzelspieler und Team analysieren; den Matchplan passend zur Spielphilosophie des Vereins erstellen [verifiziert].
  - Mindestens 120 Stunden, davon mindestens 95 h angeleitete Inhalte und 25 h Praxiserfahrung, etwa zur Hälfte auf und neben dem Platz. Die genaue Stundenverteilung je Modul legen die Mitgliedsverbände fest [verifiziert].
  - Entscheidungen: Entscheidungen und Problemlösen regelmäßig in die Trainingseinheiten einbauen; im Spiel die Autonomie der Spieler bei Entscheidungen und Problemlösen unterstützen; Spieler anleiten, ihr eigenes Spiel zu bewerten und sich selbst zu steuern [verifiziert].
  - Altersgerecht coachen; Ziele nach biologischem, kalendarischem und Trainingsalter setzen; Spieler in den Lernprozess einbeziehen und Eigenverantwortung ermöglichen [verifiziert].
- Konsequenzen für SPIELIQ: Die UEFA-Ausbildung verlangt spielnahes Training mit Gegnern und Druck und ausdrücklich Entscheidungs- und Problemlösetraining sowie Selbstbewertung. Deshalb Szenarien immer mit Gegenspielern bauen, später mit Zeitdruck; Reflexion und Selbstbewertung als Ergänzung [Eigene Ableitung]. Die Lizenz zielt auf Elite-Jugendliche auf dem Weg zum Profi; die Übertragung auf Amateur-C-Junioren ist eine Ableitung.

### [B-56] UEFA C Diploma und Grassroots-Trainerausbildung (mit iCoachKids-Partnerschaft)
- Organisation/Autor: UEFA
- URL: https://www.uefa.com/news-media/news/0268-11fd877f2f8d-d1fb688ef408-1000--how-is-uefa-helping-national-associations-develop-grassroots/ ; https://www.uefa.com/development/grassroots/grassroots-partnership ; Startmeldung: https://www.uefa.com/insideuefa/about-uefa/news/0267-11ed9a97c26d-ea6704f9e97f-1000--new-uefa-c-diploma-launches-for-grassroots-coaches/
- Datum (Veröffentlichung/Aktualisierung): Artikel 08.04.2021; Startmeldung C-Diplom 06.04.2021; Partnerseite veröffentlicht 28.03.2024, geändert 21.08.2026 (Meta-Angaben) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (alle drei Seiten).
  - Korrektur nach Volltextprüfung: Die Formulierungen „Methodik und Inhalte für das heutige Kind" und „motivierendes Klima" wurden auf den geöffneten Seiten nicht gefunden. Sinngemäß belegt ist: Das C-Diplom vermittelt Werkzeuge für sichere, freudvolle und altersgerechte Einheiten für Spieler jeden Alters, Geschlechts, Könnens und Hintergrunds.
- Kernaussagen (paraphrasiert):
  - Das C-Diplom ist der Einstieg für Eltern, Ehrenamtliche und Lehrkräfte: mindestens 60 h; die Lizenz gilt drei Jahre [verifiziert].
  - Ziel laut UEFA (Maxwell Scherrer): glücklichere, gesündere Menschen; Spieler sollen Freude haben, Fähigkeiten entwickeln und dem Spiel lebenslang verbunden bleiben [verifiziert].
  - Über die Partnerschaft mit iCoachKids gibt es drei kostenlose E-Learning-Kurse (wirksame Umgebungen für Kinder im Sport; kinder- und jugendzentriertes Coaching; Planen, Durchführen, Reflektieren), die das C-Diplom ergänzen [verifiziert].
  - Laut Programmseite erwarben 2022 bis 2025 mehr als 300.000 Personen das C-Diplom [verifiziert].
- Konsequenzen für SPIELIQ: Feedback ermutigend und lernorientiert gestalten.

### [B-57] UEFA Technical Reports 2023/24 (Klubwettbewerbe) mit Performance Insight zum Mittelfeldblock von Real Madrid
- Organisation/Autor: UEFA, Technical Observers und Performance-Analyse; Giovanni van Bronckhorst
- URL: https://de.uefa.com/news-media/news/0290-1bb67e814cd7-efcec6f408f4-1000--expert-analysis-in-2023-24-uefa-technical-reports ; https://www.uefa.com/uefaeuropaleague/news/0290-1bb668af762e-7df3ad2e2d47-1000--technical-reports-read-the-2023-24-reports-for-the-champions/ ; https://indd.adobe.com/view/publication/f2775b56-3f10-48b1-af79-55026873e9a5/l7c5/publication-web-resources/pdf/UCL_Tech-Report_2023-24_Digital.pdf ; https://www.uefa.com/uefachampionsleague/news/028d-1ad2aace62a4-fd3586ac6b79-1000--champions-league-performance-insights-real-madrid-s-mid-block/
- Datum (Veröffentlichung/Aktualisierung): Berichtsartikel 27.08.2024; Performance Insight 06.05.2024 (Meta-Angaben) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (beide Berichtsartikel und die Performance Insight). Die vollständigen Berichte (uefatechnicalreports.com, indd.adobe.com) waren nicht erreichbar.
  - Korrektur nach Volltextprüfung: Die vierte URL war abgeschnitten; die vollständige Adresse ist oben ergänzt.
- Kernaussagen (paraphrasiert):
  - Über 180 beobachtete Spiele; kompaktes Verteidigen, hohes Pressing und herausragende Einzelspieler als Trends [verifiziert].
  - Real Madrid verbrachte im Halbfinal-Hinspiel in München 38 % der Zeit ohne Ball im Mittelfeldblock. Räume statt Spieler zu markieren ist laut UEFA-Analyseabteilung ein allgemeiner Trend in der Champions League [verifiziert].
  - Van Bronckhorst: Im Mittelfeldblock verteidigt man Raum, deshalb steht man eng und kompakt; wichtig ist, die Linien zu schließen, vor allem gegen Mittelfeldspieler, die zwischen Abwehr und Mittelfeld laufen [verifiziert].
  - Größte Gefahr für einen Mittelfeldblock sind meist Läufe in den Raum hinter der Kette. Innenverteidiger stehen deshalb halb geöffnet, um sofort sprinten zu können [verifiziert].
  - Zahlen aus dem Spiel gegen Bayern: Abwehrlinie im Mittel 35,7 m hoch; in einer Szene nur 21,8 m zwischen höchstem und tiefstem Madrid-Spieler und 44 m zwischen den Außenverteidigern [verifiziert].
  - Trainingshinweise: zuerst die Bewegungen drillen („bewegt sich der Ball, bewegt sich das Team"); der ballferne Außenverteidiger rückt ein, damit die Abstände zu den Innenverteidigern und zum Mittelfeld klein bleiben; klare Zuständigkeiten, z. B. ist der rechte Außenverteidiger für den ballführenden linken Flügel zuständig, ein Mittelfeldspieler sichert innen; Pressing-Auslöser wie der Pass des Innenverteidigers auf den Außenverteidiger oder auf die 6, abhängig von den Stärken des Gegners [verifiziert].
  - Gareth Southgate lobte Madrids Verteidigen im Viertelfinale gegen Manchester City: gute Winkel der Flügelspieler, Druck ohne Fouls und ohne Fernschüsse zuzulassen [verifiziert].
  - Gegenbeispiel im Europa-League-Finale: Atalanta presste Mann gegen Mann und spielte hinten 1v1 ohne freien Mann; laut den Beobachtern ungewöhnlich [verifiziert].
- Konsequenzen für SPIELIQ: Raumorientierung als Standard im Block. Das Risiko des Tiefenlaufs muss die Engine mitprüfen (Linienhöhe gegen Absicherung der Tiefe). Mann-gegen-Mann-Pressing als wählbare Teamvorgabe (c) zulassen.

### [B-58] UEFA Champions League performance insights: going 1v1 (Roberto Martínez)
- Organisation/Autor: UEFA; Roberto Martínez (UEFA Technical Observer); weitere Beiträge von Ole Gunnar Solskjær und Thomas Broch Brantsæter (Norwegischer Verband)
- URL: https://fr.uefa.com/uefachampionsleague/news/028a-1a1bf7e6d9ae-9ea32505034e-1000--champions-league-performance-insights-going-1v1
- Datum (Veröffentlichung/Aktualisierung): 05.02.2024 (Meta-Angabe) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Artikeltext; Clips nicht angesehen). Der Inhalt des Clips „Defending diagonally" ist im Text beschrieben.
- Kernaussagen (paraphrasiert):
  - Der Innenverteidiger hat laut Martínez die anspruchsvollste Rolle; auch in Europa gibt es mehr 1v1-Verteidigen [verifiziert].
  - Nachwuchstrainer sollten mehr 1v1-Varianten üben lassen: mit dem Rücken zum Spiel, frontal, diagonal und seitlich [verifiziert].
  - Diagonal verteidigen: Der Flügelspieler will außen durch, um zu flanken; der Innenverteidiger sichert und stoppt ihn mit einem schrägen Laufweg. Innenverteidiger müssen heute öfter aus ihrer Einheit heraus diagonal verteidigen [verifiziert].
  - Solskjær: Grundlage des Gegenpressings ist eine gute Absicherung beim eigenen Angriff; Verteidiger nehmen die gegnerischen Angreifer eng [verifiziert].
  - Norwegischer Verband: junge Innenverteidiger früh auf Situationen in mehrere Richtungen vorbereiten; Bio-Banding nutzen; dazu zwei Übungsvorschläge [verifiziert].
- Konsequenzen für SPIELIQ: 1v1-Szenarien nach Anlaufrichtung ordnen (frontal, diagonal, seitlich, mit dem Rücken zum Spiel).

### [B-59] UEFA Women's Champions League performance insights: 1v1 actions as tools (Lluís Cortés)
- Organisation/Autor: UEFA; Lluís Cortés (UEFA Technical Observer)
- URL: https://fr.uefa.com/womenschampionsleague/news/02a0-1f7a27e806ba-4ae8f55a68a0-1000--women-s-champions-league-performance-insights-1v1-action
- Datum (Veröffentlichung/Aktualisierung): 19.12.2025 (Meta-Angabe; Saison 2025/26, Spieltag 6, Chelsea in Wolfsburg) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Artikeltext).
  - Korrektur nach Volltextprüfung: Der Artikel behandelt 1v1-Aktionen im Angriff (Dribblings), nicht das Verteidigen.
- Kernaussagen (paraphrasiert):
  - Die meisten 1v1-Aktionen fanden auf den Flügeln statt, wo klarere Referenzpunkte und mehr Raum bestanden. Risiko und Ertrag eines 1v1 hängen stark von der Zone ab [verifiziert].
  - Entscheidungen im 1v1 sind laut Cortés vor allem kontextabhängig: Körperausrichtung, Raum, Druck, Unterstützung, individuelle Qualität, Risiko [verifiziert].
  - Training soll die Ausführung mit angeleiteter Entscheidungsfindung verbinden. Spieler sollen Situationen erleben, in denen das Dribbling, und solche, in denen Kombination oder Ballsicherung besser ist. Wer Entscheidungen zu stark kontrolliert, erzeugt starre Spieler [verifiziert].
  - Erfolg im 1v1 bemisst sich nicht nur am Überspielen; oft reicht es, Raum für die nächste Aktion zu schaffen [verifiziert].
- Konsequenzen für SPIELIQ: Die Zone (Flügel oder Zentrum) in die Risikobewertung einbeziehen. Feedback auf die Passung zur Situation stützen statt auf eine feste Lösung [Eigene Ableitung].

### [B-60] Out now: technical reports on the 2025 youth tournaments (U17/U19)
- Organisation/Autor: UEFA
- URL: https://www.uefa.com/under19/news/029d-1ebe711ae8ef-61e5485a824f-1000--out-now-technical-reports-on-the-2025-youth-tournaments/
- Datum (Veröffentlichung/Aktualisierung): 17.09.2025 (Meta-Angabe) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Artikel). Die vier Berichte auf uefatechnicalreports.com waren nicht erreichbar.
  - Korrektur nach Volltextprüfung: Die Beobachtungen zur Dreierkette (Österreich und Polen standardmäßig) und zu Pressingansätzen, die Gegner in bestimmte Zonen lenken, beziehen sich laut Artikel auf die Frauen-Turniere (U17 und U19 2025), nicht auf die U17-EM der Männer.
- Kernaussagen (paraphrasiert):
  - Frauen-Turniere: häufiger Dreierketten, Rollen der Schienenspieler in Angriff, Abwehr und hohem Pressing; vielfältige Pressingansätze, mehr Teams lenken den Gegner gezielt in bestimmte Zonen [verifiziert].
  - U17-EM der Männer: Mittelfeldblock statt aggressiven Hochpressings; 70 % der Konter begannen zentral [verifiziert].
  - U19-EM der Männer: häufige Dreiecke aus Flügelspieler, Außenverteidiger und offensivem Mittelfeldspieler auf dem Flügel [verifiziert].
  - Die Berichte enthalten eigens entwickelte Trainingsübungen [verifiziert].
- Konsequenzen für SPIELIQ: Wohin gelenkt wird, ist Teil des Teamplans (c) und sollte vom Trainer einstellbar sein.

### [B-61] Small is beautiful for Scottish player development (UEFA)
- Organisation/Autor: UEFA (Bericht über den Schottischen Fußballverband)
- URL: https://de.uefa.com/news-media/news/01ef-0f86237adb6a-4f3f0043d25a-1000--small-is-beautiful-for-scottish-player-development
- Datum (Veröffentlichung/Aktualisierung): 15.03.2011 (Meta-Angabe; geändert 16.04.2012) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Artikeltext).
- Kernaussagen (paraphrasiert): Der Schottische Verband spielt mit 4er-Teams bei 6- bis 9-Jährigen, mit 7er-Teams bei 9- bis 12-Jährigen und danach 11 gegen 11. Das Format soll zu Alter und Entwicklungsstand passen; Grundlage waren Studien und der Austausch mit anderen Verbänden, u. a. im UEFA Study Group Scheme [verifiziert].
- Konsequenzen für SPIELIQ: Feldgröße und Spielerzahl als Altersvorgabe parametrisieren.

### [B-62] UEFA Grassroots Newsletter Nr. 3 (Dezember 2005; newsfiles/377902.pdf)
- Organisation/Autor: UEFA, Football Development Division; Editorial von Andy Roxburgh (damals UEFA-Technikdirektor)
- URL: https://www.uefa.com/newsfiles/377902.pdf
- Datum (Veröffentlichung/Aktualisierung): Dezember 2005 (Titelseite „No. 3, December 2005"; PDF-Titel „Grassroots Newsletter #3 (12.2005)") [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (PDF, 16 Seiten; ausgewertet v. a. das Editorial).
  - Korrektur nach Volltextprüfung: Inhalt und Datum der Datei sind bestätigt.
- Kernaussagen (paraphrasiert):
  - Editorial „Yesterday's Child": Früher lernten Kinder im Straßenfußball durch Ausprobieren und Spielen. Heute müssen Trainer über Kleinfeldspiele und Übungen Spielsituationen schaffen, in denen Kinder eigene Lösungen für die Probleme des Spiels finden [verifiziert].
  - Maxi-Pitches (40 × 20 m) für Kleinfeldspiele sollen gefördert werden [verifiziert].
  - Grundlagenphase der Entwicklung: 9–12 Jahre [verifiziert].
- Konsequenzen für SPIELIQ: Historischer Beleg (2005), dass die UEFA Lernen über Spielprobleme betont; inhaltlich allgemein.

### [B-63] UEFA Training Ground launched / TactX (historisch)
- Organisation/Autor: UEFA (Football Development und uefa.com)
- URL: https://www.uefa.com/news-media/news/01c1-0f84aef00f0b-6cb0fa30cb2b-1000--training-ground-launched ; https://www.uefa.com/news-media/news/01d4-0f84ef118ffb-80d02d0ca0c1-1000--tactx-set-to-revolutionise-coaching
- Datum (Veröffentlichung/Aktualisierung): Training Ground 16.05.2007; TactX 16.12.2008 (Meta-Angaben) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (beide Artikel). Ob die Plattform heute noch existiert, ist unbekannt.
  - Korrektur nach Volltextprüfung: Dass die Plattform für Schiedsrichter gedacht war und Übungen aus dem Trainerhandbuch des spanischen Verbands (RFEF) enthielt, steht in keinem der beiden Artikel.
- Kernaussagen (paraphrasiert):
  - Training Ground: Videoanleitungen für Spieler und Trainer aller Altersstufen (u. a. mit Ronaldinho und Pirlo), taktische Tipps von Roy Hodgson und Lars Lagerbäck; Ausblick auf ein Studium zur UEFA-B-Lizenz [verifiziert].
  - Ein Redakteur stellte fest, zu viele Jugendliche verließen den Fußball mit 14 [verifiziert].
  - TactX: 3D-Animationen aus Motion Capture zum Erstellen, Betrachten aus mehreren Blickwinkeln und Teilen von Übungen; Nachfolger der Software TactFOOT [verifiziert].
  - Taktische Prinzipien enthalten die Artikel nicht [verifiziert].
- Konsequenzen für SPIELIQ: Frühes Beispiel eines digitalen Taktikwerkzeugs eines Verbands; inhaltlich nicht verwertbar.

### [B-64] Following your principles: Day three on UEFA B course (The FA, Jamie Bradbury)
- Organisation/Autor: The FA (Erfahrungsbericht über einen UEFA-B-Kurs in England)
- URL: https://www.thefa.com/news/2014/mar/21/jamie-bradbury-uefa-b-coaching-day-three
- Datum (Veröffentlichung/Aktualisierung): 21.03.2014 (aus der URL)
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet.
- Kernaussagen (paraphrasiert): Die verteidigende Mannschaft verweigert Raum durch Verzögern, Tiefe, Kompaktheit sowie Absicherung und Balance, und zwar mit Geduld. Ziel sind Ballgewinn und möglichst wenige gegnerische Chancen.
- Konsequenzen für SPIELIQ: Bestätigt das klassische Prinzipienset in einer UEFA-lizenzierten Ausbildung, allerdings nur indirekt über einen Erfahrungsbericht.

### F. Weitere Verbände (Abgleich)

### [B-65] The FA's 4 Corner Model
- Organisation/Autor: The FA (England); entwickelt von Craig Simmons (laut Treffer)
- URL: https://www.thefa.com/bootroom/resources/coaching/the-fas-4-corner-model ; https://learn.englandfootball.com/articles/resources/2022/The-FA-4-Corner-Model
- Datum (Veröffentlichung/Aktualisierung): unbekannt (Seite auf der Lernplattform laut URL von 2022)
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet.
- Kernaussagen (paraphrasiert):
  - Vier Ecken: technisch/taktisch, physisch, psychologisch, sozial. Sie gelten als gleichwertig und beeinflussen sich gegenseitig.
  - Das Modell ist ein Denkwerkzeug zum Beobachten, Reflektieren und Entscheiden. Es berücksichtigt individuelle Bedürfnisse und das biologische neben dem kalendarischen Alter.
  - Grundlage der England DNA; auch in den EPPP-Akademien genutzt.
- Konsequenzen für SPIELIQ: SPIELIQ bedient vor allem die taktisch-kognitive Ecke. Die soziale Ecke ließe sich über Kommunikationsaufgaben im Team ansprechen [Eigene Ableitung].

### [B-66] England DNA (Start 2014; How we play – mit und ohne Ball)
- Organisation/Autor: The FA
- URL: https://www.thefa.com/news/2014/dec/04/england-dna-launch ; https://www.thefa.com/bootroom/resources/england-dna/how-we-play ; https://www.thefa.com/bootroom/resources/england-dna/how-we-play/out-of-possession ; https://www.thefa.com/bootroom/resources/coaching/how-to-defend-like-england-an-overview
- Datum (Veröffentlichung/Aktualisierung): Start am 04.12.2014 (aus der URL); übrige Seiten unbekannt
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet. Aus welcher FA-Seite die Definition der Pressinghöhen stammt, ist unklar.
- Kernaussagen (paraphrasiert):
  - Mit Ball: den Ballbesitz klug dominieren und die richtigen Momente für Vorwärtsspiel und Durchbruch wählen.
  - Ohne Ball: den Ball klug, möglichst früh und effizient zurückgewinnen.
  - Drei Pressinghöhen: hoch (so weit vorn wie möglich), mittel (ab dem offensiven Mitteldrittel), tief (ab der Mittellinie).
  - Der Torwart gehört zum Team.
  - Die Serie „How to defend like England" behandelt Umschalten, Raum hinter der Kette, Flügel, Überzahlen, Rollen und Beziehungen sowie Flanken.
- Konsequenzen für SPIELIQ: Die Begriffe weichen von FIFA ab: Bei der FA beginnt „tief" an der Mittellinie, bei FIFA liegt der tiefe Block im Abwehrdrittel. SPIELIQ braucht ein eigenes Glossar.

### [B-67] How to work on the principles of football (2023) und What are the principles of football (2022)
- Organisation/Autor: The FA / England Football Learning
- URL: https://learn.englandfootball.com/articles/resources/2023/How-to-work-on-the-principles-of-football ; https://learn.englandfootball.com/articles/resources/2022/What-are-the-principles-of-football
- Datum (Veröffentlichung/Aktualisierung): 2023 bzw. 2022 (aus der URL)
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet. Die Liste der Schlüsselfertigkeiten je Prinzip fehlt im Snippet.
- Kernaussagen (paraphrasiert):
  - Fünf Angriffsprinzipien: Penetration, Raum schaffen, Bewegung, Unterstützung, Kreativität.
  - Fünf Verteidigungsprinzipien: Verzögern, Kompaktheit, Absicherung und Balance, Pressing, Kontrolle und Zurückhaltung.
  - Übungen sollen sich wie Fußball anfühlen: mit Toren, Gegnern und Spielrichtung. Penetration braucht Ziele, Raumschaffen größere Felder. Spieler sollen eigene Entscheidungen treffen.
  - Penetration heißt, den Ball durch, um oder über den Gegner zu spielen; Raum schaffen heißt, sich auszubreiten.
- Konsequenzen für SPIELIQ: Aktuelle, offizielle Prinzipienliste eines großen Verbands. Sie deckt sich weitgehend mit der FIFA Football Language (durch/um/über).

### [B-68] Mastering defensive techniques and roles (FA Boot Room)
- Organisation/Autor: The FA, Boot Room
- URL: https://www.thefa.com/bootroom/resources/coaching/mastering-defensive-techniques-and-roles
- Datum (Veröffentlichung/Aktualisierung): 16.12.2019 (laut Suchzusammenfassung)
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet. Das Snippet bricht vor dem ausführlichen Teil zu Absicherung und Balance ab.
- Kernaussagen (paraphrasiert):
  - Grundlagenphase (5–11): Die Ballbeherrschung hat Vorrang, Defensive lässt sich trotzdem über strukturierte Übungen vermitteln. Ausgangspunkt ist der Druck des 1. Verteidigers, danach lernen die Spieler, ihn zu unterstützen.
  - Wer in die Jugendentwicklungsphase (12–16) kommt, sollte die 1v1-Technik beherrschen. Kleinfeldspiele mit mehr Spielern führen dann Absicherung und Balance ein.
- Konsequenzen für SPIELIQ: Bestätigt die Reihenfolge 1. Verteidiger → 2. Verteidiger → Balance. Für U14/U15 ist Absicherung und Balance das passende Thema.

### [B-69] FA Boot Room – Defending in pairs (12–16), Defensive cover and balance (5–11), Defending to score (5–11)
- Organisation/Autor: The FA, Boot Room
- URL: https://www.thefa.com/bootroom/resources/coaching/out-of-possession-defending-in-pairs ; https://www.thefa.com/bootroom/resources/coaching/out-of-possession-defensive-cover-and-balance ; https://www.thefa.com/bootroom/resources/coaching/transition-defending-to-score
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet.
- Kernaussagen (paraphrasiert):
  - Verteidigen im Paar (U14, Grassroots): wann das Paar Druck macht und wann es absichert bzw. Balance gibt.
  - Absicherung und Balance (5–11): 3v3, 6v6 und ein „Gauntlet"-Format, um das Tor als Team zu schützen.
  - Defending to score (5–11): 2v1- und 2v2-Zielspiele für Pressen, Absichern und Verzögern.
- Konsequenzen für SPIELIQ: Szenarien im Paar (2v1, 2v2) als Einstieg ins Rollenverständnis.

### [B-70] FA Boot Room – 1v1 emergency defending (12–16)
- Organisation/Autor: The FA, Boot Room
- URL: https://www.thefa.com/bootroom/resources/coaching/out-of-possession-1v1-emergency-defending
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet. Ob die Seite etwas zu innen oder außen sagt, ist im Snippet nicht erkennbar.
- Kernaussagen (paraphrasiert): Ziele u. a.: den Angreifer auf seine schwächere Seite zwingen und entscheiden, wann man den Ball erobert und wann man zurückweicht und verzögert.
- Konsequenzen für SPIELIQ: „Attackieren oder verzögern" als zentrale Feedbackdimension.

### [B-71] Why 1v1 defending matters (FA Boot Room, Chris Sulley)
- Organisation/Autor: The FA, Boot Room; Grundlage ist eine Untersuchung von Chris Sulley
- URL: https://www.thefa.com/bootroom/resources/coaching/why-1v1-defending-matters
- Datum (Veröffentlichung/Aktualisierung): unbekannt (Anlass war die Saison 2018/19)
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet. Die Empfehlungen sind im Snippet abgeschnitten.
- Kernaussagen (paraphrasiert): Das 1v1-Verteidigen gilt als Kompetenzlücke. Ein Grund: Trainer setzen oft einen zusätzlichen Verteidiger ein, um Risiko zu senken. Fallbeispiele aus dem englischen Profifußball (Abwehrdrittel).
- Konsequenzen für SPIELIQ: Bewusst auch echte 1v1-Szenarien ohne Absicherung anbieten.

### [B-72] The importance of 1v1s in football – Part 2 (Irish FA)
- Organisation/Autor: Irish Football Association (Nordirland)
- URL: https://www.irishfa.com/media/1109/the_importance_of_1v1s_in_football_part_2.doc (Teil 1: https://www.irishfa.com/media/1105/the_importance_of_1v1s_in_football.doc)
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet.
- Kernaussagen (paraphrasiert):
  - Teil 2: Den Ballführenden schnell anlaufen, auf den letzten Metern aber abbremsen. Das verschafft den Mitspielern Zeit zur Rückkehr. Geduldig bleiben, auf den Beinen bleiben.
  - Teil 1: 1v1 ist eine Kernkompetenz; oft wird zu früh in Kleinfeldspiele gewechselt.
- Konsequenzen für SPIELIQ: Zweiphasige Regel „schnell anlaufen, kontrolliert ankommen", z. B. für animierte Szenarien.

### [B-73] Football Australia – National Football Curriculum (Darstellungen aus zweiter Hand)
- Organisation/Autor: Football Federation Australia (heute Football Australia); Darstellungen von Vereinen, Landesverband und Medien
- URL: https://www.gapfootball.org.au/juniors/coaching-resources/the-ffa-curriculum-and-the-gap-fc-training-plan/ ; https://footballnsw.com.au/?p=94299 ; https://matildas.com.au/news/ffa-launches-blueprint-international-success ; https://www.slideshare.net/slideshow/periodization-football-conditioning-pdf/276222310 ; https://campionia.bg/wp-content/uploads/2019/11/Australian-football-methodology.pdf
- Datum (Veröffentlichung/Aktualisierung): 1. Auflage 2009 (laut Suchzusammenfassung); 2. Auflage unbekannt
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet. Ein offizielles Dokument der aktuellen Auflage wurde nicht gefunden.
- Kernaussagen (paraphrasiert):
  - Vier Hauptmomente mit jeweils eigenen Teamaufgaben: Ballbesitz, Umschalten auf gegnerischen Besitz, gegnerischer Besitz, Umschalten zurück.
  - Phasen: Discovery (U6–U9), Skill Acquisition (U10–U13), Game Training (U14–U17), Performance (ab U17).
  - Spielbezogenes statt isoliertes Üben. Für die vom Verband geführten Entwicklungsteams ist 1-4-3-3 verpflichtend. Altersspanne 6–19 Jahre.
  - Die 2. Auflage ergänzte detaillierte Trainingseinheiten.
- Konsequenzen für SPIELIQ: Die Zielgruppe liegt in der Phase „Game Training". Teamaufgaben je Spielmoment eignen sich als Strukturrahmen. Die 1-4-3-3-Pflicht ist eine typische Verbandsvorgabe (c) und nicht allgemeingültig.

### [B-74] U.S. Soccer – Play-Practice-Play
- Organisation/Autor: U.S. Soccer; Modellpapier über die Seite von Soccer Maine
- URL: https://www.ussoccer.com/mnt-travel-roster/2018/02/five-things-to-know-about-playpracticeplay ; https://www.soccermaine.com/wp-content/uploads/sites/230/2023/11/play-practice-play_model.pdf
- Datum (Veröffentlichung/Aktualisierung): Februar 2018 (aus der URL); Modellpapier unbekannt
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet.
- Kernaussagen (paraphrasiert):
  - Spielerzentriert.
  - Erste Spielphase frei und wettkampfnah, dann eine fokussierte Übungsphase, zum Schluss wieder Spiel mit möglichst wenig Trainerreden.
  - Ziel sind Spaß und Entwicklung.
- Konsequenzen für SPIELIQ: wie [B-35].

### [B-75] U.S. Soccer – Spielmodelle U15–U16 und U17+
- Organisation/Autor: U.S. Soccer („US Way", Player Development)
- URL: https://www.ussoccer.com/us-way/player-development/game/game-models/u15-u16 ; https://www.ussoccer.com/us-way/player-development/game/game-models/u17-plus
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet. Ob die Pressing-Aussage aus dem U15–U16- oder dem U17+-Modell stammt, ist unklar.
- Kernaussagen (paraphrasiert):
  - Vier Spielmomente: Angriff, Umschalten Angriff → Abwehr, Abwehr, Umschalten Abwehr → Angriff. Der Torwart ist in allen vier aktiv.
  - Nach Ballverlust sofort versuchen, den Ball zurückzuerobern; hoch pressen und kompakt bleiben.
- Konsequenzen für SPIELIQ: Altersbezogene Spielmodelle eines Verbands gehören zur Ebene (c).

### [B-76] Prinzipienlisten aus dem Umfeld von U.S. Soccer (United Soccer Coaches; Kursunterlagen)
- Organisation/Autor: United Soccer Coaches (u. a. Artikel von Sam Polak); Kursunterlagen zur D-Lizenz auf soccerxpert.com (Herkunft nicht verifiziert)
- URL: https://unitedsoccercoaches.org/revisiting-attacking-principles-through-the-lens-of-spain-v-portugal/ ; https://unitedsoccercoaches.org/?p=18668 ; https://soccerxpert.com/docs/us-soccer-d-license.pdf
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet. Welche Liste aus welcher dieser URLs stammt, ist unklar.
- Kernaussagen (paraphrasiert):
  - Angriff laut Polak: Penetration, Unterstützung, Mobilität, Breite, Kreativität. Andere US-Kursmaterialien: Penetration, Breite, Unterstützung, Mobilität, Improvisation.
  - Verteidigung: Druck, Absicherung/Unterstützung, Balance, Verzögern, Kompaktheit.
  - Unterstützung heißt: mehrere Passoptionen in unterschiedlichen Distanzen, idealerweise rundum (360°). In Tornähe wird das schwieriger.
- Konsequenzen für SPIELIQ: Triangulation des klassischen Prinzipiensets.

### [B-77] KNVB Academy – Conditioning aspects in developing a style of play (Präsentation, 2008)
- Organisation/Autor: KNVB Academy (Präsentation auf Slideshare)
- URL: https://www.slideshare.net/slideshow/conditioning-aspects-in-developing-a-style-of-play/34771098
- Datum (Veröffentlichung/Aktualisierung): 2008 (laut Suchzusammenfassung)
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet. Ob der Rahmen in aktuellen KNVB-Materialien noch so verwendet wird, ist offen.
- Kernaussagen (paraphrasiert): Das Spiel besteht aus Angreifen, Verteidigen und Umschalten. Teamaufgaben: aufbauen und Tore erzielen bzw. stören und Tore verhindern. Jede Aktion soll zum Spielziel beitragen, dem Gewinnen.
- Konsequenzen für SPIELIQ: Funktional bewerten (Beitrag zur Teamaufgabe) statt nach Positionsdogma.

### [B-78] KNVB – Pupillenvoetbal (pädagogische Grundsätze als Fragen und Antworten; Infografiken)
- Organisation/Autor: KNVB (Niederlande)
- URL: https://www.knvb.nl/downloads/bestand/26784/qa---pedagogische-uitgangspunten---knvb ; https://knvb.h5mag.com/knvb/edit-pupillenvoetbal/het_proces_na_invoering/71297/Infographic_pupillenvoetbal___seizoen_2017_18.pdf ; https://www.knvb.nl/downloads/sites/bestand/knvb/12099/infographic-veldindelingen
- Datum (Veröffentlichung/Aktualisierung): Einführung 2017/18 bis 2018/19; die Richtlinien gelten laut Suchzusammenfassung für die Saison 2025/26
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet.
- Kernaussagen (paraphrasiert):
  - 6 gegen 6 für JO8 bis JO10 auf einem Viertelfeld; 8 gegen 8 für JO11 und JO12 auf einem Halbfeld.
  - Kleinere Felder und Teams bedeuten mehr Ballkontakte und mehr Dribblings.
  - Kinder lernen Fußball durch Fußballspielen, abgestimmt auf ihre Entwicklung; die Grundlagen des Spiels sind immer enthalten.
- Konsequenzen für SPIELIQ: Feldgrößen je Format parametrisieren. Die Zielgruppe (U14/U15) spielt bereits 11 gegen 11. Für Deutschland: C-Junioren spielen in der Regel 11 gegen 11 auf dem Großfeld [Hintergrundwissen, nicht per Suche bestätigt].

### [B-79] RBFA – Jugendformate 2v2, 5v5, 8v8 und 11v11 (Präsentationen; Fachartikel)
- Organisation/Autor: Royal Belgian Football Association (Präsentationen); Fachartikel auf balanceisbetter.org.nz; Dokument auf fotbal.cz
- URL: https://www.slideshare.net/slideshow/belgian-presentation/62681378 ; https://balanceisbetter.org.nz/dribbling-football-how-a-child-centred-approach-led-belgian-youth-football-from-11v11-to-2v2/ ; https://www.fotbal.cz/facr/document/download/25324
- Datum (Veröffentlichung/Aktualisierung): Einführung des 2v2 im Jahr 2014; die Dokumente selbst unbekannt
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet. Aus welcher Quelle die Kritik eines belgischen Trainers stammt, ist unklar. Eine Prinzipienliste des RBFA wurde nicht gefunden.
- Kernaussagen (paraphrasiert):
  - Die Formate wurden schrittweise verkleinert: 8v8 Ende der 1990er, dann 5v5, 2014 das 2v2 für U6/U7. 11 gegen 11 ab U13.
  - Leitidee: das Spiel an das Kind anpassen. Bei den Jüngsten stehen Dribbeln und Schießen im Vordergrund.
  - Bis U17 spielt jeder mindestens 50 % der Spielzeit.
  - Kritik: 5v5 sei für U7 teils zu komplex; als Zwischenschritt wird 3v3 vorgeschlagen.
- Konsequenzen für SPIELIQ: Komplexitätsstufen (2v2 → 5v5 → 8v8 → 11v11) taugen als Progression, auch für ältere Spieler mit Defiziten [Eigene Ableitung].

### [B-80] Canada Soccer – Grassroots Program: Examples of games within grassroots sessions
- Organisation/Autor: Canada Soccer
- URL: https://canadasoccer.com/wp-content/uploads/2026/02/Canada-Soccer-Grassroots-Program-Examples-of-Games-within-Grassroots-Sessions-EN-26jan26.pdf
- Datum (Veröffentlichung/Aktualisierung): 26.01.2026 (aus dem Dateinamen; hochgeladen 02/2026)
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet.
- Kernaussagen (paraphrasiert):
  - Kleinfeldspiele fördern Entscheidungsfähigkeit, Technik und Problemlösen.
  - Die Vereine wählen ihre Methoden selbst; es gibt keinen Beleg, dass eine Methode die beste ist.
  - Format „dritte Halbzeit": Die Kinder bestimmen Formation und Regeln selbst.
- Konsequenzen für SPIELIQ: Offenheit für mehrere Methoden; keine „einzig richtige" Didaktik versprechen.

### G. Sekundärquellen und Wissenschaft (kurz, zur Einordnung)

### [B-81] What is covering? (Soccer Coach Weekly)
- Organisation/Autor: Soccer Coach Weekly (Fachmagazin, kein Verband)
- URL: https://www.soccercoachweekly.net/coaching-advice/what-is-covering
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet.
- Kernaussagen (paraphrasiert):
  - Der 1. Verteidiger läuft an, der 2. sichert ab. Entscheidend sind dessen Abstand zum 1. Verteidiger und sein Winkel.
  - Zu nah: Der Ballführende überspielt beide mit einer Aktion. Zu weit: Der 1. Verteidiger ist isoliert im 1v1.
- Konsequenzen für SPIELIQ: Der Abstand des Absichernden braucht eine Unter- und eine Obergrenze. Zahlenwerte nennt die Quelle nicht.

### [B-82] Defending – Pressure, Cover (Sport Session Planner, von Nutzern erstellt)
- Organisation/Autor: Sport Session Planner (Plattform für nutzergenerierte Inhalte; Autor:in unbekannt)
- URL: https://sportsessionplanner.com/s/Mxudi/Defending--Pressure-Cover.html
- Datum (Veröffentlichung/Aktualisierung): laut Seitentitel Start am 19.10.2022
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet. Niedrige Evidenz.
- Kernaussagen (paraphrasiert):
  - Der 2. Verteidiger sichert den 1. ab.
  - Sein Winkel soll den Steilpass verhindern. Sein Abstand soll es erlauben, sofort einzugreifen, wenn der 1. Verteidiger überspielt wird.
- Konsequenzen für SPIELIQ: Plausible Arbeitsdefinition, die sich operationalisieren lässt; nur als Hypothese verwenden.

### [B-83] Defending – Principles of play (Soccer Coach Weekly, Buchanzeige; Ian Barker)
- Organisation/Autor: Soccer Coach Weekly (Buchanzeige); zitiert wird Ian Barker
- URL: https://soccercoachweekly.net/book-shop/defending---principles-of-play
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet.
- Kernaussagen (paraphrasiert): Jungen Spielern lässt sich Verteidigen schwerer schmackhaft machen als Angreifen. Es hilft, Verteidigen als „Ball gewinnen, bevor Tore möglich sind" darzustellen.
- Konsequenzen für SPIELIQ: Motivationsdesign: Defensivaufgaben mit Ballgewinn und Konterstart belohnen [Eigene Ableitung].

### [B-84] Patton College (Ohio University): Stephen Harvey contributes expertise to FIFA Training Centre
- Organisation/Autor: Ohio University, Patton College of Education (Pressemitteilung)
- URL: https://news.ohio.edu/news/2025/10/patton-college-educations-stephen-harvey-contributes-expertise-fifa-training-centre
- Datum (Veröffentlichung/Aktualisierung): Oktober 2025 (aus der URL)
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet.
- Kernaussagen (paraphrasiert):
  - Beiträge für das FIFA Training Centre zu Teaching Games for Understanding (TGfU) und Play-Practice-Play.
  - Kleinfeld- und spielnahe Formen sollen Entscheidungen fördern. U.S. Soccer hat diese Ansätze in die Trainerausbildung übernommen.
- Konsequenzen für SPIELIQ: Die TGfU-Logik (Spielsituation → Verständnisfrage → Lösung) passt gut zum Simulator.

### [B-85] Public defence of doctoral thesis: Visual Perception in Elite Football (Karl Marius Aksum, NIH)
- Organisation/Autor: idrottsforum.org (Ankündigung); Promotion an der Norwegischen Sporthochschule (NIH)
- URL: https://idrottsforum.org/public-defence-of-doctoral-thesis-visual-perception-in-elite-football-karl-marius-aksum-norwegian-school-of-sport-sciences-november-3-2021/
- Datum (Veröffentlichung/Aktualisierung): 03.11.2021 (aus der URL)
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet.
- Kernaussagen (paraphrasiert): Empfehlung: komplexe, kontextreiche Übungen mit vielen Informationen statt isolierter Drills.
- Konsequenzen für SPIELIQ: Sobald die Grundlagen sitzen, Szenarien mit vollem Kontext (bis zu 22 Spieler) statt isolierter Minisituationen [Eigene Ableitung].

### [B-86] Frontiers in Psychology (2017): Mustererkennungstraining und Antizipation
- Organisation/Autor: laut Suchzusammenfassung Williams und Kolleg:innen; die vollständige Autorenliste wurde nicht gesehen
- URL: https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2017.01473/pdf (Repository-Kopie: https://research.stmarys.ac.uk/id/eprint/1705/3/fpsyg-08-01473.pdf)
- Datum (Veröffentlichung/Aktualisierung): 2017 (aus der DOI)
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet.
- Kernaussagen (paraphrasiert): Nach einem Mustererkennungstraining konnten die Teilnehmenden bekannte und neue Sequenzen besser unterscheiden. Ihre Antizipationsgenauigkeit blieb aber gleich. Die Autor:innen vermuten, dass der Zusammenhang zwischen Mustererkennung und Antizipation schwächer ist als angenommen.
- Konsequenzen für SPIELIQ: Wichtig für das Produktversprechen: Wer im Simulator Muster erkennt, antizipiert auf dem Platz nicht automatisch besser. Den Transfer evaluieren und den Simulator mit Platztraining koppeln.

### [B-87] Exploring decision-making practices during coaching sessions in grassroots youth soccer (University of Chichester)
- Organisation/Autor: University of Chichester (Repositorium)
- URL: https://eprints.chi.ac.uk/id/eprint/7712/ ; https://eprints.chi.ac.uk/id/eprint/7354/
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet.
- Kernaussagen (paraphrasiert):
  - 35 gefilmte Jugendtrainings. Etwa gleich viel Zeit entfiel auf Formen mit aktiver Entscheidung (Spielformen) und ohne (Technikdrills). Meist kamen die Drills früh, die Entscheidungsformen später in der Einheit.
  - Die Trainer hielten Drills ohne Entscheidung für nötig, obwohl offen ist, ob sie auf das Spiel übertragen.
- Konsequenzen für SPIELIQ: Der Simulator kann den Anteil an Entscheidungen erhöhen, z. B. zur Vor- und Nachbereitung, ersetzt aber keine Spielformen.

### [B-88] An Open Source Implementation of FIFA's Enhanced Football Intelligence (Universität Zürich)
- Organisation/Autor: Universität Zürich, Institut für Informatik (Autor:in im Treffer nicht genannt)
- URL: https://capuana.ifi.uzh.ch/publications/PDFs/24098_An_Open_Source_Implementation_of_FIFA_s_Enhanced_Football_Intelligence.pdf
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet.
- Kernaussagen (paraphrasiert): FIFAs veröffentlichte EFI-Definitionen enthalten nicht die Heuristiken, die man zur Berechnung braucht; die Arbeit nennt das eine deutliche Lücke. Sie implementiert u. a. Spielphasen, Linienbrüche, Abwehrlinienhöhe und Teamlänge sowie die Team-Shape.
- Konsequenzen für SPIELIQ: Eigene Operationalisierungen sind unumgänglich. Die Arbeit lohnt sich als technische Referenz.

### [B-89] Analyzing collective behaviours in FIFA World Cup Qatar 2022 (Karabiyik und Durmus, 2023)
- Organisation/Autor: Karabiyik und Durmus (Universitätsrepositorium Ankara bzw. TR Dizin)
- URL: https://avesis.ankara.edu.tr/yayin/a03370c5-50c0-474d-832d-b4049ff857bb/analyzing-collective-behaviours-in-fifa-world-cup-qatar-2022
- Datum (Veröffentlichung/Aktualisierung): 2023 (laut Suchzusammenfassung)
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet.
- Kernaussagen (paraphrasiert): In 64 Spielen unterschieden sich Linienhöhe, Teamlänge und Teamtiefe zwischen Siegen, Remis und Niederlagen kaum.
- Konsequenzen für SPIELIQ: Kollektive Gesamtmaße allein trennen gute von schlechten Situationen kaum. Die Engine braucht situative Kriterien wie Passlinien und Absicherung [Eigene Ableitung].

### [B-90] Prediction-based evaluation of back-four defense with spatial control in soccer (arXiv 2511.06191)
- Organisation/Autor: Preprint auf arXiv (Autor:innen im Treffer nicht genannt)
- URL: https://arxiv.org/pdf/2511.06191
- Datum (Veröffentlichung/Aktualisierung): laut Suchzusammenfassung 2025; die arXiv-Nummer deutet auf November 2025
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet.
- Kernaussagen (paraphrasiert): Die absolute Höhe der Abwehrlinie ist hier der Mittelwert der Längskoordinaten der vier tiefsten Feldspieler. FIFA nimmt dagegen den tiefsten Spieler.
- Konsequenzen für SPIELIQ: Alternative Operationalisierung; welche Variante gewählt wird, dokumentieren.

### [B-91] Spielverlagerung – Grundlagenartikel zum Positionsspiel
- Organisation/Autor: spielverlagerung.com (Analyseplattform)
- URL: https://spielverlagerung.com/?p=531
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet.
- Kernaussagen (paraphrasiert): Welche Zonen besetzt sein müssen, hängt von der Ballposition ab. Zonen und Aufgaben sind flexibel und können von wechselnden Spielern besetzt werden.
- Konsequenzen für SPIELIQ: Prüfen, ob ein Raum besetzt ist, statt ob Spieler X auf Position X steht.

### [B-92] Principles of attacking and how to coach them (FootballDNA)
- Organisation/Autor: footballdna.co.uk (Trainerportal, nicht offiziell)
- URL: https://footballdna.co.uk/features/principles-of-attacking-and-how-to-coach-them/
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet.
- Kernaussagen (paraphrasiert): Liste der Angriffsprinzipien:
  - Dispersal: Raum durch Breite und Tiefe schaffen
  - Penetration: Räume zwischen und hinter den Gegnern nutzen
  - Bewegung
  - Unterstützung
  - Innovation/Kreativität
- Konsequenzen für SPIELIQ: Beleg dafür, wie stark die Begriffe variieren.

### [B-93] Kursunterlage zum FIFA-Grassroots-Programm (cec.nic.in; Herkunft unklar)
- Organisation/Autor: Kursunterlage auf einem indischen Bildungsserver; Herkunft und Autor:in unklar
- URL: https://cec.nic.in/webpath/curriculum/Module/BPED/Paper18/6/downloads/script.pdf
- Datum (Veröffentlichung/Aktualisierung): unbekannt
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet. Keine Primärquelle der FIFA.
- Kernaussagen (paraphrasiert):
  - Das FIFA-Grassroots-Programm richtet sich an 6- bis 12-Jährige in Schule, Gemeinde und Verein.
  - Philosophie: Alle dürfen spielen; Fußball geht überall; keine Diskriminierung; einfache, spannende und lohnende Spiele; Fair Play.
  - Die Freude der Spieler steht im Mittelpunkt. Intensive Einheiten und komplizierte Taktik passen nicht zu dieser Altersgruppe.
- Konsequenzen für SPIELIQ: Für U14/U15 nicht direkt relevant; bestätigt den Grundsatz der Altersangemessenheit.

### H. Neu aufgenommene Originale (Volltextprüfung 29.10.2026)

### [B-94] Zonal defending – Teil 2: Developing defensive coordination in small groups (Stuart McLaren)
- Organisation/Autor: FIFA Training Centre, Talent Coach Programme; FIFA Talent Coach Stuart McLaren
- URL: https://www.fifatrainingcentre.com/en/practice/talent-coach-programme/zonal-defending/developing-defensive-coordination-in-small-groups.php
- Datum (Veröffentlichung/Aktualisierung): 29.09.2026 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Einleitung, Coachingpunkte, drei Übungen; Videos nicht angesehen). Neu aufgenommen.
- Kernaussagen (paraphrasiert):
  - Zonal verteidigen verlangt abgestimmtes Verhalten ohne Ball: Die Spieler müssen erkennen, wer wann presst, absichert oder Balance gibt [verifiziert].
  - Übungsbibliothek für Teil 2 der Methodik aus [B-01]: 2v2 Druck und Absicherung; 2v3, das in ein 1v1 übergeht; 3v3 mit Abwehrdreieck [verifiziert].
  - Zentrale Coachingpunkte [verifiziert]:
    - Der Ballnächste presst zuerst und verhindert den Pass in die eigene Formation hinein.
    - Der 2. Verteidiger sichert eng ab, verhindert Steilpässe und Annahmen in gefährlichen Zonen nahe dem Tor.
    - In Umschaltmomenten Passwinkel abschirmen und den Raum hinter dem Pressing schützen.
    - Zu dritt eine kompakte Dreiecksstruktur halten, um Lücken zu schließen.
  - 2v2 (30 × 20 m): Der Ballnächste gibt Druck und stellt seinen Körper so, dass er den Angreifer nach außen zeigt. Der 2. Verteidiger steht hinter und innen versetzt zum 1., um Pässe durch die Lücke zwischen beiden und Doppelpässe zu verhindern. Fehlerbild: Der 2. steht zu weit weg, um den Pass durch die Lücke zu verhindern. Sein Abstand soll erlauben einzugreifen, wenn der 1. überspielt wird. Je nach Druck auf den Ball verständigen sich die Verteidiger, ob sie Läufer verfolgen oder übergeben [verifiziert].
  - 2v3 (30 × 35 m, 10 m breite Seitenkanäle): den Druck so anwinkeln, dass der dritte Angreifer abgeschnitten und aus dem 3v2 ein 2v2 wird; in Schussdistanz sofort Druck auf den Ball [verifiziert].
  - 3v3 (20 × 25 m, je drei Minitore): die Positionen im Dreieck ständig an die Angreifer anpassen. Der Nächste presst und verlangsamt, der zweite und dritte sichern hinter ihm. Ist der Ball außen, gibt der fernste Verteidiger Balance, indem er verbunden bleibt und den Raum auf der schwachen Seite abdeckt [verifiziert].
  - Zahlen für Abstand oder Winkel der Absicherung nennt die Seite nicht [verifiziert].
- Konsequenzen für SPIELIQ:
  - Direkte Vorlage für die Rollenbewertung: Der 1. Verteidiger presst und lenkt, der 2. steht diagonal hinter und innen, der 3. hält auf der ballfernen Seite die Verbindung (a).
  - Der Abstand des Absichernden ist qualitativ definiert: nah genug, um den Pass durch die Lücke zu verhindern, und so positioniert, dass er eingreifen kann, wenn der 1. überspielt wird. Zahlenwerte müssen kalibriert werden [Eigene Ableitung].
  - Hier zeigt der 1. Verteidiger nach außen, während der Absichernde innen steht. Ein Lenken nach innen in die Absicherung wird in dieser Übung nicht gelehrt [verifiziert].

### [B-95] Core principles of play – Team organisation out of possession (Teil 3 der Serie)
- Organisation/Autor: FIFA Training Centre, Game analysis (achtteilige Serie „Core principles of play"); im Seitenkopf „FIFA"
- URL: https://www.fifatrainingcentre.com/en/game/game-analysis/out-of-possession/team-organisation--out-of-possession-.php ; Serienübersicht: https://www.fifatrainingcentre.com/en/game/game-analysis/landing-page-core-principles.php
- Datum (Veröffentlichung/Aktualisierung): 08.11.2021 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Artikeltext; Clips nicht angesehen). Neu aufgenommen.
- Kernaussagen (paraphrasiert):
  - Vier Grundprinzipien ohne Ball, unabhängig von der Formation: das Spielfeld verkleinern, den Raum schließen, die Form halten, Druck ausüben [verifiziert].
  - Spielfeld verkleinern: Die zehn Feldspieler schaffen eine kompakte Spielfläche. Ein kompaktes zentrales Mittelfeld drängt den Gegner nach außen; dort sinken seine Passoptionen „von 360° auf 180°", und ein Pressing an der Seitenlinie wird wahrscheinlicher [verifiziert].
  - Raum schließen: horizontal, indem die Außenspieler einrücken; vertikal, indem die drei Linien nie zu weit auseinander stehen. Auch ein tiefer Block kann sehr kompakt sein [verifiziert].
  - Form halten: Die Form bleibt erhalten, während einzelne Spieler ihre direkten Gegenspieler pressen; keine Lücken zwischen Abwehr, Mittelfeld und Angriff [verifiziert].
  - Druck ausüben: wissen, wohin sich der Ball bewegt, und als Einheit verschieben. Das Pressing führt der ballnahe Stürmer an. Ist die erste Linie überspielt, schneidet der ballnahe zentrale Mittelfeldspieler alle Wege durch das Zentrum ab [verifiziert].
  - Beim organisierten 4-4-2 ist die Linie etwa so breit wie der Strafraum; spielbarer Raum bleibt nur außerhalb des Blocks oder hinter der Abwehrlinie [verifiziert].
- Konsequenzen für SPIELIQ:
  - Kanonische FIFA-Liste für die Phase ohne Ball. Sie lässt sich direkt als Prüfgruppen der Engine nutzen: Fläche, Abstände, Form, Druck (a).
  - „Etwa Strafraumbreite" ist ein qualitativer Richtwert für die Blockbreite im 11v11. Der Strafraum ist laut Spielregeln rund 40 m breit [Hintergrundwissen, nicht per Suche bestätigt]; das passt zum WM-Durchschnitt von 40,1 m aus [B-39] [Eigene Ableitung].

### [B-96] Core principles of play – High press (Teil 4), The reaction to losing the ball (Teil 8), Switch of play (Teil 2)
- Organisation/Autor: FIFA Training Centre, Game analysis, Serie „Core principles of play"; im Seitenkopf „FIFA"
- URL: https://www.fifatrainingcentre.com/en/game/game-analysis/out-of-possession/high-press.php ; https://www.fifatrainingcentre.com/en/game/game-analysis/transition-to-defending/the-reaction-to-losing-the-ball.php ; https://www.fifatrainingcentre.com/en/game/game-analysis/in-possession/switch-of-play.php
- Datum (Veröffentlichung/Aktualisierung): jeweils 08.11.2021 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (drei Artikel; Clips nicht angesehen). Neu aufgenommen.
- Kernaussagen (paraphrasiert):
  - Hohes Pressing hat drei Schlüsselprinzipien: Teamstruktur, Fallen stellen, Intensität. Die Abstände zwischen den Einheiten müssen Pässe in Zwischenräume verhindern; nötig sind eine hohe Abwehrlinie und ein hoch stehender Torwart [verifiziert].
  - Pressingfallen laden den Gegner gezielt zu einem bestimmten Spiel ein. Beispiel 1: Das Team lässt nur eine Option nach vorn ins Zentrum offen und presst den Empfänger dann von hinten. Beispiel 2: Eine Verteidigerin wird außen aggressiv angelaufen, sodass sie nach innen passt; dieser Pass ins Zentrum ist der Auslöser für das Pressing [verifiziert].
  - Mit System und Struktur wird der Gegner in günstige Zonen gelenkt, dann schnappt die Falle zu. Alle müssen die Auslöser kennen; 90 Minuten durchgehend zu pressen ist nicht möglich. Spielstand und Zeitpunkt, etwa kurz vor der Pause oder bei knapper Führung, können einen Rückzug in einen mittleren oder tiefen Block nahelegen [verifiziert].
  - Reaktion auf Ballverlust: individuelles Gegenpressing, meist durch den Spieler, der den Ball verloren hat, und kollektives Gegenpressing mit Auslösern. Wichtig sind Aggressivität, Intensität und Antizipation; im kollektiven Gegenpressing werden Gegenspieler auch Mann gegen Mann aufgenommen [verifiziert].
  - Seitenwechsel: Ziel ist eine Überzahl auf der anderen Seite. Gegen einen gut organisierten, schmalen Block ist er oft die beste Option; die verteidigende Mannschaft muss dann den Außenverteidiger ins 1v1 ziehen lassen oder dem Gegner Raum geben [verifiziert].
- Konsequenzen für SPIELIQ:
  - FIFA-Material kennt neben „nach außen lenken" auch Fallen, die den Pass bewusst ins Zentrum einladen. Die Lenkrichtung ist damit eine Teamvorgabe (c); das Prinzip (a) lautet: Richtung vorgeben und mit Auslöser zuschnappen.
  - Für Pressingfallen braucht die Engine einen Teamplan (Zielzone, Auslöser) als Eingabe [Eigene Ableitung].

### [B-97] FIFA Talent Coach Programme – Training framework: „Spiralling up" und „Scales of the game"
- Organisation/Autor: FIFA Training Centre, Talent Coach Programme; Video von Arne Barez (FIFA Football Content Manager) bzw. Interview mit Brais Acebal (FIFA TDS Coaching Manager)
- URL: https://www.fifatrainingcentre.com/en/practice/talent-coach-programme/training-framework/spiralling-up--the-long-term-development-process.php ; https://www.fifatrainingcentre.com/en/practice/talent-coach-programme/training-framework/scales-of-the-game.php
- Datum (Veröffentlichung/Aktualisierung): 09.04.2024 (Seitenkopf; Übersicht 10.04.2024) bzw. 27.08.2024 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (beide Artikel; Videos nicht angesehen). Neu aufgenommen.
- Kernaussagen (paraphrasiert):
  - Spiralcurriculum: Kernthemen werden früh eingeführt und mit wachsender Komplexität wiederholt. Das Talent Coach Programme richtet sich an U12 bis U15 [verifiziert].
  - Grundlage sind acht spielbezogene Absichten, je vier im Angriff und in der Verteidigung (u. a. Ballbesitz sichern, aufbauen und vorankommen, Chancen kreieren und abschließen; Tor schützen, Räume kontrollieren, pressen und Ball gewinnen; in der Praxisbibliothek außerdem die beiden Umschaltmomente), sowie drei Skalen: Spieler, Einheit, Team [verifiziert].
  - Spiel- und spielerzentriert statt einer linearen Folge isolierter Technik; die Übungen werden dem Entwicklungsstand angepasst. Trainer arbeiten im Kreislauf aus Beobachten, Lernziel, Intervention, Auswertung und Anpassung [verifiziert].
  - Altersgerechte Formate (kleinere Felder, weniger Spieler) und schrittweise größere Felder steigern die Komplexität [verifiziert].
  - Rollen auf Spielerebene: A1 ist der Ballführende, A2 sind alle anderen Angreifer. D1 ist der Verteidiger, der A1 direkt angeht; D2 sind alle anderen Verteidiger, die absichern, weitere Angreifer decken oder Raum sichern [verifiziert].
  - Bewertung: Entscheidend ist nicht, ob ein Spieler eine bestimmte Lösung befolgt, sondern ob er die Aufgabe löst. Training soll mehrere Wege zum Ziel entwickeln [verifiziert].
  - Probleme auf Spielerebene haben drei mögliche Ursachen: Wahrnehmung, Entscheidung (taktisches Verständnis) oder Technik. Müdigkeit und Stress wirken auf alle drei [verifiziert].
  - Im prinzipienbasierten Curriculum sollen alle Spieler die verschiedenen Rollen verstehen und austauschbar übernehmen können [verifiziert].
- Konsequenzen für SPIELIQ:
  - Die Zielgruppe U14/U15 liegt genau im Fokus des FIFA-Talentprogramms (U12–U15).
  - Feedback nach Ursache gliedern: Wahrnehmung, Entscheidung, Ausführung; im 2D-Simulator vor allem die ersten beiden [Eigene Ableitung].
  - Bewertung über die gelöste Aufgabe statt über eine Musterlösung stützt die Ebene (b) [Eigene Ableitung].
  - FIFA nutzt zwei Rollenmodelle nebeneinander: D1/D2 auf Spielerebene und 1./2./3. Verteidiger in der Zonenverteidigung [B-01, B-94]. SPIELIQ sollte eines festlegen und das andere darauf abbilden [Eigene Ableitung].

### [B-98] FIFA Talent Coach Programme – Interviews mit Arsène Wenger: „Give every talent a chance" und „Developing the player of the future"
- Organisation/Autor: FIFA Training Centre, Talent Coach Programme (Training framework); Arsène Wenger (FIFA Chief of Global Football Development)
- URL: https://www.fifatrainingcentre.com/en/practice/talent-coach-programme/training-framework/vision.php ; https://www.fifatrainingcentre.com/en/practice/talent-coach-programme/training-framework/future.php
- Datum (Veröffentlichung/Aktualisierung): 30.01.2024 bzw. 27.02.2024 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (schriftliche Zusammenfassungen; Videos nicht angesehen). Neu aufgenommen.
- Kernaussagen (paraphrasiert):
  - Zielalter 12 bis 16: In dieser Phase sollen alle Aspekte der Entwicklung allmählich zusammengeführt werden, auch der Umgang mit Ball, Mitspielern und Gegnern [verifiziert].
  - Kernkompetenzen künftiger Spieler: Informationen vor der Ballannahme aufnehmen und auswerten, vorausdenken und schnell entscheiden, Linien mit Tiefenblick überspielen, flexibel bleiben, technisch umsetzen, kalkulierte Risiken eingehen, Entscheidungen reflektieren [verifiziert].
  - Laut Wenger sind die Spieler am erfolgreichsten, die in den zehn Sekunden vor der Annahme die meisten Informationen aufnehmen. Eine Studie nennt er dafür nicht [verifiziert; Aussage ohne Beleg].
  - Jede Einheit soll Technik, Taktik (Wahrnehmung und Entscheidung) und mindestens 20 Minuten freies Spiel enthalten [verifiziert].
- Konsequenzen für SPIELIQ: Der Simulator setzt bei den kognitiven Kompetenzen an (Information vor der Annahme, Entscheidung, Reflexion); die technische Umsetzung bleibt dem Platztraining vorbehalten [Eigene Ableitung].

### [B-99] Position-specific training: Rahmenartikel, Game-situations und Game-phases (zentraler Mittelfeldspieler)
- Organisation/Autor: FIFA Training Centre, Talent Coach Programme; Willi Ruttensteiner und weitere Coaches des Academy Project
- URL: https://www.fifatrainingcentre.com/en/practice/talent-coach-programme/position-specific-training/developing-players-using-position-specific-training.php ; https://www.fifatrainingcentre.com/en/practice/talent-coach-programme/position-specific-training/game-situations-developing-central-midfielders.php ; https://www.fifatrainingcentre.com/en/practice/talent-coach-programme/position-specific-training/game-phases-developing-central-midfielders.php
- Datum (Veröffentlichung/Aktualisierung): 06.05.2026; 09.06.2026; 01.07.2026 (jeweils Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (drei Artikel; Videos nicht angesehen). Neu aufgenommen; Teil 1 der Reihe ist [B-27].
- Kernaussagen (paraphrasiert):
  - Dreiphasige Methodik: (1) individuelle Aktionen, ohne Gegner, viele Wiederholungen; (2) Spielsituationen im Kleinfeld mit Gegner und Entscheidungen; (3) Spielphasen mit mehr Spielern bis zum 11v11. Die Phasen sind keine starren Stufen; Trainer wechseln je nach Alter, Erfahrung und Bedarf [verifiziert].
  - Die Nummer 6 im Aufbau: Raum zum Annehmen finden, vor der Annahme scannen, offen stehen und nach vorn spielen, wenn möglich; sonst den Ball sichern und sicher weiterspielen [verifiziert].
  - Spielsituationen: Räume zum Annehmen vor, zwischen oder hinter den Linien finden und halten; Passwinkel schaffen, indem man sich hinter die beiden Pressenden stellt; früh und oft scannen; per Andribbeln Gegner binden [verifiziert].
  - Spielphasen: Die beiden zentralen Mittelfeldspieler sollen nicht auf derselben vertikalen oder horizontalen Linie stehen, um bessere Winkel und mehr Raum zu schaffen. Das Team nutzt die volle Breite, um im Zentrum Raum zu öffnen [verifiziert].
- Konsequenzen für SPIELIQ:
  - Die Regel „nicht auf einer Linie stehen" ist für zwei zentrale Mittelfeldspieler in FIFA-Material belegt und direkt prüfbar (a/b).
  - Die drei Phasen passen zur Rolle eines Simulators als Ergänzung: Er kann Entscheidungen in Spielsituationen üben, ersetzt aber weder das Techniktraining noch das Training in Spielphasen [Eigene Ableitung].

### [B-100] Grassroots Essentials – Ages 12-15: Introduction to the progressive methodology und Optimising game application (Dr. Vanessa Martínez Lagunas)
- Organisation/Autor: FIFA Training Centre, Grassroots Coaching Essentials; Dr. Vanessa Martínez Lagunas
- URL: https://www.fifatrainingcentre.com/en/practice/grassroots/grassroots-and-youth-football-essentials/grassroots-coaching-essentials/introduction-to-the-progressive-methodology.php ; https://www.fifatrainingcentre.com/en/practice/grassroots/grassroots-and-youth-football-essentials/grassroots-coaching-essentials/optimising-game-application.php ; weitere Folgen der Reihe (nur abgerufen, nicht ausgewertet): …/optimising-skill-development-u12-u15.php (22.04.2025), …/optimising-warm-ups-u12-to-u15.php (25.03.2025)
- Datum (Veröffentlichung/Aktualisierung): 26.08.2025 bzw. 12.08.2025 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (schriftliche Zusammenfassungen; Videos nicht angesehen). Neu aufgenommen.
- Kernaussagen (paraphrasiert):
  - Progressive Methodik für 12- bis 15-Jährige in drei Phasen: technische Grundlage (viele Wiederholungen ohne Gegner, mit Wettbewerb) → taktische Einführung (Entscheidungen, Leitfragen) → Spielanwendung mit wenigen Einschränkungen und minimalem Eingreifen des Trainers [verifiziert].
  - In diesem Alter sollen Spieler Training und Spiel verbinden: Aktivitäten an das Hauptthema der Einheit koppeln, durch Leitfragen geführtes Entdecken [verifiziert].
  - Spielanwendung hilft, taktische Konzepte wie Positionierung, Bewegung ohne Ball und Team-Shape zu verstehen und mit Druck umzugehen [verifiziert].
  - Beispiel: 11v11 mit drei Zonen (Abwehr, Mittelfeld, Angriff); ein Tor zählt nur, wenn jede Zone beteiligt war; die Rollen rotieren [verifiziert].
  - Die „Key Take-aways" der Seite zur Spielanwendung handeln vom Torschuss und passen nicht zum Artikel, vermutlich ein Übernahmefehler der Seite [verifiziert].
- Konsequenzen für SPIELIQ: FIFA-Grassroots-Material für genau die Zielgruppe bestätigt geführte Fragen, eine Progression von einfach zu komplex und wenig Eingreifen in der Anwendungsphase. Für die Simulator-Didaktik direkt übertragbar [Eigene Ableitung].

### [B-101] Legia Warsaw: The decision-makers of tomorrow (U10) und Grassroots Essentials 8–12 (Stanley Gardiner)
- Organisation/Autor: FIFA Training Centre, Grassroots („Global grassroots insights" und „Grassroots Coaching Essentials"); Legia Warschau; Stanley Gardiner
- URL: https://www.fifatrainingcentre.com/en/practice/grassroots/global-grassroots-insights/legia-warsaw-the-decision-makers-of-tomorrow.php ; https://www.fifatrainingcentre.com/en/practice/grassroots/grassroots-and-youth-football-essentials/grassroots-coaching-essentials/coaching-with-the-global-analytical-global-model.php ; https://www.fifatrainingcentre.com/en/practice/grassroots/grassroots-and-youth-football-essentials/grassroots-coaching-essentials/learning-through-numeric-progression-games.php
- Datum (Veröffentlichung/Aktualisierung): 25.08.2026; 03.06.2025; 17.06.2025 (jeweils Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (drei Seiten; Videos nicht angesehen). Neu aufgenommen.
- Kernaussagen (paraphrasiert):
  - Legia beginnt die Nachwuchsarbeit mit Fragen statt fertigen Antworten: Was siehst du? Was kannst du tun? Welche Lösung wählst du? Etwa 90 % der Arbeit finden in Spielformen mit Gegnern, Mitspielern und Spielkontext statt [verifiziert].
  - Coachingpunkte der U10-Einheit: vor jeder Annahme über die Schulter schauen; seitlich annehmen; die erste Berührung in den Raum; Breite und Tiefe für klare Passoptionen; schnell erkennen, ob man kombiniert oder direkt angreift [verifiziert].
  - 8–12 Jahre: Modell Global-Analytisch-Global (Spiel → isolierte Technik → Spiel) und Spiele mit steigender Spielerzahl, in denen Kinder Probleme selbst lösen; taktische Hinweise sparsam dosieren [verifiziert].
- Konsequenzen für SPIELIQ: Das Fragenschema „Was siehst du? Was kannst du tun? Was wählst du?" eignet sich als Dialogstruktur vor einem Zug im Simulator [Eigene Ableitung]. Die Quellen betreffen jüngere Altersgruppen.

### [B-102] FIFA World Cup 2026 – TSG-Analysen auf dem FIFA Training Centre (Cabo Verde; Kanada gegen Bosnien-Herzegowina; Round review zu Mittelfeld- und tiefen Blöcken)
- Organisation/Autor: FIFA Training Centre, Technical Study Group; Michael O'Neill, Jayne Ludlow, Gilberto Silva, Pablo Zabaleta
- URL: https://www.fifatrainingcentre.com/en/fifa-world-cup-2026/how-cabo-verde-defied-everybodys-expectations.php ; https://www.fifatrainingcentre.com/en/fifa-world-cup-2026/canada-v-bosnia-and-herzegovina-clash-of-defending-styles.php ; https://www.fifatrainingcentre.com/en/fifa-world-cup-2026/second-round-review-mid-blocks-and-attacking-transitions.php ; Turnierseite: https://www.fifatrainingcentre.com/en/fifa-world-cup-2026/tournament-page--fifa-world-cup-2026.php
- Datum (Veröffentlichung/Aktualisierung): 10.07.2026; 17.06.2026 (Turnierübersicht: 23.06.2026); 26.06.2026 (Turnierübersicht: 16.07.2026); jeweils Seitenkopf [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (drei Analysen und Turnierseite; Videos nicht angesehen). Der auf der Turnierseite eingebettete Abschlussbericht der TSG (Flipsnack) war nicht erreichbar. Neu aufgenommen.
- Kernaussagen (paraphrasiert):
  - Kap Verde: im Auftaktspiel gegen Spanien ein kompakter tiefer Block im 1-4-5-1, 27,3 Minuten im tiefen Block (Turnierschnitt pro Spiel 7,4 Minuten); kleine Abstände und trotzdem Druck auf den Ball. O'Neill sinngemäß: Die Spieler lassen sich nicht vom Ball anziehen, sondern richten ihre Position an den Bewegungen ihrer Mitspieler aus. Später höheres Pressing und Gegenpressing; der Torwart als Führungsfigur und Aufbauspieler [verifiziert].
  - Kanada gegen Bosnien-Herzegowina: zwei gegensätzliche, gleich wirksame Defensivstile. Bosniens 1-4-4-2 im tiefen Block mit sehr kurzen Abständen zwischen den Einheiten; der Ballnächste presst, die anderen schließen Lücken. Kanada attackierte mit sehr hoher Restverteidigung (Abwehrlinie im Mittel 62 m vom eigenen Tor) und schnellen, aufs Zentrum ausgerichteten Rückzugsläufen [verifiziert].
  - Round review: Defensive Organisation in Mittelfeld- und tiefen Blöcken war ein prägendes Thema. Marokko lenkte mit seinem Mittelfeldblock nach außen; Japan verteidigte im tiefen Block mit kurzen Abständen zwischen Spielern und Einheiten [verifiziert].
- Konsequenzen für SPIELIQ:
  - Bestätigt im FIFA-Original, was [B-52] nur aus der Presse hatte: Kap Verde als Beispiel für kompakte, kollektive Organisation und einen mitspielenden Torwart.
  - „Nicht vom Ball anziehen lassen, sondern an den Mitspielern orientieren" ist genau die Gegenregel zum „alle zum Ball"-Verhalten der Zielgruppe (a).
  - Unterschiedliche Stile können gleich wirksam sein: Die Engine bewertet die Umsetzung des gewählten Plans, nicht den Stil (c).

### [B-103] World-class skills: Aitana Bonmatí – The art of scanning
- Organisation/Autor: FIFA Training Centre, Individual qualities (World-class skills); im Seitenkopf „FIFA"
- URL: https://www.fifatrainingcentre.com/en/game/individual-qualities/world-class-skills/aitana-bonmati-the-art-of-scanning.php
- Datum (Veröffentlichung/Aktualisierung): 09.01.2024 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (Artikeltext; Clips nicht angesehen). Neu aufgenommen.
- Kernaussagen (paraphrasiert):
  - Das Scannen über die Schulter vor der Annahme liefert Informationen über Gegner, Mitspieler und mögliche Passwege. Eine frühe Entscheidung erlaubt, die Körperstellung für die erste Berührung anzupassen [verifiziert].
  - Bonmatí weiß laut Artikel stets, wo sie selbst ist, wo Gegner und Mitspieler sind, wo Raum ist und wo sich eine Chance bietet [verifiziert].
  - Zahlen zur Scanhäufigkeit nennt der Artikel nicht [verifiziert].
- Konsequenzen für SPIELIQ: Die fünf Fragen (ich, Gegner, Mitspieler, Raum, Chance) eignen sich als Checkliste für Wahrnehmungsaufgaben vor dem Zug [Eigene Ableitung].

### [B-104] UEFA Grassroots Framework („Laying the foundations today for a brighter tomorrow")
- Organisation/Autor: UEFA
- URL: https://editorial.uefa.com/resources/0291-1bec32c0e56f-5604d4e6997c-1000/uefa_grassroots_strategy_framework_digital_eng_2024.pdf (verlinkt auf https://www.uefa.com/development/grassroots/grassroots-programmes)
- Datum (Veröffentlichung/Aktualisierung): PDF erstellt am 11.07.2023; der Dateiname nennt 2024 [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (PDF, 19 Seiten; per Stichwortsuche ausgewertet). Neu aufgenommen.
- Kernaussagen (paraphrasiert):
  - Vision: Alle sollen überall in sicherem, spaßigem und positivem Umfeld Fußball spielen können. Mission: möglichst viele registrierte Spieler und organisierte Aktivitäten [verifiziert].
  - Vier Schwerpunkte: Spieler, Fußballumfeld, Spiel, Personal. Für den Bereich „Spiel" werden flexible, inklusive Formate verlangt, z. B. Kleinfeldspiele [verifiziert].
  - Als Herausforderung genannt: ein starker Rückgang der Spielerzahlen, sobald Spieler ins frühe Teenageralter kommen [verifiziert].
  - Taktische Prinzipien enthält das Dokument nicht [verifiziert].
- Konsequenzen für SPIELIQ: Die Zielgruppe liegt im Alter mit hohem Ausstiegsrisiko. Freude, Kompetenzerleben und nicht bloßstellendes Feedback sind deshalb auch für die Bindung wichtig [Eigene Ableitung].

### [B-105] Science explained: Kathryn Johnston on the importance of accurate terminology
- Organisation/Autor: FIFA Training Centre (Science explained); Dr. Kathryn Johnston (University of Toronto); Moderation Dr. Paul Bradley
- URL: https://www.fifatrainingcentre.com/en/environment/science-explained/high-performance/performance-support/kathryn-johnston-on-the-importance-of-accurate-terminology.php
- Datum (Veröffentlichung/Aktualisierung): 24.10.2024 (Seitenkopf) [verifiziert]
- Zugriff / Verifikationsstatus: Volltext abgerufen 29.10.2026 (schriftliche Zusammenfassung; Video nicht angesehen). Neu aufgenommen.
- Kernaussagen (paraphrasiert):
  - Unscharfe Begriffe wie „Potenzial" und „Leistung" sind schwer zu messen und damit schwer zu trainieren [verifiziert].
  - Empfehlung: zentrale Begriffe präziser und messbar definieren, auch wenn dafür bestehende Praktiken hinterfragt werden müssen [verifiziert].
- Konsequenzen für SPIELIQ: Stützt die Forderung nach einem eigenen, dokumentierten Glossar mit messbaren Definitionen (siehe S7) [Eigene Ableitung].

---

## Synthese

Belegstatus: [verifiziert] = im Volltext einer FIFA- oder UEFA-Originalquelle geprüft (Durchgang 2); [nur Suchergebnis] = nur aus Suchtreffern (Durchgang 1). Steht ein Status am Ende eines Spiegelstrichs, gilt er für alle dort genannten Belege, sofern nicht anders markiert.

### S0. Ebenenmodell für die Engine

In der Synthese steht hinter jeder Aussage, auf welcher Ebene sie liegt:

- **(a) Grundprinzip:** gilt über Situationen hinweg und darf als Bewertungskriterium dienen. Beispiele: torseitig stehen, Ball unter Druck setzen, absichern, kompakt bleiben, Passoptionen schaffen, Linien überspielen.
- **(b) Lösungsweg:** Mehrere Lösungen sind gleichwertig; die Engine soll keine bestimmte erzwingen. Beispiele: Dreieck oder Raute, Breite oder Tiefe, Dritter Mann, Bogenlauf beim Anlaufen.
- **(c) Kontextvorgabe:** ergibt sich aus Spielidee, Gegner, Übungsform oder Verband und sollte als Trainereinstellung wählbar sein. Beispiele: nach außen oder innen lenken, Pressinghöhe, Mann- oder Raumorientierung im Pressing, gerade Kette, 6–8 m, 1-4-3-3.

FIFA selbst stützt diese Trennung: Bewertet werden soll, ob ein Spieler die Aufgabe löst, nicht ob er eine bestimmte Lösung befolgt [B-97] [verifiziert].

### S1. FIFA Training Centre (Forschungsfrage 1)

**S1.1 Individuelles Verteidigen**
- (a) FIFA stellt das individuelle Verteidigen im 1v1 und 1v2 an den Anfang der Zonenverteidigung [B-01, B-02] [verifiziert].
- (a) Grundelemente [verifiziert]:
  - Abstand kontrollieren, wirksame Körperstellung, aus gefährlichen Zonen weglenken, Zeitpunkt für das Tackling wählen; die drei 1v1-Prinzipien lenken, verzögern, verwehren [B-01, B-02].
  - Sofort Druck, den Empfänger vor der ersten Berührung stellen, aus der Nähe verzögern; nicht über den Ball hinaus übercommitten; von hinten Kontakt halten und das Aufdrehen verhindern [B-02].
  - Tiefe, seitliche Stellung, Annäherung im Winkel; beim Ballempfang des Angreifers abgebremst und im Gleichgewicht sein, kurze kontrollierte Schritte [B-03]; der Pressende verlangsamt beim Anlaufen [B-07].
  - Abstand: In einer U15-Einheit soll der Verteidiger beim Ballempfang innerhalb von 2–3 m sein [B-13]. Das ist die einzige gefundene FIFA-Zahl dazu.
  - Die Irish FA sagt dasselbe („schnell anlaufen, kontrolliert ankommen") [B-72] [nur Suchergebnis].
- (a/c) Lenkrichtung:
  - Im 1v1 lenken FIFA-Einheiten meist weg vom Zentrum bzw. Tor: nach außen und/oder auf den schwächeren Fuß, die Innenbahn blockieren [B-02, B-03, B-13, B-14]. Im 2v2 zeigt der 1. Verteidiger nach außen, während der 2. hinter und innen absichert [B-94] [verifiziert].
  - Diese Vorgaben sind an Situationen gebunden: Innenverteidiger an der Strafraumgrenze [B-03], Flügel-1v1 im Außenkanal (PDF 14-3, siehe [B-03]), Außenverteidiger gegen Flügelspieler [B-14] [verifiziert].
  - Lenken nach innen gibt es als Pressingfalle: Ein Verteidiger wird außen aggressiv angelaufen, passt nach innen, und dieser Pass löst das Pressing aus; oder das Team lässt nur den Pass ins Zentrum offen und presst den Empfänger von hinten [B-96]. In einer U19-Übung zwingt die Feldform das Spiel nach innen [B-11]. Teams lenken außerdem „zu einer Seite" [B-10, B-11] [verifiziert].
  - FIFAs Definition von Druck schließt das Diktieren der Richtung ausdrücklich ein [B-46]. UEFA-Beobachter berichten vom gezielten Lenken in bestimmte Zonen bei den Frauen-Nachwuchsturnieren 2025 [B-60] [verifiziert].
  - Die Seitenlinie als „zusätzlicher Verteidiger" ist in FIFA-Material belegt [B-08]; Pressing an der Seitenlinie reduziert die Passoptionen „von 360° auf 180°" [B-95] [verifiziert].
  - Folgerung: „Richtung vorgeben statt nur hinlaufen" ist (a). Welche Richtung, entscheiden Team und Situation (c) [Eigene Ableitung].
  - Der Konflikt „nach außen" gegen „auf den schwachen Fuß" wird in keiner Quelle aufgelöst [Eigene Ableitung].
- (a) Timing:
  - Auslöser: schlechte oder nach hinten gerichtete erste Berührung, schwacher Pass [B-04]; Rückpass und Annahme mit Blick zum eigenen Tor [B-11]; zu weit vorgelegter Ball [B-13]; der Pass zum Angreifer [B-03] [verifiziert].
  - Die Wahl zwischen Attackieren und Abstandhalten bzw. Verzögern ist eine Kernkompetenz [B-01, B-03] [verifiziert]; ebenso bei der FA [B-70] [nur Suchergebnis].
- (a) Unterzahl: Druck so anwinkeln, dass ein 1v1 entsteht; diagonal zurückweichen, die Passlinie schneiden, das Tor schützen [B-04]; im 1v2 anlaufen, aber mit dem Eingreifen warten [B-13]; im 2v3 den dritten Angreifer abschneiden [B-94] [verifiziert].
- Ergänzungen von UEFA: 1v1-Varianten aus allen Richtungen trainieren; Innenverteidiger müssen öfter diagonal aus ihrer Einheit heraus verteidigen [B-58]. Risiko und Ertrag eines 1v1 hängen von der Zone ab (Angriffs-1v1) [B-59] [verifiziert]. Die FA sieht im 1v1-Verteidigen eine Kompetenzlücke [B-71] [nur Suchergebnis].
- Zahlen: 2–3 m beim Ballempfang im 1v1 (U15) [B-13]; etwa 45° Körperwinkel nur im Beachsoccer [B-18] [verifiziert].

**S1.2 Druck, Absicherung, Balance (1., 2. und 3. Verteidiger)**
- (a) FIFA definiert das Abwehrdreieck ausdrücklich: Der 1. Verteidiger gibt Druck, der 2. sichert ab, der 3. sorgt für Balance, indem er Raum schützt und die nächste Aktion antizipiert [B-01]. Im 3v3 bleibt bei Ball außen der fernste Verteidiger verbunden und deckt den Raum auf der schwachen Seite ab [B-94] [verifiziert]. Der frühere offene Punkt „keine FIFA-Definition des 3. Verteidigers" ist damit erledigt.
- (a) Absicherung durch den 2. Verteidiger [verifiziert]:
  - Position hinter und innen versetzt zum 1. Verteidiger, um Pässe durch die Lücke und Doppelpässe zu verhindern [B-94].
  - Abstand qualitativ: nah genug, um den Pass durch die Lücke zu verhindern (Fehlerbild: zu weit weg); so, dass er eingreifen kann, wenn der 1. überspielt wird [B-94]; „angemessener Abstand und Winkel" [B-01].
  - Versetzt statt auf einer Linie: Drei Verteidiger auf einer Linie sind mit einem Pass überspielt; sie sollen Passwege in mehreren Tiefen blockieren [B-17]. Zwei zentrale Mittelfeldspieler stehen nicht flach [B-07].
  - Je nach Druck auf den Ball verständigen sich die Verteidiger, ob sie Läufer verfolgen oder übergeben [B-94].
  - Sekundärquellen sagen dasselbe als Gegensatzpaar: zu nah, und beide sind mit einer Aktion überspielt; zu weit, und der 1. Verteidiger steht isoliert [B-81]; Winkel gegen den Steilpass [B-82, niedrige Evidenz] [nur Suchergebnis].
  - Keine FIFA- oder UEFA-Quelle beziffert Absicherungsabstand oder -winkel, auch nicht abhängig von Tempo, Raum oder Zone [verifiziert].
- (a) Rollenverteilung im Block [verifiziert]:
  - Der Nächste presst, nahe Mitspieler sichern ab, der Rest verschiebt als Einheit [B-06, B-07].
  - Im Mittelfeld rückt der Nächste heraus und der Fernste ein [B-14]. Rückt ein Mittelfeldspieler heraus, rückt der Verteidiger hinter ihm mit [B-07].
  - Klare Zuständigkeiten, wer für welchen ballführenden Gegner verantwortlich ist, erleichtern die Aufgabe [B-57].
- (a) Balance auf der ballfernen Seite [verifiziert]:
  - Der ballferne Außenverteidiger rückt ein, um mit den Innenverteidigern kompakt zu sein und Flanke oder Seitenwechsel verteidigen zu können [B-07, B-57]. Er darf seinen Gegenspieler lösen, solange er ihn im Blick behält; der ungefährlichste Gegner darf frei sein [B-14].
  - Die ballfernsten Spieler verschieben, halten die Abstände und lassen den gegenüberliegenden Flügel offen [B-06]; sie wählen laufend zwischen möglichen Passoptionen [B-15].
- (a) Der Druck auf den Ball steuert die Linie [verifiziert]:
  - Die Qualität des Drucks beeinflusst die Position der unterstützenden Linie [B-01].
  - Konkrete Regel: Steht der Ballführende unter Druck, kann die Abwehr herausrücken oder halten; steht er nicht unter Druck, droht ein langer Ball und die Abwehr muss zurückweichen können [B-06]. Das klassische Begriffspaar „geschlossener/offener Ball" ist damit in FIFA-Material sachlich belegt.
  - Herausrücken bei Rückpass [B-05]; die Linie hält, rückt heraus oder fällt [B-01].
- Didaktik: Die FIFA-Reihenfolge lautet 1v1/1v2 → 2v2/2v3/3v3 → Linien [B-01, B-94] [verifiziert]; die FA ist ähnlich [B-68, B-69] [nur Suchergebnis].

**S1.3 Zonenverteidigung und Referenzpunkte**
- (a) Hauptreferenzen sind Ball, Mitspieler und die zu schützenden Räume, nicht einzelne Gegner; die Zonen sind dynamisch [B-01] [verifiziert].
- (a) In Einheiten kommen ausdrücklich Ort und Richtung des Balls sowie die Gegner hinzu [B-07]; Mitspieler dienen als Referenzpunkt beim Pressen [B-12]; Spieler sollen sich nicht vom Ball anziehen lassen, sondern an den Bewegungen der Mitspieler orientieren [B-102] [verifiziert].
- (a) Bezug zum Tor: torseitig kompakt bleiben, Schusswinkel verengen [B-07]; im Strafraum jeden Gegner decken [B-05] [verifiziert].
- (c) Gegnerbezug je nach Situation [verifiziert]:
  - spielerorientierte Momente innerhalb der zonalen Struktur [B-01]
  - Zuordnung im tiefen Block und im Strafraum [B-05]
  - Herausrücken auf einen freien Gegner zwischen den Linien, danach Rückkehr oder Übergabe [B-06]
  - Mann gegen Mann im Hochpressing [B-12]; Atalanta ganz ohne freien Mann hinten [B-57]; Mann-Zuordnung im kollektiven Gegenpressing [B-96]
  - Die Orientierung ist also gemischt (hybrid).
- UEFA: Räume statt Spieler zu markieren ist in der Champions League ein Trend [B-57] [verifiziert].
- [Hintergrundwissen, nicht per Suche bestätigt]: In der deutschsprachigen Ausbildung werden oft Ball, Tor, Mitspieler, Gegner und Raum als Orientierungspunkte genannt. FIFA nennt diese Bezugspunkte in verschiedenen Einheiten ebenfalls [B-01, B-07], aber nicht als feste Fünferliste.

**S1.4 Kollektives Verteidigen: Kompaktheit, Verschieben, Linienabstände, ballferne Seite**
- (a) FIFA-Grundprinzipien ohne Ball: Spielfeld verkleinern, Raum schließen (horizontal und vertikal), Form halten, Druck ausüben [B-95] [verifiziert].
- (a) Kompaktheit heißt kleine Abstände in einer Linie und zwischen den Linien [B-01, B-95]; zwischen den Linien keine Lücken, beim Herausrücken schieben die Linien gleichzeitig [B-16]; die Abwehrlinie bleibt verbunden [B-10] [verifiziert].
- (a) Das Zentrum hat Vorrang [B-06]. Die Formation richtet sich nach Position und Passoptionen des Ballführenden [B-08]. Der Gegner wird nach außen oder rückwärts gezwungen [B-06, B-08, B-09, B-10, B-16, B-39] [verifiziert].
- (a) Verschieben [verifiziert]:
  - als Einheit [B-06, B-12], im Tempo des Balls [B-06], mit Verdichtung auf der Ballseite [B-07]; „bewegt sich der Ball, bewegt sich das Team" [B-57].
  - (c) zentral eng, Breite erst, wenn der Ball außen ist [B-05].
  - (c) Spielt der Gegner zurück, rückt die Linie nach [B-05].
- Linienführung [verifiziert]: Die Viererkette steht gerade und verbunden [B-05], die Verteidiger aber halb geöffnet, um nach hinten sprinten zu können [B-06, B-57]. Staffelung betrifft vor allem das zentrale Mittelfeldpaar und die Absicherung in kleinen Gruppen [B-07, B-17].
- (b) Lehrmittel [verifiziert]: Längskanäle [B-12], Bogenläufe beim Anlaufen [B-08, B-11], die Paarregel für die erste Linie („einer presst, einer schirmt ab") [B-11], Hütchen als Referenz für die Kette [B-12].
- (a) Organisation zählt mehr als Blockhöhe [B-08]; gegensätzliche Stile wie tiefer Block und hohe Linie können gleich wirksam sein [B-102]. Kompaktheit hat einen Preis, nämlich Raum anderswo; entscheidend ist die Balance [B-39] [verifiziert].
- Beschreibende Werte aus dem Spitzenfußball [verifiziert]: WM 2022, Mittelfeldblock im Mittel etwa 27,2 m lang und 40,1 m breit [B-39]; Real Madrid in einer Szene 21,8 m lang mit 44 m zwischen den Außenverteidigern, Abwehrlinie im Mittel 35,7 m hoch [B-57]; ein organisiertes 4-4-2 etwa so breit wie der Strafraum [B-95].
- Übungswerte [verifiziert]: 6–8 m in der Viererkette auf großem Feld [B-05], etwa 3 m auf 20 × 15 m [B-06], etwa 6 m Startabstand zwischen Mittelfeld und Abwehr [B-07]; Einordnung in S5.

**S1.5 Wahrnehmung, Scanning, Entscheidungen, Spielintelligenz**
- (a) Scanning [verifiziert]:
  - eine bewusste Kopfbewegung weg vom Ball; je enger das Pressing, desto seltener [B-30]
  - hängt mit Passquote und nach vorn gerichteter Körperstellung zusammen und nimmt mit dem Alter zu [B-30]
  - zentrale Mittelfeldspieler scannen am häufigsten, Stürmer am seltensten; ein Scan dauert im Mittel etwa 0,4 s, Fixationen sind selten [B-31]
  - Empfehlung: spielnahe, positionsspezifische Übungen, sensorische Einschränkungen oder Reizüberflutung [B-31]
  - für Jugendliche eine feste Abfolge „umschauen – bewegen – annehmen" [B-32]; Checkliste ich, Gegner, Mitspieler, Raum, Chance [B-103]
  - komplexe, kontextreiche Übungen statt isolierter Drills [B-85] [nur Suchergebnis]
- (a) Das SPPA-Modell trennt Nahbereich, Position zu Linien und Tor sowie Peripherie [B-32] [verifiziert].
- (a) Körperstellung: Eine offene bzw. seitliche Annahme zeigt, wohin gespielt werden soll, und bereitet die nächste Aktion vor [B-21, B-26, B-27] [verifiziert].
- Entscheidungen lehren [verifiziert]:
  - FIFA: geführtes Entdecken mit Leitfragen für 12- bis 15-Jährige und wenig Eingreifen in der Anwendungsphase [B-100]; die Fragen „Was siehst du? Was kannst du tun? Was wählst du?" [B-101]; Bewertung nach gelöster Aufgabe und Fehlersuche nach Wahrnehmung, Entscheidung oder Technik [B-97]; Kernkompetenzen Information vor der Annahme, Entscheidung, Reflexion [B-98]; das PMDS-Raster (Position, Moment, Richtung, Tempo) [B-27].
  - UEFA: Entscheidungen und Problemlösen regelmäßig ins Training einbauen und die Autonomie der Spieler unterstützen [B-55]; angeleitete Entscheidungsfindung statt Überkontrolle [B-59]; schon 2005: Kinder sollen in Spielsituationen eigene Lösungen finden [B-62].
- Spielintelligenz: Sie hängt mit Antizipation und Mustererkennung zusammen und ist nur teilweise trainierbar; direkte Instruktion hilft kurzfristig, kann aber Kreativität kosten; Simulation und VR gelten als mögliche, noch ungeprüfte Hilfen [B-33] [verifiziert]. Eine Studie fand nach Mustererkennungstraining keine bessere Antizipation [B-86] [nur Suchergebnis]. Ein Transfer vom Erkennen zum Antizipieren ist also nicht garantiert. Das ist für einen Simulator zentral.
- Methodik [verifiziert]: Spiel als Grundlage und Spiralcurriculum für U12–U15 [B-37, B-97]; Play-Practice-Play [B-35]; dreistufige Progressionen bei Zonenverteidigung, positionsspezifischem Training und Grassroots 12–15 [B-01, B-99, B-100]; die UEFA verlangt spielnahes Training mit Gegnern und Druck [B-55]. TGfU im FIFA-Angebot [B-84] [nur Suchergebnis].

**S1.6 Angriffsprinzipien, Positionsspiel, Passen und Unterstützung**
- Eine kanonische FIFA-Liste der Angriffsprinzipien wurde auch im Volltext nicht gefunden. Die FIFA-Serie „Core principles of play" behandelt mit Ball nur Dritter-Mann-Kombinationen und Seitenwechsel [B-24, B-96] [verifiziert]. In Einheiten tauchen die Prinzipien angewandt auf [verifiziert]:
  - Breite und Tiefe [B-19, B-23, B-29, B-99, B-101]
  - Penetration und Tiefenläufe [B-23]
  - Unterstützung [B-20, B-22]
  - Mobilität und Gegenbewegung [B-19, B-28]
- (a) Die präzisesten FIFA-Begriffe stammen aus der Football Language [B-47, B-48] [verifiziert]:
  - Linienbruch durch, um oder über eine Einheit
  - Empfangsorte relativ zu den Einheiten
  - Anbieten und Bewegungsarten (vor, zwischen, hinter, von innen nach außen, von außen nach innen)
  - Lage innerhalb oder außerhalb der gegnerischen Team-Shape
  - Wer im Mittelfeld viele Linienbrüche zulässt, verliert häufiger [B-45].
- (b) Strukturen [verifiziert]: Dreiecke und Rauten [B-19, B-20, B-22]; ein Spieler im Zentrum [B-19]; Unterstützung hinter und vor dem Empfänger [B-22]; zwei zentrale Mittelfeldspieler nicht auf derselben vertikalen oder horizontalen Linie [B-99]; Gegenbewegung von Nummer 9 und 10 [B-28]; Position hinter den beiden Pressenden [B-99].
- (a/b) Vorwärtsspiel [verifiziert]: Vorwärts hat Priorität, wird aber durch Anlocken und Rückpässe vorbereitet [B-21, B-25]; ist Vorwärtsspiel nicht möglich, den Ball sichern [B-99]; die Dritter-Mann-Kombination ist ein flexibles Werkzeug, kein festes Muster [B-24, B-25].
- Positionsspiel: Eine FIFA-Definition wurde nicht gefunden. Laut einer Sekundärquelle hängen die zu besetzenden Zonen vom Ball ab [B-91] [nur Suchergebnis].
- Unterstützungsabstände: Keine FIFA- oder UEFA-Quelle nennt eine Zahl. Das 10-m-Dreieck ist ein Übungsmaß, verlangt werden Abstände „weder zu nah noch zu weit" [B-20], kurze, mittlere und lange Passoptionen [B-19]; im Futsal soll man sich vom Ballführenden wegbewegen [B-29] [verifiziert]. Eine US-Quelle beschreibt Optionen in mehreren Distanzen, idealerweise rundum [B-76] [nur Suchergebnis].

**S1.7 Kleinfeldspiele und Nachwuchsphilosophie der FIFA**
- (a) Grassroots [verifiziert]: kindzentriert, auf Spaß und Inklusion ausgerichtet [B-38]; Play-Practice-Play [B-35]; 1v1, 2v2 und 2v1 bei 4- bis 8-Jährigen [B-36]; Raumwahrnehmung mit Leitfragen [B-34]; für 12- bis 15-Jährige technische Grundlage → taktische Einführung → Spielanwendung mit geführten Fragen [B-100]. Das Grassroots-Programm für 6- bis 12-Jährige [B-93] ist [nur Suchergebnis].
- (a) Talentförderung [verifiziert]: Spiralcurriculum für U12–U15 mit acht Absichten und drei Skalen [B-97]; Zielalter 12–16, Kernkompetenzen Wahrnehmung und Entscheidung [B-98].
- (a) Elite-Nachwuchseinheiten steigen durchgehend von kleinen zu großen Formaten auf: 5v4 → 8v8 → 11v11 [B-10]; 6v6 → 8v8 → 11v11 [B-11]; 1v1 → 1v2 bis 4v5 [B-13]; 1v1 → Kleingruppen → Linien [B-01, B-94] [verifiziert].

**S1.8 FIFA Football Language als Ontologie für die Engine** [Eigene Ableitung auf Basis von B-39, B-43–B-48, B-88]
- Kandidaten für die Grundobjekte der Engine (alle Definitionen [verifiziert]):
  - **Einheit:** mindestens zwei Spieler; Gruppierung in Verteidigung, Mittelfeld und Sturm; die Linienhöhe ergibt sich aus dem tiefsten Spieler [B-44, B-47].
  - **Team-Shape:** die Verbindungslinie der äußersten Spieler jeder Einheit [B-47].
  - **Empfangsort:** vor, zwischen oder hinter den Einheiten [B-48].
  - **Linienbruch:** durch, um oder über eine Einheit; der Ball kommt über den tiefsten Spieler einer Linie hinaus [B-44, B-47].
  - **Druckart:** keiner, indirekt oder direkt [B-46]; EFI-Druck aus Abstand, Winkel und Zahl der Verteidiger [B-44].
  - **Phasen ohne Ball:** neun Phasen [B-44]; Block-Kriterien mit mindestens acht Feldspielern, höchstens 10 km/h, 1,6 s von 2,0 s stationär, mindestens vier Verteidigern hinter dem Ball [B-39].
  - **Teamlänge:** tiefster bis höchster Feldspieler, ohne Torwart [B-44].
- Lücke: FIFA veröffentlicht die Heuristiken nicht vollständig, etwa keine Druckschwellen [B-44] [verifiziert]; die Universität Zürich nennt das eine deutliche Lücke [B-88] [nur Suchergebnis]. SPIELIQ muss die Schwellen selbst festlegen und offenlegen.

### S2. UEFA (Forschungsfrage 2)

- **Grassroots Charter und Framework** [verifiziert]: ein Werte- und Qualitätsrahmen (sicher, spaßig, inklusiv; Mindestanforderungen für Fördermittel; vier Säulen Spieler, Fußballumfeld, Spiel, Personal) ohne taktische Prinzipien [B-53, B-104]. Das Framework nennt den starken Ausstieg im frühen Teenageralter als Herausforderung [B-104].
- **Coaching Convention und Lizenzen** [verifiziert]:
  - Die Konvention regelt das Ausbildungssystem und fördert realitätsnahes Lernen; das C-Diplom umfasst mindestens 60 h [B-54].
  - Das C-Diplom zielt auf sichere, freudvolle, altersgerechte Einheiten; iCoachKids ergänzt es um kindzentriertes Coaching [B-56].
  - Elite Youth A: spielnahe Einheiten mit Gegner, Druck und Intensität; Entscheidungen und Problemlösen regelmäßig ins Training einbauen; die Autonomie der Spieler bei Entscheidungen unterstützen; Selbstbewertung; altersgerechtes Coaching [B-55]. Das ist die deutlichste UEFA-Aussage zum Lehren von Entscheidungsfindung.
- **Technische Berichte und Analysen** [verifiziert]:
  - Kompaktes Verteidigen ist ein Trend. Im Mittelfeldblock werden Räume statt Spieler markiert; die größte Gefahr sind Läufe in den Rücken der Abwehr. Dazu Trainingshinweise zu Verschieben, ballfernem Außenverteidiger, Zuständigkeiten und Auslösern [B-57].
  - Nachwuchsturniere 2025: bei den Frauen gezieltes Lenken in Zonen und häufiger Dreierketten, bei der U17 der Männer Mittelfeldblock statt Hochpressing [B-60].
  - 1v1: Varianten aus allen Richtungen trainieren [B-58]; Entscheidungen im 1v1 sind kontextabhängig, angeleitete Entscheidungsfindung statt Überkontrolle [B-59].
- **Frühere Grassroots-Didaktik** [verifiziert]: Kleinfeldspiele, in denen Kinder eigene Lösungen finden (2005) [B-62]; Kleinfeldformate in Schottland auf Basis des UEFA Study Group Scheme [B-61]. Training Ground und TactX sind historisch und taktisch nicht ergiebig [B-63].
- **UEFA-B-Inhalte** (über einen FA-Erfahrungsbericht): Verzögern, Tiefe, Kompaktheit, Absicherung und Balance, Geduld [B-64] [nur Suchergebnis].
- Nicht erreichbar waren die vollständigen UEFA-Technikberichte (uefatechnicalreports.com) und die Zeitschrift The Technician (uefadirect). Eine taktische UEFA-Prinzipienliste für den Kinder- und Jugendfußball wurde nicht gefunden.

### S3. Abgleich mit anderen Curricula (Forschungsfrage 3)

| Quelle | Angriff | Verteidigung | Didaktik und Altersbezug |
|---|---|---|---|
| FA 2023 [B-67] [nur Suchergebnis] | Penetration; Raum schaffen; Bewegung; Unterstützung; Kreativität | Verzögern; Kompaktheit; Absicherung und Balance; Pressing; Kontrolle und Zurückhaltung | Spielnahe Übungen mit Toren, Gegnern, Richtung. 5–11: erst 1. Verteidiger, dann Unterstützung. 12–16: 1v1 sicher, dann Absicherung und Balance in größeren Kleinfeldern [B-68, B-69] |
| U.S. Soccer und Umfeld [B-76, B-74, B-75] [nur Suchergebnis] | Penetration; Breite; Unterstützung; Mobilität; Improvisation bzw. Kreativität | Druck; Absicherung; Balance; Verzögern; Kompaktheit | Play-Practice-Play; altersbezogene Spielmodelle mit vier Spielmomenten |
| FIFA Training Centre [B-01, B-19, B-47, B-94, B-95, B-97, B-100] [verifiziert] | Keine kanonische Liste. Angewandt: Breite, Tiefe, Mobilität, Unterstützung, Linien überspielen (durch/um/über); Kernprinzipien-Serie mit Dritter-Mann-Kombination und Seitenwechsel | Kernprinzipien ohne Ball: Spielfeld verkleinern, Raum schließen, Form halten, Druck ausüben [B-95]; Rollen Druck, Absicherung, Balance [B-01, B-94]; Zentrum schützen; Verschieben | Spiralcurriculum U12–U15 mit acht Absichten und drei Skalen; Progression 1v1/1v2 → Kleingruppen → eine, zwei, drei Linien; Play-Practice-Play; Grassroots 12–15: Technik → Taktik → Spielanwendung |
| UEFA [B-55, B-57] [verifiziert]; UEFA B über FA-Bericht [B-64] [nur Suchergebnis] | – | Räume statt Spieler markieren, eng und kompakt, Linien schließen [B-57]; laut FA-Bericht Verzögern, Tiefe, Kompaktheit, Absicherung und Balance, Geduld [B-64] | Spielnahes Training mit Gegner und Druck; Entscheidungstraining und Spielerautonomie (Elite Youth A) [B-55] |
| Football Australia [B-73] [nur Suchergebnis] | Teamaufgaben je Spielmoment; keine Prinzipienliste gefunden | Teamaufgaben je Spielmoment | Discovery (U6–U9), Skill Acquisition (U10–U13), Game Training (U14–U17), Performance (ab U17); spielbezogen; 1-4-3-3 als Verbandsvorgabe |
| KNVB [B-77, B-78] [nur Suchergebnis] | Teamfunktion: aufbauen und Tore erzielen | Teamfunktion: stören und Tore verhindern | Lernen durch Spielen; 6v6 (JO8–JO10), 8v8 (JO11–JO12) |
| RBFA [B-79] [nur Suchergebnis] | keine Prinzipienliste gefunden | keine Prinzipienliste gefunden | 2v2 → 5v5 → 8v8 → 11v11 (ab U13) |
| FootballDNA, nicht offiziell [B-92] [nur Suchergebnis] | Dispersal; Penetration; Bewegung; Unterstützung; Innovation | – | – |
| Klassisches Set [Hintergrundwissen, nicht per Suche bestätigt] | Penetration; Tiefe bzw. Unterstützung; Breite; Mobilität; Improvisation | Verzögern bzw. Druck; Tiefe bzw. Absicherung; Balance; Konzentration bzw. Kompaktheit; Kontrolle und Zurückhaltung | Oft auf Allen Wade (FA, 1960er-Jahre) zurückgeführt [Hintergrundwissen, nicht per Suche bestätigt] |

**Einordnung:**
- Inhaltlich wird das klassische Set weitgehend bestätigt. Die FA-Liste [B-67] und die US-Listen [B-76] sind sehr ähnlich [nur Suchergebnis]. Für die Phase ohne Ball ist die FIFA-Liste (verkleinern, schließen, Form halten, Druck) [B-95] mit dem klassischen Set vereinbar: Konzentration bzw. Kompaktheit und Druck stecken darin, Absicherung und Balance beschreibt FIFA in der Zonenverteidigung [B-01, B-94] [verifiziert].
- Die Begriffe haben sich aber verschoben:
  - „Pressing" statt „Druck"
  - „Raum schaffen" statt „Breite und Tiefe"
  - „Bewegung" statt „Mobilität"
  - „Kontrolle und Zurückhaltung" erscheint nur bei der FA ausdrücklich
- „Tiefe" ist mehrdeutig: im Angriff Staffelung bzw. Tiefenläufe, in der Abwehr Absicherung [B-64, B-92].
- Football Australia, KNVB und U.S. Soccer gliedern übergeordnet nach Spielmomenten und Teamaufgaben [B-73, B-75, B-77] [nur Suchergebnis]. FIFA ordnet ähnlich nach acht Absichten, je vier mit und ohne Ball [B-97] [verifiziert]. Das ist mit den Prinzipien vereinbar und eignet sich als Ebene darüber.
- FIFA liefert keine Angriffsliste, aber die präziseste Definition der einzelnen Begriffe (Football Language) [B-46–B-48] [verifiziert].

**Altersbezug (wie unterrichtet wird):**
- Kleine Formate im Kinderbereich [B-61] [verifiziert]; [B-78, B-79] [nur Suchergebnis].
- FA: Bis 11 Jahre kommen Ballbeherrschung und der 1. Verteidiger zuerst. Ab 12 folgen Absicherung und Balance in größeren Kleinfeldern [B-68] [nur Suchergebnis].
- Football Australia: „Game Training" ab U14 [B-73] [nur Suchergebnis].
- FIFA: Altersbänder 4–8, 8–12, 12–16 bzw. 12–15 [B-38, B-100]; Talentprogramm U12–U15 [B-97]; Zielalter 12–16 laut Wenger [B-98] [verifiziert].
- Für die Zielgruppe U14/U15 folgt daraus übereinstimmend: Rollen im Verbund (1., 2. und 3. Verteidiger) und Linien bzw. Blöcke sind altersgerecht, sofern das 1v1 sitzt [B-01, B-94, B-97] [verifiziert]; [B-68, B-73] [nur Suchergebnis].

### S4. Kontextabhängig oder veraltet bzw. vereinfacht? (Forschungsfrage 4)

**S4.1 Kontextabhängige Vorgaben (c), die die Engine einstellbar machen sollte**
1. **Lenkrichtung innen oder außen:**
   - Belegt ist „weg vom Zentrum oder Tor, nach außen, auf den schwachen Fuß" in konkreten Situationen [B-02, B-03, B-13, B-14, B-94] [verifiziert].
   - Ebenfalls belegt: Pressingfallen, die den Pass ins Zentrum einladen [B-96]; Lenken „zu einer Seite" [B-10, B-11]; gezieltes Lenken in Zonen [B-60] [verifiziert].
   - Nach innen in eine vorhandene Absicherung zu lenken, ist als allgemeine Regel weiterhin nicht belegt. In der FIFA-2v2-Übung steht die Absicherung innen, gezeigt wird nach außen [B-94] [verifiziert].
   - Konflikt „außen" gegen „schwacher Fuß" [Eigene Ableitung].
2. **Pressen oder verzögern:**
   - Pressen bei Auslösern [B-04, B-11, B-13]; geduldiger Block, der den Gegneraufbau zirkulieren lässt [B-06]; Rückzug je nach Spielstand und Zeitpunkt [B-96] [verifiziert].
   - Attackieren oder Abstand halten [B-03]; in Unterzahl verzögern [B-04, B-13] [verifiziert]; ebenso FA und Irish FA [B-70, B-72] [nur Suchergebnis].
   - Drei Pressinghöhen als Strategiewahl [B-66] [nur Suchergebnis]; Organisation vor Höhe [B-08]; gegensätzliche Stile gleich wirksam [B-102] [verifiziert]; kein einzelner Erfolgsweg laut Presse [B-52] [nur Suchergebnis].
3. **Mann- oder Raumorientierung:**
   - Raum als Standard der Zonenverteidigung [B-01, B-57] [verifiziert].
   - Mannorientierte Elemente beim Pressing, im Strafraum und im Gegenpressing [B-05, B-12, B-96]; Mann gegen Mann als ganze Strategie (Atalanta) [B-57] [verifiziert].
4. **Abstände innerhalb der Kette:** 6–8 m auf großem Feld [B-05] gegenüber etwa 3 m auf 20 × 15 m [B-06]. Die Zahlen hängen von Feldgröße und Übung ab [verifiziert].
5. **Linienführung:** gerade Viererkette [B-05] mit halboffener Körperstellung [B-06, B-57]; Staffelung im Mittelfeldpaar und in kleinen Gruppen [B-07, B-17]; Herausrücken oder Zurückweichen je nach Druck auf den Ball [B-01, B-06] [verifiziert].
6. **Systemvorgaben:** 1-4-3-3 als Pflicht in australischen Verbandsteams [B-73] [nur Suchergebnis]; Dreierkette als Standard einzelner Frauen-U17-Teams [B-60] [verifiziert]; Dauer-Hochpressing als Vereinsphilosophie [B-15] [verifiziert].
7. **Strukturen im Ballbesitz:** Dreiecke und Rauten [B-19, B-20] sowie Dritter Mann [B-24, B-25] sind Lösungswege (b), keine Pflicht [verifiziert].

**S4.2 Populäre Faustregeln – Einordnung**

| Regel | Einordnung | Belege |
|---|---|---|
| „Immer nach außen lenken." | Übervereinfacht. FIFA lenkt in vielen Situationen nach außen bzw. weg vom Zentrum, kennt aber auch Fallen, die den Pass ins Zentrum einladen, und das Lenken „zu einer Seite". Wohin, ist Teamplan (c); dass man lenkt, ist Prinzip (a). | B-02, B-03, B-11, B-13, B-46, B-60, B-94, B-96 [verifiziert] |
| „Der Nächste geht immer drauf" bzw. „alle zum Ball". | Der Kern stimmt (genau ein 1. Verteidiger). Falsch ist, dass alle angreifen: Einer presst, die Nächsten sichern ab, der Rest verschiebt; die Ballfernen orientieren sich an den Mitspielern. Angegriffen wird mit Timing und Auslöser; in Unterzahl wird verzögert. | B-04, B-06, B-11, B-13, B-94, B-102 [verifiziert]; B-70 [nur Suchergebnis] |
| „Die Viererkette verschiebt immer mit exakt gleichen Abständen." | Durch keine Quelle gedeckt. Betont werden Kompaktheit auf der Ballseite, zentrale Enge, eigene Aufgaben der ballfernen Spieler (einrücken, gegenüberliegenden Flügel offen lassen) und die Abhängigkeit vom Druck auf den Ball. Abstände werden als Bandbreite und übungsbezogen angegeben (6–8 m). | B-01, B-05, B-06, B-07, B-14, B-15 [verifiziert] |
| „Bleib immer auf deiner Position." | Übervereinfacht. Die Positionierung ist dynamisch; Mobilität ist ein Angriffsprinzip; FIFA will, dass alle Spieler die Rollen verstehen und austauschbar übernehmen können. Berechtigter Kern: Struktur und Balance halten. | B-01, B-19, B-97 [verifiziert]; B-67, B-76, B-91 [nur Suchergebnis] |
| „Nie zurückspielen." | Als absolute Regel falsch. Die Ablage gehört zur Dritter-Mann-Kombination, Anlocken ist Teil des Konzepts, und die Nummer 6 sichert den Ball, wenn Vorwärtsspiel nicht möglich ist. Rückpässe können das gegnerische Pressing auslösen und sind daher situativ zu bewerten. | B-05, B-11, B-20, B-21, B-24, B-25, B-99 [verifiziert] |
| „Jeder nimmt seinen Mann." | Als Grundregel für den Block überholt; Raumorientierung ist der Standard. Mannorientierte Elemente gibt es aber im Pressing, im Strafraum und als bewusste Strategie. | B-01, B-05, B-12, B-57, B-96 [verifiziert] |
| „Die Kette steht immer auf einer Linie." | Kontextabhängig. Die Viererkette soll gerade und verbunden stehen, die Verteidiger aber halb geöffnet, um nach hinten sprinten zu können. Im Mittelfeldpaar und in kleinen Gruppen ist Staffelung gefordert. Herausrücken oder Zurückweichen hängt vom Druck auf den Ball ab. | B-01, B-05, B-06, B-07, B-17, B-57 [verifiziert] |
| „Immer Dreiecke bilden." | Ein Lösungsweg (b), keine Pflicht. Prinzip (a) ist die Anspielbarkeit in mehreren Winkeln und Höhen; zwei zentrale Mittelfeldspieler sollen nicht auf einer Linie stehen. | B-19, B-20, B-22, B-99 [verifiziert] |
| „X Scans pro 10 Sekunden." | Nicht belegt. Belegt ist nur: Druck senkt die Scan-Häufigkeit, Positionen unterscheiden sich, ein Scan dauert etwa 0,4 s. Wengers Aussage zu den zehn Sekunden vor der Annahme nennt weder eine Scan-Zahl noch einen Beleg. | B-30, B-31, B-98 [verifiziert] |

**S4.3 Wo sich Quellen widersprechen oder uneinheitlich sind**
- **Abstände innerhalb der Kette:** 6–8 m [B-05] gegenüber etwa 3 m [B-06]. Aufgelöst: unterschiedliche Feldgrößen (großes Feld gegenüber 20 × 15 m) [verifiziert].
- **Gerade Linie gegen Staffelung:** weitgehend aufgelöst. Die Viererkette steht gerade [B-05], gestaffelt wird im Mittelfeldpaar und in kleinen Gruppen [B-07, B-17] [verifiziert].
- **Lenkrichtung:** „außen" und „schwacher Fuß" können kollidieren [B-02, B-13]; in derselben Einheit stehen „nach außen" und „zu einer Seite" [B-11]; dazu Fallen nach innen [B-96] [verifiziert].
- **Rollenmodelle:** FIFA nutzt D1/D2 auf Spielerebene [B-97] und 1./2./3. Verteidiger in der Zonenverteidigung [B-01, B-94] [verifiziert].
- **Begriffe der Prinzipien:** FA, US und FootballDNA verwenden unterschiedliche Listen [B-67, B-76, B-92] [nur Suchergebnis].
- **Pressinghöhen:** Bei der FA beginnt „tief" an der Mittellinie [B-66] [nur Suchergebnis]. Bei FIFA liegt der tiefe Block mit mindestens acht Feldspielern im Abwehrdrittel [B-39] [verifiziert].
- **Teamlänge bei der WM 2022:** minus 2 m [B-41] [nur Suchergebnis] gegenüber minus 1 m im hohen und minus 2 m im tiefen Block [B-42] [verifiziert]. Eher verschiedene Teilmengen als ein Widerspruch.
- **Spielintelligenz:** laut FIFA „teilweise trainierbar" [B-33] [verifiziert]; laut Studie verbessert Mustererkennung die Antizipation nicht [B-86] [nur Suchergebnis].
- **Kleinfeld im Kinderbereich:** Kritik am 5v5 für U7 in Belgien [B-79] [nur Suchergebnis].
- **Uneinheitliche Angaben innerhalb einer Quelle** [verifiziert]: Torwarthöhe 3,6 m im Text, 3,8 m in der Zusammenfassung [B-49]; 9v9 bzw. 9 gegen 8 [B-07]; 4v4 + 2 bzw. 5v5 + 2 [B-13]; Seitendaten weichen von Übersichtsseiten ab [B-02, B-27, B-51, B-102]; „Key Take-aways", die nicht zum Artikel passen [B-100].
- **Aufgelöst:** Männerturnier bei [B-50]; Frauen-Turniere bei [B-60].

### S5. Quantifizierbare Vorgaben (Forschungsfrage 5)

| Angabe | Kontext | Quelle | Eignung für die Engine |
|---|---|---|---|
| 2–3 m Abstand des Verteidigers beim Ballempfang des Angreifers | FIFA-Elite-Einheit Südafrika U15, 1v1 | B-13 [verifiziert] | Startwert für „direkter Druck"; kalibrieren |
| 6–8 m zwischen den Verteidigern einer Viererkette | Lehmann, Mädchengruppe; 6v5 auf 25 × 50 m bis 7v6 auf halbem Feld | B-05 [verifiziert] | Startwert für den Parameter „größte zulässige Lücke in der Kette" auf großem Feld; kalibrieren |
| etwa 3 m zu benachbarten Mitspielern | Chiba, Teil 1 auf 20 × 15 m | B-06 [verifiziert] | Keine Norm; zeigt, dass Abstände mit der Feldgröße skalieren |
| etwa 6 m Abstand zwischen Mittelfeld- und Abwehrlinie | Diabaté, Startaufstellung einer Übung im tiefen Block (halbes Feld) | B-07 [verifiziert] | Anhaltspunkt für den Linienabstand im tiefen Block; keine Norm |
| etwa 45° Körperwinkel zum Gegner | Beachsoccer, 1v1 | B-18 [verifiziert] | Höchstens Standardwert für die Körperorientierung; Übertragbarkeit offen |
| Blockbreite „etwa Strafraumbreite" | FIFA-Kernprinzipien, organisiertes 4-4-2 | B-95 [verifiziert] | Qualitativer Richtwert für 11v11 |
| Mittelfeldblock im Mittel etwa 27,2 m lang und 40,1 m breit; kompakteste Teams 22,5–23,5 m lang | WM 2022, Erwachsene | B-39 [verifiziert] | Nur zur Plausibilitätsprüfung, relativ zur Feldgröße skalieren |
| Real Madrid: 21,8 m Länge (eine Szene), 44 m zwischen den Außenverteidigern, Abwehrlinie im Mittel 35,7 m | UCL-Halbfinale 2024 | B-57 [verifiziert] | Nur zur Plausibilitätsprüfung |
| Block-Klassifikation: mindestens 8 Feldspieler im Mittel- (und Abwehr-) bzw. nur im Abwehrdrittel; höchstens 10 km/h; mindestens 1,6 s von 2,0 s stationär; mindestens 4 Verteidiger hinter dem Ball; Ende nach 0,4 s in 2,0 s | FIFA-Analyse zur WM 2022 bzw. EFI | B-39, B-44 [verifiziert] | Direkt zur Klassifikation des Blockzustands |
| Einheit aus mindestens 2 Spielern; Linienbruch „durch" = zwischen den beiden äußersten Spielern unterhalb Kopfhöhe | FIFA Football Language | B-47 [verifiziert] | Direkt implementierbar (in 2D ohne Kopfhöhe: „über" als eigene Passart modellieren) [Eigene Ableitung] |
| Linienhöhe = tiefster Spieler der Gruppe; Teamlänge = tiefster bis höchster Feldspieler ohne Torwart (FIFA) bzw. Mittel der vier tiefsten (Preprint) | EFI bzw. Forschung | B-43, B-44 [verifiziert]; B-90 [nur Suchergebnis] | Operationalisierung wählen und dokumentieren |
| Abwehrlinie 17,4 m, Torwart 4,8 m vor dem Tor (Ball im Abwehrdrittel) | ein Torwart, ein Team, Klub-WM 2021 | B-49 [verifiziert] | Nur zur Plausibilitätsprüfung |
| Abstand Torwart–Abwehrlinie 20,4 m (WM 2022) bzw. 29,4–29,6 m (eigener Ball im letzten Drittel, Frauenturniere 2023 und 2024) | Turniere | B-49 [verifiziert] | Nur zur Plausibilitätsprüfung |
| Kanadas Abwehrlinie im Mittel 62 m vom eigenen Tor beim Angriff im letzten Drittel | WM 2026 | B-102 [verifiziert] | Beschreibend |
| Teamlänge und -breite ±1–2 m gegenüber 2018 | WM 2022 | B-42 [verifiziert]; B-41 [nur Suchergebnis] | Ungeeignet, da keine Absolutwerte |
| Übungsmaße: 10-m-Dreieck, 20 × 10 m, 25 × 10 m, 18 × 25 m, 20 × 15 m, 30 × 20 m, 20 × 25 m, 45 × 15 m, 40 × 35 m, 32 × 50 m, 25 × 50 m | FIFA-Übungen | B-04, B-05, B-06, B-09, B-15, B-17, B-20, B-21, B-23, B-94 [verifiziert] | Für die Gestaltung von Übungen, nicht als Positionsnorm |
| Formate: KNVB 6v6 (Viertelfeld), 8v8 (Halbfeld); Schottland 4er, 7er, 11er; RBFA 2v2, 5v5, 8v8, 11v11 (ab U13) | Verbandsformate | B-61 [verifiziert]; B-78, B-79 [nur Suchergebnis] | Voreinstellungen für Feldgrößen |

**Ausdrücklich nicht gefunden (auch nicht im Volltext der FIFA- und UEFA-Quellen):**
- Abstände oder Winkelbereiche für die Absicherung durch den 2. Verteidiger. Es gibt nur die qualitative Beschreibung „hinter und innen, nah genug gegen den Pass durch die Lücke" [B-94].
- Unterstützungsabstände nach Alter oder Feldgröße.
- Empfohlene Linienabstände nach Alter oder Feldgröße.
- Normwerte für Kompaktheit im Jugendfußball; vorhanden sind nur deskriptive Elitewerte [B-39, B-57].
- Eine veröffentlichte Meterschwelle für „Druck auf den Ball". EFI nutzt Abstand und Winkel ohne veröffentlichte Schwelle [B-44]; einziger Anhaltspunkt sind die 2–3 m im 1v1 [B-13].

FIFA veröffentlicht die Rechenheuristiken der EFI-Metriken nicht vollständig [B-44]. Zahlen dafür dürfen nicht erfunden werden.

**Empfehlung für die Parametrisierung** [Eigene Ableitung, keine Quellenaussage]:
- Kriterien relativ statt absolut formulieren, z. B.:
  - Kann der Absichernde die nächste Ballberührung des Angreifers erreichen, bevor dieser frei ist? Verhindert seine Position den Pass durch die Lücke zum 1. Verteidiger? (gestützt durch [B-94])
  - Schneidet ein Verteidiger den Passkorridor?
  - Abstände relativ zur Feldbreite und zur Lage der Gegner. Die Übungswerte (3 m auf 20 × 15 m, 6–8 m auf großem Feld) zeigen, dass Abstände mit der Feldgröße skalieren.
- Einzelwerte wie 2–3 m, 6–8 m oder etwa 6 m nur als dokumentierte Startwerte verwenden.
- Alle Schwellen vor dem Einsatz mit erfahrenen Trainern kalibrieren und validieren, z. B. über Expertenurteile zu Beispielsituationen.

### S6. Prinzip-Tabelle

| Prinzip | Definition (eigene Worte) | Beobachtbare Kriterien für eine Bewertungsengine | Kontextabhängigkeiten | Quellen |
|---|---|---|---|---|
| Druck auf den Ball (1. Verteidiger) (a) | Der ballnächste Verteidiger verkürzt kontrolliert den Abstand zum Ballführenden oder zum wahrscheinlichen Empfänger, nimmt ihm Zeit und Optionen und gibt eine Richtung vor. | Gibt es genau einen klar zuständigen 1. Verteidiger statt mehrerer? Steht er torseitig, also zwischen Ball und Tor? Liegt der Abstand in einem kalibrierbaren Band (FIFA-Anhaltspunkt: 2–3 m beim Ballempfang im 1v1)? Kommt er abgebremst an und steht nicht über den Ball hinaus? Schließen Anlaufwinkel und Körperstellung die gefährlichere oder die geplante Seite? Klassifikation: kein, indirekter oder direkter Druck. | Zone; vorhandene Absicherung; Teamplan (hoch, mittel, tief; Zielzone); Auslöser wie schlechte Annahme, Rückpass oder Annahme mit Blick zum eigenen Tor; Über- oder Unterzahl; starker oder schwacher Fuß | B-01, B-02, B-03, B-04, B-11, B-13, B-46 [verifiziert]; B-70 [nur Suchergebnis] |
| Absichern (2. Verteidiger) (a) | Ein nahe stehender Mitspieler steht hinter und innen versetzt zum 1. Verteidiger, verhindert den Pass durch die Lücke zwischen beiden und greift ein, wenn der 1. überspielt wird. | Ist ein 2. Verteidiger in Reichweite? Steht er hinter und innen bzw. zum Tor hin versetzt und nicht auf gleicher Höhe (beide mit einer Aktion überspielbar)? Ist er so nah, dass der Pass durch die Lücke nicht möglich ist, und nicht so weit weg, dass der 1. isoliert ist? Blockiert er eine Passlinie in die Tiefe? | Tempo des Angreifers; Raum hinter der Kette; Zone; Druck auf den Ball. Keine FIFA- oder UEFA-Quelle beziffert diese Abhängigkeit. | B-01, B-06, B-07, B-17, B-94 [verifiziert]; B-68, B-81, B-82 (niedrige Evidenz) [nur Suchergebnis] |
| Balance bzw. ballferne Absicherung (3. Verteidiger) (a) | Der ballfernste Verteidiger bleibt mit der Gruppe verbunden, schützt den Raum auf der schwachen Seite und antizipiert die nächste Aktion; in der Kette rückt der ballferne Außenverteidiger ein. | Sind die ballfernen Verteidiger eingerückt und die Abstände zu den Innenverteidigern klein? Sind die zentralen Räume hinter und neben dem 2. Verteidiger besetzt? Hat der ballferne Verteidiger seinen Gegenspieler noch im Blick und kann ihn bei einem Seitenwechsel erreichen? Darf der ungefährlichste Gegner frei sein bzw. der gegenüberliegende Flügel offen bleiben? | Wie gut der Gegner die Seite wechselt; Feldbreite; Zahl der Verteidiger; Spielstand | B-01, B-06, B-07, B-14, B-15, B-57, B-94 [verifiziert]; B-67, B-76 [nur Suchergebnis] |
| Kompaktheit horizontal und vertikal (a) | Kleine Abstände innerhalb einer Linie und zwischen den Linien, damit zentrale Passwege und Räume zwischen den Linien geschlossen sind. | Größte Lücke innerhalb einer Linie (Parameter; 6–8 m bzw. 3 m nur als Übungsbeispiele). Gibt es freie Gegner zwischen den Einheiten? Linienhöhe nach dem tiefsten Spieler. Länge und Breite des Blocks (Elitewerte nur zur Plausibilität; Breite im 11v11 etwa Strafraumbreite). Verdichtung auf der Ballseite. | Blockhöhe; Druck auf den Ball; Feldgröße und Altersklasse; Breite des Gegners; Spielstand (im Rückstand größere Fläche) | B-01, B-05, B-06, B-07, B-10, B-16, B-39, B-44, B-57, B-95 [verifiziert] |
| Ballorientiertes Verschieben (a) | Der Block bewegt sich als Einheit zur Ballseite und je nach Ballposition und Druck vor oder zurück. | Folgt der Schwerpunkt des Blocks dem Ball seitlich (mit Toleranz) und im passenden Tempo? Rückt die Linie bei einem Rückpass nach (c)? Hält oder rückt sie heraus, wenn der Ballführende unter Druck steht, und weicht sie zurück, wenn er frei ist? Bleibt die Kette zentral eng und verteidigt Breite erst bei Ball außen? | Gegnerische Formation; Zone; Pressingplan | B-01, B-05, B-06, B-07, B-12, B-15, B-57 [verifiziert] |
| Zentrum schützen und Richtung vorgeben (a, Richtung c) | Die Verteidiger halten den Gegner von zentralen, tornahen Zonen fern und blockieren Vorwärtspässe; die Richtung ergibt sich aus dem Teamplan, meist nach außen, bei Fallen auch gezielt nach innen. | Zahl offener Passlinien ins Zentrum bzw. in die Tiefe; schneiden Anlaufkurve und Stellung die zentrale Linie ab (Deckungsschatten)? Bei einer Falle: Wird in die geplante Zone gelenkt und beim Auslöser zugeschnappt? | Teamplan (Falle innen oder außen, „zu einer Seite"); Absicherung; schwacher Fuß; Zone; Seitenlinie als Verbündeter | B-02, B-03, B-06, B-08, B-09, B-10, B-11, B-17, B-60, B-95, B-96 [verifiziert] |
| Verzögern und Geduld (a) | Nicht überhastet in den Zweikampf gehen, Zeit gewinnen, bis Unterstützung da ist; auf den richtigen Moment warten. | In Unterzahl oder ohne Absicherung: Abstand und torseitige Position halten, nicht angreifen. Attackieren nur bei Auslöser oder vorhandener Absicherung. Im Block übercommittet der vorderste Spieler nicht. | Über- oder Unterzahl; Zone; Spielstand | B-03, B-04, B-06, B-13, B-94 [verifiziert]; B-67, B-70, B-72 [nur Suchergebnis] |
| Zonale Orientierung über Referenzpunkte (a, Mischform c) | Die Position richtet sich vorrangig nach Ball (Ort und Richtung), Mitspielern und dem zu schützenden Raum; Gegner und Tor kommen als weitere Bezugspunkte dazu; alles bleibt dynamisch. | Abweichung von einer ballabhängigen Sollzone (Modell); Abstände zu den Mitspielern; torseitige Position; Herausrücken auf einen freien Gegner zwischen den Linien und anschließende Rückkehr oder Übergabe. | Mannorientierter Zugriff beim Pressing, im Strafraum und im Gegenpressing; Teamkonzept | B-01, B-05, B-06, B-07, B-12, B-57, B-102 [verifiziert] |
| Raum schaffen: Breite und Tiefe (a) | Das Team in Ballbesitz verteilt sich über Breite und Tiefe und dehnt so den Gegner. | Sind beide Flügel besetzt (Abstand der äußersten Spieler)? Stehen Spieler in unterschiedlichen Höhen, einschließlich einer Bedrohung hinter der letzten Linie? Wo stehen sie relativ zur gegnerischen Team-Shape? | Spielphase; Ballposition; gegnerischer Block | B-19, B-23, B-29, B-47, B-99, B-101 [verifiziert]; B-67, B-76, B-92 [nur Suchergebnis] |
| Unterstützung und Anspielbarkeit (a; Dreieck oder Raute als b) | Der Ballführende hat mehrere erreichbare Optionen in unterschiedlichen Winkeln und Höhen, hinter und vor dem Ball. | Zahl offener Passlinien (Korridor nicht von Verteidigern geschnitten); Vielfalt der Winkel (keine zwei zentralen Mittelfeldspieler auf derselben Linie); Unterstützung hinter und vor dem Empfänger; Abstand in einem Band „weder zu nah noch zu weit" (ohne Quellenwert); bieten ballferne Spieler dem nächsten Ballführenden eine Option? | Druck; Zone; Passreichweite der Altersklasse | B-19, B-20, B-21, B-22, B-99 [verifiziert]; B-76 [nur Suchergebnis] |
| Penetration bzw. Linien überspielen (a) | Den Ball durch, um oder über gegnerische Einheiten spielen oder Spieler zwischen bzw. hinter den Linien anspielen. | FIFA-Definitionen: Einheit aus mindestens 2 Spielern; „durch" zwischen den beiden äußersten Spielern; „um" außen herum; „über" über Kopfhöhe; Ball über den tiefsten Spieler der Linie hinaus; Empfangsort vor, zwischen oder hinter den Einheiten. | Risiko gegen Absicherung; Spielstand; Vorwärtspriorität gegen Anlocken | B-21, B-24, B-44, B-45, B-47, B-48 [verifiziert]; B-67 [nur Suchergebnis] |
| Freilaufen und Mobilität (a; Bewegungsmuster b) | Sich aktiv anbieten (Signal, Körperstellung, Bewegung) und sich gezielt vor, zwischen oder hinter die Linien bewegen, von innen nach außen oder umgekehrt. | Verlässt der Spieler den Deckungsschatten eines Verteidigers? Steht er zwischen gegnerischen Einheiten? Vermeidet er Abseits? Bewegt er sich gegen die Bewegung eines Mitspielers? Stimmen Position, Moment, Richtung und Tempo (PMDS)? | Ballposition; Timing; Rolle | B-19, B-27, B-28, B-48, B-99 [verifiziert]; B-76 [nur Suchergebnis] |
| Wahrnehmung und Körperstellung (a) | Vor der Ballannahme umschauen und offen bzw. seitlich zum Spiel stehen, um die nächste Aktion vorzubereiten. | Im 2D-Simulator: Zeigt die Blickrichtung der Figur zur nächsten Spielrichtung? Wahrnehmungsfrage vor dem Zug (ich, Gegner, Mitspieler, Raum, Chance); Abfolge umschauen – bewegen – annehmen [Eigene Ableitung]. | Druck senkt die Häufigkeit des Scannens; Position; Alter | B-21, B-26, B-27, B-30, B-31, B-32, B-103 [verifiziert] |
| Dritter-Mann-Kombination (b) | Pass, Ablage, Lauf eines dritten Spielers in den freien Raum, Pass in diesen Lauf. | Startet der dritte Spieler, während der Verteidiger auf Ball oder Passgeber schaut? Endet er zwischen oder hinter den Einheiten? Bleibt er regelkonform (kein Abseits)? | Abseits; Timing; ist der dritte Spieler zugestellt, wird die Variante angepasst | B-24, B-25 [verifiziert] |
| Kreativität und Improvisation (a, kaum regelbasiert) | Unerwartete, zur Situation passende Lösungen. | Kaum regelbasiert bewertbar. Als „offene Lösung" zulassen und nicht bestrafen, solange keine Grundprinzipien verletzt werden [Eigene Ableitung]. | – | B-33, B-59 [verifiziert]; B-67, B-76, B-92 [nur Suchergebnis] |

### S7. Kurzfassung der Ableitungen für SPIELIQ [Eigene Ableitung]
1. **Begriffe:** Die FIFA Football Language als Begriffssystem und Geometrie übernehmen (Einheiten, Team-Shape, Linienbruch, Empfangsort, Druckart, Blockphasen) und ein eigenes Glossar mit messbaren Definitionen führen [B-39, B-44, B-46–B-48, B-105].
2. **Drei Ebenen:**
   - (a) Prinzipien werden immer bewertet.
   - (b) Lösungswege gelten gleichwertig; bewertet wird, ob die Aufgabe gelöst ist [B-97].
   - (c) Kontextvorgaben stellt der Trainer ein, z. B. Lenkrichtung, Pressinghöhe, Pressingfallen, Linienführung.
3. **Feedback:** abgestuft und begründet („passt", „vertretbar", „riskant", jeweils mit Prinzip und Alternative) statt richtig oder falsch; nach Ursache gegliedert (Wahrnehmung, Entscheidung, Ausführung) [B-97]; vor dem Zug Leitfragen wie „Was siehst du? Was kannst du tun? Was wählst du?" [B-100, B-101]. Formulierungen wie „immer" und „nie" vermeiden.
4. **Rollenlogik gegen „alle zum Ball":**
   - genau ein 1. Verteidiger
   - ein 2. Verteidiger hinter und innen in einem Abstandsband
   - ein 3. Verteidiger, der auf der schwachen Seite die Verbindung hält
   - die übrigen verschieben und orientieren sich an den Mitspielern
   - Belege: [B-01, B-06, B-94, B-102]
5. **Progression:** 1v1/1v2 → 2v2/2v3/3v3 (Druck, Absicherung, Balance) → eine Linie → zwei Linien → drei Linien (11v11), analog zu [B-01, B-94]; Kleinformate wie [B-10, B-13].
6. **Transfer:** Der Simulator ergänzt das Platztraining (Technik und Spielphasen), ersetzt es aber nicht [B-35, B-99, B-100] [verifiziert]; [B-74, B-86, B-87] [nur Suchergebnis]. Den Transfer messen.
7. **Motivation:** Verteidigen als Ballgewinn und Start eines Konters darstellen [B-10, B-50] [verifiziert]; [B-83] [nur Suchergebnis]. Freude und nicht bloßstellendes Feedback sind auch wegen des Ausstiegsrisikos im frühen Teenageralter wichtig [B-104].

---

## Offene Punkte / Unsicherheiten

1. **Primärlektüre teilweise nachgeholt:** 60 Einträge wurden im Volltext geprüft (siehe Verifikationsprotokoll). Ungeprüft bleiben B-40, B-41, B-52 und B-64 bis B-93, weil ihre Domains blockiert sind; diese Aussagen sind weiterhin nur Suchergebnisse. Videos, Grafiken und Flipbooks wurden nicht ausgewertet. Die vollständigen UEFA-Technikberichte und der FIFA-Abschlussbericht zur WM 2026 waren nicht erreichbar.
2. **Suchbudget erschöpft; Stand der damals offenen Themen:**
   - FIFA-Inhalte zu Rückpässen: teilweise geklärt [B-21, B-25, B-99]
   - ballferne Balance bzw. Einrücken des ballfernen Außenverteidigers: geklärt [B-07, B-14, B-57, B-94]
   - Rotationen und Positionswechsel: offen (nur der Hinweis, dass Rollen austauschbar sein sollen [B-97])
   - Mann- oder Raumorientierung im offenen Spiel: weitgehend geklärt [B-01, B-12, B-57, B-96]
   - DFB-Curricula zum Abgleich: offen (evtl. in einem anderen Teilbericht)
   - offizielle Dokumente von U.S. Soccer, Football Australia, KNVB und RBFA: offen (Domains blockiert)
   - FIFA Grassroots Coaching Manual: offen
   - Syllabus der UEFA-Youth-B-Lizenz: offen (die Konvention nennt nur den Mindestumfang von 60 h [B-54])
   - weitere UEFA-Aussagen zur Entscheidungsfindung: geklärt [B-55, B-59, B-62]
3. **Keine belastbaren Zahlen** für Absicherungsabstand und -winkel, Unterstützungsabstände nach Alter oder Feld, Linienabstände nach Alter oder Feld, Kompaktheitsnormen im Jugendbereich oder Meterschwellen für „Druck". Vorhanden sind nur Übungswerte (2–3 m, etwa 3 m, etwa 6 m, 6–8 m) und Elitewerte. Alle Schwellen der Engine sind Designentscheidungen. Sie müssen mit Trainern kalibriert und validiert werden, z. B. über Expertenurteile zu standardisierten Beispielsituationen [Eigene Ableitung].
4. **Nach innen lenken:** In FIFA-Material belegt sind Pressingfallen, die den Pass ins Zentrum einladen [B-96], und das Lenken „zu einer Seite" [B-10, B-11]. Eine FIFA- oder UEFA-Quelle, die das Lenken nach innen in eine vorhandene Absicherung als Regel lehrt, wurde nicht gefunden; in der FIFA-2v2-Übung wird nach außen gezeigt, die Absicherung steht innen [B-94].
5. **3. Verteidiger:** geklärt; FIFA definiert die Balance-Rolle [B-01, B-17, B-94]. Offen bleibt, wie SPIELIQ die zwei FIFA-Rollenmodelle (D1/D2 [B-97] und 1./2./3. Verteidiger) zusammenführt.
6. **Begriffe uneinheitlich:** Hoch, mittel und tief bei Pressing bzw. Block sowie die Prinzipienlisten werden je nach Verband verschieden verwendet [B-39, B-66, B-67, B-76]. SPIELIQ braucht ein eigenes, dokumentiertes Glossar mit messbaren Definitionen [B-105].
7. **Übertragbarkeit:** Viele Quellen stammen aus dem Elite- oder Erwachsenenbereich [B-39, B-42, B-49, B-57] oder aus anderen Formaten wie Beach und Futsal [B-18, B-29]. FIFA-Material für 12- bis 15-Jährige gibt es [B-08, B-10, B-13, B-22, B-97, B-100], überwiegend aus Talentprogrammen. Ob es sich auf U14/U15 im deutschen Amateurbereich übertragen lässt, ist ungeprüft.
8. **Kopien auf Drittseiten:** Für Konvention und Elite-Youth-A-Syllabus wurden die UEFA-Originale geprüft [B-54, B-55]. Offen sind Version und Echtheit bei der FIFA-Grassroots-Kursunterlage [B-93], den Slideshare-Präsentationen [B-73, B-77, B-79] und den D-Lizenz-Unterlagen [B-76].
9. **Unklare Zuordnungen:** Geklärt sind B-50 (Männerturnier), der Bogenlauf (B-08), B-62 (Newsletter 12/2005), die PDF-Zuordnungen bei B-03 und B-08 sowie B-60 (Frauen-Turniere). Offen bleiben:
   - Pressingaussage im Modell U15–U16 oder U17+ [B-75]
   - Herkunft der Pressinghöhen [B-66]
   - Wenger-Aussage [B-40]
   - Herkunft des 2v2-Zusatzes in [B-04]
10. **WM-2026-Bericht:** Der Abschlussbericht der TSG war nicht erreichbar (Flipsnack blockiert). FIFA-eigene Analysen bestätigen das Kap-Verde-Beispiel [B-102]; die übrigen Presseangaben [B-52] bleiben ungeprüft.
11. **Transferfrage:** Mustererkennung verbessert die Antizipation nicht automatisch [B-86] [nur Suchergebnis]; Williams nennt Simulation und VR nur als mögliche Hilfen [B-33]. Die Wirksamkeit eines 2D-Simulators auf das Spielverhalten ist mit dieser Recherche nicht belegt und muss eigens evaluiert werden.
12. **Hintergrundwissen prüfen:**
    - offener und geschlossener Ball: sachlich durch [B-06] belegt
    - Seitenlinie als „zusätzlicher Verteidiger": durch [B-08, B-95] belegt
    - weiterhin offen: Herkunft des klassischen Prinzipiensets (Allen Wade), deutsche Orientierungspunkte, 11 gegen 11 in der C-Jugend, Strafraumbreite von rund 40 m laut Spielregeln (siehe [B-95])
