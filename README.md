# UserConectar

## 📌 Descrição

O **UserConectar** é uma aplicação fullstack para **gestão de usuários** com autenticação, controle de permissões (admin/user), e CRUD de usuários.

O projeto foi desenvolvido utilizando:

- Backend: **NestJS (Node.js + TypeScript)**
- Frontend: **React + TypeScript**
- Banco de Dados: **PostgreSQL**
- Contêineres: **Dockerfile e Docker-Compose**

## 🚀 Funcionalidades

- Autenticação com e-mail e senha
- Criptografia de senha com **bcrypt**
- Controle de papéis: **Admin** e **User**
- Cadastro, edição e exclusão de usuários
- Validação de dados com **class-validator**
- Swagger para documentação de API
- Frontend React com tela de **Login** e **Dashboard**
- Configuração e orquestração de ambiente com **Docker Compose**

## ⚙️ Tecnologias utilizadas

| Camada | Tecnologias |
|------|------|
| Backend | NestJS, TypeScript, TypeORM, PostgreSQL, bcrypt, dotenv |
| Frontend | React, TypeScript, Axios, React Router |
| Infra | Docker, Docker Compose |

---

## 🧱 Estrutura de Pastas

UserConectar/
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── register.dto.ts
│   │   │   ├── auth.controller.spec.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.spec.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── hash.service.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   └── local.strategy.ts
│   │   ├── common/
│   │   │   ├── decorators/
│   │   │   │   └── roles.decorator.ts
│   │   │   └── guards/
│   │   │       ├── jwt-auth.guard.ts
│   │   │       └── roles.guard.ts
│   │   ├── notifications/
│   │   │   ├── notifications.controller.ts
│   │   │   ├── notifications.module.ts
│   │   │   └── notifications.service.ts
│   │   ├── users/
│   │   │   ├── dto/
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   ├── filter-user.dto.ts
│   │   │   │   └── update-user.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts
│   │   │   ├── users.controller.spec.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.module.ts
│   │   │   ├── users.service.spec.ts
│   │   │   └── users.service.ts
│   │   ├── app.controller.spec.ts
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   ├── test/
│   │   ├── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── .prettierrc
│   ├── Dockerfile
│   ├── eslint.config.mjs
│   ├── nest-cli.json
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.build.json
│   └── tsconfig.json
├── frontend/
│   ├── build/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── tsconfig.json
├── node_modules/
├── arduino.txt
├── docker-compose.yml
├── package-lock.json
├── package.json
├── README.md
└── testehash.js

## 🐳 Como subir o projeto (usando Docker Compose)

# Subir os serviços (Banco, Backend e Frontend)
docker-compose up --build
Acesse:

Frontend: http://localhost:3001

Backend API: http://localhost:3000

📝 Variáveis de Ambiente

Backend (.env.development):
ini
Copiar
Editar
DB_HOST=userconecta_postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=userconecta
Frontend (.env):
ini

REACT_APP_API_URL=http://localhost:3000
🖥️ Endpoints principais (API)
POST /users → Criar usuário

GET /users → Listar usuários

GET /users/:id → Buscar usuário por ID

PATCH /users/:id → Atualizar usuário

DELETE /users/:id → Remover usuário

POST /auth/login → Login de usuário

Documentação Swagger:
http://localhost:3000/api

👨‍💻 Contribuições
Pull requests são bem-vindos!
Sugestões, correções e melhorias são muito bem aceitas.

📄 Licença
Projeto com fins acadêmicos, código aberto sob licença MIT.

✅ Projeto desenvolvido por Anderson Tundisi