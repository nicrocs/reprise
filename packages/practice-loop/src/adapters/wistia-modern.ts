import type { MediaAdapter } from "../adapter.js";

export interface WistiaPlayerElement extends HTMLElement {
  currentTime: number;
  playbackRate: number;
  play(): Promise<void>;
  pause(): void;
}

export function createWistiaModernAdapter(player: WistiaPlayerElement): MediaAdapter {
  return {
    getCurrentTime: () => player.currentTime,
    setCurrentTime: (t: number) => {
      player.currentTime = t;
    },
    getPlaybackRate: () => player.playbackRate,
    setPlaybackRate: (r: number) => {
      player.playbackRate = r;
    },
    play: () => {
      void player.play();
    },
    pause: () => {
      player.pause();
    },
  };
}
