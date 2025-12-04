/**
 * UserApiToken Model
 * Matches the user_api_tokens table from Rails application
 */

const { DataTypes } = require('sequelize');
const crypto = require('crypto');

module.exports = (sequelize) => {
  const UserApiToken = sequelize.define('UserApiToken', {
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
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    client_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expire_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    last_used_at: {
      type: DataTypes.DATE
    },
    ip_address: {
      type: DataTypes.STRING
    },
    user_agent: {
      type: DataTypes.TEXT
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
    tableName: 'user_api_tokens',
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: (apiToken) => {
        if (!apiToken.token) {
          apiToken.token = crypto.randomBytes(32).toString('hex');
        }
        if (!apiToken.expire_at) {
          const expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 30); // 30 days expiry
          apiToken.expire_at = expireDate;
        }
      }
    }
  });

  // Instance methods
  UserApiToken.prototype.isExpired = function() {
    return new Date() > this.expire_at;
  };

  // Model associations
  UserApiToken.associate = (models) => {
    UserApiToken.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return UserApiToken;
};
