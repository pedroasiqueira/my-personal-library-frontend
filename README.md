# My Personal Library

## Como executar o projeto

O projeto pode ser facilmente executado usando Docker. Siga os passos abaixo:

1. Clone o repositório
   ```bash
   git clone <url_do_repositório>
   cd my-personal-library-frontend
   ```

2. Execute com Docker Compose
   ```bash
   docker-compose up
   ```

3. Acesse o aplicativo no navegador
   ```
   http://localhost:3001
   ```

## Funcionalidades

Esta aplicação é uma biblioteca pessoal digital que permite aos usuários:

- **Gerenciamento de livros**: Adicionar, visualizar, editar e excluir livros da sua coleção pessoal
- **Comentários**: Adicionar, editar e excluir comentários sobre os livros
- **Status de leitura**: Marcar livros como "lido", "lendo" ou "quero ler"
- **Avaliação**: Dar notas para os livros que você já leu
- **Datas de leitura**: Registrar quando você começou e terminou de ler cada livro
- **Integração com Google Books**: Buscar informações de livros diretamente da API do Google Books
- **Exportação para PDF**: Gerar uma lista em PDF dos seus livros

## Tecnologias utilizadas

- React.js
- Tailwind CSS
- Docker
- HTML/CSS/JavaScript

## Autenticação

A aplicação possui um sistema de autenticação para proteger os dados dos usuários:
- Tela de login
- Registro de novos usuários
- Rotas protegidas que exigem autenticação

---

Este projeto foi desenvolvido como parte de um processo seletivo, demonstrando habilidades em desenvolvimento frontend com React e integração com APIs.
