const request = require('supertest');
const { Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Manually initialize Sequelize since we are not starting the server via index.js
const db = require('../src/shared/models');
// We need 'app' but we also need to make sure db is connected if app doesn't force it (usually app starts server)
// However, in this project app is exported without starting server.
// We will manually connect DB to be safe for our direct queries.

const app = require('../src/index');

async function testApis() {
    console.log('🔄 Connecting to Database...');
    await db.sequelize.authenticate();
    console.log('✅ Connected.');

    try {
        // 1. Get a valid user
        const [users] = await db.sequelize.query('SELECT id, email FROM users WHERE email IS NOT NULL LIMIT 1');
        if (!users || users.length === 0) {
            throw new Error('No users found in DB');
        }
        const user = users[0];
        console.log(`👤 Using User: ${user.email} (ID: ${user.id})`);

        // 2. Generate Token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // 3. Test GET /api/users/me
        console.log('\n🧪 Testing GET /api/users/me...');
        const resUser = await request(app)
            .get('/api/users/me')
            .set('Authorization', `Bearer ${token}`);

        if (resUser.status === 200 && resUser.body.result && resUser.body.result.id === user.id) {
            console.log('✅ /api/users/me works (User model valid)');
        } else {
            console.error('❌ /api/users/me FAILED', resUser.status, resUser.body);
        }

        // 4. Test Disabled Routes
        const disabledRoutes = [
            '/api/mass-email/campaigns',
            '/api/slack/1',
            '/api/twitter/integrations'
        ];

        console.log('\n🧪 Testing Disabled Routes...');
        for (const route of disabledRoutes) {
            const res = await request(app).get(route).set('Authorization', `Bearer ${token}`);
            if (res.status === 503) {
                console.log(`✅ ${route} returns 503`);
            } else {
                // Note: If route doesn't match exactly it might return 404, but we want to check if the controller returns 503
                // /api/slack/1 matches router.get('/:id', ...)
                console.error(`❌ ${route} returned ${res.status} (Expected 503)`);
            }
        }

        // 5. Test Voting (Event Likes)
        const [sessions] = await db.sequelize.query('SELECT id FROM event_sessions LIMIT 1');
        if (sessions.length > 0) {
            const sessionId = sessions[0].id;
            console.log(`\n🧪 Testing Voting on Session ${sessionId}...`);

            // Toggle Like (Create or Remove)
            const resVote = await request(app)
                .post(`/api/event-likes/session/${sessionId}/toggle`)
                .set('Authorization', `Bearer ${token}`)
                .send({ like_type: 'like' });

            if (resVote.status === 200 && resVote.body.result && (resVote.body.result.action === 'created' || resVote.body.result.action === 'removed')) {
                console.log(`✅ POST /api/event-likes/.../toggle works. Action: ${resVote.body.result.action}`);

                // Verify in DB - ensure we query 'votes' table NOT event_likes
                const [check] = await db.sequelize.query(`SELECT * FROM votes WHERE votable_id = ${sessionId} AND votable_type = 'EventSession' AND voter_id = ${user.id} AND vote_flag = 1`);

                if (resVote.body.result.action === 'created') {
                    if (check.length > 0) console.log('✅ Vote record found in DB (votes table)');
                    else console.error('❌ Vote record NOT found in DB');
                } else {
                    if (check.length === 0) console.log('✅ Vote record removed from DB');
                    else console.error('❌ Vote record STILL in DB');
                }

            } else {
                console.error('❌ Vote Toggle FAILED', resVote.status, resVote.body);
            }
        } else {
            console.warn('⚠️ No sessions found to test voting');
        }

    } catch (err) {
        console.error('❌ Test Script Error:', err);
    } finally {
        await db.sequelize.close();
    }
}

testApis();
