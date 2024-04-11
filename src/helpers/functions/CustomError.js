class CustomError extends Error {
	constructor(message, statusCode, isFormError = false) {
		super();

		this.message = message;
		this.statusCode = statusCode;
		this.isFormError = isFormError;
	}
}

module.exports = CustomError;
