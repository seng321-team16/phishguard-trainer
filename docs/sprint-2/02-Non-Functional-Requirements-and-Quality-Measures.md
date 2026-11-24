# Non-Functional Requirements and Quality-Measure Specification

| Field | Value |
|---|---|
| Project | PhishGuard Trainer – a phishing-awareness simulator |
| Version | 1.0 |
| Date | 2026-11-15 |
| Owner | Duhan Kaan Şenol (`ThatsKafiBRO`) – Requirements & UX Engineer |
| Team | SENG 321 – Team 16 |
| Related tasks | T-56 (this document), T-53 (SRS), T-57 (decision log), T-64 (test plan update), T-55 (architecture tactics), T-76 (security review), T-79 (as-built traceability), T-80 (usability evaluation) |
| Related stories | US-01 … US-23 (see the *Related FR / US* column of the catalogue) |
| Standard | Quality model of ISO/IEC 25010; security checklist from OWASP ASVS 4.0.3 Level 1; accessibility criteria from WCAG 2.1 level AA |

---

## About this document

The Software Requirements Specification (`01-Software-Requirements-Specification.md`, called *SRS* below) says **what** the product does. This document says **how well** it must do it and **how the team measures that**.

It has five sections and one appendix:

| Section | Content | Main reader |
|---|---|---|
| 1 | Quality model: which quality characteristics matter and why | Everyone |
| 2 | NFR catalogue: 37 non-functional requirements `NFR-01 … NFR-37` | Developers, QA |
| 3 | Quality-measure specification: formula, data source, frequency, threshold and action for every metric | QA, Scrum Master |
| 4 | Quality gates for the Sprint 3 MVP and the Final release | Whole team at sprint review |
| 5 | Traceability from each NFR to a test level and tool | QA (input for T-64) |
| Appendix A | OWASP ASVS Level 1 checklist with pass criteria | Lead Architect (input for T-76) |

### What makes a non-functional requirement testable

A requirement is testable when two people who measure it independently reach the same pass or fail result. For that it needs a **metric**, a **target value** and a **measurement method**. Every requirement in section 2 has all three.

| | Example | Why |
|---|---|---|
| Bad | "The system shall be fast and secure." | No metric, no target, no method. Nobody can show that it failed. |
| Good | "The 95th percentile response time of `startSession` shall be at most 300 ms with 20 concurrent users on the demo laptop, measured with a load test over 2 minutes." | Names what is measured, the limit, the load and the method. The result is pass or fail. |

### Conventions

- **Identifiers.** Non-functional requirements are `NFR-xx`. Functional requirements (`FR-xx`), constraints (`C-xx`), stories (`US-xx`), open issues (`OI-xx`) and data rules (`DR-x`) keep the identifiers of the SRS.
- **Wording.** Every requirement uses **shall**.
- **Technology.** The SRS is technology-neutral. This document names tools, because a measurement method needs one. The tools come from ADR-0001 (`docs/adr/0001-technology-stack.md`).
- **Owner.** The role that is accountable for meeting and reporting the requirement:

| Short | Role | Member |
|---|---|---|
| LA | Lead Architect, DevOps | Ali Kaan Demiralp |
| PO | Product Owner | Murat Yatağan |
| SM | Scrum Master | Furkan Berkay Öztürk |
| RE | Requirements & UX Engineer | Duhan Kaan Şenol |
| QA | QA / Test Automation | Erol Yağız Gemalmaz |

- **When verified.**

| Value | Meaning |
|---|---|
| PR | Checked by the reviewer of a pull request (reading the change). |
| CI | Checked automatically by the CI pipeline on every pull request and on every push to `develop` and `main`. The pipeline exists from Sprint 3 (task T-44). |
| Sprint review | Measured or demonstrated once per sprint, before the sprint submission. |
| Final | Measured once on the release candidate of the Final release (`v1.0.0`). |

- **Reference environment ("demo laptop").** The laptop used for the live demonstration, running the complete stack with `docker compose up` and the seed library, reached at `http://localhost:8080`. Its processor, memory and operating system are written in every report that contains a time measurement, so that the numbers can be compared.

---

## 1 Quality model

The team uses the product quality model of **ISO/IEC 25010**. All eight characteristics of the 2011 edition are used. The 2023 edition renames *usability* to *interaction capability* and *portability* to *flexibility*; this document keeps the better-known 2011 names and gives the 2023 name in brackets where it differs.

| # | Characteristic | Sub-characteristics used | Why it matters for PhishGuard Trainer | NFRs |
|---|---|---|---|---|
| 1 | Functional suitability | Functional completeness, functional correctness | A training tool that gives a wrong verdict or a wrong score teaches the wrong lesson. The Must requirements must all be there and must behave as the API contract says. | NFR-01, NFR-02 |
| 2 | Performance efficiency | Time behaviour | A session is ten quick decisions. If each answer takes seconds, the learner loses focus and the live demo looks broken. The load is small (a class, not the internet), so the targets are modest but fixed. | NFR-03, NFR-04 |
| 3 | Compatibility | Interoperability, co-existence | The user interface and the API are built in parallel against one contract, so they must fit together without surprises. The stack must also start on a grader's machine without fighting over ports. | NFR-05, NFR-06 |
| 4 | Usability (interaction capability) | Learnability, operability, user-interface clarity, accessibility | The primary user is not a security specialist and gets no training. If the first session is not finished in a few minutes, the product has failed its purpose. Accessibility is part of basic good practice. | NFR-07 … NFR-14 |
| 5 | Reliability | Availability, recoverability, maturity | The product is graded in a live demonstration that starts from one command. It must come up every time, and a restart must not delete score history. | NFR-15, NFR-16, NFR-17 |
| 6 | Security | Confidentiality, integrity, authenticity, accountability | A security-awareness product that is itself insecure loses all credibility. It stores passwords and results, has two roles, and shows text written by other people. | NFR-18 … NFR-28 |
| 7 | Maintainability | Testability, analysability, modifiability | Five people change the same code for ten weeks. The course also requires at least 50 % unit-test coverage and a static-analysis report. | NFR-29 … NFR-34 |
| 8 | Portability (flexibility) | Adaptability, installability | Learners use different browsers and screen sizes. The grader installs the product on a machine the team has never seen. | NFR-35, NFR-36, NFR-37 |

**Priorities.** When two characteristics conflict, the order is: security, then functional suitability, then usability, then the rest. Example: password hashing is deliberately slow, so login is excluded from the response-time target (NFR-03) instead of weakening the hash.

**Not used.** The 2023 edition adds *safety*. It is not used: the product is a simulator that controls no physical process and cannot harm people or property (constraint C-06).

---

## 2 NFR catalogue

### 2.1 How to read the catalogue

The catalogue has ten attributes per requirement. To keep it readable on a page it is printed as two tables with the same rows:

- **2.2 Requirements** – identifier, characteristic and sub-characteristic, the requirement statement, the owner and the related functional requirements and stories.
- **2.3 Measurement** – identifier, metric, target value, measurement method, tool and when it is verified.

