# Memory Index

Auto-loaded at the start of every Claude Code session.
Each entry is a one-line pointer to a memory file. Keep entries under 150 chars.

---

## Project

- [Stack & Purpose](project-context.md) — Node.js/Express, MySQL/Sequelize, JWT, plain JS; null Community Platform backend
- [API Patterns](api-patterns.md) — Response envelope `{code,message,result}`, controller→next(), auth middlewares, test creds
- [Active Decisions](active-decisions.md) — Recent architecture and design choices not yet in code

## Conventions

- [Coding Preferences](coding-preferences.md) — CommonJS, module structure, error codes, snake_case DB / camelCase JS
- [Things to Avoid](avoid.md) — No TypeScript, no Prisma, no res.json() in controllers, test file naming
- [Testing Guide](testing.md) — Jest integration tests, swachalit_test DB, *.integration.test.js naming

## Feedback

- [Claude Behavior](claude-feedback.md) — Read before editing, minimal changes, confirm before touching models/.env
