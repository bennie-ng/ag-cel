# AgCel (Antigravity Cell)

AgCel is the **Automated Governance Layer** for your software projects. It provides a unified source of truth for standards, rules, and AI-driven workflows, ensuring consistent quality across diverse tech stacks.

## 🚀 Quick Install
To add AgCel standards and AI capabilities to *any* project, run:
```bash
curl -sL https://raw.githubusercontent.com/hoangna1204/ag-cel/main/install.sh | bash
```
This installs the `.agent/` folder, enabling your AI agent to understand your project's strict rules and workflows seamlessly.

---

## 🔄 The AI-Driven Lifecycle
AgCel empowers your AI agent to participate in every stage of the SDLC using slash commands:

1.  **Define (Business Analyst)**
    - Command: `/spec_feature`
    - Action: Turns vague ideas into strict **User Stories** and **Acceptance Criteria**.
    - Output: `requirements.md` (INVEST compliant).

2.  **Plan (QA/Tester)**
    - Command: `/plan_qa`
    - Action: Analyses requirements to build a **Test Plan** covering Unit, Integration, and Edge cases.
    - Output: `test_plan.md` (Test Pyramid compliant).

3.  **Build (Developer)**
    - Command: `/implement_feature`
    - Action: Writes code using **TDD (Red-Green-Refactor)**.
    - Output: Production-ready code + Passing Tests.

4.  **Verify (CI/CD)**
    - Command: `/pre_commit_check`
    - Action: Validates **API Contracts**, styles, and safety rules before merging.
    - Output: "✅ Ready to Commit".

---

## 🧠 Core Features

### 1. Global Rules
The source of truth for all AI interactions.
- **[Global Rules](.agent/rules/global.md)**: Defines the "No Assumption Policy", TDD Mandate, and Operational Workflows.

### 2. Tech Stack Standards
Automatically applied based on project detection (`pom.xml`, `package.json`, etc.).
- **[Java/Spring Boot](.agent/rules/springboot.md)**: DTOs, Hexagonal Arch, Flyway.
- **[Python](.agent/rules/python.md)**: FastAPI, Pydantic, Alembic.
- **[Node.js](.agent/rules/nodejs.md)**: Fastify, TypeBox, BullMQ.
- **[React/Next.js](.agent/rules/react.md)**: Server Components, Shadcn, TypeScript.

### 3. Role Guides
Detailed standards for human team members:
- [Developer](docs/roles/developer.md)
- [Product Owner](docs/roles/product-owner.md)
- [QA / Tester](docs/roles/tester.md)
- [Business Analyst](docs/roles/business-analyst.md)

---

## 🤖 How It Works
Once installed, your AI agent (Antigravity) will:
1.  **Auto-Detect**: Scan your repo and load the correct rules (e.g., "Ah, this is a Spring Boot app").
2.  **Enforce**: Refuse to write code without tests (TDD mandate).
3.  **Assist**: Use Skills like `scaffold_service` or `api_contract_tests` to perform complex tasks autonomously.
