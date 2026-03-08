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
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    requested_by: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
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
