# /pr — Pull Request Description Generator

Generate a complete, well-structured PR description from the actual diff.
Follows the team's PR style from `.claude/rules/git.md`.

---

## Usage

```
/pr                        # Generate PR for all commits since branching from main
/pr --draft                # Generate as a draft PR
/pr --base staging         # Target staging instead of main
```

---

## Process

### Step 1 — Gather the Diff

```bash
# Get the base branch (default: main)
BASE="main"

# All commits on this branch not yet in base
git log ${BASE}..HEAD --oneline

# Full diff
git diff ${BASE}..HEAD

# Files changed
git diff ${BASE}..HEAD --name-status
```

Read ALL commits and ALL changed files before writing anything.

### Step 2 — Classify the Change

Determine the primary type from the diff:
- `feat` — new feature or capability added
- `fix` — bug fixed
- `refactor` — restructured without behavior change
- `chore` — deps, config, tooling
- `docs` — documentation only
- `perf` — measurable performance improvement
- `test` — tests added or changed

### Step 3 — Write the PR

Output a complete PR ready to paste into GitHub. Keep the title under 72 characters.

```markdown
## [type]: [short imperative description of what changed]

### What changed
<!--
  2-4 bullet points. Answer:
  - What does this PR add/change/fix?
  - Why was the change needed?
  - What was the approach?
-->
- [change 1]
- [change 2]

### Screenshots / Demo
<!--
  Delete this section if not a UI change.
  Otherwise: paste before/after screenshots or describe the UX change.
-->
N/A

### Testing
<!--
  How was this tested? What should the reviewer try?
-->
- [ ] Unit tests added/updated (`npm run test`)
- [ ] Integration tests updated (if API changes)
- [ ] Manually tested: [describe what you clicked/triggered]
- [ ] E2E tests cover this flow: [test file name]

### Checklist
- [ ] `npm run lint` passes
- [ ] `npm run type-check` passes
- [ ] `npm run test` passes with coverage ≥ 80%
- [ ] No secrets or credentials in code
- [ ] `.env.example` updated if new env vars added
- [ ] Docs updated if architecture changed
- [ ] `prisma/schema.prisma` changes have a migration

### Breaking changes
<!--
  Delete if none. Otherwise describe what breaks and the migration path.
-->
None

### Related issues
<!--
  Closes #[issue number]  — auto-closes on merge
  Refs #[issue number]    — links without closing
-->
```

### Step 4 — Create via GitHub MCP (if available)

If the GitHub MCP server is connected, offer to create the PR directly:

```
The PR description is ready. Would you like me to:
a) Create the PR on GitHub now (requires GitHub MCP)
b) Copy this to your clipboard
c) Just show me the description to paste manually
```

If creating via MCP, use the current branch as head and `main` as base.
Do NOT push the branch — confirm it's already pushed first.

### Step 5 — Checklist Reminder

Before creating the PR, verify:
```bash
npm run lint && npm run type-check && npm run test
```

If any fail, present the failures and ask:
> "These checks are failing. Fix them before creating the PR?"
