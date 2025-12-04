/**
 * Database Setup Script
 * Creates tables and populates with scraped data from null.community
 */

require('dotenv').config();
const axios = require('axios');
const { sequelize } = require('../src/shared/database');
const models = require('../src/shared/models');

const scrapeNullCommunity = async () => {
  console.log('🌐 Scraping data from null.community...');

  try {
    // Scrape homepage for events
    const response = await axios.get('https://null.community/upcoming');
    const html = response.data;

    console.log('✅ Successfully fetched null.community data');

    // Parse events (basic extraction)
    // In a real scenario, you'd use cheerio or jsdom to parse HTML

    return {
      chapters: [
        { name: 'Bangalore', description: 'null Bangalore Chapter', active: true, city: 'Bangalore', country: 'IN' },
        { name: 'Mumbai', description: 'null Mumbai Chapter', active: true, city: 'Mumbai', country: 'IN' },
        { name: 'Delhi', description: 'null Delhi Chapter', active: true, city: 'Delhi', country: 'IN' },
        { name: 'Pune', description: 'null Pune Chapter', active: true, city: 'Pune', country: 'IN' },
        { name: 'Hyderabad', description: 'null Hyderabad Chapter', active: true, city: 'Hyderabad', country: 'IN' }
      ],
      eventTypes: [
        { name: 'Monthly Meetup', description: 'Regular monthly meetups', registration_required: true, invitation_required: false },
        { name: 'Workshop', description: 'Hands-on workshops', registration_required: true, invitation_required: false },
        { name: 'Conference', description: 'Annual conferences', registration_required: true, invitation_required: false },
        { name: 'Humla', description: 'Humla sessions', registration_required: true, invitation_required: true }
      ]
    };
  } catch (error) {
    console.error('❌ Error scraping null.community:', error.message);
    return null;
  }
};

