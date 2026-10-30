/**
 * Vorlesetexte mit ElevenLabs vertonen (docs/konzept/sprachausgabe.md).
 *
 * Aufruf:
 *   pnpm voice -- --dry-run     zeigt, wie viele Texte und Zeichen fehlen (ohne Schlüssel, kostenlos)
 *   pnpm voice                  erzeugt fehlende Aufnahmen
 *   pnpm voice -- --limit=5     nur die ersten fünf fehlenden (zum Anhören der Stimme)
 *   pnpm voice -- --prune       löscht Aufnahmen, deren Text es nicht mehr gibt
 *
 * Benötigt ELEVENLABS_API_KEY und ELEVENLABS_VOICE_ID (Umgebung oder .env).
 * Es werden nur feste Lerntexte gesendet – keine Namen, keine Eingaben, keine
 * Daten von Spieler:innen. Die App selbst spricht nie mit ElevenLabs.
 */
import { mkdirSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { getMission, MISSION_INPUTS, speechCatalog } from '@spieliq/content'
import { parseManifest, type VoiceManifest } from '../src/features/voice/manifest'
import { buildManifest, DEFAULT_API_BASE, planVoice, profileFromEnv, synthesize, VoiceApiError, withRetry } from './voice-lib'

try {
  process.loadEnvFile?.('.env')
} catch {
  // keine .env
}

const args = new Set(process.argv.slice(2).filter((a) => a !== '--'))
const dryRun = args.has('--dry-run')
const prune = args.has('--prune')
const limitArg = [...args].find((a) => a.startsWith('--limit='))
const limit = limitArg ? Number(limitArg.slice('--limit='.length)) : Infinity

const publicDir = join(import.meta.dirname, '..', 'public', 'voice')
const clipDir = join(publicDir, 'clips')
const manifestPath = join(publicDir, 'manifest.json')

function readManifest(): VoiceManifest {
  try {
    return parseManifest(JSON.parse(readFileSync(manifestPath, 'utf8')))
  } catch {
    return parseManifest(null)
  }
}

function writeManifest(manifest: VoiceManifest) {
  const tmp = `${manifestPath}.tmp`
  writeFileSync(tmp, `${JSON.stringify(manifest, null, 2)}\n`)
  renameSync(tmp, manifestPath)
}

function listClips(): Set<string> {
  try {
    return new Set(readdirSync(clipDir).filter((f) => f.endsWith('.mp3')))
  } catch {
    return new Set()
  }
}

async function main() {
  const catalog = speechCatalog(MISSION_INPUTS.map((m) => getMission(m.id)))
  const profile = profileFromEnv(process.env)
  const available = listClips()
  const plan = planVoice(catalog, profile, available)
  const previous = readManifest()

  console.log(`Vorlesetexte: ${plan.items.length} · vorhanden: ${plan.items.length - plan.missing.length} · fehlen: ${plan.missing.length} (${plan.missingCharacters} Zeichen)`)
  console.log(`Stimme: ${profile.voiceId || '(ELEVENLABS_VOICE_ID fehlt)'} · Modell: ${profile.modelId} · Tempo: ${profile.settings.speed}`)
  if (previous.profile && JSON.stringify(previous.profile) !== JSON.stringify(profile)) {
    console.log('Hinweis: Stimme oder Einstellungen haben sich geändert – alle Texte werden neu vertont.')
  }
  if (plan.orphaned.length > 0) console.log(`Nicht mehr benötigte Aufnahmen: ${plan.orphaned.length}${prune ? ' (werden gelöscht)' : ' (mit --prune löschen)'}`)
  if (dryRun) return

  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey || !profile.voiceId) {
    console.error('ELEVENLABS_API_KEY und ELEVENLABS_VOICE_ID setzen (siehe docs/konzept/sprachausgabe.md).')
    process.exit(1)
  }
  const baseUrl = process.env.ELEVENLABS_API_BASE || DEFAULT_API_BASE

  mkdirSync(clipDir, { recursive: true })
  const durations = new Map<string, number>()
  let done = 0
  for (const item of plan.missing.slice(0, limit)) {
    try {
      const result = await withRetry(() => synthesize(fetch, { apiKey, baseUrl, profile, text: item.text }))
      writeFileSync(join(clipDir, item.file), result.audio)
      available.add(item.file)
      durations.set(item.file, result.ms)
      done++
      // Nach jeder Aufnahme speichern – ein Abbruch verliert keine bezahlte Arbeit.
      writeManifest(buildManifest(profile, plan.items, available, durations, previous))
      console.log(`  ${done}/${Math.min(limit, plan.missing.length)} ${item.file} „${item.text.slice(0, 60)}“`)
    } catch (e) {
      if (e instanceof VoiceApiError && !e.retryable) {
        console.error(e.message)
        process.exit(1)
      }
      throw e
    }
  }

  if (prune) for (const file of plan.orphaned) rmSync(join(clipDir, file), { force: true })
  const remaining = listClips()
  writeManifest(buildManifest(profile, plan.items, remaining, durations, previous))
  console.log(`Fertig: ${done} neu vertont, ${Object.keys(readManifest().clips).length} Aufnahmen im Verzeichnis.`)
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e)
  process.exit(1)
})
