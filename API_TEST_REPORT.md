# 🐛 API Technical Issues Report

**Tested:** 2026-03-09T06:15:33.027Z  
**Server:** http://localhost:3001  
**Auth:** User token ❌ · Admin token ❌

| Metric | Count |
|---|---|
| ✅ Passed | 0 |
| 🔴 Failed | 92 |
| Total tested | 92 |

---

## ⚠️ Issue #5 — Other Failures

| Endpoint | Status | Error |
|---|---|---|
| `POST /api/admin-users/login` | 0 | `` |
| `GET /api/admin-users/getAdminUsers` | 0 | `` |
| `GET /api/admin-users/getAdminUserById/1` | 0 | `` |
| `POST /api/auth/login` | 0 | `` |
| `POST /api/auth/github/token` | 0 | `` |
| `POST /api/auth/forgot-password` | 0 | `` |
| `POST /api/auth/reset-password` | 0 | `` |
| `POST /api/auth/confirm-email` | 0 | `` |
| `POST /api/auth/resend-confirmation` | 0 | `` |
| `POST /api/auth/unlock-account` | 0 | `` |
| `GET /api/calendar/global.ics` | 0 | `` |
| `GET /api/calendar/chapter/1.ics` | 0 | `` |
| `GET /api/calendar/chapter/1/info` | 0 | `` |
| `GET /api/chapter-leads/getChapterLeads` | 0 | `` |
| `GET /api/chapter-leads/getChapterLeadById?id=1` | 0 | `` |
| `GET /api/chapters/getChapters` | 0 | `` |
| `GET /api/chapters/getChapterById?id=1` | 0 | `` |
| `GET /api/chapters/1/leaders` | 0 | `` |
| `GET /api/chapters/1/upcoming-events` | 0 | `` |
| `GET /api/event-likes/myLikes` | 0 | `` |
| `GET /api/event-likes/session/1` | 0 | `` |
| `GET /api/event-likes/session/1/counts` | 0 | `` |
| `GET /api/event-likes/session/1/myLike` | 0 | `` |
| `POST /api/event-likes/session/1/toggle` | 0 | `` |
| `GET /api/event-likes/event/1/topSessions` | 0 | `` |
| `GET /api/event-likes/event/1/engagement` | 0 | `` |
| `POST /api/event-likes/sessions/reactions` | 0 | `` |
| `POST /api/event-likes/sessions/myLikes` | 0 | `` |
| `GET /api/event-mailer-tasks/getMailerTasks` | 0 | `` |
| `GET /api/event-mailer-tasks/getMailerTaskById/1` | 0 | `` |
| `GET /api/event-mailer-tasks/previewRecipients` | 0 | `` |
| `GET /api/event-notifications/getNotifications` | 0 | `` |
| `GET /api/event-notifications/getNotificationById/1` | 0 | `` |
| `GET /api/event-notifications/getByEvent/1` | 0 | `` |
| `GET /api/event-session-comments/getEventSessionComments` | 0 | `` |
| `GET /api/event-session-comments/getEventSessionCommentById/1` | 0 | `` |
| `GET /api/event-sessions/getEventSessions` | 0 | `` |
| `GET /api/event-sessions/getEventSessionById?id=1` | 0 | `` |
| `GET /api/event-types/getEventTypes` | 0 | `` |
| `GET /api/event-types/getEventTypeById?id=1` | 0 | `` |
| `GET /api/events/getEvents` | 0 | `` |
| `GET /api/events/getEventById?id=1` | 0 | `` |
| `GET /api/events/1/calendar.ics` | 0 | `` |
| `POST /api/integrations/slackbot/events` | 0 | `` |
| `GET /api/jobs/getJobs` | 0 | `` |
| `GET /api/jobs/stats` | 0 | `` |
| `GET /api/jobs/getJobById/1` | 0 | `` |
| `GET /api/leads-portal/chapters` | 0 | `` |
| `GET /api/leads-portal/events` | 0 | `` |
| `GET /api/leads-portal/stats` | 0 | `` |
| `GET /api/leads-portal/attention` | 0 | `` |
| `GET /api/leads-portal/events/1/registrations` | 0 | `` |
| `GET /api/leads-portal/events/1/sessions` | 0 | `` |
| `GET /api/leads-portal/events/1/export` | 0 | `` |
| `GET /api/leads-portal/events/1/sessions/suggest-user` | 0 | `` |
| `GET /api/leads-portal/events/1/mailer-tasks` | 0 | `` |
| `GET /api/leads-portal/events/1/mailer-tasks/1` | 0 | `` |
| `GET /api/mass-email/templates` | 0 | `` |
| `GET /api/mass-email/campaigns` | 0 | `` |
| `GET /api/mass-email/campaigns/1` | 0 | `` |
| `GET /api/mass-email/campaigns/1/stats` | 0 | `` |
| `GET /api/mass-email/recipients/event/1` | 0 | `` |
| `GET /api/mass-email/recipients/chapter/1` | 0 | `` |
| `GET /api/oauth/github` | 0 | `` |
| `GET /api/oauth/google` | 0 | `` |
| `POST /api/oauth/github/callback` | 0 | `` |
| `POST /api/oauth/google/callback` | 0 | `` |
| `GET /api/pages/getPages` | 0 | `` |
| `GET /api/pages/getPageById?id=1` | 0 | `` |
| `GET /api/session-proposals/getSessionProposals` | 0 | `` |
| `GET /api/session-proposals/getSessionProposalById/1` | 0 | `` |
| `GET /api/session-requests/getSessionRequests` | 0 | `` |
| `GET /api/session-requests/getSessionRequestById/1` | 0 | `` |
| `POST /api/slack/slackbot/events` | 0 | `` |
| `GET /api/slack/` | 0 | `` |
| `GET /api/slack/1` | 0 | `` |
| `GET /api/slack/chapter/1` | 0 | `` |
| `GET /api/slack/1/logs` | 0 | `` |
| `GET /api/stats/dashboard` | 0 | `` |
| `GET /api/twitter/integrations` | 0 | `` |
| `GET /api/twitter/integrations/1` | 0 | `` |
| `GET /api/twitter/history` | 0 | `` |
| `GET /api/user-achievements/1` | 0 | `` |
| `GET /api/user-api-tokens/` | 0 | `` |
| `GET /api/user-auth-profiles/me` | 0 | `` |
| `GET /api/users/me` | 0 | `` |
| `GET /api/users/events` | 0 | `` |
| `GET /api/users/sessions` | 0 | `` |
| `GET /api/users/registrations` | 0 | `` |
| `GET /api/users/getUserById` | 0 | `` |
| `GET /api/venues/` | 0 | `` |
| `GET /api/venues/1` | 0 | `` |

