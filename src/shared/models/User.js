/**
 * User Model
 * Matches the users table from Rails application
 */

const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    encrypted_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reset_password_token: {
      type: DataTypes.STRING,
      unique: true
    },
    reset_password_sent_at: {
      type: DataTypes.DATE
    },
    remember_created_at: {
      type: DataTypes.DATE
    },
    sign_in_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    current_sign_in_at: {
      type: DataTypes.DATE
    },
    last_sign_in_at: {
      type: DataTypes.DATE
    },
    current_sign_in_ip: {
      type: DataTypes.STRING
    },
    last_sign_in_ip: {
      type: DataTypes.STRING
    },
    confirmation_token: {
      type: DataTypes.STRING,
      unique: true
    },
    confirmed_at: {
      type: DataTypes.DATE
    },
    confirmation_sent_at: {
      type: DataTypes.DATE
    },
    unconfirmed_email: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    homepage: {
      type: DataTypes.STRING
    },
    about_me: {
      type: DataTypes.TEXT('long')
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
    handle: {
      type: DataTypes.STRING
    },
    avatar: {
      type: DataTypes.STRING
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.encrypted_password) {
          user.encrypted_password = await bcrypt.hash(user.encrypted_password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('encrypted_password')) {
          user.encrypted_password = await bcrypt.hash(user.encrypted_password, 10);
        }
      }
    }
  });

  // Instance methods
  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.encrypted_password);
  };

  User.prototype.getGravatarUrl = function () {
    const crypto = require('crypto');
    const hash = crypto.createHash('md5').update(this.email.trim().toLowerCase()).digest('hex');
    return `https://secure.gravatar.com/avatar/${hash}`;
  };

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.encrypted_password;
    delete values.reset_password_token;
    delete values.confirmation_token;
    return values;
  };

  // Model associations
  User.associate = (models) => {
    User.hasMany(models.EventSession, {
      foreignKey: 'user_id',
      as: 'eventSessions'
    });
    User.hasMany(models.EventRegistration, {
      foreignKey: 'user_id',
      as: 'eventRegistrations'
    });
    User.hasMany(models.EventSessionComment, {
      foreignKey: 'user_id',
      as: 'comments'
    });
    User.hasMany(models.ChapterLead, {
      foreignKey: 'user_id',
      as: 'chapterLeads'
    });
    User.hasMany(models.UserApiToken, {
      foreignKey: 'user_id',
      as: 'apiTokens'
    });
    User.hasMany(models.SessionProposal, {
      foreignKey: 'user_id',
      as: 'sessionProposals'
    });
    User.hasMany(models.UserAchievement, {
      foreignKey: 'user_id',
      as: 'achievements'
    });
  };

  return User;
};
