/** Configuração do ESLint 8 (formato legado). `npm run lint` falhava porque este arquivo não existia. */
module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['@typescript-eslint', 'react-hooks', 'react-refresh'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'prettier'],
  ignorePatterns: ['dist', 'node_modules', '.agents', '.claude', 'scripts', '*.cjs'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // Promises soltas escondem erros; quando for intencional, use `void promise`.
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  overrides: [{ files: ['**/*.test.{ts,tsx}', 'src/test/**'], rules: { '@typescript-eslint/no-explicit-any': 'off' } }],
}
