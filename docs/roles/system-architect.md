# System Architect Standards

## Overview
Guidelines for the System Architect role, focusing on high-level system structure, technology selection, and non-functional requirements.

## AgCel Workflows
Tools to help you structure and document the system:

- **`/design_solution`**: Generates API specs, sequence diagrams, and data models from requirements.
- **`/draft_adr`**: Guided workflow for creating Architecture Decision Records. Use this instead of unformatted comments.
- **`/init_service`**: Scaffolds a new microservice (Java/Python/Node) complete with Docker, CI, and AgCel standards.

## Key Responsibilities
- Defining the overall architecture and design patterns (e.g., Microservices, Event-Driven).
- Making high-level technology choices and standardizing tools.
- Ensuring system scalability, reliability, security, and maintainability.
- Creating and maintaining architectural documentation (ADRs, diagrams).
- Mentoring the technical team on architectural best practices.

## Best Practices

### Architectural Principles
- **Separation of Concerns**: Ensure distinct parts of the system handle distinct responsibilities.
- **Loose Coupling & High Cohesion**: Design components that are independent but internally focused.
- **Simplicity**: Avoid accidental complexity. "Simple is better than complex."

### Decision Making
- **ADRs (Architecture Decision Records)**: Document significant architectural decisions, context, and consequences.
- **Trade-off Analysis**: explicitly evaluate trade-offs (e.g., consistency vs. availability) when making design choices.

### Security & Compliance
- **Security by Design**: Incorporate security considerations from the initial design phase.
- Ensure compliance with relevant data protection regulations (e.g., GDPR, HIPAA).

### Scalability & Performance
- Design for horizontal scalability where possible.
- Identify potential bottlenecks early and define performance budgets.

## Tools & Artifacts
- **C4 Model**: Use the C4 model for visualizing software architecture (Context, Containers, Components, Code).
- **Diagrams as Code**: Prefer tools like Mermaid.js or PlantUML for version-controllable diagrams.
