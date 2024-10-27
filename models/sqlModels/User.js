const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../util/sqldatabase");

const User = sequelize.define('users', {
  UserID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  UserName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  UserEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  PhoneNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  DateCreated: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = User;
