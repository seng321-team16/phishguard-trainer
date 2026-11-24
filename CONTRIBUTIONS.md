# Individual Contributions

**Team:** Takım 16 · SENG 321 Software Engineering · Repository: `seng321-team16/phishguard-trainer`

Each member maintains their own section through a pull request, so that every entry is backed by GitHub records (commits, issues, pull requests, reviews). Every item under "Work completed" links to the corresponding GitHub issue, pull request or commit.

## Ali Kaan Demiralp

| Field | Content |
|---|---|
| Student number | 230205034 |
| GitHub username | [`dalikaan`](https://github.com/dalikaan) |
| Role | Lead Software Architect and Technical Lead; DevOps and CI/CD Engineer |
| Responsibilities | Architecture strategy, OpenAPI contract, security design, Git-Flow rules, repository setup, CI/CD, Docker, code review leadership |

**Work completed (Sprint 1)**
- Created the GitHub organization `seng321-team16` and the repository `phishguard-trainer` with the initial structure, Apache-2.0 license, README, issue and pull request templates, and Dependabot configuration. Commit: [`8a18f8a`](https://github.com/seng321-team16/phishguard-trainer/commit/8a18f8a).
- Configured the branch ruleset for `main` and `develop` (pull request required, one approval, stale-approval dismissal, conversation resolution, no force pushes, no deletions) and enabled Dependabot, secret scanning and private vulnerability reporting.
- Authored the system vision and boundary specification, the OpenAPI contract and the repository workflow and Git-Flow rules (`docs/sprint-1/02`, `api/openapi.yaml`, `docs/sprint-1/05`).
- Drafted the base structure of the project proposal, the team roles and RACI matrix and the initial product backlog (`docs/sprint-1/01`, `04`, `06`) so that the document owners could review and extend them.
- Pull requests: authored [#1](https://github.com/seng321-team16/phishguard-trainer/pull/1), [#2](https://github.com/seng321-team16/phishguard-trainer/pull/2); reviewed [#31](https://github.com/seng321-team16/phishguard-trainer/pull/31)
- Issues: [stories assigned to me](https://github.com/seng321-team16/phishguard-trainer/issues?q=is%3Aissue+assignee%3Adalikaan)


**Work completed (Sprint 2)**
- Pull requests authored:
  - [#67](https://github.com/seng321-team16/phishguard-trainer/pull/67) feat(db): add users table, initial migration and user repository [T-01]
  - [#65](https://github.com/seng321-team16/phishguard-trainer/pull/65) build(docker): add multi-stage Dockerfiles and nginx config [T-41]
  - [#61](https://github.com/seng321-team16/phishguard-trainer/pull/61) build(contract): add Prism mock server and Spectral contract lint [T-48]
  - [#59](https://github.com/seng321-team16/phishguard-trainer/pull/59) build(compose): add docker compose stack with db, api, web and seeding hook [T-42]
  - [#46](https://github.com/seng321-team16/phishguard-trainer/pull/46) docs(architecture): add UML use case, class, ER, sequence and state diagrams [T-61]
  - [#44](https://github.com/seng321-team16/phishguard-trainer/pull/44) docs(architecture): add C4 architecture documentation [T-55]
  - [#42](https://github.com/seng321-team16/phishguard-trainer/pull/42) build(repo): add npm workspaces skeleton for api, web and contract [T-63]
  - [#40](https://github.com/seng321-team16/phishguard-trainer/pull/40) docs(adr): add ADRs for stack, API-first contract and JWT auth [T-62]
- Pull requests reviewed: [#71](https://github.com/seng321-team16/phishguard-trainer/pull/71), [#70](https://github.com/seng321-team16/phishguard-trainer/pull/70), [#57](https://github.com/seng321-team16/phishguard-trainer/pull/57), [#56](https://github.com/seng321-team16/phishguard-trainer/pull/56), [#54](https://github.com/seng321-team16/phishguard-trainer/pull/54), [#52](https://github.com/seng321-team16/phishguard-trainer/pull/52), [#50](https://github.com/seng321-team16/phishguard-trainer/pull/50), [#49](https://github.com/seng321-team16/phishguard-trainer/pull/49), [#48](https://github.com/seng321-team16/phishguard-trainer/pull/48)
- Issues:
  - [#66](https://github.com/seng321-team16/phishguard-trainer/issues/66) [T-01] Design the users table and first Prisma migration
  - [#64](https://github.com/seng321-team16/phishguard-trainer/issues/64) [T-41] Write multi-stage Dockerfiles for api and web
  - [#60](https://github.com/seng321-team16/phishguard-trainer/issues/60) [T-48] Configure the OpenAPI mock server and contract lint
  - [#58](https://github.com/seng321-team16/phishguard-trainer/issues/58) [T-42] Write docker-compose configuration with database and seeding hook
  - [#45](https://github.com/seng321-team16/phishguard-trainer/issues/45) [T-61] Write the UML models
  - [#43](https://github.com/seng321-team16/phishguard-trainer/issues/43) [T-55] Write the C4 architecture documentation
  - [#41](https://github.com/seng321-team16/phishguard-trainer/issues/41) [T-63] Create the monorepo skeleton (api, web, contract) with tooling
  - [#39](https://github.com/seng321-team16/phishguard-trainer/issues/39) [T-62] Record the technology stack and architecture style (ADR-0001)
  - [#20](https://github.com/seng321-team16/phishguard-trainer/issues/20) [US-18] One-command Docker deployment
  - [#16](https://github.com/seng321-team16/phishguard-trainer/issues/16) [US-14] Scenario data model and CRUD API
  - [#4](https://github.com/seng321-team16/phishguard-trainer/issues/4) [US-02] Log in and out
  - [#3](https://github.com/seng321-team16/phishguard-trainer/issues/3) [US-01] Register an account
- Commits: [all my commits](https://github.com/seng321-team16/phishguard-trainer/commits?author=dalikaan)

## Murat Yatağan

| Field | Content |
|---|---|
| Student number | 220205005 |
| GitHub username | myatagan |
| Role | Product Owner |
| Responsibilities | Product vision, backlog ownership and prioritisation, acceptance sign-off, scenario content, administrator statistics |
**Work completed (Sprint 1)**
Evaluated the responsibilities and RACI assignments of all team members (`docs/sprint-1/04`) and applied necessary corrections.
- Reviewed and prioritized the initial product backlog (`docs/sprint-1/06`) across Must/Should/Could categories (`US-01` to `US-25`) to define the Sprint 3 MVP scope[cite: 1, 2, 3].
- Defined product vision, scope boundaries, and domain constraints (simulator-only architecture, fictional brands/reserved domains, and seed scenario distribution)[cite: 2, 6, 9].

**Work completed (Sprint 2)**
- Reviewed the Software Requirements Specification (`01-Software-Requirements-Specification.pdf`) against product vision and acceptance criteria[cite: 2].
- Resolved open Product Owner specification decisions (`OI-01`, `OI-02`, `OI-04`, `OI-05`, `OI-07`, `OI-08`, `OI-10`, `OI-12`, `OI-18`, `OI-19`) in the Decision Log (`docs/process/decision-log.md`, task `T-57`) covering seed scenario ratios, indicator vocabulary, scoring/trend rules, and admin statistics[cite: 21, 22].
- Prepared and validated the seed scenario library content (30+ phishing and legitimate scenarios with indicators and explanations)[cite: 9, 10].
- Pull requests: authored [#<PR_NO>](https://github.com/seng321-team16/phishguard-trainer/pull/<PR_NO>); reviewed [#<PR_NO>](https://github.com/seng321-team16/phishguard-trainer/pull/<PR_NO>)
- Issues & Commits: [Assigned issues](https://github.com/seng321-team16/phishguard-trainer/issues?q=is%3Aissue+assignee%3Amyatagan) · [My commits](https://github.com/seng321-team16/phishguard-trainer/commits?author=myatagan)
## Furkan Berkay Öztürk

| Field | Content |
|---|---|
| Student number | 210204021 |
| GitHub username | [`Areca0`](https://github.com/Areca0) |
| Role | Scrum Master and Agile Process Coach |
| Responsibilities | Agile process, stand-ups, retrospectives, impediment tracking, GitHub Projects board, review coordination, administrator scenario-management interface |

**Work completed (Sprint 1):**
-Reviewed and verified Document 04 (Team Roles and RACI Matrix), checking role assignments, responsibilities, and consistency across the team. No significant discrepancies were identified.
-Updated Document 05 (Repository Workflow and Git-Flow Rules) by adding a new section on Scrum ceremonies and team coordination, covering stand-up meetings, sprint retrospectives, impediment tracking, GitHub Projects monitoring, and Pull Request review coordination.
-Created and configured the GitHub Projects board for PhishGuard Trainer, including the Sprint Board view for task tracking.
-Reviewed the initial product backlog and GitHub Issues to monitor Sprint 1 progress.
-Added the completed Sprint 1 Issues #28 and #30 to the Done column of the GitHub Projects board.
-Contribution evidence:
-GitHub Projects board: https://github.com/orgs/seng321-team16/projects/1
-Document 05 update: https://github.com/seng321-team16/phishguard-trainer/pull/33
-Sprint 1 issue tracking: Issue #28, Issue #30

## Duhan Kaan Şenol

| Field | Content |
|---|---|
| Student number | 220205054 |
| GitHub username | `ThatsKafiBRO` |
| Role | Requirements and UX Engineer |
| Responsibilities | Requirements specification, user stories and acceptance criteria, non-functional requirements, Figma prototypes, learner interface |
| Work completed | Sprint 1: System vision and boundary (`02`) and user stories with acceptance criteria (`06`); story statements and concrete dependencies added ([task](https://github.com/seng321-team16/phishguard-trainer/issues/28)); user story issues US-01 to US-25 created |
| Issues | [Task](https://github.com/seng321-team16/phishguard-trainer/issues/28), [user stories](https://github.com/seng321-team16/phishguard-trainer/issues?q=is%3Aissue+label%3Atype%3Astory) |
| Pull requests (authored / reviewed) | Authored: [PR](https://github.com/seng321-team16/phishguard-trainer/pull/29); reviewed: [#1](https://github.com/seng321-team16/phishguard-trainer/pull/1) |
| Commits | [My commits](https://github.com/seng321-team16/phishguard-trainer/commits?author=ThatsKafiBRO) |

## Erol Yağız Gemalmaz

| Field | Content |
|---|---|
| Student number | 220204057 |
| GitHub username | `ygzgemalmaz` |
| Role | Quality Assurance and Test Automation Engineer |
| Responsibilities | Test plan, unit, integration and end-to-end tests, defect tracking, coverage monitoring, SonarQube report |
| Work completed | Sprint 1: initial QA test plan, acceptance-criteria testability review and OpenAPI error-response review prepared under [QA task #30](https://github.com/seng321-team16/phishguard-trainer/issues/30) |
| Issues | [QA task #30](https://github.com/seng321-team16/phishguard-trainer/issues/30), [US-20 #22](https://github.com/seng321-team16/phishguard-trainer/issues/22), [US-23 #25](https://github.com/seng321-team16/phishguard-trainer/issues/25), [US-25 #27](https://github.com/seng321-team16/phishguard-trainer/issues/27) |
| Pull requests (authored / reviewed) | Authored: [PR #31](https://github.com/seng321-team16/phishguard-trainer/pull/31); reviewed: pending an available teammate PR |
| Commits | [My commits](https://github.com/seng321-team16/phishguard-trainer/commits?author=ygzgemalmaz) |
