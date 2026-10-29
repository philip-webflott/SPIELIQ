'use client'

import type { LaneStatus, Vec2 } from '@spieliq/engine'
import { add, distance, normalize, perp, scale, sub } from '@spieliq/engine'
import { usePitchContext } from './context'
import { pointsAttr, round } from './projection'

export type OverlayTone = 'good' | 'warn' | 'bad' | 'info'

const TONE: Record<OverlayTone, string> = {
  good: 'var(--signal-good, #3bd671)',
  warn: 'var(--signal-warn, #ffc53d)',
  bad: 'var(--signal-bad, #ff5d73)',
  info: 'var(--signal-info, #9ecbff)',
}

const LANE_STYLE: Record<LaneStatus, { color: string; dash?: string; label: string }> = {
  open: { color: 'var(--lane-open, #f4fbff)', label: '✓' },
  risky: { color: 'var(--signal-warn, #ffc53d)', dash: '1.2 0.9', label: '!' },
  blocked: { color: 'var(--lane-blocked, #ffa3b0)', dash: '0.5 0.7', label: '✕' },
}

/** Passweg vom Ballführenden zum Mitspieler – Form UND Symbol zeigen den Status (nicht nur Farbe). */
export function LaneLine({ from, to, status, emphasis = false }: { from: Vec2; to: Vec2; status: LaneStatus; emphasis?: boolean }) {
  const { projection, unit } = usePitchContext()
  const style = LANE_STYLE[status]
  const a = projection.toScreen(from)
  const b = projection.toScreen(to)
  const dir = normalize(sub(b, a))
  const len = distance(a, b)
  // Linie endet vor der Figur, damit die Rückennummer frei bleibt
  const start = add(a, scale(dir, Math.min(len / 3, 1.9 * unit)))
  const end = add(a, scale(dir, Math.max(len - 2.1 * unit, len * 0.6)))
  const headSize = 1.1 * unit
  const left = add(end, add(scale(dir, -headSize), scale(perp(dir), headSize * 0.55)))
  const right = add(end, add(scale(dir, -headSize), scale(perp(dir), -headSize * 0.55)))
  const mid = add(a, scale(dir, len * 0.5))
  const width = (emphasis ? 0.42 : 0.3) * unit
  const dash = style.dash ? style.dash.split(' ').map((v) => Number(v) * unit).join(' ') : undefined
  return (
    <g aria-hidden="true" style={{ pointerEvents: 'none' }} data-lane-status={status}>
      <line x1={round(start.x)} y1={round(start.y)} x2={round(end.x)} y2={round(end.y)} stroke="rgba(0,0,0,0.35)" strokeWidth={width + 0.25 * unit} strokeLinecap="round" />
      <line
        x1={round(start.x)}
        y1={round(start.y)}
        x2={round(end.x)}
        y2={round(end.y)}
        stroke={style.color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dash}
      />
      {status === 'open' && <polygon points={`${round(end.x + dir.x * 0.3)},${round(end.y + dir.y * 0.3)} ${round(left.x)},${round(left.y)} ${round(right.x)},${round(right.y)}`} fill={style.color} />}
      {status !== 'open' && (
        <g transform={`translate(${round(mid.x)} ${round(mid.y)})`}>
          <circle r={0.95 * unit} fill="rgba(5,10,20,0.85)" stroke={style.color} strokeWidth={0.18 * unit} />
          <text textAnchor="middle" dominantBaseline="central" fontSize={1.1 * unit} fontWeight={800} fill={style.color}>
            {style.label}
          </text>
        </g>
      )}
    </g>
  )
}

export function DistanceLine({ from, to, meters, tone = 'info' }: { from: Vec2; to: Vec2; meters: number; tone?: OverlayTone }) {
  const { projection, unit } = usePitchContext()
  const a = projection.toScreen(from)
  const b = projection.toScreen(to)
  const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
  const text = `${meters.toLocaleString('de-DE', { maximumFractionDigits: 0 })} m`
  return (
    <g aria-hidden="true" style={{ pointerEvents: 'none' }}>
      <line x1={round(a.x)} y1={round(a.y)} x2={round(b.x)} y2={round(b.y)} stroke={TONE[tone]} strokeWidth={0.18 * unit} strokeDasharray={`${0.35 * unit} ${0.35 * unit}`} />
      <g transform={`translate(${round(mid.x)} ${round(mid.y)})`}>
        <rect x={-2.1 * unit} y={-0.75 * unit} width={4.2 * unit} height={1.5 * unit} rx={0.75 * unit} fill="rgba(5,10,20,0.88)" stroke={TONE[tone]} strokeWidth={0.12 * unit} />
        <text textAnchor="middle" dominantBaseline="central" fontSize={0.95 * unit} fontWeight={700} fill="#ffffff" style={{ fontFamily: 'var(--font-display, sans-serif)' }}>
          {text}
        </text>
      </g>
    </g>
  )
}

export function ZoneShape({ polygon, tone = 'info' }: { polygon: readonly Vec2[]; tone?: OverlayTone }) {
  const { projection, unit } = usePitchContext()
  return (
    <polygon
      aria-hidden="true"
      points={pointsAttr(polygon, projection)}
      fill={TONE[tone]}
      fillOpacity={0.14}
      stroke={TONE[tone]}
      strokeOpacity={0.7}
      strokeWidth={0.16 * unit}
      strokeDasharray={`${0.6 * unit} ${0.4 * unit}`}
      style={{ pointerEvents: 'none' }}
    />
  )
}

