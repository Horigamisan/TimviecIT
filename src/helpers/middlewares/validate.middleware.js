const { CustomError } = require('../functions');

module.exports = (schema) => async (req, _, next) => {
	try {
		await schema.validate(
			{
				body: req.body,
				query: req.query,
				params: req.params,
			},
			{ abortEarly: false }
		);

		next();
	} catch (err) {
		req.session.form = req.body;
		return next(new CustomError(err.errors, 400, true));
	}
};
