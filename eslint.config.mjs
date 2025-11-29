import globals from 'globals'
import css from '@eslint/css'
import js from '@eslint/js'
import json from '@eslint/json'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

import { defineConfig } from 'eslint/config'

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        plugins: { js },
        extends: ['js/recommended'],
        rules: {
            'no-unused-vars': 'off',
            'no-undef': 'error',
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                chrome: 'readonly',
            },
        },
    },
    {
        ...pluginReact.configs.flat.recommended,
        rules: {
            ...pluginReact.configs.flat.recommended.rules,
            'react/prop-types': 'off',
            'react/no-unknown-property': 'warn',
            'react/jsx-key': 'warn',
            'react/display-name': 'off',
            'react/react-in-jsx-scope': 'off',
        },
    },
    reactHooks.configs.flat.recommended,
    {
        files: ['**/*.json'],
        plugins: { json },
        language: 'json/json',
        extends: ['json/recommended'],
    },
    {
        files: ['**/*.css'],
        plugins: { css },
        language: 'css/css',
        extends: ['css/recommended'],
    },
])
