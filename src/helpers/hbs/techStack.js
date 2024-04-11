const skillDisplayName = require('./skillDisplayName');

module.exports = (stack, itemClass) => {
	return stack
		.map(
			(meta) =>
				`<li class="${itemClass}"><a href="/jobs?skills=${meta}">${skillDisplayName(
					meta
				)}</a></li>`
		)
		.join('');
};
