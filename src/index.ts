#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init.js';
import { startCommand } from './commands/start.js';
import { stopCommand } from './commands/stop.js';
import { restartCommand } from './commands/restart.js';
import { statusCommand } from './commands/status.js';
import { listCommand } from './commands/list.js';

const program = new Command();

program
    .name('agc')
    .description('Ag-Cel MCP Skills Server CLI')
    .version('1.0.0');

program
    .command('init')
    .description('Initialize Ag-Cel in the current directory')
    .action(initCommand);

program
    .command('start')
    .description('Start the MCP server locally')
    .action(startCommand);

program
    .command('stop')
    .description('Stop the MCP server locally')
    .action(stopCommand);

program
    .command('restart')
    .description('Restart the MCP server locally')
    .action(restartCommand);

program
    .command('status')
    .description('Check the status of the MCP server')
    .action(statusCommand);

const skillskCommand = new Command('skills');
skillskCommand
    .command('list')
    .description('List available skills')
    .action(() => listCommand('skills'));

const workflowsCommand = new Command('workflows');
workflowsCommand
    .command('list')
    .description('List available workflows')
    .action(() => listCommand('workflows'));

program.addCommand(skillskCommand);
program.addCommand(workflowsCommand);

program.parse(process.argv);
