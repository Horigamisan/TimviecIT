const router = require('express').Router();

const {
	ViewController,
	JobController,
	CompanyController,
	PositionController,
	SkillController,
	UserController,
} = require('../controllers');

router.get(
	'/',
	JobController.getWorkTypeCountAndTopJobs(12),
	CompanyController.getTopCompanies(12),
	PositionController.getAll,
	ViewController.home
);

router.get(
	'/jobs',
	JobController.getJobs,
	SkillController.getAll,
	ViewController.jobs
);

router.get(
	'/companies/my-company/([a-zA-Z0-9-]+)-:id([0-9a-fA-F]{24})/candidates',
	JobController.getCandidates,
	ViewController.jobCandidate
);

router.get(
	'/jobs/([a-zA-Z0-9-]+)-:id([0-9a-fA-F]{24})',
	JobController.get,
	JobController.getCompanyJobs(4, true),
	PositionController.getAll,
	SkillController.getAll,
	ViewController.jobDetail
);
// router.get('/jobs', JobController.getAll, ViewController.jobs);

router.get(
	'/companies/my-company/recruitment',
	PositionController.getAll,
	SkillController.getAll,
	ViewController.recruitment
);
router.get(
	'/companies/:meta',
	CompanyController.get,
	SkillController.getAll,
	JobController.getCompanyJobs(4, false),
	ViewController.companyDetail
);

router.get(
	'/user/bookmarked-jobs',
	UserController.getBookmarkedJobs,
	ViewController.bookmarkedJobs
);

router.get(
	'/user/applied-jobs',
	UserController.getAppliedJobs,
	ViewController.appliedJobs
);

router.get(
	'/companies/my-company/jobs',
	JobController.getCompanyJobsWithTotalCandidates,
	ViewController.jobsWithTotalCandidates
);

router.get('/auth/sign-in', ViewController.signin);
router.get('/auth/sign-up', ViewController.signup);

module.exports = router;
