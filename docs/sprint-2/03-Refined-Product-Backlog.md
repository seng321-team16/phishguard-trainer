# Refined Product Backlog

| Field | Value |
|---|---|
| Project | PhishGuard Trainer – a phishing-awareness simulator |
| Version | 2.0 (version 1.0 is the Sprint 1 Initial Product Backlog) |
| Date | 2026-11-15 |
| Owner | Duhan Kaan Şenol (`ThatsKafiBRO`) – Requirements & UX Engineer |
| Team | SENG 321 – Team 16 |
| Related tasks | T-58 (this document), T-53 (SRS), T-56 (non-functional requirements), T-57 (decision log), T-64 (test plan update), T-71 (MVP acceptance walkthrough), T-79 (as-built traceability) |
| Related stories | US-01 … US-25 (all stories) |

---

## 1 About this document

This is the product backlog after refinement. The Sprint 1 backlog ([`06-Initial-Product-Backlog.md`](../sprint-1/06-Initial-Product-Backlog.md)) stays unchanged as history.

**What "refined" means here.**

- The **structure is kept**: the same epics, features, story identifiers, story points, priorities and owners as in Sprint 1.
- Every **acceptance criterion is rewritten** in Given / When / Then form, so that it names a starting state, one action and one result that can be observed.
- Every vague point that the QA review found ([`Acceptance-Criteria-Review.md`](../qa/Acceptance-Criteria-Review.md)) is replaced by the rule that the Product Owner decided in the decision log ([`decision-log.md`](../process/decision-log.md), decisions D-01 … D-19).
- Every story is **linked to its functional requirements** (`FR-xx`) in the SRS ([`01-Software-Requirements-Specification.md`](01-Software-Requirements-Specification.md)).
- The backlog now has a **Definition of Ready**, a **Definition of Done**, a **sprint plan** with points per sprint and per member, and a **change log** that says what changed since Sprint 1 and why.

**Reading rules.**

- **Estimates:** Fibonacci story points (1, 2, 3, 5, 8); one point is about half a working day for one person.
- **Priority:** **M**ust (needed for the MVP), **S**hould (removed first if time runs out), **C**ould (only after the MVP works).
- **Criterion identifiers:** `AC-<story>.<number>`, for example `AC-04.1` is the first criterion of US-04. Tests and the MVP walkthrough (T-71) refer to these identifiers.
- **Status codes** (201, 400, 409 …) are part of a criterion because the API contract (`api/openapi.yaml`) fixes them. Every error body is problem details (`application/problem+json`).
- If a criterion and the decision log disagree, the decision log wins and this document is corrected.

**Totals (unchanged):** Must = 73 points, Should = 16, Could = 8; 25 stories, 97 points. The security stories US-01 to US-05 are not candidates for descoping; if velocity is lower than planned, Could and then Should items are removed first.

### 1.1 How Given / When / Then becomes a test

| Part | Meaning | In an automated test |
|---|---|---|
| **Given** | The state before the action | Arrange: seed data, create users, log in, set the clock or configuration |
| **When** | One action of one actor | Act: one API call or one user action in the page |
| **Then** | The result that can be observed | Assert: status code, response fields, stored data, what the page shows |

One criterion gives at least one test case. The test name carries the criterion identifier (for example `AC-11.3 completing with unanswered scenarios returns 409`), so a failing test points to the broken criterion. Criteria that are checked by reading a file or by a demonstration say so (*inspection*, *demonstration*).

---

## 2 Epics and features

| Epic | Goal | Stories | Points |
|---|---|---|---|
| E1 Accounts and security | Register, log in, roles, secure basics | US-01 … US-05 | 14 |
| E2 Scenario library | Content learners practise on | US-06, US-07 | 7 |
| E3 Training session | Core learning loop and scoring | US-08 … US-12 | 21 |
| E4 Progress | Users see their history | US-13 | 3 |
| E5 Admin dashboard | Admins manage content and see statistics | US-14 … US-17 | 20 |
| E6 Platform and quality | Docker, CI, tests, docs | US-18 … US-23 | 24 |
| Could-have | Only after the MVP works | US-24, US-25 | 8 |
| **Total** | | **25 stories** | **97** |

| Feature | Epic | Stories |
|---|---|---|
| F1.1 Account registration and login | E1 | US-01, US-02 |
| F1.2 Access control and abuse protection | E1 | US-03, US-04, US-05 |
| F2.1 Scenario content | E2 | US-06, US-07 |
| F3.1 Training session lifecycle | E3 | US-08, US-10, US-11 |
| F3.2 Learner interface | E3 | US-09, US-12 |
| F4.1 Score history | E4 | US-13 |
| F5.1 Scenario management | E5 | US-14, US-15, US-17 |
| F5.2 Administrator statistics | E5 | US-16 |
| F6.1 Deployment and delivery pipeline | E6 | US-18, US-19, US-22 |
| F6.2 Quality assurance | E6 | US-20, US-23 |
| F6.3 API tooling | E6 | US-21 |
| F7.1 Optional enhancements | E1, E3 | US-24, US-25 |

---

## 3 Story overview

| Story | Title | Pri | Pts | Owner | Depends on | FRs | Decisions | Sprint |
|---|---|---|---|---|---|---|---|---|
| US-01 | Register an account | M | 3 | Ali Kaan Demiralp | none | FR-01 … FR-05 | D-12 | 3 |
| US-02 | Log in and out | M | 3 | Ali Kaan Demiralp | US-01 | FR-06 … FR-10 | D-01 | 3 |
| US-03 | Role-based access control | M | 3 | Ali Kaan Demiralp | US-02 | FR-11 … FR-13 | – | 3 |
| US-04 | Rate limiting on auth endpoints | M | 2 | Ali Kaan Demiralp | US-02 | FR-14 … FR-16 | D-02 | 3 |
| US-05 | Request validation and safe errors | M | 3 | Ali Kaan Demiralp | API contract | FR-17 … FR-20 | D-12 | 3 |
| US-06 | Seed scenario library | M | 5 | Murat Yatağan | US-14 | FR-21 … FR-24 | D-09 | 3 |
| US-07 | Indicator vocabulary | S | 2 | Murat Yatağan | none | FR-25 … FR-27 | D-13 | 2 |
| US-08 | Start a session | M | 5 | Ali Kaan Demiralp | US-02, US-06 | FR-28 … FR-32 | D-14 | 3 |
| US-09 | View a scenario in the UI | M | 5 | Duhan Kaan Şenol | US-08 | FR-44 … FR-46 | D-10 | 3 |
| US-10 | Submit a verdict and get feedback | M | 5 | Ali Kaan Demiralp | US-08 | FR-33 … FR-38, FR-43 | – | 3 |
| US-11 | Scoring and session result | M | 3 | Ali Kaan Demiralp | US-10 | FR-39 … FR-42 | D-03, D-04 | 3 |
| US-12 | Session summary screen | M | 3 | Duhan Kaan Şenol | US-11 | FR-47 | – | 3 |
| US-13 | Score history | M | 3 | Duhan Kaan Şenol | US-11 | FR-48 … FR-51 | D-05 | 3 |
| US-14 | Scenario data model and CRUD API | M | 5 | Ali Kaan Demiralp | API contract, US-03 | FR-52 … FR-57 | D-06 | 3 |
| US-15 | Admin scenario management UI | M | 8 | Furkan Berkay Öztürk | US-14, US-03 | FR-58 … FR-61 | – | 3 |
| US-16 | Admin statistics | S | 5 | Murat Yatağan | US-11, US-03 | FR-65 … FR-67 | D-11 | Final |
| US-17 | Bootstrap first admin | M | 2 | Ali Kaan Demiralp | US-01 | FR-62 … FR-64 | – | 3 |
| US-18 | One-command Docker deployment | M | 5 | Ali Kaan Demiralp | none | FR-68 … FR-71 | D-15 | 3 |
| US-19 | CI pipeline | M | 5 | Ali Kaan Demiralp | US-18 | FR-72, FR-73 | D-07 | 3 |
| US-20 | Test suite and test plan | M | 5 | Erol Yağız Gemalmaz | US-19 | FR-73, FR-76 … FR-78 | D-07, D-16 | 3 |
| US-21 | OpenAPI mock and contract check | S | 3 | Ali Kaan Demiralp | API contract, US-19 | FR-80, FR-81 | D-17 | 3 |
| US-22 | Dependency and licence scanning | S | 3 | Ali Kaan Demiralp | US-19 | FR-74, FR-75 | – | 3 |
| US-23 | Static analysis (SonarQube) report | S | 3 | Erol Yağız Gemalmaz | US-19 | FR-79 | D-08 | Final |
| US-24 | Forgot-password flow | C | 5 | Murat Yatağan | US-02, email stub | FR-82, FR-83 | D-18 | Final (optional) |
| US-25 | Difficulty filter at session start | C | 3 | Erol Yağız Gemalmaz | US-08, US-06 | FR-84, FR-85 | D-19, D-14 | Final (optional) |

