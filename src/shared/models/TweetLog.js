/**
 * TweetLog Model
 * Logs all tweets sent via the platform
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TweetLog = sequelize.define('TweetLog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    twitter_integration_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'twitter_integrations',
        key: 'id'
      }
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'events',
        key: 'id'
      }
    },
    tweet_id: {
      type: DataTypes.STRING,
      comment: 'Twitter tweet ID'
    },
    tweet_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tweet_type: {
      type: DataTypes.ENUM('event_announcement', 'event_reminder', 'event_update', 'manual'),
      defaultValue: 'event_announcement'
    },
    status: {
      type: DataTypes.ENUM('pending', 'sent', 'failed'),
      defaultValue: 'pending'
    },
    error_message: {
      type: DataTypes.TEXT
    },
    sent_at: {
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
    tableName: 'tweet_logs',
    timestamps: true,
    underscored: true
  });

  TweetLog.associate = (models) => {
    TweetLog.belongsTo(models.TwitterIntegration, {
      foreignKey: 'twitter_integration_id',
      as: 'twitterIntegration'
    });
    TweetLog.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event'
    });
  };

  return TweetLog;
};
