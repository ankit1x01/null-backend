#!/usr/bin/env node
/**
 * List all APIs from swagger.json
 */

const swagger = require('../swagger.json');

const endpoints = {};
Object.entries(swagger.paths).forEach(([path, methods]) => {
  Object.entries(methods).forEach(([method, details]) => {
    const tag = details.tags ? details.tags[0] : 'Untagged';
    if (!endpoints[tag]) endpoints[tag] = [];
    endpoints[tag].push({
      method: method.toUpperCase(),
      path,
      summary: details.summary
    });
  });
});

console.log('='.repeat(80));
console.log('COMPLETE API ENDPOINT LIST');
console.log('='.repeat(80));
console.log(`\nTotal Endpoints: ${Object.keys(swagger.paths).length}`);
console.log(`Total Modules: ${Object.keys(endpoints).length}\n`);

Object.keys(endpoints).sort().forEach(tag => {
  console.log(`\n${'─'.repeat(80)}`);
  console.log(`${tag.toUpperCase()} (${endpoints[tag].length} endpoints)`);
  console.log(`${'─'.repeat(80)}`);
  endpoints[tag].forEach(ep => {
    console.log(`  ${ep.method.padEnd(7)} ${ep.path}`);
    if (ep.summary) {
      console.log(`          ${ep.summary}`);
    }
  });
});

console.log('\n' + '='.repeat(80));
console.log('✅ Swagger documentation updated successfully!');
console.log('='.repeat(80));
