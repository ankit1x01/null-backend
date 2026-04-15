# /migrate — Database Migration Workflow

Safe, reviewed migration workflow for Prisma schema changes.
Never runs migrations blindly — always shows the SQL diff and risk assessment first.

---

## Usage

```
/migrate                     # Review pending migrations and offer to apply
/migrate --create "add_user_settings"  # Create a new migration from schema changes
/migrate --status            # Show migration history and pending state
/migrate --rollback          # Show rollback plan for the last migration
```

---

## Migration Process

### Step 1 — Check Current State

```bash
npx prisma migrate status
```

Parse and display:
- Applied migrations (count + last applied)
- Pending migrations (if any)
- Schema drift warnings

### Step 2 — Show the SQL Diff

For any pending or new migration, generate and display the exact SQL:

```bash
npx prisma migrate diff \
  --from-schema-datasource prisma/schema.prisma \
  --to-schema-datamodel prisma/schema.prisma \
  --script
```

Present the SQL clearly so the user can review every statement.

### Step 3 — Risk Assessment

Classify every SQL statement in the diff:

| Statement Type                  | Risk Level | Notes |
|---------------------------------|-----------|-------|
| `CREATE TABLE`                  | Safe      | Additive, fully reversible |
| `ALTER TABLE ... ADD COLUMN`    | Safe      | Additive (with nullable/default) |
| `CREATE INDEX`                  | Safe      | Additive, can be dropped |
| `ALTER TABLE ... ADD COLUMN NOT NULL` | Risky | Requires default or backfill |
| `ALTER TABLE ... DROP COLUMN`   | Destructive | Data loss — cannot undo |
| `DROP TABLE`                    | Destructive | Data loss — cannot undo |
| `ALTER TABLE ... ALTER COLUMN`  | Risky | Type changes can fail on existing data |
| `RENAME TABLE / RENAME COLUMN`  | Risky | Breaks existing code referencing old name |

For **Destructive** operations:
> "This migration contains a destructive operation that will permanently delete data.
> A backup should be taken before applying. Do you want to proceed?"

Never proceed with destructive migrations without explicit confirmation.

### Step 4 — Backfill Check

If a new NOT NULL column is added without a default:
```
WARN: Adding a NOT NULL column without a default will fail if the table has existing rows.
Consider:
  1. Adding a DEFAULT value in the migration
  2. Adding the column as nullable first, backfilling, then constraining
  3. Running this migration only on an empty table (dev/test only)
```

### Step 5 — Locking Assessment

For large tables (if table size is known), warn about lock times:
```
NOTE: ALTER TABLE operations on large tables acquire a full table lock in PostgreSQL.
For tables with > 100k rows, consider using pg_repack or a zero-downtime migration pattern.
```

### Step 6 — Create or Apply

**Creating a new migration (--create flag):**
```bash
npx prisma migrate dev --name <migration-name> --create-only
```
This creates the SQL file for review but does NOT apply it. Show the generated file.

**Applying in development:**
```bash
npx prisma migrate dev
```
Only run after the user confirms the diff and risk assessment.

**NEVER run in production:**
```bash
# This is a production deployment step — handled by CI/CD
npx prisma migrate deploy
```
Flag this if the user asks. Production migrations run via the deployment pipeline, not manually.

### Step 7 — Post-Migration

After applying:
```bash
npx prisma generate    # Regenerate the Prisma client with new types
npm run type-check     # Verify nothing broke
```

Report:
```
Migration applied: 20240315143022_add_user_settings
Prisma client regenerated.
TypeScript: PASS

Rollback SQL (save this):
  DROP TABLE IF EXISTS "user_settings";
  -- (generated reverse SQL)
```