export function CircleZone({ center, radius, tone = 'info', dashed = true }: { center: Vec2; radius: number; tone?: OverlayTone; dashed?: boolean }) {
  const { projection, unit } = usePitchContext()
  const c = projection.toScreen(center)
  return (
    <circle
      aria-hidden="true"
      cx={round(c.x)}
      cy={round(c.y)}
      r={radius}
      fill={TONE[tone]}
      fillOpacity={0.12}
      stroke={TONE[tone]}
      strokeOpacity={0.75}
      strokeWidth={0.16 * unit}
      strokeDasharray={dashed ? `${0.6 * unit} ${0.4 * unit}` : undefined}
      style={{ pointerEvents: 'none' }}
    />
  )
}

/** "Hier ist Platz": weicher Lichthof um einen freien Spieler. */
export function FreeSpaceGlow({ center, radius }: { center: Vec2; radius: number }) {
  const { projection } = usePitchContext()
  const c = projection.toScreen(center)
  const id = `free-${Math.round(center.x * 10)}-${Math.round(center.y * 10)}`
  return (
    <g aria-hidden="true" style={{ pointerEvents: 'none' }}>
      <defs>
        <radialGradient id={id}>
          <stop offset="0%" stopColor="var(--free-space, #ffd84d)" stopOpacity={0.5} />
          <stop offset="70%" stopColor="var(--free-space, #ffd84d)" stopOpacity={0.18} />
          <stop offset="100%" stopColor="var(--free-space, #ffd84d)" stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={round(c.x)} cy={round(c.y)} r={radius} fill={`url(#${id})`} className="pitch-breathe" />
    </g>
  )
}

/** Verlassener Raum ("hier ist niemand mehr"). */
export function EmptyArea({ center, radius }: { center: Vec2; radius: number }) {
  const { projection, unit } = usePitchContext()
  const c = projection.toScreen(center)
  return (
    <g aria-hidden="true" style={{ pointerEvents: 'none' }}>
      <circle cx={round(c.x)} cy={round(c.y)} r={radius} fill="var(--free-space, #ffd84d)" fillOpacity={0.1} stroke="var(--free-space, #ffd84d)" strokeWidth={0.22 * unit} strokeDasharray={`${0.9 * unit} ${0.6 * unit}`} className="pitch-breathe" />
      <text x={round(c.x)} y={round(c.y - radius * 0.62)} textAnchor="middle" dominantBaseline="central" fontSize={1.5 * unit} fontWeight={800} fill="var(--free-space, #ffd84d)" style={{ fontFamily: 'var(--font-display, sans-serif)', letterSpacing: '0.06em' }}>
        FREI
      </text>
    </g>
  )
}

export function Arrow({ from, to, tone = 'info', dashed = true }: { from: Vec2; to: Vec2; tone?: OverlayTone; dashed?: boolean }) {
  const { projection, unit } = usePitchContext()
  const a = projection.toScreen(from)
  const b = projection.toScreen(to)
  const dir = normalize(sub(b, a))
  const end = sub(b, scale(dir, 0.6 * unit))
  const head = 1.0 * unit
  const left = add(end, add(scale(dir, -head), scale(perp(dir), head * 0.6)))
  const right = add(end, add(scale(dir, -head), scale(perp(dir), -head * 0.6)))
  return (
    <g aria-hidden="true" style={{ pointerEvents: 'none' }}>
      <line x1={round(a.x)} y1={round(a.y)} x2={round(end.x)} y2={round(end.y)} stroke={TONE[tone]} strokeWidth={0.3 * unit} strokeLinecap="round" strokeDasharray={dashed ? `${0.8 * unit} ${0.5 * unit}` : undefined} />
      <polygon points={`${round(b.x)},${round(b.y)} ${round(left.x)},${round(left.y)} ${round(right.x)},${round(right.y)}`} fill={TONE[tone]} />
    </g>
  )
}

export function ShadowCone({ polygon }: { polygon: readonly Vec2[] }) {
  const { projection } = usePitchContext()
  return <polygon aria-hidden="true" points={pointsAttr(polygon, projection)} fill="rgba(3,8,18,0.32)" style={{ pointerEvents: 'none' }} />
}

export function PitchLabel({ at, text }: { at: Vec2; text: string }) {
  const { projection, unit } = usePitchContext()
  const s = projection.toScreen(at)
  const width = Math.max(4, text.length * 0.62) * unit
  return (
    <g transform={`translate(${round(s.x)} ${round(s.y)})`} aria-hidden="true" style={{ pointerEvents: 'none' }}>
      <rect x={-width / 2} y={-0.85 * unit} width={width} height={1.7 * unit} rx={0.85 * unit} fill="rgba(5,10,20,0.88)" />
      <text textAnchor="middle" dominantBaseline="central" fontSize={1.0 * unit} fontWeight={700} fill="#ffffff">
        {text}
      </text>
    </g>
  )
}

/** Markierung eines angetippten Punktes auf dem Feld. */
export function TapMarker({ at, tone = 'info' }: { at: Vec2; tone?: OverlayTone }) {
  const { projection, unit } = usePitchContext()
  const s = projection.toScreen(at)
  return (
    <g transform={`translate(${round(s.x)} ${round(s.y)})`} aria-hidden="true" style={{ pointerEvents: 'none' }}>
      <circle r={1.2 * unit} fill="none" stroke={TONE[tone]} strokeWidth={0.3 * unit} />
      <circle r={0.3 * unit} fill={TONE[tone]} />
    </g>
  )
}
