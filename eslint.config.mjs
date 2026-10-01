import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: [
      'src/lib/ai/anthropic-provider.ts',
      'src/lib/ai/gemini-provider.ts',
      'src/lib/ai/openai-responses-provider.ts',
    ],
    rules: {
      // Provider JSON is untyped at the network boundary; validate before live use.
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  globalIgnores(['.next/**', 'node_modules/**', 'playwright-report/**', 'test-results/**']),
]);
