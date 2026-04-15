---
name: Testing Guide
description: Jest integration test patterns, DB setup, and test conventions for this project
type: project
---

## Test Runner

**Jest** — test files must match `*.integration.test.js` (enforced in `jest.config.js`).
Tests run sequentially (`maxWorkers: 1`) to avoid DB conflicts. Timeout: 30s.

## Test Commands

```bash
npm test                        # Run all integration tests with coverage
npm run test:auth               # Run only auth tests
npm run test:users              # Run only user tests
npm run test:chapters           # etc. (chapters, events, sessions, registrations, venues)
npm run test:coverage           # Full coverage report
npm run test:verbose            # Verbose output
```

## Test Database

- DB name: `swachalit_test` (set by `DB_NAME_TEST` env var)
- Same MySQL instance as dev (`127.0.0.1:3306`, root/empty password)
- Test setup/teardown in `tests/setup.js` and `tests/setup-after-env.js`
- Fixtures in `tests/fixtures/`
- Helpers in `tests/helpers/`

## Test File Location

All integration tests live under `tests/integration/[module]/`:
```
tests/integration/auth/       ← auth module tests
tests/integration/users/      ← users module tests
tests/integration/events/     ← etc.
```

## Integration Test Pattern

```js
// tests/integration/auth/login.integration.test.js
const request = require('supertest');
const app = require('../../../src/index');

describe('POST /api/auth/login', () => {
  it('returns JWT token for valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@null.community', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.code).toBe('USRS0001');
    expect(res.body.result).toHaveProperty('token');
  });

  it('returns 401 for invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@null.community', password: 'wrong' });

    expect(res.status).toBe(401);
    expect(res.body.code).not.toBe('SUCCESS');
  });
});
```

## Coverage Thresholds (from jest.config.js)

Coverage is collected from `src/**/*.js` excluding `src/**/docs/**` and `src/swagger/**`.
No explicit threshold enforced — coverage report is generated for reference.

## Dev DB Test Credentials

All dev DB users have password `password123`. JWT tokens expire in 24h.
See full credential table in `api-patterns.md`.
