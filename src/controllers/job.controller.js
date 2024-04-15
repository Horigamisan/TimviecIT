const { ObjectId } = require('mongoose').Types;

const {
	JobService,
	ApplyFormService,
	UserService,
	MailService,
} = require('../services');
const {
	normalizeQueryObject,
	proxy,
	saveFile,
	stringToMeta,
} = require('../helpers/functions');
const { workTypes, jobCardFields } = require('../constants');
const jobService = require('../services/job.service');

let totalJobs;

module.exports = proxy({
	get,
	create,
	update,
	remove,
	getWorkTypeCountAndTopJobs,
	getCompanyJobs,
	getJobs,
	bookmark,
	unbookmark,
	apply,
	stopRecruiting,
	continueRecruiting,
	getCompanyJobsWithTotalCandidates,
	cancelApply,
	totalJobs,
	getCandidates,
	censorCandidate,
});

function getWorkTypeCountAndTopJobs(quantity) {
	return async function (req, _, next) {
		const result = await JobService.match({})
			.populate('companies', 'company')
			.select(jobCardFields)
			.reduceLocations()
			.addFacet()
			.addWorkTypeCount()
			.top(quantity)
			.exec();

		Object.keys(workTypes).forEach((type) => {
			workTypes[type].quantity =
				result[0].jobsTypeCount[workTypes[type].meta] || 0;
		});

		req.jobs = result[0].data || [];
		req.workTypes = workTypes;

		next();
	};
}

async function censorCandidate(req, res) {
	const action = req.params.action;
	const formId = req.body.formId;

	await ApplyFormService.update(
		{
			_id: formId,
		},
		{
			status: action === 'confirm' ? 'confirmed' : 'rejected',
		}
	);

	await MailService.sendMail({
		to: req.body.email,
		subject: 'Phản hổi đơn ứng tuyển',
		content:
			action === 'confirm'
				? 'Đơn ứng tuyển của bạn đã được phê duyệt! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể'
				: 'Cảm ơn bạn đã quan tâm đến bài đăng tuyển của chúng tôi, tuy nhiên bạn không đủ điều kiện để ứng tuyển vào công việc này',
	});

	res.redirect(req.get('referer'));
}

function getCompanyJobs(quantity, exceptOne = true) {
	return async function (req, _, next) {
		let filter = {};
		let aggregate;

		if (exceptOne) {
			filter = {
				_id: { $ne: req.job._id },
				'company._id': req.job.company._id,
			};
			aggregate = JobService.populate('companies', 'company').match(filter);
		} else {
			if (typeof req.company._id === 'string') {
				filter = { company: new ObjectId(req.company._id) };
			} else {
				filter = { company: req.company._id };
			}

			aggregate = jobService.match(filter);
		}

		const jobs = await aggregate
			.select(jobCardFields)
			.reduceLocations()
			.top(quantity)
			.exec();

		jobs.forEach((job) => {
			if (!job.company?._id) {
				job.company = {
					_id: req.company,
					name: req.company.name,
					logo: req.company.logo,
					meta: req.company.meta,
				};
			}
		});

		req.sameCompanyJobs = jobs;

		next();
	};
}

async function getCompanyJobsWithTotalCandidates(req, _, next) {
	const companyId = req.session.company._id;

	const jobs = await JobService.match({ company: new ObjectId(companyId) })
		.getManyWithTotalApplyForms('apply_forms', '_id', 'jobId', 'applyForms', [
			'_id',
			'name',
			'meta',
			'dueTo',
		])
		.exec();
	req.jobs = jobs;
	next();
}

async function getJobs(req, res, next) {
	const query = req.query;
	req.form = { ...req.query };

	normalizeQueryObject(query);
	const page = +req.query.page || 1;

	req.currentPage = page;
	delete query.page;

	let totalRecords;
	if (!query['company.meta']) {
		totalRecords = await JobService.getTotalDocuments(query);
	} else {
		totalRecords = (
			await JobService.populate('companies', 'company').match(query).exec()
		).length;
	}

	const result = await JobService.populate('companies', 'company')
		.match(query)
		// .select(jobCardFields)
		.reduceLocations()
		.page(page)
		.exec();

	if (
		totalRecords &&
		totalRecords !== 0 &&
		page > Math.ceil(totalRecords / 1)
	) {
		res.redirect(req.originalUrl.replace(/[?&]page=\d+/, ''));
	}

	req.jobs = result;
	req.totalRecords = totalRecords;

	next();
}