Every target is a number or a yes/no result. The formulas behind the metrics are in section 3.

### 2.2 Requirements

| ID | Characteristic / sub-characteristic | Requirement | Owner | Related FR / US |
|---|---|---|---|---|
| NFR-01 | Functional suitability / completeness | Every functional requirement with priority Must shall have passing verification evidence (test, inspection or demonstration, as named in the SRS) at each release. | PO | FR-01 … FR-78 (Must); US-01 … US-20 |
| NFR-02 | Functional suitability / correctness | Every response of the API shall conform to the API contract `api/openapi.yaml` (status code, content type and body schema). | LA | FR-17, FR-18, C-03; US-05, US-21 |
| NFR-03 | Performance efficiency / time behaviour | The API shall answer the operations `startSession`, `submitAnswer` and `completeSession` with a 95th percentile response time of at most 300 ms each, with 20 concurrent users on the demo laptop. | QA | FR-28, FR-33, FR-40; US-08, US-10, US-11 |
| NFR-04 | Performance efficiency / time behaviour | The user interface shall finish the initial load of the login screen within 2 seconds on `localhost`. | RE | FR-69; US-09, US-18 |
| NFR-05 | Compatibility / interoperability | The API contract shall be a valid OpenAPI document that passes the contract linter without errors, and the mock server shall answer every operation of the contract. | LA | FR-80, FR-81, C-03; US-21 |
| NFR-06 | Compatibility / co-existence | The running stack shall publish exactly one host port, 8080; the data store and the API shall not be reachable from the host directly. | LA | FR-69; US-18 |
| NFR-07 | Usability / learnability | A new user shall be able to register, complete a first session of 10 scenarios and see the score within 5 minutes, without help. | RE | FR-01, FR-28, FR-43, FR-47; US-01, US-08, US-10, US-12 |
| NFR-08 | Usability / operability | The user interface shall reach a System Usability Scale (SUS) score of at least 70, measured with at least 5 classmates who are not team members. | RE | FR-44, FR-47; US-09, US-12 |
| NFR-09 | Usability / user-interface clarity | After a verdict is submitted, the feedback (result, correct verdict, indicators and explanation) shall be completely visible without scrolling at a viewport of 1366×768. | RE | FR-34, FR-43; US-10 |
| NFR-10 | Usability / accessibility | Text and meaningful interface elements shall have a colour contrast of at least 4.5:1 against their background (WCAG 2.1 criterion 1.4.3). | RE | FR-44, FR-58; US-09, US-15 |
| NFR-11 | Usability / accessibility | Every function of the user interface shall be operable with the keyboard alone, with no keyboard trap (WCAG 2.1 criteria 2.1.1 and 2.1.2). | RE | FR-43, FR-59, FR-60; US-10, US-15 |
| NFR-12 | Usability / accessibility | Every input, button and other interactive control shall have a label that assistive technology can read (WCAG 2.1 criteria 1.3.1, 3.3.2 and 4.1.2). | RE | FR-01, FR-59; US-01, US-15 |
| NFR-13 | Usability / accessibility | Every interactive control shall show a visible focus indicator when it has keyboard focus (WCAG 2.1 criterion 2.4.7). | RE | FR-43, FR-59; US-10, US-15 |
| NFR-14 | Usability / accessibility | Every screen shall pass an automated accessibility scan for WCAG 2.1 level A and AA rules with no violation of impact *serious* or *critical*. | QA | FR-44, FR-46, FR-58; US-09, US-15, US-20 |
| NFR-15 | Reliability / availability | On a clean machine, `docker compose up` shall bring the complete stack (data store, API, user interface, seed data) to a healthy state within 3 minutes. | LA | FR-24, FR-68, FR-71, C-01; US-06, US-18 |
| NFR-16 | Reliability / recoverability | Stored accounts, sessions, answers and results shall survive a restart of the API and a stop and start of the whole stack. | LA | FR-68, DR-6; US-18 |
| NFR-17 | Reliability / maturity | A release shall contain no known unresolved defect of severity Critical or High (severities as defined in the test plan). | QA | FR-76; US-20 |
| NFR-18 | Security / confidentiality | Passwords shall be stored only as Argon2id hashes with a per-password salt, and a password shall never appear in a response or in a log. | LA | FR-05, C-08, DR-2; US-01 |
| NFR-19 | Security / confidentiality | The repository, including its history and the built images, shall contain no secret (password, signing key, connection string with real credentials). | LA | FR-63, FR-70, C-11; US-17, US-18 |
| NFR-20 | Security / authenticity and integrity | Every operation under `/admin` shall be refused with 403 for a logged-in learner and with 401 for a caller without a valid token. The role shall be checked on the server. | LA | FR-08, FR-11, FR-12; US-02, US-03 |
| NFR-21 | Security / confidentiality | A user shall never be able to read, answer or complete a session or result that belongs to another user (no insecure direct object reference). | LA | FR-13, FR-36, FR-42, FR-49; US-03, US-10, US-11, US-13 |
| NFR-22 | Security / integrity | After the 5th failed login within 60 seconds for the same client address and account, the system shall answer every further login attempt in that window with 429 and a `Retry-After` header in whole seconds. The limit shall come from the configuration value `LOGIN_RATE_LIMIT_PER_MINUTE`. | LA | FR-14, FR-15; US-04 |
| NFR-23 | Security / confidentiality | No response shall contain a stack trace, a data-store error message, a file-system path or another internal detail; every error shall be `application/problem+json`. | LA | FR-18, FR-19; US-05 |
| NFR-24 | Security / integrity | Scenario content and every other user-supplied text shall be shown as escaped plain text; injected markup or script shall never be executed or become part of the page structure. | RE | FR-20, FR-45; US-05, US-09 |
| NFR-25 | Security / integrity | Every HTTP response shall carry the agreed security headers, shall not reveal the server technology, and cross-origin requests shall be allowed only from the web origin. | LA | FR-19; US-05, US-18 |
| NFR-26 | Security / integrity | The production dependencies shall have no known vulnerability of severity high or critical. | LA | FR-74; US-22 |
| NFR-27 | Security / confidentiality | The answer key of a scenario (correct verdict, indicators, explanation) shall not be sent to a learner before the learner has submitted a verdict for that scenario. | LA | FR-31, DR-8; US-08 |
| NFR-28 | Security / all sub-characteristics | The product shall pass every applicable OWASP ASVS 4.0.3 Level 1 item listed in Appendix A. | LA | FR-05 … FR-20; US-01 … US-05 |
| NFR-29 | Maintainability / testability | The unit tests shall cover at least 50 % of the lines of the API and the web application together, and the CI pipeline shall fail below that value. | QA | FR-73, C-02; US-19, US-20 |
| NFR-30 | Maintainability / analysability | The static analysis shall report no open issue of severity blocker or critical. | QA | FR-79; US-23 |
| NFR-31 | Maintainability / modifiability | Duplicated lines shall be at most 3 % of all lines. | QA | FR-79; US-23 |
| NFR-32 | Maintainability / analysability | The maintainability rating of the static analysis shall be A. | LA | FR-79; US-23 |
| NFR-33 | Maintainability / modifiability | The technical-debt ratio shall be at most 5 %. | LA | FR-79; US-23 |
| NFR-34 | Maintainability / analysability | The code shall pass the linter, the format check and the strict type check without errors on every pull request. | LA | FR-72; US-19 |
| NFR-35 | Portability / adaptability | The main learner journey (register, log in, complete a session, see the score, see the history) shall work in the latest stable versions of Chrome, Firefox and Edge. | QA | FR-46; US-09, US-20 |
| NFR-36 | Portability / adaptability | Every screen shall be usable without horizontal scrolling at the viewports 390×844 (phone) and 1366×768 (laptop). | RE | FR-46; US-09 |
| NFR-37 | Portability / installability | The product shall install and start on Windows and on Linux with Docker and Git as the only prerequisites, with no manual step other than copying `.env.example` to `.env` and running one command. | LA | FR-68, FR-70, C-01; US-18 |

