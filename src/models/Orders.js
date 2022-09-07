const Sequelize = require('sequelize')
const connection = require('../config/db')
const User = require('./Users')

const Order = connection.define('orders', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  codeOrder: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

Order.belongsTo(User)
User.hasMany(Order)

Order.sync({force: false})

module.exports = Order