"Sprint" is the sprint in which the story is planned to be accepted (section 7).

---

## 4 User stories with acceptance criteria

### E1 Accounts and security

#### US-01 Register an account

**M · 3 pts · Ali Kaan Demiralp · deps: none · FR-01, FR-02, FR-03, FR-04, FR-05 · D-12 · tasks T-01 … T-04**

As a visitor I want to create an account so that my progress is saved.

- **AC-01.1** **Given** a username (3–32 characters) and an email address that are not in use, and a password of 12 to 128 characters, **when** the visitor registers, **then** the answer is 201 with the profile (identifier, username, email, role `learner`, creation time) and the response contains no password and no hash.
- **AC-01.2** **Given** a username or an email address that is already in use, **when** the visitor registers, **then** the answer is 409 and the number of accounts is unchanged.
- **AC-01.3** **Given** an invalid email address, a password shorter than 12 characters or another invalid field, **when** the visitor registers, **then** the answer is 400 with problem details whose `errors[]` list has one entry with the `field` name of each invalid field and a `message`, and no account is created. Tests assert the field names, not the message text (D-12).
- **AC-01.4** **Given** two accounts registered with the same password, **when** the stored values are read, **then** both are Argon2id hashes (prefix `$argon2id$`) and they differ from each other.
- **AC-01.5** **Given** a known test password that was used to register and to log in, **when** every response body and the captured log are searched for it, **then** the number of hits is 0 (D-12).

#### US-02 Log in and out

**M · 3 pts · Ali Kaan Demiralp · deps: US-01 · FR-06, FR-07, FR-08, FR-09, FR-10 · D-01 · tasks T-05 … T-07**

As a user I want to log in so that I can access my sessions.

- **AC-02.1** **Given** an existing account, **when** the user logs in with the right username and password, **then** the answer is 200 with `accessToken`, `tokenType` = `Bearer` and `expiresIn` = 3600 (the token is valid for 60 minutes, D-01).
- **AC-02.2** **Given** an unknown username in one request and a wrong password for a known username in another, **when** both logins are sent, **then** both get 401 and the two response bodies are identical.
- **AC-02.3** **Given** no token, a malformed token or an expired token, **when** a protected operation is called, **then** the answer is 401.
- **AC-02.4** **Given** a valid token, **when** the user asks for the own profile, **then** the answer is 200 with identifier, username, email, role and creation time of that user.
- **AC-02.5** **Given** a logged-in user, **when** the user chooses *Log out*, **then** the user interface discards the token without sending a request, shows the login screen, and opening a protected screen afterwards leads back to the login screen (logout is a client action; the API has no logout operation, D-01).

#### US-03 Role-based access control

**M · 3 pts · Ali Kaan Demiralp · deps: US-02 · FR-11, FR-12, FR-13 · no decision needed · tasks T-08, T-09**

As a system owner I want admin features restricted to admins so that learners cannot change content or see other users' data.

- **AC-03.1** **Given** a logged-in learner, **when** the learner calls any operation under `/admin`, **then** the answer is 403 and nothing is read or changed.
- **AC-03.2** **Given** a learner whose request carries extra role information that claims `admin` (for example a `role` field or header), **when** an admin operation is called, **then** it is still refused; the role is taken only from the signed token on the server.
- **AC-03.3** **Given** learner A and a session that belongs to learner B, **when** A tries to answer or complete B's session, **then** the answer is 403 and B's session is unchanged (IDOR test).
- **AC-03.4** **Given** learners A and B who both have completed sessions, **when** A reads the score history, **then** it contains only A's results.

#### US-04 Rate limiting on auth endpoints

**M · 2 pts · Ali Kaan Demiralp · deps: US-02 · FR-14, FR-15, FR-16 · D-02 · tasks T-10, T-11**

As a system owner I want repeated failed logins to be rate-limited so that password guessing is slowed down.

- **AC-04.1** **Given** 5 failed logins (each answered 401) for the same pair of client address and username inside one fixed 60-second window, **when** a 6th login for that pair is sent in the same window, **then** the answer is 429 with problem details and a `Retry-After` header in whole seconds from 1 to 60, and every further attempt for that pair in the window also gets 429.
- **AC-04.2** **Given** a pair that is limited, **when** a login with another username is sent from the same address, **then** it has its own counter and is answered normally (200 or 401, not 429).
- **AC-04.3** **Given** a pair that is limited, **when** the window has ended and a new login is sent, **then** it is counted as attempt 1 of a new window and is answered normally.
- **AC-04.4** **Given** `LOGIN_RATE_LIMIT_PER_MINUTE` is set to another value (for example 3), **when** failed logins are repeated, **then** the first 429 comes on attempt *limit + 1* (here the 4th); a test covers the default and one changed value.
- **AC-04.5** *(Should part, FR-16)* **Given** registration requests above the configured registration limit, **when** one more registration is sent, **then** the answer is 429 with `Retry-After`.

Only failed logins are counted; a successful login is not counted and does not reset the counter (D-02).

#### US-05 Request validation and safe errors

**M · 3 pts · Ali Kaan Demiralp · deps: API contract (`api/openapi.yaml`) · FR-17, FR-18, FR-19, FR-20 · D-12 · tasks T-12 … T-14**

As a user I want invalid requests rejected with safe, clear errors so that the system never leaks internal details or runs injected scripts.

- **AC-05.1** **Given** a request that breaks the API contract (wrong type, unknown field or over-length value), **when** it is sent, **then** the answer is 400 with problem details whose `errors[]` names the field, and nothing is stored.
- **AC-05.2** **Given** any error, including a forced internal error, **when** the response is read, **then** its content type is `application/problem+json`, it has at least `title` and `status`, and it contains no stack trace, no SQL and no data-store message.
- **AC-05.3** **Given** a scenario whose body contains `<script>alert(1)</script>`, **when** the scenario is shown in the user interface, **then** the text appears literally on the page and no script runs.

### E2 Scenario library

#### US-06 Seed scenario library

**M · 5 pts · Murat Yatağan · deps: US-14 · FR-21, FR-22, FR-23, FR-24 · D-09 · tasks T-15 … T-17**

As a trainer I want at least 30 ready-made scenarios so that the demo and the first training sessions are credible.

- **AC-06.1** **Given** the seed data, **when** the scenarios are counted, **then** there are exactly 30: 18 phishing and 12 legitimate, with at least 8 `easy`, 8 `medium` and 8 `hard` (a test on the seed data checks the three counts, D-09).
- **AC-06.2** **Given** any seed scenario, **when** it is read, **then** it has a sender name, a sender address, a subject, a body, a correct verdict, a difficulty, an explanation and a list of indicators that uses only codes of the indicator vocabulary (US-07).
- **AC-06.3** **Given** the seed content, **when** every address and every link target is checked, **then** only `example.com`, `example.org` and `.test` domains are found, and no real brand, real logo or working link (automated domain check plus the review of T-17).
- **AC-06.4** **Given** a clean checkout and an empty data store, **when** the system is started with `docker compose up`, **then** the 30 scenarios are in the library without a manual step, and running the seed a second time still leaves exactly 30.

#### US-07 Indicator vocabulary

**S · 2 pts · Murat Yatağan · deps: none · FR-25, FR-26, FR-27 · D-13 · task T-18**

