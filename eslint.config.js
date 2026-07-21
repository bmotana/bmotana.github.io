import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import globals from "globals"; // 1. Import the globals package

export default [
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
      "no-unused-vars": "warn",
      // ... your other rules
    },
  },
];
