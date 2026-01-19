#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const autoGenerator = require('../src/swagger/auto-generator');

/**
 * Enhanced Create Module Generator Script
 * Generates a new module with feature-based structure following windsurf rules
 */



// Get module name and features from command line arguments
const moduleName = process.argv[2];
const featuresArg = process.argv[3];

if (!moduleName) {
  console.error('❌ Error: Module name is required');
  console.log('');
  console.log('Usage: node scripts/create-module.js <module-name> [features]');
  console.log('   or: npm run create-module <module-name> [features]');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/create-module.js user-management');
  console.log('  node scripts/create-module.js user-management login,register,updateProfile');
  console.log('  npm run create-module auth login,logout,refreshToken');
  console.log('  npm run create-module product-catalog createProduct,getProduct,updateProduct,deleteProduct');
  console.log('');
  console.log('Module name must be in kebab-case format (lowercase with hyphens)');
  console.log('Features should be comma-separated camelCase names');
  process.exit(1);
}

// Validate module name format (kebab-case)
if (!/^[a-z]+(-[a-z]+)*$/.test(moduleName)) {
  console.error('❌ Error: Module name must be in kebab-case format (e.g., user-management)');
  console.log('');
  console.log('Valid examples:');
  console.log('  ✅ user-management');
  console.log('  ✅ product-catalog');
  console.log('  ✅ auth');
  console.log('  ✅ payment-gateway');
  console.log('');
  console.log('Invalid examples:');
  console.log('  ❌ UserManagement (PascalCase)');
  console.log('  ❌ userManagement (camelCase)');
  console.log('  ❌ user_management (snake_case)');
  console.log('  ❌ user-Management (mixed case)');
  process.exit(1);
}

// Parse and validate features
let features = ['create', 'get']; // Default features
if (featuresArg) {
  features = featuresArg.split(',').map(f => f.trim());

  // Validate feature names (should be camelCase)
  for (const feature of features) {
    if (!/^[a-z][a-zA-Z0-9]*$/.test(feature)) {
      console.error(`❌ Error: Feature '${feature}' must be in camelCase format`);
      console.log('');
      console.log('Valid feature examples:');
      console.log('  ✅ login, register, updateProfile, deleteUser');
      console.log('  ✅ createProduct, getProduct, listProducts');
      console.log('  ✅ refreshToken, resetPassword');
      console.log('');
      console.log('Invalid feature examples:');
      console.log('  ❌ Login (PascalCase)');
      console.log('  ❌ update-profile (kebab-case)');
      console.log('  ❌ update_profile (snake_case)');
      process.exit(1);
    }
  }
}

console.log(`🚀 Creating module: ${moduleName}`);
console.log(`📋 Features: ${features.join(', ')}`);
console.log(`📍 Location: src/modules/${moduleName}`);
console.log('');

// Convert kebab-case to camelCase for function names
const camelCaseName = moduleName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
const pascalCaseName = camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1);

// Define module path
const modulePath = path.join(__dirname, '..', 'src', 'modules', moduleName);

// Check if module already exists
if (fs.existsSync(modulePath)) {
  console.error(`❌ Error: Module '${moduleName}' already exists at ${modulePath}`);
  console.log('');
  console.log('Choose a different module name or remove the existing module first.');
  process.exit(1);
}

// Create module directory structure
const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${path.relative(process.cwd(), dirPath)}`);
  }
};

// Create file with content
const createFile = (filePath, content) => {
  fs.writeFileSync(filePath, content);
  console.log(`📄 Created file: ${path.relative(process.cwd(), filePath)}`);
};

// Helper function to capitalize first letter
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Helper function to generate error codes
const generateErrorCode = (feature, type, index) => {
  const prefix = feature.toUpperCase().substring(0, 4);
  const suffix = type === 'success' ? 'S' : 'E';
  return `${prefix}${suffix}${String(index).padStart(4, '0')}`;
};

try {
  // Create main module directory
  createDirectory(modulePath);

  // Create subdirectories
  createDirectory(path.join(modulePath, 'constants'));
  createDirectory(path.join(modulePath, 'services'));
  createDirectory(path.join(modulePath, 'validators'));

  // Generate feature-specific files
  const constantsImports = [];
  const servicesImports = [];
  const validatorsImports = [];
  const controllerFunctions = [];
  const routes = [];
  const controllerExports = [];

  features.forEach((feature, index) => {
    const featureName = feature;
    const featureTitle = capitalize(feature);

    // Generate constants file
    const constantsContent = `/**
 * ${featureTitle} Constants
 * Contains message codes, texts, and status codes for ${feature} operations
 */

