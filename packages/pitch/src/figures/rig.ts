import type { PlayerAction, PlayerState } from '@spieliq/engine'
import { hashString } from '@spieliq/engine'

/**
 * Vorlage der Spielfiguren in Draufsicht (docs/design/spielerfiguren.md)
 * ====================================================================
 * Reine Funktionen, die SVG-Text erzeugen. Der Browser rastert daraus einmal
 * je Trikot und Aussehen einen Bildatlas (./atlas.ts); auf dem Spielfeld wird
 * nur noch das passende Bild gezeigt und gedreht.
 *
 * Lokale Koordinaten: Blickrichtung = −y, Einheit = 0,1 Spielfeld-Einheiten
 * (Kasten −24 … 24). Ein eigener Entwurf, keine übernommenen Grafiken.
 */

export const FIGURE_FRAMES = ['ready', 'run0', 'run1', 'run2', 'run3', 'defend', 'receive', 'pass', 'shoot'] as const
export type FigureFrame = (typeof FIGURE_FRAMES)[number]

/** Halbe Kantenlänge des Bildkastens in Figur-Einheiten */
export const FIGURE_HALF = 24
/** Strecke für einen ganzen Laufzyklus (zwei Schritte) in Metern – Annahme */
export const STRIDE_CYCLE = 2.4

export type FigureKitId = 'own' | 'opp' | 'ownKeeper' | 'oppKeeper'

export interface FigureKit {
  readonly shirt: string
  readonly shirtEdge: string
  readonly shorts: string
  readonly socks: string
  readonly gloves?: string
}

/**
 * Trikots. „Wir“ blau, Gegner orange (Designsystem). Torhüter tragen wie im
 * echten Spiel ein eigenes Trikot (lila bzw. gelbgrün); Hose und Stutzen
 * bleiben in den Farben ihrer Mannschaft, das Nummernschild zeigt das Team.
 */
export const FIGURE_KITS: Readonly<Record<FigureKitId, FigureKit>> = {
  own: { shirt: '#4aa3ff', shirtEdge: '#2f7fd6', shorts: '#0d2f57', socks: '#eaf4ff' },
  opp: { shirt: '#ff8a3d', shirtEdge: '#c95f1c', shorts: '#4a1d00', socks: '#2b1100' },
  ownKeeper: { shirt: '#a98bff', shirtEdge: '#7a5fd6', shorts: '#0d2f57', socks: '#eaf4ff', gloves: '#ffffff' },
  oppKeeper: { shirt: '#d9ef4a', shirtEdge: '#9fb22a', shorts: '#4a1d00', socks: '#2b1100', gloves: '#ffffff' },
}

export interface FigureLook {
  readonly skin: string
  readonly hair: string
}

/** Zurückhaltende Vielfalt: Haut- und Haartöne, verteilt nach Rückennummer. */
export const FIGURE_LOOKS: readonly FigureLook[] = [
  { skin: '#f1c7a5', hair: '#3a2a1e' },
  { skin: '#c98e62', hair: '#1d1612' },
  { skin: '#8d5a3b', hair: '#121010' },
  { skin: '#e8b48c', hair: '#8a5a2b' },
  { skin: '#a8714c', hair: '#2a1d14' },
]

export function kitFor(player: Pick<PlayerState, 'team' | 'role'>): FigureKitId {
  const keeper = player.role === 'GK'
  if (player.team === 'own') return keeper ? 'ownKeeper' : 'own'
  return keeper ? 'oppKeeper' : 'opp'
}

export function lookFor(player: Pick<PlayerState, 'id' | 'label' | 'team'>): number {
  return hashString(`${player.team}:${player.label ?? player.id}`) % FIGURE_LOOKS.length
}

/** Welches Bild zeigt die Figur? Laufen: Bild nach zurückgelegter Strecke, damit die Beine zur Geschwindigkeit passen. */
export function frameFor(action: PlayerAction, stride: number, animate: boolean): FigureFrame {
  switch (action) {
    case 'run': {
      if (!animate) return 'run0'
      const phase = Math.floor(((stride % STRIDE_CYCLE) / STRIDE_CYCLE) * 4) % 4
      return (['run0', 'run1', 'run2', 'run3'] as const)[phase]!
    }
    case 'defend':
    case 'receive':
    case 'pass':
    case 'shoot':
    case 'ready':
      return action
  }
}

interface Pose {
  /** Füße: x, y, Drehung in Grad */
  readonly feet: readonly (readonly [number, number, number])[]
  readonly hands: readonly (readonly [number, number])[]
  /** Oberkörper nach vorne (−) bzw. hinten (+) */
  readonly lean: number
  readonly wide?: boolean
}

