#!/usr/bin/env node

/**
 * post-tool-use.js
 *
 * Claude Code PostToolUse hook — runs after Write or Edit operations.
 *
 * Responsibilities:
 *  1. Auto-fix lint issues on the modified file
 *  2. Run TypeScript type-check across the project
 *  3. Run the co-located test file if one exists
 *  4. Output feedback to Claude so it can self-correct immediately
 *
 * Output to stdout: plain text feedback (fed back to Claude's context)
 */

'use strict';

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// ─── Configuration ────────────────────────────────────────────────────────────

const PROJECT_ROOT = process.cwd();
const LOG_FILE = path.join(PROJECT_ROOT, '.claude', 'hooks.log');

const LINTABLE_EXTENSIONS = ['.js', '.jsx'];

// ─── Logging ─────────────────────────────────────────────────────────────────

function log(level, message, meta = {}) {
  try {
    fs.appendFileSync(
      LOG_FILE,
      JSON.stringify({ timestamp: new Date().toISOString(), level, hook: 'post-tool-use', message, ...meta }) + '\n'
    );
  } catch { /* non-fatal */ }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getFilePath(toolInput) {
  return toolInput.file_path || toolInput.path || null;
}

/** src/lib/foo.ts → src/lib/foo.test.ts (or .spec.ts) */
function findTestFile(sourceFile) {
  const ext  = path.extname(sourceFile);
  const base = sourceFile.slice(0, -ext.length);
  const candidates = [
    `${base}.test${ext}`,
    `${base}.spec${ext}`,
    path.join(path.dirname(sourceFile), '__tests__', path.basename(base) + `.test${ext}`),
  ];
  return candidates.find(f => fs.existsSync(f)) ?? null;
}

function run(cmd, timeoutMs = 60_000) {
  try {
    execSync(cmd, { cwd: PROJECT_ROOT, stdio: 'pipe', timeout: timeoutMs });
    return { ok: true, output: '' };
  } catch (err) {
    const out = (err.stdout?.toString() ?? '') + (err.stderr?.toString() ?? '');
    return { ok: false, output: out.slice(0, 3000) };
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Cross-platform stdin (works on Windows, macOS, Linux)
  let raw = '';
  try {
    await new Promise((resolve, reject) => {
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', chunk => { raw += chunk; });
      process.stdin.on('end', resolve);
      process.stdin.on('error', reject);
    });
  } catch { process.exit(0); }

  let hookData;
  try { hookData = JSON.parse(raw); }
  catch { process.exit(0); }

  const { tool_name: toolName, tool_input: toolInput } = hookData;
  const filePath = getFilePath(toolInput);
  if (!filePath) process.exit(0);

  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(PROJECT_ROOT, filePath);

  const ext        = path.extname(absolutePath);
  const isTestFile = /\.(test|spec)\.[tj]sx?$/.test(absolutePath);
  const feedback   = [];

  log('info', `Post-${toolName} checks starting`, { file: filePath });

  // ── Step 1: ESLint auto-fix ───────────────────────────────────────────────────
  if (LINTABLE_EXTENSIONS.includes(ext)) {
    const result = run(`npx eslint --fix --max-warnings=0 "${absolutePath}"`, 30_000);
    if (result.ok) {
      feedback.push('Lint: PASS (auto-fixed style issues if any)');
    } else {
      feedback.push(`Lint: FAIL — remaining errors after auto-fix:\n${result.output}`);
      log('warn', 'Post-lint failed', { file: filePath });
    }
  }

  // ── Step 2: Find related integration test ───────────────────────────────────
  // This project uses Jest with *.integration.test.js naming — co-located tests
  // don't exist. The integration tests live in tests/integration/[module]/.
  // We only notify if a matching integration test file was recently modified.
  if (LINTABLE_EXTENSIONS.includes(ext) && !isTestFile) {
    const relSrc = path.relative(PROJECT_ROOT, absolutePath);
    // Extract module name from src/modules/[module]/... path
    const moduleMatch = relSrc.match(/src[\\/]modules[\\/]([^/\\]+)/);
    if (moduleMatch) {
      const moduleName = moduleMatch[1];
      const integrationTestDir = path.join(PROJECT_ROOT, 'tests', 'integration', moduleName);
      if (fs.existsSync(integrationTestDir)) {
        feedback.push(`Note: Integration tests for "${moduleName}" exist at tests/integration/${moduleName}/. Run: npm run test:${moduleName.replace(/-./g, m => m[1].toUpperCase())}`);
      } else {
        feedback.push(`Note: No integration tests found for module "${moduleName}". Consider adding tests in tests/integration/${moduleName}/.`);
      }
    }
  }

  // ── Emit feedback to Claude ───────────────────────────────────────────────────
  if (feedback.length > 0) {
    const allOk  = feedback.every(f => !f.includes('FAIL'));
    const header = allOk
      ? `Post-write checks PASSED for ${path.relative(PROJECT_ROOT, absolutePath)}`
      : `Post-write checks FAILED for ${path.relative(PROJECT_ROOT, absolutePath)} — please fix before continuing`;

    process.stdout.write(`${header}\n\n${feedback.join('\n\n')}`);
  }

  process.exit(0);
}

main().catch(() => process.exit(0));
