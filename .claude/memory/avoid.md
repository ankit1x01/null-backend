---
name: Things to Avoid
description: Patterns explicitly wrong for this project — never suggest these
type: feedback
---

**Never use TypeScript syntax.** This project is plain JavaScript (CommonJS).
**Why:** There is no TypeScript compiler, tsconfig, or type definitions. TS code will fail at runtime.
**How to apply:** Use `const x = require(...)`, `module.exports = ...`. No `interface`, `type`, `as Type`, generics.

---

**Never use `res.json()` directly in controllers.** Always call `next()`.
**Why:** All responses go through `response.middleware.js` then `encrypt.middleware.js`. Bypassing with `res.json()` skips encryption and breaks response shape consistency.
**How to apply:** `next({ ...constants.messages.SUCCESS, result })` for success. `next(new Error(JSON.stringify({...})))` for errors.

---

**Never use Prisma.** This project uses Sequelize with MySQL.
**Why:** There is no Prisma dependency. All models are in `src/shared/models/` as Sequelize models.
**How to apply:** `const { User } = require('../../shared/models'); await User.findOne({ where: { id } });`

---

**Never create test files as `*.test.js` in `tests/`.** They won't run.
**Why:** `jest.config.js` only matches `*.integration.test.js`. Files without that suffix are ignored.
**How to apply:** Name test files `feature-name.integration.test.js` inside `tests/integration/[module]/`.

---

**Never use Next.js patterns** (App Router, Route Handlers, Server Components, `use client`).
**Why:** This is a standalone Express.js API, not a Next.js app.
**How to apply:** Use Express router, middleware, and controller patterns.

---

**Never import Sequelize models directly in controllers.** Go through the service layer.
**Why:** Controllers should delegate business logic. Direct model access in controllers breaks the layered architecture.
**How to apply:** Put DB queries in `src/modules/[name]/services/`, import services in the controller.

---

**Never hardcode credentials or JWT secrets.**
**Why:** Security. The project uses `.env` for all sensitive config.
**How to apply:** Always use `process.env.JWT_SECRET`, `process.env.DB_PASSWORD`, etc.
