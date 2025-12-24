/**
 * Comprehensive Database Seeding Script
 * Populates the database with dummy data for all major flows in null.community
 */

require('dotenv').config();
const { sequelize } = require('../src/shared/database');
const models = require('../src/shared/models');
const bcrypt = require('bcryptjs');

const log = (msg) => console.log(`[SEED] ${msg}`);
const logHeader = (msg) => console.log(`\n=== ${msg} ===`);

const hashPassword = async (password) => {
    return password; // Let the model hook handle hashing
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDatabase = async () => {
    try {
        logHeader('Starting Database Seeding');

        // Sync database (Force true to reset)
        log('Syncing database (force: true)...');
        await sequelize.sync({ force: true });
        log('Database clean and synced.');

        // --- 1. Seed Chapters ---
        logHeader('Seeding Chapters');
        const chaptersData = [
            { name: 'Bangalore', description: 'null Bangalore Chapter', active: true, city: 'Bangalore', country: 'IN', code: 'BLR' },
            { name: 'Mumbai', description: 'null Mumbai Chapter', active: true, city: 'Mumbai', country: 'IN', code: 'MUM' },
            { name: 'Delhi', description: 'null Delhi Chapter', active: true, city: 'Delhi', country: 'IN', code: 'DEL' },
            { name: 'Pune', description: 'null Pune Chapter', active: true, city: 'Pune', country: 'IN', code: 'PUN' },
            { name: 'Hyderabad', description: 'null Hyderabad Chapter', active: true, city: 'Hyderabad', country: 'IN', code: 'HYD' },
            { name: 'Singapore', description: 'null Singapore Chapter', active: true, city: 'Singapore', country: 'SG', code: 'SIN' },
            { name: 'Amsterdam', description: 'null Amsterdam Chapter', active: true, city: 'Amsterdam', country: 'NL', code: 'AMS' }
        ];
        const chapters = await models.Chapter.bulkCreate(chaptersData);
        log(`Created ${chapters.length} chapters.`);

        // --- 2. Seed Event Types ---
        logHeader('Seeding Event Types');
        const eventTypesData = [
            { name: 'Monthly Meetup', description: 'Regular monthly meetups', registration_required: true, invitation_required: false },
            { name: 'Workshop', description: 'Hands-on workshops', registration_required: true, invitation_required: false },
            { name: 'Conference', description: 'Annual conferences', registration_required: true, invitation_required: false },
            { name: 'Humla', description: 'Humla sessions', registration_required: true, invitation_required: true },
            { name: 'Puliya', description: 'Networking & Chit-chat', registration_required: false, invitation_required: false }
        ];
        const eventTypes = await models.EventType.bulkCreate(eventTypesData);
        log(`Created ${eventTypes.length} event types.`);

        // --- 3. Seed Venues ---
        logHeader('Seeding Venues');
        const venuesData = [
            {
                name: '91springboard Koramangala',
                description: 'Co-working space in Koramangala',
                address: '513/B, 7th Cross Rd, Koramangala 6th Block, Bangalore, Karnataka 560095',
                chapter_id: chapters.find(c => c.name === 'Bangalore').id,
                contact_name: 'Manager BLR'
            },
            {
                name: 'Microsoft Reactor Bangalore',
                description: 'Microsoft Reactor space',
                address: 'Vigyan City, Bangalore',
                chapter_id: chapters.find(c => c.name === 'Bangalore').id,
                contact_name: 'Reactor Lead'
            },
            {
                name: 'ThoughtWorks Mumbai',
                description: 'ThoughtWorks Office',
                address: 'Hiranandani Gardens, Powai, Mumbai',
                chapter_id: chapters.find(c => c.name === 'Mumbai').id,
                contact_name: 'Admin MUM'
            },
            {
                name: 'Google Delhi',
                description: 'Google Office',
                address: 'Signature Tower, Gurgaon',
                chapter_id: chapters.find(c => c.name === 'Delhi').id,
                contact_name: 'Googler'
            }
        ];
        const venues = await models.Venue.bulkCreate(venuesData);
        log(`Created ${venues.length} venues.`);

        // --- 4. Seed Users ---
        logHeader('Seeding Users');
        const passwordHash = await hashPassword('password123');

        // Admin
        const adminUser = await models.User.create({
            email: 'admin@null.community',
            encrypted_password: passwordHash,
            name: 'Super Admin',
            confirmed_at: new Date(),
            handle: 'admin',
            about: 'I govern the null universe.',
            admin: true
        });

        // Chapter Leads
        const blrLead = await models.User.create({
            email: 'lead.blr@null.community',
            encrypted_password: passwordHash,
            name: 'Bangalore Lead',
            confirmed_at: new Date(),
            handle: 'blr_lead',
            about: 'Leading the Bangalore chapter.'
        });

        const mumLead = await models.User.create({
            email: 'lead.mum@null.community',
            encrypted_password: passwordHash,
            name: 'Mumbai Lead',
            confirmed_at: new Date(),
            handle: 'mum_lead',
            about: 'Leading the Mumbai chapter.'
        });

        // Speakers & Regular Users
        const usersData = [];
        for (let i = 1; i <= 10; i++) {
            usersData.push({
                email: `user${i}@example.com`,
                encrypted_password: passwordHash,
                name: `User Number ${i}`,
                confirmed_at: new Date(),
                handle: `user_${i}`,
                about: `Just a regular null community member #${i}`
            });
        }
        const regularUsers = await models.User.bulkCreate(usersData, { individualHooks: true });
        const allUsers = [adminUser, blrLead, mumLead, ...regularUsers];
        log(`Created ${allUsers.length} users.`);

        // Assign Chapter Leads (Directly via ChapterLead model)
        await models.ChapterLead.create({ chapter_id: chapters.find(c => c.name === 'Bangalore').id, user_id: blrLead.id, active: true });
        await models.ChapterLead.create({ chapter_id: chapters.find(c => c.name === 'Mumbai').id, user_id: mumLead.id, active: true });
        log('Assigned chapter leads.');


        // --- 5. Seed Events ---
        logHeader('Seeding Events');
        const eventsData = [];
        const now = new Date();

        // 5a. Past Events (Historical data)
        for (let i = 1; i <= 5; i++) {
            eventsData.push({
                name: `Past Meetup #${i}`,
                description: `This was a great meetup that happened ${i} months ago.`,
                event_type_id: getRandomItem(eventTypes).id,
                chapter_id: getRandomItem(chapters).id,
                venue_id: getRandomItem(venues).id,
                start_time: new Date(now.getTime() - i * 30 * 24 * 60 * 60 * 1000), // i months ago
                end_time: new Date(now.getTime() - i * 30 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
                public: true,
                accepting_registration: false,
                can_show_on_homepage: false,
                can_show_on_archive: true
            });
        }

        // 5b. Upcoming Events
        const upcomingEvent1 = {
            name: 'Future of Cyber Warfare',
            description: 'An in-depth look at state-sponsored cyber attacks.',
            event_type_id: eventTypes.find(t => t.name === 'Monthly Meetup').id,
            chapter_id: chapters.find(c => c.name === 'Bangalore').id,
            venue_id: venues.find(v => v.name.includes('91springboard')).id,
            start_time: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            end_time: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
            public: true,
            accepting_registration: true,
            can_show_on_homepage: true
        };

        const upcomingEvent2 = {
            name: 'Bug Bounty Hunting 101',
            description: 'Start your journey into bug bounties.',
            event_type_id: eventTypes.find(t => t.name === 'Workshop').id,
            chapter_id: chapters.find(c => c.name === 'Mumbai').id,
            venue_id: venues.find(v => v.address.includes('Mumbai')).id,
            start_time: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
            end_time: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000),
            public: true,
            accepting_registration: true,
            can_show_on_homepage: true
        };

        const upcomingEvent3 = {
            name: 'HackIM 2026 Planning',
            description: 'Core team planning for the next big conference.',
            event_type_id: eventTypes.find(t => t.name === 'Humla').id,
            chapter_id: chapters.find(c => c.name === 'Delhi').id,
            venue_id: venues.find(v => v.name.includes('Delhi')).id,
            start_time: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
            end_time: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
            public: false, // Internal event
            accepting_registration: false,
            can_show_on_homepage: false
        };

        eventsData.push(upcomingEvent1, upcomingEvent2, upcomingEvent3);
        const events = await models.Event.bulkCreate(eventsData);
        log(`Created ${events.length} events (Past & Upcoming).`);


        // --- 6. Seed Event Sessions (Talks) ---
        logHeader('Seeding Sessions');
        const sessionsData = [];

        // Add sessions to the upcoming Bangalore event
        const blrEvent = events.find(e => e.name === 'Future of Cyber Warfare');
        sessionsData.push({
            event_id: blrEvent.id,
            user_id: blrLead.id,
            name: 'Welcome & Introduction',
            description: 'Kickoff the meetup.',
            session_type: 'Talk',
            start_time: blrEvent.start_time,
            end_time: new Date(blrEvent.start_time.getTime() + 15 * 60 * 1000)
        });

        sessionsData.push({
            event_id: blrEvent.id,
            user_id: getRandomItem(regularUsers).id,
            name: 'Stuxnet Retrospective',
            description: 'Analyzing the worm that changed everything.',
            session_type: 'Talk',
            start_time: new Date(blrEvent.start_time.getTime() + 15 * 60 * 1000),
            end_time: new Date(blrEvent.start_time.getTime() + 60 * 60 * 1000)
        });

        // Add sessions to Mumbai event
        const mumEvent = events.find(e => e.name === 'Bug Bounty Hunting 101');
        sessionsData.push({
            event_id: mumEvent.id,
            user_id: mumLead.id,
            name: 'Reconnaissance Techniques',
            description: 'How to find subdomains and hidden assets.',
            session_type: 'Workshop',
            start_time: mumEvent.start_time,
            end_time: new Date(mumEvent.start_time.getTime() + 120 * 60 * 1000)
        });

        const sessions = await models.EventSession.bulkCreate(sessionsData);
        log(`Created ${sessions.length} sessions.`);


        // --- 7. Seed Registrations ---
        logHeader('Seeding Registrations');
        const registrationsData = [];

        // Register random users for Bangalore event
        for (const user of regularUsers.slice(0, 5)) {
            registrationsData.push({
                event_id: blrEvent.id,
                user_id: user.id,
                state: 'Confirmed',
                accepted: true,
                visible: true
            });
        }

        // Register users for Mumbai event
        for (const user of regularUsers.slice(3, 8)) {
            registrationsData.push({
                event_id: mumEvent.id,
                user_id: user.id,
                state: 'Confirmed',
                accepted: true,
                visible: true
            });
        }

        const registrations = await models.EventRegistration.bulkCreate(registrationsData);
        log(`Created ${registrations.length} registrations.`);


        // --- 8. Seed Session Comments ---
        logHeader('Seeding Comments');
        const commentsData = [];
        const targetSession = sessions[1]; // Stuxnet talk

        commentsData.push({
            event_session_id: targetSession.id,
            user_id: regularUsers[0].id,
            comment: 'Super excited for this talk!',
            created_at: new Date(),
            updated_at: new Date()
        });
        commentsData.push({
            event_session_id: targetSession.id,
            user_id: adminUser.id,
            comment: 'Make sure to cover the PLCs part in detail.',
            created_at: new Date(),
            updated_at: new Date()
        });

        await models.EventSessionComment.bulkCreate(commentsData);
        log(`Created ${commentsData.length} session comments.`);


        // --- 9. Seed Session Proposals (CFP) ---
        logHeader('Seeding Session Proposals (CFP)');
        const proposalsData = [
            {
                user_id: regularUsers[0].id,
                title: 'Attacking Kubernetes Clusters',
                description: 'A deep dive into K8s security misconfigurations.',
                session_type: 'Talk',
                status: 'pending',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                user_id: regularUsers[1].id,
                title: 'Social Engineering 101',
                description: 'Hacking humans.',
                session_type: 'Workshop',
                status: 'rejected',
                created_at: new Date(),
                updated_at: new Date()
            }
        ];
        await models.SessionProposal.bulkCreate(proposalsData);
        log(`Created ${proposalsData.length} session proposals.`);


        // --- 10. Seed Session Requests (Community requests) ---
        logHeader('Seeding Session Requests');
        const requestsData = [
            {
                title: 'Request: Explaining Zero Knowledge Proofs',
                description: 'Can someone give a talk on ZKPs?',
                requested_by: 'CryptoFan',
                status: 'open',
                created_at: new Date(),
                updated_at: new Date()
            }
        ];
        await models.SessionRequest.bulkCreate(requestsData);
        log(`Created ${requestsData.length} session requests.`);


        // --- 11. Seed User Achievements ---
        logHeader('Seeding Achievements');
        const achievementsData = [
            {
                user_id: blrLead.id,
                achievement_type: 'Speaker',
                title: 'Distinguished Speaker',
                description: 'Delivered 10+ talks at null.',
                awarded_at: new Date(),
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                user_id: adminUser.id,
                achievement_type: 'Community',
                title: 'Community Builder',
                description: 'Founded a chapter.',
                awarded_at: new Date(),
                created_at: new Date(),
                updated_at: new Date()
            }
        ];
        await models.UserAchievement.bulkCreate(achievementsData);
        log(`Created ${achievementsData.length} user achievements.`);


        // --- 12. Seed Pages ---
        logHeader('Seeding Pages');
        const pagesData = [
            {
                title: 'About null',
                content: '# About null\n\nnull is an open security community...',
                slug: 'about',
                published: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                title: 'Conduct',
                content: '# Code of Conduct\n\nBe excellent to each other...',
                slug: 'coc',
                published: true,
                created_at: new Date(),
                updated_at: new Date()
            }
        ];
        await models.Page.bulkCreate(pagesData);
        log(`Created ${pagesData.length} pages.`);


        logHeader('Seeding Complete');
        log('All flows populated successfully!');
        log('Credentials needed?');
        log('Admin: admin@null.community / password123');
        log('Users: user1@example.com / password123');

    } catch (error) {
        console.error('SERVER ERROR DURING SEEDING:', error);
        process.exit(1);
    } finally {
        await sequelize.close();
    }
};

seedDatabase();