const POSES: Readonly<Record<FigureFrame, Pose>> = {
  ready: { feet: [[-4, 1.5, 0], [4, 1.5, 0]], hands: [[-10.5, 3.5], [10.5, 3.5]], lean: 0 },
  run0: { feet: [[-3.5, -7, 0], [3.5, 6.5, 0]], hands: [[-8, 6], [8.5, -7]], lean: -1.2 },
  run1: { feet: [[-3.5, -1.5, 0], [3.5, 2, 0]], hands: [[-9.5, 2], [9.5, -1]], lean: -1.2 },
  run2: { feet: [[-3.5, 6.5, 0], [3.5, -7, 0]], hands: [[-8.5, -7], [8, 6]], lean: -1.2 },
  run3: { feet: [[-3.5, 2, 0], [3.5, -1.5, 0]], hands: [[-9.5, -1], [9.5, 2]], lean: -1.2 },
  defend: { feet: [[-8.5, 0.5, -20], [8.5, 2.5, 20]], hands: [[-14, -3.5], [14, -3.5]], lean: 0.8, wide: true },
  receive: { feet: [[-4.5, 2, 0], [3.5, -7, 10]], hands: [[-14, 0.5], [13.5, 1.5]], lean: 0 },
  pass: { feet: [[-5, -0.5, 0], [3, -9, -70]], hands: [[-13.5, -2], [7.5, 6.5]], lean: -0.5 },
  shoot: { feet: [[-5.5, -1.5, 0], [1.5, -13.5, 0]], hands: [[-12.5, -6.5], [9, 7]], lean: -1.6 },
}

const n = (v: number) => Math.round(v * 100) / 100

/** Eine Figur als SVG-Gruppe in lokalen Koordinaten. `uid` macht Clip-IDs eindeutig. */
export function figureFrameSvg(kitId: FigureKitId, lookIndex: number, frame: FigureFrame, uid: string): string {
  const kit = FIGURE_KITS[kitId]
  const look = FIGURE_LOOKS[lookIndex % FIGURE_LOOKS.length]!
  const p = POSES[frame]
  const out: string[] = []
  // Fußabdruck als Tropfen: die Spitze zeigt die Blickrichtung
  out.push(
    '<path d="M0,-20 C6,-16 13.5,-9 13.5,1 C13.5,9 7.5,13.5 0,13.5 C-7.5,13.5 -13.5,9 -13.5,1 C-13.5,-9 -6,-16 0,-20 Z" fill="rgba(0,0,0,0.32)"/>',
  )
  out.push('<path d="M0,-20.5 L-3.2,-15.6 L3.2,-15.6 Z" fill="#ffffff" fill-opacity="0.9"/>')
  for (const [fx, fy, rot] of p.feet) {
    const hx = fx < 0 ? -3.2 : 3.2
    out.push(`<line x1="${hx}" y1="1.2" x2="${n(fx)}" y2="${n(fy)}" stroke="${kit.socks}" stroke-width="3.4" stroke-linecap="round"/>`)
    out.push(
      `<g transform="translate(${n(fx)} ${n(fy)}) rotate(${rot})"><ellipse rx="2.5" ry="3.8" fill="#1a2230"/><ellipse cy="-1.6" rx="1.4" ry="1.3" fill="#5a6b85"/></g>`,
    )
  }
  out.push(`<ellipse cx="0" cy="1.8" rx="6.4" ry="4.2" fill="${kit.shorts}"/>`)
  for (const [hx, hy] of p.hands) {
    const sx = hx < 0 ? -8 : 8
    const ex = n(sx + (hx - sx) * 0.38)
    const ey = n(p.lean + (hy - p.lean) * 0.38)
    out.push(`<line x1="${sx}" y1="${p.lean}" x2="${hx}" y2="${hy}" stroke="${look.skin}" stroke-width="3.2" stroke-linecap="round"/>`)
    out.push(`<line x1="${sx}" y1="${p.lean}" x2="${ex}" y2="${ey}" stroke="${kit.shirt}" stroke-width="3.9" stroke-linecap="round"/>`)
    out.push(`<circle cx="${hx}" cy="${hy}" r="${kit.gloves ? 2.6 : 1.9}" fill="${kit.gloves ?? look.skin}"/>`)
  }
  const w = p.wide ? 20.5 : 19.5
  out.push(
    `<rect x="${n(-w / 2)}" y="${n(-4.6 + p.lean)}" width="${w}" height="10.4" rx="5" fill="${kit.shirt}" stroke="${kit.shirtEdge}" stroke-width="0.9"/>`,
  )
  // Kopf: Gesicht vorne (Haut), Haare hinten, Nase als Richtungszeichen
  const hy = n(-3.4 + p.lean)
  out.push(`<clipPath id="h${uid}"><circle cx="0" cy="${hy}" r="4.7"/></clipPath>`)
  out.push(`<circle cx="0" cy="${hy}" r="4.7" fill="${look.skin}" stroke="rgba(0,0,0,0.25)" stroke-width="0.5"/>`)
  out.push(`<circle cx="0" cy="${n(hy + 2.9)}" r="5.1" fill="${look.hair}" clip-path="url(#h${uid})"/>`)
  out.push(`<circle cx="0" cy="${n(hy - 4.9)}" r="1.2" fill="${look.skin}"/>`)
  return out.join('')
}

/** Alle Bilder einer Figur nebeneinander als eigenständiges SVG-Dokument (Bildatlas). */
export function figureAtlasSvg(kitId: FigureKitId, lookIndex: number, framePx: number): string {
  const size = FIGURE_HALF * 2
  const frames = FIGURE_FRAMES.map(
    (f, i) => `<g transform="translate(${i * size + FIGURE_HALF} ${FIGURE_HALF})">${figureFrameSvg(kitId, lookIndex, f, `${i}`)}</g>`,
  ).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${framePx * FIGURE_FRAMES.length}" height="${framePx}" viewBox="0 0 ${size * FIGURE_FRAMES.length} ${size}">${frames}</svg>`
}
