/**
 * Models Index
 * Initializes all Sequelize models and sets up associations
 */

const { sequelize, Sequelize } = require('../database');
const path = require('path');

const db = {};

// Import all model files
const modelFiles = [
  'User',
  'Chapter',
  'EventType',
  'Venue',
  'Event',
  'EventSession',
  'EventRegistration',
  'EventSessionComment',
  'ChapterLead',
  'UserApiToken',
  'SessionProposal',
  'SessionRequest',
  'Page',
  'PagePermission',
  'Stat',
  'UserAchievement',
  'EventMailerTask',
  // 'EventNotification', // Missing table
  'Job',
  'Vote', // Replaces EventLike
  // 'EventLike', // Deleted
  'AdminUser',
  'UserAuthProfile',
  // 'TwitterIntegration', // Missing table
  // 'TweetLog', // Missing table
  // 'MassEmailCampaign', // Missing table
  // 'MassEmailRecipient', // Missing table
  // 'SlackIntegration', // Missing table
  // 'SlackNotificationLog', // Missing table
  // New models added to match Rails
  'EventAnnouncementMailerTask',
  'EventAutomaticNotificationTask'
];

// Initialize models
modelFiles.forEach(file => {
  const model = require(path.join(__dirname, file))(sequelize);
  db[model.name] = model;
});

// Setup associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
