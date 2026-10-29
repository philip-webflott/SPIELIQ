import { db } from '@/server/db'

/** Leert alle Tabellen der Testdatenbank (nur TEST_DATABASE_URL, siehe setup-env.ts). */
export async function resetTestDatabase() {
  if (process.env.DATABASE_URL !== process.env.TEST_DATABASE_URL) throw new Error('Nur gegen die Testdatenbank erlaubt.')
  const tables = await db.$queryRaw<{ tablename: string }[]>`SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename <> '_prisma_migrations'`
  if (tables.length === 0) return
  const list = tables.map((t) => `"public"."${t.tablename}"`).join(', ')
  await db.$executeRawUnsafe(`TRUNCATE TABLE ${list} RESTART IDENTITY CASCADE`)
}

export { db }
