"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("orders", {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
			name: { type: Sequelize.STRING, allowNull: false },
			codeOrder: { type: Sequelize.STRING, allowNull: false },
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "users", key: "id" },
			},
			created_at: { type: Sequelize.DATE, defaultValue: Date.now() },
			updated_at: { type: Sequelize.DATE, defaultValue: Date.now() },
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("orders");
	},
};
