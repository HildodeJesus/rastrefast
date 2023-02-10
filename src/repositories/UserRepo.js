const UserModel = require("../models/UserModel");

class User {
	async createUser(user) {
		await UserModel.create(user);

		return;
	}

	async updateUserById(id, att) {}

	async getUsers(filters) {
		const users = await UserModel.findAll({ ...filters });

		return users.length > 0 ? users : null;
	}

	async getUserById(id) {
		const user = await UserModel.findOne({
			where: { id: id },
			raw: true,
		});

		return user;
	}

	async getUserByEmail(email) {
		const user = await UserModel.findOne({
			where: { email: email },
			raw: true,
		});

		return user;
	}

	async deleteUserById(id) {
		await UserModel.destroy({ where: { id: id } });
		return;
	}
}

module.exports = User;
