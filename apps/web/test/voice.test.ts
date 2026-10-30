import { describe, expect, it } from 'vitest'
import { parseManifest } from '@/features/voice/manifest'
import { buildManifest, clipFileName, planVoice, profileFromEnv, synthesize, VoiceApiError, withRetry } from '../scripts/voice-lib'

const profile = profileFromEnv({ ELEVENLABS_VOICE_ID: 'voice123' })

describe('Vertonung: Stimme und Dateinamen', () => {
  it('nutzt ruhige Standardwerte und setzt Deutsch, wo das Modell es annimmt', () => {
    expect(profile).toMatchObject({ voiceId: 'voice123', modelId: 'eleven_v4', languageCode: 'de', outputFormat: 'mp3_44100_64' })
    expect(profile.settings.speed).toBe(0.9)
    expect(profileFromEnv({ ELEVENLABS_MODEL_ID: 'eleven_multilingual_v2' }).languageCode).toBeNull()
    expect(() => profileFromEnv({ ELEVENLABS_SPEED: 'schnell' })).toThrow(/ELEVENLABS_SPEED/)
  })

  it('vergibt Dateinamen nach Text und Stimme', () => {
    const a = clipFileName(profile, 'Nur einer geht zum Ball.')
    expect(a).toMatch(/^[a-f0-9]{20}\.mp3$/)
    expect(clipFileName(profile, 'Nur einer geht zum Ball.')).toBe(a)
    expect(clipFileName(profile, 'Nur einer geht zum Ball!')).not.toBe(a)
    expect(clipFileName({ ...profile, settings: { ...profile.settings, speed: 1 } }, 'Nur einer geht zum Ball.')).not.toBe(a)
  })

  it('plant nur fehlende Aufnahmen und findet verwaiste Dateien', () => {
    const existing = clipFileName(profile, 'Super!')
    const plan = planVoice(['Super!', 'Gut gemacht!'], profile, new Set([existing, 'aaaaaaaaaaaaaaaaaaaa.mp3']))
    expect(plan.missing.map((i) => i.text)).toEqual(['Gut gemacht!'])
    expect(plan.missingCharacters).toBe('Gut gemacht!'.length)
    expect(plan.orphaned).toEqual(['aaaaaaaaaaaaaaaaaaaa.mp3'])
  })

  it('schreibt ein sortiertes Verzeichnis und behält bekannte Längen', () => {
    const plan = planVoice(['Super!', 'Gut gemacht!'], profile, new Set())
    const files = new Set(plan.items.map((i) => i.file))
    const first = buildManifest(profile, plan.items, files, new Map([[plan.items[0]!.file, 900]]), parseManifest(null))
    expect(Object.keys(first.clips)).toEqual(['Gut gemacht!', 'Super!'])
    const second = buildManifest(profile, plan.items, files, new Map(), first)
    expect(second.clips['Super!']!.ms).toBe(900)
  })

  it('übernimmt aus dem Verzeichnis nur gültige Dateinamen', () => {
    const manifest = parseManifest({
      version: 1,
      profile: null,
      clips: { gut: { file: 'abcdefabcdefabcdef12.mp3', ms: 1 }, boese: { file: '../geheim.mp3', ms: 1 } },
    })
    expect(Object.keys(manifest.clips)).toEqual(['gut'])
    expect(parseManifest('kaputt').clips).toEqual({})
  })
})

describe('Vertonung: Schnittstelle', () => {
  it('sendet Text, Modell, Stimme und Schlüssel im Kopf und liest Audio und Länge', async () => {
    const calls: { url: string; init: RequestInit }[] = []
    const fake = (async (url: string, init: RequestInit) => {
      calls.push({ url, init })
      return new Response(
        JSON.stringify({ audio_base64: Buffer.from('mp3').toString('base64'), alignment: { character_end_times_seconds: [0.2, 1.25] } }),
        { status: 200 },
      )
    }) as unknown as typeof fetch
    const result = await synthesize(fake, { apiKey: 'geheim', profile, text: 'Super!' })
    expect(Buffer.from(result.audio).toString()).toBe('mp3')
    expect(result.ms).toBe(1250)
    expect(calls[0]!.url).toBe('https://api.elevenlabs.io/v1/text-to-speech/voice123/with-timestamps?output_format=mp3_44100_64')
    expect((calls[0]!.init.headers as Record<string, string>)['xi-api-key']).toBe('geheim')
    const body = JSON.parse(String(calls[0]!.init.body)) as Record<string, unknown>
    expect(body).toMatchObject({ text: 'Super!', model_id: 'eleven_v4', language_code: 'de', seed: 1 })
    expect(JSON.stringify(body)).not.toContain('geheim')
  })

  it('wiederholt bei Ratenbegrenzung, aber nicht bei falschem Schlüssel', async () => {
    let n = 0
    const flaky = async () => {
      n++
      if (n < 3) throw new VoiceApiError('zu viele', 429, true)
      return 'ok'
    }
    const waits: number[] = []
    await expect(withRetry(flaky, async (ms) => void waits.push(ms))).resolves.toBe('ok')
    expect(waits).toEqual([2000, 4000])

    const denied = (async () => new Response('invalid api key', { status: 401 })) as unknown as typeof fetch
    await expect(withRetry(() => synthesize(denied, { apiKey: 'x', profile, text: 'Super!' }), async () => {})).rejects.toMatchObject({
      status: 401,
      retryable: false,
    })
  })
})
