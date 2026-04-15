/**
 * SessionProposal Model
 * Matches the session_proposals table from Rails application
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SessionProposal = sequelize.define('SessionProposal', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    chapter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'chapters', key: 'id' }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    event_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'event_types', key: 'id' }
    },
    session_topic: {
      type: DataTypes.STRING
    },
    session_description: {
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
    tableName: 'session_proposals',
    timestamps: true,
    underscored: true
  });

  // Model associations
  SessionProposal.associate = (models) => {
    SessionProposal.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });

  };

  return SessionProposal;
};
