import { randomBytes, scrypt as scryptCallback, timingSafeEqual, type ScryptOptions } from 'node:crypto'

/**
 * Passwort-Hashing mit scrypt (Node.js-Bordmittel, keine nativen Zusatzpakete).
 * Parameter: N = 2^16, r = 8, p = 1 (≈ 64 MiB Speicher je Hash).
 * Format: scrypt$<log2N>$<r>$<p>$<salt base64>$<hash base64>
 */
const LOG_N = 16
const R = 8
const P = 1
const KEY_LENGTH = 32
const MAX_MEMORY = 160 * 1024 * 1024

function scrypt(password: string, salt: Buffer, keyLength: number, options: ScryptOptions): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCallback(password, salt, keyLength, options, (err, key) => (err ? reject(err) : resolve(key)))
  })
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16)
  const key = await scrypt(password.normalize('NFKC'), salt, KEY_LENGTH, { N: 2 ** LOG_N, r: R, p: P, maxmem: MAX_MEMORY })
  return ['scrypt', LOG_N, R, P, salt.toString('base64'), key.toString('base64')].join('$')
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split('$')
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false
  const [, logN, r, p, saltB64, keyB64] = parts as [string, string, string, string, string, string]
  const expected = Buffer.from(keyB64, 'base64')
  const key = await scrypt(password.normalize('NFKC'), Buffer.from(saltB64, 'base64'), expected.length, {
    N: 2 ** Number(logN),
    r: Number(r),
    p: Number(p),
    maxmem: MAX_MEMORY,
  })
  return key.length === expected.length && timingSafeEqual(key, expected)
}

/** Gleicht die Laufzeit an, wenn ein Konto nicht existiert (erschwert das Ausspähen von Konten). */
let dummyHash: Promise<string> | null = null
export async function burnPasswordCheck(password: string): Promise<void> {
  dummyHash ??= hashPassword('spieliq-dummy-password')
  await verifyPassword(password, await dummyHash)
}

export interface PasswordRules {
  readonly minLength: number
}

export const PLAYER_PASSWORD_RULES: PasswordRules = { minLength: 8 }
export const ADULT_PASSWORD_RULES: PasswordRules = { minLength: 10 }

export function checkPassword(password: string, rules: PasswordRules): string | null {
  if (password.length < rules.minLength) return `Das Passwort braucht mindestens ${rules.minLength} Zeichen.`
  if (password.length > 200) return 'Das Passwort ist zu lang.'
  if (/^(.)\1+$/.test(password)) return 'Bitte nicht nur ein Zeichen wiederholen.'
  return null
}
