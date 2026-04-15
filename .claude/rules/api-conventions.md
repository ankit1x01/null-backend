# Rule: API Conventions (Express.js)

All API modules follow this structure and pattern. Apply these when writing or reviewing any module.

---

## Module File Structure

```
src/modules/[feature]/
  controller.js        ← HTTP layer: validate, call service, call next()
  routes.js            ← Express Router: mount paths and middlewares
  services/
    index.js           ← re-exports all service functions
    [action].js        ← individual service files (login.js, register.js)
  validators/
    index.js           ← validates req input, throws on failure
  constants/
    index.js           ← success/error codes and messages
  docs/
    [feature].yaml     ← Swagger/OpenAPI fragment
```

---

## Controller Pattern

```js
// controller.js
const services = require('./services');
const validators = require('./validators');
const constants = require('./constants');
const sharedConstants = require('../../shared/constants');

const myAction = async (req, res, next) => {
  try {
    const validated = validators.myAction(req);     // throws on invalid input
    const result = await services.myAction(validated);
    next({ ...constants.messages.SUCCESS_CODE, result });   // pass to response middleware
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('{')) {
      next(error);   // structured error — response middleware handles it
    } else {
      next(new Error(JSON.stringify(sharedConstants.serverError)));  // unexpected error
    }
  }
};

module.exports = { myAction };
```

---

## Routes Pattern

```js
// routes.js
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { verifyToken, isAdmin } = require('../../shared/middlewares').auth;

// Public route
router.get('/list', controller.getList);

// Authenticated route
router.get('/me', verifyToken, controller.getMyItem);

// Admin-only route
router.delete('/:id', isAdmin, controller.deleteItem);

module.exports = router;
```

---

## Response Shape

Every response is standardized by `response.middleware.js`:

### Success
```json
{ "code": "FEAT0001", "message": "Action successful", "result": { ... } }
```

### Error
```json
{ "code": "FEAT0010", "message": "Item not found" }
```

---

## Constants Pattern

```js
// constants/index.js
const messages = {
  SUCCESS: { code: 'FEAT0001', message: 'Operation successful' },
  NOT_FOUND: { code: 'FEAT0010', message: 'Item not found' },
};
module.exports = { messages };
```

Error codes thrown as structured errors:
```js
throw new Error(JSON.stringify({
  statusCode: 404,
  code: 'FEAT0010',
  message: 'Item not found'
}));
```

---

## HTTP Status Codes

| Situation | Status |
|-----------|--------|
| Success | 200 |
| Created | 201 |
| Validation error | 400 |
| Unauthenticated | 401 |
| Forbidden | 403 |
| Not found | 404 |
| Server error | 500 |

---

## Security Checklist (per route)

- [ ] `verifyToken` applied to all authenticated routes
- [ ] `isAdmin` applied to admin-only routes
- [ ] All inputs validated by validator before use
- [ ] No raw SQL string concatenation — use Sequelize ORM or parameterized queries
- [ ] Response never exposes password hashes, JWT secrets, or raw DB errors
- [ ] Error response does not expose stack traces in production
