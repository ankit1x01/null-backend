/**
 * Mass Email Services
 * Handles bulk email sending to event registrants
 */

const db = require('../../shared/models');
const { Op } = require('sequelize');
const emailService = require('../../shared/services/email.service');

class MassEmailService {
  /**
   * Get all email campaigns with pagination
   */
  async getCampaigns(filters = {}, page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const where = {};

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.event_id) {
      where.event_id = filters.event_id;
    }

    if (filters.chapter_id) {
      where.chapter_id = filters.chapter_id;
    }

    const { count, rows } = await db.MassEmailCampaign.findAndCountAll({
      where,
      include: [
        { model: db.Event, as: 'event', attributes: ['id', 'name'] },
        { model: db.Chapter, as: 'chapter', attributes: ['id', 'name'] },
        { model: db.User, as: 'createdBy', attributes: ['id', 'name', 'email'] }
      ],
      order: [['created_at', 'DESC']],
      limit,
      offset
    });

    return {
      campaigns: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    };
  }

  /**
   * Get campaign by ID
   */
  async getCampaignById(id) {
    const campaign = await db.MassEmailCampaign.findByPk(id, {
      include: [
        { model: db.Event, as: 'event' },
        { model: db.Chapter, as: 'chapter' },
        { model: db.User, as: 'createdBy', attributes: ['id', 'name', 'email'] },
        {
          model: db.MassEmailRecipient,
          as: 'recipients',
          include: [{ model: db.User, as: 'user', attributes: ['id', 'name', 'email'] }]
        }
      ]
    });

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    return campaign;
  }

  /**
   * Create a new email campaign
   */
  async createCampaign(data, userId) {
    const campaign = await db.MassEmailCampaign.create({
      ...data,
      created_by: userId,
      status: 'draft'
    });

    return campaign;
  }

  /**
   * Update campaign
   */
  async updateCampaign(id, data) {
    const campaign = await db.MassEmailCampaign.findByPk(id);

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    if (campaign.status === 'sent') {
      throw new Error('Cannot update a sent campaign');
    }

    await campaign.update(data);
    return campaign;
  }

  /**
   * Delete campaign
   */
  async deleteCampaign(id) {
    const campaign = await db.MassEmailCampaign.findByPk(id);

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    if (campaign.status === 'sending') {
      throw new Error('Cannot delete a campaign that is being sent');
    }

    // Delete recipients first
    await db.MassEmailRecipient.destroy({ where: { campaign_id: id } });
    await campaign.destroy();

    return { message: 'Campaign deleted successfully' };
  }

  /**
   * Get recipients for an event
   */
  async getEventRecipients(eventId, filters = {}) {
    const where = { event_id: eventId };

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.attended !== undefined) {
      where.attended = filters.attended;
    }

    const registrations = await db.EventRegistration.findAll({
      where,
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
          where: {
            email: { [Op.ne]: null }
          }
        }
      ]
    });

    return registrations.map(reg => ({
      user_id: reg.user_id,
      name: reg.user?.name,
      email: reg.user?.email,
      registration_status: reg.status,
      attended: reg.attended
    }));
  }

  /**
   * Get recipients for a chapter
   */
  async getChapterRecipients(chapterId) {
    // Get all users who have registered for events in this chapter
    const registrations = await db.EventRegistration.findAll({
      include: [
        {
          model: db.Event,
          as: 'event',
          where: { chapter_id: chapterId },
          attributes: ['id', 'name', 'chapter_id']
        },
        {
          model: db.User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
          where: {
            email: { [Op.ne]: null }
          }
        }
      ]
    });

    // Deduplicate users
    const userMap = new Map();
    registrations.forEach(reg => {
      if (reg.user && !userMap.has(reg.user.id)) {
        userMap.set(reg.user.id, {
          user_id: reg.user.id,
          name: reg.user.name,
          email: reg.user.email
        });
      }
    });

    return Array.from(userMap.values());
  }

  /**
   * Add recipients to a campaign
   */
  async addRecipients(campaignId, recipients) {
    const campaign = await db.MassEmailCampaign.findByPk(campaignId);

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    if (campaign.status !== 'draft') {
      throw new Error('Can only add recipients to draft campaigns');
    }

    const recipientRecords = recipients.map(r => ({
      campaign_id: campaignId,
      user_id: r.user_id,
      email: r.email,
      status: 'pending'
    }));

    await db.MassEmailRecipient.bulkCreate(recipientRecords, {
      ignoreDuplicates: true
    });

    // Update recipient count
    const count = await db.MassEmailRecipient.count({ where: { campaign_id: campaignId } });
    await campaign.update({ recipient_count: count });

    return { message: `Added ${recipients.length} recipients`, total: count };
  }

  /**
   * Remove recipient from campaign
   */
  async removeRecipient(campaignId, recipientId) {
    const campaign = await db.MassEmailCampaign.findByPk(campaignId);

    if (!campaign || campaign.status !== 'draft') {
      throw new Error('Cannot modify recipients');
    }

    await db.MassEmailRecipient.destroy({
      where: { id: recipientId, campaign_id: campaignId }
    });

    // Update recipient count
    const count = await db.MassEmailRecipient.count({ where: { campaign_id: campaignId } });
    await campaign.update({ recipient_count: count });

    return { message: 'Recipient removed' };
  }

  /**
   * Send campaign emails
   */
  async sendCampaign(campaignId) {
    const campaign = await db.MassEmailCampaign.findByPk(campaignId, {
      include: [
        { model: db.MassEmailRecipient, as: 'recipients', where: { status: 'pending' } }
      ]
    });

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    if (campaign.status === 'sent') {
      throw new Error('Campaign already sent');
    }

    if (!campaign.recipients || campaign.recipients.length === 0) {
      throw new Error('No pending recipients');
    }

    // Update campaign status
    await campaign.update({
      status: 'sending',
      sent_at: new Date()
    });

    // Process emails (in production, use a job queue)
    let sentCount = 0;
    let failedCount = 0;

    for (const recipient of campaign.recipients) {
      try {
        await this.sendEmail(recipient, campaign);
        await recipient.update({ status: 'sent', sent_at: new Date() });
        sentCount++;
      } catch (error) {
        await recipient.update({
          status: 'failed',
          error_message: error.message
        });
        failedCount++;
      }
    }

    // Update campaign status
    await campaign.update({
      status: 'sent',
      sent_count: sentCount,
      failed_count: failedCount
    });

    return {
      message: 'Campaign sent',
      sent: sentCount,
      failed: failedCount
    };
  }

  /**
   * Send individual email using email service
   */
  async sendEmail(recipient, campaign) {
    const personalizedBody = this.personalizeContent(campaign.body, recipient);

    return await emailService.sendMail({
      to: recipient.email,
      subject: campaign.subject,
      text: personalizedBody.replace(/<[^>]*>/g, ''), // Strip HTML for plain text
      html: personalizedBody
    });
  }

  /**
   * Personalize email content with recipient data
   */
  personalizeContent(content, recipient) {
    let personalized = content;
    personalized = personalized.replace(/{{name}}/g, recipient.name || 'Member');
    personalized = personalized.replace(/{{email}}/g, recipient.email || '');
    return personalized;
  }

  /**
   * Schedule campaign for later
   */
  async scheduleCampaign(campaignId, scheduledAt) {
    const campaign = await db.MassEmailCampaign.findByPk(campaignId);

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    if (campaign.status !== 'draft') {
      throw new Error('Can only schedule draft campaigns');
    }

    await campaign.update({
      status: 'scheduled',
      scheduled_at: scheduledAt
    });

    return campaign;
  }

  /**
   * Cancel scheduled campaign
   */
  async cancelScheduledCampaign(campaignId) {
    const campaign = await db.MassEmailCampaign.findByPk(campaignId);

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    if (campaign.status !== 'scheduled') {
      throw new Error('Campaign is not scheduled');
    }

    await campaign.update({
      status: 'draft',
      scheduled_at: null
    });

    return campaign;
  }

  /**
   * Get campaign statistics
   */
  async getCampaignStats(campaignId) {
    const campaign = await db.MassEmailCampaign.findByPk(campaignId);

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const stats = await db.MassEmailRecipient.findAll({
      where: { campaign_id: campaignId },
      attributes: [
        'status',
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
      ],
      group: ['status']
    });

    const statusCounts = stats.reduce((acc, stat) => {
      acc[stat.status] = parseInt(stat.get('count'));
      return acc;
    }, {});

    return {
      campaign_id: campaignId,
      total: campaign.recipient_count || 0,
      sent: statusCounts.sent || 0,
      failed: statusCounts.failed || 0,
      pending: statusCounts.pending || 0,
      opened: statusCounts.opened || 0,
      clicked: statusCounts.clicked || 0
    };
  }

  /**
   * Get email templates
   */
  async getTemplates() {
    return [
      {
        id: 'event_reminder',
        name: 'Event Reminder',
        subject: 'Reminder: {{event_name}} is coming up!',
        body: `<h1>Hello {{name}}!</h1>
<p>This is a friendly reminder that <strong>{{event_name}}</strong> is happening soon.</p>
<p>Date: {{event_date}}</p>
<p>Venue: {{event_venue}}</p>
<p>We look forward to seeing you there!</p>
<p>Best,<br>null Community Team</p>`
      },
      {
        id: 'event_update',
        name: 'Event Update',
        subject: 'Update: {{event_name}}',
        body: `<h1>Hello {{name}}!</h1>
<p>There's an important update about <strong>{{event_name}}</strong>.</p>
<p>{{update_message}}</p>
<p>Best,<br>null Community Team</p>`
      },
      {
        id: 'thank_you',
        name: 'Thank You',
        subject: 'Thank you for attending {{event_name}}!',
        body: `<h1>Hello {{name}}!</h1>
<p>Thank you for attending <strong>{{event_name}}</strong>!</p>
<p>We hope you found the session valuable. Your participation makes our community stronger.</p>
<p>Don't forget to check out upcoming events on our platform.</p>
<p>Best,<br>null Community Team</p>`
      },
      {
        id: 'newsletter',
        name: 'Newsletter',
        subject: 'null Community Newsletter - {{month}}',
        body: `<h1>Hello {{name}}!</h1>
<p>Here's what's happening in the null community this month:</p>
{{newsletter_content}}
<p>Stay secure,<br>null Community Team</p>`
      }
    ];
  }
}

module.exports = new MassEmailService();
