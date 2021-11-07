const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(
  process.env.DATABASE, //database name
  process.env.USER, // database user
  process.env.PASSWORD, // database password
  {
  host: process.env.HOST, // host 
  dialect: process.env.DB_DIALECT // tipo de linguagem do banco de dados
  });

module.exports = connection;