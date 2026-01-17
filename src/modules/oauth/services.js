/**
 * OAuth Module Services
 * Handles OAuth authentication with Google and GitHub
 */
const db = require('../../shared/models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class OAuthService {
  /**
   * Find or create user from OAuth profile
   */
  async findOrCreateUser(provider, profile) {
    // Check if auth profile exists
    let authProfile = await db.UserAuthProfile.findOne({
      where: {
        provider,
        provider_uid: profile.id
      },
      include: [{ model: db.User, as: 'user' }]
    });

    if (authProfile && authProfile.user) {
      // Update profile info
      await authProfile.update({
        provider_name: profile.name,
        provider_avatar: profile.avatar,
        access_token: profile.accessToken,
        refresh_token: profile.refreshToken,
        token_expires_at: profile.expiresAt,
        raw_info: profile.rawInfo
      });
      return authProfile.user;
    }

    // Check if user exists by email
    let user = await db.User.findOne({ where: { email: profile.email } });

    if (!user) {
      // Create new user
      user = await db.User.create({
        email: profile.email,
        name: profile.name || profile.email.split('@')[0],
        encrypted_password: crypto.randomBytes(32).toString('hex'), // Random password
        confirmed_at: new Date(), // Auto-confirm OAuth users
        avatar: profile.avatar,
        github_profile: provider === 'github' ? profile.profileUrl : null
      });
    }

    // Create auth profile link
    await db.UserAuthProfile.create({
      user_id: user.id,
      provider,
      provider_uid: profile.id,
      provider_email: profile.email,
      provider_name: profile.name,
      provider_avatar: profile.avatar,
      access_token: profile.accessToken,
      refresh_token: profile.refreshToken,
      token_expires_at: profile.expiresAt,
      raw_info: profile.rawInfo
    });

    return user;
  }

  /**
   * Get OAuth profile for user
   */
  async getUserAuthProfiles(userId) {
    return await db.UserAuthProfile.findAll({
      where: { user_id: userId },
      attributes: ['id', 'provider', 'provider_email', 'provider_name', 'provider_avatar', 'created_at']
    });
  }

  /**
   * Unlink OAuth provider from user
   */
  async unlinkProvider(userId, provider) {
    const profile = await db.UserAuthProfile.findOne({
      where: { user_id: userId, provider }
    });
    if (!profile) return false;
    await profile.destroy();
    return true;
  }

  /**
   * Generate JWT token for user
   */
  generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, admin: user.admin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
  }

  /**
   * Generate OAuth state token
   */
  generateStateToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Verify OAuth state token
   */
  verifyStateToken(state, storedState) {
    return state === storedState;
  }

  /**
   * Parse GitHub profile
   */
  parseGitHubProfile(data, tokens) {
    return {
      id: data.id.toString(),
      email: data.email,
      name: data.name || data.login,
      avatar: data.avatar_url,
      profileUrl: data.html_url,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: tokens.expires_at ? new Date(tokens.expires_at * 1000) : null,
      rawInfo: data
    };
  }

  /**
   * Parse Google profile
   */
  parseGoogleProfile(data, tokens) {
    return {
      id: data.sub || data.id,
      email: data.email,
      name: data.name,
      avatar: data.picture,
      profileUrl: null,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
      rawInfo: data
    };
  }
}

module.exports = new OAuthService();
