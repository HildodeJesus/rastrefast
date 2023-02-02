const Sequelize = require("sequelize");

class Order extends Sequelize.Model {
	static init(sequelize) {
		super.init(
			{
				name: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				codeOrder: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				userId: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
			},
			{ sequelize }
		);

		return this;
	}
}

module.exports = Order;
