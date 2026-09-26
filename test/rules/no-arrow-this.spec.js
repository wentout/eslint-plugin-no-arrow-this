'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../src/rules/no-arrow-this');

const ruleTester = new RuleTester();

const ruleOpts = {
	message: 'do not use "this" in an arrow function',
	type: 'ThisExpression'
};
const languageOptions = {
	ecmaVersion: 6
};

ruleTester.run('no-arrow-this', rule, {
	valid: [
		'(function () { var me = this; console.log(me); })();',
		{
			code: '(() => { (function () { const me = this; console.log(me); }).bind("good")(); })();',
			languageOptions
		},
		{
			code: '(function () { var me = this; (() => { console.log(me); })(); }).bind("good again")();',
			languageOptions
		}
	],
	invalid: [{
		code: '(() => { var me = this; console.log(me); }).bind(\'fail\')();',
		languageOptions,
		errors: [ruleOpts]
	},
	{
		code: '(function () { (() => { var me = this; console.log(me); })(); }).bind(\'good with condition\')();',
		languageOptions,
		errors: [ruleOpts]
	}]
});
