const yup = require('yup');

const profile = yup.object({
	body: yup.object({
		logo: yup.object({
			mimetype: yup
				.string()
				.oneOf(
					['image/jpeg', 'image/png', 'image/gif', 'application/octet-stream'],
					'Ảnh không hợp lệ'
				),
			size: yup.number().max(1024 * 1024, 'Ảnh quá lớn'),
		}),
		locations: yup
			.object({
				[yup.string()]: yup.array().of(yup.string()),
			})
			.required('Địa chỉ không được để trống'),
		name: yup.string('Tên phải là chuỗi').required('Tên bị thiếu'),
		email: yup
			.string()
			.email('Email không hợp lệ')
			.required('Email không được để trống'),
		website: yup.string().url('Đường dẫn không hợp lệ'),
		hotline: yup
			.string()
			.matches(/(84|0)+([0-9]{9})\b/g, 'Số điện thoại không hợp lệ')
			.required('Số điện thoại không được để trống'),
		workingTime: yup
			.string()
			.required('Thời gian làm việc không được để trống'),
		enterpriseSize: yup
			.string()
			.required('Quy mô doanh nghiệp không được để trống'),
		introduction: yup.string().required('Giới thiệu không được để trống'),
		techStack: yup
			.array()
			.of(yup.string())
			.required('Công nghệ không được để trống'),
		benefit: yup.string().required('Quyền lợi không được để trống'),
	}),
});

module.exports = { profile };
