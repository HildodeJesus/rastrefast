const Sequelize = require("sequelize");
const databaseConfig = require("../config/db");
const Order = require("../models/OrderModel");
const User = require("../models/UserModel");

const models = [User, Order];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));

module.exports = connection;
