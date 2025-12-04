/**
 * Auto-Generator for Swagger Documentation
 * Analyzes existing modules and generates documentation automatically
 */
const fs = require('fs');
const path = require('path');

/**
 * Analyze route file to extract endpoints and HTTP methods
 * @param {string} routeFilePath - Path to routes.js file
 * @returns {Array} Array of route information
 */
const analyzeRoutes = (routeFilePath) => {
  try {
    const routeContent = fs.readFileSync(routeFilePath, 'utf8');
    const routes = [];
    
    // Extract router.method('path', controller.function) patterns
    const routeRegex = /router\.(get|post|put|delete|patch)\(['"`]([^'"`]+)['"`],\s*controller\.(\w+)\)/g;
    let match;
    
    while ((match = routeRegex.exec(routeContent)) !== null) {
      const [, method, path, controllerFunction] = match;
      routes.push({
        method: method.toLowerCase(),
        path: path,
        controllerFunction: controllerFunction,
        httpMethod: method.toUpperCase()
      });
    }
    
    return routes;
  } catch (error) {
    console.warn(`⚠️  Error analyzing routes: ${error.message}`);
    return [];
  }
};

/**
 * Analyze constants file to extract error codes and messages
 * @param {string} constantsPath - Path to constants directory
 * @returns {Object} Success and error codes
 */
const analyzeConstants = (constantsPath) => {
  const codes = { success: {}, errors: {} };
  
  try {
    if (!fs.existsSync(constantsPath)) return codes;
    
    const constantFiles = fs.readdirSync(constantsPath)
      .filter(file => file.endsWith('.constants.js') && file !== 'index.js');
    
    constantFiles.forEach(file => {
      try {
        const filePath = path.join(constantsPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Extract success codes (pattern: XXXS0001)
        const successRegex = /(\w+S\d+):\s*{\s*code:\s*["'](\w+S\d+)["'],\s*statusCode:\s*(\d+),\s*message:\s*["']([^"']+)["']/g;
        let match;
        while ((match = successRegex.exec(content)) !== null) {
          const [, , code, statusCode, message] = match;
          codes.success[code] = { statusCode: parseInt(statusCode), message };
        }
        
        // Extract error codes (pattern: XXXE0001)
        const errorRegex = /(\w+E\d+):\s*{\s*code:\s*["'](\w+E\d+)["'],\s*statusCode:\s*(\d+),\s*message:\s*["']([^"']+)["']/g;
        while ((match = errorRegex.exec(content)) !== null) {
          const [, , code, statusCode, message] = match;
          codes.errors[code] = { statusCode: parseInt(statusCode), message };
        }
      } catch (error) {
        console.warn(`⚠️  Error analyzing constants file ${file}: ${error.message}`);
      }
    });
  } catch (error) {
    console.warn(`⚠️  Error analyzing constants: ${error.message}`);
  }
  
  return codes;
};

/**
 * Generate HTTP method from feature name
 * @param {string} featureName - Name of the feature
 * @returns {string} HTTP method
 */
const getHttpMethodFromFeature = (featureName) => {
  if (featureName.startsWith('get') || featureName.startsWith('list') || featureName.startsWith('fetch')) {
    return 'get';
  } else if (featureName.startsWith('update') || featureName.startsWith('edit')) {
    return 'put';
  } else if (featureName.startsWith('delete') || featureName.startsWith('remove')) {
    return 'delete';
  }
  return 'post';
};

/**
 * Generate Swagger documentation for a module
 * @param {string} moduleName - Name of the module
 * @param {string} modulePath - Path to the module directory
 * @returns {Object} Generated swagger documentation
 */
const generateModuleDocs = (moduleName, modulePath) => {
  console.log(`📝 Generating documentation for ${moduleName}...`);
  
  const routeFilePath = path.join(modulePath, 'routes.js');
  const constantsPath = path.join(modulePath, 'constants');
  
  // Analyze existing files
  const routes = analyzeRoutes(routeFilePath);
  const codes = analyzeConstants(constantsPath);
  
  // Generate swagger paths
  const swaggerPaths = {};
  const schemas = {};
  
  routes.forEach(route => {
    const fullPath = `/api/${moduleName}${route.path}`;
    const featureName = route.controllerFunction;
    const featureTitle = featureName.charAt(0).toUpperCase() + featureName.slice(1);
    
    // Find relevant success/error codes for this feature
    const successCode = Object.keys(codes.success).find(code => 
      code.toLowerCase().includes(featureName.substring(0, 4).toLowerCase())
    );
    const errorCodes = Object.keys(codes.errors).filter(code => 
      code.toLowerCase().includes(featureName.substring(0, 4).toLowerCase())
    );
    
    // Generate request schema name
    const requestSchemaName = `${featureTitle}Request`;
    const responseSchemaName = `${featureTitle}Response`;
    
    // Create path documentation
    if (!swaggerPaths[fullPath]) {
      swaggerPaths[fullPath] = {};
    }
    
    swaggerPaths[fullPath][route.method] = {
      summary: `${featureTitle} operation`,
      description: `Performs ${featureName} operation in ${moduleName} module`,
      tags: [moduleName.charAt(0).toUpperCase() + moduleName.slice(1)],
      security: [{ bearerAuth: [] }],
      ...(route.method !== 'get' && {
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: `#/components/schemas/${requestSchemaName}` }
            }
          }
        }
      }),
      responses: {
        200: {
          description: `${featureTitle} successful`,
          content: {
            'application/json': {
              schema: { $ref: `#/components/schemas/${responseSchemaName}` }
            }
          }
        },
        400: {
          description: 'Bad Request',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        500: {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        }
      }
    };
    
    // Generate basic schemas
    schemas[requestSchemaName] = {
      type: 'object',
      properties: {
        // TODO: This could be enhanced by analyzing validator files
        data: {
          type: 'object',
          description: `Request data for ${featureName} operation`
        }
      },
      example: {
        data: `Sample request data for ${featureName}`
      }
    };
    
    schemas[responseSchemaName] = {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          example: successCode || 'SUCCESS0001'
        },
        statusCode: {
          type: 'integer',
          example: codes.success[successCode]?.statusCode || 200
        },
        message: {
          type: 'string',
          example: codes.success[successCode]?.message || `${featureTitle} successful`
        },
        result: {
          type: 'object',
          description: `Result data for ${featureName} operation`
        }
      }
    };
  });
  
  // Add common error response schema
  schemas.ErrorResponse = {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        example: 'ERROR0001'
      },
      statusCode: {
        type: 'integer',
        example: 400
      },
      message: {
        type: 'string',
        example: 'Error message'
      }
    }
  };
  
  return { swaggerPaths, schemas };
};

