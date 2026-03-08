# API Endpoints

## `POST` /api/admin-users/login
- **Summary:** AdminLogin operation
- **Description:** Performs adminLogin operation in admin-users module
- **Tags:** Admin-users

## `GET` /api/admin-users/getAdminUsers
- **Summary:** GetAdminUsers operation
- **Description:** Performs getAdminUsers operation in admin-users module
- **Tags:** Admin-users

## `GET` /api/admin-users/getAdminUserById/:id
- **Summary:** GetAdminUserById operation
- **Description:** Performs getAdminUserById operation in admin-users module
- **Tags:** Admin-users

## `POST` /api/admin-users/createAdminUser
- **Summary:** CreateAdminUser operation
- **Description:** Performs createAdminUser operation in admin-users module
- **Tags:** Admin-users

## `PUT` /api/admin-users/updateAdminUser/:id
- **Summary:** UpdateAdminUser operation
- **Description:** Performs updateAdminUser operation in admin-users module
- **Tags:** Admin-users

## `PUT` /api/admin-users/toggleActive/:id
- **Summary:** ToggleActive operation
- **Description:** Performs toggleActive operation in admin-users module
- **Tags:** Admin-users

## `PUT` /api/admin-users/changePassword/:id
- **Summary:** ChangePassword operation
- **Description:** Performs changePassword operation in admin-users module
- **Tags:** Admin-users

## `DELETE` /api/admin-users/deleteAdminUser/:id
- **Summary:** DeleteAdminUser operation
- **Description:** Performs deleteAdminUser operation in admin-users module
- **Tags:** Admin-users

## `POST` /api/auth/login
- **Summary:** Login operation
- **Description:** Performs login operation in auth module
- **Tags:** Auth

## `POST` /api/auth/register
- **Summary:** Register operation
- **Description:** Performs register operation in auth module
- **Tags:** Auth

## `POST` /api/auth/:provider/token
- **Summary:** ProviderToken operation
- **Description:** Performs providerToken operation in auth module
- **Tags:** Auth

## `POST` /api/auth/forgot-password
- **Summary:** ForgotPassword operation
- **Description:** Performs forgotPassword operation in auth module
- **Tags:** Auth

## `POST` /api/auth/reset-password
- **Summary:** ResetPassword operation
- **Description:** Performs resetPassword operation in auth module
- **Tags:** Auth

## `POST` /api/auth/confirm-email
- **Summary:** ConfirmEmail operation
- **Description:** Performs confirmEmail operation in auth module
- **Tags:** Auth

## `POST` /api/auth/resend-confirmation
- **Summary:** ResendConfirmation operation
- **Description:** Performs resendConfirmation operation in auth module
- **Tags:** Auth

## `POST` /api/auth/unlock-account
- **Summary:** UnlockAccount operation
- **Description:** Performs unlockAccount operation in auth module
- **Tags:** Auth

## `GET` /api/calendar/global.ics
- **Summary:** GetGlobalCalendar operation
- **Description:** Performs getGlobalCalendar operation in calendar module
- **Tags:** Calendar

## `GET` /api/calendar/chapter/:chapterId.ics
- **Summary:** GetChapterCalendar operation
- **Description:** Performs getChapterCalendar operation in calendar module
- **Tags:** Calendar

## `GET` /api/calendar/chapter/:chapterId/info
- **Summary:** GetChapterCalendarJson operation
- **Description:** Performs getChapterCalendarJson operation in calendar module
- **Tags:** Calendar

## `GET` /api/chapter-leads/getChapterLeads
- **Summary:** GetChapterLeads operation
- **Description:** Performs getChapterLeads operation in chapter-leads module
- **Tags:** Chapter-leads

## `GET` /api/chapter-leads/getChapterLeadById
- **Summary:** GetChapterLeadById operation
- **Description:** Performs getChapterLeadById operation in chapter-leads module
- **Tags:** Chapter-leads

