export interface MediaAdapter {
  getCurrentTime(): number;
  setCurrentTime(t: number): void;
  getPlaybackRate(): number;
  setPlaybackRate(r: number): void;
  play(): void;
  pause(): void;
}
