import globals from "globals";
import pluginJs from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin-js"


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"], 
    languageOptions: {sourceType: "commonjs"}
  },
  {
    languageOptions: { globals: globals.browser },
    plugins: {
      "@stylistic": stylistic
    },
    rules: {
      "@stylistic/indent": ["warn", 2],
			"@stylistic/linebreak-style": ["warn", "unix"],
      "@stylistic/semi": ["warn", "always"]
    }
  },
  pluginJs.configs.recommended,
];