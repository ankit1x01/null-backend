# /fix-issue — Debugging & Issue Resolution Workflow

A structured debugging workflow for resolving bugs, failures, and unexpected behavior.
This command guides Claude through systematic diagnosis before writing any code.

---

## Usage

```
/fix-issue #42                   # Fix a GitHub issue by number
/fix-issue "TypeError in auth"   # Fix by description
/fix-issue --test-failure        # Fix a failing test
/fix-issue --build-failure       # Fix a build/type error
```

---

## Debugging Process

### Step 1 — Understand the Problem

1. If a GitHub issue number is provided, fetch it via MCP:
   - Read the issue title, description, and all comments
   - Note any reproduction steps, error messages, and stack traces
2. If a description is provided, ask clarifying questions if needed:
   - "What is the expected behavior?"
   - "What is the actual behavior?"
   - "Can you share the error message or stack trace?"
3. Confirm your understanding of the problem in one paragraph before proceeding.

### Step 2 — Reproduce the Issue

1. Identify the affected code path from the error or description
2. Read all relevant files in the affected area
3. Trace the execution path from entry point to failure point
4. Identify the specific line or condition causing the problem
5. If tests exist for the area, run them:

```bash
npm run test -- --reporter=verbose <path-to-test-file>
```

### Step 3 — Root Cause Analysis

Before writing any fix, state:

```
## Root Cause Analysis

**Symptom:** [What the user observed]
**Root cause:** [The actual technical reason it fails]
**Affected files:** [List of files to change]
**Risk of change:** [Low / Medium / High — explain why]
```

Do NOT proceed if the root cause is unclear. Investigate further.

### Step 4 — Design the Fix

1. Describe the fix in plain English before writing code
2. Consider side effects: what else could this change break?
3. Check if the fix requires a database migration
4. Check if the fix requires an environment variable change
5. Confirm the approach with the user if risk is Medium or High

### Step 5 — Implement the Fix

1. Apply the minimal change that resolves the root cause
2. Do not refactor surrounding code unless it directly caused the bug
3. Add a regression test that would have caught this bug:

```typescript
// Example: regression test pattern
it('should not throw when user has no profile (regression: issue #42)', () => {
  // Arrange
  const userWithNoProfile = { id: '1', profile: null };
  // Act + Assert
  expect(() => getUserDisplayName(userWithNoProfile)).not.toThrow();
  expect(getUserDisplayName(userWithNoProfile)).toBe('Anonymous');
});
```

### Step 6 — Verify the Fix

Run the full test suite in the affected area:

```bash
npm run test -- --reporter=verbose
npm run type-check
npm run lint
```

All checks must pass before presenting the fix.

### Step 7 — Report

Summarize the fix:

```
## Fix Applied

**Issue:** [Title or description]
**Root cause:** [One sentence]
**Fix:** [What was changed and why]
**Regression test added:** [Yes/No — file path]
**Files changed:** [List]

**Suggested commit message:**
fix: [short description of what was fixed]

[More detailed explanation for the commit body]

Closes #[issue number if applicable]
```
