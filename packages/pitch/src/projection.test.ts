import { describe, expect, it } from 'vitest'
import { fullPitch } from '@spieliq/engine'
import { createProjection, preferredOrientation } from './projection'

describe('Projektion Spielfeld → Bildschirm', () => {
  const pitch = fullPitch()
  const window = { x: 0, y: 0, width: 50, height: 68 }

  it('ist im Querformat die Identität', () => {
    const p = createProjection(pitch, window, 'landscape')
    expect(p.toScreen({ x: 10, y: 20 })).toEqual({ x: 10, y: 20 })
  })

  it('dreht im Hochformat so, dass das eigene Tor unten liegt und hin- und zurückrechnet', () => {
    const p = createProjection(pitch, window, 'portrait')
    const ownGoal = p.toScreen({ x: 0, y: 34 })
    const further = p.toScreen({ x: 30, y: 34 })
    expect(further.y).toBeLessThan(ownGoal.y)
    const back = p.toPitch(p.toScreen({ x: 12.5, y: 40 }))
    expect(back.x).toBeCloseTo(12.5)
    expect(back.y).toBeCloseTo(40)
  })

  it('wählt bei schmalen Bildschirmen das Hochformat für hohe Ausschnitte', () => {
    expect(preferredOrientation({ x: 0, y: 0, width: 50, height: 70 }, 9 / 16)).toBe('landscape')
    expect(preferredOrientation({ x: 0, y: 0, width: 70, height: 50 }, 9 / 16)).toBe('portrait')
  })
})
