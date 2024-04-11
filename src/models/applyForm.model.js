const { Schema, model } = require('mongoose');

const ApplyFormSchema = new Schema(
	{
		candidateId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		jobId: {
			type: Schema.Types.ObjectId,
			ref: 'Job',
		},
		cv: String,
		coverLetter: String,
		name: String,
		email: String,
		phone: String,
		status: {
			type: String,
			default: 'pending',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model('apply_form', ApplyFormSchema);
