# Rule: Testing Standards (Jest Integration Tests)

All new features and bug fixes must include integration tests.

---

## Test Stack

| Tool | Purpose |
|------|---------|
| Jest | Test runner and assertions |
| Supertest | HTTP request testing against the Express app |
| MySQL (`swachalit_test`) | Real test database — never mock Sequelize |

---

## File Naming Convention

**Critical:** Jest only picks up files matching `*.integration.test.js` (configured in `jest.config.js`).

```
tests/integration/auth/login.integration.test.js     ✅
tests/integration/users/profile.integration.test.js  ✅
tests/integration/auth/login.test.js                 ❌ won't run
tests/auth.spec.js                                   ❌ won't run
```

---

## Test Structure

```js
const request = require('supertest');
const app = require('../../../src/index');

describe('POST /api/auth/login', () => {
  // Happy path
  it('returns JWT token for valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@null.community', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.code).toBeDefined();
    expect(res.body.result).toHaveProperty('token');
  });

  // Auth failure
  it('returns 401 for wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@null.community', password: 'wrong' });

    expect(res.status).toBe(401);
  });

  // Validation
  it('returns 400 when email is missing', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ password: 'password123' });

    expect(res.status).toBe(400);
  });
});
```

---

## Using Auth Tokens in Tests

```js
// Helper to get a token
async function getToken(email = 'admin@null.community', password = 'password123') {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email, password });
  return res.body.result.token;
}

// Use in authenticated test
it('returns user profile for authenticated user', async () => {
  const token = await getToken('member1@example.com', 'password123');
  const res = await request(app)
    .get('/api/users/me')
    .set('Authorization', `Bearer ${token}`);

  expect(res.status).toBe(200);
});
```

---

## Test Database

- Name: `swachalit_test` (env: `DB_NAME_TEST`)
- Seeded via `tests/setup.js` and `tests/fixtures/`
- Tests run sequentially (`maxWorkers: 1`) — no parallel DB conflicts
- Do **not** mock Sequelize models — use the real test DB

---

## Rules

1. **Every endpoint must be tested** with at minimum: success case, unauthenticated (401), and invalid input (400).
2. **Test admin-only routes** with both admin and non-admin tokens.
3. **No shared mutable state** between tests — use `beforeEach` to reset if needed.
4. **Regression tests** — every bug fix must include a test that would have caught it.
5. **Never skip tests** without a `// TODO: [reason]` comment explaining why.
