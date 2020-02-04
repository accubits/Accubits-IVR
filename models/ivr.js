const Sequelize = require('sequelize')
const sequelize = require('../config/db')
const user = require("./user")
const number = require("./number")

const ivr = sequelize.define('ivr', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  numberId: Sequelize.BIGINT,
  userId: Sequelize.BIGINT,
  selectNo: Sequelize.BIGINT,
  startAt: Sequelize.TIME,
  endAt: Sequelize.TIME,
  orderNo: Sequelize.TINYINT
})

ivr.belongsTo(user, {
  as: "userInfo",
  foreignKey: "userId",
  sourceKey: "id"
});
 
ivr.belongsTo(number, {
  as: "numberInfo",
  foreignKey: "numberId",
  sourceKey: "id"
});

sequelize.sync()
module.exports = ivr
