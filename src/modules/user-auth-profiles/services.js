/**
 * User Auth Profiles Services
 * Manages OAuth provider profiles linked to users
 */
const db = require('../../shared/models');

class UserAuthProfilesService {
  /**
   * Get all auth profiles for a user
   */
  async getUserProfiles(userId) {
    return await db.UserAuthProfile.findAll({
      where: { user_id: userId },
      attributes: ['id', 'provider', 'provider_uid', 'email', 'created_at', 'updated_at']
    });
  }

  /**
   * Get profile by ID
   */
  async getProfileById(id) {
    return await db.UserAuthProfile.findByPk(id);
  }

  /**
   * Find profile by provider and UID
   */
  async findByProvider(provider, providerUid) {
    return await db.UserAuthProfile.findOne({
      where: { provider, provider_uid: providerUid },
      include: [{ model: db.User, as: 'user' }]
    });
  }

  /**
   * Link OAuth provider to user
   */
  async linkProvider(userId, providerData) {
    // Check if provider already linked to another user
    const existing = await this.findByProvider(providerData.provider, providerData.provider_uid);
    if (existing && existing.user_id !== userId) {
      throw new Error('This provider account is already linked to another user');
    }
    if (existing && existing.user_id === userId) {
      // Update existing link
      return await existing.update(providerData);
    }

    return await db.UserAuthProfile.create({
      user_id: userId,
      ...providerData
    });
  }

  /**
   * Unlink OAuth provider from user
   */
  async unlinkProvider(userId, provider) {
    const profile = await db.UserAuthProfile.findOne({
      where: { user_id: userId, provider }
    });
    if (!profile) {
      throw new Error('Provider not linked');
    }

    // Ensure user has another auth method
    const profiles = await this.getUserProfiles(userId);
    const user = await db.User.findByPk(userId);
    
    if (profiles.length <= 1 && !user.password_digest) {
      throw new Error('Cannot unlink the only authentication method');
    }

    await profile.destroy();
    return true;
  }

  /**
   * Update profile tokens
   */
  async updateTokens(profileId, tokens) {
    const profile = await db.UserAuthProfile.findByPk(profileId);
    if (!profile) return null;
    return await profile.update({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      token_expires_at: tokens.expires_at
    });
  }

  /**
   * Create or update profile from OAuth callback
   */
  async createOrUpdateFromOAuth(userId, providerData) {
    const existing = await db.UserAuthProfile.findOne({
      where: {
        user_id: userId,
        provider: providerData.provider
      }
    });

    if (existing) {
      return await existing.update(providerData);
    }

    return await db.UserAuthProfile.create({
      user_id: userId,
      ...providerData
    });
  }

  /**
   * Get connected providers count
   */
  async getConnectedProvidersCount(userId) {
    return await db.UserAuthProfile.count({
      where: { user_id: userId }
    });
  }
}

module.exports = new UserAuthProfilesService();
