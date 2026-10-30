import { createHash } from 'node:crypto'
import type { VoiceClip, VoiceManifest, VoiceProfile } from '../src/features/voice/manifest'

/**
 * Bausteine des Vertonungsskripts (scripts/voice.ts), getrennt für Tests.
 * Schnittstelle: ElevenLabs „Create speech with timing“
 * (https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps, abgerufen 30.10.2026).
 */

export const DEFAULT_API_BASE = 'https://api.elevenlabs.io'

type Env = Readonly<Record<string, string | undefined>>

function numberFrom(env: Env, key: string, fallback: number): number {
  const raw = env[key]
  if (raw === undefined || raw === '') return fallback
  const value = Number(raw)
  if (!Number.isFinite(value)) throw new Error(`${key} ist keine Zahl: ${raw}`)
  return value
}

/**
 * Stimme und Einstellungen aus Umgebungsvariablen. Die Standardwerte sind
 * Annahmen (ruhig, gleichmäßig, etwas langsamer als normal) und werden im
 * Test mit Kindern der Zielgruppe überprüft.
 */
export function profileFromEnv(env: Env): VoiceProfile {
  const modelId = env.ELEVENLABS_MODEL_ID || 'eleven_v4'
  return {
    provider: 'elevenlabs',
    voiceId: env.ELEVENLABS_VOICE_ID ?? '',
    modelId,
    // Laut Schnittstellenbeschreibung nimmt Multilingual v2 keinen Sprachcode an.
    languageCode: modelId.startsWith('eleven_multilingual') ? null : 'de',
    outputFormat: env.ELEVENLABS_OUTPUT_FORMAT || 'mp3_44100_64',
    seed: numberFrom(env, 'ELEVENLABS_SEED', 1),
    settings: {
      stability: numberFrom(env, 'ELEVENLABS_STABILITY', 0.6),
      similarity_boost: numberFrom(env, 'ELEVENLABS_SIMILARITY', 0.75),
      style: numberFrom(env, 'ELEVENLABS_STYLE', 0),
      speed: numberFrom(env, 'ELEVENLABS_SPEED', 0.9),
      use_speaker_boost: true,
    },
  }
}

/** Dateiname als Inhaltsadresse: gleicher Text + gleiche Stimme = gleiche Datei. */
export function clipFileName(profile: VoiceProfile, text: string): string {
  return `${createHash('sha256').update(`${JSON.stringify(profile)}\n${text}`).digest('hex').slice(0, 20)}.mp3`
}

export interface VoicePlanItem {
  readonly text: string
  readonly file: string
  /** Aufnahme liegt bereits vor */
  readonly exists: boolean
}

export interface VoicePlan {
  readonly items: readonly VoicePlanItem[]
  readonly missing: readonly VoicePlanItem[]
  /** Zeichen, die noch vertont werden müssen (Grundlage der Abrechnung bei ElevenLabs) */
  readonly missingCharacters: number
  /** Dateien im Ordner, die zu keinem Text mehr gehören */
  readonly orphaned: readonly string[]
}

export function planVoice(catalog: readonly string[], profile: VoiceProfile, existingFiles: ReadonlySet<string>): VoicePlan {
  const items = catalog.map((text) => {
    const file = clipFileName(profile, text)
    return { text, file, exists: existingFiles.has(file) }
  })
  const missing = items.filter((i) => !i.exists)
  const used = new Set(items.map((i) => i.file))
  return {
    items,
    missing,
    missingCharacters: missing.reduce((sum, i) => sum + i.text.length, 0),
    orphaned: [...existingFiles].filter((f) => !used.has(f)).sort(),
  }
}

/** Neues Verzeichnis: nur Texte des Katalogs mit vorhandener Datei, stabil sortiert. */
export function buildManifest(
  profile: VoiceProfile,
  items: readonly VoicePlanItem[],
  available: ReadonlySet<string>,
  durations: ReadonlyMap<string, number>,
  previous: VoiceManifest,
): VoiceManifest {
  const previousMs = new Map(Object.values(previous.clips).map((c) => [c.file, c.ms]))
  const clips: Record<string, VoiceClip> = {}
  for (const item of [...items].sort((a, b) => (a.text < b.text ? -1 : a.text > b.text ? 1 : 0))) {
    if (!available.has(item.file)) continue
    clips[item.text] = { file: item.file, ms: durations.get(item.file) ?? previousMs.get(item.file) ?? 0 }
  }
  return { version: 1, profile, clips }
}

export class VoiceApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly retryable: boolean,
  ) {
    super(message)
  }
}

interface Alignment {
  readonly character_end_times_seconds?: readonly number[]
}

export interface SynthesisResult {
  readonly audio: Uint8Array
  readonly ms: number
}

/** Eine Aufnahme erzeugen. Der API-Schlüssel geht nur an ElevenLabs, nie in Dateien oder Logs. */
export async function synthesize(
  fetchImpl: typeof fetch,
  options: { readonly apiKey: string; readonly baseUrl?: string; readonly profile: VoiceProfile; readonly text: string },
): Promise<SynthesisResult> {
  const { profile, text } = options
  const url = `${options.baseUrl ?? DEFAULT_API_BASE}/v1/text-to-speech/${encodeURIComponent(profile.voiceId)}/with-timestamps?output_format=${encodeURIComponent(profile.outputFormat)}`
  const res = await fetchImpl(url, {
    method: 'POST',
    headers: { 'xi-api-key': options.apiKey, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      text,
      model_id: profile.modelId,
      voice_settings: profile.settings,
      seed: profile.seed,
      ...(profile.languageCode ? { language_code: profile.languageCode } : {}),
    }),
  })
  if (!res.ok) {
    const detail = (await res.text().catch(() => '')).slice(0, 300)
    const retryable = res.status === 429 || res.status >= 500
    throw new VoiceApiError(`ElevenLabs antwortet mit ${res.status}: ${detail}`, res.status, retryable)
  }
  const body = (await res.json()) as { audio_base64?: string; alignment?: Alignment | null }
  if (!body.audio_base64) throw new VoiceApiError('Antwort ohne Audiodaten', res.status, false)
  const ends = body.alignment?.character_end_times_seconds ?? []
  const last = ends.length > 0 ? Math.max(...ends) : 0
  return { audio: Buffer.from(body.audio_base64, 'base64'), ms: Math.round(last * 1000) }
}

/** Wiederholung bei Ratenbegrenzung oder Serverfehlern (2, 4, 8, 16 Sekunden). */
export async function withRetry<T>(
  run: () => Promise<T>,
  sleep: (ms: number) => Promise<void> = (ms) => new Promise((r) => setTimeout(r, ms)),
  delays: readonly number[] = [2000, 4000, 8000, 16000],
): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await run()
    } catch (e) {
      const delay = delays[attempt]
      if (!(e instanceof VoiceApiError) || !e.retryable || delay === undefined) throw e
      await sleep(delay)
    }
  }
}
