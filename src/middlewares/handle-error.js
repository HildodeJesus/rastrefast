const { ValidationError } = require("sequelize");
const { CustomError } = require("../error/custom-error");

module.exports = (err, req, res, next) => {
	if (err instanceof CustomError) {
		req.flash("errors", [err.message]);
		req.session.save(() => res.redirect("back"));
		return;
	}

	if (err instanceof ValidationError) {
		req.flash(
			"errors",
			err.errors.map(error => error.message)
		);
		req.session.save(() => res.redirect("back"));
		return;
	}

	console.log(err);
	return res.render("error", {
		msg: "Algum erro aconteceu, tente novamente!",
		statusCode: 500,
	});
};
