module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['svelte3', '@typescript-eslint'],
  ignorePatterns: ['*.cjs'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
  settings: {
    'svelte3/typescript': () => require('typescript')
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  reportUnusedDisableDirectives: true,
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'arrow-parens': ['off', 'always'],
    'class-methods-use-this': ['off', 'always'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline'
      }
    ],
    'object-curly-spacing': ['never', 'always'],
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/indent': ['error', 2],
    'jsx-quotes': ['error', 'prefer-single'],
    'lines-between-class-members': ['off', 'always'],
    'no-await-in-loop': ['off', 'always'],
    'no-console': 'error',
    'no-extra-boolean-cast': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: 'Unexpected property on console object was called'
      }
    ],
    'no-continue': ['off', 'always'],
    'no-lonely-if': ['off', 'always'],
    'no-nested-ternary': ['off', 'always'],
    'no-param-reassign': ['off', 'always'],
    'no-plusplus': ['off', 'always'],
    'no-sequences': ['off', 'always'],
    'no-underscore-dangle': ['off', 'always'],
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    semi: 'error',
    eqeqeq: 'error'
  }
};
