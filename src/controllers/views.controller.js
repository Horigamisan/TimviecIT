const {
	provinces,
	enterpriseSizes,
	yearsOfExperiences,
	workTypes,
} = require('../constants');
const { paginate, proxy } = require('../helpers/functions');

module.exports = proxy({
	home,
	jobs,
	jobDetail,
	companyDetail,
	signin,
	signup,
	profile,
	recruitment,
	bookmarkedJobs,
	appliedJobs,
	jobsWithTotalCandidates,
	jobCandidate,
});

async function jobsWithTotalCandidates(req, res) {
	const paginateSpecifications = paginate(
		req.jobs.length,
		1,
		req.currentPage || 1
	);
	// res.json(req.jobs);
	res.render('company/jobs', { jobs: req.jobs, ...paginateSpecifications });
}

async function recruitment(req, res) {
	// company jobs
	res.render('company/recruitment', {
		positions: req.positions,
		skills: req.skills,
		workTypes,
		enterpriseSizes,
		yearsOfExperiences,
		locations: req.session.company.locations,
	});
}

async function home(req, res) {
	res.render('home/index', {
		jobs: req.jobs,
		topCompanies: req.topCompanies,
		workTypes: req.workTypes,
		positions: req.positions,
		provinces,
	});
}

async function profile(req, res) {
	// return res.json(req.candidate);
	res.render('user/profile', {
		candidate: req.candidate,
		skills: req.skills,
		socials: ['facebook', 'instagram', 'github', 'linkedin'],
		isOwner:
			req.candidate._id.toString() ===
			(req.session.user || req.user)._id.toString(),
	});
}

async function jobs(req, res) {
	const paginateSpecifications = paginate(
		req.totalRecords,
		1,
		req.currentPage || 1
	); // 1 is limit per page

	res.render('jobs/index', {
		jobs: req.jobs,
		...paginateSpecifications,
		skills: req.skills,
		form: req.form,
	});
}

async function jobDetail(req, res) {
	res.render('jobs/details', {
		positions: req.positions,
		skills: req.skills,
		workTypes,
		enterpriseSizes,
		yearsOfExperiences,
		locations: req.session.company?.locations,
		job: req.job,
		sameCompanyJobs: req.sameCompanyJobs,
		isApplied: (
			req.session.user ||
			req.user ||
			req.session.company
		)?.appliedJobs?.includes(req.job._id.toString()),
		isOwner:
			req.session?.company?._id.toString() === req.job.company._id.toString(),
		isInBookmark: (req.session.user || req.user)?.bookmarkedJobs?.includes(
			req.job._id.toString()
		),
		isStopRecruiting: req.job.status === 'stop-recruiting',
		isExpired: req.job.dueTo.getTime() < Date.now(),
	});
}

async function bookmarkedJobs(req, res) {
	const paginateSpecifications = paginate(
		req.bookmarkedJobs.length,
		1,
		req.currentPage || 1
	);
	res.render('user/bookmark', {
		bookmark: req.bookmarkedJobs,
		...paginateSpecifications,
	});
}

async function appliedJobs(req, res) {
	const paginateSpecifications = paginate(
		req.appliedJobs.length,
		1,
		req.currentPage || 1
	);
	res.render('user/appliedJob', {
		appliedJobs: req.appliedJobs,
		...paginateSpecifications,
	});
}

async function companyDetail(req, res) {
	res.render('company/profile', {
		company: req.company,
		jobs: req.sameCompanyJobs,
		provinces,
		enterpriseSizes,
		skills: req.skills,
		isOwner:
			req.session?.company?._id.toString() === req.company._id.toString(),
		isFollowed: (req.session.user || req.user)?.followedCompanies?.includes(
			req.company._id.toString()
		),
	});
}

async function jobCandidate(req, res) {
	// res.json(req.candidates);
	res.render('jobs/candidate', {
		candidates: req.candidates,
	});
}

async function signin(_, res) {
	res.render('auth/signin', { layout: 'script-only' });
}

async function signup(_, res) {
	res.render('auth/signup', { layout: 'script-only' });
}
