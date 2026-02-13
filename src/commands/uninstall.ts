
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

    console.log(chalk.blue('Uninstalling AgCel...'));

    let requiresSudo = false;

    // 1. Remove from MCP Config
    if (fs.existsSync(mcpConfigPath)) {
        try {
            const content = fs.readFileSync(mcpConfigPath, 'utf-8');
            const mcpConfig = JSON.parse(content);

            if (mcpConfig.mcpServers && mcpConfig.mcpServers['agcel']) {
                delete mcpConfig.mcpServers['agcel'];
                fs.writeFileSync(mcpConfigPath, JSON.stringify(mcpConfig, null, 2));
                console.log(chalk.green(`Removed AgCel from ${mcpConfigPath}`));
            } else {
                console.log(chalk.yellow('AgCel not found in MCP config.'));
            }
        } catch (error) {
            console.error(chalk.red('Failed to update MCP config:'), error);
        }
    } else {
        console.log(chalk.yellow('MCP config not found.'));
    }

    // 2. Remove Global Directory
    if (fs.existsSync(globalDir)) {
        try {
            fs.rmSync(globalDir, { recursive: true, force: true });
            console.log(chalk.green(`Removed global directory at ${globalDir}`));
        } catch (error: any) {
            if (error.code === 'EACCES') {
                console.error(chalk.red(`Permission denied removing ${globalDir}. You might need sudo.`));
                requiresSudo = true;
            } else {
                console.error(chalk.red(`Failed to remove global directory:`), error);
            }
        }
    } else {
        console.log(chalk.yellow('Global directory not found.'));
    }

    // 3. Prompt for npm uninstall
    const answer = await inquirer.prompt([{
        type: 'confirm',
        name: 'npmUninstall',
        message: 'Do you want to run "npm uninstall -g agcel" now?',
        default: true
    }]);

    if (answer.npmUninstall) {
        try {
            console.log(chalk.blue('Running "npm uninstall -g agcel"...'));
            execSync('npm uninstall -g agcel', { stdio: 'inherit' });
            console.log(chalk.green('AgCel package uninstalled successfully.'));
        } catch (error: any) {
             console.error(chalk.red('Failed to uninstall npm package.'));
             console.error(chalk.yellow('You might need to run: sudo npm uninstall -g agcel'));
        }
    }

    console.log(chalk.green('AgCel uninstallation complete.'));
}
