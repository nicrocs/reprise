import type { Loop, LoopController } from "@reprise/practice-loop";
import type { LocalClip, VideoSource } from "../types.js";

export interface PanelCallbacks {
  onSave: (clip: LocalClip) => void;
  onLoad: (clip: LocalClip) => void;
  onDelete: (clip: LocalClip) => void;
}

export interface MountedPanel {
  element: HTMLElement;
  updateClips: (clips: LocalClip[]) => void;
  refresh: () => void;
  setBoundary: (boundary: "a" | "b") => void;
  loadLoop: (loop: Loop) => void;
  destroy: () => void;
}

export interface MountPanelOptions {
  controller: LoopController;
  source: VideoSource;
  externalId: string;
  clips: LocalClip[];
  anchor?: HTMLElement;
  callbacks: PanelCallbacks;
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5];

function formatTime(seconds: number): string {
  const s = Math.floor(seconds % 60);
  const m = Math.floor((seconds / 60) % 60);
  const h = Math.floor(seconds / 3600);
  const pad = (n: number) => n.toString().padStart(2, "0");
  if (h > 0) return `${h}:${pad(m)}:${pad(s)}`;
  return `${m}:${pad(s)}`;
}

export interface PartialLoop {
  start: number | null;
  end: number | null;
}

export function applyBoundary(
  partial: PartialLoop,
  currentTime: number,
  boundary: "a" | "b",
): PartialLoop {
  if (boundary === "a") {
    const start = currentTime;
    const end = partial.end !== null && partial.end > start ? partial.end : null;
    return { start, end };
  }
  const end = currentTime;
  const start = partial.start !== null && partial.start < end ? partial.start : null;
  return { start, end };
}

export function buildLoop(partial: PartialLoop): Loop | null {
  if (partial.start !== null && partial.end !== null && partial.start < partial.end) {
    return { start: partial.start, end: partial.end };
  }
  return null;
}

