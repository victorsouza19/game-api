const express = require("express");
const app = express();
const cors = require("cors");
const Game = require("./database/Games");
const User = require("./database/Users");
const connection = require("./database/database");

app.use(cors());

// configurando o parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// database connect
connection
  .authenticate()
  .then(() => {
    console.log("Database connected!");
  })
  .catch(err => { 
    console.log(err);
});

// rota de listagem dos games
app.get("/games", (req, res) => {

  Game.findAll({raw: true}).then(games => {
    res.statusCode = 200;
    res.json(games);

  }).catch(err =>{
    res.sendStatus(500);
    console.log(err);
  })
    
});

// rota de listagem de UM game
app.get("/game/:id", (req, res) => {

  
  if(isNaN(req.params.id)){ // se o id não for número
    res.sendStatus(400);

  }else{ // senão
    let id = parseInt(req.params.id); 

    Game.findOne({where: {id: id}}).then(game => {

      if(game != undefined){ // se o game for encontrado
        res.statusCode = 200;
        res.json(game);
  
      }else{ // se não
        res.sendStatus(404);
  
      }

    }).catch(err => {
      res.sendStatus(500);
      console.log(err);
    })
  }
});

// rota de cadastro de game 
app.post("/game", (req, res) => {
  let { title, year, price } = req.body;

  // se o titulo for nulo ou vazio || ano ou preço não forem números
  if(title == null || title == '' || isNaN(year) || isNaN(price)){
    res.sendStatus(400);

  }else{ // senão

    Game.create({ 

      title: title,
      year: year, 
      price: price 

    }).then(result => {
        res.sendStatus(200);

      }).catch(err => {
        res.sendStatus(500);
        console.log(err);

    });
  }
});

// rota de delete de game
app.delete("/game/:id", (req, res) => {

  if(isNaN(req.params.id)){ // se o id não for número
    res.sendStatus(400);

  }else{ // senão

    let id = parseInt(req.params.id);

    Game.destroy({where: {id: id}}).then(result => {
      if(result == 0){
        res.sendStatus(404);
      }else{
        res.sendStatus(200);
      }
      

    }).catch(err => {
      res.sendStatus(500);
    });
  }
});

// rota de update de game
app.put("/game/:id", (req, res) => {

  if(isNaN(req.params.id)){ // se o id não for número
    res.sendStatus(400);

  }else{ // senão
    let id = parseInt(req.params.id); 
    let { title, year, price } = req.body;


      if(title != undefined){ // se titulo estiver preenchido
        Game.update({
          title: title},{
          where: {
            id: id
          } 
        }).then().catch(err => {
          res.sendStatus(500);
        })
      }

      if(year != undefined){ // se ano estiver preenchido

        if(isNaN(year)){ //se ano não for número
          res.sendStatus(400);

        }else{
          Game.update({
            year: year},{
            where: {
              id: id
            } 
          }).then().catch(err => {
            res.sendStatus(500);
          })
        }
      }

      if(price != undefined){ // se preço estiver preenchido

        if(isNaN(price)){ //se preço não for número
          res.sendStatus(400);

        }else{
          Game.update({
            price: price},{
            where: {
              id: id
            } 
          }).then().catch(err => {
            res.sendStatus(500);
          }) 
        }
      }

      res.sendStatus(200);
  }
});

// rota de cadastro de user
app.post("/user", (req, res) => {
  const { name, email, password } = req.body;

  User.create({name, email, password}).then(result => {
    res.sendStatus(200);

  }).catch(err => {
     res.sendStatus(500);

  });
});

// rota de autenticação
app.post("/auth", (req, res) => {
  const {email, password} = req.body;

  if(email != undefined){

  }else{
    res.status = (400);
    res.json({err: "E-mail ou senha inválidos!"});
  }

}); 

// colocando a API no ar
app.listen(5000, () => {
  console.log("Api is running!");
});