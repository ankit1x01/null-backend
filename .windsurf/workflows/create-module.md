---
description: Generate a new module following the windsurf rules structure with function-based programming patterns.
auto_execution_mode: 1
---

# Create Module Workflow

Generate a new module following the windsurf rules structure with function-based programming patterns.

## Overview

This workflow creates a complete module with:
- **Function-based architecture** (no classes)
- **Standardized error handling** with proper codes
- **Request tracking** with unique IDs
- **Input validation** with shared validators
- **JSDoc documentation** for all functions
- **Consistent naming conventions** (kebab-case → camelCase)

## Generated Structure

```
module-name/
├── constants/
│   ├── create.constants.js    # Success/error codes for create
│   ├── get.constants.js       # Success/error codes for get
│   └── index.js              # Export all constants
├── services/
│   ├── create.service.js     # Business logic for create
│   ├── get.service.js        # Business logic for get
│   └── index.js              # Export all services
├── validators/
│   ├── create.validator.js   # Input validation for create
│   ├── get.validator.js      # Input validation for get
│   └── index.js              # Export all validators
├── controller.js             # HTTP request handlers
├── routes.js                 # Express route definitions
```

## Generated API Endpoints

For a module named `user-management`:
- `POST /api/user-management` - Create new user-management
- `GET /api/user-management/:id` - Get user-management by ID

## Code Patterns

### Controller Pattern
```javascript
const createUserManagement = async (req, res, next) => {
  try {
    const validatedRequest = validators.userManagementCreate(req);
    req.requestId = req.headers['x-request-id'] || `req-${Date.now()}`;
    
    const result = await userManagementServices.userManagementCreate({
      ...validatedRequest,
      requestId: req.requestId
    });
    
    next({
      ...constants.userManagementCreate.messages.CREATES0001,
      result
    });
  } catch (error) {
    // Standardized error handling
  }
};
```

### Service Pattern
```javascript
const userManagementCreate = async ({ requestId, ...data }) => {
  console.log(`[${requestId}] UserManagement create attempt`);
  
  try {
    // Business logic implementation
    const result = {
      id: 'generated-id',
      ...data,
      createdAt: new Date().toISOString()
    };
    
    console.log(`[${requestId}] UserManagement create successful`);
    return result;
  } catch (error) {
    console.error(`[${requestId}] UserManagement create failed:`, error.message);
    throw new Error(JSON.stringify(moduleConstants.userManagementCreate.errorMessages.CREATEE0003));
  }
};
```

### Validator Pattern
```javascript
const validateUserManagementCreate = (req) => {
  const { /* TODO: Add expected fields */ } = req.body;
  
  // TODO: Add validation logic
  // if (sharedValidators.isRequired(requiredField)) {
  //   throw new Error(JSON.stringify(constants.userManagementCreate.errorMessages.CREATEE0001));
  // }
  
  return req.body;
};
```

## Next Steps After Creation

1. **Add route to main app:**
   ```javascript
   // In src/index.js, add:
   app.use('/api/user-management', modules.userManagement);
   ```

2. **Implement business logic in services:**
   - Add database operations
   - Add external API calls
   - Add business rules

3. **Add validation rules in validators:**
   - Required field validation
   - Format validation (email, phone, etc.)
   - Business rule validation

4. **Update constants with specific error codes:**
   - Add meaningful error messages
   - Use proper HTTP status codes
   - Follow error code conventions

5. **Write tests:**
   - Unit tests for services
   - Integration tests for routes
   - Validation tests

## Error Code Conventions

- **SUCCESS**: `CREATES0001`, `GETS0001` (Success codes)
- **CLIENT ERROR**: `CREATEE0001`, `GETE0001` (Client error codes)
- **SERVER ERROR**: `ERR####` (Internal error codes)
- **SECURITY**: `SEC####` (Security error codes)

## Naming Conventions

- **Module names**: kebab-case (`user-management`)
- **Function names**: camelCase (`createUserManagement`)
- **Constants**: UPPER_SNAKE_CASE (`CREATES0001`)
- **Files**: camelCase.type.js (`create.service.js`)

## Requirements

- Module name must be in kebab-case format
- Only lowercase letters and hyphens allowed
- Must start and end with a letter
- Should be descriptive and meaningful

## Examples

Valid module names:
- `auth`
- `user-management`
- `product-catalog`
- `payment-gateway`

Invalid module names:
- `UserManagement` (PascalCase)
- `userManagement` (camelCase)
- `user_management` (snake_case)
- `user-Management` (mixed case)