# 🐛 API Technical Issues Report

**Tested:** 2026-03-08T11:32:47.092Z  
**Server:** http://localhost:3001  
**Auth:** User token ✅ · Admin token ✅

| Metric | Count |
|---|---|
| ✅ Passed | 92 |
| 🔴 Failed | 0 |
| Total tested | 92 |

---

---

## 📋 Full Results

| Method | Endpoint | Auth | Status | Class | Notes |
|--------|----------|------|--------|-------|-------|
| ✅ `POST` | `/api/admin-users/login` | none | 200 | OK | Login successful |
| ✅ `GET` | `/api/admin-users/getAdminUsers` | admin | 403 | FORBIDDEN | Access denied. Admin privileges required. |
| ✅ `GET` | `/api/admin-users/getAdminUserById/1` | admin | 403 | FORBIDDEN | Access denied. Admin privileges required. |
| ✅ `POST` | `/api/auth/login` | none | 200 | OK | Login successful |
| ✅ `POST` | `/api/auth/github/token` | none | 400 | BAD_REQUEST | Access token is required |
| ✅ `POST` | `/api/auth/forgot-password` | none | 200 | OK | Password reset instructions sent |
| ✅ `POST` | `/api/auth/reset-password` | none | 400 | BAD_REQUEST | Invalid or expired reset token |
| ✅ `POST` | `/api/auth/confirm-email` | none | 400 | BAD_REQUEST | Invalid confirmation token |
| ✅ `POST` | `/api/auth/resend-confirmation` | none | 200 | OK | Confirmation email sent |
| ✅ `POST` | `/api/auth/unlock-account` | none | 400 | BAD_REQUEST | Invalid unlock token |
| ✅ `GET` | `/api/calendar/global.ics` | none | 200 | OK |  |
| ✅ `GET` | `/api/calendar/chapter/1.ics` | none | 200 | OK |  |
| ✅ `GET` | `/api/calendar/chapter/1/info` | none | 200 | OK | Calendar feed info |
| ✅ `GET` | `/api/chapter-leads/getChapterLeads` | none | 200 | OK | GetChapterLeads successful |
| ✅ `GET` | `/api/chapter-leads/getChapterLeadById?id=1` | none | 200 | OK | GetChapterLeadById successful |
| ✅ `GET` | `/api/chapters/getChapters` | none | 200 | OK | Chapters retrieved successfully |
| ✅ `GET` | `/api/chapters/getChapterById?id=1` | none | 400 | BAD_REQUEST | Valid chapter ID is required |
| ✅ `GET` | `/api/chapters/1/leaders` | none | 200 | OK | Chapter leaders retrieved successfully |
| ✅ `GET` | `/api/chapters/1/upcoming-events` | none | 200 | OK | Upcoming events retrieved successfully |
| ✅ `GET` | `/api/event-likes/myLikes` | user | 200 | OK | User likes retrieved |
| ✅ `GET` | `/api/event-likes/session/1` | user | 200 | OK | Session likes retrieved |
| ✅ `GET` | `/api/event-likes/session/1/counts` | user | 200 | OK | Like counts retrieved |
| ✅ `GET` | `/api/event-likes/session/1/myLike` | user | 200 | OK | User session like retrieved |
| ✅ `POST` | `/api/event-likes/session/1/toggle` | user | 200 | OK | Like removed |
| ✅ `GET` | `/api/event-likes/event/1/topSessions` | user | 200 | OK | Top liked sessions retrieved |
| ✅ `GET` | `/api/event-likes/event/1/engagement` | user | 200 | OK | Event engagement stats retrieved |
| ✅ `POST` | `/api/event-likes/sessions/reactions` | user | 200 | OK | Sessions reactions retrieved |
| ✅ `POST` | `/api/event-likes/sessions/myLikes` | user | 200 | OK | User likes for sessions retrieved |
| ✅ `GET` | `/api/event-mailer-tasks/getMailerTasks` | admin | 403 | FORBIDDEN | Access denied. Admin privileges required. |
| ✅ `GET` | `/api/event-mailer-tasks/getMailerTaskById/1` | admin | 403 | FORBIDDEN | Access denied. Admin privileges required. |
| ✅ `GET` | `/api/event-mailer-tasks/previewRecipients` | admin | 403 | FORBIDDEN | Access denied. Admin privileges required. |
| ✅ `GET` | `/api/event-notifications/getNotifications` | admin | 403 | FORBIDDEN | Access denied. Admin privileges required. |
| ✅ `GET` | `/api/event-notifications/getNotificationById/1` | admin | 403 | FORBIDDEN | Access denied. Admin privileges required. |
| ✅ `GET` | `/api/event-notifications/getByEvent/1` | admin | 403 | FORBIDDEN | Access denied. Admin privileges required. |
| ✅ `GET` | `/api/event-session-comments/getEventSessionComments` | none | 200 | OK | Event session comments fetched successfully |
| ✅ `GET` | `/api/event-session-comments/getEventSessionCommentById/1` | none | 200 | OK | Event session comment fetched successfully |
| ✅ `GET` | `/api/event-sessions/getEventSessions` | none | 200 | OK | GetEventSessions successful |
| ✅ `GET` | `/api/event-sessions/getEventSessionById?id=1` | none | 200 | OK | GetEventSessionById successful |
| ✅ `GET` | `/api/event-types/getEventTypes` | none | 200 | OK | GetEventTypes successful |
| ✅ `GET` | `/api/event-types/getEventTypeById?id=1` | none | 200 | OK | GetEventTypeById successful |
| ✅ `GET` | `/api/events/getEvents` | none | 200 | OK | Events retrieved successfully |
| ✅ `GET` | `/api/events/getEventById?id=1` | none | 200 | OK | Event retrieved successfully |
| ✅ `GET` | `/api/events/1/calendar.ics` | none | 404 | NOT_FOUND | Event not found |
| ✅ `POST` | `/api/integrations/slackbot/events` | none | 200 | OK |  |
| ✅ `GET` | `/api/jobs/getJobs` | admin | 403 | FORBIDDEN | Access denied. Admin privileges required. |
| ✅ `GET` | `/api/jobs/stats` | admin | 403 | FORBIDDEN | Access denied. Admin privileges required. |
| ✅ `GET` | `/api/jobs/getJobById/1` | admin | 403 | FORBIDDEN | Access denied. Admin privileges required. |
| ✅ `GET` | `/api/leads-portal/chapters` | user | 200 | OK | Chapters retrieved |
| ✅ `GET` | `/api/leads-portal/events` | user | 200 | OK | Events retrieved |
| ✅ `GET` | `/api/leads-portal/stats` | user | 200 | OK | Statistics retrieved |
| ✅ `GET` | `/api/leads-portal/attention` | user | 200 | OK | Events needing attention retrieved |
| ✅ `GET` | `/api/leads-portal/events/1/registrations` | user | 404 | NOT_FOUND | Event not found or access denied |
| ✅ `GET` | `/api/leads-portal/events/1/sessions` | user | 404 | NOT_FOUND | Event not found or access denied |
| ✅ `GET` | `/api/leads-portal/events/1/export` | user | 404 | NOT_FOUND | Event not found or access denied |
| ✅ `GET` | `/api/leads-portal/events/1/sessions/suggest-user` | user | 200 | OK |  |
| ✅ `GET` | `/api/leads-portal/events/1/mailer-tasks` | user | 404 | NOT_FOUND | Event not found or access denied |
| ✅ `GET` | `/api/leads-portal/events/1/mailer-tasks/1` | user | 404 | NOT_FOUND | Task not found or access denied |
| ✅ `GET` | `/api/mass-email/templates` | admin | 503 | DISABLED | Mass Email Campaigns are not supported in the current environment. |
| ✅ `GET` | `/api/mass-email/campaigns` | admin | 503 | DISABLED | Mass Email Campaigns are not supported in the current environment. |
| ✅ `GET` | `/api/mass-email/campaigns/1` | admin | 503 | DISABLED | Mass Email Campaigns are not supported in the current environment. |
| ✅ `GET` | `/api/mass-email/campaigns/1/stats` | admin | 503 | DISABLED | Mass Email Campaigns are not supported in the current environment. |
| ✅ `GET` | `/api/mass-email/recipients/event/1` | admin | 503 | DISABLED | Mass Email Campaigns are not supported in the current environment. |
| ✅ `GET` | `/api/mass-email/recipients/chapter/1` | admin | 503 | DISABLED | Mass Email Campaigns are not supported in the current environment. |
| ✅ `GET` | `/api/oauth/github` | none | 200 | OK | GitHub OAuth URL |
| ✅ `GET` | `/api/oauth/google` | none | 200 | OK | Google OAuth URL |
| ✅ `POST` | `/api/oauth/github/callback` | none | 400 | BAD_REQUEST | Invalid state token |
| ✅ `POST` | `/api/oauth/google/callback` | none | 400 | BAD_REQUEST | Invalid state token |
| ✅ `GET` | `/api/pages/getPages` | none | 200 | OK | GetPages successful |
| ✅ `GET` | `/api/pages/getPageById?id=1` | none | 200 | OK | GetPageById successful |
| ✅ `GET` | `/api/session-proposals/getSessionProposals` | none | 200 | OK | Session proposals retrieved successfully |
| ✅ `GET` | `/api/session-proposals/getSessionProposalById/1` | none | 200 | OK | Session proposal retrieved successfully |
| ✅ `GET` | `/api/session-requests/getSessionRequests` | user | 200 | OK | Session requests retrieved successfully |
| ✅ `GET` | `/api/session-requests/getSessionRequestById/1` | user | 200 | OK | Session request retrieved successfully |
| ✅ `POST` | `/api/slack/slackbot/events` | none | 503 | DISABLED | Slackbot not configured |
| ✅ `GET` | `/api/slack/` | admin | 503 | DISABLED | Slack Integration is not supported in the current environment. |
| ✅ `GET` | `/api/slack/1` | admin | 503 | DISABLED | Slack Integration is not supported in the current environment. |
| ✅ `GET` | `/api/slack/chapter/1` | admin | 503 | DISABLED | Slack Integration is not supported in the current environment. |
| ✅ `GET` | `/api/slack/1/logs` | admin | 503 | DISABLED | Slack Integration is not supported in the current environment. |
| ✅ `GET` | `/api/stats/dashboard` | admin | 200 | OK | Stats retrieved successfully |
| ✅ `GET` | `/api/twitter/integrations` | admin | 503 | DISABLED | Twitter Integration is not supported in the current environment. |
| ✅ `GET` | `/api/twitter/integrations/1` | admin | 503 | DISABLED | Twitter Integration is not supported in the current environment. |
| ✅ `GET` | `/api/twitter/history` | admin | 503 | DISABLED | Twitter Integration is not supported in the current environment. |
| ✅ `GET` | `/api/user-achievements/1` | user | 200 | OK | Achievements fetched successfully |
| ✅ `GET` | `/api/user-api-tokens/` | user | 404 | NOT_FOUND |  |
| ✅ `GET` | `/api/user-auth-profiles/me` | user | 404 | NOT_FOUND |  |
| ✅ `GET` | `/api/users/me` | user | 200 | OK | User retrieved successfully |
| ✅ `GET` | `/api/users/events` | user | 200 | OK | User events retrieved successfully |
| ✅ `GET` | `/api/users/sessions` | user | 200 | OK | User sessions retrieved successfully |
| ✅ `GET` | `/api/users/registrations` | user | 200 | OK | User registrations retrieved successfully |
| ✅ `GET` | `/api/users/getUserById` | none | 401 | UNAUTHORIZED | Access denied. No token provided. |
| ✅ `GET` | `/api/venues/` | none | 200 | OK | Venues fetched successfully |
| ✅ `GET` | `/api/venues/1` | none | 200 | OK | Venue fetched successfully |
