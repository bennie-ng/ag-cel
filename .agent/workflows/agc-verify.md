---
description: Verification, Testing, and Auditing
---

# /agc-verify Workflow

This workflow audits the codebase for bugs, quality issues, and security vulnerabilities.

## Steps

1.  **Static Analysis & Audit**
    - Use key: `code-auditing`
    - Goal: General code quality review and linting.
    - Output: List of code style issues or potential bugs.

2.  **Security Scan**
    - Use key: `vulnerability-scanner`
    - Goal: Scan dependencies and code patterns for known vulnerabilities.
    - Instruction: Check `package.json` / `requirements.txt` against known CVE databases (simulated).

3.  **SQL Injection Check**
    - Use key: `sql-injection-testing`
    - Goal: Specifically check database queries for injection risks.

4.  **Test Verification**
    - Use key: `qa-engineer` / `test-fixing`
    - Goal: Run all tests and attempt to fix any failures.
    - Instruction: Ensure all tests pass before completing the workflow.

## Iron Rules
1. If there is anything unclear, ask the user instead of inventing new stuff. Unless the user explicitly tells the AI to invent or suggest ideas.