### 2.3 Measurement

| ID | Metric | Target | Measurement method | Tool | When verified |
|---|---|---|---|---|---|
| NFR-01 | Share of Must FRs with passing evidence | 100 % | Acceptance walkthrough against the refined backlog; as-built traceability matrix | Checklist in T-71 (Sprint 3) and T-79 (Final); CI test report | Sprint review, Final |
| NFR-02 | Number of responses in the integration test suite that fail contract validation | 0 | Integration tests run with response validation switched on; any response that breaks the contract fails the test | Vitest + Supertest, `express-openapi-validator` | CI |
| NFR-03 | 95th percentile response time per operation; share of failed requests | ≤ 300 ms per operation; < 1 % failed | Load test: 20 virtual users, each repeats start → 10 answers → complete for 2 minutes; users log in before the measurement starts | k6 (`grafana/k6` container) | Sprint review (Sprint 3, for information), Final |
| NFR-04 | Time from navigation start to the end of the load event, median of 5 cold-cache runs | ≤ 2 000 ms | Scripted browser run against the production build at `http://localhost:8080`, viewport 1366×768 | Playwright (Navigation Timing) | Final |
| NFR-05 | Number of linter errors; share of contract operations answered by the mock | 0 errors; 14 of 14 operations | Contract lint; mock smoke call for each operation | Spectral (`npm run lint:api`), Prism (`npm run mock`) | CI (lint), Sprint review (mock) |
| NFR-06 | Number of host ports published by the default stack | 1 (port 8080) | Inspection of the running stack and of the Compose file | `docker compose ps`, `docker compose config` | PR, Final |
| NFR-07 | Median time on task; share of participants who finish without help | ≤ 5 min; ≥ 80 % | Moderated usability test with at least 5 first-time users, timed from opening the registration screen to the score being shown | Stopwatch or screen recording (T-80) | Final |
| NFR-08 | Mean SUS score; number of participants | ≥ 70; ≥ 5 | Standard 10-item SUS questionnaire filled in after the usability test | SUS form and spreadsheet (T-80) | Final |
| NFR-09 | Feedback panel completely inside the viewport with the page scrolled to the top | Yes, for every seed scenario | Automated test submits a verdict for each seed scenario at 1366×768 and compares the panel's bounding box with the viewport | Playwright | Sprint review (Sprint 3, by demonstration), Final |
| NFR-10 | Number of colour-contrast violations; lowest contrast ratio of the design tokens | 0; ≥ 4.5:1 | Automated scan of every screen; contrast check of the colour pairs in `web/src/styles/tokens.css` | axe (`@axe-core/playwright`), contrast checker | PR (tokens), Final (scan) |
| NFR-11 | Main learner journey and admin scenario create/edit/delete completed with keyboard only | Yes | Automated test that uses only Tab, Shift+Tab, Enter, Space and arrow keys | Playwright | Final |
| NFR-12 | Number of interactive controls without an accessible name | 0 | Automated scan (rules `label`, `button-name`, `link-name`, `select-name`); component tests select controls by label | axe, React Testing Library | CI (component tests), Final (scan) |
| NFR-13 | Number of focusable controls without a visible focus indicator | 0 | Automated test moves focus through every control and checks that the focus style differs from the unfocused style; visual check at the sprint review | Playwright, inspection | Sprint review, Final |
| NFR-14 | Number of *serious* or *critical* violations per screen | 0 | Automated scan of every screen with the WCAG 2.1 A and AA rule tags | axe (`@axe-core/playwright`) | Final |
| NFR-15 | Time from issuing the start command to all three services healthy and `GET /api/v1/health` answering 200 through port 8080 | ≤ 180 s | Timed start from a clean checkout with no containers and no data volume; images built beforehand so that download speed is not measured; the build time is recorded for information | `docker compose up -d --wait`, shell `time` | Sprint review, Final (clean machine, T-43) |
| NFR-16 | Number of test records missing after restart | 0 | Scripted check: create an account and a completed session, run `docker compose restart api`, then `docker compose down` and `up` (without `-v`), then read the history | Shell script with `curl`, Docker Compose | Sprint review, Final |
| NFR-17 | Number of open defect issues with severity Critical or High | 0 | Query of the issue tracker on the release day | GitHub Issues (`[BUG]` issues) | Sprint review, Final |
| NFR-18 | Share of stored password values that are Argon2id hashes; occurrences of the test password in responses and captured logs | 100 %; 0 | Integration test reads the stored value and checks the `$argon2id$` prefix and that two users with the same password have different hashes; it searches responses and the captured log for the password | Vitest + Supertest | CI |
| NFR-19 | Number of secrets found in the repository history; `.env` tracked by Git | 0; no | Secret scan of all commits; inspection of the tracked files and of the image contents | GitHub secret scanning with push protection, `git ls-files` | CI (every push), Final |
| NFR-20 | Share of `/admin` operations that answer 403 to a learner token and 401 without a token | 100 % (6 of 6 operations) | Integration test loops over every `/admin` operation of the contract | Vitest + Supertest | CI |
| NFR-21 | Number of cross-user requests that succeed | 0 (every request answers 403) | Integration test: user B calls `submitAnswer` and `completeSession` on a session of user A and lists results; B never sees data of A | Vitest + Supertest | CI |
| NFR-22 | Status of the 6th login attempt after 5 failures within 60 s; `Retry-After` value | 429; whole number from 1 to 60 | Integration test with a controlled clock; a second test changes `LOGIN_RATE_LIMIT_PER_MINUTE` and checks that the limit follows | Vitest + Supertest | CI |
| NFR-23 | Number of error responses that contain a stack-trace, SQL or path pattern; share of error responses with content type `application/problem+json` | 0; 100 % | Integration tests trigger 400, 401, 403, 404, 409, 422, 429 and a forced 500 and search each body for the patterns | Vitest + Supertest | CI |
| NFR-24 | Number of injected elements or executed scripts for a set of at least 5 XSS payloads; uses of `dangerouslySetInnerHTML` in the web code | 0; 0 | Component test renders each payload and checks that it appears as text and adds no element; lint rule forbids raw HTML rendering | Vitest + React Testing Library, ESLint | CI |
| NFR-25 | Required headers present on API and web responses; `X-Powered-By` present; cross-origin request from another origin allowed | 4 of 4 (see section 3, QM-25); no; no | Integration test checks the headers of an API response and a response of the web server, and sends a request with a foreign `Origin` | Vitest + Supertest, Playwright | CI (API), Final (web server) |
| NFR-26 | Number of high or critical advisories in production dependencies | 0 | Dependency audit in the pipeline | `npm audit --omit=dev --audit-level=high` | CI |
| NFR-27 | Number of answer-key fields (`isPhishing`, `indicators`, `explanation`) in the `startSession` response | 0 | Integration test inspects every scenario object of the response | Vitest + Supertest | CI |
| NFR-28 | Share of applicable ASVS Level 1 items of Appendix A that pass | 100 % | Checklist review: each item is checked by a test or by inspection and the evidence is recorded | Appendix A checklist (T-76) | Final |
| NFR-29 | Line coverage of the unit tests, API and web together | ≥ 50 % | Coverage report of the unit-test run; the pipeline compares it with the threshold | Vitest with `@vitest/coverage-v8` (lcov) | CI (from Sprint 3) |
| NFR-30 | Number of open blocker and critical issues | 0 | Static-analysis scan of the release candidate | SonarQube Community, `sonar-scanner` | Final |
| NFR-31 | Duplicated lines density | ≤ 3 % | Static-analysis scan | SonarQube | Final |
| NFR-32 | Maintainability rating | A | Static-analysis scan | SonarQube | Final |
| NFR-33 | Technical-debt ratio | ≤ 5 % | Static-analysis scan | SonarQube | Final |
| NFR-34 | Number of lint errors, format differences and type errors | 0 | Pipeline runs the three checks; a pull request cannot be merged while one fails | ESLint, Prettier, TypeScript (`npm run lint`, `format:check`, `typecheck`) | CI |
| NFR-35 | Browsers in which the main-journey end-to-end test passes | 3 of 3 | The same end-to-end test runs once per browser | Playwright (Chromium/Chrome, Firefox, Edge) | Final |
| NFR-36 | Screens with horizontal scrolling at either viewport; main journey passes at both viewports | 0; yes | End-to-end test opens every screen at both viewports and compares the page width with the viewport width | Playwright | Sprint review (Sprint 3, by demonstration), Final |
| NFR-37 | Operating systems on which the clean start succeeds; manual steps beyond `.env` and one command | ≥ 2 (Windows 11 and Ubuntu); 0 | Clean-machine start on a Windows laptop; the same start on the Linux CI runner | Docker Compose, GitHub Actions | Final (T-43) |

