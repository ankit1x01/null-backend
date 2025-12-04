/**
 * EventRegistration Model
 * Matches the event_registrations table from Rails application
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EventRegistration = sequelize.define('EventRegistration', {
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    state: {
      type: DataTypes.STRING,
      defaultValue: 'Provisional',
      validate: {
        isIn: [['Provisional', 'Confirmed', 'Not Attending', 'Absent']]
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
    tableName: 'event_registrations',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'event_id']
      }
    ]
  });

  // Model associations
  EventRegistration.associate = (models) => {
    EventRegistration.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event'
    });
    EventRegistration.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return EventRegistration;
};
