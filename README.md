# Ag-Cel

Ag-Cel is a local MCP (Model Context Protocol) Skills Server that functions both as a command-line tool and a backend for Antigravity workflows. It bridges the gap between local execution and AI agent capabilities by providing structured "Skills" and "Personas".

## Overview

The project consists of two main components:
1.  **Ag-Cel CLI**: A command-line interface to manage and interact with the MCP server.
2.  **Ag-Cel MCP Skills Server**: A local server that hosts skills and capabilities, enabling AI agents to perform complex tasks.

## Installation

To install the Ag-Cel CLI globally:

```bash
npm install -g ag-cel
```

## CLI Usage

The `agc` command-line tool is your primary interface. Application data is stored in the `.ag-cel` directory in user's home or project root.

| Command | Description |
| :--- | :--- |
| `agc start` | Start the MCP server locally. |
| `agc stop` | Stop the running MCP server. |
| `agc restart` | Restart the MCP server. |
| `agc status` | Check the status of the local MCP server. |
| `agc init` | Initialize Ag-Cel in the current project (creates `.ag-cel` directory). |
| `agc skills list` | List all available skills. |
| `agc workflows list` | List all available workflows. |
| `agc --help` | Show the help menu. |
| `agc --version` | Show the CLI version. |

## Concepts

### Skills

**Skills** are specific, actionable capabilities that allow the AI to perform specialized tasks. Skills are stored as `.md` files in the `skills` directory.

-   **Analytical**: Data analysis, debugging.
-   **Content Generation**: Writing, formatting.
-   **Operational**: API usage, code execution.

### Rules

**Rules** serve as guardrails for the AI.

-   **Boundary Rules**: "Do not use external libraries."
-   **Operational Rules**: "Always ask for clarification."
-   **Security Rules**: "Never share API keys."

## Integration with Antigravity

When working with the Antigravity IDE:
1.  Run `agc init` to set up the environment.
2.  Use workflows in the Agent Window (e.g., `/agc idea` for ideation).
