/**
 * OAuth Controller
 */
const service = require('./services');
const { successResponse, errorResponse } = require('../../shared/utils/response');
const axios = require('axios');

// OAuth configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const OAUTH_CALLBACK_URL = process.env.OAUTH_CALLBACK_URL || 'http://localhost:3000';

// Store state tokens temporarily (use Redis in production)
const stateTokens = new Map();

/**
 * Get GitHub OAuth URL
 */
const getGitHubAuthUrl = async (req, res) => {
  try {
    const state = service.generateStateToken();
    stateTokens.set(state, { timestamp: Date.now() });

    const params = new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      redirect_uri: `${OAUTH_CALLBACK_URL}/auth/callback/github`,
      scope: 'user:email read:user',
      state
    });

    const url = `https://github.com/login/oauth/authorize?${params}`;
    return successResponse(res, 'GitHub OAuth URL', { url, state });
  } catch (error) {
    console.error('GitHub auth URL error:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Handle GitHub OAuth callback
 */
const handleGitHubCallback = async (req, res) => {
  try {
    const { code, state } = req.body;

    // Verify state
    if (!stateTokens.has(state)) {
      return errorResponse(res, 'Invalid state token', 400);
    }
    stateTokens.delete(state);

    // Exchange code for tokens
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${OAUTH_CALLBACK_URL}/auth/callback/github`
      },
      { headers: { Accept: 'application/json' } }
    );

    const tokens = tokenResponse.data;
    if (tokens.error) {
      return errorResponse(res, tokens.error_description || 'Failed to get access token', 400);
    }

    // Get user profile
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });

    // Get user email if not public
    if (!userResponse.data.email) {
      const emailsResponse = await axios.get('https://api.github.com/user/emails', {
        headers: { Authorization: `Bearer ${tokens.access_token}` }
      });
      const primaryEmail = emailsResponse.data.find(e => e.primary);
      userResponse.data.email = primaryEmail?.email;
    }

    if (!userResponse.data.email) {
      return errorResponse(res, 'Could not get email from GitHub', 400);
    }

    const profile = service.parseGitHubProfile(userResponse.data, tokens);
    const user = await service.findOrCreateUser('github', profile);
    const token = service.generateToken(user);

    return successResponse(res, 'GitHub login successful', { user, token });
  } catch (error) {
    console.error('GitHub callback error:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Get Google OAuth URL
 */
const getGoogleAuthUrl = async (req, res) => {
  try {
    const state = service.generateStateToken();
    stateTokens.set(state, { timestamp: Date.now() });

    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: `${OAUTH_CALLBACK_URL}/auth/callback/google`,
      response_type: 'code',
      scope: 'openid email profile',
      state,
      access_type: 'offline',
      prompt: 'consent'
    });

    const url = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    return successResponse(res, 'Google OAuth URL', { url, state });
  } catch (error) {
    console.error('Google auth URL error:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Handle Google OAuth callback
 */
const handleGoogleCallback = async (req, res) => {
  try {
    const { code, state } = req.body;

    // Verify state
    if (!stateTokens.has(state)) {
      return errorResponse(res, 'Invalid state token', 400);
    }
    stateTokens.delete(state);

    // Exchange code for tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      code,
      redirect_uri: `${OAUTH_CALLBACK_URL}/auth/callback/google`,
      grant_type: 'authorization_code'
    });

    const tokens = tokenResponse.data;

    // Get user profile
    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });

    const profile = service.parseGoogleProfile(userResponse.data, tokens);
    const user = await service.findOrCreateUser('google', profile);
    const token = service.generateToken(user);

    return successResponse(res, 'Google login successful', { user, token });
  } catch (error) {
    console.error('Google callback error:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Get user's linked OAuth providers
 */
const getLinkedProviders = async (req, res) => {
  try {
    const profiles = await service.getUserAuthProfiles(req.user.id);
    return successResponse(res, 'Linked providers retrieved', profiles);
  } catch (error) {
    console.error('Get linked providers error:', error);
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Unlink OAuth provider
 */
const unlinkProvider = async (req, res) => {
  try {
    const { provider } = req.params;
    const unlinked = await service.unlinkProvider(req.user.id, provider);
    if (!unlinked) {
      return errorResponse(res, 'Provider not linked', 404);
    }
    return successResponse(res, `${provider} unlinked successfully`);
  } catch (error) {
    console.error('Unlink provider error:', error);
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getGitHubAuthUrl,
  handleGitHubCallback,
  getGoogleAuthUrl,
  handleGoogleCallback,
  getLinkedProviders,
  unlinkProvider
};
