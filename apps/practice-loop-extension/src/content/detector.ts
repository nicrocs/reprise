import type {
  MediaAdapter,
  VimeoPlayer,
  WistiaPlayerElement,
  WistiaVideo,
} from "@reprise/practice-loop";
import Vimeo from "@vimeo/player";
import {
  createVideoElementAdapter,
  createVimeoAdapter,
  createWistiaLegacyAdapter,
  createWistiaModernAdapter,
} from "@reprise/practice-loop";
import type { PlayerInfo, VideoSource } from "../types.js";

export function extractWistiaLegacyMediaId(element: Element): string | null {
  for (const className of element.classList) {
    if (className.startsWith("wistia_async_")) {
      return className.slice("wistia_async_".length);
    }
  }
  return null;
}

export function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "www.youtube.com" || parsed.hostname === "youtube.com") {
      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/")[2] ?? null;
      }
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/")[2] ?? null;
      }
      return parsed.searchParams.get("v");
    }
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1) || null;
    }
  } catch {
    // ignore invalid URLs
  }
  return null;
}

export function extractVimeoVideoId(url: string): string | null {
  try {
    const parsed = new URL(url, "https://example.com/");
    if (parsed.hostname !== "player.vimeo.com" && parsed.hostname !== "vimeo.com" && parsed.hostname !== "www.vimeo.com") {
      return null;
    }
    const match = parsed.pathname.match(/\/video\/(\d+)(?:\/|$)|\/(\d+)(?:\/|$)/);
    return match?.[1] ?? match?.[2] ?? null;
  } catch {
    return null;
  }
}

export function extractEmbedlyVimeoUrl(url: string): string | null {
  try {
    const parsed = new URL(url, "https://example.com/");
    if (parsed.hostname !== "cdn.embedly.com" || !parsed.pathname.startsWith("/widgets/media.html")) {
      return null;
    }
    const candidate = parsed.searchParams.get("src") ?? parsed.searchParams.get("url");
    return candidate && extractVimeoVideoId(candidate) ? candidate : null;
  } catch {
    return null;
  }
}

function findWistiaLegacyEmbed(document: Document): Element | null {
  return document.querySelector('.wistia_embed[class*="wistia_async_"]');
}

function findWistiaModernPlayer(document: Document): HTMLElement | null {
  return document.querySelector("wistia-player");
}

function findFallbackVideo(document: Document): HTMLVideoElement | null {
  return document.querySelector("video");
}

function findVimeoIframe(document: Document): { iframe: HTMLIFrameElement; id: string } | null {
  for (const iframe of Array.from(document.querySelectorAll("iframe"))) {
    const src = iframe.getAttribute("src") ?? "";
    const directId = extractVimeoVideoId(src);
    if (directId) return { iframe, id: directId };
    const embedlyUrl = extractEmbedlyVimeoUrl(src);
    const embedlyId = embedlyUrl ? extractVimeoVideoId(embedlyUrl) : null;
    if (embedlyId) {
      return { iframe, id: embedlyId };
    }
  }
  return null;
}

function inferVideoSource(hostname: string): VideoSource {
  if (hostname === "www.youtube.com" || hostname === "youtube.com" || hostname === "youtu.be") {
    return "youtube";
  }
  if (hostname.includes("fretboardconfidential.com")) {
    return "wistia";
  }
  if (hostname === "vimeo.com" || hostname === "www.vimeo.com" || hostname === "player.vimeo.com" || hostname === "cdn.embedly.com") {
    return "vimeo";
  }
  return "video";
}

function findWistiaVideoInQueue(
  wistiaQueue: unknown[],
  mediaId: string,
): WistiaVideo | undefined {
  for (const entry of wistiaQueue) {
    if (entry && typeof entry === "object") {
      const candidate = entry as Record<string, unknown>;
      const id =
        ("_id" in candidate ? (candidate._id as string) : undefined) ??
        ("id" in candidate ? (candidate.id as string) : undefined) ??
        ("hashedId" in candidate ? (candidate.hashedId as string) : undefined);
      if (id === mediaId && "video" in candidate && candidate.video) {
        return candidate.video as WistiaVideo;
      }
    }
  }
  return undefined;
}

const DEFAULT_WISTIA_API_TIMEOUT_MS = 3000;

