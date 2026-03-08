/**
 * Cleanup Sessions Table
 * Provides options to clean up the sessions table
 */

require('dotenv').config();
const { sequelize } = require('../src/shared/database');

const args = process.argv.slice(2);
const action = args[0];

const cleanupSessions = async () => {
    try {
        // Test connection first
        await sequelize.authenticate();
        console.log('✅ Database connection successful\n');

        // Check if table exists
        const [tables] = await sequelize.query(`
      SELECT TABLE_NAME
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'sessions';
    `);

        if (tables.length === 0) {
            console.log('❌ sessions table not found!');
            console.log('Nothing to clean up. ✨');
            return;
        }

        // Get current count and size
        const [beforeInfo] = await sequelize.query(`
      SELECT
        COUNT(*) as count,
        ROUND((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024, 2) AS size_mb
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'sessions';
    `);

        const [beforeCount] = await sequelize.query('SELECT COUNT(*) as total FROM sessions');

        console.log('📊 BEFORE CLEANUP:');
        console.log('   Total Sessions:', beforeCount[0].total.toLocaleString());
        console.log('   Table Size:', beforeInfo[0].size_mb, 'MB\n');

        if (!action) {
            console.log('❌ No action specified!');
            console.log('\nUsage:');
            console.log('  node scripts/cleanup-sessions.js --drop       # Drop entire table');
            console.log('  node scripts/cleanup-sessions.js --expired    # Delete expired sessions');
            console.log('  node scripts/cleanup-sessions.js --old        # Delete sessions older than 30 days');
            console.log('  node scripts/cleanup-sessions.js --all        # Delete all sessions but keep table');
            return;
        }

        switch (action) {
            case '--drop':
                console.log('🗑️  Dropping sessions table...');
                await sequelize.query('DROP TABLE sessions');
                console.log('✅ Sessions table dropped successfully!');
                console.log('💾 Freed up:', beforeInfo[0].size_mb, 'MB');
                break;

            case '--expired':
                // Try to find expires column
                const [columns] = await sequelize.query('DESCRIBE sessions');
                const expiresColumn = columns.find(col =>
                    col.Field === 'expires' || col.Field === 'expired_at'
                );

                if (!expiresColumn) {
                    console.log('❌ No expires column found in table!');
                    console.log('Available columns:', columns.map(c => c.Field).join(', '));
                    break;
                }

                console.log(`🗑️  Deleting expired sessions (${expiresColumn.Field} < NOW())...`);
                const [expiredResult] = await sequelize.query(`
          DELETE FROM sessions WHERE ${expiresColumn.Field} < NOW()
        `);

                const [afterExpired] = await sequelize.query('SELECT COUNT(*) as total FROM sessions');
                const deleted = beforeCount[0].total - afterExpired[0].total;

                console.log('✅ Deleted', deleted.toLocaleString(), 'expired sessions');
                console.log('📊 Remaining sessions:', afterExpired[0].total.toLocaleString());

                // Optimize table to reclaim space
                console.log('🔧 Optimizing table...');
                await sequelize.query('OPTIMIZE TABLE sessions');
                console.log('✅ Table optimized!');
                break;

            case '--old':
                const [columns2] = await sequelize.query('DESCRIBE sessions');
                const dateColumn = columns2.find(col =>
                    col.Field === 'created_at' || col.Field === 'createdAt' || col.Field === 'updated_at' || col.Field === 'updatedAt'
                );

                if (!dateColumn) {
                    console.log('❌ No timestamp column found in table!');
                    console.log('Available columns:', columns2.map(c => c.Field).join(', '));
                    break;
                }

                console.log(`🗑️  Deleting sessions older than 30 days (${dateColumn.Field} < DATE_SUB(NOW(), INTERVAL 30 DAY))...`);
                await sequelize.query(`
          DELETE FROM sessions WHERE ${dateColumn.Field} < DATE_SUB(NOW(), INTERVAL 30 DAY)
        `);

                const [afterOld] = await sequelize.query('SELECT COUNT(*) as total FROM sessions');
                const deletedOld = beforeCount[0].total - afterOld[0].total;

                console.log('✅ Deleted', deletedOld.toLocaleString(), 'old sessions');
                console.log('📊 Remaining sessions:', afterOld[0].total.toLocaleString());

                // Optimize table to reclaim space
                console.log('🔧 Optimizing table...');
                await sequelize.query('OPTIMIZE TABLE sessions');
                console.log('✅ Table optimized!');
                break;

            case '--all':
                console.log('🗑️  Deleting ALL sessions...');
                await sequelize.query('TRUNCATE TABLE sessions');

                console.log('✅ All sessions deleted!');
                console.log('📊 Remaining sessions: 0');
                console.log('💾 Table structure preserved, space reclaimed');
                break;

            default:
                console.log('❌ Unknown action:', action);
                console.log('\nValid actions:');
                console.log('  --drop       # Drop entire table');
                console.log('  --expired    # Delete expired sessions');
                console.log('  --old        # Delete sessions older than 30 days');
                console.log('  --all        # Delete all sessions but keep table');
                return;
        }

        // Get after stats (if table still exists)
        if (action !== '--drop') {
            const [afterInfo] = await sequelize.query(`
        SELECT
          ROUND((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024, 2) AS size_mb
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = DATABASE()
          AND TABLE_NAME = 'sessions';
      `);

            const savedSpace = beforeInfo[0].size_mb - afterInfo[0].size_mb;

            console.log('\n📊 AFTER CLEANUP:');
            console.log('   Table Size:', afterInfo[0].size_mb, 'MB');
            if (savedSpace > 0) {
                console.log('   💾 Space Saved:', savedSpace, 'MB');
            }
        }

        console.log('\n✅ Cleanup complete!');

    } catch (error) {
        console.error('❌ Error during cleanup:', error.message);
        console.error(error);
        throw error;
    } finally {
        await sequelize.close();
    }
};

// Run cleanup
cleanupSessions()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Cleanup failed:', error);
        process.exit(1);
    });
