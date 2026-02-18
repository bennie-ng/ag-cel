# AgCel

AgCel is a local MCP (Model Context Protocol) Skills Server that functions both as a command-line tool and a backend for Antigravity workflows. It bridges the gap between local execution and AI agent capabilities by providing structured "Skills".

## Overview

The project consists of two main components:
1.  **AgCel CLI**: A command-line interface to manage and interact with the MCP server.
2.  **AgCel MCP Skills Server**: A local server that hosts skills and capabilities, enabling AI agents to perform complex tasks.

To install the AgCel CLI globally:

```bash
npm install -g agcel
```

This will make the `agc` command available globally. If you are developing locally, you can run `npm install -g .` from the project root.

To remove AgCel, simply uninstall the npm package:

```bash
npm uninstall -g agcel
```

You may also want to manually remove the global data directory (`~/.agcel`) and the server registration in your MCP config if you previously ran the legacy `install` command.

## CLI Usage

The `agc` command-line tool is your primary interface. Application data is stored in the `.agc` directory in your project root, and `~/.agcel` for global configuration.

| Command | Description |
| :--- | :--- |
| `agc start` | Start the MCP server locally (using project or global config). |
| `agc stop` | Stop the running MCP server. |
| `agc restart` | Restart the MCP server. |
| `agc status` | Check the status of the local MCP server. |
| `agc init` | Initialize AgCel in the current project (copies workflows to `.agent/workflows`). |
| `agc skills list` | List all available skills (local or global). |
| `agc workflows list` | List all available workflows (local or global). |
| `agc uninstall` | Clean up global data and remove the npm package. |
| `agc --help` | Show the help menu. |
| `agc --version` | Show the CLI version. |

## Concepts

### Skills

**Skills** are specialized capabilities that allow the AI to perform complex tasks. AgCel comes with a rich set of built-in skills:

-   **Languages**: Python, TypeScript, JavaScript
-   **Frameworks**: React, Next.js, FastAPI, Django
-   **DevOps**: Docker, GitHub Actions, Vercel
-   **Security**: OWASP, Vulnerability Scanning
-   **Methodology**: TDD, Systematic Debugging, Code Review, Architecture

### Workflows

**Workflows** are standard operating procedures for common development tasks.

-   **Development**: `/feature`, `/fix`, `/test`, `/refactor`
-   **Planning**: `/plan`, `/brainstorm`, `/research`
-   **Operations**: `/ship`, `/deploy`, `/security-scan`

### Rules

**Rules** serve as guardrails for the AI.

-   **Boundary Rules**: "Do not use external libraries."
-   **Operational Rules**: "Always ask for clarification."
-   **Security Rules**: "Never share API keys."

## Integration with Antigravity

When working with the Antigravity IDE:
1.  Run `agc init` to set up the environment.
2.  Use workflows in the Agent Window (e.g., `/agc idea` for ideation).
