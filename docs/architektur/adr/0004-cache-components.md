# ADR 0004 – Next.js 16 mit Cache Components und Partial Prefetching

- Status: angenommen · Datum: 29.10.2026

## Kontext
Next.js 16 empfiehlt für neue Apps `cacheComponents` und `partialPrefetching`; beide sollen in der nächsten Hauptversion Standard werden. Fast alle SPIELIQ-Seiten sind personalisiert.

## Entscheidung
Beides aktiviert. Sitzungszugriffe erfolgen in Komponenten innerhalb von `<Suspense>`; `getCurrentUser` ruft `connection()` auf, weil die Sitzungsprüfung zeitabhängig ist. Öffentliche Seiten und Gastmissionen werden statisch vorgerendert.

## Konsequenzen
+ Zukunftssicher, schnelle statische Hüllen und Streaming.
− Mehr Disziplin beim Schreiben von Seiten (Suspense-Grenzen, kein `new Date()` vor Laufzeitdaten). Eine Nonce-basierte CSP ist schwieriger (siehe Sicherheit).
