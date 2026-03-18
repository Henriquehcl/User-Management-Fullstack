# User Management Fullstack (Vue 3 + AdonisJS)

Projeto fullstack profissional para **gerenciamento de usuários**, seguindo **Clean Architecture + DDD**, pronto para **Docker**, **CI/CD (GitHub Actions)** e deploy cloud-native (AWS).

## Stack

### Frontend
- **Vue 3**, **Vite**, **Vuetify**
- **Vue Router**, **Pinia**
- **Axios** (interceptors para JWT)
- **Vitest** (component/store tests)

### Backend
- **AdonisJS** (Node.js) + REST API
- **PostgreSQL** (Lucid + migrations)
- **JWT** (Bearer token) + middleware de proteção
- **Swagger/OpenAPI** em `/docs`
- **Vitest** (unit) + **Japa** (functional/integration)

### Infra/Qualidade
- Docker + Docker Compose
- ESLint + Prettier
- Husky + lint-staged (ativado quando o repo tiver `.git`)
- GitHub Actions (lint, tests, build)

## Funcionalidades

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Users (protegido por JWT)
- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

### Observabilidade
- `GET /health` (inclui status do banco)
- Logging estruturado por request (Pino via logger do Adonis + middleware)

## Arquitetura (Clean + DDD)

O backend segue a separação **Domain / Application / Infrastructure / Interfaces**, com as regras:

- **Domain** não depende de nenhuma outra camada
- **Application** contém os **Use Cases** e contratos (ex.: `PasswordHasher`)
- **Infrastructure** implementa os contratos e integra com Adonis/Lucid/Postgres
- **Interfaces** (controllers/routes/validators) apenas **orquestram** e chamam use cases

Estrutura principal do backend:

- `backend/src/domain` (entities, value-objects, repositories)
- `backend/src/application` (use-cases, services)
- `backend/src/infrastructure` (repositories, services, openapi)
- `backend/src/interfaces` (controllers, routes, validators)
- `backend/src/shared` (errors, middlewares)

Estrutura principal do frontend:

- `frontend/src/pages` (Login/Register/Dashboard/Users CRUD)
- `frontend/src/layouts`
- `frontend/src/services/api` (Axios)
- `frontend/src/store` (Pinia)
- `frontend/src/router`

## Como rodar localmente (sem Docker)

### Backend

1) Configure o Postgres (ou use Docker apenas para o banco) e ajuste `backend/.env`.
2) Rode as migrations:

```bash
cd backend
npm run dev
```

Em outro terminal:

```bash
cd backend
node ace migration:run
```

Backend: `http://localhost:3333`  
Docs: `http://localhost:3333/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

> Para apontar o frontend para outra URL do backend, use `VITE_API_URL`.

## Como rodar com Docker (recomendado)

Na raiz do projeto:

```bash
docker compose up --build
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3333`
- Swagger UI: `http://localhost:3333/docs`

## Testes

### Backend

- **Unit (Vitest)**:

```bash
cd backend
npm test
```

- **Functional/Integration (Japa)**:

```bash
cd backend
npm run test:integration
```

### Frontend (Vitest)

```bash
cd frontend
npm test
```

## Qualidade (Lint/Format)

Na raiz:

```bash
npm run lint
npm run format
```

## Husky + lint-staged

Husky requer repositório git.

```bash
git init
npm run prepare
```

## Deploy na AWS (guia rápido)

O projeto foi preparado para containerização. Caminhos comuns:

- **ECS Fargate**: subir imagens do `backend` e `frontend` no ECR e rodar tasks no ECS.
- **RDS (PostgreSQL)**: banco gerenciado.
- **ALB**: roteamento (ex.: `/` para frontend, `/api` para backend) ou serviços separados.

Recomendações:
- Use **Secrets Manager / SSM Parameter Store** para `APP_KEY`, `JWT_SECRET`, credenciais do banco.
- Habilite logs e métricas (CloudWatch).
- Configure health checks apontando para `GET /health`.

## Endpoints importantes

- **Health**: `GET /health`
- **Docs**: `GET /docs` e `GET /docs/openapi.json`

