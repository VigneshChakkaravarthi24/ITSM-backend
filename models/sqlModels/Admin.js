const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../util/sqldatabase");

const Admin = sequelize.define('Admin', {
  adminId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  adminName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  adminEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  adminGroup: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateCreated: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'admin',
  timestamps: false
});

module.exports = Admin;
