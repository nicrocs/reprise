export type VideoSource = "wistia" | "youtube" | "video";

export interface LocalClip {
  id: string;
  source: VideoSource;
  externalId: string;
  label: string;
  loopStart: number;
  loopEnd: number;
  playbackRate: number;
  createdAt: number;
  updatedAt: number;
}

import type { MediaAdapter } from "@reprise/practice-loop";

export interface PlayerInfo {
  type: "wistia-legacy" | "wistia-modern" | "video";
  source: VideoSource;
  externalId: string;
  element?: HTMLElement;
  adapter: MediaAdapter;
}
