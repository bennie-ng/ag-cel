import fs from 'fs';
import path from 'path';
import os from 'os';
// In CJS, __dirname is available globally
export function getPackageRoot(): string {
    return path.resolve(__dirname, '..', '..');
}

export const AG_CEL_DIR = '.agc';
export const AG_CEL_CONFIG_FILE = 'config.json';

export function getAgCelDir(): string {
    return path.join(process.cwd(), AG_CEL_DIR);
}

export function getGlobalAgCelDir(): string {
    return path.join(os.homedir(), '.agcel');
}

export function isInitialized(): boolean {
    return fs.existsSync(getAgCelDir());
}
