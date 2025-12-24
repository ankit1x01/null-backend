
require('dotenv').config();
const shared = require('../src/shared'); // Adjust path to shared if needed
const bcrypt = require('bcrypt');

const run = async () => {
    try {
        await shared.database.testConnection();
        const { User } = shared.models;

        const email = 'user1@example.com';
        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log(`User ${email} not found!`);
        } else {
            console.log('User JSON:', JSON.stringify(user.toJSON(), null, 2));
            console.log(`Admin field value: ${user.admin}`);


            // Also check admin
            const admin = await User.findOne({ where: { email: 'admin@null.community' } });
            console.log(`Admin found: ${admin.email}`);
            console.log(`Admin Encrypted Password: ${admin.encrypted_password}`);
            const adminMatch = await bcrypt.compare('password123', admin.encrypted_password);
            console.log(`Admin Match 'password123': ${adminMatch}`);
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

run();
