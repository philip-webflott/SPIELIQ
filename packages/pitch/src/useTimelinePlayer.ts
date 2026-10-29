'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { sampleTimeline, type Timeline, type TimelineFrame } from '@spieliq/engine'

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {}
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

/** Systemeinstellung "Bewegung reduzieren" (WCAG 2.3.3). */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false),
    () => false,
  )
}

export interface TimelinePlayer {
  readonly frame: TimelineFrame | null
  readonly time: number
  readonly duration: number
  readonly playing: boolean
  readonly finished: boolean
  readonly speed: number
  play(): void
  pause(): void
  restart(): void
  skipToEnd(): void
  setSpeed(speed: number): void
}

/**
 * Spielt eine Zeitleiste mit requestAnimationFrame ab (Pause, Zeitlupe,
 * Wiederholen). Bei reduzierter Bewegung wird ohne Animation das Ende gezeigt.
 *
 * Wichtig: Die aufrufende Komponente wird pro Zeitleiste neu gemountet
 * (React-`key`), dadurch beginnt jede Zeitleiste sauber bei 0.
 */
export function useTimelinePlayer(
  timeline: Timeline | null,
  options: { autoplay?: boolean; reducedMotion?: boolean; onFinish?: () => void } = {},
): TimelinePlayer {
  const { autoplay = true, reducedMotion = false, onFinish } = options
  const duration = timeline?.duration ?? 0
  const [time, setTime] = useState(() => (timeline && reducedMotion ? duration : 0))
  const [playing, setPlaying] = useState(() => Boolean(timeline) && autoplay && !reducedMotion)
  const [speed, setSpeed] = useState(1)
  const timeRef = useRef(time)
  const finishRef = useRef(onFinish)
  const reportedRef = useRef(false)

  useEffect(() => {
    finishRef.current = onFinish
  })

  const reportFinish = useCallback(() => {
    if (reportedRef.current) return
    reportedRef.current = true
    finishRef.current?.()
  }, [])

  // Bei reduzierter Bewegung ist die Zeitleiste sofort "fertig".
  useEffect(() => {
    if (timeline && reducedMotion) reportFinish()
  }, [timeline, reducedMotion, reportFinish])

  useEffect(() => {
    if (!playing || !timeline) return
    let frameId: number | null = null
    let last: number | null = null
    const tick = (now: number) => {
      const prev = last ?? now
      last = now
      const next = Math.min(timeline.duration, timeRef.current + ((now - prev) / 1000) * speed)
      timeRef.current = next
      setTime(next)
      if (next >= timeline.duration) {
        setPlaying(false)
        reportFinish()
        return
      }
      frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)
    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId)
    }
  }, [playing, timeline, speed, reportFinish])

  const play = useCallback(() => {
    if (!timeline) return
    if (timeRef.current >= timeline.duration) {
      timeRef.current = 0
      setTime(0)
    }
    setPlaying(true)
  }, [timeline])
  const pause = useCallback(() => setPlaying(false), [])
  const restart = useCallback(() => {
    timeRef.current = 0
    setTime(0)
    setPlaying(true)
  }, [])
  const skipToEnd = useCallback(() => {
    if (!timeline) return
    timeRef.current = timeline.duration
    setTime(timeline.duration)
    setPlaying(false)
    reportFinish()
  }, [timeline, reportFinish])

  return {
    frame: timeline ? sampleTimeline(timeline, time) : null,
    time,
    duration,
    playing,
    finished: Boolean(timeline) && time >= duration,
    speed,
    play,
    pause,
    restart,
    skipToEnd,
    setSpeed,
  }
}
