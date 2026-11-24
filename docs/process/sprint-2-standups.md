# Sprint 2 Stand-up Log

| Field | Value |
|---|---|
| Project | PhishGuard Trainer – a phishing-awareness simulator |
| Version | 0.1 (draft – rows marked `TODO(SM)` are still to be filled by the Scrum Master) |
| Date | 2026-11-15 |
| Owner | Furkan Berkay Öztürk (`Areca0`) – Scrum Master |
| Team | SENG 321 – Team 16 |
| Sprint | 2 – deadline 24 November 2026 23:59, release tag `v0.2.0` |
| Related tasks | T-52-S2 (this document), T-66 (Sprint 2 submission), all Sprint 2 tasks of the task list in the refined backlog (section 8.1) |
| Related stories | Process |

---

## 1 How the stand-up works

The rules come from the Sprint 1 workflow document ([`05-Repository-Workflow-and-Git-Flow.md`](../sprint-1/05-Repository-Workflow-and-Git-Flow.md), section 8).

- A stand-up is short. It may be held as a call or **asynchronously** in the team channel; the Scrum Master (SM) copies the answers into this log.
- Each member answers three questions: what was finished since the last stand-up (**Yesterday**), what comes next (**Today**), and what is in the way (**Blockers**).
- Work is named by its task identifier (`T-xx`), so a row can be checked against the task list and the commit history.
- One row = one member at one stand-up. A member who is absent still gets a row with `absent` in the *Yesterday* column.

### How blockers are tracked

1. A blocker is written in the *Blockers* column and gets an identifier `B-xx` in the blocker register (section 4).
2. The SM gives every blocker **one owner** and a target date, and puts the label `blocked` on the GitHub issue (workflow document, section 5).
3. The blocker is read out at every following stand-up until its status is *Closed*.
4. A review request that is older than 48 hours counts as a blocker (workflow document, section 3) and is recorded in the same register.

### Marks used in this log

| Mark | Meaning |
|---|---|
| `TODO(SM)` | The value is not known from the repository. The Scrum Master replaces it with the real value. |
| *from task list* | The cell was filled from the Sprint 2 task progress (committed tasks and their order), not from what the member said. The SM confirms or corrects it. |

---

## 2 Sprint 2 progress snapshot (15 November 2026)

This table is the source for the pre-filled stand-up rows in section 3. A task is *done* when it has a commit with its `Task:` trailer.

| Member | Done | Open | Known open point (from the repository) |
|---|---|---|---|
| Ali Kaan Demiralp | T-62, T-63, T-41, T-42, T-48, T-01, T-55, T-61 | T-67 (release `v0.2.0`), T-68-S2 | T-67 can start only after T-66 is merged. |
| Murat Yatağan | T-57, T-18 | T-68-S2 | none |
| Furkan Berkay Öztürk | T-52-S2 (this log and the retrospective, draft) | T-66 (submission document), T-68-S2 | T-66 needs every Sprint 2 pull request in the official repository and the Figma link of T-54. |
| Duhan Kaan Şenol | T-53, T-56, T-58, T-59, T-54 | T-68-S2 | T-54: the Figma file is still to be built by hand; the document shows the placeholder `FIGMA_LINK_TBD`. |
| Erol Yağız Gemalmaz | T-64 | T-68-S2 | none |

Count: 17 of the 20 Sprint 2 tasks are done (16 before this task, plus T-52-S2). The three open tasks (T-66, T-67, T-68-S2) are done in the official repository at the end of the sprint.

---

## 3 Stand-up log

### 3.1 Stand-up of 15 November 2026 (pre-filled from the task list)

