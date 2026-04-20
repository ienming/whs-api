import js from "@eslint/js";
import unicorn from "eslint-plugin-unicorn";
import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";

export default [
	js.configs.recommended,
	...tseslint.configs["recommended"],
	unicorn.configs["flat/recommended"],
	prettier,
	{
		files: ["**/*.ts"],
		languageOptions: {
			globals: {
				...globals.node,
			},
			parser: tseslint.parser,
			parserOptions: {
				project: "./tsconfig.json",
			}
		}
	}
];
