const { makePaginate } = require("sequelize-cursor-pagination");

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"user",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			name: {
				allowNull: true,
				type: DataTypes.STRING(100)
			},
			username: {
				allowNull: false,
				type: DataTypes.STRING(100)
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
			tableName: "users"
		}
	);

	User.associate = models => {
		User.hasOne(models.reservation, {
			foreignKey: "userId",
			as: "reservation"
		});

		User.hasMany(models.purchase, {
			foreignKey: "userId",
			as: "purchases"
		});
	};

	User.paginate = makePaginate(User);

	return User;
};
