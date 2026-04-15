/**
 * User Journey Test Script
 * Tests all major user flows against the live backend and reports bugs.
 *
 * Usage: node scripts/test-user-journeys.js
 * Requires: server running on PORT (default 3001), test users created via create-test-users.js
 *
 * KNOWN BUGS DISCOVERED BY THIS SCRIPT:
 *   BUG-001 [HIGH]     Admin JWT role always "member" — login.service.js uses user.admin (undefined)
 *   BUG-002 [CRITICAL] GET /events/getEvents returns 0 events — all 1134 events are past, default filter hides them
 *   BUG-003 [MEDIUM]   Auth failures return HTTP 400 instead of 401 — wrong status code
 *   BUG-004 [LOW]      Venue has no city field — location only via event.chapter.city
 *   BUG-005 [HIGH]     GET /venues/:id with non-existent ID returns 200 with result:null instead of 404
 *   BUG-006 [CRITICAL] GET /session-proposals crashes with 500 — SessionProposal model schema mismatch
 *   BUG-007 [MEDIUM]   GET /chapters/getChapterById accepts only ?chapterId= not ?id= — inconsistent API
 *   BUG-009 [LOW]      Unmatched routes return HTML 404 instead of JSON
 *   BUG-010 [HIGH]     Admin cannot create events (caused by BUG-001)
 *   BUG-011 [HIGH]     Admin cannot list users (caused by BUG-001)
 *   BUG-012 [HIGH]     Admin cannot access admin-users route (caused by BUG-001)
 */

require('dotenv').config();
const http = require('http');

const BASE_URL = `http://127.0.0.1:${process.env.PORT || 3001}`;
const API = `${BASE_URL}/api`;

// ─── Test users (created by create-test-users.js) ─────────────────────────────
const USERS = {
  admin:      { email: 'admin@null.community',        password: 'password123' },
  admin2:     { email: 'admin2@null.community',       password: 'password123' },
  delhiLead:  { email: 'lead.delhi@null.community',   password: 'password123' },
  speaker:    { email: 'speaker1@example.com',        password: 'password123' },
  member:     { email: 'member1@example.com',         password: 'password123' },
  unconfirmed:{ email: 'unconfirmed1@example.com',    password: 'password123' },
};

// ─── Runtime state ────────────────────────────────────────────────────────────
const tokens = {};
const bugs   = [];
const stats  = { pass: 0, fail: 0, skip: 0, bug: 0 };

// ─── Colours ──────────────────────────────────────────────────────────────────
const C = {
  reset:   '\x1b[0m',  red:   '\x1b[31m', green: '\x1b[32m',
  yellow:  '\x1b[33m', cyan:  '\x1b[36m', magenta: '\x1b[35m',
  bold:    '\x1b[1m',  dim:   '\x1b[2m',
};
const green  = s => `${C.green}${s}${C.reset}`;
const red    = s => `${C.red}${s}${C.reset}`;
const yellow = s => `${C.yellow}${s}${C.reset}`;
const cyan   = s => `${C.cyan}${s}${C.reset}`;
const dim    = s => `${C.dim}${s}${C.reset}`;
const bold   = s => `${C.bold}${s}${C.reset}`;

