# /refactor — Safe Refactor Workflow

Structured approach to refactoring that ensures correctness before and after changes.
Refactoring means changing structure without changing behavior — this command enforces that.

---

## Usage

```
/refactor src/lib/auth/session.ts       # Refactor a specific file
/refactor src/components/UserCard       # Refactor a component
/refactor --extract "validation logic"  # Extract a specific piece into a helper
/refactor --rename OldName NewName      # Rename with all call sites updated
```

---

## Refactor Process

### Step 1 — Establish a Baseline

Before touching anything:

```bash
# Run tests to confirm they pass NOW
npm run test -- --reporter=verbose
npm run type-check
```

If tests fail before you start, stop:
> "Tests are failing before the refactor. Fix existing failures first so we have
> a clean baseline to verify the refactor doesn't break anything."

### Step 2 — Read Everything Relevant

1. Read the target file completely
2. Find all usages with grep:
   ```bash
   # Find all import sites
   grep -r "from.*target-module" src/ --include="*.ts" --include="*.tsx"
   # Find all usage call sites
   grep -r "functionName\|ClassName" src/ --include="*.ts" --include="*.tsx"
   ```
3. Read the test file for the target
4. Identify all consumers that may be affected

### Step 3 — Plan the Refactor

Present the plan before writing a single line of code:

```
## Refactor Plan

**Goal:** [What structural improvement we're making]
**Behavior change:** None — this is a pure refactor
**Files to change:** [List]
**Files that may be affected:** [List of consumers]

**Steps:**
1. [Step 1 description]
2. [Step 2 description]
...

**Risks:**
- [Any risk, e.g., "if X is imported dynamically anywhere, grep may not catch it"]

Proceed?
```

Do not start until the user confirms the plan.

### Step 4 — Apply Changes Incrementally

Apply one logical step at a time. After each step:

```bash
npm run type-check
```

If TypeScript errors appear → fix them before the next step.
Do not accumulate multiple broken states.

### Step 5 — Common Refactor Patterns

#### Extract Function
```typescript
// Before: 60-line function doing too much
export function processUserData(user: User) {
  // ... 20 lines of validation ...
  // ... 20 lines of transformation ...
  // ... 20 lines of formatting ...
}

// After: clear single-responsibility functions
export function processUserData(user: User) {
  const validated = validateUserData(user);
  const transformed = transformUserData(validated);
  return formatUserData(transformed);
}
```

#### Rename with All Call Sites
1. Use grep to find ALL usages
2. Rename the definition
3. Update every import/call site
4. Run type-check — TypeScript will catch any misses
5. Never leave the old name as an alias (no backwards-compat stubs)

#### Extract Module
1. Create the new file
2. Move the code (cut, don't copy)
3. Update the original file to import from new location
4. Update all consumers
5. Delete any now-empty files

### Step 6 — Verify Behavior Is Unchanged

```bash
# Full test suite must pass with the same results as baseline
npm run test -- --reporter=verbose
npm run type-check
npm run lint
```

If any test that was passing before now fails:
> "Test regression detected — the refactor changed behavior. Investigating..."

Find the root cause before declaring the refactor complete.

### Step 7 — Report

```
## Refactor Complete

**Goal achieved:** [Description]
**Files changed:** [List with brief description of change]
**Tests:** All X passing (same as baseline)
**TypeScript:** PASS
**Behavior change:** None

Suggested commit: refactor: [short description]
```
