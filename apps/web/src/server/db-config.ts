/**
 * Verbindungsdaten der Datenbank – gemeinsam für App, Seed und Betriebsjobs
 * (ohne 'server-only', damit Skripte und Tests sie nutzen können).
 *
 * Unterstützte Variablen, in dieser Reihenfolge:
 * - DATABASE_URL (lokal und bei manueller Einrichtung)
 * - POSTGRES_URL (von der Supabase-Integration in Vercel gesetzt, Pooler-Verbindung)
 */
const RUNTIME_URL_VARIABLES = ['DATABASE_URL', 'POSTGRES_URL'] as const

export function databaseUrl(env: Record<string, string | undefined> = process.env): string {
  for (const name of RUNTIME_URL_VARIABLES) {
    const value = env[name]
    if (value) return value
  }
  throw new Error('Keine Datenbankverbindung konfiguriert (DATABASE_URL oder POSTGRES_URL).')
}

export interface DbPoolConfig {
  readonly connectionString: string
  readonly ssl?: boolean | { readonly rejectUnauthorized?: boolean; readonly ca?: string }
}

/**
 * Übersetzt `sslmode` wie libpq: `require` verschlüsselt, prüft das Zertifikat
 * aber nicht; `verify-ca`/`verify-full` prüfen. Liegt ein CA-Zertifikat vor
 * (DATABASE_CA_CERT, bei Supabase unter „SSL Configuration“ herunterladbar),
 * wird immer geprüft. Supabase-Hosts werden ohne Angabe verschlüsselt verbunden.
 */
export function poolConfig(connectionString: string, caCert?: string): DbPoolConfig {
  let url: URL
  try {
    url = new URL(connectionString)
  } catch {
    return { connectionString }
  }
  const isSupabase = /\.supabase\.(co|com)$/.test(url.hostname)
  const sslmode = url.searchParams.get('sslmode') ?? (isSupabase ? 'require' : null)
  if (!sslmode && !caCert) return { connectionString }
  url.searchParams.delete('sslmode')
  const cleaned = url.toString()
  if (caCert) return { connectionString: cleaned, ssl: { ca: caCert.replace(/\\n/g, '\n') } }
  if (sslmode === 'disable') return { connectionString: cleaned, ssl: false }
  if (sslmode === 'verify-ca' || sslmode === 'verify-full') return { connectionString: cleaned, ssl: true }
  return { connectionString: cleaned, ssl: { rejectUnauthorized: false } }
}
