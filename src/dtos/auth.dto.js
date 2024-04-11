const yup = require('yup');

const signin = yup.object({
	body: yup.object({
		email: yup
			.string()
			.email('Email không hợp lệ')
			.required('Email không được để trống'),
		password: yup.string().required('Mật khẩu không được để trống'),
	}),
});

const signup = yup.object({
	body: yup.object({
		name: yup.string().trim().required('Tên không được để trống'),
		password: yup
			.string()
			.trim()
			.min(3, 'Mật khẩu tối thiểu 3 kí tự')
			.max(16, 'Mật khẩu tối đa 16 kí tự')
			.required('Mật khẩu không được để trống'),
		email: yup
			.string()
			.trim()
			.email('Email không hợp lệ')
			.required('Email không được để trống'),
		phone: yup
			.string()
			.trim()
			.matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Số điện thoại không hợp lệ')
			.required('Số điện thoại không được để trống'),
		passwordConfirm: yup
			.string()
			.trim()
			.oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
			.required('Mật khẩu xác nhận không được để trống'),
		birthday: yup.date().required('Ngày sinh không được để trống'),
	}),
});

module.exports = { signin, signup };
