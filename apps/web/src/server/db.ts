import 'server-only'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/generated/prisma/client'
import { databaseUrl, poolConfig } from './db-config'

/**
 * Einziger Datenbankzugang der Anwendung. Fachmodule (src/server/modules)
 * bekommen den Client übergeben bzw. importieren ihn hier – Seiten und
 * Komponenten greifen nie direkt auf die Datenbank zu.
 */
function createClient(): PrismaClient {
  const config = poolConfig(databaseUrl(), process.env.DATABASE_CA_CERT)
  return new PrismaClient({ adapter: new PrismaPg(config) })
}

const globalForPrisma = globalThis as unknown as { spieliqPrisma?: PrismaClient }

export const db: PrismaClient = globalForPrisma.spieliqPrisma ?? createClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.spieliqPrisma = db

export type Db = PrismaClient
