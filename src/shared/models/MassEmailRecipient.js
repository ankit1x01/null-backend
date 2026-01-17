/**
 * MassEmailRecipient Model
 * Stores individual recipients for mass email campaigns
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MassEmailRecipient = sequelize.define('MassEmailRecipient', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    campaign_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mass_email_campaigns',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'sent', 'failed', 'bounced', 'opened', 'clicked'),
      defaultValue: 'pending'
    },
    sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    opened_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    clicked_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    error_message: {
      type: DataTypes.TEXT,
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
    tableName: 'mass_email_recipients',
    underscored: true,
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['campaign_id', 'email']
      }
    ]
  });

  MassEmailRecipient.associate = (models) => {
    MassEmailRecipient.belongsTo(models.MassEmailCampaign, {
      foreignKey: 'campaign_id',
      as: 'campaign'
    });
    MassEmailRecipient.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return MassEmailRecipient;
};
