/**
 * MassEmailCampaign Model
 * Stores mass email campaign data
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MassEmailCampaign = sequelize.define('MassEmailCampaign', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    from_email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    from_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'events',
        key: 'id'
      }
    },
    chapter_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'chapters',
        key: 'id'
      }
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('draft', 'scheduled', 'sending', 'sent', 'cancelled'),
      defaultValue: 'draft'
    },
    recipient_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    sent_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    failed_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    scheduled_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    template_id: {
      type: DataTypes.STRING(50),
      allowNull: true
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
    tableName: 'mass_email_campaigns',
    underscored: true,
    timestamps: true
  });

  MassEmailCampaign.associate = (models) => {
    MassEmailCampaign.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event'
    });
    MassEmailCampaign.belongsTo(models.Chapter, {
      foreignKey: 'chapter_id',
      as: 'chapter'
    });
    MassEmailCampaign.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'createdBy'
    });
    MassEmailCampaign.hasMany(models.MassEmailRecipient, {
      foreignKey: 'campaign_id',
      as: 'recipients'
    });
  };

  return MassEmailCampaign;
};
