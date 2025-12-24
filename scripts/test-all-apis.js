/**
 * Comprehensive API Test Script
 * Tests various API endpoints with different user roles to verify permissions and functionality.
 */

require('dotenv').config();
const axios = require('axios');

const BASE_URL = `http://127.0.0.1:${process.env.PORT || 3001}/api`;

const USERS = {
    admin: { email: 'admin@null.community', password: 'password123', role: 'ADMIN' },
    lead: { email: 'lead.blr@null.community', password: 'password123', role: 'LEAD' },
    member: { email: 'user1@example.com', password: 'password123', role: 'MEMBER' }
};

const TOKENS = {};

// color helpers
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
};

const log = (msg, color = colors.reset) => console.log(`${color}${msg}${colors.reset}`);
const logHeader = (msg) => console.log(`\n${colors.cyan}=== ${msg} ===${colors.reset}`);
const logSuccess = (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`);
const logFail = (msg, err) => {
    const errMsg = err.response ? `${err.response.status} ${err.response.statusText} - ${JSON.stringify(err.response.data)}` : err.message;
    console.log(`${colors.red}❌ ${msg} [${errMsg}]${colors.reset}`);
};
const logInfo = (msg) => console.log(`${colors.blue}ℹ️ ${msg}${colors.reset}`);

const login = async (userKey) => {
    try {
        const { email, password } = USERS[userKey];
        const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
        TOKENS[userKey] = res.data.result.token;
        logSuccess(`Logged in as ${userKey} (${email})`);
    } catch (err) {
        logFail(`Login failed for ${userKey}`, err);
        process.exit(1);
    }
};

const testEndpoint = async (role, method, url, data = null, expectedStatus = 200, description) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${TOKENS[role]}` }
        };

        let res;
        if (method === 'GET') res = await axios.get(`${BASE_URL}${url}`, config);
        else if (method === 'POST') res = await axios.post(`${BASE_URL}${url}`, data, config);
        else if (method === 'PUT') res = await axios.put(`${BASE_URL}${url}`, data, config);
        else if (method === 'DELETE') res = await axios.delete(`${BASE_URL}${url}`, config);

        if (res.status === expectedStatus || (expectedStatus === 201 && res.status === 201)) {
            logSuccess(`[${role.toUpperCase()}] ${description}`);
            return res.data.result; // Return result object
        } else {
            logFail(`[${role.toUpperCase()}] ${description} - Expected ${expectedStatus} but got ${res.status}`, { message: 'Unexpected Status' });
        }
    } catch (err) {
        if (err.response && err.response.status === expectedStatus) {
            logSuccess(`[${role.toUpperCase()}] ${description} (Expected Failure)`);
        } else {
            logFail(`[${role.toUpperCase()}] ${description}`, err);
        }
    }
};

const runTests = async () => {
    logHeader('Authenticating Users');
    await login('admin');
    await login('lead');
    await login('member');

    logHeader('Testing Public Routes');
    await testEndpoint('member', 'GET', '/chapters/getChapters', null, 200, 'Get Chapters');
    await testEndpoint('member', 'GET', '/events/getEvents', null, 200, 'Get Events');
    await testEndpoint('member', 'GET', '/venues', null, 200, 'Get Venues'); // Added Venues route

    logHeader('Testing User Access');
    await testEndpoint('member', 'GET', '/users/me', null, 200, 'Get My Profile');
    await testEndpoint('admin', 'GET', '/users/getUsers', null, 200, 'Get All Users (Admin)');
    await testEndpoint('member', 'GET', '/users/getUsers', null, 403, 'Get All Users (Member - Should Fail)');

    logHeader('Testing Event Management');
    const newEvent = {
        name: 'Automated Test Event',
        description: 'Created by API test script',
        event_type_id: 1,
        chapter_id: 1,
        venue_id: 1,
        start_time: new Date(Date.now() + 86400000).toISOString(),
        end_time: new Date(Date.now() + 90000000).toISOString(),
        public: true
    };

    // Admin create event
    const createdEvent = await testEndpoint('admin', 'POST', '/events/createEvent', newEvent, 201, 'Create Event (Admin)');

    // Member create event (Should Fail)
    await testEndpoint('member', 'POST', '/events/createEvent', newEvent, 403, 'Create Event (Member - Should Fail)');

    if (createdEvent && createdEvent.id) {
        const eventId = createdEvent.id; // Adjust based on actual response structure

        // Update Event
        await testEndpoint('admin', 'PUT', `/events/updateEvent/${eventId}`, { ...newEvent, name: 'Updated Event Check' }, 200, 'Update Event (Admin)');
        await testEndpoint('member', 'PUT', `/events/updateEvent/${eventId}`, { ...newEvent, name: 'Hacked Event' }, 403, 'Update Event (Member - Should Fail)');

        // Delete Event
        await testEndpoint('admin', 'DELETE', `/events/deleteEvent/${eventId}`, null, 200, 'Delete Event (Admin)');
    }

    logHeader('Testing Sessions');
    await testEndpoint('member', 'GET', '/event-sessions/getEventSessions', null, 200, 'Get Sessions'); // Guessing route


    logHeader('Tests Completed');
};

runTests();
