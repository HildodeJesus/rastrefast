const Sequelize = require('sequelize')

const env = process.env

const connection = new Sequelize(env.DATABASE, env.USER_DB, env.PASS_DB, {
  dialect: 'mariadb',
  host: env.HOST_DB,
  dialectOption: {
    timezone: '-3:00',
  }
})

module.exports = connection