/**
 * PagePermission Model (PageAccessPermission in Rails)
 * Matches the page_access_permissions table from Rails application
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
    // Rails field: permission_type (ReadWrite or ReadOnly)
    permission_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'ReadOnly',
      validate: {
        isIn: [['ReadWrite', 'ReadOnly']]
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
    tableName: 'page_access_permissions',
    timestamps: true,
    underscored: true
  });

  // Permission type constants (from Rails)
  PagePermission.TYPES = {
    READWRITE: 'ReadWrite',
    READONLY: 'ReadOnly'
  };

  // Rails: def self.can_manage?(user, page)
  PagePermission.canManage = async function(userId, pageId) {
    if (!userId || !pageId) return false;

    const permission = await PagePermission.findOne({
      where: {
        user_id: userId,
        page_id: pageId,
        permission_type: PagePermission.TYPES.READWRITE
      }
    });

    return !!permission;
  };

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
