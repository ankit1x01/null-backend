/**
 * Call All APIs Script
 * This script calls all API endpoints with correct payloads and stores responses
 * Run: node scripts/call-all-apis.js
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';
const RESULTS_FILE = path.join(__dirname, '..', 'api_responses.json');

// Store all responses
const apiResponses = {
  timestamp: new Date().toISOString(),
  baseUrl: BASE_URL,
  results: {},
  summary: {
    total: 0,
    success: 0,
    failed: 0,
    skipped: 0
  }
};

// Store created IDs for cleanup and dependent operations
const createdIds = {
  user: null,
  chapter: null,
  chapterLead: null,
  venue: null,
  eventType: null,
  event: null,
  eventSession: null,
  eventSessionComment: null,
  eventRegistration: null,
  page: null,
  pagePermission: null
};

// Auth token
let authToken = null;
let currentUserId = null;

// Helper function to make API calls
async function callApi(method, endpoint, body = null, requiresAuth = true) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json'
  };

  if (requiresAuth && authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const options = {
    method,
    headers
  };

  if (body && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return {
      success: response.ok,
      status: response.status,
      data,
      url,
      method
    };
  } catch (error) {
    return {
      success: false,
      status: 0,
      error: error.message,
      url,
      method
    };
  }
}

// Store response
function storeResponse(module, operation, response) {
  if (!apiResponses.results[module]) {
    apiResponses.results[module] = {};
  }
  apiResponses.results[module][operation] = {
    ...response,
    timestamp: new Date().toISOString()
  };
  apiResponses.summary.total++;
  if (response.success) {
    apiResponses.summary.success++;
  } else if (response.skipped) {
    apiResponses.summary.skipped++;
  } else {
    apiResponses.summary.failed++;
  }
}

// Log result
function logResult(module, operation, response) {
  const icon = response.success ? '✅' : response.skipped ? '⏭️' : '❌';
  const status = response.status || 'N/A';
  console.log(`  ${icon} [${status}] ${module}/${operation}`);
  if (!response.success && !response.skipped && response.data?.message) {
    console.log(`     └─ ${response.data.message}`);
  }
}

// ==================== API CALLS ====================

async function runAllApis() {
  console.log('\n========================================');
  console.log('  CALLING ALL APIs WITH PAYLOADS');
  console.log('========================================');
  console.log(`Base URL: ${BASE_URL}\n`);

  // ==================== AUTH ====================
  console.log('\n📁 AUTH');
  console.log('─'.repeat(40));

  // Test credentials (existing users from seed data)
  const testUsers = {
    admin: { email: 'admin@null.community', password: 'password123', role: 'ADMIN' },
    lead: { email: 'lead.blr@null.community', password: 'password123', role: 'LEAD' },
    member: { email: 'user1@example.com', password: 'password123', role: 'MEMBER' }
  };

  // Register new user (for testing registration endpoint)
  const registerPayload = {
    email: `testuser_${Date.now()}@example.com`,
    password: 'Test@123456',
    name: 'Test User API'
  };
  const registerRes = await callApi('POST', '/api/auth/register', registerPayload, false);
  storeResponse('auth', 'register', registerRes);
  logResult('auth', 'register', registerRes);

  // Login with admin user (existing confirmed user)
  const loginPayload = {
    email: testUsers.admin.email,
    password: testUsers.admin.password
  };
  const loginRes = await callApi('POST', '/api/auth/login', loginPayload, false);
  storeResponse('auth', 'login', loginRes);
  logResult('auth', 'login', loginRes);

  if (loginRes.success && loginRes.data?.result?.token) {
    authToken = loginRes.data.result.token;
    currentUserId = loginRes.data.result.user?.id;
    console.log(`  🔑 Token acquired, User ID: ${currentUserId}`);
  } else {
    console.log('  ⚠️  Login failed, some APIs may fail');
  }

  // ==================== USERS ====================
  console.log('\n📁 USERS');
  console.log('─'.repeat(40));

  // Get current user
  const getMeRes = await callApi('GET', '/api/users/me');
  storeResponse('users', 'me', getMeRes);
  logResult('users', 'me', getMeRes);
  if (getMeRes.success && getMeRes.data?.result?.id) {
    currentUserId = getMeRes.data.result.id;
  }

  // Get all users
  const getUsersRes = await callApi('GET', '/api/users/getUsers');
  storeResponse('users', 'getUsers', getUsersRes);
  logResult('users', 'getUsers', getUsersRes);

  // Get user by ID
  const getUserByIdRes = await callApi('GET', `/api/users/getUserById?id=${currentUserId || 1}`);
  storeResponse('users', 'getUserById', getUserByIdRes);
  logResult('users', 'getUserById', getUserByIdRes);

  // Get user events
  const getUserEventsRes = await callApi('GET', '/api/users/events');
  storeResponse('users', 'events', getUserEventsRes);
  logResult('users', 'events', getUserEventsRes);

  // Get user sessions
  const getUserSessionsRes = await callApi('GET', '/api/users/sessions');
  storeResponse('users', 'sessions', getUserSessionsRes);
  logResult('users', 'sessions', getUserSessionsRes);

  // Update user
  const updateUserPayload = {
    name: 'Updated Test User',
    about_me: 'This is a test user updated via API script',
    github_profile: 'https://github.com/testuser'
  };
  const updateUserRes = await callApi('PUT', `/api/users/updateUser/${currentUserId || 1}`, updateUserPayload);
  storeResponse('users', 'updateUser', updateUserRes);
  logResult('users', 'updateUser', updateUserRes);

  // ==================== CHAPTERS ====================
  console.log('\n📁 CHAPTERS');
  console.log('─'.repeat(40));

  // Get all chapters
  const getChaptersRes = await callApi('GET', '/api/chapters/getChapters');
  storeResponse('chapters', 'getChapters', getChaptersRes);
  logResult('chapters', 'getChapters', getChaptersRes);

  // Get first chapter ID for dependent operations
  if (getChaptersRes.success && getChaptersRes.data?.result?.length > 0) {
    createdIds.chapter = getChaptersRes.data.result[0].id;
  }

  // Get chapter by ID
  const getChapterByIdRes = await callApi('GET', `/api/chapters/getChapterById?id=${createdIds.chapter || 1}`);
  storeResponse('chapters', 'getChapterById', getChapterByIdRes);
  logResult('chapters', 'getChapterById', getChapterByIdRes);

  // Create chapter
  const createChapterPayload = {
    name: `Test Chapter ${Date.now()}`,
    city: 'Test City',
    country: 'Test Country',
    description: 'Test chapter created by API script'
  };
  const createChapterRes = await callApi('POST', '/api/chapters/createChapter', createChapterPayload);
  storeResponse('chapters', 'createChapter', createChapterRes);
  logResult('chapters', 'createChapter', createChapterRes);
  if (createChapterRes.success && createChapterRes.data?.result?.id) {
    createdIds.chapter = createChapterRes.data.result.id;
  }

  // Update chapter
  const updateChapterPayload = {
    description: 'Updated chapter description via API script'
  };
  const updateChapterRes = await callApi('PUT', `/api/chapters/updateChapter/${createdIds.chapter || 1}`, updateChapterPayload);
  storeResponse('chapters', 'updateChapter', updateChapterRes);
  logResult('chapters', 'updateChapter', updateChapterRes);

  // ==================== VENUES ====================
  console.log('\n📁 VENUES');
  console.log('─'.repeat(40));

  // Create venue
  const createVenuePayload = {
    name: `Test Venue ${Date.now()}`,
    address: '123 Test Street',
    city: 'Test City',
    chapter_id: createdIds.chapter || 1,
    capacity: 100,
    contact_name: 'Test Contact',
    contact_email: 'venue@test.com',
    contact_mobile: '+1-555-0123'
  };
  const createVenueRes = await callApi('POST', '/api/venues/create', createVenuePayload);
  storeResponse('venues', 'create', createVenueRes);
  logResult('venues', 'create', createVenueRes);
  if (createVenueRes.success && createVenueRes.data?.result?.id) {
    createdIds.venue = createVenueRes.data.result.id;
  }

  // Get all venues
  const getVenuesRes = await callApi('GET', '/api/venues/');
  storeResponse('venues', 'getVenues', getVenuesRes);
  logResult('venues', 'getVenues', getVenuesRes);
  if (!createdIds.venue && getVenuesRes.success && getVenuesRes.data?.result?.length > 0) {
    createdIds.venue = getVenuesRes.data.result[0].id;
  }

  // Get venue by ID
  const getVenueByIdRes = await callApi('GET', `/api/venues/${createdIds.venue || 1}`);
  storeResponse('venues', 'getVenueById', getVenueByIdRes);
  logResult('venues', 'getVenueById', getVenueByIdRes);

  // Update venue
  const updateVenuePayload = {
    capacity: 150,
    contact_notes: 'Updated via API script'
  };
  const updateVenueRes = await callApi('PUT', `/api/venues/update/${createdIds.venue || 1}`, updateVenuePayload);
  storeResponse('venues', 'update', updateVenueRes);
  logResult('venues', 'update', updateVenueRes);

  // ==================== EVENT TYPES ====================
  console.log('\n📁 EVENT TYPES');
  console.log('─'.repeat(40));

  // Create event type
  const createEventTypePayload = {
    name: `Test Event Type ${Date.now()}`,
    description: 'Test event type created by API script',
    max_participant: 50,
    public: true,
    registration_required: true
  };
  const createEventTypeRes = await callApi('POST', '/api/event-types/createEventType', createEventTypePayload);
  storeResponse('eventTypes', 'createEventType', createEventTypeRes);
  logResult('eventTypes', 'createEventType', createEventTypeRes);
  if (createEventTypeRes.success && createEventTypeRes.data?.result?.id) {
    createdIds.eventType = createEventTypeRes.data.result.id;
  }

  // Get all event types
  const getEventTypesRes = await callApi('GET', '/api/event-types/getEventTypes');
  storeResponse('eventTypes', 'getEventTypes', getEventTypesRes);
  logResult('eventTypes', 'getEventTypes', getEventTypesRes);
  if (!createdIds.eventType && getEventTypesRes.success && getEventTypesRes.data?.result?.length > 0) {
    createdIds.eventType = getEventTypesRes.data.result[0].id;
  }

  // Get event type by ID
  const getEventTypeByIdRes = await callApi('GET', `/api/event-types/getEventTypeById?id=${createdIds.eventType || 1}`);
  storeResponse('eventTypes', 'getEventTypeById', getEventTypeByIdRes);
  logResult('eventTypes', 'getEventTypeById', getEventTypeByIdRes);

  // Update event type
  const updateEventTypePayload = {
    max_participant: 100,
    description: 'Updated event type description'
  };
  const updateEventTypeRes = await callApi('PUT', `/api/event-types/updateEventType/${createdIds.eventType || 1}`, updateEventTypePayload);
  storeResponse('eventTypes', 'updateEventType', updateEventTypeRes);
  logResult('eventTypes', 'updateEventType', updateEventTypeRes);

  // ==================== EVENTS ====================
  console.log('\n📁 EVENTS');
  console.log('─'.repeat(40));

  // Create event
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 30);
  const endDate = new Date(futureDate);
  endDate.setHours(endDate.getHours() + 3);

  const createEventPayload = {
    name: `Test Event ${Date.now()}`,
    description: 'Test event created by API script',
    event_type_id: createdIds.eventType || 1,
    chapter_id: createdIds.chapter || 1,
    venue_id: createdIds.venue || 1,
    public: true,
    can_show_on_homepage: true,
    accepting_registration: true,
    start_time: futureDate.toISOString(),
    end_time: endDate.toISOString(),
    max_registration: 50
  };
  const createEventRes = await callApi('POST', '/api/events/createEvent', createEventPayload);
  storeResponse('events', 'createEvent', createEventRes);
  logResult('events', 'createEvent', createEventRes);
  if (createEventRes.success && createEventRes.data?.result?.id) {
    createdIds.event = createEventRes.data.result.id;
  }

  // Get all events
  const getEventsRes = await callApi('GET', '/api/events/getEvents');
  storeResponse('events', 'getEvents', getEventsRes);
  logResult('events', 'getEvents', getEventsRes);
  if (!createdIds.event && getEventsRes.success && getEventsRes.data?.result?.length > 0) {
    createdIds.event = getEventsRes.data.result[0].id;
  }

  // Get event by ID
  const getEventByIdRes = await callApi('GET', `/api/events/getEventById?id=${createdIds.event || 1}`);
  storeResponse('events', 'getEventById', getEventByIdRes);
  logResult('events', 'getEventById', getEventByIdRes);

  // Update event
  const updateEventPayload = {
    name: 'Updated Test Event',
    max_registration: 100
  };
  const updateEventRes = await callApi('PUT', `/api/events/updateEvent/${createdIds.event || 1}`, updateEventPayload);
  storeResponse('events', 'updateEvent', updateEventRes);
  logResult('events', 'updateEvent', updateEventRes);

  // Generate ICS
  const generateICSRes = await callApi('GET', `/api/events/${createdIds.event || 1}/calendar.ics`);
  storeResponse('events', 'generateICS', generateICSRes);
  logResult('events', 'generateICS', generateICSRes);

  // ==================== EVENT SESSIONS ====================
  console.log('\n📁 EVENT SESSIONS');
  console.log('─'.repeat(40));

  // Create event session
  const sessionStart = new Date(futureDate);
  sessionStart.setMinutes(sessionStart.getMinutes() + 30);
  const sessionEnd = new Date(sessionStart);
  sessionEnd.setMinutes(sessionEnd.getMinutes() + 30);

  const createEventSessionPayload = {
    event_id: createdIds.event || 1,
    user_id: currentUserId || 1,
    name: `Test Session ${Date.now()}`,
    description: 'Test session created by API script',
    session_type: 'Talk',
    need_projector: true,
    need_microphone: true,
    start_time: sessionStart.toISOString(),
    end_time: sessionEnd.toISOString()
  };
  const createEventSessionRes = await callApi('POST', '/api/event-sessions/createEventSession', createEventSessionPayload);
  storeResponse('eventSessions', 'createEventSession', createEventSessionRes);
  logResult('eventSessions', 'createEventSession', createEventSessionRes);
  if (createEventSessionRes.success && createEventSessionRes.data?.result?.id) {
    createdIds.eventSession = createEventSessionRes.data.result.id;
  }

  // Get all event sessions
  const getEventSessionsRes = await callApi('GET', '/api/event-sessions/getEventSessions');
  storeResponse('eventSessions', 'getEventSessions', getEventSessionsRes);
  logResult('eventSessions', 'getEventSessions', getEventSessionsRes);
  if (!createdIds.eventSession && getEventSessionsRes.success && getEventSessionsRes.data?.result?.length > 0) {
    createdIds.eventSession = getEventSessionsRes.data.result[0].id;
  }

  // Get event session by ID
  const getEventSessionByIdRes = await callApi('GET', `/api/event-sessions/getEventSessionById?id=${createdIds.eventSession || 1}`);
  storeResponse('eventSessions', 'getEventSessionById', getEventSessionByIdRes);
  logResult('eventSessions', 'getEventSessionById', getEventSessionByIdRes);

  // Update event session
  const updateEventSessionPayload = {
    name: 'Updated Test Session',
    presentation_url: 'https://slides.example.com/test'
  };
  const updateEventSessionRes = await callApi('PUT', `/api/event-sessions/updateEventSession/${createdIds.eventSession || 1}`, updateEventSessionPayload);
  storeResponse('eventSessions', 'updateEventSession', updateEventSessionRes);
  logResult('eventSessions', 'updateEventSession', updateEventSessionRes);

  // ==================== EVENT SESSION COMMENTS ====================
  console.log('\n📁 EVENT SESSION COMMENTS');
  console.log('─'.repeat(40));

  // Create event session comment
  const createCommentPayload = {
    event_session_id: createdIds.eventSession || 1,
    user_id: currentUserId || 1,
    comment: 'Great session! Very informative. Created by API script.'
  };
  const createCommentRes = await callApi('POST', '/api/event-session-comments/createEventSessionComment', createCommentPayload);
  storeResponse('eventSessionComments', 'createEventSessionComment', createCommentRes);
  logResult('eventSessionComments', 'createEventSessionComment', createCommentRes);
  if (createCommentRes.success && createCommentRes.data?.result?.id) {
    createdIds.eventSessionComment = createCommentRes.data.result.id;
  }

  // Get all event session comments
  const getCommentsRes = await callApi('GET', '/api/event-session-comments/getEventSessionComments');
  storeResponse('eventSessionComments', 'getEventSessionComments', getCommentsRes);
  logResult('eventSessionComments', 'getEventSessionComments', getCommentsRes);
  if (!createdIds.eventSessionComment && getCommentsRes.success && getCommentsRes.data?.result?.length > 0) {
    createdIds.eventSessionComment = getCommentsRes.data.result[0].id;
  }

  // Get event session comment by ID
  const getCommentByIdRes = await callApi('GET', `/api/event-session-comments/getEventSessionCommentById/${createdIds.eventSessionComment || 1}`);
  storeResponse('eventSessionComments', 'getEventSessionCommentById', getCommentByIdRes);
  logResult('eventSessionComments', 'getEventSessionCommentById', getCommentByIdRes);

  // Update event session comment
  const updateCommentPayload = {
    comment: 'Updated comment via API script'
  };
  const updateCommentRes = await callApi('PUT', `/api/event-session-comments/updateEventSessionComment/${createdIds.eventSessionComment || 1}`, updateCommentPayload);
  storeResponse('eventSessionComments', 'updateEventSessionComment', updateCommentRes);
  logResult('eventSessionComments', 'updateEventSessionComment', updateCommentRes);

  // ==================== EVENT REGISTRATIONS ====================
  console.log('\n📁 EVENT REGISTRATIONS');
  console.log('─'.repeat(40));

  // Create event registration
  const createRegistrationPayload = {
    event_id: createdIds.event || 1,
    user_id: currentUserId || 1,
    state: 'Provisional'
  };
  const createRegistrationRes = await callApi('POST', '/api/event-registrations/createEventRegistration', createRegistrationPayload);
  storeResponse('eventRegistrations', 'createEventRegistration', createRegistrationRes);
  logResult('eventRegistrations', 'createEventRegistration', createRegistrationRes);
  if (createRegistrationRes.success && createRegistrationRes.data?.result?.id) {
    createdIds.eventRegistration = createRegistrationRes.data.result.id;
  }

  // Get all event registrations
  const getRegistrationsRes = await callApi('GET', '/api/event-registrations/getEventRegistrations');
  storeResponse('eventRegistrations', 'getEventRegistrations', getRegistrationsRes);
  logResult('eventRegistrations', 'getEventRegistrations', getRegistrationsRes);
  if (!createdIds.eventRegistration && getRegistrationsRes.success && getRegistrationsRes.data?.result?.length > 0) {
    createdIds.eventRegistration = getRegistrationsRes.data.result[0].id;
  }

  // Get event registration by ID
  const getRegistrationByIdRes = await callApi('GET', `/api/event-registrations/getEventRegistrationById?id=${createdIds.eventRegistration || 1}`);
  storeResponse('eventRegistrations', 'getEventRegistrationById', getRegistrationByIdRes);
  logResult('eventRegistrations', 'getEventRegistrationById', getRegistrationByIdRes);

  // Update event registration
  const updateRegistrationPayload = {
    state: 'Confirmed',
    accepted: true
  };
  const updateRegistrationRes = await callApi('PUT', `/api/event-registrations/updateEventRegistration/${createdIds.eventRegistration || 1}`, updateRegistrationPayload);
  storeResponse('eventRegistrations', 'updateEventRegistration', updateRegistrationRes);
  logResult('eventRegistrations', 'updateEventRegistration', updateRegistrationRes);

  // ==================== CHAPTER LEADS ====================
  console.log('\n📁 CHAPTER LEADS');
  console.log('─'.repeat(40));

  // Create chapter lead
  const createChapterLeadPayload = {
    chapter_id: createdIds.chapter || 1,
    user_id: currentUserId || 1,
    active: true
  };
  const createChapterLeadRes = await callApi('POST', '/api/chapter-leads/createChapterLead', createChapterLeadPayload);
  storeResponse('chapterLeads', 'createChapterLead', createChapterLeadRes);
  logResult('chapterLeads', 'createChapterLead', createChapterLeadRes);
  if (createChapterLeadRes.success && createChapterLeadRes.data?.result?.id) {
    createdIds.chapterLead = createChapterLeadRes.data.result.id;
  }

  // Get all chapter leads
  const getChapterLeadsRes = await callApi('GET', '/api/chapter-leads/getChapterLeads');
  storeResponse('chapterLeads', 'getChapterLeads', getChapterLeadsRes);
  logResult('chapterLeads', 'getChapterLeads', getChapterLeadsRes);
  if (!createdIds.chapterLead && getChapterLeadsRes.success && getChapterLeadsRes.data?.result?.length > 0) {
    createdIds.chapterLead = getChapterLeadsRes.data.result[0].id;
  }

  // Get chapter lead by ID
  const getChapterLeadByIdRes = await callApi('GET', `/api/chapter-leads/getChapterLeadById?id=${createdIds.chapterLead || 1}`);
  storeResponse('chapterLeads', 'getChapterLeadById', getChapterLeadByIdRes);
  logResult('chapterLeads', 'getChapterLeadById', getChapterLeadByIdRes);

  // Update chapter lead
  const updateChapterLeadPayload = {
    active: false
  };
  const updateChapterLeadRes = await callApi('PUT', `/api/chapter-leads/updateChapterLead/${createdIds.chapterLead || 1}`, updateChapterLeadPayload);
  storeResponse('chapterLeads', 'updateChapterLead', updateChapterLeadRes);
  logResult('chapterLeads', 'updateChapterLead', updateChapterLeadRes);

  // ==================== PAGES ====================
  console.log('\n📁 PAGES');
  console.log('─'.repeat(40));

  // Create page
  const createPagePayload = {
    title: `Test Page ${Date.now()}`,
    content: '<h1>Test Page</h1><p>This is a test page created by API script.</p>',
    published: true
  };
  const createPageRes = await callApi('POST', '/api/pages/createPage', createPagePayload);
  storeResponse('pages', 'createPage', createPageRes);
  logResult('pages', 'createPage', createPageRes);
  if (createPageRes.success && createPageRes.data?.result?.id) {
    createdIds.page = createPageRes.data.result.id;
  }

  // Get all pages
  const getPagesRes = await callApi('GET', '/api/pages/getPages');
  storeResponse('pages', 'getPages', getPagesRes);
  logResult('pages', 'getPages', getPagesRes);
  if (!createdIds.page && getPagesRes.success && getPagesRes.data?.result?.length > 0) {
    createdIds.page = getPagesRes.data.result[0].id;
  }

  // Get page by ID
  const getPageByIdRes = await callApi('GET', `/api/pages/getPageById?id=${createdIds.page || 1}`);
  storeResponse('pages', 'getPageById', getPageByIdRes);
  logResult('pages', 'getPageById', getPageByIdRes);

  // Update page
  const updatePagePayload = {
    title: 'Updated Test Page',
    content: '<h1>Updated Test Page</h1><p>This page was updated by API script.</p>'
  };
  const updatePageRes = await callApi('PUT', `/api/pages/updatePage/${createdIds.page || 1}`, updatePagePayload);
  storeResponse('pages', 'updatePage', updatePageRes);
  logResult('pages', 'updatePage', updatePageRes);

  // ==================== PAGE PERMISSIONS ====================
  console.log('\n📁 PAGE PERMISSIONS');
  console.log('─'.repeat(40));

  // Create page permission
  const createPagePermissionPayload = {
    page_id: createdIds.page || 1,
    user_id: currentUserId || 1,
    permission_type: 'write'
  };
  const createPagePermissionRes = await callApi('POST', '/api/page-permissions/createPagePermission', createPagePermissionPayload);
  storeResponse('pagePermissions', 'createPagePermission', createPagePermissionRes);
  logResult('pagePermissions', 'createPagePermission', createPagePermissionRes);
  if (createPagePermissionRes.success && createPagePermissionRes.data?.result?.id) {
    createdIds.pagePermission = createPagePermissionRes.data.result.id;
  }

  // Update page permission
  const updatePagePermissionPayload = {
    permission_type: 'read'
  };
  const updatePagePermissionRes = await callApi('PUT', `/api/page-permissions/updatePagePermission/${createdIds.pagePermission || 1}`, updatePagePermissionPayload);
  storeResponse('pagePermissions', 'updatePagePermission', updatePagePermissionRes);
  logResult('pagePermissions', 'updatePagePermission', updatePagePermissionRes);

  // ==================== STATS ====================
  console.log('\n📁 STATS');
  console.log('─'.repeat(40));

  // Get dashboard stats
  const getDashboardStatsRes = await callApi('GET', '/api/stats/dashboard');
  storeResponse('stats', 'dashboard', getDashboardStatsRes);
  logResult('stats', 'dashboard', getDashboardStatsRes);

  // ==================== USER ACHIEVEMENTS ====================
  console.log('\n📁 USER ACHIEVEMENTS');
  console.log('─'.repeat(40));

  // Get user achievements
  const getUserAchievementsRes = await callApi('GET', `/api/user-achievements/${currentUserId || 1}`);
  storeResponse('userAchievements', 'getUserAchievements', getUserAchievementsRes);
  logResult('userAchievements', 'getUserAchievements', getUserAchievementsRes);

  // ==================== DELETE OPERATIONS ====================
  console.log('\n📁 DELETE OPERATIONS');
  console.log('─'.repeat(40));

  // Delete page permission
  if (createdIds.pagePermission) {
    const deletePagePermissionRes = await callApi('DELETE', `/api/page-permissions/deletePagePermission/${createdIds.pagePermission}`, {});
    storeResponse('pagePermissions', 'deletePagePermission', deletePagePermissionRes);
    logResult('pagePermissions', 'deletePagePermission', deletePagePermissionRes);
  }

  // Delete page
  if (createdIds.page) {
    const deletePageRes = await callApi('DELETE', `/api/pages/deletePage/${createdIds.page}`, {});
    storeResponse('pages', 'deletePage', deletePageRes);
    logResult('pages', 'deletePage', deletePageRes);
  }

  // Delete chapter lead
  if (createdIds.chapterLead) {
    const deleteChapterLeadRes = await callApi('DELETE', `/api/chapter-leads/deleteChapterLead/${createdIds.chapterLead}`, {});
    storeResponse('chapterLeads', 'deleteChapterLead', deleteChapterLeadRes);
    logResult('chapterLeads', 'deleteChapterLead', deleteChapterLeadRes);
  }

  // Delete event registration
  if (createdIds.eventRegistration) {
    const deleteRegistrationRes = await callApi('DELETE', `/api/event-registrations/deleteEventRegistration/${createdIds.eventRegistration}`, {});
    storeResponse('eventRegistrations', 'deleteEventRegistration', deleteRegistrationRes);
    logResult('eventRegistrations', 'deleteEventRegistration', deleteRegistrationRes);
  }

  // Delete event session comment
  if (createdIds.eventSessionComment) {
    const deleteCommentRes = await callApi('DELETE', `/api/event-session-comments/deleteEventSessionComment/${createdIds.eventSessionComment}`, {});
    storeResponse('eventSessionComments', 'deleteEventSessionComment', deleteCommentRes);
    logResult('eventSessionComments', 'deleteEventSessionComment', deleteCommentRes);
  }

  // Delete event session
  if (createdIds.eventSession) {
    const deleteSessionRes = await callApi('DELETE', `/api/event-sessions/deleteEventSession/${createdIds.eventSession}`, {});
    storeResponse('eventSessions', 'deleteEventSession', deleteSessionRes);
    logResult('eventSessions', 'deleteEventSession', deleteSessionRes);
  }

  // Delete event
  if (createdIds.event) {
    const deleteEventRes = await callApi('DELETE', `/api/events/deleteEvent/${createdIds.event}`, {});
    storeResponse('events', 'deleteEvent', deleteEventRes);
    logResult('events', 'deleteEvent', deleteEventRes);
  }

  // Delete event type
  if (createdIds.eventType) {
    const deleteEventTypeRes = await callApi('DELETE', `/api/event-types/deleteEventType/${createdIds.eventType}`, {});
    storeResponse('eventTypes', 'deleteEventType', deleteEventTypeRes);
    logResult('eventTypes', 'deleteEventType', deleteEventTypeRes);
  }

  // Delete venue
  if (createdIds.venue) {
    const deleteVenueRes = await callApi('DELETE', `/api/venues/delete/${createdIds.venue}`, {});
    storeResponse('venues', 'delete', deleteVenueRes);
    logResult('venues', 'delete', deleteVenueRes);
  }

  // Delete chapter (if created)
  if (createdIds.chapter && createChapterRes.success) {
    const deleteChapterRes = await callApi('DELETE', `/api/chapters/deleteChapter/${createdIds.chapter}`, {});
    storeResponse('chapters', 'deleteChapter', deleteChapterRes);
    logResult('chapters', 'deleteChapter', deleteChapterRes);
  }

  // Delete user (optional - uncomment if needed)
  // if (currentUserId) {
  //   const deleteUserRes = await callApi('DELETE', `/api/users/deleteUser/${currentUserId}`, {});
  //   storeResponse('users', 'deleteUser', deleteUserRes);
  //   logResult('users', 'deleteUser', deleteUserRes);
  // }

  // ==================== SUMMARY ====================
  console.log('\n========================================');
  console.log('  API CALL SUMMARY');
  console.log('========================================');
  console.log(`  Total APIs Called: ${apiResponses.summary.total}`);
  console.log(`  ✅ Successful: ${apiResponses.summary.success}`);
  console.log(`  ❌ Failed: ${apiResponses.summary.failed}`);
  console.log(`  ⏭️  Skipped: ${apiResponses.summary.skipped}`);
  console.log('========================================\n');

  // Store created IDs in response
  apiResponses.createdIds = createdIds;

  // Save responses to file
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(apiResponses, null, 2));
  console.log(`📄 Responses saved to: ${RESULTS_FILE}\n`);

  return apiResponses;
}

// Main execution
runAllApis()
  .then(() => {
    console.log('✅ All API calls completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error running APIs:', error);
    process.exit(1);
  });
