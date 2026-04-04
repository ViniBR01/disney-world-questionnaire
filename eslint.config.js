import globals from 'globals';

export default [
  {
    files: ['js/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        EXPERIENCES: 'readonly',
      },
      ecmaVersion: 2022,
      sourceType: 'script',
    },
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
      'no-undef': 'error',
    },
  },
];
