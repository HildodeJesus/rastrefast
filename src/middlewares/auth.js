module.exports = (req, res, next) => {
	if (!req.session.user) {
		req.flash("errors", ["Você precisa está logado!"]);
		req.session.save(() => res.redirect("/login"));
		return;
	}

	next();
};
