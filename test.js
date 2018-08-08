'use strict';

const Linter = require('eslint').Linter;
const linter = new Linter();

linter.defineRules(require('./index.js').rules);

const sample = require('fs').readFileSync('./sample.js').toString();

const config = require('./.eslintrc.js');
console.log();

console.log('1st test!');
console.log('All suspicious condidions:\n\n');

const results1 = linter.verify(
	sample,
	config
);
console.log(results1);

console.log('\n\n2nd test!');
console.log('Only [global~window] suspicious:\n\n');
config.rules['no-arrow-this'] = ['warn', {
	onlyGlobals : true
}];
const results2 = linter.verify(
	sample,
	config
);
console.log(results2);