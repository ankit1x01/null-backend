/**
 * SlackIntegration Model
 * Stores Slack integration settings per chapter
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SlackIntegration = sequelize.define('SlackIntegration', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    chapter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'chapters',
        key: 'id'
      }
    },
    webhook_url: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    channel_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    bot_token: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: 'Optional: Bot token for advanced features'
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    notify_new_events: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    notify_event_updates: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    notify_registrations: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    notify_new_sessions: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    last_notification_at: {
      type: DataTypes.DATE,
      allowNull: true
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
    tableName: 'slack_integrations',
    underscored: true,
    timestamps: true
  });

  SlackIntegration.associate = (models) => {
    SlackIntegration.belongsTo(models.Chapter, {
      foreignKey: 'chapter_id',
      as: 'chapter'
    });
    SlackIntegration.hasMany(models.SlackNotificationLog, {
      foreignKey: 'integration_id',
      as: 'logs'
    });
  };

  return SlackIntegration;
};
