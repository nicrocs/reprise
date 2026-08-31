import type { MediaAdapter } from "../adapter.js";
export interface VimeoPlayer {
    getCurrentTime(): Promise<number>;
    setCurrentTime(seconds: number): Promise<number>;
    getPlaybackRate(): Promise<number>;
    setPlaybackRate(rate: number): Promise<number>;
    play(): Promise<void>;
    pause(): Promise<void>;
    on(event: "timeupdate" | "playbackratechange", callback: (data: {
        seconds?: number;
        playbackRate?: number;
    }) => void): void;
    off?(event: "timeupdate" | "playbackratechange", callback: (data: {
        seconds?: number;
        playbackRate?: number;
    }) => void): void;
}
export declare function createVimeoAdapter(player: VimeoPlayer): MediaAdapter;
//# sourceMappingURL=vimeo.d.ts.map