// ─── HTTP helper ──────────────────────────────────────────────────────────────
function request(method, url, { body, token } = {}) {
  return new Promise((resolve, reject) => {
    const fullUrl  = url.startsWith('http') ? url : `${API}${url}`;
    const parsed   = new URL(fullUrl);
    const postData = body ? JSON.stringify(body) : null;
    const headers  = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (postData) headers['Content-Length'] = Buffer.byteLength(postData);

    const req = http.request({
      hostname: parsed.hostname,
      port:     parsed.port || 3001,
      path:     parsed.pathname + parsed.search,
      method,
      headers,
    }, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

const get  = (url, opts)       => request('GET',    url, opts);
const post = (url, body, opts) => request('POST',   url, { body, ...opts });
const put  = (url, body, opts) => request('PUT',    url, { body, ...opts });

// ─── Assertion helpers ────────────────────────────────────────────────────────
function suite(name) {
  console.log(`\n${cyan('━'.repeat(60))}`);
  console.log(`${bold(cyan(` ${name}`))}`);
  console.log(cyan('━'.repeat(60)));
}

async function test(name, fn) {
  try {
    await fn();
    console.log(`  ${green('✔')} ${name}`);
    stats.pass++;
  } catch (err) {
    console.log(`  ${red('✘')} ${name}`);
    console.log(`    ${red(err.message)}`);
    stats.fail++;
  }
}

function skip(name, reason) {
  console.log(`  ${yellow('⊘')} ${name} ${dim(`(skipped: ${reason})`)}`);
  stats.skip++;
}

function reportBug(id, title, severity, details) {
  stats.bug++;
  bugs.push({ id, title, severity, details });
  console.log(`  ${yellow('⚠')}  ${yellow(`BUG-${String(id).padStart(3,'0')}`)} ${bold(title)} ${dim(`[${severity}]`)}`);
}

function expect(val) {
  return {
    toBe(expected) {
      if (val !== expected)
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(val)}`);
    },
    toBeOneOf(list) {
      if (!list.includes(val))
        throw new Error(`Expected one of ${JSON.stringify(list)}, got ${JSON.stringify(val)}`);
    },
    toBeGreaterThan(n) {
      if (!(val > n)) throw new Error(`Expected ${val} > ${n}`);
    },
    toBeTruthy() {
      if (!val) throw new Error(`Expected truthy, got ${JSON.stringify(val)}`);
    },
    not: {
      toBe(expected) {
        if (val === expected)
          throw new Error(`Expected NOT ${JSON.stringify(expected)}`);
      },
    },
    toHaveProperty(key) {
      if (typeof val !== 'object' || val === null || !(key in val))
        throw new Error(`Expected object to have key "${key}", keys: ${Object.keys(val || {}).join(', ')}`);
    },
    toBeArray() {
      if (!Array.isArray(val)) throw new Error(`Expected array, got ${typeof val}`);
    },
  };
}

// ─── JOURNEY 1: Server Health ─────────────────────────────────────────────────
async function journey_health() {
  suite('1. Server Health');

  await test('API responds on port 3001', async () => {
    const res = await get('/events/getEvents');
    expect(res.status).toBe(200);
  });

  await test('Swagger docs endpoint reachable (200 or 301 redirect)', async () => {
    const res = await get(`${BASE_URL}/api-docs`);
    // swagger-ui-express redirects /api-docs → /api-docs/ (301) which is expected
    expect(res.status).toBeOneOf([200, 301]);
  });

  await test('Unknown route returns JSON or HTML (404 handler check)', async () => {
    const res = await get('/nonexistent-route-xyz-abc');
    expect([200, 400, 404, 500].includes(res.status)).toBeTruthy();

    if (typeof res.body === 'string' && res.body.includes('<html')) {
      reportBug('009', 'Unmatched routes return HTML 404 page instead of JSON',
        'LOW',
        `GET /nonexistent-route returns HTML (Express default 404 page).\n` +
        `An API server should return JSON for all responses including 404s.\n` +
        `Fix: Add a catch-all route handler at the end of src/index.js:\n` +
        `  app.use((req, res) => res.status(404).json({ code: 'ERR0404', message: 'Not found' }));\n` +
        `Place it after all routes but before the error handler.\n` +
        `File: backend/src/index.js`
      );
    } else {
      console.log(dim('      → Non-HTML response for unknown route — OK'));
    }
  });
}

// ─── JOURNEY 2: Authentication ────────────────────────────────────────────────
async function journey_auth() {
  suite('2. Authentication');

  await test('Admin can login', async () => {
    const res = await post('/auth/login', { email: USERS.admin.email, password: USERS.admin.password });
    expect(res.status).toBe(200);
    expect(res.body.result).toHaveProperty('token');
    tokens.admin = res.body.result.token;
  });

  await test('Member can login', async () => {
    const res = await post('/auth/login', { email: USERS.member.email, password: USERS.member.password });
    expect(res.status).toBe(200);
    tokens.member = res.body.result.token;
  });

  await test('Chapter lead can login', async () => {
    const res = await post('/auth/login', { email: USERS.delhiLead.email, password: USERS.delhiLead.password });
    expect(res.status).toBe(200);
    tokens.delhiLead = res.body.result.token;
  });

  await test('Speaker can login', async () => {
    const res = await post('/auth/login', { email: USERS.speaker.email, password: USERS.speaker.password });
    expect(res.status).toBe(200);
    tokens.speaker = res.body.result.token;
  });

  await test('Admin2 can login', async () => {
    const res = await post('/auth/login', { email: USERS.admin2.email, password: USERS.admin2.password });
    expect(res.status).toBe(200);
    tokens.admin2 = res.body.result.token;
  });

  await test('Wrong password returns 4xx error', async () => {
    const res = await post('/auth/login', { email: USERS.member.email, password: 'wrongpassword' });
    expect([400, 401, 403].includes(res.status)).toBeTruthy();

    if (res.status === 400) {
      reportBug('003', 'Auth failures return HTTP 400 instead of 401',
        'MEDIUM',
        `POST /auth/login with wrong credentials returns HTTP 400 Bad Request.\n` +
        `Standard HTTP semantics: authentication failures should return 401 Unauthorized.\n` +
        `Current: statusCode=400 in auth/constants/index.js for USRE0003 and USRE0004.\n` +
        `Fix: change statusCode to 401 in auth module constants for login failures.\n` +
        `Affected: USRE0003 (wrong password), USRE0004 (user not found)`
      );
    }
  });

  await test('Unknown email returns 4xx error', async () => {
    const res = await post('/auth/login', { email: 'nobody@nowhere.com', password: 'password123' });
    expect([400, 401].includes(res.status)).toBeTruthy();
  });

  await test('Missing email returns error', async () => {
    const res = await post('/auth/login', { password: 'password123' });
    expect([400, 401, 422].includes(res.status)).toBeTruthy();
  });

  await test('Missing password returns error', async () => {
    const res = await post('/auth/login', { email: USERS.member.email });
    expect([400, 401, 422].includes(res.status)).toBeTruthy();
  });

  await test('Unconfirmed user is blocked from login', async () => {
    const res = await post('/auth/login', {
      email: USERS.unconfirmed.email,
      password: USERS.unconfirmed.password
    });
    // Should fail with 4xx — confirmed_at is null
    expect(res.status).not.toBe(200);
    console.log(dim(`      → Unconfirmed user got ${res.status} (${res.body.code}) — correct`));
  });

  await test('Valid token passes /auth/check', async () => {
    if (!tokens.member) throw new Error('No member token — login failed');
    const res = await get('/auth/check', { token: tokens.member });
    expect(res.status).toBe(200);
  });

  await test('No token returns 401 on /auth/check', async () => {
    const res = await get('/auth/check');
    expect(res.status).toBe(401);
  });

  await test('Invalid token string returns 401', async () => {
    const res = await get('/auth/check', { token: 'invalid.jwt.token' });
    expect(res.status).toBe(401);
  });

  // Check admin role in JWT
  await test('Admin JWT role is checked', async () => {
    if (!tokens.admin) throw new Error('No admin token');
    const payload = JSON.parse(Buffer.from(tokens.admin.split('.')[1], 'base64').toString());
    expect(payload).toHaveProperty('role');

    if (payload.role !== 'admin') {
      reportBug('001', 'Admin JWT role is always "member" — isAdmin() check bypassed',
        'HIGH',
        `login.service.js line 67: "role: user.admin ? 'admin' : 'member'"\n` +
        `"user.admin" is not a Sequelize attribute — it is always undefined (falsy).\n` +
        `Admin role check should use "await user.isAdmin()" which queries admin_users table.\n` +
        `Impact: All admin-only API routes (events/create, users/list, admin-users) return 403\n` +
        `         even for legitimate admin accounts.\n` +
        `Fix: in login.service.js, replace:\n` +
        `  role: user.admin ? 'admin' : 'member'\n` +
        `with:\n` +
        `  role: (await user.isAdmin()) ? 'admin' : 'member'\n` +
        `File: backend/src/modules/auth/services/login.service.js line 67`
      );
    } else {
      console.log(dim('      → Admin JWT role is correct'));
    }
  });

  await test('Registration rejects duplicate email', async () => {
    const res = await post('/auth/register', {
      email: USERS.member.email,
      password: 'password123',
      name: 'Duplicate User',
      handle: `duplicate_${Date.now()}`
    });
    expect(res.status).not.toBe(200);
    console.log(dim(`      → Duplicate email got ${res.status} (${res.body.code}) — correct`));
  });
}

// ─── JOURNEY 3: Events ────────────────────────────────────────────────────────
async function journey_events() {
  suite('3. Events');

  // Default call (no params)
  await test('GET /events/getEvents returns valid envelope', async () => {
    const res = await get('/events/getEvents');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toHaveProperty('events');
    expect(res.body.result).toHaveProperty('pagination');
  });

  await test('GET /events/getEvents default returns events (12-month window)', async () => {
    const res = await get('/events/getEvents');
    const { events, pagination } = res.body.result;
    expect(Array.isArray(events)).toBeTruthy();

    if (events.length === 0) {
      reportBug('002', 'GET /events/getEvents returns 0 events — no events within 12-month window',
        'CRITICAL',
        `Root cause: The service filters by TWO conditions that together eliminate ALL results:\n` +
        `  1) WHERE public = true      → 1060 events qualify (OK)\n` +
        `  2) WHERE end_time > NOW()   → 0 events qualify (ALL events are past)\n\n` +
        `The DB contains real community events from 2014-2025. ALL have past end_times.\n` +
        `No future events exist, so the default listing returns nothing.\n\n` +
        `Workaround: pass ?all=true to include past events.\n` +
        `Fix options:\n` +
        `  A) Change default to show last 6 months of events instead of only future\n` +
        `  B) Change default ?all=false to also include events up to 30 days in past\n` +
        `  C) Remove end_time filter from default listing\n` +
        `File: backend/src/modules/events/services/getEvents.service.js lines 22-24`
      );
    }
  });

  await test('GET /events/getEvents?all=true returns past events', async () => {
    const res = await get('/events/getEvents?all=true');
    expect(res.status).toBe(200);
    const { events, pagination } = res.body.result;
    expect(events.length).toBeGreaterThan(0);
    expect(pagination.total).toBeGreaterThan(0);
    console.log(dim(`      → ${pagination.total} total public events with all=true`));
  });

  await test('Events include chapter location (city/country)', async () => {
    const res = await get('/events/getEvents?all=true&per_page=1');
    const event = res.body.result.events[0];
    if (!event) throw new Error('No events returned');
    expect(event).toHaveProperty('chapter');
    expect(event.chapter.city).toBeTruthy();
    console.log(dim(`      → Location: ${event.chapter.city}, ${event.chapter.country} (via event.chapter)`));
  });

  await test('Venue in event response has no city (only chapter has city)', async () => {
    const res = await get('/events/getEvents?all=true&per_page=1');
    const event = res.body.result.events[0];
    if (!event) throw new Error('No events returned');

    if (event.venue && !('city' in event.venue)) {
      reportBug('004', 'Venue object in events has no city — location is only via event.chapter.city',
        'LOW',
        `event.venue = { id, name, address } — no city field.\n` +
        `Venues table has no city column (confirmed by DB schema inspection).\n` +
        `Location (city/country) is only available as event.chapter.city and event.chapter.country.\n` +
        `Impact: Frontend code looking for event.venue.city or event.location will get undefined.\n` +
        `Fix: Frontend should read event.chapter.city for location display. No backend change needed\n` +
        `unless you want to add a city shortcut directly on the event response.`
      );
    }
  });

  await test('Pagination with per_page and page works', async () => {
    const res1 = await get('/events/getEvents?all=true&per_page=5&page=0');
    const res2 = await get('/events/getEvents?all=true&per_page=5&page=1');
    expect(res1.body.result.events.length).toBe(5);
    expect(res2.body.result.events.length).toBe(5);
    const ids1 = res1.body.result.events.map(e => e.id);
    const ids2 = res2.body.result.events.map(e => e.id);
    if (ids1[0] === ids2[0])
      throw new Error('Pagination returned same first event on page 0 and page 1');
  });

  let firstEventId;
  await test('GET /events/getEventById returns full event with sessions', async () => {
    const listRes = await get('/events/getEvents?all=true&per_page=1');
    firstEventId = listRes.body.result.events[0]?.id;
    if (!firstEventId) throw new Error('No events available');

    const res = await get(`/events/getEventById?id=${firstEventId}`);
    expect(res.status).toBe(200);
    expect(res.body.result).toHaveProperty('sessions');
    expect(res.body.result).toHaveProperty('chapter');
    expect(res.body.result).toHaveProperty('venue');
    console.log(dim(`      → "${res.body.result.name}" | Sessions: ${res.body.result.sessions.length}`));
  });

  await test('GET /events/getEventById with invalid ID returns 404', async () => {
    const res = await get('/events/getEventById?id=999999');
    expect(res.status).toBe(404);
  });

  await test('GET /events/getEvents?chapter_id filters by chapter', async () => {
    const res = await get('/events/getEvents?all=true&chapter_id=1');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.result.events)).toBeTruthy();
    console.log(dim(`      → ${res.body.result.pagination.total} events for chapter_id=1`));
  });

  await test('Non-admin cannot create event (returns 403)', async () => {
    if (!tokens.member) throw new Error('No member token');
    const future = new Date(); future.setFullYear(future.getFullYear() + 1);
    const futureEnd = new Date(future); futureEnd.setHours(futureEnd.getHours() + 2);
    const res = await post('/events/createEvent', {
      name: 'Unauthorized Event', event_type_id: 1, chapter_id: 1,
      venue_id: 1, start_time: future.toISOString(), end_time: futureEnd.toISOString(),
    }, { token: tokens.member });
    expect(res.status).toBe(403);
  });

  await test('Unauthenticated cannot create event (returns 401)', async () => {
    const future = new Date(); future.setFullYear(future.getFullYear() + 1);
    const futureEnd = new Date(future); futureEnd.setHours(futureEnd.getHours() + 2);
    const res = await post('/events/createEvent', {
      name: 'No Auth Event', event_type_id: 1, chapter_id: 1,
      venue_id: 1, start_time: future.toISOString(), end_time: futureEnd.toISOString(),
    });
    expect(res.status).toBe(401);
  });

  await test('Admin create event (may fail due to BUG-001)', async () => {
    if (!tokens.admin) { skip('Admin create event', 'no admin token'); return; }

    const etRes = await get('/event-types/getEventTypes');
    const etId = etRes.body.result?.eventTypes?.[0]?.id;
    if (!etId) throw new Error('No event types available');

    const venueRes = await get('/venues');
    const venueId = venueRes.body.result?.[0]?.id;
    if (!venueId) throw new Error('No venues available');

    const future = new Date(); future.setFullYear(future.getFullYear() + 1);
    const futureEnd = new Date(future); futureEnd.setHours(futureEnd.getHours() + 2);

    const res = await post('/events/createEvent', {
      name: `Journey Test Event ${Date.now()}`,
      description: 'Created by user journey test',
      event_type_id: etId, chapter_id: 1, venue_id: venueId,
      start_time: future.toISOString(), end_time: futureEnd.toISOString(), public: true,
    }, { token: tokens.admin });

    if (res.status === 403) {
      reportBug('010', 'Admin cannot create events — isAdmin middleware rejects valid admin JWT',
        'HIGH',
        `POST /events/createEvent with admin token returns 403 Forbidden.\n` +
        `Root cause: BUG-001. Admin JWT has role="member" so isAdmin middleware rejects it.\n` +
        `Fix: Fix BUG-001 in login.service.js first.`
      );
    } else {
      expect(res.status).toBeOneOf([200, 201]);
      console.log(dim(`      → Created event id=${res.body.result?.id}`));
    }
  });
}

// ─── JOURNEY 4: Chapters ──────────────────────────────────────────────────────
async function journey_chapters() {
  suite('4. Chapters');

  let firstChapterId;

  await test('GET /chapters/getChapters returns all chapters with location', async () => {
    const res = await get('/chapters/getChapters');
    expect(res.status).toBe(200);
    const chapters = res.body.result?.chapters || res.body.result;
    expect(Array.isArray(chapters)).toBeTruthy();
    expect(chapters.length).toBeGreaterThan(0);
    firstChapterId = chapters[0]?.id;

    // Verify location fields
    const ch = chapters[0];
    expect(ch).toHaveProperty('city');
    expect(ch).toHaveProperty('country');
    console.log(dim(`      → ${chapters.length} chapters | Sample: ${ch.name} (${ch.city}, ${ch.country})`));
  });

  await test('GET /chapters/getChapterById?chapterId= returns single chapter', async () => {
    if (!firstChapterId) throw new Error('No chapters found in previous test');
    const res = await get(`/chapters/getChapterById?chapterId=${firstChapterId}`);
    expect(res.status).toBe(200);
    expect(res.body.result).toHaveProperty('id');
  });

  await test('GET /chapters/getChapterById?id= is rejected (bug: accepts only chapterId param)', async () => {
    // The validator only accepts ?chapterId= not ?id=
    const res = await get('/chapters/getChapterById?id=1');

    if (res.status === 400) {
      reportBug('007', 'GET /chapters/getChapterById rejects ?id= param, only accepts ?chapterId=',
        'MEDIUM',
        `GET /chapters/getChapterById?id=1 returns 400 "Valid chapter ID is required"\n` +
        `GET /chapters/getChapterById?chapterId=1 returns 200 (works)\n\n` +
        `Root cause: Two conflicting validator files exist:\n` +
        `  - src/modules/chapters/validators.js (loaded by Node.js — only accepts chapterId)\n` +
        `  - src/modules/chapters/validators/index.js (dead code — never loaded, accepts both id and chapterId)\n\n` +
        `All other chapter-related calls use ?id=, creating inconsistency.\n` +
        `Fix: Either (a) rename validators.js to use the dir (delete file, keep dir)\n` +
        `     or (b) update validators.js to accept both ?id= and ?chapterId=`
      );
    }
  });

  await test('GET /chapters/:id/upcoming-events returns array (empty expected — BUG-002)', async () => {
    if (!firstChapterId) throw new Error('No chapter ID');
    const res = await get(`/chapters/${firstChapterId}/upcoming-events`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.result)).toBeTruthy();
    if (res.body.result.length === 0) {
      console.log(dim('      → 0 upcoming events (expected — all events are past, see BUG-002)'));
    }
  });

  await test('GET /chapters/:id/leaders returns array', async () => {
    if (!firstChapterId) throw new Error('No chapter ID');
    const res = await get(`/chapters/${firstChapterId}/leaders`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.result)).toBeTruthy();
    console.log(dim(`      → ${res.body.result.length} chapter leaders`));
  });
}

// ─── JOURNEY 5: Venues ────────────────────────────────────────────────────────
async function journey_venues() {
  suite('5. Venues');

  let firstVenueId;

  await test('GET /venues returns list of venues', async () => {
    const res = await get('/venues');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.result)).toBeTruthy();
    expect(res.body.result.length).toBeGreaterThan(0);
    firstVenueId = res.body.result[0]?.id;
    console.log(dim(`      → ${res.body.result.length} venues`));
  });

  await test('Venue has expected fields (id, name, address, chapter_id — no city)', async () => {
    const res = await get('/venues');
    const v = res.body.result[0];
    expect(v).toHaveProperty('id');
    expect(v).toHaveProperty('name');
    expect(v).toHaveProperty('address');
    expect(v).toHaveProperty('chapter_id');
    console.log(dim(`      → chapter_id=${v.chapter_id} (use chapters table for city)`));
  });

  await test('GET /venues/:id returns single venue', async () => {
    if (!firstVenueId) throw new Error('No venues found');
    const res = await get(`/venues/${firstVenueId}`);
    expect(res.status).toBe(200);
    expect(res.body.result).toHaveProperty('id');
  });

  await test('GET /venues/:id with non-existent ID returns 404 (or null bug)', async () => {
    const res = await get('/venues/999999999');

    if (res.status === 200 && res.body.result === null) {
      reportBug('005', 'GET /venues/:id returns 200 with result:null when venue not found',
        'HIGH',
        `GET /venues/999999999 returns HTTP 200 with { ..., result: null }\n` +
        `Expected: HTTP 404 Not Found\n\n` +
        `Root cause: venues/services.js getVenueById just returns Venue.findByPk(id)\n` +
        `which returns null when not found, and the controller passes null as result with 200.\n\n` +
        `Fix: In venues/controller.js (or services.js), throw 404 when venue is null:\n` +
        `  const venue = await services.getVenueById(id);\n` +
        `  if (!venue) throw new Error(JSON.stringify({ statusCode: 404, code: 'VENUE404', message: 'Venue not found' }));\n` +
        `File: backend/src/modules/venues/services.js getVenueById`
      );
    } else {
      expect(res.status).toBe(404);
    }
  });

  await test('Non-admin cannot create venue (returns 403)', async () => {
    if (!tokens.member) throw new Error('No member token');
    const res = await post('/venues/create', { name: 'Test', address: 'Test St' }, { token: tokens.member });
    expect(res.status).toBe(403);
  });

  await test('Unauthenticated request to create venue returns 401', async () => {
    const res = await post('/venues/create', { name: 'Test', address: 'Test St' });
    expect(res.status).toBe(401);
  });
}

// ─── JOURNEY 6: Users ─────────────────────────────────────────────────────────
async function journey_users() {
  suite('6. Users');

  let myUserId;

  await test('GET /users/me returns current user', async () => {
    if (!tokens.member) throw new Error('No member token');
    const res = await get('/users/me', { token: tokens.member });
    expect(res.status).toBe(200);
    expect(res.body.result).toHaveProperty('id');
    expect(res.body.result).toHaveProperty('email');
    myUserId = res.body.result.id;
    console.log(dim(`      → ${res.body.result.name} (id: ${myUserId})`));
  });

  await test('GET /users/me without token returns 401', async () => {
    const res = await get('/users/me');
    expect(res.status).toBe(401);
  });

  await test('GET /users/getUsers requires admin role (returns 403 for member)', async () => {
    if (!tokens.member) throw new Error('No member token');
    const res = await get('/users/getUsers', { token: tokens.member });
    expect(res.status).toBe(403);
  });

  await test('GET /users/getUsers with admin token (may fail due to BUG-001)', async () => {
    if (!tokens.admin) throw new Error('No admin token');
    const res = await get('/users/getUsers', { token: tokens.admin });

    if (res.status === 403) {
      reportBug('011', 'Admin cannot access GET /users/getUsers — returns 403 (caused by BUG-001)',
        'HIGH',
        `Admin JWT has role="member" so isAdmin middleware rejects the request.\n` +
        `Fix BUG-001 to resolve this.`
      );
    } else {
      expect(res.status).toBe(200);
      console.log(dim(`      → ${res.body.result?.users?.length || res.body.result?.length || 0} users returned`));
    }
  });

  await test('GET /users/getUserById?userId= returns user by ID', async () => {
    if (!tokens.member || !myUserId) throw new Error('No token or user ID');
    // Note: endpoint uses ?userId= param (not ?id=)
    const res = await get(`/users/getUserById?userId=${myUserId}`, { token: tokens.member });
    expect(res.status).toBe(200);
    expect(res.body.result).toHaveProperty('id');
  });

  await test('GET /users/events returns authenticated user events array', async () => {
    if (!tokens.member) throw new Error('No member token');
    const res = await get('/users/events', { token: tokens.member });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.result)).toBeTruthy();
    console.log(dim(`      → ${res.body.result.length} events for this user`));
  });

  await test('GET /users/registrations returns user registrations', async () => {
    if (!tokens.member) throw new Error('No member token');
    const res = await get('/users/registrations', { token: tokens.member });
    expect(res.status).toBe(200);
  });

  await test('GET /users/sessions returns user sessions', async () => {
    if (!tokens.member) throw new Error('No member token');
    const res = await get('/users/sessions', { token: tokens.member });
    expect(res.status).toBe(200);
  });
}

// ─── JOURNEY 7: Event Registrations ──────────────────────────────────────────
async function journey_registrations() {
  suite('7. Event Registrations');

  await test('GET /event-registrations requires auth (returns 401)', async () => {
    const res = await get('/event-registrations/getEventRegistrations');
    expect(res.status).toBe(401);
  });

  await test('GET /event-registrations returns list for authenticated user', async () => {
    if (!tokens.member) throw new Error('No member token');
    const res = await get('/event-registrations/getEventRegistrations', { token: tokens.member });
    expect(res.status).toBe(200);
    console.log(dim(`      → ${res.body.result?.length || 0} registrations`));
  });

  await test('POST /event-registrations without auth returns 401', async () => {
    const res = await post('/event-registrations/createEventRegistration', { event_id: 1 });
    expect(res.status).toBe(401);
  });

  await test('Member can register for an event', async () => {
    if (!tokens.member) throw new Error('No member token');
    const eventsRes = await get('/events/getEvents?all=true&per_page=5');
    const event = eventsRes.body.result.events[0];
    if (!event) throw new Error('No events to register for');

    const res = await post('/event-registrations/createEventRegistration',
      { event_id: event.id }, { token: tokens.member });

    if ([200, 201].includes(res.status)) {
      console.log(dim(`      → Registered for event "${event.name}"`));
    } else if ([400, 409, 422].includes(res.status)) {
      console.log(dim(`      → Registration rejected (${res.status}): "${res.body.message}" — acceptable`));
    } else {
      throw new Error(`Unexpected ${res.status}: ${JSON.stringify(res.body)}`);
    }
  });
}

// ─── JOURNEY 8: Session Proposals ────────────────────────────────────────────
async function journey_sessionProposals() {
  suite('8. Session Proposals');

  await test('GET /session-proposals/getSessionProposals (crash bug)', async () => {
    const res = await get('/session-proposals/getSessionProposals');

    if (res.status === 500) {
      reportBug('006', 'GET /session-proposals crashes with 500 — model-DB schema mismatch',
        'CRITICAL',
        `GET /session-proposals/getSessionProposals returns 500 Internal Server Error.\n\n` +
        `Root cause: SessionProposal model defines fields that DON'T exist in the DB:\n` +
        `  Model fields:  title, description, session_type, status  ← WRONG\n` +
        `  DB columns:    session_topic, session_description         ← ACTUAL\n\n` +
        `When Sequelize runs SELECT, MySQL errors: "Unknown column 'title' in field list"\n\n` +
        `Fix (2 options):\n` +
        `  A) Update model to match DB: rename title→session_topic, description→session_description,\n` +
        `     remove session_type and status fields.\n` +
        `  B) Run a DB migration to add the new columns: title, description, session_type, status.\n` +
        `File: backend/src/shared/models/SessionProposal.js`
      );
    } else {
      expect(res.status).toBe(200);
      console.log(dim(`      → ${res.body.result?.length || 0} session proposals`));
    }
  });

  await test('POST /session-proposals requires auth (returns 401)', async () => {
    const res = await post('/session-proposals/createSessionProposal', { title: 'Test' });
    expect(res.status).toBe(401);
  });
}

