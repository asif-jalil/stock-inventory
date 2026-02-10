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
			unitPrice: {
				allowNull: false,
				type: Sequelize.DECIMAL(10, 2)
			},
			offeringStock: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			currentStock: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			reservedStock: {
				allowNull: false,
				type: Sequelize.INTEGER,
				defaultValue: 0
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
