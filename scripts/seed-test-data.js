/**
 * Comprehensive Test Data Seeding Script
 * Populates the database with data for ALL testing scenarios
 * 
 * Run: node scripts/seed-test-data.js
 */

require('dotenv').config();
const { sequelize } = require('../src/shared/database');
const models = require('../src/shared/models');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Logging helpers
const log = (msg) => console.log(`[SEED] ${msg}`);
const logHeader = (msg) => console.log(`\n${'='.repeat(50)}\n${msg}\n${'='.repeat(50)}`);
const logSuccess = (msg) => console.log(`[✓] ${msg}`);
const logError = (msg) => console.error(`[✗] ${msg}`);

// Utility functions
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomItems = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Date helpers
const daysAgo = (days) => new Date(Date.now() - days * 24 * 60 * 60 * 1000);
const daysFromNow = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);
const hoursFromDate = (date, hours) => new Date(date.getTime() + hours * 60 * 60 * 1000);

const seedDatabase = async () => {
  try {
    logHeader('COMPREHENSIVE DATABASE SEEDING');
    log('This will create test data for ALL scenarios');
    log('Starting in 2 seconds...\n');
    await new Promise(r => setTimeout(r, 2000));

    // ============================================
    // CLEANUP EXISTING TEST DATA
    // ============================================
    logHeader('CLEANING UP EXISTING DATA');
    
    // Disable foreign key checks for cleanup
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    
    // Delete in reverse order of dependencies
    try {
      await models.EventSessionComment.destroy({ where: {}, truncate: true });
      await models.EventRegistration.destroy({ where: {}, truncate: true });
      await models.EventSession.destroy({ where: {}, truncate: true });
      await models.Event.destroy({ where: {}, truncate: true });
      await models.Venue.destroy({ where: {}, truncate: true });
      await models.EventType.destroy({ where: {}, truncate: true });
      await models.ChapterLead.destroy({ where: {}, truncate: true });
      await models.SessionProposal.destroy({ where: {}, truncate: true });
      await models.SessionRequest.destroy({ where: {}, truncate: true });
      await models.UserAchievement.destroy({ where: {}, truncate: true });
      await models.UserApiToken.destroy({ where: {}, truncate: true });
      await models.UserAuthProfile.destroy({ where: {}, truncate: true });
      await models.Page.destroy({ where: {}, truncate: true });
      await models.User.destroy({ where: {}, truncate: true });
      await models.Chapter.destroy({ where: {}, truncate: true });
    } finally {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    }
    
    logSuccess('Cleaned up existing data');

    // ============================================
    // 1. CHAPTERS (5 chapters)
    // ============================================
    logHeader('1. SEEDING CHAPTERS');
    
    const chaptersData = [
      {
        name: 'Delhi',
        description: 'null Delhi Chapter - The capital city security community. Active since 2012, organizing monthly meetups, workshops, and annual conferences.',
        code: 'DEL',
        city: 'Delhi',
        state: 'Delhi',
        country: 'India',
        active: true,
        birthday: new Date('2012-03-15'),
        chapter_email: 'delhi@null.community',
        twitter_handle: 'nulldelhi',
        github_profile: 'null-delhi',
        linkedin_profile: 'null-delhi'
      },
      {
        name: 'Bangalore',
        description: 'null Bangalore Chapter - Silicon Valley of India. The largest and most active chapter with weekly events.',
        code: 'BLR',
        city: 'Bangalore',
        state: 'Karnataka',
        country: 'India',
        active: true,
        birthday: new Date('2010-06-20'),
        chapter_email: 'bangalore@null.community',
        twitter_handle: 'nullblr',
        github_profile: 'null-bangalore'
      },
      {
        name: 'Mumbai',
        description: 'null Mumbai Chapter - Financial capital security community. Strong corporate partnerships.',
        code: 'MUM',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        active: true,
        birthday: new Date('2013-01-10'),
        chapter_email: 'mumbai@null.community',
        twitter_handle: 'nullmumbai'
      },
      {
        name: 'Chennai',
        description: 'null Chennai Chapter - Currently inactive, looking for new leads.',
        code: 'CHE',
        city: 'Chennai',
        state: 'Tamil Nadu',
        country: 'India',
        active: false,
        birthday: new Date('2015-08-01')
      },
      {
        name: 'Hyderabad',
        description: 'null Hyderabad Chapter - Newly formed chapter, building community.',
        code: 'HYD',
        city: 'Hyderabad',
        state: 'Telangana',
        country: 'India',
        active: true,
        birthday: new Date('2025-06-01')
      }
    ];

    const chapters = await models.Chapter.bulkCreate(chaptersData);
    logSuccess(`Created ${chapters.length} chapters`);

    // ============================================
    // 2. EVENT TYPES (6 types)
    // ============================================
    logHeader('2. SEEDING EVENT TYPES');
    
    const eventTypesData = [
      {
        name: 'null Puliya',
        description: 'Monthly meetup where community members present security topics, share knowledge, and network. Open to all skill levels.',
        registration_required: true,
        invitation_required: false
      },
      {
        name: 'null Humla',
        description: 'Hands-on offensive security workshop. Learn attack techniques in a controlled environment. Prior experience recommended.',
        registration_required: true,
        invitation_required: true
      },
      {
        name: 'null Bachaav',
        description: 'Defensive security workshop focusing on blue team skills, incident response, and security operations.',
        registration_required: true,
        invitation_required: false
      },
      {
        name: 'null Open Session',
        description: 'Informal open discussion session. No fixed agenda, community-driven topics.',
        registration_required: false,
        invitation_required: false
      },
      {
        name: 'null Webinar',
        description: 'Online-only session for remote participants. Perfect for global reach.',
        registration_required: true,
        invitation_required: false
      },
      {
        name: 'null Conference',
        description: 'Annual multi-day conference with tracks, CTF, and networking. The flagship event.',
        registration_required: true,
        invitation_required: false
      }
    ];

    const eventTypes = await models.EventType.bulkCreate(eventTypesData);
    logSuccess(`Created ${eventTypes.length} event types`);

    // ============================================
    // 3. VENUES (10 venues)
    // ============================================
    logHeader('3. SEEDING VENUES');
    
    const delhiChapter = chapters.find(c => c.code === 'DEL');
    const blrChapter = chapters.find(c => c.code === 'BLR');
    const mumChapter = chapters.find(c => c.code === 'MUM');
    const hydChapter = chapters.find(c => c.code === 'HYD');
    
    const venuesData = [
      {
        name: '91springboard Koramangala',
        description: 'Co-working space in the heart of Koramangala. Great for meetups up to 100 people.',
        address: '513/B, 7th Cross Road, Koramangala 6th Block, Bangalore',
        contact_name: 'Venue Manager',
        contact_email: 'bangalore@91springboard.com',
        map_url: 'https://maps.google.com/?q=91springboard+koramangala',
        chapter_id: blrChapter.id
      },
      {
        name: 'Microsoft Reactor Bangalore',
        description: 'Microsoft\'s developer community space. Modern facilities with AV equipment.',
        address: 'Vigyan, 9th Floor, Lavelle Road, Bangalore',
        contact_name: 'Reactor Team',
        contact_email: 'reactor-blr@microsoft.com',
        map_url: 'https://maps.google.com/?q=microsoft+reactor+bangalore',
        chapter_id: blrChapter.id
      },
      {
        name: 'ThoughtWorks Mumbai',
        description: 'ThoughtWorks office space for tech events.',
        address: 'Hiranandani Gardens, Powai, Mumbai',
        contact_name: 'Community Lead',
        contact_email: 'events-mumbai@thoughtworks.com',
        chapter_id: mumChapter.id
      },
      {
        name: 'Google Office Gurgaon',
        description: 'Google\'s Gurgaon campus for community events.',
        address: 'Signature Tower, Sector 44, Gurgaon',
        contact_name: 'Developer Relations',
        chapter_id: delhiChapter.id
      },
      {
        name: 'AWS Office Delhi',
        description: 'AWS Delhi office event space.',
        address: 'DLF Cyber City, Gurgaon',
        contact_name: 'AWS Events',
        chapter_id: delhiChapter.id
      },
      {
        name: 'Zoom Webinar',
        description: 'Online venue for webinars and remote sessions.',
        address: 'Online - Zoom',
        contact_name: 'Online Events',
        chapter_id: blrChapter.id
      },
      {
        name: 'Google Meet',
        description: 'Google Meet for smaller online sessions.',
        address: 'Online - Google Meet',
        contact_name: 'Online Events',
        chapter_id: blrChapter.id
      },
      {
        name: 'YouTube Live',
        description: 'YouTube streaming for large public events.',
        address: 'Online - YouTube',
        contact_name: 'Streaming Team',
        chapter_id: blrChapter.id
      },
      {
        name: 'Nasscom CoE Hyderabad',
        description: 'Nasscom Centre of Excellence - Hybrid venue with streaming capabilities.',
        address: 'T-Hub, IIIT Campus, Gachibowli, Hyderabad',
        contact_name: 'Nasscom Events',
        chapter_id: hydChapter.id
      },
      {
        name: 'IIT Delhi Lecture Hall',
        description: 'IIT Delhi campus for academic collaborations.',
        address: 'Hauz Khas, New Delhi',
        contact_name: 'IIT Events',
        chapter_id: delhiChapter.id
      }
    ];

    const venues = await models.Venue.bulkCreate(venuesData);
    logSuccess(`Created ${venues.length} venues`);

    // ============================================
    // 4. USERS (20 users)
    // ============================================
    logHeader('4. SEEDING USERS');
    
    const defaultPassword = 'password123';
    
    // Helper to create user data
    const createUserData = (overrides) => ({
      encrypted_password: defaultPassword,
      confirmed_at: new Date(),
      admin: false,
      ...overrides
    });

    // Admin users
    const adminUsers = await models.User.bulkCreate([
      createUserData({
        email: 'admin@null.community',
        name: 'Super Admin',
        handle: 'superadmin',
        about_me: 'Platform administrator with full access.',
        admin: true,
        twitter_handle: 'nulladmin',
        github_profile: 'null-admin'
      }),
      createUserData({
        email: 'admin2@null.community',
        name: 'Admin Two',
        handle: 'admin2',
        about_me: 'Secondary administrator.',
        admin: true
      })
    ], { individualHooks: true });
    logSuccess(`Created ${adminUsers.length} admin users`);

    // Chapter leads (will be assigned later)
    const chapterLeadUsers = await models.User.bulkCreate([
      createUserData({
        email: 'lead.delhi@null.community',
        name: 'Rahul Sharma',
        handle: 'rahul_sec',
        about_me: 'Delhi chapter lead. Security researcher at a major bank.',
        twitter_handle: 'rahul_infosec',
        github_profile: 'rahulsharma-sec',
        linkedin_profile: 'rahulsharma'
      }),
      createUserData({
        email: 'colead.delhi@null.community',
        name: 'Priya Gupta',
        handle: 'priya_hack',
        about_me: 'Delhi co-lead. Bug bounty hunter.',
        twitter_handle: 'priyahacks'
      }),
      createUserData({
        email: 'lead.bangalore@null.community',
        name: 'Karthik Menon',
        handle: 'karthik_blr',
        about_me: 'Bangalore chapter lead. AppSec engineer at a startup.',
        github_profile: 'karthikmenon',
        linkedin_profile: 'karthikmenon'
      }),
      createUserData({
        email: 'lead.mumbai@null.community',
        name: 'Sneha Patil',
        handle: 'sneha_cyber',
        about_me: 'Mumbai chapter lead. Penetration tester.',
        twitter_handle: 'snehacyber'
      }),
      createUserData({
        email: 'lead.hyderabad@null.community',
        name: 'Venkat Reddy',
        handle: 'venkat_hyd',
        about_me: 'Hyderabad chapter lead. Cloud security specialist.'
      })
    ], { individualHooks: true });
    logSuccess(`Created ${chapterLeadUsers.length} chapter lead users`);

    // Regular speakers
    const speakerUsers = await models.User.bulkCreate([
      createUserData({
        email: 'speaker1@example.com',
        name: 'Amit Kumar',
        handle: 'amit_speaker',
        about_me: 'Regular speaker. Specializes in web security.',
        github_profile: 'amitkumar',
        twitter_handle: 'amitkumar_sec'
      }),
      createUserData({
        email: 'speaker2@example.com',
        name: 'Divya Nair',
        handle: 'divya_speaks',
        about_me: 'Mobile security expert. Android enthusiast.',
        linkedin_profile: 'divyanair'
      }),
      createUserData({
        email: 'speaker3@example.com',
        name: 'Raj Malhotra',
        handle: 'raj_malware',
        about_me: 'Malware analyst and reverse engineer.',
        github_profile: 'rajmalhotra'
      }),
      createUserData({
        email: 'speaker4@example.com',
        name: 'Meera Iyer',
        handle: 'meera_sec',
        about_me: 'Security consultant. Cloud and DevSecOps.'
      }),
      createUserData({
        email: 'speaker5@example.com',
        name: 'Arjun Das',
        handle: 'arjun_ctf',
        about_me: 'CTF player and trainer. Multiple CTF wins.'
      })
    ], { individualHooks: true });
    logSuccess(`Created ${speakerUsers.length} speaker users`);

    // Regular members
    const memberUsers = await models.User.bulkCreate([
      createUserData({
        email: 'member1@example.com',
        name: 'Sanjay Singh',
        handle: 'sanjay_s'
      }),
      createUserData({
        email: 'member2@example.com',
        name: 'Ananya Rao',
        handle: 'ananya_r'
      }),
      createUserData({
        email: 'member3@example.com',
        name: 'Vikram Joshi',
        handle: 'vikram_j'
      }),
      createUserData({
        email: 'member4@example.com',
        name: 'Pooja Sharma',
        handle: 'pooja_s'
      }),
      createUserData({
        email: 'member5@example.com',
        name: 'Nikhil Verma',
        handle: 'nikhil_v'
      })
    ], { individualHooks: true });
    logSuccess(`Created ${memberUsers.length} regular member users`);

    // Unconfirmed users
    const unconfirmedUsers = await models.User.bulkCreate([
      {
        email: 'unconfirmed1@example.com',
        name: 'Unconfirmed User 1',
        handle: 'unconfirmed1',
        encrypted_password: defaultPassword,
        confirmed_at: null,
        confirmation_token: crypto.randomBytes(32).toString('hex'),
        confirmation_sent_at: new Date()
      },
      {
        email: 'unconfirmed2@example.com',
        name: 'Unconfirmed User 2',
        handle: 'unconfirmed2',
        encrypted_password: defaultPassword,
        confirmed_at: null,
        confirmation_token: crypto.randomBytes(32).toString('hex'),
        confirmation_sent_at: daysAgo(3)
      }
    ], { individualHooks: true });
    logSuccess(`Created ${unconfirmedUsers.length} unconfirmed users`);

    // Collect all users
    const allUsers = [
      ...adminUsers,
      ...chapterLeadUsers,
      ...speakerUsers,
      ...memberUsers,
      ...unconfirmedUsers
    ];
    logSuccess(`Total users created: ${allUsers.length}`);

    // ============================================
    // 5. CHAPTER LEADS (6 entries)
    // ============================================
    logHeader('5. SEEDING CHAPTER LEADS');
    
    const chapterLeadsData = [
      {
        chapter_id: chapters.find(c => c.code === 'DEL').id,
        user_id: chapterLeadUsers[0].id,
        active: true
      },
      {
        chapter_id: chapters.find(c => c.code === 'DEL').id,
        user_id: chapterLeadUsers[1].id,
        active: true
      },
      {
        chapter_id: chapters.find(c => c.code === 'BLR').id,
        user_id: chapterLeadUsers[2].id,
        active: true
      },
      {
        chapter_id: chapters.find(c => c.code === 'MUM').id,
        user_id: chapterLeadUsers[3].id,
        active: true
      },
      {
        chapter_id: chapters.find(c => c.code === 'HYD').id,
        user_id: chapterLeadUsers[4].id,
        active: true
      },
      {
        chapter_id: chapters.find(c => c.code === 'BLR').id,
        user_id: speakerUsers[0].id,
        active: false
      }
    ];

    const chapterLeads = await models.ChapterLead.bulkCreate(chapterLeadsData);
    logSuccess(`Created ${chapterLeads.length} chapter lead assignments`);

    // ============================================
    // 6. EVENTS (20 events)
    // ============================================
    logHeader('6. SEEDING EVENTS');
    
    const eventsData = [];
    
    // Past events (5) - completed
    for (let i = 1; i <= 5; i++) {
      const startTime = daysAgo(30 * i);
      eventsData.push({
        name: `Past Security Meetup #${i}`,
        description: `This was a great meetup held ${i} months ago. Topics covered included web security, mobile security, and CTF challenges.`,
        event_type_id: eventTypes[0].id,
        chapter_id: getRandomItem(chapters.filter(c => c.active)).id,
        venue_id: getRandomItem(venues).id,
        start_time: startTime,
        end_time: hoursFromDate(startTime, 4),
        public: true,
        can_show_on_homepage: false,
        can_show_on_archive: true,
        accepting_registration: false,
        max_registration: 50,
        registration_start_time: daysAgo(30 * i + 14),
        slug: `past-meetup-${i}`
      });
    }

    // Upcoming events (5)
    const upcomingEventsData = [
      {
        name: 'Web Security Deep Dive',
        description: 'Deep dive into modern web security vulnerabilities including XSS, CSRF, SSRF, and more.',
        event_type_id: eventTypes[0].id,
        chapter_id: chapters.find(c => c.code === 'DEL').id,
        venue_id: venues.find(v => v.name.includes('Google')).id,
        start_time: daysFromNow(7),
        end_time: hoursFromDate(daysFromNow(7), 4),
        public: true,
        can_show_on_homepage: true,
        can_show_on_archive: true,
        accepting_registration: true,
        max_registration: 100,
        registration_start_time: daysAgo(7),
        slug: 'web-security-deep-dive'
      },
      {
        name: 'Bug Bounty Bootcamp',
        description: 'Learn bug bounty hunting from scratch. Real-world examples and live demos.',
        event_type_id: eventTypes[1].id,
        chapter_id: chapters.find(c => c.code === 'BLR').id,
        venue_id: venues.find(v => v.name.includes('Microsoft')).id,
        start_time: daysFromNow(14),
        end_time: hoursFromDate(daysFromNow(14), 6),
        public: true,
        can_show_on_homepage: true,
        can_show_on_archive: true,
        accepting_registration: true,
        max_registration: 50,
        registration_start_time: daysAgo(3),
        slug: 'bug-bounty-bootcamp'
      },
      {
        name: 'Cloud Security Masterclass',
        description: 'AWS, Azure, and GCP security best practices.',
        event_type_id: eventTypes[2].id,
        chapter_id: chapters.find(c => c.code === 'MUM').id,
        venue_id: venues.find(v => v.name.includes('ThoughtWorks')).id,
        start_time: daysFromNow(21),
        end_time: hoursFromDate(daysFromNow(21), 5),
        public: true,
        can_show_on_homepage: true,
        can_show_on_archive: true,
        accepting_registration: true,
        max_registration: 80,
        registration_start_time: daysFromNow(1),
        slug: 'cloud-security-masterclass'
      },
      {
        name: 'Online Security Webinar',
        description: 'Monthly online session for global community members.',
        event_type_id: eventTypes[4].id,
        chapter_id: chapters.find(c => c.code === 'BLR').id,
        venue_id: venues.find(v => v.name === 'Zoom Webinar').id,
        start_time: daysFromNow(5),
        end_time: hoursFromDate(daysFromNow(5), 2),
        public: true,
        can_show_on_homepage: true,
        can_show_on_archive: true,
        accepting_registration: true,
        max_registration: 500,
        registration_start_time: daysAgo(10),
        slug: 'online-security-webinar'
      },
      {
        name: 'Hyderabad Kickoff Meetup',
        description: 'First official meetup for the new Hyderabad chapter!',
        event_type_id: eventTypes[0].id,
        chapter_id: chapters.find(c => c.code === 'HYD').id,
        venue_id: venues.find(v => v.name.includes('Nasscom')).id,
        start_time: daysFromNow(10),
        end_time: hoursFromDate(daysFromNow(10), 3),
        public: true,
        can_show_on_homepage: true,
        can_show_on_archive: true,
        accepting_registration: true,
        max_registration: 60,
        registration_start_time: daysAgo(5),
        slug: 'hyderabad-kickoff'
      }
    ];
    eventsData.push(...upcomingEventsData);

    // Draft events (3)
    for (let i = 1; i <= 3; i++) {
      eventsData.push({
        name: `Draft Event ${i}`,
        description: 'This event is being planned and not yet public.',
        event_type_id: getRandomItem(eventTypes).id,
        chapter_id: getRandomItem(chapters.filter(c => c.active)).id,
        venue_id: getRandomItem(venues).id,
        start_time: daysFromNow(30 + i * 7),
        end_time: hoursFromDate(daysFromNow(30 + i * 7), 4),
        public: false,
        can_show_on_homepage: false,
        can_show_on_archive: false,
        accepting_registration: false,
        slug: `draft-event-${i}`
      });
    }

    // Cancelled events (2)
    eventsData.push({
      name: 'Cancelled Security Workshop',
      description: 'This event was cancelled.',
      event_type_id: eventTypes[1].id,
      chapter_id: chapters.find(c => c.code === 'DEL').id,
      venue_id: venues[0].id,
      start_time: daysFromNow(3),
      end_time: hoursFromDate(daysFromNow(3), 4),
      public: true,
      can_show_on_homepage: false,
      can_show_on_archive: false,
      accepting_registration: false,
      state: 'cancelled',
      slug: 'cancelled-workshop'
    });

    // More historical events
    for (let i = 6; i <= 10; i++) {
      const startTime = daysAgo(30 * i);
      eventsData.push({
        name: `Historical Meetup ${i}`,
        description: `Archive event from ${i} months ago.`,
        event_type_id: getRandomItem(eventTypes.slice(0, 4)).id,
        chapter_id: getRandomItem(chapters.filter(c => c.active)).id,
        venue_id: getRandomItem(venues).id,
        start_time: startTime,
        end_time: hoursFromDate(startTime, 3),
        public: true,
        can_show_on_homepage: false,
        can_show_on_archive: true,
        accepting_registration: false,
        slug: `historical-meetup-${i}`
      });
    }

    const events = await models.Event.bulkCreate(eventsData);
    logSuccess(`Created ${events.length} events`);

    // ============================================
    // 7. EVENT SESSIONS (40 sessions)
    // ============================================
    logHeader('7. SEEDING EVENT SESSIONS');
    
    const sessionsData = [];
    const sessionTypes = ['Talk', 'Workshop', 'Panel', 'Lightning Talk', 'Keynote', 'Demo'];
    const allSpeakers = [...chapterLeadUsers, ...speakerUsers];

    for (const event of events) {
      const numSessions = getRandomInt(2, 3);
      let sessionStart = new Date(event.start_time);

      for (let i = 0; i < numSessions; i++) {
        const sessionDuration = getRandomInt(30, 60);
        const sessionEnd = new Date(sessionStart.getTime() + sessionDuration * 60 * 1000);
        const isPastEvent = event.start_time < new Date();
        
        sessionsData.push({
          event_id: event.id,
          user_id: getRandomItem(allSpeakers).id,
          name: `Session ${i + 1}: ${['Introduction to', 'Advanced', 'Deep Dive into', 'Hands-on'][i % 4]} ${['Web Security', 'Network Attacks', 'Malware Analysis', 'Cloud Security', 'Mobile Hacking'][getRandomInt(0, 4)]}`,
          description: `This session covers important security concepts and techniques.`,
          session_type: getRandomItem(sessionTypes),
          start_time: sessionStart,
          end_time: sessionEnd,
          need_projector: Math.random() > 0.2,
          need_microphone: Math.random() > 0.3,
          need_whiteboard: Math.random() > 0.7,
          presentation_url: isPastEvent && Math.random() > 0.3 ? `https://slideshare.net/null-session-${event.id}-${i}` : null,
          video_url: isPastEvent && Math.random() > 0.5 ? `https://youtube.com/watch?v=null-${event.id}-${i}` : null,
          placeholder: false
        });

        sessionStart = sessionEnd;
      }
    }

    const sessions = await models.EventSession.bulkCreate(sessionsData);
    logSuccess(`Created ${sessions.length} event sessions`);

    // ============================================
    // 8. EVENT REGISTRATIONS (100 registrations)
    // ============================================
    logHeader('8. SEEDING EVENT REGISTRATIONS');
    
    const registrationsData = [];
    const confirmedUsers = [...adminUsers, ...chapterLeadUsers, ...speakerUsers, ...memberUsers];

    for (const event of events) {
      if (event.state === 'cancelled' || !event.public) continue;

      const numRegistrations = getRandomInt(3, 10);
      const registeredUsers = getRandomItems(confirmedUsers, Math.min(numRegistrations, confirmedUsers.length));

      for (const user of registeredUsers) {
        const isConfirmed = Math.random() > 0.15;
        
        registrationsData.push({
          event_id: event.id,
          user_id: user.id,
          state: isConfirmed ? 'confirmed' : (Math.random() > 0.5 ? 'waitlisted' : 'cancelled'),
          accepted: isConfirmed,
          visible: true
        });
      }
    }

    // Remove duplicates
    const uniqueRegistrations = [...new Map(registrationsData.map(r => [`${r.event_id}-${r.user_id}`, r])).values()];
    const registrations = await models.EventRegistration.bulkCreate(uniqueRegistrations);
    logSuccess(`Created ${registrations.length} event registrations`);

    // ============================================
    // 9. EVENT SESSION COMMENTS (30 comments)
    // ============================================
    logHeader('9. SEEDING SESSION COMMENTS');
    
    const commentsData = [];
    const commentTexts = [
      'Great session! Learned a lot.',
      'Can you share the slides?',
      'What tools did you use for the demo?',
      'This was very informative, thanks!',
      'Would love a follow-up session.',
      'The hands-on part was excellent.',
      'Could you explain the attack vector again?',
      'Amazing presentation!'
    ];

    const pastSessions = sessions.filter(s => {
      const event = events.find(e => e.id === s.event_id);
      return event && event.start_time < new Date();
    });

    for (let i = 0; i < 30 && pastSessions.length > 0; i++) {
      const session = getRandomItem(pastSessions);
      if (!session) continue;

      commentsData.push({
        event_session_id: session.id,
        user_id: getRandomItem(confirmedUsers).id,
        body: getRandomItem(commentTexts)
      });
    }

    const comments = await models.EventSessionComment.bulkCreate(commentsData);
    logSuccess(`Created ${comments.length} session comments`);

    // ============================================
    // 10. SESSION PROPOSALS (10 proposals)
    // Schema: id, user_id, title, description, session_type, status
    // ============================================
    logHeader('10. SEEDING SESSION PROPOSALS');
    
    const proposalsData = [
      { title: 'Introduction to Kubernetes Security', description: 'Overview of K8s security best practices.', session_type: 'workshop', status: 'pending' },
      { title: 'Android Reverse Engineering 101', description: 'Basics of APK analysis.', session_type: 'talk', status: 'pending' },
      { title: 'Building a Home Security Lab', description: 'Setting up a vulnerable lab.', session_type: 'workshop', status: 'approved' },
      { title: 'API Security Testing', description: 'OWASP API Top 10.', session_type: 'talk', status: 'approved' },
      { title: 'Threat Modeling Workshop', description: 'Hands-on threat modeling.', session_type: 'workshop', status: 'pending' },
      { title: 'Purple Team Exercises', description: 'Collaborative activities.', session_type: 'hands-on', status: 'rejected' },
      { title: 'IoT Hacking Basics', description: 'Getting started with IoT security.', session_type: 'talk', status: 'pending' },
      { title: 'Memory Forensics Deep Dive', description: 'Volatility framework.', session_type: 'workshop', status: 'approved' },
      { title: 'Supply Chain Attacks', description: 'Understanding supply chain compromises.', session_type: 'talk', status: 'pending' },
      { title: 'Zero Trust Architecture', description: 'Implementing zero trust.', session_type: 'talk', status: 'rejected' }
    ];

    const proposals = await models.SessionProposal.bulkCreate(
      proposalsData.map(p => ({
        ...p,
        user_id: getRandomItem([...speakerUsers, ...memberUsers]).id
      }))
    );
    logSuccess(`Created ${proposals.length} session proposals`);

    // ============================================
    // 11. SESSION REQUESTS (8 requests)
    // Schema: id, title, description, requested_by, email, status
    // ============================================
    logHeader('11. SEEDING SESSION REQUESTS');
    
    const requestsData = [
      { title: 'Request: Active Directory Attacks', description: 'Would love a session on AD pentesting.', status: 'open' },
      { title: 'Request: Bug Bounty Tips', description: 'Looking for tips on successful bug bounty hunting.', status: 'open' },
      { title: 'Request: Career in Security', description: 'How to transition into cybersecurity?', status: 'closed' },
      { title: 'Request: SIEM Deep Dive', description: 'Understanding SIEM tools.', status: 'open' },
      { title: 'Request: Blockchain Security', description: 'Smart contract vulnerabilities.', status: 'open' },
      { title: 'Request: Malware Development', description: 'Understanding how malware works.', status: 'closed' },
      { title: 'Request: Cloud Pentesting', description: 'Testing AWS/Azure environments.', status: 'open' },
      { title: 'Request: CTF Workshop', description: 'Learning to play CTFs effectively.', status: 'open' }
    ];

    const requests = await models.SessionRequest.bulkCreate(
      requestsData.map(r => ({
        ...r,
        requested_by: getRandomItem([...memberUsers, ...speakerUsers]).name,
        email: `request_${getRandomInt(1, 100)}@example.com`
      }))
    );
    logSuccess(`Created ${requests.length} session requests`);

    // ============================================
    // 12. USER ACHIEVEMENTS (20 achievements)
    // ============================================
    logHeader('12. SEEDING USER ACHIEVEMENTS');
    
    const achievementsData = [];
    
    for (const speaker of speakerUsers) {
      achievementsData.push({
        user_id: speaker.id,
        achievement_type: 'speaker',
        title: 'First Talk',
        description: 'Delivered first session at null community.',
        awarded_at: daysAgo(getRandomInt(30, 365))
      });
    }

    for (const member of memberUsers) {
      achievementsData.push({
        user_id: member.id,
        achievement_type: 'attendee',
        title: 'Active Attendee',
        description: 'Attended 10+ events.',
        awarded_at: daysAgo(getRandomInt(30, 180))
      });
    }

    for (const lead of chapterLeadUsers) {
      achievementsData.push({
        user_id: lead.id,
        achievement_type: 'chapter_lead',
        title: 'Chapter Leader',
        description: 'Appointed as chapter lead.',
        awarded_at: daysAgo(getRandomInt(180, 365))
      });
    }

    const achievements = await models.UserAchievement.bulkCreate(achievementsData);
    logSuccess(`Created ${achievements.length} user achievements`);

    // ============================================
    // 13. USER API TOKENS (5 tokens)
    // ============================================
    logHeader('13. SEEDING API TOKENS');
    
    const tokensData = [
      { user_id: adminUsers[0].id, client_name: 'Admin CLI Token', token: crypto.randomBytes(32).toString('hex'), expire_at: daysFromNow(90), last_used_at: daysAgo(1) },
      { user_id: chapterLeadUsers[0].id, client_name: 'Lead Integration', token: crypto.randomBytes(32).toString('hex'), expire_at: daysFromNow(30), last_used_at: daysAgo(7) },
      { user_id: speakerUsers[0].id, client_name: 'Speaker API Access', token: crypto.randomBytes(32).toString('hex'), expire_at: daysFromNow(60), last_used_at: null },
      { user_id: adminUsers[1].id, client_name: 'Automation Token', token: crypto.randomBytes(32).toString('hex'), expire_at: daysFromNow(180), last_used_at: daysAgo(2) },
      { user_id: memberUsers[0].id, client_name: 'Old Token', token: crypto.randomBytes(32).toString('hex'), expire_at: daysAgo(30), last_used_at: daysAgo(60) }
    ];

    const apiTokens = await models.UserApiToken.bulkCreate(tokensData);
    logSuccess(`Created ${apiTokens.length} API tokens`);

    // ============================================
    // 14. USER AUTH PROFILES (8 profiles)
    // ============================================
    logHeader('14. SEEDING AUTH PROFILES');
    
    const authProfilesData = [];
    const providers = ['google', 'github'];
    
    for (const user of [...adminUsers, ...chapterLeadUsers.slice(0, 3)]) {
      const provider = getRandomItem(providers);
      authProfilesData.push({
        user_id: user.id,
        provider: provider,
        uid: `${provider}_${user.id}_${crypto.randomBytes(8).toString('hex')}`,
        oauth_data: JSON.stringify({
          name: user.name,
          email: user.email,
          provider: provider
        })
      });
    }

    const authProfiles = await models.UserAuthProfile.bulkCreate(authProfilesData);
    logSuccess(`Created ${authProfiles.length} auth profiles`);

    // ============================================
    // 15. PAGES (8 pages)
    // ============================================
    logHeader('15. SEEDING PAGES');
    
    const pagesData = [
      { title: 'About Us', slug: 'about', content: '# About null Community\n\nnull is an open security community...', published: true },
      { title: 'Contact', slug: 'contact', content: '# Contact Us\n\nReach out to us at contact@null.community', published: true },
      { title: 'FAQ', slug: 'faq', content: '# Frequently Asked Questions\n\n## How do I join?\n\nSimply register...', published: true },
      { title: 'Code of Conduct', slug: 'code-of-conduct', content: '# Code of Conduct\n\nBe respectful...', published: true },
      { title: 'Privacy Policy', slug: 'privacy', content: '# Privacy Policy\n\nYour privacy matters...', published: true },
      { title: 'Speaker Guidelines', slug: 'speaker-guidelines', content: '# Speaker Guidelines\n\nHow to prepare...', published: true },
      { title: 'Volunteer Info', slug: 'volunteer', content: '# Volunteering\n\nJoin our volunteer team...', published: true },
      { title: 'Internal Guidelines', slug: 'internal-guidelines', content: '# Internal Guidelines\n\nFor leads only...', published: false }
    ];

    const pages = await models.Page.bulkCreate(pagesData);
    logSuccess(`Created ${pages.length} pages`);

    // ============================================
    // SUMMARY
    // ============================================
    logHeader('SEEDING COMPLETED SUCCESSFULLY! 🎉');
    log(`
Summary:
- Chapters: ${chapters.length}
- Event Types: ${eventTypes.length}
- Venues: ${venues.length}
- Users: ${allUsers.length}
- Chapter Leads: ${chapterLeads.length}
- Events: ${events.length}
- Sessions: ${sessions.length}
- Registrations: ${registrations.length}
- Comments: ${comments.length}
- Proposals: ${proposals.length}
- Requests: ${requests.length}
- Achievements: ${achievements.length}
- API Tokens: ${apiTokens.length}
- Auth Profiles: ${authProfiles.length}
- Pages: ${pages.length}

Test Credentials:
- Admin: admin@null.community / password123
- Lead: lead.delhi@null.community / password123
- Member: member1@example.com / password123
- Unconfirmed: unconfirmed1@example.com / password123
    `);

  } catch (error) {
    logError(`Seeding failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
};

// Run the seeder
seedDatabase();