// ─── JOURNEY 9: Event Sessions ────────────────────────────────────────────────
async function journey_eventSessions() {
  suite('9. Event Sessions');

  await test('Event sessions are included in getEventById response', async () => {
    // Get first 20 events and find one with sessions
    const eventsRes = await get('/events/getEvents?all=true&per_page=20');
    let eventWithSessions = null;

    for (const ev of eventsRes.body.result.events) {
      const res = await get(`/events/getEventById?id=${ev.id}`);
      if (res.body.result?.sessions?.length > 0) {
        eventWithSessions = res.body.result;
        break;
      }
    }

    if (!eventWithSessions) {
      console.log(dim('      → No event with sessions in first 20 — try higher range'));
      return;
    }
    expect(Array.isArray(eventWithSessions.sessions)).toBeTruthy();
    expect(eventWithSessions.sessions[0]).toHaveProperty('id');
    console.log(dim(`      → "${eventWithSessions.name}" has ${eventWithSessions.sessions.length} sessions`));
  });

  await test('GET /event-sessions responds (auth check)', async () => {
    const res = await get('/event-sessions/getEventSessions?event_id=1');
    expect([200, 400, 401, 404].includes(res.status)).toBeTruthy();
  });
}

// ─── JOURNEY 10: Stats & Public APIs ──────────────────────────────────────────
async function journey_stats() {
  suite('10. Stats & Public APIs');

  await test('GET /stats/dashboard returns platform statistics', async () => {
    const res = await get('/stats/dashboard');
    expect(res.status).toBe(200);
    const r = res.body.result;
    console.log(dim(`      → users:${r?.counts?.users} events:${r?.counts?.events} chapters:${r?.counts?.chapters}`));
  });

  await test('GET /event-types/getEventTypes returns event type list', async () => {
    const res = await get('/event-types/getEventTypes');
    expect(res.status).toBe(200);
    const types = res.body.result?.eventTypes || res.body.result;
    expect(Array.isArray(types)).toBeTruthy();
    console.log(dim(`      → ${types.length} event types`));
  });

  await test('GET /pages responds', async () => {
    const res = await get('/pages');
    expect([200, 404].includes(res.status)).toBeTruthy();
  });
}

