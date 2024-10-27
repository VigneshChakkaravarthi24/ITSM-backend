const { Sequelize } = require('sequelize');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const db = process.env.DB;
const userName = process.env.SQLUSER;
const password = process.env.SQLPASSWORD;
const host = process.env.SQLHOST;
const port = process.env.SQLPORT; // Add this line to get the port

const sequelize = new Sequelize(db, userName, password, {
  host: host,
  port: port, // Use the separate port variable here
  dialect: 'mysql', 
  logging: console.log, // Optional: log SQL queries to the console
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
