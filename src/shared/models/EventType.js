/**
 * EventType Model
 * Matches the event_types table from Rails application
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EventType = sequelize.define('EventType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT
    },
    max_participant: {
      type: DataTypes.INTEGER
    },
    public: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    registration_required: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    invitation_required: {
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
    tableName: 'event_types',
    timestamps: true,
    underscored: true
  });

  // Model associations
  EventType.associate = (models) => {
    EventType.hasMany(models.Event, {
      foreignKey: 'event_type_id',
      as: 'events'
    });
  };

  return EventType;
};
