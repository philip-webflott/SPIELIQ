import { createHash, randomBytes, randomInt } from 'node:crypto'

export function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

export function randomToken(bytes = 32): string {
  return randomBytes(bytes).toString('base64url')
}

/** Alphabet ohne leicht verwechselbare Zeichen (0/O, 1/I/L). */
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

/** Einladungscode im Format "ABCD-2345" (31^8 ≈ 8,5 · 10^11 Möglichkeiten). */
export function generateInviteCode(): string {
  let raw = ''
  for (let i = 0; i < 8; i++) raw += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)]
  return `${raw.slice(0, 4)}-${raw.slice(4)}`
}

export function normalizeInviteCode(input: string): string {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, '')
}

export function hashInviteCode(code: string): string {
  return sha256(`invite:${normalizeInviteCode(code)}`)
}

const ADJECTIVES = [
  'flinker', 'schneller', 'kluger', 'mutiger', 'wacher', 'starker', 'ruhiger', 'cleverer', 'wilder', 'heller',
  'frecher', 'stiller', 'tapferer', 'flotter', 'kühner', 'listiger', 'munterer', 'sicherer', 'treuer', 'zäher',
]
const ANIMALS = [
  'falke', 'fuchs', 'luchs', 'adler', 'wolf', 'biber', 'dachs', 'hirsch', 'igel', 'kranich',
  'marder', 'otter', 'rabe', 'specht', 'tiger', 'panther', 'delfin', 'hai', 'puma', 'uhu',
]

/** Anmeldename für Spieler ohne E-Mail, z. B. "flinker-falke-37". Keine personenbezogenen Bestandteile. */
export function generateLoginName(): string {
  const adj = ADJECTIVES[randomInt(ADJECTIVES.length)]!
  const animal = ANIMALS[randomInt(ANIMALS.length)]!
  return `${adj}-${animal}-${randomInt(10, 100)}`
}

/** Vorläufiges Passwort, z. B. nach dem Zurücksetzen durch den Trainer. */
export function generateTemporaryPassword(): string {
  const words = ['ball', 'tor', 'pass', 'flanke', 'ecke', 'elfer', 'kopf', 'spann']
  return `${words[randomInt(words.length)]}-${randomInt(1000, 10000)}-${words[randomInt(words.length)]}`
}
