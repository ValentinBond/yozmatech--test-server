import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
      ecmaVersion: 'latest',
    },

    plugins: {
      '@typescript-eslint': tseslint,
    },

    rules: {
      ...tseslint.configs.recommended.rules,
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },

    ignores: ['node_modules/', 'dist/', 'build/'],
  },

  prettier,
];
