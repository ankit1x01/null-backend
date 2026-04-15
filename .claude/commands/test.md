# /test — Test Runner Workflow

Run tests with meaningful output. Smarter than raw `npm run test` —
targets the right scope, surfaces failures clearly, and offers to fix them.

---

## Usage

```
/test                          # Run all tests with coverage summary
/test src/lib/formatCurrency   # Run tests for a specific file
/test --coverage               # Full coverage report with uncovered lines
/test --e2e                    # Run Playwright end-to-end tests
/test --watch src/components   # Watch mode for a directory
/test --failed                 # Re-run only previously failing tests
```

---

## Test Execution Process

### Step 1 — Scope Detection

Determine what to test based on arguments or context:

- If a file path is given → run that file's test + its direct dependencies' tests
- If a directory is given → run all tests in that directory
- If no argument → run the full suite

```bash
# Single file
npx vitest run "src/lib/formatCurrency.test.ts" --reporter=verbose

# Directory
npx vitest run "src/components" --reporter=verbose

# Full suite with coverage
npx vitest run --coverage --reporter=verbose
```

### Step 2 — Parse Results

From the test output, extract:
- Total: passed / failed / skipped
- Duration
- Coverage percentages (lines, functions, branches)
- Specific failing test names and error messages

### Step 3 — Present Results

**All passing:**
```
Tests: 247 passed, 0 failed (4.2s)
Coverage: Lines 86% | Functions 91% | Branches 78%
All thresholds met (80% minimum).
```

**Failures present:**
```
Tests: 244 passed, 3 FAILED (4.8s)

FAILED: src/lib/auth/session.test.ts
  ✗ should invalidate session on logout
    Expected: null
    Received: { userId: '123', ... }
    at session.test.ts:45

FAILED: src/components/UserCard.test.tsx
  ✗ renders fallback when profile is null
    Unable to find text: 'Anonymous'
    at UserCard.test.tsx:32
```

### Step 4 — Coverage Gap Analysis

When coverage is below threshold, identify exactly which lines are uncovered:

```
Coverage below threshold in:
  src/lib/api/rate-limit.ts — 64% lines (threshold: 80%)
  Uncovered lines: 45-67 (Redis fallback path), 89-91 (error handler)

Suggested: Add tests for:
  - Rate limit exceeded scenario (line 45)
  - Concurrent request handling (line 67)
```

### Step 5 — Offer Fixes

After presenting failures:
> "3 tests are failing. Would you like me to:
> a) Fix the implementation to match the test expectations
> b) Fix the tests if they're testing the wrong behavior
> c) Show me both the test and implementation to decide"

Always clarify which is wrong (test or implementation) before making changes.

### Step 6 — E2E Mode (--e2e flag)

```bash
npx playwright test --reporter=list
```

For E2E failures, also capture:
- Screenshot path (Playwright auto-saves on failure)
- Network requests that failed
- Console errors during the test run

Report E2E failures with the trace file location for debugging.
