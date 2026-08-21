import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import type { MediaAdapter } from "../adapter.js";
import { LoopController } from "../loop-controller.js";

function createFakeAdapter(overrides: Partial<MediaAdapter> = {}): MediaAdapter {
  let currentTime = 0;
  let playbackRate = 1;
  let playing = false;

  return {
    getCurrentTime: () => currentTime,
    setCurrentTime: (t: number) => {
      currentTime = t;
    },
    getPlaybackRate: () => playbackRate,
    setPlaybackRate: (r: number) => {
      playbackRate = r;
    },
    play: () => {
      playing = true;
    },
    pause: () => {
      playing = false;
    },
    ...overrides,
  };
}

function createFakeRaf() {
  let id = 0;
  const callbacks = new Map<number, FrameRequestCallback>();

  return {
    requestAnimationFrame: (cb: FrameRequestCallback): number => {
      const handle = ++id;
      callbacks.set(handle, cb);
      return handle;
    },
    cancelAnimationFrame: (handle: number): void => {
      callbacks.delete(handle);
    },
    tick: (time = performance.now()) => {
      const snapshot = Array.from(callbacks.values());
      for (const cb of snapshot) {
        cb(time);
      }
    },
  };
}

describe("LoopController", () => {
  it("stores and returns loop boundaries", () => {
    const adapter = createFakeAdapter();
    const controller = new LoopController(adapter);

    controller.setLoop({ start: 10, end: 20 });

    assert.deepEqual(controller.getLoop(), { start: 10, end: 20 });
  });

  it("seeks to loop start when current time reaches loop end", () => {
    const adapter = createFakeAdapter();
    const raf = createFakeRaf();
    const controller = new LoopController(adapter, {
      requestAnimationFrame: raf.requestAnimationFrame,
      cancelAnimationFrame: raf.cancelAnimationFrame,
    });

    controller.setLoop({ start: 10, end: 20 });
    adapter.setCurrentTime(21);
    raf.tick();

    assert.equal(adapter.getCurrentTime(), 10);
  });

  it("stops polling when paused", () => {
    const adapter = createFakeAdapter();
    const raf = createFakeRaf();
    const controller = new LoopController(adapter, {
      requestAnimationFrame: raf.requestAnimationFrame,
      cancelAnimationFrame: raf.cancelAnimationFrame,
    });

    controller.setLoop({ start: 10, end: 20 });
    controller.pause();
    adapter.setCurrentTime(21);
    raf.tick();

    assert.equal(adapter.getCurrentTime(), 21);
  });

  it("updates playback rate on the adapter", () => {
    const adapter = createFakeAdapter();
    const controller = new LoopController(adapter);

    controller.setPlaybackRate(0.75);

    assert.equal(controller.getPlaybackRate(), 0.75);
    assert.equal(adapter.getPlaybackRate(), 0.75);
  });

  it("returns current time from the adapter", () => {
    const adapter = createFakeAdapter();
    const controller = new LoopController(adapter);

    adapter.setCurrentTime(42);

    assert.equal(controller.getCurrentTime(), 42);
  });

  it("calls onTimeUpdate each poll", () => {
    const adapter = createFakeAdapter();
    const raf = createFakeRaf();
    const times: number[] = [];
    const controller = new LoopController(adapter, {
      requestAnimationFrame: raf.requestAnimationFrame,
      cancelAnimationFrame: raf.cancelAnimationFrame,
    });
    controller.onTimeUpdate = (t) => times.push(t);

    controller.setLoop({ start: 1, end: 5 });
    adapter.setCurrentTime(2);
    raf.tick();

    assert.deepEqual(times, [2]);
  });

  it("calls onLoopEnter and onLoopExit around a seek", () => {
    const adapter = createFakeAdapter();
    const raf = createFakeRaf();
    let entered = 0;
    let exited = 0;
    const controller = new LoopController(adapter, {
      requestAnimationFrame: raf.requestAnimationFrame,
      cancelAnimationFrame: raf.cancelAnimationFrame,
    });
    controller.onLoopEnter = () => entered++;
    controller.onLoopExit = () => exited++;

    controller.setLoop({ start: 10, end: 20 });
    adapter.setCurrentTime(21);
    raf.tick();

    assert.equal(exited, 1);
    assert.equal(entered, 1);
  });
});
