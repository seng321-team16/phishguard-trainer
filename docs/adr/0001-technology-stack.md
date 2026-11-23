# ADR-0001 – Technology stack

| Field | Value |
|---|---|
| Version | 1.0 |
| Date | 2026-11-15 |
| Owner | Ali Kaan Demiralp (`dalikaan`) – Lead Architect, DevOps |
| Related tasks | T-62 (this record), T-63 (monorepo skeleton), T-55 (C4 documentation) |
| Related stories | Process |

## Status

Accepted

## Context

Sprint 1 fixed *what* PhishGuard Trainer is, but not *what it is built with*. The System Vision document describes a "Browser SPA → REST API (stateless) → relational database" packaged with Docker Compose and leaves the technology choice to the Lead Architect. The OpenAPI contract in `api/openapi.yaml` is stack-agnostic on purpose.

The forces that shape the choice:

- **Course constraints.** The whole system must start with one Docker Compose command, CI must enforce at least 50 % unit-test line coverage, the project is OpenAPI-first and everything we ship must be compatible with our Apache-2.0 licence.
- **Team and time.** Five people, ten weeks, MVP in week 8. Each member owns tasks in a different area (API, web, tests, content), so people must be able to read and review each other's code.
- **Security drivers from Sprint 1.** Argon2id password hashing, a short-lived signed access token, role checks on every route, request validation derived from the OpenAPI document, parameterised database access only, strict rate limiting on login and registration, problem-details error responses without stack traces, security headers and restrictive CORS.
- **Product shape.** A small CRUD-style application with clear relations (users, scenarios, sessions, answers), one database instance, a desktop-first web UI, no real email and no external integrations.

## Decision

We will build the MVP as a **TypeScript monorepo on Node.js 20 LTS** (npm workspaces: `api/`, `web/`, `e2e/`, `packages/contract/`) with the stack below. Every layer lists the choice, what was rejected and why.

| Layer | Choice | Rejected alternative(s) | Reason for the choice |
|---|---|---|---|
| Language and layout | TypeScript (strict) everywhere, Node.js 20 LTS, npm workspaces monorepo | Java/Spring Boot or Python/FastAPI backend with a TypeScript frontend; separate repositories per service | One language means every member can review every pull request, one linter/formatter/test runner, and the types generated from the contract are shared by server and client. A second language would double the tooling for a five-person team. One repository keeps the contract, the code and the CI in the same commit. |
| Frontend | React 18 + Vite, React Router 6, TanStack Query, CSS Modules with design tokens | Angular; Vue 3; Next.js (server-side rendering); a utility CSS framework | React is the framework most of the team already knows. Angular brings more structure than a handful of screens needs. Next.js adds a second server runtime, but the product is a logged-in SPA with no SEO need. TanStack Query gives caching and loading/error states without a global store. CSS Modules keep styles local and use the tokens from the UI prototype directly. |
| Backend | Express 4 with `express-openapi-validator`, layered as routes → controllers → services → repositories | NestJS; Fastify; hand-written validation (for example Zod schemas next to the routes) | Express is small, well documented and has mature middleware for everything the security drivers ask for (`helmet`, `express-rate-limit`, CORS). `express-openapi-validator` validates requests straight from `api/openapi.yaml`, so validation cannot drift from the contract (see ADR-0002). NestJS adds decorators and a dependency-injection framework that the team would have to learn first. Fastify is faster, but performance is not a driver and its OpenAPI tooling is schema-first in code rather than document-first. |
| Database | PostgreSQL 16, one instance | SQLite; MySQL 8; MongoDB | The data is relational and needs foreign keys, unique constraints and transactions (for example one answer per scenario per session). PostgreSQL has an official Docker image and native UUID and timestamp types that match the contract. SQLite makes concurrent writes and the Compose `db` service awkward. MongoDB would move integrity checks into application code. |
| ORM | Prisma (schema, migrations, typed client) | TypeORM; Knex query builder; raw SQL with `pg` | Prisma generates a typed client from one schema file and versioned migrations from the same file. All queries are parameterised, which meets the SQL-injection driver by construction. TypeORM's decorator entities are weaker on type safety. Raw SQL or Knex would mean hand-written types and more review effort. Prisma calls are allowed only in the repository layer. |
| Auth | `argon2` (Argon2id) password hashing; JWT access token signed with `jsonwebtoken`; role in the token claims, checked server-side on every request | bcrypt; server-side sessions with a cookie and a session store; an external identity provider | Argon2id is the algorithm preferred in the Sprint 1 security drivers and is memory-hard, unlike bcrypt. A stateless token matches the `bearerAuth` scheme in the contract and needs no session store. External identity providers and SSO are out of scope. The token design and its trade-offs are recorded in ADR-0003. |
| Security middleware and errors | `helmet`, `express-rate-limit` (login limit from `LOGIN_RATE_LIMIT_PER_MINUTE`), CORS restricted to the web origin, RFC 9457 `application/problem+json` for every error, `pino` logging | Hand-written header and rate-limit code; a gateway-level limiter only (nginx); custom JSON error shapes; `winston` | Maintained middleware is safer than our own code in a security product. Limiting inside the API keeps the 429 response and the `Retry-After` header in the contract's problem format. RFC 9457 is the current version of the problem-details format (it replaces RFC 7807 named in Sprint 1 and keeps the same media type and fields), and it is what the contract's `Problem` schema describes. `pino` is fast, writes structured JSON and supports redaction, so passwords and tokens are never logged. |
| Testing | Vitest + Supertest (API), Vitest + React Testing Library (web), `@vitest/coverage-v8`, a disposable PostgreSQL container for integration tests, Playwright for end-to-end tests against the Compose stack | Jest; Mocha + Chai; Cypress; an in-memory database substitute for integration tests | Vitest runs TypeScript and ES modules without extra configuration, shares the Vite configuration with the web app and is one runner for both workspaces. Jest needs a transformer setup for the same result. Playwright drives several browsers in parallel and runs headless in CI without a paid service. Integration tests use real PostgreSQL because a substitute would hide constraint and SQL-dialect errors. |
| Lint and contract tooling | ESLint (typescript-eslint) + Prettier; Spectral for `api/openapi.yaml`; Prism as the mock server; `openapi-typescript` for the generated types | Biome; no contract linting; a hand-written mock server | ESLint with typescript-eslint has the type-aware rules we need (for example no `any`). Spectral fails CI when the contract is not valid OpenAPI. Prism serves the contract as a mock so the frontend can start before the API exists (risk R5). |
| CI | GitHub Actions: lint, OpenAPI lint, unit tests with a coverage gate (≥ 50 % lines), build, Docker build, `npm audit` | Jenkins; GitLab CI; running checks only on developer machines | The repository is on GitHub, so Actions needs no extra server and reports directly on the pull request. The coverage gate turns the course requirement into a failing check instead of a promise. Jenkins would need a machine that the team would have to host and maintain. |
| Containers | Multi-stage Dockerfiles; Docker Compose with `db`, `api` and `web` (nginx serves the built SPA and proxies `/api`) on `http://localhost:8080` | One container that holds everything; Kubernetes manifests; serving the SPA from the Express process | One `docker compose up` is a course constraint. Separate services mirror the context diagram and let each image stay small. nginx in front gives a single origin, so the browser never needs cross-origin requests in the demo, and it matches the contract's server URL `http://localhost:8080/api/v1`. Kubernetes is far beyond a single-laptop demo. |
| Static analysis | SonarQube Community (Docker) with `sonar-scanner`, configuration in `sonar-project.properties` | SonarCloud; ESLint only; CodeQL only | SonarQube Community is free, runs locally in Docker without an external account and reads the lcov coverage report, so quality, duplication and coverage are in one dashboard for the final report. ESLint alone has no duplication or security-hotspot view. SonarCloud would tie the report to an external service and organisation account. |

