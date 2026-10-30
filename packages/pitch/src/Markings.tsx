'use client'

import { memo } from 'react'
import type { GoalSpec, Vec2 } from '@spieliq/engine'
import { usePitchContext } from './context'
import { pointsAttr, round } from './projection'

const LINE = 'var(--pitch-line, rgba(255,255,255,0.8))'

function arcPoints(center: Vec2, radius: number, from: number, to: number, steps = 28): Vec2[] {
  const pts: Vec2[] = []
  for (let i = 0; i <= steps; i++) {
    const a = from + ((to - from) * i) / steps
    pts.push({ x: center.x + Math.cos(a) * radius, y: center.y + Math.sin(a) * radius })
  }
  return pts
}

/** Rasen mit dezenten Mähstreifen, Linien und Toren – in Spielfeldkoordinaten. */
export const PitchMarkings = memo(function PitchMarkings() {
  const { pitch, projection, unit } = usePitchContext()
  const L = pitch.length
  const W = pitch.width
  const stroke = 0.12 * unit + 0.04
  const rect = (x0: number, y0: number, x1: number, y1: number) =>
    pointsAttr(
      [
        { x: x0, y: y0 },
        { x: x1, y: y0 },
        { x: x1, y: y1 },
        { x: x0, y: y1 },
      ],
      projection,
    )

  const stripeCount = Math.max(6, Math.round(L / 6.5))
  const stripes = Array.from({ length: stripeCount }, (_, i) => i).filter((i) => i % 2 === 0)
  const margin = 4

  const center = projection.toScreen({ x: L / 2, y: W / 2 })
  const goalBox = (goal: GoalSpec) => {
    const depth = Math.max(0.8, goal.width * 0.25)
    const x0 = goal.center.x
    const x1 = goal.center.x - goal.opensTowards * depth
    return rect(Math.min(x0, x1), goal.center.y - goal.width / 2, Math.max(x0, x1), goal.center.y + goal.width / 2)
  }

  return (
    <g aria-hidden="true">
      <polygon points={rect(-margin, -margin, L + margin, W + margin)} fill="var(--pitch-surround, #15502f)" />
      <polygon points={rect(0, 0, L, W)} fill="var(--pitch-grass, #1d6b3f)" />
      {stripes.map((i) => (
        <polygon
          key={i}
          points={rect((L / stripeCount) * i, 0, (L / stripeCount) * (i + 1), W)}
          fill="var(--pitch-stripe, rgba(255,255,255,0.035))"
        />
      ))}
      <g fill="none" stroke={LINE} strokeWidth={stroke} strokeLinejoin="round">
        <polygon points={rect(0, 0, L, W)} />
        {pitch.markings !== 'minigoals' && pitch.markings !== 'none' && (
          <>
            <polyline points={pointsAttr([{ x: L / 2, y: 0 }, { x: L / 2, y: W }], projection)} />
            {pitch.centerCircleRadius ? (
              <circle cx={round(center.x)} cy={round(center.y)} r={pitch.centerCircleRadius} />
            ) : null}
            <circle cx={round(center.x)} cy={round(center.y)} r={stroke * 1.6} fill={LINE} />
          </>
        )}
        {pitch.penaltyArea &&
          [0, L].map((gx) => {
            const dir = gx === 0 ? 1 : -1
            const pa = pitch.penaltyArea!
            const x1 = gx + dir * pa.depth
            const parts = [
              <polygon
                key={`pa-${gx}`}
                points={rect(Math.min(gx, x1), W / 2 - pa.width / 2, Math.max(gx, x1), W / 2 + pa.width / 2)}
              />,
            ]
            if (pitch.goalArea) {
              const ga = pitch.goalArea
              const gx1 = gx + dir * ga.depth
              parts.push(
                <polygon
                  key={`ga-${gx}`}
                  points={rect(Math.min(gx, gx1), W / 2 - ga.width / 2, Math.max(gx, gx1), W / 2 + ga.width / 2)}
                />,
              )
            }
            if (pitch.penaltySpotDistance) {
              const spot = projection.toScreen({ x: gx + dir * pitch.penaltySpotDistance, y: W / 2 })
              parts.push(<circle key={`ps-${gx}`} cx={round(spot.x)} cy={round(spot.y)} r={stroke * 1.4} fill={LINE} />)
              if (pitch.centerCircleRadius) {
                // Teilkreis am Strafraum
                const spotPitch = { x: gx + dir * pitch.penaltySpotDistance, y: W / 2 }
                const r = pitch.centerCircleRadius
                const dx = pa.depth - pitch.penaltySpotDistance
                if (dx < r) {
                  const half = Math.acos(dx / r)
                  const base = dir === 1 ? 0 : Math.PI
                  parts.push(
                    <polyline key={`arc-${gx}`} points={pointsAttr(arcPoints(spotPitch, r, base - half, base + half), projection)} />,
                  )
                }
              }
            }
            return parts
          })}
        {pitch.markings === 'full' &&
          [
            { x: 0, y: 0, a: 0 },
            { x: L, y: 0, a: Math.PI / 2 },
            { x: L, y: W, a: Math.PI },
            { x: 0, y: W, a: (3 * Math.PI) / 2 },
          ].map((c) => (
            <polyline key={`c-${c.x}-${c.y}`} points={pointsAttr(arcPoints({ x: c.x, y: c.y }, 1, c.a, c.a + Math.PI / 2, 8), projection)} />
          ))}
      </g>
      <g fill="var(--pitch-goal, rgba(255,255,255,0.92))" stroke="var(--pitch-goal-net, rgba(0,0,0,0.25))" strokeWidth={stroke * 0.6}>
        {pitch.goals.map((goal) => (
          <polygon key={goal.id} points={goalBox(goal)} />
        ))}
      </g>
    </g>
  )
})
