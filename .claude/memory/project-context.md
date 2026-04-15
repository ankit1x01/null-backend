---
name: Project Context
description: Core stack, purpose, and architecture of the null Community Platform backend
type: project
---

**Project:** null Community Platform — backend API for a security community (nullcon, null meetups).

**Stack:**
- Runtime: Node.js with Express.js
- Language: Plain JavaScript (no TypeScript)
- Database: MySQL via Sequelize ORM (`new_null` dev DB, `swachalit_test` test DB)
- Auth: JWT (`jsonwebtoken`) — `verifyToken` and `isAdmin` middlewares
- Testing: Jest integration tests (files must match `*.integration.test.js`)
- Docs: Swagger/OpenAPI at `/api-docs`
- Port: 3001 (dev)

**Module structure** — every feature lives in `src/modules/[name]/`:
```
src/modules/auth/
  controller.js   ← handles HTTP, validates, calls service, calls next()
  routes.js       ← Express router, applies middlewares
  services/       ← business logic, DB queries
  validators/     ← input validation functions
  constants/      ← error codes, success messages
  docs/           ← Swagger YAML fragments
```

**Shared layer** (`src/shared/`):
- `models/` — Sequelize model definitions (User, Event, Chapter, etc.)
- `middlewares/` — auth, response, encrypt/decrypt, rateLimiter, upload
- `database/` — Sequelize instance and testConnection()
- `constants/` — shared error codes (serverError, etc.)
- `utils/` — crypto helpers, skip-encryption routes

**Key env vars** (from `.env`):
- `DB_HOST=127.0.0.1`, `DB_NAME=new_null`, `DB_USER=root`, `DB_PASSWORD=` (empty in dev)
- `JWT_SECRET` — for signing tokens, `JWT_EXPIRY=24h`
- `SKIP_ENCRYPTION=true` — disables encrypt/decrypt middleware in dev
- `NODE_ENV=development`

**Why:** Claude Code is a first-class tool for building and testing this API.
Always read existing code before suggesting changes. Never assume Next.js, TypeScript, or Prisma patterns.
