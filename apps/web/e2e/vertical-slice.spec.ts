import { expect, test } from '@playwright/test'

/**
 * Vertikaler Schnitt im echten Browser:
 * Trainer registriert sich → erstellt Teamcode → Spieler tritt bei → löst
 * Mission 1 → Trainer sieht den Fortschritt in der Lernstand-Übersicht.
 */
test('Trainer lädt ein, Spieler lernt, Trainer sieht den Fortschritt', async ({ browser }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Einmal pro Lauf genügt')
  const stamp = Date.now()
  const coach = await browser.newPage()

  await coach.goto('/register')
  await coach.fill('#displayName', 'E2E Trainerin')
  await coach.fill('#email', `e2e-${stamp}@example.invalid`)
  await coach.fill('#password', 'e2e-passwort-sicher')
  await coach.fill('#clubName', 'E2E Sportverein')
  await coach.fill('#teamName', `C-Jugend ${stamp}`)
  await coach.selectOption('#ageGroup', 'C')
  await coach.check('input[name="confirmedAdult"]')
  await coach.check('input[name="acceptedPrivacy"]')
  await coach.getByRole('button', { name: 'Mannschaft anlegen' }).click()
  await coach.waitForURL(/\/coach\/team\//)

  // Teamcode für eine C-Jugend nur mit Einwilligungsbestätigung
  await coach.getByTestId('create-invite').click()
  await expect(coach.getByText(/Einwilligungen der Sorgeberechtigten vorliegen/)).toBeVisible()
  await coach.check('input[name="guardianConsentConfirmed"]')
  await coach.getByTestId('create-invite').click()
  const code = (await coach.getByTestId('invite-code').textContent())!.trim()
  expect(code).toMatch(/^[A-Z2-9]{4}-[A-Z2-9]{4}$/)

  // Spieler tritt in eigenem Browserkontext bei
  const playerContext = await browser.newContext()
  const player = await playerContext.newPage()
  await player.goto('/join')
  await player.fill('#code', code)
  await player.fill('#displayName', 'Flitzer')
  await player.fill('#password', 'spieler-passwort')
  await player.check('input[name="acceptedPrivacy"]')
  await player.getByRole('button', { name: 'Team beitreten' }).click()
  await expect(player.getByTestId('join-success')).toBeVisible()
  await expect(player.getByTestId('login-name')).toHaveText(/^[a-zäöü]+-[a-zäöü]+-\d+$/)
  await player.getByRole('link', { name: "Los geht's" }).click()

  await player.getByRole('link', { name: /Training starten/ }).click()
  await player.waitForURL(/\/play\/mission\/nazb-m1/)
  // Erklärfilm und Zuschauen überspringen
  for (let i = 0; i < 10 && !(await player.locator('[data-player-id="o7"][data-interactive="true"]').isVisible()); i++) {
    await player.getByTestId('next-step').click()
  }
  await player.locator('[data-player-id="o7"]').click()
  await player.getByTestId('check').click()
  await expect(player.getByTestId('feedback-headline')).toContainText('Nummer 7')
  await player.getByTestId('next-step').click()
  await player.getByTestId('next-step').click()
  await expect(player.getByText('Geschafft!')).toBeVisible()

  // Trainer sieht den Fortschritt
  await expect
    .poll(
      async () => {
        await coach.reload()
        return coach.getByLabel('abgeschlossen').count()
      },
      { timeout: 15_000 },
    )
    .toBeGreaterThan(0)
  await expect(coach.getByRole('link', { name: 'Flitzer' })).toBeVisible()

  // Spieler berichtigt seinen Anzeigenamen selbst (Profil)
  await player.goto('/account')
  await player.fill('#display-name', 'Flitzer 9')
  await player.getByRole('button', { name: 'Speichern' }).click()
  await expect(player.getByRole('status').filter({ hasText: 'Gespeichert.' })).toBeVisible()
  await expect(player.getByRole('heading', { name: 'Flitzer 9' })).toBeVisible()

  // Trainer entfernt den Spieler – nur mit ausdrücklicher Bestätigung; das Konto ohne Mannschaft wird gelöscht
  await coach.reload()
  await coach.getByRole('link', { name: 'Flitzer 9' }).click()
  await coach.waitForURL(/\/player\//)
  await coach.check('input[name="confirm"]')
  await coach.getByRole('button', { name: 'Aus der Mannschaft entfernen' }).click()
  await coach.waitForURL(/\/coach\/team\/[^/]+$/)
  await expect(coach.getByRole('link', { name: 'Flitzer 9' })).toHaveCount(0)
  await player.goto('/play')
  await player.waitForURL(/\/login/)
  await playerContext.close()
})

test('Geschützte Bereiche leiten ohne Anmeldung zur Anmeldung weiter', async ({ page }) => {
  await page.goto('/coach')
  await page.waitForURL(/\/login/)
  await expect(page.getByRole('heading', { name: 'Anmelden' })).toBeVisible()
})
