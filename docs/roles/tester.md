# Tester Standards

## Overview
Standards for QA and Testing roles.

## AgCel Workflows
Automate your test planning and reporting:

- **`/plan_qa`**: Generates a comprehensive Test Plan based on requirements, ensuring the Test Pyramid is respected.
- **`/report_bug`**: Creates a structured bug report with steps to reproduce, ensuring developers have what they need to fix it.

## Key Responsibilities
- Test planning and execution.
- Defect tracking and reporting.
- Automation testing.

## Best Practices

### The Test Pyramid
- **Unit Tests**: Foundation (fast, cheap, numerous).
- **Integration Tests**: Middle layer (verify components work together).
- **E2E / UI Tests**: Top layer (slow, expensive, fewer).
- Avoid the "Ice Cream Cone" anti-pattern (too many UI tests, few unit tests).

### Defect Reporting
Write high-quality bug reports:
- **Summary**: Concise description.
- **Steps to Reproduce**: Detailed, numbered steps.
- **Expected vs Actual**: clearly state the deviation.
- **Evidence**: Attach screenshots, videos, or logs.

### Exploratory Testing
- Time-boxed sessions to explore the application creatively.
- Go beyond the "Happy Path" to find edge cases.

### Automation Strategy
- Automate regression tests to speed up release cycles.
- Do not try to automate everything (e.g., visual layout usually needs human eyes).

## Types of Testing
- Unit Testing
- Integration Testing
- System Testing
- UAT
