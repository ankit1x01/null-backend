/**
 * Event Notification Model
 * Tracks notification state and scheduled reminders for events
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EventNotification = sequelize.define('EventNotification', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id'
      }
    },
    notification_type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'announcement, reminder_1, reminder_2, speaker_notification, presentation_update'
    },
    notification_state: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      comment: 'pending, scheduled, sent, failed'
    },
    scheduled_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    recipients_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    channels: {
      type: DataTypes.JSON,
      defaultValue: ['email'],
      comment: 'Array of channels: email, slack, twitter'
    },
    email_sent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    slack_sent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    twitter_sent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    error_message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    metadata: {
      type: DataTypes.JSON,
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
    tableName: 'event_notifications',
    timestamps: true,
    underscored: true
  });

  // Notification types
  EventNotification.TYPES = {
    ANNOUNCEMENT: 'announcement',
    REMINDER_1: 'reminder_1',
    REMINDER_2: 'reminder_2',
    SPEAKER_NOTIFICATION: 'speaker_notification',
    SPEAKER_REMINDER: 'speaker_reminder',
    PRESENTATION_UPDATE: 'presentation_update',
    ADMIN_NOTIFICATION: 'admin_notification'
  };

  // States
  EventNotification.STATES = {
    PENDING: 'pending',
    SCHEDULED: 'scheduled',
    PROCESSING: 'processing',
    SENT: 'sent',
    FAILED: 'failed'
  };

  // Model associations
  EventNotification.associate = (models) => {
    EventNotification.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event'
    });
  };

  return EventNotification;
};
