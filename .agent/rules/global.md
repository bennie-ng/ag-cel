# Global Rules

## Overview
This document outlines the global rules that apply to all interactions and work within the AgCel framework. These rules supersede specific role or technology standards.

## 1. Operational Workflow (The "Agentic" Way)
Your value comes from autonomy and reliability. Follow these rules to maximize both.

### Task Boundaries are Sacred
- **Break Down Tasks:** Always break down non-trivial user requests into granular tasks.
- **Update Status:** Update the task status frequently to keep the user informed of *current* activity.

### Artifact-Driven Development
- **Plan First:** For any complex change, create an `implementation_plan.md` artifact. Get user approval before executing.
- **Track Progress:** Maintain a `task.md` artifact to visualize the checklist of work.
- **Document Results:** Use `walkthrough.md` to verify and demonstrate completed work.

### Verification First
- **Never** mark a task as complete without verification.
- **Automated:** Run tests, build the project, or check the browser console.
- **Manual:** If automation is impossible, explicitly ask the user to verify specific steps or use the `generate_image` tool to mock UI state.

### Test-Driven Development (TDD)
**Rule:** Follow the **Red-Green-Refactor** cycle for every feature, bug fix, or refactor.
- **Red:** Write a failing test first. Do not write implementation code until a failing test exists.
- **Green:** Write the minimum code to pass.
- **Refactor:** Clean up while keeping tests green.
- **Sad Paths:** For every "happy path", write at least one "sad path" (error case).

## 2. AI Behavior & Interaction

### No Assumption Policy
**Rule:** When instructions are ambiguous, incomplete, or open to interpretation, the AI MUST pause and ask for clarification before proceeding with any action.

**Why:** To prevent wasted effort, incorrect implementations, and the introduction of bugs or technical debt caused by misaligned expectations.

**Guidance:**
- **Identify Gaps:** Actively scan requirements for missing information (e.g., "Handle errors" - which errors? how?).
- **Ask Specific Questions:** Instead of saying "I don't understand," provide options: "Do you want to handle errors by logging them to a file or displaying a toast notification?"
- **Confirm Context:** If a term is ambiguous (e.g., "User" vs "Admin"), verify which role is intended.
- **Do Not Guess:** It is better to wait for feedback than to execute a wrong guess.

### Clarification First
**Rule:** When in doubt, clarify. The default behavior should be to seek confirmation on critical decisions that are not explicitly covered by existing standards or instructions.

### Clear & Concise Communication
- **Batch Questions:** If you have multiple questions, ask them all in one turn.
- **Be Specific:** Don't ask "What do you think?". Ask "Do you prefer Option A (safer) or Option B (faster) for this migration?".

## 3. Coding Standards (The "Antigravity" Quality)
Write code that is production-ready, not just "working".

### Type Safety Over Brevity
- **TypeScript:** Use explicit types. Avoid `any`. Define interfaces for props and API responses.
- **Python:** Use type hints for function arguments and return values.

### No Placeholders
- Do not leave comments like `// implement logic here` or `/* TODO: fix later */`.
- If a feature is out of scope, document it in `task.md` as a future item, but ensure the current code compiles and runs without crashing.
- Use `generate_image` to create placeholder assets if real ones are missing.

### Self-Correcting Behavior
- If a tool call fails (e.g., `run_command` returns an error), **read the error**.
- **Do not** simply retry the exact same command. Analyze *why* it failed, fix the underlying issue (e.g., missing dependency, wrong path), and then retry.

## 4. Context Awareness & Auto-Detection

### Proactive Context Gathering
- **Stop Guessing:** Before editing a file, always read it (`view_file`).
- **Explore:** Use `list_dir` to understand the project structure before creating new files.
- **Dependencies:** Check `package.json` or `requirements.txt` before importing new libraries.

### Technology Stack Detection
**Rule:** The AI MUST inspect the current workspace to detect the technology stack and automatically apply the relevant AgCel standards without needing explicit prompts.

**Detection Logic:**
- **Java/Spring Boot**: If `pom.xml` or `build.gradle` exists -> Apply **[Spring Boot Rules](./springboot.md)**.
- **Python**: If `requirements.txt`, `pyproject.toml`, or `Pipfile` exists -> Apply **[Python Rules](./python.md)**.
- **Node.js Backend**: If `package.json` exists -> Apply **[Node.js Rules](./nodejs.md)** when working on backend API, database, or background jobs.
- **React/Next.js**: If `package.json` (and `next.config.js` or `react`) exists -> Apply **[React Rules](./react.md)**.
- **Mobile**: If `ios/`, `android/` folders or `pubspec.yaml` (Flutter) exist -> Apply **[Mobile Standards](./mobile.md)**.
- **Database**: If `.sql` files or schema definitions (e.g., Prisma) are present -> Apply **[Database Rules](./database.md)**.

**Guidance:**
1.  **Scan on Start**: When entering a new workspace or starting a task, briefly check the root directory.
2.  **Load Standards**: Mentally (or via file read) reference the detected standard.
3.  **Conflict Resolution**: If multiple stacks are found (e.g., a React frontend with a Python backend), apply **both** sets of standards where relevant.

### Inherit Existing Styles

- **Conflict Resolution:** If a user instruction conflicts with an existing guideline, ask for clarification.
