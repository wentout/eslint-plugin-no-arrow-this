const create = (context) => {
	var breakList = [
		'FunctionDeclaration',
		'FunctionExpression',
		'Program'
	];
	var onlyGlobals = false;
	if (Array.isArray(context.options) && context.options[0]) {
		onlyGlobals = context.options[0].onlyGlobals || false;
	}
	return {
		ThisExpression(node) {
			var parent = node.parent;
			var type = parent.type;
			var result = false;
			var name = onlyGlobals ? 'global "this"' : '"this"';
			var found = false; 
			var check = onlyGlobals ? () => {
			if (breakList.indexOf(type) > -1) {
				result = (found && type == 'Program') ? true : null;
				return;
			}
			if (type == 'ArrowFunctionExpression') {
				found = true;
			}
			} : () => {
			if (breakList.indexOf(type) > -1) {
				result = null;
			}
			if (type == 'ArrowFunctionExpression') {
				result = true;
			}
			};
			check();
			while (result === false) {
			parent = parent.parent;
			type = parent.type;
			check();
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

module.exports = {
	meta : {
		docs : {
			description : 'get rid of using "this" keyword in arrow functions',
			category : 'code style~convention',
			recommended : false
		},
		fixable : null
	},
	rules : {
		'no-arrow-this' : {
			create
		}
	}
};