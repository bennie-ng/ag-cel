import fs from 'fs';
import path from 'path';
import os from 'os';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { execSync } from 'child_process';
import { getGlobalAgCelDir } from '../utils/index.js';

export async function uninstallCommand() {
    const globalDir = getGlobalAgCelDir();
    const mcpConfigPath = path.join(os.homedir(), '.gemini', 'antigravity', 'mcp_config.json');

    console.log(chalk.blue('Cleaning up AgCel configuration and data...'));

    // 1. Remove from MCP Config
    if (fs.existsSync(mcpConfigPath)) {
        try {
            const content = fs.readFileSync(mcpConfigPath, 'utf-8');
            const mcpConfig = JSON.parse(content);

            if (mcpConfig.mcpServers && mcpConfig.mcpServers['agcel']) {
                delete mcpConfig.mcpServers['agcel'];
                fs.writeFileSync(mcpConfigPath, JSON.stringify(mcpConfig, null, 2));
                console.log(chalk.green(`Removed AgCel from ${mcpConfigPath}`));
            }
        } catch (error) {
            console.error(chalk.red('Failed to update MCP config:'), error);
        }
    }

    // 2. Remove Global Data Directory (~/.agcel)
    if (fs.existsSync(globalDir)) {
        const answer = await inquirer.prompt([{
            type: 'confirm',
            name: 'removeData',
            message: `Do you want to remove the global data directory at ${globalDir}? (this deletes global logs and skills)`,
            default: true
        }]);

        if (answer.removeData) {
            try {
                fs.rmSync(globalDir, { recursive: true, force: true });
                console.log(chalk.green(`Removed global directory at ${globalDir}`));
            } catch (error) {
                console.error(chalk.red(`Failed to remove global directory. You may need to delete it manually: sudo rm -rf ${globalDir}`));
            }
        }
    }

    // 3. Prompt for npm uninstall
    const npmAnswer = await inquirer.prompt([{
        type: 'confirm',
        name: 'npmUninstall',
        message: 'Do you want to run "npm uninstall -g agcel" now?',
        default: true
    }]);

    if (npmAnswer.npmUninstall) {
        try {
            console.log(chalk.blue('Running "npm uninstall -g agcel"...'));
            execSync('npm uninstall -g agcel', { stdio: 'inherit' });
            console.log(chalk.green('AgCel package uninstalled successfully.'));
        } catch (error) {
            console.error(chalk.red('Failed to uninstall npm package via CLI.'));
            console.error(chalk.yellow('Please run manually: npm uninstall -g agcel'));
        }
    }

    console.log(chalk.green('\nAgCel cleanup complete.'));
}
