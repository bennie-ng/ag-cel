---
description: Production Deployment
---

# /agc-deploy Workflow

This workflow prepares the application for production deployment.

## Steps

1.  **Containerization**
    - Use key: `docker-expert`
    - Goal: Create or optimize `Dockerfile` and `docker-compose.yml`.
    - Output: Production-ready container configuration.

2.  **Infrastructure as Code**
    - Use key: `aws-serverless` / `vercel-deployment`
    - Goal: Generate deployment configuration (Terraform, CDK, or Vercel/Netlify config).
    - Instruction: Choose the provider based on user preference or project type.

3.  **CI/CD Pipeline**
    - Use key: `ci-cd-engineer`
    - Goal: Create GitHub Actions or GitLab CI pipeline files.
    - Output: `.github/workflows/deploy.yml` or equivalent.

4.  **Pre-Flight Checks**
    - Use key: `seo-audit`
    - Goal: Check public-facing pages for SEO if applicable.

5.  **Documentation**
    - Use key: `security-documentation`
    - Goal: Update `README.md` and security docs with deployment instructions.

## Iron Rules
1. If there is anything unclear, ask the user instead of inventing new stuff. Unless the user explicitly tells the AI to invent or suggest ideas.
