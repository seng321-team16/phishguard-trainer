# syntax=docker/dockerfile:1
# PhishGuard Trainer – web image (static build served by nginx).
# Build from the repository root:  docker build -f web/Dockerfile -t phishguard-web .

# ---------- build stage: Vite production build ----------
FROM node:20-alpine AS build
WORKDIR /app

# Manifests first, so the dependency layer is cached until they change.
COPY package.json package-lock.json ./
COPY api/package.json api/
COPY web/package.json web/
COPY packages/contract/package.json packages/contract/
RUN npm ci --workspace @phishguard/web --workspace @phishguard/contract --include-workspace-root

COPY tsconfig.base.json ./
COPY packages/contract packages/contract
COPY web web

RUN npm run build --workspace @phishguard/web

# ---------- runtime stage: nginx with the static files only ----------
FROM nginx:1.30-alpine AS runtime

# Our configuration replaces the stock one (which expects to run as root on port 80).
RUN rm -f /etc/nginx/conf.d/default.conf /usr/share/nginx/html/50x.html
COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/web/dist /usr/share/nginx/html

# Unprivileged: nginx runs as the "nginx" user, listens on 8080 and writes only to /tmp.
USER nginx
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
