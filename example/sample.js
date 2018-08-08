'use strict';

// correct styling for this: start
(() => {
	(function () {
		const me = this;
		console.log(me);
	}).bind('good')();
})();


(function () {
	var me = this;
	(() => {
		console.log(me);
	})();
}).bind('good again')();
// correct styling for this: end

// wrong styling for this: start
(() => {
	var me = this;
	console.log(me);
}).bind('fail')();

(function () {
	(() => {
		var me = this;
		console.log(me);
	})();
}).bind('good with condition')();
// wrong styling for this: end
