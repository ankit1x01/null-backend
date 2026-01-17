/**
 * User API Tokens Services
 * Personal API token management for programmatic access
 */
const crypto = require('crypto');
const db = require('../../shared/models');

class UserApiTokensService {
  /**
   * Generate secure token
   */
  generateToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Hash token for storage
   */
  hashToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  /**
   * Get all tokens for a user (without actual token values)
   */
  async getUserTokens(userId) {
    return await db.UserApiToken.findAll({
      where: { user_id: userId },
      attributes: ['id', 'name', 'last_used_at', 'expires_at', 'created_at'],
      order: [['created_at', 'DESC']]
    });
  }

  /**
   * Create new API token
   */
  async createToken(userId, data) {
    const rawToken = this.generateToken();
    const hashedToken = this.hashToken(rawToken);

    // Calculate expiry (default 1 year)
    const expiresAt = data.expires_at || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    const token = await db.UserApiToken.create({
      user_id: userId,
      name: data.name,
      token_hash: hashedToken,
      expires_at: expiresAt
    });

    // Return with raw token (only shown once)
    return {
      id: token.id,
      name: token.name,
      token: rawToken, // Only returned at creation time
      expires_at: token.expires_at,
      created_at: token.created_at
    };
  }

  /**
   * Revoke/delete token
   */
  async revokeToken(userId, tokenId) {
    const token = await db.UserApiToken.findOne({
      where: { id: tokenId, user_id: userId }
    });
    if (!token) return false;
    await token.destroy();
    return true;
  }

  /**
   * Validate API token
   */
  async validateToken(rawToken) {
    const hashedToken = this.hashToken(rawToken);
    
    const token = await db.UserApiToken.findOne({
      where: { token_hash: hashedToken },
      include: [{ model: db.User, as: 'user' }]
    });

    if (!token) return null;

    // Check expiry
    if (token.expires_at && new Date(token.expires_at) < new Date()) {
      return null;
    }

    // Update last used
    await token.update({ last_used_at: new Date() });

    return token.user;
  }

  /**
   * Regenerate token (creates new token, keeps name and settings)
   */
  async regenerateToken(userId, tokenId) {
    const existing = await db.UserApiToken.findOne({
      where: { id: tokenId, user_id: userId }
    });
    if (!existing) return null;

    const rawToken = this.generateToken();
    const hashedToken = this.hashToken(rawToken);

    await existing.update({ token_hash: hashedToken });

    return {
      id: existing.id,
      name: existing.name,
      token: rawToken,
      expires_at: existing.expires_at
    };
  }

  /**
   * Update token name
   */
  async updateTokenName(userId, tokenId, name) {
    const token = await db.UserApiToken.findOne({
      where: { id: tokenId, user_id: userId }
    });
    if (!token) return null;
    await token.update({ name });
    return token;
  }
}

module.exports = new UserApiTokensService();