const ${feature}Constants = {
  messages: {
    ${generateErrorCode(feature, 'success', 1)}: {
      code: "${generateErrorCode(feature, 'success', 1)}",
      statusCode: 200,
      message: "${featureTitle} successful",
    },
  },
  errorMessages: {
    ${generateErrorCode(feature, 'error', 1)}: {
      code: "${generateErrorCode(feature, 'error', 1)}",
      statusCode: 400,
      message: "Required field is missing",
    },
    ${generateErrorCode(feature, 'error', 2)}: {
      code: "${generateErrorCode(feature, 'error', 2)}",
      statusCode: 400,
      message: "Invalid input format",
    },
    ${generateErrorCode(feature, 'error', 3)}: {
      code: "${generateErrorCode(feature, 'error', 3)}",
      statusCode: 404,
      message: "${featureTitle} failed",
    },
  },
};

module.exports = ${feature}Constants;
`;

    // Generate service file
    const serviceContent = `/**
 * ${featureTitle} Service
 * Handles ${feature} business logic
 */
const constants = require('../constants');
const sharedConstants = require('../../../shared/constants');

/**
 * ${featureTitle} operation
 * @param {Object} data - ${featureTitle} data
 * @param {string} data.requestId - Request ID for tracking
 * @returns {Promise<Object>} - Result data
 * @throws {Error} - If operation fails
 */
