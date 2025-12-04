/**
 * Stat Model
 * Matches the stats table from Rails application
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Stat = sequelize.define('Stat', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    chapter_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'chapters',
        key: 'id'
      }
    },
    events_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    sessions_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    participants_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
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
    tableName: 'stats',
    timestamps: true,
    underscored: true
  });

  // Model associations
  Stat.associate = (models) => {
    Stat.belongsTo(models.Chapter, {
      foreignKey: 'chapter_id',
      as: 'chapter'
    });
  };

  return Stat;
};
