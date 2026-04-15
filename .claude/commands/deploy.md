# /deploy — Deployment Checklist & Workflow

A pre-deployment verification workflow. This command runs through all required checks
and produces a deployment readiness report before any code reaches production.

---

## Usage

```
/deploy                  # Full pre-deployment checklist
/deploy --env staging    # Target staging environment
/deploy --env production # Target production (extra checks required)
/deploy --hotfix         # Expedited checklist for critical hotfixes
```

---

## Deployment Process

### Step 1 — Environment Confirmation

Confirm the target environment before doing anything:

```
Deploying to: [staging | production]
Branch: [current git branch]
Last commit: [git log --oneline -1]
```

If targeting **production** and the branch is not `main`, stop and warn:
> "You are deploying a non-main branch to production. Confirm this is intentional."

### Step 2 — Pre-flight Checks

Run all checks. A single failure blocks deployment.

#### 2a. Code Quality

```bash
npm run lint
npm run type-check
```

Expected: zero errors, zero warnings.

#### 2b. Test Suite

```bash
npm run test -- --coverage
```

Expected:
- All tests pass
- Coverage >= 80% on lines, functions, and branches
- No skipped tests (`it.skip`, `test.skip`)

#### 2c. Build Verification

```bash
npm run build
```

Expected: clean build with no errors or unresolved warnings.

#### 2d. Dependency Audit

```bash
npm audit --audit-level=high
```

Expected: zero high or critical vulnerabilities.

### Step 3 — Environment Variables Checklist

Verify all required environment variables are set in the target environment.
Cross-reference against `.env.example`:

| Variable              | Required | Status |
|-----------------------|----------|--------|
| `DATABASE_URL`        | Yes      | ✓ / ✗  |
| `NEXTAUTH_SECRET`     | Yes      | ✓ / ✗  |
| `NEXTAUTH_URL`        | Yes      | ✓ / ✗  |
| `GITHUB_CLIENT_ID`    | Yes      | ✓ / ✗  |
| `GITHUB_CLIENT_SECRET`| Yes      | ✓ / ✗  |
| `SENTRY_DSN`          | Prod only| ✓ / ✗  |
| `RATE_LIMIT_MAX`      | No       | ✓ / ✗  |

Flag any missing required variables as **blockers**.

### Step 4 — Database Migration Check

1. Check if there are pending migrations:

```bash
npx prisma migrate status
```

2. If migrations are pending, confirm they have been reviewed for:
   - Reversibility (can we roll back?)
   - Data loss risk (dropping columns, changing types)
   - Lock time on large tables

3. For production: confirm migrations will be run before the new code is deployed.

### Step 5 — Production-Only Checks

Skip this step for staging deployments.

- [ ] Sentry DSN is set and error tracking is active
- [ ] Analytics are configured
- [ ] Rate limiting is enabled on all public routes
- [ ] HTTPS is enforced (no HTTP redirects to HTTP)
- [ ] Robots.txt is correct for production
- [ ] Health check endpoint responds: `GET /api/health`
- [ ] At least one team member has reviewed the PR
- [ ] Change has been communicated in #deployments Slack channel

### Step 6 — Rollback Plan

Before deploying to production, state the rollback plan:

```
## Rollback Plan

**If deployment fails during build/startup:**
→ Vercel automatically reverts to the previous deployment.
   Run: vercel rollback [deployment-url]

**If deployment succeeds but a bug is discovered post-deploy:**
→ Revert the PR merge commit and redeploy main.
   Run: git revert <merge-commit-sha> && git push origin main

**If a database migration causes issues:**
→ Run: npx prisma migrate resolve --rolled-back <migration-name>
→ Restore from the pre-deployment database snapshot.
   Snapshot location: [configure in your cloud provider]

**On-call contact:** [name] — [contact method]
```

### Step 7 — Deployment Report

```
## Deployment Readiness Report

**Target:** [staging | production]
**Status:** READY | BLOCKED

### Checklist Results

| Check                    | Result  | Notes |
|--------------------------|---------|-------|
| Lint                     | Pass/Fail |     |
| Type check               | Pass/Fail |     |
| Tests (coverage X%)      | Pass/Fail |     |
| Build                    | Pass/Fail |     |
| npm audit                | Pass/Fail |     |
| Environment variables    | Pass/Fail |     |
| Pending migrations       | Yes/No  |       |

### Blockers (must resolve before deploying)
[List if any, else "None"]

### Warnings (review but non-blocking)
[List if any, else "None"]

**Proceed with deployment?** Confirm when ready.
```
