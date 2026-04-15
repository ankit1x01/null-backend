# /explain — Deep Code Explanation

Produce a clear, thorough explanation of any file, module, or concept in the codebase.
Useful for onboarding, code archaeology, and understanding unfamiliar areas.

---

## Usage

```
/explain src/lib/auth/index.ts          # Explain a specific file
/explain src/app/api/users              # Explain all files in a directory
/explain "how authentication works"    # Explain a concept end-to-end
/explain "the request lifecycle"       # Trace a request from browser to DB
/explain --for-junior                  # More detail, less assumed knowledge
/explain --for-senior                  # Concise, architectural focus
```

---

## Explanation Process

### Step 1 — Read Everything Relevant

Before explaining anything, read:
1. The target file(s) completely
2. Types used by the file (`src/types/`)
3. Files it imports from
4. Files that import it (find with grep)
5. Its test file (tests document intended behavior)

```bash
# Find all files that import the target
grep -r "from.*target-module\|require.*target-module" src/ --include="*.ts" --include="*.tsx"
```

### Step 2 — Structure the Explanation

Produce a layered explanation that builds from top-level purpose down to details:

#### Level 1 — Purpose (1 paragraph)
What does this code do? What problem does it solve?
Write this as if explaining to someone who has never seen the file.

#### Level 2 — Architecture
How does it fit into the larger system?
- What calls this? (inputs/triggers)
- What does this call? (dependencies)
- What data flows through it?

Draw a simple ASCII flow diagram for complex modules:
```
Browser request
  → Next.js middleware (auth check)
    → Route Handler (rate limit → auth → validate → query)
      → src/lib/db/ (Prisma → PostgreSQL)
        ← typed result
      ← JSON response
```

#### Level 3 — Key Decisions
Why is the code written this way and not another way?
Reference ADRs or CLAUDE.md rules where relevant.

#### Level 4 — Line-by-Line Walkthrough
For the most important or complex parts, walk through the code:
```typescript
// auth() returns the session from the database — it's async because
// it needs to hit the session store, not just decode a JWT
const session = await auth();

// We check for null explicitly because TypeScript doesn't know if the
// request is authenticated — auth() returns null for anonymous requests
if (!session) throw new ApiError(401, 'Unauthorized');
```

#### Level 5 — Common Pitfalls
What are the easy mistakes to make with this code?
What have past engineers gotten wrong?

#### Level 6 — How to Extend It
If someone needs to add to this module, what do they need to know?
What's the right pattern to follow?

### Step 3 — Tailor to Audience

**--for-junior flag:**
- Define technical terms on first use
- Explain the "why" behind every pattern
- Include links to relevant docs (Next.js, Prisma, etc.)
- More examples

**--for-senior flag:**
- Skip basics, focus on non-obvious decisions
- Highlight architectural trade-offs
- Reference what differs from common alternatives
- Concise — 1/3 the length
