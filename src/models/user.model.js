const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
	name: String,
	oauthID: String,
	password: String,
	avatar: String,
	email: String,
	phone: String,
	role: String,
	status: String,
	jobTitle: String,
	address: String,
	nationality: String,
	ambition: String,
	skills: [String],
	birthday: String,
	projects: [
		{
			name: String,
			source: String,
			description: String,
			demo: String,
		},
	],
	english: String,
	experience: [
		{
			start: String,
			end: String,
			job: String,
			company: String,
			description: String,
		},
	],
	education: [
		{
			start: String,
			end: String,
			university: String,
			major: String,
			degree: String,
		},
	],
	socials: [
		{
			platform: String,
			link: String,
		},
	],
	appliedJobs: {
		type: [Schema.Types.ObjectId],
		ref: 'Job',
	},
	bookmarkedJobs: {
		type: [Schema.Types.ObjectId],
		ref: 'Job',
	},
	followedCompanies: {
		type: [Schema.Types.ObjectId],
		ref: 'Company',
	},
});

module.exports = model('User', UserSchema);
