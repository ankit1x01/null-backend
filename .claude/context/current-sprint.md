# Current Sprint

> Update this file at the start of each sprint. Claude reads it at session startup
> to understand what's actively being worked on and avoid conflicting changes.

---

## Sprint Goal

Testing all API endpoints against the dev database (`new_null`) and fixing failures.

## Active Work Items

| Item | Status | Notes |
|------|--------|-------|
| API endpoint testing | In progress | Using TESTING_GUIDE.md credentials |
| Fix failing integration tests | Not started | See known-issues.md |
| Validate response shapes match TESTING_GUIDE | Not started | — |

## Off-Limits Areas

- `src/shared/models/` — shared models affect all modules; check before editing
- `.env` — do not modify without explicit instruction

## Known Blockers

- Server must be running (`npm run dev`) before testing endpoints manually
- Test DB (`swachalit_test`) must be seeded before running Jest tests

## Notes

- API_ISSUES.md report (status 0 failures) was generated when server was not running — not actual bugs
- `SKIP_ENCRYPTION=true` is set in `.env` — dev responses are plain JSON (not encrypted)
