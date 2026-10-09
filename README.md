# Tarefas + Projetos (NestJS + React)

## Backend (porta 3000)
```bash
cd backend
npm install
npm run start:dev
```

## Frontend (opção A: sem Docker, porta 5173)
```bash
cd frontend
npm install
npm run dev
```
Abra http://localhost:5173 (o Vite encaminha /api para o backend em :3000).

## Frontend (opção B: Docker)
```bash
docker compose up --build
```
Abra http://localhost:5173.

Telas: aba **Tarefas** (com seleção opcional de projeto) e aba **Projetos** (CRUD completo).
Os dados ficam em memória e somem ao reiniciar o backend.