## `GET` /api/chapters/getChapters
- **Summary:** GetChapters operation
- **Description:** Performs getChapters operation in chapters module
- **Tags:** Chapters

## `GET` /api/chapters/getChapterById
- **Summary:** GetChapterById operation
- **Description:** Performs getChapterById operation in chapters module
- **Tags:** Chapters

## `POST` /api/chapters/createChapter
- **Summary:** CreateChapter operation
- **Description:** Performs createChapter operation in chapters module
- **Tags:** Chapters

## `PUT` /api/chapters/updateChapter/:id
- **Summary:** UpdateChapter operation
- **Description:** Performs updateChapter operation in chapters module
- **Tags:** Chapters

## `DELETE` /api/chapters/deleteChapter/:id
- **Summary:** DeleteChapter operation
- **Description:** Performs deleteChapter operation in chapters module
- **Tags:** Chapters

## `GET` /api/chapters/:id/leaders
- **Summary:** GetChapterLeaders operation
- **Description:** Performs getChapterLeaders operation in chapters module
- **Tags:** Chapters

## `GET` /api/chapters/:id/upcoming-events
- **Summary:** GetUpcomingEvents operation
- **Description:** Performs getUpcomingEvents operation in chapters module
- **Tags:** Chapters

## `GET` /api/event-likes/myLikes
- **Summary:** GetUserLikes operation
- **Description:** Performs getUserLikes operation in event-likes module
- **Tags:** Event-likes

## `GET` /api/event-likes/session/:sessionId
- **Summary:** GetSessionLikes operation
- **Description:** Performs getSessionLikes operation in event-likes module
- **Tags:** Event-likes

## `POST` /api/event-likes/session/:sessionId
- **Summary:** AddLike operation
- **Description:** Performs addLike operation in event-likes module
- **Tags:** Event-likes

## `DELETE` /api/event-likes/session/:sessionId
- **Summary:** RemoveLike operation
- **Description:** Performs removeLike operation in event-likes module
- **Tags:** Event-likes

## `GET` /api/event-likes/session/:sessionId/counts
- **Summary:** GetSessionLikeCounts operation
- **Description:** Performs getSessionLikeCounts operation in event-likes module
- **Tags:** Event-likes

## `GET` /api/event-likes/session/:sessionId/myLike
- **Summary:** GetUserSessionLike operation
- **Description:** Performs getUserSessionLike operation in event-likes module
- **Tags:** Event-likes

## `POST` /api/event-likes/session/:sessionId/toggle
- **Summary:** ToggleLike operation
- **Description:** Performs toggleLike operation in event-likes module
- **Tags:** Event-likes

## `GET` /api/event-likes/event/:eventId/topSessions
- **Summary:** GetTopLikedSessions operation
- **Description:** Performs getTopLikedSessions operation in event-likes module
- **Tags:** Event-likes

## `GET` /api/event-likes/event/:eventId/engagement
- **Summary:** GetEventEngagement operation
- **Description:** Performs getEventEngagement operation in event-likes module
- **Tags:** Event-likes

## `POST` /api/event-likes/sessions/reactions
- **Summary:** GetSessionsReactions operation
- **Description:** Performs getSessionsReactions operation in event-likes module
- **Tags:** Event-likes

## `POST` /api/event-likes/sessions/myLikes
- **Summary:** GetUserLikesForSessions operation
- **Description:** Performs getUserLikesForSessions operation in event-likes module
- **Tags:** Event-likes

## `GET` /api/event-mailer-tasks/getMailerTasks
- **Summary:** GetMailerTasks operation
- **Description:** Performs getMailerTasks operation in event-mailer-tasks module
- **Tags:** Event-mailer-tasks

## `GET` /api/event-mailer-tasks/getMailerTaskById/:id
- **Summary:** GetMailerTaskById operation
- **Description:** Performs getMailerTaskById operation in event-mailer-tasks module
- **Tags:** Event-mailer-tasks

