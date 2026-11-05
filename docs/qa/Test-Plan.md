# QA Test Plan

**Project:** PhishGuard Trainer  
**Owner:** Erol Yağız Gemalmaz - Quality Assurance and Test Automation Engineer  
**Related work:** [QA task #30](https://github.com/seng321-team16/phishguard-trainer/issues/30), [US-20 #22](https://github.com/seng321-team16/phishguard-trainer/issues/22)  
**Status:** Initial plan for Sprint 1; execution evolves with the implementation.

## 1. Purpose

This plan defines how PhishGuard Trainer will be verified from unit level through the main learner journey. It establishes test scope, evidence, coverage expectations, defect handling and traceability before implementation begins.

## 2. Quality objectives

- Core authentication, authorisation, training and scoring behaviour matches the backlog and OpenAPI contract.
- Learners cannot access admin functions or another learner's data.
- Scenario answer keys are not exposed before an answer is submitted.
- Invalid input produces safe RFC 7807 problem responses without stack traces, SQL details or secrets.
- The application starts from a clean checkout with the documented Docker command.
- CI reports unit-test coverage and fails below the agreed 50% threshold.
- Tests, defects and acceptance decisions remain traceable to GitHub issues and pull requests.

## 3. Scope

### In scope

- Registration, authentication and token expiry
- Role-based access control and IDOR prevention
- Request validation, safe errors, rate limiting and XSS escaping
- Scenario selection and answer-key confidentiality
- Answer submission, ownership, duplicate submission and scoring
- Results history and administrator scenario CRUD
- Docker smoke test
- OpenAPI contract linting and API response conformance
- Main learner journey end-to-end test
- CI coverage reporting and SonarQube evidence when the implementation exists

### Out of scope for the initial plan

- Real phishing email delivery
- Real brands, real targets and external mail-provider integration
- SSO, payments, multi-tenancy and native mobile applications
- Production penetration testing
- Field studies claiming reduction of real-world phishing incidents

## 4. Test levels

| Level | Purpose | Initial targets | Evidence |
|---|---|---|---|
| Unit | Verify isolated business rules | validation, score calculation, trend calculation, scenario selection | Test report and coverage |
| Integration/API | Verify routes, persistence and security boundaries | registration, login, sessions, results, admin CRUD | CI test report |
| Contract | Keep implementation aligned with OpenAPI | status codes, content types, schemas, examples | OpenAPI lint and contract tests |
| UI/component | Verify rendering and interaction | escaped scenario text, non-clickable links, validation messages | Component test report |
| End-to-end | Verify the main user journey | register/login, complete session, view result | Automated e2e report |
| Smoke/deployment | Verify clean startup | web, API, DB, seed data, health | Recorded clean-checkout result |
| Static analysis | Monitor maintainability and defects | code smells, vulnerabilities, duplication | SonarQube report |

## 5. Environments and data

- Local and CI environments must be created from a clean checkout.
- Test data uses fictional brands and reserved domains such as `.test` and `example.com`.
- Automated tests use isolated databases or transactions and must not depend on execution order.
- Secrets are injected through environment variables; no real credential is committed.
- Time-dependent and random behaviour must be controllable with a test clock and seeded random generator where practical.

## 6. Entry and exit criteria

### Entry criteria

- Story has acceptance criteria, owner, estimate and dependencies.
- OpenAPI operation exists for API-facing behaviour.
- Required implementation dependency is available.
- Test data and expected results are defined.

### Exit criteria

- Acceptance criteria have passing automated or documented manual evidence.
- All Must-path tests pass.
- No unresolved Critical or High defect remains.
- Unit-test coverage is at least 50% using the single metric chosen by the team. **QA recommendation: line coverage.**
- OpenAPI lint and required CI checks pass.
- Security-critical negative cases pass.
- PR contains test evidence and is reviewed by someone other than the author.

## 7. Coverage policy

The backlog says "at least 50% coverage" but does not name the metric. Until the Product Owner and Lead Architect approve another metric, QA proposes:

- Gate: overall **line coverage >= 50%**
- Report statement and branch coverage for visibility
- Do not exclude security, scoring or validation modules merely to raise the number
- New or changed business logic must include relevant tests even when repository coverage already exceeds 50%

## 8. Security and negative test baseline

- Missing, expired and invalid token -> 401
- Learner on every `/admin/**` operation -> 403
- Access to another learner's session/result -> expected policy response
- Sixth failed login within the agreed one-minute window -> 429 and `Retry-After`
- Unknown user and wrong password -> indistinguishable 401 body
- Invalid type, unknown field and over-length field -> 400 problem response
- Scenario text containing `<script>` -> rendered as text, never executed
- Session start response -> no `isPhishing`, explanation or answer-key field
- Duplicate answer and duplicate completion -> 409
- Error response -> no stack trace, SQL text, secret or filesystem path

## 9. Traceability

| Story/task | Planned verification |
|---|---|
| US-01 / T-04 | Registration validation, duplicate account, password storage/log checks |
| US-02 / T-07 | Login, generic 401, token expiry and logout decision |
| US-03 / T-09 | Admin-role denial and IDOR tests |
| US-04 / T-11 | Threshold, window, Retry-After and configuration tests |
| US-05 / T-14 | Schema-negative tests, safe errors and XSS escaping |
| US-08 / T-21 | Scenario count boundaries, 422 and answer-key leakage |
| US-10 / T-26 | Duplicate answer and session ownership |
| US-11 / T-28 | Score boundaries, rounding and repeat completion |
| US-14 / T-34 | CRUD validation, authorisation and audit fields |
| US-18 / T-43 | Clean-checkout Docker smoke test |
| US-20 / T-46, T-47 | Test plan and main journey e2e |
| US-23 / T-50 | SonarQube scan and technical-debt report |

## 10. Defect management

Defects are GitHub issues titled `[BUG] <short description>` and linked to the affected story and test evidence.

| Severity | Meaning | Expected handling |
|---|---|---|
| Critical | Security boundary bypass, data exposure, unusable system | Block merge/release; fix immediately |
| High | Must-path failure with no acceptable workaround | Fix before story acceptance |
| Medium | Incorrect secondary behaviour with workaround | Schedule in current or next sprint |
| Low | Cosmetic or minor documentation issue | Prioritise with Product Owner |

A defect issue records environment, revision, preconditions, steps, expected result, actual result, evidence and severity.

## 11. Responsibilities

- QA owns this plan, test design, defect reporting and coverage monitoring.
- Story implementers add unit and integration tests with their change.
- Lead Architect/DevOps owns CI implementation and supports contract/security test execution.
- Product Owner approves requirement clarifications and acceptance decisions.
- A reviewer independent of the author verifies the evidence before merge.

## 12. Current limitations

Sprint 1 contains documentation and contracts but not a complete runnable product. Automated execution evidence will be added as the dependent stories are implemented. This plan does not mark US-20 or its acceptance criteria complete by itself.
