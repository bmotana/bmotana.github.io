import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import globals from "globals"; // 1. Import the globals package

export default [
  {
    ignores: ["dist/", "coverage/", "node_modules/"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      // 2. Add this line to tell ESLint about browser variables
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
      "no-unused-vars": "warn",
    },
  },
  {
    files: ["src/**/*.test.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        describe: "readonly",
        expect: "readonly",
        it: "readonly",
      },
    },
  },
];
