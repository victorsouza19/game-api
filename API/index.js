const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

// configurando o parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// banco de dados fake de games
let database = {
  games: [
    {
      id: 1,
      title: 'Grand Theft Auto 5',
      year: 2014,
      price: 120
    },
    {
      id: 2,
      title: 'Control',
      year: 2016,
      price: 79
    },
    {
      id: 3,
      title: 'Minecraft',
      year: 2012,
      price: 99
    },
    {
      id: 4,
      title: 'Fortnite',
      year: 2018,
      price: 0
    },
    {
      id: 5,
      title: 'Call of Duty Modern Warfare',
      year: 2019,
      price: 199
    }
  ],
  users: [
    {
      id: 1,
      name: "Victor",
      email: "victor@email.com",
      password: "123456"
    },
    {
      id: 2,
      name: "Bruna",
      email: "bruna@email.com",
      password: "654321"
    }
  ]
}

// rota de listagem dos games
app.get("/games", (req, res) => {
  res.statusCode = 200;
  res.json(database.games);
});

// rota de listagem de UM game
app.get("/game/:id", (req, res) => {

  
  if(isNaN(req.params.id)){ // se o id não for número
    res.sendStatus(400);

  }else{ // senão
    let id = parseInt(req.params.id); 

    //buscar no array de games o game com id da requisição
    let game = database.games.find(game => game.id == id);


    if(game != undefined){ // se o game for encontrado
      res.statusCode = 200;
      res.json(game);

    }else{ // se não
      res.sendStatus(404);

    }
  }


});

// rota de cadastro de game 
app.post("/game", (req, res) => {
  let { title, year, price } = req.body;

  // se o titulo for nulo ou vazio || ano ou preço não forem números
  if(title == null || title == '' || isNaN(year) || isNaN(price)){
    res.sendStatus(400);

  }else{ // senão

    // pegar tamanho do array para adicionar o id de forma dinâmica considerando que os ids estão sendo inseridos em forma crescente
    let length = parseInt(database.games.length);
    let id = length + 1;

    // cadastrando game
    database.games.push({
      id,
      title,
      year,
      price
    });

    res.sendStatus(200);
  }
});

app.delete("/game/:id", (req, res) => {

  if(isNaN(req.params.id)){ // se o id não for número
    res.sendStatus(400);

  }else{ // senão

    let id = parseInt(req.params.id);

    // buscar no json o item com o id igual ao da requisição
    let index = database.games.findIndex(game => game.id == id);

    
    if(index == -1){ // se o game não for encontrado
      res.sendStatus(404);

    }else{ // senão
      database.games.splice(index, 1); // apagar o game com o id da requisição

      res.sendStatus(200);

    }
  }
});

app.put("/game/:id", (req, res) => {

  if(isNaN(req.params.id)){ // se o id não for número
    res.sendStatus(400);

  }else{ // senão
    let id = parseInt(req.params.id); 

    //buscar no array de games o game com id da requisição
    let game = database.games.find(game => game.id == id);


    if(game != undefined){ // se o game for encontrado

      let { title, year, price } = req.body;

      if(title != undefined){ // se titulo estiver preenchido
        game.title = title;
      }

      if(year != undefined){ // se ano estiver preenchido

        if(isNaN(year)){ //se ano não for número
          res.sendStatus(400);

        }else{
          game.year = year;

        }
      }

      if(price != undefined){ // se preço estiver preenchido

        if(isNaN(price)){ //se preço não for número
          res.sendStatus(400);

        }else{
          game.price = price;
          
        }
      }
      res.sendStatus(200);

    }else{ // se não
      res.sendStatus(404);

    }
  }
});

app.post("/auth", (req, res) => {
  const {email, password} = req.body;

  if(email != undefined){

  }else{
    res.status = (400);
    res.json({err: "E-mail ou senha inválidos!"});
  }

});


app.listen(5000, () => {
  console.log("Api is running!");
});