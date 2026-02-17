---
title: Installation
description: How to install and set up AgCel
---

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installing the CLI

To install the AgCel CLI globally and set up the local MCP server, run:

```bash
npx agcel install
```

This command copies the necessary files to `~/.agcel` and registers the AgCel MCP server in your `mcp_config.json`.

## Initialization

To start using AgCel in a project, initialize it by running:

```bash
agc init
```

This command copies workflows from the global installation (`~/.agcel/workflows`) to your project's `.agent/workflows` directory, and skills to `.agc/skills`.

## Next Steps

Once installed, you can start the server:

```bash
agc start
```

Check the status:

```bash
agc status
```
