/**
 * Check Database Data Script
 * Verifies all data in the database
 */

require('dotenv').config();
const { sequelize } = require('../src/shared/database');
const models = require('../src/shared/models');

const checkData = async () => {
  try {
    console.log('🔍 Checking database data...\n');

    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection successful\n');

    // Check counts for all tables
    const tables = [
      { name: 'Users', model: models.User },
      { name: 'Chapters', model: models.Chapter },
      { name: 'Event Types', model: models.EventType },
      { name: 'Venues', model: models.Venue },
      { name: 'Events', model: models.Event },
      { name: 'Event Sessions', model: models.EventSession },
      { name: 'Event Registrations', model: models.EventRegistration },
      { name: 'Chapter Leads', model: models.ChapterLead },
      { name: 'User API Tokens', model: models.UserApiToken }
    ];

    console.log('📊 Database Contents:\n');
    console.log('='.repeat(60));

    for (const table of tables) {
      const count = await table.model.count();
      console.log(`${table.name.padEnd(25)} : ${count} records`);
    }

    console.log('='.repeat(60));

    // Show sample data
    console.log('\n📝 Sample Data:\n');

    // Users
    const users = await models.User.findAll({
      attributes: ['id', 'email', 'name', 'handle', 'confirmed_at'],
      limit: 5
    });
    console.log('\n👥 Users:');
    users.forEach(user => {
      console.log(`  - ${user.name} (${user.email}) - Handle: ${user.handle} - Confirmed: ${user.confirmed_at ? '✅' : '❌'}`);
    });

    // Chapters
    const chapters = await models.Chapter.findAll({
      attributes: ['id', 'name', 'city', 'country', 'active']
    });
    console.log('\n📍 Chapters:');
    chapters.forEach(chapter => {
      console.log(`  - ${chapter.name} (${chapter.city}, ${chapter.country}) - Active: ${chapter.active ? '✅' : '❌'}`);
    });

    // Events
    const events = await models.Event.findAll({
      include: [
        { model: models.Chapter, as: 'chapter', attributes: ['name'] },
        { model: models.EventType, as: 'eventType', attributes: ['name'] },
        { model: models.Venue, as: 'venue', attributes: ['name'] }
      ],
      attributes: ['id', 'name', 'start_time', 'end_time', 'public', 'accepting_registration']
    });
    console.log('\n📅 Events:');
    events.forEach(event => {
      console.log(`  - ${event.name}`);
      console.log(`    Type: ${event.eventType.name} | Chapter: ${event.chapter.name}`);
      console.log(`    Venue: ${event.venue.name}`);
      console.log(`    Time: ${new Date(event.start_time).toLocaleString()} - ${new Date(event.end_time).toLocaleString()}`);
      console.log(`    Public: ${event.public ? '✅' : '❌'} | Accepting Registration: ${event.accepting_registration ? '✅' : '❌'}`);
    });

    // Event Sessions
    const sessions = await models.EventSession.findAll({
      include: [
        { model: models.Event, as: 'event', attributes: ['name'] },
        { model: models.User, as: 'user', attributes: ['name'] }
      ],
      attributes: ['id', 'name', 'session_type', 'start_time', 'end_time']
    });
    console.log('\n🎤 Event Sessions:');
    sessions.forEach(session => {
      console.log(`  - ${session.name}`);
      console.log(`    Speaker: ${session.user.name} | Type: ${session.session_type}`);
      console.log(`    Event: ${session.event.name}`);
      console.log(`    Time: ${new Date(session.start_time).toLocaleString()} - ${new Date(session.end_time).toLocaleString()}`);
    });

    // Registrations
    const registrations = await models.EventRegistration.findAll({
      include: [
        { model: models.Event, as: 'event', attributes: ['name'] },
        { model: models.User, as: 'user', attributes: ['name', 'email'] }
      ],
      attributes: ['id', 'state', 'accepted', 'visible']
    });
    console.log('\n📝 Event Registrations:');
    registrations.forEach(reg => {
      console.log(`  - ${reg.user.name} (${reg.user.email})`);
      console.log(`    Event: ${reg.event.name}`);
      console.log(`    State: ${reg.state} | Accepted: ${reg.accepted ? '✅' : '❌'} | Visible: ${reg.visible ? '✅' : '❌'}`);
    });

    console.log('\n\n✅ Database check complete!\n');

  } catch (error) {
    console.error('❌ Error checking database:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
};

// Run check
checkData()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
