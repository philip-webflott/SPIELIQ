# ADR 0005 – PostgreSQL mit Prisma ORM 7

- Status: angenommen · Datum: 29.10.2026

## Kontext
Gewünscht: Prisma mit PostgreSQL oder MySQL. Im Oktober 2026 ist Prisma 8 als Release Candidate verfügbar (npm-Tag `latest` zeigt auf `8.0.0-rc`), `@prisma/client` stabil in 7.10.1.

## Entscheidung
PostgreSQL (JSON-Spalten für Eingaben/Kriterien, Arrays für Hausaufgaben, weit verbreitet bei EU-Hostern) mit Prisma ORM **7.10.1** (neuer `prisma-client`-Generator, Treiberadapter `@prisma/adapter-pg`, `prisma.config.ts`). Wechsel auf Prisma 8 nach dessen stabiler Veröffentlichung.

## Konsequenzen
+ Typsicherer Datenzugriff, Migrationen, keine nativen Query-Engine-Binaries.
− Generierter Client liegt im Repository-Baum (`src/generated`, nicht versioniert) und muss vor Typprüfung erzeugt werden (`prisma generate`).
