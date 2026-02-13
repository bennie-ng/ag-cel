---
name: security-documentation
description: Explain vulnerability risks in plain English. Use when tasked with documenting security issues.
allowed-tools: Read, Write
---

# Security Documentation Framework

> "Clarity is Security."

## 🎯 Selective Reading Rule

**Read ONLY files that need documenting!**

| File | Description | When to Read |
|------|-------------|--------------|
| `*.py`, `*.js`, `*.ts` | Source code files | Identify what needs documenting |
| `findings.md` | Audit findings | Source for documentation |

---

## 🔗 Related Skills

| Skill | Use For |
|-------|---------|
| `@[skills/code-auditing]` | Identifying vulnerabilities to document |
| `@[skills/writing-plans]` | Structuring documentation |

---

## Core Principle

**"Explain the risk, not just the flaw."**

- Describe the vulnerability (the flaw)
- Explain the potential impact (the risk)
- Recommend remediation (the fix)

---

## Documentation Checklist

Before publishing:

- [ ] Clear description of the vulnerability
- [ ] Realistic impact assessment
- [ ] Actionable remediation steps
- [ ] References to relevant standards (OWASP, CWE)
- [ ] Check for technical accuracy


## Gap Analysis Rule
Always identify gaps and suggest next steps to users. In case there is no gaps anymore, then AI should clearly state that there is no gap left.
