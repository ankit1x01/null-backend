# Known Issues

> Ongoing bugs, limitations, and technical debt Claude should be aware of.
> Remove entries when resolved. Add entries when discovered.

---

## Active Status

The API_ISSUES.md report (2026-03-09) showed 92 failures — all with status `0` (connection refused).
This means the server was not running during testing, not that the endpoints are broken.

---

## Technical Debt

| Area | Issue | Why deferred |
|------|-------|-------------|
| Rate limiting | In-memory rate limiter (not Redis) | Single-instance dev; swap when scaling |
| Email | SMTP credentials not configured in `.env` | Dev only needs DB-level testing |
| Encryption | `SKIP_ENCRYPTION=true` in dev | Simplifies local testing; must be false in production |
| OAuth | GitHub/Google OAuth credentials empty in `.env` | Not needed for core API testing |

---

## Known Limitations

- **Swagger docs** at `/api-docs` may be slow to load — Swagger spec is generated on startup
- **File uploads** depend on `UPLOAD_DIR=./uploads` existing — directory may not exist on fresh clone
- **Calendar endpoints** (`/api/calendar/*.ics`) require Google Calendar API key to be set
- **Slack integration** requires `SLACK_VERIFICATION_TOKEN` to be set

---

## Do Not Touch

- `src/shared/models/` — stable, used by all modules; changes have wide blast radius
- `src/shared/middlewares/response.middleware.js` — changing response shape breaks all tests
- `src/shared/middlewares/encrypt.middleware.js` — complex encryption chain; only touch with explicit user request
