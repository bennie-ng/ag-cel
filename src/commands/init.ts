import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { getGlobalAgCelDir } from '../utils/index.js';

export async function initCommand() {
    const globalDir = getGlobalAgCelDir();
    const globalWorkflowsDir = path.join(globalDir, 'workflows');

    console.log(chalk.blue('Initializing AgCel in current project...'));

    // 1. Check if global install exists
    if (!fs.existsSync(globalDir)) {
        console.error(chalk.red('Error: AgCel is not installed globally.'));
        console.error(chalk.yellow('Please run "npm install -g agcel" first.'));
        return;
    }

    if (!fs.existsSync(globalWorkflowsDir)) {
        console.error(chalk.red(`Error: Workflows directory not found in global install at ${globalWorkflowsDir}`));
        console.error(chalk.yellow('Please try reinstalling: npm install -g agcel'));
        return;
    }

    // 2. Setup local .agc and .agent directories
    const projectAgcDir = path.join(process.cwd(), '.agc');
    const projectSkillsDir = path.join(projectAgcDir, 'skills');
    const projectAgentDir = path.join(process.cwd(), '.agent');
    const projectWorkflowsDir = path.join(projectAgentDir, 'workflows');

    // Create .agc directory (Critical for isInitialized check)
    if (!fs.existsSync(projectAgcDir)) {
        console.log(chalk.blue('Creating .agc directory...'));
        fs.mkdirSync(projectAgcDir, { recursive: true });
    }

    // Copy skills from global install to .agc/skills
    const globalSkillsDir = path.join(globalDir, 'skills');
    if (fs.existsSync(globalSkillsDir)) {
        if (!fs.existsSync(projectSkillsDir)) {
            console.log(chalk.blue('Creating .agc/skills directory...'));
            fs.mkdirSync(projectSkillsDir, { recursive: true });
        }
        console.log(chalk.blue('Copying skills...'));
        try {
            fs.cpSync(globalSkillsDir, projectSkillsDir, { recursive: true });
        } catch (e) {
            console.error(chalk.red('Failed to copy skills.'), e);
        }
    } else {
        console.warn(chalk.yellow(`Warning: Global skills not found at ${globalSkillsDir}`));
    }

    try {
        if (!fs.existsSync(projectAgentDir)) {
            console.log(chalk.blue('Creating .agent directory...'));
            fs.mkdirSync(projectAgentDir, { recursive: true });
        }

        if (!fs.existsSync(projectWorkflowsDir)) {
            console.log(chalk.blue('Creating .agent/workflows directory...'));
            fs.mkdirSync(projectWorkflowsDir, { recursive: true });
        }

        // 3. Copy workflows
        console.log(chalk.blue('Copying workflows...'));
        const workflows = fs.readdirSync(globalWorkflowsDir);

        let overwriteAll = false;

        for (const workflow of workflows) {
            const srcPath = path.join(globalWorkflowsDir, workflow);
            const destPath = path.join(projectWorkflowsDir, workflow);

            if (fs.lstatSync(srcPath).isFile()) {
                const content = fs.readFileSync(srcPath, 'utf-8');

                if (fs.existsSync(destPath)) {
                    const destContent = fs.readFileSync(destPath, 'utf-8');
                    if (content !== destContent) {
                        let action = 'skip';

                        if (overwriteAll) {
                            action = 'overwrite';
                        } else {
                            const answer = await inquirer.prompt([{
                                type: 'expand',
                                name: 'action',
                                message: `Workflow ${workflow} already exists and is different.`,
                                choices: [
                                    { key: 'y', name: 'Overwrite', value: 'overwrite' },
                                    { key: 'n', name: 'Skip', value: 'skip' },
                                    { key: 'a', name: 'Overwrite All', value: 'all' }
                                ],
                                default: 1
                            }]);

                            if (answer.action === 'all') {
                                overwriteAll = true;
                                action = 'overwrite';
                            } else {
                                action = answer.action;
                            }
                        }

                        if (action === 'overwrite') {
                            fs.writeFileSync(destPath, content);
                            console.log(chalk.green(`Updated ${workflow}`));
                        } else {
                            console.log(chalk.yellow(`Skipped ${workflow}`));
                        }
                    }
                } else {
                    fs.writeFileSync(destPath, content);
                    console.log(chalk.green(`Created ${workflow}`));
                }
            }
        }

        console.log(chalk.green('AgCel project initialization complete!'));
        console.log(chalk.cyan('Workflows installed to .agent/workflows'));
        console.log(chalk.cyan('Skills installed to .agc/skills'));

        // 4. Update .gitignore
        updateGitIgnore(process.cwd());

    } catch (error) {
        throw error; // Re-throw to be caught by outer catch
    }
}

function updateGitIgnore(cwd: string) {
    const gitIgnorePath = path.join(cwd, '.gitignore');
    const entriesToAdd = ['.agc', '.agents', '.agent'];

    let content = '';

    if (fs.existsSync(gitIgnorePath)) {
        content = fs.readFileSync(gitIgnorePath, 'utf-8');
    } else {
        console.log(chalk.blue('Creating .gitignore...'));
    }

    const lines = content.split('\n').map(line => line.trim());
    const newEntries: string[] = [];

    for (const entry of entriesToAdd) {
        if (!lines.includes(entry)) {
            newEntries.push(entry);
        }
    }

    if (newEntries.length > 0) {
        const appendContent = (content && !content.endsWith('\n') ? '\n' : '') + newEntries.join('\n') + '\n';
        fs.appendFileSync(gitIgnorePath, appendContent);
        console.log(chalk.green(`Added ${newEntries.join(', ')} to .gitignore`));
    }
}
