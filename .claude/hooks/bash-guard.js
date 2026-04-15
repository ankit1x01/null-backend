#!/usr/bin/env node

/**
 * bash-guard.js
 *
 * Claude Code PreToolUse hook — runs before every Bash tool call.
 *
 * Blocks destructive or dangerous shell commands that could cause data loss,
 * break the deployment pipeline, or expose secrets. This acts as a safety
 * net even when Claude is operating autonomously.
 *
 * Input:  JSON on stdin  { tool_name: "Bash", tool_input: { command: string } }
 * Output: JSON on stdout { decision: 'allow' | 'block', reason?: string }
 */

'use strict';

const path = require('path');
const fs = require('fs');

const PROJECT_ROOT = process.cwd();
const LOG_FILE = path.join(PROJECT_ROOT, '.claude', 'hooks.log');

// ─── Dangerous patterns ───────────────────────────────────────────────────────

const BLOCKED_PATTERNS = [
  // Destructive git operations
  { pattern: /git\s+push\s+.*--force/, reason: 'Force push is blocked — can overwrite upstream history.' },
  { pattern: /git\s+reset\s+--hard/, reason: 'Hard reset is blocked — confirm with user first, it discards working changes.' },
  { pattern: /git\s+clean\s+-[a-z]*f/, reason: 'git clean -f is blocked — it permanently deletes untracked files.' },
  { pattern: /git\s+branch\s+-D\s+main/, reason: 'Deleting main branch is blocked.' },
  { pattern: /git\s+push\s+.*main/, reason: 'Direct push to main is blocked — use a PR.' },

  // Dangerous file operations
  { pattern: /rm\s+-rf?\s+[^/]/, reason: 'Recursive delete is blocked — confirm the target with the user first.' },
  { pattern: /rm\s+-rf\s+\//, reason: 'Deleting from root is blocked.' },
  { pattern: />\s*\.env$/, reason: 'Overwriting .env is blocked — it may contain secrets.' },

  // Production database operations
  { pattern: /DROP\s+TABLE/i, reason: 'DROP TABLE via CLI is blocked — use a reviewed migration.' },
  { pattern: /TRUNCATE\s+/i, reason: 'TRUNCATE via CLI is blocked — confirm with user first.' },
  { pattern: /mysql\s+.*-p\s*\S+\s+new_null/, reason: 'Direct mysql commands on production DB are blocked.' },

  // Package management (requires human decision)
  { pattern: /npm\s+install\s+\S+/, reason: 'Installing new packages requires user confirmation — new dependencies affect bundle size, security, and lock file.' },
  { pattern: /npm\s+uninstall\s+\S+/, reason: 'Removing packages requires user confirmation.' },

  // Secret exposure
  { pattern: /cat\s+\.env/, reason: 'Reading .env is blocked — it may contain secrets that should not appear in logs.' },
  { pattern: /echo\s+\$[A-Z_]*SECRET/, reason: 'Echoing secret env vars is blocked.' },
  { pattern: /echo\s+\$[A-Z_]*KEY/, reason: 'Echoing API key env vars is blocked.' },
  { pattern: /echo\s+\$[A-Z_]*TOKEN/, reason: 'Echoing token env vars is blocked.' },

  // Process management
  { pattern: /kill\s+-9\s+1$/, reason: 'Killing PID 1 is blocked.' },
  { pattern: /pkill\s+-f\s+node/, reason: 'Killing all node processes requires confirmation — could kill the dev server.' },
];

// ─── Logged-but-allowed patterns (warn without blocking) ─────────────────────

const WARN_PATTERNS = [
  { pattern: /git\s+push/, reason: 'git push detected — ensure this is intentional.' },
  { pattern: /npm\s+run\s+db:seed/, reason: 'Database seed detected — this modifies data.' },
  { pattern: /curl\s+/, reason: 'Network request detected.' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function log(level, message, meta = {}) {
  try {
    fs.appendFileSync(
      LOG_FILE,
      JSON.stringify({ timestamp: new Date().toISOString(), level, hook: 'bash-guard', message, ...meta }) + '\n'
    );
  } catch { /* non-fatal */ }
}

function allow() {
  process.stdout.write(JSON.stringify({ decision: 'allow' }));
  process.exit(0);
}

function block(reason) {
  process.stdout.write(JSON.stringify({ decision: 'block', reason }));
  process.exit(0);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  let raw = '';
  try {
    await new Promise((resolve, reject) => {
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', chunk => { raw += chunk; });
      process.stdin.on('end', resolve);
      process.stdin.on('error', reject);
    });
  } catch { allow(); }

  let hookData;
  try { hookData = JSON.parse(raw); }
  catch { allow(); }

  const command = hookData?.tool_input?.command ?? '';

  if (!command) { allow(); }

  // Check blocked patterns
  for (const { pattern, reason } of BLOCKED_PATTERNS) {
    if (pattern.test(command)) {
      log('warn', 'Bash command blocked', { command, reason });
      block(`Blocked: ${reason}\n\nCommand: ${command}\n\nAsk the user to run this manually if it is truly needed.`);
    }
  }

  // Log warnings (non-blocking)
  for (const { pattern, reason } of WARN_PATTERNS) {
    if (pattern.test(command)) {
      log('info', 'Bash command allowed with warning', { command, reason });
    }
  }

  allow();
}

main().catch(() => allow());
