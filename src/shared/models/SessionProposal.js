/**
 * SessionProposal Model
 * Matches the session_proposals table from Rails application
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SessionProposal = sequelize.define('SessionProposal', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
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
    // Rails: event_type_id (required association)
    event_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'event_types',
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
    session_type: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      validate: {
        isIn: [['pending', 'approved', 'rejected']]
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
    tableName: 'session_proposals',
    timestamps: true,
    underscored: true
  });

  // Virtual getters for backward compatibility with Node.js code using title/description
  SessionProposal.prototype.getTitle = function() {
    return this.session_topic;
  };

  SessionProposal.prototype.getDescription = function() {
    return this.session_description;
  };

  // Model associations
  SessionProposal.associate = (models) => {
    SessionProposal.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    SessionProposal.belongsTo(models.Chapter, {
      foreignKey: 'chapter_id',
      as: 'chapter'
    });
    SessionProposal.belongsTo(models.EventType, {
      foreignKey: 'event_type_id',
      as: 'eventType'
    });
  };

  return SessionProposal;
};