## `GET` /api/event-mailer-tasks/previewRecipients
- **Summary:** PreviewRecipients operation
- **Description:** Performs previewRecipients operation in event-mailer-tasks module
- **Tags:** Event-mailer-tasks

## `POST` /api/event-mailer-tasks/createMailerTask
- **Summary:** CreateMailerTask operation
- **Description:** Performs createMailerTask operation in event-mailer-tasks module
- **Tags:** Event-mailer-tasks

## `PUT` /api/event-mailer-tasks/updateMailerTask/:id
- **Summary:** UpdateMailerTask operation
- **Description:** Performs updateMailerTask operation in event-mailer-tasks module
- **Tags:** Event-mailer-tasks

## `POST` /api/event-mailer-tasks/executeMailerTask/:id
- **Summary:** ExecuteMailerTask operation
- **Description:** Performs executeMailerTask operation in event-mailer-tasks module
- **Tags:** Event-mailer-tasks

## `DELETE` /api/event-mailer-tasks/deleteMailerTask/:id
- **Summary:** DeleteMailerTask operation
- **Description:** Performs deleteMailerTask operation in event-mailer-tasks module
- **Tags:** Event-mailer-tasks

## `GET` /api/event-notifications/getNotifications
- **Summary:** GetNotifications operation
- **Description:** Performs getNotifications operation in event-notifications module
- **Tags:** Event-notifications

## `GET` /api/event-notifications/getNotificationById/:id
- **Summary:** GetNotificationById operation
- **Description:** Performs getNotificationById operation in event-notifications module
- **Tags:** Event-notifications

## `GET` /api/event-notifications/getByEvent/:eventId
- **Summary:** GetNotificationsByEvent operation
- **Description:** Performs getNotificationsByEvent operation in event-notifications module
- **Tags:** Event-notifications

## `POST` /api/event-notifications/createNotification
- **Summary:** CreateNotification operation
- **Description:** Performs createNotification operation in event-notifications module
- **Tags:** Event-notifications

## `POST` /api/event-notifications/scheduleForEvent/:eventId
- **Summary:** ScheduleEventNotifications operation
- **Description:** Performs scheduleEventNotifications operation in event-notifications module
- **Tags:** Event-notifications

## `PUT` /api/event-notifications/updateNotification/:id
- **Summary:** UpdateNotification operation
- **Description:** Performs updateNotification operation in event-notifications module
- **Tags:** Event-notifications

## `POST` /api/event-notifications/sendNotification/:id
- **Summary:** SendNotification operation
- **Description:** Performs sendNotification operation in event-notifications module
- **Tags:** Event-notifications

## `POST` /api/event-notifications/processPending
- **Summary:** ProcessPendingNotifications operation
- **Description:** Performs processPendingNotifications operation in event-notifications module
- **Tags:** Event-notifications

## `POST` /api/event-notifications/cancelForEvent/:eventId
- **Summary:** CancelEventNotifications operation
- **Description:** Performs cancelEventNotifications operation in event-notifications module
- **Tags:** Event-notifications

## `DELETE` /api/event-notifications/deleteNotification/:id
- **Summary:** DeleteNotification operation
- **Description:** Performs deleteNotification operation in event-notifications module
- **Tags:** Event-notifications

## `GET` /api/event-session-comments/getEventSessionComments
- **Summary:** GetEventSessionComments operation
- **Description:** Performs getEventSessionComments operation in event-session-comments module
- **Tags:** Event-session-comments

## `GET` /api/event-session-comments/getEventSessionCommentById/:id
- **Summary:** GetEventSessionCommentById operation
- **Description:** Performs getEventSessionCommentById operation in event-session-comments module
- **Tags:** Event-session-comments

## `GET` /api/event-sessions/getEventSessions
- **Summary:** GetEventSessions operation
- **Description:** Performs getEventSessions operation in event-sessions module
- **Tags:** Event-sessions

## `GET` /api/event-sessions/getEventSessionById
- **Summary:** GetEventSessionById operation
- **Description:** Performs getEventSessionById operation in event-sessions module
- **Tags:** Event-sessions

