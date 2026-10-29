# ADR 0006 – TypeScript 6.0 statt 7.0

- Status: angenommen · Datum: 29.10.2026

## Kontext
TypeScript 7.0 (nativer Compiler) ist veröffentlicht. typescript-eslint unterstützt laut Peer-Abhängigkeit nur `>= 4.8.4 < 6.1.0`; eslint-config-next baut darauf auf.

## Entscheidung
TypeScript 6.0.3 mit strengen Optionen (`strict`, `noUncheckedIndexedAccess`, `verbatimModuleSyntax`). Wechsel auf TS 7, sobald das Linting-Ökosystem kompatibel ist.

## Konsequenzen
+ Vollständige Lint-Unterstützung (inkl. React-Hooks-Regeln).
− Geschwindigkeitsvorteile des nativen Compilers vorerst nicht genutzt.
