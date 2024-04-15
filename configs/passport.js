const passport = require('passport');
const { UserModel } = require('../src/models');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.OAUTH_CLIENT_ID,
			clientSecret: process.env.OAUTH_CLIENT_SECRET,
			callbackURL: process.env.OAUTH_CALLBACK_URI.replace(
				'PORT',
				process.env.PORT
			),
		},
		async function (_, _, profile, done) {
			const user = await UserModel.findOneAndUpdate(
				{ oauthID: profile.id },
				{ name: profile.displayName, oauthID: profile.id, avatar: profile.picture, role: 'candidate' },
				{ upsert: true }
			);

			return done(null, user);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const user = await UserModel.findById(id).lean();
	console.log('User', user);

	done(null, user);
});

module.exports = passport;
