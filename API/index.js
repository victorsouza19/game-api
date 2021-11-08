const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./database/database");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const auth = require("./middleware/auth");
const Game = require("./database/Games");
const User = require("./database/Users");


// dotenv files change
dotenv.config({ path: './.env'});

// using cors to http requests
app.use(cors());

// configuring parser
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

// rota raiz que indicará qual a rota de login do user
app.get("/", (req, res) => {
  let HATEOAS = [
    {
      href: "http://localhost:5000/auth",
      rel: "login",
      body: {
        email: "johndoe@email.com",
        password: "123456"
      }
    }
  ]
  res.statusCode = 200;
  res.json({
    msg: "For use the Game-API, you must be authenticated.",
    _links: HATEOAS
  });

});
// rota de listagem dos games
app.get("/games", auth, (req, res) => {

  Game.findAll({raw: true}).then(games => {
    res.statusCode = 200;
    res.json(games);

  }).catch(err =>{
    res.sendStatus(500);
    console.log(err);
  })
    
});

// rota de listagem de UM game
app.get("/game/:id", auth, (req, res) => {

  if(isNaN(req.params.id)){ // se o id não for número
    res.sendStatus(400);

  }else{ // senão
    let id = parseInt(req.params.id); 

    let HATEOAS = [
      {
        href: `http://localhost:5000/game/${id}`,
        method: "DELETE",
        rel: "delete_game"
      },
      {
        href: `http://localhost:5000/game/${id}`,
        method: "PUT",
        rel: "edit_game",
        params:{
          title: "Game name",
          year: 2011,
          price: 100
        }
      },
      {
        href: `http://localhost:5000/game/${id}`,
        method: "GET",
        rel: "get_game"
      },
      {
        href: `http://localhost:5000/game`,
        method: "POST",
        rel: "new_game",
        params:{
          title: "Game name",
          year: 2011,
          price: 100
        }
      },
      {
        href: `http://localhost:5000/games`,
        method: "GET",
        rel: "get_all_games"
      }
    ];

    Game.findOne({where: {id: id}}).then(game => {

      if(game != undefined){ // se o game for encontrado
        res.statusCode = 200;
        res.json({game, _links: HATEOAS});
  
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
app.post("/game", auth, (req, res) => {
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
        res.sendStatus(201);

      }).catch(err => {
        res.sendStatus(500);
        console.log(err);

    });
  }
});

// rota de delete de game
app.delete("/game/:id", auth, (req, res) => {

  if(isNaN(req.params.id)){ // se o id não for número
    res.sendStatus(400);

  }else{ // senão

    let id = parseInt(req.params.id);

    Game.destroy({where: {id: id}}).then(result => {
      if(result == 0){
        res.sendStatus(404);
      }else{
        res.sendStatus(204);
      }
      

    }).catch(err => {
      res.sendStatus(500);
    });
  }
});

// rota de update de game
app.put("/game/:id", auth, (req, res) => {

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

      res.sendStatus(204);
  }
});

// rota de cadastro de user
app.post("/user", auth, (req, res) => {
  const { name, email, password } = req.body;

  User.create({name, email, password}).then(result => {
    res.sendStatus(201);

  }).catch(err => {
     res.sendStatus(500);

  });
});

// rota de autenticação
app.post("/auth", (req, res) => {
  const {email, password} = req.body;

  if(email != undefined && password != undefined){ // se email e senha forem preenchidos
    User.findOne({where: {email: email}}).then(user => {

      if(user != undefined){ // se usuário for encontrado

        if(user.password == password){ // se senhas coincidirem

          jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: "1h"}, (err, token) => { // gerando token
              if(err){
                res.statusCode = 500;
                res.json({err: "Ocorreu um erro interno"});

              }else{
                let HATEOAS = [
                  {
                    href: `http://localhost:5000/games`,
                    method: "GET",
                    rel: "get_all_games"
                  },
                  {
                    href: `http://localhost:5000/game/:id`,
                    method: "GET",
                    rel: "get_game"
                  },
                  {
                    href: `http://localhost:5000/game`,
                    method: "POST",
                    rel: "new_game",
                    params:{
                      title: "Game name",
                      year: 2011,
                      price: 100
                    }
                  },
                  {
                    href: `http://localhost:5000/game/:id`,
                    method: "PUT",
                    rel: "edit_game",
                    params:{
                      title: "Game name",
                      year: 2021,
                      price: 100
                    }
                  },
                  {
                    href: `http://localhost:5000/game/:id`,
                    method: "DELETE",
                    rel: "delete_game"
                  },
                  {
                    href: `http://localhost:5000/user`,
                    method: "POST",
                    rel: "new_user",
                    params:{
                      name: "John Doe",
                      email: "johndoe@email.com",
                      password: "123456"
                    }
                  },
                  {
                    href: `http://localhost:5000/auth`,
                    method: "POST",
                    rel: "login",
                    params:{
                      email: "johndoe@email.com",
                      password: "123456"
                    }
                  }
                ];

                res.statusCode = 200;
                res.json({token, _links: HATEOAS}); //enviando token

              }
          });

        } else{ // se senhas não coincidirem
          res.statusCode = 401;
          res.json({err: "E-mail ou senha incorretos!"});
        }
        
      } else { // se usuário for encontrado
        res.statusCode = 404;
        res.json({err: "E-mail ou senha incorretos!"});
      }

    }).catch(err => { // se ocorrer um problema na consulta
      res.sendStatus(500);
    });

  }else{ // 
    res.statusCode = 400;
    res.json({err: "E-mail ou senha inválidos!"});
  }

}); 

// colocando a API no ar
app.listen(5000, () => {
  console.log("API is running!");
});