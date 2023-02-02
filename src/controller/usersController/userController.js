const Order = require("../../models/Order");
const User = require("../../repositories/user");

const bcrypt = require("bcrypt");

const uCreateUser = async (req, res) => {
	const newUser = {
		...req.body,
	};

	try {
		const userVerification = await new User().getUserByEmail(newUser.email);
		if (userVerification[0]) throw "Usuário já existe!";

		if (newUser.name == "") throw "Nome não escolhido";

		await new User().saveUser(newUser);

		return res.redirect("/login");
	} catch (error) {
		console.log(error);
		return res.redirect("/createAccount");
	}
};

const uGetUsers = async (req, res) => {
	const users = await new User().getUsers();

	if (users[0]) {
		res.json({ result: users[1] });
	} else {
		res.status(500).json({ error: users[1] });
	}
};

const uDeleteUser = async (req, res) => {
	if (req.body.id) {
		const userDeleted = await new User().deleteUserById(req.body.id);
		if (userDeleted[0]) {
			return res.json({ msg: userDeleted[1] });
		} else {
			return res.json({ error: userDeleted[1] });
		}
	} else {
		return res.json({ error: "Não foi deletado" });
	}
};

const uLogin = async (req, res) => {
	let password = await req.body.password;
	let email = await req.body.email;

	try {
		const user = await new User().getUserByEmail(email);
		if (!user[0]) throw "Usuário inexistente";

		const passValidation = await bcrypt.compare(password, user[1].password);
		if (!passValidation) throw "Senha incorreta";

		req.session.user = {
			id: user[1].id,
			name: user[1].name,
			email: user[1].email,
		};

		return res.redirect("/");
	} catch (error) {
		return res.redirect("/login");
	}
};

module.exports = {
	uCreateUser,
	uGetUsers,
	uLogin,
	uDeleteUser,
};
