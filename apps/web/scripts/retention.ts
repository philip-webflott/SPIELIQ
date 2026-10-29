/**
 * Täglicher Betriebsjob: Speicherfristen anwenden (Regeln in src/server/modules/retention.ts).
 *
 * Aufruf: pnpm --filter @spieliq/web db:retention  (setzt DATABASE_URL voraus)
 * Im Betrieb z. B. einmal pro Nacht per Scheduler des Hosters.
 */
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'
import { applyRetention } from '../src/server/modules/retention'

try {
  process.loadEnvFile?.('.env')
} catch {
  // keine .env
}

const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }) })

applyRetention(db)
  .then((result) => console.log('Speicherfristen angewendet:', result))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