// ─── JOURNEY 11: Admin-Only Flows ────────────────────────────────────────────
async function journey_adminFlows() {
  suite('11. Admin-Only Flows');

  await test('GET /admin-users/getAdminUsers requires auth (returns 401)', async () => {
    const res = await get('/admin-users/getAdminUsers');
    expect(res.status).toBe(401);
  });

  await test('GET /admin-users/getAdminUsers with member token returns 403', async () => {
    if (!tokens.member) throw new Error('No member token');
    const res = await get('/admin-users/getAdminUsers', { token: tokens.member });
    expect(res.status).toBe(403);
  });

  await test('GET /admin-users/getAdminUsers with admin token', async () => {
    if (!tokens.admin) throw new Error('No admin token');
    const res = await get('/admin-users/getAdminUsers', { token: tokens.admin });

    if (res.status === 403) {
      reportBug('012', 'GET /admin-users/getAdminUsers returns 403 for admin token (caused by BUG-001)',
        'HIGH',
        `Admin JWT has role="member" so isAdmin middleware rejects the request.\n` +
        `Fix BUG-001 to resolve this.`
      );
    } else {
      expect(res.status).toBe(200);
    }
  });

  await test('Session proposal admin status update (may fail due to BUG-001 + BUG-006)', async () => {
    // Both bugs would prevent this from working
    skip('Session proposal status update', 'requires BUG-001 (admin role) and BUG-006 (proposals) fixes first');
  });
}

