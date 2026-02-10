module.exports = (sequelize, DataTypes) => {
	const Reservation = sequelize.define(
		"reservation",
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
			expiresAt: {
				allowNull: false,
				type: DataTypes.DATE
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
			tableName: "reservations"
		}
	);

	Reservation.associate = models => {
		Reservation.belongsTo(models.drop, {
			foreignKey: "dropId",
			as: "drop"
		});

		Reservation.belongsTo(models.user, {
			foreignKey: "userId",
			as: "user"
		});
	};

	return Reservation;
};
