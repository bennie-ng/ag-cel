import chalk from 'chalk';
import { getPid, isRunning, isInitialized } from '../utils/index.js';

export function statusCommand() {
    if (!isInitialized()) {
        console.log(chalk.yellow('AgCel is not initialized in this project. Using global configuration.'));
    }

    const pid = getPid();

    if (pid && isRunning(pid)) {
        console.log(chalk.green(`AgCel MCP server is running (PID: ${pid})`));
    } else {
        console.log(chalk.yellow('AgCel MCP server is stopped'));
        if (pid) {
            console.log(chalk.yellow('(PID file exists but process is not running)'));
        }
    }
}
