'use strict';

() => {
	const me = 123;
	(function () {
		this;
	}());
};

() => {
	me = this;
};