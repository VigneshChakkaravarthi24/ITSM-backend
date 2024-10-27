// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require("./util/sqldatabase"); // Ensure this path is correct

// Import all models
const User = require("./models/sqlModels/User");
const Admin = require("./models/sqlModels/Admin");
const Group = require("./models/sqlModels/AdminGroups");
const Ticket = require("./models/sqlModels/Tickets");
const Comment = require("./models/sqlModels/Comments");

// Import routes
const userRouter = require("./routes/user");


const app = express();
const PORT = process.env.PORT || 3001;

require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: "*", // Allow all origins; consider narrowing this in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: 'Content-Type, Authorization',
}));

// Routes
app.use("/users", userRouter);


// Define model associations
User.hasMany(Ticket, { foreignKey: 'UserID' });
Ticket.belongsTo(User, { foreignKey: 'UserID' });

Admin.hasMany(Ticket, { foreignKey: 'AssignedToAdmin' });
Ticket.belongsTo(Admin, { foreignKey: 'AssignedToAdmin' });

Group.hasMany(Ticket, { foreignKey: 'AssignedGroup' });
Ticket.belongsTo(Group, { foreignKey: 'AssignedGroup' });

Ticket.hasMany(Comment, { foreignKey: 'TicketID' });
Comment.belongsTo(Ticket, { foreignKey: 'TicketID' });

Admin.hasMany(Comment, { foreignKey: 'AdminID' });
Comment.belongsTo(Admin, { foreignKey: 'AdminID' });

// Sync Sequelize models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
    // Start the server after successful database sync
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });
