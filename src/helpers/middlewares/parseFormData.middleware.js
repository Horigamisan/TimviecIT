const formidable = require('formidable');

module.exports = (req, _, next) => {
	const form = formidable({ maxFileSize: 200 * 1024 * 1024, multiples: true });

	form.parse(req, (err, fields, files) => {
		if (err) return next(err);

		req.body = { ...fields, ...files };
		next();
	});
};
