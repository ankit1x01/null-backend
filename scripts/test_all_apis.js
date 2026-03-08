/**
 * Enhanced API Test Runner — captures full error detail for issue tracking
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3001';
let authToken = null;
let adminToken = null;

function request(method, urlPath, body, token) {
    return new Promise((resolve) => {
        const url = new URL(BASE_URL + urlPath);
        const isHttps = url.protocol === 'https:';
        const lib = isHttps ? https : http;
        const bodyStr = body ? JSON.stringify(body) : null;
        const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        if (bodyStr) headers['Content-Length'] = Buffer.byteLength(bodyStr);
        const options = {
            hostname: url.hostname,
            port: url.port || (isHttps ? 443 : 80),
            path: url.pathname + url.search,
            method: method.toUpperCase(),
            headers, timeout: 15000,
        };
        const req = lib.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
                let json = null;
                try { json = JSON.parse(data); } catch (_) { }
                resolve({ status: res.statusCode, body: json, raw: data.slice(0, 1000) });
            });
        });
        req.on('error', (e) => resolve({ status: 0, error: e.message }));
        req.on('timeout', () => { req.destroy(); resolve({ status: 0, error: 'TIMEOUT' }); });
        if (bodyStr) req.write(bodyStr);
        req.end();
    });
}

async function loginUser() {
    const res = await request('POST', '/api/auth/login', { email: 'testrunner@null.community', password: 'TestPass@123' });
    if (res.status === 200 && res.body?.result?.token) {
        authToken = res.body.result.token;
        console.log('✅ User login OK  → token obtained');
    } else {
        console.log(`⚠️  User login FAILED (${res.status}): ${res.raw?.slice(0, 200)}`);
    }
}

async function loginAdmin() {
    const res = await request('POST', '/api/admin-users/login', { email: 'testadmin@null.community', password: 'TestPass@123' });
    if (res.status === 200 && res.body?.result?.token) {
        adminToken = res.body.result.token;
        console.log('✅ Admin login OK  → token obtained');
        return;
    }
    console.log(`⚠️  Admin login via /admin-users FAILED (${res.status}): ${res.raw?.slice(0, 200)}`);
    const res2 = await request('POST', '/api/auth/login', { email: 'testadmin@null.community', password: 'TestPass@123' });
    if (res2.status === 200 && res2.body?.result?.token) {
        adminToken = res2.body.result.token;
        console.log('✅ Admin login OK  via /api/auth/login → token obtained');
    } else {
        console.log(`⚠️  Admin login FAILED both methods`);
    }
}

const PI = '1';
const endpoints = [
    // Admin Users
    { method: 'POST', path: '/api/admin-users/login', body: { email: 'testadmin@null.community', password: 'TestPass@123' }, auth: false, tag: 'Admin-users', name: 'AdminLogin' },
    { method: 'GET', path: '/api/admin-users/getAdminUsers', auth: 'admin', tag: 'Admin-users', name: 'GetAdminUsers' },
    { method: 'GET', path: `/api/admin-users/getAdminUserById/${PI}`, auth: 'admin', tag: 'Admin-users', name: 'GetAdminUserById' },
    // Auth
    { method: 'POST', path: '/api/auth/login', body: { email: 'testrunner@null.community', password: 'TestPass@123' }, auth: false, tag: 'Auth', name: 'Login' },
    { method: 'POST', path: '/api/auth/github/token', body: { code: 'fake_code' }, auth: false, tag: 'Auth', name: 'ProviderToken' },
    { method: 'POST', path: '/api/auth/forgot-password', body: { email: 'testrunner@null.community' }, auth: false, tag: 'Auth', name: 'ForgotPassword' },
    { method: 'POST', path: '/api/auth/reset-password', body: { token: 'faketoken', password: 'newPass123' }, auth: false, tag: 'Auth', name: 'ResetPassword' },
    { method: 'POST', path: '/api/auth/confirm-email', body: { token: 'faketoken' }, auth: false, tag: 'Auth', name: 'ConfirmEmail' },
    { method: 'POST', path: '/api/auth/resend-confirmation', body: { email: 'testrunner@null.community' }, auth: false, tag: 'Auth', name: 'ResendConfirmation' },
    { method: 'POST', path: '/api/auth/unlock-account', body: { email: 'testrunner@null.community', token: 'faketoken' }, auth: false, tag: 'Auth', name: 'UnlockAccount' },
    // Calendar
    { method: 'GET', path: '/api/calendar/global.ics', auth: false, tag: 'Calendar', name: 'GetGlobalCalendar' },
    { method: 'GET', path: `/api/calendar/chapter/${PI}.ics`, auth: false, tag: 'Calendar', name: 'GetChapterCalendar' },
    { method: 'GET', path: `/api/calendar/chapter/${PI}/info`, auth: false, tag: 'Calendar', name: 'GetChapterCalendarJson' },
    // Chapter Leads
    { method: 'GET', path: '/api/chapter-leads/getChapterLeads', auth: false, tag: 'Chapter-leads', name: 'GetChapterLeads' },
    { method: 'GET', path: `/api/chapter-leads/getChapterLeadById?id=${PI}`, auth: false, tag: 'Chapter-leads', name: 'GetChapterLeadById' },
    // Chapters
    { method: 'GET', path: '/api/chapters/getChapters', auth: false, tag: 'Chapters', name: 'GetChapters' },
    { method: 'GET', path: `/api/chapters/getChapterById?id=${PI}`, auth: false, tag: 'Chapters', name: 'GetChapterById' },
    { method: 'GET', path: `/api/chapters/${PI}/leaders`, auth: false, tag: 'Chapters', name: 'GetChapterLeaders' },
    { method: 'GET', path: `/api/chapters/${PI}/upcoming-events`, auth: false, tag: 'Chapters', name: 'GetUpcomingEvents' },
    // Event Likes
    { method: 'GET', path: '/api/event-likes/myLikes', auth: 'user', tag: 'Event-likes', name: 'GetUserLikes' },
    { method: 'GET', path: `/api/event-likes/session/${PI}`, auth: 'user', tag: 'Event-likes', name: 'GetSessionLikes' },
    { method: 'GET', path: `/api/event-likes/session/${PI}/counts`, auth: 'user', tag: 'Event-likes', name: 'GetSessionLikeCounts' },
    { method: 'GET', path: `/api/event-likes/session/${PI}/myLike`, auth: 'user', tag: 'Event-likes', name: 'GetUserSessionLike' },
    { method: 'POST', path: `/api/event-likes/session/${PI}/toggle`, body: {}, auth: 'user', tag: 'Event-likes', name: 'ToggleLike' },
    { method: 'GET', path: `/api/event-likes/event/${PI}/topSessions`, auth: 'user', tag: 'Event-likes', name: 'GetTopLikedSessions' },
    { method: 'GET', path: `/api/event-likes/event/${PI}/engagement`, auth: 'user', tag: 'Event-likes', name: 'GetEventEngagement' },
    { method: 'POST', path: '/api/event-likes/sessions/reactions', body: { sessionIds: [1] }, auth: 'user', tag: 'Event-likes', name: 'GetSessionsReactions' },
    { method: 'POST', path: '/api/event-likes/sessions/myLikes', body: { sessionIds: [1] }, auth: 'user', tag: 'Event-likes', name: 'GetUserLikesForSessions' },
    // Event Mailer Tasks
    { method: 'GET', path: '/api/event-mailer-tasks/getMailerTasks', auth: 'admin', tag: 'Event-mailer-tasks', name: 'GetMailerTasks' },
    { method: 'GET', path: `/api/event-mailer-tasks/getMailerTaskById/${PI}`, auth: 'admin', tag: 'Event-mailer-tasks', name: 'GetMailerTaskById' },
    { method: 'GET', path: '/api/event-mailer-tasks/previewRecipients', auth: 'admin', tag: 'Event-mailer-tasks', name: 'PreviewRecipients' },
    // Event Notifications
    { method: 'GET', path: '/api/event-notifications/getNotifications', auth: 'admin', tag: 'Event-notifications', name: 'GetNotifications' },
    { method: 'GET', path: `/api/event-notifications/getNotificationById/${PI}`, auth: 'admin', tag: 'Event-notifications', name: 'GetNotificationById' },
    { method: 'GET', path: `/api/event-notifications/getByEvent/${PI}`, auth: 'admin', tag: 'Event-notifications', name: 'GetNotificationsByEvent' },
    // Event Session Comments
    { method: 'GET', path: '/api/event-session-comments/getEventSessionComments', auth: false, tag: 'Event-session-comments', name: 'GetEventSessionComments' },
    { method: 'GET', path: `/api/event-session-comments/getEventSessionCommentById/${PI}`, auth: false, tag: 'Event-session-comments', name: 'GetEventSessionCommentById' },
    // Event Sessions
    { method: 'GET', path: '/api/event-sessions/getEventSessions', auth: false, tag: 'Event-sessions', name: 'GetEventSessions' },
    { method: 'GET', path: `/api/event-sessions/getEventSessionById?id=${PI}`, auth: false, tag: 'Event-sessions', name: 'GetEventSessionById' },
    // Event Types
    { method: 'GET', path: '/api/event-types/getEventTypes', auth: false, tag: 'Event-types', name: 'GetEventTypes' },
    { method: 'GET', path: `/api/event-types/getEventTypeById?id=${PI}`, auth: false, tag: 'Event-types', name: 'GetEventTypeById' },
    // Events
    { method: 'GET', path: '/api/events/getEvents', auth: false, tag: 'Events', name: 'GetEvents' },
    { method: 'GET', path: `/api/events/getEventById?id=${PI}`, auth: false, tag: 'Events', name: 'GetEventById' },
    { method: 'GET', path: `/api/events/${PI}/calendar.ics`, auth: false, tag: 'Events', name: 'GenerateICS' },
    // Integrations
    { method: 'POST', path: '/api/integrations/slackbot/events', body: { type: 'url_verification', challenge: 'test' }, auth: false, tag: 'Integrations', name: 'HandleSlackEvents' },
    // Jobs
    { method: 'GET', path: '/api/jobs/getJobs', auth: 'admin', tag: 'Jobs', name: 'GetJobs' },
    { method: 'GET', path: '/api/jobs/stats', auth: 'admin', tag: 'Jobs', name: 'GetJobStats' },
    { method: 'GET', path: `/api/jobs/getJobById/${PI}`, auth: 'admin', tag: 'Jobs', name: 'GetJobById' },
    // Leads Portal
    { method: 'GET', path: '/api/leads-portal/chapters', auth: 'user', tag: 'Leads-portal', name: 'GetMyChapters' },
    { method: 'GET', path: '/api/leads-portal/events', auth: 'user', tag: 'Leads-portal', name: 'GetMyEvents' },
    { method: 'GET', path: '/api/leads-portal/stats', auth: 'user', tag: 'Leads-portal', name: 'GetMyStats' },
    { method: 'GET', path: '/api/leads-portal/attention', auth: 'user', tag: 'Leads-portal', name: 'GetEventsNeedingAttention' },
    { method: 'GET', path: `/api/leads-portal/events/${PI}/registrations`, auth: 'user', tag: 'Leads-portal', name: 'GetEventRegistrations' },
    { method: 'GET', path: `/api/leads-portal/events/${PI}/sessions`, auth: 'user', tag: 'Leads-portal', name: 'GetEventSessions' },
    { method: 'GET', path: `/api/leads-portal/events/${PI}/export`, auth: 'user', tag: 'Leads-portal', name: 'ExportRegistrations' },
    { method: 'GET', path: `/api/leads-portal/events/${PI}/sessions/suggest-user`, auth: 'user', tag: 'Leads-portal', name: 'SuggestUser' },
    { method: 'GET', path: `/api/leads-portal/events/${PI}/mailer-tasks`, auth: 'user', tag: 'Leads-portal', name: 'GetEventMailerTasks' },
    { method: 'GET', path: `/api/leads-portal/events/${PI}/mailer-tasks/${PI}`, auth: 'user', tag: 'Leads-portal', name: 'GetEventMailerTaskById' },
    // Mass Email
    { method: 'GET', path: '/api/mass-email/templates', auth: 'admin', tag: 'Mass-email', name: 'GetTemplates' },
    { method: 'GET', path: '/api/mass-email/campaigns', auth: 'admin', tag: 'Mass-email', name: 'GetCampaigns' },
    { method: 'GET', path: `/api/mass-email/campaigns/${PI}`, auth: 'admin', tag: 'Mass-email', name: 'GetCampaignById' },
    { method: 'GET', path: `/api/mass-email/campaigns/${PI}/stats`, auth: 'admin', tag: 'Mass-email', name: 'GetCampaignStats' },
    { method: 'GET', path: `/api/mass-email/recipients/event/${PI}`, auth: 'admin', tag: 'Mass-email', name: 'GetEventRecipients' },
    { method: 'GET', path: `/api/mass-email/recipients/chapter/${PI}`, auth: 'admin', tag: 'Mass-email', name: 'GetChapterRecipients' },
    // OAuth
    { method: 'GET', path: '/api/oauth/github', auth: false, tag: 'OAuth', name: 'GetGitHubAuthUrl' },
    { method: 'GET', path: '/api/oauth/google', auth: false, tag: 'OAuth', name: 'GetGoogleAuthUrl' },
    { method: 'POST', path: '/api/oauth/github/callback', body: { code: 'fake' }, auth: false, tag: 'OAuth', name: 'HandleGitHubCallback' },
    { method: 'POST', path: '/api/oauth/google/callback', body: { code: 'fake' }, auth: false, tag: 'OAuth', name: 'HandleGoogleCallback' },
    // Pages
    { method: 'GET', path: '/api/pages/getPages', auth: false, tag: 'Pages', name: 'GetPages' },
    { method: 'GET', path: `/api/pages/getPageById?id=${PI}`, auth: false, tag: 'Pages', name: 'GetPageById' },
    // Session Proposals
    { method: 'GET', path: '/api/session-proposals/getSessionProposals', auth: false, tag: 'Session-proposals', name: 'GetSessionProposals' },
    { method: 'GET', path: `/api/session-proposals/getSessionProposalById/${PI}`, auth: false, tag: 'Session-proposals', name: 'GetSessionProposalById' },
    // Session Requests
    { method: 'GET', path: '/api/session-requests/getSessionRequests', auth: 'user', tag: 'Session-requests', name: 'GetSessionRequests' },
    { method: 'GET', path: `/api/session-requests/getSessionRequestById/${PI}`, auth: 'user', tag: 'Session-requests', name: 'GetSessionRequestById' },
    // Slack
    { method: 'POST', path: '/api/slack/slackbot/events', body: { type: 'url_verification', challenge: 'test' }, auth: false, tag: 'Slack', name: 'SlackbotEvents' },
    { method: 'GET', path: '/api/slack/', auth: 'admin', tag: 'Slack', name: 'GetIntegrations' },
    { method: 'GET', path: `/api/slack/${PI}`, auth: 'admin', tag: 'Slack', name: 'GetIntegrationById' },
    { method: 'GET', path: `/api/slack/chapter/${PI}`, auth: 'admin', tag: 'Slack', name: 'GetIntegrationByChapter' },
    { method: 'GET', path: `/api/slack/${PI}/logs`, auth: 'admin', tag: 'Slack', name: 'GetNotificationLogs' },
    // Stats
    { method: 'GET', path: '/api/stats/dashboard', auth: 'admin', tag: 'Stats', name: 'GetDashboardStats' },
    // Twitter
    { method: 'GET', path: '/api/twitter/integrations', auth: 'admin', tag: 'Twitter', name: 'GetIntegrations' },
    { method: 'GET', path: `/api/twitter/integrations/${PI}`, auth: 'admin', tag: 'Twitter', name: 'GetIntegrationById' },
    { method: 'GET', path: '/api/twitter/history', auth: 'admin', tag: 'Twitter', name: 'GetTweetHistory' },
    // User Achievements
    { method: 'GET', path: `/api/user-achievements/${PI}`, auth: 'user', tag: 'User-achievements', name: 'GetUserAchievements' },
    // User API Tokens
    { method: 'GET', path: '/api/user-api-tokens/', auth: 'user', tag: 'User-api-tokens', name: 'GetMyTokens' },
    // User Auth Profiles
    { method: 'GET', path: '/api/user-auth-profiles/me', auth: 'user', tag: 'User-auth-profiles', name: 'GetMyProfiles' },
    // Users
    { method: 'GET', path: '/api/users/me', auth: 'user', tag: 'Users', name: 'GetMe' },
    { method: 'GET', path: '/api/users/events', auth: 'user', tag: 'Users', name: 'GetUserEvents' },
    { method: 'GET', path: '/api/users/sessions', auth: 'user', tag: 'Users', name: 'GetUserSessions' },
    { method: 'GET', path: '/api/users/registrations', auth: 'user', tag: 'Users', name: 'GetUserRegistrations' },
    { method: 'GET', path: '/api/users/getUserById', auth: false, tag: 'Users', name: 'GetUserById' },
    // Venues
    { method: 'GET', path: '/api/venues/', auth: false, tag: 'Venues', name: 'GetVenues' },
    { method: 'GET', path: `/api/venues/${PI}`, auth: false, tag: 'Venues', name: 'GetVenueById' },
];

function statusClass(s) {
    if (!s) return 'ERROR';
    if (s >= 200 && s < 300) return 'OK';
    if (s === 301 || s === 302) return 'REDIRECT';
    if (s === 400) return 'BAD_REQUEST';
    if (s === 401) return 'UNAUTHORIZED';
    if (s === 403) return 'FORBIDDEN';
    if (s === 404) return 'NOT_FOUND';
    if (s === 501) return 'NOT_IMPLEMENTED';
    if (s === 503) return 'DISABLED';
    if (s >= 500) return 'SERVER_ERROR';
    return 'OTHER';
}

function isPass(s) {
    if (!s) return false;
    return (s >= 200 && s < 500) || s === 503;
}

async function main() {
    console.log('\n🔐 Logging in...');
    await loginUser();
    await loginAdmin();
    console.log(`   User token: ${authToken ? '✅ obtained' : '❌ missing'}`);
    console.log(`   Admin token: ${adminToken ? '✅ obtained' : '❌ missing'}\n`);
    console.log('─'.repeat(110));

    const results = [];
    let passed = 0, failed = 0;

    for (const ep of endpoints) {
        const token = ep.auth === 'admin' ? adminToken : ep.auth === 'user' ? authToken : null;
        const res = await request(ep.method, ep.path, ep.body || null, token);
        const sc = statusClass(res.status);
        const pass = isPass(res.status);
        if (pass) passed++; else failed++;

        const errMsg = res.error || res.body?.message || res.body?.error || '';
        const icon = pass ? '✅' : '🔴';
        console.log(`${icon} [${(ep.method).padEnd(6)}] ${ep.path.padEnd(68)} ${String(res.status).padEnd(4)} ${sc.padEnd(14)} ${errMsg ? ('| ' + errMsg).slice(0, 50) : ''}`);

        results.push({ ...ep, status: res.status, sc, pass, errMsg, fullErr: JSON.stringify(res.body) });
    }

    console.log('─'.repeat(110));
    console.log(`\n  ✅ Passed: ${passed}   🔴 Failed: ${failed}   Total: ${results.length}\n`);

    // ─── Build Issues Document ────────────────────────────────────────────────
    const failures = results.filter(r => !r.pass);
    const now = new Date().toISOString();

    // Group by root cause
    const groups = {
        'DB_SCHEMA': [],       // Unknown column / missing migration
        'NOT_IMPLEMENTED': [],  // 501
        'ENV_DISABLED': [],     // 503 not supported in env
        'MISSING_PARAM': [],    // 500 from missing required query param
        'SERVER_ERROR': [],     // Generic 500
        'OTHER': []
    };

    for (const f of failures) {
        const m = f.errMsg + ' ' + (f.fullErr || '');
        if (m.includes('Unknown column') || m.includes('field list') || m.includes('ER_BAD_FIELD_ERROR')) {
            groups['DB_SCHEMA'].push(f);
        } else if (f.status === 501) {
            groups['NOT_IMPLEMENTED'].push(f);
        } else if (f.status === 503 || m.includes('not supported in the current env')) {
            groups['ENV_DISABLED'].push(f);
        } else if (f.status === 500) {
            groups['SERVER_ERROR'].push(f);
        } else {
            groups['OTHER'].push(f);
        }
    }

    let md = `# 🐛 API Technical Issues Report\n\n`;
    md += `**Tested:** ${now}  \n`;
    md += `**Server:** http://localhost:3001  \n`;
    md += `**Auth:** User token ${authToken ? '✅' : '❌'} · Admin token ${adminToken ? '✅' : '❌'}\n\n`;
    md += `| Metric | Count |\n|---|---|\n`;
    md += `| ✅ Passed | ${passed} |\n`;
    md += `| 🔴 Failed | ${failed} |\n`;
    md += `| Total tested | ${results.length} |\n\n`;
    md += `---\n\n`;

    // Issue 1: DB Schema
    if (groups.DB_SCHEMA.length) {
        md += `## 🔴 Issue #1 — Missing DB Columns (Pending Migrations)\n\n`;
        md += `**Root cause:** Code references columns that don't exist in the local DB. Run missing migrations.\n\n`;
        md += `| Endpoint | Error |\n|---|---|\n`;
        for (const f of groups.DB_SCHEMA) {
            md += `| \`${f.method} ${f.path}\` | \`${f.errMsg.slice(0, 100)}\` |\n`;
        }
        md += `\n**Fix:** Run \`npm run db:migrate\` or apply the missing Sequelize migration files for the affected tables.\n\n---\n\n`;
    }

    // Issue 2: 503 disabled in env
    if (groups.ENV_DISABLED.length) {
        md += `## ⚠️ Issue #2 — Features Disabled in Dev Environment (503)\n\n`;
        md += `**Root cause:** These modules check an env flag and return 503 in non-production environments. This is intentional in dev but should be documented.\n\n`;
        md += `| Endpoint | Message |\n|---|---|\n`;
        for (const f of groups.ENV_DISABLED) {
            md += `| \`${f.method} ${f.path}\` | \`${f.errMsg.slice(0, 120)}\` |\n`;
        }
        md += `\n**Fix:** Set the relevant env flags (e.g., \`ENABLE_SLACK=true\`, \`ENABLE_TWITTER=true\`, \`ENABLE_MASS_EMAIL=true\`) in \`.env\` to test these locally. No code change needed.\n\n---\n\n`;
    }

    // Issue 3: 501 Not Implemented
    if (groups.NOT_IMPLEMENTED.length) {
        md += `## 🔴 Issue #3 — Not Implemented (501)\n\n`;
        md += `**Root cause:** Handler exists in routes but returns 501, meaning it was stubbed but never implemented.\n\n`;
        md += `| Endpoint | Notes |\n|---|---|\n`;
        for (const f of groups.NOT_IMPLEMENTED) {
            md += `| \`${f.method} ${f.path}\` | Returns 501 Not Implemented |\n`;
        }
        md += `\n**Fix:** Implement the handler logic for these endpoints.\n\n---\n\n`;
    }

    // Issue 4: Generic 500
    if (groups.SERVER_ERROR.length) {
        md += `## 🔴 Issue #4 — Unhandled Server Errors (500)\n\n`;
        md += `**Root cause:** These endpoints crash with an unhandled exception. Could be missing query params, DB query issues, or logic errors.\n\n`;
        md += `| Endpoint | Error Message | Auth Required |\n|---|---|---|\n`;
        for (const f of groups.SERVER_ERROR) {
            md += `| \`${f.method} ${f.path}\` | \`${f.errMsg.slice(0, 100)}\` | ${f.auth || 'none'} |\n`;
        }
        md += `\n**Fix:** Add try/catch, check that required query params are validated before DB calls, and inspect server logs for stack traces.\n\n---\n\n`;
    }

    // Issue 5: Other
    if (groups.OTHER.length) {
        md += `## ⚠️ Issue #5 — Other Failures\n\n`;
        md += `| Endpoint | Status | Error |\n|---|---|---|\n`;
        for (const f of groups.OTHER) {
            md += `| \`${f.method} ${f.path}\` | ${f.status} | \`${f.errMsg.slice(0, 100)}\` |\n`;
        }
        md += `\n`;
    }

    // Full results table
    md += `---\n\n## 📋 Full Results\n\n`;
    md += `| Method | Endpoint | Auth | Status | Class | Notes |\n`;
    md += `|--------|----------|------|--------|-------|-------|\n`;
    for (const r of results) {
        const icon = r.pass ? '✅' : '🔴';
        md += `| ${icon} \`${r.method}\` | \`${r.path}\` | ${r.auth || 'none'} | ${r.status} | ${r.sc} | ${r.errMsg.slice(0, 80)} |\n`;
    }

    const outPath = path.join(__dirname, '..', 'API_ISSUES.md');
    fs.writeFileSync(outPath, md);
    console.log(`\n📄 Issues report written to: ${outPath}`);

    // Also update API_TEST_REPORT.md
    fs.writeFileSync(path.join(__dirname, '..', 'API_TEST_REPORT.md'), md);
}

main().catch(console.error);
