import globals from "globals";
import pluginJs from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
  { languageOptions: { globals: { ...globals.browser, Reflect: "readonly", Promise: "readonly", Symbol: "readonly" } } },
  pluginJs.configs.recommended,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: {
        ...globals.node,
        structuredClone: "readonly"
      }
    },
    plugins: {
      "@typescript-eslint": typescriptEslint
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      "no-redeclare": "off",
      "no-unused-vars": "off",
      "no-cond-assign": "off",
      "no-prototype-builtins": "off",
      "no-case-declarations": "off",
      "no-unsafe-finally": "off",
      "no-func-assign": "off",
      "no-empty": "off",
      "no-fallthrough": "off",
      "no-undef": "off",
      "no-self-assign": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-array-constructor": "off",
      "@typescript-eslint/no-duplicate-enum-values": "off",
    }
  }
];