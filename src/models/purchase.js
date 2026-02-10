module.exports = (sequelize, DataTypes) => {
	const Purchase = sequelize.define(
		"purchase",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			dropId: {
				allowNull: false,
				type: DataTypes.INTEGER
			},
			userId: {
				allowNull: false,
				type: DataTypes.INTEGER
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE
			}
		},
		{
			tableName: "purchases"
		}
	);

	Purchase.associate = models => {
		Purchase.belongsTo(models.drop, {
			foreignKey: "dropId",
			as: "drop"
		});

		Purchase.belongsTo(models.user, {
			foreignKey: "userId",
			as: "user"
		});
	};

	return Purchase;
};
