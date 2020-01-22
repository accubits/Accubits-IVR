const Sequelize = require('sequelize')
const config = require('./connection_strings').local
const database = process.env.DB_NAME || config.database
const username = process.env.DB_USERNAME || config.username
const password = process.env.DB_PASSWORD || config.password
const sequelize = new Sequelize(database, username, password, {
  host: process.env.DB_HOST || config.host,
  dialect: 'mysql',
  pool: {
    max: 1200,
    min: 0,
    idle: 10000,
    acquire : 10000
  },
  logging: process.env.ENV == 'DEV' ? true : false
})
sequelize.sync({
  force: false
})

module.exports = sequelize
