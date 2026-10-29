import { describe, expect, it } from 'vitest'
import { convexHull, pointInPolygon, polygonArea, smallestTriangleAngle } from './polygon'
import { angleBetween, distanceToSegment, projectionParameter, toDegrees } from './vec'

describe('Vektorgeometrie', () => {
  it('berechnet den Abstand eines Punktes zu einer Strecke', () => {
    expect(distanceToSegment({ x: 5, y: 3 }, { x: 0, y: 0 }, { x: 10, y: 0 })).toBeCloseTo(3)
    // Punkt hinter dem Streckenende → Abstand zum Endpunkt
    expect(distanceToSegment({ x: 13, y: 4 }, { x: 0, y: 0 }, { x: 10, y: 0 })).toBeCloseTo(5)
  })

  it('begrenzt den Projektionsparameter auf die Strecke', () => {
    expect(projectionParameter({ x: -5, y: 1 }, { x: 0, y: 0 }, { x: 10, y: 0 })).toBe(0)
    expect(projectionParameter({ x: 5, y: 1 }, { x: 0, y: 0 }, { x: 10, y: 0 })).toBeCloseTo(0.5)
  })

  it('misst ungerichtete Winkel', () => {
    expect(toDegrees(angleBetween({ x: 1, y: 0 }, { x: 0, y: 1 }))).toBeCloseTo(90)
    expect(toDegrees(angleBetween({ x: 1, y: 0 }, { x: -1, y: 0 }))).toBeCloseTo(180)
  })
})

describe('Polygone', () => {
  const square = [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 4, y: 4 },
    { x: 0, y: 4 },
  ]

  it('berechnet Flächen und Punkt-in-Polygon', () => {
    expect(polygonArea(square)).toBe(16)
    expect(pointInPolygon({ x: 2, y: 2 }, square)).toBe(true)
    expect(pointInPolygon({ x: 5, y: 2 }, square)).toBe(false)
  })

  it('berechnet die konvexe Hülle', () => {
    const hull = convexHull([...square, { x: 2, y: 2 }, { x: 1, y: 3 }])
    expect(hull).toHaveLength(4)
  })

  it('erkennt "Dreiecke", die eigentlich eine Linie sind', () => {
    expect(smallestTriangleAngle({ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 20, y: 0.5 })).toBeLessThan(5)
    expect(smallestTriangleAngle({ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: 8.66 })).toBeCloseTo(60, 0)
  })
})
