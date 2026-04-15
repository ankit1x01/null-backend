# Skill: Deploy

**Trigger:** When the user mentions "deploy", "ship this", "push to production", "release",
"go live", or invokes `/deploy`.

**Purpose:** Run a comprehensive pre-deployment verification sequence and produce a
deployment readiness report. This skill is a safety gate — it ensures nothing broken
ships to users.

---

## Skill Behavior

This skill runs all verification steps sequentially. A single failure produces a
BLOCKED status. The skill presents the full report before asking the user to confirm
the deployment.

---

## Deployment Verification Pipeline

### Phase 1 — Environment Detection

Determine deployment target:

```typescript
// Detection logic (pseudo-code)
if (args.includes('--env production') || branch === 'main') {
  target = 'production';
  strictMode = true;
} else if (args.includes('--env staging') || branch === 'staging') {
  target = 'staging';
  strictMode = false;
} else {
  // Ask the user
  ask('Which environment are you deploying to? (staging / production)');
}
```

For production deployments:
- Extra confirmation required before proceeding
- All checks are blocking (no warnings, only pass/fail)
- Rollback plan must be stated

### Phase 2 — Code Quality Gate

```bash
# Step 1: Lint — zero errors required
npm run lint
LINT_EXIT=$?

# Step 2: Type safety — zero errors required
npm run type-check
TYPES_EXIT=$?

# Step 3: Test suite with coverage
npm run test -- --coverage --reporter=verbose
TEST_EXIT=$?
```

Parse outputs and extract:
- Number of lint errors/warnings
- Number of TypeScript errors
- Test pass/fail counts
- Coverage percentages per category

Fail the gate if any of these are non-zero.

### Phase 3 — Build Verification

```bash
# Full production build — catches Next.js-specific errors
npm run build
BUILD_EXIT=$?
```

Parse the build output for:
- Build errors (block immediately)
- Warnings about large bundle sizes (warn if > 250kb initial JS)
- Missing static pages or broken dynamic routes

### Phase 4 — Security Gate

```bash
# Dependency vulnerability scan
npm audit --audit-level=high --json > /tmp/audit-result.json
AUDIT_EXIT=$?
```

Parse audit output:
- **Critical/High vulnerabilities** → block deployment
- **Moderate** → warn but non-blocking
- **Low** → informational

Also check for accidental secrets in staged files:
```bash
git diff HEAD --cached | grep -E "(sk-|ghp_|password\s*=|secret\s*=)"
```

### Phase 5 — Environment Variable Verification

Read `.env.example` and verify all required variables are present in the target environment.

For each variable marked as required:
```bash
# Check if variable is set in the deployment environment
# (Method depends on CI/CD platform — Vercel, Railway, etc.)
```

Report as table:
```
| Variable              | Required | Set |
|-----------------------|----------|-----|
| DATABASE_URL          | Yes      | ✓   |
| NEXTAUTH_SECRET       | Yes      | ✓   |
| GITHUB_CLIENT_ID      | Yes      | ✗   | ← BLOCKER
```

### Phase 6 — Database Migration Check

```bash
npx prisma migrate status
```

Parse output to determine:
- Are there pending unapplied migrations?
- Were any migrations applied manually (drift)?

If pending migrations exist:
1. Show migration names and their SQL diff
2. Classify risk level:
   - **Safe:** additive (add column, add table, add index)
   - **Risky:** destructive (drop column, drop table, change type, rename)
3. For risky migrations, require explicit confirmation with risk acknowledgment

### Phase 7 — Production-Only Checks

Skip for staging. For production:

```
□ PR was reviewed and approved (check via GitHub MCP)
□ Changes deployed to staging first and validated
□ Sentry DSN is configured and error tracking is active
□ Rate limiting is enabled on public API routes
□ Health check endpoint responds: GET /api/health → 200
□ Rollback procedure is known and documented below
```

Check health endpoint:
```bash
curl -f https://staging.myproject.com/api/health || echo "HEALTH CHECK FAILED"
```

### Phase 8 — Rollback Plan Generation

Generate a specific rollback plan based on what's being deployed:

```markdown
## Rollback Plan for This Deployment

**Deployment method:** Vercel automatic deploy from main

**If deploy fails immediately:**
→ Vercel will auto-revert. Monitor at: vercel.com/dashboard
→ ETA: ~2 minutes for automatic revert

**If a bug is discovered post-deploy (within 24h):**
→ Run: vercel rollback
→ Or: git revert <commit-sha> && git push origin main

**Database migrations in this deploy:** [Yes/No]
**If yes, migration names:** [list]
**Rollback SQL:** [Generated from prisma migrate diff]

**Who to notify on incident:**
→ On-call: Check #oncall Slack channel
→ Status page: Update status.myproject.com
```

### Phase 9 — Readiness Report

```markdown
## Deployment Readiness Report

**Target environment:** [staging | production]
**Git branch:** main
**Latest commit:** abc1234 — "feat: add user profile editing"
**Prepared at:** [timestamp]

---

### Gate Results

| Gate                     | Status  | Detail                        |
|--------------------------|---------|-------------------------------|
| Lint                     | PASS    | 0 errors, 0 warnings          |
| TypeScript               | PASS    | 0 errors                      |
| Tests                    | PASS    | 247 passed, coverage: 84%     |
| Build                    | PASS    | Completed in 34s              |
| npm audit                | PASS    | 0 high/critical vulnerabilities |
| Environment variables    | FAIL    | GITHUB_CLIENT_ID not set      |
| Database migrations      | WARN    | 1 pending migration (additive) |
| PR approval              | PASS    | Approved by @teammate         |

---

### Status: BLOCKED

**Blockers (must resolve):**
1. Environment variable `GITHUB_CLIENT_ID` is not set in production

**Warnings (review before proceeding):**
1. 1 pending migration: `20240315_add_user_settings_table` — safe (additive)

---

Once blockers are resolved, confirm to proceed with deployment.
```
