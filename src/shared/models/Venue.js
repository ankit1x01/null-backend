/**
 * Venue Model
 * Matches the venues table from Rails application
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Venue = sequelize.define('Venue', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    map_url: {
      type: DataTypes.STRING
    },
    map_embedd_code: {
      type: DataTypes.TEXT
    },
    contact_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_email: {
      type: DataTypes.STRING
    },
    contact_mobile: {
      type: DataTypes.STRING
    },
    contact_notes: {
      type: DataTypes.TEXT
    },
    chapter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chapters',
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
    tableName: 'venues',
    timestamps: true,
    underscored: true
  });

  // Model associations
  Venue.associate = (models) => {
    Venue.belongsTo(models.Chapter, {
      foreignKey: 'chapter_id',
      as: 'chapter'
    });
    Venue.hasMany(models.Event, {
      foreignKey: 'venue_id',
      as: 'events'
    });
  };

  return Venue;
};
