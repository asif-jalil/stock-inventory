"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("purchases", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			dropId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					key: "id",
					model: "drops"
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE"
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					key: "id",
					model: "users"
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE"
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable("purchases");
	}
};
