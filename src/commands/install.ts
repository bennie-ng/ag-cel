import fs from 'fs';
import path from 'path';
import os from 'os';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { getGlobalAgCelDir, getPackageRoot } from '../utils/index.js';

export async function installCommand() {
    const globalDir = getGlobalAgCelDir();
    const packageRoot = getPackageRoot();

    console.log(chalk.blue('Installing AgCel globally...'));

    try {
        // 1. Create global directory
        if (!fs.existsSync(globalDir)) {
            console.log(chalk.blue(`Creating global directory at ${globalDir}...`));
            fs.mkdirSync(globalDir, { recursive: true });
        } else {
            console.log(chalk.yellow(`Global directory already exists at ${globalDir}. Updating...`));
        }

        // 2. Copy necessary files (dist, skills, workflows, package.json)
        const dirsToCopy = [
            { src: 'dist', dest: 'dist' },
            { src: 'skills', dest: 'skills' },
            { src: '.agent/workflows', dest: 'workflows' } // Normalize workflows path
        ];

        for (const dir of dirsToCopy) {
            const srcPath = path.join(packageRoot, dir.src);
            const destPath = path.join(globalDir, dir.dest);

            if (fs.existsSync(srcPath)) {
                console.log(chalk.blue(`Copying ${dir.src} to ${destPath}...`));
                // Remove destination if it exists to ensure clean copy
                if (fs.existsSync(destPath)) {
                    fs.rmSync(destPath, { recursive: true, force: true });
                }
                fs.cpSync(srcPath, destPath, { recursive: true });
            } else {
                console.warn(chalk.yellow(`Warning: Source directory ${srcPath} not found.`));
            }
        }

        // Copy package.json for dependencies
        const packageJsonSrc = path.join(packageRoot, 'package.json');
        const packageJsonDest = path.join(globalDir, 'package.json');
        if (fs.existsSync(packageJsonSrc)) {
            fs.copyFileSync(packageJsonSrc, packageJsonDest);
        }

        // 3. Install dependencies in global dir
        console.log(chalk.blue('Installing dependencies in global directory...'));
        try {
            execSync('npm install --production', { cwd: globalDir, stdio: 'inherit' });
        } catch (e) {
            console.error(chalk.red('Failed to install dependencies.'), e);
        }

        // 4. Register with Antigravity
        const mcpConfigPath = path.join(os.homedir(), '.gemini/antigravity/mcp_config.json');
        let mcpConfig: any = { mcpServers: {} };

        if (fs.existsSync(mcpConfigPath)) {
            try {
                const content = fs.readFileSync(mcpConfigPath, 'utf-8');
                if (content.trim()) {
                    mcpConfig = JSON.parse(content);
                }
            } catch (e) {
                console.warn(chalk.yellow('Existing MCP config invalid. Creating new.'));
            }
        } else {
            fs.mkdirSync(path.dirname(mcpConfigPath), { recursive: true });
        }

        if (!mcpConfig.mcpServers) mcpConfig.mcpServers = {};

        const serverPath = path.join(globalDir, 'dist/server/index.js');
        mcpConfig.mcpServers['agcel'] = {
            command: 'node',
            args: [serverPath],
            env: {
                // Ensure the server knows where to find everything
                NODE_ENV: 'production'
            }
        };

        fs.writeFileSync(mcpConfigPath, JSON.stringify(mcpConfig, null, 2));
        console.log(chalk.green(`Successfully registered AgCel in ${mcpConfigPath}`));
        console.log(chalk.green('AgCel installed successfully!'));
        console.log(chalk.cyan('You can now run "agc init" in your projects to set them up.'));

    } catch (error) {
        console.error(chalk.red('Failed to install AgCel:'), error);
        process.exit(1);
    }
}
