'use strict';

module.exports = (context) => {
	// Here are list of nodes for check breaking
	// If one of them found, then everything is good
	// And it is not necessary to check anymore else
	var breakList = [
		'FunctionDeclaration',
		'FunctionExpression',
		'Program'
	];
	// This options allows to warn only situations
	// When context of arrow function 
	// points Strict to Global or Window
	var onlyGlobals = (
		Array.isArray(context.options) &&
		context.options[0] &&
		context.options[0].onlyGlobals
	) ? true : false;
	
	// Warn message depends of onlyGlobals option
	const name = onlyGlobals ? 'global "this"' : '"this"';
	
	var type, parent;
	
	// checking function depends of onlyGlobals
	const prepareCheckFn = (node) => {
		parent = node;
		type = node.type;
		
		const switchParent = () => {
			// switching AST node
			// upper from current
			parent = parent.parent;
			type = parent.type;
		};
		
		if (!onlyGlobals) {
			return () => {
				switchParent();
				if (breakList.includes(type)) {
					return null;
				}
				if (type == 'ArrowFunctionExpression') {
					return true;
				}
				return false;
			};
		}
		
		let found = false;
		return () => {
			switchParent();
			if (breakList.includes(type)) {
				return (found && type == 'Program') ? true : null;
			}
			if (type == 'ArrowFunctionExpression') {
				found = true;
			}
			return false;
		};
		
	};
	
	return {
		ThisExpression(node) {
			const check = prepareCheckFn(node);
			let result = false;
			while (result === false) {
				result = check();
				if (result || result === null) {
					break;
				}
			}
			if (result) {
				context.report(node, `do not use ${name} in an arrow function`);
			}
		}
	};
};