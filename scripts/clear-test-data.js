/**
 * Clear All Database Data Script
 * Removes all data from the database (preserves structure)
 * 
 * Run: node scripts/clear-test-data.js
 */

require('dotenv').config();
const { sequelize } = require('../src/shared/database');

const log = (msg) => console.log(`[CLEAR] ${msg}`);
const logSuccess = (msg) => console.log(`[✓] ${msg}`);
const logError = (msg) => console.error(`[✗] ${msg}`);

const clearDatabase = async () => {
  try {
    log('Starting database clear...');
    log('This will DELETE ALL DATA from the database!');
    log('Starting in 3 seconds...\n');
    await new Promise(r => setTimeout(r, 3000));

    // Disable foreign key checks to allow truncation in any order
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    
    // Get all table names
    const [tables] = await sequelize.query(
      `SELECT table_name FROM information_schema.tables 
       WHERE table_schema = DATABASE() 
       AND table_type = 'BASE TABLE'
       AND table_name != 'SequelizeMeta'`
    );
    
    log(`Found ${tables.length} tables to clear\n`);
    
    // Truncate each table
    for (const row of tables) {
      const tableName = row.table_name || row.TABLE_NAME;
      try {
        await sequelize.query(`TRUNCATE TABLE \`${tableName}\``);
        logSuccess(`Cleared: ${tableName}`);
      } catch (err) {
        logError(`Failed to clear ${tableName}: ${err.message}`);
      }
    }
    
    // Re-enable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    
    log('\n✨ Database cleared successfully!');
    log('Run: node scripts/seed-test-data.js to repopulate');
    
  } catch (error) {
    logError(`Clear failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
};

// Safety check for production
if (process.env.NODE_ENV === 'production') {
  console.error('❌ Cannot run clear script in production!');
  process.exit(1);
}

clearDatabase();
