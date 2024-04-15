class CustomError extends Error {
	constructor(detailMsg = {}, message, statusCode, isFormError = false) {
		super();

		this.detailMsg = detailMsg;
		this.message = message;
		this.statusCode = statusCode;
		this.isFormError = isFormError;
	}
}

module.exports = CustomError;
