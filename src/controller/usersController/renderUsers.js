const Order = require("../../repositories/order");

const uRenderHystory = async (req, res) => {
	let user = [];
	if (req.session.user != undefined) {
		user.push(req.session.user);
	} else {
		return res.redirect("/login");
	}

	const historic = await new Order().getAll({
		raw: true,
		where: { userId: req.session.user.id },
	});

	res.render("history", { user, historic: historic[1] });
};

const uRenderCreateUser = async (req, res) => {
	let user = [];
	if (req.session.user != undefined) {
		user.push(req.session.user);
	}

	res.render("newAccount", { user });
};

const uRenderLogin = async (req, res) => {
	let user = [];
	if (req.session.user != undefined) {
		user.push(req.session.user);
	}

	res.render("login", { user });
};

module.exports = {
	uRenderHystory,
	uRenderCreateUser,
	uRenderLogin,
};
