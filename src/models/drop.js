const { makePaginate } = require("sequelize-cursor-pagination");

module.exports = (sequelize, DataTypes) => {
	const Drop = sequelize.define(
		"drop",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING
			},
			unitPrice: {
				allowNull: false,
				type: DataTypes.DECIMAL(10, 2)
			},
			totalStock: {
				allowNull: false,
				type: DataTypes.INTEGER
			},
			availableStock: {
				allowNull: false,
				type: DataTypes.INTEGER
			},
			reservedStock: {
				allowNull: false,
				type: DataTypes.INTEGER,
				defaultValue: 0
			},
			dropStartAt: {
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
			tableName: "drops"
		}
	);

	Drop.associate = models => {
		Drop.hasMany(models.reservation, {
			foreignKey: "dropId",
			as: "reservations"
		});

		Drop.hasMany(models.purchase, {
			foreignKey: "dropId",
			as: "purchases"
		});
	};

	Drop.paginate = makePaginate(Drop);

	return Drop;
};
