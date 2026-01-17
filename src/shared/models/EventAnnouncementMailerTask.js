/**
 * EventAnnouncementMailerTask Model
 * Matches the event_announcement_mailer_tasks table from Rails application
 * Sends announcement emails to a list of recipients
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EventAnnouncementMailerTask = sequelize.define('EventAnnouncementMailerTask', {
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
    // Recipients list (text with newline separators)
    recipients: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Newline-separated list of email addresses'
    },
    // Note to appear at the top of the email
    head_note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    // Note to appear at the bottom of the email
    foot_note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    // Flag to indicate if ready for sending
    ready_for_delivery: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // Flag to indicate if task has been executed
    executed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // Status of the task
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'pending, processing, completed, failed'
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
    tableName: 'event_announcement_mailer_tasks',
    timestamps: true,
    underscored: true
  });

  // Parse recipients into an array
  EventAnnouncementMailerTask.prototype.getRecipientsList = function() {
    if (!this.recipients) return [];
    return this.recipients
      .split(/[\n\r]+/)
      .map(email => email.trim())
      .filter(email => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  };

  // Model associations
  EventAnnouncementMailerTask.associate = (models) => {
    EventAnnouncementMailerTask.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event'
    });
  };

  return EventAnnouncementMailerTask;
};
