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

// Color helpers
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

const log = (msg, color = colors.reset) => console.log(`${color}${msg}${colors.reset}`);
const logHeader = (msg) => console.log(`\n${colors.cyan}=== ${msg} ===${colors.reset}`);
const logSuccess = (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`);
const logFail = (msg, err) => {
    let errMsg = err.message;
    if (err.response) {
        errMsg = `${err.response.status} ${err.response.statusText}`;
        if (err.response.data && err.response.data.message) {
            errMsg += ` - ${err.response.data.message}`;
        }
    }
    console.log(`${colors.red}❌ ${msg} [${errMsg}]${colors.reset}`);
};

const login = async (userKey) => {
    try {
        const { email, password } = USERS[userKey];
        const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
        TOKENS[userKey] = res.data.result.token;
        logSuccess(`Logged in as ${userKey} (${email})`);
        return res.data.result.user;
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

        if (['POST', 'PUT'].includes(method) && !data) {
            data = {};
        }

        let res;
        if (method === 'GET') res = await axios.get(`${BASE_URL}${url}`, config);
        else if (method === 'POST') res = await axios.post(`${BASE_URL}${url}`, data, config);
        else if (method === 'PUT') res = await axios.put(`${BASE_URL}${url}`, data, config);
        else if (method === 'DELETE') res = await axios.delete(`${BASE_URL}${url}`, config);

        if (res.status === expectedStatus || (expectedStatus === 201 && res.status === 201) || (expectedStatus === 200 && res.status === 201)) {
            logSuccess(`[${role.toUpperCase()}] ${description}`);
            return res.data.result;
        } else {
            console.log(`${colors.yellow}⚠️ [${role.toUpperCase()}] ${description} - Expected ${expectedStatus} but got ${res.status}${colors.reset}`);
            return res.data.result;
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
    const adminUser = await login('admin');
    const memberUser = await login('member');
    await login('lead');

    // === 1. Venues ===
    logHeader('1. Testing Venues');
    const newVenue = {
        name: 'Test Venue',
        description: 'Created by Test Script',
        address: '123 Test St',
        contact_name: 'Tester',
        chapter_id: 1
    };

    // Member Create (Should Fail)
    await testEndpoint('member', 'POST', '/venues/create', newVenue, 403, 'Create Venue (Member - Should Fail)');

    // Admin Create
    const createdVenue = await testEndpoint('admin', 'POST', '/venues/create', newVenue, 201, 'Create Venue (Admin)');

    if (createdVenue && createdVenue.id) {
        await testEndpoint('member', 'GET', `/venues/${createdVenue.id}`, null, 200, 'Get Venue By ID');
        await testEndpoint('member', 'PUT', `/venues/update/${createdVenue.id}`, { name: 'Hacked Venue' }, 403, 'Update Venue (Member - Should Fail)');
        await testEndpoint('admin', 'PUT', `/venues/update/${createdVenue.id}`, { name: 'Updated Venue' }, 200, 'Update Venue (Admin)');
        await testEndpoint('member', 'DELETE', `/venues/delete/${createdVenue.id}`, null, 403, 'Delete Venue (Member - Should Fail)');
        // Keep venue for event tests
    }

    // === 2. Event Types ===
    logHeader('2. Testing Event Types');
    const newEventType = {
        name: `Test Type ${Date.now()}`,
        description: 'Test Type Desc',
        public: true,
        registration_required: true
    };

    await testEndpoint('member', 'POST', '/event-types/createEventType', newEventType, 403, 'Create Event Type (Member - Should Fail)');
    const createdEventType = await testEndpoint('admin', 'POST', '/event-types/createEventType', newEventType, 201, 'Create Event Type (Admin)');

    if (createdEventType && createdEventType.id) {
        await testEndpoint('member', 'GET', '/event-types/getEventTypes', null, 200, 'Get Event Types');
        await testEndpoint('admin', 'PUT', `/event-types/updateEventType/${createdEventType.id}`, { description: 'Updated Desc' }, 200, 'Update Event Type (Admin)');
    }

    // === 3. Events ===
    logHeader('3. Testing Events');
    // Member Create (Should Fail)
    await testEndpoint('member', 'POST', '/events/createEvent', {
        name: 'Community Meetup ' + Date.now(),
        description: 'A great meetup',
        event_type_id: createdEventType ? createdEventType.id : 1,
        chapter_id: 1, // Bangalore
        venue_id: createdVenue ? createdVenue.id : 1,
        start_time: new Date(Date.now() + 86400000).toISOString(),
        end_time: new Date(Date.now() + 90000000).toISOString(),
        registration_start_time: new Date().toISOString(),
        registration_end_time: new Date(Date.now() + 80000000).toISOString(),
        max_registration: 100,
        public: true,
        accepting_registration: true
    }, 403, 'Create Event (Member - Should Fail)');

    const createdEvent = await testEndpoint('admin', 'POST', '/events/createEvent', {
        name: 'Community Meetup ' + Date.now(),
        description: 'A great meetup',
        event_type_id: createdEventType ? createdEventType.id : 1,
        chapter_id: 1, // Bangalore
        venue_id: createdVenue ? createdVenue.id : 1,
        start_time: new Date(Date.now() + 86400000).toISOString(),
        end_time: new Date(Date.now() + 90000000).toISOString(),
        registration_start_time: new Date().toISOString(),
        registration_end_time: new Date(Date.now() + 80000000).toISOString(),
        max_registration: 100,
        public: true,
        accepting_registration: true
    }, 201, 'Create Event (Admin)');

    if (createdEvent) {
        console.log('DEBUG: createdEvent:', JSON.stringify(createdEvent));
    }

    if (createdEvent && createdEvent.id) {
        await testEndpoint('member', 'GET', `/events/getEventById?id=${createdEvent.id}`, null, 200, 'Get Event By ID');
        await testEndpoint('admin', 'PUT', `/events/updateEvent/${createdEvent.id}`, { name: 'Updated Event Name' }, 200, 'Update Event (Admin)');
    }

    // === 4. Event Sessions ===
    logHeader('4. Testing Event Sessions');
    if (createdEvent && createdEvent.id) {
        const newSession = {
            event_id: createdEvent.id,
            user_id: 2, // Assuming user 2 exists
            name: 'Test Session',
            description: 'Test Description',
            session_type: 'Talk',
            start_time: new Date(Date.now() + 86400000).toISOString(),
            end_time: new Date(Date.now() + 87000000).toISOString()
        };

        await testEndpoint('member', 'POST', '/event-sessions/createEventSession', newSession, 403, 'Create Session (Member - Should Fail)');
        const createdSession = await testEndpoint('admin', 'POST', '/event-sessions/createEventSession', newSession, 201, 'Create Session (Admin)');

        if (createdSession && createdSession.id) {
            await testEndpoint('member', 'GET', '/event-sessions/getEventSessions', null, 200, 'Get Sessions');

            // === 5. Event Session Comments ===
            logHeader('5. Testing Session Comments');
            const newComment = {
                event_session_id: createdSession.id,
                user_id: memberUser.id,
                comment: 'Great session!'
            };
            const createdComment = await testEndpoint('member', 'POST', '/event-session-comments/createEventSessionComment', newComment, 201, 'Create Comment (Member)');

            if (createdComment && createdComment.id) {
                await testEndpoint('member', 'GET', '/event-session-comments/getEventSessionComments', null, 200, 'Get Comments');
                await testEndpoint('member', 'DELETE', `/event-session-comments/deleteEventSessionComment/${createdComment.id}`, null, 200, 'Delete Comment (Member - Own)');
            }
        }
    }

    // === 6. Event Registrations ===
    logHeader('6. Testing Registrations');
    if (createdEvent && createdEvent.id) {
        const registration = {
            event_id: createdEvent.id,
            user_id: memberUser.id,
            accepted: true
        };
        const createdReg = await testEndpoint('member', 'POST', '/event-registrations/createEventRegistration', registration, 201, 'Register for Event (Member)');

        if (createdReg && createdReg.id) {
            await testEndpoint('admin', 'GET', '/event-registrations/getEventRegistrations', null, 200, 'Get Registrations (Admin)');
            await testEndpoint('admin', 'DELETE', `/event-registrations/deleteEventRegistration/${createdReg.id}`, null, 200, 'Delete Registration (Admin)');
        }
    }

    // === 7. Pages ===
    logHeader('7. Testing Pages');
    const newPage = {
        title: 'Test Page',
        content: '# Hello',
        slug: `test-page-${Date.now()}`,
        published: true
    };

    await testEndpoint('member', 'POST', '/pages/createPage', newPage, 403, 'Create Page (Member - Should Fail)');
    const createdPage = await testEndpoint('admin', 'POST', '/pages/createPage', newPage, 201, 'Create Page (Admin)');

    if (createdPage && createdPage.id) {
        await testEndpoint('member', 'GET', '/pages/getPages', null, 200, 'Get Pages');
        await testEndpoint('admin', 'DELETE', `/pages/deletePage/${createdPage.id}`, null, 200, 'Delete Page (Admin)');
    }

    // === 8. Page Permissions ===
    logHeader('8. Testing Page Permissions');
    if (createdPage && createdPage.id) {
        const newPerm = {
            page_id: createdPage.id,
            role: 'LEAD',
            can_edit: true
        };
        await testEndpoint('member', 'POST', '/page-permissions/createPagePermission', newPerm, 403, 'Create Permission (Member - Should Fail)');
        // Admin might succeed or fail depending on if this module is implemented fully
        await testEndpoint('admin', 'POST', '/page-permissions/createPagePermission', newPerm, 201, 'Create Permission (Admin)');
    }

    // === 9. Chapter Leads ===
    logHeader('9. Testing Chapter Leads');
    const newLead = {
        chapter_id: 1,
        user_id: memberUser.id,
        active: true
    };
    await testEndpoint('member', 'POST', '/chapter-leads/createChapterLead', newLead, 403, 'Assign Lead (Member - Should Fail)');
    const createdLead = await testEndpoint('admin', 'POST', '/chapter-leads/createChapterLead', newLead, 201, 'Assign Lead (Admin)');

    if (createdLead && createdLead.id) {
        await testEndpoint('admin', 'DELETE', `/chapter-leads/deleteChapterLead/${createdLead.id}`, null, 200, 'Remove Lead (Admin)');
    }

    // === 10. Stats & Achievements ===
    logHeader('10. Testing Stats & Achievements');
    await testEndpoint('admin', 'GET', '/stats/dashboard', null, 200, 'Get Dashboard Stats');
    await testEndpoint('member', 'GET', `/user-achievements/${memberUser.id}`, null, 200, 'Get My Achievements');


    // Cleanup
    logHeader('Cleanup');
    if (createdEvent && createdEvent.id) {
        await testEndpoint('admin', 'DELETE', `/events/deleteEvent/${createdEvent.id}`, null, 200, 'Cleanup Event');
    }
    if (createdVenue && createdVenue.id) {
        await testEndpoint('admin', 'DELETE', `/venues/delete/${createdVenue.id}`, null, 200, 'Cleanup Venue');
    }

    // === 11. Missing APIs Check ===
    logHeader('11. Testing Missing APIs (Autocomplete, Integrations, Auth)');

    // Autocomplete
    const autocompleteRes = await testEndpoint('admin', 'GET', `/users/autocomplete?q=admin`, null, 200, 'User Autocomplete (Admin)');
    if (autocompleteRes && autocompleteRes.results && autocompleteRes.results.length > 0) {
        logSuccess('User Autocomplete: Found results');
    } else {
        console.log(`${colors.yellow}⚠️ User Autocomplete: No results found${colors.reset}`);
    }

    // Integrations (Slackbot) - expect 200 even with error text (controller logic)
    const slackRes = await testEndpoint('admin', 'POST', '/integrations/slackbot/events', {
        token: 'test-token',
        text: 'Bangalore'
    }, 200, 'Slackbot Event');
    if (slackRes && slackRes.text) {
        logSuccess(`Slackbot Response: ${slackRes.text}`);
    }

    // Social Auth (Placeholder)
    await testEndpoint('member', 'POST', '/auth/google/token', { token: 'abc' }, 501, 'Social Auth (Expected 501 Not Implemented)');

    logHeader('All Tests Completed');
};

runTests();
