'use client'

import { forwardRef, useMemo, type ReactNode, type SVGProps } from 'react'
import type { PitchSpec, PitchWindow } from '@spieliq/engine'
import { PitchContextProvider } from './context'
import { PitchMarkings } from './Markings'
import { createProjection, type Orientation } from './projection'

export interface PitchSvgProps extends Omit<SVGProps<SVGSVGElement>, 'ref' | 'viewBox'> {
  readonly pitch: PitchSpec
  readonly window: PitchWindow
  readonly orientation: Orientation
  readonly label: string
  readonly children?: ReactNode
}

/**
 * Wurzel des Spielfelds. Rendert Rasen und Markierungen und stellt die
 * Projektion für alle Ebenen (Spieler, Ball, Overlays) bereit.
 */
export const PitchSvg = forwardRef<SVGSVGElement, PitchSvgProps>(function PitchSvg(
  { pitch, window, orientation, label, children, className, ...rest },
  ref,
) {
  const projection = useMemo(() => createProjection(pitch, window, orientation), [pitch, window, orientation])
  const unit = Math.max(window.width, window.height) / 60
  // Stabiler Kontextwert: Linien und andere unveränderte Ebenen zeichnen während einer Animation nicht neu.
  const context = useMemo(() => ({ pitch, projection, unit }), [pitch, projection, unit])
  const vb = projection.viewBox
  return (
    <svg
      ref={ref}
      viewBox={`${vb.x} ${vb.y} ${vb.width} ${vb.height}`}
      className={className}
      role="group"
      aria-label={label}
      data-orientation={orientation}
      data-pitch-length={pitch.length}
      preserveAspectRatio="xMidYMid meet"
      {...rest}
    >
      <PitchContextProvider value={context}>
        <PitchMarkings />
        {children}
      </PitchContextProvider>
    </svg>
  )
})
