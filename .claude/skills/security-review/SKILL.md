# Skill: Security Review

**Trigger:** When the user mentions "security review", "security audit", "check for vulnerabilities",
"OWASP", or invokes `/review --security`. Also activates automatically when reviewing API routes,
authentication code, or files in `src/lib/auth/` or `src/app/api/`.

**Purpose:** Perform a focused security audit of code changes, identifying vulnerabilities
across the OWASP Top 10 and project-specific security requirements defined in CLAUDE.md.

---

## Skill Behavior

This skill runs a security-focused analysis pipeline. It is more targeted than a full
code review — it zeroes in on attack surfaces, trust boundaries, and data flow.

---

## Security Analysis Pipeline

### Phase 1 — Attack Surface Mapping

Before analyzing specific code, map the attack surface:

1. List all entry points in the changed code:
   - HTTP endpoints (Route Handlers)
   - Form submissions
   - WebSocket connections
   - Background job inputs
   - File uploads

2. Identify trust boundaries:
   - What is user-controlled input?
   - What comes from the database (semi-trusted)?
   - What is internal server-to-server?

3. Identify sensitive operations:
   - Authentication and session management
   - Authorization and permission checks
   - Data writes and mutations
   - File system operations
   - External API calls with credentials

### Phase 2 — OWASP Top 10 Checklist

Evaluate each applicable category:

#### A01 — Broken Access Control
```
□ Every endpoint verifies authentication before accessing data
□ Every mutation verifies the user owns/has permission for the resource
□ Admin-only routes check for admin role explicitly
□ No IDOR (Insecure Direct Object Reference) — user A cannot access user B's data
  by guessing an ID
□ Route parameters are validated against the authenticated user's accessible resources
```

Code pattern to look for (BAD):
```typescript
// Missing authorization — any authenticated user can delete any resource
export async function DELETE(req, { params }) {
  const session = await auth();
  if (!session) throw new ApiError(401, 'Unauthorized');
  // BUG: no check that session.user.id owns params.id
  await db.post.delete({ where: { id: params.id } });
}
```

#### A02 — Cryptographic Failures
```
□ Passwords are hashed with bcrypt/argon2 (min cost factor 10)
□ No MD5 or SHA1 for security-sensitive hashing
□ Session tokens are cryptographically random (min 128 bits)
□ Sensitive data at rest is encrypted if required by spec
□ TLS enforced — no HTTP endpoints in production config
□ JWT secrets are sufficiently long and stored as env vars
```

#### A03 — Injection
```
□ No raw SQL strings — Prisma ORM used exclusively
□ If $queryRaw is used, it uses template literals (parameterized), not string concat
□ No dynamic command execution (exec, spawn) with user input
□ HTML output: no dangerouslySetInnerHTML with unescaped user content
□ URL construction: user input encoded before use in URLs
```

Code pattern to look for (BAD):
```typescript
// SQL injection via string concatenation
const users = await db.$queryRaw(`SELECT * FROM users WHERE name = '${name}'`);

// CORRECT
const users = await db.$queryRaw`SELECT * FROM users WHERE name = ${name}`;
```

#### A05 — Security Misconfiguration
```
□ Debug mode disabled in production env
□ Error responses don't expose stack traces or internal paths
□ No default credentials in code or config files
□ CORS configured restrictively — not wildcard (*) in production
□ Security headers present: CSP, HSTS, X-Frame-Options
```

#### A06 — Vulnerable Components
```
□ No packages with known critical vulnerabilities (npm audit)
□ Dependencies are pinned to specific versions in package.json
□ No usage of deprecated or unmaintained packages for security functions
```

#### A07 — Identification and Auth Failures
```
□ Session invalidation on logout
□ Password reset tokens expire (max 15 minutes)
□ Brute force protection on login (rate limiting + lockout)
□ Re-authentication required for sensitive account changes
□ Session tokens not exposed in URLs or logs
```

#### A09 — Security Logging and Monitoring
```
□ Failed authentication attempts are logged
□ Access to sensitive resources is logged with user ID and timestamp
□ Logs do not contain sensitive data (passwords, tokens, PII)
□ Sentry/monitoring configured for production error tracking
```

### Phase 3 — Data Flow Analysis

Trace user-controlled data from entry to exit:

```
Input source → Validation → Processing → Storage/Output

For each piece of user input:
1. Where does it enter the system? (request body, query param, header)
2. Is it validated with Zod before first use?
3. Is it sanitized before rendering in HTML?
4. Is it parameterized before use in queries?
5. Is it logged anywhere in its raw form?
```

### Phase 4 — Secret Scanning

Scan for accidental secret exposure:

```bash
# Patterns to flag
grep -rn "sk-" src/          # OpenAI keys
grep -rn "ghp_" src/         # GitHub tokens
grep -rn "password\s*=" src/ # Hardcoded passwords
grep -rn "secret\s*=" src/   # Hardcoded secrets
grep -rn "api_key\s*=" src/  # Hardcoded API keys
```

### Phase 5 — Security Report

```markdown
## Security Review Report

**Scope:** [files reviewed]
**Risk Level:** Critical / High / Medium / Low / Clean

---

### Vulnerabilities Found

#### CRITICAL — Immediate fix required

**[A01 — Broken Access Control]** `src/app/api/posts/[id]/route.ts:34`
Any authenticated user can delete any post. No ownership check performed.

**Fix:**
```typescript
if (post.authorId !== session.user.id && session.user.role !== 'admin') {
  throw new ApiError(403, 'You do not have permission to delete this post');
}
```

---

#### HIGH — Fix before next release

**[A03 — Injection]** `src/lib/db/search.ts:18`
Search query uses string concatenation in $queryRaw. Use parameterized query.

---

### Security Checklist Results

| Category              | Status    | Notes |
|-----------------------|-----------|-------|
| Access Control        | Fail      | See critical issue above |
| Cryptographic Failures| Pass      | |
| Injection             | Warn      | See high issue above |
| Security Config       | Pass      | |
| Auth/Session          | Pass      | |
| Input Validation      | Pass      | Zod schemas present |

---

### What's Secure

[List 2-3 things done well for positive reinforcement]

---

### Recommended Follow-up Actions

1. [Specific hardening suggestion]
2. [Specific hardening suggestion]
```

### Phase 6 — Fix Offer

For critical and high issues, offer to apply fixes immediately.
Always explain the security implication of each fix, not just the code change.
