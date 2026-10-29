'use client'

import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import {
  analyzePass,
  coverShadow,
  findPlayer,
  fullWindow,
  passOptions,
  teamPlayers,
  type BoardState,
  type Evidence,
  type LoadedMission,
  type Overlay,
  type PitchWindow,
  type PlayerState,
  type Vec2,
} from '@spieliq/engine'
import { t } from '@spieliq/content'
import {
  Arrow,
  BallToken,
  CircleZone,
  createProjection,
  DistanceLine,
  EmptyArea,
  FreeSpaceGlow,
  LaneLine,
  PitchLabel,
  PitchSvg,
  PlayerToken,
  preferredOrientation,
  ShadowCone,
  TapMarker,
  usePitchTap,
  usePlacement,
  ZoneShape,
  type Orientation,
  type TokenTone,
} from '@spieliq/pitch'

export interface PlacementConfig {
  readonly enabled: boolean
  readonly positions: Readonly<Record<string, Vec2>>
  readonly onMove: (id: string, pos: Vec2) => void
  readonly clamp: (p: Vec2) => Vec2
}

export interface BoardViewProps {
  readonly loaded: LoadedMission
  readonly state: BoardState
  readonly overlays?: readonly Overlay[]
  readonly evidence?: readonly Evidence[]
  readonly liveLanes?: boolean
  readonly controlled?: readonly string[]
  readonly selectable?: readonly string[]
  readonly selectedPlayerId?: string | null
  readonly tapPoint?: Vec2 | null
  readonly highlight?: Readonly<Record<string, TokenTone>>
  readonly onPlayerTap?: (id: string) => void
  readonly onPointTap?: (p: Vec2) => void
  readonly placement?: PlacementConfig
  /** Bildausschnitt (Meter); Standard: Ausschnitt der Mission bzw. ganzes Feld */
  readonly view?: PitchWindow
  readonly label: string
}

function resolvePoint(state: BoardState, ref: string | Vec2): Vec2 | null {
  if (typeof ref === 'string') return findPlayer(state, ref)?.pos ?? null
  return ref
}

function nearestOpponentDistance(state: BoardState, player: PlayerState): number {
  const others = teamPlayers(state, player.team === 'own' ? 'opp' : 'own').filter((p) => p.role !== 'GK')
  return Math.min(...others.map((o) => Math.hypot(o.pos.x - player.pos.x, o.pos.y - player.pos.y)), 25)
}

function describePlayer(p: PlayerState, controlled: boolean): string {
  const team = p.team === 'own' ? 'Blau, eigene Mannschaft' : 'Orange, Gegner'
  const role = p.role === 'GK' ? ', Torwart' : ''
  return `Nummer ${p.label ?? p.id}, ${team}${role}${controlled ? '. Du kannst diesen Spieler bewegen' : ''}`
}

