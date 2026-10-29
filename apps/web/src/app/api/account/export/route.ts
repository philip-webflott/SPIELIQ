import { NextResponse } from 'next/server'
import { db } from '@/server/db'
import { getCurrentUser } from '@/server/auth/current-user'
import { exportPersonalData } from '@/server/modules/accounts'

/** Auskunft nach Art. 15 DSGVO: Download aller gespeicherten Daten als JSON. */
export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  const data = await exportPersonalData(db, user.id)
  return new NextResponse(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': `attachment; filename="spieliq-daten-${new Date().toISOString().slice(0, 10)}.json"`,
      'Cache-Control': 'no-store',
    },
  })
}
