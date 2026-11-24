# Architecture Decision Records

| Field | Value |
|---|---|
| Version | 1.0 |
| Date | 2026-11-15 |
| Owner | Ali Kaan Demiralp (`dalikaan`) – Lead Architect, DevOps |
| Related tasks | T-62 |
| Related stories | Process |

## What an ADR is

An Architecture Decision Record (ADR) is a short document that records **one** architecturally significant decision: the situation that forced a choice, the choice that was made, the options that were rejected and what the team accepts as a result.

We keep ADRs because the SRS and the Sprint 1 documents are deliberately technology-neutral. The ADRs are the place where the concrete choices are written down, so that:

- a new reader can see *why* the system looks the way it does, not only *how* it looks;
- a decision is not silently re-opened in every code review;
- the owner of a decision can defend it with the alternatives and trade-offs in front of them.

## Rules

- One decision per file. File name: `NNNN-short-title-in-kebab-case.md`, numbered in the order the decisions were made (`0001`, `0002`, …). The ID used in other documents is `ADR-NNNN`.
- An accepted ADR is not edited to change the decision. A new ADR is written, and the old one gets the status `Superseded by ADR-NNNN`. Typos and broken links may be fixed in place.
- Every ADR has the five sections of the template below, in that order.
- ADRs are owned by the Lead Architect. Anyone may propose one through a pull request; it becomes `Accepted` when the Lead Architect approves the pull request.
- An ADR must not contradict `api/openapi.yaml` or the Sprint 1 constraints. If a decision needs the contract to change, the contract change is made first (see [ADR-0002](0002-api-first-contract.md)).

### Status values

| Status | Meaning |
|---|---|
| `Proposed` | Under discussion, not binding yet |
| `Accepted` | Agreed and binding for the code base |
| `Deprecated` | No longer relevant, nothing replaces it |
| `Superseded by ADR-NNNN` | Replaced by a newer decision |

## Template

Copy this block into a new file and fill it in.

```markdown
# ADR-NNNN – <Short title of the decision>

| Field | Value |
|---|---|
| Version | 1.0 |
| Date | YYYY-MM-DD |
| Owner | <Name> (`<github-handle>`) |
| Related tasks | T-XX |
| Related stories | US-YY or Process |

## Status

Proposed | Accepted | Deprecated | Superseded by ADR-NNNN

## Context

The situation, the forces and the constraints that make a decision necessary.
Facts only, no solution yet.

## Decision

The choice, written in active voice: "We will …".

## Alternatives considered

Each rejected option with the reason it was rejected.

## Consequences

What becomes easier, what becomes harder, and which risks or follow-up work the team accepts.
```

## Index

| ADR | Title | Status | Date | Owner |
|---|---|---|---|---|
| [ADR-0001](0001-technology-stack.md) | Technology stack | Accepted | 2026-11-15 | Ali Kaan Demiralp |
| [ADR-0002](0002-api-first-contract.md) | API-first contract | Accepted | 2026-11-15 | Ali Kaan Demiralp |
| [ADR-0003](0003-stateless-jwt-auth.md) | Stateless JWT authentication | Accepted | 2026-11-15 | Ali Kaan Demiralp |
