'use strict';

const noArrowThis = require('./src/index.js');

module.exports = [
	{
		languageOptions: {
			ecmaVersion: 2018,
			sourceType: 'module'
		},
		plugins: { 'no-arrow-this': noArrowThis },
		rules: {
			'no-arrow-this/no-arrow-this': 'warn',
			'linebreak-style': ['error', 'unix'],
			'quotes': ['error', 'single'],
			'semi': ['error', 'always'],
			'no-console': 'off'
		}
	}
];
