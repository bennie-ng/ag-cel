# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-13

### Initial Release of AgCel

AgCel (Antigravity Context Engineering Library) is a local MCP (Model Context Protocol) Skills Server designed to empower AI agents with structured capabilities, workflows, and rules for software development.

### Features

-   **AgCel CLI (`agc`)**: A comprehensive command-line interface for managing the local MCP server.
    -   `init`: Initialize AgCel in your project, setting up the `.agent` directory and workflows.
    -   `start` / `stop` / `restart`: Manage the lifecycle of the local MCP server.
    -   `status`: Check if the server is running.
    -   `skills list` / `workflows list`: Discovery commands for available capabilities.
    -   `uninstall`: Cleanly remove global configuration and data.

-   **Installation**: Simplified global setup via `npx agcel install`.

-   **Micro-Site Documentation**: Hosted documentation for getting started, core concepts, and references.

### Functionality

-   **Skills**: Pre-built skills for Python, TypeScript, Docker, and more.
-   **Workflows**: Standard Operating Procedures (SOPs) for development tasks (`feature`, `fix`, `test`).
-   **Rules**: Guardrails for AI behavior, ensuring safety and operational consistency.
-   **Antigravity Integration**: Optimized for use with the Antigravity IDE and Agent Window.
