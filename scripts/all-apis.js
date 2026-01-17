/**
 * All APIs Script
 * This script contains all API endpoints from the backend
 * Can be used for testing, documentation, or reference
 */

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';

// All API Endpoints organized by module
const APIs = {
  // ==================== AUTH ====================
  auth: {
    login: {
      method: 'POST',
      endpoint: '/api/auth/login',
      description: 'User login',
      requiresAuth: false,
      body: {
        email: 'string',
        password: 'string'
      }
    },
    register: {
      method: 'POST',
      endpoint: '/api/auth/register',
      description: 'User registration',
      requiresAuth: false,
      body: {
        email: 'string',
        password: 'string',
        name: 'string'
      }
    }
  },

  // ==================== CHAPTER LEADS ====================
  chapterLeads: {
    create: {
      method: 'POST',
      endpoint: '/api/chapter-leads/createChapterLead',
      description: 'Create a new chapter lead',
      requiresAuth: true
    },
    getAll: {
      method: 'GET',
      endpoint: '/api/chapter-leads/getChapterLeads',
      description: 'Get all chapter leads',
      requiresAuth: true
    },
    getById: {
      method: 'GET',
      endpoint: '/api/chapter-leads/getChapterLeadById',
      description: 'Get chapter lead by ID',
      requiresAuth: true,
      params: ['id']
    },
    update: {
      method: 'PUT',
      endpoint: '/api/chapter-leads/updateChapterLead/:id',
      description: 'Update chapter lead',
      requiresAuth: true,
      params: ['id']
    },
    delete: {
      method: 'DELETE',
      endpoint: '/api/chapter-leads/deleteChapterLead/:id',
      description: 'Delete chapter lead',
      requiresAuth: true,
      params: ['id']
    }
  },

  // ==================== CHAPTERS ====================
  chapters: {
    getAll: {
      method: 'GET',
      endpoint: '/api/chapters/getChapters',
      description: 'Get all chapters',
      requiresAuth: true
    },
    getById: {
      method: 'GET',
      endpoint: '/api/chapters/getChapterById',
      description: 'Get chapter by ID',
      requiresAuth: true,
      params: ['id']
    },
    create: {
      method: 'POST',
      endpoint: '/api/chapters/createChapter',
      description: 'Create a new chapter',
      requiresAuth: true
    },
    update: {
      method: 'PUT',
      endpoint: '/api/chapters/updateChapter/:id',
      description: 'Update chapter',
      requiresAuth: true,
      params: ['id']
    },
    delete: {
      method: 'DELETE',
      endpoint: '/api/chapters/deleteChapter/:id',
      description: 'Delete chapter',
      requiresAuth: true,
      params: ['id']
    }
  },

  // ==================== EVENT REGISTRATIONS ====================
  eventRegistrations: {
    create: {
      method: 'POST',
      endpoint: '/api/event-registrations/createEventRegistration',
      description: 'Create event registration',
      requiresAuth: true
    },
    getAll: {
      method: 'GET',
      endpoint: '/api/event-registrations/getEventRegistrations',
      description: 'Get all event registrations',
      requiresAuth: true
    },
    getById: {
      method: 'GET',
      endpoint: '/api/event-registrations/getEventRegistrationById',
      description: 'Get event registration by ID',
      requiresAuth: true,
      params: ['id']
    },
    update: {
      method: 'PUT',
      endpoint: '/api/event-registrations/updateEventRegistration/:id',
      description: 'Update event registration',
      requiresAuth: true,
      params: ['id']
    },
    delete: {
      method: 'DELETE',
      endpoint: '/api/event-registrations/deleteEventRegistration/:id',
      description: 'Delete event registration',
      requiresAuth: true,
      params: ['id']
    }
  },

  // ==================== EVENT SESSION COMMENTS ====================
  eventSessionComments: {
    getAll: {
      method: 'GET',
      endpoint: '/api/event-session-comments/getEventSessionComments',
      description: 'Get all event session comments',
      requiresAuth: true
    },
    getById: {
      method: 'GET',
      endpoint: '/api/event-session-comments/getEventSessionCommentById/:id',
      description: 'Get event session comment by ID',
      requiresAuth: true,
      params: ['id']
    },
    create: {
      method: 'POST',
      endpoint: '/api/event-session-comments/createEventSessionComment',
      description: 'Create event session comment',
      requiresAuth: true
    },
    update: {
      method: 'PUT',
      endpoint: '/api/event-session-comments/updateEventSessionComment/:id',
      description: 'Update event session comment',
      requiresAuth: true,
      params: ['id']
    },
    delete: {
      method: 'DELETE',
      endpoint: '/api/event-session-comments/deleteEventSessionComment/:id',
      description: 'Delete event session comment',
      requiresAuth: true,
      params: ['id']
    }
  },

  // ==================== EVENT SESSIONS ====================
  eventSessions: {
    create: {
      method: 'POST',
      endpoint: '/api/event-sessions/createEventSession',
      description: 'Create event session',
      requiresAuth: true
    },
    getAll: {
      method: 'GET',
      endpoint: '/api/event-sessions/getEventSessions',
      description: 'Get all event sessions',
      requiresAuth: true
    },
    getById: {
      method: 'GET',
      endpoint: '/api/event-sessions/getEventSessionById',
      description: 'Get event session by ID',
      requiresAuth: true,
      params: ['id']
    },
    update: {
      method: 'PUT',
      endpoint: '/api/event-sessions/updateEventSession/:id',
      description: 'Update event session',
      requiresAuth: true,
      params: ['id']
    },
    delete: {
      method: 'DELETE',
      endpoint: '/api/event-sessions/deleteEventSession/:id',
      description: 'Delete event session',
      requiresAuth: true,
      params: ['id']
    }
  },

  // ==================== EVENT TYPES ====================
  eventTypes: {
    create: {
      method: 'POST',
      endpoint: '/api/event-types/createEventType',
      description: 'Create event type',
      requiresAuth: true
    },
    getAll: {
      method: 'GET',
      endpoint: '/api/event-types/getEventTypes',
      description: 'Get all event types',
      requiresAuth: true
    },
    getById: {
      method: 'GET',
      endpoint: '/api/event-types/getEventTypeById',
      description: 'Get event type by ID',
      requiresAuth: true,
      params: ['id']
    },
    update: {
      method: 'PUT',
      endpoint: '/api/event-types/updateEventType/:id',
      description: 'Update event type',
      requiresAuth: true,
      params: ['id']
    },
    delete: {
      method: 'DELETE',
      endpoint: '/api/event-types/deleteEventType/:id',
      description: 'Delete event type',
      requiresAuth: true,
      params: ['id']
    }
  },

  // ==================== EVENTS ====================
  events: {
    getAll: {
      method: 'GET',
      endpoint: '/api/events/getEvents',
      description: 'Get all events',
      requiresAuth: true
    },
    getById: {
      method: 'GET',
      endpoint: '/api/events/getEventById',
      description: 'Get event by ID',
      requiresAuth: true,
      params: ['id']
    },
    create: {
      method: 'POST',
      endpoint: '/api/events/createEvent',
      description: 'Create event',
      requiresAuth: true
    },
    update: {
      method: 'PUT',
      endpoint: '/api/events/updateEvent/:id',
      description: 'Update event',
      requiresAuth: true,
      params: ['id']
    },
    delete: {
      method: 'DELETE',
      endpoint: '/api/events/deleteEvent/:id',
      description: 'Delete event',
      requiresAuth: true,
      params: ['id']
    },
    generateICS: {
      method: 'GET',
      endpoint: '/api/events/:id/calendar.ics',
      description: 'Generate ICS calendar file for event',
      requiresAuth: true,
      params: ['id']
    }
  },

  // ==================== PAGE PERMISSIONS ====================
  pagePermissions: {
    create: {
      method: 'POST',
      endpoint: '/api/page-permissions/createPagePermission',
      description: 'Create page permission',
      requiresAuth: true
    },
    update: {
      method: 'PUT',
      endpoint: '/api/page-permissions/updatePagePermission/:id',
      description: 'Update page permission',
      requiresAuth: true,
      params: ['id']
    },
    delete: {
      method: 'DELETE',
      endpoint: '/api/page-permissions/deletePagePermission/:id',
      description: 'Delete page permission',
      requiresAuth: true,
      params: ['id']
    }
  },

  // ==================== PAGES ====================
  pages: {
    create: {
      method: 'POST',
      endpoint: '/api/pages/createPage',
      description: 'Create page',
      requiresAuth: true
    },
    getAll: {
      method: 'GET',
      endpoint: '/api/pages/getPages',
      description: 'Get all pages',
      requiresAuth: true
    },
    getById: {
      method: 'GET',
      endpoint: '/api/pages/getPageById',
      description: 'Get page by ID',
      requiresAuth: true,
      params: ['id']
    },
    update: {
      method: 'PUT',
      endpoint: '/api/pages/updatePage/:id',
      description: 'Update page',
      requiresAuth: true,
      params: ['id']
    },
    delete: {
      method: 'DELETE',
      endpoint: '/api/pages/deletePage/:id',
      description: 'Delete page',
      requiresAuth: true,
      params: ['id']
    }
  },

  // ==================== STATS ====================
  stats: {
    dashboard: {
      method: 'GET',
      endpoint: '/api/stats/dashboard',
      description: 'Get dashboard statistics',
      requiresAuth: true
    }
  },

  // ==================== USER ACHIEVEMENTS ====================
  userAchievements: {
    getByUserId: {
      method: 'GET',
      endpoint: '/api/user-achievements/:userId',
      description: 'Get user achievements by user ID',
      requiresAuth: true,
      params: ['userId']
    }
  },

  // ==================== USERS ====================
  users: {
    me: {
      method: 'GET',
      endpoint: '/api/users/me',
      description: 'Get current user profile',
      requiresAuth: true
    },
    events: {
      method: 'GET',
      endpoint: '/api/users/events',
      description: 'Get user events',
      requiresAuth: true
    },
    sessions: {
      method: 'GET',
      endpoint: '/api/users/sessions',
      description: 'Get user sessions',
      requiresAuth: true
    },
    getAll: {
      method: 'GET',
      endpoint: '/api/users/getUsers',
      description: 'Get all users',
      requiresAuth: true
    },
    getById: {
      method: 'GET',
      endpoint: '/api/users/getUserById',
      description: 'Get user by ID',
      requiresAuth: true,
      params: ['id']
    },
    update: {
      method: 'PUT',
      endpoint: '/api/users/updateUser/:id',
      description: 'Update user',
      requiresAuth: true,
      params: ['id']
    },
    delete: {
      method: 'DELETE',
      endpoint: '/api/users/deleteUser/:id',
      description: 'Delete user',
      requiresAuth: true,
      params: ['id']
    }
  },

  // ==================== VENUES ====================
  venues: {
    create: {
      method: 'POST',
      endpoint: '/api/venues/create',
      description: 'Create venue',
      requiresAuth: true
    },
    getAll: {
      method: 'GET',
      endpoint: '/api/venues/',
      description: 'Get all venues',
      requiresAuth: true
    },
    getById: {
      method: 'GET',
      endpoint: '/api/venues/:id',
      description: 'Get venue by ID',
      requiresAuth: true,
      params: ['id']
    },
    update: {
      method: 'PUT',
      endpoint: '/api/venues/update/:id',
      description: 'Update venue',
      requiresAuth: true,
      params: ['id']
    },
    delete: {
      method: 'DELETE',
      endpoint: '/api/venues/delete/:id',
      description: 'Delete venue',
      requiresAuth: true,
      params: ['id']
    }
  }
};