### 2.4 Notes on single requirements

- **NFR-03.** Login and registration are excluded from the 300 ms target on purpose: Argon2id is designed to be slow, and both operations are rate-limited (NFR-22). Their response time is reported but has no gate.
- **NFR-15.** "Clean machine" means a clean checkout, a `.env` file copied from `.env.example`, no containers and no data volume. The 3 minutes cover data-store start, migrations, seeding, API start and web start. Building the images depends on the network speed of the machine, so it is timed separately and reported, not gated. This proposes the answer to open issue OI-13.
- **NFR-22.** Attempts 1 to 5 are answered normally (401 for wrong credentials). The 6th failed attempt in the same 60-second window is the first that gets 429. Whether the window is fixed or rolling is decided in the decision log (OI-03); the target above holds for both.
- **NFR-25.** The token is kept in memory only and sent in the `Authorization` header (ADR-0003), so no cookie is used and cross-site request forgery does not apply.
- **NFR-29.** Line coverage is the metric proposed by QA in the test plan (OI-14). Generated code (`packages/contract`), configuration files and the test files themselves are not counted. Security, scoring and validation modules must not be excluded to raise the number.
- **NFR-32 and NFR-33.** SonarQube gives rating A when the technical-debt ratio is at most 5 %, so the two requirements pass or fail together. Both are listed because the course asks for the technical-debt report and the rating is what the dashboard shows.
- **NFR-35 and NFR-36.** The browsers and viewports proposed here answer open issue OI-09.

---

## 3 Quality-measure specification

One quality measure `QM-xx` per requirement; `QM-xx` measures `NFR-xx`. *Threshold* repeats the target so that this table can be used on its own. *Action* says what happens when the threshold is missed.

General rules for actions:

- A failed **CI** measure blocks the merge of the pull request. The author fixes it; nobody merges around it.
- A failed **security** measure (QM-18 … QM-28) is a defect of severity Critical or High. It blocks the release (NFR-17).
- A failed **sprint review** or **Final** measure becomes a `[BUG]` issue with an owner. The Product Owner decides with the owner whether it is fixed before the release or accepted and written into the submission document as a known limitation. Security measures cannot be accepted this way.

### 3.1 Functional suitability, performance, compatibility

| ID | Formula | Data source | Collection frequency | Threshold | Action when missed |
|---|---|---|---|---|---|
| QM-01 | (Must FRs with passing evidence ÷ all Must FRs) × 100. The SRS has 68 Must FRs. | T-71 walkthrough sheet; T-79 traceability matrix | Once per release | 100 % | Each FR without evidence becomes a defect; the PO decides fix or documented exclusion before submission. |
| QM-02 | Count of responses rejected by response validation during the integration run. | Integration test report in CI | Every pull request | 0 | Merge blocked. Fix the code; if the contract is wrong, raise a contract change with the Lead Architect. |
| QM-03 | For each of the three operations: the value below which 95 % of the response times fall, over all requests of the 2-minute run. Failed share = failed requests ÷ all requests × 100. | k6 summary export (JSON) of the run on the demo laptop | Once in Sprint 3 (for information), once on the Final release candidate | ≤ 300 ms each; < 1 % failed | Profile the slow operation (query count, missing index), fix, repeat the run. Report both runs. |
| QM-04 | Median of 5 values of `loadEventEnd − startTime` from the browser's navigation timing, each in a new browser context. | Playwright test output | Once on the Final release candidate | ≤ 2 000 ms | Check bundle size and caching headers of the web server; fix and repeat. |
| QM-05 | Count of Spectral results with severity *error*. Mock share = operations with a valid mock answer ÷ 14. | `npm run lint:api` output in CI; mock smoke run | Lint: every pull request. Mock: once per sprint | 0; 14 of 14 | Merge blocked until the contract lints. A missing mock answer is fixed in the contract examples. |
| QM-06 | Count of `host:container` port mappings of services without a profile. | `docker compose config`; `docker compose ps` | Every pull request that touches the Compose file; once at Final | 1 | Remove the extra mapping before merge. |

### 3.2 Usability and accessibility

