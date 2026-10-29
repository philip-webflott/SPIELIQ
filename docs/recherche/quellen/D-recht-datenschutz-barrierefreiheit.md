# D – Recht, Datenschutz, Kinderschutz online, Barrierefreiheit und ethisches Design (Deutschland/EU)

Rechercheteil D für SPIELIQ · Recherchestand: 29.10.2026

> **Keine Rechtsberatung, keine Konformitätsaussage.** Dieses Dokument ordnet Anforderungen, Empfehlungen und offene Fragen, damit eine Anwältin oder ein Anwalt (Datenschutz-, Jugendmedienschutz-, Verbraucher- und IT-Recht) sie prüfen kann. „Voraussichtlich verpflichtend" heißt hier: nach dem Wortlaut der abgerufenen Normen naheliegend, aber nicht abschließend geprüft. Nirgends wird behauptet, SPIELIQ sei rechtskonform.

## Methodik und Grenzen

- **Deutsche Bundesgesetze:** Volltext per curl von gesetze-im-internet.de abgerufen. Das sind nichtamtliche konsolidierte Fassungen; die Stand-Angaben der Seite habe ich übernommen. Die Paragrafentexte entsprechen dem Stand vom Abruftag. Was die jüngsten Änderungsgesetze konkret geändert haben, habe ich nicht geprüft.
- **DFB-Dokumente:** Volltext von dfb.de und assets.dfb.de abgerufen, gefunden über die Sitemap von dfb.de.
- **Websuche:** Nur drei Suchanfragen liefen durch. Danach war das Websuche-Kontingent dieses Durchgangs aufgebraucht, das ich mir mit anderen Agenten teile. Treffer aus diesen drei Suchen sind als „Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet" markiert.
- **Gesperrte Quellen:** EUR-Lex, EDPB, DSK, BfDI, LfDI BW, ICO, W3C, ETSI, 5Rights, BzKJ, gdpr-text.com, activemind.legal und das OPUS-Repositorium Augsburg waren nicht erreichbar (Proxy-Antwort 403; ein einmaliger Test zusätzlicher Domains bestätigte das). Was ich zu diesen Quellen schreibe, stammt aus meinem Hintergrundwissen und ist als **[Hintergrundwissen, nicht per Suche bestätigt]** markiert, in Tabellen kurz **[HW]**. Ihre URLs habe ich aus dem Gedächtnis angegeben und nicht geöffnet.
- **Paraphrasen:** Wörtlich zitiert wird nur kurz und nur aus Texten, die ich tatsächlich abgerufen habe.

Verifikationsstufen in den Quelleneinträgen:
1. „Volltext abgerufen (…, 29.10.2026)": Primärtext gelesen.
2. „Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet": nur Trefferliste bzw. Zusammenfassung des Suchwerkzeugs.
3. „Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]": in dieser Sitzung nicht überprüft.

---

## Quellen

### [D-01] Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz (TDDDG), §§ 2, 25, 26
- Herausgeber: Bundesministerium der Justiz / juris (gesetze-im-internet.de, nichtamtliche Fassung)
- URL: https://www.gesetze-im-internet.de/ttdsg/__25.html ; https://www.gesetze-im-internet.de/ttdsg/__2.html ; https://www.gesetze-im-internet.de/ttdsg/__26.html (Der Pfad heißt weiterhin /ttdsg/; /tdddg/__25.html liefert HTTP 404.)
- Fassung/Datum: ausgefertigt am 23.06.2021; Überschrift, Kurzbezeichnung und Abkürzung „TDDDG" seit Art. 8 G v. 6.5.2024, wirksam ab 14.05.2024 (vorher „TTDSG"); zuletzt geändert durch Art. 3 G v. 10.3.2026 (BGBl. 2026 I Nr. 64)
- Zugriff / Verifikationsstatus: Volltext abgerufen (gesetze-im-internet.de, 29.10.2026)
- Kernaussagen (paraphrasiert):
  - § 25 Abs. 1: Informationen dürfen in der Endeinrichtung des Endnutzers nur gespeichert oder dort ausgelesen werden, wenn der Endnutzer auf Grundlage klarer und umfassender Informationen eingewilligt hat. Information und Einwilligung richten sich nach der DSGVO.
  - § 25 Abs. 2: Keine Einwilligung ist nötig, wenn der einzige Zweck die Übertragung einer Nachricht über ein öffentliches Telekommunikationsnetz ist (Nr. 1), oder wenn Speicherung bzw. Zugriff „unbedingt erforderlich" sind, damit der Anbieter einen vom Nutzer „ausdrücklich gewünschten" digitalen Dienst bereitstellen kann (Nr. 2).
  - Der Wortlaut spricht von „Informationen", nicht nur von personenbezogenen Daten.
  - § 2: Begriffsbestimmungen (Anbieter digitaler Dienste, Bestands- und Nutzungsdaten, Endeinrichtung); im Übrigen gelten die Begriffe aus TKG, DDG und DSGVO.
  - § 26: Dienste zur Einwilligungsverwaltung können anerkannt werden; Einzelheiten regelt eine Rechtsverordnung.
- Konsequenzen für SPIELIQ:
  - § 25 gilt für die PWA auch ohne Cookies: localStorage, IndexedDB, Cache Storage und Service Worker, Push-Subscriptions und Geräte-IDs fallen alle darunter.
  - Ziel ist eine Architektur ohne Einwilligungspflicht. Gespeichert wird nur, was ausdrücklich gewünschte Funktionen „unbedingt" brauchen: Login-Sitzung, Spielstand, Offline-Lektionen, wenn der Nutzer sie anfordert. Analytics, A/B-Tests, Tracking-SDKs, Werbe-IDs und Fingerprinting wären einwilligungspflichtig. Darauf verzichten oder serverseitig lösen, ohne auf das Endgerät zuzugreifen.
  - Offen bleibt, wer „Endnutzer" ist (das Kind oder die Eltern als Gerätebesitzer) und ob Art. 8 DSGVO auch für die Einwilligung nach § 25 gilt (Tabelle 3).

### [D-02] Digitale-Dienste-Gesetz (DDG), §§ 1, 5
- Herausgeber: BMJ / juris (gesetze-im-internet.de)
- URL: https://www.gesetze-im-internet.de/ddg/__5.html ; https://www.gesetze-im-internet.de/ddg/__1.html
- Fassung/Datum: ausgefertigt am 06.05.2024; Textnachweis ab 14.05.2024; zuletzt geändert durch Art. 26 Abs. 2 G v. 25.3.2026 (BGBl. 2026 I Nr. 81)
- Zugriff / Verifikationsstatus: Volltext abgerufen (gesetze-im-internet.de, 29.10.2026)
- Kernaussagen (paraphrasiert):
  - § 5 Abs. 1: Wer geschäftsmäßige, in der Regel entgeltliche digitale Dienste anbietet, muss bestimmte Angaben leicht erkennbar, unmittelbar erreichbar und ständig verfügbar halten. Dazu gehören Name und Anschrift (bei juristischen Personen auch Rechtsform und Vertretungsberechtigte), Angaben für schnelle elektronische Kontaktaufnahme samt E-Mail-Adresse, Register und Registernummer, USt-IdNr. bzw. W-IdNr. und gegebenenfalls Aufsichtsbehörde oder Kammer.
  - § 1 Abs. 4 Nr. 1: Ein „digitaler Dienst" ist ein Dienst im Sinne von Art. 1 Abs. 1 lit. b der Richtlinie (EU) 2015/1535, also ein Dienst der Informationsgesellschaft.
  - Dass das DDG das frühere Telemediengesetz (TMG) abgelöst hat, steht nicht im abgerufenen Text [Hintergrundwissen, nicht per Suche bestätigt].
- Konsequenzen für SPIELIQ: Ein Impressum gehört in Website und PWA (Footer bzw. Menü). Auch während einer kostenlosen B2B-Pilotphase dürfte der Dienst „geschäftsmäßig" sein; das ist meine Auslegung und anwaltlich zu bestätigen. Die DDG-Definition des digitalen Dienstes spielt zusätzlich in § 2 Nr. 26 BFSG eine Rolle (D-10).

### [D-03] DDG § 12 – Zuständigkeiten für die Durchsetzung des DSA (BNetzA, BzKJ mit „Stelle zur Durchsetzung von Kinderrechten in digitalen Diensten", BfDI)
- Herausgeber: BMJ / juris
- URL: https://www.gesetze-im-internet.de/ddg/__12.html
- Fassung/Datum: wie D-02
- Zugriff / Verifikationsstatus: Volltext abgerufen (gesetze-im-internet.de, 29.10.2026)
- Kernaussagen (paraphrasiert):
  - Abs. 1: Grundsätzlich ist die Bundesnetzagentur zuständige Behörde nach Art. 49 Abs. 1 DSA.
  - Abs. 2: Die Bundeszentrale für Kinder- und Jugendmedienschutz (BzKJ) setzt Art. 14 Abs. 3 DSA durch und die „strukturellen Vorsorgemaßnahmen" nach Art. 28 Abs. 1 DSA, soweit keine Maßnahmen nach dem JMStV betroffen sind. In der BzKJ wird eine „Stelle zur Durchsetzung von Kinderrechten in digitalen Diensten" mit Sitz in Bonn eingerichtet.
  - Abs. 3: Der BfDI ist zuständig für Art. 26 Abs. 3 und Art. 28 Abs. 2 und 3 DSA. Was diese Artikel regeln, steht unter D-39 [HW].
- Konsequenzen für SPIELIQ: Falls DSA-Pflichten greifen (offen, D-39), wären die BzKJ (Vorsorge zum Kinderschutz, kindgerechte AGB) und der BfDI (Werbeverbot auf Basis von Profiling bei Minderjährigen) die zuständigen Behörden. Die allgemeine Datenschutzaufsicht liegt bei der Landesbehörde (D-09).

### [D-04] Jugendschutzgesetz (JuSchG) §§ 24a, 24b – Vorsorgemaßnahmen, Befugnisse und Verfahren
- Herausgeber: BMJ / juris
- URL: https://www.gesetze-im-internet.de/juschg/__24a.html ; § 24b im Volltext: https://www.gesetze-im-internet.de/juschg/BJNR273000002.html
- Fassung/Datum: zuletzt geändert durch Art. 4 G v. 6.10.2026 (BGBl. 2026 I Nr. 589); den Inhalt dieser jüngsten Änderung habe ich nicht geprüft
- Zugriff / Verifikationsstatus: Volltext abgerufen (gesetze-im-internet.de, 29.10.2026)
- Kernaussagen (paraphrasiert):
  - § 24a Abs. 1: Die BzKJ setzt Art. 28 Abs. 1 DSA durch, „wonach Anbieter von Online-Plattformen, die für Minderjährige zugänglich sind, geeignete und verhältnismäßige Maßnahmen ergreifen müssen, um ein hohes Maß an Privatsphäre, Sicherheit und Schutz von Kindern und Jugendlichen innerhalb ihres Dienstes zu gewährleisten".
  - § 24a Abs. 2 nennt als Vorsorgemaßnahmen „insbesondere":
    1. ein Melde- und Abhilfeverfahren mit kindgerechter Benutzerführung;
    2. ein Einstufungssystem für nutzergenerierte audiovisuelle Inhalte;
    3. Altersverifikation für nutzergenerierte Inhalte, die als „ab 18" eingestuft sind;
    4. einen leicht auffindbaren Hinweis auf anbieterunabhängige Beratungs-, Hilfe- und Meldemöglichkeiten;
    5. technische Mittel, mit denen Sorgeberechtigte die Nutzung steuern und begleiten können;
    6. Voreinstellungen, die Risiken begrenzen, sofern keine ausdrückliche anderslautende Einwilligung vorliegt: (a) Profile sind weder über Suchdienste auffindbar noch für nicht angemeldete Personen einsehbar, (b) Standort- und Kontaktdaten sowie Kommunikation werden nicht veröffentlicht, (c) Kommunikation ist auf einen vorab selbst gewählten Kreis beschränkt, (d) die Nutzung erfolgt anonym oder unter Pseudonym.
  - § 24a Abs. 3 und 4: § 24b Abs. 3 gilt entsprechend für Art. 14 Abs. 3 DSA; die DSGVO bleibt unberührt.
  - § 24b: Die BzKJ hat die Befugnisse aus dem DSA. jugendschutz.net nimmt erste Einschätzungen der Vorsorgemaßnahmen vor. Das Verfahren ist gestuft: zuerst Stellungnahme und Beratung, dann Aufforderung mit Frist, zuletzt Anordnung nach erneuter Frist. Die zentrale Aufsichtsstelle der Länder für den Jugendmedienschutz wird angehört.
  - Ältere Darstellungen beschreiben § 24a als eigenständige Pflicht mit einer Schwelle von einer Million Nutzern. Die heute abgerufene Fassung knüpft stattdessen an Art. 28 DSA an. (Die Angabe zur Altfassung ist [Hintergrundwissen, nicht per Suche bestätigt].)
- Konsequenzen für SPIELIQ:
  - Ob § 24a direkt greift, hängt davon ab, ob SPIELIQ eine „Online-Plattform" im Sinne des DSA ist und nicht unter die Ausnahme für Kleinst- und Kleinunternehmen fällt (offen, D-39).
  - Unabhängig davon ist Abs. 2 eine gute, gesetzlich verankerte Checkliste. Mit Pseudonymität, nicht öffentlichen Profilen und ohne Chat erfüllt SPIELIQ Nr. 6 (a) bis (d) bereits sinngemäß. Es fehlen noch ein kindgerechtes Meldeverfahren (Nr. 1), Hinweise auf unabhängige Hilfe (Nr. 4) und Begleitfunktionen für Eltern (Nr. 5).
  - Das Verfahren ist beratend und gestuft. Es lohnt sich, die Vorsorgemaßnahmen früh zu dokumentieren.

### [D-05] JuSchG §§ 1, 10a, 10b – Altersbegriffe, Schutzziele, Interaktionsrisiken
- Herausgeber: BMJ / juris
- URL: https://www.gesetze-im-internet.de/juschg/__10b.html ; §§ 1 und 10a im Volltext: https://www.gesetze-im-internet.de/juschg/BJNR273000002.html
- Fassung/Datum: wie D-04
- Zugriff / Verifikationsstatus: Volltext abgerufen (gesetze-im-internet.de, 29.10.2026)
- Kernaussagen (paraphrasiert):
  - § 1 Abs. 1: Kinder sind unter 14, Jugendliche 14 bis unter 18 Jahre alt.
  - § 10a: Zu den Schutzzielen gehören der Schutz der persönlichen Integrität bei der Mediennutzung (Nr. 3) und die Förderung von Orientierung (Nr. 4).
  - § 10b Abs. 3: Bei der Beurteilung, ob ein Medium die Entwicklung beeinträchtigt (also bei der Alterseinstufung), sind erhebliche Risiken für die persönliche Integrität zu berücksichtigen. Genannt werden ausdrücklich Risiken durch „Kommunikations- und Kontaktfunktionen", „Kauffunktionen", „glücksspielähnliche Mechanismen", „Mechanismen zur Förderung eines exzessiven Mediennutzungsverhaltens", die Weitergabe von Bestands- und Nutzungsdaten an Dritte ohne Einwilligung sowie nicht altersgerechte Kaufappelle. Vorsorgemaßnahmen nach § 24a werden dabei einbezogen.
- Konsequenzen für SPIELIQ:
  - Der Gesetzgeber zählt genau die Designrisiken auf, die SPIELIQ vermeiden will: Chat und Kontakt, Käufe, Lootbox-artige Zufallsbelohnungen, Mechaniken, die exzessive Nutzung fördern (Streak-Druck), und Datenweitergabe. Formal regelt § 10b die Alterseinstufung von Medien. Trotzdem ist er eine starke gesetzliche Begründung für das Produktprinzip „keine Interaktionsrisiken".
  - Rechtlich relevante Altersschwellen sind 14 (JuSchG), 16 (Art. 8 DSGVO) und 18 (Volljährigkeit). Die Zielgruppe von 6 bis 19 Jahren umfasst also Kinder, Jugendliche und Erwachsene; für 18- und 19-Jährige braucht es eigene Abläufe.

### [D-06] JuSchG § 14a – Kennzeichnung bei Film- und Spielplattformen
- Herausgeber: BMJ / juris
- URL: Volltext https://www.gesetze-im-internet.de/juschg/BJNR273000002.html (§ 14a)
- Fassung/Datum: wie D-04
- Zugriff / Verifikationsstatus: Volltext abgerufen (gesetze-im-internet.de, 29.10.2026)
- Kernaussagen (paraphrasiert): Film- und Spielplattformen fassen Filme oder Spielprogramme in einem Gesamtangebot zusammen und halten sie mit Gewinnerzielungsabsicht als eigene Inhalte zum Abruf bereit. Sie dürfen Inhalte nur mit deutlich wahrnehmbarem Alterskennzeichen anbieten; §§ 10b und 14 Abs. 2a gelten entsprechend. Befreit ist eine Plattform, die im Inland nachweislich weniger als eine Million Nutzer hat (Abs. 2).
- Konsequenzen für SPIELIQ: Offen ist, ob interaktive Lektionen „Spielprogramme" sind und ob SPIELIQ mit Abo eine „Spielplattform" wäre. Solange SPIELIQ in Deutschland weniger als eine Million Nutzer hat, ist es ohnehin befreit. Nutzerzahlen dokumentieren und bei Wachstum die Alterskennzeichnung prüfen (z. B. über anerkannte Selbstkontrolle oder ein automatisiertes Bewertungssystem).

