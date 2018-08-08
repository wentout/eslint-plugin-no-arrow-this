'use strict';

const eslint = require('eslint');
const rule = require('../../src/rules/no-arrow-this');

const ruleTester = new eslint.RuleTester();

const ruleOpts = {
	message: 'do not use "this" in an arrow function',
	type: 'ThisExpression'
};
const parserOptions = {
	ecmaVersion: 6
};

ruleTester.run('no-arrow-this', rule, {
	valid: [
		'(function () { var me = this; console.log(me); })();',
		{
			code: '(() => { (function () { const me = this; console.log(me); }).bind("good")(); })();',
			parserOptions
		},
		{
			code: '(function () { var me = this; (() => { console.log(me); })(); }).bind("good again")();',
			parserOptions
		}
	],
	invalid: [{
			code: '(() => { var me = this; console.log(me); }).bind(\'fail\')();',
			parserOptions,
			errors: [ruleOpts]
		},
		{
			code: '(function () { (() => { var me = this; console.log(me); })(); }).bind(\'good with condition\')();',
			parserOptions,
			errors: [ruleOpts]
		}
	]
});