const { Schema, model } = require('mongoose');

const CompanySchema = new Schema({
	accountId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	name: String,
	locations: {
		type: Map,
		of: [String],
	},
	meta: String,
	wallpaper: String, //file
	logo: String, //file
	introduction: String,
	workingTime: String,
	rating: Number,
	noOfRatings: Number,
	sumOfRatings: Number,
	website: String,
	enterpriseSize: String, // select
	benefit: String,
	email: String,
	typeOfCompany: [String], // out source, in house, both
	hotline: String,
	country: String, //select
	techStack: [String], // change to object id later // select
});

module.exports = model('Company', CompanySchema);
