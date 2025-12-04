/**
 * PagePermission Model
 * Matches the page_permissions table
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PagePermission = sequelize.define('PagePermission', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    page_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pages',
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
    permission_type: {
      type: DataTypes.ENUM('read', 'write'),
      allowNull: false,
      defaultValue: 'read'
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
    tableName: 'page_permissions',
    timestamps: true,
    underscored: true
  });

  // Model associations
  PagePermission.associate = (models) => {
    PagePermission.belongsTo(models.Page, {
      foreignKey: 'page_id',
      as: 'page'
    });
    PagePermission.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return PagePermission;
};
