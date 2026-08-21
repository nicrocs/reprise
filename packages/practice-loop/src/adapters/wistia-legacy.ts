import type { MediaAdapter } from "../adapter.js";

export interface WistiaVideo {
  time(): number;
  time(t: number): WistiaVideo;
  playbackRate(): number;
  playbackRate(r: number): WistiaVideo;
  play(): WistiaVideo;
  pause(): WistiaVideo;
}

export function createWistiaLegacyAdapter(video: WistiaVideo): MediaAdapter {
  return {
    getCurrentTime: () => video.time(),
    setCurrentTime: (t: number) => {
      video.time(t);
    },
    getPlaybackRate: () => video.playbackRate(),
    setPlaybackRate: (r: number) => {
      video.playbackRate(r);
    },
    play: () => {
      video.play();
    },
    pause: () => {
      video.pause();
    },
  };
}
