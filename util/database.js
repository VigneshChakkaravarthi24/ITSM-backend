// const Sequelize=require('sequelize')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// const uri = process.env.MONGODB_URI;
const userName = process.env.USERNAME;
const password = "Garethbale##11";
const db = process.env.DB;
const host=process.env.HOSTSQL;


console.log(userName,password,db,host)
// module.exports = mongoose.connect(uri)

// uri='mongodb+srv://verbatim@wmu-verbatim.f9xrrux.mongodb.net/'

const  Sequelize  =require('@sequelize/core') ;
const  MySqlDialect=require('@sequelize/mysql');

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  server: host,
  port: 3306,
  database: db,
  authentication: {
    type: 'default',
    options: {
      userName: userName,
      password: password,
    },
  },
});
sequelize.authenticate().then((error)=>{
    console.log("Hey connected")
})
module.exports=sequelize;