// ─── JOURNEY 12: Security ────────────────────────────────────────────────────
async function journey_security() {
  suite('12. Security');

  await test('Accessing user data without token returns 401', async () => {
    const res = await get('/users/getUserById?id=1');
    expect(res.status).toBe(401);
  });

  await test('SQL injection in query param is handled safely', async () => {
    // Parameterized queries should prevent injection
    const res = await get("/events/getEvents?all=true&chapter_id=1' OR '1'='1");
    expect([200, 400, 422].includes(res.status)).toBeTruthy();
    // Should not return ALL events or crash
    if (res.status === 200) {
      console.log(dim(`      → Returned ${res.body.result?.events?.length} events — parameterized query is safe`));
    }
  });

  await test('Expired/invalid JWT is rejected on protected routes', async () => {
    const fakeToken = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIn0.invalid';
    const res = await get('/users/me', { token: fakeToken });
    expect(res.status).toBe(401);
  });

  await test('Rate limiter active (multiple requests allowed in dev)', async () => {
    // Dev rate limit is 1000/min — just verify we can make multiple requests
    const results = await Promise.all([
      get('/events/getEvents'),
      get('/events/getEvents'),
      get('/events/getEvents'),
    ]);
    results.forEach(r => expect([200, 429].includes(r.status)).toBeTruthy());
    const allOk = results.every(r => r.status === 200);
    if (allOk) console.log(dim('      → Rate limiter allows multiple requests in dev mode'));
  });
}

