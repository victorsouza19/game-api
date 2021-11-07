const Sequelize = require("sequelize");
const connection = require("./database");


const User = connection.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  } 
});

/* Caso a tabela ainda não tenha sido criada: 
User.sync({force: false}); */ 

module.exports = User;