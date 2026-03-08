/**
 * User Achievement Model
 * Matches the user_achievements table from Rails application
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserAchievement = sequelize.define('UserAchievement', {
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
    // Rails field: achievement_type (required)
    achievement_type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Bug Discovery, Bug Bounty, Open Source, Community Support'
    },
    // Rails field: info (required)
    info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Rails field: reference (required, unique per user)
    reference: {
      type: DataTypes.STRING,
      allowNull: false
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
    tableName: 'user_achievements',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'reference']
      }
    ]
  });

  // Achievement type constants (from Rails)
  UserAchievement.TYPES = {
    BUG_DISCOVERY: 'Bug Discovery',
    BUG_BOUNTY: 'Bug Bounty',
    OPEN_SOURCE: 'Open Source',
    COMMUNITY_SUPPORT: 'Community Support'
  };

  // Achievement source constants (from Rails)
  UserAchievement.SOURCES = {
    SELF: 'Self',
    NULL: 'null'
  };

  UserAchievement.associate = (models) => {
    UserAchievement.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return UserAchievement;
};