The full list of libraries stays in `playbook/CONVENTIONS.md` during development; this ADR is the reasoned record of it.

## Alternatives considered

The per-layer alternatives are in the table above. Three whole-stack alternatives were also discussed:

1. **Java (Spring Boot) API + React web.** Strong typing and a familiar course language, but two languages, two build systems and two test stacks. Members who work on the web would not be able to review API pull requests with confidence, and contract types could not be shared. Rejected because of team size and schedule.
2. **Python (FastAPI) API + React web.** FastAPI is fast to write, but it generates the OpenAPI document *from* code. Our rule is the opposite: the document comes first and the code follows it (ADR-0002). It also has the same two-language cost. Rejected.
3. **Full-stack framework (Next.js with API routes).** One deployable, but it blurs the SPA / REST API boundary that the Sprint 1 context diagram and the contract define, and makes the API harder to test and to mock on its own. Rejected.

## Consequences

**Positive**

- One language, one package manager and one set of tools across `api/`, `web/` and `e2e/`; any member can read and review any pull request.
- The contract drives both sides: server validation and client types come from `api/openapi.yaml` (ADR-0002).
- All security drivers from Sprint 1 are covered by maintained libraries rather than our own code.
- The stack is free and open source with licences compatible with Apache-2.0 (MIT, ISC, BSD, Apache-2.0, PostgreSQL licence). SonarQube Community is LGPL-3.0 but is used only as an external tool and is not distributed with our code.
- The course constraints are met directly: one Compose command, coverage gate in CI, OpenAPI-first.

**Negative and accepted**

- Node.js is single-threaded. Argon2id hashing is CPU-heavy, so the `argon2` library hashes off the main thread (libuv thread pool) and login is rate limited. Acceptable for a training tool with a small number of concurrent users.
- Express 4 does not forward rejected promises to the error handler by itself. Async route handlers must be wrapped; this is done once in the skeleton (T-63).
- Prisma adds a code-generation step (`prisma generate`) and a query engine binary to the API image. The multi-stage Dockerfile must copy it correctly.
- npm workspaces need discipline about which workspace a dependency belongs to. The skeleton task sets the rules.
- Integration and end-to-end tests need Docker on the developer's machine and in CI.
- The choices are pinned to major versions (Node 20, Express 4, React 18, PostgreSQL 16). Moving to a new major version is a deliberate change and needs a new ADR only if it changes a decision in this record.

**Follow-up**

- T-63 creates the monorepo skeleton with this stack.
- T-55 shows the same containers and components in the C4 diagrams.
- A dependency licence check remains a follow-up action from the Sprint 1 licence decision record.
