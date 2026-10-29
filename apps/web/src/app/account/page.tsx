import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, LogOut } from 'lucide-react'
import { db } from '@/server/db'
import { requireUser } from '@/server/auth/current-user'
import { playerTeams } from '@/server/modules/accounts'
import { logoutAction } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Card, PageHeader, Skeleton } from '@/components/ui/primitives'
import { DeleteAccountForm } from './delete-form'
import { DisplayNameForm } from './name-form'

export const metadata: Metadata = { title: 'Profil & Daten' }

export default function AccountPage() {
  return (
    <main id="inhalt" className="mx-auto max-w-2xl px-4 py-6">
      <Suspense fallback={<Skeleton className="h-96" />}>
        <AccountContent />
      </Suspense>
    </main>
  )
}

async function AccountContent() {
  const user = await requireUser()
  const teams = await playerTeams(db, user.id)
  const home = user.kind === 'PLAYER' ? '/play' : '/coach'
  return (
    <>
      <Link href={home} className="mb-4 inline-flex items-center gap-2 text-sm text-text-muted hover:text-text">
        <ArrowLeft size={16} aria-hidden="true" /> Zurück
      </Link>
      <PageHeader eyebrow="Profil" title={user.displayName} />
      <div className="space-y-5">
        <Card className="p-5">
          <h2 className="eyebrow mb-3">Dein Konto</h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <dt className="text-text-faint">Anmeldename</dt>
            <dd className="font-semibold">{user.loginName ?? user.email}</dd>
            <dt className="text-text-faint">Mannschaften</dt>
            <dd>{teams.map((m) => `${m.team.name} (${m.team.org.name})`).join(', ') || '–'}</dd>
          </dl>
          <DisplayNameForm current={user.displayName} isPlayer={user.kind === 'PLAYER'} />
          <form action={logoutAction} className="mt-4">
            <Button type="submit" variant="secondary" size="sm">
              <LogOut size={16} aria-hidden="true" /> Abmelden
            </Button>
          </form>
        </Card>

        <Card className="p-5">
          <h2 className="eyebrow mb-2">Hilfe</h2>
          <p className="text-sm text-text-muted">
            Dich belastet etwas – im Verein, beim Training oder online?{' '}
            <a href="/help" className="font-semibold text-accent hover:underline">
              Hier findest du Hilfe
            </a>
            .
          </p>
        </Card>

        <Card className="p-5">
          <h2 className="eyebrow mb-2">Deine Daten</h2>
          <p className="text-sm text-text-muted">Du kannst jederzeit alle Daten herunterladen, die SPIELIQ über dich gespeichert hat (Auskunft).</p>
          <a href="/api/account/export" className="mt-3 inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink-600 px-4 py-2 text-sm font-semibold hover:bg-ink-500" download>
            <Download size={16} aria-hidden="true" /> Meine Daten herunterladen (JSON)
          </a>
        </Card>

        <Card className="border-bad/30 p-5">
          <h2 className="eyebrow mb-2 text-bad">Konto löschen</h2>
          <p className="mb-4 text-sm text-text-muted">
            Dein Konto und alle Lernergebnisse werden sofort und endgültig gelöscht.
            {user.kind === 'ADULT' ? ' Mannschaften, die du besitzt, musst du vorher löschen oder übergeben.' : ''}
          </p>
          <DeleteAccountForm />
        </Card>
      </div>
    </>
  )
}
