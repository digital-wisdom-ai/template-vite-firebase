import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import * as parser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: parser,
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        process: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'error',
        { allowConstantExport: true },
      ],
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'function-expression',
        },
      ],
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^(React|JSX)$' },
      ],
      'func-style': ['error', 'declaration', { allowArrowFunctions: false }],
      'no-nested-ternary': 'error',
      'max-len': ['error', { code: 120 }],
      complexity: ['error', 8],
      'max-depth': ['error', 4],
    },
  },
]
