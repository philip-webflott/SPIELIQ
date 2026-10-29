# ADR 0008 – Offizielle Inhalte versioniert im Code, Trainer-Szenarien in der Datenbank

- Status: angenommen · Datum: 29.10.2026

## Kontext
Offizielle Missionen brauchen Review, Versionierung, automatische Qualitätsprüfungen und Quellenangaben. Ein CMS mit Datenbank würde diese Prüfungen erschweren; Trainer:innen sollen später eigene Szenarien anlegen.

## Entscheidung
Offizielle Inhalte liegen als typisierte Daten in `@spieliq/content` (Git-Historie = Änderungsprotokoll, Review per Pull Request, CI-Content-Tests als Freigabe-Gate). Szenarien aus dem künftigen Editor werden im selben Format in `CustomScenario` gespeichert und zur Laufzeit mit demselben Schema validiert.

## Konsequenzen
+ Höchste Qualitätssicherung für offizielle Inhalte, keine Datenbank-Abfrage zum Laden.
− Inhaltsänderungen brauchen ein Deployment; für Redakteure ohne Git-Kenntnisse ist später eine Redaktionsoberfläche nötig, die Pull Requests erzeugt.
