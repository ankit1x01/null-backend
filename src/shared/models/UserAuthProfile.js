/**
 * UserAuthProfile Model
 * Matches the user_auth_profiles table from Rails application
 * Stores OAuth provider profiles for users
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserAuthProfile = sequelize.define('UserAuthProfile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    // Rails field: uid (user ID from OAuth provider)
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'User ID from the OAuth provider'
    },
    // Rails field: provider
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'OAuth provider: google, github, twitter, etc.'
    },
    // Rails field: oauth_data (serialized hash)
    oauth_data: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'Full OAuth response data'
    },
    // Rails field: extra (serialized hash)
    extra: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
      comment: 'Additional metadata'
    },
    // Additional convenience fields
    provider_email: {
      type: DataTypes.STRING,
      comment: 'Email from OAuth provider'
    },
    provider_name: {
      type: DataTypes.STRING,
      comment: 'Name from OAuth provider'
    },
    provider_avatar: {
      type: DataTypes.STRING,
      comment: 'Avatar URL from OAuth provider'
    },
    access_token: {
      type: DataTypes.TEXT,
      comment: 'OAuth access token (encrypted)'
    },
    refresh_token: {
      type: DataTypes.TEXT,
      comment: 'OAuth refresh token (encrypted)'
    },
    token_expires_at: {
      type: DataTypes.DATE,
      comment: 'When the access token expires'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'user_auth_profiles',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'uid', 'provider']
      },
      {
        fields: ['user_id']
      }
    ]
  });

  // Rails: def self.find_for_omniauth(auth)
  UserAuthProfile.findForOmniauth = async function(auth) {
    const { User } = require('./index');
    if (!User) return null;

    const email = auth.info?.email;
    if (!email) return null;

    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    return await UserAuthProfile.findOne({
      where: {
        user_id: user.id,
        uid: auth.uid,
        provider: auth.provider
      }
    });
  };

  // Rails: def self.create_for_omniauth(auth)
  UserAuthProfile.createForOmniauth = async function(auth) {
    const { User } = require('./index');
    if (!User) return null;

    const email = auth.info?.email;
    const name = auth.info?.name;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      // Create new user
      const crypto = require('crypto');
      const randomPassword = crypto.randomBytes(20).toString('hex');

      user = await User.create({
        name: name,
        email: email,
        encrypted_password: randomPassword,
        confirmed_at: new Date() // Skip confirmation for OAuth users
      });
    }

    // Find or create auth profile
    let authProfile = await UserAuthProfile.findOne({
      where: {
        user_id: user.id,
        uid: auth.uid,
        provider: auth.provider
      }
    });

    if (!authProfile) {
      authProfile = await UserAuthProfile.create({
        user_id: user.id,
        uid: auth.uid,
        provider: auth.provider,
        oauth_data: auth,
        provider_email: auth.info?.email,
        provider_name: auth.info?.name,
        provider_avatar: auth.info?.image
      });
    }

    return authProfile;
  };

  // Rails: def update_omniauth!(auth)
  UserAuthProfile.prototype.updateOmniauth = async function(auth) {
    this.oauth_data = auth;
    await this.save();
  };

  // Rails: def profile_image_url
  UserAuthProfile.prototype.getProfileImageUrl = function() {
    return this.oauth_data?.info?.image || this.provider_avatar;
  };

  // Rails: def access_token
  UserAuthProfile.prototype.getAccessToken = function() {
    return this.oauth_data?.credentials?.token || this.access_token;
  };

  // Rails: def id_token
  UserAuthProfile.prototype.getIdToken = function() {
    return this.oauth_data?.extra?.id_token ||
           this.oauth_data?.extra?.raw_info?.id_token;
  };

  // Rails: def id_token_claims
  UserAuthProfile.prototype.getIdTokenClaims = function() {
    return this.oauth_data?.extra?.raw_info?.id_token_claims;
  };

  // Rails: def roles
  UserAuthProfile.prototype.getRoles = function() {
    const claims = this.getIdTokenClaims();
    return claims?.roles || [];
  };

  UserAuthProfile.associate = (models) => {
    UserAuthProfile.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return UserAuthProfile;
};
