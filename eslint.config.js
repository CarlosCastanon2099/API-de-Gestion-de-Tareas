import eslintJS from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";
import babelParser from "@babel/eslint-parser";

export default [
  eslintJS.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        requireConfigFile: false,
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": ["warn", { 
        argsIgnorePattern: "^_", 
        varsIgnorePattern: "^_" 
      }]
    },
    ignores: [
      "node_modules/",
      "coverage/",
      "dist/"
    ]
  },
  {
    files: ["**/__tests__/**/*.js"],
    rules: {
      "jest/no-disabled-tests": "error",
      "jest/no-focused-tests": "error"
    }
  }
];
