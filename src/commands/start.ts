import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { isInitialized, savePid, getPid, isRunning, getAgCelDir } from '../utils/index.js';

export function startCommand() {
    // We allow starting even if not initialized locally (will use global skills/workflows if we implement that logic in the server)
    // For now, let's keep the isInitialized check if we want to enforce project-specific servers,
    // OR just warn and continue.
    if (!isInitialized()) {
        console.log(chalk.yellow('AgCel is not initialized in this project. Starting with global configuration...'));
    }

    const existingPid = getPid();
    if (existingPid && isRunning(existingPid)) {
        console.log(chalk.yellow(`AgCel MCP server is already running (PID: ${existingPid})`));
        return;
    }

    console.log(chalk.blue('Starting AgCel MCP server...'));

    const serverScript = path.resolve(__dirname, '../../dist/server/index.js');
    const logFile = path.join(getAgCelDir(), 'server.log');
    const out = fs.openSync(logFile, 'a');
    const err = fs.openSync(logFile, 'a');

    const child = spawn('node', [serverScript, '--mode', 'sse'], {
        detached: true,
        stdio: ['ignore', out, err],
        cwd: process.cwd()
    });

    if (child.pid) {
        savePid(child.pid);
        child.unref();
        console.log(chalk.green(`AgCel MCP server started successfully (PID: ${child.pid})`));
        console.log(chalk.cyan(`Logs are being written to ${logFile}`));
    } else {
        console.error(chalk.red('Failed to start AgCel MCP server.'));
    }
}