As a learner I want red flags to be named consistently with a plain description so that the feedback is easy to understand.

- **AC-07.1** **Given** the `IndicatorCode` enum of `api/openapi.yaml` (nine codes), **when** the shared indicator list in the code is compared with it, **then** both hold the same nine codes (unit test, D-13).
- **AC-07.2** **Given** the shared list, **when** it is read, **then** every code has a name and a description that are not empty, and no two codes share a name or a description.
- **AC-07.3** **Given** an indicator that is shown to a user, **when** the page is read, **then** it shows the name and description from the shared list, the same text wherever the indicator appears.
- **AC-07.4** **Given** a request with an indicator code that is not in the list, **when** it is sent, **then** the answer is 400.

### E3 Training session

#### US-08 Start a session

**M · 5 pts · Ali Kaan Demiralp · deps: US-02, US-06 · FR-28, FR-29, FR-30, FR-31, FR-32 · D-14 · tasks T-65, T-19 … T-21**

As a learner I want to start a session of N scenarios so that I can practise in short rounds.

- **AC-08.1** **Given** a logged-in user and at least 10 selectable scenarios, **when** the user starts a session without giving a number, **then** the answer is 201 with the session and 10 different scenarios.
- **AC-08.2** **Given** a requested number from 1 to 20, **when** the session is started, **then** exactly that many scenarios are returned; **given** 0, 21 or a value that is not a whole number, **then** the answer is 400 and no session is created.
- **AC-08.3** **Given** the selection logic with a seeded random source, **when** it runs twice with the same seed and the same pool, **then** it returns the same scenarios in the same order, and no scenario appears twice in a session (D-14; the running system uses a normal random source and has no seed setting).
- **AC-08.4** **Given** a started session, **when** the response is inspected, **then** no scenario in it contains the answer key (`isPhishing`, `indicators`, `explanation`).
- **AC-08.5** **Given** a pool (all scenarios that are not deleted) that is smaller than the requested number, **when** the session is started, **then** the answer is 422 and no session is created.

#### US-09 View a scenario in the UI

**M · 5 pts · Duhan Kaan Şenol · deps: US-08 · FR-44, FR-45, FR-46 · D-10 · tasks T-69, T-22, T-23**

As a learner I want each scenario to look like a real inbox message so that I practise in realistic conditions.

- **AC-09.1** **Given** a scenario of the running session, **when** it is shown, **then** it looks like an inbox message with sender name, sender address, reply-to address when present, subject and body.
- **AC-09.2** **Given** a scenario with links, **when** it is shown, **then** every link appears as its label together with its real target as text, and the rendered scenario contains no anchor element with a target and no click or keyboard action that leads anywhere (a test checks the rendered page, D-10).
- **AC-09.3** **Given** the viewports 390×844 (phone) and 1366×768 (laptop), **when** the training screens are opened, **then** they can be used without horizontal scrolling at both sizes.
- **AC-09.4** **Given** the latest stable Chrome, Firefox and Edge, **when** the main learner journey is run, **then** it works in all three (shown in Chrome at the Sprint 3 review; tested in all three by the end-to-end tests in the Final sprint).

#### US-10 Submit a verdict and get feedback

**M · 5 pts · Ali Kaan Demiralp · deps: US-08 · FR-33, FR-34, FR-35, FR-36, FR-37, FR-38, FR-43 · no decision needed · tasks T-24 … T-26**

As a learner I want to submit my verdict and get instant feedback so that I learn which red flags I missed.

- **AC-10.1** **Given** the owner's open session and a scenario of it that has no answer yet, **when** the learner submits `phishing` or `legitimate`, with or without ticked indicators, **then** the answer is 200 with the feedback: correct or not, the correct verdict, the indicators of the scenario, the indicators the learner missed, the explanation and the points awarded.
- **AC-10.2** **Given** a scenario that was already answered in this session, **when** a second verdict is submitted, **then** the answer is 409 and the first answer stays stored.
- **AC-10.3** **Given** a session that belongs to another user, **when** a verdict is submitted, **then** the answer is 403 and nothing is stored.
- **AC-10.4** **Given** a session that does not exist, or a scenario that is not part of the session, **when** a verdict is submitted, **then** the answer is 404.
- **AC-10.5** **Given** a session that is already completed, **when** a verdict is submitted, **then** the answer is 409.
- **AC-10.6** **Given** a scenario on the training screen, **when** the learner looks at the controls, **then** there are the two choices *Phishing* and *Legitimate* and an optional checklist of indicators; **when** the verdict is submitted, **then** the feedback of AC-10.1 is shown at once on the same screen.

#### US-11 Scoring and session result

**M · 3 pts · Ali Kaan Demiralp · deps: US-10 · FR-39, FR-40, FR-41, FR-42 · D-03, D-04 · tasks T-27, T-28**

As a learner I want my session to be scored and saved so that I know how well I did.

- **AC-11.1** **Given** the owner's open session in which every scenario is answered, **when** the owner completes it, **then** the answer is 200 with session identifier, completion time, number of scenarios, number of correct verdicts and score, and the result is stored and appears in the history.
- **AC-11.2** **Given** *correct* right verdicts out of *total* scenarios, **when** the score is calculated, **then** it is correct ÷ total × 100 rounded half up to a whole number from 0 to 100, calculated with whole numbers as `floor((200 × correct + total) ÷ (2 × total))` (D-03). The unit test uses this table:

  | Correct / total | 0/10 | 1/3 | 1/8 | 3/8 | 2/3 | 7/8 | 10/10 |
  |---|---|---|---|---|---|---|---|
  | Score | 0 | 33 | 13 | 38 | 67 | 88 | 100 |

- **AC-11.3** **Given** a session in which at least one scenario has no answer, **when** the owner completes it, **then** the answer is 409 with a `detail` saying that unanswered scenarios remain; the session stays open, has no score and is not in the history, and it can be completed later (D-04).
- **AC-11.4** **Given** a session that is already completed, **when** it is completed again, **then** the answer is 409 and the stored result is unchanged.
- **AC-11.5** **Given** another user's session, **when** it is completed, **then** the answer is 403; **given** a session that does not exist, **then** 404. The checks run in the order 404, 403, 409 (already completed), 409 (unanswered).

#### US-12 Session summary screen

**M · 3 pts · Duhan Kaan Şenol · deps: US-11 · FR-47 · no decision needed · task T-29**

As a learner I want a summary at the end of a session so that I can review what I missed.

- **AC-12.1** **Given** a session whose last scenario has been answered, **when** the session is completed, **then** the summary screen shows the score, the number of correct verdicts out of the total, and the list of scenarios that were answered wrongly.
- **AC-12.2** **Given** a session in which every verdict was correct, **when** the summary is shown, **then** the list of wrongly answered scenarios is empty and the screen says that nothing was missed.

### E4 Progress

#### US-13 Score history

**M · 3 pts · Duhan Kaan Şenol · deps: US-11 · FR-48, FR-49, FR-50, FR-51 · D-05 · tasks T-30, T-31**

As a learner I want to see my past scores and a trend so that I can track my progress.

- **AC-13.1** **Given** a user with completed sessions, **when** the history is opened, **then** the user's completed sessions are listed newest first, each with completion date and score, one page at a time.
- **AC-13.2** **Given** completed sessions of other users, **when** the history is opened, **then** none of them is in the list.
- **AC-13.3** **Given** a completed session and the completed session of the same user directly before it, **when** the history is shown, **then** the trend is *improving* for a higher score, *declining* for a lower score and *flat* for an equal score, with no tolerance band; the first completed session shows no trend, and open sessions are ignored (D-05).

  | Previous score | This score | Trend |
  |---|---|---|
  | none (first session) | 70 | no trend |
  | 70 | 80 | improving |
  | 80 | 80 | flat |
  | 80 | 79 | declining |

- **AC-13.4** **Given** a user without a completed session, **when** the history is opened, **then** the list is empty and the screen invites the user to start a session.
- **AC-13.5** *(Could part, FR-51)* **Given** two or more completed sessions, **when** the history is opened, **then** a chart shows the score over time.