### [D-07] SGB VIII §§ 11, 72a, 75 – Jugendarbeit, Tätigkeitsausschluss einschlägig vorbestrafter Personen, freie Träger
- Herausgeber: BMJ / juris
- URL: https://www.gesetze-im-internet.de/sgb_8/__72a.html ; §§ 11, 54 und 75 im Volltext: https://www.gesetze-im-internet.de/sgb_8/BJNR111630990.html
- Fassung/Datum: Neufassung durch Bek. v. 11.9.2012; zuletzt geändert durch Art. 9 G v. 23.4.2026 (BGBl. 2026 I Nr. 111)
- Zugriff / Verifikationsstatus: Volltext abgerufen (gesetze-im-internet.de, 29.10.2026)
- Kernaussagen (paraphrasiert):
  - § 72a Abs. 1: Träger der öffentlichen Jugendhilfe dürfen niemanden beschäftigen, der wegen bestimmter Straftaten rechtskräftig verurteilt ist (u. a. §§ 171, 174–174c, 176–180a, 181a, 182–184g, 184i–184l, 201a Abs. 3, 225, 232–233a, 234–236 StGB). Bei Einstellung und danach regelmäßig sollen sie sich ein erweitertes Führungszeugnis vorlegen lassen.
  - § 72a Abs. 2 und 4: Die öffentlichen Träger „sollen" durch Vereinbarungen mit den Trägern der freien Jugendhilfe sicherstellen, dass dort keine einschlägig verurteilten Personen hauptamtlich, neben- oder ehrenamtlich Kinder beaufsichtigen, betreuen, erziehen, ausbilden oder vergleichbaren Kontakt haben. In den Vereinbarungen wird festgelegt, welche Tätigkeiten erst nach Einsicht in das Führungszeugnis ausgeübt werden dürfen. Die dort erwähnten „Vereine im Sinne des § 54" sind laut § 54 Vormundschaftsvereine, keine Sportvereine.
  - § 72a Abs. 5: Aus der Einsicht dürfen nur drei Dinge erhoben und gespeichert werden: dass Einsicht genommen wurde, das Datum des Führungszeugnisses und ob eine einschlägige oder anderweitig eignungsausschließende Verurteilung vorliegt. Die Daten dienen nur der Eignungsprüfung, sind vor Unbefugten zu schützen und unverzüglich zu löschen, wenn die Tätigkeit nicht ausgeübt wird, spätestens sechs Monate nach der letzten Tätigkeit.
  - § 11: „Jugendarbeit in Sport, Spiel und Geselligkeit" ist ein Schwerpunkt der Jugendarbeit (Abs. 3 Nr. 2). Angebote sollen von jungen Menschen mitbestimmt und mitgestaltet werden, und ihre Zugänglichkeit für junge Menschen mit Behinderungen soll sichergestellt sein (Abs. 1).
  - § 75: Voraussetzungen für die Anerkennung als Träger der freien Jugendhilfe.
- Konsequenzen für SPIELIQ:
  - Die Pflicht trifft, vermittelt über Vereinbarungen, die Vereine und Träger, nicht SPIELIQ. SPIELIQ ist kein Träger der Jugendhilfe.
  - SPIELIQ sollte keine Führungszeugnisse und keine Inhalte daraus erheben. Sinnvoll ist, dass nur der Vereinsadministrator die Trainerrolle vergeben kann und dabei bestätigt, dass die Person nach dem Schutzkonzept des Vereins eingesetzt ist. Ob SPIELIQ als Auftragsverarbeiter die nach Abs. 5 zulässigen Vermerke für den Verein speichern darf oder soll, muss anwaltlich geklärt werden.
  - Die Mitbestimmung nach § 11 Abs. 1 taugt als Leitbild für ein partizipatives Design mit Jugendlichen, ebenso die Inklusion junger Menschen mit Behinderungen.

### [D-08] Bundeszentralregistergesetz (BZRG) § 30a – Erweitertes Führungszeugnis
- Herausgeber: BMJ / juris
- URL: https://www.gesetze-im-internet.de/bzrg/__30a.html
- Fassung/Datum: Stand-Angabe nicht gesondert abgerufen
- Zugriff / Verifikationsstatus: Volltext abgerufen (gesetze-im-internet.de, 29.10.2026)
- Kernaussagen (paraphrasiert): Das erweiterte Führungszeugnis wird u. a. erteilt für die berufliche oder ehrenamtliche Beaufsichtigung, Betreuung, Erziehung oder Ausbildung Minderjähriger und für vergleichbare Kontakttätigkeiten (Abs. 1). Beantragen kann man es nur mit einer schriftlichen Aufforderung der Stelle, die es verlangt (Abs. 2). Die entgegennehmende Stelle darf die Daten nur zur Eignungsprüfung für genau diese Tätigkeit verarbeiten, muss sie schützen und löschen: unverzüglich, wenn die Tätigkeit nicht ausgeübt wird, spätestens sechs Monate nach der letzten Ausübung (Abs. 3).
- Konsequenzen für SPIELIQ: Würde SPIELIQ selbst Führungszeugnisse entgegennehmen, wäre das zweckfremd, denn die Tätigkeit wird für den Verein ausgeübt, nicht für SPIELIQ. Deshalb nicht vorsehen; allenfalls eine Bestätigung durch den Verein (siehe D-07).

### [D-09] BDSG §§ 38, 40 und Volltextprüfung zu Art. 8 DSGVO
- Herausgeber: BMJ / juris
- URL: https://www.gesetze-im-internet.de/bdsg_2018/__38.html ; https://www.gesetze-im-internet.de/bdsg_2018/__40.html ; Volltext https://www.gesetze-im-internet.de/bdsg_2018/BJNR209710017.html
- Fassung/Datum: ausgefertigt am 30.06.2017; zuletzt geändert durch Art. 3 G v. 12.5.2026 (BGBl. 2026 I Nr. 139)
- Zugriff / Verifikationsstatus: Volltext abgerufen (gesetze-im-internet.de, 29.10.2026)
- Kernaussagen (paraphrasiert):
  - § 38 Abs. 1 S. 1: Nichtöffentliche Stellen brauchen einen Datenschutzbeauftragten, wenn sie in der Regel mindestens 20 Personen ständig mit automatisierter Verarbeitung beschäftigen.
  - § 38 Abs. 1 S. 2: Unabhängig von der Personenzahl ist ein Datenschutzbeauftragter zu benennen, wenn der Verantwortliche „oder der Auftragsverarbeiter" Verarbeitungen vornimmt, die einer Datenschutz-Folgenabschätzung nach Art. 35 DSGVO unterliegen.
  - § 40: Die Datenschutzaufsicht über nichtöffentliche Stellen führen die nach Landesrecht zuständigen Behörden; bei mehreren Niederlassungen gilt die Hauptniederlassung entsprechend Art. 4 Nr. 16 DSGVO.
  - Die Volltextsuche im BDSG nach „Kind", „Minderj", „Lebensjahr" und „Artikel 8" ergab keine Regelung, die von der Altersgrenze des Art. 8 DSGVO abweicht. Kinder kommen nur bei der Aufgabe der BfDI vor, die Öffentlichkeit zu sensibilisieren.
- Konsequenzen für SPIELIQ:
  - Ist die Verarbeitung der Lernstände DSFA-pflichtig (D-30), muss SPIELIQ voraussichtlich einen Datenschutzbeauftragten benennen, auch als kleines Start-up und auch in der Rolle als Auftragsverarbeiter (der Wortlaut nennt ausdrücklich den Auftragsverarbeiter).
  - Zuständig ist die Landesdatenschutzbehörde am Sitz von SPIELIQ; für die Verarbeitung der Vereine die Behörde am Sitz des jeweiligen Vereins.
  - Zusammen mit D-21, D-25 und D-26 bestätigt das: In Deutschland gilt die Altersgrenze 16.

### [D-10] Barrierefreiheitsstärkungsgesetz (BFSG)
- Herausgeber: BMJ / juris
- URL: https://www.gesetze-im-internet.de/bfsg/__1.html ; https://www.gesetze-im-internet.de/bfsg/__2.html ; https://www.gesetze-im-internet.de/bfsg/__3.html ; Volltext https://www.gesetze-im-internet.de/bfsg/BJNR297010021.html
- Fassung/Datum: ausgefertigt am 16.07.2021; zuletzt geändert durch Art. 32 G v. 6.5.2024 (BGBl. 2024 I Nr. 149); setzt laut Gesetzestitel die Richtlinie (EU) 2019/882 (European Accessibility Act) um
- Zugriff / Verifikationsstatus: Volltext abgerufen (gesetze-im-internet.de, 29.10.2026)
- Kernaussagen (paraphrasiert):
  - § 1 Abs. 3 Nr. 5: Das Gesetz gilt für „Dienstleistungen im elektronischen Geschäftsverkehr", die nach dem 28.06.2025 für Verbraucher erbracht werden.
  - § 2 Nr. 26: Dienstleistungen im elektronischen Geschäftsverkehr sind digitale Dienste (§ 1 Abs. 4 Nr. 1 DDG), die über Websites und Apps angeboten und elektronisch auf individuelle Anfrage eines Verbrauchers „im Hinblick auf den Abschluss eines Verbrauchervertrags" erbracht werden. Verbraucher ist nach § 2 Nr. 16 eine natürliche Person, die nicht überwiegend gewerblich oder beruflich handelt.
  - § 3 Abs. 1: Dienstleistungen müssen barrierefrei sein, also für Menschen mit Behinderungen in der allgemein üblichen Weise, ohne besondere Erschwernis und grundsätzlich ohne fremde Hilfe auffindbar, zugänglich und nutzbar. Die Einzelheiten regelt die BFSGV (D-11).
  - § 3 Abs. 3: Ausgenommen sind Kleinstunternehmen, die Dienstleistungen erbringen. Kleinstunternehmen sind nach § 2 Nr. 17 Unternehmen mit weniger als zehn Beschäftigten und höchstens 2 Mio. € Jahresumsatz oder Jahresbilanzsumme.
  - § 4: Wer harmonisierte Normen einhält, deren Fundstellen im Amtsblatt der EU veröffentlicht sind, für den wird Konformität vermutet.
  - § 14: Eine Dienstleistung darf nur angeboten werden, wenn sie die Anforderungen erfüllt und die Informationen nach Anlage 3 erstellt und barrierefrei veröffentlicht sind. Die Konformität muss laufend gewahrt bleiben; bei Abweichungen sind Korrekturen nötig und die Marktüberwachung ist zu informieren.
  - Anlage 3: In den AGB „oder auf andere deutlich wahrnehmbare Weise" sind anzugeben: eine allgemeine Beschreibung der Dienstleistung in barrierefreiem Format, Erläuterungen zur Durchführung, eine Beschreibung, wie die Anforderungen erfüllt werden, und die zuständige Marktüberwachungsbehörde.
  - §§ 16, 17: Ausnahmen wegen grundlegender Veränderung oder unverhältnismäßiger Belastung gibt es nur mit dokumentierter Beurteilung (fünf Jahre aufbewahren; bei Dienstleistungen mindestens alle fünf Jahre neu beurteilen).
  - § 37: Wer eine nicht konforme Dienstleistung anbietet (Verstoß gegen § 14 Abs. 1), riskiert ein Bußgeld bis 100.000 €.
  - § 38: Übergangsregeln, u. a. bis 27.06.2030 für Verträge, die vor dem 28.06.2025 geschlossen wurden.
- Konsequenzen für SPIELIQ:
  - Sobald Eltern oder Privatspieler online ein Abo abschließen, liegt SPIELIQ plausibel im Anwendungsbereich, es sei denn, es ist ein Kleinstunternehmen. Reine B2B-Lizenzen mit Vereinen (juristischen Personen) sind keine Verbraucherverträge.
  - Offen ist, ob nur der Bestell- und Vertragsprozess oder die gesamte Lernplattform erfasst ist (Tabelle 3). Pragmatisch: die ganze App von Anfang an nach WCAG 2.2 AA bauen. Nachrüsten ist teuer, und wer sich auf Ausnahmen nach §§ 16 und 17 beruft, muss das dokumentieren.
  - Den Status als Kleinstunternehmen regelmäßig prüfen und dokumentieren.

### [D-11] Verordnung zum Barrierefreiheitsstärkungsgesetz (BFSGV), §§ 3, 12, 19
- Herausgeber: BMJ / juris
- URL: https://www.gesetze-im-internet.de/bfsgv/BJNR092800022.html
- Fassung/Datum: ausgefertigt am 15.06.2022; Textnachweis ab 28.06.2025; geändert durch Art. 1 V v. 10.7.2026 (BGBl. 2026 I Nr. 205); den Inhalt dieser Änderung habe ich nicht geprüft
- Zugriff / Verifikationsstatus: Volltext abgerufen (gesetze-im-internet.de, 29.10.2026)
- Kernaussagen (paraphrasiert):
  - § 3: Der Stand der Technik ist zu beachten; abweichen darf man, wenn man die Anforderungen anders gleichwertig erfüllt. Die Bundesfachstelle Barrierefreiheit veröffentlicht die wichtigsten Standards und Konformitätstabellen.
  - § 12: Allgemeine Anforderungen an Dienstleistungen. Informationen müssen über mehr als einen Sinneskanal bereitstehen, auffindbar, verständlich und wahrnehmbar sein, in Textformaten vorliegen, aus denen sich assistive Formate erzeugen lassen, in angemessener Schriftgröße mit ausreichendem Kontrast und Abstand gesetzt sein und Alternativen für nicht-textliche Inhalte bieten. Websites einschließlich Online-Anwendungen sowie mobile Apps müssen „wahrnehmbar, bedienbar, verständlich und robust" sein (Nr. 3). Support-Dienste müssen über Barrierefreiheit informieren (Nr. 4).
  - § 19: Im elektronischen Geschäftsverkehr müssen außerdem Identifizierungs-, Authentifizierungs-, Sicherheits- und Zahlungsfunktionen sowie Identifizierungs- und Authentifizierungsmethoden, elektronische Signaturen und Zahlungsdienste wahrnehmbar, bedienbar, verständlich und robust sein.
- Konsequenzen für SPIELIQ: Login, Einladungscode, Eltern-Bestätigung, Bezahlung und Kündigung müssen barrierefrei sein. Die vier Prinzipien entsprechen der Gliederung der WCAG (D-47); diese Zuordnung ist [HW].

### [D-12] Barrierefreie-Informationstechnik-Verordnung (BITV 2.0), §§ 1–3
- Herausgeber: BMJ / juris
- URL: https://www.gesetze-im-internet.de/bitv_2_0/__1.html ; https://www.gesetze-im-internet.de/bitv_2_0/__3.html ; § 2 im Volltext https://www.gesetze-im-internet.de/bitv_2_0/BJNR184300011.html
- Fassung/Datum: ausgefertigt am 12.09.2011; zuletzt geändert durch Art. 1 V v. 24.10.2023 (BGBl. 2023 I Nr. 286)
- Zugriff / Verifikationsstatus: Volltext abgerufen (gesetze-im-internet.de, 29.10.2026)
- Kernaussagen (paraphrasiert): Die BITV verlangt, dass Informationen und Dienstleistungen „öffentlicher Stellen" barrierefrei sind (§ 1 Abs. 2). Sie gilt für Websites, mobile Anwendungen, elektronische Verwaltungsabläufe und grafische Programmoberflächen (§ 2). Konformität wird vermutet, wenn im Amtsblatt der EU genannte harmonisierte Normen eingehalten werden; im Übrigen gilt der Stand der Technik. Für Formulare und Authentifizierung soll das „höchstmögliche Maß" an Barrierefreiheit angestrebt werden (§ 3).
- Konsequenzen für SPIELIQ: Die BITV gilt nicht unmittelbar für SPIELIQ als privates Unternehmen. Relevant wird sie, wenn öffentliche Stellen SPIELIQ betreiben oder beschaffen. Landesrecht für Schulen und Landesbehörden habe ich nicht geprüft. Als methodischer Maßstab (EN 301 549, D-48) bleibt sie nützlich.