## `GET` /api/event-types/getEventTypes
- **Summary:** GetEventTypes operation
- **Description:** Performs getEventTypes operation in event-types module
- **Tags:** Event-types

## `GET` /api/event-types/getEventTypeById
- **Summary:** GetEventTypeById operation
- **Description:** Performs getEventTypeById operation in event-types module
- **Tags:** Event-types

## `GET` /api/events/getEvents
- **Summary:** GetEvents operation
- **Description:** Performs getEvents operation in events module
- **Tags:** Events

## `GET` /api/events/getEventById
- **Summary:** GetEventById operation
- **Description:** Performs getEventById operation in events module
- **Tags:** Events

## `GET` /api/events/:id/calendar.ics
- **Summary:** GenerateICS operation
- **Description:** Performs generateICS operation in events module
- **Tags:** Events

## `POST` /api/integrations/slackbot/events
- **Summary:** HandleSlackEvents operation
- **Description:** Performs handleSlackEvents operation in integrations module
- **Tags:** Integrations

## `GET` /api/jobs/getJobs
- **Summary:** GetJobs operation
- **Description:** Performs getJobs operation in jobs module
- **Tags:** Jobs

## `GET` /api/jobs/stats
- **Summary:** GetJobStats operation
- **Description:** Performs getJobStats operation in jobs module
- **Tags:** Jobs

## `GET` /api/jobs/getJobById/:id
- **Summary:** GetJobById operation
- **Description:** Performs getJobById operation in jobs module
- **Tags:** Jobs

## `POST` /api/jobs/createJob
- **Summary:** CreateJob operation
- **Description:** Performs createJob operation in jobs module
- **Tags:** Jobs

## `POST` /api/jobs/queueJob
- **Summary:** QueueJob operation
- **Description:** Performs queueJob operation in jobs module
- **Tags:** Jobs

## `POST` /api/jobs/start/:id
- **Summary:** StartJob operation
- **Description:** Performs startJob operation in jobs module
- **Tags:** Jobs

## `POST` /api/jobs/pause/:id
- **Summary:** PauseJob operation
- **Description:** Performs pauseJob operation in jobs module
- **Tags:** Jobs

## `POST` /api/jobs/resume/:id
- **Summary:** ResumeJob operation
- **Description:** Performs resumeJob operation in jobs module
- **Tags:** Jobs

## `POST` /api/jobs/retry/:id
- **Summary:** RetryJob operation
- **Description:** Performs retryJob operation in jobs module
- **Tags:** Jobs

## `POST` /api/jobs/complete/:id
- **Summary:** CompleteJob operation
- **Description:** Performs completeJob operation in jobs module
- **Tags:** Jobs

## `POST` /api/jobs/fail/:id
- **Summary:** FailJob operation
- **Description:** Performs failJob operation in jobs module
- **Tags:** Jobs

## `PUT` /api/jobs/progress/:id
- **Summary:** UpdateProgress operation
- **Description:** Performs updateProgress operation in jobs module
- **Tags:** Jobs

## `POST` /api/jobs/cleanup
- **Summary:** CleanOldJobs operation
- **Description:** Performs cleanOldJobs operation in jobs module
- **Tags:** Jobs

## `DELETE` /api/jobs/deleteJob/:id
- **Summary:** DeleteJob operation
- **Description:** Performs deleteJob operation in jobs module
- **Tags:** Jobs

## `GET` /api/leads-portal/chapters
- **Summary:** GetMyChapters operation
- **Description:** Performs getMyChapters operation in leads-portal module
- **Tags:** Leads-portal

## `GET` /api/leads-portal/events
- **Summary:** GetMyEvents operation
- **Description:** Performs getMyEvents operation in leads-portal module
- **Tags:** Leads-portal

## `GET` /api/leads-portal/stats
- **Summary:** GetMyStats operation
- **Description:** Performs getMyStats operation in leads-portal module
- **Tags:** Leads-portal

