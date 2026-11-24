# PhishGuard Trainer

A web-based phishing-awareness **simulator**. Learners judge fictional emails, receive feedback on the red flags they missed, and track their score over time. Administrators manage the scenario library. The system never sends email and never contacts real targets.

**Course:** SENG 321 Software Engineering · **Team:** Takım 16

## Team

| Member | Role |
|---|---|
| Ali Kaan Demiralp | Lead Software Architect and Technical Lead; DevOps and CI/CD Engineer |
| Murat Yatağan | Product Owner |
| Furkan Berkay Öztürk | Scrum Master and Agile Process Coach |
| Duhan Kaan Şenol | Requirements and UX Engineer |
| Erol Yağız Gemalmaz | Quality Assurance and Test Automation Engineer |

## Repository layout

| Path | Content |
|---|---|
| `api/` | Backend service and the OpenAPI contract (`api/openapi.yaml`) |
| `web/` | Web client |
| `packages/contract/` | TypeScript types generated from the OpenAPI contract |
| `deploy/` | Deployment configuration (nginx); the Compose file is `docker-compose.yml` in the repository root |
| `docs/` | Project documentation (Sprint 1 deliverables in `docs/sprint-1/`) |
| `.github/` | Issue and pull request templates, CODEOWNERS, automation |

## Documentation

- [Project proposal](docs/sprint-1/01-Project-Proposal.md)
- [System vision and boundary](docs/sprint-1/02-System-Vision-and-Boundary.md)
- [OpenAPI contract](api/openapi.yaml)
- [Team roles and RACI](docs/sprint-1/04-Team-Roles-and-RACI.md)
- [Repository workflow and Git-Flow](docs/sprint-1/05-Repository-Workflow-and-Git-Flow.md)
- [Initial product backlog](docs/sprint-1/06-Initial-Product-Backlog.md)

## Development

The repository is an npm workspaces monorepo: `api` (Express), `web` (React + Vite) and `packages/contract` (TypeScript types generated from `api/openapi.yaml`). Node.js 20 LTS is required (see `.nvmrc`).

| Step | Command | What it does |
|---|---|---|
| Install | `npm ci` | Installs the dependencies of every workspace from `package-lock.json` |
| Run | `npm run dev` | Starts the API on `http://localhost:3000` and the web client on `http://localhost:5173` (Vite proxies `/api` to the API) |
| Test | `npm test` | Runs the unit tests of every workspace (`npm run test:coverage` also writes `coverage/`) |
| Check | `npm run lint`, `npm run typecheck`, `npm run build` | ESLint, TypeScript and production builds |
| Contract types | `npm run gen:contract` | Regenerates `packages/contract/src/schema.d.ts` after a change to `api/openapi.yaml` |

Configuration comes from environment variables; copy `.env.example` to `.env` when a value must differ from the defaults. Health check: `GET http://localhost:3000/api/v1/health` returns `{ "status": "ok" }`.

## Running the project

The whole stack (PostgreSQL, API, web) runs with Docker Compose. Only Docker is required (Docker Desktop, or Docker Engine with the Compose plugin).

```bash
cp .env.example .env          # then replace the change-me values
docker compose up --build
```

Open `http://localhost:8080`. The API is reached through the same origin; `GET http://localhost:8080/api/v1/health` returns `{ "status": "ok" }`.

| Service | Image | Role |
|---|---|---|
| `db` | `postgres:16-alpine` | Database with a named volume (`db-data`); not published to the host |
| `api` | built from `api/Dockerfile` | Starts when `db` is healthy; runs `npm run start:prod` (migrations, seed, server) |
| `web` | built from `web/Dockerfile` | nginx serving the web client on port 8080 and proxying `/api/` to `api`; starts when `api` is healthy |

- Configuration and secrets come only from `.env` (never committed). `POSTGRES_USER`, `POSTGRES_PASSWORD` and `POSTGRES_DB` must match the values inside `DATABASE_URL`.
- Stop with `docker compose down`. Add `-v` to delete the database volume as well and start from an empty database next time.
- Integration tests use a separate, disposable database: `docker compose --profile test up -d db-test` starts PostgreSQL on `localhost:5433` with in-memory (tmpfs) storage; connect with `TEST_DATABASE_URL` from `.env.example`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [CONTRIBUTIONS.md](CONTRIBUTIONS.md) (individual contributions). Security issues: see [SECURITY.md](SECURITY.md).

## License

Apache License 2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).
