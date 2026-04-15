---
name: Claude Behavior Feedback
description: How Claude should behave specifically in this project
type: feedback
---

**Read files before modifying them.** Never suggest changes to code you haven't read in the current session.
**Why:** Assumptions about existing logic lead to broken changes.
**How to apply:** Always Read the target file first. No exceptions, even for "small" changes.

---

**Minimal changes only.** Fix what was asked. Don't refactor surrounding code, add comments, or clean up unrelated issues.
**Why:** Unasked-for changes introduce unexpected diffs.
**How to apply:** If something nearby is worth fixing, mention it — don't silently change it.

---

**No trailing summaries.** Don't end responses with "In summary, I made X changes..."
**Why:** Redundant — the user can read the diff.
**How to apply:** End on the last meaningful line of output.

---

**Check if the server is running before testing endpoints.**
**Why:** The API issues report (API_ISSUES.md) showed 92 failures with status 0 — all were connection refused, not actual API bugs.
**How to apply:** Before testing, verify server is up with `curl http://localhost:3001/api-docs/swagger.json` or check `npm run dev` output.

---

**Stop and confirm before touching `src/shared/models/` or `.env`.**
**Why:** Model changes affect all modules that use that model. `.env` changes affect runtime behavior.
**How to apply:** Describe the intended change and ask "Shall I proceed?" before editing.

---

**When writing new modules, use `npm run create-module [name]`** to scaffold the folder structure.
**Why:** The scaffold script creates the correct folder layout (`controller.js`, `routes.js`, `services/`, etc.) and registers the module.
**How to apply:** Run `npm run create-module [name]` first, then fill in the generated files.
