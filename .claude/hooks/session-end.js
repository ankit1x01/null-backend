#!/usr/bin/env node

/**
 * session-end.js
 *
 * Claude Code Stop hook — runs when the Claude session ends.
 *
 * Responsibilities:
 *  1. Summarize all files changed during the session
 *  2. Check for uncommitted changes and remind the user
 *  3. Rotate/archive the hooks.log if it's grown large
 *  4. Output a session summary to stdout (shown to user on exit)
 *
 * Input:  JSON on stdin  { session_id, total_turns, ... }
 * Output: plain text summary (shown to the user)
 */

'use strict';

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const PROJECT_ROOT = process.cwd();
const LOG_FILE = path.join(PROJECT_ROOT, '.claude', 'hooks.log');
const MAX_LOG_SIZE_BYTES = 1_000_000; // 1MB — rotate when exceeded

function run(cmd) {
  try {
    return execSync(cmd, { cwd: PROJECT_ROOT, stdio: 'pipe', timeout: 10_000 }).toString().trim();
  } catch {
    return '';
  }
}

async function main() {
  let raw = '';
  try {
    await new Promise((resolve, reject) => {
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', chunk => { raw += chunk; });
      process.stdin.on('end', resolve);
      process.stdin.on('error', reject);
    });
  } catch { process.exit(0); }

  // ── 1. Check for uncommitted changes ───────────────────────────────────────
  const gitStatus = run('git status --short');
  const hasChanges = gitStatus.length > 0;

  // ── 2. List files changed this session via git diff ────────────────────────
  const changedFiles = run('git diff --name-only HEAD').split('\n').filter(Boolean);
  const untrackedFiles = run('git ls-files --others --exclude-standard').split('\n').filter(Boolean);

  // ── 3. Log rotation ────────────────────────────────────────────────────────
  try {
    const stats = fs.statSync(LOG_FILE);
    if (stats.size > MAX_LOG_SIZE_BYTES) {
      const archivePath = LOG_FILE.replace('.log', `.${Date.now()}.log`);
      fs.renameSync(LOG_FILE, archivePath);
      fs.writeFileSync(LOG_FILE, ''); // start fresh
    }
  } catch { /* log file may not exist */ }

  // ── 4. Build session summary ───────────────────────────────────────────────
  const lines = ['─── Session Summary ───────────────────────────────────'];

  if (changedFiles.length > 0 || untrackedFiles.length > 0) {
    lines.push('\nFiles modified this session:');
    changedFiles.forEach(f => lines.push(`  ~ ${f}`));
    untrackedFiles.forEach(f => lines.push(`  + ${f} (new, untracked)`));
  } else {
    lines.push('\nNo file changes detected this session.');
  }

  if (hasChanges) {
    lines.push('\n⚠  You have uncommitted changes. Run `git add` and `git commit` when ready.');
  } else if (changedFiles.length > 0) {
    lines.push('\n✓  All changes are committed.');
  }

  lines.push('\nTo continue in a new session, start with:');
  lines.push('  /review  — review your changes before committing');
  lines.push('  /test    — verify tests still pass');
  lines.push('───────────────────────────────────────────────────────');

  process.stdout.write(lines.join('\n'));
  process.exit(0);
}

main().catch(() => process.exit(0));
