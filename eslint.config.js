import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    'node_modules',
    'backend/node_modules',
    '**/*.ts',
  ]),
  {
    files: ['src/**/*.{js,jsx}', '*.config.js', 'vite.config.js'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // Legitimate mount-time data loading / URL bootstrap (Auth, dashboard, reCAPTCHA).
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    files: ['src/context/**/*.{js,jsx}'],
    rules: {
      // Context modules intentionally export both Provider and hook.
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['backend/**/*.{js,mjs}', 'api/**/*.{js,mjs}'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
])
