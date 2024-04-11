const { CompanyModel } = require('../models');
const { CompanyService } = require('../services');
const {
	saveFile,
	proxy,
	stringToMeta,
	CustomError,
} = require('../helpers/functions');

module.exports = proxy({
	getAll,
	getTopCompanies,
	get,
	create,
	update,
	remove,
});

async function get(req, _, next) {
	const meta = req.params.meta;

	if (meta === 'my-company') {
		req.company = req.session.company;
		return next();
	}

	const company = await CompanyService.getOne({ meta });
	if (!company) {
		next(new CustomError('Không tìm thấy công ty này', 404));
	}

	req.company = company;
	next();
}

function getTopCompanies(quantity) {
	return async function (req, _, next) {
		const companies = await CompanyService.getTop(
			{},
			quantity,
			'_id name meta logo'
		);

		req.topCompanies = companies || [];

		next();
	};
}

async function getAll(req, _, next) {
	const companies = await CompanyService.getTop(
		{},
		'_id name meta logo locations'
	);
	req.topCompanies = companies;

	next();

	// res.render('company/index', { company })
}

async function create(req, res) {
	const payload = req.body;

	await CompanyService.create(payload);

	req.session.flash = {
		type: 'success',
		messages: 'Thêm thành công',
	};

	res.redirect(req.get('referer'));
}

async function update(req, res) {
	if (req.body.logo.size === 0) {
		delete req.body.logo;
	}

	const id = req.session.company;
	const company = await CompanyModel.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
			logo: req.body.logo && saveFile(req.body.logo),
			meta: stringToMeta(req.body.name),
		},
		{ new: true, lean: true }
	);

	req.session.company = company;

	res.redirect('/companies/my-company');
}

async function remove(req, res) {
	const id = req.params.id;

	await CompanyService.remove({ _id: id }, false);

	req.session.flash = {
		type: 'success',
		messages: 'Xóa thành công',
	};

	res.redirect(req.get('referer'));
}
