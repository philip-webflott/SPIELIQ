import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Datenzugriff nur über src/server – Seiten importieren keinen Prisma-Client.
    files: ['src/app/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: [{ group: ['@/generated/*'], message: 'Prisma-Client nur in src/server verwenden.' }] },
      ],
    },
  },
  {
    files: ['src/components/**/*.{ts,tsx}', 'src/features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: [{ group: ['@/server/db', '@/generated/*'], message: 'UI-Komponenten greifen nicht direkt auf die Datenbank zu.' }] },
      ],
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'src/generated/**', 'playwright-report/**', 'test-results/**']),
])

export default eslintConfig
