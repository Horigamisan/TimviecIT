const mailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');

const GOOGLE_MAILER_CLIENT_ID = process.env.GOOGLE_MAILER_CLIENT_ID;
const GOOGLE_MAILER_CLIENT_SECRET = process.env.GOOGLE_MAILER_CLIENT_SECRET;
const GOOGLE_MAILER_REFRESH_TOKEN = process.env.GOOGLE_MAILER_REFRESH_TOKEN;
const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS;
const ADMIN_NAME = process.env.ADMIN_NAME;

console.log(process.env);

const myOAuth2Client = new OAuth2Client(
	GOOGLE_MAILER_CLIENT_ID,
	GOOGLE_MAILER_CLIENT_SECRET
);

myOAuth2Client.setCredentials({
	refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
});

const sendMail = async ({ to, subject, content: html, ...options }) => {
	const accessToken = (await myOAuth2Client.getAccessToken()).token;

	const transport = mailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: ADMIN_EMAIL_ADDRESS,
			clientId: GOOGLE_MAILER_CLIENT_ID,
			clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
			refreshToken: GOOGLE_MAILER_REFRESH_TOKEN,
			accessToken,
		},
	});

	const mailOptions = {
		from: {
			name: ADMIN_NAME,
			address: ADMIN_EMAIL_ADDRESS,
		},
		to,
		subject,
		html,
		...options,
	};

	await transport.sendMail(mailOptions);
};

module.exports = { sendMail };
