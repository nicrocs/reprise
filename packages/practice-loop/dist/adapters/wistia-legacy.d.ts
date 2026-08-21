import type { MediaAdapter } from "../adapter.js";
export interface WistiaVideo {
    time(): number;
    time(t: number): WistiaVideo;
    playbackRate(): number;
    playbackRate(r: number): WistiaVideo;
    play(): WistiaVideo;
    pause(): WistiaVideo;
}
export declare function createWistiaLegacyAdapter(video: WistiaVideo): MediaAdapter;
//# sourceMappingURL=wistia-legacy.d.ts.map