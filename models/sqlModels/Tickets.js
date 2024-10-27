const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../util/sqldatabase");
const User = require('./User');
const Group = require('./AdminGroups');
const Admin = require('./Admin');

const Ticket = sequelize.define('Ticket', {
  TicketID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  UserID: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'UserID'
    },
    allowNull: false
  },
  Title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  Contact: {
    type: DataTypes.STRING,
    allowNull: true
  },
  TicketStatus: {
    type: DataTypes.STRING,
    allowNull: false
  },
  AssignedGroup: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: 'GroupID'
    },
    allowNull: true
  },
  AssignedToAdmin: {
    type: DataTypes.INTEGER,
    references: {
      model: Admin,
      key: 'AdminID'
    },
    allowNull: true
  },
  DateCreated: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  UpdatedDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    onUpdate: Sequelize.NOW
  }
}, {
  tableName: 'tickets',
  timestamps: false
});

Ticket.belongsTo(User, { foreignKey: 'UserID' });
Ticket.belongsTo(Group, { foreignKey: 'AssignedGroup' });
Ticket.belongsTo(Admin, { foreignKey: 'AssignedToAdmin' });
module.exports = Ticket;
