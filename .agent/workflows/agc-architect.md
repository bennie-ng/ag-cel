---
description: System Architecture and Design
---

# /agc-architect Workflow

This workflow defines the technical architecture based on the PRD.

## Prerequisites
- A `PRD.md` file should exist or the user should provide detailed requirements.

## Steps

1.  **System Design**
    - Use key: `senior-architect`
    - Goal: Define system components, data flow, and technology choices.
    - Output: High-level architecture description.

2.  **Visual Context**
    - Use key: `c4-context`
    - Goal: Generate a C4 Context diagram to visualize system boundaries.
    - Instruction: Use Mermaid.js syntax for diagrams.

3.  **Database Design**
    - Use key: `database-engineer` (New Skill)
    - Goal: Design the database schema (ERD or JSON structure).
    - Output: SQL schema or collection design.

4.  **Security Review**
    - Use key: `api-security-best-practices`
    - Goal: Review the proposed architecture for potential security flaws early.
    - Output: Security recommendations.

5.  **Documentation**
    - Use key: `architecture`
    - Goal: Document the Architecture Decision Records (ADRs) and final design.
    - Instruction: Create `ARCHITECTURE.md` with the full design.

## Iron Rules
1. If there is anything unclear, ask the user instead of inventing new stuff. Unless the user explicitly tells the AI to invent or suggest ideas.
