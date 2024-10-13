import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const GLOBALS_BROWSER_FIX = Object.assign({}, globals.browser, {
  AudioWorkletGlobalScope: globals.browser['AudioWorkletGlobalScope '],
});

delete GLOBALS_BROWSER_FIX['AudioWorkletGlobalScope '];

export default [
  ...compat.extends(
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hook-form/recommended'
  ),
  {
    languageOptions: {
      globals: {
        ...GLOBALS_BROWSER_FIX, // ตรวจสอบให้แน่ใจว่าไม่มีช่องว่าง
      },
      ecmaVersion: 2020, // หรือปรับตามที่คุณต้องการ
      sourceType: 'module', // ปรับตามที่คุณใช้
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
    rules: {
      'no-await-in-loop': 'error',
      'require-await': 'error',
      'no-unused-vars': 'warn',
      eqeqeq: 'error',
      'react-hooks/rules-of-hooks': 'error',
      '@typescript-eslint/no-misused-promises': 'off',
      'linebreak-style': 0,
    },
  },
];
