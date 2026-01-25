---
description: Create a new Architecture Decision Record (ADR)
---

1. **Context Gathering**
   - Ask the user for the title of the decision.
   - Ask for the context/problem statement that necessitates this decision.
   - Ask for the options considered.
   - Ask for the final decision and the justification/consequences.

2. **File Generation**
   - Determine the next available ADR number (e.g., `0004-title.md`) by listing files in `docs/architecture/decisions/`.
   - If the directory `docs/architecture/decisions/` does not exist, create it.
   - logical path: `docs/architecture/decisions/XXXX-kebab-case-title.md`.

3. **Template Application**
   - Use the following Markdown template:
     ```markdown
     # [Short Title]

     * **Status**: [Proposed | Accepted | Deprecated | Superseded]
     * **Date**: [YYYY-MM-DD]
     * **Deciders**: [List of people involved]

     ## Context and Problem Statement
     [Describe the context and problem statement...]

     ## Decision Drivers
     * [Driver 1]
     * [Driver 2]

     ## Considered Options
     * [Option 1]
     * [Option 2]

     ## Decision Outcome
     Chosen option: "[Option 1]", because [justification. e.g., it's the only one that meets the k.o. criterion decision driver | which resolves the force force | ...].

     ### Positive Consequences
     * [Consequence 1]

     ### Negative Consequences
     * [Consequence 2]

     ## Pros and Cons of the Options
     ### [Option 1]
     * Good, because [argument a]
     * Bad, because [argument b]
     ```

4. **Review**
   - Present the path of the created file to the user.
