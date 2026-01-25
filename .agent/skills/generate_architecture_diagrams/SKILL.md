# Generate Architecture Diagrams
**Description**: Analyzes the codebase (files, directories, imports) to reconstruct the system architecture and generate diagrams.

## Usage
Use this skill when the user wants to visualize the codebase, understand dependencies, or document the current architecture.

## Instructions
1. **Discovery**
   - Identify the "containers" or "modules" in the system.
     - Look for `package.json`, `pom.xml`, `requirements.txt`, `Dockerfile`, or distinct folders in `src/`.
   - Identify interactions.
     - Look for HTTP client calls (e.g., `fetch`, `axios`, `RestTemplate`, `requests`).
     - Look for message queue producers/consumers.
     - Look for database connections.

2. **Generation (Mermaid.js)**
   - **System Context Diagram**: If multiple repos or services are involved.
   - **Container Diagram**: Shows the high-level software architecture.
     ```mermaid
     C4Context
       title System Context diagram for [System Name]
       ...
     ```
   - **Class Diagram**: If analyzing a specific module/class structure.
     ```mermaid
     classDiagram
       classA <|-- classB
     ```

3. **Output**
   - Generate the Mermaid code block.
   - If requested, save it to a `.mmd` file in `docs/architecture/diagrams/`.
   - If the user just wants to "see" it, provide the markdown code directly in the chat with an explanation.

## Example Prompts
- "Draw the architecture of this project."
- "Show me how the auth service interacts with the database."
- "Generate a class diagram for the Order module."