## `GET` /api/leads-portal/attention
- **Summary:** GetEventsNeedingAttention operation
- **Description:** Performs getEventsNeedingAttention operation in leads-portal module
- **Tags:** Leads-portal

## `POST` /api/leads-portal/chapters/:chapterId/events
- **Summary:** CreateEvent operation
- **Description:** Performs createEvent operation in leads-portal module
- **Tags:** Leads-portal

## `PUT` /api/leads-portal/events/:eventId
- **Summary:** UpdateEvent operation
- **Description:** Performs updateEvent operation in leads-portal module
- **Tags:** Leads-portal

## `GET` /api/leads-portal/events/:eventId/registrations
- **Summary:** GetEventRegistrations operation
- **Description:** Performs getEventRegistrations operation in leads-portal module
- **Tags:** Leads-portal

## `GET` /api/leads-portal/events/:eventId/sessions
- **Summary:** GetEventSessions operation
- **Description:** Performs getEventSessions operation in leads-portal module
- **Tags:** Leads-portal

## `POST` /api/leads-portal/events/:eventId/sessions
- **Summary:** CreateEventSession operation
- **Description:** Performs createEventSession operation in leads-portal module
- **Tags:** Leads-portal

## `GET` /api/leads-portal/events/:eventId/export
- **Summary:** ExportRegistrations operation
- **Description:** Performs exportRegistrations operation in leads-portal module
- **Tags:** Leads-portal

## `PUT` /api/leads-portal/events/:eventId/registrations/mass-update
- **Summary:** MassUpdateRegistrations operation
- **Description:** Performs massUpdateRegistrations operation in leads-portal module
- **Tags:** Leads-portal

## `PUT` /api/leads-portal/events/:eventId/sessions/:sessionId
- **Summary:** UpdateEventSession operation
- **Description:** Performs updateEventSession operation in leads-portal module
- **Tags:** Leads-portal

## `GET` /api/leads-portal/events/:eventId/sessions/suggest-user
- **Summary:** SuggestUser operation
- **Description:** Performs suggestUser operation in leads-portal module
- **Tags:** Leads-portal

## `GET` /api/leads-portal/events/:eventId/mailer-tasks
- **Summary:** GetEventMailerTasks operation
- **Description:** Performs getEventMailerTasks operation in leads-portal module
- **Tags:** Leads-portal

## `POST` /api/leads-portal/events/:eventId/mailer-tasks
- **Summary:** CreateEventMailerTask operation
- **Description:** Performs createEventMailerTask operation in leads-portal module
- **Tags:** Leads-portal

## `GET` /api/leads-portal/events/:eventId/mailer-tasks/:taskId
- **Summary:** GetEventMailerTaskById operation
- **Description:** Performs getEventMailerTaskById operation in leads-portal module
- **Tags:** Leads-portal

## `PUT` /api/leads-portal/events/:eventId/mailer-tasks/:taskId
- **Summary:** UpdateEventMailerTask operation
- **Description:** Performs updateEventMailerTask operation in leads-portal module
- **Tags:** Leads-portal

## `DELETE` /api/leads-portal/events/:eventId/mailer-tasks/:taskId
- **Summary:** DeleteEventMailerTask operation
- **Description:** Performs deleteEventMailerTask operation in leads-portal module
- **Tags:** Leads-portal

## `POST` /api/leads-portal/events/:eventId/mailer-tasks/:taskId/execute
- **Summary:** ExecuteEventMailerTask operation
- **Description:** Performs executeEventMailerTask operation in leads-portal module
- **Tags:** Leads-portal

## `GET` /api/mass-email/templates
- **Summary:** GetTemplates operation
- **Description:** Performs getTemplates operation in mass-email module
- **Tags:** Mass-email

## `GET` /api/mass-email/campaigns
- **Summary:** GetCampaigns operation
- **Description:** Performs getCampaigns operation in mass-email module
- **Tags:** Mass-email