### [D-13] BGB §§ 107, 108, 110, 1626 – Minderjährige und elterliche Sorge
- Herausgeber: BMJ / juris
- URL: https://www.gesetze-im-internet.de/bgb/__107.html ; https://www.gesetze-im-internet.de/bgb/__108.html ; https://www.gesetze-im-internet.de/bgb/__110.html ; https://www.gesetze-im-internet.de/bgb/__1626.html
- Fassung/Datum: Stand-Angabe des BGB nicht gesondert abgerufen
- Zugriff / Verifikationsstatus: Volltext abgerufen (gesetze-im-internet.de, 29.10.2026)
- Kernaussagen (paraphrasiert):
  - § 107: Für eine Willenserklärung, die nicht lediglich rechtlich vorteilhaft ist, braucht ein Minderjähriger die Einwilligung des gesetzlichen Vertreters. § 108: Ohne Einwilligung geschlossene Verträge sind schwebend unwirksam, bis der Vertreter sie genehmigt. § 110 („Taschengeldparagraf"): Der Vertrag ist wirksam, wenn der Minderjährige die Leistung mit Mitteln bewirkt, die ihm dafür oder zur freien Verfügung überlassen wurden.
  - § 1626 Abs. 2: Eltern berücksichtigen die wachsende Fähigkeit und das wachsende Bedürfnis des Kindes, selbständig und verantwortungsbewusst zu handeln, und besprechen Fragen der Sorge mit ihm, soweit es sein Entwicklungsstand erlaubt.
- Konsequenzen für SPIELIQ:
  - Nutzungsbedingungen mit Pflichten oder Lizenzregeln dürften gegenüber Minderjährigen ohne Einwilligung der Eltern nicht wirksam sein; das ist rechtlich zu prüfen. Abos mit wiederkehrender Zahlungspflicht sollten nur Erwachsene abschließen. Dass § 110 Abos und andere Dauerschuldverhältnisse in der Regel nicht trägt, ist [Hintergrundwissen, nicht per Suche bestätigt].
  - § 1626 Abs. 2 spricht für eine abgestufte Selbstbestimmung Jugendlicher: Ab 14 bis 17 Jahren eigene Einstellungen, für die Eltern Transparenz statt vollständiger Kontrolle.

### [D-14] BGB §§ 312j, 312k – Bestellbutton und Kündigungsbutton
- Herausgeber: BMJ / juris
- URL: https://www.gesetze-im-internet.de/bgb/__312j.html ; https://www.gesetze-im-internet.de/bgb/__312k.html
- Fassung/Datum: Stand-Angabe nicht gesondert abgerufen
- Zugriff / Verifikationsstatus: Volltext abgerufen (gesetze-im-internet.de, 29.10.2026)
- Kernaussagen (paraphrasiert):
  - § 312j: Unmittelbar vor der Bestellung sind die Pflichtinformationen hervorgehoben anzuzeigen. Die Schaltfläche darf nur „zahlungspflichtig bestellen" oder eine entsprechend eindeutige Formulierung tragen, sonst kommt kein Vertrag zustande (Abs. 3, 4).
  - § 312k: Bei online abschließbaren entgeltlichen Dauerschuldverhältnissen braucht es eine ständig verfügbare Kündigungsschaltfläche („Verträge hier kündigen"), eine Bestätigungsseite mit Schaltfläche „jetzt kündigen" und eine sofortige Bestätigung in Textform. Fehlt das, kann der Verbraucher jederzeit fristlos kündigen.
- Konsequenzen für SPIELIQ: Checkout und Kündigung des späteren Abos gesetzeskonform und barrierefrei gestalten (D-11 § 19). Die Kündigung nicht hinter Hürden oder Rückhalte-Tricks verstecken (vgl. § 4a Abs. 2 Nr. 4 UWG, D-15).

### [D-15] Gesetz gegen den unlauteren Wettbewerb (UWG) § 3 Abs. 4, § 4a, Anhang Nr. 28
- Herausgeber: BMJ / juris
- URL: Volltext https://www.gesetze-im-internet.de/uwg_2004/BJNR141400004.html ; Anhang https://www.gesetze-im-internet.de/uwg_2004/anhang.html
- Fassung/Datum: Neufassung durch Bek. v. 3.3.2010; zuletzt geändert durch Art. 6 G v. 12.5.2026 (BGBl. 2026 I Nr. 139)
- Zugriff / Verifikationsstatus: Volltext abgerufen (gesetze-im-internet.de, 29.10.2026)
- Kernaussagen (paraphrasiert):
  - § 3 Abs. 4: Maßstab ist der Durchschnittsverbraucher. Richtet sich eine Handlung an eine bestimmte Gruppe oder beeinflusst sie vorhersehbar nur eine eindeutig identifizierbare, u. a. wegen ihres Alters besonders schutzbedürftige Gruppe, ist auf ein durchschnittliches Mitglied dieser Gruppe abzustellen.
  - § 4a: Aggressive geschäftliche Handlungen sind unzulässig (Belästigung, Nötigung, unzulässige Beeinflussung). Zu berücksichtigen sind u. a. Zeitpunkt, Ort, Art und Dauer der Handlung, Hindernisse bei Kündigung oder Anbieterwechsel sowie Alter und geschäftliche Unerfahrenheit.
  - Anhang Nr. 28, stets unzulässig: „die in eine Werbung einbezogene unmittelbare Aufforderung an Kinder, selbst die beworbene Ware zu erwerben oder die beworbene Dienstleistung in Anspruch zu nehmen oder ihre Eltern oder andere Erwachsene dazu zu veranlassen".
- Konsequenzen für SPIELIQ: Keine Kauf- oder Upgrade-Aufforderungen an Kinder in der App, also nichts wie „Frag deine Eltern nach Premium!". Kommerzielle Kommunikation läuft nur über Eltern- bzw. Erwachsenenkonten. Keine künstliche Verknappung, keine Countdown-Angebote. Maßstab ist das durchschnittliche Kind der Zielgruppe.

### [D-16] Kunsturhebergesetz (KUG) §§ 22, 23 – Recht am eigenen Bild
- Herausgeber: BMJ / juris
- URL: https://www.gesetze-im-internet.de/kunsturhg/__22.html ; https://www.gesetze-im-internet.de/kunsturhg/__23.html
- Fassung/Datum: Stand-Angabe nicht gesondert abgerufen
- Zugriff / Verifikationsstatus: Volltext abgerufen (gesetze-im-internet.de, 29.10.2026)
- Kernaussagen (paraphrasiert): Bildnisse dürfen nur mit Einwilligung der abgebildeten Person verbreitet oder öffentlich gezeigt werden (§ 22). Ausnahmen gibt es u. a. für Zeitgeschichte und Versammlungen, jeweils begrenzt durch berechtigte Interessen der abgebildeten Person (§ 23). Wie sich das zur DSGVO verhält, ist umstritten (siehe D-21).
- Konsequenzen für SPIELIQ: Das MVP kommt ohne Fotos und Videos von Spielern aus und nutzt Avatare oder Trikotnummern.

### [D-17] DFB – Infoblatt für Vereine „Schutz vor Gewalt in den digitalen Medien" („Merkblatt Digitaler Raum")
- Herausgeber: Deutscher Fußball-Bund e. V. (DFB)
- URL: https://assets.dfb.de/uploads/000/328/736/original_Merkblatt_Digitaler_Raum_neu_01.2026.pdf (verlinkt auf https://www.dfb.de/kinder-und-jugendschutz)
- Fassung/Datum: „Stand Januar 2026" (2 Seiten)
- Zugriff / Verifikationsstatus: Volltext abgerufen (assets.dfb.de, 29.10.2026)
- Kernaussagen (paraphrasiert):
  - Digitale Räume gehören zum Vereinsleben; der Schutz vor Gewalt erstreckt sich auch auf digitale Kommunikation.
  - Klare Haltung: „Private digitale Nähe zwischen Erwachsenen und Minderjährigen ist tabu."
  - Typische Grooming-Muster sind besondere Aufmerksamkeit, persönliche Komplimente, exklusive Chats und Bitten um Geheimhaltung. Als Grenzverletzung nennt das Merkblatt u. a. private Nachrichten von Trainern.
  - Prävention: offizielle Teamgruppen mit zwei Erwachsenen; Kommunikation „zu passenden Zeiten"; private Einzelchats mit Minderjährigen vermeiden oder verbieten; Fotos nur mit Zustimmung, wobei Kinder immer mitbestimmen; Eltern sollen wissen, welche Kanäle genutzt werden; Kinder und Jugendliche werden an den Regeln beteiligt.
  - Vorfälle: wahrnehmen, einordnen, dokumentieren und Fachstellen einbeziehen. Sexualisierte Inhalte von Minderjährigen dürfen wegen § 184b StGB nicht gespeichert, geöffnet oder weitergeleitet werden.
- Konsequenzen für SPIELIQ: Das ist die direkte fachliche Grundlage für „keine Chats zwischen Erwachsenen und Minderjährigen". Teamkommunikation wie Missionen und Ankündigungen läuft nur gruppenweit und ist für mindestens zwei Erwachsene sowie die Eltern einsehbar. Benachrichtigungen bekommen serverseitige Ruhezeiten. Eine Transparenzseite zeigt Eltern, welche Kanäle es gibt und wer was sieht. Der Meldeweg kommt ohne Upload-Funktion aus, damit keine problematischen Inhalte im System landen.

### [D-18] DFB – Broschüre „Verantwortung leben: Kinder- und Jugendschutz im Vereinsfußball – Nachwuchs fördern. Aber sicher!"
- Herausgeber: DFB
- URL: https://assets.dfb.de/uploads/000/330/083/original_260219_DFB_Kinderrechte_Broschuere_70S_F1_ANSICHT.pdf
- Fassung/Datum: PDF erstellt am 19.02.2026 (36 PDF-Seiten)
- Zugriff / Verifikationsstatus: Volltext abgerufen (assets.dfb.de, 29.10.2026)
- Kernaussagen (paraphrasiert):
  - Grenzverletzungen kommen auch „in digitalen Räumen" vor. Beispiele: Ein Trainer schreibt Jugendlichen privat auf Social Media; ein Jugendtrainer schreibt einer Spielerin nachts private Nachrichten mit der Bitte, es niemandem zu sagen; zweideutige Nachrichten kommen „oft spätabends oder nachts".
  - Hinweise: Kommunikation nur über offizielle Vereinskanäle (Vereins-E-Mails, Teamgruppen, offizielle Plattformen), keine privaten Einzelnachrichten; Fotos und Videos nur mit Einverständnis; veröffentlicht wird nur mit schriftlichem Einverständnis der Eltern.
  - Psychische Gewalt und Leistungsdruck: „Öffentliche Kritik demütigt. Lob darf öffentlich sein, Kritik gehört ins Einzelgespräch." Vergleiche und Herabsetzungen („Die anderen sind besser als du") demotivieren. Wer Fortschritte nicht anerkennt, setzt ein Warnzeichen. Kinder sollen Beschwerdewege kennen und beteiligt werden.
  - Gewalt unter Gleichaltrigen findet oft digital statt. Teamkommunikation soll „begleitet, ohne zu überwachen" werden.
  - Personalauswahl: erweitertes Führungszeugnis für Trainer, Betreuer und weitere Personen; Einsicht ohne Kopie; dokumentiert werden Name, Datum und Ergebnis; Erneuerung alle drei bis fünf Jahre; „mit eurem Jugendamt" klären, welche Tätigkeiten betroffen sind.
  - Die Broschüre zitiert die „SicherImSport-Studie (2024)": Rund 45 % der Befragten berichten von sexualisierten Grenzverletzungen. Das ist eine Sekundärangabe; die Studie selbst habe ich nicht geprüft.
- Konsequenzen für SPIELIQ: Lob und Erfolge dürfen teamweit sichtbar sein, Fehler und Schwächen nur für Spieler und Trainer. Keine Ranglisten und keine Vergleiche zwischen Kindern; Fortschritt wird am eigenen Verlauf gemessen. Trainer sehen keine feinkörnige Aktivität wie Uhrzeiten oder Nutzungsdauer. Es gibt eine Meldefunktion. Als „offizielle Plattform" muss SPIELIQ diesen Erwartungen standhalten.

### [D-19] DFB – „Richtlinien im Umgang mit Kindern und Jugendlichen" (2023) und „Muster für Verhaltensregeln für Trainer und Betreuer" (2017)
- Herausgeber: DFB
- URL: https://assets.dfb.de/uploads/000/299/224/original_289704-2023_Richtlinien_im_Umgang_mit_Kindern_und_Jugendlichen.pdf ; https://assets.dfb.de/uploads/000/321/913/original_138030-5._Muster_f%C3%BCr_Verhaltensregeln_f%C3%BCr_Trainer_und_Betreuer.pdf
- Fassung/Datum: Richtlinien als PDF erstellt am 14.06.2023; Verhaltensregeln als PDF erstellt am 26.05.2017
- Zugriff / Verifikationsstatus: Volltext abgerufen (assets.dfb.de, 29.10.2026)
- Kernaussagen (paraphrasiert):
  - Die Richtlinien sind eine Selbstverpflichtung zum Unterschreiben. Daten der Kinder werden streng vertraulich behandelt; mit Bild- und Videomaterial geht man sensibel um, besonders in sozialen Medien. Man kommuniziert nicht über Chat-Programme oder Messenger „mit einzelnen Kindern und Jugendlichen über private Themen, soweit diese keine Relevanz für den Trainings- und Spielbetrieb haben". Das Angebot richtet sich nach dem Entwicklungsstand, die Methoden sind altersgerecht.
  - Die Muster-Verhaltensregeln sehen vor: Fotos und Videos nicht über soziale Medien verbreiten; keine individuellen Geschenke und keine unsachliche Bevorzugung; keine privaten Geheimnisse mit Spielern.
- Konsequenzen für SPIELIQ: Die Richtlinie lässt trainingsbezogene Einzelkommunikation noch zu. SPIELIQ geht mit „keine 1:1-Kommunikation" bewusst weiter als dieser Mindeststandard, im Einklang mit D-17 und D-18. Belohnungen durch Trainer (z. B. Sonder-Abzeichen) sollten nur transparent und regelbasiert möglich sein, damit keine Muster von Bevorzugung oder Abhängigkeit entstehen. Das ist meine Ableitung.

### [D-20] DFB – „Merkblatt zum Umgang mit dem erweiterten Führungszeugnis im Verein" (2017) und „Merkblatt zur Erstellung eines Kinderschutzkonzepts" (2025)
- Herausgeber: DFB
- URL: https://www.dfb.de/fileadmin/_dfbdam/138033-8._Merkblatt_zum_Umgang_mit_dem_erweiterten_F%C3%BChrungszeugnis_im_Verein.pdf ; https://assets.dfb.de/uploads/000/323/187/original_Merkblatt_zur_Erstellung_eines_Kinderschutzkonzeptes.pdf
- Fassung/Datum: Merkblatt zum Führungszeugnis: PDF vom 26.05.2017; Merkblatt Schutzkonzept: PDF erstellt am 09.08.2025
- Zugriff / Verifikationsstatus: Volltext abgerufen (dfb.de / assets.dfb.de, 29.10.2026)
- Kernaussagen (paraphrasiert):
  - Ein Schutzkonzept beginnt mit einer Risikoanalyse. Bausteine sind u. a. Verantwortliche im Vorstand, eine Ansprechperson, ein Verhaltenskodex, Schulungen, die Pflicht, das erweiterte Führungszeugnis von Trainern und Betreuern zu prüfen, Interventionsleitlinien und die Information von Eltern und Kindern.
  - Das Führungszeugnis-Merkblatt von 2017 empfiehlt: Einsicht durch zwei bis drei vertrauenswürdige Personen, keine Kopie, Aktualisierung etwa alle drei Jahre. Es sagt außerdem, schon das Speichern der Tatsache der Einsicht sei nach § 72a Abs. 5 SGB VIII unzulässig. Das widerspricht der heute geltenden Fassung von § 72a Abs. 5 (D-07), nach der Einsicht, Datum und Ergebnis gespeichert werden dürfen. Das Merkblatt ist in diesem Punkt offenbar veraltet; die DFB-Broschüre von 2026 (D-18) entspricht der aktuellen Rechtslage.
- Konsequenzen für SPIELIQ: SPIELIQ kann Vereine unterstützen, indem es sich in ihrer Risikoanalyse abbilden lässt, etwa mit einem Leitfaden „SPIELIQ im Schutzkonzept". Führungszeugnisdaten verarbeitet SPIELIQ dabei nicht. Veraltete Merkblätter taugen nicht als Rechtsquelle.

### [D-21] DFB – Positionspapier „Datenschutz bei der Foto- und Videonutzung im Fußball"
- Herausgeber: DFB
- URL: https://assets.dfb.de/uploads/000/334/697/original_DFB_Positionspapier_Foto-_und_Videoaufnahmen_im_Fu%C3%9Fball_Juni_2026.pdf (verlinkt auf https://www.dfb.de/datenschutz-im-fussball)
- Fassung/Datum: Juni 2026 (PDF erstellt am 17.06.2026, 22 Seiten)
- Zugriff / Verifikationsstatus: Volltext abgerufen (assets.dfb.de, 29.10.2026)
- Kernaussagen (paraphrasiert):
  - In Deutschland ist eine Einwilligung ohne Zustimmung der Erziehungsberechtigten „in der Regel erst ab dem 16. Lebensjahr möglich" (Bezug: Art. 8 DSGVO). Die DSGVO definiert „Kind" nicht; die Kommentarliteratur ist uneinheitlich und sieht die überwiegende Schutzbedürftigkeit teils bis 13, teils bis 16.
  - Bei der Interessenabwägung nach Art. 6 Abs. 1 lit. f wiegen die Interessen von Kindern und Jugendlichen besonders schwer. Die Faustformel des Papiers: „Je niedriger das Alter und/oder die Leistungsebene, desto höher die Schutzbedürftigkeit".
  - Videoanalyse im Training (Leistungsdiagnose): Im Amateur- und Breitenfußball trägt das Mitgliedschaftsverhältnis (lit. b) „zumindest für den Großteil der Fälle" nicht. Naheliegender ist lit. f, verbunden mit kurzen Speicherfristen und einem Widerspruchsrecht. Im Kinderfußball (mindestens bis 13) ist das Interesse des Vereins schwächer; dort ist eine informierte Einwilligung der Eltern vorzuziehen. Die Checkliste fasst zusammen: „U16 eher Einwilligung", „ab 16 berechtigtes Interesse".
  - Für alle Bereiche: Der Verein ist datenschutzrechtlich verantwortlich, schließt Auftragsverarbeitungsverträge mit Dienstleistern, erstellt ein Konzept und ein Verzeichnis der Verarbeitungstätigkeiten, informiert Betroffene und Sorgeberechtigte vorab und führt gegebenenfalls eine DSFA durch.
  - Geschlossene Nutzergruppen sind etwas anderes als eine Veröffentlichung für einen unbestimmten Personenkreis; die Haushaltsausnahme ist eng.
- Konsequenzen für SPIELIQ: Das ist die beste branchennahe Analogie für die Lernstandsdaten. Die Mitgliedschaft im Verein als Rechtsgrundlage ist unsicher. Unter 16 spricht viel für eine Einwilligung der Eltern, mindestens aber für Information der Eltern plus Widerspruchsrecht. Ab 16 kommen berechtigtes Interesse oder eine eigene Einwilligung in Betracht. Der DFB setzt das Rollenbild „Verein ist Verantwortlicher, Dienstleister ist Auftragsverarbeiter" voraus. Achtung: Es ist das Positionspapier eines Verbands, keine Behördenposition.

### [D-22] DFB – Webseite „Datenschutz im Fußball"
- Herausgeber: DFB
- URL: https://www.dfb.de/datenschutz-im-fussball
- Fassung/Datum: undatierte Webseite, abgerufen am 29.10.2026
- Zugriff / Verifikationsstatus: Volltext abgerufen (dfb.de, 29.10.2026)
- Kernaussagen (paraphrasiert): Vereine haben eine „Doppelfunktion". Für die interne Mitgliederverwaltung und den Vereinsbetrieb sind sie selbst verantwortlich; zugleich arbeiten sie den Landesverbänden zu, die etwa für Spielberechtigungen im DFBnet verantwortlich sind. Die DFB GmbH & Co. KG ist beim DFBnet Auftragsverarbeiter für den DFB e. V. und die Mitgliedsverbände; FUSSBALL.DE betreibt sie in eigener Verantwortung. Die Seite erläutert die Betroffenenrechte nach Art. 15 bis 18 DSGVO.
- Konsequenzen für SPIELIQ: Im Fußball ist es etabliert, dass ein Plattformbetreiber als Auftragsverarbeiter für Verbände und Vereine arbeitet und nur für eigene Angebote selbst verantwortlich ist. SPIELIQ sollte Vereinsmodus (Auftragsverarbeitung) und B2C-Modus (eigene Verantwortung) sauber trennen. Öffentliche Daten über Jugendspieler, wie FUSSBALL.DE sie zeigt, bietet SPIELIQ nicht an.

### [D-23] DFB – Webseite „Kinderfußball" (neue Spielformen)
- Herausgeber: DFB
- URL: https://www.dfb.de/mehr-fussball/kinderfussball
- Fassung/Datum: undatiert; beschreibt die verbindliche Einführung ab der Saison 2024/2025 (Beschluss des DFB-Bundestags vom 11.03.2022)
- Zugriff / Verifikationsstatus: Volltext abgerufen (dfb.de, 29.10.2026)
- Kernaussagen (paraphrasiert): Seit 2024/25 gelten bundesweit verbindliche Spielformen für U6 bis U11. „Um den Leistungsdruck zu minimieren", gibt es in G- und F-Jugend keine Meisterschaftsrunde mehr, sondern Spielenachmittage und Festivals. Hinzu kommen ein Rotationsprinzip und ein Auf- und Abstiegsmodus für ausgeglichene Spiele. Der DFB kritisiert, im Kinderfußball werde „häufig zu früh Wert auf Taktik gelegt", worunter die Grundlagen leiden.
- Konsequenzen für SPIELIQ: Ranglisten und Tabellen für jüngere Kinder widersprächen der Verbandsphilosophie. Für 6- bis 11-Jährige braucht es altersgerechte, spielerische Inhalte statt abstrakter Taktik; das sollte mit der pädagogischen Recherche abgestimmt werden. Mechaniken eher kooperativ als kompetitiv.

### [D-24] DFB – Webseite „Kinder- und Jugendschutz" (Safe Sport, Anlaufstellen)
- Herausgeber: DFB
- URL: https://www.dfb.de/kinder-und-jugendschutz
- Fassung/Datum: undatierte Webseite, abgerufen am 29.10.2026
- Zugriff / Verifikationsstatus: Volltext abgerufen (dfb.de, 29.10.2026)
- Kernaussagen (paraphrasiert): Das Safe-Sport-Team des DFB ist zentrale Anlaufstelle (SafeSport@dfb.de). Für den Amateurfußball sind die Regional- und Landesverbände zuständig; die Seite listet deren Anlaufstellen. Es gibt ein anonymes Hinweisgebersystem. Das Bekenntnis zum Kinder- und Jugendschutz steht in der DFB-Jugendordnung. Die Seite verweist u. a. auf das Hilfe-Portal Missbrauch und die Nummer gegen Kummer.
- Konsequenzen für SPIELIQ: Eine leicht auffindbare Hilfe- und Meldeseite in SPIELIQ verweist auf die Ansprechperson im Verein, die Anlaufstelle des Landesverbands und unabhängige Hilfen. Das entspricht § 24a Abs. 2 Nr. 4 JuSchG (D-04).

### [D-25] Wissenschaftliche Arbeit, Universität Augsburg (OPUS-Dokument 105268), Titel nicht ermittelt
- Herausgeber: Universitätsbibliothek Augsburg (OPUS-Repositorium)
- URL: https://opus.bibliothek.uni-augsburg.de/opus4/files/105268/105268.pdf
- Fassung/Datum: unbekannt
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet (Direktabruf durch Proxy gesperrt)
- Kernaussagen (paraphrasiert, laut Zusammenfassung des Suchwerkzeugs): Ab dem vollendeten 16. Lebensjahr kann ein Kind selbst wirksam einwilligen. Eine Absenkung bis 13 wäre möglich gewesen; Deutschland hat darauf verzichtet. Unter der Grenze willigen die Eltern ein, oder das Kind willigt ein und die Eltern stimmen zu.
- Konsequenzen für SPIELIQ: Stützt die Grenze 16 und das Modell „Kind willigt ein, Eltern stimmen zu" als Gestaltungsoption.

### [D-26] game – Verband der deutschen Games-Branche: Stellungnahme zur Reform des BDSG
- Herausgeber: game – Verband der deutschen Games-Branche e. V.
- URL: https://www.game.de/wp-content/uploads/2016/12/20161208-game-Stellungnahme-Reform-BDSG.pdf
- Fassung/Datum: 08.12.2016 (zu einem Gesetzentwurf)
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet
- Kernaussagen (paraphrasiert, laut Suchzusammenfassung): Der Verband kritisiert, dass der BDSG-Entwurf die Öffnungsklausel des Art. 8 DSGVO nicht nutzt, um die Altersgrenze abzusenken.
- Konsequenzen für SPIELIQ: Historischer Beleg, dass der Gesetzgeber die Grenze 16 bewusst beibehalten hat (passt zu D-09).

### [D-27] DSGVO Erwägungsgrund 38 – Textwiedergaben auf activemind.legal und gdpr-text.com
- Herausgeber: activemind.legal; gdpr-text.com (beides Sekundärwiedergaben)
- URL: https://www.activemind.legal/de/gesetze/dsgvo/erwaegungsgrund-38/ ; https://gdpr-text.com/de/read/article-8 (Art. 8)
- Fassung/Datum: Text der DSGVO (VO (EU) 2016/679)
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet
- Kernaussagen (paraphrasiert, laut Suchzusammenfassung): Kinder verdienen besonderen Schutz, weil sie Risiken, Folgen, Garantien und ihre Rechte weniger überblicken. Das gilt vor allem bei Werbung, bei Persönlichkeits- und Nutzerprofilen und bei der Datenerhebung durch Dienste, die Kindern direkt angeboten werden. Bei Präventions- und Beratungsdiensten, die sich unmittelbar an ein Kind richten, soll keine Einwilligung der Eltern nötig sein.
- Konsequenzen für SPIELIQ: Keine Nutzerprofile für Werbung oder Engagement-Steigerung; Lernprofile bleiben strikt zweckgebunden. Verweise auf Hilfe und Beratung funktionieren ohne Elternhürde.

### [D-28] Datenschutzkonferenz (DSK): Entschließung „Datenschutz von Kindern"
- Herausgeber: Konferenz der unabhängigen Datenschutzaufsichtsbehörden des Bundes und der Länder (DSK)
- URL: https://datenschutzkonferenz-online.de/media/en/Entschliessung_Datenschutz-von-Kindern.pdf
- Fassung/Datum: Datum nicht ermittelt
- Zugriff / Verifikationsstatus: Zugriff: Websuche 29.10.2026, Originalseite nicht geöffnet (Domain gesperrt)
- Kernaussagen (paraphrasiert, laut Suchzusammenfassung, sehr knapp): Die DSK weist darauf hin, dass die DSGVO die Schutzbedürftigkeit von Kindern nicht in allen Zusammenhängen gleich ausgestaltet.
- Konsequenzen für SPIELIQ: Den Inhalt muss jemand nachlesen. Vermutlich enthält die Entschließung Forderungen der Aufsichtsbehörden zum Kinderdatenschutz; das Dokument sollte für die anwaltliche Prüfung beschafft werden.

### [D-29] Datenschutz-Grundverordnung (DSGVO), VO (EU) 2016/679 – relevante Artikel und Erwägungsgründe
- Herausgeber: Europäisches Parlament und Rat der EU (Datum 27.04.2016 und Fundstelle ABl. L 119 vom 4.5.2016 sind durch § 24a Abs. 4 JuSchG belegt, D-04)
- URL: https://eur-lex.europa.eu/eli/reg/2016/679/oj (aus dem Gedächtnis, nicht geöffnet)
- Fassung/Datum: anwendbar seit 25.05.2018 [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen, EUR-Lex gesperrt. Art. 8 (Grenze 16 in Deutschland) ist mittelbar belegt durch D-09, D-21, D-25 und D-26, ErwG 38 durch D-27. Alles Weitere ist [Hintergrundwissen, nicht per Suche bestätigt].
- Kernaussagen (paraphrasiert; soweit nicht oben belegt: [Hintergrundwissen, nicht per Suche bestätigt]):
  - Art. 5: Grundsätze (Rechtmäßigkeit, Transparenz, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung, Integrität und Vertraulichkeit, Rechenschaftspflicht).
  - Art. 6 Abs. 1: Rechtsgrundlagen, darunter lit. b (Vertrag) und lit. f (berechtigtes Interesse). Bei lit. f können die Interessen der betroffenen Person überwiegen, „insbesondere dann, wenn es sich bei der betroffenen Person um ein Kind handelt".
  - Art. 7: Die Einwilligung muss nachweisbar und von anderen Sachverhalten getrennt sein; der Widerruf muss so einfach sein wie die Erteilung; Koppelungsverbot (Abs. 4).
  - Art. 8: Stützt sich ein Dienst der Informationsgesellschaft, der einem Kind direkt angeboten wird, auf eine Einwilligung, ist das ab 16 Jahren rechtmäßig, darunter nur mit Einwilligung oder Zustimmung der Eltern. Mitgliedstaaten dürfen bis auf 13 absenken. Der Verantwortliche muss „angemessene Anstrengungen" zur Überprüfung unternehmen (Abs. 2). Das allgemeine Vertragsrecht bleibt unberührt (Abs. 3).
  - Art. 9: Besondere Kategorien, u. a. Gesundheitsdaten, sind grundsätzlich verboten; Ausnahmen gibt es z. B. bei ausdrücklicher Einwilligung.
  - Art. 12 Abs. 1: Informationen müssen präzise, transparent, verständlich, leicht zugänglich und in klarer, einfacher Sprache sein, „insbesondere für Informationen, die sich speziell an Kinder richten". ErwG 58 verlangt eine Sprache, die Kinder leicht verstehen.
  - Betroffenenrechte: Art. 13 (Information bei der Erhebung), Art. 15 (Auskunft und Kopie), Art. 17 (Löschung; Abs. 1 lit. f nennt ausdrücklich Daten, die bei Diensten nach Art. 8 erhoben wurden, und ErwG 65 betont den Fall, dass jemand als Kind eingewilligt hat), Art. 20 (Datenübertragbarkeit bei Einwilligung oder Vertrag und automatisierter Verarbeitung), Art. 21 (Widerspruch gegen Verarbeitungen nach lit. e oder f).
  - Art. 22: Niemand muss sich einer ausschließlich automatisierten Entscheidung mit rechtlicher oder ähnlich erheblicher Wirkung unterwerfen. Nach ErwG 71 „sollte" eine solche Maßnahme kein Kind betreffen.
  - Art. 25: Datenschutz durch Technikgestaltung und datenschutzfreundliche Voreinstellungen. Nach Abs. 2 werden standardmäßig nur erforderliche Daten verarbeitet und nicht ohne Zutun der Person einer unbestimmten Zahl von Personen zugänglich gemacht.
  - Art. 26: Gemeinsam Verantwortliche brauchen eine Vereinbarung, deren Kern den Betroffenen zugänglich ist.
  - Art. 28: Auftragsverarbeitung erfordert einen Vertrag mit Pflichtinhalten: Weisungsbindung, Vertraulichkeit, technisch-organisatorische Maßnahmen (TOMs), Unterauftragsverarbeiter nur mit Genehmigung, Unterstützung bei Betroffenenrechten und DSFA, Löschung oder Rückgabe, Nachweise. Wer Zwecke und Mittel selbst bestimmt, gilt nach Abs. 10 als Verantwortlicher.
  - Art. 30 (Verzeichnis der Verarbeitungstätigkeiten), Art. 32 (Sicherheit: Pseudonymisierung, Verschlüsselung, Vertraulichkeit, Integrität, Verfügbarkeit, Belastbarkeit, Wiederherstellung, regelmäßige Tests), Art. 33 und 34 (Meldung von Datenpannen binnen 72 Stunden, Benachrichtigung der Betroffenen).
  - Art. 35: DSFA bei voraussichtlich hohem Risiko; Abs. 3 lit. a nennt die systematische und umfassende Bewertung persönlicher Aspekte, Abs. 4 die Listen der Aufsichtsbehörden. Art. 36: vorherige Konsultation. Art. 37 bis 39: Datenschutzbeauftragte.
  - Art. 4 Nr. 5 und ErwG 26: Pseudonymisierte Daten bleiben personenbezogen, wenn sie sich mit Zusatzwissen zuordnen lassen.
  - Art. 44 ff.: Übermittlungen in Drittländer nur mit Angemessenheitsbeschluss (Art. 45), geeigneten Garantien wie Standardvertragsklauseln (Art. 46) oder in Ausnahmefällen (Art. 49).
  - ErwG 75: Ein Risiko besteht insbesondere bei Daten schutzbedürftiger Personen, vor allem von Kindern.
- Konsequenzen für SPIELIQ: Bildet das Grundgerüst der Pflichten in Tabelle 1. Vor jeder Verwendung muss jemand den Originaltext auf EUR-Lex gegenlesen.

### [D-30] Artikel-29-Datenschutzgruppe (vom EDSA bestätigt): Leitlinien zur Datenschutz-Folgenabschätzung, WP 248 rev.01
- Herausgeber: Artikel-29-Datenschutzgruppe; vom Europäischen Datenschutzausschuss (EDSA/EDPB) am 25.05.2018 bestätigt [Hintergrundwissen, nicht per Suche bestätigt]
- URL: über edpb.europa.eu (genaue URL nicht verifiziert)
- Fassung/Datum: angenommen am 04.04.2017, überarbeitet am 04.10.2017 [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt]: Die Leitlinien nennen neun Kriterien für ein voraussichtlich hohes Risiko:
  1. Bewerten oder Einstufen (Scoring), einschließlich Profiling und Prognosen (z. B. Arbeitsleistung, Verhalten);
  2. automatisierte Entscheidungen mit Rechtswirkung oder ähnlicher Wirkung;
  3. systematische Überwachung;
  4. sensible oder höchstpersönliche Daten;
  5. Verarbeitung in großem Umfang;
  6. Abgleich oder Zusammenführung von Datensätzen;
  7. Daten schutzbedürftiger Betroffener (Kinder ausdrücklich genannt);
  8. innovative Nutzung oder neue technische Lösungen;
  9. Verarbeitungen, die Betroffene an der Ausübung eines Rechts oder an der Nutzung eines Dienstes hindern.

  Faustregel: Sind zwei Kriterien erfüllt, ist in den meisten Fällen eine DSFA nötig.
- Konsequenzen für SPIELIQ: SPIELIQ erfüllt voraussichtlich mindestens Kriterium 1 (Bewertung des Lernstands) und Kriterium 7 (Kinder). Eine DSFA liegt daher nahe; mit KI-Feedback käme Kriterium 8 hinzu. Die DSFA früh beginnen und dabei § 38 BDSG mitdenken (D-09).

### [D-31] DSK: „Liste der Verarbeitungstätigkeiten, für die eine DSFA durchzuführen ist" (Muss-Liste, nicht-öffentlicher Bereich)
- Herausgeber: DSK
- URL: über datenschutzkonferenz-online.de (genaue URL nicht verifiziert; Domain gesperrt)
- Fassung/Datum: nach meiner Erinnerung Version 1.1 vom 17.10.2018 [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt]: Die Liste nach Art. 35 Abs. 4 DSGVO nennt Fallgruppen, in denen stets eine DSFA nötig ist. Nach meiner Erinnerung gehört der Einsatz künstlicher Intelligenz dazu, wenn sie die Interaktion mit Betroffenen steuert oder persönliche Aspekte bewertet. Ob ein Eintrag auch die Lernstandsbewertung Minderjähriger ohne KI ausdrücklich erfasst, konnte ich nicht prüfen.
- Konsequenzen für SPIELIQ: Spätestens mit KI-generiertem Feedback oder KI-Bewertung dürfte eine DSFA Pflicht sein. Die Liste beschaffen und die Einträge einzeln prüfen.

### [D-32] EDSA (EDPB) Leitlinien 05/2020 zur Einwilligung
- Herausgeber: Europäischer Datenschutzausschuss
- URL: über edpb.europa.eu (nicht verifiziert)
- Fassung/Datum: Version 1.1, angenommen am 04.05.2020 [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt]:
  - Art. 8 greift nur, wenn ein Dienst der Informationsgesellschaft einem Kind direkt angeboten wird und die Einwilligung die Rechtsgrundlage ist.
  - Wie sehr die elterliche Verantwortung überprüft werden muss, hängt vom Risiko ab und muss verhältnismäßig sein; bei geringem Risiko kann z. B. eine E-Mail-Bestätigung genügen. Auch die Prüfung selbst soll datensparsam sein.
  - Erreicht das Kind die Altersgrenze, kann es die Einwilligung der Eltern bestätigen, ändern oder widerrufen. Tut es nichts, bleibt die Einwilligung der Eltern nach meiner Erinnerung wirksam.
  - Bei einem Machtgefälle ist die Freiwilligkeit fraglich; Einwilligungen sollen granular sein.
- Konsequenzen für SPIELIQ: Den Einwilligungsablauf für Eltern risikogerecht gestalten, z. B. über den Verein (Aufnahmeantrag) oder eine bestätigte Eltern-E-Mail. Wird ein Spieler 16 (bzw. wechselt der Jahrgang), fragt ein Dialog den Jugendlichen selbst, ob er bestätigen, ändern oder widerrufen will.

### [D-33] EDSA (EDPB) Leitlinien 07/2020 zu den Begriffen „Verantwortlicher" und „Auftragsverarbeiter"
- Herausgeber: Europäischer Datenschutzausschuss
- URL: über edpb.europa.eu (nicht verifiziert)
- Fassung/Datum: Version 2.0, angenommen am 07.07.2021 [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt]: Verantwortlich ist, wer über Zwecke und wesentliche Mittel entscheidet. Ein Auftragsverarbeiter verarbeitet im Auftrag und darf über nicht wesentliche Mittel wie technische Details selbst entscheiden. Gemeinsame Verantwortung entsteht durch gemeinsame oder sich ergänzende Entscheidungen. Nutzt ein Dienstleister Daten für eigene Zwecke (z. B. Produktentwicklung), wird er insoweit selbst Verantwortlicher. Ergänzend gibt es die DSK-Kurzpapiere Nr. 13 (Auftragsverarbeitung) und Nr. 16 (gemeinsam Verantwortliche).
- Konsequenzen für SPIELIQ: Es braucht einen klaren Zweckkatalog, der trennt zwischen „im Auftrag des Vereins" und „eigene Zwecke von SPIELIQ" (Lektionen verbessern, Benchmarks, KI-Training). Eigene Zwecke entweder vermeiden, auf anonymisierte Daten beschränken oder gesondert rechtlich absichern.

### [D-34] EDSA (EDPB) Leitlinien 4/2019 zu Art. 25 DSGVO (Datenschutz durch Technikgestaltung und Voreinstellungen)
- Herausgeber: Europäischer Datenschutzausschuss
- URL: über edpb.europa.eu (nicht verifiziert)
- Fassung/Datum: Version 2.0, angenommen am 20.10.2020 [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt]: Die Grundsätze müssen über den gesamten Lebenszyklus wirksam umgesetzt werden. Voreinstellungen betreffen Datenmenge, Umfang der Verarbeitung, Speicherdauer und Zugänglichkeit. Zu den Kernelementen gehören Datenminimierung, Speicherbegrenzung, Transparenz und Fairness; Fairness schließt täuschende oder manipulative Gestaltung aus.
- Konsequenzen für SPIELIQ: Eine Tabelle der Voreinstellungen je Datenfeld und Funktion gehört in die DSFA. Über den Fairness-Grundsatz sind manipulative Engagement-Mechaniken auch datenschutzrechtlich problematisch.

### [D-35] EDSA (EDPB) Leitlinien 2/2023 zum technischen Anwendungsbereich von Art. 5 Abs. 3 ePrivacy-Richtlinie
- Herausgeber: Europäischer Datenschutzausschuss
- URL: über edpb.europa.eu (nicht verifiziert)
- Fassung/Datum: nicht verifiziert; nach meiner Erinnerung Endfassung 2024 [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt]: „Speichern" und „Zugreifen" umfassen nicht nur Cookies, sondern u. a. lokale Speicher-Schnittstellen, Tracking-Pixel, Tracking über URLs und Links sowie bestimmte Formen des Fingerprintings. Art. 5 Abs. 3 der ePrivacy-Richtlinie ist die europarechtliche Grundlage von § 25 TDDDG.
- Konsequenzen für SPIELIQ: Auch Tracking-Pixel in E-Mails (etwa an Eltern oder Trainer) und Fingerprinting vermeiden.

### [D-36] DSK: Orientierungshilfe der Aufsichtsbehörden für Anbieter digitaler Dienste („OH Digitale Dienste", früher „OH Telemedien")
- Herausgeber: DSK
- URL: über datenschutzkonferenz-online.de (nicht verifiziert)
- Fassung/Datum: nicht verifiziert; nach meiner Erinnerung Version 1.2 aus 2024 [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt]: Die Orientierungshilfe legt § 25 TDDDG aus Sicht der deutschen Aufsichtsbehörden aus. „Unbedingt erforderlich" wird eng verstanden, bezogen auf den vom Nutzer ausdrücklich gewünschten Dienst bzw. die einzelne Funktion. Einwilligungsbanner müssen eine gleichwertige Möglichkeit zum Ablehnen bieten. Der Zugriff auf das Endgerät (§ 25 TDDDG) wird getrennt von der anschließenden Verarbeitung (DSGVO) betrachtet.
- Konsequenzen für SPIELIQ: Für jede Speicherung im Browser die funktionale Begründung dokumentieren (Storage-Inventar).

### [D-37] EDSA (EDPB) Statement 1/2025 on Age Assurance
- Herausgeber: Europäischer Datenschutzausschuss
- URL: über edpb.europa.eu (nicht verifiziert)
- Fassung/Datum: nach meiner Erinnerung angenommen am 11.02.2025 [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt]: Grundsätze für eine DSGVO-konforme Altersfeststellung, u. a. Verhältnismäßigkeit und risikobasierter Ansatz, Datenminimierung (nur das Altersmerkmal, kein Identitätsnachweis, wenn nicht nötig), keine Weiterverwendung der Altersdaten, Sicherheit, Transparenz und Betroffenenrechte.
- Konsequenzen für SPIELIQ: Für Privatspieler (B2C) ein Altersband statt Geburtsdatum oder Ausweis; Elternbestätigung datensparsam. Im Vereinsmodus ersetzt die Beziehung zum Verein mit Freigabe durch den Trainer eine aufwendige Altersprüfung.

### [D-38] Landesbeauftragter für den Datenschutz und die Informationsfreiheit Baden-Württemberg (LfDI BW): Ratgeber „Datenschutz im Verein"
- Herausgeber: LfDI Baden-Württemberg
- URL: über baden-wuerttemberg.datenschutz.de (nicht verifiziert; Domain gesperrt)
- Fassung/Datum: nicht verifiziert; mehrere Auflagen seit 2018 [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt, nur allgemein]: Praxisratgeber für Vereine zu den Rechtsgrundlagen der Mitgliederverwaltung (Mitgliedschaftsverhältnis), zu Veröffentlichungen im Internet und zu Fotos, zur Datenweitergabe an Verbände, zum Einsatz von Dienstleistern (Auftragsverarbeitung) und zum Datenschutzbeauftragten. Was der Ratgeber konkret zu Kindern oder Lern-Apps sagt, konnte ich nicht prüfen.
- Konsequenzen für SPIELIQ: Die aktuelle Auflage beschaffen. Die Unterlagen für Vereine (Auftragsverarbeitungsvertrag, Mustertexte für die Mitgliederinformation, Eltern-Einwilligung) an solchen Ratgebern ausrichten, denn daran orientieren sich Vereinsvorstände.

### [D-39] Digital Services Act (DSA), VO (EU) 2022/2065 – Art. 3, 14, 16, 19, 25, 28
- Herausgeber: Europäisches Parlament und Rat der EU (Datum 19.10.2022 und Fundstelle ABl. L 277 vom 27.10.2022 belegt durch § 24a Abs. 1 JuSchG, D-04)
- URL: https://eur-lex.europa.eu/eli/reg/2022/2065/oj (aus dem Gedächtnis, nicht geöffnet)
- Fassung/Datum: vollständig anwendbar seit 17.02.2024 [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen. Den Kerninhalt von Art. 28 Abs. 1 und die Zuständigkeiten für Art. 14 Abs. 3, 26 Abs. 3 und 28 Abs. 1 bis 3 belegen D-03 und D-04. Alles Weitere: [Hintergrundwissen, nicht per Suche bestätigt].
- Kernaussagen (paraphrasiert; soweit nicht belegt: [Hintergrundwissen, nicht per Suche bestätigt]):
  - Art. 3: Vermittlungsdienste umfassen u. a. Hosting, also das Speichern von Informationen, die Nutzer bereitstellen. Eine Online-Plattform ist ein Hostingdienst, der diese Informationen im Auftrag des Nutzers auch öffentlich verbreitet. „Öffentlich verbreiten" heißt, sie einer potenziell unbegrenzten Zahl Dritter zugänglich zu machen. Nach ErwG 14 gilt das bei Gruppen, für die man sich registrieren oder in die man aufgenommen werden muss, nur dann, wenn Nutzer ohne menschliche Entscheidung automatisch aufgenommen werden.
  - Art. 14 Abs. 3: Dienste, die sich vor allem an Minderjährige richten oder überwiegend von ihnen genutzt werden, müssen ihre Nutzungsbedingungen so erklären, dass Minderjährige sie verstehen. Das gilt für alle Vermittlungsdienste; die Zuständigkeit der BzKJ dafür ist belegt (D-03).
  - Art. 16: Hostingdienste brauchen ein Melde- und Abhilfeverfahren.
  - Art. 19: Abschnitt 3 (Art. 20 bis 28) gilt nicht für Online-Plattformen, die Kleinst- oder Kleinunternehmen im Sinne der Empfehlung 2003/361/EG sind, außer es handelt sich um sehr große Online-Plattformen.
  - Art. 25: Online-Plattformen dürfen ihre Schnittstellen nicht irreführend oder manipulativ gestalten (Dark Patterns).
  - Art. 28: Abs. 1 verlangt geeignete und verhältnismäßige Maßnahmen für ein hohes Maß an Privatsphäre, Sicherheit und Schutz Minderjähriger (belegt über D-04). Abs. 2 verbietet Werbung auf Basis von Profiling, wenn der Anbieter mit hinreichender Gewissheit weiß, dass der Nutzer minderjährig ist. Abs. 3 stellt klar, dass dafür keine zusätzlichen Daten zur Altersbestimmung verarbeitet werden müssen. Abs. 4 erlaubt Leitlinien der Kommission.
- Konsequenzen für SPIELIQ: Die Einordnung ist offen (Tabelle 3). Geschlossene Teams, in die ein Trainer jeden Beitritt freigibt, sprechen gegen eine öffentliche Verbreitung; SPIELIQ wäre dann voraussichtlich keine Online-Plattform, und die Ausnahme für Kleinunternehmen käme hinzu. Speichert SPIELIQ aber nutzergenerierte Inhalte (eigene Übungen von Trainern, Lösungen von Spielern), könnte es ein Hostingdienst sein; dann gälten Art. 11 bis 18, darunter Art. 14 Abs. 3 und Art. 16. Öffentliche Funktionen würden die Einordnung ändern: offene Community, öffentliche Ranglisten, vereinsübergreifendes Teilen. Solche Funktionen bewusst vermeiden oder vorher prüfen lassen.

### [D-40] Europäische Kommission: Leitlinien zu Maßnahmen für ein hohes Maß an Privatsphäre, Sicherheit und Schutz Minderjähriger online (Art. 28 Abs. 4 DSA)
- Herausgeber: Europäische Kommission
- URL: über digital-strategy.ec.europa.eu (nicht verifiziert; Domain gesperrt)
- Fassung/Datum: nach meiner Erinnerung veröffentlicht am 14.07.2025 [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert; aus der Erinnerung an Leitlinien und Pressemitteilung) [Hintergrundwissen, nicht per Suche bestätigt]:
  - Grundhaltung: risikobasiert, an Kinderrechten und Verhältnismäßigkeit ausgerichtet.
  - Altersfeststellung abgestuft; strenge Verifikation bei Hochrisiko-Inhalten; Selbstauskunft allein genügt nicht.
  - Konten Minderjähriger sind standardmäßig privat und nicht auffindbar; Standort, Kamera und Mikrofon sind aus.
  - Empfehlungssysteme stützen sich nicht vorrangig auf Profiling, bieten eine Option ohne Profiling und bevorzugen ausdrückliche Signale der Nutzer.
  - Funktionen, die übermäßige Nutzung fördern, sind standardmäßig deaktiviert, z. B. „Streaks", Lesebestätigungen, Autoplay und Push-Benachrichtigungen; persuasive Designelemente werden entfernt.
  - Schutz vor kommerzieller Ausbeutung (virtuelle Währungen, Lootboxen).
  - Melde- und Blockierfunktionen; Werkzeuge für Eltern als Ergänzung.
  - Governance mit Kinderrechte-Folgenabschätzung und Beteiligung von Kindern.

  Ob nächtliche Ruhezeiten ausdrücklich genannt sind, konnte ich nicht prüfen.
- Konsequenzen für SPIELIQ: Auch wenn Art. 28 SPIELIQ vielleicht nicht erfasst, sind diese Leitlinien der beste behördliche Referenzrahmen für die Produktentscheidungen: kein Streak-Druck, keine Lootboxen, Benachrichtigungen standardmäßig aus, keine Empfehlungen auf Basis von Profiling.

### [D-41] KI-Verordnung (AI Act), VO (EU) 2024/1689
- Herausgeber: Europäisches Parlament und Rat der EU
- URL: https://eur-lex.europa.eu/eli/reg/2024/1689/oj (aus dem Gedächtnis, nicht geöffnet)
- Fassung/Datum: in Kraft seit 01.08.2024. Art. 4 und 5 gelten seit 02.02.2025, Art. 50 und die Hochrisikopflichten nach Anhang III nach dem ursprünglichen Zeitplan ab 02.08.2026. Im November 2025 schlug die Kommission mit dem „Digital Omnibus" vor, die Hochrisikopflichten zu verschieben; ob und wann das beschlossen wurde, habe ich nicht geprüft. [alles Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt]:
  - Art. 4: Anbieter und Betreiber müssen für ausreichende KI-Kompetenz ihres Personals sorgen.
  - Art. 5 Abs. 1 lit. b verbietet KI-Systeme, die Schwächen einer Person oder Gruppe wegen Alter, Behinderung oder sozialer bzw. wirtschaftlicher Lage ausnutzen, um ihr Verhalten wesentlich zu beeinflussen, sodass erheblicher Schaden entsteht oder wahrscheinlich ist (Ziel oder Wirkung genügt). lit. a verbietet manipulative oder täuschende Techniken. lit. f verbietet Emotionserkennung am Arbeitsplatz und in Bildungseinrichtungen, außer aus medizinischen oder Sicherheitsgründen.
  - Art. 6 mit Anhang III Nr. 3 (allgemeine und berufliche Bildung): Als hochriskant gelten u. a. KI-Systeme, die Lernergebnisse bewerten (auch wenn sie damit den Lernprozess steuern), das angemessene Bildungsniveau bestimmen, über Zugang oder Zulassung entscheiden oder verbotenes Verhalten bei Prüfungen überwachen, jeweils „in Einrichtungen der allgemeinen und beruflichen Bildung auf allen Ebenen". Art. 6 Abs. 3 nimmt eng begrenzte Aufgaben aus, aber nie, wenn natürliche Personen profiliert werden.
  - Art. 50 (Transparenz): Nutzer müssen erfahren, dass sie mit einem KI-System interagieren, sofern das nicht offensichtlich ist. Synthetische Inhalte (Text, Bild, Audio, Video) sind maschinenlesbar zu kennzeichnen, mit Ausnahmen.
- Konsequenzen für SPIELIQ: KI-Feedback später nur als Assistenz für Trainer und Spieler. Keine Auswahl- oder Einstufungsentscheidungen, keine Analyse von Emotionen oder Aufmerksamkeit, keine Optimierung auf Engagement, klar als KI gekennzeichnet, mit DSFA (D-30, D-31). Offen ist, ob Sportvereine oder Fußballschulen „Bildungseinrichtungen" sind; dann wäre KI-Feedback hochriskant.

### [D-42] UK Information Commissioner's Office (ICO): „Age appropriate design: a code of practice for online services" (Children's code)
- Herausgeber: Information Commissioner's Office (Vereinigtes Königreich)
- URL: über ico.org.uk (nicht verifiziert; Domain gesperrt)
- Fassung/Datum: in Kraft seit 02.09.2020, Übergangsfrist bis 02.09.2021 [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]. Als britisches Recht für SPIELIQ in der EU nicht verbindlich; hier nur als Best Practice.
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt]: Der Code hat 15 Standards:
  1. Das Kindeswohl hat Vorrang.
  2. Datenschutz-Folgenabschätzung.
  3. Altersgerechte Anwendung, mit Altersbändern 0–5, 6–9, 10–12, 13–15 und 16–17.
  4. Transparenz: kurze, altersgerechte Hinweise dort, wo sie gebraucht werden.
  5. Keine schädliche Datennutzung, u. a. keine Mechaniken, die das Streben nach Belohnung, Vorfreude oder Gruppendruck ausnutzen; eine Pause muss ohne Fortschrittsverlust möglich sein.
  6. Eigene Regeln und Community-Standards einhalten.
  7. „Hohe Privatsphäre" als Voreinstellung.
  8. Datenminimierung.
  9. Keine Datenweitergabe ohne zwingenden Grund.
  10. Standortfunktionen standardmäßig aus.
  11. Elternkontrollen: das Kind altersgerecht informieren und sichtbar anzeigen, wenn es beobachtet wird.
  12. Profiling standardmäßig aus.
  13. Keine Nudges zu mehr Datenpreisgabe oder schwächeren Einstellungen.
  14. Vernetzte Spielzeuge und Geräte.
  15. Online-Werkzeuge, um Rechte auszuüben und Bedenken zu melden.
- Konsequenzen für SPIELIQ: Gestaltungsmaßstab für Altersbänder (die erste Zielgruppe 13–15 entspricht genau einem Band), für ein sichtbares Signal „dein Trainer sieht deinen Fortschritt", für eine Pausenfunktion, für Profiling standardmäßig aus und für kindgerechte Datenschutzhinweise.

### [D-43] 5Rights Foundation: „Disrupted Childhood – The Cost of Persuasive Design"
- Herausgeber: 5Rights Foundation
- URL: über 5rightsfoundation.com (nicht verifiziert; Domain gesperrt)
- Fassung/Datum: 2018 [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt]: Der Bericht beschreibt persuasive Designstrategien und ihre Wirkung auf Kinder: Benachrichtigungen, die Nutzer zurückholen; variable Belohnungen nach dem Prinzip von Spielautomaten; soziale Verpflichtung durch Streaks und Lesebestätigungen; endloses Scrollen und Autoplay; die Angst, etwas zu verpassen. Er fordert, dass kindgerechtes Design die Voreinstellung ist.
- Konsequenzen für SPIELIQ: Liefert eine Negativliste für die Gamification: keine variablen Zufallsbelohnungen, keine Angst vor dem Verlust eines Streaks, keine Mechaniken sozialer Verpflichtung.

### [D-44] IEEE Std 2089-2021: „Standard for an Age Appropriate Digital Services Framework Based on the 5Rights Principles for Children"
- Herausgeber: IEEE Standards Association
- URL: über standards.ieee.org (nicht verifiziert)
- Fassung/Datum: 2021 [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt]: Ein Prozessrahmen, mit dem Organisationen altersgerechte digitale Dienste gestalten: anerkennen, dass Kinder Nutzer sind, Kinderrechte-Folgen abschätzen, altersgerecht gestalten, transparent sein, Governance aufbauen.
- Konsequenzen für SPIELIQ: Kann ein Vorgehen nach „Child Rights by Design" strukturieren. Eine Zertifizierungspflicht gibt es nicht.

### [D-45] UN-Ausschuss für die Rechte des Kindes: General Comment No. 25 (2021) zu den Rechten der Kinder im digitalen Umfeld
- Herausgeber: UN-Ausschuss für die Rechte des Kindes
- URL: über ohchr.org (nicht verifiziert)
- Fassung/Datum: 2021, CRC/C/GC/25 [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt]: Die Rechte der UN-Kinderrechtskonvention gelten auch digital: Vorrang des Kindeswohls, sich entwickelnde Fähigkeiten, Beteiligung, Schutz der Privatsphäre. Unternehmen sollen kinderrechtliche Sorgfalt walten lassen. Das Dokument kritisiert Profiling und kommerzielle Ausbeutung.
- Konsequenzen für SPIELIQ: Normativer Rahmen für eine Kinderrechte-Folgenabschätzung neben der DSFA und für die Beteiligung von Kindern und Jugendlichen an der Produktentwicklung.

### [D-46] Charta der Grundrechte der EU, Art. 24 (Rechte des Kindes)
- Herausgeber: Europäische Union
- URL: über eur-lex.europa.eu (nicht verifiziert)
- Fassung/Datum: konsolidierte Fassung (ABl. C 202 vom 7.6.2016) [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt]: Kinder haben Anspruch auf Schutz und Fürsorge. Ihre Meinung wird nach Alter und Reife berücksichtigt. Bei allen Maßnahmen öffentlicher Stellen oder privater Einrichtungen, die Kinder betreffen, muss das Kindeswohl eine vorrangige Erwägung sein.
- Konsequenzen für SPIELIQ: Auslegungsmaßstab für Abwägungen nach DSGVO und DSA, z. B. bei Art. 6 Abs. 1 lit. f.

### [D-47] W3C: Web Content Accessibility Guidelines (WCAG) 2.2
- Herausgeber: World Wide Web Consortium (W3C)
- URL: https://www.w3.org/TR/WCAG22/ ; Erläuterungen: https://www.w3.org/WAI/WCAG22/Understanding/ (aus dem Gedächtnis, nicht geöffnet)
- Fassung/Datum: W3C-Empfehlung vom 05.10.2023; spätere redaktionelle Aktualisierungen möglich, nicht geprüft [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen, w3.org gesperrt – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt]:
  - 2.5.7 Ziehbewegungen (AA): Jede Funktion, die Ziehen verlangt, muss auch mit einem einzelnen Zeiger ohne Ziehen erreichbar sein, außer Ziehen ist wesentlich.
  - 2.5.8 Zielgröße, Minimum (AA): Zeigerziele messen mindestens 24 × 24 CSS-Pixel. Ausnahmen gibt es für ausreichenden Abstand, gleichwertige Alternativen, Ziele im Fließtext, vom Browser gesteuerte Elemente und wesentliche Fälle. 2.5.5 (AAA) verlangt 44 × 44.
  - 1.4.1 Benutzung von Farbe (A): Farbe darf nicht das einzige visuelle Mittel sein, um Information zu vermitteln oder Elemente zu unterscheiden.
  - 1.4.3 Kontrast, Minimum (AA): Text mindestens 4,5:1, großer Text 3:1. 1.4.11 Nicht-Text-Kontrast (AA): Bedienelemente und für das Verständnis nötige Grafiken mindestens 3:1.
  - 2.3.3 Animation durch Interaktionen (AAA): Bewegungsanimationen, die eine Interaktion auslöst, lassen sich abschalten, außer sie sind wesentlich. Technisch geht das über die CSS-Media-Query prefers-reduced-motion.
  - 2.1.1 Tastatur (A): Alles ist per Tastatur bedienbar, ohne bestimmte Zeitvorgaben, außer bei pfadabhängiger Eingabe. 2.1.2: keine Tastaturfalle.
  - 2.2.1 Zeitbegrenzungen anpassbar (A): Jedes Zeitlimit lässt sich ausschalten, anpassen (mindestens auf das Zehnfache) oder verlängern (mit Vorwarnung, mindestens 20 Sekunden Reaktionszeit, mindestens zehnmal). Ausnahmen gelten für Echtzeit-Ereignisse, für wesentliche Limits und für Limits über 20 Stunden.
  - Ebenfalls relevant: 1.1.1, 1.3.1, 1.3.3, 1.3.4, 1.4.10, 1.4.13, 2.2.2, 2.3.1, 2.4.7, 2.4.11 (neu in 2.2), 2.5.1, 2.5.2, 2.5.4, 3.3.7 (neu), 3.3.8 (neu, AA), 4.1.2 und 4.1.3.
- Konsequenzen für SPIELIQ: Siehe den Abschnitt „Barrierefreiheitsanforderungen an das Spielfeld".

### [D-48] ETSI/CEN/CENELEC EN 301 549 „Accessibility requirements for ICT products and services"
- Herausgeber: ETSI, CEN, CENELEC
- URL: über etsi.org (nicht verifiziert)
- Fassung/Datum: V3.2.1 (2021-03) ist harmonisierte Norm für die Web-Richtlinie (EU) 2016/2102. Eine an den European Accessibility Act angepasste Fassung mit Bezug auf WCAG 2.2 war in Arbeit; ihren Stand im Oktober 2026 habe ich nicht geprüft. [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt]: Kapitel 9 (Web) übernimmt WCAG 2.1 auf den Stufen A und AA; weitere Kapitel behandeln Software, Dokumente und Support. Die Norm ist Grundlage des BITV-Tests.
- Konsequenzen für SPIELIQ: Nach § 4 BFSG (D-10) wird Konformität nur bei harmonisierten Normen vermutet, die im Amtsblatt veröffentlicht sind. Ob es eine solche Fundstelle für den European Accessibility Act schon gibt, ist zu prüfen; bis dahin gilt der Stand der Technik (§ 3 BFSGV, D-11). WCAG 2.2 AA geht über WCAG 2.1 AA hinaus und ist daher ein robustes Ziel.

### [D-49] EuGH, Urteil vom 07.12.2023, C-634/21 (SCHUFA Holding – Scoring)
- Herausgeber: Gerichtshof der Europäischen Union
- URL: über curia.europa.eu (nicht verifiziert)
- Fassung/Datum: 07.12.2023 [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt]: Ein automatisiert berechneter Wahrscheinlichkeitswert ist eine „automatisierte Entscheidung" im Sinne von Art. 22 DSGVO, wenn ein Dritter sich maßgeblich danach richtet, ob er ein Vertragsverhältnis begründet, durchführt oder beendet.
- Konsequenzen für SPIELIQ: Lernstands-Scores dürfen nicht faktisch zum maßgeblichen Kriterium für Kader-, Einsatz- oder Aufnahmeentscheidungen werden. Das lässt sich über einen Hinweis in der Oberfläche, eine Klausel in den Verträgen mit Vereinen („kein alleiniges Auswahlkriterium") und eine erklärbare Berechnung absichern. Ob sich das Urteil auf den Sportkontext übertragen lässt, in dem es nicht um Verträge geht, ist offen.

### [D-50] EuGH, Urteil vom 04.09.2025, C-413/23 P (EDSB/SRB – pseudonymisierte Daten)
- Herausgeber: Gerichtshof der Europäischen Union
- URL: über curia.europa.eu (nicht verifiziert)
- Fassung/Datum: 04.09.2025 [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt]: Pseudonymisierte Daten sind nicht für jeden Empfänger automatisch personenbezogen. Entscheidend ist, ob der Empfänger die Person mit vernünftigerweise verfügbaren Mitteln wieder identifizieren kann. Für den Verantwortlichen, der den Schlüssel besitzt, bleiben sie personenbezogen, auch mit Blick auf die Informationspflichten.
- Konsequenzen für SPIELIQ: Für Verein, Trainer und SPIELIQ bleiben die Pseudonyme personenbezogen, denn der Trainer kennt die Kinder. Es gelten also alle Pflichten der DSGVO. Nur bei externen Empfängern aggregierter oder pseudonymer Auswertungen kann der Personenbezug entfallen; das ist rechtlich zu prüfen.

### [D-51] EU-US Data Privacy Framework: Angemessenheitsbeschluss der Kommission (10.07.2023) und EuG-Urteil vom 03.09.2025, T-553/23 (Latombe/Kommission)
- Herausgeber: Europäische Kommission; Gericht der Europäischen Union
- URL: über eur-lex.europa.eu bzw. curia.europa.eu (nicht verifiziert)
- Fassung/Datum: 10.07.2023 und 03.09.2025 [Hintergrundwissen, nicht per Suche bestätigt]
- Zugriff / Verifikationsstatus: Nicht abgerufen – [Hintergrundwissen, nicht per Suche bestätigt]
- Kernaussagen (paraphrasiert) [Hintergrundwissen, nicht per Suche bestätigt]: Der Angemessenheitsbeschluss gilt für zertifizierte US-Unternehmen. Das EuG hat die Nichtigkeitsklage abgewiesen. Rechtsmittel und weitere Verfahren sind möglich; den aktuellen Stand habe ich nicht geprüft.
- Konsequenzen für SPIELIQ: Bei US-Dienstleistern (Hosting, E-Mail, Analytics, KI-Schnittstellen) bleibt eine rechtliche Restunsicherheit. EU-Anbieter und EU-Regionen bevorzugen. Bei US-Bezug DPF-Zertifizierung, Standardvertragsklauseln und eine Transfer-Folgenabschätzung prüfen.

---

## Synthese

Abkürzung: **[HW]** = die zitierte Quelle oder der Inhalt ist nur Hintergrundwissen und nicht per Suche bestätigt. Steht eine Zeile nur auf [HW]-Quellen, sollte sie besonders sorgfältig gegengelesen werden.

### Tabelle 1: Voraussichtlich verpflichtend (vorbehaltlich anwaltlicher Prüfung)

| Thema | Anforderung/Frage | Konsequenz für Architektur/Produkt | Quellen |
|---|---|---|---|
| Rollen und Verträge | Für jede Verarbeitung festlegen, wer verantwortlich ist. Im Vereinsmodus voraussichtlich: Verein ist Verantwortlicher, SPIELIQ ist Auftragsverarbeiter mit Vertrag nach Art. 28 DSGVO. Im B2C-Modus ist SPIELIQ selbst Verantwortlicher. | Mandantenmodell (Verein/Team mit Controller-Kennung je Datensatz); Standardpaket aus Auftragsverarbeitungsvertrag, TOM-Anlage und Liste der Unterauftragsverarbeiter; technische Trennung von Vereins- und B2C-Daten; Löschung oder Rückgabe bei Vertragsende | D-29 [HW], D-33 [HW], D-21, D-22 |
| Rechtsgrundlage | Jede Verarbeitung braucht eine dokumentierte Rechtsgrundlage. Für Lernstände Minderjähriger trägt die Vereinsmitgliedschaft (lit. b) wohl nicht sicher. In Frage kommen lit. f mit starker Gewichtung der Kinderinteressen oder eine Einwilligung (unter 16 mit den Eltern). | Einwilligungs- und Informationsverwaltung je Spieler mit Ablauf für Eltern; Funktionen modular trennen (Kernlernen vs. optionale Auswertungen), damit unterschiedliche Rechtsgrundlagen abbildbar sind | D-21, D-29 [HW], D-25 |
| Altersgrenze 16 | Stützt sich ein direkt an Kinder gerichteter Online-Dienst auf Einwilligung, braucht es unter 16 die Einwilligung oder Zustimmung der Eltern, mit angemessener Prüfung. Das BDSG weicht davon nicht ab. | Altersband bzw. Jahrgang erfassen statt exaktem Geburtsdatum; Elternbestätigung über den Verein oder eine bestätigte Eltern-E-Mail; neue Einwilligung, wenn der Spieler 16 wird | D-09, D-21, D-25, D-26, D-29 [HW], D-32 [HW] |
| Kindgerechte Transparenz | Art. 12 und 13 DSGVO: Informationen präzise, verständlich und in einfacher Sprache, besonders für Kinder | Datenschutzhinweise in mehreren Fassungen: für Kinder je Altersband, für Eltern, für Trainer und Vereine; kurze Hinweise direkt in der App, wo sie gebraucht werden | D-29 [HW], D-27 |
| Betroffenenrechte | Auskunft, Berichtigung, Löschung, Datenübertragbarkeit, Widerspruch, Widerruf der Einwilligung | Export zum Selbstabruf (maschinenlesbar); Löschen und Widerrufen so einfach wie das Einwilligen; im Vereinsmodus Anfragen an den Verein weiterleiten | D-29 [HW], D-22 |
| Privacy by Design und by Default | Art. 25 DSGVO: standardmäßig nur erforderliche Daten, nichts für einen unbestimmten Personenkreis zugänglich | Keine öffentlichen Profile, keine öffentlichen Leistungsdaten, Sichtbarkeit nur für den Spieler, seine Trainer und gegebenenfalls Eltern; keine Standortdaten | D-29 [HW], D-34 [HW], D-04 (Nr. 6 sinngemäß) |
| Sicherheit | Art. 32 DSGVO: angemessene technisch-organisatorische Maßnahmen | Verschlüsselung bei Übertragung und Speicherung, rollenbasierte Zugriffe, MFA für Trainer und Admins, Zugriffsprotokolle, Backups mit Wiederherstellungstests; sichere Einladungscodes (hohe Entropie, Ablaufdatum, Ratenbegrenzung, widerrufbar) | D-29 [HW] |
| Datenschutz-Folgenabschätzung | Voraussichtlich nötig: Bewertung des Lernstands plus Kinder als Betroffene, später zusätzlich KI | DSFA vor dem Livebetrieb. Im Vereinsmodus ist der Verein zuständig, SPIELIQ liefert Vorlage und Unterstützung; im B2C-Modus führt SPIELIQ sie selbst. Bei Änderungen fortschreiben. | D-30 [HW], D-31 [HW], D-21 |
| Datenschutzbeauftragter | § 38 Abs. 1 S. 2 BDSG: unabhängig von der Mitarbeiterzahl Pflicht, wenn Verantwortlicher oder Auftragsverarbeiter DSFA-pflichtige Verarbeitungen vornimmt | SPIELIQ benennt einen internen oder externen Datenschutzbeauftragten, sobald die DSFA-Pflicht bejaht ist, und nennt den Kontakt in den Datenschutzhinweisen | D-09 |
| Verzeichnis und Datenpannen | Verzeichnis der Verarbeitungstätigkeiten (Art. 30); Meldung von Datenpannen (Art. 33 und 34, 72 Stunden) | Verzeichnis als Verantwortlicher (B2C) und als Auftragsverarbeiter; Notfallprozess, der Vereine unverzüglich informiert | D-29 [HW], D-21 |
| Keine Gesundheitsdaten | Art. 9 DSGVO (besondere Kategorien) | Keine Felder zu Verletzungen, Krankheiten, Fitness- oder Vitalwerten; keine Freitextnotizen über einzelne Spieler, oder nur mit Warnhinweis und kurzer Speicherfrist | D-29 [HW] |
| Übermittlung in Drittländer | Art. 44 ff. DSGVO | Hosting, Datenbank und E-Mail in der EU; öffentliches Verzeichnis der Unterauftragsverarbeiter; bei US-Bezug DPF bzw. Standardvertragsklauseln und Prüfung | D-29 [HW], D-51 [HW] |
| Zugriff auf das Endgerät | § 25 TDDDG: Einwilligung nötig, außer die Speicherung ist für einen ausdrücklich gewünschten Dienst unbedingt erforderlich | Storage-Inventar der PWA; nur funktionsnotwendige Speicherungen (Sitzung, Offline-Cache auf Wunsch); keine Tracking- oder Analytics-SDKs, keine Werbe-IDs, kein Fingerprinting; Push nur nach aktivem Opt-in | D-01, D-35 [HW], D-36 [HW] |
| Impressum | § 5 DDG | Impressum in Website und PWA, leicht erkennbar, unmittelbar erreichbar, ständig verfügbar | D-02 |
| Abo-Abschluss und Kündigung (B2C) | §§ 312j und 312k BGB; Minderjährigenrecht nach §§ 107 ff. BGB | Bestellen nur über ein Erwachsenen- bzw. Elternkonto; Schaltfläche „zahlungspflichtig bestellen"; Kündigungsbutton „Verträge hier kündigen" mit Bestätigung; keine Hürden beim Kündigen | D-13, D-14, D-15 |
| Keine Kaufappelle an Kinder | UWG Anhang Nr. 28; § 3 Abs. 4 und § 4a UWG | Keine Upgrade- oder Kaufhinweise in Kinderansichten; Preis- und Abo-Kommunikation nur an Eltern; keine künstliche Dringlichkeit | D-15 |
| Barrierefreiheit beim B2C-Abo | BFSG und BFSGV für Dienstleistungen im elektronischen Geschäftsverkehr ab 28.06.2025, außer bei Kleinstunternehmen | Ziel WCAG 2.2 AA für die gesamte App; barrierefreier Checkout und Login (§ 19 BFSGV); Barrierefreiheitsinformation nach Anlage 3 BFSG; Beurteilungen bei Ausnahmen dokumentieren | D-10, D-11, D-47 [HW], D-48 [HW] |
| Bildnisse | § 22 KUG bzw. DSGVO; bei Minderjährigen Einwilligung der Eltern | MVP ohne Fotos und Videos; Avatare | D-16, D-21 |

### Tabelle 2: Empfohlen / Best Practice

| Thema | Anforderung/Frage | Konsequenz für Architektur/Produkt | Quellen |
|---|---|---|---|
| Keine 1:1-Kommunikation zwischen Erwachsenen und Minderjährigen | Private digitale Nähe ist tabu; nur offizielle, gruppenweite Kanäle; immer zwei Erwachsene beteiligt | Keine Chats, Direktnachrichten oder Kommentare an Einzelne; Missionen als strukturierte, teamweite Aufgaben; für Co-Trainer bzw. Vereinsadmin und Eltern einsehbar (Vier-Augen-Prinzip) | D-17, D-18, D-19, D-05, D-04 |
| Voreinstellungen, die Risiken begrenzen | § 24a Abs. 2 Nr. 6 JuSchG als Checkliste | Nicht indexierbar (noindex, keine öffentlichen URLs); nur angemeldete Teammitglieder sehen Inhalte; keine Kontakt- oder Standortdaten; Anzeigenamen nur als Pseudonym | D-04 |
| Kindgerechte Melde- und Hilfefunktion | Melde- und Abhilfeverfahren; Hinweise auf unabhängige Beratung | Seite „Hilfe & Melden" mit Ansprechperson im Verein, Anlaufstelle des Landesverbands und Nummer gegen Kummer; Meldungen ohne Upload von Inhalten | D-04, D-24, D-17, D-18 |
| Kein Profiling für Empfehlungen oder Werbung | Profiling standardmäßig aus; keine Werbung | Empfehlungen für Lernpfade regel- und lehrplanbasiert und erklärbar („weil du Lektion X abgeschlossen hast"); keine Werbung, keine Datenweitergabe | D-27, D-39 [HW], D-40 [HW], D-42 [HW] |
| Kein manipulatives Design | Keine Strafen für verlorene Streaks, keine variablen Zufallsbelohnungen oder Lootboxen, keine virtuellen Währungen, keine Countdowns, die Angst vor dem Verpassen schüren | Fortschritt bemisst sich an Lernzielen und Meilensteinen; Belohnungen deterministisch und transparent; Pause ohne Verlust; Inaktivität kostet keinen Fortschritt; wenn überhaupt, dann Wochenziele statt Tagesstreaks, mit Ruhetagen | D-05, D-15, D-40 [HW], D-42 [HW], D-43 [HW] |
| Benachrichtigungen | Standardmäßig aus; Kommunikation nur zu passenden Zeiten | Push nur per Opt-in (unter 16 gegebenenfalls über die Eltern); serverseitige Ruhezeiten (z. B. 20–7 Uhr und Schulzeit); Frequenzlimit; keine Trainer-Pushes nachts; keine „Wir vermissen dich"-Nachrichten | D-17, D-18, D-40 [HW], D-43 [HW] |
| Keine öffentlichen Ranglisten | Vergleiche demotivieren; Kritik gehört ins Einzelgespräch; bei den Jüngsten gibt es auch auf dem Platz keine Meisterschaftswertung | Kein Leaderboard; Fortschritt gegen die eigene Vorleistung; kooperative Teamziele; Fehleranalyse nur privat; Lob und Erfolge optional teamweit | D-18, D-23, D-29 [HW] (Art. 25 Abs. 2) |
| Altersgerechte Gestaltung | Altersbänder; Taktik nicht zu früh; wachsende Selbstbestimmung | Inhalte, Texte und Einstellungen je Altersband (6–9, 10–12, 13–15, 16–17, 18+); 14- bis 17-Jährige mit mehr eigener Kontrolle | D-42 [HW], D-23, D-13, D-05 |
| Transparente Einsicht von Trainern und Eltern | Sichtbares Signal, wenn jemand zusieht; begleiten, ohne zu überwachen | Ansicht „Wer sieht was?" für Kinder; Trainer sehen Lernergebnisse, aber keine Nutzungszeiten, Uhrzeiten oder Klickpfade; Zugriffsprotokoll für Admins | D-42 [HW], D-18 |
| Trainerrollen über den Verein | Schutzkonzept und Pflicht zum Führungszeugnis liegen beim Verein | Nur der Vereinsadmin vergibt die Trainerrolle; er bestätigt „vom Verein eingesetzt" statt ein Führungszeugnis hochzuladen; Rollenentzug wirkt sofort | D-07, D-08, D-18, D-20 |
| Beteiligung junger Menschen | Kinder und Jugendliche an Regeln und Gestaltung beteiligen | Nutzertests und ein Jugendbeirat (mit Einwilligung der Eltern); Feedbackkanal | D-17, D-07 (§ 11), D-45 [HW] |
| Kinderrechte-Folgenabschätzung | Ergänzend zur DSFA | Child Rights Impact Assessment nach dem Muster von IEEE 2089 und ICO | D-42 [HW], D-44 [HW], D-45 [HW], D-46 [HW] |
| Aufgaben mit Zeitdruck | Psychischer Druck; Barrierefreiheit | Zeitlimit optional, für jüngere Altersbänder standardmäßig aus, einstellbar (siehe Spielfeld) | D-18, D-47 [HW] |
| KI-Feedback (später) | Verbote und Transparenzpflichten; keine Auswahlentscheidungen | Als KI gekennzeichnet; Mensch entscheidet; keine Analyse von Emotionen oder Aufmerksamkeit; keine Optimierung auf Engagement; Kinderdaten nicht zum Modelltraining | D-41 [HW], D-29 [HW], D-49 [HW] |
| Datensparsame Produktanalyse | Keine Speicherung auf dem Endgerät; nur aggregiert | Serverseitige, aggregierte Kennzahlen ohne IDs; Mindestgruppengrößen für Teamauswertungen | D-01, D-35 [HW] |
| Inklusion | Zugänglichkeit für junge Menschen mit Behinderungen | WCAG 2.2 AA auch dann, wenn das BFSG in der B2B-Phase noch nicht greift | D-07 (§ 11 Abs. 1 S. 3), D-47 [HW] |

### Tabelle 3: Offene Rechtsfragen — anwaltlich zu prüfen

| Thema | Anforderung/Frage | Konsequenz für Architektur/Produkt | Quellen |
|---|---|---|---|
| Rollenverteilung | Ist der Verein Verantwortlicher und SPIELIQ Auftragsverarbeiter? Oder sind beide gemeinsam verantwortlich, weil SPIELIQ Lerninhalte, Bewertungslogik und Zwecke mitbestimmt? Was gilt für Fußballschulen, für Spieler in mehreren Vereinen und beim Vereinswechsel (wer nimmt die Lernhistorie mit)? | Bestimmt Vertragswerk, Datenmodell (wem gehören die Daten im Mandanten) und Funktionen zur Datenübertragung | D-29 [HW], D-33 [HW], D-22, D-21 |
| Rechtsgrundlage je Altersgruppe | lit. b (Mitgliedschaft bzw. Trainingsangebot), lit. f oder lit. a? Trägt die Argumentation des DFB zur Videoanalyse auch für Lernstandsdaten? | Einwilligungsmanagement oder Widerspruchsmodell | D-21, D-29 [HW] |
| Art. 8 im Vereinsmodus | Ist SPIELIQ ein Dienst, der „einem Kind direkt angeboten" wird, wenn der Zugang nur über Verein und Trainer läuft? Wie lässt sich die Zustimmung der Eltern praktikabel einholen und nachweisen (Aufnahmeantrag des Vereins, Elternkonto, E-Mail)? | Onboarding für Eltern; Nachweis dokumentieren | D-29 [HW], D-32 [HW], D-25 |
| Einwilligungsfähigkeit außerhalb von Art. 8 | Können 14- und 15-Jährige für einzelne Funktionen selbst einwilligen, weil sie einsichtsfähig sind? Braucht es eine doppelte Einwilligung von Kind und Eltern? | Einstellungsmatrix je Altersband | D-21, D-28 |
| § 25 TDDDG bei Kindern | Wer ist „Endnutzer", das Kind oder die Eltern? Gilt Art. 8 auch für Einwilligungen nach § 25? Sind Offline-Cache, Push-Abonnement und Fehlerprotokolle „unbedingt erforderlich"? | Storage-Inventar; gegebenenfalls auf Funktionen verzichten | D-01, D-36 [HW] |
| Verträge mit Minderjährigen | Sind Nutzungsbedingungen gegenüber Minderjährigen wirksam (§ 107 BGB)? Wie greift § 110 BGB bei Einmalkäufen und Abos? Wer haftet? | AGB-Zustimmung durch die Eltern; keine Zahlfunktionen für Minderjährige | D-13 |
| Einordnung nach DSA | Ist SPIELIQ ein Hostingdienst, wenn Trainer eigene Inhalte anlegen oder Spieler Lösungen speichern? Ist es eine Online-Plattform, obwohl Teams nur per Einladungscode zugänglich sind? Greift die Ausnahme für Kleinst- und Kleinunternehmen? Was folgt aus Art. 14 Abs. 3 und Art. 16? | Bestimmt Melde- und AGB-Pflichten und die Grenzen für öffentliche Funktionen | D-39 [HW], D-03, D-04 |
| Art. 22 und Scoring | Wird ein Lernscore zur „Entscheidung" im Sinne der SCHUFA-Rechtsprechung, wenn Trainer ihn für Nominierungen nutzen? | Gestaltung des Scores, Warnhinweise in der Oberfläche, Vertragsklausel | D-49 [HW], D-29 [HW] |
| KI-Verordnung | Sind Vereine und Fußballschulen „Einrichtungen der allgemeinen und beruflichen Bildung"? Ist KI-Feedback eine „Bewertung von Lernergebnissen" und damit hochriskant? Welche Fristen gelten nach dem Digital Omnibus? | Entscheidet über Konformitätsbewertung, Registrierung und Betreiberpflichten der Vereine | D-41 [HW] |
| Reichweite des BFSG | Gilt es für die ganze Lernplattform oder nur für die Bestell- und Vertragsstrecke? Greift die Ausnahme für Kleinstunternehmen? Gilt es auch, wenn Spieler SPIELIQ über eine Vereinslizenz (B2B) nutzen? | Priorität der Barrierefreiheit; Inhalt der Barrierefreiheitsinformation | D-10, D-11 |
| § 72a SGB VIII und Führungszeugnis | Darf SPIELIQ als Auftragsverarbeiter des Vereins die nach § 72a Abs. 5 zulässigen Vermerke speichern? Wer haftet, wenn ein ungeprüfter Trainer Zugang bekommt? | Freigabeprozess für Trainer; AGB für Vereine | D-07, D-08, D-20 |
| Pseudonymisierung und Anonymisierung | Ab wann sind aggregierte Lerndaten für eigene Zwecke von SPIELIQ (Inhalte verbessern, Benchmarks) anonym? | Analysepipeline; Mindestgruppengrößen | D-50 [HW], D-33 [HW] |
| Übermittlung in Drittländer | Wie zulässig und wie riskant sind US-Dienste (Hosting, E-Mail, KI-Schnittstellen) nach der Rechtsprechung zum DPF? | Wahl der Anbieter | D-51 [HW] |
| Speicherdauer | Was passiert mit der Lernhistorie nach Austritt, Saisonende und Altersübergängen (16, 18)? Welche Rechte haben Eltern ab 16? | Löschkonzept; Regeln für Altersübergänge | D-29 [HW], D-21, D-13 |
| Elternrechte und Selbstbestimmung | Dürfen Eltern die Lernstände 16- und 17-Jähriger sehen? Wer übt die Betroffenenrechte aus? | Elternzugriff abhängig vom Alter | D-13 (§ 1626 Abs. 2), D-29 [HW] |
| Alterskennzeichnung | Ist SPIELIQ eine „Spielplattform" nach § 14a JuSchG, mit Kennzeichnungspflicht ab einer Million Nutzern im Inland? | Nutzerzahlen beobachten | D-06 |
| Hinweise auf Gefährdung des Kindeswohls | Welche Pflichten und Abläufe gelten, wenn über die Plattform Hinweise eingehen (Meldefunktion)? Wie werden die Meldenden datenschutzrechtlich geschützt? | Meldeprozess mit Verein und Landesverband | D-24, D-17, D-04 |
| Zuständige Aufsicht und Konsultation | Welche Landesbehörde ist zuständig? Ist bei hohem Restrisiko eine vorherige Konsultation nach Art. 36 sinnvoll? | Zeitplanung | D-09, D-29 [HW] |

### Datenschutz-Architekturprinzipien für SPIELIQ

Diese Maßnahmen leite ich aus D-01, D-04, D-07 bis D-09, D-17, D-18, D-21, D-22 und D-29 bis D-37 ab. Wo die Grundlage nur [HW] ist, steht das in den Tabellen oben.

1. **Zwei Betriebsmodi mit eindeutiger Verantwortlichkeit.** Jeder Datensatz trägt eine Mandanten- bzw. Controller-Kennung. Im Vereinsmodus handelt SPIELIQ nur auf Weisung des Vereins (Auftragsverarbeitung); im B2C-Modus ist SPIELIQ Verantwortlicher. Daten verschiedener Mandanten werden nie verknüpft, außer zu anonymisierter Statistik, deren Zulässigkeit noch zu prüfen ist.
2. **Pseudonymes Spielerprofil mit minimalen Pflichtfeldern.** Pflicht sind nur ein Anzeigename (Pseudonym mit Hinweis „nicht dein voller Name"), Altersband oder Jahrgang und Team. Kein exaktes Geburtsdatum, keine Kontaktdaten des Kindes, wenn es sich vermeiden lässt (Kontakt über Eltern oder Verein), keine Fotos, Avatare statt Bilder.
3. **Beitritt per Einladungscode mit menschlicher Freigabe.** Codes werden kryptografisch zufällig erzeugt, laufen ab, sind nur begrenzt nutzbar, an ein Team gebunden, ratenbegrenzt und widerrufbar. Zusätzlich gibt es QR-Code oder Link, und Einfügen ist erlaubt (barrierefreie Authentifizierung). Jeden Beitritt bestätigt der Trainer. Das schützt und hält Teams zugleich „nicht öffentlich" im Sinne von ErwG 14 DSA [HW].
4. **Sichtbarkeitsmatrix.** Der Spieler sieht seine eigenen Daten. Die Trainer seines Teams sehen Lernergebnisse, aber keine Nutzungszeiten. Eltern sehen die Daten ihres Kindes, unter 16 standardmäßig; zwischen 16 und 17 ist die Regel noch offen. Mitspieler sehen nur freiwillige, aggregierte Teamerfolge. Es gibt kein öffentliches oder vereinsübergreifendes Profil und keine Indexierung.
5. **Keine freien Kommunikationskanäle.** Kein Chat, keine Direktnachricht, keine Kommentare zu einzelnen Spielern. Missionen sind strukturierte Objekte (Lektion, Frist, optional Kurztext aus Vorlagen). Jede Mission ist für alle Teammitglieder, die Eltern und einen zweiten Erwachsenen sichtbar und mit Zeitstempel protokolliert.
6. **Datensparsame Lernanalytik.** Gespeichert werden Ergebnisse je Lektion (bestanden, Punktzahl, Versuche), keine dauerhaften Rohdaten. Klickpfade, Drag-Koordinaten und Reaktionszeiten werden nur kurz zur Auswertung vorgehalten (Frist festlegen, etwa 30 Tage) oder nur lokal verarbeitet. Trainer sehen keine Profile von Uhrzeit oder Nutzungsdauer.
7. **Keine Dritt-Tracker.** Keine SDKs von Drittanbietern; Schriften und Skripte selbst hosten; strenge Content Security Policy; Kennzahlen nur serverseitig und aggregiert. Damit bleibt die App ohne Einwilligungspflicht nach § 25 TDDDG.
8. **Storage-Inventar nach § 25 TDDDG.** Eine Liste aller Browser-Speicherungen mit Zweck und Begründung, warum sie erforderlich sind. Der Service-Worker-Cache enthält nur die App-Hülle und die Offline-Lektionen, die der Nutzer gewählt hat. Session-Cookies sind httpOnly, Secure und SameSite. Push gibt es nur nach aktivem Opt-in.
9. **Speicherfristen und Löschung.** Automatische Löschung bzw. Trennung, wenn ein Spieler das Team verlässt (Vereinsdaten). Löschung nach Inaktivität (Frist festlegen). Saisonarchive nur aggregiert. Backups laufen ab. Löschungen werden nachgewiesen.
10. **Altersübergänge.** Ein regelmäßiger Job prüft den Wechsel des Altersbands. Mit 16 bekommt der Jugendliche einen Hinweis und wird selbst gefragt, ob er bestätigt, ändert oder widerruft; die Elternrechte werden angepasst. Mit 18 wechselt das Konto in den Erwachsenenmodus.
11. **Betroffenenrechte zum Selbstbedienen.** Export (JSON/CSV), Löschantrag, Widerruf, Widerspruch und Kontakt zum Datenschutzbeauftragten. Im Vereinsmodus werden Anfragen an den Verein weitergeleitet.
12. **Sicherheitsgrundlagen.** TLS mit HSTS, Verschlüsselung der gespeicherten Daten, Secrets-Management, Passkeys oder MFA für Trainer und Admins, minimale Rechte. Protokollierte Zugriffe auf Spielerdaten, Penetrationstests und Abhängigkeits-Scans. Ein Notfallprozess bindet die Vereine in die 72-Stunden-Kette ein.
13. **EU-Hosting und transparente Unterauftragsverarbeiter.** EU-Region und vorzugsweise EU-Anbieter. Die Liste der Unterauftragsverarbeiter ist öffentlich. Es gibt eine Vorlage für den Auftragsverarbeitungsvertrag mit Vereinen.
14. **Keine besonderen Kategorien.** Das Datenmodell enthält keine Gesundheitsfelder. Freitextnotizen zu einzelnen Spielern werden vermieden, weil Freitext die häufigste Quelle für Gesundheits- und Verhaltensdaten ist.
15. **Keine automatisierten Entscheidungen.** Scores sind erklärbar. Die Oberfläche weist darauf hin: „Der Lernstand ist kein Kriterium für Kaderentscheidungen." Die Verträge mit Vereinen schließen eine solche Nutzung aus.
16. **KI vorbereiten, ohne Schulden aufzubauen.** Schnittstellen so bauen, dass nur minimierte, pseudonymisierte Daten in Modelle gehen. Verarbeitung in der EU, kein Training mit Kinderdaten, Kennzeichnung als KI, für Vereine abschaltbar. Keine Emotionserkennung.
17. **Benachrichtigungsdienst mit Richtlinien-Logik.** Opt-in, serverseitige Ruhezeiten, Frequenzlimit und keine Nachrichten, die inaktive Nutzer zurücklocken sollen.
18. **Dokumentation als Produktbestandteil.** Verzeichnis der Verarbeitungstätigkeiten, DSFA, TOMs, Storage-Inventar, Kinderrechte-Prüfung, Barrierefreiheitsinformation (Anlage 3 BFSG) und ein Leitfaden „SPIELIQ im Schutzkonzept des Vereins".

### Barrierefreiheitsanforderungen an das Spielfeld

Die Inhalte zu den WCAG-Erfolgskriterien sind [HW] (D-47). Den rechtlichen Rahmen bilden BFSG und BFSGV beim B2C-Abo (D-10, D-11; abgerufen), die BITV 2.0, die nur für öffentliche Stellen gilt (D-12; abgerufen), und EN 301 549 als Normbezug (D-48 [HW]).

| Bereich | WCAG 2.2 (Stufe) [HW] | Anforderung an das Taktikboard | Umsetzungsidee |
|---|---|---|---|
| Ziehen | 2.5.7 Ziehbewegungen (AA) | Jede Drag-Aktion funktioniert auch ohne Ziehen | Spieler antippen, dann Ziel antippen; Kontextmenü „Bewegen nach …" mit Zonenraster (z. B. 6 × 4 Zonen); Richtungstasten als Buttons |
| Tastatur | 2.1.1 (A), 2.1.2 (A), 2.4.3 (A), 2.4.7 (AA), 2.4.11 (AA) | Komplett per Tastatur bedienbar, keine Tastaturfalle, logische Fokusreihenfolge, Fokus sichtbar und nicht verdeckt | Roving Tabindex über die Spielerfiguren; Pfeiltasten bewegen um ein Rasterfeld, mit Umschalt fein; Enter oder Leertaste wählt aus bzw. setzt ab; Esc bricht ab; Fokusring mit Kontrast von mindestens 3:1 |
| Zeigergesten | 2.5.1 (A), 2.5.2 (A) | Keine Mehrfinger- oder Pfadgesten ohne Alternative; jede Aktion abbrechbar | Zoom über Buttons; Laufwege über Wegpunkte statt Freihandzeichnen; Aktion erst beim Loslassen, Zurückziehen bricht ab; Rückgängig-Funktion |
| Zielgröße | 2.5.8 (AA), 2.5.5 (AAA) | Ziele mindestens 24 × 24 CSS-Pixel; für Kinder und Touch besser 44 × 44 | Trefferfläche der Figur größer als die Grafik; Mindestabstände; Zoom für dichte Spielsituationen |
| Farbe | 1.4.1 (A) | Teams, Zonen und Richtig/Falsch nicht nur über Farbe unterscheiden | Formen (Kreis/Dreieck), Nummern oder Buchstaben, Muster; Rückmeldung mit Symbol und Text |
| Kontrast | 1.4.3 (AA), 1.4.11 (AA) | Text mindestens 4,5:1; Figuren, Linien, Pfeile und Zonen gegen den Rasen mindestens 3:1 | Konturen um Figuren; Hochkontrast-Theme; kein Grün auf Grün |
| Bewegung und Animation | 2.3.3 (AAA), 2.2.2 (A), 2.3.1 (A) | Animationen abschaltbar; automatisch ablaufende Sequenzen über fünf Sekunden pausierbar; keine Blitze | prefers-reduced-motion respektieren plus eigener Schalter in der App; Wiederholungen mit Pause und Schritt-für-Schritt-Modus |
| Zeitlimits (geplante Zeitentscheidungen) | 2.2.1 Zeitbegrenzungen anpassbar (A) | Zeitlimits ausschalten, anpassen (mindestens das Zehnfache) oder verlängern, außer sie sind wesentlich | Standard ohne oder mit großzügigem Limit; „Matchtempo" als freiwilliger Modus; Einstellung je Spieler (durch Spieler und Trainer); Ergebnis auch ohne Zeitbonus vergleichbar. Ob die Ausnahme „wesentlich" greift, ist fraglich; der sichere Weg ist die einstellbare Variante. |
| Text- und Strukturalternativen | 1.1.1 (A), 1.3.1 (A), 4.1.2 (A), 4.1.3 (AA) | Spielsituation programmatisch erfassbar; Statusmeldungen für Screenreader | Zugängliche Namen wie „Eigenes Team, Nr. 6, Zone Mitte-links"; Listen- oder Textansicht der Situation; aria-live meldet „Nr. 6 nach Zone C3 verschoben" |
| Anweisungen und Fehler | 1.3.3 (A), 3.3.1 (A), 3.3.3 (AA) | Aufgaben nicht nur über Farbe, Position oder Form beschreiben; Fehler erkennbar machen und Hilfe anbieten | „Bewege Nr. 6 in den linken Halbraum" statt „den roten Spieler oben"; konkrete Korrekturhinweise |
| Ausrichtung und Zoom | 1.3.4 (AA), 1.4.4 (AA), 1.4.10 (AA) | Hoch- und Querformat; Text auf 200 % vergrößerbar; Reflow (das 2D-Spielfeld ist gegebenenfalls ausgenommen, die Bedienelemente nicht) | Responsives Layout; Spielfeld skaliert mit; Steuerleiste bricht um |
| Bewegungssteuerung | 2.5.4 (A) | Keine Funktion nur über Schütteln oder Neigen | Gerätebewegung höchstens zusätzlich und abschaltbar |
| Einladungscode und Login | 3.3.8 (AA), 3.3.7 (A); § 19 BFSGV (D-11) | Kein kognitiver Test; Einfügen erlaubt; nichts doppelt eingeben | QR-Code oder Link, Einfügen erlaubt, Passwortmanager und Passkeys; keine CAPTCHA-Rätsel |
| Sprache | 3.1.1 (A), 3.1.5 (AAA) | Sprache im Code ausgezeichnet; einfache Sprache für Kinder | Vorlesefunktion, Piktogramme, kurze Sätze |
| Medien | 1.2.2 (A), 1.2.5 (AA) | Untertitel und Audiodeskription bei Erklärvideos | Untertitel standardmäßig verfügbar |
| Prüfung | – | Mit Hilfsmitteln testen | VoiceOver (iOS/macOS), TalkBack, NVDA, nur Tastatur, Switch-Steuerung, Zoom 200–400 %, Simulation von Farbsehschwächen; Tests mit Kindern mit Behinderungen (mit Einwilligung der Eltern) |

---

## Offene Punkte / Unsicherheiten

1. **Die Recherche hat klare Grenzen.** Das Websuche-Kontingent war nach drei Anfragen aufgebraucht. Deshalb sind 23 der 51 Quellen (D-29 bis D-51) nur Hintergrundwissen, darunter fast alle EU-Quellen und die WCAG. Eine Folgerunde sollte als Erstes gegenprüfen:
   - DSGVO Art. 6, 8, 12, 22 und 25 sowie ErwG 58, 65 und 71 auf EUR-Lex;
   - DSA Art. 3, 14, 16, 19, 25 und 28 sowie ErwG 14;
   - die Leitlinien der Kommission zu Art. 28 DSA (Datum, Streaks, Push, Ruhezeiten);
   - KI-Verordnung Art. 5, 6 und 50, Anhang III und den Stand des Digital Omnibus;
   - die EDPB-Dokumente WP 248, 05/2020, 07/2020, 4/2019, 2/2023 und das Statement 1/2025;
   - die DSK-Muss-Liste und die OH Digitale Dienste;
   - den Ratgeber „Datenschutz im Verein" des LfDI BW;
   - den ICO-Code, die 5Rights-Berichte und IEEE 2089;
   - die WCAG 2.2 samt „Understanding"-Erläuterungen, insbesondere zu 2.2.1 („wesentlich" bei Lernspielen);
   - den Stand von EN 301 549 bzw. der harmonisierten Norm zum European Accessibility Act;
   - die Verfahren zum DPF.
2. **Ein Hinweis aus den Suchergebnissen ist unbestätigt.** Ein Treffer auf nexvyra.de (https://nexvyra.de/fakten/dsgvo-kinder-einwilligung-art-8) erwähnt einen angeblichen EU-Vorschlag „KIDS Act" (COM(2026) 681) vom 17.09.2026, offenbar zu sozialen Netzwerken bzw. einem Mindestalter. Das Suchwerkzeug selbst konnte das nicht bestätigen. Die Quelle wirkt wenig verlässlich und ist deshalb nicht im Quellenverzeichnis. Den Status unbedingt klären, denn ein neues EU-Mindestalter oder neue Designpflichten könnten SPIELIQ direkt betreffen.
3. **Einige Hinweise kenne ich nur dem Titel nach:**
   - die DSK-Entschließung „Datenschutz von Kindern" (Datum und Inhalt, D-28);
   - drei Artikel auf dr-datenschutz.de: „Arbeitspapier zum Datenschutz für Kinder veröffentlicht" (https://www.dr-datenschutz.de/arbeitspapier-zum-datenschutz-fuer-kinder-veroeffentlicht/), „Daten von Kindern im unternehmerischen Alltag" und „DSGVO-Informationspflicht: Interessenabwägung bei Daten von Kindern";
   - der DatenTag der Stiftung Datenschutz „Minderjährigen-Datenschutz" vom 21.01.2026 mit einer Präsentation (https://stiftungdatenschutz.org/fileadmin/Redaktion/DatenTag/DatenTag_Minderjaehrigen-DS_21012026/Praesentationen/melzer-datentag-stiftung-datenschutz-minderjaehrige-januar-2026.pdf).

   Diese Dokumente könnten die aktuelle Haltung der deutschen Aufsichtsbehörden zeigen.
4. **Jüngste Gesetzesänderungen sind nicht ausgewertet.** Ich habe den aktuellen Text der relevanten Paragrafen gelesen, aber nicht, was die letzten Änderungsgesetze geändert haben: JuSchG (G v. 6.10.2026), BFSGV (V v. 10.7.2026), TDDDG (G v. 10.3.2026), DDG (G v. 25.3.2026), BDSG und UWG (G v. 12.5.2026), SGB VIII (G v. 23.4.2026).
5. **Die DFB-Quellen sind Verbandspositionen.** D-17 bis D-24 sind keine Behörden- oder Gerichtsauffassungen. Das Merkblatt zum Führungszeugnis von 2017 (D-20) ist bei § 72a Abs. 5 erkennbar veraltet. Das Positionspapier von 2026 (D-21) widerspricht sich leicht: Abschnitt 3.4.3 hält im ambitionierten Jugendfußball das berechtigte Interesse für tragfähig, die Checkliste sagt „U16 eher Einwilligung".
6. **Das Verhältnis von § 24a JuSchG zum DSA ist nicht vertieft geprüft.** Das betrifft die Vollharmonisierung durch den DSA, das Herkunftslandprinzip und die Frage, ob die Liste in § 24a Abs. 2 auch für kleine Plattformen Maßstab ist, für die Art. 28 nach Art. 19 DSA nicht gilt [HW].
7. **Die Altersspanne umfasst Erwachsene.** Die Zielgruppe von 6 bis 19 Jahren schließt 18- und 19-Jährige ein. Für sie entfallen Elternrechte und -einwilligungen; sie brauchen eigene Abläufe und Texte.
8. **Normstand zur Barrierefreiheit unklar.** Ob für den European Accessibility Act eine harmonisierte Norm im Amtsblatt der EU steht (wichtig für die Vermutungswirkung nach § 4 BFSG), konnte ich nicht prüfen. Die Normenliste der Bundesfachstelle Barrierefreiheit (§ 3 BFSGV) war nicht erreichbar.
9. **Nicht geprüfte Rechtsbereiche:** Landesrecht (Schulgesetze, Landesgesetze zur Barrierefreiheit, Landesdatenschutzgesetze für öffentliche Stellen), Jugendmedienschutz-Staatsvertrag und Medienstaatsvertrag (etwa Angaben nach § 18 MStV bei redaktionellen Inhalten [HW]), Steuer- und Gemeinnützigkeitsfragen der Vereine, Urheberrecht an Lerninhalten.
10. **Keine Rechtsprechung zu Lern-Apps in Vereinen.** Gerichtsentscheidungen zu Lern-Apps oder Auswertungen von Lernständen im Vereinssport habe ich weder gefunden noch geprüft; die beiden EuGH-Urteile (D-49, D-50) sind [HW].
11. **Formulierungen bleiben vorläufig.** „Voraussichtlich", „plausibel" und „empfohlen" sind bewusst vorsichtig gewählt. Jede Einordnung, vor allem Rollen, Rechtsgrundlagen, DSA, KI-Verordnung und BFSG-Reichweite, braucht eine anwaltliche Prüfung. Eine Konformitätsaussage enthält dieses Dokument nicht.
