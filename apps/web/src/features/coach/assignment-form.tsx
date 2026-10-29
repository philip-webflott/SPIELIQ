'use client'

import { useActionState } from 'react'
import { createAssignmentAction } from '@/app/actions/coach'
import { Button } from '@/components/ui/button'
import { Checkbox, Field, FormError, Input, Textarea } from '@/components/ui/form'

export function AssignmentForm({
  teamId,
  missions,
  players,
}: {
  teamId: string
  missions: { id: string; title: string; minutes: number }[]
  players: { id: string; name: string }[]
}) {
  const [state, action, pending] = useActionState(createAssignmentAction, undefined)
  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="teamId" value={teamId} />
      <FormError message={state?.error} />
      <Field label="Titel" htmlFor="a-title">
        <Input id="a-title" name="title" required defaultValue="Nicht alle zum Ball!" />
      </Field>
      <fieldset className="space-y-2">
        <legend className="mb-1 text-sm font-semibold">Missionen</legend>
        {missions.map((m, i) => (
          <Checkbox key={m.id} name="missionIds" value={m.id} defaultChecked={i < 3} label={`${m.title} (ca. ${m.minutes} Min.)`} />
        ))}
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Bis wann?" htmlFor="a-due">
          <Input id="a-due" name="dueAt" type="date" />
        </Field>
        <Field label="Geschätzte Zeit (Minuten)" htmlFor="a-min">
          <Input id="a-min" name="estimatedMinutes" type="number" min={1} max={120} defaultValue={8} />
        </Field>
      </div>
      <Field label="Hinweis für die Spieler:innen (optional)" htmlFor="a-note" hint="Höchstens 280 Zeichen. Keine persönlichen Daten.">
        <Textarea id="a-note" name="note" rows={2} maxLength={280} placeholder="z. B. Achtet besonders auf Mission 3 – das üben wir am Donnerstag." />
      </Field>
      {players.length > 0 && (
        <fieldset className="space-y-2">
          <legend className="mb-1 text-sm font-semibold">Nur für bestimmte Spieler:innen? (leer lassen = ganzes Team)</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {players.map((p) => (
              <Checkbox key={p.id} name="targetUserIds" value={p.id} label={p.name} />
            ))}
          </div>
        </fieldset>
      )}
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? 'Speichern …' : 'Hausaufgabe vergeben'}
      </Button>
    </form>
  )
}