## `POST` /api/mass-email/campaigns
- **Summary:** CreateCampaign operation
- **Description:** Performs createCampaign operation in mass-email module
- **Tags:** Mass-email

## `GET` /api/mass-email/campaigns/:id
- **Summary:** GetCampaignById operation
- **Description:** Performs getCampaignById operation in mass-email module
- **Tags:** Mass-email

## `PUT` /api/mass-email/campaigns/:id
- **Summary:** UpdateCampaign operation
- **Description:** Performs updateCampaign operation in mass-email module
- **Tags:** Mass-email

## `DELETE` /api/mass-email/campaigns/:id
- **Summary:** DeleteCampaign operation
- **Description:** Performs deleteCampaign operation in mass-email module
- **Tags:** Mass-email

## `GET` /api/mass-email/campaigns/:id/stats
- **Summary:** GetCampaignStats operation
- **Description:** Performs getCampaignStats operation in mass-email module
- **Tags:** Mass-email

## `GET` /api/mass-email/recipients/event/:eventId
- **Summary:** GetEventRecipients operation
- **Description:** Performs getEventRecipients operation in mass-email module
- **Tags:** Mass-email

## `GET` /api/mass-email/recipients/chapter/:chapterId
- **Summary:** GetChapterRecipients operation
- **Description:** Performs getChapterRecipients operation in mass-email module
- **Tags:** Mass-email

## `POST` /api/mass-email/campaigns/:id/recipients
- **Summary:** AddRecipients operation
- **Description:** Performs addRecipients operation in mass-email module
- **Tags:** Mass-email

## `DELETE` /api/mass-email/campaigns/:id/recipients/:recipientId
- **Summary:** RemoveRecipient operation
- **Description:** Performs removeRecipient operation in mass-email module
- **Tags:** Mass-email

## `POST` /api/mass-email/campaigns/:id/send
- **Summary:** SendCampaign operation
- **Description:** Performs sendCampaign operation in mass-email module
- **Tags:** Mass-email

## `POST` /api/mass-email/campaigns/:id/schedule
- **Summary:** ScheduleCampaign operation
- **Description:** Performs scheduleCampaign operation in mass-email module
- **Tags:** Mass-email

## `POST` /api/mass-email/campaigns/:id/cancel-schedule
- **Summary:** CancelScheduledCampaign operation
- **Description:** Performs cancelScheduledCampaign operation in mass-email module
- **Tags:** Mass-email

## `GET` /api/oauth/github
- **Summary:** GetGitHubAuthUrl operation
- **Description:** Performs getGitHubAuthUrl operation in oauth module
- **Tags:** Oauth

## `GET` /api/oauth/google
- **Summary:** GetGoogleAuthUrl operation
- **Description:** Performs getGoogleAuthUrl operation in oauth module
- **Tags:** Oauth

## `POST` /api/oauth/github/callback
- **Summary:** HandleGitHubCallback operation
- **Description:** Performs handleGitHubCallback operation in oauth module
- **Tags:** Oauth

## `POST` /api/oauth/google/callback
- **Summary:** HandleGoogleCallback operation
- **Description:** Performs handleGoogleCallback operation in oauth module
- **Tags:** Oauth

## `GET` /api/pages/getPages
- **Summary:** GetPages operation
- **Description:** Performs getPages operation in pages module
- **Tags:** Pages

## `GET` /api/pages/getPageById
- **Summary:** GetPageById operation
- **Description:** Performs getPageById operation in pages module
- **Tags:** Pages

## `GET` /api/session-proposals/getSessionProposals
- **Summary:** GetSessionProposals operation
- **Description:** Performs getSessionProposals operation in session-proposals module
- **Tags:** Session-proposals

## `GET` /api/session-proposals/getSessionProposalById/:id
- **Summary:** GetSessionProposalById operation
- **Description:** Performs getSessionProposalById operation in session-proposals module
- **Tags:** Session-proposals

