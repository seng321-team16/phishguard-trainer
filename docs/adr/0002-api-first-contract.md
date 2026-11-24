# ADR-0002 – API-first contract

| Field | Value |
|---|---|
| Version | 1.0 |
| Date | 2026-11-15 |
| Owner | Ali Kaan Demiralp (`dalikaan`) – Lead Architect, DevOps |
| Related tasks | T-62 (this record), T-63 (monorepo skeleton) |
| Related stories | Process |

## Status

Accepted

## Context

- "OpenAPI-first" is a course constraint recorded in the Sprint 1 System Vision document, and `api/openapi.yaml` (OpenAPI 3.1) has existed since Sprint 1.
- The web application and the API are built in parallel by different people. Sprint 1 risk R5 is "late integration between UI and API"; its planned response is an OpenAPI contract and a mock server.
- The Sprint 1 security drivers require schema validation on every request body and query, "derived from OpenAPI", with unknown fields rejected and maximum lengths enforced.
- The contract carries security rules, not only shapes: which operations need a bearer token, which fields a learner may see (`ScenarioPublic` has no answer key), and which error format is used (`application/problem+json`).
- If the contract and the code are written separately, they drift. Then the document describes one API and the server implements another, and neither the frontend nor the tests can trust it.

## Decision

We will treat **`api/openapi.yaml` as the single source of truth** for the HTTP API. Code follows the contract, never the other way round.

1. **Contract before code.** A route, parameter, field or status code is added to `api/openapi.yaml` first. Only then is it implemented.
2. **Server validation is generated from the contract.** The Express application loads `api/openapi.yaml` into `express-openapi-validator`. At runtime the middleware:
   - rejects requests to paths or methods that are not in the contract;
   - validates path parameters, query parameters and request bodies (types, formats, `minLength`/`maxLength`, enums, required fields) and rejects unknown fields where the schema sets `additionalProperties: false`;
   - validates responses in development and test runs, so a response that does not match the contract fails a test instead of reaching a client.

   Validation failures are returned as `400` problem responses in the contract's `Problem` format. No hand-written validation schema duplicates the contract. Business rules that a schema cannot express (ownership, uniqueness, session state) stay in the service layer.
3. **Client types are generated from the contract.** `openapi-typescript` generates TypeScript types into `packages/contract/`. The web application, the API and the tests import request and response types from that package. Generated code is never edited by hand; it is regenerated when the contract changes.
4. **The contract is linted and mocked.** Spectral lints `api/openapi.yaml` in CI. Prism serves the same file as a mock API so that frontend work does not wait for the backend.
5. **Contract changes need Lead Architect review.** Any change to `api/openapi.yaml` belongs to a task owned by the Lead Architect (Ali Kaan Demiralp) or is approved by him in the pull request. A contract change, the regenerated types and the code that depends on it are merged together so that `develop` never holds a contract that the code does not satisfy.
6. **Versioning.** The base path carries the major version (`/api/v1`). Additive changes (new optional fields, new operations) raise `info.version` and stay in `v1`. A breaking change needs a new ADR.

## Alternatives considered

| Alternative | Why it was rejected |
|---|---|
| **Code-first**: write the routes, generate the OpenAPI document from annotations or schemas in code | The document becomes an output that nobody reviews, the frontend cannot start until the backend exists, and it contradicts the OpenAPI-first course constraint and the Sprint 1 contract that already exists. |
| **Contract as documentation only**: keep `api/openapi.yaml` but validate with hand-written schemas (for example Zod) | Two descriptions of the same request always drift. Every change would have to be made twice and reviewed twice, and a missed length limit is a security defect in this product. |
| **Generate the whole server stub** from the contract with a code generator | Generated controllers are hard to keep after the first run and fight the layered structure (routes → controllers → services → repositories). Runtime validation gives the same guarantee with less generated code. |
| **GraphQL or tRPC** instead of REST + OpenAPI | Would discard the Sprint 1 contract and the course's OpenAPI requirement. tRPC also ties the API to TypeScript clients only. |
| **Any member may change the contract freely** | Small "quick" changes to shapes break the other side without warning. One accountable reviewer keeps the contract coherent and keeps security rules (answer-key leakage, auth on every operation) from being weakened by accident. |

## Consequences

**Positive**

- The frontend and the tests can be written against the Prism mock from the first day of Sprint 2 and switched to the real API without changing types.
- A request that is not described in the contract cannot reach a controller. Input validation, including maximum lengths and unknown-field rejection, is enforced in one place.
- A mismatch between client and server is a compile error (generated types) or a failing test (response validation), not a bug found in the demo.
- The contract is a reliable document for the SRS, the C4 documentation and the test plan.

**Negative and accepted**

- Every API change has an extra step: edit the contract, regenerate the types, then write code. For very small changes this feels slow.
- The Lead Architect is a bottleneck for contract changes. The team accepts this for a ten-week project; reviews of contract pull requests have priority.
- The validator reports schema errors only. The service layer still has to check ownership and state, and those rules need their own tests.
- Response validation costs time on every request, so it is enabled in development and tests and may be disabled in the production Compose profile.
- OpenAPI 3.1 support differs between tools. A construct that Spectral, Prism, `express-openapi-validator` and `openapi-typescript` do not all accept must not be used in the contract.
