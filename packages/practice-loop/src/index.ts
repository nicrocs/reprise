export type { MediaAdapter } from "./adapter.js";
export { LoopController } from "./loop-controller.js";
export type { Loop, LoopControllerOptions } from "./loop-controller.js";
export { createVideoElementAdapter } from "./adapters/video-element.js";
export { createVimeoAdapter, type VimeoPlayer } from "./adapters/vimeo.js";
export {
  createWistiaLegacyAdapter,
  type WistiaVideo,
} from "./adapters/wistia-legacy.js";
export {
  createWistiaModernAdapter,
  type WistiaPlayerElement,
} from "./adapters/wistia-modern.js";

export const PRACTICE_LOOP_VERSION = "0.1.0";
