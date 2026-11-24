#!/bin/sh
# Production start-up of the API container (npm run start:prod):
#
#   1. prisma migrate deploy   - apply pending database migrations
#   2. prisma db seed          - load the seed data (the seed must be idempotent)
#   3. node dist/server.js     - start the server
#
# Steps 1 and 2 are skipped while the repository has no Prisma schema or no seed
# command yet, so the stack already starts before those tasks are done. Once a
# schema exists, a failing migration or seed stops the container instead of
# starting the server on a wrong database.
set -eu

# Always run from the api/ directory, wherever the script is called from.
cd "$(dirname "$0")/.."

SCHEMA="prisma/schema.prisma"

log() {
  echo "[start-prod] $*"
}

# True when package.json declares a seed command ("prisma": { "seed": "..." }).
has_seed_command() {
  node --input-type=commonjs -e '
    const pkg = JSON.parse(require("node:fs").readFileSync("package.json", "utf8"));
    process.exit(pkg.prisma && pkg.prisma.seed ? 0 : 1);
  '
}

if [ -f "$SCHEMA" ]; then
  if [ -z "${DATABASE_URL:-}" ]; then
    log "DATABASE_URL is not set - cannot apply migrations" >&2
    exit 1
  fi
  if ! npx --no-install prisma --version >/dev/null 2>&1; then
    log "Prisma schema found but the prisma CLI is not installed in this image" >&2
    exit 1
  fi

  log "Applying database migrations"
  npx --no-install prisma migrate deploy --schema "$SCHEMA"

  if has_seed_command; then
    log "Seeding the database"
    npx --no-install prisma db seed
  else
    log "No seed command in package.json - skipping seed"
  fi
else
  log "No Prisma schema yet - skipping migrations and seed"
fi

if [ ! -f dist/server.js ]; then
  log "dist/server.js not found - build the API first (npm run build)" >&2
  exit 1
fi

log "Starting the API server"
# exec: node replaces the shell, so it receives the stop signal directly.
exec node dist/server.js
