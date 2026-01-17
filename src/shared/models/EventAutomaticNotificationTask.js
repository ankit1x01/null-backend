/**
 * EventAutomaticNotificationTask Model
 * Matches the event_automatic_notification_tasks table from Rails application
 * Handles automatic notifications (announcements, reminders, speaker notifications)
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EventAutomaticNotificationTask = sequelize.define('EventAutomaticNotificationTask', {
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
    // Mode/type of notification
    mode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [[
          'Announcement',
          'Speaker Notification',
          'Event Reminder',
          'Event Reminder Final',
          'Speaker Reminder',
          'Admin OnCreate Notification',
          'Speaker Presentation Update'
        ]]
      }
    },
    // Flag to indicate if task has been executed
    executed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    tableName: 'event_automatic_notification_tasks',
    timestamps: true,
    underscored: true
  });

  // Mode constants (from Rails)
  EventAutomaticNotificationTask.MODES = {
    EVENT_ANNOUNCEMENT: 'Announcement',
    SPEAKER_NOTIFICATION: 'Speaker Notification',
    EVENT_REMINDER: 'Event Reminder',
    EVENT_REMINDER_FINAL: 'Event Reminder Final',
    SPEAKER_REMINDER: 'Speaker Reminder',
    ADMIN_CREATE_NOTIFICATION: 'Admin OnCreate Notification',
    SPEAKER_PRESENTATION_UPDATE: 'Speaker Presentation Update'
  };

  // Get all valid modes
  EventAutomaticNotificationTask.getAllModes = function() {
    return Object.values(EventAutomaticNotificationTask.MODES);
  };

  // Model associations
  EventAutomaticNotificationTask.associate = (models) => {
    EventAutomaticNotificationTask.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event'
    });
  };

  return EventAutomaticNotificationTask;
};