/**
 * Generate documentation for all existing modules
 * @param {string} modulesPath - Path to modules directory
 */
const generateAllModuleDocs = (modulesPath) => {
  console.log('🚀 Auto-generating documentation for all modules...');
  
  if (!fs.existsSync(modulesPath)) {
    console.log('📁 No modules directory found');
    return;
  }
  
  const modules = fs.readdirSync(modulesPath).filter(item => {
    const itemPath = path.join(modulesPath, item);
    return fs.statSync(itemPath).isDirectory();
  });
  
  modules.forEach(moduleName => {
    const modulePath = path.join(modulesPath, moduleName);
    const docsPath = path.join(modulePath, 'docs');
    
    // Create docs directory if it doesn't exist
    if (!fs.existsSync(docsPath)) {
      fs.mkdirSync(docsPath, { recursive: true });
      console.log(`📁 Created docs directory for ${moduleName}`);
    }
    
    // Generate documentation
    const { swaggerPaths, schemas } = generateModuleDocs(moduleName, modulePath);
    
    // Write swagger file
    const swaggerFilePath = path.join(docsPath, `${moduleName}.swagger.js`);
    const swaggerContent = `/**
 * ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)} Module Swagger Documentation
 * Auto-generated API documentation
 */

module.exports = ${JSON.stringify(swaggerPaths, null, 2)};
`;
    
    fs.writeFileSync(swaggerFilePath, swaggerContent);
    console.log(`📄 Generated ${swaggerFilePath}`);
    
    // Write schemas file
    const schemasFilePath = path.join(docsPath, 'schemas.js');
    const schemasContent = `/**
 * ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)} Module Schemas
 * Auto-generated request/response schemas
 */

module.exports = ${JSON.stringify(schemas, null, 2)};
`;
    
    fs.writeFileSync(schemasFilePath, schemasContent);
    console.log(`📋 Generated ${schemasFilePath}`);
  });
  
  console.log('✅ Documentation generation completed!');
};

module.exports = {
  analyzeRoutes,
  analyzeConstants,
  generateModuleDocs,
  generateAllModuleDocs,
  getHttpMethodFromFeature
};