| Date | Member | Yesterday (finished since the last stand-up) | Today (next) | Blockers |
|---|---|---|---|---|
| 2026-11-15 | Ali Kaan Demiralp | *from task list:* architecture decision records (T-62), monorepo skeleton (T-63), Dockerfiles (T-41), Docker Compose (T-42), mock server and contract lint (T-48), users table (T-01), C4 document (T-55), UML models (T-61) | *from task list:* open the pull requests for these tasks in the official repository; prepare the release (T-67) | `TODO(SM)` |
| 2026-11-15 | Murat Yatağan | *from task list:* decision log D-01 … D-19 (T-57), indicator vocabulary (T-18) | *from task list:* open the pull requests; review the pull requests of Duhan Kaan Şenol | `TODO(SM)` |
| 2026-11-15 | Furkan Berkay Öztürk | *from task list:* draft of the stand-up log and the retrospective (T-52-S2) | *from task list:* update the project board; start the submission document (T-66); review the pull requests of Ali Kaan Demiralp | `TODO(SM)` |
| 2026-11-15 | Duhan Kaan Şenol | *from task list:* SRS (T-53), NFR document (T-56), refined backlog (T-58), user flows (T-59), HTML prototypes and UI specification (T-54) | *from task list:* build the Figma file and add its link to the UI document (T-54 follow-up); review the pull requests of Murat Yatağan | `TODO(SM)` – candidate: Figma link missing (see B-01) |
| 2026-11-15 | Erol Yağız Gemalmaz | *from task list:* test plan update with tooling and NFR verification (T-64) | *from task list:* open the pull request; review the pull requests of Ali Kaan Demiralp | `TODO(SM)` |

### 3.2 Earlier stand-ups (6 – 14 November 2026)

The repository does not record these meetings. The SM adds one block of five rows per stand-up that was held.

| Date | Member | Yesterday | Today | Blockers |
|---|---|---|---|---|
| `TODO(SM)` | Ali Kaan Demiralp | `TODO(SM)` | `TODO(SM)` | `TODO(SM)` |
| `TODO(SM)` | Murat Yatağan | `TODO(SM)` | `TODO(SM)` | `TODO(SM)` |
| `TODO(SM)` | Furkan Berkay Öztürk | `TODO(SM)` | `TODO(SM)` | `TODO(SM)` |
| `TODO(SM)` | Duhan Kaan Şenol | `TODO(SM)` | `TODO(SM)` | `TODO(SM)` |
| `TODO(SM)` | Erol Yağız Gemalmaz | `TODO(SM)` | `TODO(SM)` | `TODO(SM)` |

### 3.3 Later stand-ups (16 – 24 November 2026)

Expected content, from the open tasks: pull requests and reviews in the official repository, the Figma link (T-54 follow-up), the submission document (T-66), the release `v0.2.0` (T-67) and the `CONTRIBUTIONS.md` updates (T-68-S2). The SM adds one block of five rows per stand-up.

| Date | Member | Yesterday | Today | Blockers |
|---|---|---|---|---|
| `TODO(SM)` | Ali Kaan Demiralp | `TODO(SM)` | `TODO(SM)` | `TODO(SM)` |
| `TODO(SM)` | Murat Yatağan | `TODO(SM)` | `TODO(SM)` | `TODO(SM)` |
| `TODO(SM)` | Furkan Berkay Öztürk | `TODO(SM)` | `TODO(SM)` | `TODO(SM)` |
| `TODO(SM)` | Duhan Kaan Şenol | `TODO(SM)` | `TODO(SM)` | `TODO(SM)` |
| `TODO(SM)` | Erol Yağız Gemalmaz | `TODO(SM)` | `TODO(SM)` | `TODO(SM)` |

---

## 4 Blocker register

| ID | Raised on | Blocker | Affects | Owner | Target date | Status |
|---|---|---|---|---|---|---|
| B-01 | 2026-11-15 | The Figma file of the UI prototypes does not exist yet; the UI document shows `FIGMA_LINK_TBD`. Found in the repository, not reported by a member – `TODO(SM)`: confirm. | T-54 follow-up, T-66 (the submission lists the Figma link) | Duhan Kaan Şenol | `TODO(SM)` | Open |
| `TODO(SM)` | `TODO(SM)` | `TODO(SM)` | `TODO(SM)` | `TODO(SM)` | `TODO(SM)` | `TODO(SM)` |

---

## 5 Before the sprint is closed

- [ ] Every `TODO(SM)` in this file is replaced or its row is removed.
- [ ] Every blocker of section 4 has one owner and the status *Closed* or is carried to Sprint 3.
- [ ] The version in the header is set to 1.0 and the date to the day of the last stand-up.
