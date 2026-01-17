/**
 * AdminUser Model
 * Separate admin users table (like active_admin)
 */

const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const AdminUser = sequelize.define('AdminUser', {
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
    name: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM('super_admin', 'admin', 'moderator'),
      defaultValue: 'admin'
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
    tableName: 'admin_users',
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

  AdminUser.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.encrypted_password);
  };

  AdminUser.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.encrypted_password;
    delete values.reset_password_token;
    return values;
  };

  return AdminUser;
};
