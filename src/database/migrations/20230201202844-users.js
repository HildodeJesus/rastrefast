"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("users", {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
			name: { type: Sequelize.STRING, allowNull: false },
			email: { type: Sequelize.STRING, allowNull: false, unique: true },
			password: { type: Sequelize.STRING, allowNull: false },
			created_at: { type: Sequelize.DATE, defaultValue: Date.now() },
			updated_at: { type: Sequelize.DATE, defaultValue: Date.now() },
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("users");
	},
};