const ${feature} = async ({ requestId, ...data }) => {
  console.log(\`[\${requestId}] ${featureTitle} attempt\`);

  try {
    // Implement ${feature} logic here
    // Example: Database operations, external API calls, etc.

    const result = {
      id: 'generated-id',
      ...data,
      timestamp: new Date().toISOString()
    };

    console.log(\`[\${requestId}] ${featureTitle} successful\`);
    return result;
  } catch (error) {
    console.error(\`[\${requestId}] ${featureTitle} failed:\`, error.message);
    throw new Error(JSON.stringify(constants.${feature}.errorMessages.${generateErrorCode(feature, 'error', 3)}));
  }
};

module.exports = ${feature};
`;

    // Generate validator file
    const isIdRequired = feature.startsWith('delete') || feature.startsWith('remove') || feature.startsWith('update') || feature.startsWith('edit') || feature.startsWith('get') || feature.startsWith('fetch');
    const returnObject = isIdRequired
      ? `    id: req.params.id,\n    ...req.body`
      : `    ...req.body`;

    const validatorContent = `/**
 * ${featureTitle} Validator
 * Validates ${feature} request data
 */
const sharedValidators = require('../../../shared/validators');
const constants = require('../constants');

/**
 * Validate ${feature} request
 * @param {Object} req - Express request object
 * @returns {Object} - Validated request data
 * @throws {Error} - If validation fails
 */
const ${feature} = (req) => {
  // const { } = req.body;

  // Example validations:
  // if (sharedValidators.isRequired(requiredField)) {
  //   throw new Error(JSON.stringify(constants.${feature}.errorMessages.${generateErrorCode(feature, 'error', 1)}));
  // }

  return {
${returnObject}
  };
};

module.exports = ${feature};
`;

    // Create feature files
    createFile(path.join(modulePath, 'constants', `${feature}.constants.js`), constantsContent);
    createFile(path.join(modulePath, 'services', `${feature}.service.js`), serviceContent);
    createFile(path.join(modulePath, 'validators', `${feature}.validator.js`), validatorContent);

    // Collect imports and exports
    constantsImports.push(`const ${feature} = require('./${feature}.constants');`);
    servicesImports.push(`const ${feature} = require('./${feature}.service');`);
    validatorsImports.push(`const ${feature} = require('./${feature}.validator');`);

    // Generate controller function
    const controllerFunction = `/**
 * ${featureTitle}
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const ${feature} = async (req, res, next) => {
  try {
    // Validate request
    const validatedRequest = validators.${feature}(req);

    // Add request ID for tracking
    req.requestId = req.headers['x-request-id'] || \`req-\${Date.now()}\`;

    // Handle logic within service function
    const result = await ${camelCaseName}Services.${feature}({
      ...validatedRequest,
      requestId: req.requestId
    });

    // Return standardized response using the response middleware
    next({
      ...constants.${feature}.messages.${generateErrorCode(feature, 'success', 1)},
      result
    });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('{')) {
      // Pass the error to the response middleware
      next(error);
    } else {
      // For unexpected errors, create a standardized error format
      next(new Error(JSON.stringify(sharedConstants.serverError)));
    }
  }
};`;

    controllerFunctions.push(controllerFunction);
    controllerExports.push(feature);

    // Generate route (determine HTTP method based on feature name)
    let method = 'post';
    let routePath = `/${feature}`;

    if (feature.startsWith('get') || feature.startsWith('list') || feature.startsWith('fetch')) {
      method = 'get';
    } else if (feature.startsWith('update') || feature.startsWith('edit')) {
      method = 'put';
      routePath = `/${feature}/:id`;
    } else if (feature.startsWith('delete') || feature.startsWith('remove')) {
      method = 'delete';
      routePath = `/${feature}/:id`;
    }

    routes.push(`router.${method}('${routePath}', controller.${feature});`);
  });

  // Create constants index file
  createFile(
    path.join(modulePath, 'constants', 'index.js'),
    `/**
 * ${pascalCaseName} Constants
 * Export all ${moduleName} constants
 */
${constantsImports.join('\n')}

module.exports = {
  ${features.join(',\n  ')},
};
`
  );

  // Create services index file
  createFile(
    path.join(modulePath, 'services', 'index.js'),
    `/**
 * ${pascalCaseName} Services
 * Export all ${moduleName} services
 */
${servicesImports.join('\n')}

module.exports = {
  ${features.join(',\n  ')},
};
`
  );

  // Create validators index file
  createFile(
    path.join(modulePath, 'validators', 'index.js'),
    `/**
 * ${pascalCaseName} Validators
 * Export all ${moduleName} validators
 */
${validatorsImports.join('\n')}

module.exports = {
  ${features.join(',\n  ')},
};
`
  );

  // Create controller.js
  createFile(
    path.join(modulePath, 'controller.js'),
    `/**
 * ${pascalCaseName} Controller
 * Handles HTTP requests for ${moduleName} operations
 */
const ${camelCaseName}Services = require('./services');
const validators = require('./validators');
const constants = require('./constants');
const sharedConstants = require('../../shared/constants');

${controllerFunctions.join('\n\n')}

module.exports = {
  ${controllerExports.join(',\n  ')}
};
`
  );

  // Create routes.js
  createFile(
    path.join(modulePath, 'routes.js'),
    `/**
 * ${pascalCaseName} Module Routes
 * Defines all routes for ${moduleName} operations
 */
const express = require('express');
const router = express.Router();
const controller = require('./controller');

// ${pascalCaseName} routes
${routes.join('\n')}

module.exports = router;
`
  );

  // Note: index.js file is not created as per user preference

  // Generate Swagger documentation
  createDirectory(path.join(modulePath, 'docs'));

  // Use auto-generator to create documentation
  const { swaggerPaths, schemas } = autoGenerator.generateModuleDocs(moduleName, modulePath);

  // Create swagger documentation file
  createFile(
    path.join(modulePath, 'docs', `${moduleName}.swagger.js`),
    `/**
 * ${pascalCaseName} Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = ${JSON.stringify(swaggerPaths, null, 2)};
`
  );

  // Create schemas file
  createFile(
    path.join(modulePath, 'docs', 'schemas.js'),
    `/**
 * ${pascalCaseName} Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = ${JSON.stringify(schemas, null, 2)};
`
  );

  // Update main modules index.js
  const modulesIndexPath = path.join(__dirname, '..', 'src', 'modules', 'index.js');
  let modulesIndexContent = '';

  if (fs.existsSync(modulesIndexPath)) {
    modulesIndexContent = fs.readFileSync(modulesIndexPath, 'utf8');
  }

  // Add new module to exports
  const newModuleImport = `const ${camelCaseName} = require('./${moduleName}/routes');`;
  const newModuleExport = `  ${camelCaseName},`;

  if (!modulesIndexContent.includes(newModuleImport)) {
    // Find the position to insert the import
    const lines = modulesIndexContent.split('\n');
    const lastImportIndex = lines.findLastIndex(line => line.includes('require('));

    if (lastImportIndex !== -1) {
      lines.splice(lastImportIndex + 1, 0, newModuleImport);
    } else {
      lines.unshift(newModuleImport);
    }

    // Find the module.exports section and add the new export
    const exportStartIndex = lines.findIndex(line => line.includes('module.exports'));
    if (exportStartIndex !== -1) {
      const exportEndIndex = lines.findIndex((line, index) =>
        index > exportStartIndex && line.includes('}')
      );

      if (exportEndIndex !== -1) {
        lines.splice(exportEndIndex, 0, newModuleExport);
      }
    } else {
      // Create module.exports if it doesn't exist
      lines.push('', 'module.exports = {', newModuleExport, '};');
    }

    fs.writeFileSync(modulesIndexPath, lines.join('\n'));
    console.log(`📄 Updated: ${path.relative(process.cwd(), modulesIndexPath)}`);
  }

  // Update main src/index.js to add the route
  const mainIndexPath = path.join(__dirname, '..', 'src', 'index.js');
  if (fs.existsSync(mainIndexPath)) {
    let mainIndexContent = fs.readFileSync(mainIndexPath, 'utf8');
    const newRoute = `app.use('/api/${moduleName}', modules.${camelCaseName});`;

    if (!mainIndexContent.includes(newRoute)) {
      const lines = mainIndexContent.split('\n');

      // Find the "Setup routes" section or the last app.use route
      let insertIndex = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('// Setup routes') || lines[i].includes('Setup routes')) {
          insertIndex = i + 1;
          break;
        }
        if (lines[i].includes("app.use('/api/") && lines[i].includes('modules.')) {
          insertIndex = i + 1;
        }
      }

      if (insertIndex !== -1) {
        lines.splice(insertIndex, 0, newRoute);
        fs.writeFileSync(mainIndexPath, lines.join('\n'));
        console.log(`📄 Updated: ${path.relative(process.cwd(), mainIndexPath)} - Added route`);
      } else {
        console.log(`⚠️  Could not automatically add route to ${path.relative(process.cwd(), mainIndexPath)}`);
        console.log(`   Please manually add: ${newRoute}`);
      }
    }
  }

  console.log('');
  console.log('✅ Module created successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log(`   Module: ${moduleName}`);
  console.log(`   Location: src/modules/${moduleName}/`);
  console.log(`   Features: ${features.join(', ')}`);
  console.log(`   Files created: ${(features.length * 3) + 4}`);
  console.log('');
  console.log('📋 Next steps:');
  console.log(`1. Implement business logic in services/`);
  console.log(`2. Add proper validation rules in validators/`);
  console.log(`3. Update constants with appropriate error codes`);
  console.log(`4. Write tests for the new module`);
  console.log('');
  console.log('🔧 Generated endpoints:');
  routes.forEach(route => {
    const match = route.match(/router\.(\w+)\('([^']+)',/);
    if (match) {
      const method = match[1].toUpperCase();
      const path = match[2];
      console.log(`   ${method.padEnd(6)} /api/${moduleName}${path}`);
    }
  });

} catch (error) {
  console.error('❌ Error creating module:', error.message);
  console.log('');
  console.log('🔍 Troubleshooting:');
  console.log('1. Check if you have write permissions in the project directory');
  console.log('2. Ensure the src/modules/ directory exists');
  console.log('3. Verify the module name follows kebab-case format');
  console.log('4. Verify feature names follow camelCase format');
  console.log('5. Try running the command from the project root directory');
  process.exit(1);
}
