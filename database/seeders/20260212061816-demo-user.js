"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		return queryInterface.bulkInsert("users", [
			{
				id: 1,
				name: "Demo 1",
				username: "demo1",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: 2,
				name: "Demo 2",
				username: "demo2",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: 3,
				name: "Demo 3",
				username: "demo3",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: 4,
				name: "Demo 4",
				username: "demo4",
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

	async down(queryInterface) {
		return queryInterface.bulkDelete("users", {
			username: ["demo1", "demo2", "demo3", "demo4"]
		});
	}
};
