# Team Roles and RACI Matrix

**Team:** Takım 16 · SENG 321 Software Engineering

## 1. Team members and roles

| Team member | Student no. | Role |
|---|---|---|
| Ali Kaan Demiralp | 230205034 | Lead Software Architect and Technical Lead; DevOps and CI/CD Engineer |
| Murat Yatağan | 220205005 | Product Owner |
| Furkan Berkay Öztürk | 210204021 | Scrum Master and Agile Process Coach |
| Duhan Kaan Şenol | 220205054 | Requirements and UX Engineer |
| Erol Yağız Gemalmaz | 220204057 | Quality Assurance and Test Automation Engineer |

The project specification defines five core roles for teams of up to six members; the Implementation and Integration Engineer role applies only to the seven-person team. With five members, the combined *Product Owner and Requirements Engineer* role is divided into two roles, so that every member holds a named role. The Lead Architect additionally holds the DevOps role.

## 2. Role responsibilities

| Role | Primary responsibilities | Required outputs |
|---|---|---|
| Lead Software Architect and Technical Lead; DevOps and CI/CD Engineer | Architecture strategy, API contract, security design, code review leadership; Docker, GitHub Actions pipeline, deployment | C4 and UML models, OpenAPI contract, CI/CD pipeline, docker-compose deployment |
| Product Owner | Product vision, backlog ownership, prioritisation, stakeholder validation, acceptance sign-off | Product backlog, priorities, acceptance decisions, scenario content |
| Scrum Master and Agile Process Coach | Agile process, stand-ups, retrospectives, impediment tracking, board administration, review coordination | Stand-up and retrospective records, RACI upkeep, GitHub Projects board |
| Requirements and UX Engineer | Requirements elicitation and specification, user stories and acceptance criteria wording, non-functional requirements, UX design | SRS, quality-measure specification, Figma prototypes, user-flow diagrams |
| Quality Assurance and Test Automation Engineer | Test strategy, test automation, defect tracking, coverage monitoring | Test plan, unit, integration and end-to-end tests, at least 50 % unit-test coverage, SonarQube report |

## 3. Implementation responsibilities

All team members contribute code. Initial assignments:

| Team member | Implementation areas |
|---|---|
| Ali Kaan Demiralp | API skeleton, authentication and authorisation, database, session and scoring logic, Docker, CI/CD |
| Murat Yatağan | Scenario content (seed library, indicator vocabulary), administrator statistics |
| Furkan Berkay Öztürk | Administrator scenario-management interface |
| Duhan Kaan Şenol | Learner interface (scenario view, session summary, score history) |
| Erol Yağız Gemalmaz | Test suites, test tooling, SonarQube configuration |

Each member reviews at least one pull request of another member per week. Assignments may be rebalanced at Sprint Planning.

## 4. RACI matrix

R = Responsible, A = Accountable (exactly one per activity), C = Consulted, I = Informed.

Columns: **AKD** = Ali Kaan Demiralp (Lead Architect, DevOps), **MY** = Murat Yatağan (Product Owner), **FBÖ** = Furkan Berkay Öztürk (Scrum Master), **DKŞ** = Duhan Kaan Şenol (Requirements and UX), **EYG** = Erol Yağız Gemalmaz (QA).

| Activity | AKD | MY | FBÖ | DKŞ | EYG |
|---|---|---|---|---|---|
| Project proposal and problem definition | C | **A/R** | C | R | C |
| License decision record | **A/R** | C | I | I | I |
| System vision and boundary | **A/R** | C | I | C | I |
| OpenAPI contract | **A/R** | C | I | C | C |
| Role assignments and RACI | C | C | **A/R** | I | I |
| GitHub org, Git-Flow, branch protection | **A/R** | I | C | I | I |
| Product backlog, user stories, acceptance criteria | C | **A** | C | R | C |
| Backlog prioritisation, story estimation | C | **A/R** | C | C | C |
| Sprint planning, stand-up notes, retrospectives | C | C | **A/R** | I | I |
| Impediment tracking, GitHub Projects board | I | I | **A/R** | I | I |
| SRS and non-functional requirements (Sprint 2) | C | C | I | **A/R** | C |
| Figma UI/UX prototypes and user flows (Sprint 2) | C | C | I | **A/R** | C |
| C4 and UML architecture (Sprint 2) | **A/R** | I | I | C | C |
| Code review leadership, merge decisions | **A/R** | C | C | C | C |
| Backend implementation (API, DB, security) | **A/R** | I | I | I | C |
| Frontend: learner flow | C | I | I | **A/R** | C |
| Frontend: admin dashboard | C | C | **A/R** | C | C |
| Scenario content and statistics | C | **A/R** | I | C | C |
| Test plan, unit, integration, e2e tests | C | I | I | I | **A/R** |
| Coverage monitoring (≥ 50 %), defect tracking | I | I | I | I | **A/R** |
| GitHub Actions CI pipeline | **A/R** | I | I | I | C |
| Docker, docker-compose, deployment | **A/R** | I | I | I | C |
| SonarQube and tech-debt report | R | I | I | I | **A** |
| Security basics (hashing, RBAC, validation, rate limiting) | **A/R** | I | I | I | C (tests) |
| Final demo and architectural defense | **A/R** | R | R | R | R |
| Sprint submissions (evidence links, team info) | C | R | **A** | R | R |

Each activity has exactly one Accountable member. Where the Accountable member is also Responsible, another member reviews the result.

## 5. Contribution evidence

Individual contribution is evidenced through GitHub issues, commits, pull requests, code reviews, documentation, tests and presentations. Every backlog item has a named owner, every change enters through a reviewed pull request, and the Scrum Master records impediments and process decisions.
