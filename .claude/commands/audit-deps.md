# /audit-deps — Dependency Security & Health Audit

Full audit of npm dependencies: security vulnerabilities, outdated packages,
license compliance, and bundle impact. Run before any production deploy.

---

## Usage

```
/audit-deps              # Full audit
/audit-deps --security   # Security vulnerabilities only
/audit-deps --licenses   # License compliance check
/audit-deps --outdated   # Show outdated packages
```

---

## Audit Process

### Step 1 — Security Vulnerabilities

```bash
npm audit --json 2>/dev/null | node -e "
  const data = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
  const v = data.vulnerabilities ?? {};
  const counts = { critical:0, high:0, moderate:0, low:0 };
  Object.values(v).forEach(p => counts[p.severity] = (counts[p.severity]||0) + 1);
  console.log(JSON.stringify({ counts, total: data.metadata?.vulnerabilities }));
"
```

Report format per vulnerability:
```
[CRITICAL] package-name@1.2.3
  CVE: CVE-2024-XXXX
  Description: [what the vulnerability is]
  Affects: [direct dep or transitive via which package]
  Fix: npm install package-name@1.3.0
  Workaround: [if no fix available]
```

Blocking thresholds:
- **Critical / High** → blocks deployment
- **Moderate** → warning, non-blocking
- **Low** → informational

### Step 2 — Outdated Packages

```bash
npm outdated --json 2>/dev/null
```

Classify each outdated package:
- **Patch** (1.0.x → 1.0.y): usually safe to update, bug fixes only
- **Minor** (1.x.0 → 1.y.0): safe for most packages, check changelog
- **Major** (x.0.0 → y.0.0): breaking changes possible, read migration guide

Present as a table:
```
Package          Current  Wanted   Latest  Type    Risk
next             14.1.0   14.1.4   15.0.0  direct  Major (read migration guide)
typescript       5.3.0    5.3.3    5.3.3   direct  Patch (safe)
@prisma/client   5.8.0    5.10.0   5.10.0  direct  Minor (check changelog)
```

### Step 3 — License Compliance

```bash
npx license-checker --json --production 2>/dev/null | node -e "
  const pkgs = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
  const byLicense = {};
  Object.entries(pkgs).forEach(([name, info]) => {
    const lic = info.licenses;
    byLicense[lic] = byLicense[lic] || [];
    byLicense[lic].push(name);
  });
  console.log(JSON.stringify(byLicense, null, 2));
"
```

Flag licenses that may require action:
- `MIT`, `Apache-2.0`, `BSD-*`, `ISC` → ✓ Permissive, safe for commercial use
- `GPL-2.0`, `GPL-3.0`, `AGPL-*` → ⚠ Copyleft — may require source disclosure
- `UNLICENSED`, `UNKNOWN` → ⚠ Investigate — no license = no permission to use

### Step 4 — Bundle Impact Check

For direct dependencies, check their minified+gzip size:

```bash
# Check package sizes via bundlephobia (requires web search MCP or manual)
# Focus on the 5 largest packages in package.json
```

Flag packages where:
- A smaller alternative exists (e.g., `date-fns` vs `moment` — 80% smaller)
- The package is only used for one utility function (tree-shake or inline instead)
- The package has a Next.js-specific lighter alternative

### Step 5 — Audit Report

```markdown
## Dependency Audit Report

**Date:** [ISO timestamp]
**Total packages:** [n direct, n transitive]

---

### Security Summary

| Severity | Count | Action |
|----------|-------|--------|
| Critical | 0     | —      |
| High     | 1     | Fix required |
| Moderate | 3     | Review |
| Low      | 7     | Informational |

**Overall security status:** BLOCKED / PASS

---

### Vulnerabilities (High+)
[Details per vulnerability]

---

### Outdated Packages

[Table of outdated packages with type and risk]

**Recommended safe updates:**
```bash
npm install [package@version] [package@version]
```

---

### License Issues
[Any copyleft or unknown licenses]

---

### Bundle Opportunities
[Packages that could be replaced with lighter alternatives]
```

### Step 6 — Offer to Fix

For security vulnerabilities with available fixes:
> "I found [N] high/critical vulnerabilities with available fixes.
> Would you like me to run `npm audit fix` for the safe auto-fixes?
> Note: This will not apply breaking changes."

Never run `npm audit fix --force` without explicit instruction — it can break the app.
