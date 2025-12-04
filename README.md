# Swachalit - Node.js Migration

A modern Node.js/Express implementation of the Swachalit Rails application with Sequelize ORM, JWT authentication, and comprehensive API endpoints.

## 🎯 Project Status

**Overall Progress: ~35% Complete**

✅ **Core Foundation Complete:**
- Database layer with Sequelize + MySQL
- All 14 database models migrated
- Authentication system (JWT-based)
- JWT middleware for protected routes
- Users API module
- Events API module (list & details)
- Chapters API structure

🚧 **Remaining Work:**
- Complete chapters services
- Event sessions CRUD
- Event registrations
- Leadership dashboard
- File uploads, emails, background jobs
- Advanced features (calendar, CSV, voting, etc.)

See `MIGRATION_COMPLETE_SUMMARY.md` for detailed progress.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MySQL database (same as Rails app)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials
```

### Configuration

Update `.env` with your settings:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=swachalit_dev
DB_USER=root
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=24h

# Server
PORT=3001
NODE_ENV=development
```

### Start Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will start on http://localhost:3001

---

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:3001/api-docs
- **JSON Spec**: http://localhost:3001/api-docs/swagger.json

---

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### 1. Register a New User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

### 2. Confirm Email (Manual for now)

```sql
UPDATE users SET confirmed_at = NOW() WHERE email = 'user@example.com';
```

### 3. Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

Response:
```json
{
  "code": "USRS0001",
  "statusCode": 200,
  "message": "Login successful",
  "result": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expire_at": "2025-11-28T..."
  }
}
```

### 4. Use Token in Requests

```bash
GET /api/users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📖 Available API Endpoints

### Authentication (Public)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Users (Authenticated)
- `GET /api/users/me` - Get current user info
- `GET /api/users/events` - Get user's registered events
- `GET /api/users/sessions` - Get user's delivered sessions

### Events (Public)
- `GET /api/events/getEvents` - List all events (with pagination)
  - Query params: `page`, `per_page`, `all` (include past events)
- `GET /api/events/getEventById` - Get event details with sessions
  - Query params: `eventId`

### Chapters (Public)
- `GET /api/chapters/getChapters` - List all chapters
- `GET /api/chapters/getChapterById` - Get chapter details

---

## 🗄️ Database Models

All 14 models have been migrated from Rails:

1. **User** - Authentication, profile management
2. **Chapter** - Organization chapters
3. **EventType** - Event categorization
4. **Venue** - Event locations
5. **Event** - Events with registration management
6. **EventSession** - Conference/meetup sessions
7. **EventRegistration** - User event registrations
8. **EventSessionComment** - Comments on sessions
9. **ChapterLead** - Chapter leadership
10. **UserApiToken** - API token management
11. **SessionProposal** - Proposed sessions
12. **SessionRequest** - Community session requests
13. **Page** - CMS pages
14. **Stat** - Statistics tracking

All models include:
- ✅ Proper associations (belongsTo, hasMany)
- ✅ Validation rules
- ✅ Model scopes
- ✅ Instance methods
- ✅ Hooks (beforeCreate, afterCreate, etc.)

---

## 🏗️ Project Structure

```
src/
├── config/
│   ├── database.js          # Database configuration
│   └── index.js
├── shared/
│   ├── database/            # Connection manager
│   ├── models/              # All 14 Sequelize models
│   ├── middlewares/         # JWT, auth, response, etc.
│   ├── constants/
│   ├── services/
│   └── validators/
├── modules/
│   ├── auth/                # Authentication (complete)
│   ├── users/               # Users API (complete)
│   ├── events/              # Events API (complete)
│   ├── chapters/            # Chapters API (in progress)
│   └── [more to be added]
├── swagger/                 # API documentation
└── index.js                 # Application entry point
```

---

## 🔧 Development

### Create New Module

```bash
npm run create-module <module-name> <feature1>,<feature2>

# Example:
npm run create-module venues getVenues,createVenue,updateVenue
```

This generates:
- Controller with HTTP request handlers
- Services for business logic
- Validators for input validation
- Constants for error codes
- Routes
- Swagger documentation

### Module Development Pattern

1. **Service Layer** - Database queries using Sequelize models
2. **Controller Layer** - HTTP request/response handling
3. **Validation Layer** - Input validation
4. **Routes** - Express route definitions with middleware
5. **Documentation** - Auto-generated Swagger docs

Example service:
```javascript
const { Model } = require('../../shared/models');

