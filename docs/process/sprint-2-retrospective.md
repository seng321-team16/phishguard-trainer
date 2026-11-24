# Sprint 2 Retrospective

| Field | Value |
|---|---|
| Project | PhishGuard Trainer – a phishing-awareness simulator |
| Version | 0.1 (draft – prepared from the repository; items marked `TODO(SM)` are confirmed in the retrospective meeting) |
| Date | 2026-11-15 |
| Owner | Furkan Berkay Öztürk (`Areca0`) – Scrum Master |
| Team | SENG 321 – Team 16 |
| Sprint | 2 – deadline 24 November 2026 23:59, release tag `v0.2.0` |
| Related tasks | T-52-S2 (this document), T-66 (Sprint 2 submission, reads this document), T-52-S3 (follows up the action items) |
| Related stories | Process; US-07 (the only story accepted in Sprint 2) |

---

## 1 About this document

The retrospective follows the Sprint 1 workflow document ([`05-Repository-Workflow-and-Git-Flow.md`](../sprint-1/05-Repository-Workflow-and-Git-Flow.md), section 8): at the end of each sprint the team looks at what went well, what went wrong and what changes in the next sprint, and the Scrum Master (SM) records the result and follows up the actions.

**Status of this version.** The facts (tasks, points, owners, reviewers) are taken from the task list and the commit history on 15 November 2026, nine days before the deadline. The opinions in sections 5 and 6 are a **proposal of the SM based on these facts**. The team confirms, changes or removes them in the retrospective meeting; the meeting date and the participants are `TODO(SM)`.

| Meeting | Value |
|---|---|
| Date and form (call / asynchronous) | `TODO(SM)` |
| Participants | `TODO(SM)` |
| Facilitator | Furkan Berkay Öztürk |

---

## 2 Sprint goal

> **Documents and skeleton:** SRS, NFR, decision log, refined backlog, user flows, UI prototypes, C4 and UML; monorepo, Docker Compose, mock server, users table.

Source: refined backlog ([`03-Refined-Product-Backlog.md`](../sprint-2/03-Refined-Product-Backlog.md), section 7.1). The course deliverables of the sprint are: detailed SRS and refined product backlog; non-functional requirements and quality measures; UI/UX prototypes in Figma with user-flow diagrams; architecture documentation with C4 models and UML diagrams.

**Goal reached?** On 15 November every document and every skeleton part of the goal is committed. Two points are still open: the Figma file of the prototypes (the HTML screens and the PNG exports exist, the link does not) and the submission and release steps in the official repository. Final answer at sprint close: `TODO(SM)`.

---

## 3 Planned and delivered

Status on 15 November 2026. *Delivered* means: the task has a commit with its `Task:` trailer. The SM updates the three open rows when the sprint is closed.

| Task | Title | Owner | Story | Planned | Status |
|---|---|---|---|---|---|
| T-62 | Record the technology stack and architecture style (ADR-0001) | Ali Kaan Demiralp | Process | Yes | Delivered |
| T-63 | Create the monorepo skeleton (api, web, contract) with tooling | Ali Kaan Demiralp | US-18 | Yes | Delivered |
| T-41 | Write multi-stage Dockerfiles for api and web | Ali Kaan Demiralp | US-18 | Yes | Delivered |
| T-42 | Write docker-compose configuration with database and seeding hook | Ali Kaan Demiralp | US-18 | Yes | Delivered |
| T-48 | Configure the OpenAPI mock server and contract lint | Ali Kaan Demiralp | US-21 | Yes | Delivered |
| T-01 | Design the users table and first Prisma migration | Ali Kaan Demiralp | US-01 | Yes | Delivered |
| T-53 | Write the Software Requirements Specification (SRS) | Duhan Kaan Şenol | Process | Yes | Delivered |
| T-56 | Write the non-functional requirements and quality-measure specification | Duhan Kaan Şenol | Process | Yes | Delivered |
| T-57 | Decide the open acceptance-criteria questions (decision log) | Murat Yatağan | Process | Yes | Delivered |
| T-58 | Produce the refined product backlog with testable acceptance criteria | Duhan Kaan Şenol | Process | Yes | Delivered |
| T-18 | Define the indicator vocabulary and shared constants | Murat Yatağan | US-07 | Yes | Delivered |
| T-59 | Draw the user-flow diagrams | Duhan Kaan Şenol | Process | Yes | Delivered |
| T-54 | Design the UI/UX prototypes (HTML screens for Figma) and write the UI specification | Duhan Kaan Şenol | Process | Yes | Delivered; follow-up open (Figma file and link, done by hand) |
| T-55 | Write the C4 architecture documentation | Ali Kaan Demiralp | Process | Yes | Delivered |
| T-61 | Write the UML models | Ali Kaan Demiralp | Process | Yes | Delivered |
| T-64 | Update the test plan with tooling and NFR verification | Erol Yağız Gemalmaz | US-20 | Yes | Delivered |
| T-52-S2 | Sprint 2 stand-up log and retrospective | Furkan Berkay Öztürk | Process | Yes | Delivered as draft (this document); `TODO(SM)` rows open |
| T-66 | Sprint 2 submission document | Furkan Berkay Öztürk | Process | Yes | Open – official repository, after all pull requests are merged |
| T-67 | Release v0.2.0 (Sprint 2) | Ali Kaan Demiralp | Process | Yes | Open – after T-66 |
| T-68-S2 | Update own CONTRIBUTIONS.md section for Sprint 2 | Each member | Process | Yes | Open – after T-67 |

