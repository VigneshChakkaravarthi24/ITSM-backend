// models/Comments.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../util/sqldatabase");

// Import related models
const Ticket = require('./Tickets');  // Make sure this path is correct
const Admin = require('./Admin');     // Make sure this path is correct

// Define the Comments model
const Comment = sequelize.define('Comment', {
  CommentID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  TicketID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Tickets', // Name of the referenced table
      key: 'TicketID'   // Key in the referenced table
    },
    allowNull: false
  },
  AdminID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Admin',   // Name of the referenced table
      key: 'AdminID'    // Key in the referenced table
    },
    allowNull: false
  },
  CommentDateTime: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  },
  Comment: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'comments',
  timestamps: false
});

// Define associations
Comment.belongsTo(Ticket, { foreignKey: 'TicketID' });
Comment.belongsTo(Admin, { foreignKey: 'AdminID' });

// Export the model
module.exports = Comment;
