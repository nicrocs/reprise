import type { MediaAdapter } from "../adapter.js";

export interface VimeoPlayer {
  getCurrentTime(): Promise<number>;
  setCurrentTime(seconds: number): Promise<number>;
  getPlaybackRate(): Promise<number>;
  setPlaybackRate(rate: number): Promise<number>;
  play(): Promise<void>;
  pause(): Promise<void>;
  on(event: "timeupdate" | "playbackratechange", callback: (data: { seconds?: number; playbackRate?: number }) => void): void;
  off?(event: "timeupdate" | "playbackratechange", callback: (data: { seconds?: number; playbackRate?: number }) => void): void;
}

function ignoreRejection(promise: Promise<unknown>): void {
  void promise.catch(() => undefined);
}

export function createVimeoAdapter(player: VimeoPlayer): MediaAdapter {
  let currentTime = 0;
  let playbackRate = 1;

  void player.getCurrentTime().then((time) => {
    currentTime = time;
  }).catch(() => undefined);
  void player.getPlaybackRate().then((rate) => {
    playbackRate = rate;
  }).catch(() => undefined);

  const onTimeUpdate = (data: { seconds?: number }) => {
    if (typeof data.seconds === "number") currentTime = data.seconds;
  };
  const onPlaybackRateChange = (data: { playbackRate?: number }) => {
    if (typeof data.playbackRate === "number") playbackRate = data.playbackRate;
  };

  player.on("timeupdate", onTimeUpdate);
  player.on("playbackratechange", onPlaybackRateChange);

  return {
    getCurrentTime: () => currentTime,
    setCurrentTime: (time) => {
      currentTime = time;
      ignoreRejection(player.setCurrentTime(time));
    },
    getPlaybackRate: () => playbackRate,
    setPlaybackRate: (rate) => {
      playbackRate = rate;
      ignoreRejection(player.setPlaybackRate(rate));
    },
    play: () => ignoreRejection(player.play()),
    pause: () => ignoreRejection(player.pause()),
  };
}