| ID | Formula | Data source | Collection frequency | Threshold | Action when missed |
|---|---|---|---|---|---|
| QM-07 | Median of the participants' task times (registration screen opened → score shown). Share without help = participants who finished without a hint ÷ all participants × 100. | Usability session log (T-80) | Once, Final | ≤ 5 min; ≥ 80 % | List where participants lost time; fix the top problems; re-test the changed step with 2 users. |
| QM-08 | Per participant: (Σ over odd items of (answer − 1) + Σ over even items of (5 − answer)) × 2.5. Result = mean over participants. | SUS forms (T-80) | Once, Final | ≥ 70 with ≥ 5 participants | Same as QM-07; the score and the findings are reported even when the target is missed. |
| QM-09 | For each seed scenario: panel top ≥ 0 and panel bottom ≤ viewport height (768), with vertical scroll position 0. Pass when true for all. | Playwright test output | Demonstration in Sprint 3; automated at Final | Yes for all seed scenarios | Change the training layout (for example feedback beside the message, or a scrolling message body) and re-run. |
| QM-10 | Count of axe `color-contrast` violations over all screens. Token ratio = (L1 + 0.05) ÷ (L2 + 0.05) with L1 the lighter relative luminance. | axe report; token review in the pull request | Tokens: every pull request that changes colours. Scan: Final | 0; ≥ 4.5:1 | Change the token value; never fix a single screen with a local colour. |
| QM-11 | Pass when the scripted keyboard-only run reaches the session summary and completes one scenario create, edit and delete. | Playwright test output | Final | Yes | Fix the control that cannot be reached or left; add it to the test. |
| QM-12 | Count of axe violations of the rules `label`, `button-name`, `link-name`, `select-name` over all screens. | axe report; component test report | Component tests: every pull request. Scan: Final | 0 | Add the label; merge blocked for component tests. |
| QM-13 | Count of focusable elements whose computed outline or box shadow is the same with and without focus. | Playwright test output; sprint-review check | Once per sprint from Sprint 3 | 0 | Fix the global focus style in the design tokens. |
| QM-14 | Count of axe violations with impact *serious* or *critical*, rule tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, per screen. | axe report attached to the E2E report | Final (every E2E run) | 0 on every screen | Fix before release; a violation that cannot be fixed is listed with its reason in the E2E report. |

### 3.3 Reliability

| ID | Formula | Data source | Collection frequency | Threshold | Action when missed |
|---|---|---|---|---|---|
| QM-15 | Wall-clock seconds between the start of `docker compose up -d --wait` and its successful return, followed by a 200 from `http://localhost:8080/api/v1/health`. | Terminal log of the timed start | Once per sprint on the demo laptop; once on a clean machine at Final | ≤ 180 s | Find the slow step in the container logs (migration, seed, health-check interval), fix, repeat. |
| QM-16 | Count of records created before the restart (1 account, 1 completed session with 10 answers) that cannot be read afterwards. | Output of the restart script | Once per sprint from Sprint 3 | 0 | Critical defect: check the volume definition; fix before any demo. |
| QM-17 | Count of open issues labelled as bug with severity Critical or High on the release day. | GitHub Issues query | Every sprint review and at Final | 0 | No release tag until the count is 0 or the PO has lowered a severity with a written reason. |

### 3.4 Security

