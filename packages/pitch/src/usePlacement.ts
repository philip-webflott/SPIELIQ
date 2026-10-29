'use client'

import { useCallback, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent, type RefObject } from 'react'
import type { PlayerState, Vec2 } from '@spieliq/engine'
import type { Projection } from './projection'

/**
 * Interaktion zum Positionieren von Spielfiguren – drei gleichwertige Wege:
 * 1. Ziehen mit Maus, Stift oder Finger (Pointer Events)
 * 2. Antippen der Figur und dann Antippen des Zielpunkts (WCAG 2.5.7)
 * 3. Tastatur: Tab zur Figur, Pfeiltasten bewegen (Umschalt = fein, Alt = grob)
 *
 * Auf Touch-Geräten wird die Figur beim Ziehen etwas über dem Finger
 * angezeigt, damit sie nicht verdeckt ist.
 */
export interface PlacementOptions {
  readonly svgRef: RefObject<SVGSVGElement | null>
  readonly projection: Projection
  readonly controlled: readonly string[]
  readonly positions: Readonly<Record<string, Vec2>>
  readonly enabled: boolean
  readonly clamp: (p: Vec2) => Vec2
  readonly onMove: (id: string, pos: Vec2) => void
  readonly onDragStateChange?: (draggingId: string | null) => void
}

interface DragState {
  id: string
  pointerId: number
  pointerType: string
  offset: Vec2
  startX: number
  startY: number
  moved: boolean
}

const TOUCH_LIFT_PX = 46
const TAP_TOLERANCE_PX = 6

export function usePlacement(options: PlacementOptions) {
  const { svgRef, projection, controlled, positions, enabled, clamp, onMove, onDragStateChange } = options
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const drag = useRef<DragState | null>(null)
  const suppressClick = useRef(false)

  const clientToPitch = useCallback(
    (clientX: number, clientY: number): Vec2 | null => {
      const svg = svgRef.current
      const matrix = svg?.getScreenCTM()
      if (!svg || !matrix) return null
      const pt = svg.createSVGPoint()
      pt.x = clientX
      pt.y = clientY
      const local = pt.matrixTransform(matrix.inverse())
      return projection.toPitch({ x: local.x, y: local.y })
    },
    [svgRef, projection],
  )

  const isControlled = useCallback((id: string) => enabled && controlled.includes(id), [enabled, controlled])

  const onTokenPointerDown = useCallback(
    (event: PointerEvent<SVGGElement>, player: PlayerState) => {
      if (!isControlled(player.id)) return
      const pointer = clientToPitch(event.clientX, event.clientY)
      const current = positions[player.id] ?? player.pos
      if (!pointer) return
      event.preventDefault()
      event.stopPropagation()
      svgRef.current?.setPointerCapture(event.pointerId)
      drag.current = {
        id: player.id,
        pointerId: event.pointerId,
        pointerType: event.pointerType,
        offset: { x: current.x - pointer.x, y: current.y - pointer.y },
        startX: event.clientX,
        startY: event.clientY,
        moved: false,
      }
    },
    [clientToPitch, isControlled, positions, svgRef],
  )

  const onSvgPointerMove = useCallback(
    (event: PointerEvent<SVGSVGElement>) => {
      const d = drag.current
      if (!d || d.pointerId !== event.pointerId) return
      const dist = Math.hypot(event.clientX - d.startX, event.clientY - d.startY)
      if (!d.moved && dist < TAP_TOLERANCE_PX) return
      if (!d.moved) {
        d.moved = true
        setDraggingId(d.id)
        setSelectedId(d.id)
        onDragStateChange?.(d.id)
      }
      let target: Vec2 | null
      if (d.pointerType === 'touch') {
        target = clientToPitch(event.clientX, event.clientY - TOUCH_LIFT_PX)
      } else {
        const p = clientToPitch(event.clientX, event.clientY)
        target = p ? { x: p.x + d.offset.x, y: p.y + d.offset.y } : null
      }
      if (target) onMove(d.id, clamp(target))
    },
    [clamp, clientToPitch, onDragStateChange, onMove],
  )

  const endDrag = useCallback(
    (event: PointerEvent<SVGSVGElement>) => {
      const d = drag.current
      if (!d || d.pointerId !== event.pointerId) return
      svgRef.current?.releasePointerCapture?.(event.pointerId)
      drag.current = null
      if (d.moved) {
        setDraggingId(null)
        onDragStateChange?.(null)
        suppressClick.current = true
      } else {
        // Antippen ohne Bewegen: Figur auswählen bzw. Auswahl aufheben
        setSelectedId((cur) => (cur === d.id ? null : d.id))
        suppressClick.current = true
      }
    },
    [onDragStateChange, svgRef],
  )

  /** Antippen einer freien Stelle: ausgewählte Figur dorthin setzen. */
  const onSvgClick = useCallback(
    (event: MouseEvent<SVGSVGElement>) => {
      if (suppressClick.current) {
        suppressClick.current = false
        return
      }
      if (!enabled || !selectedId) return
      const p = clientToPitch(event.clientX, event.clientY)
      if (!p) return
      onMove(selectedId, clamp(p))
      setSelectedId(null)
    },
    [clamp, clientToPitch, enabled, onMove, selectedId],
  )

  const onTokenKeyDown = useCallback(
    (event: KeyboardEvent<SVGGElement>, player: PlayerState) => {
      if (!isControlled(player.id)) return
      const step = event.shiftKey ? 0.25 : event.altKey ? 5 : 1
      const keys: Record<string, Vec2> = {
        ArrowUp: { x: 0, y: -step },
        ArrowDown: { x: 0, y: step },
        ArrowLeft: { x: -step, y: 0 },
        ArrowRight: { x: step, y: 0 },
      }
      const delta = keys[event.key]
      if (delta) {
        event.preventDefault()
        const current = positions[player.id] ?? player.pos
        // Bewegung in Bildschirmrichtung, unabhängig von der Ausrichtung des Feldes
        const s = projection.toScreen(current)
        onMove(player.id, clamp(projection.toPitch({ x: s.x + delta.x, y: s.y + delta.y })))
        setSelectedId(player.id)
        return
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        setSelectedId((cur) => (cur === player.id ? null : player.id))
      }
      if (event.key === 'Escape') setSelectedId(null)
    },
    [clamp, isControlled, onMove, positions, projection],
  )

  return {
    selectedId,
    draggingId,
    setSelectedId,
    tokenHandlers: { onPointerDown: onTokenPointerDown, onKeyDown: onTokenKeyDown },
    svgHandlers: {
      onPointerMove: onSvgPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onClick: onSvgClick,
    },
  }
}

/** Antippen von Spielern oder Punkten (Erkennungsaufgaben). */
export function usePitchTap(svgRef: RefObject<SVGSVGElement | null>, projection: Projection) {
  return useCallback(
    (event: MouseEvent<SVGSVGElement>): Vec2 | null => {
      const svg = svgRef.current
      const matrix = svg?.getScreenCTM()
      if (!svg || !matrix) return null
      const pt = svg.createSVGPoint()
      pt.x = event.clientX
      pt.y = event.clientY
      const local = pt.matrixTransform(matrix.inverse())
      return projection.toPitch({ x: local.x, y: local.y })
    },
    [svgRef, projection],
  )
}
