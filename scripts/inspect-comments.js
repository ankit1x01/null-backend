require('dotenv').config();
const { sequelize } = require('../src/shared/database');

async function inspect() {
    try {
        await sequelize.authenticate();
        const [results] = await sequelize.query("DESCRIBE event_session_comments");
        console.log('Columns:', results.map(r => r.Field).join(', '));
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sequelize.close();
    }
}

inspect();
