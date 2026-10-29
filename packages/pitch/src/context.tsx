'use client'

import { createContext, useContext } from 'react'
import type { PitchSpec } from '@spieliq/engine'
import type { Projection } from './projection'

export interface PitchContextValue {
  readonly pitch: PitchSpec
  readonly projection: Projection
  /** Skalierung für Strichstärken/Schrift, abhängig von der Größe des Ausschnitts */
  readonly unit: number
}

const PitchContext = createContext<PitchContextValue | null>(null)

export const PitchContextProvider = PitchContext.Provider

export function usePitchContext(): PitchContextValue {
  const ctx = useContext(PitchContext)
  if (!ctx) throw new Error('Pitch-Komponenten müssen innerhalb von <PitchSvg> verwendet werden')
  return ctx
}
