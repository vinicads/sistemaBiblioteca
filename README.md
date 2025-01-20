
# Sistema de Gerenciamento de Biblioteca

Este projeto é um sistema simples de gerenciamento de uma biblioteca, desenvolvido como parte de um teste técnico. Ele utiliza **NestJS** no backend e **Angular** no frontend para implementar funcionalidades essenciais de cadastro e gerenciamento de livros e autores.

## Requisitos do Sistema

### Parte 1: Backend com NestJS

1. **Configuração Inicial (DI e TypeORM):**
   - Serviço NestJS utilizando Injeção de Dependência para gerenciar dados de livros e autores.
   - Banco de dados implementado com TypeORM e SQLite para armazenamento local.

2. **Modelo de Dados (Relações de Tabela):**
   - Entidades principais: `Author` e `Book`.
     - **Author:** `id`, `name`.
     - **Book:** `id`, `title`, `publicationDate`, relacionado a um `Author`.

3. **WebSocket:**
   - Implementação de uma sala de mensagens com as seguintes funcionalidades:
     - Adição de novos usuários.
     - Envio e recebimento de mensagens em tempo real.

4. **RPA utilizando Playwright:**
   - Automação para preenchimento de formulários.
   - Captura e exibição de dados.

5. **API RESTful:**
   - CRUD para `Author` e `Book`.
   - Rota para listar todos os livros de um autor específico.
   - Rota para atualizar informações de um autor junto com seus livros.

### Parte 2: Frontend com Angular

1. **Componentização:**
   - `AuthorList`: Exibe a lista de todos os autores.
   - `BookList`: Exibe a lista de todos os livros.
   - Cada componente se conecta ao backend para executar operações CRUD.

2. **Interação do Usuário usando RxJS:**
   - Gerenciamento de fluxos de dados e comunicações assíncronas utilizando RxJS.
   - Uso de Signals junto com operadores do RxJS para manipulação e exibição de dados.

3. **Consumo da API RESTful:**
   - Uso do `HttpClientModule` para interagir com a API.
   - Todas as interações com a API são realizadas através de serviços Angular, respeitando a separação de responsabilidades.

### Parte 3: Controle de Versão com Git

1. **Uso de Git:**
   - Inicialização de um repositório Git local para versionamento.
   - Criação de três branches distintas para representar etapas do desenvolvimento:
     - Exemplo: `feature/authors`, `feature/books`, `bugfix/rxjs-integration`.
   - Commits frequentes, documentando mudanças significativas no código.

## Tecnologias Utilizadas

- **Backend:** NestJS, TypeORM, SQLite, WebSocket, Playwright.
- **Frontend:** Angular, RxJS, Signals.
- **Controle de Versão:** Git.

---

## Como Executar

### Backend
1. Navegue até o diretório do backend.
2. Instale as dependências com `npm install`.
3. Execute o servidor com `npm run start`.

### Frontend
1. Navegue até o diretório do frontend.
2. Instale as dependências com `npm install`.
3. Inicie o servidor de desenvolvimento com `ng serve`.

---

## Estrutura do Projeto

- `backend/`: Contém o código do servidor NestJS.
- `frontend/`: Contém o código do cliente Angular.
- `README.md`: Documentação do projeto.

---

## Autor

Este projeto foi desenvolvido como parte de um teste técnico para demonstrar habilidades em desenvolvimento fullstack.
