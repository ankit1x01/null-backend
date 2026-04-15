# Rule: Code Style (Plain JavaScript)

These conventions apply to all `.js` files in `src/`. No TypeScript.

---

## Module System

**CommonJS only.** No ESM `import`/`export`.

```js
// RIGHT
const express = require('express');
const { User } = require('../../shared/models');
module.exports = { login, register };

// WRONG — ESM, not supported
import express from 'express';
export const login = () => {};
```

---

## Naming Conventions

```js
// Variables and functions: camelCase
const userEmail = req.body.email;
async function getUserById(id) {}

// Constants: SCREAMING_SNAKE_CASE
const MAX_LOGIN_ATTEMPTS = 5;
const JWT_EXPIRY = '24h';

// Files: kebab-case or dot-separated
// chapter-leads.js, auth.middleware.js, response.middleware.js

// Boolean variables: is/has/can prefix
const isActive = user.is_active;
const hasAdminRole = req.user.role === 'admin';

// Event handlers / callbacks: handle prefix
function handleLoginError(error) {}
```

---

## Database: snake_case vs camelCase

Sequelize models use `underscored: true` — DB columns are `snake_case`, JS properties are `camelCase`:

```js
// In JS code (camelCase)
const user = await User.findOne({ where: { id } });
console.log(user.createdAt);   // ← maps to created_at in DB
console.log(user.chapterId);   // ← maps to chapter_id in DB

// In raw queries only (snake_case)
await sequelize.query('SELECT chapter_id FROM users WHERE id = :id', {
  replacements: { id },
  type: QueryTypes.SELECT
});
```

---

## Async/Await

Always use `async/await` — never raw `.then()` chains in new code.

```js
// RIGHT
async function getUser(id) {
  const user = await User.findOne({ where: { id } });
  if (!user) throw new Error(JSON.stringify({ statusCode: 404, code: 'USR0010', message: 'User not found' }));
  return user;
}

// WRONG — callback style
User.findOne({ where: { id } }).then(user => {
  if (!user) throw ...
});
```

---

## Error Handling

Structured errors are JSON-stringified Error objects:

```js
// Throwing a structured error
throw new Error(JSON.stringify({
  statusCode: 400,
  code: 'AUTH0010',
  message: 'Invalid email format'
}));

// Catching and re-throwing unexpected errors
catch (error) {
  if (error instanceof Error && error.message.startsWith('{')) {
    throw error;  // already structured
  }
  throw new Error(JSON.stringify(sharedConstants.serverError));  // wrap unexpected
}
```

---

## Comments

Add comments only where logic is non-obvious. JSDoc on exported functions is encouraged but not required for internal helpers.

```js
/**
 * Finds an active user by email, throws if not found.
 * @param {string} email
 * @returns {Promise<User>}
 */
async function findActiveUserByEmail(email) { ... }
```

---

## Forbidden Patterns

```js
// NEVER — synchronous DB/file operations in route handlers
const data = fs.readFileSync('./config.json');  // use fs.promises

// NEVER — console.log in production paths without log level
console.log(password);  // leaks sensitive data

// NEVER — process.exit in request handlers
app.get('/test', (req, res) => { process.exit(1); });  // kills the server

// NEVER — catching and ignoring errors silently
try { await riskyOp(); } catch (e) {}  // must at least log or rethrow
```
