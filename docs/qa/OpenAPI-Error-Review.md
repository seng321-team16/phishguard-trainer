# OpenAPI Error Response Review

**Reviewer:** Erol Yağız Gemalmaz - QA/Test Automation  
**Related issue:** [#30](https://github.com/seng321-team16/phishguard-trainer/issues/30)  
**Reviewed source:** `api/openapi.yaml` on `develop`

## Overall result

The draft provides a strong initial error vocabulary: RFC 7807-style `application/problem+json`, reusable 400/401/403/404/409/429 responses, `Retry-After` on 429 and explicit 422 cases. Input schemas generally reject unknown properties, and the learner scenario schema does not contain the answer key.

The contract is suitable as a draft but needs the findings below before automated negative contract tests can be considered complete.

## Findings

| ID | Priority | Finding | Risk | Recommendation |
|---|---|---|---|---|
| API-ERR-01 | High | No reusable 500/Internal Server Error response is defined. | US-05 cannot prove that unexpected failures are safely represented. | Add a reusable 500 problem response and reference it from operations or document a common default response. |
| API-ERR-02 | High | Only the reusable 400 response has a representative example. | Consumers and tests cannot assert stable shapes/codes for other failures. | Add examples for 401, 403, 404, 409, 422 and 429. |
| API-ERR-03 | High | `Problem` requires only `title` and `status`; it has no stable application error code or validation-field structure. | Tests become coupled to human-readable text. | Add a stable `errorCode`; add optional `instance` and `invalidParams`/field-errors structure; constrain status to 400-599. |
| API-ERR-04 | Medium | Invalid `limit`/`offset` query values have schemas but GET operations do not document 400. | Runtime validation may produce an undocumented result. | Add 400 to `GET /me/results` and `GET /admin/scenarios`. |
| API-ERR-05 | Medium | Invalid UUID path behaviour is inconsistent across session and admin operations. | The same malformed identifier may be documented as 400 on one route and omitted on another. | Add/document 400 consistently for malformed `sessionId` and `scenarioId`. |
| API-ERR-06 | High | Completing a session before all required answers is not specified. | Client and implementation may choose conflicting 409/422 behaviour. | Decide and document the status, problem code and example. |
| API-ERR-07 | High | US-02 includes logout, but no logout operation or explicit client-only logout contract exists. | Story acceptance cannot be traced to an API behaviour. | Add `/auth/logout` if server invalidation is required, or clarify client-side token removal in the backlog. |
| API-ERR-08 | High | Audit acceptance says who changed what and when, while `AdminScenario` exposes only `createdAt` and `createdBy`. | US-14 cannot be fully verified. | Add updated metadata and define an audit-event schema/endpoint or narrow the criterion. |
| API-ERR-09 | Medium | The generic-login-error requirement is not represented by a 401 example or stable error code. | Unknown-user and wrong-password responses may leak account existence. | Add one identical login 401 example/code for both cases. |
| API-ERR-10 | Medium | `difficulty` is already accepted by session start although US-25 is a Could story. | Contract scope and backlog priority can diverge. | Mark it explicitly as reserved/optional future behaviour or remove it until US-25 is accepted. |
| API-ERR-11 | Low | Some nested/output objects do not reject additional properties. | Contract tests cannot reliably detect accidental response-data leakage. | Consider `additionalProperties: false` on security-sensitive response objects. |
| API-ERR-12 | Low | 429 models `Retry-After` only as integer seconds. | This is valid for the planned implementation but should be intentional. | Retain seconds and state the convention explicitly in the description/tests. |

## Suggested negative contract matrix

| Operation | Negative case | Expected contract |
|---|---|---|
| POST /auth/register | invalid field/extra field | 400 problem |
| POST /auth/register | duplicate username/email | 409 problem |
| POST /auth/login | unknown user/wrong password | identical 401 problem |
| POST /auth/login | threshold exceeded | 429 problem + Retry-After |
| POST /sessions | invalid count/difficulty | 400 problem |
| POST /sessions | insufficient matching scenarios | 422 problem |
| POST /sessions/{id}/answers | malformed UUID/body | 400 problem |
| POST /sessions/{id}/answers | wrong owner | documented 403/404 policy |
| POST /sessions/{id}/answers | duplicate answer | 409 problem |
| POST /sessions/{id}/complete | incomplete session | decision required |
| GET /me/results | invalid pagination | 400 problem |
| Admin operations | missing token / learner role | 401 / 403 problem |
| Admin CRUD | missing scenario | 404 problem |
| Any operation | unexpected internal failure | safe 500 problem |

## QA acceptance recommendation

The OpenAPI error review can be considered resolved when:

- Every row marked High has an approved decision.
- The contract includes representative error examples.
- An OpenAPI linter reports zero errors.
- Automated contract tests cover the negative matrix relevant to implemented operations.
- Responses contain no stack trace, SQL detail, credential, token or local filesystem path.

Implementation changes to `api/openapi.yaml` remain owned by the Lead Architect. This document records QA findings and does not silently change the approved API contract.
