---
description: Development and Implementation
---

# /agc-build Workflow

This workflow guides the implementation of features using best practices.

## Trigger
- User provides a specific feature to build (e.g., "Implement user login").

## Steps

1.  **Test-Driven Development**
    - Use key: `test-driven-development`
    - Goal: Write failing tests for the requested feature *before* implementation.
    - Instruction: Create `*.test.ts` (or appropriate extension) files first.

2.  **Implementation**
    - Use key: `typescript-expert` (or `python-patterns` based on language)
    - Goal: Implement the feature to pass the tests.
    - Instruction: Follow SOLID principles and language-specific idioms.

3.  **UI Implementation (If Frontend)**
    - Use key: `react-patterns` / `ui-ux-designer`
    - Goal: Ensure UI components are accessible and follow the design system.
    - Instruction: Skip this step if backend-only.

4.  **Refactoring**
    - Use key: `secure-refactoring`
    - Goal: Refactor the code for better readability and security after getting tests to pass (Green phase).

## Iron Rules
1. If there is anything unclear, ask the user instead of inventing new stuff. Unless the user explicitly tells the AI to invent or suggest ideas.
