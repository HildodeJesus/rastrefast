const Sequelize = require("sequelize");
const databaseConfig = require("../config/db");
const Order = require("../models/Order");
const User = require("../models/User");

const models = [User, Order];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));

module.exports = connection;
