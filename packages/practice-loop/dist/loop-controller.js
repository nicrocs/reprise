export class LoopController {
    constructor(adapter, options = {}) {
        this.loop = null;
        this.rafHandle = null;
        this.adapter = adapter;
        this.requestAnimationFrame =
            options.requestAnimationFrame ??
                (typeof globalThis.requestAnimationFrame === "function"
                    ? globalThis.requestAnimationFrame.bind(globalThis)
                    : () => 0);
        this.cancelAnimationFrame =
            options.cancelAnimationFrame ??
                (typeof globalThis.cancelAnimationFrame === "function"
                    ? globalThis.cancelAnimationFrame.bind(globalThis)
                    : () => { });
    }
    setLoop(loop) {
        this.loop = loop;
        if (loop) {
            this.startPolling();
        }
        else {
            this.stopPolling();
        }
    }
    getLoop() {
        return this.loop;
    }
    setPlaybackRate(rate) {
        this.adapter.setPlaybackRate(rate);
    }
    getPlaybackRate() {
        return this.adapter.getPlaybackRate();
    }
    getCurrentTime() {
        return this.adapter.getCurrentTime();
    }
    play() {
        this.adapter.play();
        if (this.loop) {
            this.startPolling();
        }
    }
    pause() {
        this.adapter.pause();
        this.stopPolling();
    }
    startPolling() {
        if (this.rafHandle !== null)
            return;
        const tick = () => {
            this.rafHandle = this.requestAnimationFrame(tick);
            this.update();
        };
        this.rafHandle = this.requestAnimationFrame(tick);
    }
    stopPolling() {
        if (this.rafHandle !== null) {
            this.cancelAnimationFrame(this.rafHandle);
            this.rafHandle = null;
        }
    }
    update() {
        const t = this.adapter.getCurrentTime();
        this.onTimeUpdate?.(t);
        if (!this.loop)
            return;
        if (t >= this.loop.end) {
            this.onLoopExit?.();
            this.adapter.setCurrentTime(this.loop.start);
            this.onLoopEnter?.();
        }
    }
}
//# sourceMappingURL=loop-controller.js.map