const router = require('express').Router();

const {
	UserController,
	ViewController,
	SkillController,
} = require('../controllers');

const { parseFormData, validate } = require('../helpers/middlewares');
const { UserDto } = require('../dtos');

router
	.route('/profile/:id')
	.get(UserController.get, SkillController.getAll, ViewController.profile)
	.post(parseFormData, validate(UserDto.profile), UserController.edit);

module.exports = router;
