const yup = require('yup');

const id = yup.object({
	params: yup.object({
		id: yup
			.string()
			.trim()
			.matches(/^[a-fA-F0-9]{24}$/, 'Invalid id'),
	}),
});

module.exports = id;
