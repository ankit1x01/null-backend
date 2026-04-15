# /review — Code Review Workflow

Perform a thorough, structured code review of the current working changes or a specified
file/directory. This command follows the team's review standards defined in CLAUDE.md.

---

## Usage

```
/review                          # Review all staged/unstaged changes
/review src/components/UserCard  # Review a specific file or directory
/review --security               # Security-focused review only
/review --performance            # Performance-focused review only
```

---

## Review Process

When this command is invoked, execute the following steps in order:

### Step 1 — Gather Context

1. Run `git diff HEAD` to see all current changes
2. If a path was specified, read those files directly
3. Read relevant test files alongside the implementation
4. Check `CLAUDE.md` for any rules applicable to the changed files

### Step 2 — Static Analysis

Run these checks and report any failures:

```bash
npm run lint
npm run type-check
```

If either fails, list the specific errors before proceeding with the narrative review.

### Step 3 — Review Dimensions

Evaluate the code across these dimensions. For each, provide a **rating** (Pass / Warn / Fail)
and specific line-level feedback where issues are found.

#### 3a. Correctness
- Does the logic match the stated intent?
- Are edge cases handled (null, empty, boundary values)?
- Are async operations properly awaited and error-handled?
- Are all code paths reachable and correct?

#### 3b. TypeScript Quality
- No use of `any` — flag all instances
- Proper use of generics where applicable
- Return types explicitly declared on exported functions
- No unnecessary type assertions (`as`)

#### 3c. Security (see `.claude/rules/api-conventions.md`)
- All API inputs validated with Zod before use
- No secrets, tokens, or credentials in code
- No `dangerouslySetInnerHTML` without sanitization
- Authentication checked on all protected routes
- No SQL injection surface (no raw string queries)

#### 3d. Performance
- No unnecessary re-renders (missing `useMemo`, `useCallback`, `memo`)
- No N+1 database query patterns
- Large data sets paginated, not fetched in full
- Images use `next/image` with proper sizing
- No blocking operations on the main thread

#### 3e. Code Style & Readability
- Follows naming conventions in CLAUDE.md
- Functions under 50 lines
- No dead code, commented-out blocks, or debug `console.log`
- Complex logic has explanatory comments

#### 3f. Test Coverage
- New functions have corresponding unit tests
- New API routes have integration tests
- Critical user paths have or are covered by E2E tests
- No skipped tests (`it.skip`, `test.skip`, `xit`)

### Step 4 — Summary Report

Output a structured summary:

```
## Code Review Summary

**Files reviewed:** [list]
**Overall rating:** Pass | Needs Changes | Blocked

### Issues Found

| Severity | File | Line | Issue |
|----------|------|------|-------|
| Critical | ...  | ...  | ...   |
| Warning  | ...  | ...  | ...   |
| Info     | ...  | ...  | ...   |

### What's Done Well
[2-3 positive observations]

### Required Changes Before Merge
[Numbered list of blocking items, if any]

### Suggestions (Non-blocking)
[Numbered list of optional improvements]
```

### Step 5 — Offer Fixes

After presenting the report, ask:
> "Would you like me to fix any of the critical or warning issues listed above?"

If the user says yes, apply fixes one at a time, explaining each change.
