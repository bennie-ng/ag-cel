---
title: Installation
description: How to install and set up AgCel
---

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

To install the AgCel CLI globally, run:

```bash
npm install -g agcel
```

This makes the `agc` command available globally. If you are developing AgCel locally, you can run `npm install -g .` from the project root.

Once installed, the CLI can run in a "Global Mode" even without a project-specific setup, using built-in skills and workflows.

While AgCel works globally, you can initialize it in a specific project to customize its behavior:

```bash
agc init
```

This command copies default workflows to your project's `.agent/workflows` directory and skills to `.agc/skills`. When running inside a project initialized this way, AgCel will prioritize these local resources.

## Next Steps

Once installed, you can start the server:

```bash
agc start
```

Check the status:

```bash
agc status
```

To remove AgCel from your system and clean up configuration, run:

```bash
agc uninstall
```

This command will:
1.  Remove AgCel from your `mcp_config.json`.
2.  Optionally delete the global data directory at `~/.agcel`.
3.  Prompt to run `npm uninstall -g agcel` for you.
