'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { normalizeSpeech } from '@spieliq/content'
import { EMPTY_MANIFEST, parseManifest, VOICE_CLIP_DIR, VOICE_MANIFEST_PATH, type VoiceManifest } from './manifest'

/**
 * Vorlesen (docs/konzept/sprachausgabe.md)
 * =======================================
 * 1. Gibt es für alle Abschnitte eine vorab erzeugte Aufnahme (KI-Stimme), wird
 *    sie abgespielt – als Datei von unserem Server, ohne Anfrage an Dritte.
 * 2. Sonst eine deutsche Stimme, die lokal auf dem Gerät läuft (`localService`).
 *    So verlässt kein Text das Gerät.
 * 3. Gibt es beides nicht, wird Vorlesen nicht angeboten.
 *
 * Automatisches Vorlesen ist an, wenn Aufnahmen vorhanden sind (die Zielgruppe
 * liest teils mühsam), und lässt sich ausschalten. Die Einstellung gilt nur
 * für die laufende Mission und wird nicht gespeichert.
 */

let manifestPromise: Promise<VoiceManifest> | null = null

function loadManifest(): Promise<VoiceManifest> {
  manifestPromise ??= fetch(VOICE_MANIFEST_PATH)
    .then((res) => (res.ok ? res.json() : null))
    .then(parseManifest)
    .catch(() => EMPTY_MANIFEST)
  return manifestPromise
}

function clipsFor(manifest: VoiceManifest, segments: readonly string[]) {
  const texts = segments.map(normalizeSpeech).filter((s) => s.length > 0)
  const clips = texts.map((s) => manifest.clips[s])
  return { texts, clips: clips.every((c) => c !== undefined) ? clips : null }
}

/** Pause zwischen zwei Abschnitten (ms) – ein kurzer Atemzug zwischen Überschrift und Satz. */
const SEGMENT_GAP_MS = 350

export interface Voice {
  /** Gibt es vorab erzeugte Aufnahmen (KI-Stimme)? */
  readonly hasRecordings: boolean
  /** Kann überhaupt vorgelesen werden (Aufnahmen oder Gerätestimme)? */
  readonly available: boolean
  /** Kann dieser Text vorgelesen werden (Aufnahme oder Gerätestimme)? */
  readonly canSpeak: (segments: readonly string[]) => boolean
  readonly speak: (segments: readonly string[]) => void
  readonly stop: () => void
  readonly speaking: boolean
  /** Automatisch vorlesen, sobald neuer Text erscheint */
  readonly auto: boolean
  readonly setAuto: (value: boolean) => void
}

export function useVoice(): Voice {
  const [manifest, setManifest] = useState<VoiceManifest>(EMPTY_MANIFEST)
  const [deviceVoice, setDeviceVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [speaking, setSpeaking] = useState(false)
  const [autoPref, setAutoPref] = useState<boolean | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  // Spiegel für speak(): bleibt dadurch stabil und liest immer den neuesten Stand.
  const manifestRef = useRef<VoiceManifest>(EMPTY_MANIFEST)
  const deviceVoiceRef = useRef<SpeechSynthesisVoice | null>(null)
  /** Jede neue Ausgabe bricht die vorige ab. */
  const runRef = useRef(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    let active = true
    void loadManifest().then((m) => {
      if (!active) return
      manifestRef.current = m
      setManifest(m)
    })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const pick = () => {
      const voices = window.speechSynthesis.getVoices()
      const voice = voices.find((v) => v.localService && v.lang.toLowerCase().startsWith('de')) ?? null
      deviceVoiceRef.current = voice
      setDeviceVoice(voice)
    }
    pick()
    window.speechSynthesis.addEventListener('voiceschanged', pick)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', pick)
  }, [])

  const stop = useCallback(() => {
    runRef.current++
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    audioRef.current?.pause()
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [])

  useEffect(() => stop, [stop])

  const hasRecordings = Object.keys(manifest.clips).length > 0

  const canSpeak = useCallback(
    (segments: readonly string[]) => {
      const { texts, clips } = clipsFor(manifest, segments)
      return texts.length > 0 && (clips !== null || deviceVoice !== null)
    },
    [manifest, deviceVoice],
  )

  const speak = useCallback(
    (segments: readonly string[]) => {
      stop()
      const { texts, clips } = clipsFor(manifestRef.current, segments)
      if (texts.length === 0) return
      const deviceVoice = deviceVoiceRef.current
      const run = runRef.current

      if (clips) {
        const audio = (audioRef.current ??= new Audio())
        const playAt = (i: number) => {
          if (runRef.current !== run) return
          const clip = clips[i]
          if (!clip) {
            setSpeaking(false)
            return
          }
          audio.src = `${VOICE_CLIP_DIR}/${clip.file}`
          audio.onended = () => {
            timerRef.current = window.setTimeout(() => playAt(i + 1), SEGMENT_GAP_MS)
          }
          audio.play().catch((e: unknown) => {
            if (runRef.current !== run) return
            // Vor der ersten Berührung blockieren Browser den Ton – dann bei der ersten Berührung nachholen.
            if (e instanceof DOMException && e.name === 'NotAllowedError') {
              let resumed = false
              const resume = () => {
                if (resumed || runRef.current !== run) return
                resumed = true
                playAt(i)
              }
              window.addEventListener('click', resume, { once: true, capture: true })
              window.addEventListener('keydown', resume, { once: true, capture: true })
              return
            }
            setSpeaking(false)
          })
        }
        setSpeaking(true)
        playAt(0)
        return
      }

      if (deviceVoice) {
        const utterance = new SpeechSynthesisUtterance(texts.join(' '))
        utterance.voice = deviceVoice
        utterance.lang = deviceVoice.lang
        utterance.rate = 0.95
        utterance.onend = () => {
          if (runRef.current === run) setSpeaking(false)
        }
        setSpeaking(true)
        window.speechSynthesis.speak(utterance)
      }
    },
    [stop],
  )

  return {
    hasRecordings,
    available: hasRecordings || deviceVoice !== null,
    canSpeak,
    speak,
    stop,
    speaking,
    auto: autoPref ?? hasRecordings,
    setAuto: setAutoPref,
  }
}

/**
 * Liest Text automatisch vor, wenn er neu erscheint (`key` ändert sich) und
 * automatisches Vorlesen an ist.
 */
export function useAutoSpeak(voice: Voice, segments: readonly string[], key: string | null) {
  const { auto, speak, hasRecordings } = voice
  const textKey = segments.join('\n')
  useEffect(() => {
    if (!auto || key === null) return
    speak(textKey.split('\n'))
    // hasRecordings: sobald das Verzeichnis geladen ist, den aktuellen Text einmal vorlesen.
  }, [auto, key, textKey, speak, hasRecordings])
}
