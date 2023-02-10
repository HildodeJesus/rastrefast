const bcrypt = require("bcrypt");

const UserRepo = require("../repositories/UserRepo");

const { createCustomError } = require("../error/custom-error");

class UserController {
	registerPage(req, res, next) {
		res.render("register");
	}

	loginPage(req, res, next) {
		res.render("login");
	}

	logout(req, res, next) {
		req.session.destroy(() => res.redirect("back"));
	}

	async register(req, res, next) {
		try {
			const newUser = {
				...req.body,
			};

			await new UserRepo().createUser(newUser);

			req.flash("success", "Conta criada! Acesse-a.");
			req.session.save(() => res.redirect("/login"));
			return;
		} catch (err) {
			next(err);
		}
	}
	// async index(req, res, next) {
	// 	try {
	// 		const users = await new UserRepo().getUsers();

	// 		res.json(users);
	// 	} catch (err) {
	// 		next(err);
	// 	}
	// }
	async deleteUser(req, res, next) {
		try {
			const { id: userId } = req.params;

			const checkUser = await new UserRepo().getUserById(userId);
			if (!checkUser) throw createCustomError("Usuário não existente");

			await new UserRepo().deleteUserById(userId);

			return res.redirect("/");
		} catch (err) {
			next(err);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;

			const checkUser = await new UserRepo().getUserByEmail(email);
			if (!checkUser) throw createCustomError("Usuário não cadastrado!", 400);

			const validatePassword = await bcrypt.compare(
				password,
				checkUser.password
			);
			if (!validatePassword) throw createCustomError("Senha incorreta!", 400);

			req.session.user = {
				id: checkUser.id,
				name: checkUser.name,
				email: checkUser.email,
			};

			return res.redirect("/");
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new UserController();
