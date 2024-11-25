module.exports = {
  extends: ['eslint:recommended', 'next/core-web-vitals', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'warn',
    'import/order': [
      'warn',
      {
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
        warnOnUnassignedImports: true,
      },
    ],
    'import/no-duplicates': 'warn',
    'no-unused-vars': 'off',
  },
  settings: { 'import/internal-regex': '^@/' },
  // We can't apply the below config globally because it marks js config files
  // (next.config.js and others) as invalid
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
      },
    },
  ],
};
