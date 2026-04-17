import js from "@eslint/js";
import unicorn from "eslint-plugin-unicorn";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
	js.configs.recommended,
	unicorn.configs["flat/recommended"],
	prettier,
	{
		languageOptions: {
			globals: {
				...globals.node,
			}
		}
	}
];

