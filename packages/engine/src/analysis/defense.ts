import { angleBetween, cross, distance, dot, normalize, sub, toDegrees, type Vec2 } from '../geometry/vec'

/**
 * Geometrie des Verteidigens relativ zur Achse "Ballführender → eigenes Tor".
 *
 * Tiefe (depth): wie weit ein Punkt vom Ballführenden in Richtung eigenes Tor liegt.
 * Seitlich (lateral): vorzeichenbehafteter Abstand quer zu dieser Achse.
 * Diese Achse ist die wichtigste Referenz für "torseitig stehen", "stellen"
 * und "absichern" – unabhängig davon, wo auf dem Feld die Situation spielt.
 */
export interface GoalAxis {
  readonly origin: Vec2
  readonly goal: Vec2
  readonly dir: Vec2
  readonly length: number
}

export function goalAxis(origin: Vec2, goal: Vec2): GoalAxis {
  return { origin, goal, dir: normalize(sub(goal, origin)), length: distance(origin, goal) }
}

export function axisCoords(axis: GoalAxis, p: Vec2): { depth: number; lateral: number } {
  const rel = sub(p, axis.origin)
  return { depth: dot(rel, axis.dir), lateral: cross(axis.dir, rel) }
}

export interface PressureGeometry {
  /** Abstand Verteidiger – Ballführender, m */
  readonly distance: number
  /** Winkel zwischen "Ballführender → Tor" und "Ballführender → Verteidiger" in Grad (0 = genau torseitig) */
  readonly goalSideAngle: number
  /** Steht der Verteidiger zwischen Ball und Tor? */
  readonly isGoalSide: boolean
}

export function pressureGeometry(defender: Vec2, carrier: Vec2, goal: Vec2, maxGoalSideAngle = 45): PressureGeometry {
  const angle = toDegrees(angleBetween(sub(goal, carrier), sub(defender, carrier)))
  return {
    distance: distance(defender, carrier),
    goalSideAngle: angle,
    isGoalSide: angle <= maxGoalSideAngle && distance(defender, goal) < distance(carrier, goal),
  }
}

export interface CoverGeometry {
  /** Wie viel tiefer (näher am eigenen Tor) der absichernde Spieler steht als der erste Verteidiger, m */
  readonly depthGap: number
  /** Abstand zum ersten Verteidiger, m */
  readonly distanceToFirst: number
  /**
   * Winkel der Linie "erster → zweiter Verteidiger" zur Torachse in Grad.
   * 0° = direkt dahinter, ~30–60° = schräg versetzt, 90° = auf gleicher Höhe ("flach").
   */
  readonly staggerAngle: number
  /** Seitliche Lage: +1 innen (Richtung Spielfeldmitte), -1 außen, 0 zentral/neutral */
  readonly side: -1 | 0 | 1
}

/**
 * Lage eines absichernden Spielers relativ zum ersten Verteidiger.
 * `insideReference` ist ein Punkt, der "innen" markiert (in der Regel die
 * Spielfeldmitte auf Höhe des Balls). Steht der Ball zentral, ist side = 0.
 */
export function coverGeometry(
  cover: Vec2,
  first: Vec2,
  carrier: Vec2,
  goal: Vec2,
  insideReference: Vec2,
  centralTolerance = 6,
): CoverGeometry {
  const axis = goalAxis(carrier, goal)
  const c = axisCoords(axis, cover)
  const f = axisCoords(axis, first)
  const insideLateral = axisCoords(axis, insideReference).lateral
  const relative = sub(cover, first)
  const staggerAngle = toDegrees(angleBetween(relative, axis.dir))
  let side: -1 | 0 | 1 = 0
  if (Math.abs(insideLateral) > centralTolerance) {
    const lateralOffset = c.lateral - f.lateral
    if (Math.abs(lateralOffset) > 0.75) side = Math.sign(lateralOffset) === Math.sign(insideLateral) ? 1 : -1
  }
  return {
    depthGap: c.depth - f.depth,
    distanceToFirst: distance(cover, first),
    staggerAngle,
    side,
  }
}

/** Steht ein Verteidiger torseitig zu seinem Gegenspieler (zwischen Gegenspieler und Tor)? */
export function isGoalSideOf(defender: Vec2, attacker: Vec2, goal: Vec2, maxAngle = 60): boolean {
  const angle = toDegrees(angleBetween(sub(goal, attacker), sub(defender, attacker)))
  return angle <= maxAngle && distance(defender, goal) < distance(attacker, goal) + 0.5
}
