import fs from 'fs';
import path from 'path';
import os from 'os';
// In CJS, __dirname is available globally
export function getPackageRoot(): string {
    return path.resolve(__dirname, '..', '..');
}

export const AG_CEL_DIR = '.agc';
export const AG_CEL_CONFIG_FILE = 'config.json';
export const AG_CEL_PID_FILE = 'mcp-server.pid';

export function getAgCelDir(): string {
    return path.join(process.cwd(), AG_CEL_DIR);
}

export function getGlobalAgCelDir(): string {
    return path.join(os.homedir(), '.agcel');
}

export function isInitialized(): boolean {
    return fs.existsSync(getAgCelDir());
}

export function getPidFile(): string {
    return path.join(getAgCelDir(), AG_CEL_PID_FILE);
}

export function savePid(pid: number): void {
    fs.writeFileSync(getPidFile(), pid.toString());
}

export function getPid(): number | null {
    const pidFile = getPidFile();
    if (fs.existsSync(pidFile)) {
        const pid = parseInt(fs.readFileSync(pidFile, 'utf-8'), 10);
        return pid;
    }
    return null;
}

export function removePid(): void {
    const pidFile = getPidFile();
    if (fs.existsSync(pidFile)) {
        fs.unlinkSync(pidFile);
    }
}

export function isRunning(pid: number): boolean {
    try {
        process.kill(pid, 0);
        return true;
    } catch (e) {
        return false;
    }
}
