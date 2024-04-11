const bcrypt = require('bcrypt');

const { UserService, CompanyService } = require('../services');
const { CustomError, proxy } = require('../helpers/functions');

module.exports = proxy({
	signin,
	signup,
	signout,
});

async function signin(req, res, next) {
	const role = req.params.role;

	const user = await UserService.get({ email: req.body.email, role });

	if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
		req.session.form = { email: req.body.email };
		return next(
			new CustomError('Tài khoản hay mật khẩu không đúng', 400, true)
		);
	}

	if (role === 'employer') {
		const company = await CompanyService.get({ accountId: user._id }).lean();
		req.session.company = company;

		if (!company.email) {
			req.session.flash = {
				title: 'Thông báo',
				type: 'warning',
				message: ['Vui lòng cập nhật thông tin công ty'],
			};
			return res.redirect('/companies/my-company');
		}
	} else {
		req.session.user = user;
	}

	res.redirect('/');
}

async function signup(req, res) {
	const user = await UserService.create({
		...req.body,
		role: req.params.role,
		password: await bcrypt.hash(req.body.password, process.env.SALT),
		status: req.params.role === 'company' ? 'pending' : 'active',
	});

	if (req.params.role === 'employer') {
		await CompanyService.create({
			accountId: user._id,
		});
	}

	res.redirect('/auth/sign-in');
}

async function signout(req, res) {
	req.session.destroy();
	res.redirect('/');
}