## `GET` /api/session-requests/getSessionRequests
- **Summary:** GetSessionRequests operation
- **Description:** Performs getSessionRequests operation in session-requests module
- **Tags:** Session-requests

## `GET` /api/session-requests/getSessionRequestById/:id
- **Summary:** GetSessionRequestById operation
- **Description:** Performs getSessionRequestById operation in session-requests module
- **Tags:** Session-requests

## `POST` /api/session-requests/createSessionRequest
- **Summary:** CreateSessionRequest operation
- **Description:** Performs createSessionRequest operation in session-requests module
- **Tags:** Session-requests

## `POST` /api/slack/slackbot/events
- **Summary:** SlackbotEvents operation
- **Description:** Performs slackbotEvents operation in slack module
- **Tags:** Slack

## `GET` /api/slack/
- **Summary:** GetIntegrations operation
- **Description:** Performs getIntegrations operation in slack module
- **Tags:** Slack

## `POST` /api/slack/
- **Summary:** CreateIntegration operation
- **Description:** Performs createIntegration operation in slack module
- **Tags:** Slack

## `GET` /api/slack/:id
- **Summary:** GetIntegrationById operation
- **Description:** Performs getIntegrationById operation in slack module
- **Tags:** Slack

## `PUT` /api/slack/:id
- **Summary:** UpdateIntegration operation
- **Description:** Performs updateIntegration operation in slack module
- **Tags:** Slack

## `DELETE` /api/slack/:id
- **Summary:** DeleteIntegration operation
- **Description:** Performs deleteIntegration operation in slack module
- **Tags:** Slack

## `GET` /api/slack/chapter/:chapterId
- **Summary:** GetIntegrationByChapter operation
- **Description:** Performs getIntegrationByChapter operation in slack module
- **Tags:** Slack

## `GET` /api/slack/:id/logs
- **Summary:** GetNotificationLogs operation
- **Description:** Performs getNotificationLogs operation in slack module
- **Tags:** Slack

## `POST` /api/slack/:id/toggle
- **Summary:** ToggleActive operation
- **Description:** Performs toggleActive operation in slack module
- **Tags:** Slack

## `POST` /api/slack/:id/test
- **Summary:** TestWebhook operation
- **Description:** Performs testWebhook operation in slack module
- **Tags:** Slack

## `POST` /api/slack/notify/event/:eventId
- **Summary:** NotifyNewEvent operation
- **Description:** Performs notifyNewEvent operation in slack module
- **Tags:** Slack

## `POST` /api/slack/notify/event/:eventId/update
- **Summary:** NotifyEventUpdate operation
- **Description:** Performs notifyEventUpdate operation in slack module
- **Tags:** Slack

## `POST` /api/slack/notify/session/:sessionId
- **Summary:** NotifyNewSession operation
- **Description:** Performs notifyNewSession operation in slack module
- **Tags:** Slack

## `POST` /api/slack/:id/send
- **Summary:** SendCustomNotification operation
- **Description:** Performs sendCustomNotification operation in slack module
- **Tags:** Slack

## `POST` /api/slack/logs/:logId/retry
- **Summary:** RetryNotification operation
- **Description:** Performs retryNotification operation in slack module
- **Tags:** Slack

## `GET` /api/stats/dashboard
- **Summary:** GetDashboardStats operation
- **Description:** Performs getDashboardStats operation in stats module
- **Tags:** Stats

## `GET` /api/twitter/integrations
- **Summary:** GetIntegrations operation
- **Description:** Performs getIntegrations operation in twitter module
- **Tags:** Twitter

## `POST` /api/twitter/integrations
- **Summary:** CreateIntegration operation
- **Description:** Performs createIntegration operation in twitter module
- **Tags:** Twitter

## `GET` /api/twitter/integrations/:id
- **Summary:** GetIntegrationById operation
- **Description:** Performs getIntegrationById operation in twitter module
- **Tags:** Twitter

## `PUT` /api/twitter/integrations/:id
- **Summary:** UpdateIntegration operation
- **Description:** Performs updateIntegration operation in twitter module
- **Tags:** Twitter

