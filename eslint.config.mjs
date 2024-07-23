import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
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
			'no-use-before-define': ['error'],
			'default-case': ['error'],
			'prefer-template': ['error'],

			'no-implicit-coercion': ['warn'],
			'no-alert': ['warn'],
		},
	},
	pluginJs.configs.recommended,
]
