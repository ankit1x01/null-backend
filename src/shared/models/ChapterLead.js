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
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'chapter_id'],
        name: 'chapter_leads_user_chapter_unique'
      }
    ],
    scopes: {
      active: {
        where: {
          active: true
        }
      }
    },
    // Rails: validates :user_id, :uniqueness => { :scope => [:chapter_id] }
    validate: {
      async uniqueUserChapter() {
        if (this.isNewRecord) {
          const existing = await ChapterLead.findOne({
            where: {
              user_id: this.user_id,
              chapter_id: this.chapter_id
            }
          });
          if (existing) {
            throw new Error('User is already a leader of this chapter.');
          }
        }
      }
    }
  });

  // Rails: def self.leadership_for_user(user)
  ChapterLead.leadershipForUser = async function(userId) {
    return await ChapterLead.findAll({
      where: { user_id: userId }
    });
  };

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
