# Rule: Security (Express.js / MySQL / JWT)

Security rules apply to every file. These are requirements, not suggestions.

---

## Authentication

Every route accessing user data or performing mutations must use `verifyToken`:

```js
const { verifyToken, isAdmin } = require('../../shared/middlewares').auth;

// Any logged-in user
router.get('/profile', verifyToken, controller.getProfile);

// Admin-only
router.post('/admin-action', isAdmin, controller.adminAction);
```

After `verifyToken`, `req.user` contains the decoded JWT payload (`id`, `email`, `role`).

**Never trust the client** to identify the user. `req.user` always comes from the verified JWT, never from `req.body.userId` or `req.query.userId`.

---

## Authorization

Authentication (who you are) ≠ Authorization (what you can do). Both checks are required for user-specific resources:

```js
// After verifyToken, check ownership
const item = await services.getById(id);
if (!item) throw new Error(JSON.stringify({ statusCode: 404, code: 'FEAT0010', message: 'Not found' }));

// Does this user own this item (or is admin)?
if (item.userId !== req.user.id && req.user.role !== 'admin') {
  throw new Error(JSON.stringify({ statusCode: 403, code: 'AUTH0006', message: 'Access denied' }));
}
```

---

## Input Validation

All input from `req.body`, `req.query`, and `req.params` must go through the module's validator before use in services or DB queries:

```js
// In controller.js
const validated = validators.createEvent(req);  // throws 400 on invalid
const result = await services.createEvent(validated);
```

Never pass `req.body` directly to Sequelize `create()` or `update()` — always use an explicit, validated object.

---

## SQL Injection Prevention

**No string concatenation in queries.** Use Sequelize ORM methods or parameterized queries:

```js
// WRONG — SQL injection via template literal
await sequelize.query(`SELECT * FROM users WHERE email = '${email}'`);

// RIGHT — parameterized
await sequelize.query('SELECT * FROM users WHERE email = :email', {
  replacements: { email },
  type: QueryTypes.SELECT
});

// BEST — Sequelize ORM (always safe)
await User.findOne({ where: { email } });
```

---

## Secrets

No credentials or JWT secrets in source code:

```js
// WRONG
const secret = 'hardcoded-secret';

// RIGHT
const secret = process.env.JWT_SECRET;
```

All required env vars are documented in `.env.example`. Never commit `.env`.

---

## Response Safety

Never expose internal details in error responses:

```js
// WRONG — exposes stack trace and DB internals
res.status(500).json({ error: err.message, stack: err.stack });

// RIGHT — structured, safe error via response middleware
next(new Error(JSON.stringify(sharedConstants.serverError)));
```

When returning user data, explicitly select only needed fields:

```js
// WRONG — may expose passwordHash, tokens
const user = await User.findOne({ where: { id } });
return next({ result: user });

// RIGHT — explicit field selection
const user = await User.findOne({
  where: { id },
  attributes: ['id', 'email', 'name', 'role', 'created_at']
});
```

---

## Rate Limiting

The global rate limiter (`src/shared/middlewares/rateLimiter.middleware.js`) applies to all routes.
- Localhost: 1000 req/min (development-friendly)
- Default: 10 req/min per IP

Auth-sensitive endpoints (login, password reset) should have extra validation like account lockout after N failed attempts.

---

## Dependency Security

Before any significant change:
```bash
npm audit --audit-level=high
```

Zero tolerance for high or critical vulnerabilities in production dependencies.
