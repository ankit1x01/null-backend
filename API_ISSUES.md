# 🐛 API Technical Issues Report

**Tested:** 2026-03-08T11:53:49.540Z  
**Server:** https://dev.null.community  
**Auth:** User token ❌ · Admin token ❌

| Metric | Count |
|---|---|
| ✅ Passed | 78 |
| 🔴 Failed | 14 |
| Total tested | 92 |

---

## 🔴 Issue #1 — Missing DB Columns (Pending Migrations)

**Root cause:** Code references columns that don't exist in the local DB. Run missing migrations.

| Endpoint | Error |
|---|---|
| `GET /api/event-session-comments/getEventSessionCommentById/1` | `Unknown column 'EventSessionComment.comment_body' in 'field list'` |
| `GET /api/user-achievements/1` | `Unknown column 'info' in 'field list'` |

**Fix:** Run `npm run db:migrate` or apply the missing Sequelize migration files for the affected tables.

---

## 🔴 Issue #4 — Unhandled Server Errors (500)

**Root cause:** These endpoints crash with an unhandled exception. Could be missing query params, DB query issues, or logic errors.

| Endpoint | Error Message | Auth Required |
|---|---|---|
| `POST /api/auth/login` | `Internal server error` | none |
| `POST /api/auth/forgot-password` | `Internal server error` | none |
| `POST /api/auth/reset-password` | `Internal server error` | none |
| `POST /api/auth/confirm-email` | `Internal server error` | none |
| `POST /api/auth/resend-confirmation` | `Internal server error` | none |
| `POST /api/auth/unlock-account` | `Internal server error` | none |
| `GET /api/event-session-comments/getEventSessionComments` | `Failed to fetch event session comments` | none |
| `GET /api/session-proposals/getSessionProposals` | `Internal server error` | none |
| `GET /api/session-proposals/getSessionProposalById/1` | `Internal server error` | none |
| `GET /api/session-requests/getSessionRequests` | `Internal server error` | user |
| `GET /api/session-requests/getSessionRequestById/1` | `Internal server error` | user |
| `GET /api/stats/dashboard` | `Failed to fetch dashboard stats` | admin |

**Fix:** Add try/catch, check that required query params are validated before DB calls, and inspect server logs for stack traces.

---

---

## 📋 Full Results

