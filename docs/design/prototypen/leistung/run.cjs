const { chromium, devices } = require('playwright')
const path = require('path')
;(async () => {
  const browser = await chromium.launch()
  const file = 'file://' + path.join(__dirname, 'bench.html')
  for (const rate of [1, 4, 6]) {
    for (const mode of ['circles', 'figures', 'sprites']) {
      const ctx = await browser.newContext({ ...devices['Pixel 7'] })
      const page = await ctx.newPage()
      const cdp = await ctx.newCDPSession(page)
      await cdp.send('Emulation.setCPUThrottlingRate', { rate })
      await page.goto(`${file}?mode=${mode}`)
      await page.waitForFunction(() => window.__result, null, { timeout: 30000 })
      const r = await page.evaluate(() => window.__result)
      console.log(`CPU÷${rate}  ${mode.padEnd(8)} Knoten=${String(r.nodes).padStart(3)}  fps=${String(r.fps).padStart(5)}  p95=${String(r.p95).padStart(5)} ms  Frames>20ms=${(r.slow * 100).toFixed(0)} %`)
      await ctx.close()
    }
  }
  await browser.close()
})().catch((e) => { console.error(e.message); process.exit(1) })
