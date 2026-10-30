import { describe, expect, it } from 'vitest'
import { fullPitch } from '@spieliq/engine'
import { createProjection, screenAngle } from '../projection'
import { FIGURE_FRAMES, FIGURE_LOOKS, figureAtlasSvg, frameFor, kitFor, lookFor, STRIDE_CYCLE } from './rig'

describe('Figurenvorlage', () => {
  it('erzeugt alle Haltungen ohne ungültige Zahlen', () => {
    const svg = figureAtlasSvg('own', 0, 112)
    expect(svg).toContain(`width="${112 * FIGURE_FRAMES.length}"`)
    expect(svg.match(/<clipPath /g)).toHaveLength(FIGURE_FRAMES.length)
    expect(svg).not.toMatch(/NaN|undefined/)
  })

  it('gibt Torhütern ein eigenes Trikot und verteilt das Aussehen gleichbleibend', () => {
    expect(kitFor({ team: 'own', role: 'GK' })).toBe('ownKeeper')
    expect(kitFor({ team: 'opp', role: 'DEF' })).toBe('opp')
    expect(figureAtlasSvg('ownKeeper', 0, 112)).not.toEqual(figureAtlasSvg('own', 0, 112))
    const look = lookFor({ id: 'd4', label: '4', team: 'own' })
    expect(look).toBe(lookFor({ id: 'd4', label: '4', team: 'own' }))
    expect(look).toBeGreaterThanOrEqual(0)
    expect(look).toBeLessThan(FIGURE_LOOKS.length)
  })

  it('wechselt beim Laufen die Bilder nach zurückgelegter Strecke, ohne Animation steht das Bild', () => {
    const frames = new Set([0, 0.25, 0.5, 0.75].map((k) => frameFor('run', k * STRIDE_CYCLE + 0.01, true)))
    expect(frames).toEqual(new Set(['run0', 'run1', 'run2', 'run3']))
    expect(frameFor('run', 1.7, false)).toBe('run0')
    expect(frameFor('defend', 3, true)).toBe('defend')
  })

  it('dreht die Blickrichtung passend zum Hochformat (wir spielen nach oben)', () => {
    const pitch = fullPitch()
    const projection = createProjection(pitch, { x: 0, y: 0, width: pitch.length, height: pitch.width }, 'portrait')
    expect(screenAngle(projection, { x: 30, y: 30 }, 0)).toBeCloseTo(-Math.PI / 2)
    expect(screenAngle(projection, { x: 30, y: 30 }, Math.PI / 2)).toBeCloseTo(0)
  })
})
