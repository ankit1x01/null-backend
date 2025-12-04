/**
 * Create Database Script
 * Creates the database before running migrations
 */

require('dotenv').config();
const mysql = require('mysql2/promise');

const createDatabase = async () => {
  console.log('🔧 Creating database...\n');

  try {
    // Connect to MySQL without specifying a database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('✅ Connected to MySQL server');

    // Create database
    const dbName = process.env.DB_NAME || 'null-community';
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`✅ Database '${dbName}' created successfully`);

    await connection.end();
    console.log('\n✅ All done! You can now run: node scripts/setup-database.js\n');

  } catch (error) {
    console.error('❌ Error creating database:', error.message);
    throw error;
  }
};

createDatabase()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
