const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../util/sqldatabase");

const AdminGroup = sequelize.define('AdminGroups', {
  GroupID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  GroupName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  DateCreated: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'admingroups',
  timestamps: false
});

module.exports = AdminGroup;
