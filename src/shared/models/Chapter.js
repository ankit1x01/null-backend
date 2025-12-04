/**
 * Chapter Model
 * Matches the chapters table from Rails application
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Chapter = sequelize.define('Chapter', {
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
      type: DataTypes.TEXT,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATE
    },
    code: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    country: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    chapter_email: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    twitter_handle: {
      type: DataTypes.STRING
    },
    facebook_profile: {
      type: DataTypes.STRING
    },
    github_profile: {
      type: DataTypes.STRING
    },
    linkedin_profile: {
      type: DataTypes.STRING
    },
    slideshare_profile: {
      type: DataTypes.STRING
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
    tableName: 'chapters',
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

  // Instance methods
  Chapter.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.created_at;
    delete values.updated_at;
    return values;
  };

  // Model associations
  Chapter.associate = (models) => {
    Chapter.hasMany(models.Event, {
      foreignKey: 'chapter_id',
      as: 'events'
    });
    Chapter.hasMany(models.ChapterLead, {
      foreignKey: 'chapter_id',
      as: 'chapterLeads'
    });
    Chapter.hasMany(models.Venue, {
      foreignKey: 'chapter_id',
      as: 'venues'
    });
  };

  return Chapter;
};
