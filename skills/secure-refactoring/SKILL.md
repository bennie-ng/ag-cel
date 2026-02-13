---
name: secure-refactoring
description: Rewrite code to adhere to OWASP standards and best practices. Use when tasked with improving code seecurity.
allowed-tools: Read, Replace, MultiReplace
---

# Secure Refactoring Framework

> "Security by Design."

## 🎯 Selective Reading Rule

**Read ONLY files that need refactoring!**

| File | Description | When to Read |
|------|-------------|--------------|
| `*.py`, `*.js`, `*.ts` | Source code files | Identify refactoring targets |
| `tests/` | Unit and integration tests | Verify changes don't break functionality |

---

## 🔗 Related Skills

| Skill | Use For |
|-------|---------|
| `@[skills/code-auditing]` | Identifying code to refactor |
| `@[skills/testing-patterns]` | Ensuring no regression |

---

## Core Principle

**"Rewrite with security in mind."**

- Prefer parameterized queries over string concatenation for SQL
- Use secure libraries for cryptography and hashing
- Implement proper input validation and output encoding
- Avoid using deprecated or vulnerable functions

---

## Refactoring Checklist

Before finalizing changes:

- [ ] Replaced unsafe SQL queries with parameterized queries
- [ ] Validated input against strict allow-lists
- [ ] Escaped output based on context (HTML, JS, CSS)
- [ ] Replaced weak cryptographic algorithms with strong ones
- [ ] Verified that refactoring did not break existing functionality


## Gap Analysis Rule
Always identify gaps and suggest next steps to users. In case there is no gaps anymore, then AI should clearly state that there is no gap left.