| ID | Formula | Data source | Collection frequency | Threshold | Action when missed |
|---|---|---|---|---|---|
| QM-18 | (Stored password values starting with `$argon2id$` ÷ all stored password values created by the test) × 100. Count of occurrences of the test password in response bodies and captured log lines. | Integration test report | Every pull request | 100 %; 0 | Merge blocked. Critical defect if found after merge. |
| QM-19 | Count of open secret-scanning alerts plus count of secrets found by inspection. `.env` tracked = `git ls-files .env` returns a line. | GitHub security tab; inspection | Every push (automatic); inspection at Final | 0; no | Revoke and replace the secret at once, then remove it from the code. History is not rewritten; the secret is treated as leaked. |
| QM-20 | (Operations under `/admin` that give 403 to a learner **and** 401 without token ÷ operations under `/admin` in the contract) × 100. | Integration test report | Every pull request | 100 % | Merge blocked. |
| QM-21 | Count of requests by user B on resources of user A that return a 2xx status or any data of A. | Integration test report | Every pull request | 0 | Merge blocked. Critical defect if found after merge. |
| QM-22 | Status code of login attempt number 6 within 60 s after 5 failures; `Retry-After` parsed as an integer. | Integration test report | Every pull request | 429; 1 ≤ value ≤ 60 | Merge blocked. |
| QM-23 | Count of error bodies matching the patterns for stack traces (`at ` followed by a file position), SQL or ORM messages, and absolute paths. Share = error responses with `application/problem+json` ÷ all error responses × 100. | Integration test report | Every pull request | 0; 100 % | Merge blocked. |
| QM-24 | Count of DOM elements created from payload text plus count of executed payload scripts, over the payload set. Count of `dangerouslySetInnerHTML` in `web/src`. | Component test report; ESLint output | Every pull request | 0; 0 | Merge blocked. |
| QM-25 | Count of required headers present: `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, frame protection (`X-Frame-Options` or CSP `frame-ancestors`), `Referrer-Policy`. Also: `X-Powered-By` absent; no `Access-Control-Allow-Origin` for a foreign origin. | Integration test report (API); E2E check (web server) | API: every pull request. Web server: Final | 4 of 4; absent; not allowed | Fix the middleware or web-server configuration; High defect if found at Final. |
| QM-26 | Count of advisories with severity high or critical reported for production dependencies. | `npm audit` output in CI | Every pull request and weekly through the dependency-update checks | 0 | Update or replace the package. If no fix exists, the Lead Architect records the risk and the reason in the pull request. |
| QM-27 | Count of scenario objects in the `startSession` response that contain `isPhishing`, `indicators` or `explanation`. | Integration test report | Every pull request | 0 | Merge blocked. Critical defect if found after merge. |
| QM-28 | (Appendix A items with result *pass* ÷ applicable Appendix A items) × 100. | Completed checklist in the security review (T-76) | Once, Final | 100 % | Each failed item is fixed and re-checked before the release tag. |

### 3.5 Maintainability and portability

| ID | Formula | Data source | Collection frequency | Threshold | Action when missed |
|---|---|---|---|---|---|
| QM-29 | (Lines executed by the unit tests ÷ executable lines) × 100, over the merged lcov reports of `api` and `web`. The value of each workspace is also reported. | `coverage/` lcov output of `npm run test:coverage` in CI | Every pull request (gate from Sprint 3) | ≥ 50 % | Merge blocked. The author adds tests for the changed code; lowering the threshold or excluding files needs a decision of the whole team. |
| QM-30 | Count of open issues with severity blocker or critical on the SonarQube project. | SonarQube dashboard and exported report | Once in Sprint 3 (for information), at Final | 0 | Fix (T-75). A false positive is marked in SonarQube with a written reason. |
| QM-31 | (Duplicated lines ÷ all lines) × 100, SonarQube measure `duplicated_lines_density`. | SonarQube | As QM-30 | ≤ 3 % | Extract the repeated code into a shared module. |
| QM-32 | SonarQube maintainability rating (A when the technical-debt ratio is ≤ 5 %). | SonarQube | As QM-30 | A | Work off the code smells with the highest remediation time first (T-75). |
| QM-33 | (Estimated time to fix all code smells ÷ estimated time to write the code) × 100, SonarQube measure `sqale_debt_ratio`. | SonarQube | As QM-30 | ≤ 5 % | As QM-32; the ratio before and after is written in the technical-debt report. |
| QM-34 | Count of ESLint errors + files that differ from the Prettier format + TypeScript errors. | CI job output | Every pull request | 0 | Merge blocked. A disabled lint rule needs a comment that says why. |
| QM-35 | Count of browsers (Chrome, Firefox, Edge) in which the main-journey test passes. | Playwright report, one project per browser | Final (every E2E run) | 3 of 3 | Fix the browser-specific problem; no browser is dropped without a team decision. |
| QM-36 | Count of screens where the page's scroll width is larger than the viewport width, at 390×844 and at 1366×768. | Playwright report | Demonstration in Sprint 3; automated at Final | 0 | Fix the layout of the screen. |
| QM-37 | Count of operating systems with a successful clean start; count of extra manual steps written down by the tester. | Clean-machine report (T-43); CI Docker job | Final | ≥ 2; 0 | Add the missing step to the automation, not to the README. |

---

## 4 Quality gates per milestone

A gate is passed only when every item marked **required** is ticked. Items marked *reported* are measured and written into the submission document but do not block the milestone. The Scrum Master runs the checklist at the sprint review; the owner of each requirement brings the evidence.

### 4.1 Sprint 3 – MVP (`v0.3.0`)

| Done | Gate item | NFR | Pass criterion | Status | Evidence |
|---|---|---|---|---|---|
| [ ] | Must requirements accepted | NFR-01 | 100 % of Must FRs pass the walkthrough | required | T-71 walkthrough |
| [ ] | Contract conformance | NFR-02, NFR-05 | 0 validation failures; 0 lint errors | required | CI run |
| [ ] | Lint, format, type check | NFR-34 | 0 errors | required | CI run |
| [ ] | Unit-test coverage | NFR-29 | ≥ 50 % lines | required | CI coverage report |
| [ ] | Password storage | NFR-18 | 100 % Argon2id; 0 leaks | required | CI test report |
| [ ] | No secrets in the repository | NFR-19 | 0 secrets; `.env` not tracked | required | Secret-scanning page |
| [ ] | Role checks and IDOR denial | NFR-20, NFR-21 | 6 of 6 admin operations refused; 0 cross-user successes | required | CI test report |
| [ ] | Login rate limit | NFR-22 | 6th attempt 429 with `Retry-After` | required | CI test report |
| [ ] | Safe errors and escaping | NFR-23, NFR-24 | 0 internal details; 0 injected elements | required | CI test report |
| [ ] | Answer key not leaked | NFR-27 | 0 answer-key fields | required | CI test report |
| [ ] | Dependency audit | NFR-26 | 0 high or critical | required | CI run |
| [ ] | One-command start and one port | NFR-06, NFR-15 | Healthy in ≤ 180 s; 1 port | required | Timed start on the demo laptop |
| [ ] | Data survives restart | NFR-16 | 0 records lost | required | Restart script output |
| [ ] | No Critical or High defect open | NFR-17 | 0 | required | Issue query |
| [ ] | Viewports and feedback position | NFR-09, NFR-36 | No horizontal scroll at both viewports; feedback visible at 1366×768 | required (by demonstration in Chrome) | Sprint review demo |
| [ ] | Keyboard, labels, focus, contrast | NFR-10 … NFR-13 | Checked by hand on the main journey | reported | Sprint review notes |
| [ ] | Response time | NFR-03 | p95 ≤ 300 ms | reported | k6 summary |
| [ ] | Security headers | NFR-25 | 4 of 4 headers | reported | CI test report |
| [ ] | Static analysis, first scan | NFR-30 … NFR-33 | Values recorded | reported | SonarQube dashboard |

Not measured at this milestone: NFR-04, NFR-07, NFR-08, NFR-14, NFR-28, NFR-35, NFR-37 (they need the end-to-end tests, the usability evaluation or the security review of the Final sprint).

### 4.2 Final (`v1.0.0`)

All 37 requirements are required.

| Done | Gate item | NFR | Pass criterion | Evidence |
|---|---|---|---|---|
| [ ] | Must requirements verified as built | NFR-01 | 100 % of Must FRs | Traceability matrix (T-79) |
| [ ] | Contract conformance and mock | NFR-02, NFR-05 | 0 failures; 0 lint errors; 14 of 14 operations mocked | CI run |
| [ ] | Response time under load | NFR-03 | p95 ≤ 300 ms for the three operations; < 1 % failed | k6 summary |
| [ ] | Initial page load | NFR-04 | ≤ 2 000 ms median | E2E report |
| [ ] | One port, clean start, restart | NFR-06, NFR-15, NFR-16 | 1 port; ≤ 180 s; 0 records lost | Clean-machine report (T-43) |
| [ ] | First session within 5 minutes | NFR-07 | Median ≤ 5 min; ≥ 80 % without help | Usability evaluation (T-80) |
| [ ] | SUS score | NFR-08 | ≥ 70 from ≥ 5 participants | Usability evaluation (T-80) |
| [ ] | Feedback visible without scrolling | NFR-09 | Yes for every seed scenario | E2E report |
| [ ] | Accessibility | NFR-10 … NFR-14 | 0 serious or critical violations; keyboard journey passes; 0 unlabelled controls; 0 controls without focus style; contrast ≥ 4.5:1 | E2E report with axe results |
| [ ] | No Critical or High defect open | NFR-17 | 0 | Issue query |
| [ ] | Security tests | NFR-18, NFR-20 … NFR-24, NFR-27 | All thresholds of QM-18, QM-20 … QM-24, QM-27 | CI test report, integration test report (T-74) |
| [ ] | No secrets | NFR-19 | 0 secrets | Secret-scanning page, inspection |
| [ ] | Security headers and CORS | NFR-25 | 4 of 4 headers on API and web; no foreign origin | Integration and E2E report |
| [ ] | Dependency audit | NFR-26 | 0 high or critical | CI run |
| [ ] | ASVS Level 1 checklist | NFR-28 | 100 % of applicable items pass | Security review (T-76) |
| [ ] | Unit-test coverage | NFR-29 | ≥ 50 % lines | CI coverage report |
| [ ] | SonarQube quality gate | NFR-30 … NFR-33 | 0 blocker/critical; duplication ≤ 3 %; rating A; debt ratio ≤ 5 % | SonarQube report (T-50, T-75) |
| [ ] | Lint, format, type check | NFR-34 | 0 errors | CI run |
| [ ] | Browsers and viewports | NFR-35, NFR-36 | 3 of 3 browsers; 0 screens with horizontal scroll | E2E report (T-47) |
| [ ] | Installability | NFR-37 | Clean start on Windows 11 and Ubuntu; 0 extra steps | Clean-machine report (T-43), CI Docker job |

---

## 5 Traceability: NFR → test level and tool

The test levels are those of the test plan (`docs/qa/Test-Plan.md`, section 4), with three additions needed for non-functional checks: *Performance*, *Usability evaluation* and *Review* (a checklist or inspection). QA uses this table to build the NFR verification matrix of task T-64 and adds the test file locations there.

| NFR | Test level | Tool | Planned in task | First milestone |
|---|---|---|---|---|
| NFR-01 | Review (acceptance walkthrough, traceability) | Checklist, CI reports | T-71, T-79 | Sprint 3 |
| NFR-02 | Integration/API, Contract | Vitest + Supertest, `express-openapi-validator` | T-12, T-74 | Sprint 3 |
| NFR-03 | Performance | k6 | To be scheduled in T-64 (with T-74) | Final |
| NFR-04 | End-to-end | Playwright | T-47 | Final |
| NFR-05 | Contract | Spectral, Prism | T-48 (done), T-44 | Sprint 3 |
| NFR-06 | Smoke/deployment, Review | Docker Compose | T-42 (done), T-43 | Sprint 3 |
| NFR-07 | Usability evaluation | Timed task, screen recording | T-80 | Final |
| NFR-08 | Usability evaluation | SUS questionnaire | T-80 | Final |
| NFR-09 | End-to-end | Playwright | T-23 (layout), T-47 (test) | Sprint 3 |
| NFR-10 | End-to-end (accessibility scan), Review | axe, contrast checker | T-54 (tokens), T-47 | Final |
| NFR-11 | End-to-end | Playwright (keyboard only) | T-47 | Final |
| NFR-12 | UI/component, End-to-end (accessibility scan) | React Testing Library, axe | T-03, T-06, T-36 (components), T-47 | Sprint 3 |
| NFR-13 | End-to-end, Review | Playwright, inspection | T-69 (focus style), T-47 | Sprint 3 |
| NFR-14 | End-to-end (accessibility scan) | axe (`@axe-core/playwright`) | T-47 | Final |
| NFR-15 | Smoke/deployment | Docker Compose, shell `time` | T-43 | Sprint 3 |
| NFR-16 | Smoke/deployment | Shell script, `curl`, Docker Compose | T-43 | Sprint 3 |
| NFR-17 | Review | GitHub Issues | T-72 (Sprint 3 submission), T-89 (Final submission) | Sprint 3 |
| NFR-18 | Integration/API | Vitest + Supertest | T-04 | Sprint 3 |
| NFR-19 | Static analysis, Review | GitHub secret scanning, `git ls-files` | T-76 | Sprint 3 |
| NFR-20 | Integration/API | Vitest + Supertest | T-09 | Sprint 3 |
| NFR-21 | Integration/API | Vitest + Supertest | T-09, T-26 | Sprint 3 |
| NFR-22 | Integration/API | Vitest + Supertest | T-11 | Sprint 3 |
| NFR-23 | Integration/API | Vitest + Supertest | T-14 | Sprint 3 |
| NFR-24 | UI/component, Static analysis (lint) | Vitest + React Testing Library, ESLint | T-14 | Sprint 3 |
| NFR-25 | Integration/API, End-to-end | Vitest + Supertest, Playwright | T-74, T-76 | Final |
| NFR-26 | Static analysis (dependency audit) | `npm audit` | T-49 | Sprint 3 |
| NFR-27 | Integration/API | Vitest + Supertest | T-21 | Sprint 3 |
| NFR-28 | Review (security checklist) | Appendix A checklist | T-76 | Final |
| NFR-29 | Unit | Vitest, `@vitest/coverage-v8` | T-45, T-70 | Sprint 3 |
| NFR-30 | Static analysis | SonarQube, `sonar-scanner` | T-50, T-75 | Final |
| NFR-31 | Static analysis | SonarQube | T-50, T-75 | Final |
| NFR-32 | Static analysis | SonarQube | T-50, T-75 | Final |
| NFR-33 | Static analysis | SonarQube | T-50, T-75 | Final |
| NFR-34 | Static analysis (lint, types) | ESLint, Prettier, TypeScript | T-44 | Sprint 3 |
| NFR-35 | End-to-end | Playwright (three browser projects) | T-47 | Final |
| NFR-36 | End-to-end | Playwright (two viewport projects) | T-23 (layout), T-47 (test) | Sprint 3 |
| NFR-37 | Smoke/deployment | Docker Compose, GitHub Actions | T-43, T-44 | Final |

### 5.1 Coverage of the quality model

| Characteristic | NFRs | Count |
|---|---|---|
| Functional suitability | NFR-01, NFR-02 | 2 |
| Performance efficiency | NFR-03, NFR-04 | 2 |
| Compatibility | NFR-05, NFR-06 | 2 |
| Usability (including accessibility) | NFR-07 … NFR-14 | 8 |
| Reliability | NFR-15, NFR-16, NFR-17 | 3 |
| Security | NFR-18 … NFR-28 | 11 |
| Maintainability | NFR-29 … NFR-34 | 6 |
| Portability | NFR-35, NFR-36, NFR-37 | 3 |
| **Total** | | **37** |

Checks done on this version:

| Check | Result |
|---|---|
| Every characteristic of section 1 has at least one NFR. | Pass – 8 of 8. |
| Every NFR has a metric, a numeric or yes/no target, a named measurement method and a tool. | Pass – 37 of 37 (section 2.3). |
| Every NFR has a quality measure with formula, data source, frequency, threshold and action. | Pass – 37 of 37 (section 3). |
| Every NFR traces to at least one story. | Pass – 37 of 37 (section 2.2). |
| Every NFR has a test level and a tool. | Pass – 37 of 37 (section 5). |
| Thresholds agree with the project conventions: coverage ≥ 50 % lines, address `http://localhost:8080`, viewports 390×844 and 1366×768, contrast ≥ 4.5:1. | Pass. |

