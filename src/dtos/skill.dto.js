const yup = require('yup');

const common = yup.object({
	body: yup.object({
		name: yup
			.string('Tên phải là chuỗi')
			.required('Tên bị thiếu'),
		meta: yup.string('Meta phải là chuỗi').required('Meta bị thiếu'),
	}),
});

module.exports = { common };
