/**
 * Job Model
 * For background job queue and tracking
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Job = sequelize.define('Job', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Job class/type name'
    },
    queue: {
      type: DataTypes.STRING,
      defaultValue: 'default',
      comment: 'Queue name for job routing'
    },
    state: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      comment: '100=New, 200=Running, 300=Paused, 400=Finished, 500=Error'
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'Higher number = higher priority'
    },
    params: {
      type: DataTypes.JSON,
      defaultValue: {}
    },
    response: {
      type: DataTypes.JSON,
      allowNull: true
    },
    error_message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    error_detail: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    max_attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 3
    },
    scheduled_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    started_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    finished_at: {
      type: DataTypes.DATE,
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
    tableName: 'jobs',
    timestamps: true,
    underscored: true
  });

  // State constants
  Job.STATE = {
    NEW: 100,
    RUNNING: 200,
    PAUSED: 300,
    FINISHED: 400,
    ERROR: 500
  };

  // Instance methods
  Job.prototype.getStateName = function() {
    const stateNames = {
      100: 'New',
      200: 'Running',
      300: 'Paused',
      400: 'Finished',
      500: 'Error'
    };
    return stateNames[this.state] || 'Unknown';
  };

  Job.prototype.canRetry = function() {
    return this.state === Job.STATE.ERROR && this.attempts < this.max_attempts;
  };

  return Job;
};
