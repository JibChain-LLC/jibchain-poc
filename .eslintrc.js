/** @type { import('eslint').Linter.Config }  */
module.exports = {
  extends: [
    'next/core-web-vitals',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:storybook/recommended'
  ],
  plugins: ['prettier', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  settings: {
    tailwindcss: {
      callees: ['classnames', 'clsx', 'cn', 'cva'],
      config: 'tailwind.config.ts',
      removeDuplicates: true
    }
  },
  rules: {
    indent: 'off',
    'tailwindcss/no-custom-classname': ['error', {}],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'spaced-comment': ['error', 'always'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.tsx'] }],
    'react/forbid-prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/self-closing-comp': ['error', { component: true, html: false }],
    'react/no-array-index-key': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { destructuredArrayIgnorePattern: '^_', argsIgnorePattern: '^_' }
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ]
  }
};
