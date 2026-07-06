import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginCypress from 'eslint-plugin-cypress';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js, cypress: pluginCypress },
    rules: { 'cypress/unsafe-to-chain-command': 'error' },
    extends: ['js/recommended'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,
]);
