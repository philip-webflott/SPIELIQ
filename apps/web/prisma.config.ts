import { defineConfig, env } from 'prisma/config'

// Die Prisma-CLI lädt .env nicht selbst. Node ≥ 21 bringt loadEnvFile mit –
// fehlt die Datei (z. B. in CI mit gesetzten Variablen), wird das ignoriert.
try {
  process.loadEnvFile?.('.env')
} catch {
  // keine .env vorhanden
}

// Migrationen brauchen eine Verbindung ohne Transaktions-Pooler (Supabase:
// Session-Pooler, Port 5432). Die Anwendung selbst nutzt DATABASE_URL bzw.
// POSTGRES_URL (src/server/db-config.ts). POSTGRES_URL_NON_POOLING setzt die
// Supabase-Integration in Vercel.
const migrationUrlVariable =
  ['DIRECT_URL', 'POSTGRES_URL_NON_POOLING', 'DATABASE_URL'].find((name) => process.env[name]) ?? 'DATABASE_URL'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env(migrationUrlVariable),
  },
})
