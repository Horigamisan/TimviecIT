const router = require('express').Router();

const { JobController } = require('../controllers');
const { validate, parseFormData } = require('../helpers/middlewares');
const { JobDto } = require('../dtos');

router.post('/create', validate(JobDto.create), JobController.create);

router.post('/:id/cancel-apply', JobController.cancelApply);
router.post('/:id/edit', validate(JobDto.create), JobController.update);
router.post('/:id/bookmark', JobController.bookmark);
router.post('/:id/unbookmark', JobController.unbookmark);
router.post('/:id/stop-recruiting', JobController.stopRecruiting);
router.post('/:id/continue-recruiting', JobController.continueRecruiting);
router.post('/:id/apply', parseFormData, JobController.apply);
router.post('/:id/remove', JobController.remove);
router.post('/:id/:action', JobController.censorCandidate);

module.exports = router;
