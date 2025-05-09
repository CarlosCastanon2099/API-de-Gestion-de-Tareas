module.exports = {
  env: {
  node: true,
  es2021: true,
},
extends: [
  'eslint:recommended'
],
parserOptions: {
  ecmaVersion: 2021,
  sourceType: 'module',
ecmaFeatures: {
  importMeta: true
}},
rules: {
  'no-console': 'off',
  'no-unused-vars': ['warn', { argsIgnorePattern: '^', varsIgnorePattern: '^' }]
},
overrides: [{
  files: ['**/__tests__/**/*.js'],
  env: { jest: true },
  rules: {
    'no-undef': 'off',
    'no-unused-vars': 'off'}}]
};
