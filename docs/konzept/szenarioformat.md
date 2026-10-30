# Szenarioformat v1

Stand: 29.10.2026 · Schema: `packages/engine/src/scenario/schema.ts` (zod) · Beispiele: `packages/content/src/missions/`

Ein einziges, datengetriebenes Format für offizielle Lernmissionen und – später – vom Trainer im Editor erstellte Szenarien (Tabelle `CustomScenario`, Feld `data`). Es enthält keine Programmlogik.

## Aufbau einer Mission

| Feld | Pflicht | Bedeutung |
|---|---|---|
| `schemaVersion` | ja | `1` |
| `id`, `version` | ja | eindeutige ID (Kleinbuchstaben, Ziffern, Bindestrich) und Inhaltsversion; Versuche speichern die Version |
| `status` | ja | `draft` · `review` · `approved` · `retired` (Freigabeprozess, siehe Qualitätsstandards) |
| `mode` | – | `learn` (Standard) oder `test` (keine Tipps, keine Musterlösung, keine Live-Passwege) |
| `role` | – | `intro` · `practice` · `transfer` · `test` – Transfer/Test zählen als Evidenz für „digital verstanden“ |
| `title`, `goal`, `coachNote` | ja/ja/– | Texte (`{ de: "…" }`, weitere Sprachen optional) |
| `principles`, `competencies` | ja | Verweise auf Prinzipien (`P-…`) und Kompetenzen (`K-…`) |
| `ageGroups`, `level`, `estimatedMinutes` | ja | Altersrahmen (G–A), Kompetenzniveau 1–5, Dauer |
| `prerequisites` | – | empfohlene vorherige Missionen |
| `sources` | – | Quellen-IDs aus `docs/recherche/` |
| `review` | – | wer/wann fachlich geprüft hat |
| `pitch`, `view` | ja/– | Spielfeld (Großfeld, Kleinfeld, Minitore) und sichtbarer Ausschnitt in Metern |
| `teams` | ja | Angriffsrichtung von `own` und `opp` |
| `motion` | – | Altersprofil des Bewegungsmodells (Standard U15) |
| `board` | ja | Ausgangssituation: Spieler (`id`, `team`, `pos`, `label`, `role`) und Ball (`ownerId` oder `pos`) |
| `steps` | ja | Abfolge der Schritte (s. u.) |
| `fieldTransfer` | – | passende Spielformen (`D-…`) und eine Aufgabe fürs nächste Training |

## Schritte

Jeder Schritt hat `id`, eine kurze `instruction` (≤ 140 Zeichen, Test prüft das), optional eine neue `board`-Situation und einen eigenen `view`. Ohne `board` setzt der Schritt die vorherige Situation fort (nach einer Platzierungsaufgabe: mit der Musterlösung – damit ist der Ablauf unabhängig von Spielereingaben deterministisch).

| Art | Zweck | Wichtige Felder |
|---|---|---|
| `film` | Erklärfilm vor den Aufgaben: kurze Abschnitte mit Bewegung und gesprochenem Text | `segments` (1–6; Content-Test verlangt 3–5): je `text` (höchstens zwei Sätze, ≤ 120 Zeichen, wird vorgelesen), optional `board` (neue Situation), `script`, `overlays` (erscheinen, wenn die Bewegung fertig ist) |
| `watch` | Situation beobachten (Animation) | `script` (Ereignisse), `after` (Erklärung + Overlays am Ende) |
| `explain` | Lösung/Prinzip zeigen | `text`, `keyPoints` (≤ 3), optional `script` |
| `identify` | Spieler oder Punkt antippen | `target`, `selectable` |
| `place` | Spieler positionieren | `controlled`, `area`, `solution`, `liveLanes`, `guide` (Schritt-für-Schritt-Anleitung: je Teilschritt ein kurzer Satz, Aufgaben statt fester Spieler; reine Bedienhilfe, siehe [Einfach verstehen](../design/einfach-verstehen.md)) |
| `choose` | Entscheidung zwischen 2–4 Optionen | `options` |

Interaktive Schritte (`identify`, `place`, `choose`) haben zusätzlich:
- `assessment`: Kriterienliste (siehe [Engine](engine.md), 6.1), Schwellen, `alternatives`
- `feedback`: Überschriften je Wertung, `hints` (≤ 3, gestuft), `consequence` (`auto`, `none` oder eigenes Skript)
- `examples`: **Pflicht** – Beispiele für richtig und falsch mit erwarteter Wertung (Content-Tests)
- `timeLimit` (optional, für spätere Aufgaben unter Zeitdruck; muss abschaltbar sein – WCAG 2.2.1)

### Skript-Ereignisse

```ts
{ type: 'move',    player: 'd3', to: { x: 33.6, y: 54.2 }, at: 0.3, duration: 1.5 }
{ type: 'dribble', player: 'o9', to: { x: 32, y: 57 }, at: 0, duration: 1.6 }
{ type: 'pass',    from: 'o6', to: 'o7', at: 0.6, speed: 17 }
{ type: 'shot',    player: 'o7', target: { x: 0, y: 34 }, at: 2.1 }
```

### Overlays (didaktische Ebenen)

`lane`, `passOptions`, `freeSpace`, `shadow`, `zone`, `arrow`, `ring`, `distance`, `label`, `emptyArea`. Passweg-Status und Freiraum werden **live berechnet**, nicht vom Autor behauptet.

## Beispiel (gekürzt, Mission 3)

```ts
{
  kind: 'place',
  instruction: { de: 'Nummer 3 geht zum Ball. Wo hilft Nummer 4? Zieh ihn hin.' },
  controlled: ['d4'],
  assessment: {
    criteria: [
      { id: 'absichern', kind: 'cover', params: { cover: 'd4', first: 'd3' }, required: true, weight: 3, principle: 'P-ABSICHERN' },
      { id: 'rechtzeitig', kind: 'reachInTime', params: { defender: 'd4', target: 'o10' }, required: true, weight: 2, principle: 'P-ABSICHERN' },
      { id: 'nicht-beide', kind: 'crowding', params: { radius: 3.5, max: 1 }, weight: 1, principle: 'P-NICHT-ALLE' },
    ],
    alternatives: [{ id: 'nummer-10-eng-decken', explanation: { de: 'Auch möglich: …' }, criteria: [/* … */] }],
  },
  solution: { d4: { x: 21, y: 48 } },
  examples: [
    { name: 'Musterlösung', positions: { d4: { x: 21, y: 48 } }, expect: 'excellent' },
    { name: 'Viel zu tief', positions: { d4: { x: 8, y: 38 } }, expect: 'not-yet', expectFeedback: 'cover.tooFar' },
  ],
}
```

## Varianten und Transfer

`mirrorMission` spiegelt eine Mission an der Längsachse (andere Spielfeldseite). Alle Geometrie bleibt erhalten; die Content-Tests prüfen, dass die Bewertung identisch ist. Weitere Variationsarten (Verschiebungen, andere Gegnerverteilungen) werden mit der Lösbarkeitssuche abgesichert.

## Versionierung und Freigabe

- Inhaltliche Änderungen erhöhen `version`; gespeicherte Versuche behalten ihre Version.
- Nur `approved` darf im Echtbetrieb ohne Hinweis ausgespielt werden; `review` ist im Prototyp sichtbar (derzeit alle Missionen).
- `schemaVersion` steigt nur bei inkompatiblen Formatänderungen; dann wird eine Migration ergänzt.
