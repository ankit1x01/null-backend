---
name: Coding Preferences
description: Validated JS patterns for this project — repeat these without asking
type: feedback
---

**Use CommonJS everywhere.** `require()` and `module.exports`.
**Why:** The project has no ESM config. Mixing import/export will break Node.js loading.
**How to apply:** `const x = require('./x'); module.exports = { x };`

---

**Follow the module folder structure.** Every feature gets: `controller.js`, `routes.js`, `services/`, `validators/`, `constants/`, `docs/`.
**Why:** Consistent structure makes the codebase navigable and predictable. The `create-module` script (`npm run create-module`) generates this scaffold.
**How to apply:** When adding a new feature, use the existing module structure as a template.

---

**Error codes follow a naming convention.** Auth: `AUTH000X`, Users: `USR000X`, etc.
**Why:** Consistent machine-readable codes help clients handle errors programmatically.
**How to apply:** Define error codes in `src/modules/[name]/constants/` and reuse `src/shared/constants/` for generic errors.

---

**Database columns are snake_case; JavaScript variables are camelCase.**
**Why:** MySQL/Sequelize uses snake_case (`created_at`, `chapter_id`). JS code uses camelCase. Sequelize's `underscored: true` config handles the mapping.
**How to apply:** Write `user.createdAt` in JS, `created_at` in raw queries. Never mix conventions in the same context.

---

**Validators throw structured errors, not return booleans.**
**Why:** Consistent error flow — validators throw `Error(JSON.stringify({...}))` and controllers let it propagate to response middleware.
**How to apply:**
```js
// In validators/login.js
function validateLogin(req) {
  if (!req.body.email) {
    throw new Error(JSON.stringify({ statusCode: 400, code: 'AUTH0010', message: 'Email is required' }));
  }
  return { email: req.body.email, password: req.body.password };
}
```

---

**Services are async functions that return data or throw.**
**Why:** All async DB operations can throw. Services handle Sequelize errors and rethrow as structured errors.
**How to apply:** Wrap Sequelize calls in try/catch inside service functions.
