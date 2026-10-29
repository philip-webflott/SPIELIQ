import { allCompetencyProgress, drillsForPrinciples, getUnit } from '@spieliq/content'
import type { Db } from '../db'
import { requireCoachOfPlayer, requireTeamCoach } from '../policies'
import { attemptFacts, observationFacts } from './progress'

/**
 * Auswertungen für Trainer:innen – ausschließlich echte, gespeicherte Daten.
 * Keine Ranglisten zwischen Spieler:innen; Vergleiche nur als Mannschaftsbild
 * ("welche Prinzipien machen der Mannschaft Probleme?").
 */

export type CellStatus = 'offen' | 'begonnen' | 'abgeschlossen'

export async function teamProgressMatrix(db: Db, coachId: string, teamId: string, unitId = 'nicht-alle-zum-ball', now = new Date()) {
  await requireTeamCoach(db, coachId, teamId)
  const unit = getUnit(unitId)
  const members = await db.teamMembership.findMany({
    where: { teamId, role: 'PLAYER' },
    select: { level: true, user: { select: { id: true, displayName: true, isDemo: true } } },
    orderBy: { joinedAt: 'asc' },
  })
  const userIds = members.map((m) => m.user.id)
  const missionIds = unit?.missionIds ?? []
  const [progress, attemptsMap, observationsMap] = await Promise.all([
    db.missionProgress.findMany({ where: { userId: { in: userIds }, missionId: { in: [...missionIds] } } }),
    attemptFacts(db, userIds),
    observationFacts(db, userIds),
  ])
  const rows = members.map(({ user, level }) => {
    const cells = missionIds.map((missionId) => {
      const p = progress.find((x) => x.userId === user.id && x.missionId === missionId)
      const status: CellStatus = !p ? 'offen' : p.status === 'COMPLETED' ? 'abgeschlossen' : 'begonnen'
      return { missionId, status, attempts: p?.attempts ?? 0, hintsUsed: p?.hintsUsed ?? 0, rating: p?.bestRating ?? null }
    })
    const competencies = allCompetencyProgress(attemptsMap.get(user.id) ?? [], observationsMap.get(user.id) ?? [], now).filter((c) =>
      unit?.competencies.includes(c.competencyId),
    )
    return {
      userId: user.id,
      displayName: user.displayName,
      isDemo: user.isDemo,
      level,
      cells,
      understood: competencies.filter((c) => c.understood).length,
      applied: competencies.filter((c) => c.applied).length,
      competencyTotal: competencies.length,
    }
  })
  return { unit, missionIds, rows }
}

/** Welche Prinzipien bereiten der Mannschaft Probleme? Mit passenden Spielformen für das Training. */
export async function teamStruggles(db: Db, coachId: string, teamId: string) {
  await requireTeamCoach(db, coachId, teamId)
  const members = await db.teamMembership.findMany({ where: { teamId, role: 'PLAYER' }, select: { userId: true } })
  const attemptsMap = await attemptFacts(db, members.map((m) => m.userId))
  const stats = new Map<string, { passed: number; failed: number; players: Set<string> }>()
  for (const [userId, attempts] of attemptsMap) {
    for (const a of attempts) {
      for (const [principle, ok] of Object.entries(a.principles)) {
        const s = stats.get(principle) ?? { passed: 0, failed: 0, players: new Set<string>() }
        if (ok) s.passed++
        else {
          s.failed++
          s.players.add(userId)
        }
        stats.set(principle, s)
      }
    }
  }
  const principles = [...stats.entries()]
    .map(([principleId, s]) => ({
      principleId,
      attempts: s.passed + s.failed,
      failRate: s.failed / Math.max(1, s.passed + s.failed),
      playersWithProblems: s.players.size,
    }))
    .filter((p) => p.attempts >= 3)
    .sort((a, b) => b.failRate - a.failRate)
  const top = principles.filter((p) => p.failRate >= 0.3).slice(0, 2)
  return {
    principles,
    suggestions: drillsForPrinciples(top.map((p) => p.principleId)).slice(0, 3),
    focus: top.map((p) => p.principleId),
  }
}

export async function playerDetail(db: Db, coachId: string, teamId: string, playerId: string, now = new Date()) {
  await requireCoachOfPlayer(db, coachId, teamId, playerId)
  const [user, membership, progress, attemptsMap, observationsMap, recent] = await Promise.all([
    db.user.findUniqueOrThrow({ where: { id: playerId }, select: { id: true, displayName: true, loginName: true, isDemo: true } }),
    db.teamMembership.findUniqueOrThrow({ where: { teamId_userId: { teamId, userId: playerId } }, select: { level: true } }),
    db.missionProgress.findMany({ where: { userId: playerId } }),
    attemptFacts(db, [playerId]),
    observationFacts(db, [playerId]),
    db.attempt.findMany({
      where: { userId: playerId },
      orderBy: { createdAt: 'desc' },
      take: 12,
      select: { missionId: true, stepId: true, rating: true, hintsUsed: true, createdAt: true, criteria: true },
    }),
  ])
  return {
    user,
    level: membership.level,
    progress,
    competencies: allCompetencyProgress(attemptsMap.get(playerId) ?? [], observationsMap.get(playerId) ?? [], now),
    recent,
  }
}