export function BoardView({
  loaded,
  state,
  overlays = [],
  evidence = [],
  liveLanes = false,
  controlled = [],
  selectable = [],
  selectedPlayerId = null,
  tapPoint = null,
  highlight = {},
  onPlayerTap,
  onPointTap,
  placement,
  view,
  label,
}: BoardViewProps) {
  const { pitch, model } = loaded
  const pitchWindow = useMemo(() => view ?? loaded.mission.view ?? fullWindow(pitch), [view, loaded, pitch])
  const containerRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [orientation, setOrientation] = useState<Orientation>('landscape')

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect
      if (rect && rect.width > 0 && rect.height > 0) setOrientation(preferredOrientation(pitchWindow, rect.width / rect.height))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [pitchWindow])

  const projection = useMemo(() => createProjection(pitch, pitchWindow, orientation), [pitch, pitchWindow, orientation])
  const tap = usePitchTap(svgRef, projection)

  const noop = () => {}
  const placementApi = usePlacement({
    svgRef,
    projection,
    controlled,
    positions: placement?.positions ?? {},
    enabled: Boolean(placement?.enabled),
    clamp: placement?.clamp ?? ((p) => p),
    onMove: placement?.onMove ?? noop,
  })

  const ownCarrier = state.ball.ownerId ? findPlayer(state, state.ball.ownerId) : undefined

  const lanes = useMemo(() => {
    if (!liveLanes || !ownCarrier) return []
    return passOptions(state, ownCarrier.id, model).filter((p) => controlled.includes(p.toId ?? ''))
  }, [liveLanes, ownCarrier, state, model, controlled])

  const handleSvgClick = (event: MouseEvent<SVGSVGElement>) => {
    if (placement?.enabled) {
      placementApi.svgHandlers.onClick(event)
      return
    }
    if (onPointTap) {
      const p = tap(event)
      if (p) onPointTap(p)
    }
  }

  // Zeichenreihenfolge: Gegner, eigene Spieler, steuerbare Spieler – der Ballführende immer obenauf.
  const sortedPlayers = [...state.players].sort((a, b) => {
    const rank = (p: PlayerState) =>
      p.id === state.ball.ownerId ? 3 : controlled.includes(p.id) ? 2 : p.team === 'own' ? 1 : 0
    return rank(a) - rank(b)
  })

  const renderOverlay = (o: Overlay, i: number) => {
    switch (o.type) {
      case 'lane': {
        const from = findPlayer(state, o.from)
        const to = findPlayer(state, o.to)
        if (!from || !to) return null
        const pass = analyzePass(state, from.id, to.id, model)
        return <LaneLine key={`o${i}`} from={from.pos} to={to.pos} status={pass.status} emphasis />
      }
      case 'passOptions': {
        const from = findPlayer(state, o.from)
        if (!from) return null
        return passOptions(state, from.id, model, { includeGoalkeeper: false }).map((pass, j) => (
          <LaneLine key={`o${i}-${j}`} from={pass.from} to={pass.to} status={pass.status} />
        ))
      }
      case 'freeSpace': {
        const p = findPlayer(state, o.around)
        if (!p) return null
        return <FreeSpaceGlow key={`o${i}`} center={p.pos} radius={Math.max(3, nearestOpponentDistance(state, p) * 0.8)} />
      }
      case 'shadow': {
        const d = findPlayer(state, o.defender)
        if (!d) return null
        const poly = coverShadow(state.ball.pos, d, model)
        return poly ? <ShadowCone key={`o${i}`} polygon={poly} /> : null
      }
      case 'zone':
        return <ZoneShape key={`o${i}`} polygon={o.polygon} tone={o.tone} />
      case 'arrow': {
        const from = resolvePoint(state, o.from)
        const to = resolvePoint(state, o.to)
        return from && to ? <Arrow key={`o${i}`} from={from} to={to} tone={o.tone} dashed={o.dashed} /> : null
      }
      case 'distance': {
        const a = findPlayer(state, o.a)
        const b = findPlayer(state, o.b)
        if (!a || !b) return null
        return <DistanceLine key={`o${i}`} from={a.pos} to={b.pos} meters={Math.hypot(a.pos.x - b.pos.x, a.pos.y - b.pos.y)} />
      }
      case 'label': {
        const at = resolvePoint(state, o.at)
        return at ? <PitchLabel key={`o${i}`} at={at} text={t(o.text)} /> : null
      }
      case 'emptyArea':
        return <EmptyArea key={`o${i}`} center={o.center} radius={o.radius} />
      case 'ring':
        return null
    }
  }

  const ringTones: Record<string, TokenTone> = { ...highlight }
  for (const o of overlays) if (o.type === 'ring') ringTones[o.player] = o.tone
  for (const e of evidence) if (e.type === 'highlight') ringTones[e.playerId] = e.tone

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <PitchSvg
        ref={svgRef}
        pitch={pitch}
        window={pitchWindow}
        orientation={orientation}
        label={label}
        className="h-full w-full touch-none select-none"
        onClick={handleSvgClick}
        onPointerMove={placementApi.svgHandlers.onPointerMove}
        onPointerUp={placementApi.svgHandlers.onPointerUp}
        onPointerCancel={placementApi.svgHandlers.onPointerCancel}
      >
        <g>{overlays.map(renderOverlay)}</g>
        <g>
          {evidence.map((e, i) => {
            switch (e.type) {
              case 'lane':
                return <LaneLine key={`e${i}`} from={e.from} to={e.to} status={e.status} emphasis />
              case 'distance':
                return <DistanceLine key={`e${i}`} from={e.from} to={e.to} meters={e.meters} tone={e.tone} />
              case 'zone':
                return <ZoneShape key={`e${i}`} polygon={e.polygon} tone={e.tone} />
              case 'circle':
                return <CircleZone key={`e${i}`} center={e.center} radius={e.radius} tone={e.tone} />
              default:
                return null
            }
          })}
          {lanes.map((pass) => (
            <LaneLine key={`live-${pass.toId}`} from={pass.from} to={pass.to} status={pass.status} />
          ))}
        </g>
        <g>
          {sortedPlayers.map((p) => {
            const isControlled = controlled.includes(p.id) && Boolean(placement?.enabled)
            const isSelectable = selectable.includes(p.id)
            return (
              <PlayerToken
                key={p.id}
                player={p}
                interactive={isControlled || isSelectable}
                selected={placementApi.selectedId === p.id || selectedPlayerId === p.id}
                dragging={placementApi.draggingId === p.id}
                tone={ringTones[p.id] ?? null}
                isYou={controlled.length === 1 && controlled[0] === p.id}
                ariaLabel={describePlayer(p, isControlled)}
                onPointerDown={isControlled ? placementApi.tokenHandlers.onPointerDown : undefined}
                onKeyDown={
                  isControlled
                    ? placementApi.tokenHandlers.onKeyDown
                    : isSelectable && onPlayerTap
                      ? (e, player) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            onPlayerTap(player.id)
                          }
                        }
                      : undefined
                }
                onActivate={isSelectable && onPlayerTap ? (player) => onPlayerTap(player.id) : undefined}
              />
            )
          })}
        </g>
        <BallToken pos={state.ball.pos} owned={Boolean(state.ball.ownerId)} />
        {tapPoint && <TapMarker at={tapPoint} tone="warn" />}
      </PitchSvg>
    </div>
  )
}
