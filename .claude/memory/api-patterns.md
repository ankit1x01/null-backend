---
name: API Patterns
description: Express route patterns, response envelope format, and error convention used throughout this project
type: project
---

## Response Envelope

All successful responses are shaped by `response.middleware.js`:
```js
{ code: 'SUCCESS', message: 'Operation successful', result: <data> }
// or if controller provides its own code/message:
{ code: 'USRS0001', message: 'Login successful', result: <data> }
```

All error responses:
```js
{ code: 'AUTH0001', message: 'Access denied. No token provided.' }
```

**Controller pattern — always call `next()`, never `res.json()`:**
```js
// Success
next({ ...constants.messages.USRS0001, result });

// Error — throw structured error, caught by response middleware
throw new Error(JSON.stringify({ statusCode: 400, code: 'USR0010', message: 'User not found' }));
```

## Auth Middlewares

Located in `src/shared/middlewares/auth.middleware.js`:
```js
const { verifyToken, isAdmin } = require('../../shared/middlewares').auth;

// Protect route — any logged-in user
router.get('/profile', verifyToken, controller.getProfile);

// Admin-only route
router.delete('/user/:id', isAdmin, controller.deleteUser);
```

After `verifyToken`, the decoded JWT payload is available as `req.user`.

## Rate Limiter

- Localhost: 1000 req/min (effectively unlimited for dev/testing)
- Production IPs on allowlist: 100 req/min
- All others: 10 req/min
- Swagger docs `/api-docs`: 1000 req/min

## Encryption

Controlled by `SKIP_ENCRYPTION=true` in `.env` (dev). When true, responses are plain JSON.
When false, responses are `{ encrypted: "<base64>" }`.

## Module Registration

New modules are added in `src/modules/index.js` and mounted in `src/index.js`:
```js
app.use('/api/my-feature', modules.myFeature);
```

## Test Credentials (dev DB `new_null`)

| Role | Email | Password | User ID |
|------|-------|----------|---------|
| Admin | admin@null.community | password123 | 2 |
| Admin 2 | admin2@null.community | password123 | 1 |
| Chapter Lead (Delhi) | lead.delhi@null.community | password123 | 7 |
| Speaker | speaker1@example.com | password123 | 9 |
| Member | member1@example.com | password123 | 13 |

Login endpoint: `POST http://localhost:3001/api/auth/login`
