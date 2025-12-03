import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "node_modules/**",
    "next-env.d.ts",
    "*.config.{js,mjs,ts}",
    ".eslintrc.*",
  ]),

  {
    plugins: {
      prettier,
      import: importPlugin,
      "unused-imports": unusedImports,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      "prettier/prettier": "error",

      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          pathGroups: [{ pattern: "@/**", group: "internal", position: "before" }],
          pathGroupsExcludedImportTypes: ["builtin"],
        },
      ],
      "import/no-unresolved": "error",
      "import/no-duplicates": "error",
      "import/no-cycle": ["error", { maxDepth: 3 }],
      "no-restricted-imports": [
        "error",
        {
          patterns: [{ group: ["../*"], message: "Use absolute imports with @/ instead of relative imports." }],
        },
      ],

      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "error",
      "eqeqeq": ["error", "always", { null: "ignore" }],
      "no-eval": "error",
      "no-param-reassign": [
        "error",
        {
          props: true,
          ignorePropertyModificationsFor: ["state", "acc", "accumulator"],
        },
      ],
    },
  },
]);

export default eslintConfig;
