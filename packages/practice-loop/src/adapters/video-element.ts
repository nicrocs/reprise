import type { MediaAdapter } from "../adapter.js";

export function createVideoElementAdapter(video: HTMLVideoElement): MediaAdapter {
  return {
    getCurrentTime: () => video.currentTime,
    setCurrentTime: (t: number) => {
      video.currentTime = t;
    },
    getPlaybackRate: () => video.playbackRate,
    setPlaybackRate: (r: number) => {
      video.preservesPitch = true;
      video.playbackRate = r;
    },
    play: () => video.play(),
    pause: () => video.pause(),
  };
}
