'use client'

import { useActionState } from 'react'
import { AGE_GROUP_LABELS } from '@spieliq/content'
import { createTeamAction } from '@/app/actions/coach'
import { Button } from '@/components/ui/button'
import { Field, FormError, Input, Select } from '@/components/ui/form'

export function CreateTeamForm({ orgs }: { orgs: { id: string; name: string }[] }) {
  const [state, action, pending] = useActionState(createTeamAction, undefined)
  if (orgs.length === 0) return <p className="text-sm text-text-muted">Neue Mannschaften legen Vereins-Admins an.</p>
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
      <FormError message={state?.error} />
      {orgs.length > 1 ? (
        <Field label="Verein" htmlFor="orgId">
          <Select id="orgId" name="orgId">
            {orgs.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </Select>
        </Field>
      ) : (
        <input type="hidden" name="orgId" value={orgs[0]!.id} />
      )}
      <Field label="Name der Mannschaft" htmlFor="team-name">
        <Input id="team-name" name="name" required placeholder="z. B. D2-Jugend" />
      </Field>
      <Field label="Altersklasse" htmlFor="team-age">
        <Select id="team-age" name="ageGroup" defaultValue="C">
          {Object.entries(AGE_GROUP_LABELS).map(([id, label]) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </Select>
      </Field>
      <Button type="submit" disabled={pending}>
        {pending ? 'Anlegen …' : 'Anlegen'}
      </Button>
    </form>
  )
}
