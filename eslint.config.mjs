import globals from 'globals'
import pluginJs from '@eslint/js'
import jestPlugin from 'eslint-plugin-jest'

export default [
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.jest,
			},
		},
	},
	{
		rules: {
			eqeqeq: ['error'],
			radix: ['error'],
			'use-isnan': ['error'],
			'no-shadow': ['error'],
			'no-param-reassign': ['error'],
			'no-use-before-define': ['warn'],
			'default-case': ['error'],
			'prefer-template': ['error'],
			'no-implicit-coercion': ['warn'],
			'no-alert': ['warn'],
		},
	},
	pluginJs.configs.recommended,
	{
		files: ['**/*.js'],
		plugins: {
			jest: jestPlugin,
		},
	},
]
