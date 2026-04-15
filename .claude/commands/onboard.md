# /onboard — New Developer Setup Guide

Interactive onboarding workflow. Verifies the development environment is correctly
set up and guides a new developer from zero to running tests in one session.

---

## Usage

```
/onboard                  # Full onboarding from scratch
/onboard --verify         # Verify existing setup is correct
/onboard --reset-db       # Re-seed the local database
```

---

## Onboarding Process

### Step 1 — Prerequisites Check

Verify required tools are installed with correct versions:

```bash
node --version       # Requires: 20.x or higher
npm --version        # Requires: 10.x or higher
psql --version       # Requires: PostgreSQL 15+
git --version        # Any recent version
```

For each failing check, provide the exact installation command:
- Node.js: "Install via nvm: `nvm install 20 && nvm use 20`"
- PostgreSQL: "Install via Homebrew: `brew install postgresql@15`"

### Step 2 — Environment Variables

Check if `.env.local` exists:

```bash
ls .env.local 2>/dev/null && echo "EXISTS" || echo "MISSING"
```

If missing, create it from `.env.example`:
```bash
cp .env.example .env.local
```

Then walk through each required variable interactively:

```
NEXTAUTH_SECRET — Generate with: openssl rand -base64 32
DATABASE_URL    — Format: postgresql://USER:PASSWORD@localhost:5432/myproject_dev
                   Create DB with: createdb myproject_dev

Optional for local development (can leave blank):
GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET — Only needed to test GitHub OAuth
GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET — Only needed to test Google OAuth
```

### Step 3 — Install Dependencies

```bash
npm install
```

Verify no peer dependency warnings that could cause issues.

### Step 4 — Database Setup

```bash
# Apply the Prisma schema to your local database
npm run db:push

# Verify connection is working
npx prisma db execute --stdin <<< "SELECT 1;"
```

If db:push fails:
- Check DATABASE_URL format
- Verify PostgreSQL is running: `pg_isready -h localhost`
- Check database exists: `psql -l | grep myproject`

Seed the database with development data:
```bash
npm run db:seed
```

### Step 5 — Run the Application

```bash
npm run dev
```

Verify the app starts:
```bash
curl -s http://localhost:3000/api/health | python3 -m json.tool
# Expected: { "status": "ok", ... }
```

Open the browser to `http://localhost:3000`.
Expected: redirect to `/login`.

### Step 6 — Run the Test Suite

```bash
npm run test
```

All tests should pass on a fresh checkout. If any fail:
1. Check if DATABASE_URL_TEST is set (some integration tests need a test DB)
2. Check if the schema is applied: `npm run db:push`
3. Report the failure — it may be a broken test or setup issue

```bash
npm run type-check
npm run lint
```

### Step 7 — Verify Claude Code Setup (optional)

```bash
# Install Claude Code if not already installed
npm install -g @anthropic-ai/claude-code

# Verify the project is recognized
claude --version

# Run the health check slash command
# In claude: /test
```

### Step 8 — Onboarding Complete

Present a summary:

```
✓ Node.js 20.x
✓ npm 10.x
✓ PostgreSQL 15
✓ .env.local configured
✓ Dependencies installed
✓ Database schema applied
✓ Application starts (http://localhost:3000)
✓ All 247 tests passing

You're ready to contribute. Next steps:
1. Read CLAUDE.md — the project law
2. Read .claude/context/current-sprint.md — what's being worked on
3. Pick up a task from the sprint board
4. Create a branch: git checkout -b feat/your-feature
5. Use /review before pushing any changes
```
