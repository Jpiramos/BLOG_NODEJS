const Sequelize=require("sequelize");
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const connection = new Sequelize(process.env.db_name,process.env.db_user,process.env.db_password,{
    host:process.env.db_host,
    dialect:"mysql",
    timezone:"-03:00"
});

module.exports = connection;