# My Personal Library

Uma estante digital pessoal composta por **frontend React/Tailwind** e **backend NestJS/MongoDB**, ambos containerizados com Docker.

> **Importante**: para que o frontend funcione corretamente, os containers do **backend** e do **MongoDB** precisam estar em execução.

---

## Índice
1. [Repositórios](#repositórios)
2. [Pré‑requisitos](#pré-requisitos)
3. [Guia rápido (tudo via Docker Compose)](#guia-rápido)
4. [Executar projetos individualmente](#executar-projetos-individualmente)
5. [Executar sem Docker](#executar-sem-docker)
6. [Funcionalidades](#funcionalidades)
7. [Tecnologias](#tecnologias)
8. [Principais Endpoints](#principais-endpoints)

---

## Repositórios
| Camada    | URL                                |
|-----------|------------------------------------|
| Frontend  | `https://github.com/pedroasiqueira/my-personal-library-frontend` |
| Backend   | `https://github.com/pedroasiqueira/my-personal-library-backend`  |

---

## Pré‑requisitos
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Guia rápido
Execute **toda a aplicação** em 3 passos (considerando os repositórios clonados lado a lado):
```bash
# 1. Clone ambos os repositórios
$ git clone https://github.com/pedroasiqueira/my-personal-library-backend
$ git clone https://github.com/pedroasiqueira/my-personal-library-frontend

# 2. Suba backend + banco de dados
$ cd my-personal-library-backend
$ docker-compose up -d   # expõe API em http://localhost:3000

# 3. Suba o frontend
$ cd ../my-personal-library-frontend
$ docker-compose up      # abre SPA em http://localhost:3001
```
Pronto! Abra `http://localhost:3001` no navegador, registre‑se e comece a gerenciar seus livros.

---

## Executar projetos individualmente
### Somente o backend
```bash
cd my-personal-library-backend
# Sobe backend + MongoDB
docker-compose up -d
```
A API ficará disponível em `http://localhost:3000`.

### Somente o frontend
> Requer a API rodando em `http://localhost:3000`.
```bash
cd my-personal-library-frontend
docker-compose up
```
A interface estará em `http://localhost:3001`.

---

## Executar sem Docker
Caso prefira executar sem Docker, siga os passos abaixo:

### Backend
```bash
# Instale o MongoDB localmente ou use uma instância remota
# Configure a URL do MongoDB no arquivo .env (MONGO_URI=mongodb://localhost:27017/my-personal-library)

cd my-personal-library-backend
npm install
npm run start:dev 
```

### Frontend
```bash
cd my-personal-library-frontend
npm install
npm start
```

> **Nota**: Certifique-se de que o MongoDB esteja em execução e acessível através da URL configurada no arquivo .env do backend.

---

## Funcionalidades
### Comuns
- **Autenticação JWT** (login/registro).
- **Gerenciamento de livros**: criar, listar, atualizar e excluir.
- **Status de leitura**: "lido", "lendo", "quero ler".
- **Avaliação**: 1–5 estrelas.
- **Comentários**: adicionar/editar/remover.
- **Integração Google Books**: busca de metadados.
- **Exportação para PDF** da estante.
- **Responsividade** (Tailwind).

---

## Tecnologias
| Camada    | Stack principal                           |
|-----------|-------------------------------------------|
| Frontend  | React, Tailwind CSS                       |
| Backend   | NestJS, TypeScript, Mongoose, JWT         |
| DevOps    | Docker, Docker Compose                    |

---

## Principais Endpoints (Backend)
| Método | Rota             | Descrição                          |
|--------|------------------|------------------------------------|
| POST   | `/auth/login`    | Login de usuário                   |
| POST   | `/auth/register` | Registro de usuário                |
| GET    | `/books`         | Listar livros do usuário           |
| POST   | `/books`         | Criar novo livro                   |
| GET    | `/books/:id`     | Detalhes de um livro               |
| PATCH  | `/books/:id`     | Atualizar livro                    |
| DELETE | `/books/:id`     | Remover livro                      |
| GET    | `/google-books`  | Buscar livro na Google Books API   |
| CRUD   | `/comments`      | Gerenciar comentários              |

---