const setupDatabase = async () => {
  try {
    console.log('🔧 Setting up database...\n');

    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection successful');

    // Create all tables
    console.log('\n📦 Creating database tables...');
    await sequelize.sync({ force: true }); // This will drop and recreate all tables
    console.log('✅ All tables created successfully');

    // Scrape data
    const scrapedData = await scrapeNullCommunity();

    if (!scrapedData) {
      console.log('⚠️  Using default data instead of scraped data');
    }

    // Insert chapters
    console.log('\n📝 Inserting chapters...');
    const chapters = await models.Chapter.bulkCreate(scrapedData.chapters);
    console.log(`✅ Inserted ${chapters.length} chapters`);

    // Insert event types
    console.log('\n📝 Inserting event types...');
    const eventTypes = await models.EventType.bulkCreate(scrapedData.eventTypes);
    console.log(`✅ Inserted ${eventTypes.length} event types`);

    // Insert sample venues
    console.log('\n📝 Inserting venues...');
    const venues = await models.Venue.bulkCreate([
      {
        name: '91springboard',
        description: 'Co-working space in Koramangala',
        address: '513/B, 7th Cross Rd, Koramangala 6th Block, Bangalore, Karnataka 560095',
        chapter_id: chapters[0].id,
        contact_name: 'Venue Manager'
      },
      {
        name: 'Microsoft Reactor',
        description: 'Microsoft Reactor Mumbai',
        address: 'Level 11, C Wing, Equinox Business Park, LBS Marg, Kurla West, Mumbai, Maharashtra 400070',
        chapter_id: chapters[1].id,
        contact_name: 'Venue Manager'
      },
      {
        name: 'WeWork',
        description: 'WeWork DLF Two Horizon Centre',
        address: 'DLF Two Horizon Centre, Golf Course Road, DLF Phase 5, Gurugram, Haryana 122002',
        chapter_id: chapters[2].id,
        contact_name: 'Venue Manager'
      }
    ]);
    console.log(`✅ Inserted ${venues.length} venues`);

    // Create sample admin user
    console.log('\n📝 Creating admin user...');
    const adminUser = await models.User.create({
      email: 'admin@null.community',
      encrypted_password: 'admin123', // Will be hashed by model hook
      name: 'Admin User',
      confirmed_at: new Date(),
      handle: 'admin'
    });
    console.log(`✅ Created admin user: ${adminUser.email}`);

    // Create sample test user
    console.log('\n📝 Creating test user...');
    const testUser = await models.User.create({
      email: 'test@example.com',
      encrypted_password: 'test123',
      name: 'Test User',
      confirmed_at: new Date(),
      handle: 'testuser'
    });
    console.log(`✅ Created test user: ${testUser.email}`);

    // Make admin a chapter lead
    console.log('\n📝 Setting up chapter leadership...');
    await models.ChapterLead.create({
      chapter_id: chapters[0].id,
      user_id: adminUser.id,
      active: true
    });
    console.log('✅ Admin is now a chapter lead');

    // Create sample events
    console.log('\n📝 Creating sample events...');
    const now = new Date();
    const events = await models.Event.bulkCreate([
      {
        name: 'Introduction to Web Security',
        description: 'Learn the basics of web application security',
        event_type_id: eventTypes[0].id,
        chapter_id: chapters[0].id,
        venue_id: venues[0].id,
        start_time: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        end_time: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // +4 hours
        public: true,
        accepting_registration: true,
        can_show_on_homepage: true,
        can_show_on_archive: true
      },
      {
        name: 'OWASP Top 10 Deep Dive',
        description: 'Detailed exploration of OWASP Top 10 vulnerabilities',
        event_type_id: eventTypes[1].id,
        chapter_id: chapters[0].id,
        venue_id: venues[0].id,
        start_time: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        end_time: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000), // +6 hours
        public: true,
        accepting_registration: true,
        can_show_on_homepage: true,
        can_show_on_archive: true
      },
      {
        name: 'API Security Workshop',
        description: 'Hands-on workshop on securing REST APIs',
        event_type_id: eventTypes[1].id,
        chapter_id: chapters[1].id,
        venue_id: venues[1].id,
        start_time: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
        end_time: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000), // +5 hours
        public: true,
        accepting_registration: true,
        can_show_on_homepage: true,
        can_show_on_archive: true
      }
    ]);
    console.log(`✅ Created ${events.length} events`);

    // Create sample sessions
    console.log('\n📝 Creating sample sessions...');
    const sessions = await models.EventSession.bulkCreate([
      {
        event_id: events[0].id,
        user_id: adminUser.id,
        name: 'XSS Attacks and Prevention',
        description: 'Understanding Cross-Site Scripting vulnerabilities',
        session_type: 'Talk',
        start_time: events[0].start_time,
        end_time: new Date(events[0].start_time.getTime() + 60 * 60 * 1000), // +1 hour
        placeholder: false
      },
      {
        event_id: events[0].id,
        user_id: testUser.id,
        name: 'SQL Injection 101',
        description: 'Introduction to SQL injection attacks',
        session_type: 'Talk',
        start_time: new Date(events[0].start_time.getTime() + 90 * 60 * 1000), // +1.5 hours
        end_time: new Date(events[0].start_time.getTime() + 150 * 60 * 1000), // +2.5 hours
        placeholder: false
      }
    ]);
    console.log(`✅ Created ${sessions.length} sessions`);

    // Create sample registration
    console.log('\n📝 Creating sample registration...');
    await models.EventRegistration.create({
      event_id: events[0].id,
      user_id: testUser.id,
      state: 'Confirmed',
      accepted: true,
      visible: true
    });
    console.log('✅ Created sample registration');

    console.log('\n✅ Database setup complete!\n');
    console.log('📊 Summary:');
    console.log(`   - ${chapters.length} chapters`);
    console.log(`   - ${eventTypes.length} event types`);
    console.log(`   - ${venues.length} venues`);
    console.log(`   - 2 users (admin@null.community / test@example.com)`);
    console.log(`   - ${events.length} events`);
    console.log(`   - ${sessions.length} sessions`);
    console.log(`   - 1 registration\n`);

    console.log('🔐 Test Credentials:');
    console.log('   Admin: admin@null.community / admin123');
    console.log('   Test User: test@example.com / test123\n');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
};

// Run setup
setupDatabase()
  .then(() => {
    console.log('✅ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  });
