const { workTypes } = require('../../constants');

let mapped = {};

Object.values(workTypes).forEach((value) => {
	mapped[value.meta] = value.displayName;
});

module.exports = (workTypes) =>
	workTypes.map((type) => mapped[type]).join(', ');
