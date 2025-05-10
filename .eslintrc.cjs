module.exports = {
  env: {
  node: true,
  es2021: true,
  jest: true,
},
extends: [
  'eslint:recommended',
  'plugin:jest/recommended'
],
  plugins: ['jest'], 
  parser: '@babel/eslint-parser', 
  parserOptions: {
    ecmaVersion: 2022, 
    sourceType: 'module',
    requireConfigFile: true, 
    ecmaFeatures: {
      jsx: false, 
      importMeta: true
    }
  },
rules: {
  'no-console': 'off',
  'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
},
overrides: [{
    files: ['**/__tests__/**/*.js'],
    rules: {
      'jest/no-disabled-tests': 'error', 
      'jest/no-focused-tests': 'error'
    }
  }]
};
