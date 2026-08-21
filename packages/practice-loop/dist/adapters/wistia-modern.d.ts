import type { MediaAdapter } from "../adapter.js";
export interface WistiaPlayerElement extends HTMLElement {
    currentTime: number;
    playbackRate: number;
    play(): Promise<void>;
    pause(): void;
}
export declare function createWistiaModernAdapter(player: WistiaPlayerElement): MediaAdapter;
//# sourceMappingURL=wistia-modern.d.ts.map