const getItems = async ({ page = 0, per_page = 20 }) => {
  const { count, rows } = await Model.findAndCountAll({
    limit: per_page,
    offset: page * per_page
  });

  return { items: rows, total: count };
};
```

---

## 🧪 Testing

### Manual Testing

Use the Swagger UI at http://localhost:3001/api-docs to test all endpoints interactively.

### Automated Testing (To Be Implemented)

```bash
# Install testing dependencies
npm install --save-dev jest supertest

# Run tests
npm test
```

---

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Token expiration
- ✅ Rate limiting
- ✅ Helmet.js for security headers
- ✅ XSS protection
- ⏳ ReCAPTCHA validation (to be added)

---

## 📊 Database Compatibility

**Important:** This Node.js application uses the **same MySQL database** as the Rails application.

- ✅ No database migration needed
- ✅ Reads existing data
- ✅ Can run alongside Rails app (different port)
- ✅ Identical table structures

### Migration Strategy

1. ✅ Phase 1: Build Node.js API with existing database
2. 🚧 Phase 2: Test thoroughly with production data copy
3. ⏳ Phase 3: Gradually route traffic to Node.js API
4. ⏳ Phase 4: Deprecate Rails application

---

## 📦 Package Dependencies

### Core
- `express` - Web framework
- `sequelize` - ORM
- `mysql2` - MySQL driver
- `jsonwebtoken` - JWT authentication
- `bcrypt` / `bcryptjs` - Password hashing

### Middleware
- `cors` - CORS handling
- `helmet` - Security headers
- `express-rate-limit` - Rate limiting

### Utilities
- `dotenv` - Environment configuration
- `slugify` - URL slug generation
- `nodemailer` - Email sending (to be configured)
- `multer` - File uploads (to be added)
- `csv-writer` - CSV exports (installed)
- `ical-generator` - Calendar feeds (to be added)

### Documentation
- `swagger-jsdoc` - Swagger generation
- `swagger-ui-express` - Swagger UI

### Development
- `nodemon` - Auto-restart on changes

---

## 🚀 Deployment

### Environment Variables

In production, set environment variables via:
- EC2 User Data
- Docker environment
- AWS Secrets Manager
- Platform environment configuration

**Do not use `.env` files in production.**

### Docker Deployment

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["node", "src/index.js"]
```

### PM2 Process Manager

```bash
npm install -g pm2
pm2 start src/index.js --name swachalit-api
pm2 save
pm2 startup
```

---

## 📝 Next Steps

See `COMPLETE_API_IMPLEMENTATION.md` for detailed implementation guides for:

1. **Event Sessions API** - CRUD operations
2. **Event Registrations API** - With ReCAPTCHA
3. **Session Comments API** - Comment system
4. **Leadership Dashboard** - Management interface
5. **File Uploads** - Images and avatars
6. **Email Service** - Notifications and confirmations
7. **Background Jobs** - Async processing
8. **Calendar Integration** - iCalendar feeds
9. **Additional Features** - CSV, voting, Slackbot

---

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Test MySQL connection
mysql -h localhost -u root -p swachalit_dev

# Check Node.js can connect
npm run dev
# Look for: ✅ Database connection established successfully
```

### JWT Token Issues

- Ensure `JWT_SECRET` is set in `.env`
- Check token hasn't expired
- Verify `Authorization: Bearer <token>` header format

### Module Not Found Errors

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Support

- **GitHub Issues**: Report bugs and request features
- **Documentation**: See `MIGRATION_COMPLETE_SUMMARY.md`
- **API Docs**: http://localhost:3001/api-docs

---

## 📄 License

[Your License Here]

---

## 👥 Contributors

Migration from Rails to Node.js by Claude Code

---

## 🎉 Acknowledgments

- Original Rails application: Swachalit
- Built with Express, Sequelize, and modern Node.js best practices
- API design following RESTful principles

---

**Status**: Core foundation complete, ready for remaining API implementation.

**Last Updated**: 2025-10-28