// Helper function to get full URL
function getFullUrl(endpoint, params = {}) {
  let url = `${BASE_URL}${endpoint}`;
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`:${key}`, value);
  }
  return url;
}

// Helper function to make API calls
async function callApi(apiConfig, params = {}, body = null, token = null) {
  const url = getFullUrl(apiConfig.endpoint, params);
  const headers = {
    'Content-Type': 'application/json'
  };

  if (token && apiConfig.requiresAuth) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method: apiConfig.method,
    headers
  };

  if (body && ['POST', 'PUT', 'PATCH'].includes(apiConfig.method)) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return { success: response.ok, status: response.status, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Function to list all APIs
function listAllApis() {
  console.log('\n========================================');
  console.log('       ALL API ENDPOINTS');
  console.log('========================================\n');

  let totalApis = 0;

  for (const [moduleName, moduleApis] of Object.entries(APIs)) {
    console.log(`\n📁 ${moduleName.toUpperCase()}`);
    console.log('─'.repeat(40));

    for (const [apiName, apiConfig] of Object.entries(moduleApis)) {
      const authIcon = apiConfig.requiresAuth ? '🔒' : '🔓';
      const methodColors = {
        GET: '\x1b[32m',    // Green
        POST: '\x1b[33m',   // Yellow
        PUT: '\x1b[34m',    // Blue
        DELETE: '\x1b[31m', // Red
        PATCH: '\x1b[35m'   // Magenta
      };
      const resetColor = '\x1b[0m';
      const methodColor = methodColors[apiConfig.method] || '';

      console.log(`  ${authIcon} ${methodColor}${apiConfig.method.padEnd(7)}${resetColor} ${apiConfig.endpoint}`);
      console.log(`     └─ ${apiConfig.description}`);
      totalApis++;
    }
  }

  console.log('\n========================================');
  console.log(`       TOTAL APIs: ${totalApis}`);
  console.log('========================================\n');

  return totalApis;
}

// Function to get API summary
function getApiSummary() {
  const summary = {
    total: 0,
    byMethod: { GET: 0, POST: 0, PUT: 0, DELETE: 0, PATCH: 0 },
    byModule: {},
    publicApis: 0,
    protectedApis: 0
  };

  for (const [moduleName, moduleApis] of Object.entries(APIs)) {
    summary.byModule[moduleName] = Object.keys(moduleApis).length;

    for (const [apiName, apiConfig] of Object.entries(moduleApis)) {
      summary.total++;
      summary.byMethod[apiConfig.method] = (summary.byMethod[apiConfig.method] || 0) + 1;

      if (apiConfig.requiresAuth) {
        summary.protectedApis++;
      } else {
        summary.publicApis++;
      }
    }
  }

  return summary;
}

// Function to export APIs as JSON
function exportApisAsJson() {
  const allEndpoints = [];

  for (const [moduleName, moduleApis] of Object.entries(APIs)) {
    for (const [apiName, apiConfig] of Object.entries(moduleApis)) {
      allEndpoints.push({
        module: moduleName,
        name: apiName,
        ...apiConfig,
        fullUrl: getFullUrl(apiConfig.endpoint)
      });
    }
  }

  return allEndpoints;
}

// Function to test all APIs (basic connectivity test)
async function testAllApis(token = null) {
  console.log('\n========================================');
  console.log('       TESTING ALL APIs');
  console.log('========================================\n');

  const results = {
    passed: 0,
    failed: 0,
    skipped: 0,
    details: []
  };

  for (const [moduleName, moduleApis] of Object.entries(APIs)) {
    console.log(`\n🧪 Testing ${moduleName}...`);

    for (const [apiName, apiConfig] of Object.entries(moduleApis)) {
      // Skip DELETE and POST APIs in test mode to avoid data modification
      if (['DELETE', 'POST'].includes(apiConfig.method) && apiName !== 'login') {
        results.skipped++;
        results.details.push({
          module: moduleName,
          api: apiName,
          status: 'SKIPPED',
          reason: 'Data modification API'
        });
        console.log(`  ⏭️  ${apiConfig.method} ${apiConfig.endpoint} - SKIPPED`);
        continue;
      }

      // Skip if requires auth but no token provided
      if (apiConfig.requiresAuth && !token) {
        results.skipped++;
        results.details.push({
          module: moduleName,
          api: apiName,
          status: 'SKIPPED',
          reason: 'Requires authentication'
        });
        console.log(`  ⏭️  ${apiConfig.method} ${apiConfig.endpoint} - SKIPPED (No token)`);
        continue;
      }

      try {
        const result = await callApi(apiConfig, {}, null, token);
        if (result.success || result.status === 401 || result.status === 403) {
          results.passed++;
          console.log(`  ✅ ${apiConfig.method} ${apiConfig.endpoint} - PASSED (${result.status})`);
        } else {
          results.failed++;
          console.log(`  ❌ ${apiConfig.method} ${apiConfig.endpoint} - FAILED (${result.status})`);
        }
        results.details.push({
          module: moduleName,
          api: apiName,
          status: result.success ? 'PASSED' : 'FAILED',
          statusCode: result.status
        });
      } catch (error) {
        results.failed++;
        results.details.push({
          module: moduleName,
          api: apiName,
          status: 'ERROR',
          error: error.message
        });
        console.log(`  ❌ ${apiConfig.method} ${apiConfig.endpoint} - ERROR: ${error.message}`);
      }
    }
  }

  console.log('\n========================================');
  console.log(`       TEST RESULTS`);
  console.log(`       ✅ Passed: ${results.passed}`);
  console.log(`       ❌ Failed: ${results.failed}`);
  console.log(`       ⏭️  Skipped: ${results.skipped}`);
  console.log('========================================\n');

  return results;
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'list';

  switch (command) {
    case 'list':
      listAllApis();
      break;

    case 'summary':
      const summary = getApiSummary();
      console.log('\n========================================');
      console.log('       API SUMMARY');
      console.log('========================================');
      console.log(`\nTotal APIs: ${summary.total}`);
      console.log(`Public APIs: ${summary.publicApis}`);
      console.log(`Protected APIs: ${summary.protectedApis}`);
      console.log('\nBy Method:');
      for (const [method, count] of Object.entries(summary.byMethod)) {
        if (count > 0) console.log(`  ${method}: ${count}`);
      }
      console.log('\nBy Module:');
      for (const [module, count] of Object.entries(summary.byModule)) {
        console.log(`  ${module}: ${count}`);
      }
      console.log('========================================\n');
      break;

    case 'export':
      const exported = exportApisAsJson();
      console.log(JSON.stringify(exported, null, 2));
      break;

    case 'test':
      const token = args[1] || process.env.API_TOKEN;
      await testAllApis(token);
      break;

    default:
      console.log(`
Usage: node all-apis.js [command]

Commands:
  list     - List all API endpoints (default)
  summary  - Show API summary statistics
  export   - Export APIs as JSON
  test     - Test all APIs (optional: provide token as second argument)

Examples:
  node all-apis.js list
  node all-apis.js summary
  node all-apis.js export > apis.json
  node all-apis.js test YOUR_AUTH_TOKEN
      `);
  }
}

// Export for use as module
module.exports = {
  APIs,
  getFullUrl,
  callApi,
  listAllApis,
  getApiSummary,
  exportApisAsJson,
  testAllApis,
  BASE_URL
};

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}
