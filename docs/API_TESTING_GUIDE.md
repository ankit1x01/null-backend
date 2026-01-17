# null Community Backend - API Testing Guide

## Quick Start

The database has been seeded with comprehensive test data. Use this guide to test all API endpoints.

---

## Test Credentials

| Role                         | Email                         | Password    | User ID |
| ---------------------------- | ----------------------------- | ----------- | ------- |
| **Admin**                    | admin@null.community          | password123 | 2       |
| **Admin 2**                  | admin2@null.community         | password123 | 1       |
| **Chapter Lead (Delhi)**     | lead.delhi@null.community     | password123 | 7       |
| **Chapter Lead (Bangalore)** | lead.bangalore@null.community | password123 | 3       |
| **Speaker**                  | speaker1@example.com          | password123 | 9       |
| **Member**                   | member1@example.com           | password123 | 13      |
| **Unconfirmed User**         | unconfirmed1@example.com      | password123 | 18      |

---

## Authentication Tests

### 1. Login (Get JWT Token)

```bash
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{
  "email": "admin@null.community",
  "password": "password123"
}
```

### 2. Register New User

```bash
POST http://localhost:3001/api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New Test User",
  "handle": "newtestuser"
}
```

### 3. Get Current User Profile

```bash
GET http://localhost:3001/api/auth/me
Authorization: Bearer <token>
```

---

## Chapters API Tests

### List All Chapters

```bash
GET http://localhost:3001/api/chapters/getChapters
```

### Get Single Chapter

```bash
GET http://localhost:3001/api/chapters/getChapterById?id=1
```

### Get Chapter by Code

```bash
GET http://localhost:3001/api/chapters/getChapterByCode/DEL
```

### Create Chapter (Admin Only)

```bash
POST http://localhost:3001/api/chapters/createChapter
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Pune",
  "description": "null Pune Chapter",
  "code": "PUN",
  "city": "Pune",
  "state": "Maharashtra",
  "country": "India",
  "active": true
}
```

### Update Chapter (Admin Only)

```bash
PUT http://localhost:3001/api/chapters/1
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "description": "Updated description"
}
```

---

## Events API Tests

### List All Events

```bash
GET http://localhost:3001/api/events/getEvents
GET http://localhost:3001/api/events/getEvents?chapter_id=1
GET http://localhost:3001/api/events/getEvents?upcoming=true
GET http://localhost:3001/api/events/getEvents?past=true
```

### Get Single Event

```bash
GET http://localhost:3001/api/events/getEventById?id=6
```

### Get Event by Slug

```bash
GET http://localhost:3001/api/events/getEventBySlug/web-security-deep-dive
```

### Create Event (Chapter Lead/Admin)

```bash
POST http://localhost:3001/api/events/createEvent
Authorization: Bearer <lead_token>
Content-Type: application/json

{
  "name": "New Security Workshop",
  "description": "A hands-on security workshop",
  "event_type_id": 1,
  "chapter_id": 1,
  "venue_id": 4,
  "start_time": "2026-02-15T14:00:00Z",
  "end_time": "2026-02-15T18:00:00Z",
  "public": true,
  "max_registration": 50
}
```

### Update Event

```bash
PUT http://localhost:3001/api/events/6
Authorization: Bearer <lead_token>
Content-Type: application/json

{
  "description": "Updated event description"
}
```

---

## Event Sessions API Tests

### List Sessions for Event

```bash
GET http://localhost:3001/api/events/6/sessions
```

### Get Single Session

```bash
GET http://localhost:3001/api/sessions/16
```

### Create Session (Speaker/Lead)

```bash
POST http://localhost:3001/api/events/6/sessions
Authorization: Bearer <speaker_token>
Content-Type: application/json

{
  "name": "Introduction to OWASP Top 10",
  "description": "Overview of web security vulnerabilities",
  "session_type": "Talk",
  "start_time": "2026-01-23T14:00:00Z",
  "end_time": "2026-01-23T15:00:00Z",
  "need_projector": true,
  "need_microphone": true
}
```

