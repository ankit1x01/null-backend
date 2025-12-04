#!/usr/bin/env node

/**
 * Generate Swagger Documentation Script
 * Auto-generates documentation for all existing modules
 */

const path = require('path');
const { generateAllModuleDocs } = require('../src/swagger/auto-generator');

console.log('🚀 Starting documentation generation...');
console.log('');

try {
  const modulesPath = path.join(__dirname, '..', 'src', 'modules');
  generateAllModuleDocs(modulesPath);
  
  console.log('');
  console.log('✅ Documentation generation completed successfully!');
  console.log('');
  console.log('📋 Next steps:');
  console.log('1. Start your server: npm start');
  console.log('2. Visit: http://localhost:3001/api-docs');
  console.log('3. Explore your auto-generated API documentation');
  console.log('');
  console.log('🔄 Auto-sync: Documentation will update automatically when you modify your modules');
  
} catch (error) {
  console.error('❌ Error generating documentation:', error.message);
  console.log('');
  console.log('🔍 Troubleshooting:');
  console.log('1. Ensure you are running this from the project root directory');
  console.log('2. Check that src/modules/ directory exists');
  console.log('3. Verify your modules have the correct structure (routes.js, controller.js, etc.)');
  process.exit(1);
}
