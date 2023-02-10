const Sequelize = require("sequelize");

class Order extends Sequelize.Model {
	static init(sequelize) {
		super.init(
			{
				name: {
					type: Sequelize.STRING,
					defaultValue: "",
					validate: {
						len: {
							args: [1, 255],
							msg: "Name: O nome é obrigatório!",
						},
					},
				},
				codeOrder: {
					type: Sequelize.STRING,
					defaultValue: "",
					validate: {
						len: {
							args: [1, 255],
							msg: "CodeOrder: É necessário o código da encomenda válido",
						},
					},
				},
				userId: {
					type: Sequelize.INTEGER,
					defaultValue: "",
					validate: {
						len: {
							args: [1, 255],
							msg: "Algum error aconteceu no nosso site. Tente novamente!",
						},
					},
				},
			},
			{ sequelize }
		);

		return this;
	}
}

module.exports = Order;
