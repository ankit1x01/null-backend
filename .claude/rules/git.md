# Rule: Git & PR Conventions

These rules apply to all git operations Claude performs or suggests.

---

## Branch Naming

```
feat/short-description          # New feature
fix/short-description           # Bug fix
chore/short-description         # Maintenance, deps, tooling
docs/short-description          # Documentation only
refactor/short-description      # Code restructure, no behavior change
test/short-description          # Tests only
hotfix/short-description        # Critical production fix
```

Rules:
- Lowercase only
- Hyphens, not underscores or spaces
- Max 50 characters total
- Descriptive enough to understand from the branch list

---

## Commit Messages (Conventional Commits)

```
<type>(<optional scope>): <short description>

<optional body — explain WHY, not WHAT>

<optional footer — breaking changes, issue references>
```

**Types:**
- `feat` — new feature
- `fix` — bug fix
- `chore` — maintenance (deps, config, tooling)
- `docs` — documentation
- `refactor` — structural change, no behavior change
- `test` — tests only
- `perf` — performance improvement
- `ci` — CI/CD changes

**Rules:**
- Subject line: imperative mood ("add" not "added"), max 72 chars, no period
- Body: explain WHY the change was needed, not what the diff shows
- Reference issues: `Closes #42` or `Fixes #42` in the footer

```
# Good
feat(auth): add email verification on signup

Users were able to sign up with addresses they don't own, causing
support issues. This adds a verification email before the account
is activated.

Closes #87

# Bad
fixed stuff
updated code to work better
WIP
```

---

## PR Size

- Aim for PRs under 400 lines changed
- A single PR should accomplish one logical goal
- If a PR is getting large, split it: infrastructure PR first, feature PR second
- Never bundle a refactor with a feature in the same PR — impossible to review

---

## PR Checklist (Claude generates this for every PR)

```markdown
## Changes
[Short description of what changed and why]

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated (for API changes)
- [ ] Manual testing performed
- [ ] No skipped tests

## Checklist
- [ ] `npm test` passes (Jest integration tests)
- [ ] Manual testing done against dev DB (`new_null`) with TESTING_GUIDE.md credentials
- [ ] No secrets or .env values in code
- [ ] `.env.example` updated if new env vars added
- [ ] Swagger docs updated if API contract changed (add/update `docs/*.yaml` in module)
```

---

## What Claude Must Never Do Without Asking

- `git push` — always confirm
- `git push --force` — never, without explicit instruction
- `git reset --hard` — always confirm, explain what will be lost
- `git rebase` — always confirm the target branch
- Delete a branch — always confirm
- Amend a commit that's already been pushed — warn about force-push requirement
