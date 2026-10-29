/**
 * 2D-Vektorrechnung in Spielfeldkoordinaten (Meter).
 *
 * Konvention: x verläuft von der linken Torlinie (x = 0) zur rechten Torlinie
 * (x = Spielfeldlänge), y von der oberen Seitenlinie (y = 0) zur unteren
 * Seitenlinie (y = Spielfeldbreite). Die Darstellung (Hoch-/Querformat) ist
 * Sache des Renderers und hat keinen Einfluss auf die Berechnungen.
 */

export interface Vec2 {
  readonly x: number
  readonly y: number
}

export const EPSILON = 1e-9

export function vec(x: number, y: number): Vec2 {
  return { x, y }
}

export function add(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x + b.x, y: a.y + b.y }
}

export function sub(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x - b.x, y: a.y - b.y }
}

export function scale(a: Vec2, factor: number): Vec2 {
  return { x: a.x * factor, y: a.y * factor }
}

export function dot(a: Vec2, b: Vec2): number {
  return a.x * b.x + a.y * b.y
}

/** z-Komponente des Kreuzprodukts. Positiv, wenn b links von a liegt (mathematisch positiver Drehsinn). */
export function cross(a: Vec2, b: Vec2): number {
  return a.x * b.y - a.y * b.x
}

export function length(a: Vec2): number {
  return Math.hypot(a.x, a.y)
}

export function distance(a: Vec2, b: Vec2): number {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

export function normalize(a: Vec2): Vec2 {
  const len = length(a)
  if (len < EPSILON) return { x: 0, y: 0 }
  return { x: a.x / len, y: a.y / len }
}

export function lerp(a: Vec2, b: Vec2, t: number): Vec2 {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }
}

/** Senkrechter Vektor (90° gegen den Uhrzeigersinn im mathematischen Sinn). */
export function perp(a: Vec2): Vec2 {
  return { x: -a.y, y: a.x }
}

/** Ungerichteter Winkel zwischen zwei Vektoren in Radiant (0 … π). */
export function angleBetween(a: Vec2, b: Vec2): number {
  const la = length(a)
  const lb = length(b)
  if (la < EPSILON || lb < EPSILON) return 0
  const cos = Math.min(1, Math.max(-1, dot(a, b) / (la * lb)))
  return Math.acos(cos)
}

export function toDegrees(rad: number): number {
  return (rad * 180) / Math.PI
}

export function toRadians(deg: number): number {
  return (deg * Math.PI) / 180
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/** Projektionsparameter t (0 … 1) des Punktes p auf die Strecke a→b. */
export function projectionParameter(p: Vec2, a: Vec2, b: Vec2): number {
  const ab = sub(b, a)
  const lenSq = dot(ab, ab)
  if (lenSq < EPSILON) return 0
  return clamp(dot(sub(p, a), ab) / lenSq, 0, 1)
}

export function closestPointOnSegment(p: Vec2, a: Vec2, b: Vec2): Vec2 {
  return lerp(a, b, projectionParameter(p, a, b))
}

export function distanceToSegment(p: Vec2, a: Vec2, b: Vec2): number {
  return distance(p, closestPointOnSegment(p, a, b))
}

export function midpoint(a: Vec2, b: Vec2): Vec2 {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
}

export function centroid(points: readonly Vec2[]): Vec2 {
  if (points.length === 0) return { x: 0, y: 0 }
  let x = 0
  let y = 0
  for (const p of points) {
    x += p.x
    y += p.y
  }
  return { x: x / points.length, y: y / points.length }
}

export function roundTo(value: number, decimals = 1): number {
  const f = 10 ** decimals
  return Math.round(value * f) / f
}
