const router = require('express').Router();
// 6410219c681311349b4b1661
const { SkillController } = require('../controllers');
const { validate } = require('../helpers/middlewares');
const { SkillDto } = require('../dtos');

router
	.route('/add')
	.get((_, res) => {
		res.render('job_skills/add');
	})
	.post(validate(SkillDto.common), SkillController.create);

router.post('/edit/:id', validate(SkillDto.common), SkillController.update);

router.post('/delete/:id', SkillController.remove);

router.get('/', SkillController.getAll);

module.exports = router;
