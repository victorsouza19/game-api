const jwt = require("jsonwebtoken");
require('dotenv').config();

const auth = (req, res, next) => {

  // buscando o token no header da requisição
  const authToken = req.headers['authorization'];

  if(authToken != undefined){ // se o token tiver sido enviado

    // separando o token em si do tipo de token
    const bearer = authToken.split(' '); 
    const token = bearer[1];

    // verificando se o token é válido
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if(err){ // se não for válido
        res.statusCode = 401;
        res.json({err: "Token inválido!"});
      }else{ // se for válido

        // passando o token e os dados do user na requisição
        req.token = token;
        req.loggedUser = {id: data.id, email: data.email};

        // permitindo que a requisição seja concluida
        next();
      }
    });
    
  }else{ // se token não foi enviado
    res.statusCode = 401;
    res.json({err: "Token inválido!"});
  }
};

module.exports = auth;