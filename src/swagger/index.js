/**
 * Swagger Configuration
 * Auto-generates API documentation from modules
 */
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

/**
 * Auto-discover and load module documentation
 * @returns {Object} Combined paths and components from all modules
 */
const loadModuleDocs = () => {
  const modulesPath = path.join(__dirname, '../modules');
  let paths = {};
  let components = {
    schemas: {},
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  };

  try {
    if (!fs.existsSync(modulesPath)) {
      console.log('📚 No modules directory found');
      return { paths, components };
    }

    const modules = fs.readdirSync(modulesPath);

    modules.forEach(moduleName => {
      const moduleDocsPath = path.join(modulesPath, moduleName, 'docs');

      if (fs.existsSync(moduleDocsPath)) {
        try {
          // Load module-specific swagger paths
          const swaggerFile = path.join(moduleDocsPath, `${moduleName}.swagger.js`);
          if (fs.existsSync(swaggerFile)) {
            const moduleSwagger = require(swaggerFile);
            paths = { ...paths, ...moduleSwagger };
          }

          // Load module-specific schemas
          const schemasFile = path.join(moduleDocsPath, 'schemas.js');
          if (fs.existsSync(schemasFile)) {
            const moduleSchemas = require(schemasFile);
            components.schemas = { ...components.schemas, ...moduleSchemas };
          }
        } catch (error) {
          console.warn(`⚠️  Error loading docs for ${moduleName}:`, error.message);
        }
      }
    });

  } catch (error) {
    console.error('❌ Error loading module documentation:', error.message);
  }

  return { paths, components };
};

/**
 * Generate complete Swagger specification
 * @returns {Object} Complete OpenAPI specification
 */
const generateSwaggerSpec = () => {
  const { paths, components } = loadModuleDocs();

  // Generate tags dynamically from existing modules
  const modulesPath = path.join(__dirname, '../modules');
  const dynamicTags = [];

  try {
    if (fs.existsSync(modulesPath)) {
      const modules = fs.readdirSync(modulesPath);
      modules.forEach(moduleName => {
        const moduleDocsPath = path.join(modulesPath, moduleName, 'docs');
        if (fs.existsSync(moduleDocsPath)) {
          const tagName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
          let description = `${tagName} module operations`;

          // Add specific descriptions for known modules
          if (moduleName === 'auth') {
            description = 'User authentication and authorization operations including login, registration, and session management';
          }

          dynamicTags.push({
            name: tagName,
            description: description
          });
        }
      });
    }
  } catch (error) {
    console.warn('⚠️  Error generating dynamic tags:', error.message);
  }

  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Null Community API 🚀',
      version: '1.0.0',
      description: 'Official API documentation for the Null Community Platform',
      contact: {
        name: 'Null Community Team',
        email: 'hello@null.community'
      }
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production'
          ? process.env.API_BASE_URL || 'https://api.example.com'
          : `http://localhost:${process.env.PORT || 3001}`,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ],
    paths,
    components,
    tags: dynamicTags
  };

  return swaggerDefinition;
};

/**
 * Get Swagger UI middleware
 * @returns {Object} Swagger UI serve and setup middleware
 */
const getSwaggerMiddleware = () => {
  const swaggerSpec = generateSwaggerSpec();

  // Custom CSS for better UI
  const customCss = `
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info .title { color: #3b82f6; }
    .swagger-ui .scheme-container { background: #f8fafc; padding: 10px; border-radius: 4px; }
  `;

  const options = {
    customCss,
    customSiteTitle: 'Null Community API Documentation',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      tryItOutEnabled: true
    }
  };

  return {
    serve: swaggerUi.serve,
    setup: swaggerUi.setup(swaggerSpec, options),
    spec: swaggerSpec
  };
};

/**
 * Refresh documentation (for development auto-sync)
 * @returns {Object} Updated Swagger specification
 */
const refreshDocs = () => {
  console.log('🔄 Refreshing API documentation...');

  // Clear require cache for module docs to get latest changes
  const modulesPath = path.join(__dirname, '../modules');
  if (fs.existsSync(modulesPath)) {
    const modules = fs.readdirSync(modulesPath);
    modules.forEach(moduleName => {
      const moduleDocsPath = path.join(modulesPath, moduleName, 'docs');
      if (fs.existsSync(moduleDocsPath)) {
        // Clear cache for swagger files
        const swaggerFile = path.join(moduleDocsPath, `${moduleName}.swagger.js`);
        const schemasFile = path.join(moduleDocsPath, 'schemas.js');

        if (require.cache[require.resolve(swaggerFile)]) {
          delete require.cache[require.resolve(swaggerFile)];
        }
        if (require.cache[require.resolve(schemasFile)]) {
          delete require.cache[require.resolve(schemasFile)];
        }
      }
    });
  }

  return generateSwaggerSpec();
};

module.exports = {
  getSwaggerMiddleware,
  generateSwaggerSpec,
  refreshDocs,
  loadModuleDocs
};