export function mountPanel(options: MountPanelOptions): MountedPanel {
  const { controller, source, externalId, clips, anchor, callbacks } = options;

  const host = document.createElement("div");
  host.style.position = "fixed";
  host.style.zIndex = "2147483647";
  host.style.top = "0";
  host.style.left = "0";

  const shadow = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = getPanelStyles();
  shadow.appendChild(style);

  const panel = document.createElement("div");
  panel.className = "panel";
  shadow.appendChild(panel);

  const cleanup: (() => void)[] = [];
  let partialLoop: PartialLoop = { start: null, end: null };

  // Header
  const header = createHeader();
  panel.appendChild(header);

  // Speed
  const speedRow = createSpeedRow(controller, () => updateSpeedUI());
  panel.appendChild(speedRow.element);

  // A/B points
  const abRow = createABRow((boundary) => {
    partialLoop = applyBoundary(partialLoop, controller.getCurrentTime(), boundary);
    controller.setLoop(buildLoop(partialLoop));
    updateLoopUI();
  });
  panel.appendChild(abRow.element);

  // Loop toggle
  const loopToggleRow = createLoopToggleRow(() => {
    if (controller.getLoop()) {
      controller.setLoop(null);
    } else {
      const existing = buildLoop(partialLoop);
      if (existing) {
        controller.setLoop(existing);
      } else {
        const current = controller.getCurrentTime();
        partialLoop = { start: current, end: current + 1 };
        controller.setLoop(buildLoop(partialLoop));
      }
    }
    updateLoopUI();
  });
  panel.appendChild(loopToggleRow.element);

  // Save clip
  const saveRow = createSaveRow(controller, source, externalId, callbacks.onSave);
  panel.appendChild(saveRow);

  // Clips list
  const clipsList = document.createElement("div");
  clipsList.className = "clips";
  panel.appendChild(clipsList);

  const status = document.createElement("div");
  status.className = "status";
  panel.appendChild(status);

  function updateLoopUI() {
    const loop = controller.getLoop();
    abRow.update(loop, partialLoop);
    loopToggleRow.update(loop);
  }

  function updateSpeedUI() {
    speedRow.update(controller.getPlaybackRate());
  }

  function updateStatus(text: string) {
    status.textContent = text;
  }

  function renderClips(newClips: LocalClip[]) {
    clipsList.innerHTML = "";
    if (newClips.length === 0) {
      updateStatus("No saved clips");
      return;
    }
    updateStatus(`${newClips.length} saved clip${newClips.length === 1 ? "" : "s"}`);
    for (const clip of newClips) {
      const row = document.createElement("div");
      row.className = "clip";

      const name = document.createElement("span");
      name.className = "clip-name";
      name.textContent = clip.label || "Untitled";
      name.title = `${formatTime(clip.loopStart)} - ${formatTime(clip.loopEnd)} @ ${clip.playbackRate}x`;
      row.appendChild(name);

      const actions = document.createElement("span");
      actions.className = "clip-actions";

      const loadBtn = document.createElement("button");
      loadBtn.className = "btn";
      loadBtn.textContent = "Load";
      loadBtn.addEventListener("click", () => callbacks.onLoad(clip));
      actions.appendChild(loadBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-danger";
      deleteBtn.textContent = "Del";
      deleteBtn.addEventListener("click", () => callbacks.onDelete(clip));
      actions.appendChild(deleteBtn);

      row.appendChild(actions);
      clipsList.appendChild(row);
    }
  }

  controller.onTimeUpdate = () => {
    // Future: live time display could go here.
  };

  updateSpeedUI();
  updateLoopUI();
  renderClips(clips);

  positionPanel(panel, anchor);
  cleanup.push(...makeDraggable(header, panel));
  cleanup.push(hideOnFullscreen(panel));

  document.body.appendChild(host);

  return {
    element: host,
    updateClips: (newClips) => renderClips(newClips),
    refresh: () => {
      updateSpeedUI();
      updateLoopUI();
    },
    setBoundary: (boundary) => {
      partialLoop = applyBoundary(partialLoop, controller.getCurrentTime(), boundary);
      controller.setLoop(buildLoop(partialLoop));
      updateLoopUI();
    },
    loadLoop: (loop) => {
      partialLoop = { start: loop.start, end: loop.end };
      controller.setLoop(buildLoop(partialLoop));
      updateLoopUI();
    },
    destroy: () => {
      controller.onTimeUpdate = undefined;
      for (const fn of cleanup) fn();
      host.remove();
    },
  };
}

function getPanelStyles(): string {
  return [
    ":host { --pl-bg: rgba(20,20,25,0.95); --pl-text: #f3f4f6; --pl-muted: #9ca3af; --pl-accent: #22c55e; --pl-danger: #ef4444; --pl-border: rgba(255,255,255,0.12); font-family: system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif; font-size: 13px; color: var(--pl-text); }",
    ".panel { position: fixed; top: 16px; right: 16px; width: 260px; background: var(--pl-bg); border: 1px solid var(--pl-border); border-radius: 10px; padding: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.35); backdrop-filter: blur(6px); z-index: 2147483647; user-select: none; }",
    ".panel.fullscreen-hidden { display: none; }",
    ".header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; cursor: grab; }",
    ".header:active { cursor: grabbing; }",
    ".title { font-weight: 600; letter-spacing: 0.02em; }",
    ".row { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; }",
    ".label { color: var(--pl-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; }",
    ".time { font-variant-numeric: tabular-nums; font-weight: 600; }",
    ".btn { background: rgba(255,255,255,0.08); border: 1px solid var(--pl-border); border-radius: 6px; color: var(--pl-text); padding: 6px 10px; font-size: 12px; cursor: pointer; transition: background 0.15s; }",
    ".btn:hover { background: rgba(255,255,255,0.14); }",
    ".btn.active { background: var(--pl-accent); border-color: var(--pl-accent); color: #052e16; }",
    ".btn-danger { color: var(--pl-danger); border-color: rgba(239,68,68,0.35); }",
    ".btn-group { display: flex; gap: 4px; flex-wrap: wrap; }",
    ".nudge { padding: 4px 8px; font-size: 11px; }",
    "input[type=\"text\"] { width: 100%; background: rgba(255,255,255,0.06); border: 1px solid var(--pl-border); border-radius: 6px; color: var(--pl-text); padding: 6px 8px; font-size: 12px; box-sizing: border-box; }",
    "input[type=\"text\"]::placeholder { color: var(--pl-muted); }",
    ".clips { margin-top: 10px; max-height: 140px; overflow-y: auto; }",
    ".clip { display: flex; align-items: center; justify-content: space-between; gap: 6px; padding: 6px 0; border-top: 1px solid var(--pl-border); }",
    ".clip-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }",
    ".clip-actions { display: flex; gap: 4px; }",
    ".status { color: var(--pl-muted); font-size: 11px; text-align: center; margin-top: 6px; }",
    ".ab-display { display: flex; align-items: center; gap: 8px; }",
    ".ab-group { display: flex; gap: 4px; }",
  ].join("\n");
}

function positionPanel(panel: HTMLElement, anchor?: HTMLElement) {
  if (!anchor) return;
  const rect = anchor.getBoundingClientRect();
  panel.style.top = `${Math.max(16, rect.top + window.scrollY + 16)}px`;
  panel.style.left = `${Math.max(16, rect.left + window.scrollX + rect.width - 276)}px`;
  panel.style.right = "auto";
}

function createHeader(): HTMLElement {
  const header = document.createElement("div");
  header.className = "header";
  const title = document.createElement("div");
  title.className = "title";
  title.textContent = "Practice Loop";
  header.appendChild(title);
  return header;
}

function createSpeedRow(
  controller: LoopController,
  onChange: () => void,
): { element: HTMLElement; update: (rate: number) => void } {
  const row = document.createElement("div");
  row.className = "row";

  const label = document.createElement("span");
  label.className = "label";
  label.textContent = "Speed";
  row.appendChild(label);

  const group = document.createElement("div");
  group.className = "btn-group";
  const buttons = new Map<number, HTMLButtonElement>();

  for (const rate of SPEEDS) {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = `${rate}x`;
    btn.addEventListener("click", () => {
      controller.setPlaybackRate(rate);
      onChange();
    });
    group.appendChild(btn);
    buttons.set(rate, btn);
  }

  row.appendChild(group);

  return {
    element: row,
    update: (rate) => {
      for (const [r, btn] of buttons) {
        btn.classList.toggle("active", Math.abs(r - rate) < 0.01);
      }
    },
  };
}

function createABRow(
  onSetBoundary: (boundary: "a" | "b") => void,
): { element: HTMLElement; update: (loop: Loop | null, partial: PartialLoop) => void } {
  const row = document.createElement("div");
  row.className = "row";

  const display = document.createElement("div");
  display.className = "ab-display";

  const aTime = createTimeLabel("A", "--:--");
  const bTime = createTimeLabel("B", "--:--");
  display.appendChild(aTime);
  display.appendChild(bTime);
  row.appendChild(display);

  const group = document.createElement("div");
  group.className = "ab-group";

  const setABtn = document.createElement("button");
  setABtn.className = "btn";
  setABtn.textContent = "Set A";
  setABtn.addEventListener("click", () => onSetBoundary("a"));
  group.appendChild(setABtn);

  const setBBtn = document.createElement("button");
  setBBtn.className = "btn";
  setBBtn.textContent = "Set B";
  setBBtn.addEventListener("click", () => onSetBoundary("b"));
  group.appendChild(setBBtn);

  row.appendChild(group);

  function update(loop: Loop | null, partial: PartialLoop) {
    aTime.textContent = `A: ${formatBoundary(partial.start, loop?.start)}`;
    bTime.textContent = `B: ${formatBoundary(partial.end, loop?.end)}`;
  }

  return {
    element: row,
    update,
  };
}

function formatBoundary(partial: number | null, active?: number): string {
  if (partial !== null) return formatTime(partial);
  if (active !== undefined) return formatTime(active);
  return "--:--";
}

function createTimeLabel(prefix: string, initial: string): HTMLElement {
  const span = document.createElement("span");
  span.className = "time";
  span.textContent = `${prefix}: ${initial}`;
  return span;
}

function isolateInputShortcuts(input: HTMLInputElement | HTMLTextAreaElement): void {
  const stop = (e: Event) => {
    if (e.target === input) {
      e.stopPropagation();
    }
  };
  input.addEventListener("keydown", stop);
  input.addEventListener("keyup", stop);
}

function createLoopToggleRow(
  onToggle: () => void,
): { element: HTMLElement; update: (loop: Loop | null) => void } {
  const row = document.createElement("div");
  row.className = "row";

  const label = document.createElement("span");
  label.className = "label";
  label.textContent = "Loop";
  row.appendChild(label);

  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "Off";
  btn.addEventListener("click", onToggle);
  row.appendChild(btn);

  return {
    element: row,
    update: (loop) => {
      const active = loop !== null;
      btn.classList.toggle("active", active);
      btn.textContent = active ? "On" : "Off";
    },
  };
}

function createSaveRow(
  controller: LoopController,
  source: VideoSource,
  externalId: string,
  onSave: (clip: LocalClip) => void,
): HTMLElement {
  const row = document.createElement("div");
  row.className = "row";
  row.style.flexDirection = "column";
  row.style.alignItems = "stretch";
  row.style.gap = "6px";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Clip label";
  isolateInputShortcuts(input);
  row.appendChild(input);

  const saveBtn = document.createElement("button");
  saveBtn.className = "btn";
  saveBtn.textContent = "Save Clip";
  saveBtn.addEventListener("click", () => {
    const loop = controller.getLoop();
    if (!loop) return;
    const clip: LocalClip = {
      id: crypto.randomUUID(),
      source,
      externalId,
      label: input.value.trim() || "Untitled clip",
      loopStart: loop.start,
      loopEnd: loop.end,
      playbackRate: controller.getPlaybackRate(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    onSave(clip);
    input.value = "";
  });
  row.appendChild(saveBtn);

  return row;
}

function makeDraggable(handle: HTMLElement, panel: HTMLElement): (() => void)[] {
  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  const onMouseDown = (e: MouseEvent) => {
    dragging = true;
    const rect = panel.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    panel.style.cursor = "grabbing";
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    panel.style.right = "auto";
    panel.style.left = `${x}px`;
    panel.style.top = `${y}px`;
  };

  const onMouseUp = () => {
    dragging = false;
    panel.style.cursor = "";
  };

  handle.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);

  return [
    () => handle.removeEventListener("mousedown", onMouseDown),
    () => window.removeEventListener("mousemove", onMouseMove),
    () => window.removeEventListener("mouseup", onMouseUp),
  ];
}

function hideOnFullscreen(panel: HTMLElement): () => void {
  const onChange = () => {
    const hidden = Boolean(document.fullscreenElement);
    panel.classList.toggle("fullscreen-hidden", hidden);
  };

  document.addEventListener("fullscreenchange", onChange);
  return () => document.removeEventListener("fullscreenchange", onChange);
}