async function get(req, _, next) {
	const job = await JobService.get({ _id: req.params.id }).populate(
		'company',
		'_id name logo meta benefit'
	);

	if (!job) {
		return next(new CustomError('Không tìm thấy công việc này', 404));
	}
	req.job = job;

	next();
}

async function create(req, res) {
	const job = await JobService.create({
		...req.body,
		company: req.session.company._id,
		status: 'unverified',
		meta: stringToMeta(req.body.name),
	});

	req.session.flash = {
		title: 'Thành công',
		message: 'Đã tạo công việc thành công',
	};

	res.redirect(`/jobs/${job.meta}-${job._id}`);
}

async function update(req, res) {
	const id = req.params.id;

	const job = await JobService.update(
		{ _id: id },
		{
			...req.body,
			status: 'unverified',
			meta: stringToMeta(req.body.name),
		}
	);

	req.session.flash = {
		title: 'Thành công',
		message: 'Cập nhật thành công',
	};

	res.redirect(`/jobs/${job.meta}-${job._id}`);
}

async function remove(req, res) {
	const id = req.params.id;

	await JobService.remove({ _id: id }, true);

	res.redirect(req.get('referer'));
}

async function bookmark(req, res) {
	const user = await UserService.update(
		{ _id: (req.user || req.session.user)._id },
		{
			$push: { bookmarkedJobs: req.params.id },
		}
	);

	if (req.user) {
		req.user = user;
	} else {
		req.session.user = user;
	}

	req.session.flash = {
		title: 'Thành công',
		message: 'Đã thêm vào danh sách quan tâm',
	};

	res.redirect(req.get('referer'));
}

async function unbookmark(req, res) {
	const user = await UserService.update(
		{ _id: (req.user || req.session.user)._id },
		{
			$pull: { bookmarkedJobs: req.params.id },
		}
	);

	if (req.user) {
		req.user = user;
	} else {
		req.session.user = user;
	}

	req.session.flash = {
		title: 'Thành công',
		message: 'Đã xóa khỏi danh sách quan tâm',
	};

	res.redirect(req.get('referer'));
}

async function apply(req, res) {
	await ApplyFormService.create({
		name: req.body.candidateName,
		email: req.body.candidateEmail,
		phone: req.body.candidatePhone,
		jobId: req.params.id,
		candidateId: (req.user || req.session.user)._id,
		cv: saveFile(req.body.cv, 'files'),
		coverLetter: req.body.coverLetter,
	});

	const updatedCV = await ApplyFormService.update(
		{ _id: (req.user || req.session.user)._id },
		{
			$push: { appliedJobs: req.params.id },
		}
	);

	//get user from _.id
	const user = await UserService.get({ _id: (req.user || req.session.user)._id });

	if (req.user) {
		req.user = user;
	} else {
		req.session.user = user;
	}

	req.session.flash = {
		title: 'Thành công',
		message: 'Ứng tuyển thành công! Vui lòng chờ phản hồi từ nhà tuyển dụng',
	};

	res.redirect(req.get('referer'));
}

async function stopRecruiting(req, res) {
	await JobService.update(
		{ _id: req.params.id },
		{ status: 'stop-recruiting' }
	);

	res.redirect(req.get('referer'));
}

async function continueRecruiting(req, res) {
	await JobService.update({ _id: req.params.id }, { status: 'verified' });

	res.redirect(req.get('referer'));
}

async function cancelApply(req, res) {
	await ApplyFormService.remove({ _id: req.params.id }, false);

	res.redirect(req.get('referer'));
}

async function getCandidates(req, res, next) {
	const forms = await ApplyFormService.getMany({ jobId: req.params.id });

	req.candidates = forms;

	next();
}