---

## Event Registrations API Tests

### Register for Event

```bash
POST http://localhost:3001/api/events/6/register
Authorization: Bearer <member_token>
```

### Cancel Registration

```bash
DELETE http://localhost:3001/api/events/6/register
Authorization: Bearer <member_token>
```

### List My Registrations

```bash
GET http://localhost:3001/api/registrations/me
Authorization: Bearer <member_token>
```

### List Event Registrations (Lead/Admin)

```bash
GET http://localhost:3001/api/events/6/registrations
Authorization: Bearer <lead_token>
```

### Approve/Reject Registration (Lead/Admin)

```bash
PUT http://localhost:3001/api/registrations/45/accept
Authorization: Bearer <lead_token>

PUT http://localhost:3001/api/registrations/45/reject
Authorization: Bearer <lead_token>
```

---

## Users API Tests

### List Users (Admin Only)

```bash
GET http://localhost:3001/api/users/getUsers
Authorization: Bearer <admin_token>
```

### Get User Profile

```bash
GET http://localhost:3001/api/users/getUserById?id=9
```

### Update My Profile

```bash
PUT http://localhost:3001/api/users/updateUser/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "about_me": "Updated bio"
}
```

### Get User by Handle

```bash
GET http://localhost:3001/api/users/handle/admin
```

---

## Venues API Tests

### List All Venues

```bash
GET http://localhost:3001/api/venues
GET http://localhost:3001/api/venues?chapter_id=2
```

### Get Single Venue

```bash
GET http://localhost:3001/api/venues/1
```

### Create Venue (Lead/Admin)

```bash
POST http://localhost:3001/api/venues
Authorization: Bearer <lead_token>
Content-Type: application/json

{
  "name": "New Conference Hall",
  "description": "Large conference venue",
  "address": "123 Main Street, City",
  "chapter_id": 1,
  "contact_name": "Venue Manager",
  "contact_email": "venue@example.com"
}
```

---

## Event Types API Tests

### List Event Types

```bash
GET http://localhost:3001/api/event-types
```

### Get Event Type

```bash
GET http://localhost:3001/api/event-types/1
```

---

## Session Proposals API Tests

### List My Proposals

```bash
GET http://localhost:3001/api/session-proposals/me
Authorization: Bearer <speaker_token>
```

### Submit Proposal

```bash
POST http://localhost:3001/api/session-proposals
Authorization: Bearer <speaker_token>
Content-Type: application/json

{
  "title": "Advanced Binary Exploitation",
  "description": "Deep dive into binary exploitation techniques",
  "session_type": "workshop"
}
```

### Approve/Reject Proposal (Lead/Admin)

```bash
PUT http://localhost:3001/api/session-proposals/1/approve
Authorization: Bearer <lead_token>

PUT http://localhost:3001/api/session-proposals/1/reject
Authorization: Bearer <lead_token>
```

---

## Session Requests API Tests

### List Session Requests

```bash
GET http://localhost:3001/api/session-requests
```

### Create Session Request

```bash
POST http://localhost:3001/api/session-requests
Content-Type: application/json

{
  "title": "Request: Kubernetes Security",
  "description": "Would love to learn about K8s security",
  "requested_by": "Community Member",
  "email": "requester@example.com"
}
```

---

## Chapter Leads API Tests

### List Chapter Leads

```bash
GET http://localhost:3001/api/chapters/1/leads
```

### Add Chapter Lead (Admin Only)

```bash
POST http://localhost:3001/api/chapters/1/leads
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "user_id": 9
}
```

### Remove Chapter Lead (Admin Only)

```bash
DELETE http://localhost:3001/api/chapters/1/leads/9
Authorization: Bearer <admin_token>
```

---

## Pages API Tests

### List Published Pages