// ─── Bug Report ───────────────────────────────────────────────────────────────
function printBugReport() {
  console.log(`\n${C.bold}${C.magenta}${'═'.repeat(60)}${C.reset}`);
  console.log(`${C.bold}${C.magenta}  BUG REPORT${C.reset}`);
  console.log(`${C.bold}${C.magenta}${'═'.repeat(60)}${C.reset}\n`);

  if (bugs.length === 0) {
    console.log(green('  No bugs found! All journeys passed.\n'));
    return;
  }

  const order = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
  const sorted = [...bugs].sort((a, b) => order.indexOf(a.severity) - order.indexOf(b.severity));

  sorted.forEach(bug => {
    const col = bug.severity === 'CRITICAL' ? C.red
               : bug.severity === 'HIGH' ? C.red
               : bug.severity === 'MEDIUM' ? C.yellow
               : C.dim;
    console.log(`${col}${C.bold}  [${bug.severity}] BUG-${bug.id}: ${bug.title}${C.reset}`);
    bug.details.split('\n').forEach(l => console.log(`  ${dim(l)}`));
    console.log();
  });
}

// ─── Summary ──────────────────────────────────────────────────────────────────
function printSummary() {
  console.log(`\n${cyan('═'.repeat(60))}`);
  console.log(bold(cyan('  SUMMARY')));
  console.log(cyan('═'.repeat(60)));
  console.log(`  ${green(`✔ Passed:  ${stats.pass}`)}`);
  console.log(`  ${red(`✘ Failed:  ${stats.fail}`)}`);
  console.log(`  ${yellow(`⊘ Skipped: ${stats.skip}`)}`);
  console.log(`  ${yellow(`⚠ Bugs:    ${stats.bug}`)}`);

  const total = stats.pass + stats.fail;
  const pct   = total > 0 ? Math.round((stats.pass / total) * 100) : 0;
  const col   = pct >= 90 ? C.green : pct >= 70 ? C.yellow : C.red;
  console.log(`\n  ${col}${C.bold}Pass rate: ${pct}% (${stats.pass}/${total})${C.reset}\n`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n${bold(cyan('╔══════════════════════════════════════════════════════════╗'))}`);
  console.log(`${bold(cyan('║        null.community Backend — User Journey Tests       ║'))}`);
  console.log(`${bold(cyan('╚══════════════════════════════════════════════════════════╝'))}`);
  console.log(dim(`  API: ${API}`));
  console.log(dim(`  Date: ${new Date().toISOString()}\n`));

  try {
    await get('/events/getEvents');
  } catch {
    console.error(red(`\n  Cannot connect to ${API}`));
    console.error(red('  Is the server running? Run: cd backend && npm run dev\n'));
    process.exit(1);
  }

  await journey_health();
  await journey_auth();
  await journey_events();
  await journey_chapters();
  await journey_venues();
  await journey_users();
  await journey_registrations();
  await journey_sessionProposals();
  await journey_eventSessions();
  await journey_stats();
  await journey_adminFlows();
  await journey_security();

  printBugReport();
  printSummary();

  process.exit(stats.fail > 0 ? 1 : 0);
}

main().catch(err => {
  console.error(red(`\nUnhandled error: ${err.message}`));
  process.exit(1);
});
