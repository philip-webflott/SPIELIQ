// Integrationstests laufen ausschließlich gegen die separate Testdatenbank.
try {
  process.loadEnvFile?.('.env')
} catch {
  // keine .env – Variablen kommen aus der Umgebung (CI)
}
const testUrl = process.env.TEST_DATABASE_URL
if (!testUrl) throw new Error('TEST_DATABASE_URL fehlt – Integrationstests brauchen eine eigene Testdatenbank.')
if (testUrl === process.env.DATABASE_URL) throw new Error('TEST_DATABASE_URL darf nicht die Entwicklungsdatenbank sein.')
process.env.DATABASE_URL = testUrl
