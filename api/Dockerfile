# syntax=docker/dockerfile:1
# PhishGuard Trainer – API image.
# Build from the repository root:  docker build -f api/Dockerfile -t phishguard-api .

# ---------- build stage: all dependencies, compile TypeScript ----------
FROM node:20-alpine AS build
WORKDIR /app

# Manifests first, so the dependency layer is cached until they change.
COPY package.json package-lock.json ./
COPY api/package.json api/
COPY web/package.json web/
COPY packages/contract/package.json packages/contract/
RUN npm ci --workspace @phishguard/api --workspace @phishguard/contract --include-workspace-root

COPY tsconfig.base.json ./
COPY packages/contract packages/contract
COPY api api

# Prisma arrives with a later task; generate the client only when a schema exists.
RUN if [ -f api/prisma/schema.prisma ]; then \
      npx prisma generate --schema api/prisma/schema.prisma; \
    else \
      echo "No Prisma schema yet - skipping prisma generate"; \
    fi

RUN npm run build --workspace @phishguard/api

# Drop devDependencies; what is left is exactly what the runtime stage needs.
RUN npm prune --omit=dev --workspace @phishguard/api --workspace @phishguard/contract --include-workspace-root \
 && mkdir -p api/node_modules

# ---------- runtime stage: production dependencies and compiled code only ----------
FROM node:20-alpine AS runtime
ENV NODE_ENV=production \
    PORT=3000
WORKDIR /app

COPY --from=build --chown=node:node /app/package.json ./
COPY --from=build --chown=node:node /app/node_modules node_modules
COPY --from=build --chown=node:node /app/packages/contract packages/contract
COPY --from=build --chown=node:node /app/api/package.json api/
COPY --from=build --chown=node:node /app/api/node_modules api/node_modules
COPY --from=build --chown=node:node /app/api/dist api/dist
# Schema, migrations and seed: `prisma migrate deploy` and `prisma db seed` run at start-up.
COPY --from=build --chown=node:node /app/api/prisma api/prisma

# Non-root: the official image ships an unprivileged "node" user (uid 1000).
USER node
WORKDIR /app/api
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:${PORT}/api/v1/health" || exit 1

# Secrets (DATABASE_URL, JWT_SECRET, ...) are passed at run time, never baked in.
CMD ["node", "dist/server.js"]
