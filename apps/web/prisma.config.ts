import { defineConfig, env } from 'prisma/config'

// Die Prisma-CLI lädt .env nicht selbst. Node ≥ 21 bringt loadEnvFile mit –
// fehlt die Datei (z. B. in CI mit gesetzten Variablen), wird das ignoriert.
try {
  process.loadEnvFile?.('.env')
} catch {
  // keine .env vorhanden
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
})