| Count | Value |
|---|---|
| Tasks planned | 20 |
| Tasks delivered on 15 November | 17 (85 %) |
| Tasks open | 3 (T-66, T-67, T-68-S2 – all in the official repository, all planned for the last days of the sprint) |
| Tasks added during the sprint | 0 |
| Tasks removed or moved to Sprint 3 | 0 on 15 November; at sprint close: `TODO(SM)` |

Tasks per member (planned → delivered on 15 November; T-68-S2 is not counted, as in the backlog section 7.3):

| Member | Planned | Delivered | Open |
|---|---|---|---|
| Ali Kaan Demiralp | 9 | 8 | T-67 |
| Murat Yatağan | 2 | 2 | none |
| Furkan Berkay Öztürk | 2 | 1 (draft) | T-66 |
| Duhan Kaan Şenol | 5 | 5 | none (Figma follow-up of T-54) |
| Erol Yağız Gemalmaz | 1 | 1 | none |
| **Total** | **19** | **17** | **2** |

---

## 4 Velocity

Only stories carry points (Fibonacci; one point is about half a working day). Document tasks carry none, so in this sprint the task counts of section 3 say more about the work than the points do.

| Measure | Planned | Delivered | Note |
|---|---|---|---|
| Stories accepted | 1 (US-07) | 1 (US-07) | Its only task T-18 is committed. Acceptance by the Product Owner against AC-07.1 and AC-07.2: `TODO(SM)` – confirm. |
| Story points | 2 | 2 | **Velocity of Sprint 2 = 2 points.** |
| Story work started early | US-18, US-21, US-01, US-20 | all four started | T-63, T-41, T-42 (US-18), T-48 (US-21), T-01 (US-01), T-64 (US-20). Their points are counted in Sprint 3, when the stories are accepted (backlog section 7.1). |

**What this means for Sprint 3.** Sprint 3 plans 79 points. A velocity of 2 points is no basis for a forecast, because Sprint 2 was a document sprint. The forecast for Sprint 3 therefore uses the task count (46 tasks) and the dependency order, and the descoping order of the backlog (section 7.4) is checked in the middle of the sprint (action A-05).

---

## 5 What went well, what to improve

Proposal of the SM from the repository facts. `TODO(SM)`: confirm each row with the team and add the points raised in the meeting.

### 5.1 What went well

| # | Observation | Evidence |
|---|---|---|
| W-1 | All document deliverables and the skeleton were committed nine days before the deadline. | 17 of 20 tasks delivered on 15 November (section 3). |
| W-2 | Tasks were done in dependency order, so no document was written against a missing input. | Task list order: SRS → NFR and decision log → refined backlog; ADR-0001 → C4 → UML. |
| W-3 | The open acceptance-criteria questions were closed before the backlog was refined. | Decision log D-01 … D-19 (`decision-log.md`), used by the refined backlog and the test plan. |
| W-4 | One task = one commit with `Task`, `Story`, `Owner` and `Sprint` trailers; individual contribution can be read from the history. | Commit history of the working repository. |
| W-5 | Sprint 3 can start without set-up work: monorepo, Docker Compose, mock server and the first migration exist. | T-63, T-41, T-42, T-48, T-01. |

### 5.2 What to improve

| # | Observation | Evidence | Action |
|---|---|---|---|
| I-1 | Most commits landed on one day. The stand-ups had little step-by-step progress to follow, and the reviews arrive as one batch, which puts the 48-hour review target at risk. | All Sprint 2 task commits are dated 15 November. | A-01 |
| I-2 | The stand-up log was written after the work and not at each stand-up; dates and blockers have to be filled in from memory. | `sprint-2-standups.md`, `TODO(SM)` rows. | A-02 |
| I-3 | A hand-made step (Figma file) was left to the end and now blocks the submission document. | Blocker B-01; `FIGMA_LINK_TBD` in the UI document. | A-03 |
| I-4 | The load is uneven: one member owns 9 of the 19 tasks, another owns 1. In Sprint 3 the same member owns 19 of 46 tasks and 50 of 79 points. | Section 3; backlog sections 7.2 and 7.3. | A-04, A-05 |
| I-5 | The project board in the official repository does not show the real state while the work is done in the working repository. | Board is updated by hand. | A-06 |

---

## 6 Action items

