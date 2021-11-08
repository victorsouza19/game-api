
  # Documentação - Game-API
*Esta API foi criada com o intuito de aplicar os conceitos da arquitetura REST, trabalhando também a autenticação com JWT e consumo de API. Basicamente, com a API de Games é possível fazer o CRUD completo dos games cadastrados e novos.*

## Endpoints
<details>
<summary> <strong>GET</strong> <code>/games</code></summary>
<br>
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados.

+ #### Parâmetros
  
  Nenhum

+ #### Respostas
  - #### 200 - OK!
    Caso essa resposta aconteça, você receberá a listagem de todos os games.

    Exemplo de resposta:
    ```
    [
        {
            "id": 4,
            "title": "Rocket League",
            "year": 2014,
            "price": 10,
            "createdAt": "2021-11-07T00:30:54.000Z",
            "updatedAt": "2021-11-07T00:30:54.000Z"
        },
        {
            "id": 5,
            "title": "Grand Theft Auto V",
            "year": 2014,
            "price": 120,
            "createdAt": "2021-11-07T00:31:25.000Z",
            "updatedAt": "2021-11-07T00:31:25.000Z"
        },
        {
            "id": 6,
            "title": "Minecraft",
            "year": 2010,
            "price": 49,
            "createdAt": "2021-11-07T00:31:38.000Z",
            "updatedAt": "2021-11-07T00:31:38.000Z"
        }
    ]
    ```

  - #### 401 - Falha na autenticação! 
    Caso essa resposta aconteça, significa que ocorreu alguma falha durante o processo de autenticação da requisição.
    **Motivos:** Token inválido, Token expirado.

    Exemplo de resposta:
    ```
    {
        "err": "Token inválido!"
    }
    ```
   - #### 500 - Erro Interno! 
     Caso essa resposta aconteça, significa que ocorreu alguma falha durante o processo de busca no banco de dados.
     **Motivos:** Problemas na query, problemas com o banco de dados.
     Exemplo de resposta:
     ```
     <!DOCTYPE html>
     <html lang="en">
      <head>
       <meta charset="utf-8">
       <title>Error</title>
     </head>
     <body>
       <pre>ReferenceError: ...
     ```
</details>
       
<details>
<summary><strong>POST</strong> <code>/auth</code> </summary>
<br>
Esse endpoint é responsável por fazer a autenticação do usuário na API e retornar o token de autenticação ao usuário.

+ #### Parâmetros

  **email:** e-mail do usuário cadastrado.

  **password:** senha do usuário cadastrado.

  Exemplo:
  ```
  { 
      "email": "johndoe@email.com",
      "password": 123456
  }
  ```

+ #### Respostas
  + #### OK! 200
    Caso essa resposta aconteça, você receberá o token de autenticação vinculado ao usuário informado na requisição, com esse token você poderá acessar os endpoints protegidos da API.

    Exemplo de resposta:
    ```
    {
        "token": "iBHJUHguyjFGJv6XVCJ9.abcdpZCI6MiwiZW1haWwiOiJhbmFAZW1haUGgcvjgVGfg2jrfuyjR5U76VBJHfur34LCJleH5MTh9"
    }
    ```

  + #### Falha na autenticação! 401
    Caso essa resposta aconteça, significa que ocorreu alguma falha durante o processo de autenticação da requisição.
    **Motivos:** E-mail ou senha incorretos.

    Exemplo de resposta:
    ```
    {
        "err": "E-mail ou senha incorretos!"
    }
    ```

  + #### Erro Interno! 500
    Caso essa resposta aconteça, significa que ocorreu alguma falha durante o processo de busca no banco de dados ou na assinatura do token.
    **Motivos:** Problemas na query, problemas com o banco de dados, problemas na assinatura do token JWT.

    Exemplo de resposta - Banco de dados:
    ```
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="utf-8">
      <title>Error</title>
    </head>
    <body>
      <pre>ReferenceError: ...
    ```

    Exemplo de resposta - Assinatura JWT:
    ```
    {
      err: "Ocorreu um erro interno"
    }
    ```
</details>
      
<details>
<summary><strong>GET</strong> <code>/game/:id</code> :construction:</summary>
</details>
      
<details>
<summary><strong>POST</strong> <code>/game</code> :construction:</summary>
</details>
      
<details>
<summary><strong>PUT</strong> <code>/game/:id</code> :construction:</summary>
</details>
      
<details>
<summary><strong>DELETE</strong> <code>/game/:id</code> :construction:</summary>
</details>
       
<details>
<summary><strong>POST</strong> <code>/users</code> :construction:</summary>
</details>
      

