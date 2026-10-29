# Produktkonzept (Phase B – Vorbereitung)

Stand: 29.10.2026 · Status: Entwurf zur Abstimmung

## 1. Vision

> Ein Spieler, der vorher ständig dem Ball hinterhergelaufen ist, versteht danach, **warum** er sich anders positionieren muss – und zeigt es auf dem Platz.

SPIELIQ macht Spielverständnis **sichtbar, erlebbar und übbar**: kurze Situationen, eigene Entscheidungen, sofortige Ursache-Wirkung-Rückmeldung, Transfer ins Training. SPIELIQ ergänzt das Training (DFB: Nettospielzeit in kleinen Spielformen, A-87) und ersetzt es nicht.

**Positionierung:** Die DFB-Plattform MEIN FUSSBALL (seit 21.10.2026) richtet sich vor allem an Trainer:innen und Vereine, mit einem Spieler-Bereich „Eigentraining“ (A-73, A-101). SPIELIQ besetzt den interaktiven, kognitiv-taktischen Teil für Spieler:innen selbst und verknüpft ihn mit dem Trainer. (Inhalte von MEIN FUSSBALL konnten nicht geprüft werden – Wettbewerbsanalyse offen.)

## 2. Zielgruppen

| Gruppe | Bedürfnis | Was SPIELIQ bietet |
|---|---|---|
| Jugendspieler:in 10–19 (Start: C-Jugend) | verstehen, besser werden, Spaß, keine Bloßstellung | Missionen, sichtbarer Fortschritt, kein Ranking |
| Jugendtrainer:in Amateurverein | wenig Zeit, heterogene Mannschaft, Defizite gezielt angehen | Hausaufgaben, Lernstand, Problemfelder, passende Spielformen |
| Fußballschule | viele Trainer, individuelle Lernpfade | Organisation mit mehreren Teams, Lernniveaus, Zuweisung an Einzelne |
| Nachwuchsleistungszentrum | komplexe Situationen, eigene Spielprinzipien | Editor, eigene Szenarien, höhere Stufen (geplant) |
| Privater Spieler (16+) | selbstständig lernen | Gastmodus, später Einzelkonto (geplant, rechtlich zu prüfen) |
| Trainerausbildung | Prinzipien erklären | Präsentationsmodus/Editor (geplant) |

## 3. Rollen und Rechte

| Rolle | Darf | Darf nicht |
|---|---|---|
| Spieler:in | Missionen spielen, eigenen Fortschritt sehen, Daten exportieren/löschen | andere Spieler sehen, Nachrichten senden |
| Co-Trainer:in | Team-Lernstand sehen, Hausaufgaben, Beobachtungen | fremde Teams sehen |
| Cheftrainer:in | + Teamcode erstellen, Spieler verwalten, Passwort zurücksetzen | fremde Organisationen |
| Vereins-Admin (Owner/Admin) | Mannschaften anlegen/löschen, alle Teams der Organisation | andere Organisationen |
| Plattform-Admin | Betrieb, Inhalte freigeben (geplant) | Lernstände einsehen ohne Anlass |

## 4. User Journeys (umgesetzt im vertikalen Schnitt)

1. **Trainer:in startet:** Registrieren (Verein, Mannschaft, Altersklasse) → Teamcode erstellen (bei U16-Teams mit Bestätigung der Einwilligungen) → Code teilen.
2. **Spieler:in tritt bei:** Teamcode + Spitzname + Passwort → generierter Anmeldename → Start.
3. **Spieler:in lernt:** „Training starten“ → Mission (Zuschauen, Entscheiden, Feedback, Konsequenz) → Zusammenfassung mit Platz-Aufgabe.
4. **Trainer:in steuert:** Lernstand-Matrix → „Wo es noch hakt“ → Spielform fürs Training → Hausaufgabe vergeben → Beobachtung „auf dem Platz angewendet“ eintragen.
5. **Ohne Konto:** `/try` – alles spielbar, nichts gespeichert.

## 5. Informationsarchitektur

```
/                    Start (öffentlich)
/try                 Ausprobieren (Gastmodus) → /try/[mission]
/login /join /register
/play                Spieler: Start (nächste Mission, Hausaufgabe, Lerneinheit)
  /play/unit/[id]    Levelübersicht (Pfad)
  /play/mission/[id] Mission (Vollbild)
  /play/progress     Kompetenzbaum mit drei Zuständen
/coach               Trainer: Mannschaften
  /coach/team/[id]   Lernstand, Teamcode, Problemfelder, Vorschläge
    …/assignments    Hausaufgaben (+ Bericht je Aufgabe)
    …/player/[id]    Spieler-Detail, Beobachtungen, Lernniveau, Konto
  /coach/drills      Spielformen für den Platz
/account             Profil, Datenexport, Konto löschen
/privacy /privacy/kids /imprint
```

## 6. Gamification-Konzept (Leitplanken)

Erlaubt und geplant: sichtbarer persönlicher Fortschritt (Kompetenzbaum, Prinzipien „sicher“), freischaltbare Lernwelten nach Verständnis, Mannschaftsziele, Abzeichen für verstandene Prinzipien (nicht für Klickmengen), Wiederholungsaufgaben.
Ausgeschlossen: öffentliche/teaminterne Ranglisten zwischen Kindern, Streak-Druck, nächtliche Pushs, Lootbox-artige Belohnungen, In-App-Käufe für Kinder, XP-Inflation (Begründung: Recherche C zu Motivation, Recherche D zu § 10b JuSchG und manipulativen Designmustern).

## 7. Trainer-Funktionen

| Funktion | v1 | geplant |
|---|---|---|
| Mannschaft, Altersklasse, Teamcode, Spieler entfernen, Passwort zurücksetzen | ✓ | Co-Trainer einladen, Übergabe |
| Lernstand-Matrix, Problemfelder, Spielform-Vorschläge | ✓ | Verlauf über Zeit, Export für Trainergespräch |
| Hausaufgaben mit Termin, Zeit, Zielgruppe, Bericht | ✓ | Erinnerungen (ohne Druck), Vorlagen |
| Unterscheidung bearbeitet / digital verstanden / auf dem Platz | ✓ | Beobachtungsbogen fürs Training (mobil) |
| Lernniveau je Spieler | ✓ | individuelle Lernpfade |
| Taktik-Editor (gleiches Format, gleiche Engine) | Datenmodell ✓ | Editor-UI, Freigabe im Verein |

## 8. Priorisierung (MoSCoW für die nächsten Releases)

- **Must:** fachliche Freigabe Einheit 1; Kalibrierung der Schwellen; Pilot mit der C-Jugend; rechtliche Prüfung und Datenschutzdokumente; Einheiten 2–3 (Anbieten/Freilaufen in Bewegung, Schulterblick).
- **Should:** Editor (Positionen, Bewegungen, Kriterien aus Bausteinen), Lernpfade je Spieler, Offline-Fähigkeit (PWA), englische Oberfläche vorbereitet.
- **Could:** Vorlesen mit lokalen Stimmen ausbauen, Präsentationsmodus fürs Kabinengespräch, Spielerperspektive (Ego-Sicht).
- **Won't (vorerst):** Chats, öffentliche Profile, Videoupload, KI-generierte Bewertungen.

Roadmap: siehe [Entwicklungsplan](../entwicklungsplan.md).
