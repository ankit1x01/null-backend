/**
 * ChapterLead Model
 * Matches the chapter_leads table from Rails application
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ChapterLead = sequelize.define('ChapterLead', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    chapter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chapters',
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
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
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
    tableName: 'chapter_leads',
    timestamps: true,
    underscored: true,
    scopes: {
      active: {
        where: {
          active: true
        }
      }
    }
  });

  // Model associations
  ChapterLead.associate = (models) => {
    ChapterLead.belongsTo(models.Chapter, {
      foreignKey: 'chapter_id',
      as: 'chapter'
    });
    ChapterLead.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return ChapterLead;
};
