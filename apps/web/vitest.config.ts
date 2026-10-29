import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

/**
 * Integrationstests der Server-Module gegen eine echte PostgreSQL-Testdatenbank
 * (TEST_DATABASE_URL). Die Datenbank wird vor dem Lauf migriert und vor jeder
 * Testdatei geleert.
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'server-only': fileURLToPath(new URL('./test/server-only-stub.ts', import.meta.url)),
    },
  },
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'node',
    globalSetup: ['./test/global-setup.ts'],
    setupFiles: ['./test/setup-env.ts'],
    fileParallelism: false,
    testTimeout: 30_000,
    hookTimeout: 60_000,
  },
})
