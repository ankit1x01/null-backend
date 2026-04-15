# Team Conventions

> Decisions made for this project that aren't captured in code.
> Prevents recurring "why did you do it this way?" conversations.

---

## Naming Decisions

| Topic | Decision | Reason |
|-------|----------|--------|
| DB columns vs JS vars | `snake_case` in DB, `camelCase` in JS | Sequelize `underscored: true` handles the mapping |
| Error code format | `MODULE + 4 digits` (AUTH0001, USR0001) | Machine-readable, easy to trace to source module |
| Test files | `*.integration.test.js` only | Jest config enforces this — unit tests not used yet |
| Module structure | controller / routes / services / validators / constants / docs | Consistent scaffolding via `npm run create-module` |

---

## Architecture Decisions

- **No ORM migrations.** Database schema is managed externally (Rails app `swachalit-master` in the parent repo). This Node.js backend is a replacement API layer — Sequelize models reflect existing schema.
- **No BFF layer.** This is the API — clients (web, mobile) call it directly.
- **Response middleware is the contract.** Never send responses directly from controllers — always use `next()`. This ensures encryption middleware and response shaping always run.
- **Sequelize over raw SQL.** Use Sequelize ORM methods for all standard queries. Raw `sequelize.query()` only when Sequelize can't express the query, and always parameterized.
- **SKIP_ENCRYPTION=true in dev.** The encrypt/decrypt middleware exists for production security. In development, it is skipped for simpler testing and debugging.

---

## Testing Conventions

- **Always use the real test DB** (`swachalit_test`) — do not mock Sequelize models
- **Tests run sequentially** (maxWorkers: 1) — never add parallelism without understanding DB state
- **Dev credentials** for manual testing: all users have `password123` — see TESTING_GUIDE.md
- **API test report** in `API_TEST_REPORT.md` — regenerate after fixing endpoint issues

---

## Code Review Etiquette

- `nit:` prefix = non-blocking style comment
- `[blocking]` prefix = must fix before merge
- PR author merges after approval

---

## Deployment Notes

- Dev: `npm run dev` (nodemon, hot reload) on port 3001
- Test: `npm test` (Jest, uses `swachalit_test` DB)
- Production: `npm start` (node, requires `NODE_ENV=production` and all env vars set)
