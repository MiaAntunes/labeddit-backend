# labeddit-backend

Foi criada uma API voltada para a administração da plataforma de mídia social LabeEddit, com a intenção de aderir ao paradigma de Programação Orientada a Objetos (POO). Essa API permite a criação de perfis de usuários, visualização das postagens de outros usuários, elaboração e modificação de nossas próprias postagens, além da capacidade de expressar apreço ou desagrado por meio de curtidas e descurtidas.

[Link para o Postman](https://documenter.getpostman.com/view/27670051/2s9YC7Sre4)

## Lista de requisitos

- [x]  Get all post
- [x]  Get idPost
- [x]  Create user - Sign Up
- [x]  Create user - Login
- [x]  Create post
- [x]  Create comment
- [x]  Delete post by id
- [x]  Add edit Like or Deslike post
- [x]  Add edit Like or Deslike comment
<br/>
<br/>

## Essa API de E-commerce contém as seguintes funcionalidades:

- User:
    - Login
    - Sign Up
    
- Post:
    - Consultar a listagem total (obrigatório o token)
    - Consultar uma postagem por id (obrigatório o token)
    - Criar (obrigatório o token)
    - Deletar (obrigatório o token)

- Comment:
    - Criar (obrigatório o token)
    - Deletar (obrigatório o token)
    - Adicionar o like ou deslike e remover-los (obrigatório o token)

- Like or deslike Post:
    - Adicionar o like ou deslike e remover-los (obrigatório o token)
<br/>
<br/>


## Instalação

Você irá precisar ter instalado:
   - Vscode
   - Git
   - Extensão MySql no Vscode
   - Postman

```bash
1. Baixe ou clone o repositório em seu computador.

2. Abra a pasta do repositório no terminal do Git e execute o seguinte comando para instalar as dependências do projeto:
$ npm install 

3. Ainda no terminal do git abra o Visual Studio Code (Vscode) com o seguinte comando, e por favor não feche esse terminal:
$ code .

4. Abre a extensão Mysql, coloque a opção SQLlite e conecte com o arquivo labook.db

5. Refatore o nome do arquivo, tire o final .example do arquivo .env.example

6. No terminal git que está aberto, digite o seguinte comando para iniciar o servidor em modo de desenvolvimento:
$ npm run dev

4. Em seguida, abra o aplicativo Postman e insira o link da API no topo da interface.

5. Com o servidor sendo executado na porta 3003, você poderá utilizar a API livremente para interagir com o projeto.

```
<br/>
<br/>

## Tecnologias Utilizadas

- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- Postman
- Git
- Jest
- ZOD
- Dotenv

## Etiquetas

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
