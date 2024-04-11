const router = require('express').Router();

const passport = require('../../configs/passport');
const { AuthController } = require('../controllers');
const { AuthDto } = require('../dtos');
const { validate } = require('../helpers/middlewares');

router.post(
	'/sign-in/:role',

	validate(AuthDto.signin),
	AuthController.signin
);

router.post('/sign-up/:role', validate(AuthDto.signup), AuthController.signup);

router.get('/sign-out', AuthController.signout);

router.get(
	'/oauth2',
	passport.authenticate('google', {
		scope: ['profile'],
	})
);
router.get(
	'/oauth2/callback',
	passport.authenticate('google', { failureRedirect: '/' }),
	(_, res) => {
		res.redirect('/');
	}
);

module.exports = router;