```bash
GET http://localhost:3001/api/pages
```

### Get Page by Slug

```bash
GET http://localhost:3001/api/pages/about
GET http://localhost:3001/api/pages/faq
GET http://localhost:3001/api/pages/code-of-conduct
```

### Create Page (Admin Only)

```bash
POST http://localhost:3001/api/pages
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "New Page",
  "slug": "new-page",
  "content": "# New Page Content",
  "published": true
}
```

---

## User Achievements API Tests

### Get User Achievements

```bash
GET http://localhost:3001/api/users/9/achievements
```

### Award Achievement (Admin Only)

```bash
POST http://localhost:3001/api/achievements
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "user_id": 13,
  "achievement_type": "speaker",
  "title": "First Time Speaker",
  "description": "Gave first talk at null community"
}
```

---

## API Tokens API Tests

### List My Tokens

```bash
GET http://localhost:3001/api/tokens/me
Authorization: Bearer <token>
```

### Create API Token

```bash
POST http://localhost:3001/api/tokens
Authorization: Bearer <token>
Content-Type: application/json

{
  "client_name": "My Integration",
  "expire_days": 30
}
```

### Revoke Token

```bash
DELETE http://localhost:3001/api/tokens/1
Authorization: Bearer <token>
```

---

## Test Scenarios

### Scenario 1: New User Registration Flow

1. Register new user
2. (Email confirmation - if enabled)
3. Login with new user
4. Update profile
5. Browse events
6. Register for event

### Scenario 2: Event Management Flow (Chapter Lead)

1. Login as chapter lead
2. Create new venue
3. Create new event
4. Add sessions to event
5. View registrations
6. Approve/reject registrations

### Scenario 3: Speaker Flow

1. Login as speaker
2. Submit session proposal
3. Wait for approval
4. Create session for approved event
5. Upload presentation URL after event

### Scenario 4: Admin Management Flow

1. Login as admin
2. Create new chapter
3. Assign chapter leads
4. Create event types
5. Manage users
6. Create static pages

---

## Test Data Reference

### Chapters (5)

| ID  | Name      | Code | Active |
| --- | --------- | ---- | ------ |
| 1   | Delhi     | DEL  | ✅     |
| 2   | Bangalore | BLR  | ✅     |
| 3   | Mumbai    | MUM  | ✅     |
| 4   | Chennai   | CHE  | ❌     |
| 5   | Hyderabad | HYD  | ✅     |

### Event Types (6)

| ID  | Name              |
| --- | ----------------- |
| 1   | null Puliya       |
| 2   | null Humla        |
| 3   | null Bachaav      |
| 4   | null Open Session |
| 5   | null Webinar      |
| 6   | null Conference   |

### Events Overview

- **Past Events**: IDs 1-5, 15-19
- **Upcoming Events**: IDs 6-10
- **Draft Events**: IDs 11-13
- **Cancelled Event**: ID 14

### Key Event Slugs

- `web-security-deep-dive` (upcoming, Delhi)
- `bug-bounty-bootcamp` (upcoming, Bangalore)
- `cloud-security-masterclass` (upcoming, Mumbai)
- `online-security-webinar` (upcoming, online)
- `hyderabad-kickoff` (upcoming, Hyderabad)

---

## Quick cURL Commands

### Get Admin Token

```bash
TOKEN=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@null.community","password":"password123"}' \
  | jq -r '.token')
echo $TOKEN
```

### Use Token in Request

```bash
curl -X GET http://localhost:3001/api/users \
  -H "Authorization: Bearer $TOKEN"
```

---

## Postman Collection

Import the `postman_collection.json` file in the backend folder for a complete Postman collection with all endpoints pre-configured.

---

## Notes

- All passwords are: `password123`
- JWT tokens expire after 24 hours (configurable in .env)
- Some endpoints require specific roles (admin, chapter_lead, speaker)
- Event registrations may be auto-approved or require manual approval based on event type