### E5 Admin dashboard

#### US-14 Scenario data model and CRUD API

**M · 5 pts · Ali Kaan Demiralp · deps: API contract (`api/openapi.yaml`), US-03 · FR-52, FR-53, FR-54, FR-55, FR-56, FR-57 · D-06 · tasks T-32 … T-34**

As an admin I want a scenario API so that content can be managed without code changes.

- **AC-14.1** **Given** an admin and a valid scenario, **when** it is created, **then** the answer is 201 with the stored scenario, its identifier, its creation time and the identifier of the admin who created it.
- **AC-14.2** **Given** an admin, **when** the scenarios are listed (one page at a time) or one scenario is read, **then** the answer is 200 and includes the answer key.
- **AC-14.3** **Given** an existing scenario, **when** an admin replaces it with valid data, **then** the answer is 200 with the new state; **given** a scenario that does not exist, **then** 404.
- **AC-14.4** **Given** an existing scenario, **when** an admin deletes it, **then** the answer is 204 and the scenario is never offered in a new session; **given** a scenario that does not exist, **then** 404.
- **AC-14.5** **Given** scenario data that breaks the contract (missing required field, over-length text, more than five links, unknown field or unknown indicator code), **when** it is created or replaced, **then** the answer is 400 with `errors[]` and nothing is stored.
- **AC-14.6** **Given** a successful create, update or delete, **when** the audit events are read from the data store, **then** exactly one new event exists with actor (the admin), timestamp (UTC), action (`create`, `update` or `delete`), scenarioId and the names of the changed fields – create: every field that was set; update: only the fields that differ; delete: an empty list. No field values are stored (D-06).
- **AC-14.7** **Given** a request that is rejected (400, 403 or 404), **when** the audit events are read, **then** no event was written; and no operation of the application changes or deletes an audit event.

#### US-15 Admin scenario management UI

**M · 8 pts · Furkan Berkay Öztürk · deps: US-14, US-03 · FR-58, FR-59, FR-60, FR-61 · no decision needed · tasks T-35 … T-37**

As an admin I want a scenario management screen so that I can add, edit and delete scenarios without touching code.

- **AC-15.1** **Given** a logged-in admin, **when** the scenario management screen is opened, **then** a table shows the scenarios of the library, one page at a time.
- **AC-15.2** **Given** the create or edit form with an invalid field, **when** the admin saves, **then** a validation message is shown next to each invalid field and nothing is saved; **given** valid data, **then** the scenario is saved and the table shows the new state.
- **AC-15.3** **Given** a scenario in the table, **when** the admin chooses delete, **then** a confirmation is asked; on confirm the scenario is deleted and leaves the table, on cancel nothing is deleted.
- **AC-15.4** **Given** a logged-in learner, **when** the application is used, **then** no navigation entry for administration is shown, and opening an administration address directly does not show the screen.

#### US-16 Admin statistics

**S · 5 pts · Murat Yatağan · deps: US-11, US-03 · FR-65, FR-66, FR-67 · D-11 · tasks T-38, T-39**

As an admin I want aggregate statistics so that I can see how learners perform and which scenarios are hardest.

- **AC-16.1** **Given** completed sessions, **when** an admin asks for the statistics, **then** the answer is 200 with the total number of users, the total number of completed sessions and the average score, which is the mean of all session scores rounded half up to one decimal (66.25 → 66.3); with no completed session the average is 0 (D-11).
- **AC-16.2** **Given** scenarios with answers, **when** the statistics are read, **then** the hardest scenarios are those with the lowest rate of correct verdicts, at most five, and scenarios with the same rate are ordered by title (`subject`) ascending.
- **AC-16.3** **Given** fewer than five scenarios with at least one answer, **when** the statistics are read, **then** all of them are returned; with none the list is empty.
- **AC-16.4** **Given** the statistics response and screen, **when** they are inspected, **then** they hold aggregate figures only: no username, no email and no answer or score of a single user.
- **AC-16.5** **Given** a logged-in admin, **when** the statistics screen is opened, **then** it shows the figures of AC-16.1 to AC-16.3; a learner gets 403 from the operation and never sees the screen.

#### US-17 Bootstrap first admin

**M · 2 pts · Ali Kaan Demiralp · deps: US-01 · FR-62, FR-63, FR-64 · no decision needed · task T-40**

As an operator I want the first admin to be created from environment variables so that no default password ships in the code.

- **AC-17.1** **Given** `ADMIN_BOOTSTRAP_USERNAME` and `ADMIN_BOOTSTRAP_PASSWORD` set in `.env` and no account with that username, **when** the system starts, **then** an account with that username, the role `admin` and a hashed password exists, and the admin can log in with the configured values.
- **AC-17.2** **Given** the admin account already exists, **when** the system is restarted, **then** no second account is created and the existing account is not changed.
- **AC-17.3** **Given** the first-admin values are missing, **when** the system starts, **then** no admin account is created and the start-up log says so without printing a secret.
- **AC-17.4** **Given** the source code and the build artefacts, **when** they are inspected, **then** they contain no default administrator password; `.env.example` holds only a placeholder (inspection).
- **AC-17.5** **Given** the project README, **when** it is read, **then** it describes how the operator sets the first-admin values (inspection).

### E6 Platform and quality

#### US-18 One-command Docker deployment

**M · 5 pts · Ali Kaan Demiralp · deps: none (sets up the `api/`, `web/` and `deploy/` skeleton) · FR-68, FR-69, FR-70, FR-71 · D-15 · tasks T-63, T-41 … T-43, T-77**

As a grader or developer I want one command to start the whole system so that it runs the same way on any machine.

- **AC-18.1** **Given** a clean machine (clean checkout, `.env` copied from `.env.example`, no containers, no data volume) with the images already built, **when** `docker compose up` is run, **then** within 180 seconds the data store, the API and the web server are reported healthy and `GET /api/v1/health` answers 200 through `http://localhost:8080` (D-15; the image build is timed and reported separately).
- **AC-18.2** **Given** the started system, **when** `http://localhost:8080` is opened, **then** the application works: the bootstrap admin can log in and a session with seed scenarios can be started.
- **AC-18.3** **Given** no token, **when** the liveness check is called, **then** it answers 200 and reports that the API is running.
- **AC-18.4** **Given** the repository, **when** it is inspected, **then** it contains no secret: all secrets come from `.env`, which is not committed, and `.env.example` has no real values (inspection).

#### US-19 CI pipeline

**M · 5 pts · Ali Kaan Demiralp · deps: US-18 · FR-72, FR-73 · D-07 · tasks T-44, T-45**

As a team member I want CI checks on every pull request so that broken or untested code cannot be merged.

- **AC-19.1** **Given** a pull request, **when** it is opened or updated, **then** GitHub Actions runs the jobs `lint` (ESLint, format check, contract lint), `test` (unit and integration tests with the coverage gate), `build` (type check and build) and `docker` (image build).
- **AC-19.2** **Given** one of the four jobs fails, **when** the pull request is viewed, **then** it cannot be merged: the four jobs are required status checks of the branch protection (inspection of the repository settings, D-07).
- **AC-19.3** **Given** the unit-test run, **when** it ends, **then** the line coverage of `api` and `web` is reported (lcov artefact, value per workspace and combined), and the `test` job fails when line coverage is below 50 %. Generated code, configuration files, type declarations and test files are not counted; security, scoring and validation modules are never excluded (D-07).

#### US-20 Test suite and test plan

**M · 5 pts · Erol Yağız Gemalmaz · deps: US-19; tests are added as US-01 to US-04, US-08, US-10 and US-11 are delivered · FR-73, FR-76, FR-77, FR-78 · D-07, D-16 · tasks T-64, T-04, T-07, T-09, T-11, T-14, T-21, T-26, T-28, T-34, T-70, T-74, T-47**

As the QA engineer I want a test plan and automated tests so that core flows and security rules are verified.

