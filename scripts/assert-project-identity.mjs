import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const errors = [];
const warnings = [];

function fail(message) { errors.push(message); }
function readJson(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) { fail(`missing required file: ${rel}`); return null; }
  try { return JSON.parse(fs.readFileSync(full, 'utf8')); }
  catch (error) { fail(`invalid JSON in ${rel}: ${error.message}`); return null; }
}
function readText(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) { fail(`missing required file: ${rel}`); return ''; }
  return fs.readFileSync(full, 'utf8');
}
function sha256(full) {
  const hash = crypto.createHash('sha256');
  hash.update(fs.readFileSync(full));
  return hash.digest('hex');
}
function normalizeSlug(value) {
  return String(value || '').toLowerCase().replace(/\.git$/,'').split(/[/:]/).pop().replace(/[^a-z0-9]+/g,'');
}

const identity = readJson('PROJECT_IDENTITY.json');
const pkg = readJson('package.json');

if (identity) {
  if (identity.product_id !== 'cao-pulse') fail('PROJECT_IDENTITY.json product_id must equal cao-pulse');
  if (identity.product_name !== 'CAO PULSE') fail('PROJECT_IDENTITY.json product_name must equal CAO PULSE');
  if (identity.client_name !== 'Cabinet C.A.O') fail('PROJECT_IDENTITY.json client_name must equal Cabinet C.A.O');
  if (identity.pack_version !== '1.2') fail('PROJECT_IDENTITY.json pack_version must equal 1.2');
  if (identity.package_name !== 'cao-pulse-demo') fail('PROJECT_IDENTITY.json package_name must equal cao-pulse-demo');
  if (identity.expected_hermes_profile !== 'cao-pulse-dev') fail('PROJECT_IDENTITY.json expected_hermes_profile must equal cao-pulse-dev');
}

if (pkg && identity) {
  if (pkg.name !== identity.package_name) fail(`package.json name mismatch: expected ${identity.package_name}, got ${pkg.name}`);
  if (pkg.version !== '0.1.2') fail(`package.json version mismatch: expected 0.1.2, got ${pkg.version}`);
}

const requiredMarkers = [
  ['README.md', ['CAO PULSE', 'Cabinet C.A.O', 'CAO Growth Engine', 'CAO Reference Intelligence', 'CAO Command Center', 'CAO Delivery Copilot']],
  ['HERMES.md', ['CAO PULSE', 'Cabinet C.A.O', 'cao-pulse-dev']],
  ['PROMPT_BOOTSTRAP.md', ['CAO PULSE Demo', 'PROJECT_IDENTITY.json']],
  ['START_HERE_HERMES.md', ['CAO PULSE v1.2', 'PROJECT_IDENTITY.json', 'cao-pulse-dev']],
];
for (const [rel, markers] of requiredMarkers) {
  const text = readText(rel);
  for (const marker of markers) if (!text.includes(marker)) fail(`${rel} missing identity marker: ${marker}`);
}

if (identity) {
  const sourceRel = identity.canonical_source;
  const sourceFull = path.join(root, sourceRel);
  if (!fs.existsSync(sourceFull)) fail(`canonical source missing: ${sourceRel}`);
  else {
    const actual = sha256(sourceFull);
    if (actual !== identity.canonical_source_sha256) fail(`canonical source hash mismatch: expected ${identity.canonical_source_sha256}, got ${actual}`);
  }
}

const dirSlug = normalizeSlug(path.basename(root));
if (!dirSlug.includes('caopulse')) fail(`working directory name must clearly identify CAO PULSE; current=${path.basename(root)}`);

let gitRoot = null;
let gitRemote = null;
try {
  gitRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: root, encoding: 'utf8', stdio: ['ignore','pipe','ignore'] }).trim();
  if (path.resolve(gitRoot) !== path.resolve(root)) fail(`Git root mismatch: current=${root} git_root=${gitRoot}`);
  try {
    gitRemote = execFileSync('git', ['remote', 'get-url', 'origin'], { cwd: root, encoding: 'utf8', stdio: ['ignore','pipe','ignore'] }).trim();
  } catch {
    warnings.push('Git repository has no origin remote yet. This is acceptable for a fresh local start.');
  }
} catch {
  warnings.push('Git is not initialized. This is acceptable before the first clean commit.');
}

if (gitRemote && identity) {
  const remoteSlug = normalizeSlug(gitRemote);
  const expectedPrefix = normalizeSlug(identity.allowed_remote_slug_prefix);
  const override = normalizeSlug(process.env.CAO_ALLOWED_REMOTE_SLUG || '');
  const allowed = remoteSlug.startsWith(expectedPrefix) || (override && remoteSlug === override);
  if (!allowed) fail(`origin remote slug does not positively match CAO PULSE naming: ${gitRemote}`);
}

if (process.env.HERMES_PROFILE && identity && process.env.HERMES_PROFILE !== identity.expected_hermes_profile) {
  fail(`HERMES_PROFILE mismatch: expected ${identity.expected_hermes_profile}, got ${process.env.HERMES_PROFILE}`);
}

const modulePaths = [
  'src/lib/domain/scoring.ts',
  'src/lib/domain/proof-readiness.ts',
  'src/app/dashboard/page.tsx',
  'src/app/references/page.tsx',
  'src/app/missions/page.tsx',
  'src/lib/ai/fake-provider.ts',
];
for (const rel of modulePaths) if (!fs.existsSync(path.join(root, rel))) fail(`required CAO PULSE implementation file missing: ${rel}`);

if (errors.length) {
  console.error('\nCAO PULSE PROJECT IDENTITY CHECK: FAILED');
  for (const error of errors) console.error(`- ${error}`);
  for (const warning of warnings) console.error(`- warning: ${warning}`);
  console.error('\nSTOP. Correct the positive project identity assertions before continuing.');
  process.exit(42);
}

console.log('CAO PULSE PROJECT IDENTITY CHECK: OK');
console.log(`root=${root}`);
console.log('product=CAO PULSE');
console.log('client=Cabinet C.A.O');
console.log('pack_version=1.2');
console.log('package=cao-pulse-demo');
console.log('profile_expected=cao-pulse-dev');
console.log('source_hash=VERIFIED');
console.log(`git_root=${gitRoot || 'NOT_INITIALIZED'}`);
console.log(`git_remote=${gitRemote || 'NOT_CONFIGURED'}`);
for (const warning of warnings) console.log(`warning=${warning}`);
