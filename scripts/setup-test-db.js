require('dotenv').config();
const mysql = require('mysql2/promise');

const setupTestDb = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
    });

    try {
        const dbName = process.env.DB_NAME_TEST || 'swachalit_test';
        console.log(`Creating database ${dbName} if it not exists...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        console.log(`Database ${dbName} created/verified.`);
    } catch (error) {
        console.error('Error setting up test database:', error);
        process.exit(1);
    } finally {
        await connection.end();
    }
};

setupTestDb();
