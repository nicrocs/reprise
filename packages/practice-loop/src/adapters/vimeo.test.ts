import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createVimeoAdapter, type VimeoPlayer } from "./vimeo.js";

function fakePlayer(): VimeoPlayer & {
  events: Record<string, (data: { seconds?: number; playbackRate?: number }) => void>;
  calls: string[];
} {
  const player = {
    events: {},
    calls: [],
    getCurrentTime: async () => 12,
    setCurrentTime: async (seconds: number) => {
      player.calls.push(`time:${seconds}`);
      return seconds;
    },
    getPlaybackRate: async () => 0.75,
    setPlaybackRate: async (rate: number) => {
      player.calls.push(`rate:${rate}`);
      return rate;
    },
    play: async () => {
      player.calls.push("play");
    },
    pause: async () => {
      player.calls.push("pause");
    },
    on: (event: string, callback: (data: { seconds?: number; playbackRate?: number }) => void) => {
      player.events[event] = callback;
    },
  } as VimeoPlayer & {
    events: Record<string, (data: { seconds?: number; playbackRate?: number }) => void>;
    calls: string[];
  };
  return player;
}

describe("createVimeoAdapter", () => {
  it("caches player state and delegates controls", async () => {
    const player = fakePlayer();
    const adapter = createVimeoAdapter(player);

    await Promise.resolve();
    assert.equal(adapter.getCurrentTime(), 12);
    assert.equal(adapter.getPlaybackRate(), 0.75);

    player.events.timeupdate({ seconds: 20 });
    player.events.playbackratechange({ playbackRate: 1.25 });
    assert.equal(adapter.getCurrentTime(), 20);
    assert.equal(adapter.getPlaybackRate(), 1.25);

    adapter.setCurrentTime(30);
    adapter.setPlaybackRate(0.5);
    adapter.play();
    adapter.pause();
    await Promise.resolve();
    assert.deepEqual(player.calls, ["time:30", "rate:0.5", "play", "pause"]);
  });
});
