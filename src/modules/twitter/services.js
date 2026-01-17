/**
 * Twitter Integration Services
 */
const db = require('../../shared/models');

class TwitterService {
  /**
   * Get all Twitter integrations
   */
  async getAllIntegrations() {
    return await db.TwitterIntegration.findAll({
      include: [{ model: db.Chapter, as: 'chapter' }],
      order: [['created_at', 'DESC']]
    });
  }

  /**
   * Get integration by ID
   */
  async getIntegrationById(id) {
    return await db.TwitterIntegration.findByPk(id, {
      include: [{ model: db.Chapter, as: 'chapter' }]
    });
  }

  /**
   * Get integration for chapter
   */
  async getIntegrationByChapter(chapterId) {
    return await db.TwitterIntegration.findOne({
      where: { chapter_id: chapterId, active: true }
    });
  }

  /**
   * Create integration
   */
  async createIntegration(data) {
    return await db.TwitterIntegration.create(data);
  }

  /**
   * Update integration
   */
  async updateIntegration(id, data) {
    const integration = await db.TwitterIntegration.findByPk(id);
    if (!integration) return null;
    await integration.update(data);
    return integration;
  }

  /**
   * Delete integration
   */
  async deleteIntegration(id) {
    const integration = await db.TwitterIntegration.findByPk(id);
    if (!integration) return false;
    await integration.destroy();
    return true;
  }

  /**
   * Tweet event announcement
   */
  async tweetEvent(eventId) {
    const event = await db.Event.findByPk(eventId, {
      include: [
        { model: db.Chapter, as: 'chapter' },
        { model: db.Venue, as: 'venue' }
      ]
    });
    if (!event) throw new Error('Event not found');

    // Get Twitter integration for chapter or global
    let integration = await this.getIntegrationByChapter(event.chapter_id);
    if (!integration) {
      integration = await db.TwitterIntegration.findOne({
        where: { chapter_id: null, active: true }
      });
    }
    if (!integration) throw new Error('No Twitter integration configured');

    // Format tweet
    const tweetText = this.formatTweet(integration.tweet_template, event);

    // Create tweet log
    const tweetLog = await db.TweetLog.create({
      twitter_integration_id: integration.id,
      event_id: eventId,
      tweet_text: tweetText,
      tweet_type: 'event_announcement',
      status: 'pending'
    });

    // Send tweet (placeholder - implement actual Twitter API call)
    try {
      const tweetId = await this.sendTweet(integration, tweetText);
      await tweetLog.update({
        tweet_id: tweetId,
        status: 'sent',
        sent_at: new Date()
      });

      await integration.update({ last_tweet_at: new Date() });

      return { success: true, tweetId, tweetText };
    } catch (error) {
      await tweetLog.update({
        status: 'failed',
        error_message: error.message
      });
      throw error;
    }
  }

  /**
   * Format tweet with template variables
   */
  formatTweet(template, event) {
    const date = new Date(event.start_time).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });

    let text = template
      .replace(/\{\{event_name\}\}/g, event.name)
      .replace(/\{\{date\}\}/g, date)
      .replace(/\{\{venue\}\}/g, event.venue?.name || 'Online')
      .replace(/\{\{chapter\}\}/g, event.chapter?.name || '')
      .replace(/\{\{url\}\}/g, `${process.env.FRONTEND_URL}/events/${event.id}`);

    // Trim to 280 characters
    if (text.length > 280) {
      text = text.substring(0, 277) + '...';
    }

    return text;
  }

  /**
   * Send tweet via Twitter API
   * Placeholder - implement actual Twitter API v2 call
   */
  async sendTweet(integration, text) {
    // TODO: Implement actual Twitter API call using integration credentials
    // This is a placeholder that simulates the tweet
    console.log(`[Twitter] Would send tweet: ${text}`);
    
    // In production, use twitter-api-v2 library:
    // const { TwitterApi } = require('twitter-api-v2');
    // const client = new TwitterApi({
    //   appKey: integration.api_key,
    //   appSecret: integration.api_secret,
    //   accessToken: integration.access_token,
    //   accessSecret: integration.access_token_secret,
    // });
    // const { data } = await client.v2.tweet(text);
    // return data.id;

    return `mock_tweet_${Date.now()}`;
  }

  /**
   * Get tweet history
   */
  async getTweetHistory(filters = {}) {
    const where = {};
    if (filters.event_id) where.event_id = filters.event_id;
    if (filters.status) where.status = filters.status;

    return await db.TweetLog.findAll({
      where,
      include: [
        { model: db.Event, as: 'event' },
        { model: db.TwitterIntegration, as: 'twitterIntegration' }
      ],
      order: [['created_at', 'DESC']],
      limit: filters.limit || 50
    });
  }

  /**
   * Retry failed tweet
   */
  async retryTweet(tweetLogId) {
    const tweetLog = await db.TweetLog.findByPk(tweetLogId, {
      include: [{ model: db.TwitterIntegration, as: 'twitterIntegration' }]
    });
    if (!tweetLog || tweetLog.status !== 'failed') {
      throw new Error('Tweet log not found or not in failed state');
    }

    try {
      const tweetId = await this.sendTweet(tweetLog.twitterIntegration, tweetLog.tweet_text);
      await tweetLog.update({
        tweet_id: tweetId,
        status: 'sent',
        sent_at: new Date(),
        error_message: null
      });
      return { success: true, tweetId };
    } catch (error) {
      await tweetLog.update({ error_message: error.message });
      throw error;
    }
  }
}

module.exports = new TwitterService();
