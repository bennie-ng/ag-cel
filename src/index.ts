#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { initCommand } from './commands/init.js';
import { uninstallCommand } from './commands/uninstall.js';
import { listCommand } from './commands/list.js';

const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'package.json'), 'utf-8'));

const program = new Command();

program
    .name('agc')
    .description('AgCel MCP Skills Server CLI')
    .version(pkg.version);

program
    .command('init')
    .description('Initialize AgCel in the current directory')
    .action(initCommand);

program
    .command('uninstall')
    .description('Clean up AgCel configuration and data')
    .action(uninstallCommand);

const skillsCommand = new Command('skills');
skillsCommand
    .command('list')
    .description('List available skills')
    .action(() => listCommand('skills'));

const workflowsCommand = new Command('workflows');
workflowsCommand
    .command('list')
    .description('List available workflows')
    .action(() => listCommand('workflows'));

program.addCommand(skillsCommand);
program.addCommand(workflowsCommand);

program.parse(process.argv);
