import { type ChildProcess, spawn } from 'node:child_process';
import fs from 'node:fs';

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

interface XvfbOptions {
    displayNum?: number;
    reuse?: boolean;
    timeout?: number;
    silent?: boolean;
    xvfb_args?: string[];
}

class Xvfb {
    private _display: string | null;
    private _reuse: boolean;
    private _timeout: number;
    private _silent: boolean;
    private _xvfb_args: string[];
    private _process: ChildProcess | undefined;
    private _oldDisplay: string | undefined;

    constructor(options: XvfbOptions = {}) {
        this._display =
            options.displayNum || options.displayNum === 0 ? `:${options.displayNum}` : null;
        this._reuse = options.reuse ?? false;
        this._timeout = options.timeout ?? 500;
        this._silent = options.silent ?? false;
        this._xvfb_args = options.xvfb_args || [];
    }

    public async start() {
        if (this._process) {
            return this._process;
        }

        const lockFile = this._lockFile();

        this._setDisplayEnvVariable();

        this._spawnProcess(fs.existsSync(lockFile));

        let totalTime = 0;

        while (!fs.existsSync(lockFile)) {
            if (totalTime > this._timeout) {
                throw new Error('Could not start Xvfb.');
            }

            await sleep(10);

            totalTime += 10;
        }

        return this._process;
    }

    public async stop() {
        if (!this._process) {
            return;
        }

        this._killProcess();
        this._restoreDisplayEnvVariable();

        const lockFile = this._lockFile();

        let totalTime = 0;

        while (fs.existsSync(lockFile)) {
            if (totalTime > this._timeout) {
                throw new Error('Could not stop Xvfb.');
            }

            await sleep(10);

            totalTime += 10;
        }
    }

    public display() {
        if (this._display) {
            return this._display;
        }

        let displayNum = 98;
        let lockFile: string | undefined;

        do {
            displayNum++;
            lockFile = this._lockFile(displayNum);
        } while (!this._reuse && fs.existsSync(lockFile));

        this._display = `:${displayNum}`;

        return this._display;
    }

    private _setDisplayEnvVariable() {
        this._oldDisplay = process.env.DISPLAY;

        process.env.DISPLAY = this.display();
    }

    private _restoreDisplayEnvVariable() {
        process.env.DISPLAY = this._oldDisplay;
    }

    private _spawnProcess(lockFileExists: boolean) {
        const display = this.display();

        if (lockFileExists) {
            if (!this._reuse) {
                throw new Error(
                    `Display ${display} is already in use and the "reuse" option is false.`,
                );
            }
        } else {
            this._process = spawn('Xvfb', [display].concat(this._xvfb_args));

            if (!this._process || !this._process.stderr) {
                throw new Error('Could not start Xvfb.');
            }

            this._process.stderr.on('data', (data) => {
                if (!this._silent) {
                    process.stderr.write(data);
                }
            });
        }
    }

    private _killProcess() {
        if (!this._process) {
            return;
        }

        this._process.kill();

        this._process = undefined;
    }

    private _lockFile(displayNum?: number) {
        return `/tmp/.X${displayNum || this.display().toString().replace(/^:/, '')}-lock`;
    }
}

export { Xvfb };
