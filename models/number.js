const Sequelize = require('sequelize')
const sequelize = require('../config/db')

const number = sequelize.define('number', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  phoneNo: Sequelize.STRING,
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  recording: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  voiceMail: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  ivr: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  ivrMessage: Sequelize.TEXT,
  welcomeMessage: Sequelize.TEXT,
})
sequelize.sync()
module.exports = number