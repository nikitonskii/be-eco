module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'react-hooks/exhaustive-deps': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        'max-len': [1, { ignoreComments: true }, { ignoreStrings: true }, { code: 120 }],
        indent: ['error', 2, { SwitchCase: 1 }],
        'prettier/prettier': 'off',
        'padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: '*', next: 'return' },
          { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
          {
            blankLine: 'any',
            prev: ['const', 'let', 'var'],
            next: ['const', 'let', 'var'],
          },
        ],
        'react-native/no-unused-styles': 2,
        'react-native/no-single-element-style-arrays': 2,
        '@typescript-eslint/no-unused-vars': ['error'],
        'no-console': ['error'],
      },
    },
  ],
};
