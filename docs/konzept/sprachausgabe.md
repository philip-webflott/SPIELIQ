# Sprachausgabe (Vorlesen mit KI-Stimme)

Stand: 30.10.2026 · Code: `packages/content/src/speech.ts` (welche Texte), `apps/web/scripts/voice.ts` (Vertonung), `apps/web/src/features/voice/` (Abspielen)

## 1. Warum

Ein Teil der Zielgruppe liest mühsam (Rückmeldung des Produktverantwortlichen, siehe [Einfach verstehen](../design/einfach-verstehen.md)). Gesprochener Text zur laufenden Animation entlastet das Lesen. Belege und ihre Grenzen: Register C, C-71 (Modalitätseffekt; Prüfstatus dort). Die konkrete Gestaltung (automatisch an, etwas langsamer als normal) ist eine **Annahme** und wird im Test mit Kindern geprüft.

Entscheidung des Produktverantwortlichen (30.10.2026): KI-Stimme über **ElevenLabs**.

## 2. Wie es funktioniert

```
Missionstexte ──► speechCatalog() ──► pnpm voice ──► ElevenLabs (einmalig) ──► public/voice/clips/*.mp3
 (content)        alle vorlesbaren      fehlende        nur feste Lerntexte        + public/voice/manifest.json
                  Abschnitte            Abschnitte
                                                        App: Text → Aufnahme abspielen, sonst Gerätestimme
```

