/**
 * Inspect Sessions Table (Using Sequelize)
 * Checks the sessions table size, structure, and sample data
 */

require('dotenv').config();
const { sequelize } = require('../src/shared/database');

const inspectSessions = async () => {
    try {
        // Test connection first
        await sequelize.authenticate();
        console.log('✅ Database connection successful\n');

        console.log('🔍 Inspecting sessions table...\n');

        // Get table info
        const [tableInfo] = await sequelize.query(`
      SELECT
        TABLE_NAME,
        TABLE_ROWS,
        ROUND((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024, 2) AS size_mb,
        ROUND(DATA_LENGTH / 1024 / 1024, 2) AS data_size_mb,
        ROUND(INDEX_LENGTH / 1024 / 1024, 2) AS index_size_mb
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'sessions';
    `);

        if (tableInfo.length === 0) {
            console.log('❌ sessions table not found!');
            console.log('This is actually GOOD - it means the table doesn\'t exist or was already cleaned up.');
            return;
        }

        const info = tableInfo[0];
        console.log('📊 TABLE STATISTICS:');
        console.log('   Total Rows (approx):', info.TABLE_ROWS.toLocaleString());
        console.log('   Total Size:', info.size_mb, 'MB');
        console.log('   Data Size:', info.data_size_mb, 'MB');
        console.log('   Index Size:', info.index_size_mb, 'MB\n');

        // Get exact count
        const [countResult] = await sequelize.query('SELECT COUNT(*) as total FROM sessions');
        console.log('📈 EXACT COUNT:', countResult[0].total.toLocaleString(), 'sessions\n');

        // Get table structure
        const [columns] = await sequelize.query('DESCRIBE sessions');
        console.log('📋 TABLE STRUCTURE:');
        columns.forEach(col => {
            console.log(`   ${col.Field}: ${col.Type} ${col.Null === 'YES' ? '(nullable)' : '(required)'}`);
        });
        console.log();

        // Get sample data
        const [samples] = await sequelize.query('SELECT * FROM sessions LIMIT 5');
        console.log('📝 SAMPLE DATA (first 5 rows):');
        samples.forEach((row, idx) => {
            console.log(`\n   Row ${idx + 1}:`);
            Object.keys(row).forEach(key => {
                let value = row[key];
                if (value && typeof value === 'string' && value.length > 100) {
                    value = value.substring(0, 100) + '... [truncated]';
                }
                if (value instanceof Date) {
                    value = value.toISOString();
                }
                console.log(`      ${key}: ${value}`);
            });
        });
        console.log();

        // Get creation date range if there's a timestamp column
        const hasCreatedAt = columns.some(col =>
            col.Field === 'created_at' || col.Field === 'createdAt' || col.Field === 'updatedAt' || col.Field === 'updated_at'
        );

        if (hasCreatedAt) {
            const dateColumn = columns.find(col =>
                col.Field === 'created_at' || col.Field === 'createdAt' || col.Field === 'updatedAt' || col.Field === 'updated_at'
            ).Field;

            const [dateRange] = await sequelize.query(`
        SELECT
          MIN(${dateColumn}) as oldest,
          MAX(${dateColumn}) as newest,
          COUNT(*) as total
        FROM sessions
      `);

            console.log('📅 DATE RANGE:');
            console.log('   Oldest:', dateRange[0].oldest);
            console.log('   Newest:', dateRange[0].newest);
            console.log();
        }

        // Check if there's an expires column (common in express-session)
        const hasExpires = columns.some(col => col.Field === 'expires' || col.Field === 'expired_at');

        if (hasExpires) {
            const expiresColumn = columns.find(col => col.Field === 'expires' || col.Field === 'expired_at').Field;

            const [expiredCount] = await sequelize.query(`
        SELECT COUNT(*) as expired
        FROM sessions
        WHERE ${expiresColumn} < NOW()
      `);

            console.log('⚠️  EXPIRED SESSIONS:', expiredCount[0].expired.toLocaleString());

            const [activeCount] = await sequelize.query(`
        SELECT COUNT(*) as active
        FROM sessions
        WHERE ${expiresColumn} >= NOW()
      `);

            console.log('✅ ACTIVE SESSIONS:', activeCount[0].active.toLocaleString());
            console.log();

            // Calculate how much space we can free
            const [expiredSize] = await sequelize.query(`
        SELECT
          COUNT(*) as count,
          ROUND(COUNT(*) / (SELECT COUNT(*) FROM sessions) * ${info.size_mb}, 2) as estimated_size_mb
        FROM sessions
        WHERE ${expiresColumn} < NOW()
      `);

            console.log('💾 SPACE SAVINGS:');
            console.log(`   Deleting ${expiredSize[0].count.toLocaleString()} expired sessions could free up ~${expiredSize[0].estimated_size_mb} MB`);
            console.log();
        }

        // Check for duplicates if there's a user_id or similar column
        const hasUserId = columns.some(col => col.Field.includes('user') || col.Field.includes('sid'));
        if (hasUserId) {
            const userColumn = columns.find(col => col.Field.includes('user') || col.Field.includes('sid')).Field;
            const [duplicates] = await sequelize.query(`
        SELECT ${userColumn}, COUNT(*) as count
        FROM sessions
        GROUP BY ${userColumn}
        HAVING count > 1
        ORDER BY count DESC
        LIMIT 10
      `);

            if (duplicates.length > 0) {
                console.log('🔄 TOP 10 IDs WITH MULTIPLE SESSIONS:');
                duplicates.forEach((dup, idx) => {
                    console.log(`   ${idx + 1}. ${userColumn} "${dup[userColumn]}": ${dup.count} sessions`);
                });
                console.log();
            }
        }

        // Get sessions per day for the last 30 days
        if (hasCreatedAt) {
            const dateColumn = columns.find(col =>
                col.Field === 'created_at' || col.Field === 'createdAt'
            )?.Field;

            if (dateColumn) {
                const [dailyStats] = await sequelize.query(`
          SELECT
            DATE(${dateColumn}) as date,
            COUNT(*) as sessions_created
          FROM sessions
          WHERE ${dateColumn} >= DATE_SUB(NOW(), INTERVAL 30 DAY)
          GROUP BY DATE(${dateColumn})
          ORDER BY date DESC
          LIMIT 10
        `);

                if (dailyStats.length > 0) {
                    console.log('📈 SESSIONS CREATED PER DAY (last 10 days):');
                    dailyStats.forEach(stat => {
                        console.log(`   ${stat.date}: ${stat.sessions_created.toLocaleString()} sessions`);
                    });
                    console.log();
                }
            }
        }

        console.log('\n' + '='.repeat(70));
        console.log('🎯 ANALYSIS & RECOMMENDATIONS:');
        console.log('='.repeat(70));

        if (info.TABLE_ROWS > 100000) {
            console.log('\n⚠️  CRITICAL: You have', info.TABLE_ROWS.toLocaleString(), 'sessions!');
            console.log('   This is taking up', info.size_mb, 'MB of disk space.');
        }

        console.log('\n📌 Your application uses JWT authentication (token-based),');
        console.log('   NOT session-based authentication.');
        console.log('\n💡 This "sessions" table is likely from:');
        console.log('   1. An old express-session middleware that was removed');
        console.log('   2. A previous version of your app');
        console.log('   3. Some testing/development phase');

        console.log('\n✅ SAFE ACTIONS YOU CAN TAKE:');
        console.log('   1. DROP the entire table (recommended):');
        console.log('      Run: node scripts/cleanup-sessions.js --drop');
        console.log('\n   2. Delete only expired sessions:');
        console.log('      Run: node scripts/cleanup-sessions.js --expired');
        console.log('\n   3. Delete sessions older than 30 days:');
        console.log('      Run: node scripts/cleanup-sessions.js --old');

        console.log('\n⚠️  IMPORTANT: Since you\'re using JWT, dropping this table');
        console.log('   will NOT affect your current authentication system!');
        console.log('='.repeat(70) + '\n');

    } catch (error) {
        console.error('❌ Error inspecting sessions:', error.message);
        console.error(error);
    } finally {
        await sequelize.close();
    }
};

// Run inspection
inspectSessions()
    .then(() => {
        console.log('✅ Inspection complete!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Inspection failed:', error);
        process.exit(1);
    });
