# UserConectar - Frontend
Este é o frontend da aplicação UserConectar, um sistema de gestão de usuários com autenticação JWT, rotas protegidas, layout com AppBar e feedback por Snackbar/Toast.

Desenvolvido em React + TypeScript + Material UI, este frontend consome a API do backend Node.js/NestJS.

🚀 Principais Tecnologias Utilizadas
React + TypeScript

Material UI (MUI)

React Router DOM

React Hook Form + Yup (Validação de formulários)

Axios (para requisições HTTP)

Context API (AuthContext e SnackbarContext)

Docker (para deploy com Docker Compose)

📦 Estrutura de Pastas (frontend/)
frontend/
├── src/
│   ├── components/           # AppBar, Layout, SnackbarProvider, etc.
│   ├── context/              # AuthContext e SnackbarContext
│   ├── pages/                # LoginPage, DashboardPage, ProfilePage, EditUserPage, etc.
│   ├── routes/               # ProtectedRoute
│   ├── App.tsx
│   └── main.tsx
├── public/                   # Logo, favicon
├── Dockerfile
├── package.json
└── 

⚙️ Instalação e Execução Local
Acesse a pasta do frontend:


Instale as dependências:
npm install

Inicie o frontend em modo desenvolvimento:
npm start

🐳 Build com Docker
Se quiser rodar dentro de container Docker:

docker build -t userconectar-frontend .
docker run -p 8080:80 userconectar-frontend
Ou suba via docker-compose junto com o backend e o banco:

docker-compose up --build

✅ Funcionalidades do Frontend até agora:
✅ Login com token JWT (armazenado no localStorage)
✅ Dashboard com lista de usuários (rota protegida)
✅ Cadastro de usuário (RegisterPage)
✅ Meu Perfil (edição de nome e senha)
✅ Editar Usuário por ID
✅ Layout com AppBar (Dashboard | Meu Perfil | Sair)
✅ Snackbar global para feedback de ações
✅ Logout funcional
✅ Navegação com React Router


💻 Requisitos para rodar local:
Node.js >= 18.x

npm Docker (se quiser via container)

📞 Contato
Projeto desenvolvido por Anderson Tundisi 