const { SkillService } = require('../services');
const { proxy } = require('../helpers/functions');

let skills;

module.exports = proxy({
	gets,
	getAll,
	create,
	update,
	remove,
	skills,
});

async function gets(req, _, next) {
	const skills = await SkillService.getMany({});

	req.skills = skills;

	next();
}

async function getAll(req, _, next) {
	if (!skills) {
		skills = await SkillService.getMany({});
	}

	req.skills = skills;

	next();
}

async function create(req, res) {
	const payload = req.body;

	await SkillService.create(payload);

	req.session.flash = {
		type: 'success',
		messages: 'Thêm thành công',
	};

	res.redirect(req.get('referer'));
}

async function update(req, res) {
	const id = req.params.id;
	const payload = req.body;

	await SkillService.update({ _id: id }, payload);

	req.session.flash = {
		type: 'success',
		messages: 'Sửa thành công',
	};

	res.redirect(req.get('referer'));
}

async function remove(req, res) {
	const id = req.params.id;

	await SkillService.remove({ _id: id }, false);

	req.session.flash = {
		type: 'success',
		messages: 'Xóa thành công',
	};

	res.redirect(req.get('referer'));
}
