module.exports = {
  root: true,
  extends: ['airbnb-base', 'plugin:jest/recommended', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['better-mutation', 'jest', '@typescript-eslint', 'prettier', 'import'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    },
    'import/extensions': ['.js', '.ts'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.json']
      }
    }
  },
  rules: {
    // prettier
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true
      }
    ],
    indent: 'off',
    // jest
    'jest/no-conditional-expect': 'warn',
    // other
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'import/order': ['error', { 'newlines-between': 'always', alphabetize: { order: 'asc' } }],
    'sort-imports': ['error', { ignoreDeclarationSort: true, ignoreCase: true }]
  },
  overrides: [
    {
      files: ['*.ts', '** /*.test.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2022,
        sourceType: 'module'
      },
      extends: ['airbnb-typescript/base', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
      rules: {
        // use prettier
        '@typescript-eslint/semi': ['error', 'never'],
        '@typescript-eslint/comma-dangle': ['error', 'never'],
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/indent': 'off',
        // other
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/naming-convention': 'off',
        // temp
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/unbound-method': 'off'
      }
    },
    {
      files: ['*.js'],
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    }
  ]
}
