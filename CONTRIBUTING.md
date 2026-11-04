# Contributing

The full rules are in [docs/sprint-1/05-Repository-Workflow-and-Git-Flow.md](docs/sprint-1/05-Repository-Workflow-and-Git-Flow.md). Summary:

1. Every change starts from a GitHub issue.
2. Branch from `develop`: `feature/<issue#>-<short-name>`. Never commit directly to `main` or `develop`.
3. Use Conventional Commits, e.g. `feat(auth): add login endpoint (#12)`.
4. Open a pull request into `develop`. It needs at least one approving review from another team member and passing status checks.
5. Squash-merge, then delete the branch.
6. Never commit secrets. Use `.env` (git-ignored) and update `.env.example` for new variables.