### 5.2 Open issues of the SRS that this document touches

The values below are the proposal of this document. The Product Owner confirms or changes them in the decision log (T-57); if a value changes, this document is updated in the same step as the SRS (T-58).

| Open issue | Proposal here | NFR |
|---|---|---|
| OI-03 (rate-limit trigger and window) | The 6th failed attempt within 60 s gets 429. | NFR-22 |
| OI-09 (viewports and browsers) | 390×844 and 1366×768; latest Chrome, Firefox, Edge. | NFR-35, NFR-36 |
| OI-13 (start-up time) | Healthy within 180 s, image build excluded. | NFR-15 |
| OI-14 (coverage metric) | Line coverage, API and web together, ≥ 50 %. | NFR-29 |
| OI-17 (static-analysis gate) | 0 blocker/critical, duplication ≤ 3 %, rating A, debt ratio ≤ 5 %; required for the Final release. | NFR-30 … NFR-33 |

---

## Appendix A – OWASP ASVS 4.0.3 Level 1 checklist

This appendix is the checklist behind NFR-28. It lists the Level 1 items of the OWASP Application Security Verification Standard 4.0.3 that apply to PhishGuard Trainer, each with the criterion that counts as a pass. The item text is shortened; the security review (T-76) reads each item in the published standard before it records the result. Two Level 2 items are included on purpose and marked *(L2)*, because the product already promises them.

