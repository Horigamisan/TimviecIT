const express = require('express');
const router = express.Router();

const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const jobRouter = require('./job.route');
// const skillRouter = require('./skill');
const viewRouter = require('./view.route');
const companyRouter = require('./company.route');

// const { Company, Job } = require('../models');

router.get('/([a-zA-Z0-9-]+)-:id([0-9a-fA-F]{24})', (req, res) => {
	const objectId = req.params.id;
	// Do something with the ObjectId
	res.json(`ObjectId: ${objectId}`);
});
// router.get('/', (req, res) => {
// 	const tmp = paginate(100, 20, +req.query.page || 1);
// 	res.render('pagination', { layout: 'script-only', ...tmp });
// });
router.use('/jobs', jobRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/companies', companyRouter);
router.use('/', viewRouter);
router.use((req, res) => {
	res.json(req.originalUrl + ' not Found, ');
});

// router.get('/companies', async (req, res) => {
// 	const companies = await Company.find();
// 	res.json(companies);
// });

// router.get('/jobs', async (req, res) => {
// 	const jobs = await Job.find();
// 	res.json(jobs);
// });
// router.use('/auth', authRouter);
// router.get('/profile', (req, res) => res.render('user/profile'));
// router.get('/company/profile', (req, res) => res.render('company/profile'));
// router.use('/jobs', jobRouter);
// router.use('/register-to-get-news', (req, res) => {
// 	res.redirect(req.get('referer'));
// });
// router.get('/', (_, res) => {

// }
// 	res.render('home/index', {
// 		job: {
// 			company: {
// 				_id: '5f9f1b0b0b1b1b1b1b1b1b1b1',
// 				name: 'Company Name',
// 				logo: '/images/job/Codepen.svg',
// 			},
// 			_id: 1,
// 			name: 'Job Name',
// 			salary: 1000,
// 			currency: 'USD',
// 			updatedAt: '2021-02-20 09:11:00',
// 			skills: ['NodeJS', 'Java', 'C#'],
// 			locations: ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng'],
// 		},
// 	})
// );
// router.use('/job_skills', jobSkillRouter);
// router.use('/', (req, res) => {
// 	res.json(req.user);
// });

module.exports = router;
