const catchAsync = require('./catchAsync');

module.exports = (exportedMiddlewares) => {
	return new Proxy(exportedMiddlewares, {
		get: (target, prop) => {
			const functionString = target[prop].toString();
			const hasAsyncSyntax = functionString.startsWith('async');

			if (hasAsyncSyntax) {
				return catchAsync(target[prop]);
			}

			return new Proxy(target[prop], {
				apply: (target, _, args) => {
					const newAsyncMiddleware = target(...args);
					return catchAsync(newAsyncMiddleware);
				},
			});
		},
	});
};
