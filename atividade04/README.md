# Atividade 04 — Autenticação JWT + cookie httpOnly (NestJS)

## Como rodar
```bash
# 1) Postgres + frontend (porta 5173)
docker compose up --build -d

# 2) Backend (porta 3000)
cd backend-final
npm install
npm run migration:run     # cria a tabela "usuarios" (e "tarefas" se ainda não existir)
npm run start:dev
```

> **Atenção:** se o banco da Atividade 03 ainda estiver rodando (mesmo nome de container
> `web2-todo-db`), pare-o antes: `docker rm -f web2-todo-db` (ou `docker compose down` na pasta da 03).
> Se der "port 5432 already in use", há outro Postgres local ocupando a porta.

## Como testar
**Automático** (com a API rodando):
```bash
cd backend-final
npm run test:api
```
Roda 30+ verificações: registro, validação, 401 sem login, login com cookie HttpOnly,
`/auth/me` lendo o `sub`, CRUD de tarefas protegido e logout.

**No navegador:** http://localhost:5173 → sem sessão cai em `/login` → cadastre-se →
lista de tarefas → Sair volta para `/login`.

## O que foi feito
- `users/` — entidade `User` (tabela `usuarios`), `UsersService`, `UsersModule`
- `auth/` — `AuthService` (bcrypt + JWT), `JwtStrategy` (lê o cookie), `JwtAuthGuard`,
  `AuthController` (`register`, `login`, `logout`, `me`), `AuthModule`, `AuthDto`
- `projetos/` — CRUD de projetos (entidade, DTOs, service, controller, module) protegido com `JwtAuthGuard`; tela `/projetos` no frontend
- Migrations `CreateUsers` e `CreateProjetos`, entidade registrada no `data-source.ts`
- `main.ts` com `cookie-parser`; `TarefasController` e `ProjetosController` com `@UseGuards(JwtAuthGuard)`
- Projetos ↔ Tarefas (herdado da Atividade 03): projeto com `cor`; tarefa com `projetoId` (FK, `ON DELETE SET NULL`),
  filtro `GET /api/tarefas?projetoId=1`, validação de projeto inexistente (400); migrations `AddCorToProjetos` e `AddProjetoIdToTarefas`
- Frontend: seletor de cor nos projetos, seletor de projeto e badge nas tarefas
- Correção: `DELETE /tarefas/:id` agora faz `await` no service
