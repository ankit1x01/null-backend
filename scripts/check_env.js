require('dotenv').config();
console.log('PORT=' + (process.env.PORT || '3001'));
console.log('API_BASE_URL=' + (process.env.API_BASE_URL || 'Not Set'));
