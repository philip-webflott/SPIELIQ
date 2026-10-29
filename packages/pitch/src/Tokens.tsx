'use client'

import type { KeyboardEvent, PointerEvent } from 'react'
import type { PlayerState, Vec2 } from '@spieliq/engine'
import { usePitchContext } from './context'
import { round } from './projection'

export type TokenTone = 'good' | 'warn' | 'bad' | 'info' | null

export interface PlayerTokenProps {
  readonly player: PlayerState
  /** Darf der Lernende diese Figur bewegen bzw. antippen? */
  readonly interactive?: boolean
  readonly selected?: boolean
  readonly dragging?: boolean
  readonly tone?: TokenTone
  /** "Du"-Markierung für die gesteuerte Figur */
  readonly isYou?: boolean
  readonly dimmed?: boolean
  readonly ariaLabel?: string
  readonly onPointerDown?: (event: PointerEvent<SVGGElement>, player: PlayerState) => void
  readonly onKeyDown?: (event: KeyboardEvent<SVGGElement>, player: PlayerState) => void
  readonly onActivate?: (player: PlayerState) => void
}

const TONE_COLOR: Record<Exclude<TokenTone, null>, string> = {
  good: 'var(--signal-good, #3bd671)',
  warn: 'var(--signal-warn, #ffc53d)',
  bad: 'var(--signal-bad, #ff5d73)',
  info: 'var(--signal-info, #9ecbff)',
}

/**
 * Spielfigur. Eigene Spieler: gefüllter blauer Kreis mit hellem Rand.
 * Gegner: oranger Kreis mit dunklem Doppelrand – so sind beide Teams auch
 * ohne Farbwahrnehmung unterscheidbar (WCAG 1.4.1).
 */
export function PlayerToken({
  player,
  interactive = false,
  selected = false,
  dragging = false,
  tone = null,
  isYou = false,
  dimmed = false,
  ariaLabel,
  onPointerDown,
  onKeyDown,
  onActivate,
}: PlayerTokenProps) {
  const { projection, unit } = usePitchContext()
  const s = projection.toScreen(player.pos)
  const r = 1.3 * unit
  const isOwn = player.team === 'own'
  const isKeeper = player.role === 'GK'
  const fill = isOwn ? (isKeeper ? 'var(--team-own-keeper, #9ad0ff)' : 'var(--team-own, #4aa3ff)') : isKeeper ? 'var(--team-opp-keeper, #ffc08a)' : 'var(--team-opp, #ff8a3d)'
  const rim = isOwn ? 'var(--team-own-rim, #eaf4ff)' : 'var(--team-opp-rim, #4a1d00)'
  const textColor = isOwn ? 'var(--team-own-text, #04213f)' : 'var(--team-opp-text, #2b1100)'
  const label = player.label ?? ''

  return (
    <g
      className="pitch-token"
      data-player-id={player.id}
      data-team={player.team}
      data-interactive={interactive ? 'true' : undefined}
      transform={`translate(${round(s.x)} ${round(s.y)})`}
      style={{ cursor: interactive ? (dragging ? 'grabbing' : 'grab') : 'default', opacity: dimmed ? 0.45 : 1 }}
      role={interactive ? 'button' : 'img'}
      tabIndex={interactive ? 0 : undefined}
      aria-label={ariaLabel}
      aria-pressed={interactive ? selected : undefined}
      onPointerDown={interactive && onPointerDown ? (e) => onPointerDown(e, player) : undefined}
      onKeyDown={interactive && onKeyDown ? (e) => onKeyDown(e, player) : undefined}
      onClick={interactive && onActivate ? () => onActivate(player) : undefined}
    >
      {/* großzügige, unsichtbare Trefferfläche für Touch (≥ 44 px auf dem Smartphone) */}
      {interactive && <circle r={r * 2.1} fill="transparent" />}
      <ellipse cx={r * 0.12} cy={r * 0.35} rx={r * 1.02} ry={r * 0.8} fill="rgba(0,0,0,0.28)" />
      {(selected || dragging) && (
        <circle r={r * 1.75} fill="none" stroke="var(--focus-ring, #ffffff)" strokeWidth={0.28 * unit} className="pitch-pulse" />
      )}
      {tone && <circle r={r * 1.45} fill="none" stroke={TONE_COLOR[tone]} strokeWidth={0.35 * unit} />}
      {interactive && !selected && !dragging && (
        <circle r={r * 1.38} fill="none" stroke="var(--focus-ring, #ffffff)" strokeWidth={0.12 * unit} strokeDasharray={`${0.5 * unit} ${0.35 * unit}`} opacity={0.85} />
      )}
      <circle r={r} fill={fill} stroke={rim} strokeWidth={(isOwn ? 0.28 : 0.42) * unit} />
      {!isOwn && <circle r={r * 0.72} fill="none" stroke={rim} strokeWidth={0.1 * unit} opacity={0.6} />}
      <text
        y={0.02 * unit}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={(label.length > 1 ? 1.25 : 1.45) * unit}
        fontWeight={700}
        fill={textColor}
        style={{ fontFamily: 'var(--font-display, sans-serif)', pointerEvents: 'none', userSelect: 'none' }}
      >
        {label}
      </text>
      {isYou && (
        <g transform={`translate(0 ${round(-r * 2.15)})`} style={{ pointerEvents: 'none' }}>
          <rect x={-1.6 * unit} y={-0.62 * unit} width={3.2 * unit} height={1.24 * unit} rx={0.62 * unit} fill="var(--accent, #3bd671)" />
          <text textAnchor="middle" dominantBaseline="central" fontSize={0.85 * unit} fontWeight={800} fill="var(--accent-ink, #04150a)" style={{ fontFamily: 'var(--font-display, sans-serif)' }}>
            DU
          </text>
        </g>
      )}
    </g>
  )
}

export function BallToken({ pos, owned }: { readonly pos: Vec2; readonly owned: boolean }) {
  const { projection, unit } = usePitchContext()
  // Am Fuß des Ballführenden leicht versetzt, damit Rückennummer lesbar bleibt
  const offset = owned ? { x: 1.15 * unit, y: 1.0 * unit } : { x: 0, y: 0 }
  const s = projection.toScreen(pos)
  const r = 0.62 * unit
  return (
    <g transform={`translate(${round(s.x + offset.x)} ${round(s.y + offset.y)})`} aria-hidden="true" style={{ pointerEvents: 'none' }}>
      <circle r={r * 1.25} fill="rgba(0,0,0,0.3)" cx={r * 0.2} cy={r * 0.3} />
      <circle r={r} fill="#ffffff" stroke="#111827" strokeWidth={0.12 * unit} />
      <polygon
        points={Array.from({ length: 5 }, (_, i) => {
          const a = (Math.PI * 2 * i) / 5 - Math.PI / 2
          return `${round(Math.cos(a) * r * 0.42)},${round(Math.sin(a) * r * 0.42)}`
        }).join(' ')}
        fill="#111827"
      />
    </g>
  )
}
