require('dotenv').config();
const { Sequelize } = require('sequelize');
const config = require('../src/config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        logging: false
    }
);

async function inspect() {
    try {
        await sequelize.authenticate();
        console.log('Connected to database.');

        const [results] = await sequelize.query("DESCRIBE admin_users");
        console.log('Columns:', results.map(r => r.Field).join(', '));

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sequelize.close();
    }
}

inspect();