- **AC-20.1** **Given** the repository, **when** the test plan is read, **then** it states the test levels, the scope, the responsibilities, the evidence and the tools, and the tools are those of ADR-0001: Vitest with Supertest (API), Vitest with React Testing Library (web), Playwright (end-to-end) and `@vitest/coverage-v8` (inspection, D-16).
- **AC-20.2** **Given** the test suite, **when** CI runs it, **then** unit tests for scoring and input validation and integration tests for authentication and for the session flow (start, answer, complete) exist and pass.
- **AC-20.3** **Given** the three security cases – wrong role gets 403, the login rate limit gives 429, starting a session does not leak the answer key – **when** the test plan is read, **then** a table links each case to the test file that covers it, and these tests pass in CI.
- **AC-20.4** **Given** a sprint submission, **when** the evidence is collected, **then** it contains the test report of the CI run and the coverage artefact (lcov) showing at least 50 % line coverage of `api` and `web` together (D-07, D-16).

#### US-21 OpenAPI mock and contract check

**S · 3 pts · Ali Kaan Demiralp · deps: API contract (`api/openapi.yaml`), US-19 · FR-80, FR-81 · D-17 · task T-48 (CI job in T-44)**

As a frontend developer I want a mock server generated from the OpenAPI contract so that UI work can start before the API is ready.

- **AC-21.1** **Given** `api/openapi.yaml`, **when** the mock server is started, **then** it answers every operation of the contract with a response that matches the contract (demonstration).
- **AC-21.2** **Given** the contract, **when** `npm run lint:api` runs Spectral with the ruleset `.spectral.yaml`, locally or in the CI job `lint`, **then** the check passes only with zero results of severity *error* (D-17).
- **AC-21.3** **Given** a lint warning, **when** the pull request is reviewed, **then** the warning is either fixed or its reason is written in the pull request; a warning alone does not fail the check.

#### US-22 Dependency and licence scanning

**S · 3 pts · Ali Kaan Demiralp · deps: US-19 · FR-74, FR-75 · no decision needed · task T-49**

As the team we want dependency and licence scanning so that vulnerable or incompatible packages are caught early.

- **AC-22.1** **Given** the repository, **when** it is inspected, **then** automatic dependency-update checks (Dependabot) are configured.
- **AC-22.2** **Given** a pull request, **when** CI runs, **then** a dependency audit runs and fails when a production dependency has an advisory of severity high or critical (NFR-26).
- **AC-22.3** **Given** the project, **when** the licence command is run, **then** it produces the list of dependency licences that is used for the NOTICE file.

#### US-23 Static analysis (SonarQube) report

**S · 3 pts · Erol Yağız Gemalmaz · deps: US-19 · FR-79 · D-08 · tasks T-50, T-75**

As the team we want a SonarQube report so that technical debt is measured for the final submission.

- **AC-23.1** **Given** the code of the release candidate, **when** the SonarQube scan is run, **then** the report contains the gate result, the ratings, the numbers of bugs, vulnerabilities, code smells and security hotspots, coverage, duplication, and the technical-debt time and ratio.
- **AC-23.2** **Given** the scan result, **when** the quality gate is evaluated, **then** it passes only with 0 open blocker or critical issues, duplicated lines ≤ 3 %, maintainability rating A and technical-debt ratio ≤ 5 % (D-08, NFR-30 … NFR-33).
- **AC-23.3** **Given** Sprint 3, **when** the first scan is run, **then** the values are reported and do not block the MVP; **given** the Final sprint, **when** the gate fails, **then** `v1.0.0` is not tagged until every finding is fixed or marked as a false positive with a written reason.

### Could-have (only after the MVP works)

#### US-24 Forgot-password flow

**C · 5 pts · Murat Yatağan · deps: US-02, optional email stub · FR-82, FR-83 · D-18 · task T-81**

As a learner I want to reset a forgotten password so that I can regain access to my account.

- **AC-24.1** **Given** an address that belongs to an account and one that does not, **when** a reset is requested for each, **then** both get the same answer.
- **AC-24.2** **Given** a reset request for an existing account, **when** it is processed, **then** the reset message is in the local mailbox stub and no real email leaves the system.
- **AC-24.3** **Given** a reset token that is unused and not older than 30 minutes, **when** a new password of 12 to 128 characters is set with it, **then** the password is changed and the token cannot be used again.
- **AC-24.4** **Given** an invalid, expired or already used token, **when** a new password is set with it, **then** the answer is 400 and the password is not changed.

The contract change for the two reset operations comes first and belongs to the Lead Architect (D-18).

#### US-25 Difficulty filter at session start

**C · 3 pts · Erol Yağız Gemalmaz · deps: US-08, US-06 · FR-84, FR-85 · D-19, D-14 · task T-82**

As a learner I want to choose a difficulty level so that sessions match my skill.

- **AC-25.1** **Given** a difficulty `easy`, `medium` or `hard`, **when** a session is started with it, **then** every scenario of the session has that difficulty.
- **AC-25.2** **Given** any other difficulty value, **when** a session is started, **then** the answer is 400.
- **AC-25.3** **Given** fewer scenarios of the requested difficulty than the requested number, **when** a session is started, **then** the answer is 422, no session is created, and the session is never filled up with other difficulties.

---

## 5 Definition of Ready

A story may be taken into a sprint when all of this is true:

- [ ] It has the story sentence (As a … I want … so that …), a priority, story points and one owner.
- [ ] Its acceptance criteria are written as Given / When / Then, and every expected result can be observed (a status code, a field, stored data or something on the page).
- [ ] It has no open question: every question about it is closed by a decision `D-xx` in the decision log.
- [ ] It is linked to at least one `FR-xx` of the SRS.
- [ ] The stories and tasks it depends on are done, or are planned earlier in the same sprint.
- [ ] If it needs an API operation, the operation is in `api/openapi.yaml`; a needed contract change is agreed with the Lead Architect first.
- [ ] If it has a screen, the screen is in the UI/UX prototype (`SCR-xx`).
- [ ] It is broken into tasks, each with one owner, and it is small enough to finish in one sprint (8 points or fewer).

## 6 Definition of Done

A story is done when all of this is true:

- [ ] **Acceptance criteria:** every `AC` of the story is met and was shown by a test, an inspection or a demonstration, as the criterion says.
- [ ] **Tests:** the code comes with automated tests (unit tests next to the code, integration tests for API behaviour), and all tests pass.
- [ ] **Coverage gate green:** line coverage of `api` and `web` stays at 50 % or more and the CI `test` job is green.
- [ ] **CI green:** the required checks `lint`, `test`, `build` and `docker` pass on the pull request.
- [ ] **Contract updated:** the behaviour matches `api/openapi.yaml`. If the API had to change, the contract was changed first, in a task of the Lead Architect, and the contract lint is green.
- [ ] **Reviewed:** the pull request was reviewed and approved by another team member (reviewer rotation) and merged without bypassing branch protection.
- [ ] **Docs updated:** README, SRS, backlog or other documents that the change touches are updated in the same pull request.
- [ ] **Safe:** no secret is committed; scenario content uses only fictional brands and reserved domains; no new high or critical dependency advisory.
- [ ] **Traceable:** the commit and the pull request name the task and the story, and the story's issue is closed on the project board.

For a document task, "tests" and "coverage" are replaced by: the Markdown renders, the PDF is generated from it, and every identifier it uses (`FR`, `NFR`, `US`, `D`) exists.

---

## 7 Sprint plan

A story is counted in the sprint in which it is planned to be **accepted**, that is when its last implementation task ends. Work on some stories starts one sprint earlier; the table says where. Document tasks (SRS, NFR, architecture, prototypes, reports) belong to no story and carry no story points; their effort is shown by the task counts in 7.3.

### 7.1 Stories and points per sprint

| Sprint | Deadline | Goal | Stories accepted | Must | Should | Could | Points |
|---|---|---|---|---|---|---|---|
| Sprint 2 | 24 November 2026 | Documents and skeleton: SRS, NFR, decision log, refined backlog, user flows, UI prototypes, C4 and UML; monorepo, Docker Compose, mock server, users table | US-07 | 0 | 2 | 0 | **2** |
| Sprint 3 | 14 December 2026 | Working MVP with CI and at least 50 % unit-test coverage | US-01 … US-06, US-08 … US-15, US-17 … US-22 | 73 | 6 | 0 | **79** |
| Final | 27 December 2026 | Statistics, integration and end-to-end test reports, SonarQube gate, security hardening, clean-machine check, demo | US-16, US-23 | 0 | 8 | 0 | **8** |
| Final (optional) | 27 December 2026 | Could-have stories, only when all Must and Should work is done | US-24, US-25 | 0 | 0 | 8 | **8** |
| **Total** | | | **25 stories** | **73** | **16** | **8** | **97** |

