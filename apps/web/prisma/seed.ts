/**
 * Demo-Daten für Entwicklung und Vorführung – KLAR GEKENNZEICHNET.
 * Alle Datensätze tragen isDemo = true und werden in der Oberfläche als
 * "Demo-Daten" markiert. Keine echten Personen, keine echten Vereine.
 *
 * Aufruf: pnpm db:seed  (setzt DATABASE_URL voraus)
 * Mit `--if-enabled` (Vercel-Build) nur, wenn SEED_DEMO_DATA=true gesetzt ist.
 *
 * Zugänge (nur lokal):
 *   Trainer:  demo.trainer@spieliq.invalid / demo-trainer-2026
 *   Spieler:  demo-falke-11 / demo-spieler-2026  (weitere: demo-luchs-12, demo-otter-13)
 */
import { PrismaPg } from '@prisma/adapter-pg'
import { assessStep, isInteractive } from '@spieliq/engine'
import { getMission } from '@spieliq/content'
import { PrismaClient } from '../src/generated/prisma/client'
import { hashPassword } from '../src/server/auth/password'
import { databaseUrl, poolConfig } from '../src/server/db-config'
import { hashInviteCode } from '../src/server/auth/tokens'

try {
  process.loadEnvFile?.('.env')
} catch {
  // keine .env
}

if (process.argv.includes('--if-enabled') && process.env.SEED_DEMO_DATA !== 'true') {
  console.log('Demo-Daten übersprungen (SEED_DEMO_DATA ist nicht "true").')
  process.exit(0)
}

const db = new PrismaClient({ adapter: new PrismaPg(poolConfig(databaseUrl(), process.env.DATABASE_CA_CERT)) })

async function main() {
  await db.organization.deleteMany({ where: { isDemo: true } })
  await db.user.deleteMany({ where: { isDemo: true } })

  const coach = await db.user.create({
    data: {
      kind: 'ADULT',
      displayName: 'Demo-Trainer',
      email: 'demo.trainer@spieliq.invalid',
      passwordHash: await hashPassword('demo-trainer-2026'),
      isDemo: true,
    },
  })
  const org = await db.organization.create({ data: { name: 'Demo-Verein (Testdaten)', isDemo: true } })
  await db.orgMembership.create({ data: { orgId: org.id, userId: coach.id, role: 'OWNER' } })
  const team = await db.team.create({ data: { orgId: org.id, name: 'C-Jugend Demo', ageGroup: 'C', season: '2026/27' } })
  await db.teamMembership.create({ data: { teamId: team.id, userId: coach.id, role: 'HEAD_COACH' } })
  await db.invitation.create({
    data: {
      teamId: team.id,
      codeHash: hashInviteCode('DEMO-2026'),
      codeHint: '26',
      createdById: coach.id,
      expiresAt: new Date(Date.now() + 365 * 24 * 3600 * 1000),
      maxUses: 500,
      guardianConsentConfirmedAt: new Date(),
    },
  })

  const players = [
    { loginName: 'demo-falke-11', displayName: 'Falke (Demo)' },
    { loginName: 'demo-luchs-12', displayName: 'Luchs (Demo)' },
    { loginName: 'demo-otter-13', displayName: 'Otter (Demo)' },
  ]
  const passwordHash = await hashPassword('demo-spieler-2026')
  const created = []
  for (const p of players) {
    const user = await db.user.create({ data: { kind: 'PLAYER', ...p, passwordHash, isDemo: true } })
    await db.teamMembership.create({ data: { teamId: team.id, userId: user.id, role: 'PLAYER' } })
    created.push(user)
  }

  // Beispielhafte Lernhistorie: echte Bewertungen der Engine auf Musterlösungen bzw. typischen Fehlern.
  const m1 = getMission('nazb-m1-problem-erkennen')
  const m3 = getMission('nazb-m3-aufgaben-verteilen')
  const record = async (userId: string, loaded: typeof m1, stepIndex: number, answer: Parameters<typeof assessStep>[2], hintsUsed = 0) => {
    const step = loaded.mission.steps[stepIndex]!
    const result = assessStep(loaded, stepIndex, answer)
    await db.attempt.create({
      data: {
        userId,
        missionId: loaded.mission.id,
        missionVersion: loaded.mission.version,
        stepId: step.id,
        answer: answer as object,
        rating: result.rating,
        score: result.score,
        principles: result.principles,
        criteria: result.criteria.map((c) => ({ id: c.id, passed: c.passed, score: c.score, feedbackKey: c.feedbackKey })),
        hintsUsed,
      },
    })
    return result.rating
  }
  const identifyIndex = m1.mission.steps.findIndex(isInteractive)
  const coverIndex = m3.mission.steps.findIndex(isInteractive)
  const [falke, luchs] = created
  await record(falke!.id, m1, identifyIndex, { selection: { playerId: 'o7' } })
  await db.missionProgress.create({ data: { userId: falke!.id, missionId: m1.mission.id, missionVersion: 1, status: 'COMPLETED', bestRating: 'excellent', attempts: 1, completedAt: new Date() } })
  await record(luchs!.id, m1, identifyIndex, { selection: { playerId: 'o10' } })
  await record(luchs!.id, m1, identifyIndex, { selection: { playerId: 'o7' } }, 1)
  await db.missionProgress.create({ data: { userId: luchs!.id, missionId: m1.mission.id, missionVersion: 1, status: 'COMPLETED', bestRating: 'excellent', attempts: 2, hintsUsed: 1, completedAt: new Date() } })
  await record(luchs!.id, m3, coverIndex, { positions: { d4: { x: 28.6, y: 51.4 } } })
  await db.missionProgress.create({ data: { userId: luchs!.id, missionId: m3.mission.id, missionVersion: 1, status: 'IN_PROGRESS', attempts: 1 } })

  console.log('Demo-Daten angelegt (gekennzeichnet). Teamcode: DEMO-2026')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