## `DELETE` /api/twitter/integrations/:id
- **Summary:** DeleteIntegration operation
- **Description:** Performs deleteIntegration operation in twitter module
- **Tags:** Twitter

## `POST` /api/twitter/tweet/event/:eventId
- **Summary:** TweetEvent operation
- **Description:** Performs tweetEvent operation in twitter module
- **Tags:** Twitter

## `POST` /api/twitter/tweet/retry/:tweetLogId
- **Summary:** RetryTweet operation
- **Description:** Performs retryTweet operation in twitter module
- **Tags:** Twitter

## `GET` /api/twitter/history
- **Summary:** GetTweetHistory operation
- **Description:** Performs getTweetHistory operation in twitter module
- **Tags:** Twitter

## `GET` /api/user-achievements/:userId
- **Summary:** GetUserAchievements operation
- **Description:** Performs getUserAchievements operation in user-achievements module
- **Tags:** User-achievements

## `GET` /api/user-api-tokens/
- **Summary:** GetMyTokens operation
- **Description:** Performs getMyTokens operation in user-api-tokens module
- **Tags:** User-api-tokens

## `POST` /api/user-api-tokens/
- **Summary:** CreateToken operation
- **Description:** Performs createToken operation in user-api-tokens module
- **Tags:** User-api-tokens

## `PUT` /api/user-api-tokens/:id
- **Summary:** UpdateToken operation
- **Description:** Performs updateToken operation in user-api-tokens module
- **Tags:** User-api-tokens

## `DELETE` /api/user-api-tokens/:id
- **Summary:** RevokeToken operation
- **Description:** Performs revokeToken operation in user-api-tokens module
- **Tags:** User-api-tokens

## `POST` /api/user-api-tokens/:id/regenerate
- **Summary:** RegenerateToken operation
- **Description:** Performs regenerateToken operation in user-api-tokens module
- **Tags:** User-api-tokens

## `GET` /api/user-auth-profiles/me
- **Summary:** GetMyProfiles operation
- **Description:** Performs getMyProfiles operation in user-auth-profiles module
- **Tags:** User-auth-profiles

## `POST` /api/user-auth-profiles/link
- **Summary:** LinkProvider operation
- **Description:** Performs linkProvider operation in user-auth-profiles module
- **Tags:** User-auth-profiles

## `DELETE` /api/user-auth-profiles/unlink/:provider
- **Summary:** UnlinkProvider operation
- **Description:** Performs unlinkProvider operation in user-auth-profiles module
- **Tags:** User-auth-profiles

## `GET` /api/users/me
- **Summary:** GetMe operation
- **Description:** Performs getMe operation in users module
- **Tags:** Users

## `GET` /api/users/events
- **Summary:** GetUserEvents operation
- **Description:** Performs getUserEvents operation in users module
- **Tags:** Users

## `GET` /api/users/sessions
- **Summary:** GetUserSessions operation
- **Description:** Performs getUserSessions operation in users module
- **Tags:** Users

## `GET` /api/users/registrations
- **Summary:** GetUserRegistrations operation
- **Description:** Performs getUserRegistrations operation in users module
- **Tags:** Users

## `GET` /api/users/getUserById
- **Summary:** GetUserById operation
- **Description:** Performs getUserById operation in users module
- **Tags:** Users

## `PUT` /api/users/updateUser/:id
- **Summary:** UpdateUser operation
- **Description:** Performs updateUser operation in users module
- **Tags:** Users

## `DELETE` /api/users/deleteUser/:id
- **Summary:** DeleteUser operation
- **Description:** Performs deleteUser operation in users module
- **Tags:** Users

## `GET` /api/venues/
- **Summary:** GetVenues operation
- **Description:** Performs getVenues operation in venues module
- **Tags:** Venues

## `GET` /api/venues/:id
- **Summary:** GetVenueById operation
- **Description:** Performs getVenueById operation in venues module
- **Tags:** Venues

