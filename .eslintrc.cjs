module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es2021': true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-essential',
	],
	'overrides': [
		{
			'env': {
				'node': true,
			},
			'files': [
				'.eslintrc.{js,cjs}',
			],
			'parserOptions': {
				'sourceType': 'script',
			},
		},
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'parser': '@typescript-eslint/parser',
	},
	'plugins': [
		'@typescript-eslint',
		'vue',
	],
	'rules': {
		indent: ['error', 'space', {
			'ignoredNodes': ['ConditionalExpression'],
		}],
		'linebreak-style': [
			'error',
			'unix',
		],
		'quotes': [
			'error',
			'single',
		],
		'semi': [
			'error',
			'always',
		],
		'comma-dangle': [
			'error',
			'always-multiline',
		],
	},
};
