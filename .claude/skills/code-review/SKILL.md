# Skill: Code Review

**Trigger:** When the user asks for a code review, mentions "review my changes", "check this
code", "look at this PR", or invokes `/review`.

**Purpose:** Perform a thorough, multi-dimensional code review that mirrors what a
senior engineer would catch, structured as actionable feedback rather than a checklist.

---

## Skill Behavior

This skill activates automatically when review intent is detected. It executes
the following analysis pipeline and presents findings in a structured report.

**Agent parallelization:** For any diff touching `src/app/api/` or `src/lib/auth/`,
this skill spawns two agents simultaneously:
- `code-reviewer` — correctness, TypeScript quality, performance, maintainability
- `security-auditor` — OWASP controls, auth bypass, injection, secret exposure

Both agents receive the same diff. Their outputs are merged into a single report
with security issues surfaced first.

---

## Analysis Pipeline

### Phase 0 — Route Security Check (before anything else)

Scan the diff for files touching security-sensitive paths:
```bash
git diff HEAD -- 'src/app/api/**' 'src/lib/auth/**' 'src/middleware.ts'
```

If any security-sensitive files are changed:
> "This diff touches auth/API code. Running code-reviewer and security-auditor in parallel."

Spawn both agents. Merge their reports. Security findings always appear before code quality findings.

### Phase 1 — Scope Collection

Determine what to review:

```bash
# If reviewing staged changes
git diff --cached

# If reviewing unstaged changes
git diff HEAD

# If reviewing a specific file
# [read the file directly]

# If reviewing a PR (via GitHub MCP)
# [fetch PR diff via mcp__github__get_pull_request]
```

Also read:
- Related test files
- Type definition files affected by the changes
- `CLAUDE.md` for project-specific rules

### Phase 2 — Automated Checks

Run tools and capture output:

```bash
npm run lint 2>&1
npm run type-check 2>&1
```

Parse failures and include them in the report with file:line references.

### Phase 3 — Deep Analysis

For each changed file, analyze:

#### Correctness Analysis
- Trace every execution path through changed functions
- Identify conditions where behavior is undefined or incorrect
- Check error handling: are all thrown exceptions caught or propagated intentionally?
- Verify async/await is used correctly — no floating promises

#### Type Safety Analysis
- Count `any` usages — each must be justified
- Check for type assertions (`as Type`) — verify they are safe
- Verify generic constraints are appropriate
- Ensure discriminated unions cover all cases

#### Security Analysis (OWASP Top 10 focus)
- A01 Broken Access Control — authorization on all mutations
- A02 Cryptographic Failures — no plaintext secrets, proper hashing
- A03 Injection — no string interpolation in queries
- A05 Security Misconfiguration — no debug flags in non-dev code
- A07 Identification/Auth Failures — proper session validation
- Validate all external inputs regardless of source

#### Performance Analysis
- React: unnecessary renders, missing memoization
- Database: N+1 patterns, missing indexes on filtered columns
- Network: over-fetching (selecting more fields than needed)
- Memory: large objects held in state, closures retaining references

#### Maintainability Analysis
- Cyclomatic complexity — functions with >10 decision points flagged
- Magic numbers and strings without named constants
- Deep nesting (>3 levels) — suggest extraction
- Single Responsibility — functions doing too many things

### Phase 4 — Report Generation

Structure the output as:

```markdown
## Code Review Report

**Scope:** [files reviewed]
**Automated checks:** Lint [Pass/Fail] | Types [Pass/Fail]
**Overall verdict:** Approved / Needs Changes / Blocked

---

### Critical Issues (must fix before merge)

**[SECURITY]** `src/app/api/users/route.ts:42`
Missing authorization check — any authenticated user can delete any user.
Add: `if (session.user.id !== params.id && session.user.role !== 'admin') throw new ApiError(403, 'Forbidden')`

---

### Warnings (should fix, non-blocking)

**[PERFORMANCE]** `src/components/UserList.tsx:88`
`users.filter()` runs on every render. Move inside `useMemo(() => ..., [users])`.

---

### Suggestions (optional improvements)

**[READABILITY]** `src/lib/auth/session.ts:15`
Consider extracting the 40-line token validation block into `validateSessionToken()`.

---

### Positive Observations

- Error handling in `createUser` is thorough and consistent with the pattern in CLAUDE.md
- Zod schema is well-structured with descriptive error messages

---

### Summary

X critical, Y warnings, Z suggestions.
[One sentence on overall code quality and readiness.]
```

### Phase 5 — Fix Offer

After the report, prompt:
> "I found [N] critical issues. Would you like me to apply fixes now?"

If yes, apply fixes sequentially, explaining each change. Re-run lint and type-check after fixes.