---

## 📋 Full Results

| Method | Endpoint | Auth | Status | Class | Notes |
|--------|----------|------|--------|-------|-------|
| 🔴 `POST` | `/api/admin-users/login` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/admin-users/getAdminUsers` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/admin-users/getAdminUserById/1` | admin | 0 | ERROR |  |
| 🔴 `POST` | `/api/auth/login` | none | 0 | ERROR |  |
| 🔴 `POST` | `/api/auth/github/token` | none | 0 | ERROR |  |
| 🔴 `POST` | `/api/auth/forgot-password` | none | 0 | ERROR |  |
| 🔴 `POST` | `/api/auth/reset-password` | none | 0 | ERROR |  |
| 🔴 `POST` | `/api/auth/confirm-email` | none | 0 | ERROR |  |
| 🔴 `POST` | `/api/auth/resend-confirmation` | none | 0 | ERROR |  |
| 🔴 `POST` | `/api/auth/unlock-account` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/calendar/global.ics` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/calendar/chapter/1.ics` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/calendar/chapter/1/info` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/chapter-leads/getChapterLeads` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/chapter-leads/getChapterLeadById?id=1` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/chapters/getChapters` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/chapters/getChapterById?id=1` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/chapters/1/leaders` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/chapters/1/upcoming-events` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/event-likes/myLikes` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/event-likes/session/1` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/event-likes/session/1/counts` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/event-likes/session/1/myLike` | user | 0 | ERROR |  |
| 🔴 `POST` | `/api/event-likes/session/1/toggle` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/event-likes/event/1/topSessions` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/event-likes/event/1/engagement` | user | 0 | ERROR |  |
| 🔴 `POST` | `/api/event-likes/sessions/reactions` | user | 0 | ERROR |  |
| 🔴 `POST` | `/api/event-likes/sessions/myLikes` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/event-mailer-tasks/getMailerTasks` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/event-mailer-tasks/getMailerTaskById/1` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/event-mailer-tasks/previewRecipients` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/event-notifications/getNotifications` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/event-notifications/getNotificationById/1` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/event-notifications/getByEvent/1` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/event-session-comments/getEventSessionComments` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/event-session-comments/getEventSessionCommentById/1` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/event-sessions/getEventSessions` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/event-sessions/getEventSessionById?id=1` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/event-types/getEventTypes` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/event-types/getEventTypeById?id=1` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/events/getEvents` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/events/getEventById?id=1` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/events/1/calendar.ics` | none | 0 | ERROR |  |
| 🔴 `POST` | `/api/integrations/slackbot/events` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/jobs/getJobs` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/jobs/stats` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/jobs/getJobById/1` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/leads-portal/chapters` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/leads-portal/events` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/leads-portal/stats` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/leads-portal/attention` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/leads-portal/events/1/registrations` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/leads-portal/events/1/sessions` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/leads-portal/events/1/export` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/leads-portal/events/1/sessions/suggest-user` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/leads-portal/events/1/mailer-tasks` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/leads-portal/events/1/mailer-tasks/1` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/mass-email/templates` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/mass-email/campaigns` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/mass-email/campaigns/1` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/mass-email/campaigns/1/stats` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/mass-email/recipients/event/1` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/mass-email/recipients/chapter/1` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/oauth/github` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/oauth/google` | none | 0 | ERROR |  |
| 🔴 `POST` | `/api/oauth/github/callback` | none | 0 | ERROR |  |
| 🔴 `POST` | `/api/oauth/google/callback` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/pages/getPages` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/pages/getPageById?id=1` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/session-proposals/getSessionProposals` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/session-proposals/getSessionProposalById/1` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/session-requests/getSessionRequests` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/session-requests/getSessionRequestById/1` | user | 0 | ERROR |  |
| 🔴 `POST` | `/api/slack/slackbot/events` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/slack/` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/slack/1` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/slack/chapter/1` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/slack/1/logs` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/stats/dashboard` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/twitter/integrations` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/twitter/integrations/1` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/twitter/history` | admin | 0 | ERROR |  |
| 🔴 `GET` | `/api/user-achievements/1` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/user-api-tokens/` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/user-auth-profiles/me` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/users/me` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/users/events` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/users/sessions` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/users/registrations` | user | 0 | ERROR |  |
| 🔴 `GET` | `/api/users/getUserById` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/venues/` | none | 0 | ERROR |  |
| 🔴 `GET` | `/api/venues/1` | none | 0 | ERROR |  |
