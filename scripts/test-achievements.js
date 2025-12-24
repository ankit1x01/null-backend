const { UserAchievement } = require('../src/shared/models');
const { sequelize } = require('../src/shared/database');

async function test() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    // Create a test achievement
    const achievement = await UserAchievement.create({
        user_id: 1, // Assuming admin user exists with ID 1
        achievement_type: 'Bug Discovery',
        title: 'Bug Hunter',
        description: 'Found a critical security bug',
        awarded_at: new Date()
    });

    console.log('Achievement created:', achievement.toJSON());

    // Fetch achievements
    const fetched = await UserAchievement.findAll({ where: { user_id: 1 } });
    console.log('Fetched achievements:', fetched.length);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

test();