| Method | Endpoint | Auth | Status | Class | Notes |
|--------|----------|------|--------|-------|-------|
| ✅ `POST` | `/api/admin-users/login` | none | 401 | UNAUTHORIZED | Invalid credentials |
| ✅ `GET` | `/api/admin-users/getAdminUsers` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/admin-users/getAdminUserById/1` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| 🔴 `POST` | `/api/auth/login` | none | 500 | SERVER_ERROR | Internal server error |
| ✅ `POST` | `/api/auth/github/token` | none | 400 | BAD_REQUEST | Access token is required |
| 🔴 `POST` | `/api/auth/forgot-password` | none | 500 | SERVER_ERROR | Internal server error |
| 🔴 `POST` | `/api/auth/reset-password` | none | 500 | SERVER_ERROR | Internal server error |
| 🔴 `POST` | `/api/auth/confirm-email` | none | 500 | SERVER_ERROR | Internal server error |
| 🔴 `POST` | `/api/auth/resend-confirmation` | none | 500 | SERVER_ERROR | Internal server error |
| 🔴 `POST` | `/api/auth/unlock-account` | none | 500 | SERVER_ERROR | Internal server error |
| ✅ `GET` | `/api/calendar/global.ics` | none | 200 | OK |  |
| ✅ `GET` | `/api/calendar/chapter/1.ics` | none | 200 | OK |  |
| ✅ `GET` | `/api/calendar/chapter/1/info` | none | 200 | OK | Calendar feed info |
| ✅ `GET` | `/api/chapter-leads/getChapterLeads` | none | 200 | OK | GetChapterLeads successful |
| ✅ `GET` | `/api/chapter-leads/getChapterLeadById?id=1` | none | 200 | OK | GetChapterLeadById successful |
| ✅ `GET` | `/api/chapters/getChapters` | none | 200 | OK | Chapters retrieved successfully |
| ✅ `GET` | `/api/chapters/getChapterById?id=1` | none | 400 | BAD_REQUEST | Valid chapter ID is required |
| ✅ `GET` | `/api/chapters/1/leaders` | none | 200 | OK | Chapter leaders retrieved successfully |
| ✅ `GET` | `/api/chapters/1/upcoming-events` | none | 200 | OK | Upcoming events retrieved successfully |
| ✅ `GET` | `/api/event-likes/myLikes` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/event-likes/session/1` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/event-likes/session/1/counts` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/event-likes/session/1/myLike` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `POST` | `/api/event-likes/session/1/toggle` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/event-likes/event/1/topSessions` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/event-likes/event/1/engagement` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `POST` | `/api/event-likes/sessions/reactions` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `POST` | `/api/event-likes/sessions/myLikes` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/event-mailer-tasks/getMailerTasks` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/event-mailer-tasks/getMailerTaskById/1` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/event-mailer-tasks/previewRecipients` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/event-notifications/getNotifications` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/event-notifications/getNotificationById/1` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/event-notifications/getByEvent/1` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| 🔴 `GET` | `/api/event-session-comments/getEventSessionComments` | none | 500 | SERVER_ERROR | Failed to fetch event session comments |
| 🔴 `GET` | `/api/event-session-comments/getEventSessionCommentById/1` | none | 500 | SERVER_ERROR | Unknown column 'EventSessionComment.comment_body' in 'field list' |
| ✅ `GET` | `/api/event-sessions/getEventSessions` | none | 200 | OK | GetEventSessions successful |
| ✅ `GET` | `/api/event-sessions/getEventSessionById?id=1` | none | 404 | NOT_FOUND | GetEventSessionById failed |
| ✅ `GET` | `/api/event-types/getEventTypes` | none | 200 | OK | GetEventTypes successful |
| ✅ `GET` | `/api/event-types/getEventTypeById?id=1` | none | 200 | OK | GetEventTypeById successful |
| ✅ `GET` | `/api/events/getEvents` | none | 200 | OK | Events retrieved successfully |
| ✅ `GET` | `/api/events/getEventById?id=1` | none | 200 | OK | Event retrieved successfully |
| ✅ `GET` | `/api/events/1/calendar.ics` | none | 404 | NOT_FOUND | Event not found |
| ✅ `POST` | `/api/integrations/slackbot/events` | none | 200 | OK |  |
| ✅ `GET` | `/api/jobs/getJobs` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/jobs/stats` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/jobs/getJobById/1` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/leads-portal/chapters` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/leads-portal/events` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/leads-portal/stats` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/leads-portal/attention` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/leads-portal/events/1/registrations` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/leads-portal/events/1/sessions` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/leads-portal/events/1/export` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/leads-portal/events/1/sessions/suggest-user` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/leads-portal/events/1/mailer-tasks` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/leads-portal/events/1/mailer-tasks/1` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/mass-email/templates` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/mass-email/campaigns` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/mass-email/campaigns/1` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/mass-email/campaigns/1/stats` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/mass-email/recipients/event/1` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/mass-email/recipients/chapter/1` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/oauth/github` | none | 200 | OK | GitHub OAuth URL |
| ✅ `GET` | `/api/oauth/google` | none | 200 | OK | Google OAuth URL |
| ✅ `POST` | `/api/oauth/github/callback` | none | 400 | BAD_REQUEST | Invalid state token |
| ✅ `POST` | `/api/oauth/google/callback` | none | 400 | BAD_REQUEST | Invalid state token |
| ✅ `GET` | `/api/pages/getPages` | none | 200 | OK | GetPages successful |
| ✅ `GET` | `/api/pages/getPageById?id=1` | none | 200 | OK | GetPageById successful |
| 🔴 `GET` | `/api/session-proposals/getSessionProposals` | none | 500 | SERVER_ERROR | Internal server error |
| 🔴 `GET` | `/api/session-proposals/getSessionProposalById/1` | none | 500 | SERVER_ERROR | Internal server error |
| 🔴 `GET` | `/api/session-requests/getSessionRequests` | user | 500 | SERVER_ERROR | Internal server error |
| 🔴 `GET` | `/api/session-requests/getSessionRequestById/1` | user | 500 | SERVER_ERROR | Internal server error |
| ✅ `POST` | `/api/slack/slackbot/events` | none | 503 | DISABLED | Slackbot not configured |
| ✅ `GET` | `/api/slack/` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/slack/1` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/slack/chapter/1` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/slack/1/logs` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| 🔴 `GET` | `/api/stats/dashboard` | admin | 500 | SERVER_ERROR | Failed to fetch dashboard stats |
| ✅ `GET` | `/api/twitter/integrations` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/twitter/integrations/1` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/twitter/history` | admin | 401 | UNAUTHORIZED | Access denied. No token provided. |
| 🔴 `GET` | `/api/user-achievements/1` | user | 500 | SERVER_ERROR | Unknown column 'info' in 'field list' |
| ✅ `GET` | `/api/user-api-tokens/` | user | 404 | NOT_FOUND |  |
| ✅ `GET` | `/api/user-auth-profiles/me` | user | 404 | NOT_FOUND |  |
| ✅ `GET` | `/api/users/me` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/users/events` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/users/sessions` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/users/registrations` | user | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/users/getUserById` | none | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/venues/` | none | 200 | OK | Venues fetched successfully |
| ✅ `GET` | `/api/venues/1` | none | 200 | OK | Venue fetched successfully |
