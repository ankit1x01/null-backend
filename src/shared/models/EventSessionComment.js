/**
 * EventSessionComment Model
 * Matches the event_session_comments table from Rails application
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EventSessionComment = sequelize.define('EventSessionComment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    event_session_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'event_sessions',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
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
    tableName: 'event_session_comments',
    timestamps: true,
    underscored: true
  });

  // Model associations
  EventSessionComment.associate = (models) => {
    EventSessionComment.belongsTo(models.EventSession, {
      foreignKey: 'event_session_id',
      as: 'eventSession'
    });
    EventSessionComment.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return EventSessionComment;
};
