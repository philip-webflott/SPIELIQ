'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { FIGURE_FRAMES, figureAtlasSvg, type FigureKitId } from './rig'

/**
 * Bildatlanten der Figuren
 * =======================
 * Je Trikot und Aussehen wird die Vektorvorlage einmal im Browser zu einem
 * PNG gerastert (alle Bilder nebeneinander). Auf dem Spielfeld zeigen die
 * Figuren nur noch einen Ausschnitt davon – so bleibt das Zeichnen auch auf
 * älteren Handys flüssig (Messung: docs/design/prototypen/leistung).
 * Kein Build-Schritt, keine Binärdateien im Repository. Schlägt das Rastern
 * fehl, bleibt es bei den Kreisen.
 */

/** Pixel je Bild (Figuren sind auf dem Bildschirm etwa 40 CSS-Pixel groß; reicht bis knapp dreifacher Pixeldichte) */
export const FIGURE_FRAME_PX = 112

export interface FigureAtlas {
  /** Ein Bild je Haltung (Reihenfolge wie FIGURE_FRAMES) */
  readonly frames: readonly string[]
  readonly framePx: number
}

type Entry = { readonly status: 'loading' } | { readonly status: 'ready'; readonly atlas: FigureAtlas } | { readonly status: 'error' }

const entries = new Map<string, Entry>()
const listeners = new Set<() => void>()

function notify() {
  for (const l of listeners) l()
}

/**
 * Rastert die Vorlage einmal und schneidet sie in Einzelbilder. Einzelbilder
 * statt Ausschnitten aus einem großen Bild: Das Spielfeld zeigt dann nur ein
 * `<image>` je Figur ohne verschachteltes `<svg>` – das zeichnet schneller.
 */
async function rasterize(svg: string, framePx: number, count: number): Promise<string[]> {
  const source = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
  try {
    const img = new Image()
    img.src = source
    await img.decode()
    const canvas = document.createElement('canvas')
    canvas.width = framePx
    canvas.height = framePx
    const g = canvas.getContext('2d')
    if (!g) throw new Error('Kein Canvas-Kontext')
    const urls: string[] = []
    for (let i = 0; i < count; i++) {
      g.clearRect(0, 0, framePx, framePx)
      g.drawImage(img, i * framePx, 0, framePx, framePx, 0, 0, framePx, framePx)
      const url = canvas.toDataURL('image/png')
      if (!url.startsWith('data:image/png')) throw new Error('Rastern fehlgeschlagen')
      urls.push(url)
    }
    return urls
  } finally {
    URL.revokeObjectURL(source)
  }
}

function ensure(key: string, kit: FigureKitId, look: number) {
  if (entries.has(key)) return
  entries.set(key, { status: 'loading' })
  rasterize(figureAtlasSvg(kit, look, FIGURE_FRAME_PX), FIGURE_FRAME_PX, FIGURE_FRAMES.length)
    .then((frames) => entries.set(key, { status: 'ready', atlas: { frames, framePx: FIGURE_FRAME_PX } }))
    .catch(() => entries.set(key, { status: 'error' }))
    .finally(notify)
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Atlas für ein Trikot und Aussehen; `null`, solange er lädt (oder wenn `kit` null ist). */
export function useFigureAtlas(kit: FigureKitId | null, look: number): FigureAtlas | null {
  const key = kit ? `${kit}:${look}` : ''
  useEffect(() => {
    if (kit) ensure(key, kit, look)
  }, [key, kit, look])
  return useSyncExternalStore(
    subscribe,
    () => {
      const entry = kit ? entries.get(key) : undefined
      return entry?.status === 'ready' ? entry.atlas : null
    },
    () => null,
  )
}
