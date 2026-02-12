import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { getAgCelDir, AG_CEL_DIR, getPackageRoot } from '../utils/index.js';

export function initCommand() {
    const agCelDir = getAgCelDir();
    const packageRoot = getPackageRoot();

    console.log(chalk.blue('Initializing Ag-Cel...'));

    try {
        if (!fs.existsSync(agCelDir)) {
            fs.mkdirSync(agCelDir);
            // Create subdirectories
            fs.mkdirSync(path.join(agCelDir, 'skills'));
            fs.mkdirSync(path.join(agCelDir, 'personas'));
            fs.mkdirSync(path.join(agCelDir, 'workflows'));

            // Create default config
            const config = {
                port: 3000,
                skillsDir: './skills',
                personasDir: './personas',
                workflowsDir: './workflows'
            };
            fs.writeFileSync(path.join(agCelDir, 'config.json'), JSON.stringify(config, null, 2));
        } else {
            console.log(chalk.yellow('Ag-Cel directory already exists. Updating resources...'));
        }

        // Symlink skills from package to local .ag-cel/skills
        const sourceSkillsDir = path.join(packageRoot, 'skills');
        if (fs.existsSync(sourceSkillsDir)) {
            console.log(chalk.blue('Symlinking skills...'));
            const targetSkillsDir = path.join(agCelDir, 'skills');

            // Check if target exists and is a symlink
            if (fs.existsSync(targetSkillsDir)) {
                const stats = fs.lstatSync(targetSkillsDir);
                if (stats.isSymbolicLink()) {
                    console.log(chalk.yellow('Skills directory is already symlinked.'));
                } else {
                    console.warn(chalk.yellow(`Warning: Skills directory already exists at ${targetSkillsDir}. Skipping symlink.`));
                }
            } else {
                try {
                    // Start fresh
                    fs.symlinkSync(sourceSkillsDir, targetSkillsDir, 'dir');
                    console.log(chalk.green('Symlinked skills to .ag-cel/skills.'));
                } catch (e) {
                    console.error(chalk.red(`Failed to symlink skills: ${e}`));
                }
            }
        } else {
            console.warn(chalk.yellow(`Warning: Skills directory not found in package at ${sourceSkillsDir}`));
        }

        // Symlink workflows to .agent/workflows (Antigravity standard)
        const sourceAgentDir = path.join(packageRoot, '.agent');
        if (fs.existsSync(sourceAgentDir)) {
            console.log(chalk.blue('Symlinking IDE workflows...'));
            const sourceWorkflowsDir = path.join(sourceAgentDir, 'workflows');
            const targetParentDir = path.join(process.cwd(), '.agent');

            if (!fs.existsSync(targetParentDir)) {
                fs.mkdirSync(targetParentDir);
            }

            const targetWorkflowsDir = path.join(targetParentDir, 'workflows');

            if (fs.existsSync(targetWorkflowsDir)) {
                const stats = fs.lstatSync(targetWorkflowsDir);
                if (stats.isSymbolicLink()) {
                    console.log(chalk.yellow('Workflows directory is already symlinked.'));
                } else {
                    console.warn(chalk.yellow(`Warning: Workflows directory already exists at ${targetWorkflowsDir}. Skipping symlink.`));
                }
            } else {
                if (fs.existsSync(sourceWorkflowsDir)) {
                    try {
                        fs.symlinkSync(sourceWorkflowsDir, targetWorkflowsDir, 'dir');
                        console.log(chalk.green('Symlinked workflows to .agent/workflows.'));
                    } catch (e) {
                        console.error(chalk.red(`Failed to symlink workflows: ${e}`));
                    }
                } else {
                    console.warn(chalk.yellow(`Warning: Workflows directory not found in package at ${sourceWorkflowsDir}`));
                }
            }
        } else {
            console.warn(chalk.yellow(`Warning: .agent directory not found in package at ${sourceAgentDir}`));
        }

        console.log(chalk.green(`Successfully initialized Ag-Cel in ${AG_CEL_DIR}`));
        console.log(chalk.cyan('You can now add skills, personas, and workflows to the .ag-cel directory.'));
        console.log(chalk.white('Run "agc start" to start the local MCP server.'));
    } catch (error) {
        console.error(chalk.red('Failed to initialize Ag-Cel:'), error);
    }
}
