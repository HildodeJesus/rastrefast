const Sequelize = require("sequelize");

class User extends Sequelize.Model {
	static init(sequelize) {
		super.init(
			{
				name: { type: Sequelize.STRING, allowNull: false },
				email: { type: Sequelize.STRING, allowNull: false },
				password: { type: Sequelize.STRING, allowNull: false },
			},
			{ sequelize }
		);

		return this;
	}
}

module.exports = User;
