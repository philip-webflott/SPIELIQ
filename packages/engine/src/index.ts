/**
 * @spieliq/engine
 * ==============
 * Framework-unabhängige Fachlogik von SPIELIQ. Abhängigkeitsrichtung:
 *
 *   geometry → board/model → analysis → assessment → simulation → scenario
 *
 * Keine Abhängigkeit zu React, DOM oder Datenbank. Alles ist deterministisch
 * und damit auf Client und Server identisch auswertbar.
 */
export * from './geometry/vec'
export * from './geometry/polygon'
export * from './board/pitch'
export * from './board/state'
export * from './model/motion'
export * from './analysis/passing'
export * from './analysis/defense'
export * from './analysis/team'
export * from './assessment/types'
export * from './assessment/scoring'
export * from './assessment/selectors'
export * from './assessment/registry'
export * from './assessment/evaluate'
export * from './simulation/timeline'
export * from './simulation/playout'
export * from './scenario/schema'
export * from './scenario/runtime'
export * from './scenario/transform'
export * from './scenario/quality'
export * from './random'
