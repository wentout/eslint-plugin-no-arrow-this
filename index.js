const create = (context) => {
	return {
		ThisExpression(node) {
			var parent = node.parent;
			var type = parent.type;
			var result = false;
			var check = function () {
				if (['FunctionDeclaration', 'FunctionExpression', 'CallExpression', null].indexOf(type) > -1) {
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
				context.report(node, 'Do not use this in an arrow function');
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