'use strict';

const rule = require('./rules/no-arrow-this');

module.exports = {
	meta: {
		docs: {
			description: 'get rid of using "this" keyword in arrow functions',
			category: 'code style~convention',
			recommended: false
		},
		fixable: null
	},
	rules: {
		'no-arrow-this': rule
	}
};