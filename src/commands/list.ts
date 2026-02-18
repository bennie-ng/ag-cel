import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { getAgCelDir, isInitialized, getGlobalAgCelDir } from '../utils/index.js';

export function listCommand(type: 'skills' | 'workflows') {
    const agCelDir = getAgCelDir();
    const globalDir = getGlobalAgCelDir();

    let targetDir = path.join(agCelDir, type);
    if (type === 'workflows') {
        targetDir = path.join(process.cwd(), '.agent', 'workflows');
    }

    if (!isInitialized() || !fs.existsSync(targetDir)) {
        console.log(chalk.yellow(`Project not initialized or ${type} not found locally. Listing global ${type}...`));
        targetDir = path.join(globalDir, type === 'workflows' ? 'workflows' : 'skills');
    }

    try {
        const items = fs.readdirSync(targetDir).filter(item => {
            if (type === 'skills') {
                return fs.statSync(path.join(targetDir, item)).isDirectory();
            }
            // Workflows are .md files
            return item.endsWith('.md') && fs.statSync(path.join(targetDir, item)).isFile();
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
