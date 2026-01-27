---
description: Implement a new feature using TDD and Artifact-Driven Development.
---
# Implement Feature Workflow

## 1. Preparation & Planning
- **Goal**: Understand the requirements and existing standards.
- **Actions**:
  1. Read `.agent/rules/global.md` to load the **TDD Mandate**.
  2. Detect the stack and read the specific rule file (e.g., `.agent/rules/python.md`).
  3. Create/Update the `task.md` artifact with the checklist of work.
  4. Create an `implementation_plan.md` and **ask for user approval**.

## 2. The "Red" Phase (Failing Test)
- **Goal**: define the expected behavior before writing logic.
- **Actions**:
  1. Create the test file first (e.g., `tests/test_feature.py`).
  2. Write a test case that fails.
  3. Run the test to confirm failure.

## 3. The "Green" Phase (Implementation)
- **Goal**: Pass the test with minimal code.
- **Actions**:
  1. Write the implementation logic.
  2. Run the test again.
  3. Loop until the test passes.

## 4. The "Refactor" Phase (Review)
- **Goal**: Ensure code quality and rule compliance.
- **Actions**:
  1. Run the `code_review_assistant` skill on the modified files.
  2. Fix any warnings or violations raised by the assistant.
  3. Update `task.md` to mark the item as complete.

## 5. Verification Phase (Gap Analysis)
- **Goal**: Ensure the implemented solution fully matches the original requirements and no details were missed.
- **Actions**:
  1. Review the initial requirements (from user request or `task.md`) against the current project state.
  2. Explicitly check for any missing edge cases, unimplemented features, or deviations from the plan.
  3. If gaps are found, add them to `task.md` and repeat the cycle; otherwise, mark the feature clearly as 'Done'.
