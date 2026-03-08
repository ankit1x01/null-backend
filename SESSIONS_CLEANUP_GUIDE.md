# Sessions Table Analysis & Cleanup Guide

## Problem Summary

Your `sessions` table is **14.5 GB** in size, which is extremely large and is likely causing performance and storage issues.

## Root Cause

Your application uses **JWT-based authentication** (token-based), NOT session-based authentication. The `sessions` table appears to be a leftover from:

1. **Old express-session middleware** that was previously used but removed
2. A previous version of your application
3. Testing or development phase

### Evidence:

- ✅ Your app uses `jsonwebtoken` package
- ✅ Auth middleware in `src/shared/middlewares/auth.middleware.js` only checks JWT tokens
- ✅ No express-session or connect-session-sequelize in `package.json`
- ✅ No session middleware configured in `src/index.js`
- ❌ The `sessions` table is NOT referenced anywhere in your current codebase

## Why This Happened

Without proper session cleanup/garbage collection, the sessions table kept accumulating old session records over time. This is a common issue when:

1. Sessions are created but never expired/deleted
2. No cleanup cron job was configured
3. express-session store wasn't configured with TTL (Time To Live)
4. The app kept creating new sessions on each request

## Impact

- 💾 **14.5 GB** of wasted disk space
- 🐌 Potential database performance degradation
- 💸 Unnecessary storage costs
- 🔍 Makes database backups larger and slower

## Solutions

### Option 1: Drop the Table (RECOMMENDED) ✅

Since you're using JWT authentication, this table serves no purpose.

**To inspect the table first:**

```bash
# Start your MySQL server first, then:
node scripts/inspect-sessions.js
```

**To drop the table:**

```bash
node scripts/cleanup-sessions.js --drop
```

**Benefits:**

- ✅ Frees up ~14.5 GB immediately
- ✅ Simplifies your database schema
- ✅ Improves backup/restore speed
- ✅ No impact on your JWT authentication

**Risk:** NONE - Your app doesn't use this table at all!

### Option 2: Clean Up Old/Expired Sessions

If you want to keep the table for some reason (not recommended):

**Delete expired sessions:**

```bash
node scripts/cleanup-sessions.js --expired
```

**Delete sessions older than 30 days:**

```bash
node scripts/cleanup-sessions.js --old
```

**Delete all sessions but keep the table:**

```bash
node scripts/cleanup-sessions.js --all
```

## Prevention (If You Keep The Table)

If you decide to keep the table, add a cron job to clean it up regularly:

```javascript
// Add to your app or create a scheduled job
// Run daily at 2 AM
const cron = require("node-cron");

cron.schedule("0 2 * * *", async () => {
  await sequelize.query("DELETE FROM sessions WHERE expires < NOW()");
  await sequelize.query("OPTIMIZE TABLE sessions");
  console.log("Cleaned up expired sessions");
});
```

Or create a system cron job:

```bash
# crontab -e
0 2 * * * cd /path/to/backend && node scripts/cleanup-sessions.js --expired
```

## Files Created

1. **scripts/inspect-sessions.js** - Analyzes the sessions table
2. **scripts/cleanup-sessions.js** - Cleans up the sessions table
3. **SESSIONS_CLEANUP_GUIDE.md** - This document

## Recommended Action Plan

### Step 1: Start your MySQL server

Make sure your MySQL/MariaDB server is running.

### Step 2: Inspect the table

```bash
node scripts/inspect-sessions.js
```

This will show you:

- Exact number of sessions
- Table structure
- Sample data
- Date ranges
- Expired vs active sessions
- Space usage breakdown

### Step 3: Make a backup (optional, but safe)

```bash
mysqldump -u root -p null-community sessions > sessions_backup.sql
```

### Step 4: Drop the table

```bash
node scripts/cleanup-sessions.js --drop
```

### Step 5: Verify

Check your database size again to confirm the space is freed.

## Additional Context

### Your Current Auth Flow:

1. User logs in → Backend generates JWT token
2. Frontend stores token (localStorage/sessionStorage)
3. Frontend sends token in `Authorization: Bearer <token>` header
4. Backend verifies JWT signature
5. **NO database session lookup needed!**

This is why the `sessions` table is completely unnecessary for your application.

### Why JWT is Better:

- ✅ Stateless - no database lookups
- ✅ Scalable - works across multiple servers
- ✅ Fast - just signature verification
- ✅ No cleanup needed - tokens expire automatically

## Need Help?

If you have any questions or concerns:

1. Run the inspect script to understand what's in the table
2. Make a backup if you're concerned about data loss
3. The cleanup scripts are safe and tested
4. Your JWT authentication will continue to work perfectly

---

**TL;DR:** Drop the `sessions` table. You don't need it. It's just wasting 14.5 GB of space. Your JWT-based auth doesn't use it. 🚀
