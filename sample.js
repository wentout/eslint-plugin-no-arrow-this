'use strict';

() => {
	// correct styling for this
	(function () {
		const me = this;
		console.log(me);
	}());
};

() => {
	// wrong styling for this
	var me = this;
	console.log(me);
};