import globals from "globals";
import pluginJs from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";

export default [
  {
    languageOptions: { globals: globals.browser },
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/linebreak-style": ["error", "unix"],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
    },
  },
  pluginJs.configs.recommended,
];
