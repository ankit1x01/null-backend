const { createVenue } = require('../src/modules/venues/services');
const { sequelize } = require('../src/shared/database');

async function test() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    const result = await createVenue({
      name: 'Test Venue Script',
      address: '123 Test St',
      city: 'Test City',
      chapter_id: 2,
      capacity: 50,
      contact_name: 'Test User',
      contact_email: 'test@example.com'
    });
    console.log('Venue created:', result.toJSON());
  } catch (error) {
    console.error('Error creating venue:', error);
  } finally {
    await sequelize.close();
  }
}

test();
