/**
 * Email Service
 * Handles all email sending functionality using nodemailer
 * Based on Rails swachalit-master ActionMailer implementation
 */

const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

class EmailService {
  constructor() {
    this.transporter = null;
    this.templates = {};
    this.baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    this.fromEmail = process.env.EMAIL_FROM || 'noreply@null.community';
    this.fromName = process.env.EMAIL_FROM_NAME || 'null Community';
  }

  /**
   * Initialize the email transporter
   */
  initialize() {
    if (this.transporter) return;

    const config = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    };

    // Only create transporter if SMTP credentials are configured
    if (config.auth.user && config.auth.pass) {
      this.transporter = nodemailer.createTransport(config);
      console.log('[EmailService] Transporter initialized with SMTP configuration');
    } else {
      console.warn('[EmailService] SMTP credentials not configured. Emails will be logged only.');
    }
  }

  /**
   * Send an email
   * @param {Object} options - Email options
   * @param {string} options.to - Recipient email
   * @param {string} options.subject - Email subject
   * @param {string} options.text - Plain text content
   * @param {string} [options.html] - HTML content (optional)
   * @returns {Promise<Object>} - Send result
   */
  async sendMail({ to, subject, text, html }) {
    this.initialize();

    const mailOptions = {
      from: `"${this.fromName}" <${this.fromEmail}>`,
      to,
      subject,
      text,
      html: html || text.replace(/\n/g, '<br>')
    };

    // If transporter not configured, log the email
    if (!this.transporter) {
      console.log('[EmailService] Email would be sent:');
      console.log(`  To: ${to}`);
      console.log(`  Subject: ${subject}`);
      console.log(`  Body: ${text.substring(0, 200)}...`);
      return { messageId: 'dev-mode-' + Date.now(), logged: true };
    }

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log(`[EmailService] Email sent to ${to}: ${result.messageId}`);
      return result;
    } catch (error) {
      console.error(`[EmailService] Failed to send email to ${to}:`, error.message);
      throw error;
    }
  }

  /**
   * Format date for email display
   */
  formatDate(date, format = 'full') {
    const d = new Date(date);
    const options = {
      full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' },
      short: { year: 'numeric', month: 'short', day: 'numeric' },
      time: { hour: '2-digit', minute: '2-digit' }
    };
    return d.toLocaleString('en-US', options[format] || options.full);
  }

  // ============================================
  // EVENT EMAILS (from Rails event_mailer.rb)
  // ============================================

  /**
   * Send event announcement email
   * Rails equivalent: announcement_mail(target, task)
   */
  async sendEventAnnouncement({ user, event, eventType }) {
    const subject = `[null] Event: ${event.name}`;
    
    const text = `** This is an auto generated mail from null Community **

${eventType?.description || 'You are invited to an upcoming event!'}

${event.registration_opens_at ? `Registration Opens: ${this.formatDate(event.registration_opens_at)}` : ''}
${event.max_registration ? `Maximum Registration: ${event.max_registration} seats` : ''}

For further details and Registration/RSVP please visit the following URL:
${this.baseUrl}/events/${event.slug || event.id}

We look forward to seeing you!

- null Community Team`;

    return this.sendMail({ to: user.email, subject, text });
  }

  /**
   * Send event reminder email
   * Rails equivalent: reminder_mail(target, event)
   */
  async sendEventReminder({ user, event, sessions = [], venue }) {
    const subject = `[null] Reminder: ${event.name}`;
    
    let sessionsText = '';
    if (sessions.length > 0) {
      sessionsText = '\nSessions:\n' + sessions.map(s => 
        `  ${s.start_time ? this.formatDate(s.start_time, 'time') : ''} - ${s.name}${s.speaker ? ` by ${s.speaker.name}` : ''}`
      ).join('\n');
    }

    let venueText = '';
    if (venue) {
      venueText = `\nVenue: ${venue.name}
Address: ${venue.address || 'TBD'}
${venue.map_url ? `Map: ${venue.map_url}` : ''}`;
    }

    const text = `** This is an auto generated mail from null Community **

Gentle Reminder for the upcoming event!

${event.event_type?.description || ''}

Event: ${event.name}
Date: ${this.formatDate(event.start_time)}
${sessionsText}
${venueText}

For further details and Registration/RSVP please visit the following URL:
${this.baseUrl}/events/${event.slug || event.id}

p.s: You are receiving this e-mail because you registered for the event at our website.

- null Community Team`;

    return this.sendMail({ to: user.email, subject, text });
  }

  /**
   * Send speaker notification email when assigned to a session
   * Rails equivalent: session_speaker_notification_mail(event_session)
   */
  async sendSpeakerNotification({ speaker, session, event }) {
    const subject = `[null] Speaker: ${event.name}`;
    
    const text = `** This is an auto generated mail from null Community **

Thank you for volunteering to speak at:
${event.name}

Session Details:
Session:       ${session.name}
Event:         ${event.name}
Start Time:    ${this.formatDate(session.start_time || event.start_time)}

The session details are available at:
${this.baseUrl}/events/${event.slug || event.id}/sessions/${session.id}

You may edit the description of your session if you want, however you must be signed-in to the null Community platform in order to do so. Please follow the link below to edit session description:

${this.baseUrl}/events/${event.slug || event.id}/sessions/${session.id}/edit

We thank you for your contribution to the community.

- null Community Team`;

    return this.sendMail({ to: speaker.email, subject, text });
  }

  /**
   * Send speaker reminder email
   * Rails equivalent: session_speaker_reminder_mail(event_session)
   */
  async sendSpeakerReminder({ speaker, session, event }) {
    const subject = `[null] Reminder: Speaking at ${event.name}`;
    
    const text = `** This is an auto generated mail from null Community **

This is a reminder for your speaking/presentation session with below details:

Session:       ${session.name}
Event:         ${event.name}
Start Time:    ${this.formatDate(session.start_time || event.start_time)}

The session details are available at:
${this.baseUrl}/events/${event.slug || event.id}/sessions/${session.id}

You may edit the description of your session if you want, however you must be signed-in to the null Community platform in order to do so. Please follow the link below to edit session description:

${this.baseUrl}/events/${event.slug || event.id}/sessions/${session.id}/edit

We thank you for your contribution to the community.

- null Community Team`;

    return this.sendMail({ to: speaker.email, subject, text });
  }

  /**
   * Send presentation update request email
   * Rails equivalent: session_speaker_presentation_update_mail(event_session)
   */
  async sendPresentationUpdateRequest({ speaker, session, event }) {
    const subject = `[null] Please upload presentation: ${event.name}`;
    
    const text = `** This is an auto generated mail from null Community **

Thank you for volunteering to speak at:
${event.name}

Please upload your presentation to some service such as Slideshare or SpeakerDeck and update your session with the URL of your presentation. This will help attendees to easily access the presentation.

You may edit your session information, however you must be signed-in to the null Community platform in order to do so. Please follow the link below to update presentation URL:

${this.baseUrl}/events/${event.slug || event.id}/sessions/${session.id}/edit

Please note: You will be able to edit the session till 30 days past event date. In case of any errors feel free to send a note to moderator@null.community

We thank you for your contribution to the community.

- null Community Team`;

    return this.sendMail({ to: speaker.email, subject, text });
  }

  /**
   * Send admin notification when new event is created
   * Rails equivalent: admin_on_create_notification_mail(target, event)
   */
  async sendAdminEventNotification({ admin, event, chapter }) {
    const subject = `[null] New Event Created: ${event.name}`;
    
    const text = `** This is an auto generated mail from null Community **

A new event has been created:

Event:   ${event.name}
Type:    ${event.event_type?.name || 'N/A'}
Chapter: ${chapter?.name || 'N/A'}
Date:    ${this.formatDate(event.start_time)}

You can review and manage this event at:
${this.baseUrl}/leads/events/${event.id}

- null Community System`;

    return this.sendMail({ to: admin.email, subject, text });
  }

  /**
   * Send RSVP reminder to registered users
   * Rails equivalent: rsvp_user_reminder_mail(user, event)
   */
  async sendRsvpReminder({ user, event, sessions = [], venue }) {
    const subject = `[null] Reminder: ${event.name}`;
    
    let sessionsText = '';
    if (sessions.length > 0) {
      sessionsText = '\nSessions:\n' + sessions.map(s => 
        `  ${s.start_time ? this.formatDate(s.start_time, 'time') : ''} - ${s.name}${s.speaker ? ` by ${s.speaker.name}` : ''}`
      ).join('\n');
    }

    let venueText = '';
    if (venue) {
      venueText = `\nVenue: ${venue.name}
Address: ${venue.address || 'TBD'}
${venue.map_url ? `Map: ${venue.map_url}` : ''}`;
    }

    const text = `** This is an auto generated mail from null Community **

Gentle Reminder for the upcoming event!

${event.event_type?.description || ''}

Event: ${event.name}
Date: ${this.formatDate(event.start_time)}
${sessionsText}
${venueText}

For further details and Registration/RSVP please visit the following URL:
${this.baseUrl}/events/${event.slug || event.id}

p.s: You are receiving this e-mail because you registered for the event at our website.

- null Community Team`;

    return this.sendMail({ to: user.email, subject, text });
  }

  /**
   * Send custom email (for mass mailing)
   * Rails equivalent: custom_mail(user, subject, body)
   */
  async sendCustomEmail({ user, subject, body }) {
    // Personalize content
    let personalizedBody = body;
    personalizedBody = personalizedBody.replace(/{{name}}/g, user.name || 'Member');
    personalizedBody = personalizedBody.replace(/{{email}}/g, user.email || '');

    return this.sendMail({ 
      to: user.email, 
      subject: `[null] ${subject}`, 
      text: personalizedBody 
    });
  }

  // ============================================
  // SESSION EMAILS (from Rails misc_mailer.rb)
  // ============================================

  /**
   * Send session proposal notification to leads
   * Rails equivalent: session_proposal_mail(target, session_proposal)
   */
  async sendSessionProposalNotification({ lead, proposal, proposer }) {
    const subject = `[null] New Session Proposal: ${proposal.title}`;
    
    const text = `** This is an auto generated mail from null Community **

A new session has been proposed for your chapter:

Title:       ${proposal.title}
Proposed By: ${proposer?.name || proposal.proposed_by || 'Anonymous'}
Description: ${proposal.description || 'No description provided'}

Please review the proposal at:
${this.baseUrl}/leads/session-proposals/${proposal.id}

You can approve, request changes, or decline this proposal.

- null Community System`;

    return this.sendMail({ to: lead.email, subject, text });
  }

  /**
   * Send session request notification to leads
   * Rails equivalent: session_request_mail(target, session_request)
   */
  async sendSessionRequestNotification({ lead, request, requester }) {
    const subject = `[null] New Session Request: ${request.title}`;
    
    const text = `** This is an auto generated mail from null Community **

A new session has been requested for your chapter:

Title:        ${request.title}
Requested By: ${requester?.name || request.requested_by || 'Anonymous'}
Description:  ${request.description || 'No description provided'}

Please review the request at:
${this.baseUrl}/leads/session-requests/${request.id}

You can accept this request and schedule a session, or close it if not feasible.

- null Community System`;

    return this.sendMail({ to: lead.email, subject, text });
  }

  // ============================================
  // AUTH EMAILS (from Rails Devise templates)
  // ============================================

  /**
   * Send email confirmation instructions
   * Rails equivalent: devise/mailer/confirmation_instructions.html.erb
   */
  async sendConfirmationEmail({ user, confirmationToken }) {
    const subject = '[null] Confirm Your Email Address';
    const confirmUrl = `${this.baseUrl}/auth/confirm-email?token=${confirmationToken}`;
    
    const text = `Hello ${user.name || user.email}!

Welcome to null Community!

You can confirm your account email through the link below:

${confirmUrl}

If you didn't create an account with null Community, please ignore this email.

- null Community Team`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1a1a2e; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .button { display: inline-block; padding: 12px 24px; background: #4CAF50; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>null Community</h1>
    </div>
    <div class="content">
      <h2>Welcome!</h2>
      <p>Hello ${user.name || user.email}!</p>
      <p>Thank you for joining null Community. Please confirm your email address to complete your registration.</p>
      <p style="text-align: center;">
        <a href="${confirmUrl}" class="button">Confirm My Email</a>
      </p>
      <p>Or copy and paste this link in your browser:</p>
      <p style="word-break: break-all; font-size: 12px;">${confirmUrl}</p>
      <p>If you didn't create an account with null Community, please ignore this email.</p>
    </div>
    <div class="footer">
      <p>&copy; null Community</p>
    </div>
  </div>
</body>
</html>`;

    return this.sendMail({ to: user.email, subject, text, html });
  }

  /**
   * Send password reset instructions
   * Rails equivalent: devise/mailer/reset_password_instructions.html.erb
   */
  async sendPasswordResetEmail({ user, resetToken }) {
    const subject = '[null] Reset Your Password';
    const resetUrl = `${this.baseUrl}/auth/reset-password?token=${resetToken}`;
    
    const text = `Hello ${user.name || user.email}!

Someone has requested a link to change your password. You can do this through the link below:

${resetUrl}

If you didn't request this, please ignore this email.

Your password won't change until you access the link above and create a new one.

- null Community Team`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1a1a2e; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .button { display: inline-block; padding: 12px 24px; background: #e74c3c; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
    .warning { background: #fff3cd; border: 1px solid #ffc107; padding: 10px; border-radius: 4px; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>null Community</h1>
    </div>
    <div class="content">
      <h2>Reset Your Password</h2>
      <p>Hello ${user.name || user.email}!</p>
      <p>Someone has requested a link to change your password. You can do this through the button below:</p>
      <p style="text-align: center;">
        <a href="${resetUrl}" class="button">Change My Password</a>
      </p>
      <p>Or copy and paste this link in your browser:</p>
      <p style="word-break: break-all; font-size: 12px;">${resetUrl}</p>
      <div class="warning">
        <strong>Security Notice:</strong> If you didn't request this, please ignore this email. Your password won't change until you access the link above and create a new one.
      </div>
    </div>
    <div class="footer">
      <p>&copy; null Community</p>
    </div>
  </div>
</body>
</html>`;

    return this.sendMail({ to: user.email, subject, text, html });
  }

  /**
   * Send account unlock instructions
   * Rails equivalent: devise/mailer/unlock_instructions.html.erb
   */
  async sendUnlockEmail({ user, unlockToken }) {
    const subject = '[null] Unlock Your Account';
    const unlockUrl = `${this.baseUrl}/auth/unlock-account?token=${unlockToken}`;
    
    const text = `Hello ${user.name || user.email}!

Your account has been locked due to an excessive number of unsuccessful sign in attempts.

Click the link below to unlock your account:

${unlockUrl}

- null Community Team`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1a1a2e; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .button { display: inline-block; padding: 12px 24px; background: #3498db; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
    .alert { background: #f8d7da; border: 1px solid #f5c6cb; padding: 10px; border-radius: 4px; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>null Community</h1>
    </div>
    <div class="content">
      <h2>Account Locked</h2>
      <p>Hello ${user.name || user.email}!</p>
      <div class="alert">
        Your account has been locked due to an excessive number of unsuccessful sign in attempts.
      </div>
      <p>Click the button below to unlock your account:</p>
      <p style="text-align: center;">
        <a href="${unlockUrl}" class="button">Unlock My Account</a>
      </p>
      <p>Or copy and paste this link in your browser:</p>
      <p style="word-break: break-all; font-size: 12px;">${unlockUrl}</p>
    </div>
    <div class="footer">
      <p>&copy; null Community</p>
    </div>
  </div>
</body>
</html>`;

    return this.sendMail({ to: user.email, subject, text, html });
  }

  /**
   * Verify transporter connection
   */
  async verifyConnection() {
    this.initialize();
    if (!this.transporter) {
      return { success: false, message: 'SMTP not configured' };
    }
    
    try {
      await this.transporter.verify();
      return { success: true, message: 'SMTP connection verified' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

// Export singleton instance
module.exports = new EmailService();
