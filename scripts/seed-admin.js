require('dotenv').config();
const { sequelize } = require('../src/shared/database');
const models = require('../src/shared/models');

const seedAdmin = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database.');

        const email = 'ankit1x01@gmail.com';
        const password = 'Ankit@123';

        // Check if user exists
        const admin = await models.AdminUser.findOne({ where: { email } });

        if (admin) {
            console.log(`Admin user ${email} exists. Updating password...`);
            // The beforeUpdate hook will hash this password
            await admin.update({ encrypted_password: password });
            console.log('✅ Password updated successfully.');
        } else {
            console.log(`Creating admin user ${email}...`);
            // The beforeCreate hook will hash this password
            await models.AdminUser.create({
                email,
                encrypted_password: password,
                created_at: new Date(),
                updated_at: new Date()
            });
            console.log('✅ Admin user created successfully.');
        }

    } catch (error) {
        console.error('❌ Error seeding admin:', error);
    } finally {
        await sequelize.close();
    }
};

seedAdmin();
