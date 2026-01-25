# Developer Standards

## Overview
General guidelines for Developers using AgCel. Specific technology standards are located in `docs/standards/`.

## AgCel Workflows
AgCel provides specific slash commands to automate your daily tasks:

- **`/implement_feature`**: The primary workflow for writing code.
  - Follows the **TDD Red-Green-Refactor** loop.
  - **Important**: If you are starting a brand new project, you MUST run **`/init_service`** first. `/implement_feature` relies on existing configuration files to detect the tech stack.
- **`/pre_commit_check`**: Run this before merging to validate API contracts, linting, and tests.

## Key Responsibilities
- Writing clean, maintainable code.
- Unit testing and integration testing.
- Code reviews.
- Documentation.

## Best Practices

### SOLID Principles
Adhere to the SOLID principles for OOP design:
- **S**: Single Responsibility Principle.
- **O**: Open/Closed Principle.
- **L**: Liskov Substitution Principle.
- **I**: Interface Segregation Principle.
- **D**: Dependency Inversion Principle.

### Code Quality & Clean Code
- **Naming**: Use meaningful variable and function names.
- **Functions**: Keep functions small and focused on one thing.
- **DRY** (Don't Repeat Yourself) & **KISS** (Keep It Simple, Stupid).
- **Boy Scout Rule**: Leave the code cleaner than you found it.

### Code Reviews
- Review code for logic, readability, and security, not just syntax.
- Be constructive and respectful. Use questions ("Have we considered...?") rather than demands.

### Version Control
- Commit often with descriptive messages.
- Use feature branches and Pull Requests.
- Avoid large, "big bang" merges.

## Testing
- Write testable code.
- Follow **TDD** (Test Driven Development) where appropriate.
