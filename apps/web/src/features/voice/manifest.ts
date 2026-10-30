/**
 * Verzeichnis der vorab erzeugten Sprachaufnahmen (öffentlich unter /voice).
 * Wird vom Skript scripts/voice.ts geschrieben und von der App gelesen.
 * Schlüssel ist der normalisierte Text (normalizeSpeech aus @spieliq/content).
 */

export const VOICE_MANIFEST_PATH = '/voice/manifest.json'
export const VOICE_CLIP_DIR = '/voice/clips'

export interface VoiceProfile {
  readonly provider: 'elevenlabs'
  readonly voiceId: string
  readonly modelId: string
  /** ISO 639-1; null, wenn das Modell keinen Sprachcode annimmt */
  readonly languageCode: string | null
  readonly outputFormat: string
  readonly seed: number
  readonly settings: {
    readonly stability: number
    readonly similarity_boost: number
    readonly style: number
    readonly speed: number
    readonly use_speaker_boost: boolean
  }
}

export interface VoiceClip {
  /** Dateiname in /voice/clips (Inhaltsadresse: ändert sich mit Text oder Stimme) */
  readonly file: string
  /** Länge in Millisekunden */
  readonly ms: number
}

export interface VoiceManifest {
  readonly version: 1
  readonly profile: VoiceProfile | null
  readonly clips: Readonly<Record<string, VoiceClip>>
}

export const EMPTY_MANIFEST: VoiceManifest = { version: 1, profile: null, clips: {} }

export function parseManifest(value: unknown): VoiceManifest {
  if (!value || typeof value !== 'object') return EMPTY_MANIFEST
  const v = value as Partial<VoiceManifest>
  if (v.version !== 1 || !v.clips || typeof v.clips !== 'object') return EMPTY_MANIFEST
  const clips: Record<string, VoiceClip> = {}
  for (const [text, clip] of Object.entries(v.clips)) {
    if (clip && typeof clip.file === 'string' && /^[a-f0-9]{20}\.mp3$/.test(clip.file)) {
      clips[text] = { file: clip.file, ms: typeof clip.ms === 'number' ? clip.ms : 0 }
    }
  }
  return { version: 1, profile: v.profile ?? null, clips }
}
