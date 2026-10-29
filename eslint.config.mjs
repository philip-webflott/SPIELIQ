// ESLint-Konfiguration für die Workspace-Pakete (packages/*).
// Die Web-App (apps/web) hat eine eigene Konfiguration auf Basis von eslint-config-next.
import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'

export default defineConfig([
  globalIgnores(['**/node_modules/**', '**/dist/**', 'apps/**']),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['packages/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['next', 'next/*'], message: 'Pakete dürfen nicht von Next.js abhängen.' },
            { group: ['@prisma/*', '**/generated/**'], message: 'Pakete dürfen nicht auf die Datenbank zugreifen.' },
          ],
        },
      ],
    },
  },
  {
    files: ['packages/engine/**/*.ts', 'packages/content/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['react', 'react-dom', 'react/*'], message: 'Engine und Content sind UI-unabhängig.' },
            { group: ['next', 'next/*'], message: 'Pakete dürfen nicht von Next.js abhängen.' },
            { group: ['@prisma/*'], message: 'Pakete dürfen nicht auf die Datenbank zugreifen.' },
          ],
        },
      ],
    },
  },
  {
    files: ['packages/pitch/**/*.tsx', 'packages/pitch/**/*.ts'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
])
