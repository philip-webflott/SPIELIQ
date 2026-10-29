import { describe, expect, it } from 'vitest'
import { databaseUrl, poolConfig } from '@/server/db-config'

/** Verbindungsdaten: Variablen-Reihenfolge und SSL wie bei libpq. */
describe('Datenbankverbindung', () => {
  it('nimmt DATABASE_URL vor POSTGRES_URL (Supabase-Integration in Vercel)', () => {
    expect(databaseUrl({ DATABASE_URL: 'postgresql://a', POSTGRES_URL: 'postgresql://b' })).toBe('postgresql://a')
    expect(databaseUrl({ POSTGRES_URL: 'postgresql://b' })).toBe('postgresql://b')
    expect(() => databaseUrl({})).toThrow(/DATABASE_URL/)
  })

  it('lässt lokale Verbindungen ohne sslmode unverändert', () => {
    const url = 'postgresql://spieliq:spieliq@localhost:5432/spieliq?schema=public'
    expect(poolConfig(url)).toEqual({ connectionString: url })
  })

  it('verschlüsselt bei sslmode=require ohne Zertifikatsprüfung (wie libpq) und entfernt den Parameter', () => {
    const config = poolConfig('postgres://u:p@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x')
    expect(config.ssl).toEqual({ rejectUnauthorized: false })
    expect(config.connectionString).not.toContain('sslmode')
    expect(config.connectionString).toContain('supa=base-pooler.x')
  })

  it('verschlüsselt Supabase-Verbindungen auch ohne sslmode', () => {
    expect(poolConfig('postgres://u:p@aws-0-eu-central-1.pooler.supabase.com:5432/postgres').ssl).toEqual({ rejectUnauthorized: false })
  })

  it('prüft das Zertifikat bei verify-full oder mit CA-Zertifikat', () => {
    expect(poolConfig('postgres://u:p@db.example.org/x?sslmode=verify-full').ssl).toBe(true)
    const withCa = poolConfig('postgres://u:p@db.example.org/x?sslmode=require', '-----BEGIN CERTIFICATE-----\\nABC\\n-----END CERTIFICATE-----')
    expect(withCa.ssl).toEqual({ ca: '-----BEGIN CERTIFICATE-----\nABC\n-----END CERTIFICATE-----' })
  })

  it('schaltet SSL bei sslmode=disable ab', () => {
    expect(poolConfig('postgres://u:p@localhost/x?sslmode=disable').ssl).toBe(false)
  })
})
