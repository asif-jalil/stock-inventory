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
			offeringStock: {
				allowNull: false,
				type: DataTypes.INTEGER
			},
			currentStock: {
				allowNull: false,
				type: DataTypes.INTEGER
			},
			reservedStock: {
				allowNull: false,
				type: DataTypes.INTEGER,
				defaultValue: 0
			},
			availableStock: {
				type: DataTypes.VIRTUAL(DataTypes.INTEGER),
				get() {
					const available = this.getDataValue("currentStock");
					const reserved = this.getDataValue("reservedStock");
					return available - reserved;
				}
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
