const yup = require('yup');

const { yearsOfExperiences, workTypes } = require('../constants');
const cloneWithOptional = require('./cloneWithOptional');

const create = yup.object({
	body: yup.object({
		name: yup.string().trim().required('Tên công việc không được để trống'),
		yearsOfExperience: yup
			.string()
			.oneOf(Object.keys(yearsOfExperiences))
			.required('Số năm kinh nghiệm không được để trống'),
		locations: yup
			.object({
				[yup.string()]: yup.array().of(yup.string()),
			})
			.required('Địa chỉ không được để trống'),
		gender: yup
			.string()
			.oneOf(['male', 'female', 'other'])
			.required('Giới tính không được để trống'),
		salary: yup
			.string()
			.matches(/^deal|\d+$/)
			.required('Lương không được để trống'),
		dueTo: yup
			.date()
			.typeError('Ngày hết hạn không hợp lệ')
			.required('Ngày hết hạn không được để trống'),
		briefDescription: yup
			.string()
			.trim()
			.required('Mô tả công việc không được để trống'),
		description: yup
			.string()
			.trim()
			.required('Giới thiệu công việc không được để trống'),
		requirements: yup
			.string()
			.trim()
			.required('Yêu cầu công việc không được để trống'),
		currency: yup
			.string()
			.oneOf(['vnd', 'usd', ''], 'Đơn vị tiền phải là VND, USD')
			.optional(),
		skills: yup
			.array()
			.of(yup.string())
			.required('Công việc phải có ít nhất 1 kĩ năng'),
		workType: yup
			.array()
			.of(yup.string())
			.oneOf(Object.values(workTypes).map((type) => type.meta))
			.required('Hình thức làm việc không được để trống'),
	}),
});

module.exports = { create, update: cloneWithOptional(create) };
