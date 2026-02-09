const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const config = require("../../config/database");

const basename = path.basename(module.filename);
const models = {};
const sequelize = new Sequelize(config);

fs.readdirSync(__dirname)
	.filter(
		file =>
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
	)
	.forEach(file => {
		const model = require(path.join(__dirname, file))(sequelize, DataTypes);
		models[model.name] = model;
	});

Object.keys(models).forEach(modelName => {
	if (models[modelName].associate) {
		models[modelName].associate(models);
	}
});

models.sequelize = sequelize;

module.exports = models;
