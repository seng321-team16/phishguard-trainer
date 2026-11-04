# PhishGuard Trainer

A web-based phishing-awareness **simulator**. Learners judge fictional emails, receive feedback on the red flags they missed, and track their score over time. Administrators manage the scenario library. The system never sends email and never contacts real targets.

**Course:** SENG 321 Software Engineering · **Team:** Takım 16

## Team

| Member | Role |
|---|---|
| Ali Kaan Demiralp | Lead Software Architect and Technical Lead; DevOps and CI/CD Engineer |
| Murat Yatağan | Product Owner |
| Furkan Berkay Öztürk | Scrum Master and Agile Process Coach |
| Duhan Kaan Şenol | Requirements and UX Engineer |
| Erol Yağız Gemalmaz | Quality Assurance and Test Automation Engineer |

## Repository layout

| Path | Content |
|---|---|
| `api/` | Backend service and the OpenAPI contract (`api/openapi.yaml`) |
| `web/` | Web client |
| `deploy/` | Docker and docker-compose configuration |
| `docs/` | Project documentation (Sprint 1 deliverables in `docs/sprint-1/`) |
| `.github/` | Issue and pull request templates, CODEOWNERS, automation |

## Documentation

- [Project proposal](docs/sprint-1/01-Project-Proposal.md)
- [System vision and boundary](docs/sprint-1/02-System-Vision-and-Boundary.md)
- [OpenAPI contract](api/openapi.yaml)
- [Team roles and RACI](docs/sprint-1/04-Team-Roles-and-RACI.md)
- [Repository workflow and Git-Flow](docs/sprint-1/05-Repository-Workflow-and-Git-Flow.md)
- [Initial product backlog](docs/sprint-1/06-Initial-Product-Backlog.md)

## Running the project

Instructions are added with the first working version (Sprint 3). The target is a single command: `docker compose up`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [CONTRIBUTIONS.md](CONTRIBUTIONS.md) (individual contributions). Security issues: see [SECURITY.md](SECURITY.md).

## License

Apache License 2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).
