const { CustomError } = require("../functions");

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
        let detailErr = err.inner.reduce((acc, val) => {
            let str = val.path.split(".");
            str = str[str.length - 1];
            return { ...acc, [str]: val.message };
        }, {});
        req.session.form = req.body;
        return next(new CustomError(detailErr, err.errors, 400, true));
    }
};
