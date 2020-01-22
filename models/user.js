const Sequelize = require('sequelize')
const sequelize = require('../config/db')
const bcrypt = require('bcryptjs')

const user = sequelize.define('user', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  guid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  emailId: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  phoneNo: Sequelize.STRING,
  password: Sequelize.TEXT,
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  lastActivity: Sequelize.DATE,
  resetPasswordToken: Sequelize.STRING,
  resetPasswordExpires: Sequelize.DATE,
})

user.hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

user.prototype.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

sequelize.sync()
module.exports = user