### A.1 Applicable items

| ASVS item | Requirement (short) | Pass criterion for this product | Related NFR / FR |
|---|---|---|---|
| V2.1.1 | Passwords are at least 12 characters long. | Registration with an 11-character password answers 400. | FR-01, FR-04 |
| V2.1.2 | Passwords of 64 characters or more are allowed; more than 128 may be refused. | A 128-character password is accepted; 129 characters answer 400. | FR-01 |
| V2.1.3 | Passwords are not truncated. | Login with the first 127 characters of a 128-character password answers 401. | FR-05 |
| V2.1.9 | No rules that limit the type of characters. | A password of 12 lower-case letters and one with spaces and Unicode are both accepted. | FR-01 |
| V2.2.1 | Anti-automation controls protect against password guessing. | QM-22 passes. | NFR-22 |
| V2.4.1 *(L2)* | Passwords are stored with an approved, salted hashing function. | QM-18 passes (Argon2id). | NFR-18 |
| V3.1.1 | Session tokens never appear in URLs. | No route of the contract takes a token as a path or query parameter; the web code never builds such a URL. | DR-2 |
| V3.5.3 *(L2)* | Stateless tokens are protected by a signature. | A token with a changed payload, with algorithm `none` or signed with another key answers 401. | FR-08 |
| V4.1.1 | Access control is enforced on the server. | QM-20 passes with requests sent directly to the API, without the user interface. | NFR-20 |
| V4.1.2 | Attributes used for access control cannot be changed by the user. | A `role` field in the registration body is rejected with 400; the role comes only from the signed token. | FR-12, FR-17 |
| V4.1.3 | Least privilege: users reach only what their role allows. | A learner token gets 403 on all 6 admin operations. | NFR-20 |
| V4.1.5 | Access control fails securely. | A missing, malformed or expired token answers 401 on every protected operation; an error in the check never grants access. | FR-08 |
| V4.2.1 | Protection against insecure direct object references. | QM-21 passes. | NFR-21 |
| V4.2.2 | Protection against cross-site request forgery. | Authentication uses only the `Authorization` header; the API sets no authentication cookie. | NFR-25 |
| V5.1.2 | Protection against mass assignment. | A request body with an unknown field answers 400. | FR-17 |
| V5.1.3 | All input is validated against an allow list. | Every operation validates path, query and body against the contract; a wrong type and an over-length value answer 400. | NFR-02, FR-17 |
| V5.1.4 | Structured data is validated against a schema. | Same test set as V5.1.3, plus an unknown indicator code answers 400. | FR-27 |
| V5.3.3 | Output escaping protects against stored and reflected XSS. | QM-24 passes. | NFR-24 |
| V5.3.4 | Database queries are parameterised. | All data access goes through the ORM; a search of the API code finds no query built by joining strings; a login with `' OR '1'='1` answers 401. | NFR-23 |
| V7.1.1 | Credentials and tokens are not logged. | QM-18 passes for passwords; the captured log of a login contains no token. | NFR-18, DR-2 |
| V7.4.1 | A generic message is shown for unexpected errors. | QM-23 passes, including the forced 500. | NFR-23 |
| V8.2.2 | No sensitive data in browser storage. | After login, `localStorage`, `sessionStorage` and cookies contain no token (ADR-0003: memory only). | DR-2 |
| V8.3.1 | Sensitive data is sent in the body or headers, not in the URL. | Credentials are sent only in the body of `POST` requests. | DR-2 |
| V9.1.1 | TLS is used for all client connections. | The deployment guide requires HTTPS in front of the application for any deployment that is not `localhost`; the demo on `localhost` is the stated exception. | SRS 3.3 |
| V10.3.2 | The application loads no code from untrusted sources. | The built web application loads scripts and styles only from its own origin; the CSP has no third-party script source. | NFR-25 |
| V13.1.3 | API URLs do not expose sensitive information. | No token, password or email address in any path or query parameter of the contract. | DR-2 |
| V13.2.1 | Only the intended HTTP methods are enabled. | A method that the contract does not define for a path answers 405 or 404, never 200. | NFR-02 |
| V13.2.2 | JSON schema validation happens before input is accepted. | Same test set as V5.1.3. | FR-17 |
| V14.2.1 | All components are up to date; a dependency checker is used. | QM-26 passes; dependency-update checks are switched on. | NFR-26 |
| V14.3.2 | Debug modes are switched off in production. | The production images run with `NODE_ENV=production`; no source maps with secrets and no debug route are served. | NFR-23 |
| V14.3.3 | HTTP headers do not reveal detailed version information. | No `X-Powered-By`; the web server sends no version number. | NFR-25 |
| V14.4.1 | Every response has a `Content-Type` with a safe character set. | JSON responses are `application/json` or `application/problem+json`; HTML is `text/html; charset=utf-8`. | NFR-02 |
| V14.4.3 | A Content Security Policy is in place. | The header is present and allows scripts only from the own origin. | NFR-25 |
| V14.4.4 | `X-Content-Type-Options: nosniff` is sent. | Header present on every response. | NFR-25 |
| V14.4.5 | `Strict-Transport-Security` is sent. | Header present on API responses; it takes effect only behind HTTPS. | NFR-25 |
| V14.4.6 | A suitable `Referrer-Policy` is sent. | Header present with a value that sends no full URL to other origins. | NFR-25 |
| V14.4.7 | The content cannot be embedded in another site. | `X-Frame-Options` or CSP `frame-ancestors` is present. | NFR-25 |
| V14.5.3 | The CORS `Access-Control-Allow-Origin` header uses a strict allow list. | A request with a foreign `Origin` gets no allow header; `*` and `null` are never sent. | NFR-25 |

### A.2 Level 1 items that are not applicable or are accepted gaps

The review must not hide what is not met. These items are outside the MVP; each has a reason.

| ASVS item | Requirement (short) | Status | Reason |
|---|---|---|---|
| V2.1.5, V2.1.6 | Users can change their password. | Accepted gap | The contract has no change-password operation. The Could-have password reset (US-24) would cover part of it. |
| V2.1.7 | New passwords are checked against a list of breached passwords. | Accepted gap | Needs an external service or a large local list; outside the scope fixed by C-05 and C-09. |
| V2.5.x | Credential recovery. | Not applicable unless US-24 is built | If US-24 is built, the reset token is single-use and short-lived, and the message goes only to the local stub. |
| V3.3.1 | Logout invalidates the session on the server. | Accepted gap | ADR-0003: stateless token, logout discards it on the client; the token lives at most 60 minutes. |
| V4.3.1 | Administrative interfaces use multi-factor authentication. | Accepted gap | Local accounts only (C-09); the installation must not hold real data (DR-10). |
| V12.x | File upload and download. | Not applicable | The product handles no files. |
| V13.3.x, V13.4.x | SOAP and GraphQL. | Not applicable | The API is REST only. |

---

## Appendix B – Revision history

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-11-15 | Duhan Kaan Şenol | First version for Sprint 2 (task T-56). |
