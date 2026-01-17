/**
 * SlackNotificationLog Model
 * Logs all Slack notifications sent
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SlackNotificationLog = sequelize.define('SlackNotificationLog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    integration_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'slack_integrations',
        key: 'id'
      }
    },
    notification_type: {
      type: DataTypes.ENUM('new_event', 'event_update', 'new_session', 'registration', 'custom', 'test'),
      allowNull: false
    },
    reference_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'ID of the related event, session, etc.'
    },
    status: {
      type: DataTypes.ENUM('sent', 'failed'),
      allowNull: false
    },
    error_message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    payload: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'The message payload that was sent'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'slack_notification_logs',
    underscored: true,
    timestamps: true,
    updatedAt: false
  });

  SlackNotificationLog.associate = (models) => {
    SlackNotificationLog.belongsTo(models.SlackIntegration, {
      foreignKey: 'integration_id',
      as: 'integration'
    });
  };

  return SlackNotificationLog;
};
