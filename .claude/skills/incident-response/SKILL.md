# Skill: Incident Response

**Trigger:** Activates when the user says:
- "production is down", "site is down", "users can't log in"
- "bug in prod", "prod is broken", "something is wrong in production"
- "users are reporting [X]", "we're getting errors in production"
- "health check is failing", "[feature] stopped working"

**Purpose:** Structured incident response that goes from "something is wrong"
to "root cause identified and fix in progress" as fast as possible.

**Priority:** When this skill activates, it takes precedence over all other work.
The user is in crisis — be fast, clear, and focused.

---

## Incident Response Process

### Phase 0 — Establish Severity (first 60 seconds)

Ask only what's needed to triage:

```
1. Is the entire app down, or just a feature?
2. Are users actively being affected right now?
3. When did it start? (approximate time)
4. Any recent deployments or changes?
```

Classify severity:
- **SEV-1:** Full outage, data loss, or security breach → all-hands, immediate
- **SEV-2:** Critical feature broken, major user impact → fix within the hour
- **SEV-3:** Minor feature degraded, small impact → fix within the day

### Phase 1 — Immediate Triage (SEV-1/SEV-2)

Run diagnostics in parallel:

```bash
# 1. Is the app responding?
curl -s -o /dev/null -w "%{http_code}" https://myproject.com/api/health

# 2. Recent deployments
git log --oneline -10

# 3. Any recent CI failures?
# (Check via GitHub MCP)
```

Simultaneously pull from Sentry (via MCP):
```
→ mcp__sentry__list_issues(query="is:unresolved", sort="date", limit=10)
```

Present findings within 2 minutes:
```
## Triage Report (2-minute snapshot)

Health check: [200 OK / 503 / timeout]
Last deploy: [commit sha + time]
Active Sentry errors: [count and most frequent]
Most recent error: [message + first seen]
```

### Phase 2 — Identify the Blast Radius

Determine who and what is affected:

- How many users are impacted? (Sentry user count)
- Which endpoints/features are broken?
- Is data being corrupted or just unavailable?
- Are there failed background jobs or queued operations?

### Phase 3 — Rollback Decision

Before debugging the root cause, decide: **rollback or fix forward?**

**Rollback when:**
- Bug was introduced in the most recent deploy
- A clean rollback is possible (no schema migration in that deploy)
- Time to fix forward is unclear

**Fix forward when:**
- There was a DB migration in the deploy (rollback = data loss or schema mismatch)
- The bug is minor and the fix is clear and fast
- The rollback itself would cause a different problem

If rollback:
```
Rollback procedure:
1. vercel rollback [deployment-url]    # instant Vercel UI revert
   OR
   git revert <merge-commit> && git push origin main
2. Verify: curl https://myproject.com/api/health
3. Confirm: are users unblocked?
4. Then: investigate root cause without time pressure
```

### Phase 4 — Root Cause Investigation

Use the `/debug` workflow with the specific Sentry error.

While investigating, maintain a running incident log:

```markdown
## Incident Log — [timestamp]

HH:MM — Incident reported: [description]
HH:MM — Triage: health check [status], last deploy [sha]
HH:MM — Sentry shows [N] errors: [top error message]
HH:MM — Root cause hypothesis: [what you think is wrong]
HH:MM — [Action taken]
HH:MM — [Result]
...
HH:MM — Resolved: [what fixed it]
```

### Phase 5 — Fix & Verify

Apply the minimal fix. Then verify in sequence:

```bash
npm run test -- --reporter=verbose [affected test file]
npm run type-check
```

Deploy:
```bash
# Staging first (always)
git push origin main  # triggers staging auto-deploy

# Verify staging
curl https://staging.myproject.com/api/health
# Test the specific broken feature manually

# Production (after staging confirms fix)
# Trigger via /deploy command or Vercel dashboard
```

### Phase 6 — Post-Incident Summary

Once resolved, produce a brief incident report. This goes in docs/ or a tracking system.

```markdown
## Incident Report — [date]

**Severity:** SEV-[1/2/3]
**Duration:** [start time] → [end time] = [X minutes]
**Users affected:** [count from Sentry]

**Timeline:**
- HH:MM — First alert / user report
- HH:MM — Triage complete
- HH:MM — Root cause identified
- HH:MM — Fix deployed to production
- HH:MM — Incident resolved

**Root cause:** [One paragraph — what broke and why]

**Fix:** [What was changed, commit sha]

**How to prevent recurrence:**
1. [Specific action — e.g., "add test for null profile case"]
2. [Specific action — e.g., "add Sentry alert for 5xx spike"]

**Follow-up tasks:**
- [ ] Add regression test (GitHub issue #___)
- [ ] Update monitoring alert thresholds
- [ ] Document in docs/incidents/
```
