# ADR-0003 – Stateless JWT authentication

| Field | Value |
|---|---|
| Version | 1.0 |
| Date | 2026-11-15 |
| Owner | Ali Kaan Demiralp (`dalikaan`) – Lead Architect, DevOps |
| Related tasks | T-62 (this record) |
| Related stories | Process |

## Status

Accepted

## Context

- The contract (`api/openapi.yaml`) already fixes the outside shape of authentication: `POST /auth/login` returns a `TokenResponse` (`accessToken`, `tokenType: Bearer`, `expiresIn` in seconds), and every other operation except registration requires the `bearerAuth` scheme (HTTP bearer, format JWT). The contract has **no** logout, refresh or revocation operation.
- The Sprint 1 security drivers ask for a "short-lived signed access token (JWT or opaque session); logout and expiry; tokens never in URLs", and for the role to be checked server-side on every route, with learners limited to their own results.
- The provisional architecture is a browser SPA talking to a **stateless** REST API with a single PostgreSQL instance. Only local accounts exist; external identity providers are out of scope.
- The product stores little sensitive data (username, email, training scores) and the security policy (`SECURITY.md`) states that it must not be used to protect real data.
- The web application must not allow script injection (scenario bodies are rendered as escaped text), but a security product should still limit what a successful injection could steal.

## Decision

We will authenticate API requests with a **short-lived, stateless JWT access token**.

1. **Issuing.** `POST /auth/login` verifies the password against the Argon2id hash and returns a JWT signed with HMAC-SHA-256 (`HS256`) using the secret from the `JWT_SECRET` environment variable. The claims are the user id (`sub`), the role (`role`: `learner` or `admin`), the issue time (`iat`) and the expiry (`exp`). The token contains no email address, password data or other personal data.
2. **Lifetime.** The token is short-lived: the default lifetime is 60 minutes, which is the value shown in the contract's `expiresIn` example (3600 seconds). The response always reports the real lifetime in `expiresIn`. There is no refresh token in the MVP; when the token expires the API answers `401` and the user logs in again.
3. **Transport.** The client sends the token only in the `Authorization: Bearer <token>` header. Tokens are never placed in URLs and never written to logs.
4. **Client storage.** The web application keeps the token **in memory only** (application state). It is not written to `localStorage`, `sessionStorage` or a cookie. Reloading the page or closing the tab therefore ends the login.
5. **Server-side checks on every request.** An authentication middleware verifies the signature, the algorithm (only `HS256` is accepted) and the expiry. A missing, malformed or expired token gives `401`. An authorisation middleware then checks the `role` claim against the operation (`/admin/**` needs `admin`) and gives `403` otherwise. Ownership is checked again in the service layer, so a learner cannot read or change another user's session by guessing an id. The client's own role handling is only for showing or hiding screens; it is never trusted.
6. **Logout.** Logout is a client action: the web application discards the token from memory and returns to the login screen. No request is sent, because the server keeps no session to end.
7. **Server-side revocation is out of scope for the MVP.** The API keeps no token list, deny list or session table. A token that has been issued stays valid until its `exp` time, even after the user logs out.

### Why revocation is out of scope

- Revocation needs server-side state that is read on every request (a deny list or a session store). That removes the main benefit of a stateless token and adds a table or a cache service, with its own code, tests and failure modes.
- The contract has no logout or revocation operation. Adding one is a contract change (ADR-0002) that the MVP backlog does not contain.
- The exposure is bounded: a token lives for at most its short lifetime, it is held only in memory, and the data behind it is training scores, not real personal or financial data.
- The time is better spent on the security stories that are in the MVP (hashing, role checks, validation, rate limiting).

## Alternatives considered

| Alternative | Why it was rejected |
|---|---|
| **Server-side session with an opaque id in an `HttpOnly` cookie** | Gives immediate logout and revocation and hides the credential from JavaScript, but needs a session store, CSRF protection for every state-changing request and cookie handling in the Prism mock and the tests. It also does not match the contract's `bearerAuth` scheme and `TokenResponse`. |
| **JWT stored in `localStorage` or `sessionStorage`** | Survives a page reload, which is more convenient, but any injected script can read the token and send it elsewhere. In-memory storage keeps the token out of persistent, script-readable storage. |
| **Access token plus refresh token (rotating, `HttpOnly` cookie)** | The standard answer to "short-lived but convenient", but it brings back server-side state for the refresh tokens, a new endpoint in the contract and CSRF handling for the cookie. Too much for the MVP; it is the preferred upgrade path if the product continues. |
| **JWT with a server-side deny list** (revocation by token id) | Solves logout, but every request needs a lookup, so the design is no longer stateless and has the cost of sessions without their simplicity. |
| **Asymmetric signing (RS256 / EdDSA)** | Useful when other services must verify tokens without being able to issue them. There is exactly one service that both issues and verifies, so a single secret from the environment is simpler and sufficient. |
| **External identity provider (OAuth 2.0 / OpenID Connect)** | External identity providers and SSO are explicitly outside the system boundary. It would also add an external dependency to a demo that must run from one Compose command. |

## Consequences

**Positive**

- The API stays stateless: no session table, no cache service, nothing extra in Docker Compose, and any API instance can serve any request.
- Authentication adds no database query per request; the role comes from the verified token.
- The implementation matches the contract exactly (`bearerAuth`, `TokenResponse`) and is easy to exercise with Supertest, Playwright and the Prism mock.
- No cookie is used for authentication, so cross-site request forgery does not apply to the API.
- An injected script cannot read the token from persistent browser storage, and the token leaves no copy on a shared computer after the tab is closed.

**Negative and accepted**

- **Logout does not invalidate the token on the server.** A token that was copied before logout can be used until it expires. The short lifetime is the only limit. This is the main trade-off of this decision and must be stated in the security section of the final report.
- **Changes to an account do not take effect immediately.** If an account's role were changed or the account removed, an already issued token would keep its old claims until expiry. The MVP has no user-management operation in the contract, so this cannot be triggered through the API today.
- **Reloading the page logs the user out.** A learner who refreshes the browser in the middle of a session must log in again. Answers that were already submitted are stored on the server, so no submitted work is lost.
- **No silent renewal.** After the lifetime ends, the next request returns `401` and the web application sends the user to the login screen.
- **The signing secret is a single point of failure.** Anyone who has `JWT_SECRET` can create an admin token. The secret comes only from the environment (`.env` is git-ignored), must be long and random, and changing it invalidates all tokens at once. That is also the emergency revocation procedure for the MVP.
- If the project continues after the course, revocation should be revisited in a new ADR that supersedes this one (most likely refresh-token rotation).
