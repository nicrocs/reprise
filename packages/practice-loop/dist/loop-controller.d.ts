import type { MediaAdapter } from "./adapter.js";
export interface Loop {
    start: number;
    end: number;
}
export interface LoopControllerOptions {
    requestAnimationFrame?: typeof globalThis.requestAnimationFrame;
    cancelAnimationFrame?: typeof globalThis.cancelAnimationFrame;
}
export declare class LoopController {
    private adapter;
    private loop;
    private rafHandle;
    private readonly requestAnimationFrame;
    private readonly cancelAnimationFrame;
    onLoopEnter?: () => void;
    onLoopExit?: () => void;
    onTimeUpdate?: (t: number) => void;
    constructor(adapter: MediaAdapter, options?: LoopControllerOptions);
    setLoop(loop: Loop | null): void;
    getLoop(): Loop | null;
    setPlaybackRate(rate: number): void;
    getPlaybackRate(): number;
    getCurrentTime(): number;
    setCurrentTime(time: number): void;
    play(): void;
    pause(): void;
    private startPolling;
    private stopPolling;
    private update;
}
//# sourceMappingURL=loop-controller.d.ts.map