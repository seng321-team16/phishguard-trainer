# Acceptance Criteria Testability Review

**Reviewer:** Erol Yağız Gemalmaz - QA/Test Automation  
**Related issue:** [#30](https://github.com/seng321-team16/phishguard-trainer/issues/30)  
**Reviewed source:** `docs/sprint-1/06-Initial-Product-Backlog.md`

## Review rule

An acceptance criterion is testable when it identifies observable inputs/preconditions, an action and an unambiguous expected result. The items below are review findings, not approved requirement changes. Product Owner approval is required before altering scope or acceptance criteria.

## Summary

- Strong baseline: HTTP outcomes, role checks, answer-key confidentiality and duplicate-operation behaviour are mostly explicit.
- Main gaps: vague quantities, unspecified rounding/threshold rules, incomplete logout behaviour, undefined viewport/coverage metrics and underspecified quality gates.
- Priority: clarify Must stories before implementation begins so tests do not encode assumptions.

## Findings and proposed clarifications

| Priority | Story | Finding | Proposed clarification | Suggested owner |
|---|---|---|---|---|
| High | US-01 | "Clear reason" is not machine-testable; log verification is unspecified. | Return a stable validation code/field list; assert password and plaintext credential are absent from responses and captured logs. | PO + Lead Architect |
| High | US-02 | Title says login and logout, but no logout criterion or API operation exists. Token expiry duration is unspecified. | Decide whether logout is client-side token deletion or server-side invalidation; define expiry configuration and observable result. | PO + Lead Architect |
| High | US-04 | "More than 5" and "per IP/account" are ambiguous. | State that the sixth failed attempt in a rolling or fixed 60-second window returns 429; define whether IP and account limits are independent. | Lead Architect |
| Medium | US-06 | "About 60%" and difficulty mix are vague. | Define exact or bounded counts, for example 18 phishing/12 legitimate and at least one scenario per difficulty. | PO |
| Medium | US-07 | "Fixed list" and "human-readable" lack completeness rules. | Name the canonical source and require every code to have a non-empty unique description in UI and API. | PO |
| High | US-08 | Randomness is difficult to reproduce; difficulty-filter shortage behaviour is unclear. | Allow deterministic test seeding and define 422 against the selected difficulty pool. | Lead Architect |
| Medium | US-09 | "Laptop and phone widths" names no viewports or browsers. | Verify at agreed widths such as 390x844 and 1366x768; links have no navigable anchor/action. | Requirements/UX |
| High | US-11 | "Rounded" does not state the tie rule; incomplete-session completion is undefined. | Define integer rounding rule and response when unanswered scenarios remain. | PO + Lead Architect |
| Medium | US-13 | Flat/improving/declining thresholds and first-session behaviour are undefined. | Equal score = flat; higher/lower compare with the immediately previous completed session; first session has no trend. | PO |
| High | US-14 | "Who changed what and when" exceeds the current response schema. | Define created/updated/deleted audit events and required actor, timestamp, action, resource and changed fields. | Lead Architect |
| Medium | US-16 | Average precision, ties and fewer-than-five scenarios are undefined. | Define rounding precision, deterministic tie-breaker and return all available items when fewer than five have answers. | PO |
| Medium | US-18 | Startup readiness and timeout are not defined. | Define health checks and a maximum expected startup period on the supported clean environment. | DevOps |
| High | US-19 | Coverage metric and exact required checks are unspecified. | Name the coverage metric and required check names; QA recommends line coverage >= 50%. | DevOps + QA |
| High | US-20 | Tools, scope and evidence format are not specified. | Select test framework after stack choice; require CI report, coverage artifact and traceability to listed security cases. | QA |
| Medium | US-21 | No lint tool or pass rule is named. | Select the OpenAPI linter and require zero errors; warnings require documented disposition. | Lead Architect |
| Medium | US-23 | A report can exist while quality is poor; no quality gate is defined. | Define required report fields and whether a Sonar quality gate blocks final submission. | QA + Lead Architect |
| Low | US-24 | Reset-token expiry, single use and invalid-token cases are absent. | Define stub delivery, token expiry/single use and safe responses. | PO |
| Low | US-25 | Only accepted values are specified; response filtering and insufficient-data behaviour are absent. | Require every returned scenario to match the requested difficulty; invalid value -> 400; insufficient pool -> defined 422. | PO + QA |

## Criteria already suitable as a baseline

The following are sufficiently observable for initial test design, although implementation details may add cases:

- Duplicate username/email -> 409 and no account created
- Learner access to admin operations -> 403
- Schema violations -> 400
- Session response excludes answer key and explanation
- Duplicate answer/completion -> 409
- Another learner's session cannot be answered
- Learner never sees the admin page
- Secrets are not committed to the repository

## Decision log required

Before coding tests, record decisions for:

1. Logout model and token expiry
2. Rate-limit algorithm and keying
3. Score rounding and incomplete completion
4. Trend calculation
5. Audit-event structure
6. Coverage metric
7. SonarQube quality-gate expectations

Approved decisions should be copied into the backlog/OpenAPI by their responsible owner and linked to this review.
