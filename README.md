# Product Management API

Esta é uma API para gerenciamento de produtos e usuários, permitindo realizar operações CRUD (Create, Read, Update, Delete) em ambas as entidades. O projeto foi desenvolvido utilizando **Nest.js**, **Node.js 18**, **TypeScript**, **MySQL** e **Prisma**, com a infraestrutura gerenciada pelo **Docker Compose**.

A documentação da API está sendo feita pelo Swagger em `http://localhost:3001/api`
## Funcionalidades

- **Gerenciamento de Usuários**:
  - Criar um novo usuário
  - Listar todos os usuários
  - Atualizar informações de um usuário existente
  - Excluir um usuário

- **Gerenciamento de Produtos**:
  - Criar um novo produto
  - Listar todos os produtos
  - Atualizar informações de um produto existente
  - Excluir um produto





## Dependências
- **Node.js** (versão 18 ou superior) ou utilize a versão LTS (*Hydrogen*)
- **Docker** e **Docker Compose**
- **MySQL** (opcional se não for usar o Docker)
- **nvm** (opcional, para gerenciamento de versões do Node.js)
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar a seguinte variável de ambiente no seu .env

`DATABASE_URL="mysql://root:rootpassword@localhost:3306/local_db"`



## Instalação


Clone o repositório.

```bash
  git clone https://github.com/thonycsdev/product-management-api.git
  cd product-management-api
```
Utilize o `nvm` para garantir que está usando a versão LTS (Hydrogen) do Node.js:

```bash
nvm use
```
Instale as dependências com `Yarn`:
```bash
yarn
```
Caso não tenha o yarn instalado, você pode instalá-lo globalmente:
```bash
npm install --global yarn
```

Inicie o servidor de desenvolvimento
```bash
yarn start:dev
```

Execute as migrações do banco de dados:
```bash
yarn migrations:run
```
Popule o banco de dados com dados iniciais (seeds):
```bash
yarn seed:run
```

O servidor vai estar rodando em `http://localhost:3001`


## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  yarn test
```
Atenção ao rodar os testes localmente. Eles irão manipular os dados do banco de dados local.

## Autor

- [@thonycsdev](https://github.com/thonycsdev)

