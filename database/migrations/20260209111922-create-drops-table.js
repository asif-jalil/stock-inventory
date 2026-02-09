"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("drops", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			price: {
				allowNull: false,
				type: Sequelize.DECIMAL(10, 2)
			},
			totalStock: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			availableStock: {
				allowNull: false,
				type: Sequelize.INTEGER
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
		await queryInterface.dropTable("drops");
	}
};
