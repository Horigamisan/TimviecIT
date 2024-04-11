const yup = require('yup');

const profile = yup.object({
	body: yup.object({
		avatar: yup.object({
			mimetype: yup
				.string()
				.oneOf(
					['image/jpeg', 'image/png', 'image/gif', 'application/octet-stream'],
					'Ảnh không hợp lệ'
				),
			size: yup.number().max(1024 * 1024, 'Ảnh quá lớn'),
		}),
		name: yup.string('Tên phải là chuỗi').required('Tên bị thiếu'),
		email: yup.string().email('Email không hợp lệ'),
		phone: yup
			.string()
			.matches(/(84|0[3|5|7|8|9])+([0-9]{9})\b/g, 'Số điện thoại không hợp lệ'),
		jobTitle: yup.string(),
		address: yup.string(),
		nationality: yup.string(),
		ambition: yup.string(),
		skills: yup.array().of(yup.string()),
		birthday: yup.string(),
		projects: yup.array().of(
			yup.object({
				name: yup.string().required('Tên dự án không được để trống'),
				source: yup.string().required('Link source không được để trống'),
				description: yup.string().required('Mô tả không được để trống'),
				demo: yup.string().required('Link demo không được để trống'),
			})
		),
		english: yup.string(),
		experience: yup.array().of(
			yup.object({
				start: yup.string().required('Ngày bắt đầu không được để trống'),
				end: yup.string().required('Ngày kết thúc không được để trống'),
				job: yup.string().required('Vị trí không được để trống'),
				company: yup.string().required('Công ty không được để trống'),
				description: yup
					.string()
					.required('Mô tả công việc không được để trống'),
			})
		),
		education: yup.array().of(
			yup.object({
				start: yup.string().required('Ngày bắt đầu không được để trống'),
				end: yup.string().required('Ngày kết thúc không được để trống'),
				university: yup.string().required('Trường học không được để trống'),
				major: yup.string().required('Chuyên ngành không được để trống'),
				degree: yup.string(),
			})
		),
		socials: yup.array().of(
			yup.object({
				platform: yup.string().required('Mạng xã hội không được để trống'),
				link: yup.string().required('Link không được để trống'),
			})
		),
	}),
});

module.exports = { profile };
