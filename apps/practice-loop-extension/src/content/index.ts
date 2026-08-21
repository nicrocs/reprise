import { LoopController } from "@reprise/practice-loop";
import { detectPlayer } from "./detector.js";
import { createLoopFromBoundary, mountPanel } from "./panel.js";
import { deleteClip, getClips, saveClip } from "../storage/local-clips.js";
import type { LocalClip, PlayerInfo } from "../types.js";
import type { MountedPanel } from "./panel.js";

console.log("[Practice Loop] content script active");

let activeController: LoopController | null = null;
let activePanel: MountedPanel | null = null;
let activePlayer: PlayerInfo | null = null;
let activeClips: LocalClip[] = [];
const teardown: (() => void)[] = [];

async function refreshClips() {
  if (!activePlayer) return;
  activeClips = await getClips(activePlayer.source, activePlayer.externalId);
  activePanel?.updateClips(activeClips);
}

async function handleSave(clip: LocalClip) {
  await saveClip(clip);
  await refreshClips();
}

async function handleLoad(clip: LocalClip) {
  if (!activeController) return;
  activeController.setPlaybackRate(clip.playbackRate);
  activeController.setLoop({ start: clip.loopStart, end: clip.loopEnd });
  activePanel?.refresh();
}

async function handleDelete(clip: LocalClip) {
  await deleteClip(clip);
  await refreshClips();
}

function cleanup() {
  activePanel?.destroy();
  activePanel = null;
  activeController = null;
  activePlayer = null;
  activeClips = [];
}

async function bootstrap() {
  cleanup();

  const player = await detectPlayer();
  if (!player) {
    console.log("[Practice Loop] no supported player detected");
    return;
  }

  activePlayer = player;
  console.log("[Practice Loop] detected", player.type, player.externalId);

  activeController = new LoopController(player.adapter);
  activeClips = await getClips(player.source, player.externalId);

  activePanel = mountPanel({
    controller: activeController,
    source: player.source,
    externalId: player.externalId,
    clips: activeClips,
    anchor: player.element,
    callbacks: {
      onSave: handleSave,
      onLoad: handleLoad,
      onDelete: handleDelete,
    },
  });
}

function setupNavigationHandling(): () => void {
  let lastUrl = location.href;

  const observer = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      void bootstrap();
    }
  });

  observer.observe(document, { subtree: true, childList: true });
  return () => observer.disconnect();
}

function setupKeyboardShortcuts(): () => void {
  const onKeyDown = (e: KeyboardEvent) => {
    if (!activeController) return;
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    if (e.key === "a" || e.key === "A") {
      e.preventDefault();
      const loop = createLoopFromBoundary(activeController.getLoop(), activeController.getCurrentTime(), "a");
      activeController.setLoop(loop);
    } else if (e.key === "b" || e.key === "B") {
      e.preventDefault();
      const loop = createLoopFromBoundary(activeController.getLoop(), activeController.getCurrentTime(), "b");
      activeController.setLoop(loop);
    }
  };

  document.addEventListener("keydown", onKeyDown);
  return () => document.removeEventListener("keydown", onKeyDown);
}

void bootstrap();
teardown.push(setupNavigationHandling());
teardown.push(setupKeyboardShortcuts());

// Ensure global cleanup if the content script is reloaded.
window.addEventListener("beforeunload", () => {
  cleanup();
  for (const fn of teardown) fn();
});
