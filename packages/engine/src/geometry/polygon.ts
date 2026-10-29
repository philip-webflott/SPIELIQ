import { cross, sub, type Vec2 } from './vec'

/** Flächeninhalt eines einfachen Polygons (Gaußsche Trapezformel), immer positiv. */
export function polygonArea(points: readonly Vec2[]): number {
  let sum = 0
  for (let i = 0; i < points.length; i++) {
    const a = points[i]!
    const b = points[(i + 1) % points.length]!
    sum += a.x * b.y - b.x * a.y
  }
  return Math.abs(sum) / 2
}

/** Punkt-in-Polygon-Test (Strahlverfahren). Punkte auf dem Rand gelten als innen. */
export function pointInPolygon(p: Vec2, polygon: readonly Vec2[]): boolean {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i]!
    const b = polygon[j]!
    const intersects =
      a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y + 1e-12) + a.x
    if (intersects) inside = !inside
  }
  return inside
}

/** Konvexe Hülle (Monotone-Chain-Verfahren), gegen den Uhrzeigersinn. */
export function convexHull(points: readonly Vec2[]): Vec2[] {
  if (points.length < 3) return [...points]
  const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y)
  const lower: Vec2[] = []
  for (const p of sorted) {
    while (lower.length >= 2 && cross(sub(lower[lower.length - 1]!, lower[lower.length - 2]!), sub(p, lower[lower.length - 2]!)) <= 0) {
      lower.pop()
    }
    lower.push(p)
  }
  const upper: Vec2[] = []
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i]!
    while (upper.length >= 2 && cross(sub(upper[upper.length - 1]!, upper[upper.length - 2]!), sub(p, upper[upper.length - 2]!)) <= 0) {
      upper.pop()
    }
    upper.push(p)
  }
  upper.pop()
  lower.pop()
  return lower.concat(upper)
}

/**
 * Kleinster Innenwinkel eines Dreiecks in Grad. Dient als Maß dafür, ob drei
 * Spieler ein "echtes" Dreieck bilden oder fast auf einer Linie stehen.
 */
export function smallestTriangleAngle(a: Vec2, b: Vec2, c: Vec2): number {
  const angleAt = (p: Vec2, q: Vec2, r: Vec2) => {
    const v1 = sub(q, p)
    const v2 = sub(r, p)
    const l1 = Math.hypot(v1.x, v1.y)
    const l2 = Math.hypot(v2.x, v2.y)
    if (l1 < 1e-9 || l2 < 1e-9) return 0
    const cos = Math.min(1, Math.max(-1, (v1.x * v2.x + v1.y * v2.y) / (l1 * l2)))
    return (Math.acos(cos) * 180) / Math.PI
  }
  return Math.min(angleAt(a, b, c), angleAt(b, c, a), angleAt(c, a, b))
}