Story work that starts before its acceptance sprint:

| Story | Started in Sprint 2 by | Accepted in | Why not earlier |
|---|---|---|---|
| US-18 | T-63 (monorepo skeleton), T-41 (Dockerfiles), T-42 (Docker Compose) | Sprint 3 | AC-18.2 needs the seed data and the bootstrap admin (T-16, T-40). The clean-machine check is repeated in the Final sprint (T-43). |
| US-21 | T-48 (mock server and lint command) | Sprint 3 | AC-21.2 needs the CI job `lint` (T-44). |
| US-01 | T-01 (users table and first migration) | Sprint 3 | The register operation is built in T-02. |
| US-20 | T-64 (test plan update) | Sprint 3 | The tests are written as the stories are delivered. The complete integration suite and the end-to-end report (T-74, T-47) follow in the Final sprint as course deliverables. |

### 7.2 Points per member and sprint

Points belong to the **owner of the story**. Tasks inside a story are shared (for example, the owner builds the API, the UX engineer the form and the QA engineer the tests), so the task counts in 7.3 show the real spread of work.

| Member | Sprint 2 | Sprint 3 | Final | Final (optional) | Total |
|---|---|---|---|---|---|
| Ali Kaan Demiralp | 0 | 50 | 0 | 0 | 50 |
| Murat Yatağan | 2 | 5 | 5 | 5 | 17 |
| Furkan Berkay Öztürk | 0 | 8 | 0 | 0 | 8 |
| Duhan Kaan Şenol | 0 | 11 | 0 | 0 | 11 |
| Erol Yağız Gemalmaz | 0 | 5 | 3 | 3 | 11 |
| **Total** | **2** | **79** | **8** | **8** | **97** |

### 7.3 Tasks per member and sprint

| Member | Sprint 2 | Sprint 3 | Final | Total |
|---|---|---|---|---|
| Ali Kaan Demiralp | 9 | 19 | 6 | 34 |
| Murat Yatağan | 2 | 2 | 4 | 8 |
| Furkan Berkay Öztürk | 2 | 6 | 4 | 12 |
| Duhan Kaan Şenol | 5 | 9 | 3 | 17 |
| Erol Yağız Gemalmaz | 1 | 10 | 6 | 17 |
| **Total** | **19** | **46** | **23** | **88** |

In addition every member updates the own section of `CONTRIBUTIONS.md` once per sprint (T-68).

### 7.4 Risk of the plan

Sprint 3 carries 79 of the 97 points, because the course asks for documents in Sprint 2 and for the whole MVP in Sprint 3. The team accepts this with three measures:

1. **Order.** Sprint 3 runs in dependency order: error handling and validation, data schema, seed, accounts, session flow, admin API, then the screens and the tests (section 8).
2. **Descoping order.** If velocity is too low: first US-22 and US-21 (Should) move to the Final sprint, then the Should and Could parts inside Must stories (AC-04.5, AC-13.5). The security stories US-01 … US-05 are never removed.
3. **Parallel work.** The mock server (US-21) lets the screens be built before the API operations are ready.

---

## 8 Tasks

Tasks are the work items that are created as GitHub issues and linked to their story. "Process" tasks belong to no story. The order inside a sprint is the planned run order.

### 8.1 Sprint 2

| Task | Story | Title | Owner |
|---|---|---|---|
| T-62 | Process | Record the technology stack and architecture style (ADR-0001) | Ali Kaan Demiralp |
| T-63 | US-18 | Create the monorepo skeleton (api, web, contract) with tooling | Ali Kaan Demiralp |
| T-41 | US-18 | Write multi-stage Dockerfiles for api and web | Ali Kaan Demiralp |
| T-42 | US-18 | Write docker-compose configuration with database and seeding hook | Ali Kaan Demiralp |
| T-48 | US-21 | Configure the OpenAPI mock server and contract lint | Ali Kaan Demiralp |
| T-01 | US-01 | Design the users table and first Prisma migration | Ali Kaan Demiralp |
| T-53 | Process | Write the Software Requirements Specification (SRS) | Duhan Kaan Şenol |
| T-56 | Process | Write the non-functional requirements and quality-measure specification | Duhan Kaan Şenol |
| T-57 | Process | Decide the open acceptance-criteria questions (decision log) | Murat Yatağan |
| T-58 | Process | Produce the refined product backlog with testable acceptance criteria | Duhan Kaan Şenol |
| T-18 | US-07 | Define the indicator vocabulary and shared constants | Murat Yatağan |
| T-59 | Process | Draw the user-flow diagrams | Duhan Kaan Şenol |
| T-54 | Process | Design the UI/UX prototypes (HTML screens for Figma) and write the UI specification | Duhan Kaan Şenol |
| T-55 | Process | Write the C4 architecture documentation | Ali Kaan Demiralp |
| T-61 | Process | Write the UML models | Ali Kaan Demiralp |
| T-64 | US-20 | Update the test plan with tooling and NFR verification | Erol Yağız Gemalmaz |
| T-52-S2 | Process | Sprint 2 stand-up log and retrospective | Furkan Berkay Öztürk |
| T-66 | Process | Sprint 2 submission document | Furkan Berkay Öztürk |
| T-67 | Process | Release v0.2.0 (Sprint 2) | Ali Kaan Demiralp |
| T-68-S2 | Process | Update own CONTRIBUTIONS.md section for Sprint 2 | Each member |

### 8.2 Sprint 3

