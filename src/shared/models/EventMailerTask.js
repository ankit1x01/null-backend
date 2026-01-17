/**
 * Event Mailer Task Model
 * For sending mass emails to event registrants
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EventMailerTask = sequelize.define('EventMailerTask', {
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
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    send_to_selected_only: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    registration_state: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Filter by registration state: Provisional, Confirmed, Not Attending, Absent'
    },
    ready_for_delivery: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    executed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      comment: 'pending, processing, completed, failed'
    },
    recipients_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    sent_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    failed_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    error_message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    executed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
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
    tableName: 'event_mailer_tasks',
    timestamps: true,
    underscored: true
  });

  // Model associations
  EventMailerTask.associate = (models) => {
    EventMailerTask.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event'
    });
    EventMailerTask.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'creator'
    });
  };

  return EventMailerTask;
};
