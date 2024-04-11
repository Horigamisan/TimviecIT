const { UserModel, JobModel, ApplyFormModel } = require('../models');
const { saveFile, proxy } = require('../helpers/functions');

module.exports = proxy({
	get,
	edit,
	getBookmarkedJobs,
	getAppliedJobs,
});

async function get(req, _, next) {
	if (req.params.id) {
		const candidate = await UserModel.findById(req.params.id).lean();
		req.candidate = candidate;
	} else {
		req.candidate = req.user || req.session.user;
	}

	next();
}

async function getBookmarkedJobs(req, _, next) {
	const candidate = req.user || req.session.user;
	const jobs = await JobModel.find(
		{ _id: { $in: candidate.bookmarkedJobs } },
		'_id name meta dueTo'
	)
		.populate('company', '_id name meta')
		.lean();
	req.bookmarkedJobs = jobs;
	next();
}

async function getAppliedJobs(req, _, next) {
	const candidate = req.user || req.session.user;
	const jobs = await ApplyFormModel.find(
		{ candidateId: candidate._id },
		'status jobId updatedAt'
	)
		.populate('jobId', '_id name meta dueTo')
		.populate('jobId.company', '_id name meta')
		.lean();
	req.appliedJobs = jobs;
	next();
}

async function edit(req, res) {
	if (req.body.avatar.size === 0) {
		delete req.body.avatar;
	}

	const id = req.user?._id || req.session.user._id;
	const user = await UserModel.findOneAndUpdate(
		{ _id: id },
		{ ...req.body, avatar: req.body.avatar && saveFile(req.body.avatar) },
		{ new: true, lean: true }
	);

	if (req.user) {
		req.user = user;
	} else {
		req.session.user = user;
	}

	res.redirect(req.get('referer'));
}
