# /debug — Production Debugging Workflow

Investigate live production errors using Sentry data, logs, and the codebase.
Structured to go from symptom → root cause → fix without guessing.

---

## Usage

```
/debug                          # Interactive: describe the problem
/debug SENTRY-123               # Debug a specific Sentry issue ID
/debug "TypeError: Cannot read" # Debug by error message
/debug --recent                 # Pull the 5 most recent Sentry errors
```

---

## Debugging Process

### Step 1 — Fetch the Error (Sentry MCP)

If a Sentry issue ID is provided:
```
→ mcp__sentry__get_issue(issue_id)
→ mcp__sentry__get_events(issue_id, limit=5)   # get multiple occurrences
```

Extract from Sentry:
- Error type and message
- Full stack trace (with file paths and line numbers)
- Frequency: how many times, when, affecting how many users
- Environment: production/staging, deployment version
- Browser/OS if frontend error
- Request context if backend error (URL, method, user ID if available)

If no Sentry ID:
- Ask the user for the error message, stack trace, or steps to reproduce

### Step 2 — Locate the Code

From the stack trace, identify the exact files involved:

```bash
# Find the file mentioned in the stack trace
# e.g., "at getUserProfile (src/lib/db/users.ts:45)"
# Read that file and the surrounding context
```

Read:
1. The exact failing function
2. The callers of that function (one level up in the stack)
3. Any relevant types or interfaces
4. The test file for that module (if it exists)

### Step 3 — Reproduce Locally

Determine if the error can be reproduced:

```bash
# Try to reproduce with a targeted test
npm run test -- --reporter=verbose src/path/to/affected.test.ts
```

If reproducible, confirm:
> "I can reproduce this: [describe the condition that triggers it]"

If not reproducible:
- Is it environment-specific? (prod DB data, env vars, race condition)
- Is it a missing env var?
- Is it timing-dependent?

### Step 4 — Root Cause Analysis

State the root cause precisely before proposing a fix:

```
## Root Cause

**Error:** TypeError: Cannot read properties of null (reading 'displayName')
**Location:** src/lib/db/users.ts:45 — getUserProfile()
**Trigger:** User records created before UserProfile was required have profile: null
**Why it's failing now:** A recent change assumes profile is always present (removed null check in commit abc1234)
**Affected users:** ~12 users with accounts created before 2024-01-15
```

### Step 5 — Propose the Fix

Write the minimal fix that addresses the root cause:

```typescript
// Before (line 45) — assumes profile always exists
return {
  displayName: user.profile.displayName,
};

// After — handles null profile safely
return {
  displayName: user.profile?.displayName ?? user.email,
};
```

Also address the data:
- Is there a data backfill needed? (e.g., create missing UserProfile records)
- Is there a migration needed?
- Are there other places with the same assumption?

```bash
# Find other places with the same pattern
grep -rn "user\.profile\." src/ --include="*.ts" --include="*.tsx"
```

### Step 6 — Add a Regression Test

Every production bug fix gets a test that would have caught it:

```typescript
it('handles users with null profile (regression: SENTRY-123)', () => {
  const user = createMockUser({ profile: null });
  expect(() => getUserProfile(user)).not.toThrow();
  expect(getUserProfile(user).displayName).toBe(user.email);
});
```

### Step 7 — Verify & Report

```bash
npm run test -- --reporter=verbose
npm run type-check
```

```markdown
## Debug Report

**Error:** [Sentry ID + message]
**Root cause:** [One sentence]
**Fix:** [Files changed, what changed]
**Regression test:** [File path]
**Data fix needed:** [Yes/No — describe if yes]
**Users affected:** [Count from Sentry]

**Suggested commit:**
fix: [description]

Fixes SENTRY-[ID]
```