Each action has exactly one owner. The SM reads the open actions at the first stand-up of Sprint 3 and reports their result in the Sprint 3 retrospective (T-52-S3).

| ID | Action | Owner | Due | Measure of success | Status |
|---|---|---|---|---|---|
| A-01 | **Process change:** from Sprint 3 on, a task is transferred and its pull request is opened on the day the task is committed, not in one batch at the end of the sprint. | Furkan Berkay Öztürk | From 25 November 2026 | No pull request of Sprint 3 waits longer than 48 hours for its first review. | Open |
| A-02 | Fill the stand-up log on the day of each stand-up and finish the `TODO(SM)` rows of the Sprint 2 log. | Furkan Berkay Öztürk | 22 November 2026 | No `TODO(SM)` left in `sprint-2-standups.md` and in this document. | Open |
| A-03 | Build the Figma file from the HTML screens and add the link to the UI document (T-54 follow-up). | Duhan Kaan Şenol | 20 November 2026 | `FIGMA_LINK_TBD` is gone; blocker B-01 closed. | Open |
| A-04 | Start Sprint 3 with the tasks that unblock the other members (T-13, T-12, T-65), so that screens and tests are not waiting for the API. | Ali Kaan Demiralp | First three days of Sprint 3 | T-13, T-12 and T-65 are committed before any other Sprint 3 API task. | Open |
| A-05 | Hold a scope check in the middle of Sprint 3 and apply the descoping order of the backlog (section 7.4) if the plan is not on track. | Murat Yatağan | 4 December 2026 | Decision written in the decision log or in the Sprint 3 stand-up log. | Open |
| A-06 | Move the issues on the GitHub Projects board at every stand-up. | Furkan Berkay Öztürk | Every stand-up from 16 November 2026 | The board columns agree with the task list at each stand-up. | Open |
| A-07 | Write each test task as soon as its endpoint task is committed (mock server for earlier work), not at the end of the sprint. | Erol Yağız Gemalmaz | During Sprint 3 | No test task of Sprint 3 starts later than two days after its dependency. | Open |

---

## 7 Review statistics

Every pull request needs one approving review by another member (workflow document, section 3). The reviewer of a task is fixed by the rotation below, so each member reviews and is reviewed.

### 7.1 Who reviews whom (planned, by task owner)

| Author (task owner) | Reviewer | Sprint 2 tasks to review | Tasks |
|---|---|---|---|
| Ali Kaan Demiralp | Erol Yağız Gemalmaz | 9 | T-62, T-63, T-41, T-42, T-48, T-01, T-55, T-61, T-67 |
| Murat Yatağan | Duhan Kaan Şenol | 2 | T-57, T-18 |
| Furkan Berkay Öztürk | Ali Kaan Demiralp | 2 | T-52-S2, T-66 |
| Duhan Kaan Şenol | Murat Yatağan | 5 | T-53, T-56, T-58, T-59, T-54 |
| Erol Yağız Gemalmaz | Furkan Berkay Öztürk | 1 | T-64 |
| **Total** | | **19** | |

The `CONTRIBUTIONS.md` updates (T-68-S2, one per member) are reviewed by the same rotation.

### 7.2 Review matrix (rows = author, columns = reviewer)

Planned number of task reviews. The real numbers of pull requests come from the official repository when the sprint is closed.

| Author ↓ / Reviewer → | Ali Kaan | Murat | Furkan Berkay | Duhan Kaan | Erol Yağız |
|---|---|---|---|---|---|
| Ali Kaan Demiralp | – | 0 | 0 | 0 | 9 |
| Murat Yatağan | 0 | – | 0 | 2 | 0 |
| Furkan Berkay Öztürk | 2 | 0 | – | 0 | 0 |
| Duhan Kaan Şenol | 0 | 5 | 0 | – | 0 |
| Erol Yağız Gemalmaz | 0 | 0 | 1 | 0 | – |
| **Reviews to give** | **2** | **5** | **1** | **2** | **9** |

### 7.3 Actual numbers (official repository)

| Measure | Value |
|---|---|
| Pull requests opened / merged in Sprint 2 | `TODO(SM)` |
| Reviews given per member (Ali Kaan / Murat / Furkan Berkay / Duhan Kaan / Erol Yağız) | `TODO(SM)` |
| Reviews answered within 48 hours | `TODO(SM)` |
| Pull requests with changes requested | `TODO(SM)` |
| Longest wait for a first review | `TODO(SM)` |

The numbers can be read with `gh pr list --state all --search "milestone:\"Sprint 2\"" --json number,author,reviews,createdAt,mergedAt` in the official repository.

---

## 8 Before the sprint is closed

- [ ] The retrospective meeting was held; date and participants are in section 1.
- [ ] Sections 5 and 6 are confirmed by the team; every action item still has exactly one owner.
- [ ] The three open rows of section 3 and the table of section 7.3 are updated.
- [ ] No `TODO(SM)` is left; the version in the header is 1.0.
