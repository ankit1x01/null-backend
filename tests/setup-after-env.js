const { sequelize } = require('../src/shared/database');
const { User } = require('../src/shared/models');

beforeAll(async () => {
    // Ensure database tables exist and match models
    try {
        // Sync schema
        // Use force: true to drop and recreate tables for a clean test environment
        await sequelize.sync({ force: true });

        // Seed admin user if not exists
        const adminEmail = 'admin@nullchapter.com';
        const adminUser = await User.findOne({ where: { email: adminEmail } });

        if (!adminUser) {
            console.log('Seeding admin user for tests...');
            await User.create({
                email: adminEmail,
                name: 'Admin User',
                encrypted_password: 'Admin@123',
                confirmed_at: new Date(),
                admin: true,
                // Helper fields
                created_at: new Date(),
                updated_at: new Date()
            });
            console.log('Admin user seeded.');
        }
    } catch (error) {
        console.error('Failed to setup test environment:', error);
    }
});

afterAll(async () => {
    // Close database connection to avoid open handles
    try {
        await sequelize.close();
    } catch (error) {
        console.error('Failed to close database connection:', error);
    }
});
