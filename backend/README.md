# UserConectar Backend

API backend para gerenciamento de usuários, com funcionalidades de criação, atualização, autenticação e controle de acesso.

---

## Tecnologias utilizadas

- [NestJS](https://nestjs.com/) – Framework Node.js para APIs escaláveis  
- [TypeORM](https://typeorm.io/) – ORM para TypeScript e JavaScript  
- [PostgreSQL](https://www.postgresql.org/) – Banco de dados relacional  
- [Jest](https://jestjs.io/) – Framework de testes  
- [Swagger](https://swagger.io/) – Documentação e interface para APIs REST  
- [Docker](https://www.docker.com/) – Contêiner para facilitar o ambiente  

---

## Pré-requisitos

- Node.js >= 18.x  
- Docker e Docker Compose instalados  
- PostgreSQL (pode ser via container Docker, que é o recomendado no projeto)  

---

## Configuração

1. Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente conforme seu ambiente (exemplo: conexão com o banco).  
2. Se preferir usar Docker para o banco PostgreSQL, utilize o arquivo `docker-compose.yml` fornecido para subir o serviço.  

---

## Comandos úteis

### Instalar dependências
npm install

### Rodar a aplicação em modo desenvolvimento
npm run start:dev

A API ficará disponível em: http://localhost:3000

### Rodar testes unitários
npm run test

### Build da aplicação
npm run build

### Rodar a aplicação em produção
npm run start:prod

### Docker: subir container do PostgreSQL
docker-compose up -d

### Documentação da API
Após subir a aplicação, acesse a interface do Swagger para testar e explorar os endpoints:

http://localhost:3000/api

## Estrutura dos diretórios principais

backend/
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── hash.service.ts
│   │   ├── local.strategy.ts
│   │   └── jwt.strategy.ts
│   ├── common/
│   │   ├── decorators/
│   │   │   └── roles.decorator.ts
│   │   └── guards/
│   │       ├── jwt-auth.guard.ts
│   │       └── roles.guard.ts
│   ├── notifications/
│   │   ├── notifications.controller.ts
│   │   ├── notifications.module.ts
│   │   └── notifications.service.ts
│   ├── users/
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   ├── update-user.dto.ts
│   │   │   └── filter-user.dto.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   ├── users.controller.spec.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.spec.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .env
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── nest-cli.json
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
docker-compose.yml

Projeto desenvolvido por Anderson Tundisi.