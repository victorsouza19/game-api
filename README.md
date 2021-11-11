# Game API
<br>
<div align="center">
<img style="background: #fff" src="https://user-images.githubusercontent.com/71740612/140661872-95dfc13b-c98e-462b-95a3-ee870fb22663.png" alt="Game-API!">
  
![GitHub language count](https://img.shields.io/github/languages/count/victorsouza19/game-api?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/victorsouza19/game-api?style=for-the-badge)
![Followers](https://img.shields.io/github/followers/victorsouza19?style=for-the-badge)
</div>

![image](https://user-images.githubusercontent.com/71740612/140662178-be873674-054d-40ba-9d55-2e91bfd27935.png)
> Minha primeira API seguindo a arquitetura REST (:

### :construction: Melhorias

Projeto em desenvolvimento, as próximas atualizações serão:

- [x] Adicionar comentários ao código para melhor compreensão.
- [x] Criar o front-end da aplicação para consumo da API.
- [x] Criar um banco de dados real onde a API buscará os dados.
- [x] Implementar o banco de dados real com o Sequelize.
- [x] Criar sistema de autenticação da API
- [x] RESTful com HATEOAS.
- [ ] Implementar melhorias de CSS no front-end


## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* Você instalou a versão mais recente do `node` 
* Você instalou a versão mais recente do `Postman` (opcional, caso não utilize o front-end)


## 🚀 Instalando a Game API

Para instalar a Game API, siga estas etapas:

Fazer o clone do projeto e rodar o comando na pasta ./API :
```
npm install
```
<br>

Alterar o arquivo <code>./API/.envExample</code> com os dados do seu banco :
```
# JWT key:
JWT_SECRET=secretpwd123

# Sequelize(database) configs 
DATABASE=database_name
USER=user
PASSWORD=password
HOST=localhost
DB_DIALECT=mysql
```
<br>

Para criar as tabelas, basta descomentar o seguinte trecho nos arquivos <code>./API/database/(Users.js & Games.js)</code> :
```
/* Arquivo Users.js */
User.sync({force: false});  

/* Arquivo Games.js */
Game.sync({force: false}); 
```

## ☕ Usando a Game API

Iniciar o servidor:

```
node index.js
```

## :books: Documentação

Para visualizar a documentação da API, consulte o arquivo [DOCUMENTAÇÃO](DOCUMENTATION.md).


## 📫 Contribuindo para a Game API

Para contribuir, siga estas etapas:

1. Bifurque este repositório.
2. Crie uma branch com o nome da sua feature: `git checkout -b featurenova`.
3. Faça suas alterações e confirme-as: `git commit -m 'mensagem'`
4. Envie para o branch original: `git push origin featurenova`
5. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 🤝 Colaboradores

<div align="center" >
  <a href="#">
    <img src="https://github.com/victorsouza19.png" width="100px;" alt="Foto do Victor Souza"/><br>
    <sub>
      <b>Victor Souza</b>
    </sub>
  </a>
</div>

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.txt) para mais detalhes.

[⬆ Voltar ao topo](#Game-API)<br>
