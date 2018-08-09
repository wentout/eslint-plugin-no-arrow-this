'use strict';

module.exports = context => {
	// lowercased name of AST Arrow Function
	const AST_AF = 'ArrowFunctionExpression'.toLowerCase();
	// lowercased name of AST Program Start
	const AST_PRG = 'Program'.toLowerCase();

	// Here are list of nodes for check breaking
	// If one of them found, then everything is good
	// And it is not necessary to check anymore else
	const breakList = ['FunctionDeclaration', 'FunctionExpression', AST_PRG].map(name => name.toLowerCase());

	// This options allows to warn only situations
	// When context of arrow function 
	// points Strict to Global or Window
	const onlyGlobals = Array.isArray(context.options) && context.options[0] && context.options[0].onlyGlobals ? true : false;

	// Warn message depends of onlyGlobals option
	const name = onlyGlobals ? 'global "this"' : '"this"';

	var type, parent;

	// checking function depends of onlyGlobals
	const prepareCheckFn = node => {
		parent = node;

		const switchParent = () => {
			// switching AST node
			// upper from current
			parent = parent.parent;
			type = parent.type.toLowerCase();
		};

		if (!onlyGlobals) {
			return () => {
				switchParent();
				if (breakList.includes(type)) {
					return null;
				}
				if (type === AST_AF) {
					return true;
				}
				return false;
			};
		}

		let found = false;
		return () => {
			switchParent();
			if (breakList.includes(type)) {
				return found && type === AST_PRG ? true : null;
			}
			if (type === AST_AF) {
				found = true;
			}
			return false;
		};
	};

	return {
		ThisExpression(node) {
			const check = prepareCheckFn(node);
			var result = false;
			while (result === false) {
				result = check();
			}
			if (result) {
				context.report(node, `do not use ${name} in an arrow function`);
			}
		}
	};
};