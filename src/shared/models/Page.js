/**
 * Page Model
 * Matches the pages table from Rails application
 */

const { DataTypes } = require('sequelize');
const slugify = require('slugify');

module.exports = (sequelize) => {
  const Page = sequelize.define('Page', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Rails field: name (required)
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Rails field: description (required)
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // Rails field: navigation_name (required)
    navigation_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Rails field: title (required)
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Rails field: content (required)
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    // Rails field: slug (auto-generated)
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    // Rails field: published
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    tableName: 'pages',
    timestamps: true,
    underscored: true,
    hooks: {
      // Rails: after_create :slugify!
      afterCreate: async (page) => {
        if (!page.slug) {
          page.slug = slugify(`${page.name} ${page.id}`, {
            lower: true,
            strict: true
          });
          await page.save();
        }
      }
    },
    scopes: {
      // Rails: scope :published
      published: {
        where: {
          published: true
        }
      }
    }
  });

  // Model associations
  Page.associate = (models) => {
    Page.hasMany(models.PagePermission, {
      foreignKey: 'page_id',
      as: 'permissions'
    });
  };

  return Page;
};