- **Vorab erzeugt, nicht live:** Alle vorlesbaren Texte stehen vorher fest. Das Skript vertont sie einmal; die App spielt danach nur Dateien von unserem eigenen Server ab. Die App spricht nie mit ElevenLabs, braucht keinen Schlüssel und sendet keine Eingaben von Kindern.
- **Abschnitte:** Ein Abschnitt ist genau ein Textblock, den der Bildschirm zeigt (Anweisung, Teilschritt, Hilfe, Überschrift, Begründung, Folge). Eine Rückmeldung wird als Folge von Abschnitten vorgelesen: zuerst die Folge („Der Gegner fängt den Ball ab.“), dann Überschrift, Begründung und höchstens ein Lob (`feedbackSpeech`).
- **Sätze mit Spielernummern:** Rückmeldungen wie „Nummer 7 steht zu nah am Ball.“ entstehen aus Vorlagen. Weil jede Mission feste Spieler hat, ist die Menge möglicher Sätze endlich: Platzhalter werden mit den Nummern im jeweiligen Schritt aufgefüllt, bei zwei Spielern mit allen Paaren einer Mannschaft. Ein Content-Test (`packages/content/test/speech.test.ts`) spielt Beispiele, Musterlösung und viele Zufallsantworten durch und prüft, dass jede Rückmeldung im Katalog steht. (Dabei fiel ein Fehler auf: Ein Satz zeigte „Nummer {target}“ statt der Nummer – behoben.)
- **Dateinamen = Inhaltsadresse:** Name aus Hash von Text und Stimmeinstellungen. Ändert sich ein Text oder die Stimme, entsteht eine neue Datei; alte Dateien räumt `--prune` weg. Die Dateien dürfen deshalb im Browser dauerhaft zwischengespeichert werden (`Cache-Control: immutable`).
- **Abspielen:** Gibt es für alle Abschnitte eine Aufnahme, spielt die App sie nacheinander mit kurzer Pause. Sonst liest eine lokal installierte deutsche Gerätestimme (wie bisher, Text verlässt das Gerät nicht). Gibt es beides nicht, erscheint kein Vorlese-Knopf. Blockiert der Browser Ton vor der ersten Berührung, wird bei der ersten Berührung nachgeholt.
- **Automatisch vorlesen:** an, sobald Aufnahmen vorhanden sind; Schalter „Vorlesen“ im Kopf jeder Mission. Die Einstellung gilt nur für die laufende Mission und wird nicht gespeichert. Vorgelesen werden: Anweisung (mit erstem Teilschritt und Bedienhinweis), jeder neue Teilschritt, jede angeforderte Hilfe, die gewählte Antwort bei Auswahlaufgaben, die Rückmeldung nach der Folge-Animation.
- **Kennzeichnung:** Neben dem Schalter steht „KI-Stimme“, der Tooltip sagt „die Stimme ist mit KI erzeugt“. ElevenLabs bettet nach eigenen Angaben ein unhörbares Wasserzeichen in erzeugtes Audio ein ([Hilfeseite](https://elevenlabs.io/docs/help-center/legal/audio-detector/what-is-watermarking-and-why-is-eleven-labs-using-it), abgerufen 30.10.2026). Rechtliche Einordnung: Abschnitt 5.

Umfang heute: 230 Abschnitte mit zusammen rund 10 500 Zeichen (`pnpm voice --dry-run` zeigt den aktuellen Stand).

## 3. Einrichtung (einmalig, durch den Produktverantwortlichen)

1. **Bezahlten ElevenLabs-Tarif wählen.** Laut ElevenLabs enthält der kostenlose Tarif keine kommerzielle Lizenz und verlangt Namensnennung; bezahlte Tarife enthalten eine kommerzielle Lizenz, außer für Inhalte aus Beta-Diensten ([Hilfeseite](https://elevenlabs.io/docs/help-center/legal/can-i-publish-the-content-i-generate-on-the-platform), abgerufen 30.10.2026). Aufnahmen, die während eines bezahlten Abos entstehen, dürfen danach laut dieser Seite unbefristet genutzt werden.
2. **Datennutzung abschalten:** Im Konto unter *Terms and privacy → Data use* den Schalter „Improve the models for everyone“ ausschalten ([Hilfeseite](https://elevenlabs.io/docs/help-center/legal/is-my-data-used-to-improve-eleven-labs-ai-models), abgerufen 30.10.2026). Gesendet werden zwar nur feste Lerntexte, aber so bleiben auch diese außerhalb des Trainings.
3. **Stimme wählen:** eine ruhige, freundliche deutsche Stimme (keine nachgemachte reale Person, keine Stimme eines Kindes). Bei Stimmen aus der Voice Library deren Nutzungsbedingungen prüfen. Die **Voice-ID** notieren.
4. **API-Schlüssel anlegen** mit Beschränkung auf Text to Speech und einem Zeichenlimit (ElevenLabs bietet Schlüssel mit Bereichs- und Kontingentbeschränkung an, [Authentifizierung](https://elevenlabs.io/docs/api-reference/authentication), abgerufen 30.10.2026). Den Schlüssel nie in den Chat, in Dateien oder in Vercel eintragen.
5. **Schlüssel hinterlegen**, je nachdem, wo vertont wird:
   - *in der Cloud-Entwicklungsumgebung:* Umgebungsmenü in der Titelleiste der Sitzung → *Edit* → Abschnitt für Secrets bzw. Umgebungsvariablen: `ELEVENLABS_API_KEY` und `ELEVENLABS_VOICE_ID`. Eine neue Sitzung übernimmt die Werte.
   - *lokal:* in `apps/web/.env` (wird nicht eingecheckt, Vorlage `.env.example`).
6. **Vertonen:**
   ```bash
   pnpm voice --dry-run
   ```
   ```bash
   pnpm voice --limit=5
   ```
   (fünf Aufnahmen zum Anhören in `apps/web/public/voice/clips/`), dann alle:
   ```bash
   pnpm voice
   ```
   Danach `apps/web/public/voice/` committen; Vercel liefert die Dateien mit aus.

Einstellungen (optional, Umgebungsvariablen): `ELEVENLABS_MODEL_ID` (Standard `eleven_v4`; laut [Modellübersicht](https://elevenlabs.io/docs/overview/models), abgerufen 30.10.2026, unterstützt es Deutsch), `ELEVENLABS_SPEED` (Standard 0,9 – Annahme), `ELEVENLABS_STABILITY` (0,6), `ELEVENLABS_SIMILARITY` (0,75), `ELEVENLABS_STYLE` (0), `ELEVENLABS_SEED` (1, möglichst gleichbleibende Ergebnisse), `ELEVENLABS_OUTPUT_FORMAT` (`mp3_44100_64`), `ELEVENLABS_API_BASE` (Standard `https://api.elevenlabs.io`; ElevenLabs nennt auch Server mit EU-Datenhaltung). Jede Änderung der Stimme oder Einstellungen vertont alle Texte neu.

Neue oder geänderte Missionstexte: `pnpm voice` erzeugt nur die fehlenden Abschnitte; bis dahin liest die Gerätestimme.

## 4. Datenschutz

- An ElevenLabs gehen ausschließlich feste Lerntexte aus dem Code, einmalig beim Vertonen durch das Team. Keine Namen, keine Eingaben, keine Nutzungsdaten, keine Kennungen.
- Zur Laufzeit gibt es keinen Kontakt zu ElevenLabs. Audiodateien kommen vom eigenen Server (CSP `media-src 'self'`).
- Keine neue Speicherung im Browser: Die Einstellung „Vorlesen“ wird nicht gespeichert; Aufnahmen landen wie andere statische Dateien im Browser-Cache, ohne Kennung.
- Damit verarbeitet ElevenLabs keine personenbezogenen Daten der Nutzer:innen; ein Auftragsverarbeitungsvertrag ist dafür nicht nötig (eigene Einschätzung, keine Rechtsberatung). Eintrag im [Datenschutzkonzept](../recht/datenschutzkonzept.md), Abschnitte 2 und 8.

## 5. KI-Kennzeichnung (rechtliche Einordnung, vorläufig)

Die KI-Verordnung (VO (EU) 2024/1689, Register D, D-41) enthält in Art. 50 Transparenzpflichten für synthetische Inhalte. Die Einordnung für vorab erzeugte Vorlese-Audios (Pflichten des Anbieters des KI-Systems vs. des Betreibers, Ausnahmen, Geltungsbeginn) steht in D-41; sie ist keine Rechtsberatung und vor dem Echtbetrieb rechtlich zu prüfen. Unabhängig davon kennzeichnet SPIELIQ die Stimme sichtbar als KI-Stimme.

## 6. Offen

1. Stimme mit Kindern der Zielgruppe testen: Tempo, Verständlichkeit, wird automatisches Vorlesen als hilfreich oder störend empfunden?
2. Erklärfilme: gleiche Pipeline, zusätzlich Zeitmarken je Wort (`/with-timestamps` liefert sie), um Animation und Sprache zu synchronisieren und mitlaufenden Text hervorzuheben.
3. Zusammenfassung am Missionsende und Startseite vorlesen.
4. Englische Fassung: eigener Katalog je Sprache, sobald es englische Inhalte gibt.