| Task | Story | Title | Owner |
|---|---|---|---|
| T-13 | US-05 | Implement the problem+json error handler | Ali Kaan Demiralp |
| T-12 | US-05 | Validate requests and responses against the OpenAPI contract | Ali Kaan Demiralp |
| T-65 | US-08 | Add the full domain schema (scenarios, sessions, answers, audit) | Ali Kaan Demiralp |
| T-15 | US-06 | Write the 30 seed scenarios | Murat Yatağan |
| T-16 | US-06 | Implement the seed script | Murat Yatağan |
| T-17 | US-06 | Review the scenarios for fictional domains and realism | Furkan Berkay Öztürk |
| T-02 | US-01 | Implement the register endpoint with Argon2id hashing | Ali Kaan Demiralp |
| T-05 | US-02 | Implement login and token issuing | Ali Kaan Demiralp |
| T-08 | US-03 | Implement role checks and ownership guard | Ali Kaan Demiralp |
| T-10 | US-04 | Rate-limit the login endpoint | Ali Kaan Demiralp |
| T-40 | US-17 | Bootstrap the first administrator from environment variables | Ali Kaan Demiralp |
| T-19 | US-08 | Implement scenario selection logic | Ali Kaan Demiralp |
| T-20 | US-08 | Implement the start-session endpoint without the answer key | Ali Kaan Demiralp |
| T-24 | US-10 | Implement the submit-answer endpoint | Ali Kaan Demiralp |
| T-27 | US-11 | Implement scoring and the complete-session endpoint | Ali Kaan Demiralp |
| T-30 | US-13 | Implement the results history endpoint | Ali Kaan Demiralp |
| T-32 | US-14 | Implement the admin scenario CRUD endpoints | Ali Kaan Demiralp |
| T-33 | US-14 | Add audit fields and audit events | Ali Kaan Demiralp |
| T-69 | US-09 | Build the web app shell (layout, routing, API client, auth context) | Duhan Kaan Şenol |
| T-03 | US-01 | Build the registration form | Duhan Kaan Şenol |
| T-06 | US-02 | Build the login form and token handling | Duhan Kaan Şenol |
| T-22 | US-09 | Build the inbox scenario view | Duhan Kaan Şenol |
| T-23 | US-09 | Make the training layout responsive | Duhan Kaan Şenol |
| T-25 | US-10 | Build verdict controls and the feedback panel | Duhan Kaan Şenol |
| T-29 | US-12 | Build the session summary screen | Duhan Kaan Şenol |
| T-31 | US-13 | Build the score history view | Duhan Kaan Şenol |
| T-35 | US-15 | Build the admin scenario table view | Furkan Berkay Öztürk |
| T-36 | US-15 | Build the admin create/edit scenario form | Furkan Berkay Öztürk |
| T-37 | US-15 | Implement delete confirmation | Furkan Berkay Öztürk |
| T-04 | US-01 | Write registration unit and integration tests | Erol Yağız Gemalmaz |
| T-07 | US-02 | Write authentication tests | Erol Yağız Gemalmaz |
| T-09 | US-03 | Write role and IDOR tests | Erol Yağız Gemalmaz |
| T-11 | US-04 | Write rate-limit tests | Erol Yağız Gemalmaz |
| T-14 | US-05 | Write XSS escaping and validation tests | Erol Yağız Gemalmaz |
| T-21 | US-08 | Write answer-key leakage test | Erol Yağız Gemalmaz |
| T-26 | US-10 | Write duplicate-answer and ownership tests | Erol Yağız Gemalmaz |
| T-28 | US-11 | Write scoring unit tests | Erol Yağız Gemalmaz |
| T-34 | US-14 | Write admin CRUD tests | Erol Yağız Gemalmaz |
| T-44 | US-19 | Write the GitHub Actions workflow (lint, test, build) | Ali Kaan Demiralp |
| T-45 | US-19 | Add the 50 % coverage gate | Ali Kaan Demiralp |
| T-49 | US-22 | Add dependency audit and licence report | Ali Kaan Demiralp |
| T-70 | US-20 | Write the Sprint 3 unit-test and coverage report | Erol Yağız Gemalmaz |
| T-71 | Process | MVP acceptance walkthrough against the refined backlog | Duhan Kaan Şenol |
| T-52-S3 | Process | Sprint 3 stand-up log and retrospective | Furkan Berkay Öztürk |
| T-72 | Process | Sprint 3 submission document | Furkan Berkay Öztürk |
| T-73 | Process | Release v0.3.0 (MVP) | Ali Kaan Demiralp |
| T-68-S3 | Process | Update own CONTRIBUTIONS.md section for Sprint 3 | Each member |

### 8.3 Final

| Task | Story | Title | Owner |
|---|---|---|---|
| T-38 | US-16 | Implement the statistics query and endpoint | Murat Yatağan |
| T-39 | US-16 | Build the statistics view | Murat Yatağan |
| T-74 | US-20 | Complete the integration test suite and write the integration test report | Erol Yağız Gemalmaz |
| T-47 | US-20 | Write end-to-end tests and the E2E report | Erol Yağız Gemalmaz |
| T-50 | US-23 | Set up the SonarQube scan and produce the report | Erol Yağız Gemalmaz |
| T-75 | US-23 | Fix SonarQube findings and write the technical-debt report | Ali Kaan Demiralp |
| T-76 | Process | Security hardening review (OWASP ASVS L1) | Ali Kaan Demiralp |
| T-43 | US-18 | Verify start-up on a clean machine | Erol Yağız Gemalmaz |
| T-77 | US-18 | Write the deployment and run guide (and optional public deployment) | Ali Kaan Demiralp |
| T-78 | Process | Update architecture documents to as-built | Ali Kaan Demiralp |
| T-79 | Process | Write the as-built requirements traceability matrix | Duhan Kaan Şenol |
| T-80 | Process | Run a small usability evaluation | Duhan Kaan Şenol |
| T-81 | US-24 | (Could) Forgot-password flow with local email stub | Murat Yatağan |
| T-82 | US-25 | (Could) Difficulty filter at session start | Erol Yağız Gemalmaz |
| T-83 | Process | Demo script and defence presentation outline | Furkan Berkay Öztürk |
| T-84 | Process | Personal defence notes | Ali Kaan Demiralp |
| T-85 | Process | Personal defence notes | Murat Yatağan |
| T-86 | Process | Personal defence notes | Furkan Berkay Öztürk |
| T-87 | Process | Personal defence notes | Duhan Kaan Şenol |
| T-88 | Process | Personal defence notes | Erol Yağız Gemalmaz |
| T-52-F | Process | Final stand-up log and project retrospective | Furkan Berkay Öztürk |
| T-89 | Process | Final submission document | Furkan Berkay Öztürk |
| T-90 | Process | Release v1.0.0 (Final) | Ali Kaan Demiralp |
| T-68-F | Process | Update own CONTRIBUTIONS.md section for the final release | Each member |

---

## 9 Traceability

### 9.1 Story → FR → API operation

Every FR identifier below exists in the SRS (section 4), and the FRs of a story are exactly those whose *Source* column names the story (SRS section 8.1).

| Story | Functional requirements | API operation (`operationId`) |
|---|---|---|
| US-01 | FR-01, FR-02, FR-03, FR-04, FR-05 | `registerUser` |
| US-02 | FR-06, FR-07, FR-08, FR-09, FR-10 | `login`, `getCurrentUser` |
| US-03 | FR-11, FR-12, FR-13 | all operations under `/admin`; `submitAnswer`, `completeSession`, `listMyResults` |
| US-04 | FR-14, FR-15, FR-16 | `login`, `registerUser` |
| US-05 | FR-17, FR-18, FR-19, FR-20 | all operations |
| US-06 | FR-21, FR-22, FR-23, FR-24 | – (seed procedure) |
| US-07 | FR-25, FR-26, FR-27 | `submitAnswer`, `adminCreateScenario`, `adminUpdateScenario` |
| US-08 | FR-28, FR-29, FR-30, FR-31, FR-32 | `startSession` |
| US-09 | FR-44, FR-45, FR-46 | – (user interface) |
| US-10 | FR-33, FR-34, FR-35, FR-36, FR-37, FR-38, FR-43 | `submitAnswer` |
| US-11 | FR-39, FR-40, FR-41, FR-42 | `completeSession` |
| US-12 | FR-47 | – (user interface) |
| US-13 | FR-48, FR-49, FR-50, FR-51 | `listMyResults` |
| US-14 | FR-52, FR-53, FR-54, FR-55, FR-56, FR-57 | `adminListScenarios`, `adminCreateScenario`, `adminGetScenario`, `adminUpdateScenario`, `adminDeleteScenario` |
| US-15 | FR-58, FR-59, FR-60, FR-61 | – (user interface on the admin operations) |
| US-16 | FR-65, FR-66, FR-67 | `adminGetStats` |
| US-17 | FR-62, FR-63, FR-64 | – (start-up) |
| US-18 | FR-68, FR-69, FR-70, FR-71 | `getHealth` |
| US-19 | FR-72, FR-73 | – (pipeline) |
| US-20 | FR-73, FR-76, FR-77, FR-78 | – (tests) |
| US-21 | FR-80, FR-81 | all operations (mock) |
| US-22 | FR-74, FR-75 | – (pipeline) |
| US-23 | FR-79 | – (static analysis) |
| US-24 | FR-82, FR-83 | two reset operations, to be added to the contract (D-18) |
| US-25 | FR-84, FR-85 | `startSession` |

Keep the issue number and the task identifier in pull-request titles so that the trace continues to the code.

### 9.2 QA review findings → criteria

Every finding of the Acceptance Criteria Testability Review is answered by a decision and by the criteria that apply it. The eight findings of priority High that concern Must stories are marked.

