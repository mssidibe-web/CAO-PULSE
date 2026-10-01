#!/bin/sh
set -eu
printf '%s\n' 'CAO PULSE preflight'
node scripts/audit-pack.mjs
node scripts/verify-traceability.mjs
printf '%s\n' 'Set LIVE_AI=false for the safest founder presentation unless live mode was explicitly evaluated.'
printf '%s\n' 'Run npm run build and npm run test:e2e before the meeting.'
