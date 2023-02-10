class CustomError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}

function createCustomError(message, statusCode) {
	return new CustomError(message, statusCode);
}

module.exports = { createCustomError, CustomError };