| Review priority | Story | Finding (short) | Decision | Criteria |
|---|---|---|---|---|
| **High** | US-01 | "Clear reason" not testable; log check unspecified | D-12 | AC-01.3, AC-01.5 |
| **High** | US-02 | No logout criterion; token lifetime unspecified | D-01 | AC-02.1, AC-02.5 |
| **High** | US-04 | "More than 5" and "per IP/account" ambiguous | D-02 | AC-04.1 … AC-04.4 |
| Medium | US-06 | "About 60 %" and difficulty mix vague | D-09 | AC-06.1 |
| Medium | US-07 | "Fixed list", "human-readable" incomplete | D-13 | AC-07.1, AC-07.2 |
| **High** | US-08 | Randomness not repeatable; shortage rule unclear | D-14 | AC-08.3, AC-08.5 |
| Medium | US-09 | No viewports or browsers named | D-10 | AC-09.2 … AC-09.4 |
| **High** | US-11 | Rounding rule; incomplete completion undefined | D-03, D-04 | AC-11.2, AC-11.3 |
| Medium | US-13 | Trend thresholds and first session undefined | D-05 | AC-13.3 |
| **High** | US-14 | "Who changed what and when" exceeds the schema | D-06 | AC-14.6, AC-14.7 |
| Medium | US-16 | Average precision, ties, fewer than five | D-11 | AC-16.1 … AC-16.3 |
| Medium | US-18 | Start-up readiness and timeout undefined | D-15 | AC-18.1 |
| **High** | US-19 | Coverage metric and required checks unspecified | D-07 | AC-19.1 … AC-19.3 |
| **High** | US-20 | Tools, scope and evidence unspecified | D-16 | AC-20.1 … AC-20.4 |
| Medium | US-21 | No lint tool or pass rule | D-17 | AC-21.2, AC-21.3 |
| Medium | US-23 | No quality gate | D-08 | AC-23.1 … AC-23.3 |
| Low | US-24 | Token expiry, single use, invalid token absent | D-18 | AC-24.1 … AC-24.4 |
| Low | US-25 | Filtering and small-pool behaviour absent | D-19 | AC-25.1 … AC-25.3 |

Result: no Must story keeps a criterion that the review flagged as High.

---

## 10 Change log (Sprint 1 → Sprint 2)

Nothing changed in the epics, features, story identifiers, story sentences, points, priorities or owners. The points are still Must 73, Should 16, Could 8.

### 10.1 Changes to stories

| Story | What changed since Sprint 1 | Caused by |
|---|---|---|
| US-01 | "400 with a clear reason" → 400 with an `errors[]` list of `field` and `message`; tests assert field names. "Never returned or logged" → test that finds 0 occurrences of a known password in responses and logs. "Argon2id/bcrypt" → Argon2id only. | D-12; ADR-0001 |
| US-02 | Logout criterion added: client discards the token, no API operation. Token lifetime fixed at 60 minutes (`expiresIn` = 3600). Criterion for the own profile added (FR-09). | D-01 |
| US-03 | Criteria written as Given / When / Then; the IDOR case is split into "answer or complete another user's session" and "history holds only own results"; server-side role check made a criterion (FR-12). | SRS (FR-12, FR-13) |
| US-04 | "More than 5 per minute per IP/account" → fixed 60-second window, one counter per pair of IP and username, only failed attempts count, the 6th attempt gets 429 with `Retry-After` 1–60. Registration limit listed as the Should part (FR-16). | D-02 |
| US-05 | 400 answers now carry `errors[]`; "no stack traces" extended to forced internal errors; the XSS check names the test string. | D-12 |
| US-06 | "About 60 % / 40 %, mix of difficulties" → exactly 30 scenarios, 18 phishing and 12 legitimate, at least 8 per difficulty. Running the seed twice leaves 30. | D-09 |
| US-07 | Canonical source named (`IndicatorCode` enum of the contract, nine codes); names and descriptions must be non-empty and unique; unknown code → 400. | D-13 |
| US-08 | Random selection made repeatable with an injectable, seeded random source; no scenario twice; the 422 rule applies to the pool of selectable scenarios; numbers outside 1–20 → 400. | D-14 |
| US-09 | "Laptop and phone widths" → viewports 1366×768 and 390×844; browsers Chrome, Firefox and Edge; "never clickable" → no anchor element and no click or keyboard action. | D-10 |
| US-10 | Criteria written as Given / When / Then; 404 cases and the 409 for a completed session added from the contract; the user-interface part is its own criterion. | SRS (FR-37, FR-38, FR-43) |
| US-11 | "Rounded" → round half up with a whole-number formula and a test table. New rule: completing a session with unanswered scenarios → 409, session stays open. Order of the checks fixed. | D-03, D-04 |
| US-12 | Criteria written as Given / When / Then; the case "nothing missed" added. | Refinement |
| US-13 | Trend rule fixed: compare with the previous completed session, no tolerance band, first session has no trend. Empty history described. The chart stays the Could part. | D-05 |
| US-14 | "Audit fields" → one audit event per create, update and delete with actor, timestamp, action, scenarioId and changed field names; rejected requests write no event. | D-06 |
| US-15 | Criteria written as Given / When / Then; cancel of the delete confirmation and direct opening of an admin address by a learner added. | Refinement |
| US-16 | Average rounded to one decimal; ties ordered by title; fewer than five scenarios with answers → all of them. | D-11 |
| US-17 | Criteria written as Given / When / Then; restart (no second account) and missing values added; the variable names are stated. | SRS (UC-07) |
| US-18 | "Started" defined: three services healthy and the health check answers 200 through port 8080 within 180 seconds, image build not counted. | D-15 |
| US-19 | Coverage metric named (line coverage, `api` + `web`); required checks named (`lint`, `test`, `build`, `docker`); what is not counted is listed. | D-07 |
| US-20 | Tools named (ADR-0001); evidence defined (CI test report, coverage artefact, table from security case to test file). | D-16, D-07 |
| US-21 | Linter named (Spectral, `.spectral.yaml`); pass rule: zero errors, warnings fixed or explained. | D-17 |
| US-22 | Audit pass rule added: no high or critical advisory in production dependencies. | NFR-26 |
| US-23 | Report fields listed; quality gate defined (NFR-30 … NFR-33); reported in Sprint 3, required for the Final release. | D-08 |
| US-24 | Local mailbox stub, same answer for known and unknown accounts, single-use token valid for 30 minutes, 400 for a bad token. | D-18 |
| US-25 | Every returned scenario matches the difficulty; invalid value → 400; small pool → 422, never filled up. | D-19, D-14 |

### 10.2 Changes to the backlog as a whole

| Area | What changed since Sprint 1 | Caused by |
|---|---|---|
| Form of the criteria | Every criterion has an identifier `AC-xx.y` and the form Given / When / Then. | QA review; T-58 |
| Requirement links | Every story lists its `FR-xx`; the operation mapping now covers all 14 operations of the contract. | SRS (T-53) |
| Definition of Ready / Done | Added (sections 5 and 6). | T-58 |
| Sprint plan | Sprint 1 suggested starting US-01, US-02 and US-14 in Sprint 2 and US-21 … US-23 in the Final sprint. Now Sprint 2 holds the documents, the skeleton and US-07; US-21 and US-22 are accepted in Sprint 3 because their tooling is part of the CI pipeline; US-16 and US-23 stay in the Final sprint. Points per sprint and per member added. | Course deliverables per sprint; ADR-0001 |
| Task list | The list grew from T-01 … T-55 to the tasks in section 8: new tasks for the architecture record, the monorepo skeleton and the domain schema (T-62, T-63, T-65), the web shell (T-69), reports, hardening and release (T-70 … T-90). T-53, T-54 and T-55 were split into SRS / NFR (T-53, T-56), user flows / prototypes (T-59, T-54) and C4 / UML (T-55, T-61). T-52 is done once per sprint. The Sprint 1 items T-46 (test plan) and T-51 (backlog upkeep) continue as T-64 and as T-57 / T-58. | Sprint 2 planning |
| Technology | The Sprint 1 backlog was technology-neutral except for Argon2id/bcrypt; the criteria now name the chosen tools where a test needs them (Argon2id, Vitest, Playwright, Spectral, SonarQube). | ADR-0001; D-16, D-17 |

---

## Revision history

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | Sprint 1 | Team 16 | Initial Product Backlog (`docs/sprint-1/06-Initial-Product-Backlog.md`). |
| 2.0 | 2026-11-15 | Duhan Kaan Şenol | Refined backlog: Given / When / Then criteria applying D-01 … D-19, FR links, Definition of Ready and Done, sprint plan, change log (task T-58). |
