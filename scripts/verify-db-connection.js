const { Sequelize } = require('sequelize');
require('dotenv').config({ path: '../.env' }); // Load from parent directory

async function verify() {
    const sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: 'mysql',
            logging: false
        }
    );

    try {
        await sequelize.authenticate();
        console.log(`✅ Connected to database: ${process.env.DB_NAME}`);

        // Check if users table has data
        const [results] = await sequelize.query('SELECT COUNT(*) as count FROM users');
        console.log(`✅ Users count: ${results[0].count}`);

        // Check if votes table exists (new schema)
        const [tables] = await sequelize.query("SHOW TABLES LIKE 'votes'");
        if (tables.length > 0) {
            console.log("✅ 'votes' table found.");
        } else {
            console.log("❌ 'votes' table NOT found (migration might be missing).");
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        process.exit(1);
    }
}

verify();
