const UserM = require("../models/User");

const bcrypt = require("bcrypt");

class User {
	async saveUser(user, id) {
		try {
			if (id) {
				await UserM.update(user, { where: { id: id } });
				return [true, "Atualizado com sucesso!"];
			} else {
				const newUser = await { ...user };

				const salt = bcrypt.genSaltSync(17);
				newUser.password = bcrypt.hashSync(user.password, salt);

				await UserM.create(newUser);
				return [true, "Criado com sucesso!"];
			}
		} catch (error) {
			return [false, error];
		}
	}

	async getUsers(filters) {
		try {
			const users = await UserM.findAll({ ...filters });
			return [true, users];
		} catch (error) {
			return [false, error];
		}
	}

	async getUserByEmail(email) {
		const user = await UserM.findOne({ where: { email: email }, raw: true });
		if (user != undefined) {
			return [true, user];
		} else {
			return [false, "Usuário inexistente!"];
		}
	}

	async deleteUserById(id) {
		try {
			UserM.destroy({ where: { id: id } });
			return [true, "Usuário deletado com sucesso!"];
		} catch (error) {
			return [false, "Usuário não foi deletado!"];
		}
	}
}

module.exports = User;
