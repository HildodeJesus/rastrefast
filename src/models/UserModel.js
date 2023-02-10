const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Sequelize.Model {
	static init(sequelize) {
		super.init(
			{
				name: {
					type: Sequelize.STRING,
					defaultValue: "",
					validate: {
						len: {
							args: [1, 255],
							msg: "Nome: Deve conter entre 1 e 255 caracteres",
						},
					},
				},
				email: {
					type: Sequelize.STRING,
					defaultValue: "",
					unique: { msg: "Email cadastrado anteriormente! " },
					validate: {
						isEmail: { msg: "E-mail: O email passado é inválido" },
					},
				},
				password: {
					type: Sequelize.STRING,
					defaultValue: "",
					validate: {
						len: {
							args: [6, 255],
							msg: "Password: A Senha deve conter entre 6 e 255 caracteres",
						},
					},
				},
			},
			{ sequelize }
		);

		this.addHook("beforeSave", async user => {
			if (user.password) {
				// Se não funcionar tentar (user.validate())
				user.password = await bcrypt.hash(user.password, 8);
			}
		});

		return this;
	}
}

module.exports = User;
