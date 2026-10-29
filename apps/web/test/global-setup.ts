import { execSync } from 'node:child_process'

/** Bringt das Schema der Testdatenbank auf den aktuellen Stand (nicht-destruktiv: migrate deploy). */
export default function setup() {
  try {
    process.loadEnvFile?.('.env')
  } catch {
    // keine .env
  }
  const url = process.env.TEST_DATABASE_URL
  if (!url) throw new Error('TEST_DATABASE_URL fehlt')
  // Alle Variablen, die prisma.config.ts für Migrationen auswerten kann, auf die Testdatenbank setzen.
  execSync('npx prisma migrate deploy', {
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: url, DIRECT_URL: url, POSTGRES_URL_NON_POOLING: url },
  })
}
