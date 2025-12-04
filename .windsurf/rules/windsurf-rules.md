---
trigger: always_on
---

# Windsurf Rules - Node.js Backend Boilerplate

## 1. Project Structure & Organization

### Module Structure
```
module-name/
├── constants/
│   ├── feature.constants.js
│   └── index.js
├── services/
│   ├── feature.service.js
│   └── index.js
├── validators/
│   ├── feature.validator.js
│   └── index.js
├── controller.js
├── routes.js
```

### Naming Conventions
- **Directories**: `kebab-case` (`user-management/`, `auth/`)
- **Files**: `camelCase.type.js` (`login.service.js`, `user.controller.js`)
- **Functions**: `camelCase` (`getUserById`, `validateEmail`)
- **Constants**: `UPPER_SNAKE_CASE` (`JWT_SECRET`, `API_URL`)

## 2. Function-Based Programming (MANDATORY)

**Always use functions, never classes.**

```javascript
// ✅ Good
const createUser = async (userData) => {
  // Implementation
};

module.exports = { createUser };

// ❌ Avoid
class UserService {
  createUser() {}
}
```

## 3. Architecture Layers

1. **Routes** → Define endpoints
2. **Controllers** → Handle HTTP (functions only)
3. **Services** → Business logic (functions only)
4. **Validators** → Input validation (functions only)
5. **Constants** → Messages and codes (objects only)

```javascript
// Controller pattern
const login = async (req, res, next) => {
  try {
    const validatedRequest = validators.login(req);
    const result = await authServices.login(validatedRequest);
    next({ ...constants.login.messages.SUCCESS, result });
  } catch (error) {
    next(error);
  }
}
```

## 4. Error Handling

### Standardized Format
```javascript
// Error structure
const errorResponse = {
  code: "USRE0001",
  statusCode: 400,
  message: "Email is required"
};
throw new Error(JSON.stringify(errorResponse));

// Response via middleware
next({ ...constants.login.messages.SUCCESS, result });
```

### Error Codes
- **SUCCESS**: `USRS####` (User Success)
- **Client Error**: `USRE####` (User Error)
- **Server Error**: `ERR####` (Internal Error)
- **Security**: `SEC####` (Security Error)

## 5. Security Best Practices

### Input Validation
```javascript
const validateLogin = (req) => {
  const { email, password } = req.body;
  
  if (sharedValidators.isRequired(email)) {
    throw new Error(JSON.stringify(constants.login.errorMessages.EMAIL_REQUIRED));
  }
  
  return { email, password };
}
```

### Environment Variables
```javascript
// ✅ Good
const JWT_SECRET = process.env.JWT_SECRET || constants.auth.jwt.DEFAULT_SECRET;

// ❌ Avoid
const JWT_SECRET = 'hardcoded-secret';
```

### Password Handling
```javascript
const hashPassword = async (password) => await bcrypt.hash(password, 12);
const comparePasswords = async (plain, hashed) => await bcrypt.compare(plain, hashed);
```

## 6. Logging & Request Tracking

```javascript
// Include request ID for tracking
const requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
console.log(`[${requestId}] Processing login for: ${email}`);

// Structured error logging
console.error(`[${requestId}] Login failed:`, error.message);
```

## 7. Middleware Order

1. CORS
2. Helmet (Security)
3. Rate limiting
4. Body parsing
5. Decryption
6. Routes
7. Response formatting
8. Encryption
9. Error handling

```javascript
// Middleware structure
const customMiddleware = (req, res, next) => {
  try {
    // Logic here
    next();
  } catch (error) {
    next(error);
  }
};
```

## 8. Database & Services

```javascript
// Service functions only
const getUserByEmail = async (email) => {
  try {
    return await database.findByEmail(email);
  } catch (error) {
    throw new Error(JSON.stringify(constants.database.errors.USER_NOT_FOUND));
  }
};

// AWS integration
const getSecret = async (secretName) => {
  const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
  return JSON.parse(data.SecretString);
};
```

## 9. Testing Structure

```
tests/
├── unit/
│   ├── services/
│   ├── validators/
│   └── utils/
├── integration/
│   └── routes/
└── fixtures/
```

## 10. Documentation

### JSDoc for Functions
```javascript
/**
 * Authenticate user with email and password
 * @param {Object} data - Login data
 * @param {string} data.email - User email
 * @param {string} data.password - User password
 * @returns {Promise<Object>} User data and JWT token
 */
const login = async ({ email, password }) => {
  // Implementation
};
```

## 11. Code Review Checklist

- [ ] Uses functions instead of classes everywhere
- [ ] Follows module structure
- [ ] Includes proper error handling
- [ ] Uses standardized response format
- [ ] Includes input validation
- [ ] Has request tracking
- [ ] Follows security practices
- [ ] Includes JSDoc documentation
- [ ] No hardcoded secrets
- [ ] No class declarations anywhere

## 12. Git Workflow

### Commit Messages
```
feat(auth): add password reset functionality
fix(validation): correct email regex pattern
docs(readme): update setup instructions
```

### Branch Naming
- `feature/auth-module`
- `bugfix/login-validation`
- `hotfix/security-patch`

## 13. Enforcement

### ESLint Rules
```json
{
  "rules": {
    "no-class-declarations": "error",
    "prefer-arrow-callback": "error",
    "func-style": ["error", "expression"]
  }
}
```

### Tools
- ESLint configuration
- Pre-commit hooks
- Code review process
- Automated testing

---

**Remember: Always use functions, never classes. Prioritize clarity and security.**