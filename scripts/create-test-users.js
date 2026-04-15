/**
 * Create Test Users (Safe - does NOT wipe existing data)
 * Inserts test users from TESTING_GUIDE.md if they don't already exist.
 * Run: node scripts/create-test-users.js
 */

require('dotenv').config();
const bcrypt = require('bcrypt');
const { sequelize } = require('../src/shared/database');
const models = require('../src/shared/models');

const PASSWORD = 'password123';
const HASH_ROUNDS = 10;

// IDs are auto-assigned — no fixed IDs to avoid conflicts with existing 78K+ users
const TEST_USERS = [
  { email: 'admin@null.community',          name: 'Test Admin',          handle: 'testadmin',   isAdmin: true  },
  { email: 'admin2@null.community',          name: 'Test Admin 2',        handle: 'testadmin2',  isAdmin: true  },
  { email: 'lead.delhi@null.community',      name: 'Delhi Chapter Lead',  handle: 'delhilead',   isAdmin: false },
  { email: 'lead.bangalore@null.community',  name: 'Bangalore Lead',      handle: 'blrlead',     isAdmin: false },
  { email: 'speaker1@example.com',           name: 'Test Speaker',        handle: 'testspeaker', isAdmin: false },
  { email: 'member1@example.com',            name: 'Test Member',         handle: 'testmember',  isAdmin: false },
  { email: 'unconfirmed1@example.com',       name: 'Unconfirmed User',    handle: 'unconfirmed', isAdmin: false, unconfirmed: true },
];

const log   = (msg) => console.log(`  ${msg}`);
const ok    = (msg) => console.log(`  ✅ ${msg}`);
const skip  = (msg) => console.log(`  ⏭  ${msg}`);
const fail  = (msg) => console.error(`  ❌ ${msg}`);

const run = async () => {
  try {
    await sequelize.authenticate();
    console.log('\n🔌 Connected to database:', process.env.DB_NAME);
    console.log('═'.repeat(55));
    console.log('Creating test users (skipping if already exist)...');
    console.log('═'.repeat(55));

    const hashedPassword = await bcrypt.hash(PASSWORD, HASH_ROUNDS);
    const now = new Date();

    for (const u of TEST_USERS) {
      const existing = await models.User.findOne({ where: { email: u.email } });

      if (existing) {
        skip(`${u.email} — already exists (id: ${existing.id})`);
        continue;
      }

      // Insert user row directly (bypass beforeCreate hook which would double-hash)
      await sequelize.query(
        `INSERT INTO users (email, encrypted_password, name, handle, confirmed_at, sign_in_count, created_at, updated_at)
         VALUES (:email, :password, :name, :handle, :confirmed_at, 0, :now, :now)`,
        {
          replacements: {
            email:        u.email,
            password:     hashedPassword,
            name:         u.name,
            handle:       u.handle,
            confirmed_at: u.unconfirmed ? null : now,
            now,
          }
        }
      );

      // Add to admin_users table if admin
      if (u.isAdmin) {
        const existingAdmin = await models.AdminUser.findOne({ where: { email: u.email } });
        if (!existingAdmin) {
          await sequelize.query(
            `INSERT INTO admin_users (email, encrypted_password, created_at, updated_at) VALUES (:email, :password, :now, :now)`,
            { replacements: { email: u.email, password: hashedPassword, now } }
          );
        }
      }

      ok(`${u.email}${u.isAdmin ? ' [ADMIN]' : ''}${u.unconfirmed ? ' [UNCONFIRMED]' : ''}`);
    }

    console.log('\n' + '═'.repeat(55));
    console.log('✅ Done! Test credentials:');
    console.log('═'.repeat(55));
    console.log('  Password for all users: password123');
    console.log('');
    console.log('  Role            Email');
    console.log('  ─────────────────────────────────────────────');
    TEST_USERS.filter(u => !u.unconfirmed).forEach(u => {
      const role = u.isAdmin ? 'Admin' : (u.email.includes('lead') ? 'Chapter Lead' : u.email.includes('speaker') ? 'Speaker' : 'Member');
      console.log(`  ${role.padEnd(15)} ${u.email}`);
    });
    console.log('');
    console.log('  Login: POST http://localhost:3001/api/auth/login');
    console.log('  Docs:  http://localhost:3001/api-docs');
    console.log('  UI:    http://localhost:3000');
    console.log('═'.repeat(55) + '\n');

  } catch (err) {
    fail('Error: ' + err.message);
    console.error(err);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
};

run();
