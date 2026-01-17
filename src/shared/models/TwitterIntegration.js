/**
 * TwitterIntegration Model
 * Stores Twitter/X API credentials and posting history
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TwitterIntegration = sequelize.define('TwitterIntegration', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    chapter_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'chapters',
        key: 'id'
      },
      comment: 'Chapter-specific Twitter account (null for global)'
    },
    twitter_handle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    api_key: {
      type: DataTypes.STRING,
      comment: 'Encrypted API key'
    },
    api_secret: {
      type: DataTypes.STRING,
      comment: 'Encrypted API secret'
    },
    access_token: {
      type: DataTypes.STRING,
      comment: 'Encrypted access token'
    },
    access_token_secret: {
      type: DataTypes.STRING,
      comment: 'Encrypted access token secret'
    },
    bearer_token: {
      type: DataTypes.STRING,
      comment: 'Encrypted bearer token for API v2'
    },
    auto_tweet_events: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    tweet_template: {
      type: DataTypes.TEXT,
      defaultValue: '🎉 New Event: {{event_name}}!\n📅 {{date}}\n📍 {{venue}}\n\nRegister now: {{url}}\n\n#null #security #infosec'
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    last_tweet_at: {
      type: DataTypes.DATE
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
    tableName: 'twitter_integrations',
    timestamps: true,
    underscored: true
  });

  TwitterIntegration.associate = (models) => {
    TwitterIntegration.belongsTo(models.Chapter, {
      foreignKey: 'chapter_id',
      as: 'chapter'
    });
  };

  return TwitterIntegration;
};