function waitForWistiaVideo(
  window: Window,
  mediaId: string,
  timeoutMs = DEFAULT_WISTIA_API_TIMEOUT_MS,
): Promise<WistiaVideo | null> {
  return new Promise((resolve) => {
    const wistiaQueue =
      ((window as unknown as Record<string, unknown>)._wq as unknown[] | undefined) ?? [];
    const existing = findWistiaVideoInQueue(wistiaQueue, mediaId);
    if (existing) {
      resolve(existing);
      return;
    }

    const timer = window.setTimeout(() => resolve(null), timeoutMs);

    try {
      wistiaQueue.push({
        id: mediaId,
        onReady: (video: WistiaVideo) => {
          window.clearTimeout(timer);
          resolve(video);
        },
      });
    } catch {
      window.clearTimeout(timer);
      resolve(null);
    }
  });
}

function findWistiaVideoElement(
  document: Document,
  mediaId: string,
): HTMLVideoElement | null {
  return (
    document.querySelector(`video[class*="wistia_simple_video_${mediaId}"]`) ??
    document.querySelector('video[class*="wistia_simple_video_"]')
  );
}

export interface DetectPlayerOptions {
  document?: Document;
  window?: Window;
  location?: Location;
  pollIntervalMs?: number;
  maxWaitMs?: number;
}

export async function detectPlayer(
  options: DetectPlayerOptions = {},
): Promise<PlayerInfo | null> {
  const doc = options.document ?? globalThis.document;
  const win = options.window ?? globalThis.window;
  const loc = options.location ?? globalThis.location;
  const pollIntervalMs = options.pollIntervalMs ?? 500;
  const maxWaitMs = options.maxWaitMs ?? 10000;

  const deadline = Date.now() + maxWaitMs;

  while (Date.now() < deadline) {
    const legacyEmbed = findWistiaLegacyEmbed(doc);
    if (legacyEmbed) {
      const mediaId = extractWistiaLegacyMediaId(legacyEmbed);
      if (mediaId) {
        const video = await waitForWistiaVideo(win, mediaId);
        if (video) {
          return {
            type: "wistia-legacy",
            source: "wistia" as VideoSource,
            externalId: mediaId,
            element: legacyEmbed as HTMLElement,
            adapter: createWistiaLegacyAdapter(video),
          };
        }

        const fallbackVideo = findWistiaVideoElement(doc, mediaId);
        if (fallbackVideo) {
          return {
            type: "video",
            source: "wistia" as VideoSource,
            externalId: mediaId,
            element: fallbackVideo,
            adapter: createVideoElementAdapter(fallbackVideo),
          };
        }
      }
    }

    const modernPlayer = findWistiaModernPlayer(doc);
    if (modernPlayer) {
      const mediaId =
        modernPlayer.getAttribute("media-id") ??
        modernPlayer.getAttribute("data-media-id") ??
        "";
      return {
        type: "wistia-modern",
        source: "wistia" as VideoSource,
        externalId: mediaId,
        element: modernPlayer,
        adapter: createWistiaModernAdapter(modernPlayer as WistiaPlayerElement),
      };
    }

    const vimeo = findVimeoIframe(doc);
    if (vimeo) {
      try {
        const player = new Vimeo(vimeo.iframe);
        await Promise.race([
          player.ready(),
          new Promise<never>((_, reject) =>
            win.setTimeout(() => reject(new Error("Vimeo player timeout")), 3000),
          ),
        ]);
        return {
          type: "vimeo",
          source: "vimeo",
          externalId: vimeo.id,
          element: vimeo.iframe,
          adapter: createVimeoAdapter(player as unknown as VimeoPlayer),
        };
      } catch {
        // Keep polling while the Vimeo frame or SDK finishes loading.
      }
    }

    const fallbackVideo = findFallbackVideo(doc);
    if (fallbackVideo) {
      const source = inferVideoSource(loc.hostname);
      const externalId = source === "youtube" ? extractYouTubeVideoId(loc.href) ?? "" : "";
      return {
        type: "video",
        source,
        externalId,
        element: fallbackVideo,
        adapter: createVideoElementAdapter(fallbackVideo),
      };
    }

    await new Promise((resolve) => win.setTimeout(resolve, pollIntervalMs));
  }

  return null;
}
