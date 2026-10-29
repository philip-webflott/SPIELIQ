'use client'

import { useCallback, useEffect, useState } from 'react'

/**
 * Optionales Vorlesen der Anweisungen (weniger Lesebelastung).
 * Datenschutz: Es werden nur Stimmen verwendet, die lokal auf dem Gerät
 * laufen (`localService`). Gibt es keine, wird die Funktion nicht angeboten –
 * so verlässt kein Text das Gerät.
 */
export function useSpeech() {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const pick = () => {
      const voices = window.speechSynthesis.getVoices()
      setVoice(voices.find((v) => v.localService && v.lang.toLowerCase().startsWith('de')) ?? null)
    }
    pick()
    window.speechSynthesis.addEventListener('voiceschanged', pick)
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', pick)
      window.speechSynthesis.cancel()
    }
  }, [])

  const speak = useCallback(
    (text: string) => {
      if (!voice || !text) return
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.voice = voice
      utterance.lang = voice.lang
      utterance.rate = 0.95
      window.speechSynthesis.speak(utterance)
    },
    [voice],
  )

  return { available: voice !== null, speak }
}
