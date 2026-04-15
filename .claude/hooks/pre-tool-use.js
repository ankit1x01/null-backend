#!/usr/bin/env node

/**
 * pre-tool-use.js
 *
 * Claude Code PreToolUse hook — runs before Write or Edit operations.
 *
 * Responsibilities:
 *  1. Validate the target file is within allowed directories
 *  2. Block writes to protected files
 *  3. Log all file operations for audit purposes
 *
 * Exit codes:
 *  0 — output JSON decision to stdout
 *
 * Input:  JSON on stdin  { tool_name, tool_input }
 * Output: JSON on stdout { decision: 'allow' | 'block', reason?: string }
 */

'use strict';

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// ─── Configuration ────────────────────────────────────────────────────────────

const PROJECT_ROOT = process.cwd();

const PROTECTED_FILES = [
  'package.json',
  'package-lock.json',
  '.env',
  '.env.production',
  'jest.config.js',
];

const ALLOWED_WRITE_DIRS = ['src', 'docs', '.claude', 'tests', 'public', 'scripts'];

const LINTABLE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs'];

// ─── Logging ─────────────────────────────────────────────────────────────────

const LOG_FILE = path.join(PROJECT_ROOT, '.claude', 'hooks.log');

function log(level, message, meta = {}) {
  try {
    const entry = JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      hook: 'pre-tool-use',
      message,
      ...meta,
    });
    fs.appendFileSync(LOG_FILE, entry + '\n');
  } catch {
    // Non-fatal — never block a tool call due to logging failure
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getFilePath(toolInput) {
  return toolInput.file_path || toolInput.path || null;
}

function isProtectedFile(filePath) {
  const relative = path.relative(PROJECT_ROOT, filePath);
  return PROTECTED_FILES.some(p => relative === p || relative.endsWith(`/${p}`));
}

function isWithinAllowedDirectory(filePath) {
  const relative = path.relative(PROJECT_ROOT, filePath);
  // Allow root-level markdown files (CLAUDE.md, README.md, AGENTS.md)
  if (!relative.includes(path.sep) && !relative.includes('/') && relative.endsWith('.md')) {
    return true;
  }
  return ALLOWED_WRITE_DIRS.some(
    dir => relative.startsWith(dir + '/') || relative.startsWith(dir + path.sep) || relative === dir
  );
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
  // Cross-platform stdin reading (works on Windows, macOS, Linux)
  let raw = '';
  try {
    await new Promise((resolve, reject) => {
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', chunk => { raw += chunk; });
      process.stdin.on('end', resolve);
      process.stdin.on('error', reject);
    });
  } catch {
    allow(); // Fail open — never block on hook infrastructure failure
  }

  let hookData;
  try {
    hookData = JSON.parse(raw);
  } catch {
    allow();
  }

  const { tool_name: toolName, tool_input: toolInput } = hookData;
  const filePath = getFilePath(toolInput);

  if (!filePath) {
    allow();
  }

  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(PROJECT_ROOT, filePath);

  log('info', `${toolName} requested`, { file: filePath });

  // ── Guard 1: Protected files ─────────────────────────────────────────────────
  if (isProtectedFile(absolutePath)) {
    const reason =
      `Blocked: "${filePath}" is a protected file.\n` +
      `Modify it manually after team review. Protected list: ${PROTECTED_FILES.join(', ')}`;
    log('warn', 'Write blocked — protected file', { file: filePath });
    block(reason);
  }

  // ── Guard 2: Allowed directories ─────────────────────────────────────────────
  if (!isWithinAllowedDirectory(absolutePath)) {
    const reason =
      `Blocked: "${filePath}" is outside allowed write directories.\n` +
      `Allowed: ${ALLOWED_WRITE_DIRS.join(', ')} (plus root *.md files)`;
    log('warn', 'Write blocked — disallowed directory', { file: filePath });
    block(reason);
  }

  // ── Guard 3: Pre-lint existing file (informational, never blocking) ───────────
  const ext = path.extname(absolutePath);
  if (LINTABLE_EXTENSIONS.includes(ext) && fs.existsSync(absolutePath)) {
    try {
      execSync(`npx eslint --max-warnings=0 "${absolutePath}"`, {
        cwd: PROJECT_ROOT,
        stdio: 'pipe',
        timeout: 30_000,
      });
    } catch {
      // Pre-existing lint errors are informational — Claude may be fixing them
      log('info', 'Pre-existing lint errors found (non-blocking)', { file: filePath });
    }
  }

  log('info', 'Pre-tool-use checks passed', { file: filePath, tool: toolName });
  allow();
}

main().catch(() => allow()); // Always fail open
