const { Schema, model } = require('mongoose');
const {
	currency: currencies,
	yearsOfExperience,
	workType,
	provinces,
} = require('../constants');

const JobSchema = new Schema(
	{
		name: String,
		company: {
			type: Schema.Types.ObjectId,
			ref: 'Company',
		},
		salary: String,
		currency: {
			type: String,
			enum: currencies,
			// default: currencies[0],
		},
		skills: {
			type: [String],
		}, // change to object id later
		locations: {
			type: Map,
			of: [String],
			// enum: Object.keys(provinces).map((province) => province.meta),
			// default: provinces[Object.keys(provinces)[0]].meta,
		},
		workType: {
			type: [String],
			// enum: Object.keys(workType).map((type) => type.meta),
			// default: workType[Object.keys(workType)[0]].meta,
		},
		yearsOfExperience: {
			type: String,
			// enum: Object.keys(yearsOfExperience),
		},
		briefDescription: String,
		details: String,
		requirements: String,
		quantity: Number,
		dueTo: Date,
		gender: {
			type: String,
			enum: ['male', 'female'],
			default: undefined,
		},
		positions: {
			type: [String],
		},
		status: {
			type: String,
			default: 'unverified',
		},
		meta: String,
		hidden: Boolean,
	},
	{
		timestamps: true,
	}
);

module.exports = model('Job', JobSchema);
