/**
 * Vote Model
 * Matches the votes table (acts_as_votable) from Rails application
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Vote = sequelize.define('Vote', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        votable_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        votable_type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        voter_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        voter_type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        vote_flag: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        vote_scope: {
            type: DataTypes.STRING,
            allowNull: true
        },
        vote_weight: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'votes',
        timestamps: true,
        underscored: true
    });

    // Model associations
    Vote.associate = (models) => {
        // Polymorphic association helper could go here if needed
        Vote.belongsTo(models.User, {
            foreignKey: 'voter_id',
            constraints: false,
            as: 'user'
        });
    };

    return Vote;
};
