import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { getAgCelDir, isInitialized } from '../utils/index.js';

export function listCommand(type: 'skills' | 'workflows') {
    if (!isInitialized()) {
        console.error(chalk.red('Ag-Cel is not initialized. Run "agc init" first.'));
        return;
    }

    const agCelDir = getAgCelDir();
    // Check both source and local directories
    // For now, let's assume we list what's in .ag-cel
    // Ideally, we should also check the global or project skills if integrated.

    // NOTE: In a real implementation, we might want to list from the temp_skills directory too if configured?
    // But per requirements, `agc init` creates .ag-cel.

    // Let's list from .ag-cel/<type>
    let targetDir = path.join(agCelDir, type);

    // FIX: Workflows are stored in .agent/workflows, not .ag-cel/workflows
    if (type === 'workflows') {
        targetDir = path.join(process.cwd(), '.agent', 'workflows');
    }

    if (!fs.existsSync(targetDir)) {
        console.log(chalk.yellow(`No ${type} directory found in .ag-cel.`));
        return;
    }

    try {
        const items = fs.readdirSync(targetDir).filter(item => {
            return fs.statSync(path.join(targetDir, item)).isDirectory();
        });

        if (items.length === 0) {
            console.log(chalk.yellow(`No ${type} found.`));
        } else {
            console.log(chalk.blue(`Available ${type}:`));
            items.forEach(item => {
                console.log(`- ${item}`);
            });
        }
    } catch (error) {
        console.error(chalk.red(`Failed to list ${type}:`), error);
    }
}
