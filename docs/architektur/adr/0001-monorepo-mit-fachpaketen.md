# ADR 0001 – Monorepo mit getrennten Fachpaketen

- Status: angenommen · Datum: 29.10.2026

## Kontext
Der Auftrag verlangt eine modulare Trennung (Szenariomodell, Simulation, Bewertung, Rendering, Inhalte, Verwaltung). Die Bewertungsengine muss auf Client (sofortiges Feedback) und Server (manipulationssichere Speicherung) identisch laufen und darf nicht von der Darstellung abhängen.

## Entscheidung
pnpm-Workspaces mit vier Paketen: `@spieliq/engine` (reine Fachlogik), `@spieliq/content` (Lerninhalte als Daten), `@spieliq/pitch` (SVG-Rendering, React) und `apps/web` (Next.js). Pakete werden als TypeScript-Quellen eingebunden (`transpilePackages`), ohne eigenen Build-Schritt. ESLint verbietet unerwünschte Abhängigkeiten.

## Konsequenzen
+ Erzwingbare Grenzen, Engine einzeln test- und wiederverwendbar (Editor, spätere native App, Analysewerkzeuge).
+ Kein zusätzliches Build-Tool (kein Turborepo nötig) – geringe Komplexität.
− Workspace-Konfiguration (pnpm, tsconfig je Paket) muss gepflegt werden.
