/**
 * SessionRequest Model
 * Matches the session_requests table from Rails application
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SessionRequest = sequelize.define('SessionRequest', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Rails: chapter_id (required association)
    chapter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chapters',
        key: 'id'
      }
    },
    // Rails: user_id (required association)
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    // Rails field name: session_topic
    session_topic: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Rails field name: session_description
    session_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // Additional fields for enhanced functionality
    status: {
      type: DataTypes.STRING,
      defaultValue: 'open',
      validate: {
        isIn: [['open', 'in_progress', 'completed', 'closed']]
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
    tableName: 'session_requests',
    timestamps: true,
    underscored: true
  });

  // Virtual getters for backward compatibility
  SessionRequest.prototype.getTitle = function() {
    return this.session_topic;
  };

  SessionRequest.prototype.getDescription = function() {
    return this.session_description;
  };

  // Model associations
  SessionRequest.associate = (models) => {
    SessionRequest.belongsTo(models.Chapter, {
      foreignKey: 'chapter_id',
      as: 'chapter'
    });
    SessionRequest.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return SessionRequest;
};
