import { z } from 'zod'
import { distance, roundTo } from '../../geometry/vec'
import { defineCriterion, missingEntity } from '../define'
import { bandPosition, bandScore } from '../scoring'
import { entityGroupSchema, entityRefSchema, resolveEntity, resolveGroup } from '../selectors'
import { bandSchema } from './shared'

/**
 * Alle Spieler einer Gruppe in sinnvoller Distanz zu einem Bezugsspieler –
 * z. B. Anspielstationen weder "auf den Füßen" des Ballführenden noch 40 m entfernt.
 * Bewertet wird der am schlechtesten stehende Spieler.
 */
export const groupDistance = defineCriterion({
  kind: 'groupDistance',
  description: 'Abstand jedes Gruppenmitglieds zu einem Bezugsspieler innerhalb eines Bereichs',
  params: z.object({
    group: entityGroupSchema.default({ ref: 'controlled' }),
    to: entityRefSchema.default({ ref: 'ballCarrier' }),
    band: bandSchema.default({ min: 3, idealMin: 6, idealMax: 22, max: 30 }),
  }),
  evaluate(ctx, p) {
    const anchor = resolveEntity(ctx, p.to)
    const group = resolveGroup(ctx, p.group).filter((x) => x.id !== anchor?.id)
    if (!anchor || group.length === 0) return missingEntity('groupDistance')
    let worst: { id: string; label: string; d: number; score: number } | null = null
    for (const member of group) {
      const d = distance(member.pos, anchor.pos)
      const score = bandScore(d, p.band)
      if (!worst || score < worst.score) worst = { id: member.id, label: member.label ?? member.id, d, score }
    }
    const w = worst!
    const position = bandPosition(w.d, p.band)
    const passed = w.score >= 0.5
    return {
      score: w.score,
      passed,
      feedbackKey: passed ? 'groupDistance.ok' : position === 'below' ? 'groupDistance.tooClose' : 'groupDistance.tooFar',
      feedbackParams: { player: w.label, meters: roundTo(w.d) },
      evidence: [{ type: 'highlight', playerId: w.id, tone: passed ? 'good' : 'bad' }],
    }
  },
})
