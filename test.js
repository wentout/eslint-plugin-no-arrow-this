'use strict';

const Linter = require('eslint').Linter;
const linter = new Linter();

linter.defineRules(require('./index.js').rules);

const sample = require('fs').readFileSync('./sample.js').toString();

const results = linter.verify(
	sample,
	require('./.eslintrc.js')
);

console.log(results);