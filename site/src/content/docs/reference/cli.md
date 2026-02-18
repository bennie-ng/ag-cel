---
title: CLI Reference
description: AgCel CLI Command Reference
---

The `agc` command-line tool provides the following commands:

## Server Management

### `agc start`
Starts the MCP server locally.
```bash
agc start
```

### `agc stop`
Stops the running MCP server.
```bash
agc stop
```

### `agc restart`
Restarts the MCP server.
```bash
agc restart
```

### `agc status`
Checks the status of the local MCP server.
```bash
agc status
```

## Project Management

### `agc init`
Initializes AgCel in the current project or directory.
```bash
agc init
```

## Resource Listing

### `agc skills list`
Lists all available skills. It will show local skills first, and fall back to global skills if the project is not initialized.
```bash
agc skills list
```

### `agc workflows list`
Lists all available workflows. It will show local workflows first, and fall back to global ones if the project is not initialized.
```bash
agc workflows list
```

## Maintenance

### `agc uninstall`
Cleans up global data, removes the server from the IDE configuration, and prompts to uninstall the npm package.
```bash
agc uninstall
```



## General

### `agc --help`
Displays the help menu with a list of all commands.

### `agc --version`
Displays the current version of the AgCel CLI.
