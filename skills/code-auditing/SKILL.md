---
name: code-auditing
description: Analyze code for security vulnerabilities like SQL injection, XSS, and broken authentication. Use when tasked with reviewing code for security flaws.
allowed-tools: Read, Glob, Grep
---

# Code Auditing Framework

> "Trust, but verify. Then verify again."

## 🎯 Selective Reading Rule

**Read ONLY files relevant to the security context!**

| File | Description | When to Read |
|------|-------------|--------------|
| `*.py`, `*.js`, `*.ts` | Source code files | Identify potential vulnerabilities |
| `poetry.lock`, `package-lock.json` | Dependency files | Check for known vulnerable dependencies |
| `README.md` | Project documentation | Understand architecture and data flow |

---

## 🔗 Related Skills

| Skill | Use For |
|-------|---------|
| `@[skills/secure-refactoring]` | Fixing identified vulnerabilities |
| `@[skills/security-documentation]` | Documenting findings |
| `@[skills/api-security-best-practices]` | API specific security checks |

---

## Core Principle

**"Security is not an afterthought."**

- Identify input vectors (API endpoints, form inputs)
- Trace data flow to sinks (Database queries, HTML output)
- Look for missing validation or sanitization

---

## Auditing Checklist

Before reporting findings:

- [ ] Identified potential SQL injection points
- [ ] Checked for XSS vulnerabilities in output
- [ ] Verified authentication and authorization logic
- [ ] Checked for hardcoded secrets
- [ ] Validated input sanitization


## Gap Analysis Rule
Always identify gaps and suggest next steps to users. In case there is no gaps anymore, then AI should clearly state that there is no gap left.
