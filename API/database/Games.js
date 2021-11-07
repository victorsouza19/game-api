const Sequelize = require("sequelize");
const connection = require("./database");


const Game = connection.define('games', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  } 
});

/* Caso a tabela ainda não tenha sido criada: 
Game.sync({force: false}); */

module.exports = Game;