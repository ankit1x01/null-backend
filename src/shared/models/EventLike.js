/**
 * Event Like Model
 * For session voting/reactions
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EventLike = sequelize.define('EventLike', {
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
    reaction_type: {
      type: DataTypes.STRING,
      defaultValue: 'like',
      comment: 'like, love, insightful, helpful'
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
    tableName: 'event_likes',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['event_session_id', 'user_id']
      }
    ]
  });

  // Reaction types
  EventLike.TYPES = {
    LIKE: 'like',
    LOVE: 'love',
    INSIGHTFUL: 'insightful',
    HELPFUL: 'helpful'
  };

  // Model associations
  EventLike.associate = (models) => {
    EventLike.belongsTo(models.EventSession, {
      foreignKey: 'event_session_id',
      as: 'eventSession'
    });
    EventLike.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return EventLike;
};
