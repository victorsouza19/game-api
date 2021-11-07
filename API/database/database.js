const Sequelize = require('sequelize');

const connection = new Sequelize(
  'gameapi', //database name
  'root', // database user
  'admin', // database password
  {
  host: 'localhost', // host 
  dialect: 'mysql' // tipo de linguagem do banco de dados
  });

module.exports = connection;