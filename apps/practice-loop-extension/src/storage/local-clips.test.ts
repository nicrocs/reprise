import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import type { LocalClip, VideoSource } from "../types.js";
import { deleteClip, getClips, saveClip, storageKey } from "./local-clips.js";

function createFakeStorage(initial: Record<string, LocalClip[]> = {}) {
  const store = new Map<string, LocalClip[]>(Object.entries(initial));

  return {
    get: (
      keys: string | string[] | Record<string, unknown> | null,
      callback: (result: Record<string, LocalClip[]>) => void,
    ) => {
      const key = Array.isArray(keys) ? keys[0] : typeof keys === "string" ? keys : Object.keys(keys ?? {})[0];
      callback(key && store.has(key) ? { [key]: store.get(key)! } : {});
    },
    set: (items: Record<string, LocalClip[]>, callback?: () => void) => {
      for (const [key, value] of Object.entries(items)) {
        store.set(key, value);
      }
      callback?.();
    },
    remove: (key: string, callback?: () => void) => {
      store.delete(key);
      callback?.();
    },
  };
}

function makeClip(overrides: Partial<LocalClip> = {}): LocalClip {
  return {
    id: "clip-1",
    source: "wistia" as VideoSource,
    externalId: "abc123",
    label: "Test clip",
    loopStart: 10,
    loopEnd: 20,
    playbackRate: 0.75,
    createdAt: 1,
    updatedAt: 1,
    ...overrides,
  };
}

describe("storageKey", () => {
  it("returns a colon-delimited key", () => {
    assert.equal(storageKey("youtube", "dQw4w9WgXcQ"), "clips:youtube:dQw4w9WgXcQ");
  });
});

describe("getClips", () => {
  it("returns an empty array when no clips exist", async () => {
    const storage = createFakeStorage();
    const clips = await getClips("wistia", "abc123", storage);
    assert.deepEqual(clips, []);
  });

  it("returns clips for the source and external id", async () => {
    const clip = makeClip();
    const storage = createFakeStorage({ "clips:wistia:abc123": [clip] });
    const clips = await getClips("wistia", "abc123", storage);
    assert.deepEqual(clips, [clip]);
  });
});

describe("saveClip", () => {
  it("saves a new clip", async () => {
    const storage = createFakeStorage();
    const clip = makeClip();
    await saveClip(clip, storage);
    const clips = await getClips("wistia", "abc123", storage);
    assert.equal(clips.length, 1);
    assert.equal(clips[0].label, "Test clip");
    assert.ok(clips[0].updatedAt > 1);
  });

  it("replaces an existing clip by id", async () => {
    const original = makeClip({ label: "Original" });
    const storage = createFakeStorage({ "clips:wistia:abc123": [original] });
    await saveClip({ ...original, label: "Updated" }, storage);
    const clips = await getClips("wistia", "abc123", storage);
    assert.equal(clips.length, 1);
    assert.equal(clips[0].label, "Updated");
  });
});

describe("deleteClip", () => {
  it("removes a clip by id", async () => {
    const clip = makeClip();
    const storage = createFakeStorage({ "clips:wistia:abc123": [clip] });
    await deleteClip(clip, storage);
    const clips = await getClips("wistia", "abc123", storage);
    assert.deepEqual(clips, []);
  });

  it("does nothing when the clip is not found", async () => {
    const storage = createFakeStorage({ "clips:wistia:abc123": [makeClip()] });
    await deleteClip({ ...makeClip(), id: "missing" }, storage);
    const clips = await getClips("wistia", "abc123", storage);
    assert.equal(clips.length, 1);
  });
});
