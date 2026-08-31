import type { MediaAdapter } from "./adapter.js";

export interface Loop {
  start: number;
  end: number;
}

export interface LoopControllerOptions {
  requestAnimationFrame?: typeof globalThis.requestAnimationFrame;
  cancelAnimationFrame?: typeof globalThis.cancelAnimationFrame;
}

export class LoopController {
  private adapter: MediaAdapter;
  private loop: Loop | null = null;
  private rafHandle: number | null = null;
  private readonly requestAnimationFrame: typeof globalThis.requestAnimationFrame;
  private readonly cancelAnimationFrame: typeof globalThis.cancelAnimationFrame;

  onLoopEnter?: () => void;
  onLoopExit?: () => void;
  onTimeUpdate?: (t: number) => void;

  constructor(adapter: MediaAdapter, options: LoopControllerOptions = {}) {
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
        : () => {});
  }

  setLoop(loop: Loop | null): void {
    this.loop = loop;
    if (loop) {
      this.startPolling();
    } else {
      this.stopPolling();
    }
  }

  getLoop(): Loop | null {
    return this.loop;
  }

  setPlaybackRate(rate: number): void {
    this.adapter.setPlaybackRate(rate);
  }

  getPlaybackRate(): number {
    return this.adapter.getPlaybackRate();
  }

  getCurrentTime(): number {
    return this.adapter.getCurrentTime();
  }

  setCurrentTime(time: number): void {
    this.adapter.setCurrentTime(time);
  }

  play(): void {
    this.adapter.play();
    if (this.loop) {
      this.startPolling();
    }
  }

  pause(): void {
    this.adapter.pause();
    this.stopPolling();
  }

  private startPolling(): void {
    if (this.rafHandle !== null) return;

    const tick = () => {
      this.rafHandle = this.requestAnimationFrame(tick);
      this.update();
    };

    this.rafHandle = this.requestAnimationFrame(tick);
  }

  private stopPolling(): void {
    if (this.rafHandle !== null) {
      this.cancelAnimationFrame(this.rafHandle);
      this.rafHandle = null;
    }
  }

  private update(): void {
    const t = this.adapter.getCurrentTime();
    this.onTimeUpdate?.(t);

    if (!this.loop) return;

    if (t >= this.loop.end) {
      this.onLoopExit?.();
      this.adapter.setCurrentTime(this.loop.start);
      this.onLoopEnter?.();
    }
  }
}
