import type { PitchSpec, PitchWindow, Vec2 } from '@spieliq/engine'

/**
 * Abbildung Spielfeld (Meter) → SVG-Nutzerkoordinaten.
 *
 * - landscape: x nach rechts, y nach unten (1:1)
 * - portrait:  Spielfeld um 90° gedreht; die eigene Angriffsrichtung (+x)
 *              zeigt nach oben, das eigene Tor liegt unten. Ideal für Smartphones.
 *
 * Alle Koordinaten werden in JavaScript projiziert (statt per SVG-transform),
 * damit Texte (Rückennummern) immer aufrecht bleiben.
 */
export type Orientation = 'landscape' | 'portrait'

export interface Projection {
  readonly orientation: Orientation
  readonly viewBox: { x: number; y: number; width: number; height: number }
  toScreen(p: Vec2): Vec2
  toPitch(s: Vec2): Vec2
}

export function createProjection(pitch: PitchSpec, window: PitchWindow, orientation: Orientation): Projection {
  if (orientation === 'landscape') {
    return {
      orientation,
      viewBox: { x: window.x, y: window.y, width: window.width, height: window.height },
      toScreen: (p) => ({ x: p.x, y: p.y }),
      toPitch: (s) => ({ x: s.x, y: s.y }),
    }
  }
  const L = pitch.length
  // portrait: sx = y, sy = L - x
  return {
    orientation,
    viewBox: { x: window.y, y: L - (window.x + window.width), width: window.height, height: window.width },
    toScreen: (p) => ({ x: p.y, y: L - p.x }),
    toPitch: (s) => ({ x: L - s.y, y: s.x }),
  }
}

/** Wählt die Ausrichtung, die den Bildschirm am besten ausnutzt. */
export function preferredOrientation(window: PitchWindow, containerAspect: number): Orientation {
  const landscapeAspect = window.width / window.height
  const portraitAspect = window.height / window.width
  const fit = (aspect: number) => Math.min(aspect, containerAspect) / Math.max(aspect, containerAspect)
  return fit(portraitAspect) > fit(landscapeAspect) ? 'portrait' : 'landscape'
}

export function pointsAttr(points: readonly Vec2[], projection: Projection): string {
  return points
    .map((p) => {
      const s = projection.toScreen(p)
      return `${round(s.x)},${round(s.y)}`
    })
    .join(' ')
}

export function round(v: number): number {
  return Math.round(v * 100) / 100
}
