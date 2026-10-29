import { z } from 'zod'
import { ballOwner, findPlayer, teamPlayers, type PlayerState, type TeamSide } from '../board/state'
import { distance, type Vec2 } from '../geometry/vec'
import type { AssessmentContext } from './types'

/**
 * Selektoren erlauben, Rollen statt fester Spieler zu bewerten. Beispiel: Beim
 * Verschieben entscheidet der Lernende selbst, wer den Ballführenden stellt –
 * bewertet wird "der eigene Spieler, der dem Ball am nächsten ist".
 */

const teamSide = z.enum(['own', 'opp'])

export type EntityRef =
  | string
  | { readonly ref: 'ballCarrier' }
  | { readonly ref: 'selected' }
  | {
      readonly ref: 'nearestTo'
      readonly target: 'ball' | string
      readonly team: TeamSide
      /** 1 = nächster, 2 = zweitnächster … */
      readonly rank?: number
      readonly among?: readonly string[]
      readonly exclude?: readonly string[]
    }

export const entityRefSchema: z.ZodType<EntityRef> = z.union([
  z.string().min(1),
  z.object({ ref: z.literal('ballCarrier') }),
  z.object({ ref: z.literal('selected') }),
  z.object({
    ref: z.literal('nearestTo'),
    target: z.string().min(1),
    team: teamSide,
    rank: z.number().int().min(1).optional(),
    among: z.array(z.string()).optional(),
    exclude: z.array(z.string()).optional(),
  }),
])

export type EntityGroup =
  | readonly string[]
  | { readonly ref: 'controlled' }
  | {
      readonly ref: 'team'
      readonly team: TeamSide
      readonly excludeGoalkeeper?: boolean
      readonly exclude?: readonly string[]
    }

export const entityGroupSchema: z.ZodType<EntityGroup> = z.union([
  z.array(z.string().min(1)),
  z.object({ ref: z.literal('controlled') }),
  z.object({
    ref: z.literal('team'),
    team: teamSide,
    excludeGoalkeeper: z.boolean().optional(),
    exclude: z.array(z.string()).optional(),
  }),
])

function targetPosition(ctx: AssessmentContext, target: string): Vec2 | null {
  if (target === 'ball') return ctx.state.ball.pos
  if (target === 'ballCarrier') return ballOwner(ctx.state)?.pos ?? null
  return findPlayer(ctx.state, target)?.pos ?? null
}

export function resolveEntity(ctx: AssessmentContext, ref: EntityRef): PlayerState | null {
  if (typeof ref === 'string') return findPlayer(ctx.state, ref) ?? null
  switch (ref.ref) {
    case 'ballCarrier':
      return ballOwner(ctx.state) ?? null
    case 'selected':
      return ctx.selection?.playerId ? (findPlayer(ctx.state, ctx.selection.playerId) ?? null) : null
    case 'nearestTo': {
      const pos = targetPosition(ctx, ref.target)
      if (!pos) return null
      const candidates = teamPlayers(ctx.state, ref.team).filter(
        (p) =>
          (!ref.among || ref.among.includes(p.id)) &&
          !ref.exclude?.includes(p.id) &&
          p.id !== ctx.state.ball.ownerId &&
          p.role !== 'GK',
      )
      const sorted = candidates.sort((a, b) => distance(a.pos, pos) - distance(b.pos, pos))
      return sorted[(ref.rank ?? 1) - 1] ?? null
    }
  }
}

export function resolveGroup(ctx: AssessmentContext, group: EntityGroup): PlayerState[] {
  if (Array.isArray(group)) {
    return group.map((id) => findPlayer(ctx.state, id)).filter((p): p is PlayerState => Boolean(p))
  }
  const g = group as Exclude<EntityGroup, readonly string[]>
  if (g.ref === 'controlled') {
    return ctx.controlled.map((id) => findPlayer(ctx.state, id)).filter((p): p is PlayerState => Boolean(p))
  }
  return teamPlayers(ctx.state, g.team, !g.excludeGoalkeeper).filter((p) => !g.exclude?.includes(p.id))
}

export function describeRef(ref: EntityRef): string {
  if (typeof ref === 'string') return ref
  return ref.ref
}
