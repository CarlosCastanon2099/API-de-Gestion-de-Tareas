module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: [
    "eslint:recommended"
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module"
  },
  rules: {
    "no-console": "off",
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
  }
};