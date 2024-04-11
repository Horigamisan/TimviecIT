const { PositionService } = require('../services');
const { proxy } = require('../helpers/functions');

module.exports = proxy({
	getAll,
	create,
	update,
	remove,
});

async function getAll(req, _, next) {
	const positions = await PositionService.getMany({});

	req.positions = positions;

	next();
}

async function create(req, res) {
	const payload = req.body;

	await PositionService.create(payload);

	req.session.flash = {
		type: 'success',
		messages: 'Thêm thành công',
	};

	res.redirect(req.get('referer'));
}

async function update(req, res) {
	const id = req.params.id;
	const payload = req.body;

	await PositionService.update({ _id: id }, payload);

	req.session.flash = {
		type: 'success',
		messages: 'Sửa thành công',
	};

	res.redirect(req.get('referer'));
}

async function remove(req, res) {
	const id = req.params.id;

	await PositionService.remove({ _id: id }, false);

	req.session.flash = {
		type: 'success',
		messages: 'Xóa thành công',
	};

	res.redirect(req.get('referer'));
}
